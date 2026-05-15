import { ShoppingCart, Shield, Search, Star, Package } from 'lucide-react'

export default function IntroCard() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-[var(--color-surface)]">
      <div className="w-full max-w-md animate-fade-in">
        {/* VoltMart header */}
        <div className="bg-white rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-panel)] overflow-hidden">
          <div className="bg-gradient-to-r from-[var(--color-brand-600)] to-[var(--color-brand-700)] px-6 py-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Package size={18} className="text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-lg tracking-tight">VoltMart</div>
              <div className="text-white/70 text-xs">Electronics & Gaming</div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <ShoppingCart size={18} className="text-white/80" />
            </div>
          </div>

          {/* Fake search bar */}
          <div className="px-6 py-4 border-b border-[var(--color-border)]">
            <div className="flex items-center gap-2 bg-slate-50 border border-[var(--color-border)] rounded-lg px-3 py-2">
              <Search size={14} className="text-[var(--color-text-muted)]" />
              <span className="text-sm text-[var(--color-text-muted)]">Search laptops, TVs, gaming gear…</span>
            </div>
          </div>

          {/* Body */}
          <div className="px-6 py-5 space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50 border border-emerald-200">
              <Shield size={16} className="text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-emerald-800">Bug Bounty Program — Now Live</p>
                <p className="text-xs text-emerald-700 mt-0.5">
                  VoltMart invites independent security researchers to help us keep our customers safe.
                  Rewards up to $5,000 for critical vulnerabilities.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Products', val: '50k+' },
                { label: 'Customers', val: '1.2M' },
                { label: 'Countries', val: '28' },
              ].map(({ label, val }) => (
                <div key={label} className="text-center py-3 rounded-lg bg-slate-50 border border-[var(--color-border)]">
                  <div className="font-bold text-[var(--color-text-primary)]">{val}</div>
                  <div className="text-xs text-[var(--color-text-muted)] mt-0.5">{label}</div>
                </div>
              ))}
            </div>

            {/* Ratings */}
            <div className="flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)]">
              {[1,2,3,4,5].map(i => <Star key={i} size={13} className="text-amber-400 fill-amber-400" />)}
              <span className="ml-1 text-xs text-[var(--color-text-muted)]">4.8 · Trusted by over a million shoppers</span>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-[var(--color-text-muted)] mt-4">
          This is a simulated environment for educational purposes only.
        </p>
      </div>
    </div>
  )
}
