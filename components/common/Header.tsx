'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import ApplyButton from '@/components/common/ApplyButton'

const NAV_LINKS = [
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Case Types', href: '/case-types' },
  { label: 'FAQ', href: '/faq' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
  { label: 'Attorney Portal', href: '/attorney-portal' },
] as const

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-40 border-b border-white/10"
      aria-label="Site header"
    >
      <div className="bg-[#0A1628] backdrop-blur-sm">
        <nav
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4"
          aria-label="Main navigation"
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded-lg px-2 py-1"
              aria-label="5000 Tomorrow home"
            >
              <div className="w-8 h-8 rounded-lg bg-[#C9A84C] flex items-center justify-center flex-shrink-0">
                <span className="text-[#0A1628] font-bold text-sm">5K</span>
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-bold text-white leading-none">
                  5000 Tomorrow
                </div>
                <div className="text-xs text-[#C9A84C] font-semibold">
                  Legal Funding
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-slate-300 hover:text-white px-3 py-2 rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] cursor-pointer"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop Apply Button */}
            <div className="hidden lg:block">
              <ApplyButton
                size="sm"
                eventLabel="header_apply_now"
                label="Apply Now"
              />
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen ? 'true' : 'false'}
              aria-controls="mobile-menu"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] cursor-pointer"
            >
              {isOpen ? (
                <X size={24} className="text-white" />
              ) : (
                <Menu size={24} className="text-white" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div
              id="mobile-menu"
              className="lg:hidden mt-4 pt-4 border-t border-white/10 space-y-1"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-sm text-slate-300 hover:text-white px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] cursor-pointer"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2">
                <ApplyButton
                  size="sm"
                  eventLabel="header_mobile_apply_now"
                  label="Apply Now"
                  className="w-full"
                />
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
