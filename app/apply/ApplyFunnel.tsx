'use client'

import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion'
import { useApplyForm } from '@/hooks/useApplyForm'
import FormProgress     from '@/components/forms/FormProgress'
import Step1CaseType    from '@/components/forms/steps/Step1CaseType'
import Step2InjuryDetails from '@/components/forms/steps/Step2InjuryDetails'
import Step3AttorneyInfo  from '@/components/forms/steps/Step3AttorneyInfo'
import Step4ContactInfo   from '@/components/forms/steps/Step4ContactInfo'
import Step5Review        from '@/components/forms/steps/Step5Review'
import type { Step1Data, Step2Data, Step3Data, Step4Data, Step5Data } from '@/lib/validations/apply'
import type { AnyStepData } from '@/hooks/useApplyForm'
import { RotateCcw } from 'lucide-react'

// ─── Step metadata ─────────────────────────────────────────────────────────────

const STEP_META = [
  { label: 'Case Type',        shortLabel: 'Case'     },
  { label: 'Injury Details',   shortLabel: 'Injuries' },
  { label: 'Attorney Info',    shortLabel: 'Attorney' },
  { label: 'Contact Details',  shortLabel: 'Contact'  },
  { label: 'Review & Submit',  shortLabel: 'Review'   },
]

// ─── Component ────────────────────────────────────────────────────────────────

export default function ApplyFunnel() {
  const prefersReducedMotion = useReducedMotion()

  const {
    step,
    totalSteps,
    progressPct,
    formData,
    isSubmitting,
    submitError,
    hasDraft,
    nextStep,
    prevStep,
    jumpToStep,
    submitForm,
    clearDraft,
  } = useApplyForm()

  // Slide animation (direction-aware, skip if reduced motion)
  const slideVariants: Variants = prefersReducedMotion
    ? {
        enter:  { opacity: 0 },
        center: { opacity: 1, transition: { duration: 0.2 } },
        exit:   { opacity: 0, transition: { duration: 0.15 } },
      }
    : {
        enter:  { opacity: 0, x: 32 },
        center: { opacity: 1, x: 0,  transition: { duration: 0.3 } },
        exit:   { opacity: 0, x: -24, transition: { duration: 0.2 } },
      }

  return (
    <div className="min-h-screen bg-slate-50 pb-32 lg:pb-16">

      {/* ── Page header ──────────────────────────────────────────── */}
      <div className="bg-[#0A1628] py-6 sm:py-8">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-widest mb-1">
            Michigan Pre-Settlement Funding
          </p>
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            Apply for Up to $5,000
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Free to apply · No credit check · Requires active case &amp; attorney
          </p>
        </div>
      </div>

      {/* ── Progress bar ─────────────────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 py-4">
          <FormProgress
            currentStep={step}
            totalSteps={totalSteps}
            steps={STEP_META}
            progressPct={progressPct}
          />
        </div>
      </div>

      {/* ── Saved draft banner ────────────────────────────────────── */}
      {hasDraft && step > 1 && (
        <div className="mx-auto max-w-2xl px-4 sm:px-6 pt-4">
          <div
            role="status"
            aria-live="polite"
            className="flex items-center justify-between rounded-xl border border-[#C9A84C]/30 bg-[#C9A84C]/8 px-4 py-3"
          >
            <p className="text-sm text-[#0A1628]">
              <span className="font-semibold">Draft restored.</span>
              {' '}Your progress has been saved.
            </p>
            <button
              type="button"
              onClick={clearDraft}
              aria-label="Clear saved draft and start over"
              data-event="click"
              data-event-label="apply_clear_draft"
              data-event-category="apply_funnel"
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-red-600 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-400 rounded"
            >
              <RotateCcw aria-hidden="true" size={13} />
              Start over
            </button>
          </div>
        </div>
      )}

      {/* ── Step card ────────────────────────────────────────────── */}
      <div className="mx-auto max-w-2xl px-4 sm:px-6 pt-6">
        <div className="bg-white rounded-2xl shadow-[0_4px_32px_rgba(10,22,40,0.08)] border border-slate-100 p-6 sm:p-8 overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {step === 1 && (
                <Step1CaseType
                  formData={formData}
                  onNext={(data: Step1Data) => nextStep(data as AnyStepData)}
                />
              )}
              {step === 2 && (
                <Step2InjuryDetails
                  formData={formData}
                  onNext={(data: Step2Data) => nextStep(data as AnyStepData)}
                  onPrev={prevStep}
                />
              )}
              {step === 3 && (
                <Step3AttorneyInfo
                  formData={formData}
                  onNext={(data: Step3Data) => nextStep(data as AnyStepData)}
                  onPrev={prevStep}
                />
              )}
              {step === 4 && (
                <Step4ContactInfo
                  formData={formData}
                  onNext={(data: Step4Data) => nextStep(data as AnyStepData)}
                  onPrev={prevStep}
                />
              )}
              {step === 5 && (
                <Step5Review
                  formData={formData}
                  onSubmit={(data: Partial<Step5Data>) => submitForm(data)}
                  onPrev={prevStep}
                  onJumpToStep={jumpToStep}
                  isSubmitting={isSubmitting}
                  submitError={submitError}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Trust signals below form */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {[
            '🔒 256-bit SSL',
            'No credit check',
            'No upfront fees',
            'Michigan residents only',
          ].map((signal) => (
            <span key={signal} className="text-xs text-slate-400">
              {signal}
            </span>
          ))}
        </div>

        <p className="mt-3 text-center text-[11px] text-slate-400 leading-snug max-w-lg mx-auto">
          Pre-settlement funding is not a loan. Repayment required only upon successful
          settlement. Amount subject to case evaluation. Michigan attorney required.
        </p>
      </div>
    </div>
  )
}
