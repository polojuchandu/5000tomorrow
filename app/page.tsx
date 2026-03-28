import type { Metadata } from 'next'
import { generateHomepageMetadata } from '@/lib/seo/metadata'
import {
  buildOrganizationSchema,
  buildLocalBusinessSchema,
  buildWebSiteSchema,
  buildServiceSchema,
  buildSchemaGraph,
  serializeSchema,
} from '@/lib/seo/schema'

import HeroSection         from '@/components/sections/HeroSection'
import HowItWorksSection   from '@/components/sections/HowItWorksSection'
import CaseTypesSection    from '@/components/sections/CaseTypesSection'
import StatsSection        from '@/components/sections/StatsSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import FAQSection          from '@/components/sections/FAQSection'
import AttorneySection     from '@/components/sections/AttorneySection'
import FooterCTA           from '@/components/sections/FooterCTA'

export const metadata: Metadata = generateHomepageMetadata()

export default function HomePage() {
  const jsonLd = buildSchemaGraph(
    buildOrganizationSchema(),
    buildLocalBusinessSchema(),
    buildWebSiteSchema(),
    buildServiceSchema(),
  )

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeSchema(jsonLd) }}
      />

      {/* Skip-to-main-content link (WCAG 2.4.1) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-xl focus:bg-[#C9A84C] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-[#0A1628] focus:shadow-lg"
      >
        Skip to main content
      </a>

      <main id="main-content">
        {/*
         * Section render order (conversion-optimized):
         * 1. Hero          — immediate value prop + form
         * 2. HowItWorks    — reduces friction / objections
         * 3. CaseTypes     — confirms eligibility
         * 4. Stats         — builds credibility
         * 5. Testimonials  — social proof
         * 6. FAQ           — handles remaining objections
         * 7. Attorney      — validates requirement + referral
         * 8. FooterCTA     — sticky mobile conversion bar
         */}
        <HeroSection />
        <HowItWorksSection />
        <CaseTypesSection />
        <StatsSection />
        <TestimonialsSection />
        <FAQSection />
        <AttorneySection />
        <FooterCTA />
      </main>
    </>
  )
}
