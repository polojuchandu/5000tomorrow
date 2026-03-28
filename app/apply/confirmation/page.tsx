'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { CheckCircle, Clock, Phone, ArrowRight, FileText } from 'lucide-react'
import { gtagConversion } from '@/lib/analytics/gtag'
import { pixelApplicationComplete } from '@/lib/analytics/pixel'

// ─── Next steps timeline ─────────────────────────────────────────────────────

const NEXT_STEPS = [
  {
    step:  '01',
    title: 'We Received Your Application',
    body:  'Your application is in our system. You\'ll receive a confirmation email shortly.',
    time:  'Right now',
  },
  {
    step:  '02',
    title: 'We Contact Your Attorney',
    body:  'Our team will reach out to your attorney\'s office to evaluate your case — typically within a few hours on business days.',
    time:  'Within a few hours',
  },
  {
    step:  '03',
    title: 'You Receive a Decision',
    body:  'We\'ll call or email you with an approval decision. Most applicants hear back within 24 hours.',
    time:  'Within 24 hours',
  },
  {
    step:  '04',
    title: 'Funds Transferred to You',
    body:  'Once approved and documents are signed, funds are transferred directly to you — often the same business day.',
    time:  'Within 24 hours of approval',
  },
]

// ─── Confirmation Page ────────────────────────────────────────────────────────

export default function ConfirmationPage() {
  useEffect(() => {
    // Fire conversion tracking once on mount
    gtagConversion('thank_you_view', 1)
    pixelApplicationComplete()

    // Clear localStorage draft after successful submission
    try {
      localStorage.removeItem('5000tomorrow_apply_draft')
    } catch {
      // Silent — storage access may be blocked
    }
  }, [])

  return (
    <main
      id="main-content"
      className="min-h-screen bg-slate-50 py-14 sm:py-20"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">

        {/* ── Success header ───────────────────────────────────────── */}
        <div className="text-center mb-10">
          <div
            className="w-20 h-20 rounded-full bg-emerald-100 border-2 border-emerald-200 flex items-center justify-center mx-auto mb-5"
            aria-hidden="true"
          >
            <CheckCircle size={36} className="text-emerald-500" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-2">
            Application Submitted
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0A1628] mb-3">
            We've Got Your Application
          </h1>
          <p className="text-slate-600 text-base max-w-md mx-auto leading-relaxed">
            Thank you for applying. Here's exactly what happens next — and what to expect
            over the next 24–48 hours.
          </p>
        </div>

        {/* ── Next steps timeline ──────────────────────────────────── */}
        <section
          aria-labelledby="next-steps-heading"
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Clock aria-hidden="true" size={18} className="text-[#C9A84C]" />
            <h2
              id="next-steps-heading"
              className="text-lg font-bold text-[#0A1628]"
            >
              What Happens Now
            </h2>
          </div>

          <ol aria-label="Application process next steps" className="space-y-6">
            {NEXT_STEPS.map((s, idx) => (
              <li
                key={s.step}
                className="flex gap-4"
              >
                <div className="shrink-0 flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    idx === 0
                      ? 'bg-emerald-500 text-white'
                      : 'bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C]'
                  }`}>
                    {idx === 0 ? <CheckCircle aria-hidden="true" size={14} /> : s.step}
                  </div>
                  {idx < NEXT_STEPS.length - 1 && (
                    <div aria-hidden="true" className="w-0.5 flex-1 bg-slate-200 my-1" />
                  )}
                </div>
                <div className="pb-2">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-sm font-bold text-[#0A1628]">{s.title}</h3>
                    <span className="text-[11px] font-medium text-[#C9A84C] bg-[#C9A84C]/10 px-2 py-0.5 rounded-full">
                      {s.time}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Speed tip ─────────────────────────────────────────────── */}
        <div className="rounded-2xl bg-[#0A1628] p-5 sm:p-6 mb-6">
          <p className="text-sm font-bold text-white mb-2">
            Speed Up Your Approval
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            Call your attorney's office and let them know 5000 Tomorrow will be reaching
            out to verify your case. Attorney availability is the biggest factor in approval speed.
          </p>
        </div>

        {/* ── Contact info ──────────────────────────────────────────── */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 mb-8">
          <p className="text-sm font-bold text-[#0A1628] mb-4">
            Questions About Your Application?
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="tel:+18885000050"
              aria-label="Call 5000 Tomorrow at 1-888-500-0050"
              data-event="click"
              data-event-label="confirmation_phone_cta"
              data-event-category="contact"
              className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl border-2 border-[#0A1628] text-[#0A1628] font-semibold text-sm hover:bg-[#0A1628] hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
            >
              <Phone aria-hidden="true" size={14} />
              (877) 863-2955
            </Link>
            <Link
              href="/faq"
              data-event="click"
              data-event-label="confirmation_faq_link"
              data-event-category="navigation"
              className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-semibold text-sm hover:bg-white hover:border-slate-300 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
            >
              <FileText aria-hidden="true" size={14} />
              Read FAQ
            </Link>
          </div>
        </div>

        {/* ── Learn more links ──────────────────────────────────────── */}
        <div className="text-center">
          <p className="text-xs text-slate-400 mb-4">While you wait, learn more:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-[#0A1628] transition-colors duration-200"
            >
              How It Works <ArrowRight aria-hidden="true" size={13} />
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-[#0A1628] transition-colors duration-200"
            >
              FAQ <ArrowRight aria-hidden="true" size={13} />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-[#0A1628] transition-colors duration-200"
            >
              Home <ArrowRight aria-hidden="true" size={13} />
            </Link>
          </div>
        </div>

        <p className="mt-8 text-center text-[11px] text-slate-400 leading-snug">
          Pre-settlement funding is not a loan. Repayment required only upon successful settlement.
          Requires active case with licensed Michigan attorney. Amount subject to case evaluation.
        </p>

      </div>
    </main>
  )
}
