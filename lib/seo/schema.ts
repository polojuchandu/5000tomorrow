import type { BlogPost, CaseType, CityPage, FAQ, Testimonial } from '@/types'
import { SITE } from './metadata'

// ─── JSON-LD Base Types ───────────────────────────────────────────────────────

type SchemaType = Record<string, unknown>

interface BreadcrumbItem {
  name: string
  url:  string
}

// ─── Organization ─────────────────────────────────────────────────────────────

export function buildOrganizationSchema(): SchemaType {
  return {
    '@context': 'https://schema.org',
    '@type':    'Organization',
    '@id':      `${SITE.url}/#organization`,
    name:       SITE.name,
    legalName:  SITE.legalName,
    url:        SITE.url,
    logo: {
      '@type':      'ImageObject',
      url:          `${SITE.url}/images/logo.png`,
      width:        400,
      height:       80,
      caption:      SITE.name,
    },
    image:          `${SITE.url}/images/og/default.jpg`,
    description:    SITE.description,
    telephone:      SITE.phoneE164,
    email:          SITE.email,
    address: {
      '@type':          'PostalAddress',
      addressRegion:    SITE.address.state,
      addressCountry:   SITE.address.country,
    },
    areaServed: {
      '@type': 'State',
      name:    SITE.address.stateFull,
    },
    contactPoint: [
      {
        '@type':        'ContactPoint',
        telephone:      SITE.phoneE164,
        contactType:    'customer service',
        areaServed:     SITE.address.state,
        availableLanguage: ['English', 'Spanish'],
        hoursAvailable: {
          '@type':      'OpeningHoursSpecification',
          dayOfWeek:    ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens:        '08:00',
          closes:       '18:00',
        },
      },
    ],
    sameAs: [
      // Populate with real social profiles when available
      // 'https://www.facebook.com/5000tomorrow',
      // 'https://www.instagram.com/5000tomorrow',
    ],
  }
}

// ─── LocalBusiness ────────────────────────────────────────────────────────────

export function buildLocalBusinessSchema(overrides?: Partial<SchemaType>): SchemaType {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'LegalService'],
    '@id':   `${SITE.url}/#localbusiness`,
    name:    SITE.name,
    image:   `${SITE.url}/images/og/default.jpg`,
    url:     SITE.url,
    telephone: SITE.phoneE164,
    email:     SITE.email,
    description: SITE.description,
    priceRange: 'Free to Apply — No Upfront Fees',
    currenciesAccepted: 'USD',
    paymentAccepted:    'No repayment unless you win',
    address: {
      '@type':          'PostalAddress',
      addressRegion:    SITE.address.state,
      addressCountry:   SITE.address.country,
    },
    geo: {
      // Michigan geographic center approximate
      '@type':    'GeoCoordinates',
      latitude:   44.3467,
      longitude: -85.4102,
    },
    areaServed: {
      '@type': 'State',
      name:    SITE.address.stateFull,
    },
    openingHoursSpecification: [
      {
        '@type':     'OpeningHoursSpecification',
        dayOfWeek:   ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens:       '08:00',
        closes:      '18:00',
      },
    ],
    hasMap:        `https://maps.google.com/?q=Michigan`,
    servesCuisine: undefined,   // N/A — prevents noise in output
    ...overrides,
  }
}

// ─── Service ─────────────────────────────────────────────────────────────────

export function buildServiceSchema(
  caseType?: Pick<CaseType, 'slug' | 'title' | 'description'>,
): SchemaType {
  const serviceName = caseType
    ? `${caseType.title} Pre-Settlement Funding`
    : 'Pre-Settlement Legal Funding'

  const serviceDescription = caseType
    ? caseType.description
    : 'Pre-settlement legal funding for Michigan personal injury cases. Receive up to $5,000 against your pending settlement with no credit check and no upfront fees.'

  return {
    '@context':   'https://schema.org',
    '@type':      'Service',
    name:         serviceName,
    serviceType:  'Legal Funding / Pre-Settlement Advance',
    description:  serviceDescription,
    url: caseType
      ? `${SITE.url}/cases/${caseType.slug}`
      : SITE.url,
    provider: {
      '@id': `${SITE.url}/#organization`,
    },
    areaServed: {
      '@type': 'State',
      name:    SITE.address.stateFull,
    },
    termsOfService:        `${SITE.url}/terms-of-service`,
    serviceOutput:         'Pre-settlement cash advance',
    offers: {
      '@type':         'Offer',
      name:            'Pre-Settlement Funding',
      description:     'Up to $5,000 against your pending personal injury settlement.',
      price:           '0',
      priceCurrency:   'USD',
      priceSpecification: {
        '@type':       'PriceSpecification',
        description:   'No upfront fees. Repayment only upon successful settlement.',
        price:         '0',
        priceCurrency: 'USD',
      },
    },
  }
}

// ─── FAQPage ──────────────────────────────────────────────────────────────────

export function buildFAQSchema(
  faqs: Pick<FAQ, 'question' | 'answer' | 'schemaQuestion'>[],
): SchemaType {
  return {
    '@context': 'https://schema.org',
    '@type':    'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name:    faq.schemaQuestion ?? faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text:    faq.answer,
      },
    })),
  }
}

// ─── BreadcrumbList ───────────────────────────────────────────────────────────

export function buildBreadcrumbSchema(items: BreadcrumbItem[]): SchemaType {
  return {
    '@context': 'https://schema.org',
    '@type':    'BreadcrumbList',
    itemListElement: [
      // Always start with home
      {
        '@type':   'ListItem',
        position:  1,
        name:      'Home',
        item:      SITE.url,
      },
      // Caller-supplied items offset by 1
      ...items.map((item, index) => ({
        '@type':   'ListItem',
        position:  index + 2,
        name:      item.name,
        item:      item.url.startsWith('http') ? item.url : `${SITE.url}${item.url}`,
      })),
    ],
  }
}

// ─── Article (Blog Post) ──────────────────────────────────────────────────────

export function buildArticleSchema(
  post: Pick<
    BlogPost,
    | 'slug'
    | 'title'
    | 'excerpt'
    | 'publishedAt'
    | 'updatedAt'
    | 'author'
    | 'featuredImage'
    | 'featuredImageAlt'
  >,
): SchemaType {
  const url = `${SITE.url}/blog/${post.slug}`

  return {
    '@context':      'https://schema.org',
    '@type':         'Article',
    '@id':           `${url}/#article`,
    headline:        post.title,
    description:     post.excerpt,
    url,
    datePublished:   post.publishedAt.toISOString(),
    dateModified:    (post.updatedAt ?? post.publishedAt).toISOString(),
    author: {
      '@type': 'Person',
      name:    post.author.name,
    },
    publisher: {
      '@id': `${SITE.url}/#organization`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id':   url,
    },
    image: post.featuredImage
      ? {
          '@type':  'ImageObject',
          url:      `${SITE.url}${post.featuredImage}`,
          width:    1200,
          height:   630,
          caption:  post.featuredImageAlt ?? post.title,
        }
      : undefined,
    isPartOf: {
      '@type': 'Blog',
      name:    `${SITE.name} Blog`,
      url:     `${SITE.url}/blog`,
    },
    about: {
      '@type': 'Thing',
      name:    'Pre-Settlement Legal Funding',
    },
    inLanguage:   'en-US',
    copyrightYear: new Date(post.publishedAt).getFullYear(),
    copyrightHolder: {
      '@id': `${SITE.url}/#organization`,
    },
  }
}

// ─── AggregateRating ──────────────────────────────────────────────────────────

export function buildAggregateRatingSchema(ratingValue: number, reviewCount: number): SchemaType {
  return {
    '@type':       'AggregateRating',
    ratingValue:   ratingValue.toFixed(1),
    reviewCount,
    bestRating:    '5',
    worstRating:   '1',
  }
}

// ─── Review (single testimonial) ─────────────────────────────────────────────

export function buildReviewSchema(
  testimonial: Pick<Testimonial, 'quote' | 'authorFirstName' | 'authorLastName' | 'city' | 'rating'>,
): SchemaType {
  return {
    '@context': 'https://schema.org',
    '@type':    'Review',
    reviewBody: testimonial.quote,
    reviewRating: {
      '@type':       'Rating',
      ratingValue:   testimonial.rating ?? 5,
      bestRating:    '5',
      worstRating:   '1',
    },
    author: {
      '@type': 'Person',
      name: testimonial.authorLastName
        ? `${testimonial.authorFirstName} ${testimonial.authorLastName}`
        : testimonial.authorFirstName,
    },
    itemReviewed: {
      '@id': `${SITE.url}/#localbusiness`,
    },
  }
}

// ─── City Page (LegalService + LocationSpecific) ──────────────────────────────

export function buildCityPageSchema(
  city: Pick<CityPage, 'slug' | 'name' | 'county'>,
): SchemaType {
  const url = `${SITE.url}/cities/${city.slug}`

  return {
    '@context': 'https://schema.org',
    '@type':    ['LegalService', 'LocalBusiness'],
    name:       `${SITE.name} — ${city.name}, Michigan`,
    url,
    telephone:  SITE.phoneE164,
    email:      SITE.email,
    description: `Pre-settlement legal funding for residents of ${city.name}, Michigan. Get up to $5,000 against your pending personal injury settlement. No credit check.`,
    address: {
      '@type':           'PostalAddress',
      addressLocality:   city.name,
      addressRegion:     'MI',
      addressCountry:    'US',
    },
    areaServed: [
      {
        '@type': 'City',
        name:    city.name,
      },
      {
        '@type': 'AdministrativeArea',
        name:    `${city.county} County`,
      },
    ],
    parentOrganization: {
      '@id': `${SITE.url}/#organization`,
    },
  }
}

// ─── WebSite (for sitelinks search box) ──────────────────────────────────────

export function buildWebSiteSchema(): SchemaType {
  return {
    '@context': 'https://schema.org',
    '@type':    'WebSite',
    '@id':      `${SITE.url}/#website`,
    url:        SITE.url,
    name:       SITE.name,
    description: SITE.description,
    publisher: {
      '@id': `${SITE.url}/#organization`,
    },
    potentialAction: {
      '@type':       'SearchAction',
      target: {
        '@type':     'EntryPoint',
        urlTemplate: `${SITE.url}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'en-US',
  }
}

// ─── WebPage ──────────────────────────────────────────────────────────────────

export function buildWebPageSchema(
  name:        string,
  description: string,
  url:         string,
  breadcrumbs?: BreadcrumbItem[],
): SchemaType {
  const fullUrl = url.startsWith('http') ? url : `${SITE.url}${url}`

  return {
    '@context':   'https://schema.org',
    '@type':      'WebPage',
    '@id':        `${fullUrl}/#webpage`,
    url:          fullUrl,
    name,
    description,
    isPartOf: {
      '@id': `${SITE.url}/#website`,
    },
    about: {
      '@id': `${SITE.url}/#organization`,
    },
    breadcrumb: breadcrumbs?.length
      ? buildBreadcrumbSchema(breadcrumbs)
      : undefined,
    inLanguage: 'en-US',
  }
}

// ─── Serialize helper (for use in <script> tags) ─────────────────────────────

export function serializeSchema(schema: SchemaType | SchemaType[]): string {
  return JSON.stringify(Array.isArray(schema) ? schema : schema, null, 0)
}

// ─── Combine multiple schemas into one @graph ────────────────────────────────

export function buildSchemaGraph(...schemas: SchemaType[]): SchemaType {
  return {
    '@context': 'https://schema.org',
    '@graph':   schemas.map(({ '@context': _ctx, ...rest }) => rest),
  }
}
