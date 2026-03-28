'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Phone, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import { step4Schema, type Step4Data } from '@/lib/validations/apply'
import type { ApplyDraft } from '@/hooks/useApplyForm'

interface Step4Props {
  formData: ApplyDraft
  onNext:   (data: Step4Data) => void
  onPrev:   () => void
}

function FieldError({ message, id }: { message?: string; id?: string }) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
      <span aria-hidden="true">⚠</span> {message}
    </p>
  )
}

function formatPhone(raw: string): string {
  const d = raw.replace(/\D/g, '').slice(0, 10)
  if (d.length <= 3)  return d
  if (d.length <= 6)  return `(${d.slice(0, 3)}) ${d.slice(3)}`
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
}

const URGENCY_OPTIONS = [
  { value: 'immediately',    label: 'Immediately — ASAP' },
  { value: 'within-a-week',  label: 'Within a week' },
  { value: 'within-a-month', label: 'Within a month' },
] as const

const HEARD_ABOUT_OPTIONS = [
  'Google / Search',
  'Social Media',
  'Friend / Family',
  'Attorney Referral',
  'TV / Radio',
  'Billboard',
  'Other',
] as const

export default function Step4ContactInfo({ formData, onNext, onPrev }: Step4Props) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Step4Data>({
    resolver:      zodResolver(step4Schema),
    defaultValues: {
      firstName:     formData.firstName     ?? '',
      lastName:      formData.lastName      ?? '',
      email:         formData.email         ?? '',
      phone:         formData.phone         ?? '',
      streetAddress: formData.streetAddress ?? '',
      city:          formData.city          ?? '',
      zipCode:       formData.zipCode       ?? '',
      state:         'MI',
      urgency:       formData.urgency,
      heardAboutUs:  formData.heardAboutUs  ?? '',
    },
  })

  const inputClass = (hasError?: boolean) =>
    cn(
      'w-full h-14 rounded-xl border px-4 text-sm text-slate-800 bg-white',
      'focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent',
      'transition-colors duration-150 placeholder:text-slate-400',
      hasError ? 'border-red-400 bg-red-50' : 'border-slate-300',
    )

  return (
    <form
      id="step-4-form"
      onSubmit={handleSubmit(onNext)}
      noValidate
      aria-label="Step 4: Your contact information"
    >
      <h2 className="text-2xl font-bold text-[#0A1628] mb-1">
        Your Contact Information
      </h2>
      <p className="text-slate-500 text-sm mb-6">
        Michigan residents only. We'll use this to contact you about your application.
      </p>

      {/* Name row */}
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="first-name" className="block text-sm font-semibold text-slate-700 mb-1.5">
            First Name <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="first-name"
            type="text"
            autoComplete="given-name"
            placeholder="Jane"
            aria-required="true"
            aria-invalid={!!errors.firstName}
            {...register('firstName')}
            className={inputClass(!!errors.firstName)}
          />
          <FieldError message={errors.firstName?.message} />
        </div>
        <div>
          <label htmlFor="last-name" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Last Name <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="last-name"
            type="text"
            autoComplete="family-name"
            placeholder="Smith"
            aria-required="true"
            aria-invalid={!!errors.lastName}
            {...register('lastName')}
            className={inputClass(!!errors.lastName)}
          />
          <FieldError message={errors.lastName?.message} />
        </div>
      </div>

      {/* Email */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">
          Email Address <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          aria-required="true"
          aria-invalid={!!errors.email}
          {...register('email')}
          className={inputClass(!!errors.email)}
        />
        <FieldError message={errors.email?.message} />
      </div>

      {/* Phone */}
      <div className="mb-4">
        <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-1.5">
          Phone Number <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <div className="relative">
          <Phone aria-hidden="true" size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="(555) 000-0000"
                value={field.value}
                onChange={(e) => field.onChange(formatPhone(e.target.value))}
                onBlur={field.onBlur}
                aria-required="true"
                aria-invalid={!!errors.phone}
                aria-describedby="phone-hint"
                className={cn(inputClass(!!errors.phone), 'pl-10')}
              />
            )}
          />
        </div>
        {errors.phone ? (
          <FieldError message={errors.phone.message} />
        ) : (
          <p id="phone-hint" className="mt-1 text-xs text-slate-400">
            We'll call you within 1 business hour.
          </p>
        )}
      </div>

      {/* Address */}
      <div className="mb-4">
        <label htmlFor="street-address" className="block text-sm font-semibold text-slate-700 mb-1.5">
          Street Address
          <span className="ml-1 text-xs font-normal text-slate-400">(optional)</span>
        </label>
        <input
          id="street-address"
          type="text"
          autoComplete="street-address"
          placeholder="123 Main St, Apt 4B"
          {...register('streetAddress')}
          className={inputClass()}
        />
      </div>

      {/* City / ZIP / State */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="city" className="block text-sm font-semibold text-slate-700 mb-1.5">
            City <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="city"
            type="text"
            autoComplete="address-level2"
            placeholder="Detroit"
            aria-required="true"
            aria-invalid={!!errors.city}
            {...register('city')}
            className={inputClass(!!errors.city)}
          />
          <FieldError message={errors.city?.message} />
        </div>

        <div>
          <label htmlFor="zip" className="block text-sm font-semibold text-slate-700 mb-1.5">
            ZIP Code <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="zip"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            placeholder="48201"
            maxLength={5}
            aria-required="true"
            aria-invalid={!!errors.zipCode}
            aria-describedby={errors.zipCode ? undefined : 'zip-hint'}
            {...register('zipCode')}
            className={inputClass(!!errors.zipCode)}
          />
          {errors.zipCode ? (
            <FieldError message={errors.zipCode.message} />
          ) : (
            <p id="zip-hint" className="mt-1 text-xs text-slate-400">Michigan only</p>
          )}
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-semibold text-slate-700 mb-1.5">
            State
          </label>
          <div
            id="state"
            className={cn(inputClass(), 'flex items-center gap-2 text-slate-500 cursor-not-allowed bg-slate-50')}
            aria-label="State: Michigan (required)"
            aria-readonly="true"
          >
            <MapPin aria-hidden="true" size={14} className="text-[#C9A84C]" />
            <span className="text-sm">Michigan (MI)</span>
          </div>
          <input type="hidden" {...register('state')} value="MI" />
        </div>
      </div>

      <hr className="my-6 border-slate-200" />

      {/* Urgency */}
      <div className="mb-4">
        <label htmlFor="urgency" className="block text-sm font-semibold text-slate-700 mb-1.5">
          How soon do you need funding?
          <span className="ml-1 text-xs font-normal text-slate-400">(optional)</span>
        </label>
        <select
          id="urgency"
          {...register('urgency')}
          className={cn(inputClass(), 'cursor-pointer')}
          aria-describedby="urgency-hint"
        >
          <option value="">Select one…</option>
          {URGENCY_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <p id="urgency-hint" className="mt-1 text-xs text-slate-400">
          Helps us prioritize your review.
        </p>
      </div>

      {/* How did you hear */}
      <div className="mb-2">
        <label htmlFor="heard-about" className="block text-sm font-semibold text-slate-700 mb-1.5">
          How did you hear about us?
          <span className="ml-1 text-xs font-normal text-slate-400">(optional)</span>
        </label>
        <select
          id="heard-about"
          {...register('heardAboutUs')}
          className={cn(inputClass(), 'cursor-pointer')}
        >
          <option value="">Select one…</option>
          {HEARD_ABOUT_OPTIONS.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex gap-3">
        <button
          type="button"
          onClick={onPrev}
          data-event="click"
          data-event-label="apply_step4_back"
          data-event-category="apply_funnel"
          aria-label="Go back to attorney information"
          className="h-14 px-6 rounded-xl border-2 border-slate-300 text-slate-600 font-semibold text-sm cursor-pointer hover:border-slate-400 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
        >
          ← Back
        </button>
        <button
          type="submit"
          data-event="click"
          data-event-label="apply_step4_next"
          data-event-category="apply_funnel"
          aria-label="Review your application"
          className="flex-1 h-14 rounded-xl bg-[#C9A84C] hover:bg-[#b8973d] text-[#0A1628] font-bold text-base cursor-pointer transition-all duration-200 shadow-[0_4px_20px_rgba(201,168,76,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] focus-visible:ring-offset-2"
        >
          Review Application →
        </button>
      </div>
    </form>
  )
}
