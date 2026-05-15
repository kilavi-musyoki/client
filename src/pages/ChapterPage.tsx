import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { useState, useRef, useCallback, useEffect } from 'react'
import { CHAPTERS } from '../data/chapters'
import { useProgress } from '../context/ProgressContext'
import TheoryPanel from '../components/chapter/TheoryPanel'
import LabPanel from '../components/chapter/LabPanel'
import CompletionModal from '../components/chapter/CompletionModal'
import { ChevronLeft } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import A06_PAGES from '../data/a06pages'

const CHAPTER_PAGES: Record<string, typeof A06_PAGES> = {
  a06: A06_PAGES,
}

export default function ChapterPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { getChapter, markPageComplete, useHint, completeChapter } = useProgress()

  const chapter = CHAPTERS.find(c => c.id === id)
  const pages = id ? CHAPTER_PAGES[id] : undefined
  const prog = chapter ? getChapter(chapter.id) : null

  const [currentPage, setCurrentPage] = useState(prog?.currentPage ?? 1)
  const [showCompletion, setShowCompletion] = useState(false)
  const [hintsRevealed, setHintsRevealed] = useState<Record<string, number>>({})
  const [pageCompleted, setPageCompleted] = useState(false)

  // Custom CSS-based resizable split pane (no library needed)
  const [leftPct, setLeftPct] = useState(40)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const handleDividerMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    isDragging.current = true
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'

    const onMove = (ev: MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const pct = Math.min(62, Math.max(28, ((ev.clientX - rect.left) / rect.width) * 100))
      setLeftPct(pct)
    }
    const onUp = () => {
      isDragging.current = false
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [])

  if (!chapter || !pages || !prog) {
    return <Navigate to="/" replace />
  }

  const page = pages[currentPage - 1]
  const isLast = currentPage === chapter.totalPages
  const progressPct = Math.round(((currentPage - 1) / chapter.totalPages) * 100)

  const handleNext = () => {
    markPageComplete(chapter.id, currentPage, chapter.totalPages)
    if (isLast) {
      completeChapter(chapter.id)
      setShowCompletion(true)
    } else {
      setCurrentPage(p => p + 1)
      setPageCompleted(false)
    }
  }

  const handlePrev = () => {
    if (currentPage > 1) { setCurrentPage(p => p - 1); setPageCompleted(false) }
  }

  const handleRevealHint = (stepKey: string) => {
    const cur = hintsRevealed[stepKey] ?? 0
    const max = page.hints?.length ?? 0
    if (cur < max) {
      setHintsRevealed(prev => ({ ...prev, [stepKey]: cur + 1 }))
      useHint(chapter.id, stepKey)
    }
  }

  const handlePageComplete = () => setPageCompleted(true)

  return (
    <div className="h-screen flex flex-col bg-[var(--color-surface)] overflow-hidden">

      {/* ── Top bar ── */}
      <header className="h-12 shrink-0 bg-white border-b border-[var(--color-border)] flex items-center px-4 gap-4 z-20">
        <button
          id="back-to-dashboard"
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition"
        >
          <ChevronLeft size={15} />
          <span className="hidden sm:inline">Dashboard</span>
        </button>

        <div className="h-4 w-px bg-[var(--color-border)]" />

        {/* Chapter title */}
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs font-mono font-semibold text-[var(--color-brand-600)] bg-[var(--color-brand-50)] border border-[var(--color-brand-100)] px-1.5 py-0.5 rounded shrink-0">
            {chapter.code}
          </span>
          <span className="text-sm font-medium text-[var(--color-text-primary)] truncate">{chapter.title}</span>
        </div>

        {/* Progress bar */}
        <div className="flex-1 flex items-center gap-2 ml-2">
          <div className="flex-1 h-1.5 bg-[var(--color-border)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--color-brand-500)] rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <span className="text-xs text-[var(--color-text-muted)] shrink-0">
            {currentPage}/{chapter.totalPages}
          </span>
        </div>

        {/* User avatar */}
        <div className="w-7 h-7 rounded-full bg-[var(--color-brand-100)] flex items-center justify-center text-xs font-semibold text-[var(--color-brand-700)] shrink-0">
          {user?.avatar}
        </div>
      </header>

      {/* ── Split pane (custom CSS, no broken library) ── */}
      <div ref={containerRef} style={{ display: 'flex', flex: 1, overflow: 'hidden', minHeight: 0 }}>

        {/* Left — Theory panel */}
        <div style={{ width: `${leftPct}%`, flexShrink: 0, height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <TheoryPanel
            page={page}
            currentPage={currentPage}
            totalPages={chapter.totalPages}
            hintsRevealed={hintsRevealed}
            onRevealHint={handleRevealHint}
            onNext={handleNext}
            onPrev={handlePrev}
            pageCompleted={pageCompleted}
            isLast={isLast}
          />
        </div>

        {/* Drag divider */}
        <div
          onMouseDown={handleDividerMouseDown}
          style={{
            width: '6px',
            flexShrink: 0,
            height: '100%',
            background: 'var(--color-border)',
            cursor: 'col-resize',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            userSelect: 'none',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-brand-400)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-border)')}
        >
          <div style={{ width: '2px', height: '40px', borderRadius: '99px', background: '#cbd5e1' }} />
        </div>

        {/* Right — Lab panel */}
        <div style={{ flex: 1, height: '100%', overflow: 'hidden', minWidth: 0 }}>
          <LabPanel
            page={page}
            currentPage={currentPage}
            chapterId={chapter.id}
            onPageComplete={handlePageComplete}
            pageCompleted={pageCompleted}
            onNext={handleNext}
          />
        </div>
      </div>

      <CompletionModal
        isVisible={showCompletion}
        chapter={chapter}
        prog={getChapter(chapter.id)}
        onClose={() => { setShowCompletion(false); navigate('/') }}
      />
    </div>
  )
}
