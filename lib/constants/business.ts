/**
 * Business Constants
 * Single source of truth for company info
 */

export const BUSINESS = {
  name: '5000 Tomorrow',
  tagline: 'Accident Today? Get $5,000 Tomorrow.',
  description: "Michigan's trusted pre-settlement legal funding company",

  // Contact
  phone: '1-877-TODAY-5K',
  phoneFormatted: '1-877-863-2955',
  phoneE164: '+18778632955',
  phoneHref: 'tel:+18778632955',

  // Address
  address: '28588 Northwestern Hwy, Southfield, MI 48034',
  city: 'Southfield',
  state: 'MI',
  zipCode: '48034',

  // Web
  url: 'https://5000tomorrow.com',

  // Service area
  serviceArea: 'Michigan Only',

  // Social (placeholder handles)
  social: {
    facebook: 'https://facebook.com/5000tomorrow',
    instagram: 'https://instagram.com/5000tomorrow',
    twitter: 'https://twitter.com/5000tomorrow',
  },
} as const

export const DESIGN = {
  colors: {
    navy: '#0A1628',
    gold: '#C9A84C',
    white: '#FFFFFF',
  },
} as const
