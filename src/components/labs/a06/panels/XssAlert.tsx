import { useState, useRef, useEffect } from 'react'
import { ShoppingCart, Shield, AlertTriangle } from 'lucide-react'

export default function XssAlert() {
  const [showAlert, setShowAlert] = useState(true)
  const [dismissed, setDismissed] = useState(false)
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

  return (
    <div className="h-full overflow-auto bg-white flex flex-col relative">
      {/* Nav */}
      <div className="bg-[var(--color-brand-700)] text-white px-4 py-2.5 flex items-center justify-between text-sm shrink-0">
        <span className="font-bold tracking-tight">VoltMart</span>
        <div className="flex items-center gap-3 text-white/80 text-xs">
          <span>Electronics</span><span>Gaming</span>
          <ShoppingCart size={14} className="text-white ml-1" />
        </div>
      </div>

      {/* URL bar with injected payload */}
      <div className="bg-slate-100 border-b border-[var(--color-border)] px-4 py-1.5 shrink-0">
        <div className="flex items-center gap-2 bg-white border border-[var(--color-border)] rounded px-2.5 py-1 text-[10px] font-mono text-[var(--color-text-muted)] max-w-full overflow-hidden">
          <Shield size={11} className="text-[var(--color-success)] shrink-0" />
          <span className="truncate">
            https://www.voltmart.io/p/products/ultrabook-pro-x1#glideview/0,&lt;img src=x onerror=javascript:alert('xss_confirmed')&gt;/
          </span>
        </div>
      </div>

      {/* Dimmed product page */}
      <div className="flex-1 flex items-center justify-center bg-slate-50 relative">
        {/* Faded product content behind */}
        <div className="absolute inset-0 opacity-30 p-6">
          <div className="flex gap-5 max-w-xl mx-auto mt-8">
            <div className="w-44 h-32 rounded-xl overflow-hidden border border-[var(--color-border)] shadow-sm bg-white shrink-0 relative">
              <img 
                src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80" 
                alt="UltraBook Pro X1"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-bold text-sm">UltraBook Pro X1</h2>
              <p className="text-lg font-bold mt-2">£1,199.00</p>
            </div>
          </div>
        </div>

        {/* JavaScript Alert dialog */}
        {showAlert && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10 animate-fade-in">
            <div 
              ref={panelRef}
              onMouseDown={handleMouseDown}
              style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
              className="bg-[#f0f0f0] rounded-lg shadow-2xl w-80 overflow-hidden border border-slate-300 animate-fade-in cursor-move"
            >
              {/* Title bar */}
              <div className="bg-slate-200 px-4 py-2 flex items-center gap-2 border-b border-slate-300 pointer-events-none">
                <AlertTriangle size={14} className="text-amber-500" />
                <span className="text-xs font-semibold text-[var(--color-text-primary)]">
                  The page at www.voltmart.io says:
                </span>
              </div>
              {/* Message */}
              <div className="px-6 py-5 text-center pointer-events-none">
                <p className="text-sm text-[var(--color-text-primary)] font-mono">xss_confirmed</p>
              </div>
              {/* OK button */}
              <div className="px-4 py-3 bg-[#f0f0f0] border-t border-slate-200 flex justify-center pointer-events-auto">
                <button
                  id="alert-ok-btn"
                  onClick={(e) => { e.stopPropagation(); setShowAlert(false); setDismissed(true) }}
                  className="bg-white hover:bg-slate-50 border border-slate-300 text-sm font-medium text-[var(--color-text-primary)] px-8 py-1.5 rounded transition shadow-sm"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success indicator after dismissal */}
        {dismissed && !showAlert && (
          <div className="relative z-10 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-red-50 border-2 border-red-200 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={28} className="text-red-500" />
            </div>
            <p className="text-base font-bold text-[var(--color-text-primary)]">XSS Vulnerability Confirmed!</p>
            <p className="text-sm text-[var(--color-text-secondary)] mt-2 max-w-xs mx-auto">
              The GlideView plugin executed arbitrary JavaScript injected through the URL hash.
            </p>
            <p className="text-xs text-[var(--color-text-muted)] mt-3">Click <strong>Next</strong> to continue →</p>
          </div>
        )}
      </div>
    </div>
  )
}
