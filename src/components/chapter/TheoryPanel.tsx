import { Lightbulb, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Hint { text: string }
interface PageData {
  title: string
  theory: string
  instruction: string
  hints?: Hint[]
  infoBox?: { label: string; content: string }
  nextLabel?: string
  customAction?: string
  requiresInteraction?: boolean
}

interface Props {
  page: PageData
  currentPage: number
  totalPages: number
  hintsRevealed: Record<string, number>
  onRevealHint: (key: string) => void
  onNext: () => void
  onPrev: () => void
  pageCompleted: boolean
  isLast: boolean
}

export default function TheoryPanel({
  page, currentPage, totalPages, hintsRevealed,
  onRevealHint, onNext, onPrev, pageCompleted, isLast
}: Props) {
  const [infoExpanded, setInfoExpanded] = useState(false)
  const [actionTriggered, setActionTriggered] = useState(false)

  // Reset actionTriggered when page changes
  useEffect(() => {
    setActionTriggered(false)
  }, [currentPage])
  const hintKey = `page-${currentPage}`
  const revealedCount = hintsRevealed[hintKey] ?? 0
  const hints = page.hints ?? []
  
  const hasPendingCustomAction = page.customAction && !pageCompleted
  // canNext is true if:
  // 1. interaction is not required
  // 2. page is completed
  // 3. there is a custom action AND it hasn't been triggered yet
  const canNext = !page.requiresInteraction || pageCompleted || (hasPendingCustomAction && !actionTriggered)

  const handleNextClick = () => {
    if (hasPendingCustomAction && !actionTriggered) {
      window.dispatchEvent(new CustomEvent(page.customAction as string))
      setActionTriggered(true)
    } else if (canNext) {
      onNext()
    }
  }

  const getButtonLabel = () => {
    if (isLast) return 'Complete Chapter'
    if (page.customAction) {
      if (!actionTriggered && !pageCompleted) return page.nextLabel
      return 'Next'
    }
    return page.nextLabel ?? 'Next'
  }

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">

      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-[var(--color-border)] shrink-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-[var(--color-text-muted)]">
            Step {currentPage} of {totalPages}
          </span>
        </div>
        <h2 className="text-base font-semibold text-[var(--color-text-primary)] leading-snug">
          {currentPage}. {page.title}
        </h2>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">

        {/* Theory */}
        <div className="text-sm text-[var(--color-text-secondary)] leading-relaxed whitespace-pre-line">
          {page.theory}
        </div>

        {/* Info / definition box */}
        {page.infoBox && (
          <div className="rounded-lg border border-[var(--color-brand-100)] bg-[var(--color-brand-50)] overflow-hidden">
            <button
              className="w-full flex items-center justify-between px-4 py-2.5 text-left"
              onClick={() => setInfoExpanded(!infoExpanded)}
            >
              <span className="text-xs font-semibold text-[var(--color-brand-700)]">
                {page.infoBox.label}
              </span>
              <ChevronRight
                size={14}
                className={`text-[var(--color-brand-500)] transition-transform ${infoExpanded ? 'rotate-90' : ''}`}
              />
            </button>
            {infoExpanded && (
              <div className="px-4 pb-3 text-xs text-[var(--color-brand-800)] leading-relaxed border-t border-[var(--color-brand-100)]">
                <div className="pt-2">{page.infoBox.content}</div>
              </div>
            )}
          </div>
        )}

        {/* Instruction box */}
        <div className="rounded-lg bg-slate-50 border border-[var(--color-border)] p-4">
          <p className="text-xs font-semibold text-[var(--color-text-primary)] mb-2 uppercase tracking-wide">
            Instructions
          </p>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed whitespace-pre-line">
            {page.instruction}
          </p>
        </div>

        {/* Hints */}
        {hints.length > 0 && (
          <div className="space-y-2">
            {hints.slice(0, revealedCount).map((h, i) => (
              <div
                key={i}
                className="flex gap-2.5 p-3 rounded-lg bg-amber-50 border border-amber-200 animate-fade-in text-sm text-amber-800"
              >
                <Lightbulb size={14} className="mt-0.5 shrink-0 text-amber-500" />
                <span><span className="font-medium">Hint {i + 1}:</span> {h.text}</span>
              </div>
            ))}
            {revealedCount < hints.length && (
              <button
                id={`hint-btn-${currentPage}`}
                onClick={() => onRevealHint(hintKey)}
                className="flex items-center gap-2 text-xs font-medium text-amber-700 hover:text-amber-800 transition px-3 py-2 rounded-lg border border-amber-200 hover:bg-amber-50 w-full justify-center"
              >
                <Lightbulb size={12} />
                {revealedCount === 0 ? 'Show hint' : 'Next hint'} (-3 points)
              </button>
            )}
          </div>
        )}

        {/* Completion indicator */}
        {pageCompleted && (
          <div className="flex items-center gap-2 text-sm text-[var(--color-success)] bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2.5 animate-fade-in">
            <CheckCircle size={15} />
            <span className="font-medium">Step complete!</span>
          </div>
        )}
      </div>

      {/* Navigation footer */}
      <div className="px-5 py-3.5 border-t border-[var(--color-border)] flex items-center justify-between shrink-0 bg-white">
        <button
          id={`prev-btn-${currentPage}`}
          onClick={onPrev}
          disabled={currentPage === 1}
          className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] disabled:opacity-30 disabled:cursor-not-allowed transition px-3 py-1.5 rounded-lg hover:bg-slate-50"
        >
          <ChevronLeft size={15} /> Back
        </button>

        <button
          id={`next-btn-${currentPage}`}
          onClick={handleNextClick}
          disabled={!canNext}
          className={`
            flex items-center gap-1.5 text-sm font-medium px-4 py-1.5 rounded-lg transition
            ${canNext
              ? 'bg-[var(--color-brand-600)] hover:bg-[var(--color-brand-700)] text-white'
              : 'bg-slate-100 text-[var(--color-text-muted)] cursor-not-allowed'
            }
          `}
        >
          {getButtonLabel()}
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  )
}
