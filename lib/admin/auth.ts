/**
 * Admin authentication middleware
 * Checks for a valid admin password in cookies/headers
 */

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'
const SESSION_COOKIE = 'admin-session'

/**
 * Verify admin session from cookie
 */
export function verifyAdminSession(sessionToken: string | null): boolean {
  if (!sessionToken) return false
  // In production, use proper JWT or session tokens
  // For now, just store a hashed version of the password
  return sessionToken === Buffer.from(ADMIN_PASSWORD).toString('base64')
}

/**
 * Create admin session token
 */
export function createAdminSession(): string {
  return Buffer.from(ADMIN_PASSWORD).toString('base64')
}

/**
 * Get session cookie name
 */
export function getSessionCookieName(): string {
  return SESSION_COOKIE
}
