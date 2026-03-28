import { z } from 'zod'

// ─── Shared validators ────────────────────────────────────────────────────────

const phoneValidator = z
  .string()
  .min(1, 'Phone number is required')
  .refine(
    (v) => v.replace(/\D/g, '').length === 10,
    'Please enter a valid 10-digit phone number',
  )

const isMichiganZip = (zip: string) => {
  const n = parseInt(zip, 10)
  return n >= 48001 && n <= 49971
}

// ─── Case type catalogue (single source of truth) ─────────────────────────────

export const CASE_TYPE_OPTIONS = [
  { value: 'car-accident',         label: 'Car / Auto Accident',         isPrimary: true  },
  { value: 'truck-accident',       label: 'Truck Accident',              isPrimary: true  },
  { value: 'motorcycle-accident',  label: 'Motorcycle Accident',         isPrimary: true  },
  { value: 'pedestrian-accident',  label: 'Pedestrian Accident',         isPrimary: true  },
  { value: 'rideshare-accident',   label: 'Rideshare (Uber / Lyft)',      isPrimary: true  },
  { value: 'hit-and-run',          label: 'Hit & Run',                   isPrimary: true  },
  { value: 'bicycle-accident',     label: 'Bicycle Accident',            isPrimary: true  },
  { value: 'workers-compensation', label: "Workers' Compensation",       isPrimary: false },
  { value: 'slip-and-fall',        label: 'Slip & Fall',                 isPrimary: false },
  { value: 'workplace-injury',     label: 'Workplace Injury',            isPrimary: false },
  { value: 'wrongful-death',       label: 'Wrongful Death',              isPrimary: false },
  { value: 'personal-injury',      label: 'Personal Injury (General)',   isPrimary: false },
  { value: 'premises-liability',   label: 'Premises Liability',          isPrimary: false },
  { value: 'other',                label: 'Other / Not Listed',          isPrimary: false },
] as const

export type CaseTypeValue = (typeof CASE_TYPE_OPTIONS)[number]['value']

const CASE_TYPE_VALUES = CASE_TYPE_OPTIONS.map((o) => o.value) as [
  CaseTypeValue,
  ...CaseTypeValue[],
]

// ─── Step 1: Case Type ────────────────────────────────────────────────────────

export const step1Schema = z.object({
  caseType: z.enum(CASE_TYPE_VALUES).refine(
    (v) => v !== undefined,
    'Please select your case type',
  ),
  incidentDate: z
    .string()
    .min(1, 'Incident date is required')
    .refine((v) => {
      const d = new Date(v)
      return !isNaN(d.getTime())
    }, 'Please enter a valid date')
    .refine((v) => new Date(v) <= new Date(), 'Date cannot be in the future'),
  hasActiveLawsuit: z.boolean(),
})

export type Step1Data = z.infer<typeof step1Schema>

// ─── Step 2: Injury Details ───────────────────────────────────────────────────

export const step2Schema = z.object({
  incidentDescription: z
    .string()
    .trim()
    .min(20, 'Please provide at least 20 characters describing what happened')
    .max(1000, 'Description too long (max 1,000 characters)'),
  injuryDescription: z
    .string()
    .trim()
    .min(10, 'Please describe your injuries (at least 10 characters)')
    .max(500, 'Description too long (max 500 characters)'),
  hospitalized: z.boolean(),
  treatmentOngoing: z.boolean(),
})

export type Step2Data = z.infer<typeof step2Schema>

// ─── Step 3: Attorney Info ────────────────────────────────────────────────────

export const step3Schema = z
  .object({
    hasAttorney:       z.boolean(),
    attorneyFirstName: z.string().trim().max(60).optional(),
    attorneyLastName:  z.string().trim().max(60).optional(),
    attorneyFirm:      z.string().trim().max(120).optional(),
    attorneyPhone:     z.string().trim().optional(),
    attorneyEmail:     z.string().trim().max(120).optional(),
  })
  .superRefine((data, ctx) => {
    // Attorney is a hard requirement — block at schema level
    if (!data.hasAttorney) {
      ctx.addIssue({
        code:    'custom',
        path:    ['hasAttorney'],
        message: 'You must have a licensed Michigan attorney to qualify for pre-settlement funding.',
      })
      return
    }
    if (!data.attorneyFirstName?.trim()) {
      ctx.addIssue({ code: 'custom', path: ['attorneyFirstName'], message: "Attorney's first name is required" })
    }
    if (!data.attorneyLastName?.trim()) {
      ctx.addIssue({ code: 'custom', path: ['attorneyLastName'], message: "Attorney's last name is required" })
    }
    if (!data.attorneyFirm?.trim()) {
      ctx.addIssue({ code: 'custom', path: ['attorneyFirm'], message: 'Law firm name is required' })
    }
    if (!data.attorneyPhone || data.attorneyPhone.replace(/\D/g, '').length !== 10) {
      ctx.addIssue({ code: 'custom', path: ['attorneyPhone'], message: 'Enter a valid 10-digit phone number' })
    }
    if (data.attorneyEmail && data.attorneyEmail.trim() !== '') {
      const emailResult = z.string().email().safeParse(data.attorneyEmail)
      if (!emailResult.success) {
        ctx.addIssue({ code: 'custom', path: ['attorneyEmail'], message: 'Invalid email address' })
      }
    }
  })

export type Step3Data = z.infer<typeof step3Schema>

// ─── Step 4: Contact Info ─────────────────────────────────────────────────────

export const step4Schema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'First name is required')
    .max(60, 'First name must be 60 characters or less'),
  lastName: z
    .string()
    .trim()
    .min(1, 'Last name is required')
    .max(60, 'Last name must be 60 characters or less'),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(255, 'Email is too long'),
  phone: phoneValidator,
  streetAddress: z.string().trim().max(120).optional(),
  city: z
    .string()
    .trim()
    .min(1, 'City is required')
    .max(80, 'City must be 80 characters or less'),
  zipCode: z
    .string()
    .regex(/^\d{5}$/, 'Enter a 5-digit ZIP code')
    .refine(isMichiganZip, 'Must be a Michigan ZIP code (48001–49971)'),
  state: z.literal('MI'),
  urgency: z
    .enum(['immediately', 'within-a-week', 'within-a-month'])
    .optional(),
  heardAboutUs: z.string().trim().max(200).optional(),
})

export type Step4Data = z.infer<typeof step4Schema>

// ─── Step 5: Review & Submit ─────────────────────────────────────────────────

export const step5Schema = z.object({
  agreeToTerms: z.literal(true).refine(
    (v) => v === true,
    'You must agree to the terms to submit your application',
  ),
})

export type Step5Data = z.infer<typeof step5Schema>

// ─── Full form schema (used by API route) ────────────────────────────────────

export const fullApplySchema = step1Schema
  .merge(step2Schema)
  .merge(
    // Flatten step3 — merge drops the superRefine; re-validate key fields
    z.object({
      hasAttorney:       z.literal(true).refine((v) => v === true, 'Attorney required'),
      attorneyFirstName: z.string().min(1, 'Required').max(60),
      attorneyLastName:  z.string().min(1, 'Required').max(60),
      attorneyFirm:      z.string().min(1, 'Required').max(120),
      attorneyPhone:     phoneValidator,
      attorneyEmail:     z.union([z.string().email(), z.literal('')]).optional()
        .transform((v) => v === '' ? undefined : v),
    }),
  )
  .merge(step4Schema)
  .merge(step5Schema)

export type FullApplyFormData = z.infer<typeof fullApplySchema>
