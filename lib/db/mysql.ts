import mysql from 'mysql2/promise'
import { randomUUID } from 'crypto'

interface Submission {
  id: string
  form_type: 'apply' | 'attorney-referral' | 'contact'
  data: Record<string, unknown>
  created_at: string
}

interface ConnectionConfig {
  host: string
  user: string
  password: string
  database: string
  port: number
}

/**
 * Parse DATABASE_URL to connection config
 * Format: mysql://user:password@host:port/database
 */
function parseConnectionUrl(): ConnectionConfig {
  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error('DATABASE_URL environment variable is not set')
  }

  try {
    const dbUrl = new URL(url)
    return {
      host: dbUrl.hostname,
      user: dbUrl.username,
      password: dbUrl.password,
      database: dbUrl.pathname.slice(1), // Remove leading /
      port: parseInt(dbUrl.port || '3306', 10),
    }
  } catch (error) {
    throw new Error(`Invalid DATABASE_URL format: ${url}`)
  }
}

/**
 * Initialize database connection
 */
async function getConnection() {
  const config = parseConnectionUrl()
  return mysql.createConnection(config)
}

/**
 * Create submissions table if it doesn't exist
 */
export async function initDB(): Promise<void> {
  try {
    const connection = await getConnection()

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS submissions (
        id VARCHAR(36) PRIMARY KEY,
        form_type ENUM('apply', 'attorney-referral', 'contact') NOT NULL,
        data JSON NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_form_type (form_type),
        INDEX idx_created_at (created_at DESC)
      )
    `)

    await connection.end()
    console.log('[DB] ✅ Submissions table ready')
  } catch (error) {
    console.error('[DB] Failed to initialize:', error)
    throw error
  }
}

/**
 * Get all submissions
 */
export async function getAllSubmissions(): Promise<Submission[]> {
  try {
    const connection = await getConnection()

    const [rows] = await connection.execute(
      'SELECT id, form_type, data, created_at FROM submissions ORDER BY created_at DESC'
    )

    await connection.end()

    return (rows as Array<{
      id: string
      form_type: 'apply' | 'attorney-referral' | 'contact'
      data: string
      created_at: Date
    }>).map((row) => ({
      id: row.id,
      form_type: row.form_type,
      data: typeof row.data === 'string' ? JSON.parse(row.data) : row.data,
      created_at: new Date(row.created_at).toISOString(),
    }))
  } catch (error) {
    console.error('[DB] Failed to read submissions:', error)
    return []
  }
}

/**
 * Save a new submission
 */
export async function saveSubmission(
  formType: 'apply' | 'attorney-referral' | 'contact',
  data: Record<string, unknown>,
): Promise<string> {
  try {
    const connection = await getConnection()
    const id = randomUUID()

    await connection.execute(
      'INSERT INTO submissions (id, form_type, data) VALUES (?, ?, ?)',
      [id, formType, JSON.stringify(data)]
    )

    await connection.end()
    return id
  } catch (error) {
    console.error('[DB] Failed to save submission:', error)
    throw error
  }
}

/**
 * Get submissions by form type
 */
export async function getSubmissionsByType(
  formType: 'apply' | 'attorney-referral' | 'contact',
): Promise<Submission[]> {
  try {
    const connection = await getConnection()

    const [rows] = await connection.execute(
      'SELECT id, form_type, data, created_at FROM submissions WHERE form_type = ? ORDER BY created_at DESC',
      [formType]
    )

    await connection.end()

    return (rows as Array<{
      id: string
      form_type: 'apply' | 'attorney-referral' | 'contact'
      data: string
      created_at: Date
    }>).map((row) => ({
      id: row.id,
      form_type: row.form_type,
      data: typeof row.data === 'string' ? JSON.parse(row.data) : row.data,
      created_at: new Date(row.created_at).toISOString(),
    }))
  } catch (error) {
    console.error('[DB] Failed to read submissions by type:', error)
    return []
  }
}

/**
 * Delete a submission
 */
export async function deleteSubmission(id: string): Promise<boolean> {
  try {
    const connection = await getConnection()

    const [result] = await connection.execute(
      'DELETE FROM submissions WHERE id = ?',
      [id]
    )

    await connection.end()

    return (result as mysql.OkPacket).affectedRows > 0
  } catch (error) {
    console.error('[DB] Failed to delete submission:', error)
    return false
  }
}

/**
 * Get submission count by form type
 */
export async function getStats(): Promise<Record<string, number>> {
  try {
    const connection = await getConnection()

    const [rows] = await connection.execute(
      `SELECT form_type, COUNT(*) as count FROM submissions GROUP BY form_type`
    )

    await connection.end()

    const stats: Record<string, number> = {
      apply: 0,
      contact: 0,
      'attorney-referral': 0,
    }

    ;(rows as Array<{ form_type: string; count: number }>).forEach((row) => {
      stats[row.form_type] = row.count
    })

    return stats
  } catch (error) {
    console.error('[DB] Failed to get stats:', error)
    return {}
  }
}
