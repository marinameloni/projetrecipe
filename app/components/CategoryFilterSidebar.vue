<script setup lang="ts">
defineProps<{
  cuisines: { name: string }[]
  selected: string[]
}>()
const emit = defineEmits<{ (e: 'update:selected', v: string[]): void }>()

function onChange(e: Event) {
  const t = e.target as HTMLSelectElement
  const selected = Array.from(t.selectedOptions).map(o => o.value)
  emit('update:selected', selected)
}
</script>

<template>
  <aside class="m-categorySidebar">
    <h2 class="m-categorySidebar__title">Filter by Category</h2>
    <div class="m-categoryDropdown">
      <select
        :value="selected"
        class="m-categoryDropdown__select"
        multiple
        size="8"
        @change="onChange"
      >
        <option
          v-for="(cuisine, index) in cuisines"
          :key="index"
          :value="cuisine.name"
        >
          {{ cuisine.name }}
        </option>
      </select>
      <p class="m-categoryDropdown__hint">Hold Ctrl/Cmd to select multiple</p>
    </div>
  </aside>
</template>