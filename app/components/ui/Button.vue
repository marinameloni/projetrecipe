<template>
  <button
    type="button"
    :class="buttonClasses"
    @click="onClick"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  label?: string
  variant?: 'primary' | 'secondary' | 'default'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  variant: 'default',
  disabled: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClasses = computed(() => {
  return [
    'a-button',
    props.variant !== 'default' ? `-${props.variant}` : ''
  ]
})

const onClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<style scoped lang="scss">
.a-button {
  display: inline-block;
  padding: 20px 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &.-primary {
    padding: 25px 60px;
    background-color: black;
    color: white;
    border-radius: 16px;

    &:hover {
      background-color: #333;
    }
  }

  &.-secondary {
    padding: 20px 40px;
    background-color: transparent;
    color: black;
    border: 2px solid black;
    border-radius: 16px;

    &:hover {
      background-color: black;
      color: white;
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
