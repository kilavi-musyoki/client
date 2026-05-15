import { Shield, ExternalLink } from 'lucide-react'

export default function CvePage() {
  return (
    <div className="h-full overflow-auto bg-white flex flex-col">
      {/* Browser chrome */}
      <div className="bg-slate-100 border-b border-[var(--color-border)] px-4 py-1.5 shrink-0">
        <div className="flex items-center gap-2 bg-white border border-[var(--color-border)] rounded px-2.5 py-1 text-xs font-mono text-[var(--color-text-secondary)] max-w-xl">
          <Shield size={11} className="text-[var(--color-success)] shrink-0" />
          https://nvd.nist.gov/vuln/detail/CVE-2024-31047
        </div>
      </div>

      {/* NIST Header */}
      <div className="bg-[#1a1a2e] px-6 py-3 shrink-0">
        <span className="text-white font-bold text-lg tracking-wider">NIST</span>
      </div>
      <div className="bg-gradient-to-r from-[#2d3a6e] to-[#3d4e8e] px-6 py-3 shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-200 text-xs">Information Technology Laboratory</p>
            <p className="text-white font-bold text-sm tracking-wide">NATIONAL VULNERABILITY DATABASE</p>
          </div>
          <span className="text-white/60 font-bold text-lg tracking-widest">NVD</span>
        </div>
      </div>

      {/* CVE Content */}
      <div className="flex-1 p-6 max-w-3xl">
        <h1 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">
          CVE-2024-31047 Detail
        </h1>

        {/* Status badge */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm font-semibold text-blue-800 mb-1">MODIFIED</p>
          <p className="text-xs text-blue-700 leading-relaxed">
            This vulnerability has been modified since it was last analyzed by the NVD.
            It is awaiting reanalysis which may result in further changes to the information provided.
          </p>
        </div>

        {/* Description */}
        <h2 className="text-base font-bold text-[var(--color-text-primary)] mb-2">Current Description</h2>
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-2">
          Cross-site scripting (XSS) vulnerability in the <code className="bg-slate-100 px-1 rounded text-xs">setTimeout</code> function
          of <strong>GlideView 2.0.4 and earlier</strong> allows remote attackers to inject arbitrary web script or HTML
          via a crafted PATH_INFO to the default URI.
        </p>
        <p className="text-xs text-[var(--color-text-muted)] mb-1">
          Source: <span className="font-medium">MITRE</span>
        </p>
        <button className="text-xs text-blue-600 hover:underline mb-6 flex items-center gap-1">
          <ExternalLink size={10} /> View Analysis Description
        </button>

        {/* Impact */}
        <div className="bg-slate-50 border border-[var(--color-border)] rounded-lg p-5 mb-6">
          <h3 className="text-base font-bold text-[var(--color-text-primary)] mb-3">Impact</h3>
          <p className="text-sm font-semibold text-[var(--color-text-secondary)] mb-2">CVSS v3.1 Severity and Metrics:</p>

          <div className="flex items-center gap-3 mb-4">
            <div className="bg-amber-100 border border-amber-300 rounded px-3 py-1.5">
              <span className="text-amber-800 font-bold text-lg">4.3</span>
            </div>
            <span className="text-sm font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              MEDIUM
            </span>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs">
            {[
              ['Attack Vector', 'Network'],
              ['Attack Complexity', 'Medium'],
              ['Privileges Required', 'None'],
              ['User Interaction', 'Required'],
              ['Confidentiality', 'None'],
              ['Integrity', 'Partial'],
              ['Availability', 'None'],
            ].map(([label, val]) => (
              <div key={label} className="flex justify-between py-0.5 border-b border-slate-100">
                <span className="text-[var(--color-text-muted)]">{label}:</span>
                <span className="font-medium text-[var(--color-text-primary)]">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Info sidebar-style */}
        <div className="bg-white border border-[var(--color-border)] rounded-lg p-4">
          <h4 className="text-xs font-bold text-[var(--color-text-primary)] mb-3 uppercase tracking-wide">Quick Info</h4>
          <div className="space-y-2 text-xs">
            {[
              ['CVE Dictionary Entry', 'CVE-2024-31047'],
              ['NVD Published Date', '03/15/2024'],
              ['NVD Last Modified', '10/02/2024'],
              ['Affected Versions', '≤ 2.0.4'],
            ].map(([label, val]) => (
              <div key={label}>
                <span className="font-semibold text-[var(--color-text-primary)]">{label}</span>
                <p className="text-blue-600">{val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
