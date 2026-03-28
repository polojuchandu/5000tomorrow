import { z } from 'zod'

export const CONTACT_SUBJECTS = [
  { value: 'general',     label: 'General Question'         },
  { value: 'application', label: 'My Application Status'    },
  { value: 'attorney',    label: 'Attorney / Referral'      },
  { value: 'status',      label: 'Check Case Status'        },
  { value: 'complaint',   label: 'Complaint or Concern'     },
  { value: 'other',       label: 'Other'                    },
] as const

export type ContactSubject = (typeof CONTACT_SUBJECTS)[number]['value']

export const contactSchema = z.object({
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
  phone: z
    .string()
    .trim()
    .optional()
    .refine(
      (v) => !v || v.replace(/\D/g, '').length === 10,
      'Please enter a valid 10-digit phone number',
    ),
  subject: z.enum(
    CONTACT_SUBJECTS.map((s) => s.value) as [ContactSubject, ...ContactSubject[]],
  ).refine((v) => v !== undefined, 'Please select a subject'),
  message: z
    .string()
    .trim()
    .min(10, 'Please provide a message (at least 10 characters)')
    .max(2000, 'Message is too long (max 2,000 characters)'),
})

export type ContactFormData = z.infer<typeof contactSchema>
