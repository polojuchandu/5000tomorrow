import { z } from 'zod'

export const ESTIMATED_SETTLEMENT_OPTIONS = [
  { value: 'under-10k',   label: 'Under $10,000'          },
  { value: '10k-50k',     label: '$10,000 – $50,000'      },
  { value: '50k-100k',    label: '$50,000 – $100,000'     },
  { value: '100k-250k',   label: '$100,000 – $250,000'    },
  { value: '250k-plus',   label: '$250,000+'               },
  { value: 'unknown',     label: 'Unknown / Too early'    },
] as const

export type EstimatedSettlement = (typeof ESTIMATED_SETTLEMENT_OPTIONS)[number]['value']

const phoneValidator = z
  .string()
  .min(1, 'Phone number is required')
  .refine(
    (v) => v.replace(/\D/g, '').length === 10,
    'Please enter a valid 10-digit phone number',
  )

export const attorneyReferralSchema = z.object({
  // ── Attorney information ──────────────────────────────────────────────────
  attorneyFirstName: z.string().min(1, 'First name is required').max(60),
  attorneyLastName:  z.string().min(1, 'Last name is required').max(60),
  firmName:          z.string().min(1, 'Firm name is required').max(120),
  barNumber:         z.string().max(20).optional(),
  licenseState:      z.literal('MI'),
  attorneyPhone:     phoneValidator,
  attorneyEmail:     z.string().email('Valid email required'),

  // ── Client information ────────────────────────────────────────────────────
  clientFirstName:   z.string().min(1, 'Client first name is required').max(60),
  clientLastName:    z.string().min(1, 'Client last name is required').max(60),
  clientPhone:       phoneValidator,
  clientEmail:       z.string().email('Valid email required').optional(),

  // ── Case details ──────────────────────────────────────────────────────────
  caseType:              z.string().min(1, 'Please select a case type'),
  estimatedSettlement:   z.enum(
    ESTIMATED_SETTLEMENT_OPTIONS.map((o) => o.value) as [EstimatedSettlement, ...EstimatedSettlement[]],
  ).optional(),
  notes:                 z.string().max(1000, 'Notes too long (max 1,000 characters)').optional(),

  // ── Consent ───────────────────────────────────────────────────────────────
  agreeToTerms: z.boolean(),
}).superRefine((data, ctx) => {
  if (data.licenseState !== 'MI') {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['licenseState'],
      message: 'Must be a licensed Michigan attorney',
    })
  }
  if (data.agreeToTerms !== true) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['agreeToTerms'],
      message: 'You must confirm your agreement to submit a referral',
    })
  }
})

export type AttorneyReferralFormData = z.infer<typeof attorneyReferralSchema>
