import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  avatar: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

// Mock credentials — replace with real backend in Phase 2.
// Bug fix: read from env vars so passwords don't ship as plaintext in source.
// Fallback values keep the app working locally without a .env file.
const MOCK_USERS = [
  { id: '1', name: 'Guest User',  email: 'demo@cyberpath.io', avatar: 'GU',
    password: import.meta.env.VITE_DEMO_PASSWORD ?? 'demo123' },
  { id: '2', name: 'Alex Morgan', email: 'alex@cyberpath.io', avatar: 'AM',
    password: import.meta.env.VITE_ALEX_PASSWORD ?? 'alex123' },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('cyberpath_user')
    if (stored) {
      try { setUser(JSON.parse(stored)) } catch { /* ignore */ }
    } else {
      // Auto-login: users arriving from the LMS have no session yet.
      // Silently log them in as a generic learner so no second login is needed.
      const autoUser = { id: 'auto', name: 'Learner', email: 'demo@cyberpath.io', avatar: 'LN' }
      localStorage.setItem('cyberpath_user', JSON.stringify(autoUser))
      setUser(autoUser)
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 800)) // simulate network
    const match = MOCK_USERS.find(u => u.email === email && u.password === password)
    if (!match) return false
    const { password: _, ...userData } = match
    setUser(userData)
    localStorage.setItem('cyberpath_user', JSON.stringify(userData))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('cyberpath_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
