'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { Pencil, CheckCircle, Loader2, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { step5Schema, CASE_TYPE_OPTIONS, type Step5Data } from '@/lib/validations/apply'
import type { ApplyDraft } from '@/hooks/useApplyForm'

interface Step5Props {
  formData:     ApplyDraft
  onSubmit:     (data: Partial<Step5Data>) => Promise<void>
  onPrev:       () => void
  onJumpToStep: (step: number) => void
  isSubmitting: boolean
  submitError:  string | null
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p role="alert" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
      <span aria-hidden="true">⚠</span> {message}
    </p>
  )
}

interface ReviewCardProps {
  title:    string
  step:     number
  onEdit:   (step: number) => void
  children: React.ReactNode
}

function ReviewCard({ title, step, onEdit, children }: ReviewCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50 border-b border-slate-200">
        <h3 className="text-sm font-semibold text-[#0A1628]">{title}</h3>
        <button
          type="button"
          onClick={() => onEdit(step)}
          data-event="click"
          data-event-label={`apply_step5_edit_step${step}`}
          data-event-category="apply_funnel"
          aria-label={`Edit ${title}`}
          className="inline-flex items-center gap-1 text-xs font-medium text-[#C9A84C] hover:text-[#b8973d] cursor-pointer transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A84C] rounded"
        >
          <Pencil aria-hidden="true" size={12} />
          Edit
        </button>
      </div>
      <div className="px-5 py-4 space-y-2">
        {children}
      </div>
    </div>
  )
}

function ReviewRow({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null
  return (
    <div className="flex items-start gap-3">
      <span className="text-xs text-slate-400 w-28 shrink-0 pt-0.5">{label}</span>
      <span className="text-sm text-slate-800 font-medium">{value}</span>
    </div>
  )
}

export default function Step5Review({
  formData,
  onSubmit,
  onPrev,
  onJumpToStep,
  isSubmitting,
  submitError,
}: Step5Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Step5Data>({
    resolver:      zodResolver(step5Schema),
    defaultValues: { agreeToTerms: undefined },
  })

  const caseTypeLabel =
    CASE_TYPE_OPTIONS.find((o) => o.value === formData.caseType)?.label ?? formData.caseType ?? '—'

  const formatDate = (d?: string) => {
    if (!d) return '—'
    return new Date(d + 'T00:00:00').toLocaleDateString('en-US', {
      month: 'long',
      day:   'numeric',
      year:  'numeric',
    })
  }

  const formatAddress = () => {
    const parts = [
      formData.streetAddress,
      formData.city,
      formData.state ? `${formData.state} ${formData.zipCode ?? ''}` : formData.zipCode,
    ].filter(Boolean)
    return parts.join(', ') || '—'
  }

  return (
    <form
      id="step-5-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Step 5: Review and submit your application"
    >
      <h2 className="text-2xl font-bold text-[#0A1628] mb-1">
        Review Your Application
      </h2>
      <p className="text-slate-500 text-sm mb-6">
        Please confirm everything looks correct before submitting.
      </p>

      {/* Review cards */}
      <div className="space-y-3 mb-6">

        {/* Case info */}
        <ReviewCard title="Case Information" step={1} onEdit={onJumpToStep}>
          <ReviewRow label="Case Type"     value={caseTypeLabel} />
          <ReviewRow label="Incident Date" value={formatDate(formData.incidentDate)} />
          <ReviewRow
            label="Lawsuit Filed"
            value={formData.hasActiveLawsuit === true
              ? 'Yes'
              : formData.hasActiveLawsuit === false
              ? 'Not yet'
              : undefined}
          />
        </ReviewCard>

        {/* Injury details */}
        <ReviewCard title="Injury Details" step={2} onEdit={onJumpToStep}>
          <ReviewRow label="What happened" value={formData.incidentDescription} />
          <ReviewRow label="Injuries"      value={formData.injuryDescription}   />
          <ReviewRow
            label="Hospitalized"
            value={formData.hospitalized === true ? 'Yes' : 'No'}
          />
          <ReviewRow
            label="Ongoing care"
            value={formData.treatmentOngoing === true ? 'Yes' : 'No'}
          />
        </ReviewCard>

        {/* Attorney info */}
        <ReviewCard title="Attorney Information" step={3} onEdit={onJumpToStep}>
          <ReviewRow
            label="Attorney"
            value={[formData.attorneyFirstName, formData.attorneyLastName].filter(Boolean).join(' ') || undefined}
          />
          <ReviewRow label="Firm"  value={formData.attorneyFirm}  />
          <ReviewRow label="Phone" value={formData.attorneyPhone} />
          <ReviewRow label="Email" value={formData.attorneyEmail} />
        </ReviewCard>

        {/* Contact info */}
        <ReviewCard title="Your Contact Details" step={4} onEdit={onJumpToStep}>
          <ReviewRow
            label="Name"
            value={[formData.firstName, formData.lastName].filter(Boolean).join(' ') || undefined}
          />
          <ReviewRow label="Email"   value={formData.email}  />
          <ReviewRow label="Phone"   value={formData.phone}  />
          <ReviewRow label="Address" value={formatAddress()} />
          <ReviewRow label="Urgency" value={formData.urgency} />
        </ReviewCard>
      </div>

      {/* Terms checkbox */}
      <Controller
        name="agreeToTerms"
        control={control}
        render={({ field }) => (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 mb-4">
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative mt-0.5 shrink-0">
                <input
                  type="checkbox"
                  checked={field.value === true}
                  onChange={(e) => field.onChange(e.target.checked || undefined)}
                  onBlur={field.onBlur}
                  aria-required="true"
                  aria-describedby="terms-desc"
                  aria-invalid={!!errors.agreeToTerms}
                  className="sr-only"
                />
                <div
                  aria-hidden="true"
                  className={cn(
                    'w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors duration-150',
                    field.value === true
                      ? 'bg-[#C9A84C] border-[#C9A84C]'
                      : errors.agreeToTerms
                      ? 'border-red-400 bg-red-50'
                      : 'border-slate-300 group-hover:border-slate-400',
                  )}
                >
                  {field.value === true && (
                    <svg aria-hidden="true" viewBox="0 0 12 12" className="w-3 h-3 text-[#0A1628]" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
              <p id="terms-desc" className="text-sm text-slate-700 leading-relaxed">
                I confirm the information above is accurate and I agree to the{' '}
                <Link href="/terms-of-service" target="_blank" className="underline underline-offset-2 text-[#0A1628] hover:text-[#C9A84C] transition-colors">
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link href="/privacy-policy" target="_blank" className="underline underline-offset-2 text-[#0A1628] hover:text-[#C9A84C] transition-colors">
                  Privacy Policy
                </Link>
                . I understand this is a request for pre-settlement funding (not a loan) and
                repayment is only required if my case wins or settles.
              </p>
            </label>
            <FieldError message={errors.agreeToTerms?.message} />
          </div>
        )}
      />

      {/* Legal disclaimer */}
      <p className="text-[11px] text-slate-400 leading-relaxed mb-6">
        By submitting this application you authorize 5000 Tomorrow to contact you via phone,
        email, and SMS regarding your funding request. Standard rates apply. Pre-settlement
        funding is not a loan. Repayment is non-recourse — required only upon successful
        case settlement. Michigan residents only. Amount subject to case evaluation.
        Requires licensed Michigan attorney.
      </p>

      {/* Server error */}
      {submitError && (
        <div
          role="alert"
          aria-live="assertive"
          className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 mb-4"
        >
          <AlertCircle aria-hidden="true" size={18} className="text-red-500 shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{submitError}</p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onPrev}
          disabled={isSubmitting}
          data-event="click"
          data-event-label="apply_step5_back"
          data-event-category="apply_funnel"
          aria-label="Go back to contact information"
          className="h-14 px-6 rounded-xl border-2 border-slate-300 text-slate-600 font-semibold text-sm cursor-pointer hover:border-slate-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
        >
          ← Back
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          data-event="click"
          data-event-label="apply_step5_submit"
          data-event-category="conversion"
          aria-label={isSubmitting ? 'Submitting your application…' : 'Submit your application'}
          className={cn(
            'flex-1 h-14 rounded-xl font-bold text-base transition-all duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] focus-visible:ring-offset-2',
            isSubmitting
              ? 'bg-[#C9A84C]/70 text-[#0A1628] cursor-not-allowed'
              : 'bg-[#C9A84C] hover:bg-[#b8973d] text-[#0A1628] cursor-pointer shadow-[0_4px_24px_rgba(201,168,76,0.40)] hover:shadow-[0_6px_32px_rgba(201,168,76,0.55)]',
          )}
        >
          {isSubmitting ? (
            <span className="inline-flex items-center justify-center gap-2">
              <Loader2 aria-hidden="true" size={18} className="animate-spin" />
              Submitting…
            </span>
          ) : (
            <span className="inline-flex items-center justify-center gap-2">
              <CheckCircle aria-hidden="true" size={18} />
              Submit Application
            </span>
          )}
        </button>
      </div>
    </form>
  )
}
