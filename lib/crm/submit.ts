import type { FullApplyFormData } from '@/types'

// ─── CRM Payload ─────────────────────────────────────────────────────────────

export interface CRMPayload {
  // Contact
  firstName:     string
  lastName:      string
  email:         string
  phone:         string
  // Case
  caseType:      string
  incidentDate:  string
  hasActiveLawsuit: boolean
  incidentDescription: string
  injuryDescription:   string
  hospitalized:        boolean
  treatmentOngoing:    boolean
  // Attorney
  hasAttorney:       boolean
  attorneyFirstName: string
  attorneyLastName:  string
  attorneyFirm:      string
  attorneyPhone:     string
  attorneyEmail?:    string
  // Location
  streetAddress?: string
  city:           string
  state:          string
  zipCode:        string
  // Meta
  urgency?:       string
  heardAboutUs?:  string
  submittedAt:    string
  source:         string
}

export interface CRMResponse {
  success: boolean
  leadId?: string
  error?:  string
}

// ─── Field Mapping ────────────────────────────────────────────────────────────

function mapLeadToCRM(data: FullApplyFormData): CRMPayload {
  return {
    firstName:           data.firstName,
    lastName:            data.lastName,
    email:               data.email,
    phone:               data.phone,
    caseType:            data.caseType,
    incidentDate:        data.incidentDate,
    hasActiveLawsuit:    data.hasActiveLawsuit,
    incidentDescription: data.incidentDescription,
    injuryDescription:   data.injuryDescription,
    hospitalized:        data.hospitalized,
    treatmentOngoing:    data.treatmentOngoing,
    hasAttorney:         data.hasAttorney,
    attorneyFirstName:   data.attorneyFirstName,
    attorneyLastName:    data.attorneyLastName,
    attorneyFirm:        data.attorneyFirm,
    attorneyPhone:       data.attorneyPhone,
    attorneyEmail:       data.attorneyEmail,
    streetAddress:       data.streetAddress,
    city:                data.city,
    state:               'MI', // always Michigan
    zipCode:             data.zipCode,
    urgency:             data.urgency,
    heardAboutUs:        data.heardAboutUs,
    submittedAt:         new Date().toISOString(),
    source:              '5000tomorrow.com',
  }
}

// ─── Submit to CRM Webhook ────────────────────────────────────────────────────

export async function submitToCRM(data: FullApplyFormData): Promise<CRMResponse> {
  const webhookUrl = process.env.CRM_WEBHOOK_URL

  if (!webhookUrl) {
    console.warn('[CRM] CRM_WEBHOOK_URL not configured — skipping CRM submission')
    return { success: true, leadId: `local_${Date.now()}` }
  }

  const payload = mapLeadToCRM(data)

  const response = await fetch(webhookUrl, {
    method:  'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${process.env.CRM_API_KEY ?? ''}`,
      'X-Source':      '5000tomorrow.com',
    },
    body: JSON.stringify(payload),
    // Vercel Edge: 10s timeout on serverless; increase if CRM is slow
    signal: AbortSignal.timeout(8000),
  })

  if (!response.ok) {
    const body = await response.text().catch(() => '')
    throw new Error(`CRM webhook returned ${response.status}: ${body}`)
  }

  const result = await response.json().catch(() => ({})) as Record<string, unknown>

  return {
    success: true,
    leadId:  typeof result.id === 'string' ? result.id
           : typeof result.leadId === 'string' ? result.leadId
           : undefined,
  }
}
