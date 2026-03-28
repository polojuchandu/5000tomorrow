'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Car, Truck, Bike, User, Navigation, Zap,
  HardHat, AlertTriangle, Building2, Heart,
  Scale, Home, HelpCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { step1Schema, CASE_TYPE_OPTIONS, type Step1Data, type CaseTypeValue } from '@/lib/validations/apply'
import type { ApplyDraft } from '@/hooks/useApplyForm'

// ─── Icon map ─────────────────────────────────────────────────────────────────

const ICON_MAP: Record<CaseTypeValue, React.ElementType> = {
  'car-accident':         Car,
  'truck-accident':       Truck,
  'motorcycle-accident':  Bike,
  'pedestrian-accident':  User,
  'rideshare-accident':   Navigation,
  'hit-and-run':          Zap,
  'bicycle-accident':     Bike,
  'workers-compensation': HardHat,
  'slip-and-fall':        AlertTriangle,
  'workplace-injury':     Building2,
  'wrongful-death':       Heart,
  'personal-injury':      Scale,
  'premises-liability':   Home,
  'other':                HelpCircle,
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface Step1Props {
  formData: ApplyDraft
  onNext:   (data: Step1Data) => void
}

// ─── Reusable field error ─────────────────────────────────────────────────────

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p role="alert" className="mt-1 text-xs text-red-600 flex items-center gap-1">
      <span aria-hidden="true">⚠</span> {message}
    </p>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Step1CaseType({ formData, onNext }: Step1Props) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Step1Data>({
    resolver:      zodResolver(step1Schema),
    defaultValues: {
      caseType:         formData.caseType,
      incidentDate:     formData.incidentDate,
      hasActiveLawsuit: formData.hasActiveLawsuit ?? false,
    },
  })

  const selected = watch('caseType')

  const primary   = CASE_TYPE_OPTIONS.filter((o) => o.isPrimary)
  const secondary = CASE_TYPE_OPTIONS.filter((o) => !o.isPrimary)

  function renderCaseCard(opt: (typeof CASE_TYPE_OPTIONS)[number]) {
    const Icon       = ICON_MAP[opt.value]
    const isSelected = selected === opt.value

    return (
      <label
        key={opt.value}
        htmlFor={`case-${opt.value}`}
        className={cn(
          'group relative flex items-center gap-3 rounded-xl border-2 p-4 cursor-pointer',
          'transition-all duration-150',
          'focus-within:ring-2 focus-within:ring-[#C9A84C] focus-within:ring-offset-1',
          isSelected
            ? 'border-[#C9A84C] bg-[#C9A84C]/6'
            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50',
        )}
      >
        <input
          {...register('caseType')}
          type="radio"
          id={`case-${opt.value}`}
          value={opt.value}
          aria-label={opt.label}
          className="sr-only"
        />
        {/* Icon circle */}
        <div
          aria-hidden="true"
          className={cn(
            'shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-150',
            isSelected ? 'bg-[#C9A84C]/15' : 'bg-slate-100 group-hover:bg-slate-200',
          )}
        >
          <Icon
            size={20}
            strokeWidth={1.75}
            className={isSelected ? 'text-[#C9A84C]' : 'text-slate-500'}
          />
        </div>
        {/* Label */}
        <span
          className={cn(
            'text-sm font-medium flex-1',
            isSelected ? 'text-[#0A1628]' : 'text-slate-700',
          )}
        >
          {opt.label}
        </span>
        {/* Radio dot */}
        <div
          aria-hidden="true"
          className={cn(
            'shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center',
            isSelected ? 'border-[#C9A84C]' : 'border-slate-300',
          )}
        >
          {isSelected && (
            <div className="w-2.5 h-2.5 rounded-full bg-[#C9A84C]" />
          )}
        </div>
      </label>
    )
  }

  return (
    <form
      id="step-1-form"
      onSubmit={handleSubmit(onNext)}
      noValidate
      aria-label="Step 1: Select your case type"
    >
      <h2 className="text-2xl font-bold text-[#0A1628] mb-1">
        What type of case do you have?
      </h2>
      <p className="text-slate-500 text-sm mb-6">
        Select the option that best describes your situation.
      </p>

      {/* Primary cases */}
      <fieldset className="mb-6">
        <legend className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
          Common Cases
        </legend>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
          role="group"
          aria-label="Common case types"
        >
          {primary.map(renderCaseCard)}
        </div>
      </fieldset>

      {/* Secondary cases */}
      <fieldset className="mb-2">
        <legend className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
          Other Qualifying Cases
        </legend>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
          role="group"
          aria-label="Other qualifying case types"
        >
          {secondary.map(renderCaseCard)}
        </div>
      </fieldset>

      <FieldError message={errors.caseType?.message} />

      {/* Divider */}
      <hr className="my-6 border-slate-200" />

      {/* Incident date */}
      <div className="mb-5">
        <label htmlFor="incident-date" className="block text-sm font-semibold text-slate-700 mb-1.5">
          When did the incident occur?
          <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>
        </label>
        <input
          id="incident-date"
          type="date"
          max={new Date().toISOString().split('T')[0]}
          aria-required="true"
          aria-describedby={errors.incidentDate ? 'incident-date-error' : undefined}
          aria-invalid={!!errors.incidentDate}
          {...register('incidentDate')}
          className={cn(
            'w-full h-14 rounded-xl border px-4 text-sm text-slate-800 bg-white',
            'focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent',
            'transition-colors duration-150',
            errors.incidentDate ? 'border-red-400 bg-red-50' : 'border-slate-300',
          )}
        />
        <FieldError message={errors.incidentDate?.message} />
      </div>

      {/* Active lawsuit */}
      <Controller
        name="hasActiveLawsuit"
        control={control}
        render={({ field }) => (
          <fieldset className="mb-2">
            <legend className="block text-sm font-semibold text-slate-700 mb-2">
              Has a lawsuit been filed for this case?
              <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>
            </legend>
            <div className="flex gap-3">
              {[
                { value: true,  label: 'Yes, lawsuit filed' },
                { value: false, label: 'No, not yet' },
              ].map((opt) => (
                <label
                  key={String(opt.value)}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-2 h-12 rounded-xl border-2 cursor-pointer',
                    'text-sm font-medium transition-all duration-150',
                    field.value === opt.value
                      ? 'border-[#C9A84C] bg-[#C9A84C]/6 text-[#0A1628]'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300',
                  )}
                >
                  <input
                    type="radio"
                    className="sr-only"
                    aria-label={opt.label}
                    checked={field.value === opt.value}
                    onChange={() => field.onChange(opt.value)}
                    onBlur={field.onBlur}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
            <FieldError message={errors.hasActiveLawsuit?.message} />
          </fieldset>
        )}
      />

      {/* Submit */}
      <div className="mt-8">
        <button
          type="submit"
          data-event="click"
          data-event-label="apply_step1_next"
          data-event-category="apply_funnel"
          aria-label="Continue to injury details"
          className="w-full h-14 rounded-xl bg-[#C9A84C] hover:bg-[#b8973d] text-[#0A1628] font-bold text-base cursor-pointer transition-all duration-200 shadow-[0_4px_20px_rgba(201,168,76,0.35)] hover:shadow-[0_6px_28px_rgba(201,168,76,0.50)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] focus-visible:ring-offset-2"
        >
          Continue →
        </button>
      </div>
    </form>
  )
}
