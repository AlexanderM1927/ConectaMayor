<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import PageHeading from 'components/PageHeading.vue'
import ScenarioMessage from 'components/ScenarioMessage.vue'
import NotFoundPage from './NotFoundPage.vue'
import { scenarioById } from 'src/content/learning'
import { useLearningStore } from 'src/stores/learning'
const scenario = scenarioById(useRoute().params.id)
const store = useLearningStore()
const revealed = ref(false)
const reviewed = computed(() => store.progress[`fraud:${scenario?.id}`]?.completed)
async function markReviewed() {
  await store.saveProgress(`fraud:${scenario.id}`, { completed: true })
}
</script>

<template>
  <q-page v-if="scenario" class="page-shell reading-shell"
    ><PageHeading
      :title="scenario.title"
      :eyebrow="scenario.category"
      description="Lee este mensaje de ejemplo. ¿Qué detalles te llaman la atención?"
      back-to="/enganos"
      back-label="Volver a prevención"
    />
    <div class="practice-label">
      <q-icon name="science" aria-hidden="true" /> Práctica: todos los datos son ficticios.
    </div>
    <ScenarioMessage :scenario="scenario" />
    <section class="panel section-spacing">
      <h2>Observa antes de actuar</h2>
      <p>Tómate unos segundos para pensar. Después, compara lo que encontraste con estas pistas.</p>
      <q-btn
        v-if="!revealed"
        unelevated
        no-caps
        color="primary"
        icon="visibility"
        label="Mostrar las señales"
        @click="revealed = true"
      />
      <div
        v-else
        class="revealed-signals"
        role="region"
        aria-label="Señales del mensaje"
        aria-live="polite"
      >
        <ul class="signal-list">
          <li v-for="signal in scenario.signals" :key="signal">
            <q-icon name="search" aria-hidden="true" />{{ signal }}
          </li>
        </ul>
        <div class="tip-box">
          <q-icon name="verified_user" aria-hidden="true" /><span>{{ scenario.explanation }}</span>
        </div>
        <h3>¿Y si el mensaje parece normal?</h3>
        <p>{{ scenario.safeExample }}</p>
        <q-btn
          v-if="!reviewed"
          outline
          no-caps
          color="primary"
          label="Ya revisé este ejemplo"
          icon="done"
          :loading="store.saving"
          @click="markReviewed"
        />
        <p v-else class="completed-label" role="status">
          <q-icon name="check_circle" aria-hidden="true" />
          {{
            store.saving
              ? 'Guardando tu revisión…'
              : store.error
                ? 'Ejemplo revisado en esta sesión; pendiente de guardar.'
                : 'Ejemplo revisado y guardado en este dispositivo.'
          }}
        </p>
      </div>
    </section>
    <div class="button-row section-spacing">
      <q-btn
        unelevated
        no-caps
        color="primary"
        label="Practicar esta situación"
        icon-right="arrow_forward"
        :to="`/practica/${scenario.id}`"
      /><q-btn flat no-caps color="primary" label="Ver otros ejemplos" to="/enganos" />
    </div> </q-page
  ><NotFoundPage v-else />
</template>
