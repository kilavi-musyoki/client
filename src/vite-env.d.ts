/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DEMO_PASSWORD?: string
  readonly VITE_ALEX_PASSWORD?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
