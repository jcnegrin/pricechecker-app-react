/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ['src/setupTest.ts'],
    coverage: {
      reporter: ['text', 'json', 'html'], // Reportes que quieres generar
      exclude: [
        'node_modules',
        'postcss.config.js',
        'tailwind.config.js',
        'vite.config.ts',
        'src/setupTest.ts',
        'src/main.tsx',
        'src/App.tsx', 
        'dist/**',
        'eslint.config.js',
        'src/vite-env.d.ts'
      ],
    },
  }
})
