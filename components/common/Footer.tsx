import Link from 'next/link'
import { MapPin, Phone, Mail } from 'lucide-react'

const FOOTER_SECTIONS = {
  product: {
    label: 'Product',
    links: [
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'Case Types', href: '/case-types' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Pricing', href: '/how-it-works#pricing' },
    ],
  },
  company: {
    label: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
      { label: 'Attorney Portal', href: '/attorney-portal' },
    ],
  },
  legal: {
    label: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Disclaimer', href: '/disclaimer' },
    ],
  },
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="bg-[#0A1628] border-t border-white/10"
      aria-labelledby="footer-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12 lg:mb-16">
          {/* Brand & Contact */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 group mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded-lg px-2 py-1"
              aria-label="5000 Tomorrow home"
            >
              <div className="w-10 h-10 rounded-lg bg-[#C9A84C] flex items-center justify-center">
                <span className="text-[#0A1628] font-bold">5K</span>
              </div>
              <div>
                <div className="text-base font-bold text-white">
                  5000 Tomorrow
                </div>
                <div className="text-xs text-[#C9A84C] font-semibold">
                  Legal Funding
                </div>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-sm">
              Pre-settlement funding for Michigan residents with active cases and attorneys. Fast approvals, no credit check, non-recourse.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <a
                href="tel:+18885000050"
                className="flex items-start gap-3 text-sm text-slate-400 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded py-1 px-1"
              >
                <Phone size={16} className="text-[#C9A84C] mt-1 flex-shrink-0" />
                <span>(888) 500-0050</span>
              </a>
              <a
                href="mailto:hello@5000tomorrow.com"
                className="flex items-start gap-3 text-sm text-slate-400 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded py-1 px-1"
              >
                <Mail size={16} className="text-[#C9A84C] mt-1 flex-shrink-0" />
                <span>hello@5000tomorrow.com</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-slate-400 py-1 px-1">
                <MapPin size={16} className="text-[#C9A84C] mt-1 flex-shrink-0" />
                <span>Michigan, USA</span>
              </div>
            </div>
          </div>

          {/* Navigation sections */}
          {Object.entries(FOOTER_SECTIONS).map(([key, section]) => (
            <nav key={key} aria-label={`${section.label} links`}>
              <h3 className="text-sm font-semibold text-white mb-4">
                {section.label}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-[#C9A84C] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded py-1 px-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Legal disclaimers */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="space-y-3 text-xs text-slate-500 leading-relaxed">
            <p>
              <strong>Important:</strong> Pre-settlement funding is not a loan. 5000 Tomorrow does not offer loans. All funding is strictly non-recourse — if your case doesn\'t win, you owe nothing.
            </p>
            <p>
              <strong>Service Area:</strong> 5000 Tomorrow provides pre-settlement legal funding to Michigan residents only. Applicants must have an active case with a licensed Michigan attorney.
            </p>
            <p>
              5000 Tomorrow is not a law firm and does not provide legal advice. Always consult with your attorney about pre-settlement funding.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {currentYear} 5000 Tomorrow. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <Link
              href="/privacy-policy"
              className="text-slate-500 hover:text-[#C9A84C] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded py-1 px-1"
            >
              Privacy
            </Link>
            <span className="text-slate-700">•</span>
            <Link
              href="/terms"
              className="text-slate-500 hover:text-[#C9A84C] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded py-1 px-1"
            >
              Terms
            </Link>
            <span className="text-slate-700">•</span>
            <Link
              href="/disclaimer"
              className="text-slate-500 hover:text-[#C9A84C] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded py-1 px-1"
            >
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
