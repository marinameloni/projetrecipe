<template>
  <div :class="cardClasses">
    <div class="m-card__contentLeft">
      <slot name="content">
        <h1>{{ title }}</h1>
      </slot>
      <button v-if="buttonLabel" class="a-button -primary" @click="onButtonClick">
        {{ buttonLabel }}
      </button>
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
  variant?: 'hero' | 'recipe' | 'default'
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  imageAlt: 'Card image',
  buttonLabel: '',
  variant: 'hero'
})

const emit = defineEmits<{
  buttonClick: [event: MouseEvent]
}>()

const cardClasses = computed(() => {
  const baseClass = props.variant === 'recipe' ? 'm-recipeCard' : 'm-card'
  return [baseClass]
})

const onButtonClick = (event: MouseEvent) => {
  emit('buttonClick', event)
}
</script>

<style scoped lang="scss">
// --------------------------------------------------------
// 1. The Hero Card (Spicy Chicken Wings)
// --------------------------------------------------------
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

    @media (max-width: 960px) {
      align-self: center;
    }
  }
}

// --------------------------------------------------------
// 2. The Grid Recipe Card
// --------------------------------------------------------
.m-recipeCard {
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

// --------------------------------------------------------
// 3. Helper: The Heart/Favorite Button
// --------------------------------------------------------
.a-favButton {
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
  &--active {
    color: #FF6363;
    transform: scale(1.1);
  }
}

// Button styles for card
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
}
</style>
