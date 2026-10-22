import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Relative asset URLs so the build also works from the Electron app:// protocol.
  base: './',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
  },
})
