<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
  imageUrl?: string
  firstRecipeId?: number | null
}>()
</script>

<template>
  <article class="m-hero m-hero--card">
    <div class="m-hero__content">
      <div class="m-hero__badgeWrapper">
        <span class="m-hero__badge">🔥 Hot Recipes</span>
      </div>
      <h1 class="m-hero__title">{{ title || 'Spicy delicious chicken wings' }}</h1>
      <p class="m-hero__description">
        {{ description || 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.' }}
      </p>

      <div class="m-hero__metaList">
        <span class="m-hero__meta">⏱ 30 Minutes</span>
        <span class="m-hero__meta">🍗 Chicken</span>
      </div>

      <div class="m-hero__actions">
        <div class="m-hero__user">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="User avatar" class="m-hero__avatar">
          <div class="m-hero__userInfo">
            <span>John Smith </span>
            <small>15 March 2024</small>
          </div>
        </div>
        <NuxtLink v-if="firstRecipeId" :to="`/recipe/${firstRecipeId}`" class="c-button c-button--black">
          View Recipes <span class="c-button__icon">▶</span>
        </NuxtLink>
      </div>
    </div>

    <div class="m-hero__media">
      <img :src="imageUrl || 'https://placeholder.pics/svg/600x600'" alt="Hero Image" class="m-hero__image">
      <div class="m-hero__floatingBadge">
        <span>Handpicked</span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.m-hero { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; background: var(--blue-1); border-radius: 24px; padding: 40px; }
.m-hero__badgeWrapper { margin-bottom: 8px }
.m-hero__badge { display: inline-block; background: #fff; border-radius: 999px; padding: 6px 10px }
.m-hero__title { margin: 0 0 12px }
.m-hero__description { margin: 0 0 16px }
.m-hero__metaList { display: flex; gap: 12px; margin-bottom: 16px }
.m-hero__actions { display: flex; align-items: center; justify-content: space-between }
.m-hero__user { display: flex; gap: 12px; align-items: center }
.m-hero__avatar { width: 36px; height: 36px; background: #ddd; border-radius: 50% }
.m-hero__media { position: relative }
.m-hero__image { width: 100%; height: auto; border-radius: 16px }
.m-hero__floatingBadge { position: absolute; bottom: 12px; right: 12px; background: #f0f1f3; border-radius: 12px; padding: 6px 10px }

</style>
