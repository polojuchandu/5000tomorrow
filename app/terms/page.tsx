import type { Metadata } from 'next'
import { SITE } from '@/lib/seo/metadata'

export const metadata: Metadata = {
  title:       'Terms of Service | 5000 Tomorrow',
  description: 'Read the 5000 Tomorrow terms of service governing use of our website and pre-settlement funding services.',
  alternates:  { canonical: `${SITE.url}/terms` },
  robots:      { index: true, follow: false },
}

const LAST_UPDATED = 'March 1, 2025'

export default function TermsPage() {
  return (
    <main id="main-content" className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 mb-8">
          <a href="/" className="hover:text-slate-600 transition-colors">Home</a>
          <span aria-hidden="true">/</span>
          <span className="text-slate-600" aria-current="page">Terms of Service</span>
        </nav>

        <header className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-2">Legal</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0A1628] mb-3">Terms of Service</h1>
          <p className="text-sm text-slate-500">Last updated: {LAST_UPDATED}</p>
        </header>

        <div className="prose prose-slate max-w-none prose-headings:text-[#0A1628] prose-a:text-[#C9A84C] prose-a:no-underline hover:prose-a:underline">

          <p>
            These Terms of Service ("Terms") govern your access to and use of the website operated by
            5000 Tomorrow LLC ("5000 Tomorrow," "Company," "we," or "us") at{' '}
            <a href={SITE.url}>{SITE.url}</a> (the "Site"). By accessing or using the Site, you agree
            to be bound by these Terms.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By using this Site, you represent that you are at least 18 years of age and have the legal
            capacity to enter into these Terms. If you do not agree to these Terms, please do not use
            the Site.
          </p>

          <h2>2. Nature of Service</h2>
          <p>
            5000 Tomorrow provides pre-settlement legal funding — a non-recourse cash advance against
            anticipated settlement proceeds — to eligible Michigan residents who have active personal
            injury cases represented by licensed Michigan attorneys.
          </p>
          <p>
            <strong>
              Pre-settlement funding is not a loan. It is a non-recourse advance. Repayment is required
              only if your case wins or settles. If your case does not result in a recovery, you owe
              nothing to 5000 Tomorrow.
            </strong>
          </p>

          <h2>3. Eligibility</h2>
          <p>Pre-settlement funding from 5000 Tomorrow requires:</p>
          <ul>
            <li>Michigan residency</li>
            <li>An active personal injury case pending in a Michigan court</li>
            <li>Representation by a licensed Michigan attorney</li>
            <li>A case that meets our internal funding criteria</li>
          </ul>
          <p>
            Submission of an application does not guarantee approval. All applications are subject to
            our case review and approval process.
          </p>

          <h2>4. Use of the Site</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the Site for any unlawful purpose or in violation of any applicable law</li>
            <li>Submit false or misleading information in any application or form</li>
            <li>Attempt to gain unauthorized access to any portion of the Site</li>
            <li>Use automated tools to scrape, crawl, or harvest data from the Site</li>
            <li>Interfere with or disrupt the integrity or performance of the Site</li>
          </ul>

          <h2>5. Application Process</h2>
          <p>
            By submitting an application, you authorize 5000 Tomorrow to contact your attorney and
            review information about your case for the purpose of evaluating your application. You
            represent that all information provided is accurate and complete.
          </p>

          <h2>6. Intellectual Property</h2>
          <p>
            All content on this Site, including text, graphics, logos, and software, is the property
            of 5000 Tomorrow or its content suppliers and is protected by applicable intellectual
            property laws. You may not reproduce, distribute, or create derivative works without our
            express written permission.
          </p>

          <h2>7. Disclaimers</h2>
          <p>
            THE SITE AND ITS CONTENT ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT
            WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. 5000 TOMORROW DISCLAIMS ALL WARRANTIES,
            INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
            NON-INFRINGEMENT.
          </p>
          <p>
            The information on this Site is for general informational purposes only and does not
            constitute legal, financial, or tax advice. Consult qualified professionals for advice
            specific to your situation.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, 5000 TOMORROW SHALL NOT BE LIABLE FOR ANY INDIRECT,
            INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF OR
            INABILITY TO USE THE SITE OR SERVICES.
          </p>

          <h2>9. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the State of
            Michigan, without regard to its conflict-of-law provisions. Any disputes arising under
            these Terms shall be subject to the exclusive jurisdiction of the courts located in Michigan.
          </p>

          <h2>10. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Changes will be posted on this
            page with an updated date. Continued use of the Site after changes constitutes acceptance
            of the revised Terms.
          </p>

          <h2>11. Contact</h2>
          <p>
            Questions about these Terms should be directed to:{' '}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or{' '}
            <a href={`tel:${SITE.phoneE164}`}>{SITE.phone}</a>.
          </p>

        </div>
      </div>
    </main>
  )
}
