'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { BUSINESS } from '@/lib/constants/business'
import ApplyButton from '@/components/common/ApplyButton'

const NAV_LINKS = [
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Case Types', href: '/case-types' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Blog', href: '/blog' },
  { label: 'Attorney Portal', href: '/attorney-portal' },
]

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <>
      <header
        className="sticky top-0 z-40 bg-[#0A1628] border-b border-white/5 backdrop-blur-sm"
        role="banner"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-white hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded"
              aria-label="5000 Tomorrow - Home"
            >
              <span className="text-[#C9A84C]">5000</span>
              <span>Tomorrow</span>
            </Link>

            {/* Desktop Navigation */}
            <nav
              aria-label="Main navigation"
              className="hidden md:flex items-center gap-8"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded px-2 py-1 ${
                    isActive(link.href)
                      ? 'text-[#C9A84C]'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Right Section */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href={BUSINESS.phoneHref}
                aria-label={`Call us at ${BUSINESS.phoneFormatted}`}
                className="text-[#C9A84C] font-semibold text-sm hover:text-[#e0c068] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded px-2 py-1"
              >
                {BUSINESS.phone}
              </a>
              <ApplyButton
                size="sm"
                label="Apply Now"
                eventLabel="header_apply_now"
              />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              className="md:hidden p-2 rounded-xl text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
            >
              {mobileMenuOpen ? (
                <X size={24} aria-hidden="true" />
              ) : (
                <Menu size={24} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-30 md:hidden"
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.nav
              id="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="fixed right-0 top-16 bottom-0 w-full max-w-sm bg-[#0A1628] border-l border-white/10 z-30 md:hidden overflow-y-auto"
              role="navigation"
              aria-label="Mobile menu"
            >
              <div className="p-6 space-y-6">
                {/* Close Button */}
                <div className="flex justify-end">
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close menu"
                    className="p-2 rounded-xl text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
                  >
                    <X size={24} aria-hidden="true" />
                  </button>
                </div>

                {/* Mobile Nav Links */}
                <ul className="space-y-2">
                  {NAV_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-4 py-3 rounded-lg font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] ${
                          isActive(link.href)
                            ? 'bg-[#C9A84C] text-[#0A1628]'
                            : 'text-slate-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Divider */}
                <div className="border-t border-white/10" />

                {/* Mobile Phone & CTA */}
                <div className="space-y-3">
                  <a
                    href={BUSINESS.phoneHref}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
                  >
                    <Phone size={18} aria-hidden="true" />
                    {BUSINESS.phone}
                  </a>
                  <ApplyButton
                    size="md"
                    label="Apply Now"
                    eventLabel="header_mobile_apply_now"
                    onClick={() => setMobileMenuOpen(false)}
                  />
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
