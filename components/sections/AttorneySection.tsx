import Link from 'next/link'
import { CheckCircle, Phone, Users, ArrowRight, Scale } from 'lucide-react'
import ApplyButton from '@/components/common/ApplyButton'

const ATTORNEY_BENEFITS = [
  'We coordinate directly with your attorney — no extra work for you',
  'No impact on your attorney\'s fee arrangement',
  'Fast approval process your attorney is already familiar with',
  'Funds go directly to you, not your legal team',
  'Confidential — attorney-client privilege unaffected',
] as const

const ATTORNEY_STATS = [
  { value: '200+', label: 'Michigan attorneys\nwe\'ve worked with' },
  { value: '24hrs', label: 'Average turnaround\nonce attorney responds' },
] as const

export default function AttorneySection() {
  return (
    <section
      id="attorneys"
      aria-labelledby="attorney-section-heading"
      className="bg-[#0A1628] py-16 sm:py-20 lg:py-24 relative overflow-hidden"
    >
      {/* Decorative gold arc */}
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full border-[40px] border-[#C9A84C]/8"
      />
      <div
        aria-hidden="true"
        className="absolute -top-20 -left-20 w-48 h-48 rounded-full border-[30px] border-[#C9A84C]/5"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: Copy ─────────────────────────────────────────── */}
          <div>
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-6">
              <Scale aria-hidden="true" size={16} className="text-[#C9A84C]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C]">
                For Clients With an Attorney
              </span>
            </div>

            <h2
              id="attorney-section-heading"
              className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight"
            >
              Already Working With
              <br />
              a Michigan Attorney?
              <br />
              <span className="text-[#C9A84C]">Perfect.</span>
            </h2>

            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              Having a licensed Michigan attorney on your case is the one requirement for
              pre-settlement funding. Your attorney doesn't have to do any extra work — we
              handle the coordination.
            </p>

            {/* Benefits list */}
            <ul aria-label="Benefits of applying with an attorney" className="space-y-3 mb-8">
              {ATTORNEY_BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle
                    aria-hidden="true"
                    size={17}
                    className="text-[#C9A84C] mt-0.5 shrink-0"
                    strokeWidth={2}
                  />
                  <span className="text-sm text-slate-300 leading-snug">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <ApplyButton
                size="lg"
                eventLabel="attorney_section_apply_now"
                label="Apply With My Attorney"
              />
              <Link
                href="tel:+18885000050"
                aria-label="Call us at 1-888-500-0050 to speak with a funding specialist"
                data-event="click"
                data-event-label="attorney_section_call"
                data-event-category="contact"
                className="inline-flex items-center gap-2 h-14 px-6 rounded-xl border-2 border-white/20 text-white font-semibold hover:border-white/40 hover:bg-white/5 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
              >
                <Phone aria-hidden="true" size={17} />
                (888) 500-0050
              </Link>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Pre-settlement funding is not a loan. Repayment required only upon successful
              settlement. Michigan residents only.
            </p>
          </div>

          {/* ── Right: Attorney Partner Card ───────────────────────── */}
          <div>
            {/* Stats mini-cards */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {ATTORNEY_STATS.map(({ value, label }) => (
                <div
                  key={label}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center"
                >
                  <p className="text-3xl font-extrabold text-[#C9A84C] mb-1">{value}</p>
                  <p className="text-xs text-slate-400 leading-snug whitespace-pre-line">{label}</p>
                </div>
              ))}
            </div>

            {/* Attorney referral card */}
            <div className="bg-white/5 border border-[#C9A84C]/20 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/15 flex items-center justify-center">
                  <Users aria-hidden="true" size={20} className="text-[#C9A84C]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Are You a Michigan Attorney?</p>
                  <p className="text-xs text-slate-400">Refer your clients to us</p>
                </div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-5">
                We work with personal injury attorneys across Michigan. Referring your client
                to us costs nothing, doesn't affect your fee arrangement, and helps your
                client stay financially stable while their case progresses.
              </p>
              <Link
                href="/contact?type=attorney-referral"
                aria-label="Learn about our attorney referral program"
                data-event="click"
                data-event-label="attorney_section_referral_link"
                data-event-category="attorney_referral"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C9A84C] hover:text-[#e0c068] transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded"
              >
                Learn about attorney referrals
                <ArrowRight aria-hidden="true" size={14} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
