import Link from 'next/link'
import { Phone } from 'lucide-react'
import { BUSINESS } from '@/lib/constants/business'
import ApplyButton from '@/components/common/ApplyButton'

export default function StickyMobileCTA() {
  return (
    <>
      {/* Mobile CTA Bar - Hidden on desktop */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-[#C9A84C] border-t border-[#C9A84C]/20 z-40 safe-bottom">
        <div className="flex items-center justify-between gap-2 h-16 px-4">
          {/* Left: Heading */}
          <p className="font-bold text-[#0A1628] text-sm truncate">
            Get $5,000 Today
          </p>

          {/* Right: Buttons */}
          <div className="flex gap-2">
            {/* Apply Button */}
            <ApplyButton
              size="sm"
              label="Apply"
              eventLabel="sticky_cta_apply"
              className="text-xs"
            />

            {/* Call Button */}
            <Link
              href={BUSINESS.phoneHref}
              aria-label={`Call us at ${BUSINESS.phoneFormatted}`}
              data-event="click"
              data-event-label="sticky_cta_call"
              data-event-category="contact"
              className="inline-flex items-center justify-center gap-1.5 h-11 px-3 rounded-xl bg-white text-[#0A1628] font-semibold text-sm hover:bg-slate-100 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#C9A84C] focus-visible:ring-[#0A1628]"
            >
              <Phone size={16} aria-hidden="true" />
              <span className="hidden xs:inline">Call</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Spacer for body padding - prevents content from hiding behind fixed CTA */}
      <div className="md:hidden h-16" />
    </>
  )
}
