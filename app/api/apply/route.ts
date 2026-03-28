import { NextRequest, NextResponse } from 'next/server'
import { fullApplySchema }           from '@/lib/validations/apply'
import { submitToCRM }               from '@/lib/crm/submit'
import { saveSubmission, initDB }    from '@/lib/db/mysql'
import { notifyTeamOfSubmission } from '@/lib/email/send'
import { verifyTurnstileToken } from '@/lib/turnstile/verify'
import { sanitizeObject, SANITIZATION_SCHEMAS } from '@/lib/utils/sanitizer'
import type { ApiResponse, FullApplyFormData } from '@/types'

// ─── In-memory rate limiter (replace with Redis/Upstash in production) ────────

interface RateLimitRecord {
  count:   number
  resetAt: number
}

const rateLimitStore = new Map<string, RateLimitRecord>()

const RATE_LIMIT = {
  window:      60 * 60 * 1000,   // 1 hour
  maxRequests: 5,
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetAt: number } {
  const now   = Date.now()
  const entry = rateLimitStore.get(ip)

  if (!entry || entry.resetAt < now) {
    const resetAt = now + RATE_LIMIT.window
    rateLimitStore.set(ip, { count: 1, resetAt })
    return { allowed: true, remaining: RATE_LIMIT.maxRequests - 1, resetAt }
  }

  if (entry.count >= RATE_LIMIT.maxRequests) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt }
  }

  entry.count++
  return {
    allowed:   true,
    remaining: RATE_LIMIT.maxRequests - entry.count,
    resetAt:   entry.resetAt,
  }
}

// ─── Sanitize input ───────────────────────────────────────────────────────────

function sanitizeLead(data: unknown): FullApplyFormData {
  if (typeof data !== 'object' || data === null) {
    return {} as FullApplyFormData
  }
  // Use the new sanitizer to clean all fields
  return sanitizeObject(data as Record<string, unknown>, SANITIZATION_SCHEMAS.apply) as FullApplyFormData
}

// ─── POST /api/apply ──────────────────────────────────────────────────────────

export async function POST(req: NextRequest): Promise<NextResponse> {
  // 1. Resolve client IP for rate limiting
  const ip =
    req.headers.get('cf-connecting-ip') ??
    req.headers.get('x-real-ip') ??
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown'

  // 2. Rate limit check
  const rateLimit = checkRateLimit(ip)
  const rateLimitHeaders = {
    'X-RateLimit-Limit':     String(RATE_LIMIT.maxRequests),
    'X-RateLimit-Remaining': String(rateLimit.remaining),
    'X-RateLimit-Reset':     String(Math.ceil(rateLimit.resetAt / 1000)),
  }

  if (!rateLimit.allowed) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Too many applications submitted. Please try again in 1 hour.' },
      { status: 429, headers: rateLimitHeaders },
    )
  }

  // 3. Parse request body
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Invalid request format.' },
      { status: 400, headers: rateLimitHeaders },
    )
  }

  // 3.5. Verify Turnstile token
  const bodyObj = body as Record<string, unknown>
  const turnstileToken = bodyObj.turnstileToken as string | undefined
  
  if (!turnstileToken) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'CAPTCHA verification is required.' },
      { status: 422, headers: rateLimitHeaders },
    )
  }

  const isValidToken = await verifyTurnstileToken(turnstileToken)
  if (!isValidToken) {
    console.warn('[API /apply] Invalid Turnstile token')
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'CAPTCHA verification failed. Please try again.' },
      { status: 422, headers: rateLimitHeaders },
    )
  }

  // 4. Validate with Zod
  const parseResult = fullApplySchema.safeParse(body)
  if (!parseResult.success) {
    return NextResponse.json<ApiResponse>(
      {
        success:     false,
        error:       'Please review the highlighted fields.',
        fieldErrors: parseResult.error.flatten().fieldErrors as Record<string, string[]>,
      },
      { status: 422, headers: rateLimitHeaders },
    )
  }

  // 5. Sanitize
  const lead = sanitizeLead(parseResult.data)

  // 6. Michigan belt-and-suspenders validation
  if (lead.state !== 'MI') {
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'We currently only serve Michigan residents.' },
      { status: 422, headers: rateLimitHeaders },
    )
  }

  // 7. Save to database first (required for successful submission)
  let leadId: string | undefined

  // Ensure database is initialized
  try {
    await initDB()
  } catch (error) {
    console.warn('[API /apply] Database initialization failed:', error)
  }

  // Save to database and submit to CRM in parallel (both critical)
  const [dbResult, crmResult] = await Promise.allSettled([
    saveSubmission('apply', lead),
    submitToCRM(lead),
  ])

  // Check if database save succeeded
  if (dbResult.status === 'rejected') {
    console.error('[API /apply] Database save failed:', dbResult.reason)
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Failed to save submission. Please try again.' },
      { status: 500, headers: rateLimitHeaders },
    )
  }

  // Database save succeeded — get submission ID
  const submissionId = dbResult.value

  // CRM submission is optional — log but don't block
  if (crmResult.status === 'fulfilled') {
    leadId = crmResult.value.leadId
  } else {
    console.error('[API /apply] CRM submission failed:', crmResult.reason)
  }

  // Now that database save succeeded, notify team (non-blocking)
  const notifyResult = await notifyTeamOfSubmission('apply', lead)
  
  if (notifyResult instanceof Error) {
    console.warn('[API /apply] Team notification failed:', notifyResult)
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('[API /apply] ✅ Submission complete:', { submissionId, leadId })
  }

  return NextResponse.json<ApiResponse>(
    { success: true, leadId },
    { status: 201, headers: rateLimitHeaders },
  )
}

// ─── Reject non-POST methods ──────────────────────────────────────────────────

export async function GET(): Promise<NextResponse> {
  return NextResponse.json<ApiResponse>(
    { success: false, error: 'Method not allowed' },
    { status: 405, headers: { Allow: 'POST' } },
  )
}
