import Link from 'next/link'
import { Shield, Clock, CheckCircle, Star, Phone, MapPin } from 'lucide-react'
import HeroQuickForm from './HeroQuickForm'

const TRUST_BADGES = [
  { icon: Shield,       label: 'No Credit Check' },
  { icon: CheckCircle,  label: 'No Upfront Fees' },
  { icon: MapPin,       label: 'Michigan Only' },
  { icon: Clock,        label: '24-Hr Approval' },
] as const

const STAR_RATING = { value: 4.9, count: 500 }

export default function HeroSection() {
  return (
    <section
      aria-label="Hero — Get pre-settlement funding"
      className="relative overflow-hidden bg-[#0A1628]"
    >
      {/* Background texture overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />
      {/* Gradient glow */}
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, #C9A84C 0%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-[1fr_440px] gap-10 xl:gap-16 items-center">

          {/* ── Left: Copy ─────────────────────────────────────────── */}
          <div>
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/10 px-4 py-1.5 mb-6">
              <MapPin aria-hidden="true" size={14} className="text-[#C9A84C]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C]">
                Michigan Residents Only
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-4">
              Get Up To{' '}
              <span className="text-[#C9A84C]">$5,000</span>
              <br />
              Before Your Case{' '}
              <br className="hidden sm:block" />
              Settles
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-xl mb-8">
              Michigan's fastest pre-settlement funding. No credit check. No upfront fees.
              You only repay if your case wins — and not a penny more.
            </p>

            {/* Trust badge pills */}
            <ul
              aria-label="Key benefits"
              className="flex flex-wrap gap-2 sm:gap-3 mb-8"
            >
              {TRUST_BADGES.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-1.5 rounded-full bg-white/8 border border-white/15 px-3 py-1.5"
                >
                  <Icon aria-hidden="true" size={14} className="text-[#C9A84C]" />
                  <span className="text-xs sm:text-sm font-medium text-white">{label}</span>
                </li>
              ))}
            </ul>

            {/* Social proof */}
            <div className="flex items-center gap-3 mb-8">
              {/* Star cluster */}
              <div className="flex items-center gap-0.5" aria-label={`Rated ${STAR_RATING.value} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    aria-hidden="true"
                    size={18}
                    className="fill-[#C9A84C] text-[#C9A84C]"
                  />
                ))}
              </div>
              <p className="text-sm text-slate-300">
                <span className="font-bold text-white">{STAR_RATING.value}</span>
                {' '}·{' '}
                Trusted by{' '}
                <span className="font-bold text-white">{STAR_RATING.count}+</span>
                {' '}Michigan families
              </p>
            </div>

            {/* Secondary phone CTA */}
            <div className="flex items-center gap-4">
              <Link
                href="tel:+18885000050"
                aria-label="Call us at 1-888-500-0050"
                data-event="click"
                data-event-label="hero_phone_call"
                data-event-category="contact"
                className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded-lg px-1"
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 border border-white/20">
                  <Phone aria-hidden="true" size={15} className="text-[#C9A84C]" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Questions? Call us</p>
                  <p className="text-sm font-semibold text-white">(888) 500-0050</p>
                </div>
              </Link>
              <span aria-hidden="true" className="text-slate-600">|</span>
              <p className="text-xs text-slate-400">Mon–Fri, 8am–6pm EST</p>
            </div>
          </div>

          {/* ── Right: Quick Form ──────────────────────────────────── */}
          <div>
            <HeroQuickForm />
            {/* Mobile scroll prompt */}
            <p className="mt-4 text-center text-xs text-slate-500 lg:hidden">
              Or{' '}
              <Link
                href="/how-it-works"
                className="underline underline-offset-2 hover:text-slate-300 transition-colors"
              >
                see how it works
              </Link>
            </p>
          </div>

        </div>
      </div>

      {/* Bottom wave divider */}
      <div aria-hidden="true" className="relative h-12 overflow-hidden">
        <svg
          viewBox="0 0 1440 48"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 w-full fill-slate-50"
          preserveAspectRatio="none"
        >
          <path d="M0,48 C360,0 1080,0 1440,48 L1440,48 L0,48 Z" />
        </svg>
      </div>
    </section>
  )
}
