<script setup>
import PageHeading from 'components/PageHeading.vue'
import { scenarios } from 'src/content/learning'
import { useLearningStore } from 'src/stores/learning'
const store = useLearningStore()
</script>

<template>
  <q-page class="page-shell"
    ><PageHeading
      title="Más confianza, menos engaños"
      eyebrow="PREVENCIÓN DE FRAUDES"
      description="Reconocer las señales de alerta es el primer paso para protegerte. Vamos a ver algunos ejemplos juntos."
    />
    <section class="safety-principles" aria-label="Tres hábitos de seguridad">
      <div>
        <span>01</span>
        <h2>Detente</h2>
        <p>No respondas por presión.</p>
      </div>
      <div>
        <span>02</span>
        <h2>Verifica</h2>
        <p>Usa un contacto que ya conozcas.</p>
      </div>
      <div>
        <span>03</span>
        <h2>Protege</h2>
        <p>Guarda tus claves y códigos para ti.</p>
      </div>
    </section>
    <div class="section-title">
      <h2>Aprende a reconocerlos</h2>
      <span class="small-copy">Todos los ejemplos son ficticios</span>
    </div>
    <div class="case-grid">
      <router-link
        v-for="scenario in scenarios"
        :key="scenario.id"
        :to="`/enganos/${scenario.id}`"
        class="case-card"
        ><div class="card-topline">
          <span class="icon-tile" :class="`tone-${scenario.tone}`"
            ><q-icon :name="scenario.icon" size="30px" aria-hidden="true" /></span
          ><span v-if="store.progress[`fraud:${scenario.id}`]?.completed" class="status-pill"
            ><q-icon name="check" aria-hidden="true" /> Revisado</span
          >
        </div>
        <span class="eyebrow">{{ scenario.category }}</span>
        <h3>{{ scenario.title }}</h3>
        <p>{{ scenario.message.slice(0, 95) }}…</p>
        <span class="module-link"
          >Ver el ejemplo <q-icon name="arrow_forward" aria-hidden="true" /></span
      ></router-link>
    </div>
    <aside class="gentle-card section-spacing">
      <q-icon name="support_agent" size="36px" aria-hidden="true" />
      <div>
        <h2>Si algo te preocupa, pide apoyo</h2>
        <p>
          Detén la conversación y busca una persona de confianza. Si ya compartiste datos, contacta
          al servicio afectado por un canal conocido para pedir ayuda.
        </p>
      </div>
    </aside>
  </q-page>
</template>
