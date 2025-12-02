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
  <div class="o-container">
    
    <div class="o-recipeBlock">
      <article class="m-card m-card--hero">
        <div class="m-card__contentLeft">
          <div class="a-badgeWrapper">
            <span class="a-badge">🔥 Hot Recipes</span>
          </div>
          <h1 class="m-card__title">Spicy delicious chicken wings</h1>
          <p class="m-card__description">
            Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqut enim ad minim.
          </p>
          
          <div class="m-metaList">
            <span class="a-metaTag">⏱ 30 Minutes</span>
            <span class="a-metaTag">🍗 Chicken</span>
          </div>

          <div class="m-card__actions">
            <div class="a-userProfile">
                <div class="a-avatar"></div>
                <div class="a-userInfo">
                    <span>John Smith</span>
                    <small>15 March 2022</small>
                </div>
            </div>
            <NuxtLink v-if="firstRecipeId" :to="`/recipe/${firstRecipeId}`" class="a-button a-button--black">
              View Recipes <span class="a-icon">▶</span>
            </NuxtLink>
          </div>
        </div>

        <div class="m-card__mediaWrapper">
          <img :src="recipes?.[0]?.image_url || 'https://placeholder.pics/svg/600x600'" alt="Delicious Chicken Wings" class="m-card__image">
          <div class="a-floatingBadge">
             <span>Handpicked</span>
          </div>
        </div>
      </article>
    </div>
    
    <section class="o-section">
        <header class="o-section__header">
            <h2>Categories</h2>
            <NuxtLink to="/categories" class="a-linkButton">View All Categories</NuxtLink>
        </header>
        
        <div class="m-categoryFilters">
            <div v-for="(cuisine, index) in cuisines" :key="index" class="m-categoryFilters__item">
                <input
                    :id="cuisine.name"
                    type="checkbox"
                    class="a-checkbox"
                    :value="cuisine.name"
                    @click="onCheckboxInput"
                >
                <label :for="cuisine.name" class="a-categoryChip">
                    {{ cuisine.name }}
                </label>
            </div>
        </div>
    </section>

    <section class="o-section o-section--center">
      <div class="o-section__content">
        <h3>Simple and tasty recipes</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
      
      <ul v-if="filteredRecipes && filteredRecipes.length" class="o-gridList">
        <li v-for="(recipe, index) in filteredRecipes" :key="index" class="m-recipeCard">
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
      <p v-else>No recipes found.</p>
    </section>

  </div>
</template>
