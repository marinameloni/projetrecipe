<template>
  <div class="ly-aside">
    <AppHeader />
    <main>
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.ly-aside {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.ly-aside main {
  flex-grow: 1;
  padding: 20px;
}
</style>
