<script setup>
import { useId } from 'vue'
const groupId = useId()
defineProps({
  modelValue: { type: Number, default: null },
  question: { type: String, required: true },
  options: { type: Array, required: true },
  disabled: Boolean
})
defineEmits(['update:modelValue'])
</script>

<template>
  <fieldset class="choice-exercise" :disabled="disabled">
    <legend>{{ question }}</legend>
    <label
      v-for="(option, index) in options"
      :key="index"
      class="choice-option"
      :class="{ selected: modelValue === index }"
    >
      <input
        type="radio"
        :name="groupId"
        :checked="modelValue === index"
        :value="index"
        @change="$emit('update:modelValue', index)"
      />
      <span>{{ option }}</span>
    </label>
  </fieldset>
</template>
