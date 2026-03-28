import Link from 'next/link'
import { MapPin, ArrowRight, Car, Truck, Bike, User, HardHat, AlertTriangle, Scale } from 'lucide-react'
import type { MichiganCity } from '@/lib/data/cities'
import { getRelatedCities, cityPath } from '@/lib/data/cities'
import type { CaseTypeSlug } from '@/types'

interface CityInternalLinksProps {
  city: MichiganCity
}

// ─── Case type metadata (display only) ───────────────────────────────────────

interface CaseTypeMeta {
  icon:  React.ElementType
  label: string
  path:  string
}

const CASE_TYPE_META: Record<CaseTypeSlug, CaseTypeMeta> = {
  'car-accident':         { icon: Car,           label: 'Car Accident',          path: '/case-types/car-accident'         },
  'truck-accident':       { icon: Truck,          label: 'Truck Accident',         path: '/case-types/truck-accident'       },
  'motorcycle-accident':  { icon: Bike,           label: 'Motorcycle Accident',    path: '/case-types/motorcycle-accident'  },
  'pedestrian-accident':  { icon: User,           label: 'Pedestrian Accident',    path: '/case-types/pedestrian-accident'  },
  'rideshare-accident':   { icon: Car,            label: 'Rideshare Accident',     path: '/case-types/rideshare-accident'   },
  'hit-and-run':          { icon: Car,            label: 'Hit & Run',              path: '/case-types/hit-and-run'         },
  'bicycle-accident':     { icon: Bike,           label: 'Bicycle Accident',       path: '/case-types/bicycle-accident'  },
  'workers-compensation': { icon: HardHat,        label: "Workers' Comp",          path: '/case-types/workers-compensation' },
  'slip-and-fall':        { icon: AlertTriangle,  label: 'Slip & Fall',            path: '/case-types/slip-and-fall'        },
  'workplace-injury':     { icon: HardHat,        label: 'Workplace Injury',       path: '/case-types/workplace-injury'     },
  'wrongful-death':       { icon: Scale,          label: 'Wrongful Death',         path: '/case-types/wrongful-death'       },
  'personal-injury':      { icon: Scale,          label: 'Personal Injury',        path: '/case-types/personal-injury'      },
  'premises-liability':   { icon: AlertTriangle,  label: 'Premises Liability',     path: '/case-types/premises-liability'        },
  'other':                { icon: Scale,          label: 'Other Cases',            path: '/case-types/other'                      },
}

export default function CityInternalLinks({ city }: CityInternalLinksProps) {
  const relatedCities  = getRelatedCities(city)
  const casesToShow    = city.primaryCaseTypes.slice(0, 4)

  return (
    <section
      aria-labelledby={`city-links-heading-${city.slug}`}
      className="bg-slate-50 py-14 sm:py-18 border-t border-slate-200"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">

          {/* ── Other Michigan cities ─────────────────────────────── */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-2">
              Also Serving
            </p>
            <h2
              id={`city-links-heading-${city.slug}`}
              className="text-xl font-bold text-[#0A1628] mb-5"
            >
              Other Michigan Cities We Fund
            </h2>

            <ul aria-label="Other Michigan cities with pre-settlement funding" className="space-y-3">
              {relatedCities.map((related) => (
                <li key={related.slug}>
                  <Link
                    href={cityPath(related.slug)}
                    aria-label={`Pre-settlement funding in ${related.name}, Michigan`}
                    data-event="click"
                    data-event-label={`city_links_city_${related.slug}_from_${city.slug}`}
                    data-event-category="internal_linking"
                    className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 hover:border-[#C9A84C]/40 hover:shadow-sm transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
                  >
                    {/* Icon */}
                    <div className="w-10 h-10 rounded-xl bg-[#0A1628]/5 group-hover:bg-[#C9A84C]/10 flex items-center justify-center shrink-0 transition-colors duration-200">
                      <MapPin aria-hidden="true" size={18} className="text-[#0A1628] group-hover:text-[#C9A84C] transition-colors duration-200" />
                    </div>

                    {/* Copy */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#0A1628] group-hover:text-[#1E3D6B]">
                        {related.name}, MI
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {related.county} · Pop. {related.population.toLocaleString()}
                      </p>
                    </div>

                    <ArrowRight
                      aria-hidden="true"
                      size={15}
                      className="shrink-0 text-slate-300 group-hover:text-[#C9A84C] transition-colors duration-200"
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/"
              aria-label="View all Michigan cities we serve"
              data-event="click"
              data-event-label={`city_links_all_cities_from_${city.slug}`}
              data-event-category="internal_linking"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-[#0A1628] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded-lg"
            >
              View all Michigan cities
              <ArrowRight aria-hidden="true" size={14} />
            </Link>
          </div>

          {/* ── Case type pages ───────────────────────────────────── */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-2">
              Common Cases
            </p>
            <h3 className="text-xl font-bold text-[#0A1628] mb-5">
              Cases We Fund in {city.name}
            </h3>

            <ul aria-label={`Common case types funded in ${city.name}`} className="space-y-3">
              {casesToShow.map((caseSlug) => {
                const meta = CASE_TYPE_META[caseSlug]
                if (!meta) return null
                const Icon = meta.icon
                return (
                  <li key={caseSlug}>
                    <Link
                      href={`${meta.path}?city=${city.slug}`}
                      aria-label={`${meta.label} pre-settlement funding — ${city.name}, Michigan`}
                      data-event="click"
                      data-event-label={`city_links_case_${caseSlug}_from_${city.slug}`}
                      data-event-category="internal_linking"
                      className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 hover:border-[#C9A84C]/40 hover:shadow-sm transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#0A1628]/5 group-hover:bg-[#C9A84C]/10 flex items-center justify-center shrink-0 transition-colors duration-200">
                        <Icon
                          aria-hidden="true"
                          size={18}
                          strokeWidth={1.75}
                          className="text-[#0A1628] group-hover:text-[#C9A84C] transition-colors duration-200"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#0A1628]">
                          {meta.label}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {city.name} cases eligible for up to $5,000
                        </p>
                      </div>
                      <ArrowRight
                        aria-hidden="true"
                        size={15}
                        className="shrink-0 text-slate-300 group-hover:text-[#C9A84C] transition-colors duration-200"
                      />
                    </Link>
                  </li>
                )
              })}
            </ul>

            <Link
              href="/cases"
              aria-label="View all case types we fund in Michigan"
              data-event="click"
              data-event-label={`city_links_all_cases_from_${city.slug}`}
              data-event-category="internal_linking"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-[#0A1628] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded-lg"
            >
              All qualifying case types
              <ArrowRight aria-hidden="true" size={14} />
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
