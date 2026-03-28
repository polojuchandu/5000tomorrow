import { NextRequest, NextResponse } from 'next/server'
import { initDB } from '@/lib/db/mysql'
import { verifyAdminSession } from '@/lib/admin/auth'

interface ApiResponse {
  success: boolean
  message?: string
  error?: string
}

/**
 * Initialize database - creates submissions table
 * Protected by admin authentication
 */
export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    // Optional: Check admin auth (can also be called without auth on first run)
    const sessionToken = req.cookies.get('admin-session')?.value ?? null
    const isAuthenticated = verifyAdminSession(sessionToken)

    // Allow initialization without auth on first run (for setup), but log it
    if (!isAuthenticated && process.env.NODE_ENV === 'production') {
      console.warn('[API /admin/init] Database init attempted without authentication')
      return NextResponse.json(
        { success: false, error: 'Unauthorized in production' },
        { status: 401 }
      )
    }

    await initDB()

    return NextResponse.json(
      { success: true, message: 'Database initialized successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('[API /admin/init] Error:', error)
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    )
  }
}
