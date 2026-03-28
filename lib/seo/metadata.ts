import type { Metadata } from 'next'
import type { BlogPost, CaseType, CityPage } from '@/types'

// ─── Site Constants ───────────────────────────────────────────────────────────

export const SITE = {
  url:            'https://www.5000tomorrow.com',
  name:           '5000 Tomorrow',
  legalName:      '5000 Tomorrow LLC',
  phone:          '(877) 863-2955',
  phoneE164:      '+18885000050',
  email:          'info@5000tomorrow.com',
  address: {
    state:        'MI',
    country:      'US',
    countryFull:  'United States',
    stateFull:    'Michigan',
  },
  twitter:        '@5000Tomorrow',
  description:    'Michigan pre-settlement legal funding. Get up to $5,000 within 24 hours. No credit check. No upfront fees. Repay only if you win.',
  defaultOgImage: '/favicon.ico',
} as const

// ─── Root Metadata (used in app/layout.tsx) ───────────────────────────────────

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default:  '5000 Tomorrow | Michigan Pre-Settlement Legal Funding',
    template: '%s | 5000 Tomorrow',
  },
  description: SITE.description,
  authors:     [{ name: SITE.name, url: SITE.url }],
  creator:     SITE.name,
  publisher:   SITE.name,
  category:    'legal services',
  keywords: [
    'pre-settlement funding Michigan',
    'lawsuit funding Michigan',
    'legal funding Michigan',
    'personal injury funding',
    'settlement advance Michigan',
    'legal cash advance',
    'Michigan legal funding',
  ],
  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:                  true,
      follow:                 true,
      'max-video-preview':    -1,
      'max-image-preview':    'large',
      'max-snippet':          -1,
    },
  },
  openGraph: {
    type:     'website',
    locale:   'en_US',
    url:      SITE.url,
    siteName: SITE.name,
    title:    '5000 Tomorrow | Michigan Pre-Settlement Legal Funding',
    description: SITE.description,
    images: [
      {
        url:    `${SITE.url}${SITE.defaultOgImage}`,
        width:  1200,
        height: 630,
        alt:    '5000 Tomorrow — Pre-Settlement Legal Funding in Michigan',
        type:   'image/jpeg',
      },
    ],
  },
  twitter: {
    card:    'summary_large_image',
    site:    SITE.twitter,
    creator: SITE.twitter,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  },
  alternates: {
    canonical: SITE.url,
  },
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function ogImageUrl(path: string): string {
  if (path.startsWith('http')) return path
  return `${SITE.url}${path}`
}

function buildOgImages(imagePath: string, alt: string) {
  return [{ url: ogImageUrl(imagePath), width: 1200, height: 630, alt, type: 'image/jpeg' as const }]
}

// ─── Homepage ────────────────────────────────────────────────────────────────

export function generateHomepageMetadata(): Metadata {
  const title       = '5000 Tomorrow | Pre-Settlement Legal Funding in Michigan'
  const description = 'Michigan residents: get up to $5,000 in pre-settlement funding in as little as 24 hours. No credit check. No upfront fees. You only repay if your case wins. Requires an active case and attorney.'

  return {
    title,
    description,
    alternates: { canonical: SITE.url },
    openGraph: {
      ...rootMetadata.openGraph,
      title,
      description,
      url:    SITE.url,
      images: buildOgImages('/images/og/homepage.jpg', '5000 Tomorrow — Pre-Settlement Funding for Michigan Residents'),
    },
    twitter: {
      ...rootMetadata.twitter,
      title,
      description,
      images: [ogImageUrl('/images/og/homepage.jpg')],
    },
  }
}

// ─── Case Type Pages ─────────────────────────────────────────────────────────

export function generateCaseMetadata(
  caseType: Pick<CaseType, 'slug' | 'metaTitle' | 'metaDescription' | 'shortTitle'>,
): Metadata {
  const url = `${SITE.url}/case-types/${caseType.slug}`

  return {
    title:       caseType.metaTitle,
    description: caseType.metaDescription,
    alternates:  { canonical: url },
    openGraph: {
      ...rootMetadata.openGraph,
      type:        'website',
      title:       caseType.metaTitle,
      description: caseType.metaDescription,
      url,
      images: buildOgImages(
        `/images/og/case-types/${caseType.slug}.jpg`,
        `${caseType.shortTitle} Pre-Settlement Funding — Michigan`,
      ),
    },
    twitter: {
      ...rootMetadata.twitter,
      title:       caseType.metaTitle,
      description: caseType.metaDescription,
      images:      [ogImageUrl(`/images/og/case-types/${caseType.slug}.jpg`)],
    },
  }
}

// ─── City Landing Pages ───────────────────────────────────────────────────────

export function generateCityMetadata(
  city: Pick<CityPage, 'slug' | 'name' | 'county' | 'metaTitle' | 'metaDescription'>,
): Metadata {
  const url = `${SITE.url}/cities/${city.slug}`

  return {
    title:       city.metaTitle,
    description: city.metaDescription,
    alternates:  { canonical: url },
    openGraph: {
      ...rootMetadata.openGraph,
      type:        'website',
      title:       city.metaTitle,
      description: city.metaDescription,
      url,
      images: buildOgImages(
        '/images/og/michigan-legal-funding.jpg',
        `Pre-Settlement Legal Funding in ${city.name}, Michigan`,
      ),
    },
    twitter: {
      ...rootMetadata.twitter,
      title:       city.metaTitle,
      description: city.metaDescription,
      images:      [ogImageUrl('/images/og/michigan-legal-funding.jpg')],
    },
  }
}

// ─── Blog Posts ───────────────────────────────────────────────────────────────

export function generateBlogPostMetadata(
  post: Pick<
    BlogPost,
    | 'slug'
    | 'title'
    | 'excerpt'
    | 'metaTitle'
    | 'metaDescription'
    | 'featuredImage'
    | 'featuredImageAlt'
    | 'publishedAt'
    | 'updatedAt'
    | 'author'
    | 'tags'
  >,
): Metadata {
  const url         = `${SITE.url}/blog/${post.slug}`
  const title       = post.metaTitle       ?? post.title
  const description = post.metaDescription ?? post.excerpt
  const image       = post.featuredImage
    ? buildOgImages(post.featuredImage, post.featuredImageAlt ?? title)
    : buildOgImages(SITE.defaultOgImage, title)

  return {
    title,
    description,
    keywords:   post.tags,
    alternates: { canonical: url },
    openGraph: {
      ...rootMetadata.openGraph,
      type:          'article',
      title,
      description,
      url,
      publishedTime: post.publishedAt.toISOString(),
      modifiedTime:  post.updatedAt?.toISOString(),
      authors:       [post.author.name],
      images:        image,
    },
    twitter: {
      ...rootMetadata.twitter,
      title,
      description,
      images: [image[0].url],
    },
  }
}

// ─── Static Pages ─────────────────────────────────────────────────────────────

export function generateStaticMetadata(
  title:        string,
  description:  string,
  path:         string,
  ogImagePath?: string,
): Metadata {
  const url = `${SITE.url}${path}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      ...rootMetadata.openGraph,
      title,
      description,
      url,
      images: ogImagePath
        ? buildOgImages(ogImagePath, title)
        : (rootMetadata.openGraph?.images as Metadata['openGraph'] extends infer T ? (T extends { images: infer I } ? I : never) : never),
    },
    twitter: {
      ...rootMetadata.twitter,
      title,
      description,
    },
  }
}

// ─── Blog Category Pages ──────────────────────────────────────────────────────

export function generateBlogCategoryMetadata(
  category:    string,
  displayName: string,
): Metadata {
  const title       = `${displayName} Articles | 5000 Tomorrow`
  const description = `Browse Michigan pre-settlement funding articles in the ${displayName} category. Expert legal funding insights from 5000 Tomorrow.`
  const url         = `${SITE.url}/blog/category/${category}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      ...rootMetadata.openGraph,
      title,
      description,
      url,
      images: buildOgImages(SITE.defaultOgImage, title),
    },
  }
}

// ─── No-Index Helper (confirmation pages, thank-you pages, etc.) ──────────────

export function noIndexMetadata(title: string): Metadata {
  return {
    title,
    robots: { index: false, follow: false },
  }
}
