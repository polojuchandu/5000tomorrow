'use client'

import { useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

// ─── Types ────────────────────────────────────────────────────────────────────

interface FAQItem {
  id:       string
  question: string
  answer:   string
  category: string
}

interface FAQPageAccordionProps {
  faqs:       FAQItem[]
  categories: string[]
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function FAQPageAccordion({ faqs, categories }: FAQPageAccordionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const filtered = activeCategory === 'all'
    ? faqs
    : faqs.filter((f) => f.category === activeCategory)

  return (
    <div>
      {/* Category filter tabs */}
      <div
        role="tablist"
        aria-label="Filter FAQs by category"
        className="flex flex-wrap gap-2 mb-8"
      >
        <button
          role="tab"
          aria-selected={activeCategory === 'all'}
          onClick={() => setActiveCategory('all')}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] cursor-pointer ${
            activeCategory === 'all'
              ? 'bg-[#0A1628] text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          All ({faqs.length})
        </button>
        {categories.map((cat) => {
          const count = faqs.filter((f) => f.category === cat).length
          return (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#0A1628] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat} ({count})
            </button>
          )
        })}
      </div>

      {/* Accordion */}
      <Accordion
        type="single"
        collapsible
        defaultValue={filtered[0]?.id}
        key={activeCategory}
        className="space-y-2.5"
      >
        {filtered.map((faq) => (
          <AccordionItem
            key={faq.id}
            value={faq.id}
            className="bg-white rounded-xl border border-slate-200 px-5 shadow-sm data-[state=open]:border-[#C9A84C]/30 data-[state=open]:shadow-md transition-all duration-200"
          >
            <AccordionTrigger
              data-event="click"
              data-event-label={`faq_page_open_${faq.id}`}
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

      {filtered.length === 0 && (
        <p className="text-center text-sm text-slate-500 py-8">
          No questions in this category.
        </p>
      )}
    </div>
  )
}
