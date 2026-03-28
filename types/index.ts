// ─── Re-exports from validations ─────────────────────────────────────────────

export type { FullApplyFormData } from '@/lib/validations/apply'

// ─── Shared slug literals ─────────────────────────────────────────────────────

export type CaseTypeSlug =
  | 'car-accident'
  | 'truck-accident'
  | 'motorcycle-accident'
  | 'pedestrian-accident'
  | 'rideshare-accident'
  | 'hit-and-run'
  | 'bicycle-accident'
  | 'workers-compensation'
  | 'slip-and-fall'
  | 'workplace-injury'
  | 'wrongful-death'
  | 'personal-injury'
  | 'premises-liability'
  | 'other'

// ─── Case Type ────────────────────────────────────────────────────────────────

export interface CaseType {
  slug:            CaseTypeSlug
  title:           string
  shortTitle:      string
  description:     string
  metaTitle:       string
  metaDescription: string
  icon?:           string
  isPrimary:       boolean
  content?:        string
}

// ─── City Page ────────────────────────────────────────────────────────────────

export interface CityPage {
  slug:            string
  name:            string
  county:          string
  population?:     number
  metaTitle:       string
  metaDescription: string
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export interface FAQ {
  id?:             string
  question:        string
  schemaQuestion?: string
  answer:          string
  category?:       string
}

// ─── Author ───────────────────────────────────────────────────────────────────

export interface Author {
  name:      string
  slug?:     string
  bio?:      string
  avatar?:   string
  title?:    string
  linkedIn?: string
}

// ─── Blog Post ────────────────────────────────────────────────────────────────

export interface BlogPost {
  slug:              string
  title:             string
  excerpt:           string
  metaTitle?:        string
  metaDescription?:  string
  content:           string
  featuredImage?:    string
  featuredImageAlt?: string
  publishedAt:       Date
  updatedAt?:        Date
  author:            Author
  tags:              string[]
  category?:         string
  readingTime?:      number
}

// ─── Testimonial ──────────────────────────────────────────────────────────────

export interface Testimonial {
  id?:               string
  authorFirstName:   string
  authorLastName?:   string
  city:              string
  quote:             string
  rating?:           number
  caseType?:         CaseTypeSlug
  verifiedPurchase?: boolean
}

// ─── Attorney ─────────────────────────────────────────────────────────────────

export interface Attorney {
  id?:        string
  firstName:  string
  lastName:   string
  firm:       string
  phone:      string
  email?:     string
  barNumber?: string
  city?:      string
  state:      string
}

// ─── Lead ─────────────────────────────────────────────────────────────────────

export interface Lead {
  id?:           string
  firstName:     string
  lastName:      string
  email:         string
  phone:         string
  caseType:      CaseTypeSlug
  incidentDate?: string
  city:          string
  state:         string
  zipCode:       string
  attorney?:     Partial<Attorney>
  hasAttorney:   boolean
  urgency?:      string
  status?:       'new' | 'reviewing' | 'approved' | 'denied' | 'funded'
  submittedAt?:  Date
  notes?:        string
}

// ─── API Response ─────────────────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success:      boolean
  data?:        T
  error?:       string
  fieldErrors?: Record<string, string[]>
  leadId?:      string
}
