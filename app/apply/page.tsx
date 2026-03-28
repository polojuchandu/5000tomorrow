import type { Metadata } from 'next'
import { generateStaticMetadata, noIndexMetadata } from '@/lib/seo/metadata'
import ApplyFunnel from './ApplyFunnel'

// Apply page: indexed (it's a conversion destination) but not in the nav sitemap weight
export const metadata: Metadata = generateStaticMetadata(
  'Apply for Pre-Settlement Funding',
  'Apply for up to $5,000 in Michigan pre-settlement legal funding. No credit check. No upfront fees. Takes 5 minutes. Requires an active case with a licensed Michigan attorney.',
  '/apply',
  '/images/og/apply.jpg',
)

// No caching — always fresh
export const dynamic = 'force-dynamic'

export default function ApplyPage() {
  return <ApplyFunnel />
}
