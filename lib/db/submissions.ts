import { promises as fs } from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'

const DB_DIR = path.join(process.cwd(), '.data')
const SUBMISSIONS_FILE = path.join(DB_DIR, 'submissions.json')

interface Submission {
  id: string
  form_type: 'apply' | 'attorney-referral' | 'contact'
  data: Record<string, unknown>
  created_at: string
}

/**
 * Initialize database directory and file
 */
async function initDB(): Promise<void> {
  try {
    await fs.mkdir(DB_DIR, { recursive: true })
    try {
      await fs.access(SUBMISSIONS_FILE)
    } catch {
      // File doesn't exist, create it
      await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify([], null, 2), 'utf-8')
    }
  } catch (error) {
    console.error('[DB] Failed to initialize:', error)
    throw error
  }
}

/**
 * Read all submissions
 */
export async function getAllSubmissions(): Promise<Submission[]> {
  try {
    await initDB()
    const content = await fs.readFile(SUBMISSIONS_FILE, 'utf-8')
    return JSON.parse(content) as Submission[]
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
    await initDB()
    const submissions = await getAllSubmissions()
    const id = randomUUID()
    const submission: Submission = {
      id,
      form_type: formType,
      data,
      created_at: new Date().toISOString(),
    }
    submissions.push(submission)
    await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2), 'utf-8')
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
  const all = await getAllSubmissions()
  return all.filter((s) => s.form_type === formType).sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )
}
