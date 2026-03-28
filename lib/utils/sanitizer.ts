/**
 * Input sanitization utilities to prevent XSS and injection attacks
 */

/**
 * Sanitize a string value
 * - Trims whitespace
 * - Removes HTML/script tags
 * - Escapes dangerous characters
 */
export function sanitizeString(value: unknown, maxLength?: number): string {
  if (typeof value !== 'string') {
    return ''
  }

  // Trim whitespace
  let sanitized = value.trim()

  // Remove HTML/script tags and dangerous characters
  sanitized = sanitized
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/<[^>]+>/g, '')  // Remove all HTML tags
    .replace(/[<>]/g, '')     // Remove angle brackets

  // Limit length if specified
  if (maxLength && sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength)
  }

  return sanitized
}

/**
 * Sanitize a phone number
 * - Removes non-numeric characters
 * - Takes first 20 digits (in case of long input)
 */
export function sanitizePhone(value: unknown): string {
  if (typeof value !== 'string') {
    return ''
  }
  return value.replace(/\D/g, '').substring(0, 20)
}

/**
 * Sanitize an email address
 * - Trims whitespace
 * - Lowercases
 * - Basic validation characters
 */
export function sanitizeEmail(value: unknown): string {
  if (typeof value !== 'string') {
    return ''
  }

  let email = value.trim().toLowerCase()

  // Remove any tags or dangerous characters
  email = email.replace(/<[^>]*>/g, '')

  // Limit length
  if (email.length > 255) {
    email = email.substring(0, 255)
  }

  return email
}

/**
 * Sanitize all fields in an object recursively
 */
export function sanitizeObject(
  obj: Record<string, unknown>,
  schema?: Record<string, 'string' | 'email' | 'phone' | 'number' | 'boolean'>
): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(obj)) {
    const fieldType = schema?.[key]

    if (fieldType === 'email') {
      sanitized[key] = sanitizeEmail(value)
    } else if (fieldType === 'phone') {
      sanitized[key] = sanitizePhone(value)
    } else if (fieldType === 'string') {
      sanitized[key] = sanitizeString(value, 2000)
    } else if (fieldType === 'number') {
      sanitized[key] = typeof value === 'number' ? value : null
    } else if (fieldType === 'boolean') {
      sanitized[key] = typeof value === 'boolean' ? value : false
    } else if (typeof value === 'string') {
      // Default: sanitize strings
      sanitized[key] = sanitizeString(value)
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      // Pass through safe types
      sanitized[key] = value
    } else if (value === null || value === undefined) {
      sanitized[key] = value
    } else if (typeof value === 'object' && !Array.isArray(value)) {
      // Recursively sanitize nested objects
      sanitized[key] = sanitizeObject(value as Record<string, unknown>, schema)
    } else if (Array.isArray(value)) {
      // Sanitize arrays of strings
      sanitized[key] = value.map((item) =>
        typeof item === 'string' ? sanitizeString(item) : item
      )
    }
  }

  return sanitized
}

/**
 * Sanitization schema for each form type
 */
export const SANITIZATION_SCHEMAS = {
  apply: {
    firstName: 'string',
    lastName: 'string',
    email: 'email',
    phone: 'phone',
    streetAddress: 'string',
    city: 'string',
    zipCode: 'string',
    state: 'string',
    caseType: 'string',
    incidentDate: 'string',
    hasActiveLawsuit: 'boolean',
    incidentDescription: 'string',
    injuryDescription: 'string',
    hospitalized: 'boolean',
    treatmentOngoing: 'boolean',
    hasAttorney: 'boolean',
    attorneyFirstName: 'string',
    attorneyLastName: 'string',
    attorneyFirm: 'string',
    attorneyPhone: 'phone',
    attorneyEmail: 'email',
    urgency: 'string',
    heardAboutUs: 'string',
    agreeToTerms: 'boolean',
  },
  contact: {
    firstName: 'string',
    lastName: 'string',
    email: 'email',
    phone: 'phone',
    subject: 'string',
    message: 'string',
  },
  'attorney-referral': {
    attorneyFirstName: 'string',
    attorneyLastName: 'string',
    firmName: 'string',
    barNumber: 'string',
    licenseState: 'string',
    attorneyPhone: 'phone',
    attorneyEmail: 'email',
    clientFirstName: 'string',
    clientLastName: 'string',
    clientPhone: 'phone',
    clientEmail: 'email',
    caseType: 'string',
    estimatedSettlement: 'string',
    notes: 'string',
    agreeToTerms: 'boolean',
  },
} as const
