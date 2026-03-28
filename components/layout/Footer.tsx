import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Globe, Heart, Send, Share2 } from 'lucide-react'
import { BUSINESS } from '@/lib/constants/business'

const QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Case Types', href: '/case-types' },
  { label: 'Apply Now', href: '/apply' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const CASE_TYPES_LINKS = [
  { label: 'Auto Accidents', href: '/case-types/car-accident' },
  { label: 'Truck Accidents', href: '/case-types/truck-accident' },
  { label: 'Motorcycle Accidents', href: '/case-types/motorcycle-accident' },
  { label: 'Workers Comp', href: '/case-types/workers-compensation' },
  { label: 'Slip and Fall', href: '/case-types/slip-and-fall' },
  { label: 'Wrongful Death', href: '/case-types/wrongful-death' },
]

const SOCIAL_LINKS = [
  { icon: Share2, href: BUSINESS.social.facebook, label: 'Facebook' },
  { icon: Heart, href: BUSINESS.social.instagram, label: 'Instagram' },
  { icon: Send, href: BUSINESS.social.twitter, label: 'Twitter' },
]

const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="bg-[#0A1628] text-slate-300">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-block hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded"
              aria-label="5000 Tomorrow - Home"
            >
              <Image
                src="/5000-logo.svg"
                alt="5000 Tomorrow"
                width={180}
                height={63}
                className="h-10 w-auto"
                unoptimized
              />
            </Link>
            <p className="text-sm font-semibold text-[#C9A84C]">
              {BUSINESS.tagline}
            </p>
            <p className="text-sm leading-relaxed">
              {BUSINESS.description}
            </p>

            {/* Social Links */}
            <div className="flex gap-4 pt-2">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${label}`}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 text-white hover:bg-[#C9A84C] hover:text-[#0A1628] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-[#C9A84C] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded px-1 py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Case Types */}
          <div>
            <h3 className="font-semibold text-white mb-6">Case Types</h3>
            <ul className="space-y-3">
              {CASE_TYPES_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-[#C9A84C] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded px-1 py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="font-semibold text-white mb-6">Contact</h3>
            <ul className="space-y-4">
              {/* Address */}
              <li>
                <a
                  href={`https://maps.google.com?q=${encodeURIComponent(BUSINESS.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-3 items-start text-sm hover:text-[#C9A84C] transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded px-1 py-0.5"
                >
                  <MapPin
                    size={16}
                    className="text-[#C9A84C] shrink-0 mt-0.5 group-hover:scale-110 transition-transform"
                    aria-hidden="true"
                  />
                  <span>{BUSINESS.address}</span>
                </a>
              </li>

              {/* Phone */}
              <li>
                <a
                  href={BUSINESS.phoneHref}
                  className="flex gap-3 items-center text-sm hover:text-[#C9A84C] transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded px-1 py-0.5"
                >
                  <Phone
                    size={16}
                    className="text-[#C9A84C] group-hover:scale-110 transition-transform"
                    aria-hidden="true"
                  />
                  <span className="font-semibold">{BUSINESS.phone}</span>
                </a>
              </li>

              {/* Website */}
              <li>
                <a
                  href={BUSINESS.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-3 items-center text-sm hover:text-[#C9A84C] transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded px-1 py-0.5"
                >
                  <Globe
                    size={16}
                    className="text-[#C9A84C] group-hover:scale-110 transition-transform"
                    aria-hidden="true"
                  />
                  <span>{BUSINESS.url}</span>
                </a>
              </li>

              {/* Service Area */}
              <li className="text-xs text-slate-500 font-semibold">
                {BUSINESS.serviceArea}
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Bottom Bar */}
        <div className="pt-8 space-y-6">
          {/* Copyright & Legal Links */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-xs text-slate-500">
              © {currentYear} {BUSINESS.name}. All Rights Reserved.
            </p>
            <ul className="flex flex-wrap gap-4 text-xs">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-slate-500 hover:text-[#C9A84C] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded px-1 py-0.5"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-slate-500 hover:text-[#C9A84C] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded px-1 py-0.5"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="text-slate-500 hover:text-[#C9A84C] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded px-1 py-0.5"
                >
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Disclaimer */}
          <p className="text-[10px] text-slate-600 leading-relaxed max-w-4xl">
            {BUSINESS.name} provides non-recourse pre-settlement legal funding. This is not a loan.
            Repayment is only required if you win or settle your case. Approval is based on case merit.
            {BUSINESS.serviceArea}
          </p>
        </div>
      </div>
    </footer>
  )
}
