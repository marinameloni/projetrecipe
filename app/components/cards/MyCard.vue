<template>
  <div class="m-card">
    <div class="m-card__contentLeft">
      <slot name="content">
        <h1>{{ title }}</h1>
      </slot>
    </div>

    <div class="m-card__mediaWrapper">
      <img :src="imageSrc" :alt="imageAlt">
    </div>

    <button class="a-button -primary" @click="onButtonClick">
      {{ buttonLabel }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'MyCard',
  props: {
    title: {
      type: String,
      default: '',
    },
    imageSrc: {
      type: String,
      required: true,
    },
    imageAlt: {
      type: String,
      default: 'Card image',
    },
    buttonLabel: {
      type: String,
      default: 'View recipes',
    },
  },
  emits: ['buttonClick'],
  methods: {
    onButtonClick(event) {
      this.$emit('buttonClick', event);
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/styles/elements/card';
</style>
