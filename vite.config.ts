import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

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
            // Server-side verification
            if (
              (email === 'demo@cyberpath.io' && password === (env.VITE_DEMO_PASSWORD || 'demo123')) ||
              (email === 'alex@cyberpath.io' && password === (env.VITE_ALEX_PASSWORD || 'alex123'))
            ) {
              const user = email === 'demo@cyberpath.io' 
                ? { id: '1', name: 'Guest User', email, avatar: 'GU' }
                : { id: '2', name: 'Alex Morgan', email, avatar: 'AM' }
              
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: true, user }))
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
          const id = authHeader.replace('Bearer ', '')
          if (id === '1') {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ success: true, user: { id: '1', name: 'Guest User', email: 'demo@cyberpath.io', avatar: 'GU' } }))
            return
          } else if (id === '2') {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ success: true, user: { id: '2', name: 'Alex Morgan', email: 'alex@cyberpath.io', avatar: 'AM' } }))
            return
          }
        }
        res.statusCode = 401
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ success: false }))
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
