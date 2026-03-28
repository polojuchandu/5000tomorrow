import { NextRequest, NextResponse } from 'next/server'
import { attorneyReferralSchema }     from '@/lib/validations/attorney-referral'
import type { ApiResponse }           from '@/types'

interface RateLimitRecord { count: number; resetAt: number }
const rateLimitStore = new Map<string, RateLimitRecord>()
const WINDOW = 60 * 60 * 1000  // 1 hour
const MAX    = 20               // higher limit for attorneys

function checkRateLimit(ip: string): boolean {
  const now   = Date.now()
  const entry = rateLimitStore.get(ip)
  if (!entry || entry.resetAt < now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + WINDOW })
    return true
  }
  if (entry.count >= MAX) return false
  entry.count++
  return true
}

async function forwardToWebhook(data: unknown): Promise<string | undefined> {
  const url = process.env.ATTORNEY_REFERRAL_WEBHOOK_URL ?? process.env.CRM_WEBHOOK_URL
  if (!url) return undefined

  const res = await fetch(url, {
    method:  'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${process.env.CRM_API_KEY ?? ''}`,
      'X-Source':      '5000tomorrow.com/attorney-portal',
      'X-Type':        'attorney-referral',
    },
    body:   JSON.stringify({
      ...(data as Record<string, unknown>),
      submittedAt: new Date().toISOString(),
      source:      '5000tomorrow.com/attorney-portal',
      type:        'attorney-referral',
    }),
    signal: AbortSignal.timeout(8000),
  })

  if (!res.ok) throw new Error(`Webhook returned ${res.status}`)
  const json = await res.json().catch(() => ({})) as Record<string, unknown>
  return typeof json.id === 'string' ? json.id : undefined
}

async function notifyTeam(data: unknown): Promise<void> {
  if (process.env.NODE_ENV === 'development') {
    const d = data as Record<string, unknown>
    console.log('[API /attorney-referral] New referral:', {
      attorney:  `${d.attorneyFirstName} ${d.attorneyLastName} @ ${d.firmName}`,
      client:    `${d.clientFirstName} ${d.clientLastName}`,
      caseType:  d.caseType,
      submittedAt: new Date().toISOString(),
    })
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const ip =
    req.headers.get('cf-connecting-ip') ??
    req.headers.get('x-real-ip') ??
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown'

  if (!checkRateLimit(ip)) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Too many referrals submitted. Please try again in 1 hour.' },
      { status: 429 },
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json<ApiResponse>({ success: false, error: 'Invalid request.' }, { status: 400 })
  }

  const result = attorneyReferralSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json<ApiResponse>(
      {
        success:     false,
        error:       'Please review the highlighted fields.',
        fieldErrors: result.error.flatten().fieldErrors as Record<string, string[]>,
      },
      { status: 422 },
    )
  }

  const [webhookResult, notifyResult] = await Promise.allSettled([
    forwardToWebhook(result.data),
    notifyTeam(result.data),
  ])

  if (webhookResult.status === 'rejected') {
    console.error('[API /attorney-referral] Webhook failed:', webhookResult.reason)
  }
  if (notifyResult.status === 'rejected') {
    console.error('[API /attorney-referral] Notify failed:', notifyResult.reason)
  }

  const leadId = webhookResult.status === 'fulfilled' ? webhookResult.value : undefined

  return NextResponse.json<ApiResponse>(
    { success: true, leadId },
    { status: 201 },
  )
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json<ApiResponse>({ success: false, error: 'Method not allowed' }, { status: 405 })
}
