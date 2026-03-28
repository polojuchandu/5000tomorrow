'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion, type PanInfo } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Testimonial {
  id:        number
  quote:     string
  author:    string
  city:      string
  caseType:  string
  rating:    number
  initials:  string
  avatarBg:  string
}

const TESTIMONIALS: Testimonial[] = [
  {
    id:        1,
    quote:     'After my car accident on I-94, I couldn\'t pay rent while waiting for the insurance company to settle. 5000 Tomorrow had money in my account within 24 hours. My attorney handled everything — I just filled out the form.',
    author:    'Marcus D.',
    city:      'Detroit',
    caseType:  'Car Accident',
    rating:    5,
    initials:  'MD',
    avatarBg:  'from-[#1E3D6B] to-[#0A1628]',
  },
  {
    id:        2,
    quote:     'I was hurt on the job and couldn\'t work for three months. I was skeptical about this kind of funding — but it\'s truly not a loan. I paid nothing back until my workers\' comp case settled. Saved my family from a lot of stress.',
    author:    'Sandra K.',
    city:      'Grand Rapids',
    caseType:  'Workers\' Compensation',
    rating:    5,
    initials:  'SK',
    avatarBg:  'from-[#2D5016] to-[#1a3009]',
  },
  {
    id:        3,
    quote:     'Our Lyft driver ran a red light and injured both me and my daughter. The legal process took over a year. 5000 Tomorrow helped us cover medical bills and groceries without touching our savings.',
    author:    'James R.',
    city:      'Lansing',
    caseType:  'Rideshare Accident',
    rating:    5,
    initials:  'JR',
    avatarBg:  'from-[#4A1942] to-[#2e1028]',
  },
  {
    id:        4,
    quote:     'I slipped on ice outside a grocery store and was out of work for 8 weeks. The store\'s insurance kept delaying. This funding let me keep the lights on. 100% recommend if you\'re stuck waiting.',
    author:    'Tanya M.',
    city:      'Ann Arbor',
    caseType:  'Slip & Fall',
    rating:    5,
    initials:  'TM',
    avatarBg:  'from-[#1A3D4A] to-[#0d2530]',
  },
]

const SWIPE_CONFIDENCE = 8000

function swipePower(offset: number, velocity: number) {
  return Math.abs(offset) * velocity
}

const AUTOPLAY_INTERVAL = 6000

export default function TestimonialsSection() {
  const prefersReducedMotion = useReducedMotion()
  const [[activeIndex, direction], setSlide] = useState<[number, number]>([0, 0])
  const [isPaused, setIsPaused]              = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const paginate = useCallback((dir: number) => {
    setSlide(([prev]) => {
      const next = (prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length
      return [next, dir]
    })
  }, [])

  // Auto-play
  useEffect(() => {
    if (isPaused || prefersReducedMotion) return
    timerRef.current = setInterval(() => paginate(1), AUTOPLAY_INTERVAL)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [isPaused, prefersReducedMotion, paginate])

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (swipePower(info.offset.x, info.velocity.x) > SWIPE_CONFIDENCE) {
      paginate(info.offset.x < 0 ? 1 : -1)
    }
  }

  const variants = prefersReducedMotion
    ? {
        enter:  { opacity: 0 },
        center: { opacity: 1 },
        exit:   { opacity: 0 },
      }
    : {
        enter:  (d: number) => ({ x: d > 0 ? 64 : -64, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit:   (d: number) => ({ x: d < 0 ? 64 : -64, opacity: 0 }),
      }

  const active = TESTIMONIALS[activeIndex]

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="bg-slate-50 py-16 sm:py-20 lg:py-24"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-2">
            Client Stories
          </p>
          <h2
            id="testimonials-heading"
            className="text-3xl sm:text-4xl font-bold text-[#0A1628]"
          >
            Michigan Families We've Helped
          </h2>
        </div>

        {/* Carousel */}
        <div
          className="relative max-w-3xl mx-auto"
          role="region"
          aria-label="Client testimonials carousel"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={active.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragEnd={handleDragEnd}
                className="bg-white rounded-2xl shadow-[0_4px_32px_rgba(10,22,40,0.1)] p-8 sm:p-10 cursor-grab active:cursor-grabbing select-none"
                aria-label={`Testimonial from ${active.author} in ${active.city}`}
              >
                {/* Quote icon */}
                <Quote
                  aria-hidden="true"
                  size={36}
                  className="text-[#C9A84C]/20 mb-4"
                  strokeWidth={1}
                />

                {/* Stars */}
                <div
                  className="flex gap-0.5 mb-4"
                  aria-label={`Rated ${active.rating} out of 5 stars`}
                >
                  {Array.from({ length: active.rating }).map((_, i) => (
                    <Star
                      key={i}
                      aria-hidden="true"
                      size={18}
                      className="fill-[#C9A84C] text-[#C9A84C]"
                    />
                  ))}
                </div>

                {/* Quote text */}
                <blockquote>
                  <p className="text-slate-700 text-base sm:text-lg leading-relaxed italic mb-6">
                    "{active.quote}"
                  </p>

                  {/* Author */}
                  <footer className="flex items-center gap-4">
                    <div
                      aria-hidden="true"
                      className={cn(
                        'w-12 h-12 rounded-full bg-gradient-to-br shrink-0',
                        'flex items-center justify-center text-white text-sm font-bold',
                        active.avatarBg,
                      )}
                    >
                      {active.initials}
                    </div>
                    <div>
                      <cite className="not-italic font-bold text-[#0A1628]">
                        {active.author}
                      </cite>
                      <p className="text-sm text-slate-500">
                        {active.city}, MI · {active.caseType}
                      </p>
                    </div>
                  </footer>
                </blockquote>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Prev / Next controls */}
          <div className="flex items-center justify-between mt-6">
            {/* Dot indicators */}
            <div
              role="tablist"
              aria-label="Testimonial navigation"
              className="flex items-center gap-2"
            >
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={i === activeIndex}
                  aria-label={`Go to testimonial ${i + 1} of ${TESTIMONIALS.length}`}
                  onClick={() => setSlide([i, i > activeIndex ? 1 : -1])}
                  data-event="click"
                  data-event-label={`testimonial_dot_${i + 1}`}
                  data-event-category="engagement"
                  className={cn(
                    'rounded-full transition-all duration-200 cursor-pointer',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]',
                    i === activeIndex
                      ? 'w-6 h-2.5 bg-[#C9A84C]'
                      : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400',
                  )}
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => paginate(-1)}
                aria-label="Previous testimonial"
                data-event="click"
                data-event-label="testimonial_prev"
                data-event-category="engagement"
                className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center cursor-pointer hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
              >
                <ChevronLeft aria-hidden="true" size={18} />
              </button>
              <button
                type="button"
                onClick={() => paginate(1)}
                aria-label="Next testimonial"
                data-event="click"
                data-event-label="testimonial_next"
                data-event-category="engagement"
                className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center cursor-pointer hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
              >
                <ChevronRight aria-hidden="true" size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-8 text-center text-xs text-slate-400">
          Testimonials represent individual experiences. Results vary by case.
          Pre-settlement funding requires an active case with a licensed Michigan attorney.
        </p>
      </div>
    </section>
  )
}
