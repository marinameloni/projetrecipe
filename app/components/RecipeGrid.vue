<script setup lang="ts">
defineProps<{ recipes: Recipe[] }>()
</script>

<template>
  <ul class="o-gridList">
    <li v-for="(recipe, index) in recipes" :key="index" class="m-recipeCard">
      <div class="m-recipeCard__media">
        <img :src="recipe.image_url || 'https://placeholder.pics/svg/400x300'" :alt="recipe.title">
      </div>
      <div class="m-recipeCard__content">
        <h4 class="m-recipeCard__title">
          <NuxtLink :to="`/recipe/${recipe.recipe_id}`">{{ recipe.title }}</NuxtLink>
        </h4>
        <div class="m-metaList">
          <span class="a-metaTag">⏱ 30 Minutes</span>
          <span class="a-metaTag">🍽 {{ recipe.cuisine_name || 'Snack' }}</span>
        </div>
      </div>
    </li>
  </ul>
</template>