import { Shield, AlertTriangle, ArrowRight, User, Key, Cookie } from 'lucide-react'

export default function SessionHijack() {
  return (
    <div className="h-full overflow-auto bg-[var(--color-surface)] p-5">
      <div className="max-w-lg mx-auto space-y-4">
        <div className="text-center py-4 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-red-50 border-2 border-red-200 flex items-center justify-center mx-auto mb-3">
            <AlertTriangle size={28} className="text-red-500" />
          </div>
          <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Session Hijacked!</h2>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">Kai now has full access to Priya's VoltMart account</p>
        </div>

        <div className="bg-white rounded-xl border border-[var(--color-border)] shadow-sm overflow-hidden">
          <div className="p-4 border-b border-[var(--color-border)]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center"><User size={14} className="text-purple-600" /></div>
              <div><p className="text-sm font-semibold">Priya's Browser</p><p className="text-xs text-[var(--color-text-muted)]">voltmart.io session</p></div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 font-mono text-xs text-amber-700 font-bold flex items-center gap-2">
              <Cookie size={12} className="text-amber-500" /> hldpfpiv64r5csskkri6igbs2
            </div>
          </div>
          <div className="flex items-center justify-center py-2 bg-red-50"><span className="text-xs font-semibold text-red-600 flex items-center gap-1">STOLEN <ArrowRight size={12} /></span></div>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center"><User size={14} className="text-red-600" /></div>
              <div><p className="text-sm font-semibold">Kai's Logs</p><p className="text-xs text-[var(--color-text-muted)]">volt-mart.io</p></div>
            </div>
            <div className="bg-slate-900 rounded-lg p-2 font-mono text-xs text-slate-300">
              <span className="text-cyan-400">GET</span> /?sid=<span className="text-red-400 font-bold">hldpfpiv64r5csskkri6igbs2</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[var(--color-border)] p-4">
          <p className="text-xs font-bold mb-3 uppercase tracking-wide">Kai can now access:</p>
          <div className="grid grid-cols-2 gap-2">
            {[['📦','Order History'],['🏠','Addresses'],['💳','Payment Methods'],['👤','Personal Details']].map(([icon,label]) => (
              <div key={label} className="flex items-center gap-2 bg-red-50 rounded-lg p-2.5 border border-red-100">
                <span>{icon}</span><span className="text-xs font-medium text-red-800">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-2">
          <Key size={14} className="text-amber-600 mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-bold text-amber-800 mb-1">Root Cause</p>
            <p className="text-xs text-amber-700">A single outdated library — <strong>GlideView 2.0.4</strong> — enabled a full session hijack. A patch was available for over a year.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
