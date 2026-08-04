import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    // Do not emit source maps in the production bundle.
    // Source maps expose the original source code to anyone with browser
    // DevTools — disable them for all production deployments.
    sourcemap: false,
  },
})
