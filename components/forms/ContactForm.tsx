'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { contactSchema, CONTACT_SUBJECTS, type ContactFormData } from '@/lib/validations/contact'
import { gtagEvent } from '@/lib/analytics/gtag'
import { pixelContact } from '@/lib/analytics/pixel'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [serverError, setServerError] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { subject: 'general' },
  })

  async function onSubmit(data: ContactFormData) {
    setFormState('submitting')
    setServerError('')

    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({})) as { error?: string }
        throw new Error(body.error ?? 'Something went wrong. Please try again.')
      }

      gtagEvent('contact_form_submit', { event_category: 'contact', event_label: data.subject })
      pixelContact()
      setFormState('success')
      reset()
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Something went wrong.')
      setFormState('error')
    }
  }

  if (formState === 'success') {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <CheckCircle aria-hidden="true" size={36} className="text-emerald-500 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-[#0A1628] mb-2">Message Received</h3>
        <p className="text-sm text-slate-600">
          We typically respond within 1 hour on business days. We'll reach out
          via the email address you provided.
        </p>
        <button
          onClick={() => setFormState('idle')}
          className="mt-4 text-sm font-medium text-[#C9A84C] hover:underline cursor-pointer"
        >
          Send another message
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Contact form"
      className="space-y-5"
    >
      {/* Name row */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-first-name" className="block text-xs font-semibold text-slate-700 mb-1.5">
            First Name <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <input
            id="contact-first-name"
            type="text"
            autoComplete="given-name"
            aria-required="true"
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? 'contact-first-name-error' : undefined}
            className={inputClass(!!errors.firstName)}
            {...register('firstName')}
          />
          {errors.firstName && (
            <p id="contact-first-name-error" role="alert" className="mt-1 text-xs text-red-600">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="contact-last-name" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Last Name <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <input
            id="contact-last-name"
            type="text"
            autoComplete="family-name"
            aria-required="true"
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? 'contact-last-name-error' : undefined}
            className={inputClass(!!errors.lastName)}
            {...register('lastName')}
          />
          {errors.lastName && (
            <p id="contact-last-name-error" role="alert" className="mt-1 text-xs text-red-600">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 mb-1.5">
          Email Address <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          className={inputClass(!!errors.email)}
          {...register('email')}
        />
        {errors.email && (
          <p id="contact-email-error" role="alert" className="mt-1 text-xs text-red-600">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone (optional) */}
      <div>
        <label htmlFor="contact-phone" className="block text-xs font-semibold text-slate-700 mb-1.5">
          Phone Number <span className="text-slate-400 font-normal">(optional)</span>
        </label>
        <input
          id="contact-phone"
          type="tel"
          autoComplete="tel"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
          className={inputClass(!!errors.phone)}
          placeholder="(555) 000-0000"
          {...register('phone')}
        />
        {errors.phone && (
          <p id="contact-phone-error" role="alert" className="mt-1 text-xs text-red-600">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="contact-subject" className="block text-xs font-semibold text-slate-700 mb-1.5">
          Subject <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <select
          id="contact-subject"
          aria-required="true"
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
          className={`${inputClass(!!errors.subject)} cursor-pointer`}
          {...register('subject')}
        >
          {CONTACT_SUBJECTS.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
        {errors.subject && (
          <p id="contact-subject-error" role="alert" className="mt-1 text-xs text-red-600">
            {errors.subject.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700 mb-1.5">
          Message <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <textarea
          id="contact-message"
          rows={5}
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          className={`${inputClass(!!errors.message)} resize-none`}
          placeholder="Tell us how we can help..."
          {...register('message')}
        />
        {errors.message && (
          <p id="contact-message-error" role="alert" className="mt-1 text-xs text-red-600">
            {errors.message.message}
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

      {/* Submit */}
      <button
        type="submit"
        disabled={formState === 'submitting'}
        data-event="click"
        data-event-label="contact_form_submit_btn"
        data-event-category="contact"
        className="w-full h-12 rounded-xl bg-[#C9A84C] text-[#0A1628] font-bold text-sm hover:bg-[#b89238] disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] focus-visible:ring-offset-2 cursor-pointer"
      >
        {formState === 'submitting'
          ? <span className="inline-flex items-center gap-2"><Loader2 aria-hidden="true" size={15} className="animate-spin" />Sending…</span>
          : 'Send Message'}
      </button>

      <p className="text-[11px] text-slate-400 text-center leading-snug">
        We respond within 1 hour on business days (Mon–Fri, 8 AM–6 PM ET).
        By submitting, you agree to our{' '}
        <a href="/privacy-policy" className="underline hover:text-slate-600">Privacy Policy</a>.
      </p>
    </form>
  )
}
