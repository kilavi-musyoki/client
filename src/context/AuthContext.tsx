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

// Credentials and authentication logic have been securely moved to the backend.

const DEFAULT_AUTO_USER: User = { id: 'auto', name: 'Learner', email: 'demo@cyberpath.io', avatar: 'LN' }

/** Build an auto-login user from URL query params (?name=...&email=...).
 *  Falls back to the generic Learner identity when no params are present.
 *  This lets LMS admins pass real learner identity without any code changes —
 *  just append params to the CyberPath URL in the LMS course link. */
function buildAutoUser(): User {
  const params = new URLSearchParams(window.location.search)
  const name  = params.get('name')?.trim()  || DEFAULT_AUTO_USER.name
  const email = params.get('email')?.trim() || DEFAULT_AUTO_USER.email
  const initials = name.split(' ').map(w => w[0]?.toUpperCase() ?? '').join('').slice(0, 2) || 'LN'
  return { id: 'auto', name, email, avatar: initials }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Bug fix: use sessionStorage and only store opaque IDs, not sensitive PII
    const sessionId = sessionStorage.getItem('cyberpath_session')
    if (sessionId) {
      if (sessionId === 'auto') {
        setUser(buildAutoUser())
        setIsLoading(false)
      } else {
        // Fetch user securely from backend API
        fetch('/api/auth/me', {
          headers: { 'Authorization': `Bearer ${sessionId}` }
        })
          .then(res => res.json())
          .then(data => {
            if (data.success && data.user) {
              setUser(data.user)
            } else {
              sessionStorage.removeItem('cyberpath_session')
            }
          })
          .catch(console.error)
          .finally(() => setIsLoading(false))
      }
    } else {
      // Auto-login: users arriving from the LMS have no session yet.
      sessionStorage.setItem('cyberpath_session', 'auto')
      setUser(buildAutoUser())
      setIsLoading(false)
    }
    // Clean up old insecure storage
    localStorage.removeItem('cyberpath_user')
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      
      if (data.success && data.user && data.token) {
        setUser(data.user)
        // Store the cryptographic token — NOT the predictable user ID
        sessionStorage.setItem('cyberpath_session', data.token)
        return true
      }
      return false
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    sessionStorage.removeItem('cyberpath_session')
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
