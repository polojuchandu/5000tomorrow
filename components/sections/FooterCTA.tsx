'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Phone, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Sticky bottom bar — visible only on mobile (hidden at lg+).
 * Appears after the user scrolls past 300px.
 * Adds bottom padding to <body> to prevent content overlap via CSS.
 */
export default function FooterCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Body padding spacer — always rendered so layout doesn't jump */}
      <div aria-hidden="true" className="lg:hidden h-[72px]" />

      {/* Sticky bar */}
      <div
        role="complementary"
        aria-label="Quick apply and call options"
        className={cn(
          'fixed bottom-0 inset-x-0 z-50 lg:hidden',
          'bg-[#0A1628] border-t border-white/10',
          'shadow-[0_-4px_24px_rgba(10,22,40,0.5)]',
          'transition-transform duration-300 ease-in-out',
          visible ? 'translate-y-0' : 'translate-y-full',
        )}
      >
        <div className="flex items-center gap-3 px-4 py-3">

          {/* Phone CTA */}
          <Link
            href="tel:+18885000050"
            aria-label="Call 5000 Tomorrow at 1-888-500-0050"
            data-event="click"
            data-event-label="footer_cta_call"
            data-event-category="contact"
            className={cn(
              'flex-1 flex items-center justify-center gap-2',
              'h-12 rounded-xl border border-white/20',
              'text-white text-sm font-semibold',
              'hover:bg-white/8 active:bg-white/15',
              'transition-colors duration-150 cursor-pointer',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]',
            )}
          >
            <Phone aria-hidden="true" size={16} className="text-[#C9A84C]" />
            Call Us
          </Link>

          {/* Apply CTA */}
          <Link
            href="/apply"
            aria-label="Apply now for pre-settlement funding"
            data-event="click"
            data-event-label="footer_cta_apply_now"
            data-event-category="conversion"
            className={cn(
              'flex-[2] flex items-center justify-center gap-2',
              'h-12 rounded-xl',
              'bg-[#C9A84C] hover:bg-[#b8973d] active:bg-[#a5872e]',
              'text-[#0A1628] text-sm font-bold',
              'shadow-[0_2px_12px_rgba(201,168,76,0.40)]',
              'transition-all duration-150 cursor-pointer',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1628]',
            )}
          >
            Apply Now — It's Free
            <ChevronRight aria-hidden="true" size={16} />
          </Link>

        </div>

        {/* Safe area spacer for notched phones */}
        <div
          aria-hidden="true"
          className="h-[env(safe-area-inset-bottom,0px)] bg-[#0A1628]"
        />
      </div>
    </>
  )
}
