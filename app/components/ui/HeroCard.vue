<template>
  <div :class="cardClasses">
    <div class="c-card-hero__content">
      <slot name="content">
        <h1 v-if="title">{{ title }}</h1>
      </slot>
      <slot name="button">
        <button v-if="buttonLabel" class="a-button -primary" @click="onButtonClick">
          {{ buttonLabel }}
        </button>
      </slot>
    </div>

    <div class="c-card-hero__media">
      <img :src="imageSrc" :alt="imageAlt">
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title?: string
  imageSrc: string
  imageAlt?: string
  buttonLabel?: string
  variant?: 'hero'
}

withDefaults(defineProps<Props>(), {
  title: '',
  imageAlt: 'Card image',
  buttonLabel: '',
  variant: 'hero'
})

const emit = defineEmits<{
  buttonClick: [event: MouseEvent]
}>()

const cardClasses = computed(() => ['c-card-hero'])

const onButtonClick = (event: MouseEvent) => {
  emit('buttonClick', event)
}
</script>

<style scoped lang="scss">
.c-card-hero {
  background-color: var(--blue-1);
  border-radius: 30px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  margin-bottom: 60px;
  padding: 0;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    text-align: center;

    .c-card-hero__content {
      padding: 40px 20px;
      align-items: center;
    }
  }

  &__content {
    padding: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 24px;
  }

  &__media {
    width: 100%;
    height: 100%;
    min-height: 400px;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  .c-button {
    margin-top: 10px;
    display: inline-block;
    padding: 25px 60px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
    background-color: black;
    color: white;
    border-radius: 16px;

    &:hover {
      background-color: #333;
    }

    @media (max-width: 960px) {
      align-self: center;
    }
  }
}
</style>
