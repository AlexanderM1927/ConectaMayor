<script setup>
defineProps({ correct: Boolean, explanation: { type: String, required: true } })
</script>

<template>
  <div
    class="feedback-panel"
    :class="correct ? 'feedback-success' : 'feedback-review'"
    role="status"
    aria-live="polite"
    aria-atomic="true"
    tabindex="-1"
  >
    <q-icon
      :name="correct ? 'check_circle_outline' : 'lightbulb_outline'"
      size="30px"
      aria-hidden="true"
    />
    <div>
      <strong>{{ correct ? '¡Muy bien!' : 'Vamos a revisarlo con calma' }}</strong>
      <p>{{ explanation }}</p>
    </div>
  </div>
</template>
