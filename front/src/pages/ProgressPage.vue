<script setup>
import { computed } from 'vue'
import PageHeading from 'components/PageHeading.vue'
import { tutorials, scenarios, questions } from 'src/content/learning'
import { useLearningStore } from 'src/stores/learning'
const store = useLearningStore()
const reviewed = computed(
  () => scenarios.filter((item) => store.progress[`fraud:${item.id}`]?.completed).length
)
const totalSteps = computed(
  () =>
    store.completedTutorials.length +
    store.practicedScenarios.length +
    (store.assessment?.completed ? 1 : 0)
)
const achievements = computed(() => [
  {
    title: 'Mi primer paso',
    description: 'Completa un tutorial',
    icon: 'menu_book',
    unlocked: store.completedTutorials.length >= 1,
    tone: 'blue'
  },
  {
    title: 'Mirada atenta',
    description: 'Revisa tres ejemplos',
    icon: 'verified_user',
    unlocked: reviewed.value >= 3,
    tone: 'green'
  },
  {
    title: 'Decisiones seguras',
    description: 'Resuelve tres prácticas',
    icon: 'sports_esports',
    unlocked: store.practicedScenarios.length >= 3,
    tone: 'purple'
  },
  {
    title: 'Tiempo de repasar',
    description: 'Termina la evaluación',
    icon: 'workspace_premium',
    unlocked: !!store.assessment?.completed,
    tone: 'orange'
  }
])
const recent = computed(() => [...store.attempts].reverse().slice(0, 8))
function activityName(attempt) {
  if (attempt.kind === 'tutorial')
    return `${tutorials.find((item) => item.id === attempt.activityId)?.title || 'Tutorial'} · paso ${attempt.step + 1}`
  if (attempt.kind === 'simulation')
    return scenarios.find((item) => item.id === attempt.activityId)?.title || 'Práctica'
  return `Evaluación · pregunta ${questions.findIndex((item) => item.id === attempt.activityId) + 1}`
}
function formatDate(value) {
  return new Intl.DateTimeFormat('es', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(value))
}
</script>

<template>
  <q-page class="page-shell"
    ><PageHeading
      title="Tu camino, tus logros"
      eyebrow="MI PROGRESO"
      description="Cada pequeño paso cuenta. Aquí puedes ver lo que has practicado y elegir cómo continuar."
    />
    <div class="progress-overview panel">
      <div>
        <h2>
          {{
            totalSteps
              ? '¡Mira todo lo que estás construyendo!'
              : 'Tu camino está a punto de comenzar'
          }}
        </h2>
        <p>{{ totalSteps }} de 11 actividades principales completadas</p>
        <q-linear-progress
          :value="totalSteps / 11"
          rounded
          size="12px"
          color="primary"
          aria-label="Actividades principales completadas"
        />
      </div>
      <span class="progress-total">{{ Math.round((totalSteps / 11) * 100) }}<small>%</small></span>
    </div>
    <div class="stats-grid">
      <router-link to="/aprende" class="stat-card"
        ><span class="icon-tile tone-blue"
          ><q-icon name="menu_book" aria-hidden="true" size="28px" /></span
        ><strong>{{ store.completedTutorials.length }} / 4</strong
        ><span>Tutoriales completados</span></router-link
      ><router-link to="/enganos" class="stat-card"
        ><span class="icon-tile tone-green"
          ><q-icon name="verified_user" aria-hidden="true" size="28px" /></span
        ><strong>{{ reviewed }} / 6</strong><span>Ejemplos revisados</span></router-link
      ><router-link to="/practica" class="stat-card"
        ><span class="icon-tile tone-purple"
          ><q-icon name="sports_esports" aria-hidden="true" size="28px" /></span
        ><strong>{{ store.practicedScenarios.length }} / 6</strong
        ><span>Prácticas resueltas</span></router-link
      ><router-link to="/evaluacion" class="stat-card"
        ><span class="icon-tile tone-orange"
          ><q-icon name="assignment" aria-hidden="true" size="28px" /></span
        ><strong>{{
          store.assessment?.completed ? `${store.assessment.score} / 6` : 'A tu ritmo'
        }}</strong
        ><span>{{
          store.assessment?.completed
            ? 'Última evaluación'
            : store.assessment
              ? 'Evaluación en curso'
              : 'Evaluación por descubrir'
        }}</span></router-link
      >
    </div>
    <section class="section-spacing">
      <h2>Tus próximos pasos</h2>
      <div class="course-list">
        <router-link
          v-for="tutorial in tutorials"
          :key="tutorial.id"
          :to="`/aprende/${tutorial.id}`"
          class="course-card compact-card"
          ><span class="icon-tile" :class="`tone-${tutorial.tone}`"
            ><q-icon :name="tutorial.icon" size="28px" aria-hidden="true"
          /></span>
          <div class="course-copy">
            <h3>{{ tutorial.title }}</h3>
            <p>
              {{
                store.progress[`tutorial:${tutorial.id}`]?.completed
                  ? 'Completado. Puedes volver a practicar.'
                  : store.progress[`tutorial:${tutorial.id}`]
                    ? 'Continúa desde donde lo dejaste.'
                    : 'Tu próximo pequeño gran paso.'
              }}
            </p>
          </div>
          <q-icon
            :name="
              store.progress[`tutorial:${tutorial.id}`]?.completed
                ? 'check_circle_outline'
                : 'chevron_right'
            "
            class="card-chevron"
            aria-hidden="true"
        /></router-link>
      </div>
    </section>
    <section class="section-spacing">
      <h2>Pequeños logros que merecen celebrarse</h2>
      <div class="achievement-grid">
        <div
          v-for="achievement in achievements"
          :key="achievement.title"
          class="achievement-card"
          :class="{ unlocked: achievement.unlocked }"
        >
          <span
            class="icon-tile"
            :class="achievement.unlocked ? `tone-${achievement.tone}` : 'tone-neutral'"
            ><q-icon :name="achievement.icon" size="32px" aria-hidden="true"
          /></span>
          <h3>{{ achievement.title }}</h3>
          <p>{{ achievement.description }}</p>
          <strong class="small-copy">{{
            achievement.unlocked ? '¡Lo conseguiste!' : 'Un paso por descubrir'
          }}</strong>
        </div>
      </div>
    </section>
    <section class="section-spacing">
      <h2>Lo que has practicado recientemente</h2>
      <div v-if="recent.length" class="panel history-list">
        <article v-for="attempt in recent" :key="attempt.id">
          <q-icon
            :name="attempt.correct ? 'check_circle_outline' : 'lightbulb_outline'"
            :class="attempt.correct ? 'answer-correct' : 'answer-review-icon'"
            size="27px"
            aria-hidden="true"
          />
          <div>
            <strong>{{ activityName(attempt) }}</strong
            ><span class="small-copy"
              >{{ attempt.correct ? 'Respuesta correcta' : 'Oportunidad para repasar' }} ·
              {{ formatDate(attempt.createdAt) }}</span
            >
          </div>
        </article>
      </div>
      <div v-else class="empty-state">
        <q-icon name="explore" size="40px" aria-hidden="true" />
        <h3>Aquí aparecerán tus primeros pasos</h3>
        <p>Elige un tutorial para comenzar. No necesitas completar todo de una vez.</p>
        <q-btn unelevated no-caps color="primary" label="Elegir un tutorial" to="/aprende" />
      </div>
    </section>
    <p class="small-copy storage-note" role="status">
      <q-icon :name="store.error ? 'save_as' : 'privacy_tip'" aria-hidden="true" />
      {{
        store.error
          ? 'Hay cambios pendientes de guardar. Revisa el aviso de la parte superior.'
          : store.saving
            ? 'Guardando tu avance…'
            : 'Tus avances se guardan en este navegador y dispositivo.'
      }}
    </p>
  </q-page>
</template>
