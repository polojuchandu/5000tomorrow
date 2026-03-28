import type { Metadata } from 'next'
import { SITE } from '@/lib/seo/metadata'

export const metadata: Metadata = {
  title:       'Legal Funding Disclaimer | 5000 Tomorrow',
  description: 'Important legal and regulatory disclosures about 5000 Tomorrow\'s pre-settlement funding product. Not a loan. Michigan residents only.',
  alternates:  { canonical: `${SITE.url}/disclaimer` },
}

const LAST_UPDATED = 'March 1, 2025'

export default function DisclaimerPage() {
  return (
    <main id="main-content" className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 mb-8">
          <a href="/" className="hover:text-slate-600 transition-colors">Home</a>
          <span aria-hidden="true">/</span>
          <span className="text-slate-600" aria-current="page">Legal Disclaimer</span>
        </nav>

        <header className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-2">Disclosures</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0A1628] mb-3">Legal Funding Disclaimer</h1>
          <p className="text-sm text-slate-500">Last updated: {LAST_UPDATED}</p>
        </header>

        {/* Key disclosure banner */}
        <div className="rounded-2xl border-2 border-[#C9A84C]/30 bg-[#C9A84C]/5 p-5 sm:p-6 mb-10">
          <p className="text-sm font-bold text-[#0A1628] mb-2">
            Pre-Settlement Funding Is Not a Loan
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            5000 Tomorrow provides non-recourse pre-settlement legal funding. This is a cash advance
            against your anticipated settlement proceeds — not a loan, not a line of credit, and not a
            payday advance. You are not required to repay the advance unless your case wins or settles
            in your favor. If your case is lost or dismissed, you owe 5000 Tomorrow nothing.
          </p>
        </div>

        <div className="prose prose-slate max-w-none prose-headings:text-[#0A1628] prose-a:text-[#C9A84C]">

          <h2>Not Legal or Financial Advice</h2>
          <p>
            All content on this website, including blog articles, FAQ answers, and educational materials,
            is for general informational purposes only. Nothing on this Site constitutes legal advice,
            financial advice, or tax advice. You should consult with a licensed attorney, financial
            advisor, or tax professional before making any legal or financial decisions.
          </p>

          <h2>Michigan Residents Only</h2>
          <p>
            5000 Tomorrow's pre-settlement funding services are available exclusively to residents of
            the State of Michigan with active personal injury cases pending in Michigan courts and
            represented by licensed Michigan attorneys. We do not offer pre-settlement funding to
            residents of any other state at this time.
          </p>

          <h2>Attorney Representation Required</h2>
          <p>
            Eligibility for pre-settlement funding requires an active case represented by a licensed
            Michigan attorney. 5000 Tomorrow does not provide legal services, legal referrals (except
            where noted), or any form of attorney-client relationship. The fact that we contact your
            attorney does not create an attorney-client relationship between 5000 Tomorrow and you.
          </p>

          <h2>Non-Recourse Nature of Funding</h2>
          <p>
            Pre-settlement funding from 5000 Tomorrow is strictly non-recourse. This means:
          </p>
          <ul>
            <li>You are not personally liable for repayment if your case does not result in a recovery.</li>
            <li>We cannot pursue your personal assets, bank accounts, wages, or credit if your case is lost.</li>
            <li>Repayment is made exclusively from your settlement proceeds, if and when your case settles.</li>
          </ul>

          <h2>Fees and Costs</h2>
          <p>
            5000 Tomorrow charges a funding fee, which is agreed upon and disclosed in writing before
            you accept any funding. This fee is contingent on a successful settlement and is repaid
            from your settlement proceeds only. All fees are fully disclosed upfront. There are no
            hidden fees, no origination fees, and no application fees.
          </p>

          <h2>Case Approval is Not Guaranteed</h2>
          <p>
            Submission of an application does not guarantee approval or funding. All applications are
            subject to our internal review process, case evaluation, and attorney coordination. The
            funding amount offered may be less than the maximum of $5,000, depending on case specifics.
          </p>

          <h2>Settlement Outcome Not Guaranteed</h2>
          <p>
            5000 Tomorrow does not guarantee any particular outcome for your legal case. Past funding
            decisions or client testimonials do not indicate likely results in any specific case.
            The outcome of your legal matter depends on facts specific to your case, the applicable
            law, and many factors beyond our control.
          </p>

          <h2>Regulatory Status</h2>
          <p>
            Pre-settlement legal funding is a distinct financial product separate from consumer lending.
            It is regulated differently in different jurisdictions. 5000 Tomorrow operates in
            compliance with applicable Michigan law. This product is not regulated as a consumer
            loan under Michigan banking or lending statutes.
          </p>

          <h2>Testimonials and Reviews</h2>
          <p>
            Any testimonials or client reviews on this Site reflect individual experiences and are not
            typical of all clients. Results vary based on individual case circumstances.
          </p>

          <h2>Contact</h2>
          <p>
            For questions about these disclosures, contact us at{' '}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or{' '}
            <a href={`tel:${SITE.phoneE164}`}>{SITE.phone}</a>.
          </p>

        </div>
      </div>
    </main>
  )
}
