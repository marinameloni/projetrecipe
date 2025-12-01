<template>
  <button
    type="button"
    :class="classes"
    @click="onClick"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'MyButton',
  props: {
    label: {
      type: String,
      required: true,
    },
    primary: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['click'],
  computed: {
    classes() {
      return [
        'a-button',
        this.primary ? '-primary' : '',
      ];
    },
  },
  methods: {
    onClick(event) {
      this.$emit('click', event);
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/styles/elements/button';
</style>
