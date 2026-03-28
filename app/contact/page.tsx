import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, Mail, Clock, MapPin } from 'lucide-react'

import { SITE } from '@/lib/seo/metadata'
import {
  buildSchemaGraph,
  buildLocalBusinessSchema,
  buildWebPageSchema,
  buildBreadcrumbSchema,
  serializeSchema,
} from '@/lib/seo/schema'
import ContactForm from '@/components/forms/ContactForm'

export const metadata: Metadata = {
  title:       'Contact Us | 5000 Tomorrow Michigan Legal Funding',
  description: 'Get in touch with 5000 Tomorrow. Questions about your application, eligibility, or pre-settlement funding in Michigan? Call (877) 863-2955 or send a message.',
  alternates:  { canonical: `${SITE.url}/contact` },
  openGraph: {
    type:        'website',
    locale:      'en_US',
    url:         `${SITE.url}/contact`,
    siteName:    SITE.name,
    title:       'Contact Us | 5000 Tomorrow Michigan Legal Funding',
    description: 'Reach 5000 Tomorrow by phone or message. Questions about Michigan pre-settlement funding — we respond within 1 hour on business days.',
    images:      [{ url: `${SITE.url}/images/og/default.jpg`, width: 1200, height: 630, alt: 'Contact 5000 Tomorrow', type: 'image/jpeg' }],
  },
  twitter: {
    card:        'summary_large_image',
    site:        SITE.twitter,
    title:       'Contact 5000 Tomorrow | Michigan Pre-Settlement Funding',
    description: 'Questions about Michigan pre-settlement funding? Call (877) 863-2955 or message us.',
  },
}

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const jsonLd = buildSchemaGraph(
  buildLocalBusinessSchema(),
  buildWebPageSchema(
    'Contact 5000 Tomorrow',
    'Get in touch with 5000 Tomorrow for questions about Michigan pre-settlement legal funding.',
    '/contact',
  ),
  buildBreadcrumbSchema([
    { name: 'Contact', url: '/contact' },
  ]),
)

// ─── Contact info items ───────────────────────────────────────────────────────

const CONTACT_INFO = [
  {
    icon:  Phone,
    label: 'Phone',
    value: SITE.phone,
    href:  `tel:${SITE.phoneE164}`,
    note:  'Best for urgent questions',
  },
  {
    icon:  Mail,
    label: 'Email',
    value: SITE.email,
    href:  `mailto:${SITE.email}`,
    note:  'Responses within 1 business day',
  },
  {
    icon:  Clock,
    label: 'Hours',
    value: 'Mon–Fri, 8 AM–6 PM ET',
    href:  null,
    note:  'We aim to respond within 1 hour',
  },
  {
    icon:  MapPin,
    label: 'Service Area',
    value: 'Michigan Only',
    href:  null,
    note:  'All 83 Michigan counties',
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeSchema(jsonLd) }}
      />

      <main id="main-content">

        {/* ── Hero ──────────────────────────────────────────────────── */}
        <section
          aria-labelledby="contact-hero-heading"
          className="bg-[#0A1628] py-14 sm:py-18"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-3">
              Get in Touch
            </p>
            <h1
              id="contact-hero-heading"
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
            >
              Contact 5000 Tomorrow
            </h1>
            <p className="text-lg text-slate-300 max-w-xl mx-auto">
              Questions about your application, eligibility, or how pre-settlement
              funding works? We're here to help.
            </p>
          </div>
        </section>

        {/* ── Main content ──────────────────────────────────────────── */}
        <section
          aria-labelledby="contact-form-heading"
          className="bg-slate-50 py-14 sm:py-18"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-16 items-start">

              {/* ── Form ─────────────────────────────────────────────── */}
              <div>
                <h2
                  id="contact-form-heading"
                  className="text-2xl font-bold text-[#0A1628] mb-6"
                >
                  Send a Message
                </h2>
                <ContactForm />
              </div>

              {/* ── Contact info sidebar ──────────────────────────────── */}
              <aside aria-label="Contact information">

                {/* Phone CTA (prominent) */}
                <div className="rounded-2xl bg-[#0A1628] p-6 mb-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-2">
                    Fastest Response
                  </p>
                  <p className="text-base font-bold text-white mb-1">Call Us Directly</p>
                  <p className="text-sm text-slate-400 mb-4">
                    We answer during business hours and aim to respond within 1 hour.
                  </p>
                  <Link
                    href={`tel:${SITE.phoneE164}`}
                    aria-label={`Call 5000 Tomorrow at ${SITE.phone}`}
                    data-event="click"
                    data-event-label="contact_page_phone_cta"
                    data-event-category="contact"
                    className="flex items-center gap-2 rounded-xl bg-[#C9A84C] px-4 py-3 font-bold text-[#0A1628] text-sm hover:bg-[#b89238] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <Phone aria-hidden="true" size={15} />
                    {SITE.phone}
                  </Link>
                </div>

                {/* Contact details */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
                  {CONTACT_INFO.map(({ icon: Icon, label, value, href, note }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon aria-hidden="true" size={15} className="text-[#C9A84C]" />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-0.5">
                          {label}
                        </p>
                        {href ? (
                          <a
                            href={href}
                            className="text-sm font-semibold text-[#0A1628] hover:text-[#C9A84C] transition-colors duration-150"
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="text-sm font-semibold text-[#0A1628]">{value}</p>
                        )}
                        {note && (
                          <p className="text-[11px] text-slate-400 mt-0.5">{note}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Disclaimer note */}
                <p className="mt-5 text-[11px] text-slate-400 leading-snug">
                  5000 Tomorrow serves Michigan residents only. We do not provide legal advice.
                  Requires active case with licensed Michigan attorney.
                </p>
              </aside>

            </div>
          </div>
        </section>

      </main>
    </>
  )
}
