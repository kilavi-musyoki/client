import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Shield, Eye, EyeOff, AlertCircle } from 'lucide-react'

export default function Login() {
  const { login, user } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  // Already logged in
  if (user) { navigate('/'); return null }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const ok = await login(email, password)
    setLoading(false)
    if (ok) navigate('/')
    else setError('Invalid email or password. Try demo@cyberpath.io / demo123')
  }

  return (
    <div className="min-h-screen bg-[var(--color-surface)] flex">
      {/* ── Left panel — branding ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[var(--color-brand-700)] to-[var(--color-brand-900)] flex-col justify-between p-12 text-white">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center">
            <Shield size={20} className="text-white" />
          </div>
          <span className="font-semibold text-lg tracking-tight">CyberPath</span>
        </div>

        <div>
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Learn web security<br />the hands-on way.
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-md">
            Work through the OWASP Top 10 vulnerabilities in guided, interactive labs.
            No setup required — just you and the browser.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6">
            {[['10', 'Modules'], ['60+', 'Lab Steps'], ['Real', 'CVE Exploits']].map(([val, label]) => (
              <div key={label}>
                <div className="text-2xl font-bold">{val}</div>
                <div className="text-white/60 text-sm mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-white/40 text-sm">© 2025 CyberPath. For educational use only.</p>
      </div>

      {/* ── Right panel — form ── */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm animate-fade-in">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-brand-600)] flex items-center justify-center">
              <Shield size={16} className="text-white" />
            </div>
            <span className="font-semibold text-[var(--color-text-primary)]">CyberPath</span>
          </div>

          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-1">Welcome back</h2>
          <p className="text-[var(--color-text-secondary)] text-sm mb-8">Sign in to continue your learning journey.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--color-text-primary)] mb-1.5">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="demo@cyberpath.io"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--color-border)] bg-white text-[var(--color-text-primary)] text-sm placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-500)] focus:border-transparent transition"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[var(--color-text-primary)] mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPass ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 pr-10 rounded-lg border border-[var(--color-border)] bg-white text-[var(--color-text-primary)] text-sm placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-500)] focus:border-transparent transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition"
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm animate-fade-in">
                <AlertCircle size={15} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              id="login-btn"
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-[var(--color-brand-600)] hover:bg-[var(--color-brand-700)] text-white font-medium text-sm transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </>
              ) : 'Sign in'}
            </button>
          </form>

          <div className="mt-6 p-3.5 rounded-lg bg-[var(--color-brand-50)] border border-[var(--color-brand-100)]">
            <p className="text-xs text-[var(--color-brand-700)] font-medium mb-1">Demo credentials</p>
            <p className="text-xs text-[var(--color-brand-600)] font-mono">demo@cyberpath.io / demo123</p>
          </div>
        </div>
      </div>
    </div>
  )
}
