'use client'

import { useState, useEffect } from 'react'
import { Eye, EyeOff, LogOut, Copy, Check, ChevronDown, Calendar, Mail, Phone } from 'lucide-react'

interface Submission {
  id: string
  form_type: 'apply' | 'attorney-referral' | 'contact'
  data: Record<string, unknown>
  created_at: string
}

interface DashboardData {
  total: number
  byType: Record<string, Submission[]>
  stats: Record<string, number>
}

const FORM_TYPE_CONFIG = {
  apply: {
    label: 'Applications',
    color: 'blue',
    icon: '📋',
  },
  contact: {
    label: 'Contact Messages',
    color: 'green',
    icon: '💬',
  },
  'attorney-referral': {
    label: 'Attorney Referrals',
    color: 'purple',
    icon: '⚖️',
  },
}

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState<DashboardData | null>(null)
  const [copiedId, setCopiedId] = useState<string>('')
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    try {
      const res = await fetch('/api/admin/submissions')
      if (res.ok) {
        setAuthenticated(true)
        fetchSubmissions()
      }
    } catch {
      // Not authenticated
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (!res.ok) {
        setError('Invalid password')
        setLoading(false)
        return
      }

      setPassword('')
      setAuthenticated(true)
      fetchSubmissions()
    } catch (err) {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function fetchSubmissions() {
    try {
      const res = await fetch('/api/admin/submissions')
      if (!res.ok) {
        setAuthenticated(false)
        return
      }
      const json = await res.json()
      if (json.success) {
        setData(json.data)
      }
    } catch (err) {
      console.error('Failed to fetch submissions:', err)
    } finally {
      setRefreshing(false)
    }
  }

  async function handleRefresh() {
    setRefreshing(true)
    await fetchSubmissions()
  }

  function handleLogout() {
    setAuthenticated(false)
    setData(null)
    setPassword('')
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-2xl p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-[#0A1628] mb-2">Admin Portal</h1>
              <p className="text-slate-500">5000 Tomorrow Submissions</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C] bg-white"
                    disabled={loading}
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !password}
                className="w-full bg-[#C9A84C] hover:bg-[#B39340] text-[#0A1628] font-semibold py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <p className="text-xs text-slate-500 mt-6 text-center">
              Secure session. Password stored in environment variables.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#0A1628]">Admin Dashboard</h1>
            <p className="text-sm text-slate-500">Form submissions overview</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition disabled:opacity-50"
              title="Refresh submissions"
            >
              {refreshing ? '⟳' : '↻'} Refresh
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      {data && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
              <p className="text-sm font-medium text-slate-600 mb-2">Total Submissions</p>
              <p className="text-4xl font-bold text-[#0A1628]">{data.total}</p>
              <p className="text-xs text-slate-500 mt-2">All form submissions</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-blue-200 shadow-sm">
              <p className="text-sm font-medium text-blue-700 mb-2">📋 Applications</p>
              <p className="text-4xl font-bold text-blue-600">{data.stats.apply || 0}</p>
              <p className="text-xs text-blue-600 mt-2">Funding applications</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-green-200 shadow-sm">
              <p className="text-sm font-medium text-green-700 mb-2">💬 Contact Messages</p>
              <p className="text-4xl font-bold text-green-600">{data.stats.contact || 0}</p>
              <p className="text-xs text-green-600 mt-2">Inquiry messages</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-purple-200 shadow-sm">
              <p className="text-sm font-medium text-purple-700 mb-2">⚖️ Attorney Referrals</p>
              <p className="text-4xl font-bold text-purple-600">{data.stats['attorney-referral'] || 0}</p>
              <p className="text-xs text-purple-600 mt-2">Attorney referrals</p>
            </div>
          </div>
        </div>
      )}

      {/* Submissions by Type */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 space-y-8">
        {data && Object.entries(data.byType).map(([formType, submissions]) => (
          submissions.length > 0 && (
            <SubmissionSection
              key={formType}
              formType={formType as 'apply' | 'contact' | 'attorney-referral'}
              submissions={submissions}
              copiedId={copiedId}
              onCopy={(text, id) => {
                navigator.clipboard.writeText(text)
                setCopiedId(id)
                setTimeout(() => setCopiedId(''), 2000)
              }}
            />
          )
        ))}
      </div>
    </div>
  )
}

interface SubmissionSectionProps {
  formType: 'apply' | 'contact' | 'attorney-referral'
  submissions: Submission[]
  copiedId: string
  onCopy: (text: string, id: string) => void
}

function SubmissionSection({
  formType,
  submissions,
  copiedId,
  onCopy,
}: SubmissionSectionProps) {
  const config = FORM_TYPE_CONFIG[formType]
  const colorClass = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    purple: 'bg-purple-50 border-purple-200',
  }[config.color]

  const headerColorClass = {
    blue: 'text-blue-900',
    green: 'text-green-900',
    purple: 'text-purple-900',
  }[config.color]

  return (
    <section className={`bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm`}>
      <div className={`${colorClass} px-6 py-4 border-b`}>
        <h2 className={`text-lg font-bold ${headerColorClass}`}>
          {config.icon} {config.label} ({submissions.length})
        </h2>
      </div>
      <div className="divide-y divide-slate-200">
        {submissions.map((sub) => (
          <SubmissionCard
            key={sub.id}
            submission={sub}
            formType={formType}
            copiedId={copiedId}
            onCopy={onCopy}
          />
        ))}
      </div>
    </section>
  )
}

interface SubmissionCardProps {
  submission: Submission
  formType: 'apply' | 'contact' | 'attorney-referral'
  copiedId: string
  onCopy: (text: string, id: string) => void
}

function SubmissionCard({
  submission,
  formType,
  copiedId,
  onCopy,
}: SubmissionCardProps) {
  const [expanded, setExpanded] = useState(false)
  const data = submission.data as Record<string, unknown>

  // Extract key fields for preview based on form type
  const getPreviewFields = () => {
    if (formType === 'apply') {
      return {
        primary: `${data.firstName} ${data.lastName}`,
        secondary: `${data.city}, MI • ${data.caseType}`,
        email: data.email as string | undefined,
        phone: data.phone as string | undefined,
      }
    }
    if (formType === 'contact') {
      return {
        primary: `${data.firstName} ${data.lastName}`,
        secondary: `Subject: ${data.subject}`,
        email: data.email as string | undefined,
        phone: data.phone as string | undefined,
      }
    }
    // attorney-referral
    return {
      primary: `${data.attorneyFirstName} ${data.attorneyLastName}`,
      secondary: `${data.firmName} • Client: ${data.clientFirstName} ${data.clientLastName}`,
      email: data.attorneyEmail as string | undefined,
      phone: data.attorneyPhone as string | undefined,
    }
  }

  const preview = getPreviewFields()
  const date = new Date(submission.created_at)
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="hover:bg-slate-50 transition">
      {/* Main row */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left px-6 py-4 flex items-start justify-between gap-4"
      >
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 truncate">{preview.primary}</h3>
          <p className="text-sm text-slate-600 truncate mt-1">{preview.secondary}</p>
          <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
            {preview.email && (
              <div className="flex items-center gap-1">
                <Mail size={14} />
                <span className="truncate">{preview.email}</span>
              </div>
            )}
            {preview.phone && (
              <div className="flex items-center gap-1">
                <Phone size={14} />
                <span>{preview.phone}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="text-right text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              {formattedDate}
            </div>
            <div>{formattedTime}</div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onCopy(JSON.stringify(data, null, 2), submission.id)
            }}
            className="p-2 hover:bg-slate-200 rounded transition flex items-center gap-1 text-sm"
            title="Copy as JSON"
          >
            {copiedId === submission.id ? (
              <Check size={16} className="text-green-600" />
            ) : (
              <Copy size={16} className="text-slate-600" />
            )}
          </button>
          <ChevronDown
            size={18}
            className={`text-slate-400 transition ${expanded ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {/* Expanded details */}
      {expanded && (
        <div className="border-t border-slate-200 bg-slate-50 px-6 py-4">
          <div className="space-y-3">
            {Object.entries(data).map(([key, value]) => {
              if (value === null || value === undefined) return null
              if (typeof value === 'object') return null

              return (
                <div key={key} className="text-sm">
                  <div className="font-medium text-slate-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  <div className="text-slate-600 mt-1 break-words">
                    {typeof value === 'boolean' ? (value ? '✓ Yes' : '✗ No') : String(value)}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
