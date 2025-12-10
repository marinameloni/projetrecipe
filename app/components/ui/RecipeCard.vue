<template>
  <div :class="recipeCardClasses">
    <div class="c-card-recipe__media">
      <img :src="imageSrc" :alt="imageAlt">
      <button 
        v-if="showFavorite"
        type="button"
        :class="favoriteClasses"
        @click="onFavoriteClick"
      >
        {{ isFavorite ? '❤️' : '🤍' }}
      </button>
    </div>

    <div class="c-card-recipe__content">
      <div class="c-card-recipe__title">
        <slot name="title">
          <NuxtLink v-if="linkTo" :to="linkTo">
            {{ title }}
          </NuxtLink>
          <span v-else>{{ title }}</span>
        </slot>
      </div>
      <slot name="metadata" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title: string
  imageSrc: string
  imageAlt?: string
  linkTo?: string
  showFavorite?: boolean
  isFavorite?: boolean
  variant?: 'recipe'
}

const props = withDefaults(defineProps<Props>(), {
  imageAlt: 'Recipe image',
  linkTo: '',
  showFavorite: true,
  isFavorite: false,
  variant: 'recipe'
})

const emit = defineEmits<{
  favoriteClick: [event: MouseEvent]
}>()

const recipeCardClasses = computed(() => ['c-card-recipe'])

const favoriteClasses = computed(() => [
  'c-button-fav',
  props.isFavorite ? 'c-button-fav--is-active' : ''
])

const onFavoriteClick = (event: MouseEvent) => {
  emit('favoriteClick', event)
}
</script>

<style scoped lang="scss">
.c-card-recipe {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, var(--blue-1) 100%);
  border-radius: 30px;
  padding: 16px;
  padding-bottom: 24px;
  transition: transform 0.3s ease;
  box-shadow: none;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.05);
  }

  &__media {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 24px;
    aspect-ratio: 4/3;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.5s ease;
    }

    &:hover img {
      transform: scale(1.05);
    }
  }

  &__content {
    padding: 0 8px;
  }

  &__title {
    font-size: 24px;
    font-weight: 600;
    line-height: 1.4;
    margin-bottom: 16px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;

    a {
      text-decoration: none;
      color: var(--black);
      transition: color 0.2s;

      &:hover {
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }
}

.c-button-fav {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 48px;
  height: 48px;
  background-color: var(--white);
  border-radius: 50%;
  border: none;
  display: grid;
  place-items: center;
  cursor: pointer;
  font-size: 20px;
  color: #DBE2E5;
  transition: all 0.2s ease;
  z-index: 2;

  &:hover,
  &--is-active {
    color: #FF6363;
    transform: scale(1.1);
  }
}
</style>
