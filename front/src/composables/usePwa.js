import { ref, shallowRef } from 'vue'

const online = ref(typeof navigator === 'undefined' ? true : navigator.onLine)
const offlineReady = ref(false)
const installEvent = shallowRef(null)
const waitingWorker = shallowRef(null)
let listening = false

export function usePwa() {
  if (!listening && typeof window !== 'undefined') {
    listening = true
    window.addEventListener('online', () => {
      online.value = true
    })
    window.addEventListener('offline', () => {
      online.value = false
    })
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault()
      installEvent.value = event
    })
    window.addEventListener('appinstalled', () => {
      installEvent.value = null
    })
  }

  async function install() {
    if (!installEvent.value) return false
    await installEvent.value.prompt()
    const result = await installEvent.value.userChoice
    installEvent.value = null
    return result.outcome === 'accepted'
  }

  function update() {
    if (!waitingWorker.value) return
    navigator.serviceWorker.addEventListener('controllerchange', () => window.location.reload(), {
      once: true
    })
    waitingWorker.value.postMessage({ type: 'SKIP_WAITING' })
  }

  return { online, offlineReady, installEvent, waitingWorker, install, update }
}
