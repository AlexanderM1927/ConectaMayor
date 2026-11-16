<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import PageHeading from 'components/PageHeading.vue'
import ScenarioMessage from 'components/ScenarioMessage.vue'
import ChoiceExercise from 'components/ChoiceExercise.vue'
import FeedbackPanel from 'components/FeedbackPanel.vue'
import NotFoundPage from './NotFoundPage.vue'
import { scenarios, scenarioById } from 'src/content/learning'
import { useLearningStore } from 'src/stores/learning'
const scenario = scenarioById(useRoute().params.id)
const store = useLearningStore()
const selected = ref(null)
const feedback = ref(null)
function retry() {
  selected.value = null
  feedback.value = null
}
const nextScenario =
  scenarios[(scenarios.findIndex((item) => item.id === scenario?.id) + 1) % scenarios.length]
async function check() {
  if (selected.value === null || store.saving) return
  feedback.value = selected.value === scenario.correct
  await store.recordAttempt({
    kind: 'simulation',
    activityId: scenario.id,
    choice: selected.value,
    correct: feedback.value
  })
}
</script>

<template>
  <q-page v-if="scenario" class="page-shell reading-shell"
    ><PageHeading
      :title="scenario.title"
      eyebrow="PRACTICA CON SEGURIDAD"
      description="Lee el mensaje y elige qué harías. Después te explicaremos la decisión."
      back-to="/practica"
      back-label="Volver al simulador"
    />
    <div class="practice-label">
      <q-icon name="science" aria-hidden="true" /> Práctica: todos los datos son ficticios.
    </div>
    <ScenarioMessage :scenario="scenario" />
    <section class="panel exercise-panel section-spacing">
      <ChoiceExercise
        v-model="selected"
        :question="scenario.question"
        :options="scenario.options"
        :disabled="feedback !== null || store.saving"
      /><q-btn
        v-if="feedback === null"
        unelevated
        no-caps
        color="primary"
        label="Comprobar mi decisión"
        :disable="selected === null"
        :loading="store.saving"
        @click="check"
      /><FeedbackPanel v-else :correct="feedback" :explanation="scenario.explanation" />
      <div v-if="feedback !== null" class="button-row">
        <q-btn
          v-if="!feedback"
          outline
          no-caps
          color="primary"
          label="Volver a intentarlo"
          icon="replay"
          :disable="store.saving"
          @click="retry"
        /><q-btn
          v-else
          unelevated
          no-caps
          color="primary"
          label="Practicar otra situación"
          icon-right="arrow_forward"
          :to="`/practica/${nextScenario.id}`"
          :disable="store.saving"
        /><q-btn
          flat
          no-caps
          color="primary"
          label="Ver las señales"
          :to="`/enganos/${scenario.id}`"
        />
      </div>
    </section>
    <p class="small-copy text-center">
      Ninguna de estas opciones abre enlaces, envía datos o realiza pagos.
    </p> </q-page
  ><NotFoundPage v-else />
</template>
