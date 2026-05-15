import { useEffect } from 'react'
import { CheckCircle, Trophy, Star, ArrowLeft } from 'lucide-react'

// Replace with your deployed Apps Script webhook URL.
// Set VITE_WEBHOOK_URL in your .env / Vercel environment variables
// so the real URL never ships as plaintext in source control.
const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL ?? ''

interface Props {
  isVisible: boolean
  chapter: { code: string; title: string; totalPages: number }
  prog: { totalScore: number }
  onClose: () => void
}

export default function CompletionModal({ isVisible, chapter, prog, onClose }: Props) {
  const score = prog.totalScore ?? 60
  const grade = score >= 55 ? 'S' : score >= 45 ? 'A' : score >= 30 ? 'B' : 'C'
  const gradeColor = grade === 'S' ? 'text-amber-500' : grade === 'A' ? 'text-[var(--color-brand-500)]'
    : grade === 'B' ? 'text-emerald-500' : 'text-slate-400'

  // ── Google Sheet completion webhook ────────────────────────────────────────
  // Fires once when the modal becomes visible. Silently posts learner data to
  // the Apps Script endpoint which appends a row to the tracking spreadsheet.
  // The .catch(() => {}) ensures any network failure is swallowed — it must
  // never crash the modal or block the learner from seeing their result.
  useEffect(() => {
    if (!isVisible || !WEBHOOK_URL) return

    const user = (() => {
      try { return JSON.parse(localStorage.getItem('cyberpath_user') || '{}') }
      catch { return {} }
    })()

    fetch(WEBHOOK_URL, {
      method: 'POST',
      body: JSON.stringify({
        name:    user.name  || 'Learner',
        email:   user.email || 'unknown',
        chapter: `${chapter.code} — ${chapter.title}`,
        score,
        grade,
        date:    new Date().toLocaleDateString(),
      }),
    }).catch(() => {})
  }, [isVisible]) // eslint-disable-line react-hooks/exhaustive-deps
  // ──────────────────────────────────────────────────────────────────────────

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-[var(--shadow-panel)] max-w-md w-full mx-4 p-8 text-center animate-fade-in">

        {/* Trophy */}
        <div className="w-16 h-16 rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center mx-auto mb-5">
          <Trophy size={28} className="text-amber-500" />
        </div>

        <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-1">Chapter Complete!</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">
          You've finished <span className="font-medium">{chapter.code} — {chapter.title}</span>
        </p>

        {/* Score */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Score', val: score },
            { label: 'Grade', val: <span className={`text-2xl font-bold ${gradeColor}`}>{grade}</span> },
            { label: 'Pages', val: chapter.totalPages },
          ].map(({ label, val }) => (
            <div key={label} className="bg-[var(--color-surface)] rounded-lg p-3 border border-[var(--color-border)]">
              <div className="text-xl font-bold text-[var(--color-text-primary)]">{val}</div>
              <div className="text-xs text-[var(--color-text-muted)] mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Stars */}
        <div className="flex justify-center gap-1 mb-6">
          {[1, 2, 3].map(i => (
            <Star
              key={i}
              size={22}
              className={i <= Math.ceil(score / 20) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}
            />
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-[var(--color-success)] justify-center">
            <CheckCircle size={15} />
            <span>Badge earned: Vulnerability Hunter</span>
          </div>
          <button
            id="completion-back-btn"
            onClick={onClose}
            className="mt-4 flex items-center gap-2 mx-auto text-sm font-medium text-white bg-[var(--color-brand-600)] hover:bg-[var(--color-brand-700)] px-6 py-2.5 rounded-lg transition"
          >
            <ArrowLeft size={15} />
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}
