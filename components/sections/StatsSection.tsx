'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView, useReducedMotion, animate } from 'framer-motion'

interface Stat {
  value:       number
  prefix?:     string
  suffix:      string
  label:       string
  description: string
  decimals?:   number
}

const STATS: Stat[] = [
  {
    value:       500,
    suffix:      '+',
    label:       'Cases Funded',
    description: 'Michigan families helped since launch',
  },
  {
    value:       5000,
    prefix:      '$',
    suffix:      '',
    label:       'Max Advance',
    description: 'Up to $5,000 per approved applicant',
  },
  {
    value:       24,
    suffix:      'hrs',
    label:       'Average Approval',
    description: 'From application to funded, often same day',
  },
  {
    value:       99,
    suffix:      '%',
    label:       'Satisfaction Rate',
    description: 'Based on client surveys post-funding',
  },
]

interface AnimatedCounterProps {
  value:      number
  prefix?:    string
  suffix:     string
  decimals?:  number
  inView:     boolean
}

function AnimatedCounter({ value, prefix = '', suffix, decimals = 0, inView }: AnimatedCounterProps) {
  const [display, setDisplay] = useState(0)
  const prefersReducedMotion  = useReducedMotion()

  useEffect(() => {
    if (!inView) return

    if (prefersReducedMotion) {
      setDisplay(value)
      return
    }

    const duration = value > 1000 ? 2.2 : 1.8
    const controls = animate(0, value, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(parseFloat(v.toFixed(decimals))),
    })
    return () => controls.stop()
  }, [inView, value, prefersReducedMotion, decimals])

  const formatted = display.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span aria-label={`${prefix}${value.toLocaleString()}${suffix}`}>
      {prefix}{formatted}{suffix}
    </span>
  )
}

interface StatCardProps {
  stat:   Stat
  inView: boolean
  index:  number
}

function StatCard({ stat, inView, index }: StatCardProps) {
  return (
    <div
      className="flex flex-col items-center text-center px-6 py-8 rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div
        className="text-4xl sm:text-5xl font-extrabold text-[#C9A84C] tabular-nums leading-none mb-2"
        aria-live="polite"
      >
        <AnimatedCounter
          value={stat.value}
          prefix={stat.prefix}
          suffix={stat.suffix}
          decimals={stat.decimals}
          inView={inView}
        />
      </div>
      <p className="text-base sm:text-lg font-semibold text-white mb-1">
        {stat.label}
      </p>
      <p className="text-xs sm:text-sm text-slate-400 leading-snug max-w-[160px]">
        {stat.description}
      </p>
    </div>
  )
}

export default function StatsSection() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      aria-labelledby="stats-heading"
      className="bg-[#0A1628] py-16 sm:py-20 lg:py-24 relative overflow-hidden"
    >
      {/* Subtle radial gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 100%, #1E3D6B, transparent)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-2">
            By the Numbers
          </p>
          <h2
            id="stats-heading"
            className="text-3xl sm:text-4xl font-bold text-white"
          >
            Real Results for Real Michiganders
          </h2>
        </div>

        <dl
          aria-label="Key statistics"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {STATS.map((stat, i) => (
            <div key={stat.label} role="group" aria-label={stat.label}>
              <StatCard stat={stat} inView={inView} index={i} />
            </div>
          ))}
        </dl>

        <p className="mt-8 text-center text-[11px] text-slate-500">
          Statistics based on internal data. Pre-settlement funding is not a loan.
          Repayment required only upon successful settlement. Michigan residents only.
        </p>
      </div>
    </section>
  )
}
