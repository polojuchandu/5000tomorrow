import Link from 'next/link'
import { ArrowLeft, Phone, FileText, MapPin, HelpCircle } from 'lucide-react'
import ApplyButton from '@/components/common/ApplyButton'

const HELPFUL_LINKS = [
  { href: '/how-it-works',    icon: FileText,    label: 'How It Works'       },
  { href: '/faq',             icon: HelpCircle,  label: 'FAQ'                },
  { href: '/cities',          icon: MapPin,      label: 'Cities We Serve'    },
  { href: '/apply',           icon: ArrowLeft,   label: 'Apply Now'          },
]

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="min-h-screen bg-[#0A1628] flex flex-col items-center justify-center px-4 py-16"
    >
      {/* Grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize:  '32px 32px',
        }}
      />

      <div className="relative text-center max-w-lg mx-auto">

        {/* 404 number */}
        <p
          aria-hidden="true"
          className="text-[120px] sm:text-[160px] font-extrabold leading-none text-[#C9A84C]/10 select-none mb-0"
        >
          404
        </p>

        <div className="-mt-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-3">
            Page Not Found
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            This page doesn't exist
          </h1>
          <p className="text-slate-400 text-base leading-relaxed mb-8">
            The link you followed may be broken, outdated, or the page may have moved.
            Let us point you in the right direction.
          </p>
        </div>

        {/* Primary CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <ApplyButton
            size="lg"
            label="Apply for Funding"
            eventLabel="404_apply_cta"
          />
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors duration-200 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded-lg px-2 py-1"
          >
            <ArrowLeft aria-hidden="true" size={15} />
            Back to homepage
          </Link>
        </div>

        {/* Helpful links */}
        <div className="border-t border-white/10 pt-8">
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-4">
            Helpful pages
          </p>
          <nav aria-label="Helpful pages" className="flex flex-wrap justify-center gap-3">
            {HELPFUL_LINKS.map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-300 hover:border-[#C9A84C]/30 hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
              >
                <Icon aria-hidden="true" size={13} className="text-[#C9A84C]" />
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Phone CTA */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <p className="text-sm text-slate-500 mb-3">
            Need help finding what you're looking for?
          </p>
          <Link
            href="tel:+18885000050"
            aria-label="Call 5000 Tomorrow at 1-888-500-0050"
            data-event="click"
            data-event-label="404_phone_cta"
            data-event-category="contact"
            className="inline-flex items-center gap-2 text-[#C9A84C] hover:text-[#e0c068] transition-colors duration-200 font-semibold text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded-lg"
          >
            <Phone aria-hidden="true" size={15} />
            (877) 863-2955
          </Link>
        </div>

      </div>
    </main>
  )
}
