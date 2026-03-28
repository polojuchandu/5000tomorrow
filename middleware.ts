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
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://www.googleoptimize.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob: https: https://www.google-analytics.com",
    "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://www.facebook.com",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests",
  ].join('; '),
}

// ─── Redirects ────────────────────────────────────────────────────────────────

const REDIRECTS: Record<string, string> = {
  '/home':         '/',
  '/apply-now':    '/apply',
  '/get-funding':  '/apply',
  '/apply-today':  '/apply',
  '/thank-you':    '/apply/confirmation',
}

// ─── Michigan-only geo check ──────────────────────────────────────────────────
// Vercel provides the 'x-vercel-ip-country' and 'x-vercel-ip-country-region' headers.
// Michigan region code is 'MI'. Only enforce on apply routes to avoid false blocks.

const GEO_RESTRICTED_PATHS = ['/apply']

function isOutsideMichigan(req: NextRequest): boolean {
  if (process.env.NODE_ENV !== 'production') return false

  const country = req.headers.get('x-vercel-ip-country')
  const region  = req.headers.get('x-vercel-ip-country-region')

  // Block non-US entirely for apply routes
  if (country && country !== 'US') return true
  // Block US states other than MI for apply routes
  if (country === 'US' && region && region !== 'MI') return true
  return false
}

// ─── Middleware ───────────────────────────────────────────────────────────────

export function middleware(req: NextRequest): NextResponse {
  const { pathname } = req.nextUrl

  // 1. Handle redirects
  const redirectTarget = REDIRECTS[pathname]
  if (redirectTarget) {
    return NextResponse.redirect(new URL(redirectTarget, req.url), { status: 301 })
  }

  // 2. Geo restriction for apply routes
  const isRestrictedPath = GEO_RESTRICTED_PATHS.some((p) => pathname.startsWith(p))
  if (isRestrictedPath && isOutsideMichigan(req)) {
    const response = NextResponse.rewrite(new URL('/michigan-only', req.url))
    for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
      response.headers.set(key, value)
    }
    return response
  }

  // 3. Add security headers to all responses
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
