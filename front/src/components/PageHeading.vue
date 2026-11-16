<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  eyebrow: { type: String, default: '' },
  backTo: { type: String, default: '/' },
  backLabel: { type: String, default: 'Volver al inicio' }
})
</script>

<template>
  <header class="page-heading">
    <q-btn flat no-caps icon="arrow_back" :to="backTo" :label="backLabel" class="back-button" />
    <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
    <h1>{{ title }}</h1>
    <p v-if="description" class="page-description">{{ description }}</p>
  </header>
</template>
