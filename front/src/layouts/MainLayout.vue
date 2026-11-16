<script setup>
import { nextTick, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import BrandLogo from 'components/BrandLogo.vue'
import { sections } from 'src/content/learning'
import { useLearningStore } from 'src/stores/learning'
import { usePwa } from 'src/composables/usePwa'

const store = useLearningStore()
const route = useRoute()
const quasar = useQuasar()
const drawer = ref(false)
const { online, waitingWorker, update } = usePwa()
const navigation = [{ title: 'Inicio', short: 'Inicio', icon: 'home', to: '/' }, ...sections]
const extraNavigation = [
  { title: 'Mi progreso', icon: 'bar_chart', to: '/progreso' },
  { title: 'Ayuda y ajustes', icon: 'help_outline', to: '/ayuda' }
]

let textObserver
function adaptReadingLayout() {
  const enlarged = parseFloat(getComputedStyle(document.documentElement).fontSize) >= 28
  document.documentElement.classList.toggle('large-reading-layout', enlarged)
}
onMounted(() => {
  adaptReadingLayout()
  textObserver = new MutationObserver(adaptReadingLayout)
  textObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['style', 'data-text-size']
  })
  window.addEventListener('resize', adaptReadingLayout)
})
onBeforeUnmount(() => {
  textObserver?.disconnect()
  window.removeEventListener('resize', adaptReadingLayout)
})

function active(path) {
  return path === '/' ? route.path === '/' : route.path.startsWith(path)
}
watch(
  () => route.fullPath,
  async () => {
    drawer.value = false
    document.title = `${route.meta.title || 'Aprende a tu ritmo'} · ConectaMayor`
    await nextTick()
    document.getElementById('contenido')?.focus({ preventScroll: true })
  },
  { immediate: true }
)

function confirmUpdate() {
  quasar
    .dialog({
      title: 'Actualizar ConectaMayor',
      message: 'Se recargará la aplicación. Tu avance guardado permanecerá en este dispositivo.',
      cancel: { label: 'Después', flat: true },
      ok: { label: 'Actualizar', color: 'primary' }
    })
    .onOk(update)
}
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <a class="skip-link" href="#contenido">Ir al contenido</a>
    <q-header class="app-header">
      <div class="header-inner">
        <q-btn
          flat
          round
          icon="menu"
          class="mobile-menu"
          aria-label="Abrir menú de navegación"
          @click="drawer = true"
        />
        <BrandLogo />
        <nav class="desktop-navigation" aria-label="Navegación principal">
          <router-link
            v-for="item in navigation"
            :key="item.to"
            :to="item.to"
            :class="{ active: active(item.to) }"
            :aria-current="active(item.to) ? 'page' : undefined"
            >{{ item.short }}</router-link
          >
        </nav>
        <div class="header-actions">
          <q-btn flat round icon="help_outline" to="/ayuda" aria-label="Ayuda y ajustes" /><q-btn
            flat
            round
            icon="bar_chart"
            to="/progreso"
            aria-label="Mi progreso"
          />
        </div>
      </div>
    </q-header>

    <q-drawer v-model="drawer" overlay bordered :width="300">
      <div class="drawer-heading">
        <strong>Tu espacio para aprender</strong
        ><q-btn flat round icon="close" aria-label="Cerrar menú" @click="drawer = false" />
      </div>
      <nav aria-label="Todas las secciones">
        <q-list
          ><q-item
            v-for="item in [...navigation, ...extraNavigation]"
            :key="item.to"
            clickable
            :to="item.to"
            :exact="item.to === '/'"
            active-class="drawer-active"
            ><q-item-section avatar><q-icon :name="item.icon" /></q-item-section
            ><q-item-section>{{ item.title }}</q-item-section></q-item
          ></q-list
        >
      </nav>
    </q-drawer>

    <q-page-container>
      <div class="status-container">
        <div v-if="!online" class="notice-strip" role="status">
          <q-icon name="wifi_off" aria-hidden="true" /><span
            >Estás sin conexión. Puedes usar las actividades que ya se descargaron.</span
          >
        </div>
        <div v-if="store.error" class="notice-strip notice-warning" role="alert">
          <q-icon name="save_as" aria-hidden="true" /><span>{{ store.error }}</span
          ><q-btn
            flat
            no-caps
            label="Reintentar guardado"
            :loading="store.saving"
            @click="store.retrySave"
          />
        </div>
        <div v-if="waitingWorker" class="notice-strip" role="status">
          <q-icon name="system_update" aria-hidden="true" /><span
            >Hay una nueva versión de ConectaMayor.</span
          ><q-btn
            flat
            no-caps
            label="Actualizar"
            :disable="store.saving || store.pendingCount > 0 || !!store.error"
            @click="confirmUpdate"
          />
        </div>
      </div>
      <main id="contenido" tabindex="-1"><router-view :key="route.path" /></main>
      <footer class="page-footer">
        <span>ConectaMayor · Aprende, protégete y conecta.</span
        ><router-link to="/ayuda"
          >Estamos para ayudarte <q-icon name="arrow_forward" aria-hidden="true"
        /></router-link>
      </footer>
    </q-page-container>

    <q-footer class="mobile-footer">
      <nav class="bottom-navigation" aria-label="Navegación principal">
        <router-link
          v-for="item in navigation"
          :key="item.to"
          :to="item.to"
          :class="{ active: active(item.to) }"
          :aria-current="active(item.to) ? 'page' : undefined"
          ><q-icon :name="item.icon" size="26px" aria-hidden="true" /><span>{{
            item.short
          }}</span></router-link
        >
      </nav>
    </q-footer>
  </q-layout>
</template>
