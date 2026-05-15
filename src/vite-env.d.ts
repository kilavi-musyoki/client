/// <reference types="vite/client" />

// No VITE_-prefixed secrets are declared here.
// Sensitive env vars (passwords, webhook URLs) use non-VITE_ prefixed names
// so they are only available server-side (vite.config.ts / Vercel functions)
// and never embedded in the client bundle.
