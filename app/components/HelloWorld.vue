<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      You've successfully set up a Vue 3 project with Vite!
    </p>
    <button class="btn">Sample Button</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {}
  }
</script>

<style lang="scss" scoped>
.hello {
  h1 {
    font-weight: bold;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1.5rem;
  }
}
</style>
