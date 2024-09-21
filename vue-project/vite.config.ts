import { fileURLToPath, URL } from 'node:url'

const { defineConfig } = require('vite')
const vue = require('@vitejs/plugin-vue')

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
