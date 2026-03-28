'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import {
  attorneyReferralSchema,
  ESTIMATED_SETTLEMENT_OPTIONS,
  type AttorneyReferralFormData,
} from '@/lib/validations/attorney-referral'
import { CASE_TYPE_OPTIONS } from '@/lib/validations/apply'
import { gtagEvent } from '@/lib/analytics/gtag'
import TurnstileWidget from '@/components/ui/turnstile'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export default function AttorneyReferralForm() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [serverError, setServerError] = useState<string>('')
  const [turnstileToken, setTurnstileToken] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AttorneyReferralFormData>({
    resolver:      zodResolver(attorneyReferralSchema),
    defaultValues: { licenseState: 'MI' },
  })

  async function onSubmit(data: AttorneyReferralFormData) {
    if (!turnstileToken) {
      setServerError('Please complete the CAPTCHA verification.')
      return
    }

    console.log('[AttorneyReferralForm] onSubmit called with data:', data)
    setFormState('submitting')
    setServerError('')

    try {
      console.log('[AttorneyReferralForm] Sending request to /api/attorney-referral with method POST')
      const res = await fetch('/api/attorney-referral', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ ...data, turnstileToken }),
      })

      console.log('[AttorneyReferralForm] Response received:', res.status, res.statusText)
      if (!res.ok) {
        const body = await res.json().catch(() => ({})) as { error?: string }
        throw new Error(body.error ?? 'Submission failed. Please try again.')
      }

      console.log('[AttorneyReferralForm] ✅ Submission successful')
      gtagEvent('attorney_referral_submit', {
        event_category: 'attorney',
        event_label:    data.caseType,
      })
      setFormState('success')
      reset()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong.'
      console.error('[AttorneyReferralForm] ❌ Submission failed:', message)
      setServerError(message)
      setFormState('error')
    }
  }

  if (formState === 'success') {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <CheckCircle aria-hidden="true" size={40} className="text-emerald-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-[#0A1628] mb-2">Referral Submitted</h3>
        <p className="text-sm text-slate-600 max-w-sm mx-auto">
          Thank you. We'll review your client's case and reach out within a few hours to
          discuss funding options.
        </p>
        <button
          onClick={() => setFormState('idle')}
          className="mt-4 text-sm font-medium text-[#C9A84C] hover:underline cursor-pointer"
        >
          Submit another referral
        </button>
      </div>
    )
  }

  const inputClass = (hasError: boolean) =>
    `w-full rounded-xl border px-4 py-3 text-sm text-[#0A1628] placeholder-slate-400 outline-none transition-colors duration-150 focus:ring-2 focus:ring-[#C9A84C]/40 ${
      hasError
        ? 'border-red-400 bg-red-50 focus:border-red-500'
        : 'border-slate-200 bg-white focus:border-[#C9A84C]'
    }`

  const labelClass = 'block text-xs font-semibold text-slate-700 mb-1.5'
  const errorClass = 'mt-1 text-xs text-red-600'

  return (
    <form
      onSubmit={(e) => {
        console.log('[AttorneyReferralForm] Form submission event captured')
        e.preventDefault()
        handleSubmit(onSubmit)(e).catch((err) => {
          console.error('[AttorneyReferralForm] handleSubmit error:', err)
        })
      }}
      noValidate
      aria-label="Attorney referral form"
      className="space-y-6"
    >

      {/* ── Attorney information ─────────────────────────────────── */}
      <fieldset className="space-y-4">
        <legend className="text-sm font-bold text-[#0A1628] pb-1 border-b border-slate-200 w-full">
          Your Information (Attorney)
        </legend>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="ref-attorney-first" className={labelClass}>
              First Name <span aria-hidden="true" className="text-red-500">*</span>
            </label>
            <input
              id="ref-attorney-first"
              type="text"
              autoComplete="given-name"
              aria-required="true"
              className={inputClass(!!errors.attorneyFirstName)}
              {...register('attorneyFirstName')}
            />
            {errors.attorneyFirstName && <p role="alert" className={errorClass}>{errors.attorneyFirstName.message}</p>}
          </div>
          <div>
            <label htmlFor="ref-attorney-last" className={labelClass}>
              Last Name <span aria-hidden="true" className="text-red-500">*</span>
            </label>
            <input
              id="ref-attorney-last"
              type="text"
              autoComplete="family-name"
              aria-required="true"
              className={inputClass(!!errors.attorneyLastName)}
              {...register('attorneyLastName')}
            />
            {errors.attorneyLastName && <p role="alert" className={errorClass}>{errors.attorneyLastName.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="ref-firm" className={labelClass}>
            Law Firm Name <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <input
            id="ref-firm"
            type="text"
            aria-required="true"
            className={inputClass(!!errors.firmName)}
            {...register('firmName')}
          />
          {errors.firmName && <p role="alert" className={errorClass}>{errors.firmName.message}</p>}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="ref-attorney-phone" className={labelClass}>
              Your Phone <span aria-hidden="true" className="text-red-500">*</span>
            </label>
            <input
              id="ref-attorney-phone"
              type="tel"
              autoComplete="tel"
              aria-required="true"
              placeholder="(555) 000-0000"
              className={inputClass(!!errors.attorneyPhone)}
              {...register('attorneyPhone')}
            />
            {errors.attorneyPhone && <p role="alert" className={errorClass}>{errors.attorneyPhone.message}</p>}
          </div>
          <div>
            <label htmlFor="ref-attorney-email" className={labelClass}>
              Your Email <span aria-hidden="true" className="text-red-500">*</span>
            </label>
            <input
              id="ref-attorney-email"
              type="email"
              autoComplete="email"
              aria-required="true"
              className={inputClass(!!errors.attorneyEmail)}
              {...register('attorneyEmail')}
            />
            {errors.attorneyEmail && <p role="alert" className={errorClass}>{errors.attorneyEmail.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="ref-bar" className={labelClass}>
            Michigan Bar Number <span className="text-slate-400 font-normal">(optional)</span>
          </label>
          <input
            id="ref-bar"
            type="text"
            className={inputClass(false)}
            placeholder="P-XXXXXX"
            {...register('barNumber')}
          />
          {/* Hidden field — always MI */}
          <input type="hidden" value="MI" {...register('licenseState')} />
        </div>
      </fieldset>

      {/* ── Client information ─────────────────────────────────────── */}
      <fieldset className="space-y-4">
        <legend className="text-sm font-bold text-[#0A1628] pb-1 border-b border-slate-200 w-full">
          Client Information
        </legend>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="ref-client-first" className={labelClass}>
              Client First Name <span aria-hidden="true" className="text-red-500">*</span>
            </label>
            <input
              id="ref-client-first"
              type="text"
              aria-required="true"
              className={inputClass(!!errors.clientFirstName)}
              {...register('clientFirstName')}
            />
            {errors.clientFirstName && <p role="alert" className={errorClass}>{errors.clientFirstName.message}</p>}
          </div>
          <div>
            <label htmlFor="ref-client-last" className={labelClass}>
              Client Last Name <span aria-hidden="true" className="text-red-500">*</span>
            </label>
            <input
              id="ref-client-last"
              type="text"
              aria-required="true"
              className={inputClass(!!errors.clientLastName)}
              {...register('clientLastName')}
            />
            {errors.clientLastName && <p role="alert" className={errorClass}>{errors.clientLastName.message}</p>}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="ref-client-phone" className={labelClass}>
              Client Phone <span aria-hidden="true" className="text-red-500">*</span>
            </label>
            <input
              id="ref-client-phone"
              type="tel"
              aria-required="true"
              placeholder="(555) 000-0000"
              className={inputClass(!!errors.clientPhone)}
              {...register('clientPhone')}
            />
            {errors.clientPhone && <p role="alert" className={errorClass}>{errors.clientPhone.message}</p>}
          </div>
          <div>
            <label htmlFor="ref-client-email" className={labelClass}>
              Client Email <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <input
              id="ref-client-email"
              type="email"
              className={inputClass(!!errors.clientEmail)}
              {...register('clientEmail')}
            />
            {errors.clientEmail && <p role="alert" className={errorClass}>{errors.clientEmail.message}</p>}
          </div>
        </div>
      </fieldset>

      {/* ── Case details ────────────────────────────────────────────── */}
      <fieldset className="space-y-4">
        <legend className="text-sm font-bold text-[#0A1628] pb-1 border-b border-slate-200 w-full">
          Case Details
        </legend>

        <div>
          <label htmlFor="ref-case-type" className={labelClass}>
            Case Type <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <select
            id="ref-case-type"
            aria-required="true"
            className={`${inputClass(!!errors.caseType)} cursor-pointer`}
            {...register('caseType')}
          >
            <option value="">Select case type…</option>
            {CASE_TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {errors.caseType && <p role="alert" className={errorClass}>{errors.caseType.message}</p>}
        </div>

        <div>
          <label htmlFor="ref-settlement" className={labelClass}>
            Estimated Settlement Range <span className="text-slate-400 font-normal">(optional)</span>
          </label>
          <select
            id="ref-settlement"
            className={`${inputClass(false)} cursor-pointer`}
            {...register('estimatedSettlement')}
          >
            <option value="">Select range…</option>
            {ESTIMATED_SETTLEMENT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="ref-notes" className={labelClass}>
            Additional Notes <span className="text-slate-400 font-normal">(optional)</span>
          </label>
          <textarea
            id="ref-notes"
            rows={4}
            className={`${inputClass(false)} resize-none`}
            placeholder="Any relevant case details or special circumstances…"
            {...register('notes')}
          />
          {errors.notes && <p role="alert" className={errorClass}>{errors.notes.message}</p>}
        </div>
      </fieldset>

      {/* ── Consent ──────────────────────────────────────────────────── */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            aria-required="true"
            aria-describedby={errors.agreeToTerms ? 'ref-agree-error' : undefined}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#C9A84C] focus:ring-[#C9A84C] cursor-pointer"
            {...register('agreeToTerms')}
          />
          <span className="text-xs text-slate-600 leading-relaxed">
            I confirm that I am a licensed Michigan attorney and that my client has authorized
            me to submit this referral. I agree to{' '}
            <a href="/terms" className="text-[#C9A84C] hover:underline">Terms of Service</a>{' '}
            and{' '}
            <a href="/privacy-policy" className="text-[#C9A84C] hover:underline">Privacy Policy</a>.{' '}
            <span aria-hidden="true" className="text-red-500">*</span>
          </span>
        </label>
        {errors.agreeToTerms && (
          <p id="ref-agree-error" role="alert" className="mt-1 text-xs text-red-600">
            {errors.agreeToTerms.message}
          </p>
        )}
      </div>

      {/* Server error */}
      {formState === 'error' && serverError && (
        <div
          role="alert"
          aria-live="assertive"
          className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          <AlertCircle aria-hidden="true" size={15} className="shrink-0 mt-0.5" />
          {serverError}
        </div>
      )}

      {/* Turnstile CAPTCHA */}
      <TurnstileWidget
        onToken={setTurnstileToken}
        onError={() => setServerError('CAPTCHA verification failed. Please try again.')}
        onExpire={() => {
          setTurnstileToken('')
          setServerError('CAPTCHA expired. Please verify again.')
        }}
      />

      {/* Submit */}
      <button
        type="submit"
        disabled={formState === 'submitting'}
        data-event="click"
        data-event-label="attorney_referral_submit_btn"
        data-event-category="attorney"
        className="w-full h-12 rounded-xl bg-[#C9A84C] text-[#0A1628] font-bold text-sm hover:bg-[#b89238] disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] focus-visible:ring-offset-2 cursor-pointer"
      >
        {formState === 'submitting'
          ? <span className="inline-flex items-center gap-2"><Loader2 aria-hidden="true" size={15} className="animate-spin" />Submitting…</span>
          : 'Submit Client Referral'}
      </button>

    </form>
  )
}
