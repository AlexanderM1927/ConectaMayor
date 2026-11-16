<script setup>
import { computed, nextTick, ref } from 'vue'
import PageHeading from 'components/PageHeading.vue'
import ChoiceExercise from 'components/ChoiceExercise.vue'
import FeedbackPanel from 'components/FeedbackPanel.vue'
import { questions } from 'src/content/learning'
import { useLearningStore } from 'src/stores/learning'
const store = useLearningStore()
const saved = store.assessment
const started = ref(!!saved)
const finished = ref(!!saved?.completed)
const index = ref(Math.min(Math.max(saved?.currentStep || 0, 0), questions.length - 1))
const answers = ref(saved?.answers || {})
const current = computed(() => questions[index.value])
const selected = ref(answers.value[current.value.id]?.choice ?? null)
const feedback = ref(answers.value[current.value.id]?.correct ?? null)
const score = computed(() => Object.values(answers.value).filter((answer) => answer.correct).length)

function record(completed = false) {
  return {
    currentStep: index.value,
    answers: { ...answers.value },
    completed,
    score: score.value,
    total: questions.length
  }
}
async function focusQuestion() {
  await nextTick()
  document.getElementById('assessment-question')?.focus()
}
async function start() {
  index.value = 0
  answers.value = {}
  selected.value = null
  feedback.value = null
  finished.value = false
  started.value = true
  await store.saveProgress('assessment:basic', record())
  focusQuestion()
}
async function check() {
  if (selected.value === null || store.saving) return
  feedback.value = selected.value === current.value.correct
  answers.value[current.value.id] = { choice: selected.value, correct: feedback.value }
  await store.recordAttempt(
    {
      kind: 'assessment',
      activityId: current.value.id,
      choice: selected.value,
      correct: feedback.value
    },
    { id: 'assessment:basic', value: record() }
  )
}
async function next() {
  if (index.value === questions.length - 1) {
    finished.value = true
    await store.saveProgress('assessment:basic', record(true))
    await nextTick()
    document.getElementById('assessment-result')?.focus()
  } else {
    index.value += 1
    selected.value = null
    feedback.value = null
    await store.saveProgress('assessment:basic', record())
    focusQuestion()
  }
}
</script>

<template>
  <q-page class="page-shell reading-shell"
    ><PageHeading
      title="Mira cuánto has aprendido"
      eyebrow="EVALUACIÓN"
      description="Una oportunidad para recordar y seguir aprendiendo. Sin reloj, sin presión y con una explicación en cada respuesta."
    />
    <section v-if="!started" class="panel lesson-intro">
      <span class="icon-tile tone-orange large-icon"
        ><q-icon name="assignment" size="40px" aria-hidden="true"
      /></span>
      <h2>Un pequeño repaso para ti</h2>
      <p>
        {{ questions.length }} preguntas sobre comunicación, privacidad y prevención de engaños.
      </p>
      <ul class="plain-checklist">
        <li><q-icon name="check" aria-hidden="true" /> Elige una respuesta por pregunta.</li>
        <li><q-icon name="check" aria-hidden="true" /> Lee la explicación antes de continuar.</li>
        <li>
          <q-icon name="check" aria-hidden="true" /> Puedes salir y retomar en este dispositivo.
        </li>
      </ul>
      <q-btn
        unelevated
        no-caps
        color="primary"
        label="Comenzar evaluación"
        icon-right="arrow_forward"
        :loading="store.saving"
        @click="start"
      />
    </section>
    <section v-else-if="finished" class="assessment-results">
      <div id="assessment-result" class="panel completion-card" tabindex="-1">
        <span class="achievement-icon"
          ><q-icon name="auto_awesome" size="58px" aria-hidden="true"
        /></span>
        <p class="eyebrow">CADA RESPUESTA ES UNA OPORTUNIDAD</p>
        <h2>¡Terminaste tu evaluación!</h2>
        <p class="result-number">
          {{ score }} <span>de {{ questions.length }} respuestas correctas</span>
        </p>
        <p>
          {{
            score === questions.length
              ? 'Reconociste todas las decisiones seguras de este repaso. Sigue practicando para afianzar lo aprendido.'
              : 'Ya diste un paso importante. Revisa las explicaciones y repite cuando te sientas preparado.'
          }}
        </p>
        <div class="button-row">
          <q-btn unelevated no-caps color="primary" label="Ver mi progreso" to="/progreso" /><q-btn
            outline
            no-caps
            color="primary"
            label="Repetir evaluación"
            icon="replay"
            :disable="store.saving"
            @click="start"
          />
        </div>
      </div>
      <h2 class="section-spacing">Repasemos juntos</h2>
      <article v-for="question in questions" :key="question.id" class="answer-review">
        <q-icon
          :name="answers[question.id]?.correct ? 'check_circle_outline' : 'lightbulb_outline'"
          :class="answers[question.id]?.correct ? 'answer-correct' : 'answer-review-icon'"
          size="28px"
          aria-hidden="true"
        />
        <div>
          <strong>{{
            answers[question.id]?.correct ? 'Respuesta correcta' : 'Para seguir aprendiendo'
          }}</strong>
          <h3>{{ question.question }}</h3>
          <p>{{ question.explanation }}</p>
          <p class="small-copy">La opción más segura: {{ question.options[question.correct] }}</p>
        </div>
      </article>
      <q-btn
        flat
        no-caps
        color="primary"
        label="Volver a los tutoriales"
        to="/aprende"
        icon="menu_book"
      />
    </section>
    <section v-else>
      <div class="step-progress">
        <span>Pregunta {{ index + 1 }} de {{ questions.length }}</span
        ><span>Sin límite de tiempo</span
        ><q-linear-progress
          :value="Object.keys(answers).length / questions.length"
          rounded
          size="8px"
          color="primary"
          aria-label="Progreso de la evaluación"
        />
      </div>
      <div id="assessment-question" class="panel exercise-panel" tabindex="-1">
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
          label="Comprobar respuesta"
          :disable="selected === null"
          :loading="store.saving"
          @click="check"
        /><FeedbackPanel v-else :correct="feedback" :explanation="current.explanation" /><q-btn
          v-if="feedback !== null"
          unelevated
          no-caps
          color="primary"
          :label="index === questions.length - 1 ? 'Ver mi resultado' : 'Siguiente pregunta'"
          icon-right="arrow_forward"
          :disable="store.saving"
          @click="next"
        />
      </div>
      <p class="small-copy text-center">
        Puedes consultar las explicaciones al terminar y volver a intentarlo.
      </p>
    </section>
  </q-page>
</template>
