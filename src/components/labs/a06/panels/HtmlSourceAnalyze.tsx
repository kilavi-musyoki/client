import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, Eye, EyeOff } from 'lucide-react'

interface Props { onComplete: () => void; pageCompleted: boolean }

const SLIDES = [
  {
    title: 'Third-party Plugin Detected',
    body: 'Browsing through the HTML, Kai notices that VoltMart is loading a script called glideview.2.0.4.min.js — a third-party jQuery plugin used to power the product image gallery.',
    highlight: 'glideview',
  },
  {
    title: 'Version Number Identified',
    body: 'The filename reveals the exact version: GlideView 2.0.4. Kai makes a note of this and heads straight to the CVE database to check whether this version has any known vulnerabilities.',
    highlight: '2.0.4',
  },
]

type HtmlLine = { content: string; isHighlight: boolean }

// Plain text — no dangerouslySetInnerHTML needed
const HTML_LINES: HtmlLine[] = [
  { content: '<!DOCTYPE html>',                                                                      isHighlight: false },
  { content: '<html lang="en">',                                                                    isHighlight: false },
  { content: '<head>',                                                                               isHighlight: false },
  { content: '  <meta charset="UTF-8">',                                                            isHighlight: false },
  { content: '  <title>UltraBook Pro X1 | VoltMart</title>',                                        isHighlight: false },
  { content: '  <script src="/assets/js/jquery-2.1.0.min.js"></script>',                            isHighlight: false },
  { content: '  <script src="/assets/js/bootstrap.3.2.0.min.js"></script>',                         isHighlight: false },
  { content: '  <script src="/assets/js/glideview.2.0.4.min.js"></script> <!-- image gallery -->',  isHighlight: true  },
  { content: '  <link rel="stylesheet" href="/assets/css/glideview.2.0.4.min.css">',                isHighlight: true  },
  { content: '  <script src="/assets/js/app.js"></script>',                                         isHighlight: false },
  { content: '</head>',                                                                              isHighlight: false },
  { content: '<body><!-- ... --></body>',                                                            isHighlight: false },
  { content: '</html>',                                                                              isHighlight: false },
]

export default function HtmlSourceAnalyze({ onComplete, pageCompleted }: Props) {
  const [analyzed, setAnalyzed]   = useState(false)
  const [slide, setSlide]         = useState(0)
  const [visible, setVisible]     = useState(true)
  const [position, setPosition]   = useState({ x: 0, y: 0 })
  const isDragging   = useRef(false)
  const dragStart    = useRef({ x: 0, y: 0 })
  const panelRef     = useRef<HTMLDivElement>(null)
  // Bug fix #1: guard against onComplete firing more than once
  const hasCompleted = useRef(false)
  // Bug fix #2: store drag cleanup so unmount can remove window listeners mid-drag
  const cleanupDrag  = useRef<(() => void) | null>(null)

  // Clean up any lingering drag listeners if the component unmounts mid-drag
  useEffect(() => {
    return () => { cleanupDrag.current?.() }
  }, [])

  useEffect(() => {
    const handleAnalyze = () => {
      setAnalyzed(true)
      setVisible(true)
    }
    window.addEventListener('analyze-code', handleAnalyze)
    return () => window.removeEventListener('analyze-code', handleAnalyze)
  }, [])

  // Bug fix #1: hasCompleted ref ensures onComplete fires exactly once
  useEffect(() => {
    if (analyzed && slide === 1 && !pageCompleted && !hasCompleted.current) {
      hasCompleted.current = true
      onComplete()
    }
  }, [analyzed, slide, pageCompleted, onComplete])

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return
    isDragging.current = true
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y }

    const handleMouseMove = (ev: MouseEvent) => {
      if (!isDragging.current) return
      setPosition({
        x: ev.clientX - dragStart.current.x,
        y: ev.clientY - dragStart.current.y,
      })
    }

    const handleMouseUp = () => {
      isDragging.current = false
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      cleanupDrag.current = null
    }

    // Bug fix #2: store cleanup fn so the unmount effect can call it
    cleanupDrag.current = () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden relative">
      {/* Code viewer */}
      <div className="flex-1 overflow-auto p-4 font-mono text-xs leading-loose">
        <div className="text-slate-500 mb-2">{'/* view-source: https://www.voltmart.io/p/products/ultrabook-pro-x1 */'}</div>
        {/* Bug fix #3: plain text content — no dangerouslySetInnerHTML needed */}
        {HTML_LINES.map((line, i) => (
          <div
            key={i}
            className={line.isHighlight
              ? 'bg-amber-500/20 border-l-2 border-amber-400 pl-2 -ml-2 rounded-r text-amber-200'
              : 'text-slate-400'}
          >
            {line.content}
          </div>
        ))}
      </div>

      {/* Analysis panel (Draggable) */}
      {analyzed && visible && (
        <div 
          ref={panelRef}
          onMouseDown={handleMouseDown}
          style={{ bottom: 30, right: 30, transform: `translate(${position.x}px, ${position.y}px)` }}
          className="absolute z-10 w-80 bg-white border-2 border-[var(--color-brand-500)] shadow-2xl rounded-xl p-5 cursor-move animate-slide-right"
        >
          <div className="flex items-start justify-between mb-3 pointer-events-none">
            <span className="text-xs font-bold text-[var(--color-brand-700)] uppercase tracking-wider">
              Kai's Analysis — {slide + 1}/{SLIDES.length}
            </span>
            <button onClick={() => setVisible(false)} className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] pointer-events-auto">
              <EyeOff size={14} />
            </button>
          </div>
          <p className="text-sm font-bold text-[var(--color-text-primary)] mb-2">{SLIDES[slide].title}</p>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed pointer-events-none">{SLIDES[slide].body}</p>
          <div className="flex items-center justify-between mt-5 pointer-events-auto">
            <button
              onClick={(e) => { e.stopPropagation(); setSlide(s => Math.max(0, s - 1)) }}
              disabled={slide === 0}
              className="p-1.5 rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-slate-50 disabled:opacity-30 transition"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-1.5">
              {SLIDES.map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${i === slide ? 'bg-[var(--color-brand-500)]' : 'bg-slate-300'}`} />
              ))}
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setSlide(s => Math.min(SLIDES.length - 1, s + 1)) }}
              disabled={slide === SLIDES.length - 1}
              className="p-1.5 rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-slate-50 disabled:opacity-30 transition"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Re-show panel button */}
      {analyzed && !visible && (
        <div className="px-4 py-2 bg-slate-800 border-t border-slate-700 shrink-0">
          <button
            onClick={() => setVisible(true)}
            className="flex items-center gap-1.5 text-xs text-[var(--color-brand-400)] hover:text-[var(--color-brand-300)] transition"
          >
            <Eye size={12} /> Show analysis
          </button>
        </div>
      )}
    </div>
  )
}
