<script setup>
import PageHeading from 'components/PageHeading.vue'
import { scenarios } from 'src/content/learning'
import { useLearningStore } from 'src/stores/learning'
const store = useLearningStore()
function practiced(id) {
  return store.practicedScenarios.some((item) => item.id === id)
}
</script>

<template>
  <q-page class="page-shell"
    ><PageHeading
      title="Practica con tranquilidad"
      eyebrow="SIMULADOR DE RIESGOS"
      description="Aquí puedes equivocarte, aprender y volver a intentarlo. Tus decisiones solo tienen efecto dentro de esta práctica."
    />
    <div class="practice-label">
      <q-icon name="science" aria-hidden="true" /> Datos ficticios. Sin pagos, mensajes reales ni
      solicitudes de contraseñas.
    </div>
    <div class="case-grid">
      <router-link
        v-for="(scenario, index) in scenarios"
        :key="scenario.id"
        :to="`/practica/${scenario.id}`"
        class="case-card"
        ><div class="card-topline">
          <span class="icon-tile" :class="`tone-${scenario.tone}`"
            ><q-icon :name="scenario.icon" size="30px" aria-hidden="true" /></span
          ><span class="small-copy">Situación {{ index + 1 }}</span>
        </div>
        <h2>{{ scenario.title }}</h2>
        <p>{{ scenario.category }} · Elige cómo actuarías y descubre por qué.</p>
        <span class="module-link"
          ><q-icon v-if="practiced(scenario.id)" name="check_circle" aria-hidden="true" />
          {{ practiced(scenario.id) ? 'Practicar de nuevo' : 'Comenzar práctica' }}
          <q-icon name="arrow_forward" aria-hidden="true" /></span
      ></router-link>
    </div>
    <p class="small-copy section-spacing">
      No hay límite de tiempo. Puedes consultar los ejemplos de prevención antes de responder.
    </p>
  </q-page>
</template>
