'use client'

import Link from 'next/link'
import { ArrowRight, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ApplyButtonProps {
  /** href to navigate to — defaults to /apply */
  href?: string
  /** button label */
  label?: string
  /** visual variant */
  variant?: 'gold' | 'white' | 'outline-white' | 'navy'
  size?: 'sm' | 'md' | 'lg'
  /** analytics event label injected as data-event-label */
  eventLabel: string
  className?: string
  showArrow?: boolean
  loading?: boolean
  /** render as button (no navigation) */
  asButton?: boolean
  onClick?: () => void
}

const variantStyles: Record<NonNullable<ApplyButtonProps['variant']>, string> = {
  gold:          'bg-[#C9A84C] hover:bg-[#b8973d] text-[#0A1628] font-semibold shadow-[0_4px_24px_rgba(201,168,76,0.35)] hover:shadow-[0_6px_32px_rgba(201,168,76,0.50)]',
  white:         'bg-white hover:bg-slate-50 text-[#0A1628] font-semibold shadow-md hover:shadow-lg',
  'outline-white': 'border-2 border-white text-white hover:bg-white/10 font-semibold',
  navy:          'bg-[#0A1628] hover:bg-[#1E3D6B] text-white font-semibold shadow-md hover:shadow-lg',
}

const sizeStyles: Record<NonNullable<ApplyButtonProps['size']>, string> = {
  sm: 'h-10 px-4 text-sm gap-1.5',
  md: 'h-12 px-6 text-base gap-2',
  lg: 'h-14 px-8 text-lg gap-2',
}

export default function ApplyButton({
  href = '/apply',
  label = 'Apply Now',
  variant = 'gold',
  size = 'md',
  eventLabel,
  className,
  showArrow = true,
  loading = false,
  asButton = false,
  onClick,
}: ApplyButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center rounded-xl cursor-pointer',
    'transition-all duration-200 focus-visible:outline-none focus-visible:ring-2',
    'focus-visible:ring-[#C9A84C] focus-visible:ring-offset-2',
    'min-w-[44px] min-h-[44px]',         // WCAG touch target
    variantStyles[variant],
    sizeStyles[size],
    loading && 'opacity-70 pointer-events-none',
    className,
  )

  const content = (
    <>
      {loading
        ? <Loader2 className="animate-spin" aria-hidden="true" size={18} />
        : label}
      {showArrow && !loading && (
        <ArrowRight aria-hidden="true" size={size === 'lg' ? 20 : 16} />
      )}
    </>
  )

  if (asButton) {
    return (
      <button
        type="button"
        className={classes}
        onClick={onClick}
        disabled={loading}
        data-event="click"
        data-event-label={eventLabel}
        data-event-category="cta"
        aria-label={label}
      >
        {content}
      </button>
    )
  }

  return (
    <Link
      href={href}
      className={classes}
      data-event="click"
      data-event-label={eventLabel}
      data-event-category="cta"
      aria-label={label}
    >
      {content}
    </Link>
  )
}
