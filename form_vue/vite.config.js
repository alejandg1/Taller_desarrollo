const { defineConfig } = require('vite')
const vue = require('@vitejs/plugin-vue')

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [vue()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://express:5000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path,
      }
    }
  }
})
