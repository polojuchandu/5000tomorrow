import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Car, Truck, Bike, User, Navigation,
  HardHat, AlertTriangle, Building2, Scale,
  ArrowRight,
} from 'lucide-react'

import { CASE_TYPES, caseTypePath } from '@/lib/data/caseTypes'
import { SITE } from '@/lib/seo/metadata'
import {
  buildSchemaGraph,
  buildWebPageSchema,
  buildBreadcrumbSchema,
  buildServiceSchema,
  serializeSchema,
} from '@/lib/seo/schema'
import ApplyButton from '@/components/common/ApplyButton'

export const metadata: Metadata = {
  title:       'Case Types We Fund | Pre-Settlement Funding in Michigan | 5000 Tomorrow',
  description: 'Explore all personal injury case types eligible for pre-settlement funding in Michigan. Car accidents, slip & fall, workers\' comp, wrongful death, and more. Up to $5,000.',
  alternates:  { canonical: `${SITE.url}/case-types` },
  keywords: [
    'Michigan personal injury funding',
    'car accident funding Michigan',
    'workers comp funding Michigan',
    'lawsuit advance Michigan case types',
  ],
  openGraph: {
    type:        'website',
    locale:      'en_US',
    url:         `${SITE.url}/case-types`,
    siteName:    SITE.name,
    title:       'Case Types We Fund | Michigan Pre-Settlement Funding | 5000 Tomorrow',
    description: 'All personal injury case types eligible for pre-settlement funding in Michigan. Up to $5,000. No credit check.',
    images:      [{ url: `${SITE.url}/images/og/case-types.jpg`, width: 1200, height: 630, alt: 'Michigan Personal Injury Case Types', type: 'image/jpeg' }],
  },
  twitter: {
    card:        'summary_large_image',
    site:        SITE.twitter,
    title:       'Case Types We Fund | Michigan Pre-Settlement Funding | 5000 Tomorrow',
    description: 'All MI personal injury case types eligible for pre-settlement funding. Up to $5,000.',
  },
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

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const jsonLd = buildSchemaGraph(
  buildWebPageSchema(
    'Personal Injury Case Types We Fund in Michigan',
    'All personal injury case types eligible for pre-settlement legal funding in Michigan. Up to $5,000 non-recourse advance.',
    '/cases',
  ),
  buildBreadcrumbSchema([
    { name: 'Case Types', url: '/case-types' },
  ]),
  buildServiceSchema(),
)

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CaseTypesPage() {
  const primaryCases   = CASE_TYPES.filter((c) => c.isPrimary)
  const secondaryCases = CASE_TYPES.filter((c) => !c.isPrimary)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeSchema(jsonLd) }}
      />

      <main id="main-content">

        {/* ── Hero ──────────────────────────────────────────────────── */}
        <section
          aria-labelledby="cases-hero-heading"
          className="bg-[#0A1628] py-14 sm:py-18"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-3">
              Qualifying Cases
            </p>
            <h1
              id="cases-hero-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
            >
              Cases We Fund in Michigan
            </h1>
            <p className="text-lg text-slate-300 mb-7 max-w-xl mx-auto">
              We fund 14 personal injury case types across Michigan. If your case isn't listed,
              call us — we evaluate every situation individually.
            </p>
            <ApplyButton
              size="lg"
              label="Apply Now"
              eventLabel="cases_hero_apply"
              className="mx-auto"
            />
          </div>
        </section>

        {/* ── Primary cases ─────────────────────────────────────────── */}
        <section
          aria-labelledby="primary-cases-heading"
          className="bg-white py-14 sm:py-18"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-2">
                Most Common
              </p>
              <h2
                id="primary-cases-heading"
                className="text-2xl sm:text-3xl font-bold text-[#0A1628]"
              >
                Primary Case Types
              </h2>
            </div>

            <ul
              aria-label="Primary case types we fund"
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {primaryCases.map(({ slug, title, description }) => (
                <li key={slug}>
                  <Link
                    href={caseTypePath(slug as any)}
                    aria-label={`${title} pre-settlement funding in Michigan`}
                    data-event="click"
                    data-event-label={`cases_grid_${slug}`}
                    data-event-category="navigation"
                    className="group flex flex-col h-full rounded-2xl border border-slate-200 bg-white p-5 hover:border-[#C9A84C]/40 hover:shadow-md transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#0A1628]/5 group-hover:bg-[#C9A84C]/10 flex items-center justify-center mb-4 transition-colors duration-200">
                      {iconMap[slug] && React.createElement(iconMap[slug], {
                        'aria-hidden': 'true',
                        size: 20,
                        className: 'text-[#0A1628] group-hover:text-[#C9A84C] transition-colors duration-200',
                      })}
                    </div>
                    <h3 className="text-sm font-bold text-[#0A1628] mb-2">{title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed flex-1">{description}</p>
                    <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#C9A84C] group-hover:text-[#0A1628] transition-colors duration-200">
                      Learn more
                      <ArrowRight aria-hidden="true" size={12} />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Secondary cases ───────────────────────────────────────── */}
        <section
          aria-labelledby="secondary-cases-heading"
          className="bg-slate-50 py-14 sm:py-18"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-2">
                Also Funded
              </p>
              <h2
                id="secondary-cases-heading"
                className="text-2xl sm:text-3xl font-bold text-[#0A1628]"
              >
                Additional Case Types
              </h2>
            </div>

            <ul
              aria-label="Additional case types we fund"
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {secondaryCases.map(({ slug, title, description }) => (
                <li key={slug}>
                  <Link
                    href={caseTypePath(slug as any)}
                    aria-label={`${title} pre-settlement funding in Michigan`}
                    data-event="click"
                    data-event-label={`cases_grid_secondary_${slug}`}
                    data-event-category="navigation"
                    className="group flex flex-col h-full rounded-2xl border border-slate-200 bg-white p-5 hover:border-[#C9A84C]/40 hover:shadow-sm transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#0A1628]/5 group-hover:bg-[#C9A84C]/10 flex items-center justify-center mb-4 transition-colors duration-200">
                      {iconMap[slug] && React.createElement(iconMap[slug], {
                        'aria-hidden': 'true',
                        size: 20,
                        className: 'text-[#0A1628] group-hover:text-[#C9A84C] transition-colors duration-200',
                      })}
                    </div>
                    <h3 className="text-sm font-bold text-[#0A1628] mb-2">{title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed flex-1">{description}</p>
                    <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-slate-400 group-hover:text-[#C9A84C] transition-colors duration-200">
                      Learn more
                      <ArrowRight aria-hidden="true" size={12} />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Bottom CTA ────────────────────────────────────────────── */}
        <section
          aria-label="Apply for pre-settlement funding"
          className="bg-[#0A1628] py-12 sm:py-16"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Your Case Type Isn't Listed?
            </h2>
            <p className="text-slate-300 text-base mb-7 max-w-xl mx-auto">
              We evaluate every Michigan personal injury case individually. If you have an
              active case and a licensed attorney, apply and we'll review it.
            </p>
            <ApplyButton
              size="lg"
              label="Apply Anyway — We'll Evaluate"
              eventLabel="cases_bottom_apply"
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
