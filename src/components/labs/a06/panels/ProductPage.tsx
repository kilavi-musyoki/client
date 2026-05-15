import { ShoppingCart, Star, Shield, Truck, RotateCcw } from 'lucide-react'

export default function ProductPage() {
  return (
    <div className="h-full overflow-auto bg-white">
      {/* Nav */}
      <div className="bg-[var(--color-brand-700)] text-white px-4 py-2.5 flex items-center justify-between text-sm">
        <span className="font-bold tracking-tight">VoltMart</span>
        <div className="flex items-center gap-3 text-white/80 text-xs">
          <span>Electronics</span><span>Gaming</span><span>Appliances</span>
          <ShoppingCart size={15} className="text-white ml-1" />
        </div>
      </div>

      {/* URL bar */}
      <div className="bg-slate-100 border-b border-[var(--color-border)] px-4 py-1.5">
        <div className="flex items-center gap-2 bg-white border border-[var(--color-border)] rounded px-2.5 py-1 text-xs font-mono text-[var(--color-text-secondary)] max-w-xl">
          <Shield size={11} className="text-[var(--color-success)] shrink-0" />
          https://www.voltmart.io/p/products/ultrabook-pro-x1-i7-16gb-512ssd
        </div>
      </div>

      {/* Product */}
      <div className="p-5 max-w-xl mx-auto">
        <p className="text-xs text-[var(--color-text-muted)] mb-3">Home › Laptops › UltraBook Pro X1</p>

        <div className="flex gap-5">
          {/* Image */}
          <div className="w-1/2 rounded-xl overflow-hidden border border-[var(--color-border)] shadow-sm bg-white shrink-0 relative group">
            <img 
              src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80" 
              alt="UltraBook Pro X1"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
              Sale
            </div>
          </div>

          {/* Details */}
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
            <div className="flex items-end gap-2 mb-4">
              <span className="text-2xl font-bold text-red-600">£1,199.00</span>
              <span className="text-sm text-[var(--color-text-muted)] line-through mb-1">£1,499.00</span>
            </div>
            
            <div className="mt-auto space-y-2">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-[var(--color-text-secondary)]">Quantity:</span>
                <select className="border border-[var(--color-border)] rounded px-2 py-1 text-xs">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </div>
              <button className="w-full flex justify-center items-center gap-2 bg-[var(--color-brand-600)] hover:bg-[var(--color-brand-700)] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition shadow-sm">
                <ShoppingCart size={15} /> Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            { icon: Truck,     text: 'Free next-day delivery' },
            { icon: RotateCcw, text: '30-day returns' },
            { icon: Shield,    text: '2-year warranty' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)] bg-slate-50 border border-[var(--color-border)] px-2.5 py-1.5 rounded-lg">
              <Icon size={11} className="text-[var(--color-brand-500)]" /> {text}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
