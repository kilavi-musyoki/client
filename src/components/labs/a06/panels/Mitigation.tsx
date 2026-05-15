import { Shield, CheckCircle, ArrowRight, RefreshCw, Search, FileText, AlertTriangle } from 'lucide-react'

export default function Mitigation() {
  return (
    <div className="h-full overflow-auto bg-[var(--color-surface)] p-5">
      <div className="max-w-lg mx-auto space-y-4">
        <div className="text-center py-3 animate-fade-in">
          <div className="w-14 h-14 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mx-auto mb-3">
            <Shield size={24} className="text-emerald-600" />
          </div>
          <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Mitigation Strategies</h2>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">How to prevent component-based vulnerabilities</p>
        </div>

        {/* Version comparison */}
        <div className="bg-white rounded-xl border border-[var(--color-border)] shadow-sm p-4">
          <p className="text-xs font-bold uppercase tracking-wide mb-3">The Fix</p>
          <div className="flex items-center justify-center gap-3">
            <div className="text-center bg-red-50 border border-red-200 rounded-lg px-4 py-3 flex-1">
              <p className="text-xs text-red-600 font-semibold mb-1">Vulnerable</p>
              <p className="text-lg font-bold text-red-700">v2.0.4</p>
            </div>
            <ArrowRight size={20} className="text-[var(--color-text-muted)] shrink-0" />
            <div className="text-center bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3 flex-1">
              <p className="text-xs text-emerald-600 font-semibold mb-1">Patched</p>
              <p className="text-lg font-bold text-emerald-700">v2.1.0</p>
            </div>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] text-center mt-2">One version bump. One patched dependency. Completely different outcome.</p>
        </div>

        {/* Best practices */}
        <div className="bg-white rounded-xl border border-[var(--color-border)] shadow-sm p-4">
          <p className="text-xs font-bold uppercase tracking-wide mb-3">Best Practices</p>
          <div className="space-y-3">
            {[
              { icon: RefreshCw, title: 'Keep dependencies up-to-date', desc: 'Regularly update all third-party libraries and frameworks to their latest stable versions.' },
              { icon: Search, title: 'Audit your dependency tree', desc: 'Use tools like npm audit, Snyk, or OWASP Dependency-Check to scan for known vulnerabilities.' },
              { icon: FileText, title: 'Establish security policies', desc: 'Require security reviews for all new dependencies. Remove unused libraries.' },
              { icon: AlertTriangle, title: 'Monitor CVE databases', desc: 'Subscribe to NVD alerts and vendor advisories for components in your stack.' },
            ].map(item => (
              <div key={item.title} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[var(--color-brand-50)] flex items-center justify-center shrink-0 mt-0.5">
                  <item.icon size={13} className="text-[var(--color-brand-600)]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--color-text-primary)]">{item.title}</p>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key takeaway */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <div className="flex items-start gap-2">
            <CheckCircle size={14} className="text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-bold text-emerald-800 mb-1">Key Takeaway</p>
              <p className="text-xs text-emerald-700 leading-relaxed">
                Component-based vulnerabilities occur when a web application depends on libraries that are unsupported, out of date, or vulnerable to a known exploit. Regular auditing and proactive patching are the most effective defences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
