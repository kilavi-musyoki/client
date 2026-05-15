import { ShoppingCart, Shield, Search, User } from 'lucide-react'

export default function FakeSite() {
  return (
    <div className="h-full overflow-auto bg-white flex flex-col">
      {/* Nav — fake VoltMart */}
      <div className="bg-[#0e7a0e] text-white px-4 py-2.5 flex items-center justify-between text-sm shrink-0">
        <span className="font-bold tracking-tight text-lg">Compupoint</span>
        <div className="flex items-center gap-3 text-white/80">
          <Search size={15} />
          <span>🌐</span>
          <div className="w-7 h-7 rounded-full bg-red-200 flex items-center justify-center text-xs">
            <User size={13} className="text-red-700" />
          </div>
          <span className="text-sm">Priya ▾</span>
        </div>
      </div>

      {/* Suspicious URL bar */}
      <div className="bg-slate-100 border-b border-[var(--color-border)] px-4 py-1.5 shrink-0">
        <div className="flex items-center gap-2 bg-white border border-red-300 rounded px-2.5 py-1 text-xs font-mono max-w-xl">
          <Shield size={11} className="text-red-500 shrink-0" />
          <span className="text-red-600 font-medium">
            https://volt-mart.io?sid=hldpfpiv64r5csskkri6igbs2
          </span>
        </div>
      </div>

      {/* Fake green nav */}
      <div className="bg-[#8cbe22] px-4 py-2 flex items-center gap-4 text-white text-xs shrink-0">
        <span>Photography</span>
        <span>Computers</span>
        <span>Pro Video</span>
        <span>Lighting</span>
        <span>Pro Audio</span>
        <span>Mobile</span>
        <span>TV's and Entertainment</span>
        <span className="flex items-center gap-1">🏷️ Specials</span>
      </div>

      {/* Breadcrumb */}
      <div className="px-5 py-3 text-xs text-[var(--color-text-muted)]">
        Home {'>'} Computers {'>'} Featured Laptops {'>'} Laptops {'>'} Gaming Laptops {'>'} Lenovo Legion Y7000
      </div>

      {/* Product content (mirror of real site) */}
      <div className="px-5 max-w-3xl">
        <h1 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">
          Lenovo 15.6" Legion Y7000 Gaming Laptop · <span className="text-sm font-normal text-[var(--color-text-muted)]">C&C #LE81LF0004US · MFR #81LF0004US</span>
        </h1>

        <div className="flex gap-6">
          <div className="w-48 h-40 rounded-lg border border-[var(--color-border)] shadow-sm bg-white shrink-0 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80" 
              alt="Lenovo Legion Y7000"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
            <p className="text-sm font-semibold text-emerald-600 mb-1">In Stock</p>
            <p className="text-xs text-blue-600 mb-3">Order <strong>now</strong> to ship <strong className="text-orange-500">today</strong></p>

            <p className="text-sm text-orange-500 font-medium mb-2">Featured: Great for all around gaming</p>
            <p className="text-xs text-[var(--color-text-muted)] mb-2">VR-ready GPU makes for immersive visuals</p>

            <ul className="text-xs text-[var(--color-text-secondary)] space-y-0.5 mb-3">
              <li>- 2.2 GHz Intel Core i7-875GH Six-Core</li>
              <li>- 16GB of DDR4 Ram | 512GB PCIe SSD</li>
              <li>- 15.6" FHD 1920 x 1080 144Hz IPS Display</li>
              <li>- NVIDIA GeForce GTX (6GB GDDR5)</li>
            </ul>
          </div>

          {/* Price box */}
          <div className="w-48 border border-[var(--color-border)] rounded-lg p-3 shrink-0 h-fit">
            <p className="text-xs text-[var(--color-text-muted)]">Reg. Price: <span className="line-through">$1,599.00</span></p>
            <p className="text-xs text-[var(--color-text-muted)]">Instant Savings: <strong>$500.00</strong></p>
            <p className="text-xs text-[var(--color-text-muted)] mb-2">Limited supply at this price</p>
            <p className="text-xl font-bold text-red-600 mb-2 text-right">$1,099.00</p>
            <button className="w-full bg-[#0ea5e9] hover:bg-[#0284c7] text-white text-sm font-medium py-2 rounded transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Warning banner */}
      <div className="mt-auto mx-4 mb-4 bg-red-50 border-2 border-red-300 rounded-xl p-4 animate-fade-in">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
            <Shield size={16} className="text-red-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-red-800 mb-1">⚠️ This is Kai's fake site!</p>
            <p className="text-xs text-red-700 leading-relaxed">
              Priya has been redirected from <strong>voltmart.io</strong> to <strong>volt-mart.io</strong> (note the hyphen).
              Her session cookie has been captured in the URL parameter. She is now viewing Kai's malicious clone of VoltMart.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
