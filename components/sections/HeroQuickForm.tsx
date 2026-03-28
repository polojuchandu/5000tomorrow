'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Phone, ChevronRight, Loader2, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

const CASE_TYPE_OPTIONS = [
  { value: 'car-accident',        label: 'Car / Auto Accident' },
  { value: 'truck-accident',      label: 'Truck Accident' },
  { value: 'motorcycle-accident', label: 'Motorcycle Accident' },
  { value: 'pedestrian-accident', label: 'Pedestrian Accident' },
  { value: 'rideshare-accident',  label: 'Rideshare (Uber / Lyft)' },
  { value: 'hit-and-run',         label: 'Hit & Run' },
  { value: 'bicycle-accident',    label: 'Bicycle Accident' },
  { value: 'workers-compensation', label: 'Workers\' Compensation' },
  { value: 'slip-and-fall',       label: 'Slip & Fall' },
  { value: 'workplace-injury',    label: 'Workplace Injury' },
  { value: 'wrongful-death',      label: 'Wrongful Death' },
  { value: 'personal-injury',     label: 'Personal Injury (Other)' },
] as const

interface HeroQuickFormProps {
  className?: string
}

export default function HeroQuickForm({ className }: HeroQuickFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [caseType, setCaseType] = useState('')
  const [phone, setPhone]       = useState('')
  const [errors, setErrors]     = useState<{ caseType?: string; phone?: string }>({})

  function formatPhone(raw: string): string {
    const digits = raw.replace(/\D/g, '').slice(0, 10)
    if (digits.length <= 3)  return digits
    if (digits.length <= 6)  return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  }

  function validate(): boolean {
    const next: typeof errors = {}
    if (!caseType) next.caseType = 'Please select your case type'
    const digits = phone.replace(/\D/g, '')
    if (!digits || digits.length < 10) next.phone = 'Please enter a valid 10-digit phone number'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    const digits = phone.replace(/\D/g, '')
    startTransition(() => {
      router.push(`/apply?case=${encodeURIComponent(caseType)}&phone=${encodeURIComponent(digits)}`)
    })
  }

  return (
    <div
      className={cn(
        'bg-white rounded-2xl shadow-[0_8px_40px_rgba(10,22,40,0.25)] p-6 sm:p-8 w-full',
        className,
      )}
      role="complementary"
      aria-label="Quick funding application form"
    >
      {/* Card header */}
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-1">
          Free · No Obligation
        </p>
        <h2 className="text-xl sm:text-2xl font-bold text-[#0A1628] leading-tight">
          Get Your Funding Today
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Takes 2 minutes. We'll review with your attorney.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate aria-label="Quick funding application">
        {/* Case Type */}
        <div className="mb-4">
          <label
            htmlFor="hero-case-type"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            What type of case do you have?
            <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>
          </label>
          <select
            id="hero-case-type"
            name="caseType"
            value={caseType}
            onChange={(e) => {
              setCaseType(e.target.value)
              if (errors.caseType) setErrors((p) => ({ ...p, caseType: undefined }))
            }}
            required
            aria-required="true"
            aria-describedby={errors.caseType ? 'hero-case-type-error' : undefined}
            aria-invalid={!!errors.caseType}
            className={cn(
              'w-full h-12 rounded-xl border bg-white px-3 text-sm text-slate-800',
              'focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent',
              'transition-colors duration-150 cursor-pointer',
              errors.caseType
                ? 'border-red-400 bg-red-50'
                : 'border-slate-300 hover:border-slate-400',
            )}
          >
            <option value="" disabled>Select case type…</option>
            {CASE_TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {errors.caseType && (
            <p id="hero-case-type-error" role="alert" className="mt-1 text-xs text-red-600">
              {errors.caseType}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="mb-5">
          <label
            htmlFor="hero-phone"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Your phone number
            <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>
          </label>
          <div className="relative">
            <Phone
              aria-hidden="true"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              id="hero-phone"
              type="tel"
              name="phone"
              value={phone}
              onChange={(e) => {
                setPhone(formatPhone(e.target.value))
                if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }))
              }}
              placeholder="(555) 000-0000"
              autoComplete="tel"
              required
              aria-required="true"
              aria-describedby={errors.phone ? 'hero-phone-error' : 'hero-phone-hint'}
              aria-invalid={!!errors.phone}
              className={cn(
                'w-full h-12 rounded-xl border pl-9 pr-4 text-sm text-slate-800',
                'focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent',
                'transition-colors duration-150',
                errors.phone
                  ? 'border-red-400 bg-red-50'
                  : 'border-slate-300 hover:border-slate-400',
              )}
            />
          </div>
          {errors.phone ? (
            <p id="hero-phone-error" role="alert" className="mt-1 text-xs text-red-600">
              {errors.phone}
            </p>
          ) : (
            <p id="hero-phone-hint" className="mt-1 text-xs text-slate-400">
              Michigan area codes only. We'll call within 1 hour.
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          data-event="click"
          data-event-label="hero_quick_form_submit"
          data-event-category="conversion"
          aria-label="Submit quick application and get funding"
          className={cn(
            'w-full h-14 rounded-xl font-bold text-base text-[#0A1628] cursor-pointer',
            'bg-[#C9A84C] hover:bg-[#b8973d]',
            'shadow-[0_4px_24px_rgba(201,168,76,0.35)] hover:shadow-[0_6px_32px_rgba(201,168,76,0.50)]',
            'transition-all duration-200 flex items-center justify-center gap-2',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] focus-visible:ring-offset-2',
            isPending && 'opacity-70 pointer-events-none',
          )}
        >
          {isPending ? (
            <Loader2 className="animate-spin" aria-hidden="true" size={20} />
          ) : (
            <>
              Get My $5,000 Now
              <ChevronRight aria-hidden="true" size={20} />
            </>
          )}
        </button>
      </form>

      {/* Trust fine print */}
      <div className="mt-4 space-y-1.5">
        <div className="flex items-start gap-2">
          <ShieldCheck
            aria-hidden="true"
            size={14}
            className="text-emerald-500 mt-0.5 shrink-0"
          />
          <p className="text-xs text-slate-500">
            No credit check · No upfront fees · Requires active case &amp; Michigan attorney
          </p>
        </div>
        <p className="text-[10px] text-slate-400 leading-snug">
          Pre-settlement funding is not a loan. Repayment required only upon successful case
          settlement. Amount subject to case evaluation. Michigan residents only.
        </p>
      </div>
    </div>
  )
}
