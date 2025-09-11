import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,      // use describe, it, expect globally
    environment: 'jsdom', // browser-like environment
    setupFiles: './src/setupTests.js', // optional setup file
  }
})
