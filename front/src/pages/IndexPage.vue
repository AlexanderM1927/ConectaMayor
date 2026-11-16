<script setup>
import { computed } from 'vue'
import { sections } from 'src/content/learning'
import { useLearningStore } from 'src/stores/learning'
const store = useLearningStore()
const continueTo = computed(() =>
  store.startedTutorial ? `/aprende/${store.startedTutorial.id}` : '/aprende'
)
</script>

<template>
  <q-page class="page-shell home-page">
    <section class="welcome-hero" aria-labelledby="welcome-title">
      <div class="hero-copy">
        <span class="eyebrow hero-eyebrow"
          ><span class="tiny-dot" /> Un mundo de posibilidades, a tu ritmo</span
        >
        <h1 id="welcome-title">¡Hola!<br />Qué bueno tenerte <span>aquí.</span></h1>
        <p>Aprende a usar la tecnología, cuida tu seguridad y conecta con lo que más quieres.</p>
      </div>
      <div class="hero-image">
        <img
          src="images/aprender-juntos.png"
          alt="Una pareja mayor disfruta aprendiendo a usar una tableta"
          width="1536"
          height="1024"
          fetchpriority="high"
        /><span class="image-caption"
          ><q-icon name="favorite" aria-hidden="true" /> Nunca es tarde para aprender algo
          nuevo</span
        >
      </div>
      <div class="hero-action">
        <q-btn
          unelevated
          no-caps
          color="primary"
          :label="store.startedTutorial ? 'Continuar aprendiendo' : 'Comenzar a aprender'"
          icon-right="arrow_forward"
          :to="continueTo"
          class="primary-action"
        />
        <p class="small-copy">
          <q-icon name="check_circle_outline" aria-hidden="true" /> Sin prisas. Paso a paso. Tú
          puedes.
        </p>
      </div>
    </section>

    <section aria-labelledby="explore-title" class="explore-section">
      <div class="section-title">
        <div>
          <p class="eyebrow">TU PRÓXIMO PEQUEÑO GRAN PASO</p>
          <h2 id="explore-title">¿Qué te gustaría hacer hoy?</h2>
        </div>
        <span class="small-copy desktop-only">Elige una opción para comenzar</span>
      </div>
      <div class="module-grid">
        <router-link
          v-for="section in sections"
          :key="section.to"
          :to="section.to"
          class="module-card"
          :class="`module-${section.tone}`"
          ><span class="icon-tile" :class="`tone-${section.tone}`"
            ><q-icon :name="section.icon" size="34px" aria-hidden="true"
          /></span>
          <h3>{{ section.title }}</h3>
          <p>{{ section.description }}</p>
          <span class="module-link"
            >{{
              section.to === '/aprende'
                ? 'Quiero aprender'
                : section.to === '/enganos'
                  ? 'Quiero protegerme'
                  : section.to === '/practica'
                    ? 'Quiero practicar'
                    : 'Ponerme a prueba'
            }}
            <q-icon name="arrow_forward" aria-hidden="true" /></span
        ></router-link>
      </div>
    </section>

    <section class="home-bottom-grid">
      <div class="gentle-card">
        <span class="icon-tile tone-teal"
          ><q-icon name="volunteer_activism" size="30px" aria-hidden="true"
        /></span>
        <div>
          <h2>Aprender también es cuidarte</h2>
          <p>
            No tienes que saberlo todo. Cada pequeño paso cuenta y puedes repetirlo cuantas veces
            quieras.
          </p>
          <router-link to="/ayuda"
            >Conoce cómo usar ConectaMayor <q-icon name="arrow_forward" aria-hidden="true"
          /></router-link>
        </div>
      </div>
      <router-link to="/progreso" class="progress-teaser"
        ><q-icon name="auto_awesome" size="30px" aria-hidden="true" />
        <div>
          <h2>Tu camino, tus logros</h2>
          <p>
            {{
              store.completedTutorials.length
                ? `${store.completedTutorials.length} de 4 tutoriales completados. ¡Sigue así!`
                : 'Tu primer logro empieza con un pequeño paso.'
            }}
          </p>
          <span>Ver mi progreso <q-icon name="arrow_forward" aria-hidden="true" /></span></div
      ></router-link>
    </section>
  </q-page>
</template>
