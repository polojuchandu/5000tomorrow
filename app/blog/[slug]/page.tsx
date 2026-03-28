import { notFound }    from 'next/navigation'
import type { Metadata } from 'next'
import Link              from 'next/link'
import { ArrowLeft, ArrowRight, Clock, Calendar, User } from 'lucide-react'

import { SITE }                              from '@/lib/seo/metadata'
import {
  buildSchemaGraph,
  buildArticleSchema,
  buildBreadcrumbSchema,
  serializeSchema,
}                                            from '@/lib/seo/schema'
import { PLACEHOLDER_POSTS, getPostBySlug, getRelatedPosts } from '@/lib/data/posts'
import ApplyButton                           from '@/components/common/ApplyButton'

// ─── Static params ────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return PLACEHOLDER_POSTS.map((post) => ({ slug: post.slug }))
}

// Unknown slugs → 404 (switch to true when using a CMS with ISR)
export const dynamicParams = false

// ─── Metadata ─────────────────────────────────────────────────────────────────

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post     = getPostBySlug(slug)

  if (!post) return { title: 'Post Not Found' }

  const title       = post.metaTitle        ?? post.title
  const description = post.metaDescription  ?? post.excerpt
  const url         = `${SITE.url}/blog/${post.slug}`
  const image       = post.featuredImage ?? SITE.defaultOgImage

  return {
    title,
    description,
    keywords:   post.tags,
    alternates: { canonical: url },
    openGraph: {
      type:          'article',
      locale:        'en_US',
      url,
      siteName:      SITE.name,
      title,
      description,
      publishedTime: post.publishedAt.toISOString(),
      modifiedTime:  post.updatedAt?.toISOString(),
      authors:       [post.author.name],
      images: [{ url: `${SITE.url}${image}`, width: 1200, height: 630, alt: post.featuredImageAlt ?? title, type: 'image/jpeg' }],
    },
    twitter: {
      card:        'summary_large_image',
      site:        SITE.twitter,
      title,
      description,
      images:      [`${SITE.url}${image}`],
    },
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({ params }: Props) {
  const { slug }   = await params
  const post       = getPostBySlug(slug)

  if (!post) notFound()

  const relatedPosts = getRelatedPosts(slug, 2)

  const jsonLd = buildSchemaGraph(
    buildArticleSchema(post),
    buildBreadcrumbSchema([
      { name: 'Blog',       url: '/blog'              },
      { name: post.title,   url: `/blog/${post.slug}` },
    ]),
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeSchema(jsonLd) }}
      />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-xl focus:bg-[#C9A84C] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-[#0A1628] focus:shadow-lg"
      >
        Skip to main content
      </a>

      <main id="main-content">

        {/* ── Article header ────────────────────────────────────────── */}
        <header className="bg-[#0A1628] py-14 sm:py-18">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 mb-5">
              <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/blog" className="hover:text-slate-300 transition-colors">Blog</Link>
              <span aria-hidden="true">/</span>
              <span className="text-slate-300 truncate max-w-[180px]" aria-current="page">
                {post.title}
              </span>
            </nav>

            {post.category && (
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-3">
                {post.category}
              </span>
            )}

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-snug mb-4">
              {post.title}
            </h1>

            <p className="text-base text-slate-300 leading-relaxed mb-6">{post.excerpt}</p>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <User aria-hidden="true" size={12} className="text-[#C9A84C]" />
                {post.author.name}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar aria-hidden="true" size={12} className="text-[#C9A84C]" />
                <time dateTime={post.publishedAt.toISOString()}>
                  {post.publishedAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
              </span>
              {post.readingTime && (
                <span className="flex items-center gap-1.5">
                  <Clock aria-hidden="true" size={12} className="text-[#C9A84C]" />
                  {post.readingTime} min read
                </span>
              )}
              {post.updatedAt && post.updatedAt > post.publishedAt && (
                <span className="text-slate-500">
                  Updated{' '}
                  <time dateTime={post.updatedAt.toISOString()}>
                    {post.updatedAt.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </time>
                </span>
              )}
            </div>
          </div>
        </header>

        {/* ── Featured image placeholder ─────────────────────────────── */}
        <div aria-hidden="true" className="bg-slate-200 aspect-[2/1] max-h-[400px] w-full" />

        {/* ── Article body ──────────────────────────────────────────── */}
        <div className="bg-white py-12 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">

            {/* Content placeholder */}
            <div
              className="prose prose-slate max-w-none prose-headings:text-[#0A1628] prose-a:text-[#C9A84C] prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl"
              aria-label="Article content"
            >
              {post.content ? (
                // Replace with dangerouslySetInnerHTML or MDX renderer when CMS is connected
                <p>{post.content}</p>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-400">
                  Article content will be loaded from CMS.
                </div>
              )}
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mt-10 pt-6 border-t border-slate-100">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author block */}
            <div className="mt-10 pt-8 border-t border-slate-100 flex items-start gap-4">
              <div
                aria-hidden="true"
                className="w-12 h-12 rounded-full bg-[#0A1628] flex items-center justify-center shrink-0 text-[#C9A84C] font-bold text-sm"
              >
                {post.author.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold text-[#0A1628]">{post.author.name}</p>
                {post.author.title && (
                  <p className="text-xs text-slate-500">{post.author.title}</p>
                )}
                {post.author.bio && (
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{post.author.bio}</p>
                )}
              </div>
            </div>

            {/* Legal disclaimer */}
            <p className="mt-8 text-[11px] text-slate-400 leading-snug">
              This article is for informational purposes only and does not constitute legal or
              financial advice. Pre-settlement funding is not a loan. 5000 Tomorrow serves
              Michigan residents only. Repayment required only upon successful settlement.
              Requires active case with licensed Michigan attorney.
            </p>
          </div>
        </div>

        {/* ── In-article CTA ────────────────────────────────────────── */}
        <section
          aria-label="Apply for pre-settlement funding"
          className="bg-[#0A1628] py-10 sm:py-12"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
            <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-widest mb-2">
              Ready to Apply?
            </p>
            <h2 className="text-xl font-bold text-white mb-2">
              Get Up to $5,000 While Your Case Is Pending
            </h2>
            <p className="text-sm text-slate-300 mb-5">
              No credit check. No upfront fees. Repay only if you win.
            </p>
            <ApplyButton
              size="md"
              label="Apply Now"
              eventLabel={`blog_post_inline_apply_${post.slug}`}
              className="mx-auto"
            />
          </div>
        </section>

        {/* ── Related posts ─────────────────────────────────────────── */}
        {relatedPosts.length > 0 && (
          <section
            aria-labelledby="related-posts-heading"
            className="bg-slate-50 py-12 sm:py-14"
          >
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <h2
                id="related-posts-heading"
                className="text-lg font-bold text-[#0A1628] mb-6"
              >
                Related Articles
              </h2>
              <ul className="grid sm:grid-cols-2 gap-5">
                {relatedPosts.map((related) => (
                  <li key={related.slug}>
                    <article
                      aria-labelledby={`related-${related.slug}`}
                      className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-[#C9A84C]/30 hover:shadow-sm transition-all duration-200"
                    >
                      {related.category && (
                        <span className="text-[11px] font-semibold uppercase tracking-widest text-[#C9A84C] block mb-1.5">
                          {related.category}
                        </span>
                      )}
                      <h3
                        id={`related-${related.slug}`}
                        className="text-sm font-bold text-[#0A1628] mb-2 leading-snug"
                      >
                        {related.title}
                      </h3>
                      <p className="text-xs text-slate-500 mb-3 line-clamp-2 leading-relaxed">
                        {related.excerpt}
                      </p>
                      <Link
                        href={`/blog/${related.slug}`}
                        aria-label={`Read: ${related.title}`}
                        data-event="click"
                        data-event-label={`blog_related_${related.slug}_from_${post.slug}`}
                        data-event-category="navigation"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#C9A84C] hover:text-[#0A1628] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded"
                      >
                        Read article <ArrowRight aria-hidden="true" size={12} />
                      </Link>
                    </article>
                  </li>
                ))}
              </ul>

              <div className="mt-6 text-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-[#0A1628] transition-colors duration-200"
                >
                  <ArrowLeft aria-hidden="true" size={14} />
                  All articles
                </Link>
              </div>
            </div>
          </section>
        )}

      </main>
    </>
  )
}
