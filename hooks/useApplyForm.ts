'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { FullApplyFormData, Step1Data, Step2Data, Step3Data, Step4Data, Step5Data } from '@/lib/validations/apply'

// ─── Types ────────────────────────────────────────────────────────────────────

export type AnyStepData =
  | Partial<Step1Data>
  | Partial<Step2Data>
  | Partial<Step3Data>
  | Partial<Step4Data>
  | Partial<Step5Data>

export type ApplyDraft = Partial<FullApplyFormData>

export interface UseApplyFormReturn {
  step:           number
  totalSteps:     number
  progressPct:    number
  formData:       ApplyDraft
  isSubmitting:   boolean
  submitError:    string | null
  hasDraft:       boolean
  nextStep:       (data: AnyStepData) => void
  prevStep:       () => void
  submitForm:     (finalStepData: Partial<Step5Data>) => Promise<void>
  clearDraft:     () => void
  jumpToStep:     (n: number) => void
}

// ─── LocalStorage persistence ─────────────────────────────────────────────────

const STORAGE_KEY     = '5000tomorrow_apply_draft'
const STORAGE_VERSION = 2

interface StoredDraft {
  version: number
  step:    number
  data:    ApplyDraft
  savedAt: string
}

function saveDraft(step: number, data: ApplyDraft): void {
  if (typeof window === 'undefined') return
  try {
    const payload: StoredDraft = {
      version: STORAGE_VERSION,
      step,
      data,
      savedAt: new Date().toISOString(),
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {
    // Storage quota exceeded or private browsing — fail silently
  }
}

function loadDraft(): StoredDraft | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const draft = JSON.parse(raw) as StoredDraft
    if (draft.version !== STORAGE_VERSION) {
      window.localStorage.removeItem(STORAGE_KEY)
      return null
    }
    return draft
  } catch {
    return null
  }
}

function removeDraft(): void {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(STORAGE_KEY)
}

// ─── Analytics ────────────────────────────────────────────────────────────────

function trackApplyStep(step: number, draft: ApplyDraft): void {
  if (typeof window === 'undefined') return

  const eventName = `apply_step_${step}_complete`
  const props = {
    event_category: 'apply_funnel',
    event_label:    `Step ${step}`,
    step_number:    step,
    case_type:      draft.caseType ?? 'unknown',
  }

  // Google Analytics 4
  window.gtag?.('event', eventName, props)

  // Google Tag Manager dataLayer
  window.dataLayer?.push({ event: eventName, ...props })
}

function trackFormStart(): void {
  if (typeof window === 'undefined') return
  window.gtag?.('event', 'apply_funnel_start', { event_category: 'apply_funnel' })
  window.dataLayer?.push({ event: 'apply_funnel_start' })
}

function trackFormSubmit(draft: ApplyDraft): void {
  if (typeof window === 'undefined') return
  const props = { event_category: 'apply_funnel', case_type: draft.caseType ?? 'unknown' }
  window.gtag?.('event', 'apply_form_submitted', props)
  window.dataLayer?.push({ event: 'apply_form_submitted', ...props })
}

function trackFormError(error: string): void {
  if (typeof window === 'undefined') return
  window.gtag?.('event', 'apply_form_error', { event_category: 'apply_funnel', error_message: error })
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

const TOTAL_STEPS = 5

export function useApplyForm(): UseApplyFormReturn {
  const router = useRouter()

  const [step, setStep]               = useState(1)
  const [formData, setFormData]       = useState<ApplyDraft>({})
  const [isSubmitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [hasDraft, setHasDraft]       = useState(false)

  // Load persisted draft on mount
  useEffect(() => {
    const draft = loadDraft()
    if (!draft) {
      trackFormStart()
      return
    }
    setFormData(draft.data)
    setStep(draft.step)
    setHasDraft(true)
  }, [])

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })

  // ── nextStep ───────────────────────────────────────────────────────────────
  const nextStep = useCallback(
    (stepData: AnyStepData) => {
      setFormData((prev) => {
        const merged = { ...prev, ...stepData } as ApplyDraft
        const nextStepNum = Math.min(step + 1, TOTAL_STEPS)
        saveDraft(nextStepNum, merged)
        trackApplyStep(step, merged)
        return merged
      })
      setStep((s) => Math.min(s + 1, TOTAL_STEPS))
      scrollToTop()
    },
    [step],
  )

  // ── prevStep ───────────────────────────────────────────────────────────────
  const prevStep = useCallback(() => {
    setStep((s) => {
      const prev = Math.max(s - 1, 1)
      saveDraft(prev, formData)
      return prev
    })
    scrollToTop()
  }, [formData])

  // ── jumpToStep (for review edit links) ────────────────────────────────────
  const jumpToStep = useCallback(
    (n: number) => {
      if (n < 1 || n > TOTAL_STEPS) return
      saveDraft(n, formData)
      setStep(n)
      scrollToTop()
    },
    [formData],
  )

  // ── submitForm ────────────────────────────────────────────────────────────
  const submitForm = useCallback(
    async (finalStepData: Partial<Step5Data>) => {
      const merged = { ...formData, ...finalStepData } as ApplyDraft
      console.log('[useApplyForm] submitForm called with merged data:', merged)
      setFormData(merged)
      setSubmitting(true)
      setSubmitError(null)

      try {
        console.log('[useApplyForm] Sending request to /api/apply with method POST')
        const res = await fetch('/api/apply', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify(merged),
        })

        console.log('[useApplyForm] Response received:', res.status, res.statusText)
        const json = (await res.json()) as { success: boolean; error?: string }

        if (!res.ok || !json.success) {
          const msg = json.error ?? 'Something went wrong. Please try again.'
          console.error('[useApplyForm] Submission failed:', msg)
          trackFormError(msg)
          setSubmitError(msg)
          return
        }

        console.log('[useApplyForm] ✅ Submission successful')
        trackApplyStep(TOTAL_STEPS, merged)
        trackFormSubmit(merged)
        removeDraft()
        router.push('/apply/confirmation')
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Unable to submit. Please check your connection and try again.'
        console.error('[useApplyForm] ❌ Submission failed:', msg)
        trackFormError(msg)
        setSubmitError(msg)
      } finally {
        setSubmitting(false)
      }
    },
    [formData, router],
  )

  // ── clearDraft ─────────────────────────────────────────────────────────────
  const clearDraft = useCallback(() => {
    removeDraft()
    setFormData({})
    setStep(1)
    setHasDraft(false)
    setSubmitError(null)
  }, [])

  return {
    step,
    totalSteps:  TOTAL_STEPS,
    progressPct: Math.round(((step - 1) / (TOTAL_STEPS - 1)) * 100),
    formData,
    isSubmitting,
    submitError,
    hasDraft,
    nextStep,
    prevStep,
    jumpToStep,
    submitForm,
    clearDraft,
  }
}
