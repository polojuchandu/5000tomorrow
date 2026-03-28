/**
 * Database initialization on app startup
 * This file is imported in app/layout.tsx to ensure the DB is set up
 */

import { initDB } from '@/lib/db/mysql'

let isInitialized = false

/**
 * Initialize database on server startup
 */
export async function ensureDBInitialized(): Promise<void> {
  if (isInitialized) return
  
  try {
    if (process.env.DATABASE_URL) {
      await initDB()
      isInitialized = true
    } else {
      console.warn('[DB] DATABASE_URL not set. Submissions will not be saved.')
    }
  } catch (error) {
    console.error('[DB] Failed to initialize database:', error)
    // Don't throw — allow the app to run even if DB setup fails
  }
}
