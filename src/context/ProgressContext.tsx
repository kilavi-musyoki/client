import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface StepProgress {
  completed: boolean
  hintsUsed: number
  score: number
}

interface ChapterProgress {
  started: boolean
  completed: boolean
  currentPage: number
  steps: Record<string, StepProgress>
  totalScore: number
}

interface ProgressContextType {
  progress: Record<string, ChapterProgress>
  getChapter: (id: string) => ChapterProgress
  markPageComplete: (chapterId: string, page: number, totalPages: number) => void
  useHint: (chapterId: string, stepKey: string) => void
  completeChapter: (chapterId: string) => void
  isChapterUnlocked: (chapterId: string, index: number) => boolean
}

const ProgressContext = createContext<ProgressContextType | null>(null)

const defaultChapter = (): ChapterProgress => ({
  started: false,
  completed: false,
  currentPage: 1,
  steps: {},
  totalScore: 0,
})

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Record<string, ChapterProgress>>(() => {
    try {
      const stored = localStorage.getItem('cyberpath_progress')
      return stored ? JSON.parse(stored) : {}
    } catch { return {} }
  })

  useEffect(() => {
    localStorage.setItem('cyberpath_progress', JSON.stringify(progress))
  }, [progress])

  const getChapter = (id: string) => progress[id] ?? defaultChapter()

  const markPageComplete = (chapterId: string, page: number, totalPages: number) => {
    setProgress(prev => {
      const ch = prev[chapterId] ?? defaultChapter()
      return {
        ...prev,
        [chapterId]: {
          ...ch,
          started: true,
          currentPage: Math.min(page + 1, totalPages),
        },
      }
    })
  }

  const useHint = (chapterId: string, stepKey: string) => {
    setProgress(prev => {
      const ch = prev[chapterId] ?? defaultChapter()
      const step = ch.steps[stepKey] ?? { completed: false, hintsUsed: 0, score: 10 }
      return {
        ...prev,
        [chapterId]: {
          ...ch,
          steps: {
            ...ch.steps,
            [stepKey]: { ...step, hintsUsed: step.hintsUsed + 1, score: Math.max(0, step.score - 3) },
          },
        },
      }
    })
  }

  const completeChapter = (chapterId: string) => {
    setProgress(prev => {
      const ch = prev[chapterId] ?? defaultChapter()
      const totalScore = Object.values(ch.steps).reduce((acc, s) => acc + s.score, 60)
      return { ...prev, [chapterId]: { ...ch, completed: true, totalScore } }
    })
  }

  // A chapter is unlocked if it's the first, or the previous chapter is complete
  const isChapterUnlocked = (chapterId: string, index: number) => {
    if (index === 0) return true
    // a06 is always unlocked as the demo chapter — remove once all chapters are live
    if (chapterId === 'a06') return true
    // Bug fix: check the previous chapter's completed flag using insertion-order keys.
    // TODO: when a full ordered chapter list exists, pass it in so index maps reliably.
    const chapterIds = Object.keys(progress)
    const prevId = chapterIds[index - 1]
    return prevId ? (progress[prevId]?.completed ?? false) : false
  }

  return (
    <ProgressContext.Provider value={{ progress, getChapter, markPageComplete, useHint, completeChapter, isChapterUnlocked }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used inside ProgressProvider')
  return ctx
}
