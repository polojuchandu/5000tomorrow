// ─── Typed Event Map ──────────────────────────────────────────────────────────
// Single source of truth for all trackable user interactions on 5000tomorrow.com

export type EventCategory =
  | 'cta'
  | 'apply_funnel'
  | 'contact'
  | 'navigation'
  | 'engagement'
  | 'conversion'
  | 'internal_linking'
  | 'attorney'

export interface TrackableEvent {
  name:     string
  category: EventCategory
  label:    string
  value?:   number
}

// ─── CTA Events ───────────────────────────────────────────────────────────────

export const CTA_CLICK = (label: string): TrackableEvent => ({
  name:     'cta_click',
  category: 'cta',
  label,
})

// ─── Apply Funnel Events ──────────────────────────────────────────────────────

export const APPLY_STEP_COMPLETE = (step: 1 | 2 | 3 | 4 | 5, caseType?: string): TrackableEvent => ({
  name:     `apply_step_${step}_complete`,
  category: 'apply_funnel',
  label:    caseType ? `step_${step}_${caseType}` : `step_${step}`,
  value:    step,
})

export const APPLY_FUNNEL_START: TrackableEvent = {
  name:     'apply_funnel_start',
  category: 'apply_funnel',
  label:    'funnel_initiated',
}

export const APPLY_FUNNEL_ABANDON = (step: number): TrackableEvent => ({
  name:     'apply_funnel_abandon',
  category: 'apply_funnel',
  label:    `abandoned_at_step_${step}`,
  value:    step,
})

export const APPLY_DRAFT_RESTORED: TrackableEvent = {
  name:     'apply_draft_restored',
  category: 'apply_funnel',
  label:    'draft_restored_from_storage',
}

// ─── Form Submit Events ───────────────────────────────────────────────────────

export const FORM_SUBMIT = (formName: string): TrackableEvent => ({
  name:     'form_submit',
  category: 'conversion',
  label:    formName,
})

export const FORM_ERROR = (formName: string, field: string): TrackableEvent => ({
  name:     'form_error',
  category: 'engagement',
  label:    `${formName}_${field}`,
})

// ─── Conversion Events ────────────────────────────────────────────────────────

export const THANK_YOU_VIEW: TrackableEvent = {
  name:     'thank_you_view',
  category: 'conversion',
  label:    'application_submitted',
  value:    1,
}

export const ATTORNEY_REFERRAL_SUBMIT: TrackableEvent = {
  name:     'attorney_referral_submit',
  category: 'attorney',
  label:    'attorney_portal_form_submitted',
  value:    1,
}

export const ATTORNEY_REFERRAL_CLICK: TrackableEvent = {
  name:     'attorney_referral_click',
  category: 'attorney',
  label:    'attorney_portal_link_clicked',
}

// ─── Page View Events ─────────────────────────────────────────────────────────

export const CITY_PAGE_VIEW = (citySlug: string): TrackableEvent => ({
  name:     'city_page_view',
  category: 'navigation',
  label:    citySlug,
})

export const CASE_TYPE_PAGE_VIEW = (caseSlug: string): TrackableEvent => ({
  name:     'case_type_page_view',
  category: 'navigation',
  label:    caseSlug,
})

// ─── Contact Events ───────────────────────────────────────────────────────────

export const PHONE_CLICK = (source: string): TrackableEvent => ({
  name:     'phone_click',
  category: 'contact',
  label:    source,
})

export const CONTACT_FORM_SUBMIT: TrackableEvent = {
  name:     'contact_form_submit',
  category: 'contact',
  label:    'contact_page_form',
}

// ─── Event name constants (for data-event-label attributes) ──────────────────

export const EVENT_LABELS = {
  heroApply:             'hero_cta_apply_now',
  heroCall:              'hero_cta_call',
  howItWorksApply:       'how_it_works_apply_now',
  caseTypeApply:         (slug: string) => `case_type_${slug}_apply`,
  cityHeroApply:         (slug: string) => `city_hero_apply_${slug}`,
  cityBottomCta:         (slug: string) => `city_bottom_cta_apply_${slug}`,
  attorneyPortalLink:    'footer_attorney_portal_link',
  blogReadMore:          (slug: string) => `blog_read_more_${slug}`,
  faqOpen:               (id: string) => `faq_open_${id}`,
} as const
