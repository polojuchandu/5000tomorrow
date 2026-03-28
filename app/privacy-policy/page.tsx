import type { Metadata } from 'next'
import { SITE } from '@/lib/seo/metadata'

export const metadata: Metadata = {
  title:       'Privacy Policy | 5000 Tomorrow',
  description: 'Read the 5000 Tomorrow privacy policy to understand how we collect, use, and protect your personal information.',
  alternates:  { canonical: `${SITE.url}/privacy-policy` },
  robots:      { index: true, follow: false },
}

const LAST_UPDATED = 'March 1, 2025'

export default function PrivacyPolicyPage() {
  return (
    <main id="main-content" className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 mb-8">
          <a href="/" className="hover:text-slate-600 transition-colors">Home</a>
          <span aria-hidden="true">/</span>
          <span className="text-slate-600" aria-current="page">Privacy Policy</span>
        </nav>

        <header className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-2">Legal</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0A1628] mb-3">Privacy Policy</h1>
          <p className="text-sm text-slate-500">Last updated: {LAST_UPDATED}</p>
        </header>

        <div className="prose prose-slate max-w-none prose-headings:text-[#0A1628] prose-a:text-[#C9A84C] prose-a:no-underline hover:prose-a:underline">

          <p>
            5000 Tomorrow LLC ("5000 Tomorrow," "we," "us," or "our") operates the website{' '}
            <a href={SITE.url}>{SITE.url}</a> (the "Site"). This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you visit our Site or submit
            an application for pre-settlement funding.
          </p>

          <p>
            By using our Site, you consent to the practices described in this Privacy Policy. If you
            do not agree with the terms of this policy, please do not access the Site.
          </p>

          <h2>1. Information We Collect</h2>
          <p>We may collect information about you in a variety of ways:</p>
          <h3>Information You Provide Directly</h3>
          <ul>
            <li>Name, email address, phone number, and mailing address</li>
            <li>Case details including case type, incident date, and injury description</li>
            <li>Attorney name, firm, and contact information</li>
            <li>Any other information you choose to provide via forms or communications</li>
          </ul>
          <h3>Automatically Collected Information</h3>
          <ul>
            <li>Log data: IP address, browser type, pages visited, time stamps</li>
            <li>Device information: device type, operating system</li>
            <li>Cookies and similar tracking technologies (see Section 5)</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Process and evaluate your pre-settlement funding application</li>
            <li>Communicate with you about your application status</li>
            <li>Contact your attorney as part of our case review process (with your consent)</li>
            <li>Send transactional and informational communications</li>
            <li>Improve our Site and services</li>
            <li>Comply with legal obligations</li>
            <li>Prevent fraud and maintain security</li>
          </ul>
          <p>
            We do not sell, rent, or lease your personal information to third parties for
            their marketing purposes.
          </p>

          <h2>3. Disclosure of Your Information</h2>
          <p>We may share your information in the following circumstances:</p>
          <ul>
            <li>
              <strong>Service Providers:</strong> Third-party vendors who assist with our operations
              (e.g., CRM software, email delivery, analytics) under confidentiality agreements.
            </li>
            <li>
              <strong>Your Attorney:</strong> We contact your attorney as part of the case evaluation
              process. By submitting an application, you authorize this contact.
            </li>
            <li>
              <strong>Legal Requirements:</strong> When required by law, subpoena, or governmental authority.
            </li>
            <li>
              <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of
              assets, subject to confidentiality protections.
            </li>
          </ul>

          <h2>4. Data Retention</h2>
          <p>
            We retain your personal information for as long as necessary to fulfill the purposes described
            in this Privacy Policy or as required by law. Application data is typically retained for
            seven (7) years from the date of submission.
          </p>

          <h2>5. Cookies and Tracking Technologies</h2>
          <p>
            Our Site uses cookies and similar technologies (including Google Analytics and Meta Pixel)
            to analyze usage patterns and improve performance. You can control cookie preferences
            through your browser settings. Note that disabling cookies may affect certain Site
            functionality.
          </p>

          <h2>6. Third-Party Services</h2>
          <p>
            Our Site may contain links to third-party websites. We are not responsible for the privacy
            practices of those sites. We use the following third-party services that may collect data:
          </p>
          <ul>
            <li>Google Analytics (usage analytics)</li>
            <li>Meta Pixel (advertising measurement)</li>
          </ul>

          <h2>7. Children's Privacy</h2>
          <p>
            Our Site is not directed to individuals under the age of 18. We do not knowingly collect
            personal information from minors. If you believe we have inadvertently collected information
            from a minor, please contact us immediately.
          </p>

          <h2>8. Security</h2>
          <p>
            We implement reasonable administrative, technical, and physical security measures to protect
            your personal information. However, no method of transmission over the Internet is 100%
            secure, and we cannot guarantee absolute security.
          </p>

          <h2>9. Your Rights</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal information,
            including the right to access, correct, or delete your data. To exercise these rights,
            please contact us at{' '}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>

          <h2>10. Changes to This Policy</h2>
          <p>
            We reserve the right to update this Privacy Policy at any time. Changes will be posted on
            this page with an updated "Last updated" date. Continued use of the Site after changes
            constitutes acceptance of the revised policy.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or our data practices, please contact us:
          </p>
          <p>
            <strong>5000 Tomorrow LLC</strong><br />
            Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a><br />
            Phone: <a href={`tel:${SITE.phoneE164}`}>{SITE.phone}</a><br />
            State of Operations: Michigan, United States
          </p>

        </div>
      </div>
    </main>
  )
}
