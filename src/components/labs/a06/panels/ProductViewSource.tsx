import { Shield, ShoppingCart, Star } from 'lucide-react'

export default function ProductViewSource() {

  return (
    <div className="h-full overflow-auto bg-white flex flex-col">
      {/* Nav */}
      <div className="bg-[var(--color-brand-700)] text-white px-4 py-2 flex items-center justify-between text-sm shrink-0">
        <span className="font-bold tracking-tight">VoltMart</span>
        <div className="flex items-center gap-3 text-white/80 text-xs">
          <span>Electronics</span><span>Gaming</span>
          <ShoppingCart size={14} className="text-white ml-1" />
        </div>
      </div>

      <div className="bg-slate-100 border-b border-[var(--color-border)] px-4 py-1.5 shrink-0">
        <div className="flex items-center gap-2 bg-white border border-[var(--color-border)] rounded px-2.5 py-1 text-xs font-mono text-[var(--color-text-secondary)] max-w-xl">
          <Shield size={11} className="text-[var(--color-success)] shrink-0" />
          https://www.voltmart.io/p/products/ultrabook-pro-x1-i7-16gb-512ssd
        </div>
      </div>

      <div className="flex-1 p-5 max-w-xl mx-auto w-full">
          <p className="text-xs text-[var(--color-text-muted)] mb-3">Home › Laptops › UltraBook Pro X1</p>
          <div className="flex gap-5 mb-4">
            <div className="w-1/2 rounded-xl overflow-hidden border border-[var(--color-border)] shadow-sm bg-white shrink-0 relative">
              <img 
                src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80" 
                alt="UltraBook Pro X1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-[var(--color-text-primary)] text-sm">UltraBook Pro X1 — Core i7, 16GB, 512GB</h2>
              <div className="flex items-center gap-1 mt-1 mb-2">
                {[1,2,3,4,5].map(i => <Star key={i} size={10} className="text-amber-400 fill-amber-400" />)}
              </div>
              <div className="text-lg font-bold text-[var(--color-brand-700)]">£1,199.00</div>
            </div>
          </div>

        </div>
    </div>
  )
}
