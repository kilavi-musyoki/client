import { useState, useRef, useEffect } from 'react'
import { ShoppingCart, Shield, Copy, Check, CornerDownLeft, X } from 'lucide-react'

interface Props { onComplete: () => void; pageCompleted: boolean }

const PAYLOAD = `,<img src=x onerror=javascript:alert('xss_confirmed')>/`
const BASE_URL = 'https://www.voltmart.io/p/products/ultrabook-pro-x1#glideview/0'
const FULL_URL = `https://www.voltmart.io/p/products/ultrabook-pro-x1#glideview/0${PAYLOAD}`

export default function UrlInject({ onComplete, pageCompleted }: Props) {
  const [urlValue, setUrlValue] = useState(BASE_URL)
  const [submitted, setSubmitted] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const isDragging = useRef(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const panelRef = useRef<HTMLDivElement>(null)
  const cleanupDrag = useRef<(() => void) | null>(null)

  useEffect(() => {
    return () => { cleanupDrag.current?.() }
  }, [])

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

  const handleSubmit = () => {
    if (urlValue.includes('onerror')) {
      setShowAlert(true)
    }
  }

  const handleDismissAlert = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setShowAlert(false)
    setSubmitted(true)
    onComplete()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div className="h-full overflow-auto bg-white flex flex-col">
      {/* Nav */}
      <div className="bg-[var(--color-brand-700)] text-white px-4 py-2.5 flex items-center justify-between text-sm shrink-0">
        <span className="font-bold tracking-tight">VoltMart</span>
        <div className="flex items-center gap-3 text-white/80 text-xs">
          <span>Electronics</span><span>Gaming</span>
          <ShoppingCart size={14} className="text-white ml-1" />
        </div>
      </div>

      {/* Editable URL bar */}
      <div className="bg-slate-100 border-b border-[var(--color-border)] px-4 py-2 shrink-0">
        <div className="flex items-center gap-2 max-w-2xl">
          <div className="flex-1 flex items-center gap-2 bg-white border-2 border-amber-300 rounded px-2.5 py-1.5 shadow-sm">
            <Shield size={11} className="text-[var(--color-success)] shrink-0" />
            <input
              id="url-input"
              type="text"
              value={urlValue}
              onChange={e => setUrlValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 text-xs font-mono text-[var(--color-text-primary)] outline-none bg-transparent"
              spellCheck={false}
            />
          </div>
          <button
            id="url-submit-btn"
            onClick={handleSubmit}
            disabled={!urlValue.includes('onerror')}
            className="flex items-center gap-1 bg-[var(--color-brand-600)] hover:bg-[var(--color-brand-700)] disabled:bg-slate-200 disabled:text-[var(--color-text-muted)] text-white text-xs font-medium px-3 py-1.5 rounded transition"
          >
            <CornerDownLeft size={12} /> Enter
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[var(--color-surface)]">
        {!submitted ? (
          <div className="w-full max-w-lg space-y-5 animate-fade-in">
            {/* Instructions */}
            <div className="bg-white rounded-xl border border-[var(--color-border)] p-5">
              <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">Steps:</p>
              <ol className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                <li className="flex items-start gap-2">
                  <span className={`w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center shrink-0 bg-slate-100 text-[var(--color-text-muted)]`}>1</span>
                  <span><strong>Manually copy</strong> the payload from the instructions panel.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className={`w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center shrink-0 bg-slate-100 text-[var(--color-text-muted)]`}>2</span>
                  <span><strong>Paste</strong> it into the end of the URL bar above.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className={`w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center shrink-0 bg-slate-100 text-[var(--color-text-muted)]`}>3</span>
                  <span>Press <strong>Enter</strong> or click the submit button to execute.</span>
                </li>
              </ol>
            </div>
          </div>
        ) : (
          <div className="text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mx-auto mb-4">
              <Check size={28} className="text-emerald-600" />
            </div>
            <p className="text-base font-semibold text-[var(--color-text-primary)]">Payload submitted!</p>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1">Click Next to see what happens…</p>
          </div>
        )}
      </div>

      {/* Custom XSS Alert Overlay */}
      {showAlert && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-50">
          <div 
            ref={panelRef}
            onMouseDown={handleMouseDown}
            style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
            className="bg-white rounded border border-[var(--color-border)] shadow-xl w-80 overflow-hidden animate-fade-in flex flex-col cursor-move"
          >
            <div className="bg-slate-100 px-3 py-2 border-b border-[var(--color-border)] flex items-center justify-between text-xs font-medium text-slate-700 pointer-events-none">
              www.voltmart.io says
              <button onClick={handleDismissAlert} className="text-slate-400 hover:text-slate-600 pointer-events-auto"><X size={14}/></button>
            </div>
            <div className="p-5 text-sm text-slate-800 font-mono pointer-events-none">
              xss_confirmed
            </div>
            <div className="px-4 py-3 bg-slate-50 border-t border-[var(--color-border)] flex justify-end pointer-events-auto">
              <button 
                onClick={handleDismissAlert}
                className="bg-[var(--color-brand-600)] hover:bg-[var(--color-brand-700)] text-white text-xs font-medium px-4 py-1.5 rounded transition"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
