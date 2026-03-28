'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface FAQItem {
  id:       string
  question: string
  answer:   string
}

const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What exactly is pre-settlement funding?',
    answer:
      'Pre-settlement funding — also called a lawsuit advance or legal funding — is a non-recourse cash advance against your expected settlement. Unlike a traditional loan, it\'s not based on your credit score or employment. It\'s based entirely on the merits of your case. If your case doesn\'t win, you owe us nothing.',
  },
  {
    id: 'faq-2',
    question: 'Is this a loan?',
    answer:
      'No. Pre-settlement funding is not a loan and should never be referred to as one. It\'s a purchase of a portion of your future settlement proceeds. You make no monthly payments, there\'s no interest, and if your case is lost or dismissed, you keep the money and owe nothing.',
  },
  {
    id: 'faq-3',
    question: 'Do I need good credit to qualify?',
    answer:
      'No credit check is required. Your credit history, income, and employment status have no bearing on our decision. We evaluate your case\'s strength and likely settlement value — nothing else.',
  },
  {
    id: 'faq-4',
    question: 'How much can I get?',
    answer:
      'We provide up to $5,000 in pre-settlement funding. The actual amount approved depends on the strength of your case, the estimated settlement value, and how far along your case is. Our team will assess your specific situation after you apply.',
  },
  {
    id: 'faq-5',
    question: 'What if I lose my case?',
    answer:
      'If your case is lost, dismissed, or results in no recovery, you owe us absolutely nothing. This is the non-recourse nature of pre-settlement funding — your personal assets and credit are never at risk. Our risk is tied entirely to your case outcome.',
  },
  {
    id: 'faq-6',
    question: 'How long does the process take?',
    answer:
      'Most applicants receive a decision within 24 hours of submitting their application. Once approved, funds are typically transferred within 24 hours. In many cases, the entire process — application to money in your account — takes under two business days.',
  },
  {
    id: 'faq-7',
    question: 'Do I need a Michigan attorney to apply?',
    answer:
      'Yes. You must have an active personal injury case represented by a licensed Michigan attorney. This is required because we review the merits of your case in coordination with your attorney. If you don\'t have an attorney yet, we recommend consulting with one before applying.',
  },
  {
    id: 'faq-8',
    question: 'What types of cases qualify?',
    answer:
      'We fund a wide range of Michigan personal injury cases including: car accidents, truck accidents, motorcycle accidents, pedestrian accidents, rideshare (Uber/Lyft) accidents, workers\' compensation cases, slip and fall, wrongful death, and general personal injury. If you\'re unsure, contact us — we evaluate every case.',
  },
  {
    id: 'faq-9',
    question: 'Will my attorney know about this?',
    answer:
      'Yes. We work in coordination with your attorney during the approval process. Your attorney will be informed and their cooperation is part of the approval process. Most Michigan personal injury attorneys are familiar with pre-settlement funding.',
  },
  {
    id: 'faq-10',
    question: 'Is there a fee to apply?',
    answer:
      'No. Applying is completely free with no obligation. You only enter a funding agreement if you are approved and choose to accept the offered amount.',
  },
]

export default function FAQSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-slate-50 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16 items-start">

          {/* Left: sticky header */}
          <div className="lg:sticky lg:top-24">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-2">
              FAQ
            </p>
            <h2
              id="faq-heading"
              className="text-3xl sm:text-4xl font-bold text-[#0A1628] mb-4"
            >
              Common Questions
            </h2>
            <p className="text-slate-600 text-base leading-relaxed mb-6">
              Pre-settlement funding is straightforward — but it's normal to have questions.
              Here are the ones we hear most often.
            </p>
            <Link
              href="/faq"
              aria-label="View all frequently asked questions"
              data-event="click"
              data-event-label="faq_section_view_all"
              data-event-category="navigation"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0A1628] hover:text-[#1E3D6B] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded-lg"
            >
              View all FAQs
              <ArrowRight aria-hidden="true" size={15} />
            </Link>
          </div>

          {/* Right: accordion */}
          <div>
            <Accordion
              type="single"
              collapsible
              defaultValue="faq-1"
              className="space-y-3"
            >
              {FAQS.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="bg-white rounded-xl border border-slate-200 px-6 shadow-sm data-[state=open]:border-[#C9A84C]/30 data-[state=open]:shadow-md transition-all duration-200"
                >
                  <AccordionTrigger
                    aria-label={faq.question}
                    data-event="click"
                    data-event-label={`faq_open_${faq.id}`}
                    data-event-category="engagement"
                    className="text-left text-sm sm:text-base font-semibold text-[#0A1628] hover:no-underline py-5 cursor-pointer [&[data-state=open]>svg]:text-[#C9A84C]"
                  >
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm sm:text-base text-slate-600 leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Disclaimer */}
            <p className="mt-6 text-xs text-slate-400">
              This content is informational only and does not constitute legal or financial advice.
              Pre-settlement funding is not a loan. You repay only if your case wins or settles.
              Requires active case with licensed Michigan attorney.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
