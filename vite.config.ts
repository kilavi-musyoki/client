import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { randomUUID } from 'node:crypto'

// ── In-memory session store (dev only) ──────────────────────────────────────
// Maps cryptographic tokens → user objects. Tokens are generated on login and
// looked up on /api/auth/me, preventing IDOR via predictable sequential IDs.
const sessions = new Map<string, { id: string; name: string; email: string; avatar: string }>()

const mockBackend = (env: Record<string, string>) => ({
  name: 'mock-backend',
  configureServer(server: any) {
    server.middlewares.use(async (req: any, res: any, next: any) => {
      // 1. Login Endpoint
      if (req.url === '/api/auth/login' && req.method === 'POST') {
        let body = ''
        req.on('data', (chunk: any) => { body += chunk })
        req.on('end', () => {
          try {
            const { email, password } = JSON.parse(body)
            // Server-side verification — passwords read from server-only env vars
            // (no VITE_ prefix, so they are NOT embedded in the client bundle)
            if (
              (email === 'demo@cyberpath.io' && password === (env.DEMO_PASSWORD || 'demo123')) ||
              (email === 'alex@cyberpath.io' && password === (env.ALEX_PASSWORD || 'alex123'))
            ) {
              const user = email === 'demo@cyberpath.io' 
                ? { id: '1', name: 'Guest User', email, avatar: 'GU' }
                : { id: '2', name: 'Alex Morgan', email, avatar: 'AM' }

              // Generate a cryptographic random token instead of using the user ID
              const token = randomUUID()
              sessions.set(token, user)
              
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: true, user, token }))
            } else {
              res.statusCode = 401
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: false, error: 'Invalid credentials' }))
            }
          } catch (e) {
            res.statusCode = 400
            res.end()
          }
        })
        return
      }

      // 2. Fetch Current User Endpoint
      if (req.url === '/api/auth/me' && req.method === 'GET') {
        const authHeader = req.headers['authorization']
        if (authHeader) {
          const token = authHeader.replace('Bearer ', '')
          const user = sessions.get(token)
          if (user) {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ success: true, user }))
            return
          }
        }
        res.statusCode = 401
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ success: false }))
        return
      }

      // 3. Completion webhook proxy (dev mode)
      // Mirrors the Vercel serverless function at api/complete.js
      if (req.url === '/api/complete' && req.method === 'POST') {
        const webhookUrl = env.WEBHOOK_URL
        if (!webhookUrl) {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ ok: true, skipped: true }))
          return
        }
        let body = ''
        req.on('data', (chunk: any) => { body += chunk })
        req.on('end', async () => {
          try {
            await fetch(webhookUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body,
            })
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: true }))
          } catch {
            res.statusCode = 502
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: false }))
          }
        })
        return
      }

      next()
    })
  }
})

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: '/',
    plugins: [react(), mockBackend(env)],
    server: {
      port: 5173,
    },
  }
})
