<script setup>
import { computed, ref } from 'vue'
import PageHeading from 'components/PageHeading.vue'
import { tutorials } from 'src/content/learning'
import { useLearningStore } from 'src/stores/learning'
const store = useLearningStore()
const search = ref('')
const filtered = computed(() => {
  const normalize = (text) =>
    text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
  return tutorials.filter((item) =>
    normalize(`${item.title} ${item.subtitle}`).includes(normalize(search.value || ''))
  )
})
function status(id) {
  const saved = store.progress[`tutorial:${id}`]
  return saved?.completed
    ? 'Completado · puedes repetirlo'
    : saved
      ? 'Continuar donde lo dejaste'
      : 'Comenzar paso a paso'
}
</script>

<template>
  <q-page class="page-shell">
    <PageHeading
      title="Tutoriales digitales"
      eyebrow="APRENDE, UN PASO A LA VEZ"
      description="Herramientas que te acercan a las personas y a las cosas que te importan. Elige por dónde empezar."
    />
    <div class="catalog-layout">
      <section aria-label="Tutoriales disponibles">
        <q-input
          v-model="search"
          outlined
          clearable
          label="Buscar un tutorial"
          debounce="150"
          class="search-field"
          ><template #prepend><q-icon name="search" aria-hidden="true" /></template
        ></q-input>
        <p class="small-copy" role="status">
          {{ filtered.length }}
          {{ filtered.length === 1 ? 'tutorial disponible' : 'tutoriales disponibles' }}
        </p>
        <div class="course-list">
          <router-link
            v-for="tutorial in filtered"
            :key="tutorial.id"
            :to="`/aprende/${tutorial.id}`"
            class="course-card"
            ><span class="icon-tile large-icon" :class="`tone-${tutorial.tone}`"
              ><q-icon :name="tutorial.icon" size="34px" aria-hidden="true"
            /></span>
            <div class="course-copy">
              <h2>{{ tutorial.title }}</h2>
              <p>{{ tutorial.subtitle }}</p>
              <span class="small-copy"
                ><q-icon name="schedule" aria-hidden="true" /> {{ tutorial.duration }} ·
                {{ tutorial.steps.length }} pasos</span
              ><span
                class="course-status"
                :class="{ completed: store.progress[`tutorial:${tutorial.id}`]?.completed }"
                ><q-icon
                  v-if="store.progress[`tutorial:${tutorial.id}`]?.completed"
                  name="check_circle"
                  aria-hidden="true"
                />
                {{ status(tutorial.id) }}</span
              >
            </div>
            <q-icon name="chevron_right" class="card-chevron" aria-hidden="true"
          /></router-link>
        </div>
        <div v-if="!filtered.length" class="empty-state">
          <q-icon name="search_off" size="44px" aria-hidden="true" />
          <h2>No encontramos ese tutorial</h2>
          <p>Prueba con «correo», «mensajes» o «llamadas».</p>
          <q-btn
            flat
            no-caps
            color="primary"
            label="Ver todos los tutoriales"
            @click="search = ''"
          />
        </div>
      </section>
      <aside class="aside-card">
        <span class="icon-tile tone-teal"
          ><q-icon name="emoji_objects" size="32px" aria-hidden="true"
        /></span>
        <h2>Aquí no hay prisa</h2>
        <p>Lee la explicación, elige una respuesta y descubre el siguiente paso.</p>
        <ol class="instruction-list">
          <li>Elige un tutorial.</li>
          <li>Practica con los ejemplos.</li>
          <li>Repite lo que necesites.</li>
        </ol>
        <p class="small-copy">
          Tu avance se guarda en este dispositivo. Puedes volver cuando quieras.
        </p>
        <router-link to="/ayuda"
          >Necesito ayuda <q-icon name="arrow_forward" aria-hidden="true"
        /></router-link>
      </aside>
    </div>
  </q-page>
</template>
