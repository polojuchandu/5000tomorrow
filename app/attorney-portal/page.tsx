import type { Metadata } from 'next'
import Link from 'next/link'
import { Scale, Clock, Shield, CheckCircle, Phone } from 'lucide-react'

import { SITE } from '@/lib/seo/metadata'
import {
  buildSchemaGraph,
  buildWebPageSchema,
  buildBreadcrumbSchema,
  buildOrganizationSchema,
  serializeSchema,
} from '@/lib/seo/schema'
import AttorneyReferralForm from '@/components/forms/AttorneyReferralForm'

export const metadata: Metadata = {
  title:       'Attorney Portal | Refer Clients for Pre-Settlement Funding | 5000 Tomorrow',
  description: 'Licensed Michigan attorneys: refer clients for up to $5,000 in pre-settlement funding. Fast decisions, no client risk, fully transparent process. Partner with 5000 Tomorrow.',
  alternates:  { canonical: `${SITE.url}/attorney-portal` },
  keywords: [
    'attorney referral pre-settlement funding Michigan',
    'lawsuit funding attorney partner Michigan',
    'attorney portal legal funding',
    'refer clients settlement advance Michigan',
  ],
  openGraph: {
    type:        'website',
    locale:      'en_US',
    url:         `${SITE.url}/attorney-portal`,
    siteName:    SITE.name,
    title:       'Attorney Portal | Refer Clients for Pre-Settlement Funding | 5000 Tomorrow',
    description: 'Michigan attorneys: refer clients for up to $5,000 in pre-settlement funding. Fast, transparent, non-predatory.',
    images:      [{ url: `${SITE.url}/images/og/attorney-portal.jpg`, width: 1200, height: 630, alt: 'Attorney Portal — 5000 Tomorrow', type: 'image/jpeg' }],
  },
  twitter: {
    card:        'summary_large_image',
    site:        SITE.twitter,
    title:       'Attorney Portal | 5000 Tomorrow Michigan Legal Funding',
    description: 'Michigan attorneys: refer clients for pre-settlement funding. Fast, transparent, non-predatory.',
  },
}

// ─── Attorney benefits ────────────────────────────────────────────────────────

const BENEFITS = [
  {
    icon:  Clock,
    title: 'Fast Case Review',
    body:  'Our team evaluates cases quickly — typically the same business day you submit the referral. We\'ll call or email with a decision.',
  },
  {
    icon:  Shield,
    title: 'No Risk to Your Client',
    body:  'Our funding is strictly non-recourse. If your client\'s case doesn\'t win, they owe nothing. Their credit, assets, and savings are never at risk.',
  },
  {
    icon:  Scale,
    title: 'Full Transparency',
    body:  'All fees are disclosed upfront in writing before your client accepts anything. No surprises, no hidden charges, no predatory practices.',
  },
  {
    icon:  CheckCircle,
    title: 'Michigan-Specific',
    body:  'We understand Michigan court timelines, no-fault insurance complexity, and the local PI attorney community. You\'ll work with people who know your cases.',
  },
]

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const jsonLd = buildSchemaGraph(
  buildOrganizationSchema(),
  buildWebPageSchema(
    'Attorney Portal — Refer Clients for Pre-Settlement Funding',
    'Licensed Michigan attorneys can refer clients for up to $5,000 in non-recourse pre-settlement funding.',
    '/attorney-portal',
  ),
  buildBreadcrumbSchema([
    { name: 'Attorney Portal', url: '/attorney-portal' },
  ]),
)

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AttorneyPortalPage() {
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
          aria-labelledby="attorney-hero-heading"
          className="bg-[#0A1628] py-14 sm:py-18"
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-3">
              For Michigan Attorneys
            </p>
            <h1
              id="attorney-hero-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
            >
              Refer Clients for Pre-Settlement Funding
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-6">
              Help your clients stay financially stable while their case is pending.
              5000 Tomorrow provides up to $5,000 — non-recourse, transparent, Michigan-only.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#referral-form"
                data-event="click"
                data-event-label="attorney_hero_referral_cta"
                data-event-category="attorney"
                className="inline-flex items-center justify-center min-h-[44px] px-6 rounded-xl bg-[#C9A84C] text-[#0A1628] font-bold text-sm hover:bg-[#b89238] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Submit a Referral
              </a>
              <Link
                href={`tel:${SITE.phoneE164}`}
                aria-label={`Call 5000 Tomorrow at ${SITE.phone}`}
                data-event="click"
                data-event-label="attorney_hero_phone_cta"
                data-event-category="contact"
                className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                <Phone aria-hidden="true" size={14} />
                {SITE.phone}
              </Link>
            </div>
          </div>
        </section>

        {/* ── Benefits ──────────────────────────────────────────────── */}
        <section
          aria-labelledby="attorney-benefits-heading"
          className="bg-white py-14 sm:py-18"
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-2">
                Why Partner With Us
              </p>
              <h2
                id="attorney-benefits-heading"
                className="text-2xl sm:text-3xl font-bold text-[#0A1628]"
              >
                What Attorneys Can Expect
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {BENEFITS.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-slate-200 p-5 bg-slate-50"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center mb-3">
                    <Icon aria-hidden="true" size={18} className="text-[#C9A84C]" />
                  </div>
                  <h3 className="text-sm font-bold text-[#0A1628] mb-1.5">{title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>

            {/* Qualification note */}
            <div className="mt-8 rounded-2xl border border-[#C9A84C]/20 bg-[#C9A84C]/5 p-5">
              <p className="text-sm font-semibold text-[#0A1628] mb-2">Eligibility for Your Clients</p>
              <ul className="space-y-1.5">
                {[
                  'Michigan resident with active personal injury case',
                  'Represented by a licensed Michigan attorney (you)',
                  'Case has reasonable likelihood of recovery',
                  'Advance amount up to $5,000 based on case evaluation',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle aria-hidden="true" size={13} className="text-emerald-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Referral form ──────────────────────────────────────────── */}
        <section
          id="referral-form"
          aria-labelledby="referral-form-heading"
          className="bg-slate-50 py-14 sm:py-18"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-2">
                Submit a Referral
              </p>
              <h2
                id="referral-form-heading"
                className="text-2xl font-bold text-[#0A1628] mb-2"
              >
                Refer a Client
              </h2>
              <p className="text-sm text-slate-600">
                Complete the form below. We'll review and follow up with you — not your client
                directly — unless you specify otherwise.
              </p>
            </div>

            <AttorneyReferralForm />

            <p className="mt-5 text-[11px] text-slate-400 leading-snug">
              By submitting, you confirm that your client has authorized this referral.
              Pre-settlement funding is not a loan. Repayment required only upon successful settlement.
              Michigan only. Subject to case review and approval.
            </p>
          </div>
        </section>

      </main>
    </>
  )
}
