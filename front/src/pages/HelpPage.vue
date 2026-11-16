<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import PageHeading from 'components/PageHeading.vue'
import { useLearningStore } from 'src/stores/learning'
import { usePwa } from 'src/composables/usePwa'
const store = useLearningStore()
const router = useRouter()
const quasar = useQuasar()
const { installEvent, install, offlineReady, online } = usePwa()
const deleting = ref(false)
const textSizes = [
  { label: 'Normal', value: 'normal' },
  { label: 'Grande', value: 'large' },
  { label: 'Muy grande', value: 'extra' }
]
async function installApp() {
  try {
    await install()
  } catch {
    quasar.notify({
      message: 'No se pudo abrir la instalación. Puedes usar las instrucciones de tu navegador.',
      color: 'warning',
      timeout: 0,
      actions: [{ label: 'Cerrar', color: 'white' }]
    })
  }
}
function confirmDelete() {
  quasar
    .dialog({
      title: '¿Borrar los datos de este dispositivo?',
      message:
        'Se borrarán tus avances, respuestas, logros y ajustes de ConectaMayor en este navegador. Esta acción no se puede deshacer.',
      cancel: { label: 'Conservar mis datos', flat: true },
      ok: { label: 'Sí, borrar los datos', color: 'negative' },
      persistent: true
    })
    .onOk(async () => {
      deleting.value = true
      const deleted = await store.resetData()
      deleting.value = false
      if (deleted) {
        quasar.notify({
          message: 'Se borraron los datos de este navegador.',
          color: 'positive',
          timeout: 0,
          actions: [{ label: 'Cerrar', color: 'white' }]
        })
        router.replace('/')
      }
    })
}
</script>

<template>
  <q-page class="page-shell reading-shell"
    ><PageHeading
      title="Estamos para ayudarte"
      eyebrow="AYUDA Y AJUSTES"
      description="Haz de ConectaMayor un espacio cómodo para ti. Puedes cambiar estas opciones cuando quieras."
    />
    <section class="panel">
      <h2><q-icon name="text_fields" aria-hidden="true" /> Lee a tu manera</h2>
      <p>Elige el tamaño que te resulte más cómodo.</p>
      <div class="text-size-options" role="group" aria-label="Tamaño del texto">
        <q-btn
          v-for="size in textSizes"
          :key="size.value"
          no-caps
          :outline="store.preferences.textSize !== size.value"
          :unelevated="store.preferences.textSize === size.value"
          color="primary"
          :label="size.label"
          :aria-pressed="store.preferences.textSize === size.value"
          :disable="store.saving"
          @click="store.setPreferences({ textSize: size.value })"
        />
      </div>
      <p class="reading-sample">Aprender algo nuevo empieza con un pequeño paso.</p>
      <div class="setting-row">
        <div>
          <strong>Más contraste</strong>
          <p class="small-copy">Colores más definidos para distinguir texto y controles.</p>
        </div>
        <q-toggle
          :model-value="store.preferences.highContrast"
          aria-label="Activar más contraste"
          color="primary"
          :disable="store.saving"
          @update:model-value="(value) => store.setPreferences({ highContrast: value })"
        />
      </div>
      <div class="setting-row">
        <div>
          <strong>Reducir movimiento</strong>
          <p class="small-copy">Evita las animaciones y las transiciones de la interfaz.</p>
        </div>
        <q-toggle
          :model-value="store.preferences.reducedMotion"
          aria-label="Reducir movimiento"
          color="primary"
          :disable="store.saving"
          @update:model-value="(value) => store.setPreferences({ reducedMotion: value })"
        />
      </div>
      <p class="small-copy">También puedes ampliar la página desde las opciones de tu navegador. Con texto muy grande, utiliza el botón Menú de la parte superior para cambiar de sección.</p>
    </section>
    <section class="panel section-spacing">
      <h2><q-icon name="explore" aria-hidden="true" /> ¿Cómo uso la aplicación?</h2>
      <ol class="instruction-list">
        <li>En Inicio, elige «Tutoriales digitales» para aprender o «Simulador» para practicar.</li>
        <li>Lee la explicación y selecciona una respuesta.</li>
        <li>Pulsa «Comprobar» y revisa el mensaje de ayuda.</li>
        <li>Usa «Siguiente» para avanzar o «Anterior» para repasar.</li>
        <li>Consulta «Mi progreso» para continuar y ver tus logros.</li>
      </ol>
      <p>
        Puedes volver al inicio con el logo o el botón «Inicio». El menú también contiene todas las
        secciones.
      </p>
      <q-btn
        outline
        no-caps
        color="primary"
        label="Ver mis tutoriales"
        icon="menu_book"
        to="/aprende"
      />
    </section>
    <section class="panel section-spacing">
      <h2><q-icon name="install_mobile" aria-hidden="true" /> ConectaMayor, más cerca</h2>
      <p>Instala la aplicación para abrirla desde la pantalla de inicio.</p>
      <q-btn
        v-if="installEvent"
        unelevated
        no-caps
        color="primary"
        label="Instalar ConectaMayor"
        icon="download"
        @click="installApp"
      /><q-expansion-item
        label="Instalar en Android o en un computador"
        icon="devices"
        group="installation"
        ><div class="expansion-copy">
          <p>
            Abre el menú del navegador y busca «Instalar aplicación» o «Añadir a la pantalla de
            inicio». El nombre de la opción depende de tu navegador. Si no aparece, puedes seguir
            usando ConectaMayor desde esta página.
          </p>
        </div></q-expansion-item
      ><q-expansion-item label="Instalar en iPhone o iPad" icon="phone_iphone" group="installation"
        ><div class="expansion-copy">
          <p>
            Abre ConectaMayor en Safari, pulsa «Compartir» y busca «Añadir a la pantalla de inicio».
            Confirma para crear el acceso.
          </p>
        </div></q-expansion-item
      >
      <div class="tip-box">
        <q-icon :name="offlineReady ? 'offline_pin' : 'wifi'" aria-hidden="true" /><span>{{
          offlineReady
            ? 'Los recursos de esta versión están preparados para usarlos sin conexión.'
            : online
              ? 'Para preparar el uso sin conexión, abre la versión publicada con internet y deja que termine de cargar.'
              : 'Estás sin conexión. Solo estarán disponibles los recursos ya descargados.'
        }}</span>
      </div>
    </section>
    <section class="panel section-spacing">
      <h2><q-icon name="privacy_tip" aria-hidden="true" /> Tus datos se quedan contigo</h2>
      <p>
        Guardamos el progreso, las respuestas y los ajustes en este navegador. No necesitas crear
        una cuenta y no enviamos tus respuestas a servidores.
      </p>
      <p>
        El progreso no se comparte entre dispositivos. Si borras los datos del sitio, cambias de
        navegador o usas una ventana privada, puedes perderlo. Otras personas que usen este mismo
        perfil del navegador podrían ver tus avances.
      </p>
      <p>
        Las prácticas usan contactos y mensajes ficticios. No escribas contraseñas, documentos ni
        códigos reales.
      </p>
      <div class="danger-zone">
        <h3>Borrar mis datos locales</h3>
        <p class="small-copy">
          Eliminará el progreso, las respuestas y los ajustes de ConectaMayor en este navegador.
        </p>
        <q-btn
          outline
          no-caps
          color="negative"
          label="Borrar mis datos"
          icon="delete_outline"
          :loading="deleting"
          :disable="store.saving"
          @click="confirmDelete"
        />
      </div>
    </section>
  </q-page>
</template>
