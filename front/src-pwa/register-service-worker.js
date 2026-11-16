import { register } from 'register-service-worker'
import { Notify } from 'quasar'

register(process.env.SERVICE_WORKER_FILE, {
  cached() {
    Notify.create({
      message: 'ConectaMayor está listo para usarse sin conexión.',
      timeout: 0,
      actions: [{ label: 'Cerrar', color: 'white' }]
    })
  },
  updated(registration) {
    Notify.create({
      message: 'Hay una nueva versión disponible.',
      timeout: 0,
      actions: [
        {
          label: 'Actualizar',
          color: 'white',
          handler() {
            navigator.serviceWorker.addEventListener('controllerchange', () => {
              window.location.reload()
            }, { once: true })
            registration.waiting?.postMessage({ type: 'SKIP_WAITING' })
          }
        },
        { label: 'Después', color: 'white' }
      ]
    })
  },
  error(error) {
    console.error('No se pudo preparar el uso sin conexión.', error)
  }
})
