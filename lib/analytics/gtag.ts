// ─── Window type augmentation ─────────────────────────────────────────────────

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string,
      config?: Record<string, unknown>,
    ) => void
    dataLayer: Record<string, unknown>[]
  }
}

// ─── GA4 Helpers ──────────────────────────────────────────────────────────────

const GA4_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID

/**
 * Track a GA4 event. Safe to call server-side or before gtag loads —
 * both cases are silently ignored.
 */
export function gtagEvent(
  eventName:  string,
  parameters?: Record<string, unknown>,
): void {
  if (typeof window === 'undefined' || !window.gtag || !GA4_ID) return

  window.gtag('event', eventName, {
    send_to: GA4_ID,
    ...parameters,
  })

  // Dual-track to dataLayer for GTM compatibility
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event:   eventName,
      ...parameters,
    })
  }
}

/**
 * Track a pageview. Call from layout or route change handlers.
 */
export function gtagPageview(url: string): void {
  if (typeof window === 'undefined' || !window.gtag || !GA4_ID) return

  window.gtag('config', GA4_ID, {
    page_path: url,
  })
}

/**
 * Track a conversion event (e.g., form submission, thank-you page view).
 */
export function gtagConversion(
  eventName: string,
  value?:    number,
  currency = 'USD',
): void {
  gtagEvent(eventName, {
    event_category: 'conversion',
    value,
    currency,
  })
}

/**
 * Track a CTA click with source context.
 */
export function gtagCTAClick(label: string, category = 'cta'): void {
  gtagEvent('cta_click', {
    event_category: category,
    event_label:    label,
  })
}

/**
 * Track a funnel step completion.
 */
export function gtagFunnelStep(
  step:      number,
  caseType?: string,
  label?:    string,
): void {
  gtagEvent(`apply_step_${step}_complete`, {
    event_category: 'apply_funnel',
    event_label:    label ?? caseType ?? `step_${step}`,
    funnel_step:    step,
    case_type:      caseType,
  })
}
