import { NextRequest, NextResponse } from 'next/server'
import { fullApplySchema }           from '@/lib/validations/apply'
import { submitToCRM }               from '@/lib/crm/submit'
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

// ─── Sanitize string fields ───────────────────────────────────────────────────

function sanitizeString(val: unknown): string | undefined {
  if (typeof val !== 'string') return undefined
  return val.trim().slice(0, 2000)
}

function sanitizeLead(data: FullApplyFormData): FullApplyFormData {
  return {
    ...data,
    incidentDescription: sanitizeString(data.incidentDescription) ?? '',
    injuryDescription:   sanitizeString(data.injuryDescription)   ?? '',
    attorneyFirstName:   sanitizeString(data.attorneyFirstName)   ?? '',
    attorneyLastName:    sanitizeString(data.attorneyLastName)    ?? '',
    attorneyFirm:        sanitizeString(data.attorneyFirm)        ?? '',
    attorneyEmail:       sanitizeString(data.attorneyEmail),
    firstName:           sanitizeString(data.firstName)           ?? '',
    lastName:            sanitizeString(data.lastName)            ?? '',
    streetAddress:       sanitizeString(data.streetAddress),
    city:                sanitizeString(data.city)                ?? '',
    heardAboutUs:        sanitizeString(data.heardAboutUs),
  }
}

// ─── Notification stub ────────────────────────────────────────────────────────

async function sendConfirmation(lead: FullApplyFormData): Promise<void> {
  // TODO: Send applicant a confirmation email via Resend/SendGrid
  // await resend.emails.send({
  //   to:      lead.email,
  //   from:    'no-reply@5000tomorrow.com',
  //   subject: 'We received your application — 5000 Tomorrow',
  //   react:   ConfirmationEmailTemplate({ firstName: lead.firstName }),
  // })

  if (process.env.NODE_ENV === 'development') {
    console.log('[API /apply] 📧 Confirmation sent to:', lead.email)
  }
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

  // 7. Submit to CRM + send confirmation (failures don't block the user)
  let leadId: string | undefined

  const [crmResult, confirmResult] = await Promise.allSettled([
    submitToCRM(lead),
    sendConfirmation(lead),
  ])

  if (crmResult.status === 'fulfilled') {
    leadId = crmResult.value.leadId
  } else {
    console.error('[API /apply] CRM submission failed:', crmResult.reason)
    // Log and continue — don't block the user
  }

  if (confirmResult.status === 'rejected') {
    console.error('[API /apply] Confirmation email failed:', confirmResult.reason)
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
