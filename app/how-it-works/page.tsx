import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react'

import { SITE } from '@/lib/seo/metadata'
import {
  buildSchemaGraph,
  buildWebPageSchema,
  buildBreadcrumbSchema,
  buildServiceSchema,
  serializeSchema,
} from '@/lib/seo/schema'
import HowItWorksSection        from '@/components/sections/HowItWorksSection'
import ApplyButton               from '@/components/common/ApplyButton'

export const metadata: Metadata = {
  title:       'How Pre-Settlement Legal Funding Works | 5000 Tomorrow',
  description: 'Learn the 3-step process to get up to $5,000 in pre-settlement funding for your Michigan personal injury case. No credit check, no upfront fees — repay only if you win.',
  alternates:  { canonical: `${SITE.url}/how-it-works` },
  keywords: [
    'how does pre-settlement funding work',
    'pre-settlement funding process Michigan',
    'lawsuit advance how it works',
    'legal funding steps Michigan',
  ],
  openGraph: {
    type:     'website',
    locale:   'en_US',
    url:      `${SITE.url}/how-it-works`,
    siteName: SITE.name,
    title:    'How Pre-Settlement Legal Funding Works | 5000 Tomorrow',
    description: 'The simple 3-step process to get up to $5,000 for your Michigan personal injury case. No credit check. No upfront fees.',
    images: [{ url: `${SITE.url}/images/og/how-it-works.jpg`, width: 1200, height: 630, alt: 'How Pre-Settlement Funding Works', type: 'image/jpeg' }],
  },
  twitter: {
    card:        'summary_large_image',
    site:        SITE.twitter,
    title:       'How Pre-Settlement Legal Funding Works | 5000 Tomorrow',
    description: 'The 3-step process to get up to $5,000 for your Michigan personal injury case.',
    images:      [`${SITE.url}/images/og/how-it-works.jpg`],
  },
}

// ─── Comparison Table Data ────────────────────────────────────────────────────

interface ComparisonRow {
  feature:           string
  preFunding:        string
  preFundingOk:      boolean
  traditionalLoan:   string
  traditionalLoanOk: boolean
}

const COMPARISON: ComparisonRow[] = [
  {
    feature:           'Credit check required',
    preFunding:        'No',             preFundingOk:      true,
    traditionalLoan:   'Yes',            traditionalLoanOk: false,
  },
  {
    feature:           'Monthly payments',
    preFunding:        'None',           preFundingOk:      true,
    traditionalLoan:   'Required',       traditionalLoanOk: false,
  },
  {
    feature:           'Repay if case is lost',
    preFunding:        'Never',          preFundingOk:      true,
    traditionalLoan:   'Always',         traditionalLoanOk: false,
  },
  {
    feature:           'Employment required',
    preFunding:        'No',             preFundingOk:      true,
    traditionalLoan:   'Usually yes',    traditionalLoanOk: false,
  },
  {
    feature:           'Risk to personal assets',
    preFunding:        'None',           preFundingOk:      true,
    traditionalLoan:   'Yes (recourse)', traditionalLoanOk: false,
  },
  {
    feature:           'Based on',
    preFunding:        'Your case value',   preFundingOk:      true,
    traditionalLoan:   'Your credit score', traditionalLoanOk: false,
  },
]

// ─── Eligibility Requirements ─────────────────────────────────────────────────

const REQUIREMENTS = [
  'Active personal injury case pending in Michigan',
  'Represented by a licensed Michigan attorney',
  'Michigan resident',
  'Case has reasonable likelihood of recovery',
]

const DISQUALIFIERS = [
  'Cases outside Michigan',
  'No attorney representation',
  'Criminal cases (civil PI only)',
  'Cases with no recovery potential',
]

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const jsonLd = buildSchemaGraph(
  buildWebPageSchema(
    'How Pre-Settlement Legal Funding Works',
    'The simple 3-step process to get up to $5,000 for your Michigan personal injury case.',
    '/how-it-works',
  ),
  buildBreadcrumbSchema([
    { name: 'How It Works', url: '/how-it-works' },
  ]),
  buildServiceSchema(),
)

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HowItWorksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeSchema(jsonLd) }}
      />

      <main id="main-content">

        {/* ── Page hero ────────────────────────────────────────────── */}
        <section
          aria-labelledby="hiw-hero-heading"
          className="bg-[#0A1628] py-14 sm:py-18"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-3">
              The Process
            </p>
            <h1
              id="hiw-hero-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
            >
              How Pre-Settlement Funding Works
            </h1>
            <p className="text-lg text-slate-300 mb-7 max-w-xl mx-auto">
              Three simple steps between you and up to $5,000. No credit check.
              No upfront fees. No repayment if your case doesn't win.
            </p>
            <ApplyButton
              size="lg"
              label="Apply Now — Takes 5 Minutes"
              eventLabel="hiw_hero_apply"
              className="mx-auto"
            />
          </div>
        </section>

        {/* ── 3-step section (shared component) ───────────────────── */}
        <HowItWorksSection />

        {/* ── Pre-settlement vs. traditional loan ─────────────────── */}
        <section
          aria-labelledby="comparison-heading"
          className="bg-white py-14 sm:py-18"
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-2">
                Key Differences
              </p>
              <h2
                id="comparison-heading"
                className="text-2xl sm:text-3xl font-bold text-[#0A1628]"
              >
                Pre-Settlement Funding vs. Traditional Loan
              </h2>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
              <table className="w-full text-sm" aria-label="Pre-settlement funding vs traditional loan comparison">
                <thead>
                  <tr className="bg-[#0A1628] text-white">
                    <th scope="col" className="text-left px-5 py-4 font-semibold">Feature</th>
                    <th scope="col" className="text-center px-5 py-4 font-semibold text-[#C9A84C]">Pre-Settlement Funding</th>
                    <th scope="col" className="text-center px-5 py-4 font-semibold">Traditional Loan</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, i) => (
                    <tr
                      key={row.feature}
                      className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
                    >
                      <td className="px-5 py-3.5 text-slate-700 font-medium">{row.feature}</td>
                      <td className="px-5 py-3.5 text-center">
                        <span className={`inline-flex items-center gap-1.5 font-semibold ${row.preFundingOk ? 'text-emerald-600' : 'text-red-500'}`}>
                          {row.preFundingOk
                            ? <CheckCircle aria-hidden="true" size={14} />
                            : <XCircle aria-hidden="true" size={14} />}
                          {row.preFunding}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <span className={`inline-flex items-center gap-1.5 font-semibold ${row.traditionalLoanOk ? 'text-emerald-600' : 'text-red-500'}`}>
                          {row.traditionalLoanOk
                            ? <CheckCircle aria-hidden="true" size={14} />
                            : <XCircle aria-hidden="true" size={14} />}
                          {row.traditionalLoan}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-center text-xs text-slate-400">
              Pre-settlement funding is not a loan. Repayment required only upon successful settlement.
            </p>
          </div>
        </section>

        {/* ── Who qualifies ────────────────────────────────────────── */}
        <section
          aria-labelledby="eligibility-heading"
          className="bg-slate-50 py-14 sm:py-18"
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-2">
                Eligibility
              </p>
              <h2
                id="eligibility-heading"
                className="text-2xl sm:text-3xl font-bold text-[#0A1628]"
              >
                Who Qualifies?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">

              {/* Requirements */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <p className="text-sm font-bold text-[#0A1628] mb-4 flex items-center gap-2">
                  <CheckCircle aria-hidden="true" size={16} className="text-emerald-500" />
                  You likely qualify if:
                </p>
                <ul className="space-y-2.5">
                  {REQUIREMENTS.map((req) => (
                    <li key={req} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <CheckCircle aria-hidden="true" size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Disqualifiers */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <p className="text-sm font-bold text-[#0A1628] mb-4 flex items-center gap-2">
                  <XCircle aria-hidden="true" size={16} className="text-slate-400" />
                  You may not qualify if:
                </p>
                <ul className="space-y-2.5">
                  {DISQUALIFIERS.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <XCircle aria-hidden="true" size={14} className="text-slate-400 mt-0.5 shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500 mb-4">
                Unsure if you qualify? Apply anyway — we'll let you know quickly.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <ApplyButton
                  size="lg"
                  label="Check My Eligibility"
                  eventLabel="hiw_eligibility_apply"
                />
                <Link
                  href="/faq"
                  aria-label="Read frequently asked questions about eligibility"
                  data-event="click"
                  data-event-label="hiw_eligibility_faq"
                  data-event-category="navigation"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-[#0A1628] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded-lg"
                >
                  Read our FAQ
                  <ArrowRight aria-hidden="true" size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  )
}
