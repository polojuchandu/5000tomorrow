import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Phone } from 'lucide-react'
import { BUSINESS } from '@/lib/constants/business'

export const metadata: Metadata = {
  title: 'Michigan Residents Only | 5000 Tomorrow',
  description: '5000 Tomorrow currently provides pre-settlement legal funding to Michigan residents only.',
  robots: { index: false, follow: false },
}

export default function MichiganOnlyPage() {
  return (
    <main className="min-h-screen bg-[#0A1628] flex flex-col items-center justify-center px-4 py-16">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative text-center max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-full bg-[#C9A84C]/10 flex items-center justify-center mx-auto mb-6">
          <MapPin size={32} className="text-[#C9A84C]" aria-hidden="true" />
        </div>

        <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-3">
          Service Area
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Michigan Residents Only
        </h1>
        <p className="text-slate-400 text-base leading-relaxed mb-8">
          5000 Tomorrow currently provides pre-settlement legal funding exclusively to Michigan residents with active injury cases.
          We are not able to fund cases outside of Michigan at this time.
        </p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-left">
          <p className="text-white font-semibold mb-1">Serving all of Michigan</p>
          <p className="text-slate-400 text-sm">
            Detroit · Grand Rapids · Lansing · Flint · Ann Arbor · Southfield and everywhere in between.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={BUSINESS.phoneHref}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C9A84C] text-[#0A1628] font-bold hover:bg-[#b8943e] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1628]"
          >
            <Phone size={18} aria-hidden="true" />
            {BUSINESS.phone}
          </a>
          <Link
            href="/"
            className="text-slate-400 hover:text-white transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded px-2 py-1"
          >
            ← Back to homepage
          </Link>
        </div>
      </div>
    </main>
  )
}
