import { useState, useEffect, useRef } from 'react'
import type { PageDef } from '../../../data/a06pages'
import IntroCard from './panels/IntroCard'
import ProductPage from './panels/ProductPage'
import ProductViewSource from './panels/ProductViewSource'
import HtmlSourceAnalyze from './panels/HtmlSourceAnalyze'
import CvePage from './panels/CvePage'
import ProductLightbox from './panels/ProductLightbox'
import UrlHighlight from './panels/UrlHighlight'
import UrlInject from './panels/UrlInject'
import XssAlert from './panels/XssAlert'
import ResearchNotes from './panels/ResearchNotes'
import TerminalApache from './panels/TerminalApache'
import BrowserEmailLogin from './panels/BrowserEmailLogin'
import EmailInbox from './panels/EmailInbox'
import EmailContent from './panels/EmailContent'
import EmailUrlClick from './panels/EmailUrlClick'
import FakeSite from './panels/FakeSite'
import TerminalLogs from './panels/TerminalLogs'
import SessionHijack from './panels/SessionHijack'
import Mitigation from './panels/Mitigation'

/** Props shared by all interactive lab panel components */
export interface LabPanelProps {
  onComplete: () => void
  pageCompleted: boolean
  onNext: () => void
}

interface Props {
  pageNum: number
  page: PageDef
  onComplete: () => void
  pageCompleted: boolean
  onNext: () => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- panels have varying prop shapes
const LAB_MAP: Record<string, React.ComponentType<any>> = {
  'intro-card':         IntroCard,
  'product-page':       ProductPage,
  'product-view-source': ProductViewSource,
  'html-source-analyze': HtmlSourceAnalyze,
  'cve-page':           CvePage,
  'product-lightbox':   ProductLightbox,
  'url-highlight':      UrlHighlight,
  'url-inject':         UrlInject,
  'xss-alert':          XssAlert,
  'research-notes':     ResearchNotes,
  'terminal-apache':    TerminalApache,
  'browser-email-login': BrowserEmailLogin,
  'email-inbox':        EmailInbox,
  'email-content':      EmailContent,
  'email-url-click':    EmailUrlClick,
  'fake-site':          FakeSite,
  'terminal-logs':      TerminalLogs,
  'session-hijack':     SessionHijack,
  'mitigation':         Mitigation,
}

export default function A06Lab({ pageNum, page, onComplete, pageCompleted, onNext }: Props) {
  const LabComponent = LAB_MAP[page.labType]
  const prevPage = useRef(pageNum)

  // Reset key forces remount on page change
  const [key, setKey] = useState(0)
  useEffect(() => {
    if (prevPage.current !== pageNum) {
      prevPage.current = pageNum
      setKey(k => k + 1)
    }
  }, [pageNum])

  if (!LabComponent) {
    return (
      <div className="h-full flex items-center justify-center text-[var(--color-text-muted)] text-sm">
        Lab panel not configured for this page.
      </div>
    )
  }

  return (
    <div key={key} className="h-full animate-fade-in">
      <LabComponent
        page={page}
        pageNum={pageNum}
        onComplete={onComplete}
        pageCompleted={pageCompleted}
        onNext={onNext}
      />
    </div>
  )
}
