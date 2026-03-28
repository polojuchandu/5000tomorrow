import Link from 'next/link'
import { ClipboardList, UserCheck, BanknoteIcon, ArrowRight, Scale, Phone } from 'lucide-react'
import ApplyButton from '@/components/common/ApplyButton'
import type { MichiganCity } from '@/lib/data/cities'

interface CityTrustSectionProps {
  city: MichiganCity
}

const STEPS = [
  {
    icon:  ClipboardList,
    title: 'Apply Online in Minutes',
    body:  'Fill out our simple form with your case type, incident details, and your attorney\'s contact info. No credit check. No paperwork.',
  },
  {
    icon:  UserCheck,
    title: 'We Coordinate With Your Attorney',
    body:  'Our team evaluates your case directly with your licensed Michigan attorney — usually the same business day you apply.',
  },
  {
    icon:  BanknoteIcon,
    title: 'Funds Sent Within 24 Hours',
    body:  'Once approved, up to $5,000 is transferred to you. You repay nothing unless your case wins or settles.',
  },
] as const

interface TrustMetric {
  value: string
  label: string
}

function getTrustMetrics(city: MichiganCity): TrustMetric[] {
  return [
    { value: '$5,000',  label: `Max advance for ${city.name} residents`    },
    { value: '24 hrs',  label: 'Typical time from application to funded'    },
    { value: '0',       label: 'Upfront fees, credit checks, or payments'   },
    { value: '100%',    label: 'Non-recourse — owe nothing if you don\'t win' },
  ]
}

export default function CityTrustSection({ city }: CityTrustSectionProps) {
  const metrics = getTrustMetrics(city)

  return (
    <>
      {/* ── How it works (white) ─────────────────────────────────── */}
      <section
        aria-labelledby={`city-process-heading-${city.slug}`}
        className="bg-slate-50 py-14 sm:py-18"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-2">
              Simple Process
            </p>
            <h2
              id={`city-process-heading-${city.slug}`}
              className="text-2xl sm:text-3xl font-bold text-[#0A1628]"
            >
              How {city.name} Residents Get Funded
            </h2>
          </div>

          <ol
            aria-label={`Three steps to get pre-settlement funding in ${city.name}`}
            className="grid md:grid-cols-3 gap-6 lg:gap-10 relative"
          >
            {/* Connecting line */}
            <div
              aria-hidden="true"
              className="hidden md:block absolute top-9 left-[calc(16.666%+1.5rem)] right-[calc(16.666%+1.5rem)] h-0.5 bg-gradient-to-r from-[#C9A84C]/20 via-[#C9A84C]/60 to-[#C9A84C]/20"
            />

            {STEPS.map(({ icon: Icon, title, body }, idx) => (
              <li
                key={title}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative mb-5">
                  <div className="w-18 h-18 w-[72px] h-[72px] rounded-full bg-[#C9A84C]/10 border-2 border-[#C9A84C]/30 flex items-center justify-center">
                    <Icon aria-hidden="true" size={28} strokeWidth={1.5} className="text-[#C9A84C]" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#0A1628] border-2 border-[#C9A84C]/40 flex items-center justify-center">
                    <span aria-hidden="true" className="text-[10px] font-bold text-[#C9A84C]">{idx + 1}</span>
                  </div>
                </div>
                <h3 className="text-base font-bold text-[#0A1628] mb-2">{title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed max-w-[260px] mx-auto">{body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 text-center">
            <Link
              href="/how-it-works"
              data-event="click"
              data-event-label={`city_trust_how_it_works_${city.slug}`}
              data-event-category="navigation"
              aria-label={`Learn how pre-settlement funding works for ${city.name} residents`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0A1628] hover:text-[#1E3D6B] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded-lg"
            >
              See the full process
              <ArrowRight aria-hidden="true" size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Trust metrics (dark navy) ─────────────────────────────── */}
      <section
        aria-labelledby={`city-metrics-heading-${city.slug}`}
        className="bg-[#0A1628] py-14 sm:py-18"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2
              id={`city-metrics-heading-${city.slug}`}
              className="text-2xl sm:text-3xl font-bold text-white"
            >
              What {city.name} Residents Can Expect
            </h2>
          </div>

          <dl
            aria-label={`Funding metrics for ${city.name}`}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {metrics.map(({ value, label }) => (
              <div
                key={label}
                role="group"
                className="flex flex-col items-center text-center rounded-2xl border border-white/8 bg-white/4 px-4 py-6"
              >
                <dt className="text-3xl sm:text-4xl font-extrabold text-[#C9A84C] mb-2 tabular-nums">
                  {value}
                </dt>
                <dd className="text-xs sm:text-sm text-slate-400 leading-snug">{label}</dd>
              </div>
            ))}
          </dl>

          {/* Court context */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/4 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="shrink-0 w-10 h-10 rounded-xl bg-[#C9A84C]/15 flex items-center justify-center">
              <Scale aria-hidden="true" size={20} className="text-[#C9A84C]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white mb-0.5">
                Cases filed in the {city.courthouse}
              </p>
              <p className="text-xs text-slate-400 leading-snug">
                Our team is familiar with {city.county} case timelines. Most residents wait
                12–36 months for settlement — pre-settlement funding bridges that gap at no risk.
              </p>
            </div>
            <div className="shrink-0">
              <ApplyButton
                size="sm"
                href={`/apply?city=${city.slug}`}
                label="Apply Now"
                eventLabel={`city_metrics_apply_${city.slug}`}
              />
            </div>
          </div>

          {/* Attorney requirement note */}
          <p className="mt-5 text-center text-[11px] text-slate-500 leading-snug max-w-2xl mx-auto">
            Pre-settlement funding is not a loan. Repayment required only upon successful settlement.
            Requires active case with licensed Michigan attorney. {city.name} residents only.
            Amount subject to case evaluation.
          </p>
        </div>
      </section>

      {/* ── Local phone CTA (light) ───────────────────────────────── */}
      <section
        aria-label={`Contact us about funding in ${city.name}`}
        className="bg-slate-50 py-10 sm:py-12"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <p className="text-sm text-slate-600 mb-4">
            Have questions about your {city.name} case?{' '}
            <strong className="text-[#0A1628]">
              Call us — we respond in under 1 hour on business days.
            </strong>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="tel:+18885000050"
              aria-label={`Call 5000 Tomorrow for ${city.name} pre-settlement funding questions`}
              data-event="click"
              data-event-label={`city_trust_call_${city.slug}`}
              data-event-category="contact"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-xl border-2 border-[#0A1628] text-[#0A1628] font-semibold text-sm cursor-pointer hover:bg-[#0A1628] hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
            >
              <Phone aria-hidden="true" size={15} />
              (888) 500-0050
            </Link>
            <ApplyButton
              size="md"
              href={`/apply?city=${city.slug}`}
              label="Apply Online"
              eventLabel={`city_trust_apply_online_${city.slug}`}
            />
          </div>
        </div>
      </section>
    </>
  )
}
