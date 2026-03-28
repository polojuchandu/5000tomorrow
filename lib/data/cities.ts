import type { CaseTypeSlug } from '@/types'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MichiganCity {
  /** URL-safe identifier, e.g. "detroit" → URL becomes /detroit-legal-funding */
  slug:             string
  name:             string
  county:           string
  population:       number
  region:           'southeast' | 'west' | 'north' | 'central'
  geo: {
    lat: number
    lng: number
  }
  /** 2-3 sentence SEO paragraph unique to this city */
  copySnippet:      string
  /** Short hero subheadline unique to this city */
  heroTagline:      string
  /** Neighborhoods/suburbs for "serving X and surrounding areas" */
  nearbyAreas:      string[]
  /** 3 other city slugs for internal linking at page bottom */
  relatedCities:    string[]
  /** 3-4 case type slugs most statistically common in this area */
  primaryCaseTypes: CaseTypeSlug[]
  /** Full name of local circuit court */
  courthouse:       string
  /** Notable roads/highways for local context */
  notableRoads:     string[]
}

// ─── City data ────────────────────────────────────────────────────────────────

export const CITIES: MichiganCity[] = [
  {
    slug:       'detroit',
    name:       'Detroit',
    county:     'Wayne County',
    population: 639_111,
    region:     'southeast',
    geo:        { lat: 42.3314, lng: -83.0458 },
    heroTagline:
      'Michigan\'s largest city deserves fast, fair pre-settlement funding. We\'ve helped hundreds of Wayne County families keep the lights on while their case works through the courts.',
    copySnippet:
      'Detroit residents face some of Michigan\'s busiest and most dangerous highways — I-94, I-96, and the Lodge Freeway — making auto accidents one of the leading causes of serious injury in Wayne County. With thousands of personal injury cases filed each year in the Wayne County Circuit Court, many Detroit families cannot afford to wait 12–24 months for a settlement. Our pre-settlement funding puts up to $5,000 in your hands within 24 hours so you can cover rent, medical bills, and everyday expenses without touching your savings — and you repay nothing unless your case wins.',
    nearbyAreas:    ['Dearborn', 'Southfield', 'Hamtramck', 'Highland Park', 'Inkster'],
    relatedCities:  ['warren', 'ann-arbor', 'flint'],
    primaryCaseTypes: ['car-accident', 'truck-accident', 'workers-compensation', 'wrongful-death'],
    courthouse:     'Wayne County Circuit Court',
    notableRoads:   ['I-94', 'I-96', 'I-75', 'M-10 (The Lodge)', 'I-375'],
  },

  {
    slug:       'grand-rapids',
    name:       'Grand Rapids',
    county:     'Kent County',
    population: 198_917,
    region:     'west',
    geo:        { lat: 42.9634, lng: -85.6681 },
    heroTagline:
      'West Michigan\'s largest city — and 5000 Tomorrow serves every neighborhood from Eastown to Grandville.',
    copySnippet:
      'Grand Rapids is Michigan\'s second-largest city and the economic engine of West Michigan. The notorious US-131 S-curve and the M-6 bypass carry heavy commercial and commuter traffic daily, making auto and truck accidents a frequent source of serious injury in Kent County. Whether your case involves a collision on the highway, a slip-and-fall at a local business on Monroe Center, or a workplace injury near the medical mile, 5000 Tomorrow helps Grand Rapids residents access up to $5,000 in pre-settlement funding quickly — so you can focus on recovery instead of overdue bills.',
    nearbyAreas:    ['Kentwood', 'Wyoming', 'Walker', 'Grandville', 'East Grand Rapids'],
    relatedCities:  ['kalamazoo', 'lansing', 'traverse-city'],
    primaryCaseTypes: ['car-accident', 'truck-accident', 'workers-compensation', 'slip-and-fall'],
    courthouse:     'Kent County Circuit Court',
    notableRoads:   ['US-131', 'I-96', 'M-6', 'US-196', 'M-44'],
  },

  {
    slug:       'warren',
    name:       'Warren',
    county:     'Macomb County',
    population: 134_056,
    region:     'southeast',
    geo:        { lat: 42.4775, lng: -83.0277 },
    heroTagline:
      'Macomb County\'s largest city — Warren residents rely on 5000 Tomorrow when a settlement is months away.',
    copySnippet:
      'Warren is Michigan\'s third-largest city, sitting at the heart of Macomb County with major corridors like Mound Road, Van Dyke Avenue, and Groesbeck Highway carrying significant commercial truck traffic every day. The city\'s density of automotive facilities and industrial employers means workers\' compensation and workplace injury cases are among the most common personal injury claims filed in Macomb County Circuit Court. If you\'ve been injured in Warren and your case is moving slowly, 5000 Tomorrow can provide up to $5,000 in pre-settlement funding — no credit check, no upfront fees, and no repayment if your case doesn\'t win.',
    nearbyAreas:    ['Sterling Heights', 'Eastpointe', 'Center Line', 'Roseville', 'Madison Heights'],
    relatedCities:  ['detroit', 'flint', 'saginaw'],
    primaryCaseTypes: ['car-accident', 'truck-accident', 'workers-compensation', 'workplace-injury'],
    courthouse:     'Macomb County Circuit Court',
    notableRoads:   ['Mound Road', 'Van Dyke Ave', 'Groesbeck Hwy', 'I-696', 'M-53'],
  },

  {
    slug:       'lansing',
    name:       'Lansing',
    county:     'Ingham County',
    population: 112_644,
    region:     'central',
    geo:        { lat: 42.7325, lng: -84.5555 },
    heroTagline:
      'Michigan\'s capital city — Ingham County residents don\'t have to wait on the government to get financial relief.',
    copySnippet:
      'As Michigan\'s state capital, Lansing is home to thousands of state government employees, Sparrow Health System workers, and a busy downtown corridor on Michigan Avenue. Auto accidents on I-496, I-96, and US-127 are among the most common causes of personal injury in Ingham County. Whether you work for the state, were hurt on a Lansing construction site, or were struck by a vehicle downtown, 5000 Tomorrow helps Lansing residents get up to $5,000 in pre-settlement funding quickly — so a slow-moving claims process doesn\'t mean unpaid bills.',
    nearbyAreas:    ['East Lansing', 'Okemos', 'Holt', 'DeWitt', 'Mason'],
    relatedCities:  ['flint', 'ann-arbor', 'saginaw'],
    primaryCaseTypes: ['car-accident', 'workers-compensation', 'slip-and-fall', 'workplace-injury'],
    courthouse:     'Ingham County Circuit Court',
    notableRoads:   ['I-496', 'I-96', 'US-127', 'Michigan Ave', 'US-27'],
  },

  {
    slug:       'flint',
    name:       'Flint',
    county:     'Genesee County',
    population: 81_252,
    region:     'central',
    geo:        { lat: 43.0125, lng: -83.6875 },
    heroTagline:
      'Flint families have faced enough hardship — 5000 Tomorrow helps you bridge the financial gap while your case is pending.',
    copySnippet:
      'Flint has a long history of manufacturing and industrial employment in Genesee County, and many residents are navigating complex workers\' compensation or workplace injury cases tied to that legacy. Auto accidents on I-475 and I-69, combined with personal injury claims from current and former industrial workers, make Flint one of Michigan\'s most active areas for personal injury litigation. 5000 Tomorrow understands the financial pressures Flint families face and works quickly — usually within 24 hours — to provide up to $5,000 in pre-settlement funding while your case moves through the Genesee County Circuit Court.',
    nearbyAreas:    ['Burton', 'Grand Blanc', 'Davison', 'Fenton', 'Mt. Morris'],
    relatedCities:  ['saginaw', 'warren', 'detroit'],
    primaryCaseTypes: ['workers-compensation', 'car-accident', 'workplace-injury', 'wrongful-death'],
    courthouse:     'Genesee County Circuit Court',
    notableRoads:   ['I-475', 'I-69', 'US-23', 'M-21', 'Dort Hwy'],
  },

  {
    slug:       'ann-arbor',
    name:       'Ann Arbor',
    county:     'Washtenaw County',
    population: 123_851,
    region:     'southeast',
    geo:        { lat: 42.2808, lng: -83.7430 },
    heroTagline:
      'Home to the University of Michigan — Ann Arbor\'s dense pedestrian and cyclist traffic creates real injury risks every day.',
    copySnippet:
      'Ann Arbor is home to the University of Michigan and tens of thousands of students, cyclists, and pedestrians who share the road with vehicle traffic daily. Bicycle accidents near campus, pedestrian strikes on State Street and South University, and auto collisions on US-23 and M-14 are among the most frequent personal injury cases filed in Washtenaw County Circuit Court. If you\'ve been injured in Ann Arbor and your settlement is months away, 5000 Tomorrow can provide up to $5,000 in pre-settlement funding so you can cover costs without pressure to accept a low early offer from the insurance company.',
    nearbyAreas:    ['Ypsilanti', 'Saline', 'Chelsea', 'Dexter', 'Milan'],
    relatedCities:  ['detroit', 'lansing', 'kalamazoo'],
    primaryCaseTypes: ['pedestrian-accident', 'bicycle-accident', 'car-accident', 'slip-and-fall'],
    courthouse:     'Washtenaw County Circuit Court',
    notableRoads:   ['US-23', 'M-14', 'I-94', 'Stadium Blvd', 'State St'],
  },

  {
    slug:       'kalamazoo',
    name:       'Kalamazoo',
    county:     'Kalamazoo County',
    population: 72_000,
    region:     'west',
    geo:        { lat: 42.2917, lng: -85.5872 },
    heroTagline:
      'Kalamazoo\'s manufacturing and pharmaceutical industries make workplace injuries more common than most realize.',
    copySnippet:
      'Kalamazoo is home to major employers including Pfizer, Stryker, and Western Michigan University\'s expanding medical corridor — making workers\' compensation and workplace injury claims especially common in Kalamazoo County. The I-94 corridor through the city is a primary east-west truck route connecting Chicago to Detroit, contributing to a high volume of commercial vehicle accident cases. Whether your injury occurred at work or on the road, 5000 Tomorrow helps Kalamazoo residents secure up to $5,000 in pre-settlement funding so you\'re not forced into a quick, low settlement to pay your bills.',
    nearbyAreas:    ['Portage', 'Comstock', 'Parchment', 'Richland', 'Schoolcraft'],
    relatedCities:  ['grand-rapids', 'ann-arbor', 'lansing'],
    primaryCaseTypes: ['car-accident', 'workers-compensation', 'workplace-injury', 'truck-accident'],
    courthouse:     'Kalamazoo County Circuit Court',
    notableRoads:   ['I-94', 'US-131', 'M-43', 'Westnedge Ave', 'M-96'],
  },

  {
    slug:       'traverse-city',
    name:       'Traverse City',
    county:     'Grand Traverse County',
    population: 15_698,
    region:     'north',
    geo:        { lat: 44.7631, lng: -85.6206 },
    heroTagline:
      'Northern Michigan\'s tourist economy creates unique injury risks — from ski resort slip-and-falls to seasonal rideshare accidents.',
    copySnippet:
      'Traverse City draws millions of visitors annually to northern Michigan\'s lakeshore, Sleeping Bear Dunes, ski resorts, and wine country — creating a unique concentration of tourism-related personal injury cases. Hotel and restaurant slip-and-fall incidents, rideshare and shuttle vehicle accidents on US-31 and M-72, and pedestrian injuries in the downtown strip are among the most common claims filed in Grand Traverse County Circuit Court. Whether you live here year-round or were visiting when your injury occurred, 5000 Tomorrow can provide pre-settlement funding to help you stay financially stable while your Michigan case resolves.',
    nearbyAreas:    ['Traverse City Township', 'Acme', 'Elk Rapids', 'Suttons Bay', 'Interlochen'],
    relatedCities:  ['grand-rapids', 'kalamazoo', 'saginaw'],
    primaryCaseTypes: ['car-accident', 'slip-and-fall', 'rideshare-accident', 'pedestrian-accident'],
    courthouse:     'Grand Traverse County Circuit Court',
    notableRoads:   ['US-31', 'M-72', 'M-37', 'M-22', 'US-131'],
  },

  {
    slug:       'saginaw',
    name:       'Saginaw',
    county:     'Saginaw County',
    population: 44_282,
    region:     'central',
    geo:        { lat: 43.4195, lng: -83.9508 },
    heroTagline:
      'The Tri-Cities region\'s center for personal injury funding — Saginaw County residents served within 24 hours.',
    copySnippet:
      'Saginaw is the center of the Tri-Cities region in mid-Michigan, with a history rooted in the automotive and manufacturing industries. Auto accidents on I-675 and M-13, along with workers\' compensation claims from current and former industrial workers, are among the most common cases filed in Saginaw County Circuit Court each year. If you\'ve been injured and your settlement is delayed, 5000 Tomorrow provides up to $5,000 in pre-settlement funding to help Saginaw residents cover medical costs, lost wages, and household bills — without any repayment obligation if your case doesn\'t win.',
    nearbyAreas:    ['Bay City', 'Midland', 'Birch Run', 'Frankenmuth', 'Shields'],
    relatedCities:  ['flint', 'warren', 'lansing'],
    primaryCaseTypes: ['workers-compensation', 'car-accident', 'workplace-injury', 'truck-accident'],
    courthouse:     'Saginaw County Circuit Court',
    notableRoads:   ['I-675', 'M-13', 'I-75', 'M-46', 'Bay Rd'],
  },
]

// ─── Lookup helpers ───────────────────────────────────────────────────────────

export function getCityBySlug(slug: string): MichiganCity | undefined {
  return CITIES.find((c) => c.slug === slug)
}

export function getRelatedCities(city: MichiganCity): MichiganCity[] {
  return city.relatedCities
    .map((slug) => getCityBySlug(slug))
    .filter((c): c is MichiganCity => c !== undefined)
    .slice(0, 3)
}

/** Returns the full URL path for a city page, e.g. /detroit-legal-funding */
export function cityPath(slug: string): string {
  return `/${slug}-legal-funding`
}
