import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Search, Shield, Terminal as TermIcon, User, EyeOff } from 'lucide-react'

interface Props { onComplete: () => void; pageCompleted: boolean }

const LOG_LINE = `192.168.1.110 - - [26/Aug/2024:17:06:41 +1000] "GET /?sid=hldpfpiv64r5csskkri6igbs2 HTTP/1.0" 200 3488 "-"
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0 Safari/537.36"`

const ANALYSIS_SLIDES = [
  {
    title: 'GET Request Detected',
    body: "When Priya opened the URL, Kai's Apache log file registered a GET request from her IP address (192.168.1.110). This request was triggered automatically by the XSS payload redirecting her browser to volt-mart.io.",
  },
  {
    title: 'Session ID Captured!',
    body: "On closer inspection, the 'sid' query parameter contains Priya's session ID: hldpfpiv64r5csskkri6igbs2. This is her active VoltMart authentication cookie — captured without her knowledge.",
  },
]

export default function TerminalLogs({ onComplete, pageCompleted }: Props) {
  const [analyzed, setAnalyzed] = useState(false)
  const [slide, setSlide] = useState(0)
  const [visible, setVisible] = useState(true)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  
  const isDragging = useRef(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const panelRef = useRef<HTMLDivElement>(null)
  const cleanupDrag = useRef<(() => void) | null>(null)
  const hasCompleted = useRef(false)

  // Clean up any lingering drag listeners if the component unmounts mid-drag
  useEffect(() => {
    return () => { cleanupDrag.current?.() }
  }, [])

  // Fire onComplete on last slide
  useEffect(() => {
    if (analyzed && slide === ANALYSIS_SLIDES.length - 1 && !pageCompleted && !hasCompleted.current) {
      hasCompleted.current = true
      onComplete()
    }
  }, [analyzed, slide, pageCompleted, onComplete])

  const handleAnalyze = () => {
    setAnalyzed(true)
    setVisible(true)
  }

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

    cleanupDrag.current = () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  return (
    <div className="h-full flex flex-col bg-[#0d1b2a] overflow-hidden relative">
      {/* Fake site header (collapsed) */}
      <div className="bg-[#0e7a0e] text-white px-4 py-2 flex items-center justify-between text-sm shrink-0">
        <span className="font-bold">Compupoint</span>
        <div className="flex items-center gap-2 text-white/80 text-xs">
          <Search size={13} />
          <span>🌐</span>
          <div className="w-6 h-6 rounded-full bg-red-200 flex items-center justify-center">
            <User size={11} className="text-red-700" />
          </div>
          <span>Priya ▾</span>
        </div>
      </div>

      {/* URL bar */}
      <div className="bg-slate-100 border-b border-[var(--color-border)] px-4 py-1 shrink-0">
        <div className="flex items-center gap-2 bg-white border border-[var(--color-border)] rounded px-2 py-0.5 text-[10px] font-mono text-red-600 max-w-xl">
          <Shield size={9} className="text-red-500 shrink-0" />
          https://volt-mart.io?sid=hldpfpiv64r5csskkri6igbs2
        </div>
      </div>

      {/* Mini fake site content */}
      <div className="bg-[#8cbe22] px-4 py-1.5 flex items-center gap-3 text-white text-[10px] shrink-0">
        <span>Photography</span><span>Computers</span><span>Pro Video</span><span>Lighting</span><span>Pro Audio</span>
      </div>
      <div className="bg-white px-4 py-2 text-xs text-[var(--color-text-muted)] border-b border-[var(--color-border)] shrink-0">
        Home {'>'} Computers {'>'} Laptops {'>'} Lenovo Legion Y7000
      </div>
      <div className="bg-white px-4 py-2 flex items-center gap-3 shrink-0">
        <div className="w-20 h-12 bg-slate-800 rounded flex items-center justify-center text-xl">💻</div>
        <div>
          <p className="text-xs font-bold">Lenovo 15.6" Legion Y7000 Gaming Laptop</p>
          <p className="text-xs text-[var(--color-text-muted)]">In Stock</p>
        </div>
      </div>

      {/* Expand handle */}
      <div className="flex items-center justify-center py-1 bg-[#1b2838] border-t border-[#2a3a4e] shrink-0">
        <div className="w-8 h-1 rounded-full bg-slate-600" />
      </div>

      {/* Console section */}
      <div className="bg-[#1b2838] px-4 py-2 flex items-center gap-2 border-b border-[#2a3a4e] shrink-0">
        <div className="w-6 h-6 rounded border border-amber-500/50 flex items-center justify-center">
          <TermIcon size={12} className="text-amber-400" />
        </div>
        <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Console</span>
      </div>

      {/* Log output */}
      <div className="flex-1 overflow-auto p-4 font-mono text-xs">
        <div className="text-cyan-400 mb-2">
          kai@192.168.1.50-hosting-linux:~# tail -f /var/log/apache2/access.log
        </div>
        <div className="text-slate-300 leading-relaxed whitespace-pre-wrap">
          {LOG_LINE.split('\n').map((line, i) => (
            <div key={i}>
              {line.includes('sid=') ? (
                <span>
                  {line.split('sid=')[0]}
                  <span className="text-red-400 font-bold bg-red-900/30 px-0.5 rounded">sid=hldpfpiv64r5csskkri6igbs2</span>
                  {line.split('hldpfpiv64r5csskkri6igbs2')[1]}
                </span>
              ) : line}
            </div>
          ))}
        </div>
      </div>

      {/* Analyze button (bottom bar) */}
      {!analyzed && (
        <div className="px-4 py-3 bg-[#1b2838] border-t border-[#2a3a4e] shrink-0">
          <button
            id="analyze-output-btn"
            onClick={handleAnalyze}
            className="w-full bg-[var(--color-brand-600)] hover:bg-[var(--color-brand-700)] text-white text-sm font-medium py-2 rounded-lg transition"
          >
            Analyze Output
          </button>
        </div>
      )}

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
              Kai's Analysis — {slide + 1}/{ANALYSIS_SLIDES.length}
            </span>
            <button onClick={() => setVisible(false)} className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] pointer-events-auto">
              <EyeOff size={14} />
            </button>
          </div>
          <p className="text-sm font-bold text-[var(--color-text-primary)] mb-2">{ANALYSIS_SLIDES[slide].title}</p>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed pointer-events-none">{ANALYSIS_SLIDES[slide].body}</p>
          <div className="flex items-center justify-between mt-5 pointer-events-auto">
            <button
              onClick={(e) => { e.stopPropagation(); setSlide(s => Math.max(0, s - 1)) }}
              disabled={slide === 0}
              className="p-1.5 rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-slate-50 disabled:opacity-30 transition"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-1.5">
              {ANALYSIS_SLIDES.map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${i === slide ? 'bg-[var(--color-brand-500)]' : 'bg-slate-300'}`} />
              ))}
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setSlide(s => Math.min(ANALYSIS_SLIDES.length - 1, s + 1)) }}
              disabled={slide === ANALYSIS_SLIDES.length - 1}
              className="p-1.5 rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-slate-50 disabled:opacity-30 transition"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
