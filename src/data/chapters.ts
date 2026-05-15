export interface Chapter {
  id: string
  code: string       // A01–A10
  title: string
  subtitle: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string   // e.g. "25 min"
  totalPages: number
  tags: string[]
  available: boolean
}

export const CHAPTERS: Chapter[] = [
  {
    id: 'a06', code: 'A06', title: 'Vulnerable & Outdated Components', difficulty: 'Intermediate',
    subtitle: 'Exploiting a third-party library',
    description: 'Discover how a single outdated jQuery plugin can be weaponised to steal session cookies via XSS.',
    duration: '30 min', totalPages: 19, tags: ['XSS', 'CVE', 'Third-party Libraries', 'Session Hijacking'],
    available: true,
  },
]
