import type { NextConfig } from 'next'

// Bundle analyzer — uncomment to analyze: ANALYZE=true pnpm build
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })

const nextConfig: NextConfig = {

  // ── TypeScript & linting ───────────────────────────────────────────────────
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },

  // ── Image optimization ─────────────────────────────────────────────────────
  images: {
    formats:     ['image/avif', 'image/webp'],
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    imageSizes:  [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      // Add CMS image CDN when connected:
      // { protocol: 'https', hostname: 'images.ctfassets.net' },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // ── HTTP headers (belt-and-suspenders alongside middleware.ts) ─────────────
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options',       value: 'SAMEORIGIN'                       },
          { key: 'X-Content-Type-Options', value: 'nosniff'                          },
          { key: 'Referrer-Policy',        value: 'strict-origin-when-cross-origin'  },
          { key: 'X-DNS-Prefetch-Control', value: 'on'                               },
          { key: 'Permissions-Policy',     value: 'camera=(), microphone=(), geolocation=(self)' },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/fonts/(.*)',
        headers: [
          { key: 'Cache-Control',               value: 'public, max-age=31536000, immutable' },
          { key: 'Access-Control-Allow-Origin',  value: '*'                                   },
        ],
      },
    ]
  },

  // ── Redirects ─────────────────────────────────────────────────────────────
  async redirects() {
    return [
      { source: '/home',         destination: '/',                   permanent: true },
      { source: '/apply-now',    destination: '/apply',              permanent: true },
      { source: '/get-funding',  destination: '/apply',              permanent: true },
      { source: '/thank-you',    destination: '/apply/confirmation', permanent: true },
      { source: '/cities/:city', destination: '/:city-legal-funding', permanent: true },
    ]
  },

  // ── Compiler ──────────────────────────────────────────────────────────────
  compiler: {
    // Strip console.log in production (keep console.error/warn)
    removeConsole: process.env.NODE_ENV === 'production'
      ? { exclude: ['error', 'warn'] }
      : false,
  },

  // ── Performance ───────────────────────────────────────────────────────────
  poweredByHeader: false,
  compress:        true,

}

// export default withBundleAnalyzer(nextConfig)
export default nextConfig
