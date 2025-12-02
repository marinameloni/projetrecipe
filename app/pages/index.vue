<script setup lang="ts">
const config = useRuntimeConfig()

// Normalize base URL to avoid double slashes
const apiBase = (config.public.apiUrl || '').replace(/\/+$/, '')

const { data: recipes } = await useAsyncData<Recipe[]>(
  'recipes-list',
  async () => {
    try {
      const res = await $fetch<ApiResponse<Recipe[]>>(`${apiBase}/api/recipes`)
      return res.data
    } catch (err) {
      console.error('Failed to fetch recipes:', err)
      return []
    }
  },
  { server: false, default: () => [] }
)

const firstRecipeId = computed<number | null>(() => recipes?.value?.[0]?.recipe_id ?? null)

definePageMeta({
  layout: 'aside'
})
</script>

<template>
  <div>
    <div class="o-recipeBlock">
      <div class="m-card">
        <div class="m-card__contentLeft">
          <h1>Spicy delicious chicken wings</h1>
        </div>

        <div class="m-card__mediaWrapper">
          <img src="https://placeholder.pics/svg/600x400" alt="Delicious Chicken Wings">
        </div>
        <NuxtLink v-if="firstRecipeId" :to="`/recipe/${firstRecipeId}`" class="a-button -primary">
          View Recipe
        </NuxtLink>
      </div>
    </div>
    
    <h2>Categories</h2>
    <h3>Simple and fun recipes</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    
    <ul v-if="recipes && recipes.length">
      <li v-for="(recipe, index) in recipes" :key="index">
        <NuxtLink :to="`/recipe/${recipe.recipe_id}`">{{ recipe.title }}</NuxtLink>
      </li>
    </ul>
    <p v-else>No recipes found.</p>
  </div>
</template>

