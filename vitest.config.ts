/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    // Vitest configuration options
  },
  build: {
    outDir: 'dist', // Make sure this matches your output directory
  },
  server: {
    port: 4173, // Ensure this matches the port in your start command
  },
})
