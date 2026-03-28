import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

interface Step {
  label:       string
  shortLabel?: string
}

interface FormProgressProps {
  currentStep: number
  totalSteps:  number
  steps:       Step[]
  progressPct: number
}

export default function FormProgress({
  currentStep,
  totalSteps,
  steps,
  progressPct,
}: FormProgressProps) {
  return (
    <div
      role="progressbar"
      aria-valuenow={progressPct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Application progress: step ${currentStep} of ${totalSteps}`}
      className="w-full"
    >
      {/* Step counter text */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-[#0A1628]">
          Step{' '}
          <span className="text-[#C9A84C]">{currentStep}</span>
          {' '}of {totalSteps}
        </p>
        <p className="text-sm text-slate-500">
          {steps[currentStep - 1]?.label}
        </p>
      </div>

      {/* Linear progress bar */}
      <div className="relative h-2 bg-slate-200 rounded-full mb-5 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-[#C9A84C] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPct === 0 ? 8 : progressPct}%` }}
          aria-hidden="true"
        />
      </div>

      {/* Step dots — hidden on xs, shown sm+ */}
      <ol
        aria-label="Application steps"
        className="hidden sm:flex items-center"
      >
        {steps.map((s, idx) => {
          const stepNum    = idx + 1
          const isComplete = stepNum < currentStep
          const isCurrent  = stepNum === currentStep
          const isPending  = stepNum > currentStep

          return (
            <li
              key={s.label}
              aria-current={isCurrent ? 'step' : undefined}
              className={cn(
                'flex flex-col items-center relative',
                idx < steps.length - 1 ? 'flex-1' : '',
              )}
            >
              {/* Connecting line (before each step except first) */}
              {idx > 0 && (
                <div
                  aria-hidden="true"
                  className={cn(
                    'absolute top-3.5 right-1/2 w-full h-0.5 -translate-y-1/2',
                    isComplete ? 'bg-[#C9A84C]' : 'bg-slate-200',
                  )}
                  style={{ left: '-50%', right: '50%', width: '100%' }}
                />
              )}

              {/* Circle indicator */}
              <div
                aria-hidden="true"
                className={cn(
                  'relative z-10 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold',
                  'transition-all duration-300 border-2',
                  isComplete && 'bg-[#C9A84C] border-[#C9A84C] text-[#0A1628]',
                  isCurrent && 'bg-[#0A1628] border-[#C9A84C] text-[#C9A84C] ring-2 ring-[#C9A84C]/25',
                  isPending && 'bg-white border-slate-300 text-slate-400',
                )}
              >
                {isComplete ? (
                  <Check aria-hidden="true" size={14} strokeWidth={2.5} />
                ) : (
                  stepNum
                )}
              </div>

              {/* Label */}
              <span
                className={cn(
                  'mt-1.5 text-[10px] sm:text-xs font-medium text-center leading-tight',
                  isComplete && 'text-[#C9A84C]',
                  isCurrent && 'text-[#0A1628] font-semibold',
                  isPending && 'text-slate-400',
                )}
              >
                {s.shortLabel ?? s.label}
              </span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
