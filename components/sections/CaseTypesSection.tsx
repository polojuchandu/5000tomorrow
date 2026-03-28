import Link from 'next/link'
import {
  Car, Truck, Bike, User, Navigation, Zap,
  HardHat, AlertTriangle, Building2, Heart,
  Scale, Home, ArrowRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface CaseCard {
  slug:        string
  icon:        React.ElementType
  title:       string
  description: string
  isPrimary:   boolean
}

const CASE_TYPES: CaseCard[] = [
  // ── Primary (7) ──────────────────────────────────────────────────
  {
    slug:        'car-accident',
    icon:        Car,
    title:       'Car Accident',
    description: 'Injured in a Michigan car accident? Get up to $5,000 while your claim is pending.',
    isPrimary:   true,
  },
  {
    slug:        'truck-accident',
    icon:        Truck,
    title:       'Truck Accident',
    description: 'Commercial truck collisions often mean serious injuries and long settlements.',
    isPrimary:   true,
  },
  {
    slug:        'motorcycle-accident',
    icon:        Bike,
    title:       'Motorcycle Accident',
    description: 'Riders deserve fair compensation. We fund motorcycle injury cases statewide.',
    isPrimary:   true,
  },
  {
    slug:        'pedestrian-accident',
    icon:        User,
    title:       'Pedestrian Accident',
    description: 'Struck by a vehicle on foot? You have rights — and we can help you wait for justice.',
    isPrimary:   true,
  },
  {
    slug:        'rideshare-accident',
    icon:        Navigation,
    title:       'Rideshare (Uber / Lyft)',
    description: 'Accidents involving Uber or Lyft have complex insurance layers. We navigate them with you.',
    isPrimary:   true,
  },
  {
    slug:        'hit-and-run',
    icon:        Zap,
    title:       'Hit & Run',
    description: 'Uninsured motorist claims can take months. Don\'t wait on the at-fault driver to be found.',
    isPrimary:   true,
  },
  {
    slug:        'bicycle-accident',
    icon:        Bike,
    title:       'Bicycle Accident',
    description: 'Cyclists struck by vehicles often suffer severe injuries. We fund Michigan bicycle cases.',
    isPrimary:   true,
  },
  // ── Secondary (7) ────────────────────────────────────────────────
  {
    slug:        'workers-compensation',
    icon:        HardHat,
    title:       'Workers\' Comp',
    description: 'Injured on the job in Michigan? Pre-settlement funding bridges the gap while you recover.',
    isPrimary:   false,
  },
  {
    slug:        'slip-and-fall',
    icon:        AlertTriangle,
    title:       'Slip & Fall',
    description: 'Property owners are liable for unsafe conditions. Get funded while your case builds.',
    isPrimary:   false,
  },
  {
    slug:        'workplace-injury',
    icon:        Building2,
    title:       'Workplace Injury',
    description: 'Third-party workplace negligence claims may exceed workers\' comp alone.',
    isPrimary:   false,
  },
  {
    slug:        'wrongful-death',
    icon:        Heart,
    title:       'Wrongful Death',
    description: 'We work sensitively with families pursuing wrongful death claims in Michigan.',
    isPrimary:   false,
  },
  {
    slug:        'personal-injury',
    icon:        Scale,
    title:       'Personal Injury',
    description: 'General personal injury cases — dog bites, assaults, product liability, and more.',
    isPrimary:   false,
  },
  {
    slug:        'premises-liability',
    icon:        Home,
    title:       'Premises Liability',
    description: 'Injuries on someone else\'s property due to negligence qualify for pre-settlement funding.',
    isPrimary:   false,
  },
  {
    slug:        'workplace-injury',
    icon:        Building2,
    title:       'Workplace Negligence',
    description: 'Employer or co-worker negligence that causes injury may yield a significant settlement.',
    isPrimary:   false,
  },
]

interface CaseCardProps {
  card:       CaseCard
  index:      number
}

function CaseTypeCard({ card }: CaseCardProps) {
  const Icon = card.icon
  return (
    <article
      aria-label={`${card.title} pre-settlement funding`}
      className={cn(
        'group relative flex flex-col rounded-2xl border p-6 cursor-pointer',
        'transition-all duration-200 hover:-translate-y-0.5',
        'focus-within:ring-2 focus-within:ring-[#C9A84C]',
        card.isPrimary
          ? 'bg-[#0A1628] border-[#C9A84C]/20 hover:border-[#C9A84C]/50 shadow-lg'
          : 'bg-white border-slate-200 hover:border-[#C9A84C]/40 hover:shadow-md shadow-sm',
      )}
    >
      {/* Primary badge */}
      {card.isPrimary && (
        <div className="absolute top-4 right-4">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#C9A84C] border border-[#C9A84C]/30 rounded-full px-2 py-0.5">
            Common
          </span>
        </div>
      )}

      {/* Icon */}
      <div
        className={cn(
          'w-11 h-11 rounded-xl flex items-center justify-center mb-4 shrink-0',
          card.isPrimary
            ? 'bg-[#C9A84C]/15 group-hover:bg-[#C9A84C]/25'
            : 'bg-[#0A1628]/6 group-hover:bg-[#C9A84C]/10',
          'transition-colors duration-200',
        )}
      >
        <Icon
          aria-hidden="true"
          size={22}
          className={card.isPrimary ? 'text-[#C9A84C]' : 'text-[#0A1628]'}
          strokeWidth={1.75}
        />
      </div>

      {/* Copy */}
      <h3
        className={cn(
          'text-base font-bold mb-2',
          card.isPrimary ? 'text-white' : 'text-[#0A1628]',
        )}
      >
        {card.title}
      </h3>
      <p
        className={cn(
          'text-sm leading-relaxed flex-1',
          card.isPrimary ? 'text-slate-400' : 'text-slate-600',
        )}
      >
        {card.description}
      </p>

      {/* Learn more link */}
      <Link
        href={`/case-types/${card.slug}`}
        aria-label={`Learn about ${card.title} pre-settlement funding`}
        data-event="click"
        data-event-label={`case_card_${card.slug}`}
        data-event-category="case_type"
        className={cn(
          'mt-4 inline-flex items-center gap-1 text-xs font-semibold',
          'transition-colors duration-150 focus-visible:outline-none rounded',
          card.isPrimary
            ? 'text-[#C9A84C] hover:text-[#e0c068]'
            : 'text-[#0A1628] hover:text-[#1E3D6B]',
        )}
      >
        Apply for this case
        <ArrowRight aria-hidden="true" size={13} />
      </Link>
    </article>
  )
}

export default function CaseTypesSection() {
  const primary   = CASE_TYPES.filter((c) => c.isPrimary)
  const secondary = CASE_TYPES.filter((c) => !c.isPrimary)

  return (
    <section
      id="case-types"
      aria-labelledby="case-types-heading"
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-2">
            Cases We Fund
          </p>
          <h2
            id="case-types-heading"
            className="text-3xl sm:text-4xl font-bold text-[#0A1628] mb-4"
          >
            Michigan Cases We Support
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            If you have an active personal injury case and a licensed Michigan attorney,
            you may qualify for up to $5,000 in pre-settlement funding.
          </p>
        </div>

        {/* Primary cases */}
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
            Most Common Cases
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {primary.map((card, i) => (
              <CaseTypeCard key={card.slug + '-primary-' + i} card={card} index={i} />
            ))}
          </div>
        </div>

        {/* Secondary cases */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4 mt-8">
            Other Qualifying Cases
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {secondary.map((card, i) => (
              <CaseTypeCard key={card.slug + '-secondary-' + i} card={card} index={i} />
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <p className="mt-10 text-center text-xs text-slate-400">
          Don't see your case type?{' '}
          <Link
            href="/contact"
            data-event="click"
            data-event-label="case_types_contact_us"
            data-event-category="navigation"
            className="underline underline-offset-2 hover:text-slate-600 transition-colors"
          >
            Contact us
          </Link>
          {' '}— we evaluate every situation individually.
          Pre-settlement funding requires an active case and licensed Michigan attorney.
        </p>
      </div>
    </section>
  )
}
