import { NextRequest, NextResponse } from 'next/server'
import { contactSchema }             from '@/lib/validations/contact'
import type { ApiResponse }          from '@/types'

interface RateLimitRecord { count: number; resetAt: number }
const rateLimitStore = new Map<string, RateLimitRecord>()
const WINDOW = 60 * 60 * 1000  // 1 hour
const MAX    = 10

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

async function forwardToWebhook(data: unknown): Promise<void> {
  const url = process.env.CONTACT_WEBHOOK_URL
  if (!url) return
  await fetch(url, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ ...data as Record<string, unknown>, submittedAt: new Date().toISOString(), source: '5000tomorrow.com/contact' }),
    signal:  AbortSignal.timeout(6000),
  })
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const ip =
    req.headers.get('cf-connecting-ip') ??
    req.headers.get('x-real-ip') ??
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown'

  if (!checkRateLimit(ip)) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Too many messages. Please try again later.' },
      { status: 429 },
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json<ApiResponse>({ success: false, error: 'Invalid request.' }, { status: 400 })
  }

  const result = contactSchema.safeParse(body)
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

  const [err] = await Promise.allSettled([forwardToWebhook(result.data)])
    .then((r) => r.map((x) => (x.status === 'rejected' ? x.reason : null)))

  if (err) {
    console.error('[API /contact] Webhook failed:', err)
    // Still return success — don't block the user if webhook is down
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('[API /contact] Message received:', result.data)
  }

  return NextResponse.json<ApiResponse>({ success: true }, { status: 200 })
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json<ApiResponse>({ success: false, error: 'Method not allowed' }, { status: 405 })
}
