import { defineConfig } from '#q-app/wrappers'

export default defineConfig(() => ({
  boot: [],
  css: ['app.css'],
  extras: ['roboto-font', 'material-icons'],
  build: {
    target: { browser: 'baseline-widely-available', node: 'node22' },
    vueRouterMode: 'hash'
  },
  devServer: {
    host: '0.0.0.0',
    port: 9000,
    strictPort: true,
    open: false,
    watch: { usePolling: true }
  },
  framework: {
    lang: 'es',
    config: {
      brand: { primary: '#18584a', secondary: '#315b78' }
    },
    plugins: ['Notify', 'Dialog']
  },
  pwa: {
    workboxMode: 'GenerateSW',
    extendGenerateSWOptions(options) {
      options.skipWaiting = false
      options.clientsClaim = true
    }
  }
}))
