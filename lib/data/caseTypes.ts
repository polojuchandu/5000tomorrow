import type { CaseTypeSlug } from '@/types'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CaseTypeDetail {
  slug:             CaseTypeSlug
  title:            string
  shortTitle:       string
  description:      string
  heroTagline:      string
  /** 2-3 sentence SEO paragraph unique to this case type */
  copySnippet:      string
  /** Full detailed description for the page */
  fullDescription:  string
  icon?:            string
  isPrimary:        boolean
  /** Typical settlement range (if applicable) */
  settlementRange?: string
  /** Time to settlement estimate */
  timeToSettle?:    string
  /** Common injuries or damages */
  commonInjuries:   string[]
  /** 3-4 cities most affected by this case type */
  commonCities:     string[]
  /** Legal references or statutes */
  legalBasis?:      string
  /** 3 other case type slugs for related links */
  relatedCaseTypes: CaseTypeSlug[]
}

// ─── Case Type Data ───────────────────────────────────────────────────────────

export const CASE_TYPES: CaseTypeDetail[] = [
  // Primary
  {
    slug:             'car-accident',
    title:            'Car Accident Funding',
    shortTitle:       'Car Accident',
    description:      'Michigan auto accidents are among the most litigated cases in the state. Insurance disputes and serious injuries make these cases ideal for pre-settlement funding.',
    heroTagline:      'Car Accident Lawsuit Funding in Michigan — Up to $5,000',
    copySnippet:      'Car accidents are Michigan\'s #1 personal injury claim. With busy highways like I-94, I-96, and I-75, thousands of accidents occur annually. If you\'ve been injured and are working with an attorney, pre-settlement funding can help you pay bills while your case progresses.',
    fullDescription:  'Car accident lawsuits in Michigan can take 12–24 months to settle, especially when liability is contested or injuries are serious. During that time, many accident victims struggle with medical bills, lost wages, and daily expenses. Our car accident pre-settlement funding gives you up to $5,000 within 24 hours — with no credit check, no monthly payments, and no repayment if you lose your case.',
    isPrimary:        true,
    settlementRange:  '$5,000–$150,000+',
    timeToSettle:     '12–24 months',
    commonInjuries:   ['Back/spine injuries', 'Whiplash', 'Broken bones', 'Soft tissue damage', 'Traumatic brain injury', 'PTSD'],
    commonCities:     ['detroit', 'ann-arbor', 'warren'],
    legalBasis:       'Michigan No-Fault Act (MCL 500.3101 et seq.)',
    relatedCaseTypes: ['truck-accident', 'motorcycle-accident', 'pedestrian-accident'],
  },
  {
    slug:             'truck-accident',
    title:            'Truck Accident Funding',
    shortTitle:       'Truck Accident',
    description:      'Commercial trucking accidents often involve catastrophic injuries, multiple liable parties, and settlements that take years to resolve.',
    heroTagline:      'Truck Accident Pre-Settlement Funding — Michigan',
    copySnippet:      'Truck accidents are among the most devastating vehicle collisions. Multiple liable parties, serious injuries, and lengthy investigations make these cases complex—and long. If you\'re injured in a trucking accident, pre-settlement funding helps you survive financially while your attorney pursues your claim.',
    fullDescription:  'Truck accidents—involving semi-trucks, delivery vehicles, or commercial transport—typically result in catastrophic injuries due to the vehicle\'s size and weight. These cases are complex because multiple parties may be liable: the truck driver, the trucking company, the owner of the cargo, and others. Investigations can take 6–12 months alone, and settlements often take 18–36 months. Pre-settlement funding keeps you financially stable during this extended timeline.',
    isPrimary:        true,
    settlementRange:  '$50,000–$500,000+',
    timeToSettle:     '18–36 months',
    commonInjuries:   ['Spinal cord injury', 'Amputation', 'Severe burns', 'Multiple fractures', 'Internal injuries', 'Death (wrongful death)'],
    commonCities:     ['detroit', 'flint', 'warren'],
    legalBasis:       'Commercial vehicle regulations (49 CFR) + Michigan tort law',
    relatedCaseTypes: ['car-accident', 'wrongful-death', 'pedestrian-accident'],
  },
  {
    slug:             'motorcycle-accident',
    title:            'Motorcycle Accident Funding',
    shortTitle:       'Motorcycle Accident',
    description:      'Motorcycle riders face severe injuries and often unfair bias from insurers. We fund these cases while your attorney fights for a fair result.',
    heroTagline:      'Motorcycle Accident Lawsuit Funding — Michigan',
    copySnippet:      'Motorcycle accidents cause disproportionately severe injuries. Riders often face uphill battles against insurance companies that undervalue their claims. Pre-settlement funding helps you level the playing field while your attorney fights for fair compensation.',
    fullDescription:  'Motorcycle riders lack the protection of an enclosed vehicle, making even low-speed accidents potentially catastrophic. Injuries—road rash, fractures, spinal injuries, and traumatic brain injuries—are common and expensive to treat. Many insurance companies are biased against motorcycle riders and attempt to minimize settlements. Pre-settlement funding gives you financial leverage to reject inadequate offers and let your attorney pursue your full claim.',
    isPrimary:        true,
    settlementRange:  '$10,000–$250,000+',
    timeToSettle:     '12–24 months',
    commonInjuries:   ['Road rash (abrasions)', 'Fractures', 'Spinal injuries', 'Traumatic brain injury', 'Amputation', 'Scarring/disfigurement'],
    commonCities:     ['ann-arbor', 'detroit', 'traverse-city'],
    legalBasis:       'Michigan No-Fault Act (MCL 500.3101 et seq.)',
    relatedCaseTypes: ['car-accident', 'pedestrian-accident', 'hit-and-run'],
  },
  {
    slug:             'pedestrian-accident',
    title:            'Pedestrian Accident Funding',
    shortTitle:       'Pedestrian Accident',
    description:      'Pedestrian accident victims often face life-altering injuries. Pre-settlement funding helps you stay financially stable during a lengthy recovery.',
    heroTagline:      'Pedestrian Accident Pre-Settlement Funding in Michigan',
    copySnippet:      'Pedestrian accidents cause severe injuries—broken bones, internal injuries, head trauma. Victims often can\'t work during recovery, creating financial crisis. Our pedestrian accident funding provides immediate support while your case moves through the courts.',
    fullDescription:  'When a pedestrian is struck by a vehicle, the results are often catastrophic. Pedestrians lack any protective shell and often suffer broken bones, internal injuries, brain damage, and spinal injuries. Recovery is lengthy—sometimes years of physical therapy and medical treatment. During that time, most pedestrian accident victims can\'t work. Pre-settlement funding covers rent, medical co-pays, utilities, and living expenses while your attorney pursues your claim.',
    isPrimary:        true,
    settlementRange:  '$15,000–$300,000+',
    timeToSettle:     '12–24 months',
    commonInjuries:   ['Broken bones', 'Internal injuries', 'Traumatic brain injury', 'Spinal injuries', 'Organ damage', 'Death (wrongful death)'],
    commonCities:     ['detroit', 'ann-arbor', 'traverse-city'],
    legalBasis:       'Michigan tort law + no-fault framework',
    relatedCaseTypes: ['car-accident', 'wrongful-death', 'truck-accident'],
  },
  {
    slug:             'rideshare-accident',
    title:            'Rideshare Accident Funding',
    shortTitle:       'Rideshare Accident',
    description:      'Uber and Lyft accidents involve complex insurance layers. We fund both passengers and other parties injured in rideshare collisions.',
    heroTagline:      'Uber & Lyft Accident Pre-Settlement Funding in Michigan',
    copySnippet:      'Rideshare accidents—Uber, Lyft, and others—involve complex insurance coverage and multiple liable parties. Whether you\'re a passenger, driver, or third party injured by a rideshare vehicle, pre-settlement funding helps you cover expenses while your attorney navigates the claim.',
    fullDescription:  'Rideshare accidents (Uber, Lyft, etc.) are uniquely complex. Multiple insurance policies may apply, and determining liability can take months. If you\'re a passenger injured in a rideshare vehicle, you may have claims against the driver, the rideshare company, or a third party. If you\'re the driver or a third party, additional policies come into play. Throughout the investigation and negotiation, you need financial support. Pre-settlement rideshare accident funding covers your expenses while your attorney untangles the liability issues.',
    isPrimary:        true,
    settlementRange:  '$5,000–$200,000+',
    timeToSettle:     '12–24 months',
    commonInjuries:   ['Whiplash', 'Back injuries', 'Broken bones', 'Head injuries', 'Soft tissue damage'],
    commonCities:     ['detroit', 'ann-arbor', 'flint'],
    legalBasis:       'Michigan tort law + rideshare platform insurance policy',
    relatedCaseTypes: ['car-accident', 'pedestrian-accident', 'hit-and-run'],
  },
  {
    slug:             'hit-and-run',
    title:            'Hit & Run Accident Funding',
    shortTitle:       'Hit & Run',
    description:      'Hit-and-run cases can still result in substantial recovery. If you have an attorney pursuing your claim, you may qualify for funding.',
    heroTagline:      'Hit & Run Accident Pre-Settlement Funding — Michigan',
    copySnippet:      'Hit-and-run accidents leave victims injured and emotionally distressed. However, Michigan law provides recovery avenues through your own insurance and civil lawsuits. If an attorney is pursuing your hit-and-run claim, pre-settlement funding can support you while the case resolves.',
    fullDescription:  'Hit-and-run accidents are frustrating—the responsible driver fled the scene, leaving you injured with mounting medical bills. However, Michigan law allows you to pursue recovery through your own uninsured motorist (UM) coverage and in some cases through civil claims if the driver is identified. Hit-and-run cases typically take longer to investigate and resolve. Pre-settlement funding bridges the financial gap while police and your attorney work to identify the responsible party and pursue your claim.',
    isPrimary:        true,
    settlementRange:  '$5,000–$100,000+',
    timeToSettle:     '14–26 months',
    commonInjuries:   ['Whiplash', 'Soft tissue damage', 'Fractures', 'Head injuries', 'Psychological trauma'],
    commonCities:     ['detroit', 'warren', 'ann-arbor'],
    legalBasis:       'Michigan No-Fault Act + Uninsured Motorist coverage (MCL 500.3157)',
    relatedCaseTypes: ['car-accident', 'motorcycle-accident', 'pedestrian-accident'],
  },
  {
    slug:             'bicycle-accident',
    title:            'Bicycle Accident Funding',
    shortTitle:       'Bicycle Accident',
    description:      'Cyclists struck by vehicles typically suffer serious injuries and long recoveries. We provide funding while your case is pending.',
    heroTagline:      'Bicycle Accident Pre-Settlement Funding in Michigan',
    copySnippet:      'Bicyclists struck by vehicles suffer serious injuries—broken bones, head trauma, spinal injuries. Recovery takes months or years. If you\'re a cyclist injured by a negligent driver, pre-settlement funding helps you recover without financial stress.',
    fullDescription:  'Bicycle accidents involving vehicles are particularly serious because cyclists have no protection. A collision at moderate speed can cause severe fractures, head injuries, spinal damage, and long-term disability. Recovery—including physical therapy and medical treatment—often takes 12–24 months or longer. Many cyclists can\'t work during this time, creating a financial crisis. Pre-settlement bicycle accident funding provides immediate financial relief while your attorney negotiates your claim.',
    isPrimary:        true,
    settlementRange:  '$5,000–$150,000+',
    timeToSettle:     '12–24 months',
    commonInjuries:   ['Fractured pelvis', 'Spinal injuries', 'Traumatic brain injury', 'Road rash', 'Broken ribs', 'Internal injuries'],
    commonCities:     ['ann-arbor', 'traverse-city', 'detroit'],
    legalBasis:       'Michigan tort law + negligence doctrine',
    relatedCaseTypes: ['pedestrian-accident', 'motorcycle-accident', 'car-accident'],
  },
  // Secondary
  {
    slug:             'workers-compensation',
    title:            "Workers' Compensation Funding",
    shortTitle:       "Workers' Comp",
    description:      "Workplace injuries that result in workers' comp claims can qualify for pre-settlement funding in Michigan.",
    heroTagline:      "Workers' Compensation Pre-Settlement Funding in Michigan",
    copySnippet:      "Michigan workers' compensation claims can take months to resolve. If you're injured at work, pre-settlement funding helps when benefits are delayed or disputed.",
    fullDescription:  "Workers' compensation disputes—denied benefits, contested claims, or appeals—can take 6–18 months to resolve. While you wait for the Michigan Workers' Compensation Agency to rule, you may face a financial crisis. Pre-settlement workers' compensation funding provides immediate cash support, allowing you to cover medical care, rent, and living expenses while your case is pending.",
    isPrimary:        false,
    settlementRange:  '$3,000–$50,000+',
    timeToSettle:     '6–18 months',
    commonInjuries:   ['Back injury', 'Repetitive strain', 'Chemical exposure', 'Amputation', 'Occupational disease'],
    commonCities:     ['detroit', 'flint', 'warren'],
    legalBasis:       'Michigan Workers\' Disability Compensation Act (MCL 418.101 et seq.)',
    relatedCaseTypes: ['workplace-injury', 'slip-and-fall', 'personal-injury'],
  },
  {
    slug:             'slip-and-fall',
    title:            'Slip & Fall Accident Funding',
    shortTitle:       'Slip & Fall',
    description:      'Premises liability cases — including slip and fall injuries in stores, parking lots, or private property — are eligible for funding.',
    heroTagline:      'Slip & Fall Pre-Settlement Funding in Michigan',
    copySnippet:      'Slip-and-fall accidents in stores, parking lots, or public spaces can cause serious injuries. If a property owner\'s negligence caused your fall, pre-settlement funding helps you heal without financial stress.',
    fullDescription:  'Slip-and-fall cases hinge on proving the property owner knew (or should have known) about a hazardous condition and failed to fix it or warn customers. These cases require investigation—photos, maintenance records, witness statements—which takes time. Slip-and-fall settlements can take 12–20 months to resolve. If you\'re injured, pre-settlement funding covers your medical care, lost wages, and living expenses while your attorney builds your case.',
    isPrimary:        false,
    settlementRange:  '$3,000–$100,000+',
    timeToSettle:     '12–20 months',
    commonInjuries:   ['Hip fractures', 'Spinal injuries', 'Head injuries', 'Broken wrists', 'Soft tissue damage'],
    commonCities:     ['detroit', 'ann-arbor', 'warren'],
    legalBasis:       'Michigan premises liability law (negligence doctrine)',
    relatedCaseTypes: ['premises-liability', 'personal-injury', 'workplace-injury'],
  },
  {
    slug:             'workplace-injury',
    title:            'Workplace Injury Funding',
    shortTitle:       'Workplace Injury',
    description:      'Injuries at work that go beyond workers\' comp — such as third-party liability claims — can also qualify for pre-settlement funding.',
    heroTagline:      'Workplace Injury Pre-Settlement Funding in Michigan',
    copySnippet:      'Some workplace injuries involve third-party liability claims beyond workers\' comp. If your workplace injury was caused by a negligent third party, pre-settlement funding supports you while your lawsuit proceeds.',
    fullDescription:  'While most workplace injuries are covered by workers\' compensation (which prevents you from suing your employer), some workplace injuries involve third parties. For example, if a defective tool or product injured you, or if a third-party contractor was negligent, you may have a civil lawsuit separate from workers\' comp. These third-party workplace injury claims can take 12–24 months and often result in larger settlements than workers\' comp alone. Pre-settlement funding bridges the income gap during litigation.',
    isPrimary:        false,
    settlementRange:  '$5,000–$150,000+',
    timeToSettle:     '12–24 months',
    commonInjuries:   ['Burns', 'Amputation', 'Electrocution injuries', 'Chemical burns', 'Broken bones'],
    commonCities:     ['detroit', 'flint', 'warren'],
    legalBasis:       'Michigan tort law (third-party liability)',
    relatedCaseTypes: ['workers-compensation', 'personal-injury', 'slip-and-fall'],
  },
  {
    slug:             'wrongful-death',
    title:            'Wrongful Death Funding',
    shortTitle:       'Wrongful Death',
    description:      'Surviving family members pursuing wrongful death claims may qualify for pre-settlement funding to cover expenses during litigation.',
    heroTagline:      'Wrongful Death Pre-Settlement Funding in Michigan',
    copySnippet:      'Wrongful death lawsuits—caused by accidents, medical negligence, or negligent acts—can take 18–36 months to resolve. Surviving family members often face financial hardship while pursuing justice. Wrongful death pre-settlement funding provides immediate support.',
    fullDescription:  'Wrongful death lawsuits are emotionally devastating and financially complex. Surviving family members (spouses, children, parents) may pursue claims for lost companionship, lost financial support, funeral expenses, and pain and suffering. These cases—whether stemming from auto accidents, premise liability, medical negligence, or other causes—typically take 18–36 months to resolve. During this time, families often lose breadwinners and face mounting expenses. Wrongful death pre-settlement funding provides financial support while the family focuses on healing and their civil claim.',
    isPrimary:        false,
    settlementRange:  '$50,000–$1,000,000+',
    timeToSettle:     '18–36 months',
    commonInjuries:   ['Death from auto accident', 'Death from workplace accident', 'Death from medical negligence', 'Death from assault'],
    commonCities:     ['detroit', 'flint', 'ann-arbor'],
    legalBasis:       'Michigan Wrongful Death Act (MCL 600.2152)',
    relatedCaseTypes: ['car-accident', 'truck-accident', 'pedestrian-accident'],
  },
  {
    slug:             'personal-injury',
    title:            'Personal Injury Funding',
    shortTitle:       'Personal Injury',
    description:      'General personal injury cases that don\'t fit a specific category above may still qualify. Contact us to discuss your case.',
    heroTagline:      'Personal Injury Pre-Settlement Funding in Michigan',
    copySnippet:      'Not all personal injury cases fit neatly into a category. If you\'ve been injured due to someone else\'s negligence, you may qualify for pre-settlement funding—even if your injury type isn\'t listed on our site.',
    fullDescription:  'We fund 14 specific case types, but we also evaluate other personal injury cases individually. If you\'ve been injured due to negligence by another person or entity, and you have an active case with a licensed Michigan attorney, you likely qualify for pre-settlement funding. Call us at (888) 500-0050 to discuss your specific situation. We\'re happy to evaluate any Michigan personal injury claim.',
    isPrimary:        false,
    settlementRange:  'Varies',
    timeToSettle:     '12–24 months',
    commonInjuries:   ['Varies by case'],
    commonCities:     ['detroit', 'ann-arbor', 'traverse-city'],
    legalBasis:       'Michigan tort law (negligence)',
    relatedCaseTypes: ['slip-and-fall', 'premises-liability', 'workplace-injury'],
  },
  {
    slug:             'premises-liability',
    title:            'Premises Liability Funding',
    shortTitle:       'Premises Liability',
    description:      'Property owners who fail to maintain safe conditions can be held liable. We fund premises liability claims while your case moves through court.',
    heroTagline:      'Premises Liability Pre-Settlement Funding — Michigan',
    copySnippet:      'Premises liability claims—slip and falls, inadequate security, poorly maintained property—require proving the property owner knew about a hazard and failed to fix it. These cases take time to investigate and resolve. Premises liability funding supports you financially while your attorney builds your case.',
    fullDescription:  'Premises liability is a broad category covering injuries on someone else\'s property—stores, apartment buildings, parking lots, amusement parks, restaurants. To win, you must prove the property owner knew (or should have known) about a hazardous condition and failed to repair it or warn you. Proving this requires investigation: maintenance records, witness statements, prior incident reports. These cases typically take 12–24 months. Pre-settlement premises liability funding covers your medical bills, lost income, and living expenses while your attorney investigates and negotiates your claim.',
    isPrimary:        false,
    settlementRange:  '$3,000–$250,000+',
    timeToSettle:     '12–24 months',
    commonInjuries:   ['Trip and fall injuries', 'Fall from height', 'Pool/water injuries', 'Inadequate security injuries', 'Environmental hazards'],
    commonCities:     ['detroit', 'ann-arbor', 'warren'],
    legalBasis:       'Michigan premises liability law (negligence + duty of care)',
    relatedCaseTypes: ['slip-and-fall', 'personal-injury', 'workplace-injury'],
  },
  {
    slug:             'other',
    title:            'Other Case Types',
    shortTitle:       'Other Cases',
    description:      'Have a personal injury case that doesn\'t fit the categories above? Call us at (888) 500-0050 — we evaluate all MI personal injury matters.',
    heroTagline:      'Other Personal Injury Cases — Michigan Pre-Settlement Funding',
    copySnippet:      'If your personal injury case doesn\'t fit our listed categories, don\'t worry. We evaluate every Michigan personal injury claim individually. Call us or apply online—we\'re happy to discuss your specific situation.',
    fullDescription:  'Our 13 specific case categories cover the most common personal injury claims. But personal injury law is broad. If you have a personal injury case that doesn\'t fit the above categories—perhaps an animal bite, a product liability injury, aviation accident, or another matter—we still want to hear from you. Call us at (888) 500-0050 or apply online. We evaluate every Michigan personal injury claim on its merits and work with you to find a funding solution.',
    isPrimary:        false,
    settlementRange:  'Varies',
    timeToSettle:     '12–36 months',
    commonInjuries:   ['Varies by case'],
    commonCities:     ['detroit', 'ann-arbor', 'traverse-city'],
    legalBasis:       'Michigan tort law (negligence)',
    relatedCaseTypes: ['personal-injury', 'slip-and-fall', 'premises-liability'],
  },
]

// ─── Helper functions ─────────────────────────────────────────────────────────

export function getCaseTypeBySlug(slug: string): CaseTypeDetail | undefined {
  return CASE_TYPES.find((ct) => ct.slug === slug)
}

export function caseTypePath(slug: CaseTypeSlug): string {
  return `/case-types/${slug}`
}
