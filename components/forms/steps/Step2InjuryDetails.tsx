'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import { step2Schema, type Step2Data } from '@/lib/validations/apply'
import type { ApplyDraft } from '@/hooks/useApplyForm'

interface Step2Props {
  formData: ApplyDraft
  onNext:   (data: Step2Data) => void
  onPrev:   () => void
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p role="alert" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
      <span aria-hidden="true">⚠</span> {message}
    </p>
  )
}

function CharCount({ current, max }: { current: number; max: number }) {
  const pct = current / max
  return (
    <span
      aria-live="polite"
      aria-label={`${current} of ${max} characters used`}
      className={cn(
        'text-xs tabular-nums',
        pct >= 0.9 ? 'text-red-500' : pct >= 0.75 ? 'text-amber-500' : 'text-slate-400',
      )}
    >
      {current}/{max}
    </span>
  )
}

export default function Step2InjuryDetails({ formData, onNext, onPrev }: Step2Props) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Step2Data>({
    resolver:      zodResolver(step2Schema),
    defaultValues: {
      incidentDescription: formData.incidentDescription ?? '',
      injuryDescription:   formData.injuryDescription   ?? '',
      hospitalized:        formData.hospitalized         ?? false,
      treatmentOngoing:    formData.treatmentOngoing     ?? false,
    },
  })

  const incidentLen = watch('incidentDescription')?.length ?? 0
  const injuryLen   = watch('injuryDescription')?.length   ?? 0

  return (
    <form
      id="step-2-form"
      onSubmit={handleSubmit(onNext)}
      noValidate
      aria-label="Step 2: Describe your injuries"
    >
      <h2 className="text-2xl font-bold text-[#0A1628] mb-1">
        Tell Us About What Happened
      </h2>
      <p className="text-slate-500 text-sm mb-6">
        Be as specific as you can. Your attorney will have access to this information.
      </p>

      {/* Incident description */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="incident-desc" className="text-sm font-semibold text-slate-700">
            What happened?
            <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>
          </label>
          <CharCount current={incidentLen} max={1000} />
        </div>
        <textarea
          id="incident-desc"
          rows={4}
          placeholder="Briefly describe how the incident occurred — date, location, what led to the accident…"
          aria-required="true"
          aria-describedby={errors.incidentDescription ? 'incident-desc-error' : 'incident-desc-hint'}
          aria-invalid={!!errors.incidentDescription}
          {...register('incidentDescription')}
          className={cn(
            'w-full rounded-xl border px-4 py-3 text-sm text-slate-800 bg-white',
            'resize-none leading-relaxed placeholder:text-slate-400',
            'focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent',
            'transition-colors duration-150',
            errors.incidentDescription ? 'border-red-400 bg-red-50' : 'border-slate-300',
          )}
        />
        {errors.incidentDescription ? (
          <FieldError message={errors.incidentDescription.message} />
        ) : (
          <p id="incident-desc-hint" className="mt-1 text-xs text-slate-400">
            Minimum 20 characters.
          </p>
        )}
      </div>

      {/* Injury description */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="injury-desc" className="text-sm font-semibold text-slate-700">
            What injuries did you sustain?
            <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>
          </label>
          <CharCount current={injuryLen} max={500} />
        </div>
        <textarea
          id="injury-desc"
          rows={3}
          placeholder="e.g., Broken arm, neck injury, soft tissue damage, concussion…"
          aria-required="true"
          aria-describedby={errors.injuryDescription ? 'injury-desc-error' : undefined}
          aria-invalid={!!errors.injuryDescription}
          {...register('injuryDescription')}
          className={cn(
            'w-full rounded-xl border px-4 py-3 text-sm text-slate-800 bg-white',
            'resize-none leading-relaxed placeholder:text-slate-400',
            'focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent',
            'transition-colors duration-150',
            errors.injuryDescription ? 'border-red-400 bg-red-50' : 'border-slate-300',
          )}
        />
        <FieldError message={errors.injuryDescription?.message} />
      </div>

      {/* Checkboxes */}
      <fieldset className="space-y-3 mb-2">
        <legend className="text-sm font-semibold text-slate-700 mb-2">
          Medical treatment
        </legend>

        <Controller
          name="hospitalized"
          control={control}
          render={({ field }) => (
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative mt-0.5">
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  onBlur={field.onBlur}
                  aria-label="Were you hospitalized?"
                  className="sr-only peer"
                />
                <div
                  aria-hidden="true"
                  className={cn(
                    'w-5 h-5 rounded-md border-2 flex items-center justify-center',
                    'transition-colors duration-150',
                    field.value
                      ? 'bg-[#C9A84C] border-[#C9A84C]'
                      : 'bg-white border-slate-300 group-hover:border-slate-400',
                  )}
                >
                  {field.value && (
                    <svg aria-hidden="true" viewBox="0 0 12 12" className="w-3 h-3 text-[#0A1628]" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700">I was hospitalized</p>
                <p className="text-xs text-slate-500">Admitted overnight or to the ER</p>
              </div>
            </label>
          )}
        />

        <Controller
          name="treatmentOngoing"
          control={control}
          render={({ field }) => (
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative mt-0.5">
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  onBlur={field.onBlur}
                  aria-label="Is your treatment ongoing?"
                  className="sr-only"
                />
                <div
                  aria-hidden="true"
                  className={cn(
                    'w-5 h-5 rounded-md border-2 flex items-center justify-center',
                    'transition-colors duration-150',
                    field.value
                      ? 'bg-[#C9A84C] border-[#C9A84C]'
                      : 'bg-white border-slate-300 group-hover:border-slate-400',
                  )}
                >
                  {field.value && (
                    <svg aria-hidden="true" viewBox="0 0 12 12" className="w-3 h-3 text-[#0A1628]" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700">I am still receiving treatment</p>
                <p className="text-xs text-slate-500">Physical therapy, follow-up visits, etc.</p>
              </div>
            </label>
          )}
        />
      </fieldset>

      {/* Navigation */}
      <div className="mt-8 flex gap-3">
        <button
          type="button"
          onClick={onPrev}
          data-event="click"
          data-event-label="apply_step2_back"
          data-event-category="apply_funnel"
          aria-label="Go back to case type selection"
          className="h-14 px-6 rounded-xl border-2 border-slate-300 text-slate-600 font-semibold text-sm cursor-pointer hover:border-slate-400 hover:text-slate-800 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
        >
          ← Back
        </button>
        <button
          type="submit"
          data-event="click"
          data-event-label="apply_step2_next"
          data-event-category="apply_funnel"
          aria-label="Continue to attorney information"
          className="flex-1 h-14 rounded-xl bg-[#C9A84C] hover:bg-[#b8973d] text-[#0A1628] font-bold text-base cursor-pointer transition-all duration-200 shadow-[0_4px_20px_rgba(201,168,76,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] focus-visible:ring-offset-2"
        >
          Continue →
        </button>
      </div>
    </form>
  )
}
