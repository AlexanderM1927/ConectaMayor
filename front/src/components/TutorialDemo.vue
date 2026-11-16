<script setup>
defineProps({
  tutorial: { type: Object, required: true },
  stepIndex: { type: Number, required: true },
  completed: Boolean
})
</script>

<template>
  <div
    class="tutorial-demo"
    :class="`demo-${tutorial.visual}`"
    aria-label="Vista de ejemplo de la actividad"
  >
    <div class="demo-top">
      <q-icon :name="tutorial.icon" size="25px" aria-hidden="true" /><strong>{{
        tutorial.title
      }}</strong
      ><span>Ejemplo</span>
    </div>
    <div v-if="tutorial.visual === 'chat'" class="demo-body">
      <div class="contact-line">
        <q-avatar color="teal-1" text-color="teal-10" size="48px">A</q-avatar>
        <div><strong>Ana</strong><span class="small-copy">Contacto de ejemplo</span></div>
      </div>
      <p class="demo-bubble">Hola, me alegra que estemos en contacto.</p>
      <p v-if="stepIndex > 0" class="demo-bubble outgoing">
        Hola, Ana. ¿Cómo estás?
        <q-icon
          v-if="completed || stepIndex > 1"
          name="done_all"
          aria-label="Enviado en la práctica"
        />
      </p>
      <div v-if="stepIndex === 3" class="demo-photo">
        <q-icon name="local_florist" size="52px" aria-hidden="true" /><span
          >Foto de unas flores</span
        >
      </div>
      <div class="demo-compose">
        <span>Mensaje de ejemplo</span><q-icon name="send" aria-hidden="true" />
      </div>
    </div>
    <div v-else-if="tutorial.visual === 'email'" class="demo-body email-demo">
      <p><span>Para</span> ana@example.com</p>
      <p>
        <span>Asunto</span> {{ stepIndex > 1 ? 'Nos vemos para tomar café' : 'Un título breve' }}
      </p>
      <p>Hola, Ana:<br />¿Tomamos un café esta semana?</p>
      <span class="demo-label"><q-icon name="send" aria-hidden="true" /> Enviar</span>
    </div>
    <div v-else-if="tutorial.visual === 'call'" class="demo-body call-demo">
      <q-avatar size="92px" color="purple-1" text-color="purple-9"
        ><q-icon name="person" size="60px" aria-hidden="true" /></q-avatar
      ><strong>Ana</strong><span class="small-copy">Videollamada de ejemplo</span>
      <div class="call-controls" aria-hidden="true">
        <q-icon name="mic_off" /><q-icon name="videocam" /><q-icon
          name="call_end"
          class="hang-up"
        />
      </div>
    </div>
    <div v-else class="demo-body">
      <div class="contact-line">
        <q-avatar size="44px" color="pink-1" text-color="pink-9">A</q-avatar>
        <div>
          <strong>Ana</strong
          ><span class="small-copy"
            ><q-icon name="people" aria-hidden="true" /> Contactos de confianza</span
          >
        </div>
      </div>
      <div class="demo-photo"><q-icon name="local_florist" size="54px" aria-hidden="true" /></div>
      <p>Hoy comparto una receta que me encanta.</p>
      <div class="small-copy">
        <q-icon name="favorite_border" aria-hidden="true" /> Una publicación de ejemplo
      </div>
    </div>
  </div>
</template>
