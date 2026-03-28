'use client'

import Turnstile from 'react-turnstile'

interface TurnstileWidgetProps {
  onToken: (token: string) => void
  onError?: () => void
  onExpire?: () => void
}

export default function TurnstileWidget({ onToken, onError, onExpire }: TurnstileWidgetProps) {
  const siteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY

  if (!siteKey) {
    console.warn('[Turnstile] NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY not configured')
    return null
  }

  return (
    <div className="flex justify-center my-4">
      <Turnstile
        sitekey={siteKey}
        onSuccess={onToken}
        onError={onError}
        onExpire={onExpire}
        theme="light"
        size="normal"
      />
    </div>
  )
}
