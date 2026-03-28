/**
 * Cloudflare Turnstile verification
 * Validates CAPTCHA tokens received from the client
 */

interface TurnstileResponse {
  success:     boolean
  'error-codes'?: string[]
  challenge_ts?: string
  hostname?:    string
}

export async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secretKey = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY

  if (!secretKey) {
    console.error('[Turnstile] CLOUDFLARE_TURNSTILE_SECRET_KEY not configured')
    return false
  }

  if (!token) {
    console.warn('[Turnstile] token is empty')
    return false
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        secret:   secretKey,
        response: token,
      }),
    })

    const data = (await response.json()) as TurnstileResponse

    if (!data.success) {
      console.warn('[Turnstile] Verification failed:', data['error-codes']?.join(', '))
      return false
    }

    console.log('[Turnstile] ✅ Token verified successfully')
    return true
  } catch (error) {
    console.error('[Turnstile] Verification request failed:', error)
    return false
  }
}
