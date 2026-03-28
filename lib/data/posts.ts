import type { BlogPost } from '@/types'

// ─── Placeholder author ───────────────────────────────────────────────────────

const EDITORIAL_TEAM = {
  name:  'Editorial Team',
  slug:  'editorial-team',
  title: 'Legal Funding Education',
  bio:   '5000 Tomorrow\'s editorial team writes practical guides for Michigan injury victims navigating the legal funding process.',
}

// ─── Placeholder blog posts ───────────────────────────────────────────────────
// Replace with CMS fetch (Contentful, Sanity, etc.) when ready.

export const PLACEHOLDER_POSTS: BlogPost[] = [
  {
    slug:    'what-is-pre-settlement-funding',
    title:   'What Is Pre-Settlement Funding? A Plain-English Guide for Michigan Residents',
    excerpt: 'Pre-settlement funding lets personal injury plaintiffs access money before their case resolves. Here\'s exactly how it works, what it costs, and whether it\'s right for you.',
    content: '',
    metaTitle:       'What Is Pre-Settlement Funding? Plain-English Guide | 5000 Tomorrow',
    metaDescription: 'A clear, jargon-free explanation of pre-settlement legal funding for Michigan injury victims. Learn how it works, costs, and whether you qualify.',
    featuredImage:    '/images/blog/what-is-pre-settlement-funding.jpg',
    featuredImageAlt: 'Michigan personal injury plaintiff reviewing pre-settlement funding options',
    publishedAt:      new Date('2025-01-15'),
    updatedAt:        new Date('2025-03-01'),
    author:           EDITORIAL_TEAM,
    tags:             ['pre-settlement funding', 'how it works', 'Michigan', 'personal injury'],
    category:         'Education',
    readingTime:      6,
  },
  {
    slug:    'how-long-does-a-car-accident-settlement-take-in-michigan',
    title:   'How Long Does a Car Accident Settlement Take in Michigan?',
    excerpt: 'Michigan car accident cases can take anywhere from a few months to several years to settle. Understanding the timeline helps you plan — and explains why so many families turn to pre-settlement funding.',
    content: '',
    metaTitle:       'How Long Does a Car Accident Settlement Take in Michigan? | 5000 Tomorrow',
    metaDescription: 'Michigan car accident settlement timelines explained — from investigation to payout. Learn what causes delays and how to bridge the financial gap while you wait.',
    featuredImage:    '/images/blog/car-accident-settlement-timeline-michigan.jpg',
    featuredImageAlt: 'Michigan highway car accident scene with emergency vehicles',
    publishedAt:      new Date('2025-02-03'),
    updatedAt:        new Date('2025-03-10'),
    author:           EDITORIAL_TEAM,
    tags:             ['car accident', 'settlement timeline', 'Michigan', 'pre-settlement funding'],
    category:         'Case Types',
    readingTime:      7,
  },
  {
    slug:    'pre-settlement-funding-vs-personal-loan',
    title:   'Pre-Settlement Funding vs. Personal Loan: Which Is Right for Injury Victims?',
    excerpt: 'Both options put money in your hands while you wait. But they work very differently — and for Michigan injury victims, the right choice almost always depends on one word: recourse.',
    content: '',
    metaTitle:       'Pre-Settlement Funding vs. Personal Loan for Injury Victims | 5000 Tomorrow',
    metaDescription: 'Compare pre-settlement funding and personal loans for Michigan personal injury plaintiffs. Learn the key differences in risk, cost, and eligibility.',
    featuredImage:    '/images/blog/pre-settlement-funding-vs-personal-loan.jpg',
    featuredImageAlt: 'Scale weighing pre-settlement funding versus personal loan documents',
    publishedAt:      new Date('2025-02-20'),
    author:           EDITORIAL_TEAM,
    tags:             ['pre-settlement funding', 'personal loan', 'comparison', 'non-recourse'],
    category:         'Education',
    readingTime:      5,
  },
  {
    slug:    'michigan-no-fault-insurance-and-personal-injury-claims',
    title:   'Michigan No-Fault Insurance: What Injury Victims Need to Know',
    excerpt: 'Michigan\'s no-fault auto insurance system is one of the most complex in the country. Here\'s how it affects your personal injury claim and your ability to seek pre-settlement funding.',
    content: '',
    metaTitle:       'Michigan No-Fault Insurance & Personal Injury Claims | 5000 Tomorrow',
    metaDescription: 'How Michigan\'s no-fault insurance law affects your personal injury claim, your attorney\'s strategy, and your eligibility for pre-settlement funding.',
    featuredImage:    '/images/blog/michigan-no-fault-insurance.jpg',
    featuredImageAlt: 'Michigan auto insurance documents on a desk',
    publishedAt:      new Date('2025-03-05'),
    author:           EDITORIAL_TEAM,
    tags:             ['Michigan no-fault', 'auto insurance', 'personal injury', 'legal funding'],
    category:         'Michigan Law',
    readingTime:      8,
  },
  {
    slug:    'do-you-need-an-attorney-for-pre-settlement-funding',
    title:   'Do You Need an Attorney to Get Pre-Settlement Funding?',
    excerpt: 'The short answer is yes — and it\'s not an arbitrary rule. Here\'s why attorney representation is a fundamental requirement for pre-settlement funding, and what to do if you don\'t have one yet.',
    content: '',
    metaTitle:       'Do You Need an Attorney for Pre-Settlement Funding? | 5000 Tomorrow',
    metaDescription: 'Attorney representation is required for pre-settlement funding in Michigan. Learn why — and how to find a licensed Michigan personal injury attorney.',
    featuredImage:    '/images/blog/attorney-pre-settlement-funding.jpg',
    featuredImageAlt: 'Michigan personal injury attorney consulting with a client',
    publishedAt:      new Date('2025-03-18'),
    author:           EDITORIAL_TEAM,
    tags:             ['attorney required', 'pre-settlement funding', 'Michigan attorney', 'eligibility'],
    category:         'Eligibility',
    readingTime:      5,
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return PLACEHOLDER_POSTS.find((p) => p.slug === slug)
}

export function getRelatedPosts(currentSlug: string, count = 2): BlogPost[] {
  return PLACEHOLDER_POSTS.filter((p) => p.slug !== currentSlug).slice(0, count)
}
