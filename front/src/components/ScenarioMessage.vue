<script setup>
defineProps({ scenario: { type: Object, required: true } })
</script>

<template>
  <article class="message-preview" aria-label="Mensaje ficticio para practicar">
    <div class="message-top">
      <span class="icon-tile" :class="`tone-${scenario.tone}`"
        ><q-icon :name="scenario.icon" size="28px" aria-hidden="true"
      /></span>
      <div>
        <strong>{{ scenario.channel }}</strong
        ><span class="small-copy">{{ scenario.sender }}</span>
      </div>
    </div>
    <div class="message-bubble">
      <p>{{ scenario.message }}</p>
      <span v-if="scenario.link" class="simulated-link">{{ scenario.link }}</span>
    </div>
    <p class="small-copy message-caption">
      <q-icon name="lock_outline" aria-hidden="true" /> Ejemplo ficticio. Los enlaces no se abren.
    </p>
  </article>
</template>
