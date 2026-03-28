import React from 'react'
import { notFound }    from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Car, Truck, Bike, User, Navigation,
  HardHat, AlertTriangle, Building2, Scale,
  ArrowRight,
} from 'lucide-react'

import { CASE_TYPES, getCaseTypeBySlug, caseTypePath } from '@/lib/data/caseTypes'
import { CITIES } from '@/lib/data/cities'
import { SITE } from '@/lib/seo/metadata'
import {
  buildSchemaGraph,
  buildWebPageSchema,
  buildBreadcrumbSchema,
  buildServiceSchema,
  serializeSchema,
} from '@/lib/seo/schema'
import ApplyButton from '@/components/common/ApplyButton'

// ─── Static params ────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return CASE_TYPES.map((caseType) => ({
    caseTypeSlug: caseType.slug,
  }))
}

export const dynamicParams = false

// ─── Metadata ─────────────────────────────────────────────────────────────────

type Props = { params: Promise<{ caseTypeSlug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { caseTypeSlug } = await params
  const caseType = getCaseTypeBySlug(caseTypeSlug)

  if (!caseType) return { title: 'Page Not Found' }

  const url = `${SITE.url}${caseTypePath(caseType.slug)}`
  const title = `${caseType.shortTitle} Pre-Settlement Funding in Michigan | 5000 Tomorrow`
  const description = `${caseType.shortTitle} pre-settlement funding in Michigan. Get up to $5,000 cash advance. No credit check. No upfront fees. Fast approval.`

  return {
    title,
    description,
    keywords: [
      `${caseType.shortTitle.toLowerCase()} funding Michigan`,
      `${caseType.shortTitle.toLowerCase()} pre-settlement funding`,
      `${caseType.shortTitle.toLowerCase()} lawsuit advance Michigan`,
      `${caseType.shortTitle.toLowerCase()} case funding`,
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
          url:    `${SITE.url}/images/og/case-types.jpg`,
          width:  1200,
          height: 630,
          alt:    `${caseType.shortTitle} Pre-Settlement Funding`,
          type:   'image/jpeg',
        },
      ],
    },
    twitter: {
      card:        'summary_large_image',
      site:        SITE.twitter,
      title,
      description,
      images:      [`${SITE.url}/images/og/case-types.jpg`],
    },
  }
}

// ─── Icon map ─────────────────────────────────────────────────────────────────

const iconMap: Record<string, React.ElementType> = {
  'car-accident':        Car,
  'truck-accident':      Truck,
  'motorcycle-accident': Bike,
  'pedestrian-accident': User,
  'rideshare-accident':  Navigation,
  'hit-and-run':         Car,
  'bicycle-accident':    Bike,
  'workers-compensation': HardHat,
  'slip-and-fall':       AlertTriangle,
  'workplace-injury':    HardHat,
  'wrongful-death':      Scale,
  'personal-injury':     Scale,
  'premises-liability':  Building2,
  'other':               Scale,
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function CaseTypePage({ params }: Props) {
  const { caseTypeSlug } = await params
  const caseType = getCaseTypeBySlug(caseTypeSlug)

  if (!caseType) notFound()

  const IconComponent = iconMap[caseType.slug] || Scale

  // Get related case types
  const relatedCaseTypesData = caseType.relatedCaseTypes
    .map((slug) => CASE_TYPES.find((ct) => ct.slug === slug))
    .filter(Boolean) as typeof CASE_TYPES

  // Get common cities
  const relatedCities = caseType.commonCities
    .map((slug) => CITIES.find((city) => city.slug === slug))
    .filter(Boolean)
    .slice(0, 3)

  // ── JSON-LD ────────────────────────────────────────────────────────────────
  const jsonLd = buildSchemaGraph(
    buildWebPageSchema(
      `${caseType.title} in Michigan`,
      caseType.description,
      caseTypePath(caseType.slug),
    ),
    buildBreadcrumbSchema([
      { name: 'Case Types', url: '/case-types' },
      { name: caseType.shortTitle, url: caseTypePath(caseType.slug) },
    ]),
    buildServiceSchema(),
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeSchema(jsonLd) }}
      />

      <main id="main-content">

        {/* ── Hero ──────────────────────────────────────────────────── */}
        <section
          aria-labelledby="case-hero-heading"
          className="bg-[#0A1628] py-14 sm:py-18"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
            <div className="flex justify-center mb-4">
              <IconComponent className="w-16 h-16 text-[#C9A84C]" strokeWidth={1.5} />
            </div>
            <h1
              id="case-hero-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
            >
              {caseType.heroTagline}
            </h1>
            <p className="text-lg text-slate-300 mb-7 max-w-xl mx-auto">
              {caseType.copySnippet}
            </p>
            <ApplyButton
              size="lg"
              label="Apply Now"
              eventLabel={`case_type_hero_apply_${caseType.slug}`}
              className="mx-auto"
            />
          </div>
        </section>

        {/* ── Full Description ──────────────────────────────────────── */}
        <section
          aria-labelledby="case-description-heading"
          className="bg-white py-14 sm:py-18"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2
              id="case-description-heading"
              className="text-2xl sm:text-3xl font-bold text-[#0A1628] mb-6"
            >
              {caseType.shortTitle} Pre-Settlement Funding
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-base text-slate-700 leading-relaxed mb-6">
                {caseType.fullDescription}
              </p>
            </div>

            {/* ── Key Facts ──────────────────────────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 pt-10 border-t border-slate-200">
              {caseType.settlementRange && (
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-[#C9A84C] mb-2">
                    Typical Settlement Range
                  </h3>
                  <p className="text-lg font-bold text-[#0A1628]">
                    {caseType.settlementRange}
                  </p>
                </div>
              )}
              {caseType.timeToSettle && (
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-[#C9A84C] mb-2">
                    Time to Settlement
                  </h3>
                  <p className="text-lg font-bold text-[#0A1628]">
                    {caseType.timeToSettle}
                  </p>
                </div>
              )}
            </div>

            {/* ── Common Injuries ───────────────────────────────────────── */}
            {caseType.commonInjuries.length > 0 && (
              <div className="mt-10 pt-10 border-t border-slate-200">
                <h3 className="text-lg font-bold text-[#0A1628] mb-4">
                  Common Injuries in {caseType.shortTitle} Cases
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {caseType.commonInjuries.map((injury) => (
                    <li key={injury} className="flex items-start">
                      <span className="inline-block w-2 h-2 rounded-full bg-[#C9A84C] mt-2 mr-3 flex-shrink-0" />
                      <span className="text-slate-700">{injury}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* ── Legal Basis ───────────────────────────────────────────── */}
            {caseType.legalBasis && (
              <div className="mt-10 pt-10 border-t border-slate-200">
                <h3 className="text-lg font-bold text-[#0A1628] mb-3">
                  Legal Basis
                </h3>
                <p className="text-slate-700">
                  {caseType.legalBasis}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ── How It Works ──────────────────────────────────────────── */}
        <section
          aria-labelledby="how-it-works-heading"
          className="bg-slate-50 py-14 sm:py-18"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2
              id="how-it-works-heading"
              className="text-2xl sm:text-3xl font-bold text-[#0A1628] mb-10 text-center"
            >
              How {caseType.shortTitle} Funding Works
            </h2>

            <div className="space-y-6">
              {[
                {
                  step: '1',
                  title: 'Apply Online',
                  description:
                    'Fill out our simple form with your case details and your attorney\'s contact information. No credit check required.',
                },
                {
                  step: '2',
                  title: 'Quick Decision',
                  description:
                    'We review your application and contact your attorney to verify your case. Most decisions come back within 24 hours.',
                },
                {
                  step: '3',
                  title: 'Get Funded',
                  description:
                    'Once approved, we transfer up to $5,000 to your account. You can receive funds as soon as the next business day.',
                },
                {
                  step: '4',
                  title: 'Focus on Recovery',
                  description:
                    'Use the funds for medical bills, rent, utilities, and living expenses. Repay only if your case settles or wins.',
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C9A84C] text-[#0A1628] font-bold">
                      {item.step}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0A1628] mb-1">{item.title}</h3>
                    <p className="text-slate-700">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Related Case Types ────────────────────────────────────── */}
        {relatedCaseTypesData.length > 0 && (
          <section
            aria-labelledby="related-cases-heading"
            className="bg-white py-14 sm:py-18"
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2
                id="related-cases-heading"
                className="text-2xl sm:text-3xl font-bold text-[#0A1628] mb-10"
              >
                Related Case Types You May Qualify For
              </h2>

              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedCaseTypesData.map((relatedCase) => {
                  const RelIcon = iconMap[relatedCase.slug] || Scale
                  return (
                    <li
                      key={relatedCase.slug}
                      className="rounded-lg border border-slate-200 bg-slate-50 p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="font-bold text-[#0A1628] flex-1">
                          {relatedCase.shortTitle}
                        </h3>
                        <RelIcon className="w-5 h-5 text-[#C9A84C] flex-shrink-0 ml-2" strokeWidth={1.5} />
                      </div>
                      <p className="text-sm text-slate-600 mb-4">
                        {relatedCase.description}
                      </p>
                      <Link
                        href={caseTypePath(relatedCase.slug)}
                        className="inline-flex items-center text-sm font-semibold text-[#C9A84C] hover:text-[#A68A3F] transition-colors"
                      >
                        Learn more
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </section>
        )}

        {/* ── Cities Served ──────────────────────────────────────────── */}
        {relatedCities.length > 0 && (
          <section
            aria-labelledby="cities-served-heading"
            className="bg-slate-50 py-14 sm:py-18"
          >
            <div className="mx-auto max-w-3xl px-4 sm:px-6">
              <h2
                id="cities-served-heading"
                className="text-2xl sm:text-3xl font-bold text-[#0A1628] mb-10"
              >
                {caseType.shortTitle} Cases in Michigan Cities
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedCities.map((city) => (
                  <div key={city.slug} className="bg-white rounded-lg p-6 border border-slate-200">
                    <h3 className="font-bold text-[#0A1628] mb-2">{city.name}</h3>
                    <p className="text-sm text-slate-600 mb-4">
                      {city.county}
                    </p>
                    <Link
                      href={`/${city.slug}-legal-funding`}
                      className="inline-flex items-center text-sm font-semibold text-[#C9A84C] hover:text-[#A68A3F] transition-colors"
                    >
                      View {city.name} services
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Bottom CTA ────────────────────────────────────────────── */}
        <section
          aria-label={`Apply for ${caseType.shortTitle} funding`}
          className="bg-[#0A1628] py-12 sm:py-16"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-3">
              {caseType.shortTitle}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Ready to Apply?
            </h2>
            <p className="text-slate-300 text-base mb-7 max-w-xl mx-auto">
              It takes 5 minutes. No credit check. No upfront fees.{' '}
              <strong className="text-white">Repay only if your case wins.</strong>
            </p>
            <ApplyButton
              size="lg"
              label={`Apply for ${caseType.shortTitle} Funding`}
              eventLabel={`case_type_bottom_cta_apply_${caseType.slug}`}
              className="mx-auto"
            />
            <p className="mt-4 text-[11px] text-slate-500">
              Pre-settlement funding is not a loan. Requires active case with licensed Michigan attorney.
            </p>
          </div>
        </section>

      </main>
    </>
  )
}
