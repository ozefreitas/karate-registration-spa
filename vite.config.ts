import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    watch: {
      usePolling: true,
      interval: 100,       // poll every 100ms
      followSymlinks: true,
      atomic: false,
    },
  },
})
