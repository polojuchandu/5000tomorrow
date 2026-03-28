import type { MetadataRoute } from 'next'
import type { CaseTypeSlug } from '@/types'

const SITE_URL = 'https://www.5000tomorrow.com'

// ─── Static Routes ────────────────────────────────────────────────────────────

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  {
    url:             SITE_URL,
    lastModified:    new Date(),
    changeFrequency: 'weekly',
    priority:        1.0,
  },
  {
    url:             `${SITE_URL}/how-it-works`,
    lastModified:    new Date(),
    changeFrequency: 'monthly',
    priority:        0.9,
  },
  {
    url:             `${SITE_URL}/apply`,
    lastModified:    new Date(),
    changeFrequency: 'monthly',
    priority:        0.9,
  },
  {
    url:             `${SITE_URL}/cases`,
    lastModified:    new Date(),
    changeFrequency: 'monthly',
    priority:        0.8,
  },
  {
    url:             `${SITE_URL}/about`,
    lastModified:    new Date(),
    changeFrequency: 'monthly',
    priority:        0.7,
  },
  {
    url:             `${SITE_URL}/faq`,
    lastModified:    new Date(),
    changeFrequency: 'monthly',
    priority:        0.7,
  },
  {
    url:             `${SITE_URL}/contact`,
    lastModified:    new Date(),
    changeFrequency: 'monthly',
    priority:        0.6,
  },
  {
    url:             `${SITE_URL}/michigan`,
    lastModified:    new Date(),
    changeFrequency: 'monthly',
    priority:        0.8,
  },
  {
    url:             `${SITE_URL}/cities`,
    lastModified:    new Date(),
    changeFrequency: 'weekly',
    priority:        0.7,
  },
  {
    url:             `${SITE_URL}/blog`,
    lastModified:    new Date(),
    changeFrequency: 'daily',
    priority:        0.7,
  },
  {
    url:             `${SITE_URL}/privacy-policy`,
    lastModified:    new Date(),
    changeFrequency: 'yearly',
    priority:        0.3,
  },
  {
    url:             `${SITE_URL}/terms-of-service`,
    lastModified:    new Date(),
    changeFrequency: 'yearly',
    priority:        0.3,
  },
  {
    url:             `${SITE_URL}/disclaimer`,
    lastModified:    new Date(),
    changeFrequency: 'yearly',
    priority:        0.3,
  },
]

// ─── Case Type Routes ─────────────────────────────────────────────────────────

const CASE_TYPE_SLUGS: CaseTypeSlug[] = [
  'car-accident',
  'truck-accident',
  'motorcycle-accident',
  'pedestrian-accident',
  'rideshare-accident',
  'workers-compensation',
  'slip-and-fall',
  'workplace-injury',
  'wrongful-death',
  'personal-injury',
]

function buildCaseRoutes(): MetadataRoute.Sitemap {
  return CASE_TYPE_SLUGS.map((slug) => ({
    url:             `${SITE_URL}/cases/${slug}`,
    lastModified:    new Date(),
    changeFrequency: 'monthly' as const,
    priority:        0.85,
  }))
}

// ─── Michigan City Routes ─────────────────────────────────────────────────────

interface CityEntry {
  slug:     string
  priority: number  // higher-population cities get higher priority
}

const MICHIGAN_CITIES: CityEntry[] = [
  // Metro Detroit / Southeast Michigan
  { slug: 'detroit',              priority: 0.9 },
  { slug: 'warren',               priority: 0.8 },
  { slug: 'sterling-heights',     priority: 0.8 },
  { slug: 'livonia',              priority: 0.8 },
  { slug: 'dearborn',             priority: 0.8 },
  { slug: 'westland',             priority: 0.75 },
  { slug: 'clinton-township',     priority: 0.75 },
  { slug: 'southfield',           priority: 0.75 },
  { slug: 'troy',                 priority: 0.75 },
  { slug: 'farmington-hills',     priority: 0.75 },
  { slug: 'pontiac',              priority: 0.7 },
  { slug: 'ann-arbor',            priority: 0.8 },
  { slug: 'taylor',               priority: 0.7 },
  { slug: 'saint-clair-shores',   priority: 0.7 },
  { slug: 'roseville',            priority: 0.65 },
  { slug: 'dearborn-heights',     priority: 0.65 },
  { slug: 'waterford',            priority: 0.65 },
  { slug: 'royal-oak',            priority: 0.7 },
  { slug: 'canton',               priority: 0.7 },
  { slug: 'novi',                 priority: 0.65 },
  // West Michigan
  { slug: 'grand-rapids',         priority: 0.85 },
  { slug: 'wyoming',              priority: 0.75 },
  { slug: 'kentwood',             priority: 0.7 },
  { slug: 'kalamazoo',            priority: 0.75 },
  { slug: 'muskegon',             priority: 0.7 },
  { slug: 'holland',              priority: 0.65 },
  { slug: 'battle-creek',         priority: 0.65 },
  // Greater Lansing / Mid-Michigan
  { slug: 'lansing',              priority: 0.8 },
  { slug: 'east-lansing',         priority: 0.7 },
  { slug: 'flint',                priority: 0.8 },
  { slug: 'burton',               priority: 0.65 },
  { slug: 'midland',              priority: 0.65 },
  { slug: 'bay-city',             priority: 0.65 },
  { slug: 'saginaw',              priority: 0.7 },
  // Northern / Other
  { slug: 'traverse-city',        priority: 0.65 },
  { slug: 'port-huron',           priority: 0.65 },
  { slug: 'mount-pleasant',       priority: 0.6 },
  { slug: 'jackson',              priority: 0.65 },
  { slug: 'monroe',               priority: 0.6 },
  { slug: 'marquette',            priority: 0.6 },
  { slug: 'alpena',               priority: 0.55 },
  { slug: 'escanaba',             priority: 0.55 },
]

function buildCityRoutes(): MetadataRoute.Sitemap {
  return MICHIGAN_CITIES.map(({ slug, priority }) => ({
    url:             `${SITE_URL}/cities/${slug}`,
    lastModified:    new Date(),
    changeFrequency: 'monthly' as const,
    priority,
  }))
}

// ─── Blog Routes ──────────────────────────────────────────────────────────────
// Replace with a real CMS/data fetch when content is available.

async function fetchBlogSlugs(): Promise<Array<{ slug: string; updatedAt: Date }>> {
  // TODO: Replace with actual data source (CMS, database, MDX files)
  // Example:
  // const posts = await db.blogPost.findMany({ where: { isPublished: true }, select: { slug: true, updatedAt: true } })
  // return posts

  return []
}

async function buildBlogRoutes(): Promise<MetadataRoute.Sitemap> {
  const posts = await fetchBlogSlugs()

  return posts.map(({ slug, updatedAt }) => ({
    url:             `${SITE_URL}/blog/${slug}`,
    lastModified:    updatedAt,
    changeFrequency: 'monthly' as const,
    priority:        0.6,
  }))
}

// ─── Sitemap Export ───────────────────────────────────────────────────────────

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogRoutes] = await Promise.all([
    buildBlogRoutes(),
  ])

  return [
    ...STATIC_ROUTES,
    ...buildCaseRoutes(),
    ...buildCityRoutes(),
    ...blogRoutes,
  ]
}
