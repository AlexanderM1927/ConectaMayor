import { register } from 'register-service-worker'
import { usePwa } from 'src/composables/usePwa'

const pwa = usePwa()

register(process.env.SERVICE_WORKER_FILE, {
  ready() {
    if (process.env.PROD) pwa.offlineReady.value = true
  },
  cached() {
    if (process.env.PROD) pwa.offlineReady.value = true
  },
  updated(registration) {
    pwa.waitingWorker.value = registration.waiting
  },
  error(error) {
    if (!navigator.onLine) {
      if (process.env.PROD && navigator.serviceWorker.controller) pwa.offlineReady.value = true
      return
    }
    console.error('No se pudo preparar el uso sin conexión.', error)
  }
})
