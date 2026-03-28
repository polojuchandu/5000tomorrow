import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { SITE } from '@/lib/seo/metadata'
import {
  buildSchemaGraph,
  buildWebPageSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
  serializeSchema,
} from '@/lib/seo/schema'
import ApplyButton        from '@/components/common/ApplyButton'
import FAQPageAccordion   from '@/components/faq/FAQPageAccordion'

export const metadata: Metadata = {
  title:       'Frequently Asked Questions | 5000 Tomorrow Michigan Legal Funding',
  description: 'Get answers to common questions about pre-settlement legal funding in Michigan. Is it a loan? How fast? Do I need an attorney? What if I lose? All answered here.',
  alternates:  { canonical: `${SITE.url}/faq` },
  keywords: [
    'pre-settlement funding FAQ Michigan',
    'lawsuit advance questions',
    'legal funding FAQ',
    'is pre-settlement funding a loan',
  ],
  openGraph: {
    type:        'website',
    locale:      'en_US',
    url:         `${SITE.url}/faq`,
    siteName:    SITE.name,
    title:       'Frequently Asked Questions | 5000 Tomorrow Michigan Legal Funding',
    description: 'Answers to all common questions about Michigan pre-settlement legal funding.',
    images:      [{ url: `${SITE.url}/images/og/faq.jpg`, width: 1200, height: 630, alt: 'Pre-Settlement Funding FAQ', type: 'image/jpeg' }],
  },
  twitter: {
    card:        'summary_large_image',
    site:        SITE.twitter,
    title:       'FAQ | Michigan Pre-Settlement Legal Funding | 5000 Tomorrow',
    description: 'Answers to all common questions about Michigan pre-settlement legal funding.',
  },
}

// ─── FAQ Data ─────────────────────────────────────────────────────────────────

const CATEGORIES = [
  'About Pre-Settlement Funding',
  'Eligibility',
  'Getting Funded',
  'Repayment',
]

const FAQS = [
  {
    id:       'faq-about-1',
    category: 'About Pre-Settlement Funding',
    question: 'What is pre-settlement legal funding?',
    answer:   'Pre-settlement legal funding — also called a lawsuit advance or settlement advance — is a non-recourse cash advance against your anticipated settlement proceeds. Unlike a traditional loan, it\'s based entirely on your case\'s merits, not your credit score. If your case doesn\'t result in a recovery, you owe nothing. 5000 Tomorrow provides up to $5,000 to Michigan residents with active personal injury cases.',
  },
  {
    id:       'faq-about-2',
    category: 'About Pre-Settlement Funding',
    question: 'Is pre-settlement funding a loan?',
    answer:   'No. Pre-settlement funding is not a loan and should never be called one. It\'s a non-recourse cash advance against your anticipated settlement proceeds. There are no monthly payments, no interest, and no obligation to repay if your case doesn\'t win. This is fundamentally different from personal loans, payday loans, or lines of credit — your personal assets and credit are never at risk.',
  },
  {
    id:       'faq-about-3',
    category: 'About Pre-Settlement Funding',
    question: 'How is pre-settlement funding different from a "lawsuit loan"?',
    answer:   'The term "lawsuit loan" is a misnomer. Pre-settlement funding from 5000 Tomorrow is strictly non-recourse — repayment is contingent solely on your case\'s outcome. Traditional loans require repayment regardless of what happens. With our funding, if your case is dismissed or you lose, you owe us nothing. No credit checks. No income verification. No collateral required.',
  },
  {
    id:       'faq-about-4',
    category: 'About Pre-Settlement Funding',
    question: 'How does 5000 Tomorrow make money?',
    answer:   '5000 Tomorrow earns a funding fee that is paid from your settlement proceeds only if your case wins. This fee is agreed upon and disclosed in writing before you accept any funding. There are no hidden charges, no origination fees, and no application fees. If your case doesn\'t win, we receive nothing.',
  },
  {
    id:       'faq-about-5',
    category: 'About Pre-Settlement Funding',
    question: 'Is my application information confidential?',
    answer:   'Yes. All information you provide is kept strictly confidential and used only to evaluate your funding application. We do not sell your personal information to third parties. Your attorney is contacted only with your permission as part of the review process.',
  },
  {
    id:       'faq-eligibility-1',
    category: 'Eligibility',
    question: 'Do I need an attorney to qualify?',
    answer:   'Yes. An active case represented by a licensed Michigan attorney is required. This isn\'t just a formality — we work directly with your attorney to evaluate your case\'s strength and estimate settlement value. If you don\'t yet have an attorney, we strongly recommend consulting one before applying. We can sometimes help with referrals — call (888) 500-0050.',
  },
  {
    id:       'faq-eligibility-2',
    category: 'Eligibility',
    question: 'Does my credit score matter?',
    answer:   'No. We do not check your credit score and your credit history has no bearing on your eligibility. Our decision is based entirely on your case\'s strength and likely settlement value — nothing else. This makes pre-settlement funding accessible to applicants who would not qualify for traditional financing.',
  },
  {
    id:       'faq-eligibility-3',
    category: 'Eligibility',
    question: 'Do I need to be employed to qualify?',
    answer:   'No. Employment status and income are not factors in our evaluation. Pre-settlement funding is available to unemployed, part-time, and full-time workers alike. What matters is your pending personal injury case and attorney representation — not your employment history.',
  },
  {
    id:       'faq-eligibility-4',
    category: 'Eligibility',
    question: 'Is Michigan the only state you serve?',
    answer:   'Yes. 5000 Tomorrow currently serves Michigan residents only. Your case must be pending in a Michigan court, and you must be represented by a licensed Michigan attorney. We serve clients across the entire state, including all 83 Michigan counties.',
  },
  {
    id:       'faq-eligibility-5',
    category: 'Eligibility',
    question: 'Is there a minimum case value required?',
    answer:   'There\'s no strict minimum, but your case must have a reasonable likelihood of recovery sufficient to cover the advance and our funding fee. Cases with estimated settlements under $10,000 may have difficulty qualifying, but we evaluate every application individually. Cases with clear liability and documented injuries typically approve well.',
  },
  {
    id:       'faq-eligibility-6',
    category: 'Eligibility',
    question: 'What if my attorney advises against taking funding?',
    answer:   'Your attorney\'s guidance is important. Some attorneys have concerns about funding fees reducing their client\'s net settlement. We encourage an open conversation with your attorney about your financial needs. Many Michigan personal injury attorneys are familiar with pre-settlement funding and support it for clients who need financial stability during litigation.',
  },
  {
    id:       'faq-eligibility-7',
    category: 'Eligibility',
    question: 'What if my case is still in early stages?',
    answer:   'Early-stage cases can qualify. The key factor is how much information is available about liability and damages. Cases with clear liability — like a rear-end collision with a police report and documented injuries — can often be evaluated early. Cases where liability is heavily disputed may require more case development before approval.',
  },
  {
    id:       'faq-getting-1',
    category: 'Getting Funded',
    question: 'How much funding can I receive?',
    answer:   '5000 Tomorrow provides up to $5,000 in pre-settlement funding. The approved amount depends on the strength of your case, the estimated settlement value, and other factors evaluated with your attorney. We do not currently offer amounts above $5,000 per advance.',
  },
  {
    id:       'faq-getting-2',
    category: 'Getting Funded',
    question: 'How quickly can I receive my funds?',
    answer:   'Most applicants receive a decision within 24 hours of applying — provided we can reach your attorney. Once approved, funds are typically transferred within another 24 hours. Many clients receive money within two business days of first applying. The fastest way to speed this up is to alert your attorney that we will be contacting them.',
  },
  {
    id:       'faq-getting-3',
    category: 'Getting Funded',
    question: 'What types of cases do you fund?',
    answer:   'We fund personal injury cases in Michigan, including: car accidents, truck accidents, motorcycle accidents, pedestrian accidents, rideshare (Uber/Lyft) accidents, hit-and-run accidents, bicycle accidents, slip and fall injuries, workplace injuries, workers\' compensation cases, wrongful death claims, and premises liability. If you\'re unsure about your case type, call us at (888) 500-0050.',
  },
  {
    id:       'faq-getting-4',
    category: 'Getting Funded',
    question: 'What information do I need to apply?',
    answer:   'You\'ll need: your case type and incident date, a brief description of your injury and what happened, your attorney\'s name, firm, and phone number, and your contact information (name, phone, email, Michigan ZIP code). The application typically takes 5 minutes or less online. No document uploads are required at application time.',
  },
  {
    id:       'faq-getting-5',
    category: 'Getting Funded',
    question: 'Can I use the funds for anything?',
    answer:   'Yes. Once you receive your advance, there are no restrictions on how you use the money. Most clients use it for rent or mortgage payments, medical bills, groceries, utilities, transportation, and other day-to-day expenses that become difficult to manage while waiting for a settlement.',
  },
  {
    id:       'faq-getting-6',
    category: 'Getting Funded',
    question: 'Can I get more than $5,000?',
    answer:   '5000 Tomorrow\'s maximum advance is $5,000 per application. If your case is of significantly higher value and you need additional funding, please contact us to discuss your specific situation. We do not currently stack multiple advances beyond our standard limit.',
  },
  {
    id:       'faq-getting-7',
    category: 'Getting Funded',
    question: 'I already have a prior settlement advance from another company. Can I still apply?',
    answer:   'Potentially yes. We evaluate total funding against the anticipated settlement value. Having a prior advance from another company does not automatically disqualify you. Contact us directly to discuss your specific situation.',
  },
  {
    id:       'faq-repayment-1',
    category: 'Repayment',
    question: 'What if my case doesn\'t win or is dismissed?',
    answer:   'If your case is lost, dismissed, or results in no recovery, you owe us absolutely nothing. This is the non-recourse nature of pre-settlement funding. Your personal assets, bank accounts, and credit score are never at risk. Our financial outcome is tied entirely to your case\'s success.',
  },
  {
    id:       'faq-repayment-2',
    category: 'Repayment',
    question: 'How does repayment work?',
    answer:   'Repayment comes directly from your settlement proceeds at the close of your case. Your attorney handles the disbursement — you don\'t make any manual payments. The advance plus the agreed funding fee is deducted from your settlement payout before the remaining balance is sent to you. There are no monthly payments, no due dates, and no late fees while your case is pending.',
  },
  {
    id:       'faq-repayment-3',
    category: 'Repayment',
    question: 'Will applying affect my credit score?',
    answer:   'No. Applying for pre-settlement funding does not involve a hard credit inquiry and will not appear on your credit report. We do not pull your credit, report to credit bureaus, or affect your credit score in any way.',
  },
  {
    id:       'faq-repayment-4',
    category: 'Repayment',
    question: 'Are there any fees I pay upfront?',
    answer:   'No. There are zero upfront fees. No application fee, no processing fee, no origination fee. All fees are contingent on a successful settlement and are deducted from your settlement proceeds only. You never pay anything out of pocket.',
  },
]

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const jsonLd = buildSchemaGraph(
  buildWebPageSchema(
    'Pre-Settlement Funding FAQ — Michigan',
    'Frequently asked questions about pre-settlement legal funding in Michigan.',
    '/faq',
  ),
  buildBreadcrumbSchema([
    { name: 'FAQ', url: '/faq' },
  ]),
  buildFAQSchema(FAQS),
)

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeSchema(jsonLd) }}
      />

      <main id="main-content">

        {/* ── Hero ──────────────────────────────────────────────────── */}
        <section
          aria-labelledby="faq-hero-heading"
          className="bg-[#0A1628] py-14 sm:py-18"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-3">
              Answers
            </p>
            <h1
              id="faq-hero-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
            >
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-slate-300 max-w-xl mx-auto">
              Everything Michigan residents commonly ask about pre-settlement legal funding —
              answered plainly and honestly.
            </p>
          </div>
        </section>

        {/* ── FAQ accordion ─────────────────────────────────────────── */}
        <section
          aria-labelledby="faq-section-heading"
          className="bg-slate-50 py-14 sm:py-18"
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 id="faq-section-heading" className="sr-only">All Questions</h2>
            <FAQPageAccordion faqs={FAQS} categories={CATEGORIES} />

            <p className="mt-8 text-xs text-slate-400 leading-snug text-center">
              Informational only — not legal or financial advice.
              Pre-settlement funding is not a loan. Repayment required only upon successful settlement.
              Michigan residents only. Requires active case with licensed Michigan attorney.
            </p>
          </div>
        </section>

        {/* ── Still have questions CTA ──────────────────────────────── */}
        <section
          aria-label="Still have questions"
          className="bg-white py-12 sm:py-14 border-t border-slate-100"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
            <h2 className="text-xl font-bold text-[#0A1628] mb-2">
              Still Have Questions?
            </h2>
            <p className="text-slate-600 text-sm mb-6">
              Call us — we respond within 1 hour on business days.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="tel:+18885000050"
                aria-label="Call 5000 Tomorrow at 1-888-500-0050"
                data-event="click"
                data-event-label="faq_bottom_phone_cta"
                data-event-category="contact"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-xl border-2 border-[#0A1628] text-[#0A1628] font-semibold text-sm hover:bg-[#0A1628] hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
              >
                (888) 500-0050
              </Link>
              <Link
                href="/contact"
                data-event="click"
                data-event-label="faq_bottom_contact_link"
                data-event-category="navigation"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-[#0A1628] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded-lg"
              >
                Send us a message
                <ArrowRight aria-hidden="true" size={14} />
              </Link>
            </div>
            <div className="mt-6">
              <ApplyButton
                size="md"
                label="Ready to Apply? Start Here"
                eventLabel="faq_bottom_apply"
              />
            </div>
          </div>
        </section>

      </main>
    </>
  )
}
