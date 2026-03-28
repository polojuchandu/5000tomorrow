import type { MetadataRoute } from 'next'

const SITE_URL = 'https://www.5000tomorrow.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ── Primary: allow all well-behaved crawlers ────────────────
      {
        userAgent: '*',
        allow:     '/',
        disallow: [
          '/api/',              // server routes — never index
          '/apply/confirmation',// thank-you page — low-value duplicate
          '/_next/',            // Next.js internals
          '/admin/',            // reserved for future admin panel
          '/*?*',               // strip query-string variants (avoids duplicate content)
        ],
      },

      // ── GPTBot (OpenAI) — disallow training data collection ─────
      {
        userAgent: 'GPTBot',
        disallow:  ['/'],
      },

      // ── Google-Extended (Bard/Gemini) — disallow training ───────
      {
        userAgent: 'Google-Extended',
        disallow:  ['/'],
      },

      // ── CCBot (Common Crawl — used for AI training sets) ────────
      {
        userAgent: 'CCBot',
        disallow:  ['/'],
      },

      // ── PerplexityBot — disallow ─────────────────────────────────
      {
        userAgent: 'PerplexityBot',
        disallow:  ['/'],
      },
    ],

    sitemap: `${SITE_URL}/sitemap.xml`,

    // Crawl-delay hint (respected by some crawlers, not Google)
    // Note: Next.js MetadataRoute.Robots doesn't expose crawlDelay natively;
    // add to the raw header via middleware if needed.
  }
}
