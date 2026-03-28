import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// ─── Security headers ─────────────────────────────────────────────────────────

const SECURITY_HEADERS: Record<string, string> = {
  'X-Frame-Options':           'SAMEORIGIN',
  'X-Content-Type-Options':    'nosniff',
  'Referrer-Policy':           'strict-origin-when-cross-origin',
  'Permissions-Policy':        'camera=(), microphone=(), geolocation=(self), interest-cohort=()',
  'X-DNS-Prefetch-Control':    'on',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'Content-Security-Policy':   [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://www.googleoptimize.com https://challenges.cloudflare.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob: https: https://www.google-analytics.com",
    "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://www.facebook.com https://challenges.cloudflare.com",
    "frame-src https://challenges.cloudflare.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; '),
}

// ─── Redirects ────────────────────────────────────────────────────────────────

const REDIRECTS: Record<string, string> = {
  '/home':         '/',
  '/apply-now':    '/apply',
  '/get-funding':  '/apply',
  '/apply-today':  '/apply',
  '/thank-you':    '/apply/confirmation',
  '/cities':       '/',
}

// ─── Middleware ───────────────────────────────────────────────────────────────

export function middleware(req: NextRequest): NextResponse {
  const { pathname } = req.nextUrl

  // 1. Handle redirects
  const redirectTarget = REDIRECTS[pathname]
  if (redirectTarget) {
    return NextResponse.redirect(new URL(redirectTarget, req.url), { status: 301 })
  }

  // 2. Add security headers to all responses
  const response = NextResponse.next()
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value)
  }

  return response
}

// ─── Matcher ──────────────────────────────────────────────────────────────────

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - Public folder assets (images, fonts, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|images/|fonts/).*)',
  ],
}
