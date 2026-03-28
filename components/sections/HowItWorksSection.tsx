import Link from 'next/link'
import { ClipboardList, UserCheck, BanknoteIcon, ArrowRight } from 'lucide-react'
import ApplyButton from '@/components/common/ApplyButton'

interface Step {
  number: string
  icon:    React.ElementType
  title:   string
  body:    string
  detail?: string
}

const STEPS: Step[] = [
  {
    number: '03',
    icon:   BanknoteIcon,
    title:  'Funds Sent to You',
    body:   'Once approved, up to $5,000 is sent directly to you. You repay nothing unless your case wins or settles.',
    detail: 'Funds typically in 24 hours',
  },
  {
    number: '02',
    icon:   UserCheck,
    title:  'We Review With Your Attorney',
    body:   'Our team evaluates your case and coordinates directly with your licensed Michigan attorney — usually within a few hours, not weeks.',
    detail: 'Most decisions same business day',
  },
  {
    number: '01',
    icon:   ClipboardList,
    title:  'Apply in 5 Minutes',
    body:   'Fill out our simple online form. Tell us your case type, city, and attorney contact. No paperwork. No credit check.',
    detail: 'Available 24/7 online',
  },
]

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="bg-slate-50 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-2">
            Simple Process
          </p>
          <h2
            id="how-it-works-heading"
            className="text-3xl sm:text-4xl font-bold text-[#0A1628] mb-4"
          >
            Get Funded in 3 Steps
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We've helped 500+ Michigan families get financial relief while their cases
            are pending. Here's how straightforward it is.
          </p>
        </div>

        {/* Steps */}
        <ol
          aria-label="Three steps to get funded"
          className="relative grid md:grid-cols-3 gap-8 lg:gap-12"
        >
          {/* Connecting line — desktop only */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-1/2 -translate-y-1/2 left-[calc(16.666%+2rem)] right-[calc(16.666%+2rem)] h-0.5 bg-gradient-to-r from-[#C9A84C]/30 via-[#C9A84C] to-[#C9A84C]/30 -z-10"
          />

          {STEPS.map((step, idx) => {
            const Icon = step.icon
            return (
              <li
                key={step.number}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Step number + icon circle */}
                <div className="relative mb-6">
                  {/* Outer ring */}
                  <div className="w-20 h-20 rounded-full bg-[#C9A84C]/10 border-2 border-[#C9A84C]/30 flex items-center justify-center transition-all duration-300 group-hover:border-[#C9A84C] group-hover:bg-[#C9A84C]/15">
                    <Icon
                      aria-hidden="true"
                      size={32}
                      className="text-[#C9A84C]"
                      strokeWidth={1.5}
                    />
                  </div>
                  {/* Number badge */}
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#0A1628] border-2 border-[#C9A84C]/50 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-[#C9A84C]" aria-hidden="true">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#0A1628] mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-3 max-w-[280px] mx-auto">
                  {step.body}
                </p>
                {step.detail && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#C9A84C]">
                    <span aria-hidden="true">✓</span>
                    {step.detail}
                  </span>
                )}

                {/* Arrow between steps — mobile only */}
                {idx < STEPS.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="md:hidden mt-4 text-[#C9A84C]/50"
                  >
                    <ArrowRight size={20} className="rotate-90" />
                  </div>
                )}
              </li>
            )
          })}
        </ol>

        {/* CTA row */}
        <div className="mt-12 lg:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          <ApplyButton
            size="lg"
            eventLabel="how_it_works_apply_now"
            label="Start My Application"
          />
          <Link
            href="/faq"
            aria-label="Read frequently asked questions"
            data-event="click"
            data-event-label="how_it_works_faq_link"
            data-event-category="navigation"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-[#0A1628] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded-lg px-2 py-1"
          >
            Have questions? Read our FAQ
            <ArrowRight aria-hidden="true" size={15} />
          </Link>
        </div>

        {/* Disclaimer */}
        <p className="mt-8 text-center text-xs text-slate-400 max-w-2xl mx-auto">
          Pre-settlement funding is not a loan. You repay only if your case wins or settles.
          Requires an active case with a licensed Michigan attorney.
        </p>
      </div>
    </section>
  )
}
