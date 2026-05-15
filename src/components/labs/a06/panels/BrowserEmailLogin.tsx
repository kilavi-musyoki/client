import { useState, useRef } from 'react'
import { Shield, CornerDownLeft } from 'lucide-react'

interface Props { onComplete: () => void; pageCompleted: boolean }

export default function BrowserEmailLogin({ onComplete, pageCompleted }: Props) {
  const [urlValue, setUrlValue] = useState('')
  const [navigated, setNavigated] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    const url = urlValue.trim().toLowerCase()
    // Bug fix: 'mail' alone matched anything — only accept the specific LiveMail domain
    if (url.includes('livemail')) {
      setNavigated(true)
      setTimeout(() => onComplete(), 800)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Browser tabs */}
      <div className="bg-slate-200 px-4 pt-2 pb-0 flex items-end gap-1 shrink-0">
        <div className="bg-white rounded-t-lg px-4 py-1.5 text-xs font-medium text-[var(--color-text-primary)] border-t border-x border-[var(--color-border)]">
          New Tab
        </div>
      </div>

      {/* URL bar */}
      <div className="bg-slate-100 border-b border-[var(--color-border)] px-4 py-2 shrink-0">
        <div className="flex items-center gap-2 max-w-xl">
          <div className="flex-1 flex items-center gap-2 bg-white border border-[var(--color-border)] rounded-full px-3 py-1.5 shadow-sm">
            <Shield size={11} className="text-slate-400 shrink-0" />
            <input
              ref={inputRef}
              id="browser-url-input"
              type="text"
              value={urlValue}
              onChange={e => setUrlValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter URL…"
              className="flex-1 text-xs font-mono text-[var(--color-text-primary)] outline-none bg-transparent placeholder:text-[var(--color-text-muted)]"
              spellCheck={false}
              autoFocus
            />
          </div>
          <button
            id="browser-go-btn"
            onClick={handleSubmit}
            className="flex items-center gap-1 bg-[var(--color-brand-600)] hover:bg-[var(--color-brand-700)] text-white text-xs font-medium px-3 py-1.5 rounded-full transition"
          >
            <CornerDownLeft size={11} /> Go
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center bg-slate-50">
        {!navigated ? (
          <div className="text-center animate-fade-in">
            <div className="text-5xl mb-4 opacity-30">🌐</div>
            <p className="text-sm text-[var(--color-text-muted)] mb-2">Welcome to Browser</p>
            <p className="text-xs text-[var(--color-text-muted)]">
              Start browsing and your most-visited sites will appear here.
            </p>
            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2.5 max-w-xs mx-auto">
              <p className="text-xs text-amber-800">
                <strong>Navigate to:</strong>{' '}
                <code className="bg-amber-100 px-1 rounded font-mono text-[11px]">https://www.livemail.com</code>
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center animate-fade-in">
            <div className="w-8 h-8 rounded-full border-2 border-[var(--color-brand-500)] border-t-transparent animate-spin mx-auto mb-3" />
            <p className="text-sm text-[var(--color-text-secondary)]">Loading LiveMail…</p>
          </div>
        )}
      </div>
    </div>
  )
}
