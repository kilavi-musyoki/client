import { useState } from 'react'
import { ShoppingCart, Star, Shield, X, ThumbsUp } from 'lucide-react'

interface Props { onComplete: () => void; pageCompleted: boolean }

export default function ProductLightbox({ onComplete, pageCompleted }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const openLightbox = () => {
    setLightboxOpen(true)
    onComplete()
  }

  return (
    <div className="h-full overflow-auto bg-white flex flex-col relative">
      {/* Nav */}
      <div className="bg-[var(--color-brand-700)] text-white px-4 py-2.5 flex items-center justify-between text-sm shrink-0">
        <span className="font-bold tracking-tight">VoltMart</span>
        <div className="flex items-center gap-3 text-white/80 text-xs">
          <span>Electronics</span><span>Gaming</span><span>Appliances</span>
          <ShoppingCart size={15} className="text-white ml-1" />
        </div>
      </div>

      {/* URL bar */}
      <div className="bg-slate-100 border-b border-[var(--color-border)] px-4 py-1.5 shrink-0">
        <div className="flex items-center gap-2 bg-white border border-[var(--color-border)] rounded px-2.5 py-1 text-xs font-mono text-[var(--color-text-secondary)] max-w-xl">
          <Shield size={11} className="text-[var(--color-success)] shrink-0" />
          <span>
            https://www.voltmart.io/p/products/ultrabook-pro-x1
            {lightboxOpen && (
              <span className="relative inline-block">
                <span className="text-amber-600 font-bold animate-pulse">#glideview/0</span>
                <span className="absolute top-6 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm whitespace-nowrap animate-bounce flex flex-col items-center z-20">
                  <span className="absolute -top-1.5 border-[3px] border-transparent border-b-amber-500"></span>
                  URL Changed!
                </span>
              </span>
            )}
          </span>
        </div>
      </div>

      {/* Product */}
      <div className="flex-1 p-5 max-w-xl mx-auto w-full">
        <p className="text-xs text-[var(--color-text-muted)] mb-3">Home › Laptops › UltraBook Pro X1</p>

        <div className="flex gap-5 mb-4">
          {/* Clickable image */}
          <button
            id="product-image-btn"
            onClick={openLightbox}
            className={`w-1/2 rounded-xl overflow-hidden border bg-white shrink-0 relative group transition-all cursor-pointer ${
              !lightboxOpen ? 'border-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.3)]' : 'border-[var(--color-border)] shadow-sm'
            }`}
          >
            <img 
              src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80" 
              alt="UltraBook Pro X1"
              className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
            />
            {!lightboxOpen && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-amber-400 text-amber-900 text-[10px] font-bold px-2 py-1 rounded shadow-sm animate-bounce">
                  Click to preview
                </div>
              </div>
            )}
          </button>

          <div className="w-1/2 flex flex-col">
            <h2 className="font-bold text-[var(--color-text-primary)] text-lg leading-tight">
              UltraBook Pro X1
            </h2>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1 mb-2">
              Intel Core i7, 16GB RAM, 512GB NVMe SSD, 14" Retina Display
            </p>
            <div className="flex items-center gap-1 mb-3">
              {[1,2,3,4].map(i => <Star key={i} size={12} className="text-amber-400 fill-amber-400" />)}
              <Star size={12} className="text-amber-400" />
              <span className="text-xs text-[var(--color-text-muted)] ml-1 hover:underline cursor-pointer">(1,249 reviews)</span>
            </div>
            <div className="text-2xl font-bold text-red-600">£1,199.00</div>
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="flex gap-2 mt-3">
          {[1,2,3].map(i => (
            <div key={i} onClick={openLightbox}
              className="w-16 h-12 rounded border border-[var(--color-border)] overflow-hidden cursor-pointer hover:border-[var(--color-brand-400)] transition opacity-60 hover:opacity-100"
            >
              <img 
                src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=150&q=60" 
                alt="Thumbnail"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox overlay */}
      {lightboxOpen && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden animate-fade-in">
            <div className="relative bg-white p-2 flex items-center justify-center">
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition shadow z-10"
              >
                <X size={16} />
              </button>
              <img 
                src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1200&q=90" 
                alt="Enlarged UltraBook Pro X1"
                className="w-full max-h-[60vh] object-contain rounded"
              />
            </div>
            <div className="px-4 py-3 flex items-center justify-between border-t border-[var(--color-border)]">
              <span className="text-sm text-[var(--color-text-secondary)]">
                UltraBook Pro X1 — Gaming Laptop
              </span>
              <button className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 border border-blue-200 px-2 py-1 rounded hover:bg-blue-100 transition">
                <ThumbsUp size={10} /> Like (9)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
