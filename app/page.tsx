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
