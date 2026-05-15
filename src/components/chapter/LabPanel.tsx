import A06Lab from '../labs/a06/A06Lab'
import type { PageDef } from '../../data/a06pages'

interface Props {
  page: PageDef
  currentPage: number
  chapterId: string
  onPageComplete: () => void
  pageCompleted: boolean
  onNext: () => void
}

export default function LabPanel({ page, currentPage, chapterId, onPageComplete, pageCompleted, onNext }: Props) {
  return (
    <div className="h-full bg-[var(--color-surface)] overflow-hidden">
      {chapterId === 'a06' && (
        <A06Lab
          pageNum={currentPage}
          page={page}
          onComplete={onPageComplete}
          pageCompleted={pageCompleted}
          onNext={onNext}
        />
      )}
    </div>
  )
}
