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

const { data: cuisines } = await useAsyncData<Cuisine[]>(
  'cuisines-list',
  async () => {
    
    const { data } = await $fetch<ApiResponse<Cuisine[]>>(
      `${apiBase}/api/cuisines`
    )
    return data
  },
  { server: false, default: () => [] }
)

const filters = ref<string[]>([]);

function onCheckboxInput($event: Event) {
  const target = $event.target;
  if (!(target instanceof HTMLInputElement)) return;

  const value = target.value
  if (!filters.value.includes(value)){
    filters.value.push(value)
  } else {
    const index = filters.value.findIndex(v => v == value)
    filters.value.splice(index, 1)
  }
}

const filteredRecipes = computed(() => {
  if (!recipes.value || filters.value.length === 0) {
    return recipes.value || []
  }
  
  return recipes.value.filter(recipe => 
    filters.value.includes(recipe.cuisine_name || '')
  )
})

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
    
    <ul v-if="filteredRecipes && filteredRecipes.length">
      <li v-for="(recipe, index) in filteredRecipes" :key="index">
        <NuxtLink :to="`/recipe/${recipe.recipe_id}`">{{ recipe.title }}</NuxtLink>
      </li>
    </ul>
    <p v-else>No recipes found.</p>

    <div class="recipe-filters">
      <h2>Filter by Cuisine</h2>
      <p>Active filters: {{ filters }}</p>
      <ul>
        <li v-for="(cuisine, index) in cuisines" :key="index">
          <input
            :id="cuisine.name"
            type="checkbox"
            :value="cuisine.name"
            @click="onCheckboxInput"
          >
          <label :for="cuisine.name">{{ cuisine.name }}</label>
        </li>
      </ul>
    </div>
  </div>
</template>

