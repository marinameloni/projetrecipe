<script setup lang="ts">
const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ (e: 'update:modelValue', v: string): void }>()

function onInput(e: Event) {
  const t = e.target as HTMLInputElement
  emit('update:modelValue', t.value)
}
</script>

<template>
  <div class="m-searchBar">
    <svg class="m-searchBar__icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
    <input
      :value="props.modelValue"
      type="text"
      placeholder="Search recipes by name, cuisine, or description..."
      class="m-searchBar__input"
      @input="onInput"
    >
    <button
      v-if="props.modelValue"
      class="m-searchBar__clear"
      aria-label="Clear search"
      @click="$emit('update:modelValue', '')"
    >
      ✕
    </button>
  </div>
</template>