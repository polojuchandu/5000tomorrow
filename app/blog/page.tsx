import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'

import { SITE } from '@/lib/seo/metadata'
import {
  buildSchemaGraph,
  buildWebPageSchema,
  buildBreadcrumbSchema,
  serializeSchema,
} from '@/lib/seo/schema'
import { PLACEHOLDER_POSTS } from '@/lib/data/posts'

// ISR — revalidate every hour (replace with on-demand revalidation when CMS is connected)
export const revalidate = 3600

export const metadata: Metadata = {
  title:       'Blog | Michigan Pre-Settlement Funding Guides | 5000 Tomorrow',
  description: 'Plain-English guides for Michigan personal injury victims — settlement timelines, pre-settlement funding, Michigan no-fault law, and more.',
  alternates:  { canonical: `${SITE.url}/blog` },
  keywords: [
    'Michigan personal injury blog',
    'pre-settlement funding guides',
    'Michigan lawsuit settlement information',
    'legal funding education Michigan',
  ],
  openGraph: {
    type:        'website',
    locale:      'en_US',
    url:         `${SITE.url}/blog`,
    siteName:    SITE.name,
    title:       'Blog | Michigan Pre-Settlement Funding Guides | 5000 Tomorrow',
    description: 'Plain-English guides for Michigan personal injury victims on pre-settlement funding, settlement timelines, and more.',
    images:      [{ url: `${SITE.url}/images/og/blog.jpg`, width: 1200, height: 630, alt: '5000 Tomorrow Blog', type: 'image/jpeg' }],
  },
  twitter: {
    card:        'summary_large_image',
    site:        SITE.twitter,
    title:       'Blog | Michigan Pre-Settlement Funding Guides | 5000 Tomorrow',
    description: 'Plain-English guides for Michigan injury victims on pre-settlement funding.',
  },
}

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const jsonLd = buildSchemaGraph(
  buildWebPageSchema(
    'Blog — Michigan Pre-Settlement Funding Guides',
    'Educational articles for Michigan personal injury victims about pre-settlement funding, settlement timelines, and more.',
    '/blog',
  ),
  buildBreadcrumbSchema([
    { name: 'Blog', url: '/blog' },
  ]),
)

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeSchema(jsonLd) }}
      />

      <main id="main-content">

        {/* ── Hero ──────────────────────────────────────────────────── */}
        <section
          aria-labelledby="blog-hero-heading"
          className="bg-[#0A1628] py-14 sm:py-18"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-3">
              Education &amp; Resources
            </p>
            <h1
              id="blog-hero-heading"
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
            >
              Michigan Legal Funding Guides
            </h1>
            <p className="text-lg text-slate-300 max-w-xl mx-auto">
              Plain-English articles to help Michigan injury victims understand
              pre-settlement funding, settlement timelines, and their rights.
            </p>
          </div>
        </section>

        {/* ── Post grid ─────────────────────────────────────────────── */}
        <section
          aria-labelledby="posts-heading"
          className="bg-slate-50 py-14 sm:py-18"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 id="posts-heading" className="sr-only">Blog Posts</h2>

            {/* Featured post (first) */}
            {PLACEHOLDER_POSTS[0] && (
              <article
                aria-labelledby="featured-post-heading"
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm mb-8 lg:grid lg:grid-cols-2 items-center"
              >
                <div className="aspect-video bg-slate-200 lg:h-full" aria-hidden="true" />
                <div className="p-6 sm:p-8">
                  {PLACEHOLDER_POSTS[0].category && (
                    <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-3">
                      {PLACEHOLDER_POSTS[0].category}
                    </span>
                  )}
                  <h3
                    id="featured-post-heading"
                    className="text-xl sm:text-2xl font-bold text-[#0A1628] mb-3 leading-snug"
                  >
                    {PLACEHOLDER_POSTS[0].title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-5">
                    {PLACEHOLDER_POSTS[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <time dateTime={PLACEHOLDER_POSTS[0].publishedAt.toISOString()}>
                        {PLACEHOLDER_POSTS[0].publishedAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </time>
                      {PLACEHOLDER_POSTS[0].readingTime && (
                        <span className="flex items-center gap-1">
                          <Clock aria-hidden="true" size={11} />
                          {PLACEHOLDER_POSTS[0].readingTime} min read
                        </span>
                      )}
                    </div>
                    <Link
                      href={`/blog/${PLACEHOLDER_POSTS[0].slug}`}
                      aria-label={`Read: ${PLACEHOLDER_POSTS[0].title}`}
                      data-event="click"
                      data-event-label={`blog_grid_featured_${PLACEHOLDER_POSTS[0].slug}`}
                      data-event-category="navigation"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C9A84C] hover:text-[#0A1628] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded-lg"
                    >
                      Read article
                      <ArrowRight aria-hidden="true" size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            )}

            {/* Post grid (remaining) */}
            <ul
              aria-label="Blog posts"
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {PLACEHOLDER_POSTS.slice(1).map((post) => (
                <li key={post.slug}>
                  <article
                    aria-labelledby={`post-heading-${post.slug}`}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm h-full flex flex-col hover:border-[#C9A84C]/30 hover:shadow-md transition-all duration-200"
                  >
                    <div className="aspect-video bg-slate-200" aria-hidden="true" />
                    <div className="p-5 flex flex-col flex-1">
                      {post.category && (
                        <span className="text-[11px] font-semibold uppercase tracking-widest text-[#C9A84C] mb-2">
                          {post.category}
                        </span>
                      )}
                      <h3
                        id={`post-heading-${post.slug}`}
                        className="text-sm font-bold text-[#0A1628] mb-2 leading-snug"
                      >
                        {post.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed mb-4 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
                        <time
                          dateTime={post.publishedAt.toISOString()}
                          className="text-[11px] text-slate-400"
                        >
                          {post.publishedAt.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </time>
                        <Link
                          href={`/blog/${post.slug}`}
                          aria-label={`Read: ${post.title}`}
                          data-event="click"
                          data-event-label={`blog_grid_${post.slug}`}
                          data-event-category="navigation"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#C9A84C] hover:text-[#0A1628] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded"
                        >
                          Read <ArrowRight aria-hidden="true" size={12} />
                        </Link>
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>

            <p className="mt-10 text-center text-sm text-slate-400">
              More articles coming soon.{' '}
              <Link
                href="/faq"
                className="text-[#C9A84C] hover:underline"
              >
                Browse our FAQ
              </Link>{' '}
              for quick answers.
            </p>
          </div>
        </section>

      </main>
    </>
  )
}
