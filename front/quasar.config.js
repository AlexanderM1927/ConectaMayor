import { defineConfig } from '#q-app/wrappers'

export default defineConfig(() => ({
  boot: ['learning'],
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
      brand: {
        primary: '#126f74',
        secondary: '#275f8b',
        positive: '#25754b',
        negative: '#a53636',
        warning: '#88530e'
      }
    },
    plugins: ['Notify', 'Dialog']
  },
  pwa: {
    workboxMode: 'GenerateSW',
    extendGenerateSWOptions(options) {
      options.skipWaiting = false
      options.clientsClaim = true
      options.maximumFileSizeToCacheInBytes = 8 * 1024 * 1024
    }
  }
}))
