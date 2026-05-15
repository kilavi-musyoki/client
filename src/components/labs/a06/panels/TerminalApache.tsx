import { useState, useRef, useEffect } from 'react'
import { Terminal as TermIcon } from 'lucide-react'

interface Props { onComplete: () => void; pageCompleted: boolean }

const EXPECTED_CMD = 'service apache2 start && tail -f /var/log/apache2/access.log'

// Keywords derived from the primary command (before &&) — keeps hint and validator in sync
const REQUIRED_KEYWORDS = EXPECTED_CMD.split('&&')[0].trim().split(' ')

export default function TerminalApache({ onComplete, pageCompleted }: Props) {
  const [input, setInput] = useState('')
  const [lines, setLines] = useState<{ text: string; type: 'prompt' | 'output' | 'success' }[]>([
    { text: 'kai@192.168.1.50-hosting-linux:~#', type: 'prompt' },
  ])
  const [submitted, setSubmitted] = useState(false)
  const inputRef    = useRef<HTMLInputElement>(null)
  const scrollRef   = useRef<HTMLDivElement>(null)
  // Bug fix: store timeout IDs so they can be cleared if the component unmounts
  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([])

  // Clear pending timeouts on unmount to prevent state updates after unmount
  useEffect(() => {
    return () => { timeoutRefs.current.forEach(clearTimeout) }
  }, [])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [lines])

  const handleSubmit = () => {
    if (!input.trim() || submitted) return

    const newLines = [
      ...lines.slice(0, -1), // remove the empty prompt
      { text: `kai@192.168.1.50-hosting-linux:~# ${input}`, type: 'prompt' as const },
    ]

    // Bug fix: validate using REQUIRED_KEYWORDS derived from EXPECTED_CMD
    const normalized = input.trim().toLowerCase()
    if (REQUIRED_KEYWORDS.every(kw => normalized.includes(kw))) {
      newLines.push(
        { text: '[ ok ] Starting Apache httpd web server: apache2.', type: 'success' as const },
        { text: '', type: 'output' as const },
      )

      setLines(newLines)
      setSubmitted(true)
      setInput('')

      // Simulate log appearing after delay — IDs stored for cleanup on unmount
      const t1 = setTimeout(() => {
        setLines(prev => [
          ...prev,
          { text: '==> /var/log/apache2/access.log <==', type: 'output' as const },
          { text: '(waiting for incoming connections...)', type: 'output' as const },
        ])
      }, 1200)

      const t2 = setTimeout(() => {
        setLines(prev => [
          ...prev,
          { text: '█', type: 'output' as const },
        ])
        onComplete()
      }, 2200)

      timeoutRefs.current.push(t1, t2)
    } else {
      newLines.push(
        { text: `bash: ${input.split(' ')[0]}: command not recognized. Try the exact command from the instructions.`, type: 'output' as const },
        { text: 'kai@192.168.1.50-hosting-linux:~#', type: 'prompt' as const },
      )
      setLines(newLines)
      setInput('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div className="h-full flex flex-col bg-[#0d1b2a]">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1b2838] border-b border-[#2a3a4e] shrink-0">
        <div className="w-6 h-6 rounded border border-amber-500/50 flex items-center justify-center">
          <TermIcon size={12} className="text-amber-400" />
        </div>
        <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Console</span>
      </div>

      {/* Terminal body */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-auto p-4 font-mono text-sm cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line, i) => (
          <div key={i} className={`leading-relaxed ${
            line.type === 'prompt' ? 'text-cyan-400'
            : line.type === 'success' ? 'text-emerald-400'
            : 'text-slate-400'
          }`}>
            {line.text === '█' ? (
              <span className="animate-blink text-emerald-400">█</span>
            ) : line.text}
          </div>
        ))}

        {/* Input line */}
        {!submitted && (
          <div className="flex items-center text-cyan-400 mt-0.5">
            <input
              ref={inputRef}
              id="terminal-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-slate-200 font-mono text-sm caret-emerald-400 ml-1"
              placeholder="Type command here..."
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        )}
      </div>

      {/* Command hint */}
      {!submitted && (
        <div className="px-4 py-2.5 bg-[#1b2838] border-t border-[#2a3a4e] shrink-0">
          <p className="text-[10px] text-slate-500 font-mono truncate">
            💡 Hint: {EXPECTED_CMD}
          </p>
        </div>
      )}
    </div>
  )
}
