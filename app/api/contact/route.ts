import { NextRequest, NextResponse } from 'next/server'
import { contactSchema }             from '@/lib/validations/contact'
import { saveSubmission, initDB }    from '@/lib/db/mysql'
import { notifyTeamOfSubmission } from '@/lib/email/send'
import { verifyTurnstileToken } from '@/lib/turnstile/verify'
import { sanitizeObject, SANITIZATION_SCHEMAS } from '@/lib/utils/sanitizer'
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

  // Extract and verify Turnstile token
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
    console.warn('[API /contact] Invalid Turnstile token')
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'CAPTCHA verification failed. Please try again.' },
      { status: 422 },
    )
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

  const sanitizedData = sanitizeObject(result.data as Record<string, unknown>, SANITIZATION_SCHEMAS.contact)

  // Ensure database is initialized
  try {
    await initDB()
  } catch (error) {
    console.warn('[API /contact] Database initialization failed:', error)
  }

  // Save to database and forward webhook in parallel
  const [dbResult, webhookResult] = await Promise.allSettled([
    saveSubmission('contact', sanitizedData),
    forwardToWebhook(sanitizedData),
  ])

  // Check if database save succeeded
  if (dbResult.status === 'rejected') {
    console.error('[API /contact] Database save failed:', dbResult.reason)
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Failed to save message. Please try again.' },
      { status: 500 },
    )
  }

  // Database save succeeded
  const submissionId = dbResult.value

  // Webhook is optional — log but don't block
  if (webhookResult.status === 'rejected') {
    console.warn('[API /contact] Webhook failed:', webhookResult.reason)
  }

  // Now that database save succeeded, notify team (non-blocking)
  const notifyResult = await notifyTeamOfSubmission('contact', sanitizedData)
  
  if (notifyResult instanceof Error) {
    console.warn('[API /contact] Team notification failed:', notifyResult)
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('[API /contact] ✅ Message saved and confirmation sent:', submissionId)
  }

  return NextResponse.json<ApiResponse>({ success: true }, { status: 200 })
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json<ApiResponse>({ success: false, error: 'Method not allowed' }, { status: 405 })
}
