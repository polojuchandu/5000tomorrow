import Link from 'next/link'
import { MapPin, Phone, Shield, Clock, CheckCircle, Star } from 'lucide-react'
import ApplyButton from '@/components/common/ApplyButton'
import type { MichiganCity } from '@/lib/data/cities'
import { cityPath } from '@/lib/data/cities'

interface CityHeroProps {
  city: MichiganCity
}

const TRUST_BADGES = [
  { icon: Shield,       label: 'No Credit Check'  },
  { icon: CheckCircle,  label: 'No Upfront Fees'  },
  { icon: Clock,        label: '24-Hr Approval'   },
  { icon: MapPin,       label: 'Michigan Only'     },
] as const

export default function CityHero({ city }: CityHeroProps) {
  return (
    <section
      aria-labelledby="city-hero-heading"
      className="relative overflow-hidden bg-[#0A1628]"
    >
      {/* Grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize:  '32px 32px',
        }}
      />
      {/* Gold glow */}
      <div
        aria-hidden="true"
        className="absolute -top-48 -right-48 w-[640px] h-[640px] rounded-full opacity-[0.07]"
        style={{ background: 'radial-gradient(circle, #C9A84C 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-[1fr_auto] gap-10 xl:gap-16 items-start">

          {/* ── Left copy ──────────────────────────────────────────── */}
          <div className="max-w-2xl">

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-5">
              <Link
                href="/"
                className="text-xs text-slate-400 hover:text-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A84C] rounded"
              >
                Home
              </Link>
              <span aria-hidden="true" className="text-slate-600 text-xs">/</span>
              <span className="text-xs text-[#C9A84C] font-medium" aria-current="page">
                {city.name}
              </span>
            </nav>

            {/* Location pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/10 px-4 py-1.5 mb-6">
              <MapPin aria-hidden="true" size={13} className="text-[#C9A84C]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C]">
                {city.name}, {city.county}
              </span>
            </div>

            {/* Headline */}
            <h1
              id="city-hero-heading"
              className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.1] tracking-tight mb-4"
            >
              Pre-Settlement Legal{' '}
              <br className="hidden sm:block" />
              Funding in{' '}
              <span className="text-[#C9A84C]">{city.name}, MI</span>
            </h1>

            {/* Hero tagline */}
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-6">
              {city.heroTagline}
            </p>

            {/* Unique city copy */}
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-8 max-w-xl">
              {city.copySnippet}
            </p>

            {/* Trust badges */}
            <ul aria-label="Key benefits" className="flex flex-wrap gap-2 sm:gap-3 mb-8">
              {TRUST_BADGES.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-1.5 rounded-full bg-white/8 border border-white/15 px-3 py-1.5"
                >
                  <Icon aria-hidden="true" size={13} className="text-[#C9A84C]" />
                  <span className="text-xs font-medium text-white">{label}</span>
                </li>
              ))}
            </ul>

            {/* Star rating */}
            <div className="flex items-center gap-3 mb-8">
              <div
                className="flex items-center gap-0.5"
                aria-label="Rated 4.9 out of 5 stars"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    aria-hidden="true"
                    size={16}
                    className="fill-[#C9A84C] text-[#C9A84C]"
                  />
                ))}
              </div>
              <p className="text-sm text-slate-300">
                <span className="font-bold text-white">4.9</span>
                {' · '}
                Trusted by <span className="font-bold text-white">500+</span> Michigan families
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <ApplyButton
                href={`/apply?city=${city.slug}`}
                size="lg"
                label={`Apply Now — ${city.name}`}
                eventLabel={`city_hero_apply_${city.slug}`}
              />
              <Link
                href="tel:+18885000050"
                aria-label="Call 5000 Tomorrow at 1-888-500-0050"
                data-event="click"
                data-event-label={`city_hero_call_${city.slug}`}
                data-event-category="contact"
                className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded-lg px-1"
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 border border-white/20">
                  <Phone aria-hidden="true" size={15} className="text-[#C9A84C]" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400">Questions? Call us</p>
                  <p className="text-sm font-semibold text-white">(888) 500-0050</p>
                </div>
              </Link>
            </div>
          </div>

          {/* ── Right: Serving-areas card ───────────────────────────── */}
          <aside
            aria-label="Service area information"
            className="hidden lg:block w-64 xl:w-72 bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-3">
              Serving {city.county}
            </p>
            <p className="text-sm text-white font-semibold mb-3">{city.name} &amp; surrounding areas:</p>
            <ul aria-label="Cities we serve near you" className="space-y-1.5 mb-5">
              {city.nearbyAreas.map((area) => (
                <li key={area} className="flex items-center gap-2 text-sm text-slate-300">
                  <span aria-hidden="true" className="w-1 h-1 rounded-full bg-[#C9A84C] shrink-0" />
                  {area}
                </li>
              ))}
            </ul>
            <div className="border-t border-white/10 pt-4">
              <p className="text-xs text-slate-400 leading-snug">
                Cases filed in the{' '}
                <span className="text-white">{city.courthouse}</span>.
              </p>
            </div>
            <div className="mt-4 border-t border-white/10 pt-4">
              <p className="text-xs font-semibold text-slate-400 mb-2">Nearby cities:</p>
              <div className="flex flex-wrap gap-2">
                {city.relatedCities.map((slug) => (
                  <Link
                    key={slug}
                    href={cityPath(slug)}
                    data-event="click"
                    data-event-label={`city_hero_nearby_${slug}`}
                    data-event-category="internal_linking"
                    className="text-xs text-[#C9A84C] hover:text-[#e0c068] underline underline-offset-2 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A84C] rounded capitalize"
                  >
                    {slug.replace(/-/g, ' ')}
                  </Link>
                ))}
              </div>
            </div>
          </aside>

        </div>
      </div>

      {/* Wave divider */}
      <div aria-hidden="true" className="relative h-10 overflow-hidden">
        <svg viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 w-full fill-slate-50" preserveAspectRatio="none">
          <path d="M0,40 C360,0 1080,0 1440,40 L1440,40 L0,40 Z" />
        </svg>
      </div>
    </section>
  )
}
