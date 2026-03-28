import { notFound }    from 'next/navigation'
import type { Metadata } from 'next'

import { CITIES, getCityBySlug, cityPath } from '@/lib/data/cities'
import { SITE }                             from '@/lib/seo/metadata'
import {
  buildCityPageSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildSchemaGraph,
  serializeSchema,
}                                           from '@/lib/seo/schema'

import CityHero          from '@/components/cities/CityHero'
import CityTrustSection  from '@/components/cities/CityTrustSection'
import CityFAQ           from '@/components/cities/CityFAQ'
import CityInternalLinks from '@/components/cities/CityInternalLinks'
import ApplyButton       from '@/components/common/ApplyButton'

// ─── Static params — all 9 cities ────────────────────────────────────────────

export function generateStaticParams() {
  return CITIES.map((city) => ({
    citySlug: `${city.slug}-legal-funding`,
  }))
}

// Only pre-rendered slugs are valid; everything else → 404
export const dynamicParams = false

// ─── Metadata ─────────────────────────────────────────────────────────────────

type Props = { params: Promise<{ citySlug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { citySlug } = await params
  const slug         = citySlug.replace(/-legal-funding$/, '')
  const city         = getCityBySlug(slug)

  if (!city) return { title: 'Page Not Found' }

  const url         = `${SITE.url}${cityPath(city.slug)}`
  const title       = `Pre-Settlement Legal Funding in ${city.name}, MI | 5000 Tomorrow`
  const description = `${city.name} residents: get up to $5,000 in pre-settlement funding for your personal injury case. No credit check. No upfront fees. Repay only if you win. Must have an active case with a licensed Michigan attorney.`

  return {
    title,
    description,
    keywords: [
      `pre-settlement funding ${city.name}`,
      `legal funding ${city.name} Michigan`,
      `lawsuit funding ${city.name}`,
      `settlement advance ${city.name}`,
      `${city.name} personal injury funding`,
      `${city.county} pre-settlement funding`,
    ],
    alternates: { canonical: url },
    openGraph: {
      type:        'website',
      locale:      'en_US',
      url,
      siteName:    SITE.name,
      title,
      description,
      images: [
        {
          url:    `${SITE.url}/images/og/michigan-legal-funding.jpg`,
          width:  1200,
          height: 630,
          alt:    `Pre-Settlement Legal Funding in ${city.name}, Michigan`,
          type:   'image/jpeg',
        },
      ],
    },
    twitter: {
      card:        'summary_large_image',
      site:        SITE.twitter,
      title,
      description,
      images:      [`${SITE.url}/images/og/michigan-legal-funding.jpg`],
    },
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function CityLandingPage({ params }: Props) {
  const { citySlug } = await params
  const slug         = citySlug.replace(/-legal-funding$/, '')
  const city         = getCityBySlug(slug)

  if (!city) notFound()

  // ── JSON-LD ──────────────────────────────────────────────────────────────
  const cityLocalBusiness = buildCityPageSchema({
    slug:        city.slug,
    name:        city.name,
    county:      city.county,
  })

  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Michigan Pre-Settlement Funding', url: '/'                   },
    { name: 'Cities',                          url: '/cities'             },
    { name: `${city.name}, MI`,                url: cityPath(city.slug)  },
  ])

  // Build city-specific FAQ schema from the same questions CityFAQ renders
  const faqSchema = buildFAQSchema([
    {
      question: `Do you provide pre-settlement funding in ${city.name}, Michigan?`,
      answer:   `Yes. 5000 Tomorrow serves ${city.name} residents and all of ${city.county}. If you have an active personal injury case with a licensed Michigan attorney, you may qualify for up to $5,000 in pre-settlement funding — regardless of your credit score.`,
    },
    {
      question: `How quickly can ${city.name} residents get funded?`,
      answer:   `Most ${city.name} applicants receive a decision within 24 hours of submitting their application. Funds are typically transferred within another 24 hours, often the same business day.`,
    },
    {
      question: `Is pre-settlement funding a loan?`,
      answer:   `No. Pre-settlement funding is not a loan. It is a non-recourse cash advance against your expected settlement. There are no monthly payments, no interest, no credit check, and no repayment if your case doesn't win.`,
    },
    {
      question: `Do I need a Michigan attorney to qualify in ${city.name}?`,
      answer:   `Yes. An active case represented by a licensed Michigan attorney is required. We work directly with your attorney to evaluate your case and determine the funding amount.`,
    },
    {
      question: `What if my ${city.name} case doesn't settle or I lose?`,
      answer:   `If your case is lost or dismissed, you owe us nothing. Pre-settlement funding is non-recourse — your personal assets and credit are never at risk.`,
    },
  ])

  const jsonLd = buildSchemaGraph(cityLocalBusiness, breadcrumb, faqSchema)

  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeSchema(jsonLd) }}
      />

      <main id="main-content">

        {/* 1. Hero — city name + unique copy + CTA */}
        <CityHero city={city} />

        {/* 2. How it works + trust metrics */}
        <CityTrustSection city={city} />

        {/* 3. City-specific FAQ */}
        <CityFAQ city={city} />

        {/* 4. Bottom CTA band */}
        <section
          aria-label={`Apply for pre-settlement funding in ${city.name}`}
          className="bg-[#0A1628] py-12 sm:py-16"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-3">
              {city.name}, Michigan
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Ready to Apply?
            </h2>
            <p className="text-slate-300 text-base mb-7 max-w-xl mx-auto">
              It takes 5 minutes. No credit check. No upfront fees.{' '}
              <strong className="text-white">Repay only if your case wins.</strong>
            </p>
            <ApplyButton
              href={`/apply?city=${city.slug}`}
              size="lg"
              label={`Apply Now — ${city.name} Residents`}
              eventLabel={`city_bottom_cta_apply_${city.slug}`}
              className="mx-auto"
            />
            <p className="mt-4 text-[11px] text-slate-500">
              Pre-settlement funding is not a loan. Requires active case with licensed Michigan attorney.
            </p>
          </div>
        </section>

        {/* 5. Internal links — 3 related cities + relevant case type pages */}
        <CityInternalLinks city={city} />

      </main>
    </>
  )
}
