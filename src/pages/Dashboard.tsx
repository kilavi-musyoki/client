import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useProgress } from '../context/ProgressContext'
import { CHAPTERS } from '../data/chapters'
import {
  Shield, LogOut, BookOpen, Clock, Lock,
  CheckCircle, ChevronRight, Award, BarChart2, Zap
} from 'lucide-react'

const DIFFICULTY_COLOR = {
  Beginner:     'bg-emerald-50 text-emerald-700 border-emerald-200',
  Intermediate: 'bg-amber-50 text-amber-700 border-amber-200',
  Advanced:     'bg-red-50 text-red-700 border-red-200',
}

function ProgressRing({ pct, size = 44 }: { pct: number; size?: number }) {
  const r = (size - 6) / 2
  const circ = 2 * Math.PI * r
  const dash = circ * (1 - pct / 100)
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#e4e8ef" strokeWidth={4} />
      <circle cx={size/2} cy={size/2} r={r} fill="none"
        stroke="var(--color-brand-500)" strokeWidth={4}
        strokeDasharray={circ} strokeDashoffset={dash}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.6s ease' }}
      />
    </svg>
  )
}

export default function Dashboard() {
  const { user, logout } = useAuth()
  const { getChapter } = useProgress()
  const navigate = useNavigate()

  const completed = CHAPTERS.filter(c => getChapter(c.id).completed).length
  const totalScore = CHAPTERS.reduce((s, c) => s + (getChapter(c.id).totalScore ?? 0), 0)

  return (
    <div className="min-h-screen bg-[var(--color-surface)] flex flex-col">

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-30 bg-white border-b border-[var(--color-border)] px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-[var(--color-brand-600)] flex items-center justify-center">
            <Shield size={15} className="text-white" />
          </div>
          <span className="font-semibold text-[var(--color-text-primary)] tracking-tight">CyberPath</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
            <div className="w-7 h-7 rounded-full bg-[var(--color-brand-100)] flex items-center justify-center text-xs font-semibold text-[var(--color-brand-700)]">
              {user?.avatar}
            </div>
            <span>{user?.name}</span>
          </div>
          <button
            id="logout-btn"
            onClick={logout}
            className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition px-2 py-1 rounded"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8">

        {/* ── Hero banner ── */}
        <div className="rounded-2xl bg-gradient-to-br from-[var(--color-brand-600)] to-[var(--color-brand-800)] p-6 sm:p-8 mb-8 text-white relative overflow-hidden animate-fade-in">
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '28px 28px'
          }} />
          <div className="relative">
            <p className="text-white/70 text-sm font-medium mb-1">Welcome back, {user?.name?.split(' ')[0]} 👋</p>
            <h1 className="text-2xl sm:text-3xl font-bold mb-1">OWASP Top 10</h1>
            <p className="text-white/70 text-sm max-w-lg">
              Master the most critical web security vulnerabilities through interactive, hands-on labs.
            </p>
            <div className="mt-6 flex flex-wrap gap-6">
              {[
                { icon: BookOpen,  val: `${completed}/${CHAPTERS.length}`, label: 'Completed' },
                { icon: Award,     val: totalScore || '—',  label: 'Total Score' },
                { icon: BarChart2, val: `${Math.round((completed/CHAPTERS.length)*100)}%`, label: 'Progress' },
                { icon: Zap,       val: '1',                label: 'Streak (days)' },
              ].map(({ icon: Icon, val, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
                    <Icon size={15} className="text-white/80" />
                  </div>
                  <div>
                    <div className="font-bold text-lg leading-none">{val}</div>
                    <div className="text-white/60 text-xs mt-0.5">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Chapter grid ── */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-[var(--color-text-primary)]">Modules</h2>
          <span className="text-xs text-[var(--color-text-muted)]">{completed} of {CHAPTERS.length} complete</span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CHAPTERS.map((ch, i) => {
            const prog = getChapter(ch.id)
            const pct = prog.completed ? 100
              : prog.started ? Math.round(((prog.currentPage - 1) / ch.totalPages) * 100)
              : 0
            const locked = !ch.available

            return (
              <div
                key={ch.id}
                id={`chapter-card-${ch.id}`}
                onClick={() => !locked && navigate(`/chapter/${ch.id}`)}
                className={`
                  group relative bg-white rounded-xl border border-[var(--color-border)]
                  p-5 flex flex-col gap-3 transition-all duration-200
                  animate-fade-in
                  ${locked
                    ? 'opacity-55 cursor-not-allowed'
                    : 'cursor-pointer hover:shadow-[var(--shadow-panel)] hover:-translate-y-0.5 hover:border-[var(--color-brand-200)]'
                  }
                `}
                style={{ animationDelay: `${i * 40}ms` }}
              >
                {/* Code badge + status */}
                <div className="flex items-start justify-between">
                  <span className="text-xs font-mono font-semibold text-[var(--color-brand-600)] bg-[var(--color-brand-50)] border border-[var(--color-brand-100)] px-2 py-0.5 rounded">
                    {ch.code}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {prog.completed && <CheckCircle size={15} className="text-[var(--color-success)]" />}
                    {locked && <Lock size={13} className="text-[var(--color-text-muted)]" />}
                    <ProgressRing pct={pct} />
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h3 className="font-semibold text-[var(--color-text-primary)] text-sm leading-snug line-clamp-2">
                    {ch.title}
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1 line-clamp-2">{ch.description}</p>
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-[var(--color-border)]">
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${DIFFICULTY_COLOR[ch.difficulty]}`}>
                      {ch.difficulty}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-[var(--color-text-muted)]">
                      <Clock size={11} />{ch.duration}
                    </span>
                  </div>
                  {!locked && (
                    <ChevronRight size={15} className="text-[var(--color-text-muted)] group-hover:text-[var(--color-brand-500)] group-hover:translate-x-0.5 transition-all" />
                  )}
                </div>

                {/* Coming soon overlay */}
                {locked && (
                  <div className="absolute inset-0 rounded-xl flex items-end p-3">
                    <span className="text-[10px] text-[var(--color-text-muted)] font-medium">Coming soon</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
