'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, Phone, Scale } from 'lucide-react'
import { cn } from '@/lib/utils'
import { step3Schema, type Step3Data } from '@/lib/validations/apply'
import type { ApplyDraft } from '@/hooks/useApplyForm'

interface Step3Props {
  formData: ApplyDraft
  onNext:   (data: Step3Data) => void
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

function formatPhone(raw: string): string {
  const d = raw.replace(/\D/g, '').slice(0, 10)
  if (d.length <= 3)  return d
  if (d.length <= 6)  return `(${d.slice(0, 3)}) ${d.slice(3)}`
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
}

function InputField({
  id, label, required, error, hint, type = 'text', placeholder, registration, className,
}: {
  id:           string
  label:        string
  required?:    boolean
  error?:       string
  hint?:        string
  type?:        string
  placeholder?: string
  registration: ReturnType<ReturnType<typeof useForm>['register']>
  className?:   string
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-semibold text-slate-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>}
        {!required && <span className="ml-1 text-xs font-normal text-slate-400">(optional)</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        aria-required={required}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        aria-invalid={!!error}
        {...registration}
        className={cn(
          'w-full h-14 rounded-xl border px-4 text-sm text-slate-800 bg-white',
          'focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent',
          'transition-colors duration-150 placeholder:text-slate-400',
          error ? 'border-red-400 bg-red-50' : 'border-slate-300',
        )}
      />
      {error ? (
        <FieldError message={error} />
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1 text-xs text-slate-400">{hint}</p>
      ) : null}
    </div>
  )
}

export default function Step3AttorneyInfo({ formData, onNext, onPrev }: Step3Props) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Step3Data>({
    resolver:      zodResolver(step3Schema),
    defaultValues: {
      hasAttorney:       formData.hasAttorney        ?? undefined,
      attorneyFirstName: formData.attorneyFirstName  ?? '',
      attorneyLastName:  formData.attorneyLastName   ?? '',
      attorneyFirm:      formData.attorneyFirm       ?? '',
      attorneyPhone:     formData.attorneyPhone      ?? '',
      attorneyEmail:     formData.attorneyEmail      ?? '',
    },
  })

  const hasAttorney = watch('hasAttorney')
  const showNoAttorneyBlock = hasAttorney === false

  return (
    <form
      id="step-3-form"
      onSubmit={handleSubmit(onNext)}
      noValidate
      aria-label="Step 3: Attorney information"
    >
      <h2 className="text-2xl font-bold text-[#0A1628] mb-1">
        Attorney Information
      </h2>
      <p className="text-slate-500 text-sm mb-6">
        A licensed Michigan attorney is required to qualify for pre-settlement funding.
      </p>

      {/* Has attorney toggle */}
      <Controller
        name="hasAttorney"
        control={control}
        render={({ field }) => (
          <fieldset className="mb-6">
            <legend className="text-sm font-semibold text-slate-700 mb-2">
              Do you currently have a Michigan attorney?
              <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>
            </legend>
            <div className="flex gap-3">
              {[
                { value: true,  label: 'Yes, I have an attorney' },
                { value: false, label: 'No, I don\'t yet' },
              ].map((opt) => (
                <label
                  key={String(opt.value)}
                  className={cn(
                    'flex-1 flex items-center justify-center h-14 rounded-xl border-2 cursor-pointer',
                    'text-sm font-medium transition-all duration-150',
                    field.value === opt.value
                      ? opt.value
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                        : 'border-red-400 bg-red-50 text-red-700'
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
            {errors.hasAttorney && (
              <div
                role="alert"
                className="mt-3 rounded-xl border border-red-200 bg-red-50 p-4 flex gap-3"
              >
                <AlertCircle aria-hidden="true" size={18} className="text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{errors.hasAttorney.message}</p>
              </div>
            )}
          </fieldset>
        )}
      />

      {/* No-attorney blocking message */}
      {showNoAttorneyBlock && (
        <div
          role="status"
          aria-live="polite"
          className="rounded-2xl border border-amber-200 bg-amber-50 p-5 mb-6"
        >
          <div className="flex gap-3">
            <Scale aria-hidden="true" size={20} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-800 mb-1">
                You need a Michigan attorney to qualify
              </p>
              <p className="text-sm text-amber-700 leading-relaxed mb-3">
                Pre-settlement funding requires an active case represented by a licensed Michigan
                attorney. If you don't have one yet, we recommend consulting with a personal
                injury attorney first.
              </p>
              <a
                href="/contact"
                className="text-sm font-semibold text-amber-800 underline underline-offset-2 hover:text-amber-900"
                data-event="click"
                data-event-label="apply_step3_find_attorney"
                data-event-category="apply_funnel"
              >
                Contact us for a referral →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Attorney fields — only when hasAttorney === true */}
      {hasAttorney === true && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid sm:grid-cols-2 gap-4">
            <InputField
              id="atty-first"
              label="Attorney First Name"
              required
              placeholder="Jane"
              error={errors.attorneyFirstName?.message}
              registration={register('attorneyFirstName')}
            />
            <InputField
              id="atty-last"
              label="Attorney Last Name"
              required
              placeholder="Smith"
              error={errors.attorneyLastName?.message}
              registration={register('attorneyLastName')}
            />
          </div>

          <InputField
            id="atty-firm"
            label="Law Firm Name"
            required
            placeholder="Smith & Associates Law Firm"
            error={errors.attorneyFirm?.message}
            registration={register('attorneyFirm')}
          />

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Attorney phone — formatted controller */}
            <div>
              <label htmlFor="atty-phone" className="block text-sm font-semibold text-slate-700 mb-1.5">
                Attorney Phone
                <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>
              </label>
              <div className="relative">
                <Phone
                  aria-hidden="true"
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <Controller
                  name="attorneyPhone"
                  control={control}
                  render={({ field }) => (
                    <input
                      id="atty-phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="(555) 000-0000"
                      value={field.value ?? ''}
                      onChange={(e) => field.onChange(formatPhone(e.target.value))}
                      onBlur={field.onBlur}
                      aria-required="true"
                      aria-invalid={!!errors.attorneyPhone}
                      className={cn(
                        'w-full h-14 rounded-xl border pl-10 pr-4 text-sm text-slate-800 bg-white',
                        'focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent',
                        'transition-colors duration-150 placeholder:text-slate-400',
                        errors.attorneyPhone ? 'border-red-400 bg-red-50' : 'border-slate-300',
                      )}
                    />
                  )}
                />
              </div>
              <FieldError message={errors.attorneyPhone?.message} />
            </div>

            <InputField
              id="atty-email"
              label="Attorney Email"
              type="email"
              placeholder="jane@smithlaw.com"
              hint="Optional but speeds up our review"
              error={errors.attorneyEmail?.message}
              registration={register('attorneyEmail')}
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8 flex gap-3">
        <button
          type="button"
          onClick={onPrev}
          data-event="click"
          data-event-label="apply_step3_back"
          data-event-category="apply_funnel"
          aria-label="Go back to injury details"
          className="h-14 px-6 rounded-xl border-2 border-slate-300 text-slate-600 font-semibold text-sm cursor-pointer hover:border-slate-400 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
        >
          ← Back
        </button>
        <button
          type="submit"
          disabled={showNoAttorneyBlock}
          data-event="click"
          data-event-label="apply_step3_next"
          data-event-category="apply_funnel"
          aria-label="Continue to contact information"
          className={cn(
            'flex-1 h-14 rounded-xl font-bold text-base cursor-pointer',
            'transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] focus-visible:ring-offset-2',
            showNoAttorneyBlock
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-[#C9A84C] hover:bg-[#b8973d] text-[#0A1628] shadow-[0_4px_20px_rgba(201,168,76,0.35)]',
          )}
        >
          Continue →
        </button>
      </div>
    </form>
  )
}
