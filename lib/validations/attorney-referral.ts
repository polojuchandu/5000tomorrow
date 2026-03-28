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
  attorneyFirstName: z.string().trim().min(1, 'First name is required').max(60, 'First name must be 60 characters or less'),
  attorneyLastName:  z.string().trim().min(1, 'Last name is required').max(60, 'Last name must be 60 characters or less'),
  firmName:          z.string().trim().min(1, 'Firm name is required').max(120, 'Firm name must be 120 characters or less'),
  barNumber:         z.string().trim().max(20, 'Bar number must be 20 characters or less').optional(),
  licenseState:      z.literal('MI').refine(
    (v) => v === 'MI',
    'Must be a licensed Michigan attorney',
  ),
  attorneyPhone:     phoneValidator,
  attorneyEmail:     z.string().trim().email('Valid email required').max(255, 'Email is too long'),

  // ── Client information ────────────────────────────────────────────────────
  clientFirstName:   z.string().trim().min(1, 'Client first name is required').max(60, 'Client first name must be 60 characters or less'),
  clientLastName:    z.string().trim().min(1, 'Client last name is required').max(60, 'Client last name must be 60 characters or less'),
  clientPhone:       phoneValidator,
  clientEmail:       z.string().trim().email('Invalid email').max(255, 'Email is too long').optional(),

  // ── Case details ──────────────────────────────────────────────────────────
  caseType:              z.string().trim().min(1, 'Please select a case type'),
  estimatedSettlement:   z.enum(
    ESTIMATED_SETTLEMENT_OPTIONS.map((o) => o.value) as [EstimatedSettlement, ...EstimatedSettlement[]],
  ).optional(),
  notes:                 z.string().trim().max(1000, 'Notes too long (max 1,000 characters)').optional(),

  // ── Consent ───────────────────────────────────────────────────────────────
  agreeToTerms: z.literal(true).refine(
    (v) => v === true,
    'You must confirm your agreement to submit a referral',
  ),
})

export type AttorneyReferralFormData = z.infer<typeof attorneyReferralSchema>
