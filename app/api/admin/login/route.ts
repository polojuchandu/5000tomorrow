import { NextRequest, NextResponse } from 'next/server'
import { createAdminSession } from '@/lib/admin/auth'

interface ApiResponse {
  success: boolean
  error?: string
}

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const body = await req.json()
    const { password } = body as Record<string, unknown>

    if (typeof password !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Invalid password format' },
        { status: 400 }
      )
    }

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: 'Invalid password' },
        { status: 401 }
      )
    }

    // Create session
    const sessionToken = createAdminSession()
    const response = NextResponse.json(
      { success: true },
      { status: 200 }
    )

    // Set secure cookie (30 days)
    response.cookies.set({
      name: 'admin-session',
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    })

    return response
  } catch (error) {
    console.error('[API /admin/login] Error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
