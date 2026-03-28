// ─── Window type augmentation ─────────────────────────────────────────────────

type FbqEventName =
  | 'PageView'
  | 'Lead'
  | 'InitiateCheckout'
  | 'CompleteRegistration'
  | 'Contact'
  | 'FindLocation'
  | 'ViewContent'

interface FbqParams {
  content_name?:     string
  content_category?: string
  value?:            number
  currency?:         string
  status?:           string
  [key: string]:     unknown
}

declare global {
  interface Window {
    fbq: (
      command: 'track' | 'trackCustom' | 'init',
      eventName: string,
      params?:   FbqParams,
    ) => void
    _fbq: unknown
  }
}

// ─── Meta Pixel Helpers ───────────────────────────────────────────────────────

/**
 * Fire a standard Meta Pixel event.
 * Safe to call before the pixel loads — silently ignored.
 */
export function pixelEvent(
  eventName: FbqEventName,
  params?:   FbqParams,
): void {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return
  window.fbq('track', eventName, params)
}

/**
 * Fire a custom Meta Pixel event.
 */
export function pixelCustomEvent(
  eventName: string,
  params?:   FbqParams,
): void {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return
  window.fbq('trackCustom', eventName, params)
}

// ─── Pre-defined Pixel Events ─────────────────────────────────────────────────

/**
 * Fire when a user lands on the thank-you / confirmation page.
 * Maps to the Meta "CompleteRegistration" standard event.
 */
export function pixelApplicationComplete(caseType?: string): void {
  pixelEvent('CompleteRegistration', {
    content_name:     'Apply Form Submitted',
    content_category: caseType ?? 'personal-injury',
    status:           'submitted',
    currency:         'USD',
    value:            1,
  })
}

/**
 * Fire when a user starts the apply funnel (step 1 viewed).
 * Maps to "InitiateCheckout" — the closest standard event for funnel entry.
 */
export function pixelFunnelStart(): void {
  pixelEvent('InitiateCheckout', {
    content_name:     'Apply Funnel Started',
    content_category: 'pre-settlement-funding',
  })
}

/**
 * Fire when a user submits the contact form.
 */
export function pixelContact(): void {
  pixelEvent('Contact', {
    content_name: 'Contact Form Submitted',
  })
}

/**
 * Fire a Lead event when a new lead is created (at any entry point).
 */
export function pixelLead(source?: string): void {
  pixelEvent('Lead', {
    content_name:     source ?? 'unknown',
    content_category: 'pre-settlement-funding',
    currency:         'USD',
    value:            1,
  })
}
