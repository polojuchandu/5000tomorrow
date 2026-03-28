'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { MichiganCity } from '@/lib/data/cities'

interface CityFAQProps {
  city: MichiganCity
}

function buildCityFAQs(city: MichiganCity) {
  const { name, county, courthouse, primaryCaseTypes } = city

  // Human-readable primary case type labels
  const caseTypeMap: Record<string, string> = {
    'car-accident':         'car accidents',
    'truck-accident':       'truck accidents',
    'motorcycle-accident':  'motorcycle accidents',
    'pedestrian-accident':  'pedestrian accidents',
    'rideshare-accident':   'Uber/Lyft accidents',
    'hit-and-run':          'hit-and-run accidents',
    'bicycle-accident':     'bicycle accidents',
    'workers-compensation': "workers' compensation",
    'slip-and-fall':        'slip and fall',
    'workplace-injury':     'workplace injuries',
    'wrongful-death':       'wrongful death',
    'personal-injury':      'personal injury',
    'premises-liability':   'premises liability',
    'other':                'personal injury',
  }

  const topCases = primaryCaseTypes
    .slice(0, 3)
    .map((slug) => caseTypeMap[slug] ?? slug)
    .join(', ')

  return [
    {
      id:       `city-faq-1-${city.slug}`,
      question: `Do you provide pre-settlement funding in ${name}, Michigan?`,
      answer:   `Yes. 5000 Tomorrow serves ${name} residents and all of ${county}. If you have an active personal injury case represented by a licensed Michigan attorney, you may qualify for up to $5,000 in pre-settlement funding — regardless of your credit score or employment status. We fund cases filed in the ${courthouse}.`,
    },
    {
      id:       `city-faq-2-${city.slug}`,
      question: `How quickly can ${name} residents get funded?`,
      answer:   `Most ${name} applicants receive a decision within 24 hours of submitting their application. Once approved, funds are typically transferred within another 24 hours — often the same business day. The entire process from application to money in your account frequently takes under two business days. We work directly with your attorney to speed up the review.`,
    },
    {
      id:       `city-faq-3-${city.slug}`,
      question: `What types of cases do you fund in ${name}?`,
      answer:   `We fund a wide range of personal injury cases in ${name} and ${county}, including ${topCases}, and more. If your case is pending in the ${courthouse} or another Michigan court, and you have a licensed Michigan attorney, contact us to see if you qualify. We evaluate every situation individually.`,
    },
    {
      id:       `city-faq-4-${city.slug}`,
      question: `Do I need an attorney in ${name} to qualify?`,
      answer:   `Yes — an active case represented by a licensed Michigan attorney is required to qualify for pre-settlement funding. This isn't just a formality: we work directly with your attorney to evaluate your case's strength and estimate settlement value. If you don't yet have an attorney, we recommend consulting with a ${name}-area personal injury attorney before applying. We can sometimes assist with referrals — call us at (877) 863-2955.`,
    },
    {
      id:       `city-faq-5-${city.slug}`,
      question: `What if my ${name} case doesn't settle or I lose?`,
      answer:   `If your case is lost, dismissed, or results in no recovery, you owe us absolutely nothing. This is the non-recourse nature of pre-settlement funding — it is not a loan. Your personal assets, credit, and savings are never at risk. Our financial outcome is tied entirely to your case's success, which is why we carefully evaluate each application.`,
    },
    {
      id:       `city-faq-6-${city.slug}`,
      question: `Is this a loan? How is pre-settlement funding different?`,
      answer:   `No — pre-settlement funding is not a loan and should never be called one. It is a non-recourse cash advance against your expected settlement proceeds. There are no monthly payments, no interest charges, no credit check, and no repayment if your case doesn't win. The advance is repaid only from your settlement — and only if you win. This makes it fundamentally different from a personal loan, payday loan, or line of credit.`,
    },
  ]
}

export default function CityFAQ({ city }: CityFAQProps) {
  const faqs = buildCityFAQs(city)

  return (
    <section
      aria-labelledby={`city-faq-heading-${city.slug}`}
      className="bg-white py-14 sm:py-18"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[280px_1fr] gap-10 lg:gap-14 items-start">

          {/* ── Left sticky header ──────────────────────────────────── */}
          <div className="lg:sticky lg:top-28">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-2">
              FAQ
            </p>
            <h2
              id={`city-faq-heading-${city.slug}`}
              className="text-2xl sm:text-3xl font-bold text-[#0A1628] mb-3"
            >
              Questions from {city.name} Residents
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-5">
              Everything {city.county} residents commonly ask about pre-settlement funding.
            </p>
            <Link
              href="/faq"
              aria-label="View our complete FAQ page"
              data-event="click"
              data-event-label={`city_faq_view_all_${city.slug}`}
              data-event-category="navigation"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0A1628] hover:text-[#C9A84C] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded-lg"
            >
              All FAQs
              <ArrowRight aria-hidden="true" size={14} />
            </Link>
          </div>

          {/* ── Right accordion ─────────────────────────────────────── */}
          <div>
            <Accordion
              type="single"
              collapsible
              defaultValue={faqs[0].id}
              className="space-y-2.5"
            >
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="bg-slate-50 rounded-xl border border-slate-200 px-5 shadow-sm data-[state=open]:border-[#C9A84C]/30 data-[state=open]:bg-white data-[state=open]:shadow-md transition-all duration-200"
                >
                  <AccordionTrigger
                    data-event="click"
                    data-event-label={`city_faq_open_${faq.id}`}
                    data-event-category="engagement"
                    className="text-left text-sm sm:text-base font-semibold text-[#0A1628] hover:no-underline py-4 cursor-pointer [&[data-state=open]>svg]:text-[#C9A84C]"
                  >
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-slate-600 leading-relaxed pb-5 pr-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <p className="mt-5 text-xs text-slate-400 leading-snug">
              Informational only — not legal or financial advice.
              Pre-settlement funding is not a loan. Repayment required only upon successful settlement.
              {city.name} residents must have an active case with a licensed Michigan attorney.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
