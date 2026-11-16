import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { readLocalData, writeLocalData, clearLocalData } from 'src/services/db'
import { contentVersion, tutorials, scenarios } from 'src/content/learning'

export const defaultPreferences = () => ({
  id: 'interface',
  textSize: 'normal',
  highContrast: false,
  reducedMotion: false
})

export const useLearningStore = defineStore('learning', () => {
  const ready = ref(false)
  const saving = ref(false)
  const error = ref('')
  const pendingCount = ref(0)
  const progress = ref({})
  const attempts = ref([])
  const preferences = ref(defaultPreferences())
  const lastSaved = ref(null)
  let initialization
  let activeFlush
  let pendingWrites = []

  const completedTutorials = computed(() =>
    tutorials.filter((item) => progress.value[`tutorial:${item.id}`]?.completed)
  )
  const practicedScenarios = computed(() =>
    scenarios.filter((item) =>
      attempts.value.some(
        (attempt) =>
          attempt.kind === 'simulation' && attempt.activityId === item.id && attempt.correct
      )
    )
  )
  const startedTutorial = computed(() =>
    tutorials.find(
      (item) =>
        progress.value[`tutorial:${item.id}`] && !progress.value[`tutorial:${item.id}`].completed
    )
  )
  const assessment = computed(() => progress.value['assessment:basic'])

  function applyPreferences() {
    if (typeof document === 'undefined') return
    document.documentElement.dataset.textSize = preferences.value.textSize
    document.documentElement.classList.toggle('high-contrast', preferences.value.highContrast)
    document.documentElement.classList.toggle('reduce-motion', preferences.value.reducedMotion)
  }

  async function initialize() {
    if (initialization) return initialization
    initialization = (async () => {
      try {
        const saved = await readLocalData()
        progress.value = Object.fromEntries(
          saved.progress
            .filter((item) => item.version === contentVersion)
            .map((item) => [item.id, item])
        )
        attempts.value = saved.attempts
          .filter((item) => item.version === contentVersion)
          .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
        preferences.value = { ...defaultPreferences(), ...saved.preferences }
      } catch {
        error.value =
          'No pudimos abrir el guardado de este dispositivo. Puedes aprender en esta sesión, pero tu avance todavía no está guardado.'
      } finally {
        ready.value = true
        applyPreferences()
      }
    })()
    return initialization
  }

  async function flush() {
    if (activeFlush) return activeFlush
    activeFlush = (async () => {
      saving.value = true
      try {
        while (pendingWrites.length) {
          await writeLocalData(pendingWrites[0])
          pendingWrites.shift()
          pendingCount.value = pendingWrites.length
        }
        error.value = ''
        lastSaved.value = new Date().toISOString()
        return true
      } catch {
        error.value =
          'Tu avance sigue en esta sesión, pero no pudimos guardarlo. Reintenta antes de cerrar la aplicación. Revisa también si hay espacio disponible en tu dispositivo.'
        return false
      } finally {
        saving.value = false
      }
    })()
    try {
      return await activeFlush
    } finally {
      activeFlush = null
    }
  }

  function persist(change) {
    pendingWrites.push(JSON.parse(JSON.stringify(change)))
    pendingCount.value = pendingWrites.length
    return flush()
  }

  function makeProgress(id, value) {
    const record = { ...value, id, version: contentVersion, updatedAt: new Date().toISOString() }
    progress.value[id] = record
    return record
  }

  function saveProgress(id, value) {
    return persist({ progress: makeProgress(id, value) })
  }

  function recordAttempt(attempt, progressChange) {
    const record = {
      ...attempt,
      id: crypto.randomUUID(),
      version: contentVersion,
      createdAt: new Date().toISOString()
    }
    attempts.value.push(record)
    return persist({
      attempt: record,
      ...(progressChange ? { progress: makeProgress(progressChange.id, progressChange.value) } : {})
    })
  }

  function setPreferences(change) {
    preferences.value = { ...preferences.value, ...change, id: 'interface' }
    applyPreferences()
    return persist({ preferences: preferences.value })
  }

  async function retrySave() {
    if (!ready.value || saving.value) return false
    if (pendingWrites.length) return flush()
    try {
      await readLocalData()
      initialization = null
      await initialize()
      error.value = ''
      return true
    } catch {
      error.value =
        'El guardado local sigue sin estar disponible. Puedes continuar aquí y volver a reintentar.'
      return false
    }
  }

  async function resetData() {
    if (saving.value) return false
    saving.value = true
    try {
      await clearLocalData()
      pendingWrites = []
      pendingCount.value = 0
      progress.value = {}
      attempts.value = []
      preferences.value = defaultPreferences()
      lastSaved.value = null
      error.value = ''
      applyPreferences()
      return true
    } catch {
      error.value =
        'No pudimos borrar los datos. Reintenta cuando el almacenamiento esté disponible.'
      return false
    } finally {
      saving.value = false
    }
  }

  return {
    ready,
    saving,
    error,
    pendingCount,
    progress,
    attempts,
    preferences,
    lastSaved,
    completedTutorials,
    practicedScenarios,
    startedTutorial,
    assessment,
    initialize,
    saveProgress,
    recordAttempt,
    setPreferences,
    retrySave,
    resetData
  }
})
