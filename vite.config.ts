import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [
    vue(),
    legacy(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@ionic') || id.includes('ionicons')) {
              return 'vendor-ionic';
            }
            if (id.includes('vue') || id.includes('pinia') || id.includes('vue-router')) {
              return 'vendor-vue';
            }
            if (id.includes('chart.js') || id.includes('vue-chartjs')) {
              return 'vendor-charts';
            }
            return 'vendor-libs';
          }
        }
      }
    }
  },
  esbuild: {
    drop: ['console', 'debugger']
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
})