import { NextRequest, NextResponse } from 'next/server'
import { attorneyReferralSchema }     from '@/lib/validations/attorney-referral'
import { saveSubmission, initDB }     from '@/lib/db/mysql'
import { notifyTeamOfSubmission } from '@/lib/email/send'
import { verifyTurnstileToken } from '@/lib/turnstile/verify'
import { sanitizeObject, SANITIZATION_SCHEMAS } from '@/lib/utils/sanitizer'
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

  // Verify Turnstile token
  const bodyObj = body as Record<string, unknown>
  const turnstileToken = bodyObj.turnstileToken as string | undefined
  
  if (!turnstileToken) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'CAPTCHA verification is required.' },
      { status: 422 },
    )
  }

  const isValidToken = await verifyTurnstileToken(turnstileToken)
  if (!isValidToken) {
    console.warn('[API /attorney-referral] Invalid Turnstile token')
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'CAPTCHA verification failed. Please try again.' },
      { status: 422 },
    )
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

  // Sanitize all fields before saving
  const sanitizedData = sanitizeObject(result.data as Record<string, unknown>, SANITIZATION_SCHEMAS['attorney-referral'])

  // Initialize database if needed
  try {
    await initDB()
  } catch (error) {
    console.error('[API /attorney-referral] Database init error:', error)
  }

  // Save to database and forward webhook in parallel
  const [dbResult, webhookResult, notifyResultOld] = await Promise.allSettled([
    saveSubmission('attorney-referral', sanitizedData),
    forwardToWebhook(sanitizedData),
    notifyTeam(sanitizedData),
  ])

  // Check if database save succeeded
  if (dbResult.status === 'rejected') {
    console.error('[API /attorney-referral] Database save failed:', dbResult.reason)
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Failed to save referral. Please try again.' },
      { status: 500 },
    )
  }

  // Database save succeeded
  const submissionId = dbResult.value

  // Webhook and debug logging are optional — log but don't block
  if (webhookResult.status === 'rejected') {
    console.error('[API /attorney-referral] Webhook failed:', webhookResult.reason)
  }
  if (notifyResultOld.status === 'rejected') {
    console.error('[API /attorney-referral] Debug notify failed:', notifyResultOld.reason)
  }

  // Now that database save succeeded, notify team (non-blocking)
  const notifyTeamResult = await notifyTeamOfSubmission('attorney-referral', sanitizedData)
  
  if (notifyTeamResult instanceof Error) {
    console.warn('[API /attorney-referral] Team notification failed:', notifyTeamResult)
  }

  const leadId = webhookResult.status === 'fulfilled' ? webhookResult.value : undefined

  if (process.env.NODE_ENV === 'development' && dbResult.status === 'fulfilled') {
    console.log('[API /attorney-referral] Saved to database:', dbResult.value)
  }

  return NextResponse.json<ApiResponse>(
    { success: true, leadId },
    { status: 201 },
  )
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json<ApiResponse>({ success: false, error: 'Method not allowed' }, { status: 405 })
}
