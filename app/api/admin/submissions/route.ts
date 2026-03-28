import { NextRequest, NextResponse } from 'next/server'
import { getAllSubmissions, getStats } from '@/lib/db/mysql'
import { verifyAdminSession } from '@/lib/admin/auth'

interface ApiResponse {
  success: boolean
  data?: Record<string, unknown>
  error?: string
}

export async function GET(req: NextRequest): Promise<NextResponse<ApiResponse>> {
  // Check admin authentication
  const sessionToken = req.cookies.get('admin-session')?.value ?? null
  
  if (!verifyAdminSession(sessionToken)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const submissions = await getAllSubmissions()
    const stats = await getStats()
    
    // Group by form type
    const grouped = submissions.reduce((acc, sub) => {
      if (!acc[sub.form_type]) {
        acc[sub.form_type] = []
      }
      acc[sub.form_type].push(sub)
      return acc
    }, {} as Record<string, typeof submissions>)

    return NextResponse.json(
      {
        success: true,
        data: {
          total: submissions.length,
          byType: grouped,
          stats: {
            apply: stats.apply || 0,
            contact: stats.contact || 0,
            'attorney-referral': stats['attorney-referral'] || 0,
          },
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[API /admin/submissions] Error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

