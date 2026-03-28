/**
 * Examples of generateMetadata() output for key pages.
 * This file is documentation only — not imported by any page.
 *
 * Usage in a page:
 *   export const metadata = generateHomepageMetadata()
 *   OR
 *   export async function generateMetadata({ params }): Promise<Metadata> {
 *     return generateCityMetadata(await getCityBySlug(params.city))
 *   }
 */

import type { Metadata } from 'next'

// ─── 1. Homepage (/): ─────────────────────────────────────────────────────────

export const HOMEPAGE_METADATA_EXAMPLE: Metadata = {
  title: '5000 Tomorrow | Pre-Settlement Legal Funding in Michigan',
  description:
    'Michigan residents: get up to $5,000 in pre-settlement funding in as little as 24 hours. No credit check. No upfront fees. You only repay if your case wins. Requires an active case and attorney.',
  alternates: {
    canonical: 'https://www.5000tomorrow.com',
  },
  openGraph: {
    type:     'website',
    locale:   'en_US',
    url:      'https://www.5000tomorrow.com',
    siteName: '5000 Tomorrow',
    title:    '5000 Tomorrow | Pre-Settlement Legal Funding in Michigan',
    description:
      'Michigan residents: get up to $5,000 in pre-settlement funding in as little as 24 hours. No credit check. No upfront fees. You only repay if your case wins. Requires an active case and attorney.',
    images: [
      {
        url:    'https://www.5000tomorrow.com/images/og/homepage.jpg',
        width:  1200,
        height: 630,
        alt:    '5000 Tomorrow — Pre-Settlement Funding for Michigan Residents',
        type:   'image/jpeg',
      },
    ],
  },
  twitter: {
    card:        'summary_large_image',
    site:        '@5000Tomorrow',
    creator:     '@5000Tomorrow',
    title:       '5000 Tomorrow | Pre-Settlement Legal Funding in Michigan',
    description: 'Michigan residents: get up to $5,000 in pre-settlement funding in as little as 24 hours. No credit check. No upfront fees. You only repay if your case wins.',
    images:      ['https://www.5000tomorrow.com/images/og/homepage.jpg'],
  },
}

// ─── 2. Detroit City Page (/cities/detroit) ───────────────────────────────────
//        Target query: "detroit legal funding"

export const DETROIT_METADATA_EXAMPLE: Metadata = {
  title:       'Pre-Settlement Legal Funding in Detroit, MI | 5000 Tomorrow',
  description: 'Detroit residents: get up to $5,000 in pre-settlement funding for your personal injury case. No credit check. No upfront fees. Repay only if you win. Requires an active case and attorney in Wayne County.',
  alternates: {
    canonical: 'https://www.5000tomorrow.com/cities/detroit',
  },
  openGraph: {
    type:     'website',
    locale:   'en_US',
    url:      'https://www.5000tomorrow.com/cities/detroit',
    siteName: '5000 Tomorrow',
    title:    'Pre-Settlement Legal Funding in Detroit, MI | 5000 Tomorrow',
    description:
      'Detroit residents: get up to $5,000 in pre-settlement funding for your personal injury case. No credit check. No upfront fees. Repay only if you win.',
    images: [
      {
        url:    'https://www.5000tomorrow.com/images/og/michigan-legal-funding.jpg',
        width:  1200,
        height: 630,
        alt:    'Pre-Settlement Legal Funding in Detroit, Michigan',
        type:   'image/jpeg',
      },
    ],
  },
  twitter: {
    card:        'summary_large_image',
    site:        '@5000Tomorrow',
    creator:     '@5000Tomorrow',
    title:       'Pre-Settlement Legal Funding in Detroit, MI | 5000 Tomorrow',
    description: 'Detroit residents: get up to $5,000 in pre-settlement funding for your personal injury case. No credit check. No upfront fees.',
    images:      ['https://www.5000tomorrow.com/images/og/michigan-legal-funding.jpg'],
  },
}

// ─── 3. Car Accident Case Page (/cases/car-accident) ─────────────────────────
//        Target query: "auto accidents" / "car accident settlement funding michigan"

export const CAR_ACCIDENT_METADATA_EXAMPLE: Metadata = {
  title:       'Car Accident Settlement Funding Michigan | 5000 Tomorrow',
  description: 'Injured in a Michigan car accident? Get up to $5,000 in pre-settlement funding while your case is pending. No credit check. No upfront fees. Repay only if you win. Must have an active case and attorney.',
  alternates: {
    canonical: 'https://www.5000tomorrow.com/cases/car-accident',
  },
  openGraph: {
    type:     'website',
    locale:   'en_US',
    url:      'https://www.5000tomorrow.com/case-types/car-accident',
    siteName: '5000 Tomorrow',
    title:    'Car Accident Settlement Funding Michigan | 5000 Tomorrow',
    description:
      'Injured in a Michigan car accident? Get up to $5,000 in pre-settlement funding while your case is pending. No credit check. No upfront fees. Repay only if you win.',
    images: [
      {
        url:    'https://www.5000tomorrow.com/images/og/case-types/car-accident.jpg',
        width:  1200,
        height: 630,
        alt:    'Car Accident Pre-Settlement Funding — Michigan',
        type:   'image/jpeg',
      },
    ],
  },
  twitter: {
    card:        'summary_large_image',
    site:        '@5000Tomorrow',
    creator:     '@5000Tomorrow',
    title:       'Car Accident Settlement Funding Michigan | 5000 Tomorrow',
    description: 'Injured in a Michigan car accident? Get up to $5,000 in pre-settlement funding. No credit check. No upfront fees. Repay only if you win.',
    images:      ['https://www.5000tomorrow.com/images/og/case-types/car-accident.jpg'],
  },
}
