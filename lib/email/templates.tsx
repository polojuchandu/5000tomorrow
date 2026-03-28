import React from 'react'

const baseStyles = {
  container: { fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#f8fafc', padding: '20px' },
  wrapper: { maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
  header: { background: 'linear-gradient(135deg, #0A1628 0%, #1a2942 100%)', padding: '40px 30px', color: '#ffffff', textAlign: 'center' as const },
  headerMark: { fontSize: '32px', marginBottom: '12px', fontWeight: 'bold' },
  headerTitle: { fontSize: '28px', fontWeight: 'bold', margin: '0 0 4px', letterSpacing: '-0.5px' },
  headerSubtitle: { fontSize: '14px', color: 'rgba(255,255,255,0.7)', margin: '0' },
  content: { padding: '40px 30px' },
  button: { display: 'inline-block', backgroundColor: '#C9A84C', color: '#0A1628', padding: '14px 32px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '15px', marginTop: '12px', transition: 'background-color 0.3s' },
  section: { marginBottom: '28px' },
  sectionTitle: { fontSize: '16px', fontWeight: 'bold', color: '#0A1628', marginBottom: '12px', paddingBottom: '8px', borderBottom: '2px solid #C9A84C' },
  listItem: { fontSize: '14px', lineHeight: '1.8', margin: '8px 0', paddingLeft: '20px', color: '#475569', position: 'relative' as const },
  listMarker: { position: 'absolute' as const, left: '0', color: '#C9A84C', fontWeight: 'bold' },
  footer: { padding: '30px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0', textAlign: 'center' as const, fontSize: '12px', color: '#64748b' },
  footerLinks: { marginTop: '16px', lineHeight: '1.8' },
  footerLink: { color: '#0A1628', textDecoration: 'none', fontWeight: 'bold' },
}

export function ApplyConfirmationEmail({ firstName }: { firstName: string }) {
  return (
    <div style={baseStyles.container}>
      <div style={baseStyles.wrapper}>
        {/* Header */}
        <div style={baseStyles.header}>
          <div style={baseStyles.headerMark}>✓</div>
          <h1 style={baseStyles.headerTitle}>Application Received</h1>
          <p style={baseStyles.headerSubtitle}>5000 Tomorrow Pre-Settlement Funding</p>
        </div>

        {/* Main Content */}
        <div style={baseStyles.content}>
          <p style={{ fontSize: '16px', lineHeight: '1.6', margin: '0 0 24px' }}>
            Hi {firstName},
          </p>

          <p style={{ fontSize: '15px', lineHeight: '1.7', margin: '0 0 24px', color: '#0A1628' }}>
            Great news! We've successfully received your pre-settlement funding application. Our team is now reviewing your case details to determine your eligibility.
          </p>

          {/* What Happens Next Section */}
          <div style={baseStyles.section}>
            <h2 style={baseStyles.sectionTitle}>📋 What Happens Next</h2>
            <div style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
              <div style={baseStyles.listItem}>
                <span style={baseStyles.listMarker}>1.</span>
                <strong>Case Review</strong> — Our underwriting team reviews your application (24-48 hours)
              </div>
              <div style={baseStyles.listItem}>
                <span style={baseStyles.listMarker}>2.</span>
                <strong>Attorney Contact</strong> — We reach out to your attorney for case details
              </div>
              <div style={baseStyles.listItem}>
                <span style={baseStyles.listMarker}>3.</span>
                <strong>Settlement Demand</strong> — We request a settlement demand letter
              </div>
              <div style={baseStyles.listItem}>
                <span style={baseStyles.listMarker}>4.</span>
                <strong>Approval & Funding</strong> — If approved, funds arrive in 24-48 hours
              </div>
            </div>
          </div>

          {/* Key Info Section */}
          <div style={baseStyles.section}>
            <h2 style={baseStyles.sectionTitle}>⚡ Important Details</h2>
            <ul style={{ fontSize: '14px', lineHeight: '1.8', margin: '0', paddingLeft: '20px', color: '#475569' }}>
              <li>✓ Pre-settlement funding is NOT a loan</li>
              <li>✓ Repayment is non-recourse (only if you win/settle)</li>
              <li>✓ No monthly payments or interest</li>
              <li>✓ For Michigan residents and licensed attorneys only</li>
            </ul>
          </div>

          {/* Help Section */}
          <div style={baseStyles.section}>
            <h2 style={baseStyles.sectionTitle}>🤝 Need Help?</h2>
            <p style={{ fontSize: '14px', lineHeight: '1.7', margin: '0 0 16px', color: '#475569' }}>
              Have questions about your application? Our team is here to help.
            </p>
            <p style={{ fontSize: '15px', margin: '0', color: '#0A1628' }}>
              <strong>📞 Call us:</strong> 1-877-863-2955<br />
              <strong>⏰ Hours:</strong> Monday–Friday, 8 AM–6 PM ET<br />
              <strong>🌐 Visit:</strong> <a href="https://www.5000tomorrow.com" style={baseStyles.footerLink}>www.5000tomorrow.com</a>
            </p>
          </div>

          {/* CTA Buttons */}
          <div style={{ textAlign: 'center' as const, marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #e2e8f0' }}>
            <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 16px' }}>Need to make changes? Review or update your application:</p>
            <a href="https://www.5000tomorrow.com/apply" style={baseStyles.button}>Review Your Application</a>
          </div>
        </div>

        {/* Footer */}
        <div style={baseStyles.footer}>
          <p style={{ margin: '0 0 12px', fontWeight: 'bold', color: '#0A1628' }}>5000 Tomorrow</p>
          <p style={{ margin: '0 0 16px', color: '#64748b' }}>
            28588 Northwestern Hwy, Southfield, MI 48034
          </p>
          <div style={baseStyles.footerLinks}>
            <a href="https://www.5000tomorrow.com" style={baseStyles.footerLink}>Home</a> • 
            <a href="https://www.5000tomorrow.com/how-it-works" style={baseStyles.footerLink}> How it Works</a> • 
            <a href="https://www.5000tomorrow.com/faq" style={baseStyles.footerLink}> FAQ</a> • 
            <a href="https://www.5000tomorrow.com/contact" style={baseStyles.footerLink}> Contact</a>
          </div>
          <p style={{ margin: '16px 0 0', color: '#94a3b8', fontSize: '11px' }}>
            © 2026 5000 Tomorrow. All rights reserved. This is not a loan.
          </p>
        </div>
      </div>
    </div>
  )
}

export function ContactConfirmationEmail({ name }: { name: string }) {
  return (
    <div style={baseStyles.container}>
      <div style={baseStyles.wrapper}>
        {/* Header */}
        <div style={baseStyles.header}>
          <div style={baseStyles.headerMark}>✓</div>
          <h1 style={baseStyles.headerTitle}>Message Received</h1>
          <p style={baseStyles.headerSubtitle}>We'll be in touch soon</p>
        </div>

        {/* Main Content */}
        <div style={baseStyles.content}>
          <p style={{ fontSize: '16px', lineHeight: '1.6', margin: '0 0 24px' }}>
            Hi {name},
          </p>

          <p style={{ fontSize: '15px', lineHeight: '1.7', margin: '0 0 24px', color: '#0A1628' }}>
            Thank you for reaching out to 5000 Tomorrow! We've received your message and appreciate you taking the time to contact us. Our team is reviewing your inquiry and will respond as soon as possible.
          </p>

          {/* Response Time Section */}
          <div style={baseStyles.section}>
            <h2 style={baseStyles.sectionTitle}>⏱️ Expected Response Time</h2>
            <p style={{ fontSize: '14px', lineHeight: '1.7', margin: '0', color: '#475569' }}>
              We typically respond to inquiries within <strong>1 hour</strong> on business days (Monday–Friday, 8 AM–6 PM ET).
            </p>
          </div>

          {/* If Urgent Section */}
          <div style={baseStyles.section}>
            <h2 style={baseStyles.sectionTitle}>⚡ Need Help Right Away?</h2>
            <p style={{ fontSize: '14px', lineHeight: '1.7', margin: '0 0 12px', color: '#475569' }}>
              For urgent matters, please call us directly:
            </p>
            <p style={{ fontSize: '15px', fontWeight: 'bold', color: '#0A1628', margin: '0' }}>
              📞 1-877-863-2955
            </p>
          </div>

          {/* How We Can Help Section */}
          <div style={baseStyles.section}>
            <h2 style={baseStyles.sectionTitle}>🤝 How We Can Help</h2>
            <div style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
              <div style={baseStyles.listItem}>
                <span style={baseStyles.listMarker}>→</span>
                <strong>Pre-Settlement Funding</strong> — Get cash advances on pending settlements
              </div>
              <div style={baseStyles.listItem}>
                <span style={baseStyles.listMarker}>→</span>
                <strong>Case Evaluation</strong> — Free evaluation of your personal injury case
              </div>
              <div style={baseStyles.listItem}>
                <span style={baseStyles.listMarker}>→</span>
                <strong>Fast Approval</strong> — Usually approved within 24-48 hours
              </div>
              <div style={baseStyles.listItem}>
                <span style={baseStyles.listMarker}>→</span>
                <strong>Attorney Referrals</strong> — We can help connect you with our attorney network
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div style={{ textAlign: 'center' as const, marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #e2e8f0' }}>
            <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 16px' }}>Ready to move forward? Apply for funding now:</p>
            <a href="https://www.5000tomorrow.com/apply" style={baseStyles.button}>Apply for Funding</a>
          </div>
        </div>

        {/* Footer */}
        <div style={baseStyles.footer}>
          <p style={{ margin: '0 0 12px', fontWeight: 'bold', color: '#0A1628' }}>5000 Tomorrow</p>
          <p style={{ margin: '0 0 16px', color: '#64748b' }}>
            28588 Northwestern Hwy, Southfield, MI 48034
          </p>
          <div style={baseStyles.footerLinks}>
            <a href="https://www.5000tomorrow.com" style={baseStyles.footerLink}>Home</a> • 
            <a href="https://www.5000tomorrow.com/how-it-works" style={baseStyles.footerLink}> How it Works</a> • 
            <a href="https://www.5000tomorrow.com/faq" style={baseStyles.footerLink}> FAQ</a> • 
            <a href="https://www.5000tomorrow.com/apply" style={baseStyles.footerLink}> Apply</a>
          </div>
          <p style={{ margin: '16px 0 0', color: '#94a3b8', fontSize: '11px' }}>
            © 2026 5000 Tomorrow. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

export function AttorneyReferralConfirmationEmail({ attorneyName }: { attorneyName: string }) {
  return (
    <div style={baseStyles.container}>
      <div style={baseStyles.wrapper}>
        {/* Header */}
        <div style={baseStyles.header}>
          <div style={baseStyles.headerMark}>✓</div>
          <h1 style={baseStyles.headerTitle}>Referral Confirmed</h1>
          <p style={baseStyles.headerSubtitle}>Attorney Referral Program</p>
        </div>

        {/* Main Content */}
        <div style={baseStyles.content}>
          <p style={{ fontSize: '16px', lineHeight: '1.6', margin: '0 0 24px' }}>
            Hi {attorneyName},
          </p>

          <p style={{ fontSize: '15px', lineHeight: '1.7', margin: '0 0 24px', color: '#0A1628' }}>
            Thank you for submitting a client referral to 5000 Tomorrow! We've successfully received the referral information and our underwriting team is now reviewing the case details. We appreciate you thinking of us for your clients' pre-settlement funding needs.
          </p>

          {/* Review Process Section */}
          <div style={baseStyles.section}>
            <h2 style={baseStyles.sectionTitle}>📋 Referral Review Process</h2>
            <div style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
              <div style={baseStyles.listItem}>
                <span style={baseStyles.listMarker}>1.</span>
                <strong>Case Analysis</strong> — Our underwriting team evaluates the case details
              </div>
              <div style={baseStyles.listItem}>
                <span style={baseStyles.listMarker}>2.</span>
                <strong>Attorney Contact</strong> — We'll call you within 24 hours for any details
              </div>
              <div style={baseStyles.listItem}>
                <span style={baseStyles.listMarker}>3.</span>
                <strong>Approval Decision</strong> — Preliminary approval within 24-48 hours
              </div>
              <div style={baseStyles.listItem}>
                <span style={baseStyles.listMarker}>4.</span>
                <strong>Funding & Commission</strong> — Funds to client + referral commission to you
              </div>
            </div>
          </div>

          {/* Commission Info Section */}
          <div style={baseStyles.section}>
            <h2 style={baseStyles.sectionTitle}>💰 Referral Commission</h2>
            <p style={{ fontSize: '14px', lineHeight: '1.7', margin: '0 0 12px', color: '#475569' }}>
              Competitive referral fees apply for approved cases. Details will be provided upon approval.
            </p>
            <p style={{ fontSize: '14px', lineHeight: '1.7', margin: '0', color: '#475569' }}>
              Our team will discuss commission structure and terms during the approval process.
            </p>
          </div>

          {/* Questions Section */}
          <div style={baseStyles.section}>
            <h2 style={baseStyles.sectionTitle}>❓ Questions?</h2>
            <p style={{ fontSize: '14px', lineHeight: '1.7', margin: '0 0 12px', color: '#475569' }}>
              Our Attorney Partnerships team is standing by to help:
            </p>
            <p style={{ fontSize: '15px', margin: '0', color: '#0A1628' }}>
              <strong>📞 Call:</strong> 1-877-863-2955<br />
              <strong>📧 Email:</strong> <a href="mailto:attorneys@poloju.dev" style={baseStyles.footerLink}>attorneys@poloju.dev</a><br />
              <strong>🌐 Portal:</strong> <a href="https://www.5000tomorrow.com/attorney-portal" style={baseStyles.footerLink}>Attorney Portal</a>
            </p>
          </div>

          {/* Attorney Resources Section */}
          <div style={baseStyles.section}>
            <h2 style={baseStyles.sectionTitle}>📚 Attorney Resources</h2>
            <p style={{ fontSize: '14px', lineHeight: '1.7', margin: '0 0 12px', color: '#475569' }}>
              Access agreements, forms, and program details:
            </p>
            <div style={{ textAlign: 'center' as const }}>
              <a href="https://www.5000tomorrow.com/attorney-portal" style={baseStyles.button}>Access Attorney Portal</a>
            </div>
          </div>

          {/* CTA Buttons */}
          <div style={{ textAlign: 'center' as const, marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #e2e8f0' }}>
            <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 16px' }}>Refer another client — submit a new referral:</p>
            <a href="https://www.5000tomorrow.com/attorney-referral" style={baseStyles.button}>Submit Another Referral</a>
          </div>
        </div>

        {/* Footer */}
        <div style={baseStyles.footer}>
          <p style={{ margin: '0 0 12px', fontWeight: 'bold', color: '#0A1628' }}>5000 Tomorrow — Attorney Partners</p>
          <p style={{ margin: '0 0 16px', color: '#64748b' }}>
            28588 Northwestern Hwy, Southfield, MI 48034
          </p>
          <div style={baseStyles.footerLinks}>
            <a href="https://www.5000tomorrow.com" style={baseStyles.footerLink}>Home</a> • 
            <a href="https://www.5000tomorrow.com/attorney-portal" style={baseStyles.footerLink}> Attorney Portal</a> • 
            <a href="https://www.5000tomorrow.com/attorney-referral" style={baseStyles.footerLink}> Refer Client</a> • 
            <a href="https://www.5000tomorrow.com/contact" style={baseStyles.footerLink}> Contact</a>
          </div>
          <p style={{ margin: '16px 0 0', color: '#94a3b8', fontSize: '11px' }}>
            © 2026 5000 Tomorrow. All rights reserved. 
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Admin / Team Notification Emails ─────────────────────────────────────────

export function TeamApplyNotificationEmail(data: Record<string, unknown>) {
  const firstName = data.firstName as string | undefined
  const lastName = data.lastName as string | undefined
  const email = data.email as string | undefined
  const phone = data.phone as string | undefined
  const caseType = data.caseType as string | undefined
  const city = data.city as string | undefined

  return (
    <div style={baseStyles.container}>
      <div style={baseStyles.wrapper}>
        {/* Header */}
        <div style={baseStyles.header}>
          <div style={baseStyles.headerMark}>📋</div>
          <h1 style={baseStyles.headerTitle}>New Application</h1>
          <p style={baseStyles.headerSubtitle}>5000 Tomorrow Pre-Settlement Funding</p>
        </div>

        {/* Main Content */}
        <div style={baseStyles.content}>
          <p style={{ fontSize: '16px', lineHeight: '1.6', margin: '0 0 24px', color: '#0A1628' }}>
            <strong>New application received!</strong>
          </p>

          <div style={baseStyles.section}>
            <h2 style={baseStyles.sectionTitle}>👤 Applicant Information</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' as const, fontSize: '14px', lineHeight: '1.8' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#0A1628', width: '140px' }}>Name:</td>
                  <td style={{ padding: '8px 0', color: '#475569' }}>{firstName} {lastName}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#0A1628' }}>Email:</td>
                  <td style={{ padding: '8px 0', color: '#475569' }}>{email}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#0A1628' }}>Phone:</td>
                  <td style={{ padding: '8px 0', color: '#475569' }}>{phone || 'N/A'}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#0A1628' }}>Case Type:</td>
                  <td style={{ padding: '8px 0', color: '#475569' }}>{caseType}</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#0A1628' }}>City:</td>
                  <td style={{ padding: '8px 0', color: '#475569' }}>{city}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={baseStyles.section}>
            <h2 style={baseStyles.sectionTitle}>⏱️ Next Steps</h2>
            <ol style={{ fontSize: '14px', lineHeight: '1.8', margin: '0', paddingLeft: '20px', color: '#475569' }}>
              <li>Review application in admin dashboard</li>
              <li>Contact applicant's attorney for case details</li>
              <li>Request settlement demand letter</li>
              <li>Approve/decline and notify applicant</li>
            </ol>
          </div>

          <div style={{ textAlign: 'center' as const, marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #e2e8f0' }}>
            <a href="https://www.5000tomorrow.com/admin" style={baseStyles.button}>View in Admin Panel</a>
          </div>
        </div>

        {/* Footer */}
        <div style={baseStyles.footer}>
          <p style={{ margin: '0 0 12px', fontWeight: 'bold', color: '#0A1628' }}>5000 Tomorrow — Admin</p>
          <p style={{ margin: '0', color: '#94a3b8', fontSize: '11px' }}>
            © 2026 5000 Tomorrow. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

export function TeamContactNotificationEmail(data: Record<string, unknown>) {
  const firstName = data.firstName as string | undefined
  const lastName = data.lastName as string | undefined
  const email = data.email as string | undefined
  const phone = data.phone as string | undefined
  const subject = data.subject as string | undefined
  const message = data.message as string | undefined

  return (
    <div style={baseStyles.container}>
      <div style={baseStyles.wrapper}>
        {/* Header */}
        <div style={baseStyles.header}>
          <div style={baseStyles.headerMark}>💬</div>
          <h1 style={baseStyles.headerTitle}>New Contact Message</h1>
          <p style={baseStyles.headerSubtitle}>Customer Inquiry</p>
        </div>

        {/* Main Content */}
        <div style={baseStyles.content}>
          <p style={{ fontSize: '16px', lineHeight: '1.6', margin: '0 0 24px', color: '#0A1628' }}>
            <strong>New message from {firstName} {lastName}</strong>
          </p>

          <div style={baseStyles.section}>
            <h2 style={baseStyles.sectionTitle}>👤 Sender Information</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' as const, fontSize: '14px', lineHeight: '1.8' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#0A1628', width: '100px' }}>Name:</td>
                  <td style={{ padding: '8px 0', color: '#475569' }}>{firstName} {lastName}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#0A1628' }}>Email:</td>
                  <td style={{ padding: '8px 0', color: '#475569' }}>{email}</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#0A1628' }}>Phone:</td>
                  <td style={{ padding: '8px 0', color: '#475569' }}>{phone || 'N/A'}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={baseStyles.section}>
            <h2 style={baseStyles.sectionTitle}>📝 Message</h2>
            <p style={{ fontSize: '14px', lineHeight: '1.7', margin: '0 0 12px', color: '#0A1628', fontWeight: 'bold' }}>
              Subject: {subject}
            </p>
            <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '4px', border: '1px solid #e2e8f0', fontSize: '14px', lineHeight: '1.7', color: '#475569', whiteSpace: 'pre-wrap' as const, wordBreak: 'break-word' as const }}>
              {message}
            </div>
          </div>

          <div style={{ textAlign: 'center' as const, marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #e2e8f0' }}>
            <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 16px' }}>Reply to: <strong>{email}</strong></p>
          </div>
        </div>

        {/* Footer */}
        <div style={baseStyles.footer}>
          <p style={{ margin: '0 0 12px', fontWeight: 'bold', color: '#0A1628' }}>5000 Tomorrow — Admin</p>
          <p style={{ margin: '0', color: '#94a3b8', fontSize: '11px' }}>
            © 2026 5000 Tomorrow. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

export function TeamAttorneyReferralNotificationEmail(data: Record<string, unknown>) {
  const attorneyFirstName = data.attorneyFirstName as string | undefined
  const attorneyLastName = data.attorneyLastName as string | undefined
  const firmName = data.firmName as string | undefined
  const caseType = data.caseType as string | undefined
  const clientFirstName = data.clientFirstName as string | undefined
  const clientLastName = data.clientLastName as string | undefined
  const estimatedSettlement = data.estimatedSettlement as string | undefined

  return (
    <div style={baseStyles.container}>
      <div style={baseStyles.wrapper}>
        {/* Header */}
        <div style={baseStyles.header}>
          <div style={baseStyles.headerMark}>⚖️</div>
          <h1 style={baseStyles.headerTitle}>New Attorney Referral</h1>
          <p style={baseStyles.headerSubtitle}>Referral Program</p>
        </div>

        {/* Main Content */}
        <div style={baseStyles.content}>
          <p style={{ fontSize: '16px', lineHeight: '1.6', margin: '0 0 24px', color: '#0A1628' }}>
            <strong>New attorney referral received!</strong>
          </p>

          <div style={baseStyles.section}>
            <h2 style={baseStyles.sectionTitle}>⚖️ Attorney Information</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' as const, fontSize: '14px', lineHeight: '1.8' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#0A1628', width: '140px' }}>Attorney:</td>
                  <td style={{ padding: '8px 0', color: '#475569' }}>{attorneyFirstName} {attorneyLastName}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#0A1628' }}>Firm:</td>
                  <td style={{ padding: '8px 0', color: '#475569' }}>{firmName}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={baseStyles.section}>
            <h2 style={baseStyles.sectionTitle}>👤 Client Information</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' as const, fontSize: '14px', lineHeight: '1.8' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#0A1628', width: '140px' }}>Client:</td>
                  <td style={{ padding: '8px 0', color: '#475569' }}>{clientFirstName} {clientLastName}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#0A1628' }}>Case Type:</td>
                  <td style={{ padding: '8px 0', color: '#475569' }}>{caseType}</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#0A1628' }}>Est. Settlement:</td>
                  <td style={{ padding: '8px 0', color: '#475569' }}>{estimatedSettlement}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ textAlign: 'center' as const, marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #e2e8f0' }}>
            <a href="https://www.5000tomorrow.com/admin" style={baseStyles.button}>Review in Admin Panel</a>
          </div>
        </div>

        {/* Footer */}
        <div style={baseStyles.footer}>
          <p style={{ margin: '0 0 12px', fontWeight: 'bold', color: '#0A1628' }}>5000 Tomorrow — Admin</p>
          <p style={{ margin: '0', color: '#94a3b8', fontSize: '11px' }}>
            © 2026 5000 Tomorrow. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
