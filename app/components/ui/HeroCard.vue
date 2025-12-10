<template>
  <div :class="cardClasses">
    <div class="m-card__contentLeft">
      <slot name="content">
        <h1 v-if="title">{{ title }}</h1>
      </slot>
      <slot name="button">
        <button v-if="buttonLabel" class="a-button -primary" @click="onButtonClick">
          {{ buttonLabel }}
        </button>
      </slot>
    </div>

    <div class="m-card__mediaWrapper">
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

const cardClasses = computed(() => ['m-card'])

const onButtonClick = (event: MouseEvent) => {
  emit('buttonClick', event)
}
</script>

<style scoped lang="scss">
.m-card {
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

    .m-card__contentLeft {
      padding: 40px 20px;
      align-items: center;
    }
  }

  &__contentLeft {
    padding: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 24px;
  }

  &__mediaWrapper {
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

  .a-button {
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
