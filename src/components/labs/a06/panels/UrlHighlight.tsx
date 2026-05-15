import { ShoppingCart, Shield, X, ThumbsUp } from 'lucide-react'

export default function UrlHighlight() {
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

      {/* URL bar with highlight */}
      <div className="bg-slate-100 border-b border-[var(--color-border)] px-4 py-1.5 shrink-0">
        <div className="flex items-center gap-2 bg-white border border-[var(--color-border)] rounded px-2.5 py-1 text-xs font-mono text-[var(--color-text-secondary)] max-w-xl">
          <Shield size={11} className="text-[var(--color-success)] shrink-0" />
          <span>
            https://www.voltmart.io/p/products/ultrabook-pro-x1
            <span className="relative inline-block">
              <span className="text-amber-600 font-bold animate-pulse">#glideview/</span>
              <span className="relative">
                <span className="text-red-600 font-bold text-sm animate-pulse">0</span>
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded whitespace-nowrap animate-fade-in">
                  ← injection point
                </span>
              </span>
            </span>
          </span>
        </div>
      </div>

      {/* Product page dimmed with lightbox */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden">
            <div className="relative bg-white p-2 flex items-center justify-center">
              <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition shadow z-10">
                <X size={16} />
              </button>
              <img 
                src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1200&q=90" 
                alt="Enlarged UltraBook Pro X1"
                className="w-full max-h-[60vh] object-contain rounded"
              />
            </div>
            <div className="px-4 py-3 flex items-center justify-between border-t border-[var(--color-border)]">
              <span className="text-sm text-[var(--color-text-secondary)]">UltraBook Pro X1</span>
              <button className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 border border-blue-200 px-2 py-1 rounded">
                <ThumbsUp size={10} /> Like (9)
              </button>
            </div>
          </div>
        </div>

        {/* Annotation overlay */}
        <div className="absolute bottom-4 left-4 right-4 bg-slate-900/95 rounded-lg p-4 backdrop-blur animate-fade-in">
          <p className="text-sm text-white font-medium mb-1">🎯 URL Hash Fragment</p>
          <p className="text-xs text-slate-300 leading-relaxed">
            The GlideView plugin reads the value after <code className="bg-slate-700 px-1 rounded text-amber-300">#glideview/</code> directly
            from the URL. The <code className="bg-slate-700 px-1 rounded text-red-300">0</code> represents the image index.
            Since this value is <strong className="text-white">user-controlled</strong>, it's a potential injection point.
          </p>
        </div>
      </div>
    </div>
  )
}
