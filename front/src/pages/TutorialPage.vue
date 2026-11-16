<script setup>
import { computed, nextTick, ref } from 'vue'
import { useRoute } from 'vue-router'
import PageHeading from 'components/PageHeading.vue'
import ChoiceExercise from 'components/ChoiceExercise.vue'
import FeedbackPanel from 'components/FeedbackPanel.vue'
import TutorialDemo from 'components/TutorialDemo.vue'
import NotFoundPage from './NotFoundPage.vue'
import { tutorialById } from 'src/content/learning'
import { useLearningStore } from 'src/stores/learning'

const store = useLearningStore()
const tutorial = tutorialById(useRoute().params.id)
const key = `tutorial:${tutorial?.id}`
const saved = store.progress[key]
const started = ref(!!saved)
const finished = ref(!!saved?.completed)
const stepIndex = ref(
  Math.min(Math.max(saved?.currentStep || 0, 0), (tutorial?.steps.length || 1) - 1)
)
const completedSteps = ref(saved?.completedSteps || [])
const current = computed(() => tutorial?.steps[stepIndex.value])
const selected = ref(completedSteps.value.includes(stepIndex.value) ? current.value?.correct : null)
const feedback = ref(completedSteps.value.includes(stepIndex.value) ? true : null)
const retainedCompletion = ref(!!saved?.completed)

function retry() {
  feedback.value = null
  selected.value = null
}

function record(completed = false) {
  return {
    currentStep: stepIndex.value,
    completedSteps: [...completedSteps.value],
    completed: completed || retainedCompletion.value
  }
}
async function focusStep() {
  await nextTick()
  document.getElementById('step-title')?.focus({ preventScroll: false })
}
async function start(repeat = false) {
  if (repeat) {
    stepIndex.value = 0
    completedSteps.value = []
    selected.value = null
    feedback.value = null
  }
  started.value = true
  finished.value = false
  await store.saveProgress(key, record())
  focusStep()
}
async function check() {
  if (selected.value === null || store.saving) return
  feedback.value = selected.value === current.value.correct
  if (feedback.value && !completedSteps.value.includes(stepIndex.value))
    completedSteps.value.push(stepIndex.value)
  if (completedSteps.value.length === tutorial.steps.length) retainedCompletion.value = true
  await store.recordAttempt(
    {
      kind: 'tutorial',
      activityId: tutorial.id,
      step: stepIndex.value,
      choice: selected.value,
      correct: feedback.value
    },
    { id: key, value: record(completedSteps.value.length === tutorial.steps.length) }
  )
}
async function move(direction) {
  if (direction === 1 && stepIndex.value === tutorial.steps.length - 1) {
    finished.value = true
    await nextTick()
    document.getElementById('tutorial-complete')?.focus()
    return
  }
  stepIndex.value += direction
  feedback.value = completedSteps.value.includes(stepIndex.value) ? true : null
  selected.value = feedback.value ? current.value.correct : null
  await store.saveProgress(key, record(completedSteps.value.length === tutorial.steps.length))
  focusStep()
}
</script>

<template>
  <q-page v-if="tutorial" class="page-shell reading-shell">
    <PageHeading
      :title="tutorial.title"
      :description="
        !started
          ? tutorial.introduction
          : 'Avanza a tu ritmo. Puedes volver a un paso anterior cuando lo necesites.'
      "
      eyebrow="TUTORIAL DIGITAL"
      back-to="/aprende"
      back-label="Volver a tutoriales"
    />
    <section v-if="!started" class="panel lesson-intro">
      <span class="icon-tile large-icon" :class="`tone-${tutorial.tone}`"
        ><q-icon :name="tutorial.icon" size="40px" aria-hidden="true"
      /></span>
      <h2>Hoy aprenderás a {{ tutorial.skill.toLowerCase() }}</h2>
      <p>
        {{ tutorial.steps.length }} pasos sencillos · {{ tutorial.duration }} aproximadamente · Sin
        límite de tiempo
      </p>
      <p class="small-copy">
        Las pantallas son ejemplos. Su apariencia puede variar en tu teléfono. Solo utilizamos datos
        ficticios.
      </p>
      <q-btn
        unelevated
        no-caps
        color="primary"
        label="Comenzar tutorial"
        icon-right="arrow_forward"
        @click="start()"
        :loading="store.saving"
      />
    </section>
    <section
      v-else-if="finished"
      id="tutorial-complete"
      class="panel completion-card"
      tabindex="-1"
    >
      <span class="achievement-icon"
        ><q-icon name="workspace_premium" size="64px" aria-hidden="true"
      /></span>
      <p class="eyebrow">UN PASO MÁS EN TU CAMINO</p>
      <h2>¡Tutorial completado!</h2>
      <p>
        Ya practicaste cómo {{ tutorial.skill.toLowerCase() }}. Puedes volver a intentarlo siempre
        que quieras.
      </p>
      <div class="button-row">
        <q-btn
          unelevated
          no-caps
          color="primary"
          label="Ver mi progreso"
          to="/progreso"
          icon-right="arrow_forward"
        /><q-btn
          outline
          no-caps
          color="primary"
          label="Repetir tutorial"
          icon="replay"
          :disable="store.saving"
          @click="start(true)"
        />
      </div>
      <router-link to="/aprende">Elegir otro tutorial</router-link>
    </section>
    <section v-else class="lesson-content">
      <div class="step-progress">
        <span>Paso {{ stepIndex + 1 }} de {{ tutorial.steps.length }}</span
        ><span
          >{{ Math.round((completedSteps.length / tutorial.steps.length) * 100) }} %
          practicado</span
        ><q-linear-progress
          :value="completedSteps.length / tutorial.steps.length"
          color="primary"
          rounded
          size="8px"
          aria-label="Progreso del tutorial"
        />
      </div>
      <div class="lesson-grid">
        <div>
          <h2 id="step-title" tabindex="-1">{{ current.title }}</h2>
          <p>{{ current.instruction }}</p>
          <div class="tip-box">
            <q-icon name="lightbulb_outline" aria-hidden="true" /><span>{{ current.tip }}</span>
          </div>
        </div>
        <TutorialDemo :tutorial="tutorial" :step-index="stepIndex" :completed="feedback === true" />
      </div>
      <div class="panel exercise-panel">
        <ChoiceExercise
          v-model="selected"
          :question="current.question"
          :options="current.options"
          :disabled="feedback !== null || store.saving"
        /><q-btn
          v-if="feedback === null"
          unelevated
          no-caps
          color="primary"
          label="Comprobar mi respuesta"
          :disable="selected === null"
          :loading="store.saving"
          @click="check"
        /><FeedbackPanel v-else :correct="feedback" :explanation="current.explanation" /><q-btn
          v-if="feedback === false"
          outline
          no-caps
          color="primary"
          label="Intentar otra vez"
          icon="replay"
          :disable="store.saving"
          @click="retry"
        />
      </div>
      <div class="lesson-navigation">
        <q-btn
          outline
          no-caps
          color="primary"
          label="Anterior"
          icon="arrow_back"
          :disable="stepIndex === 0 || store.saving"
          @click="move(-1)"
        /><q-btn
          unelevated
          no-caps
          color="primary"
          :label="stepIndex === tutorial.steps.length - 1 ? 'Terminar tutorial' : 'Siguiente paso'"
          icon-right="arrow_forward"
          :disable="feedback !== true || store.saving"
          @click="move(1)"
        />
      </div>
      <p class="small-copy text-center">
        Responde correctamente para avanzar. Si te equivocas, puedes repetir sin penalización.
      </p>
    </section>
  </q-page>
  <NotFoundPage v-else />
</template>
