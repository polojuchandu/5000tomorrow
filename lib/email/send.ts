import React from 'react'
import { Resend } from 'resend'
import { 
  ApplyConfirmationEmail, 
  ContactConfirmationEmail, 
  AttorneyReferralConfirmationEmail,
  TeamApplyNotificationEmail,
  TeamContactNotificationEmail,
  TeamAttorneyReferralNotificationEmail,
} from './templates'

// ─── Resend Configuration ──────────────────────────────────────────────────────

const RESEND_API_KEY = process.env.RESEND_API_KEY
const FROM_EMAIL = process.env.CONFIRM_FROM_EMAIL || 'no-reply@5000tomorrow.com'

// Log configuration status on module load
if (typeof process !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('[Email] Configuration check:')
  console.log(`  - RESEND_API_KEY configured: ${!!RESEND_API_KEY}`)
  console.log(`  - FROM_EMAIL: ${FROM_EMAIL}`)
}

const resend = new Resend(RESEND_API_KEY)

export async function sendApplyConfirmation(
  email: string,
  firstName: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!RESEND_API_KEY) {
      const msg = 'RESEND_API_KEY not configured - check .env.local'
      console.error('[Email/Apply]', msg)
      return { success: false, error: msg }
    }

    console.log(`[Email/Apply] Sending confirmation to ${email}...`)
    console.log(`[Email/Apply] Using FROM_EMAIL: "${FROM_EMAIL}"`)
    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "We received your application — 5000 Tomorrow",
      react: ApplyConfirmationEmail({ firstName }),
    })
    
    const emailId = response.data?.id
    if (response.error) {
      console.error(`[Email/Apply] Response error:`, response.error)
      return { success: false, error: String(response.error) }
    }
    
    console.log(`[Email/Apply] ✅ Email sent successfully (ID: ${emailId})`)
    console.log(`[Email/Apply] Full response:`, JSON.stringify(response, null, 2))
    return { success: true }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to send email'
    console.error('[Email/Apply] ❌ Error:', {
      error: message,
      email,
      firstName,
      hasApiKey: !!RESEND_API_KEY,
    })
    return { success: false, error: message }
  }
}

export async function sendContactConfirmation(
  email: string,
  name: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!RESEND_API_KEY) {
      const msg = 'RESEND_API_KEY not configured - check .env.local'
      console.error('[Email/Contact]', msg)
      return { success: false, error: msg }
    }

    console.log(`[Email/Contact] Sending confirmation to ${email}...`)
    console.log(`[Email/Contact] Using FROM_EMAIL: "${FROM_EMAIL}"`)
    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "We received your message — 5000 Tomorrow",
      react: ContactConfirmationEmail({ name }),
    })
    
    const emailId = response.data?.id
    if (response.error) {
      console.error(`[Email/Contact] Response error:`, response.error)
      return { success: false, error: String(response.error) }
    }
    
    console.log(`[Email/Contact] ✅ Email sent successfully (ID: ${emailId})`)
    console.log(`[Email/Contact] Full response:`, JSON.stringify(response, null, 2))
    return { success: true }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to send email'
    console.error('[Email/Contact] ❌ Error:', {
      error: message,
      email,
      name,
      hasApiKey: !!RESEND_API_KEY,
    })
    return { success: false, error: message }
  }
}

export async function sendAttorneyReferralConfirmation(
  email: string,
  attorneyName: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!RESEND_API_KEY) {
      const msg = 'RESEND_API_KEY not configured - check .env.local'
      console.error('[Email/Attorney]', msg)
      return { success: false, error: msg }
    }

    console.log(`[Email/Attorney] Sending confirmation to ${email}...`)
    console.log(`[Email/Attorney] Using FROM_EMAIL: "${FROM_EMAIL}"`)
    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Referral received — 5000 Tomorrow Attorney Program",
      react: AttorneyReferralConfirmationEmail({ attorneyName }),
    })
    
    const emailId = response.data?.id
    if (response.error) {
      console.error(`[Email/Attorney] Response error:`, response.error)
      return { success: false, error: String(response.error) }
    }
    
    console.log(`[Email/Attorney] ✅ Email sent successfully (ID: ${emailId})`)
    console.log(`[Email/Attorney] Full response:`, JSON.stringify(response, null, 2))
    return { success: true }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to send email'
    console.error('[Email/Attorney] ❌ Error:', {
      error: message,
      email,
      attorneyName,
      hasApiKey: !!RESEND_API_KEY,
    })
    return { success: false, error: message }
  }
}

/**
 * Send team notification for new submission
 */
export async function notifyTeamOfSubmission(
  formType: 'apply' | 'contact' | 'attorney-referral',
  data: Record<string, unknown>
): Promise<{ success: boolean; error?: string }> {
  const notifyEmail = process.env.NOTIFY_EMAIL
  if (!notifyEmail) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Email/Team] NOTIFY_EMAIL not configured - skipping team notification')
    }
    return { success: true }
  }

  try {
    if (!RESEND_API_KEY) {
      const msg = 'RESEND_API_KEY not configured - check .env.local'
      console.error('[Email/Team]', msg)
      return { success: false, error: msg }
    }

    const subject = {
      apply: '📋 New Application Submitted',
      contact: '💬 New Contact Message',
      'attorney-referral': '⚖️ New Attorney Referral',
    }[formType]

    // Get the template for this form type
    let template: React.ReactElement
    if (formType === 'apply') {
      template = TeamApplyNotificationEmail(data)
    } else if (formType === 'contact') {
      template = TeamContactNotificationEmail(data)
    } else {
      template = TeamAttorneyReferralNotificationEmail(data)
    }

    console.log(`[Email/Team] Sending ${formType} notification to ${notifyEmail}...`)
    console.log(`[Email/Team] Using FROM_EMAIL: "${FROM_EMAIL}"`)
    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: notifyEmail,
      subject: `${subject} - 5000 Tomorrow`,
      react: template,
    })

    const emailId = response.data?.id
    if (response.error) {
      console.error(`[Email/Team] Response error:`, response.error)
      return { success: false, error: String(response.error) }
    }

    console.log(`[Email/Team] ✅ Team notification sent successfully (ID: ${emailId})`)
    console.log(`[Email/Team] Full response:`, JSON.stringify(response, null, 2))
    return { success: true }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to send notification'
    console.error('[Email/Team] ❌ Error:', {
      error: message,
      formType,
      notifyEmail,
      hasApiKey: !!RESEND_API_KEY,
    })
    return { success: false, error: message }
  }
}
