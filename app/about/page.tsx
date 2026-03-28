import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, MapPin, Users, Clock, Star, CheckCircle } from 'lucide-react'

import { SITE } from '@/lib/seo/metadata'
import {
  buildSchemaGraph,
  buildOrganizationSchema,
  buildWebPageSchema,
  buildBreadcrumbSchema,
  serializeSchema,
} from '@/lib/seo/schema'
import ApplyButton from '@/components/common/ApplyButton'

export const metadata: Metadata = {
  title:       'About 5000 Tomorrow | Michigan Pre-Settlement Legal Funding',
  description: 'Learn about 5000 Tomorrow — Michigan\'s trusted pre-settlement legal funding company. We help injury victims access up to $5,000 while their case is pending. No credit check. Non-recourse.',
  alternates:  { canonical: `${SITE.url}/about` },
  keywords: [
    'about 5000 tomorrow',
    'Michigan legal funding company',
    'pre-settlement funding Michigan',
    'lawsuit advance Michigan',
  ],
  openGraph: {
    type:        'website',
    locale:      'en_US',
    url:         `${SITE.url}/about`,
    siteName:    SITE.name,
    title:       'About 5000 Tomorrow | Michigan Pre-Settlement Legal Funding',
    description: 'Michigan\'s trusted pre-settlement legal funding company. Up to $5,000 for injury victims. No credit check. Non-recourse.',
    images:      [{ url: `${SITE.url}/images/og/about.jpg`, width: 1200, height: 630, alt: 'About 5000 Tomorrow', type: 'image/jpeg' }],
  },
  twitter: {
    card:        'summary_large_image',
    site:        SITE.twitter,
    title:       'About 5000 Tomorrow | Michigan Pre-Settlement Legal Funding',
    description: 'Michigan\'s trusted pre-settlement legal funding company. Non-recourse. No credit check.',
    images:      [`${SITE.url}/images/og/about.jpg`],
  },
}

// ─── E-E-A-T Trust Signals ────────────────────────────────────────────────────

const TRUST_SIGNALS = [
  {
    icon:  Users,
    value: '500+',
    label: 'Michigan Families Helped',
  },
  {
    icon:  Star,
    value: '4.9',
    label: 'Average Client Rating',
  },
  {
    icon:  Clock,
    value: '< 24 hrs',
    label: 'Typical Approval Time',
  },
  {
    icon:  MapPin,
    value: '83',
    label: 'Michigan Counties Served',
  },
]

// ─── Core values ─────────────────────────────────────────────────────────────

const VALUES = [
  {
    icon:  Shield,
    title: 'Non-Predatory by Design',
    body:  'Pre-settlement funding should never trap people in debt. We charge a funding fee only if your case wins — period. If you lose, you owe nothing. Your financial stability is never at risk.',
  },
  {
    icon:  CheckCircle,
    title: 'Transparency First',
    body:  'All fees are disclosed in writing before you accept any funding. No hidden charges. No origination fees. No fine print surprises. You\'ll know exactly what the advance costs before you sign.',
  },
  {
    icon:  MapPin,
    title: 'Michigan-Only Focus',
    body:  'We serve Michigan exclusively. That means deep familiarity with Michigan court timelines, Michigan no-fault insurance, and the attorney community serving Michigan injury victims.',
  },
  {
    icon:  Users,
    title: 'Attorney Partnership',
    body:  'We work with — not around — your attorney. Our review process is collaborative, transparent, and designed to respect the attorney-client relationship at every step.',
  },
]

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const jsonLd = buildSchemaGraph(
  buildOrganizationSchema(),
  buildWebPageSchema(
    'About 5000 Tomorrow',
    'Michigan\'s trusted pre-settlement legal funding company helping injury victims access up to $5,000 while their case is pending.',
    '/about',
  ),
  buildBreadcrumbSchema([
    { name: 'About', url: '/about' },
  ]),
)

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
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

        {/* ── Hero ──────────────────────────────────────────────────── */}
        <section
          aria-labelledby="about-hero-heading"
          className="bg-[#0A1628] py-14 sm:py-20"
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-3">
              Our Mission
            </p>
            <h1
              id="about-hero-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5"
            >
              Built for Michigan Injury Victims
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
              We exist because personal injury cases take too long — and families can't always
              wait 12–36 months for their settlement. 5000 Tomorrow bridges that gap.
            </p>
          </div>
        </section>

        {/* ── Trust metrics ─────────────────────────────────────────── */}
        <section
          aria-label="Company statistics"
          className="bg-white py-12 sm:py-16 border-b border-slate-100"
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <dl
              aria-label="5000 Tomorrow key metrics"
              className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {TRUST_SIGNALS.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  role="group"
                  className="text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center mx-auto mb-3">
                    <Icon aria-hidden="true" size={20} className="text-[#C9A84C]" />
                  </div>
                  <dt className="text-3xl font-extrabold text-[#0A1628] tabular-nums mb-1">{value}</dt>
                  <dd className="text-xs text-slate-500 leading-snug">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Our Story ─────────────────────────────────────────────── */}
        <section
          aria-labelledby="story-heading"
          className="bg-slate-50 py-14 sm:py-20"
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-2">
                  Our Story
                </p>
                <h2
                  id="story-heading"
                  className="text-2xl sm:text-3xl font-bold text-[#0A1628] mb-5"
                >
                  Why We Started
                </h2>
                <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    We started 5000 Tomorrow after seeing too many Michigan families make desperate
                    financial decisions while waiting for their personal injury cases to resolve.
                    Settlement timelines in Michigan — especially in Wayne, Oakland, and Macomb counties
                    — routinely stretch 18 months or longer.
                  </p>
                  <p>
                    In that time, people fall behind on rent, take out high-interest payday loans, or
                    settle their cases too early just to get cash. We built 5000 Tomorrow as a
                    better alternative: non-recourse funding that doesn't put families at risk.
                  </p>
                  <p>
                    Our maximum advance is $5,000 — not coincidentally our name. That's enough to
                    cover a month or two of critical expenses while your case progresses. It's
                    designed to stabilize, not speculate.
                  </p>
                </div>
              </div>

              {/* Michigan focus card */}
              <div className="rounded-2xl bg-[#0A1628] p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-3">
                  Michigan Only
                </p>
                <h3 className="text-xl font-bold text-white mb-4">
                  Why We Only Serve Michigan
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-5">
                  Michigan's legal landscape is unlike any other state. The 2019 no-fault insurance
                  reforms, the complexity of dram shop liability, and the volume of auto accident
                  litigation in metro Detroit require specialized knowledge.
                </p>
                <p className="text-sm text-slate-300 leading-relaxed mb-5">
                  By serving only Michigan, we can build real relationships with Michigan attorneys,
                  understand local court timelines, and evaluate cases with the context that national
                  companies simply don't have.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Wayne County', 'Oakland County', 'Macomb County', 'Kent County', 'Genesee County', 'Ingham County'].map((county) => (
                    <span
                      key={county}
                      className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300"
                    >
                      <MapPin aria-hidden="true" size={10} className="text-[#C9A84C]" />
                      {county}
                    </span>
                  ))}
                  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-400">
                    + 77 more
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Core Values ───────────────────────────────────────────── */}
        <section
          aria-labelledby="values-heading"
          className="bg-white py-14 sm:py-18"
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-2">
                How We Operate
              </p>
              <h2
                id="values-heading"
                className="text-2xl sm:text-3xl font-bold text-[#0A1628]"
              >
                Our Commitments
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {VALUES.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-slate-200 p-6 bg-slate-50"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center mb-4">
                    <Icon aria-hidden="true" size={18} className="text-[#C9A84C]" />
                  </div>
                  <h3 className="text-base font-bold text-[#0A1628] mb-2">{title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ────────────────────────────────────────────── */}
        <section
          aria-label="Apply for pre-settlement funding"
          className="bg-[#0A1628] py-12 sm:py-16"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-3">
              Ready to Apply?
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Up to $5,000. No Credit Check. No Upfront Fees.
            </h2>
            <p className="text-slate-300 text-base mb-7 max-w-xl mx-auto">
              If you have an active personal injury case with a Michigan attorney,
              you may qualify. Apply in 5 minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <ApplyButton
                size="lg"
                label="Apply Now"
                eventLabel="about_bottom_apply"
                className="mx-auto sm:mx-0"
              />
              <Link
                href="/how-it-works"
                data-event="click"
                data-event-label="about_bottom_how_it_works"
                data-event-category="navigation"
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded-lg"
              >
                See how it works →
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  )
}
