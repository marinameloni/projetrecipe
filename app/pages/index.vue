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

const selectedCategories = ref<string[]>([]);
const searchInput = ref<string>('');

// Category selection handled by CategoryFilterSidebar via update:selected

const filteredRecipes = computed(() => {
  let results = recipes.value || []
  
  // Filter by search input
  if (searchInput.value.trim()) {
    const query = searchInput.value.toLowerCase().trim()
    results = results.filter(recipe => 
      recipe.title?.toLowerCase().includes(query) ||
      recipe.description?.toLowerCase().includes(query) ||
      recipe.cuisine_name?.toLowerCase().includes(query)
    )
  }
  
  // Filter by selected categories
  if (selectedCategories.value.length > 0) {
    results = results.filter(recipe => 
      selectedCategories.value.includes(recipe.cuisine_name || '')
    )
  }
  
  return results
})

const firstRecipeId = computed<number | null>(() => recipes?.value?.[0]?.recipe_id ?? null)

definePageMeta({
  layout: 'aside'
})
</script>

<template>
  <div class="o-container">
    
    <div class="o-recipeBlock">
      <AppHero
        :title="recipes?.[0]?.title"
        :description="recipes?.[0]?.description"
        :image-url="recipes?.[0]?.image_url"
        :first-recipe-id="firstRecipeId"
      />
    </div>

    <SearchBar v-model="searchInput" />
    
      <section class="o-section o-section--withSidebar">
        <CategoryFilterSidebar :cuisines="cuisines || []" :selected="selectedCategories" @update:selected="(v) => selectedCategories = v" />
        <div class="o-section__main">
        <div class="o-section__content">
          <h3>Simple and tasty recipes</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <RecipeGrid v-if="filteredRecipes && filteredRecipes.length" :recipes="filteredRecipes" />
        <p v-else>No recipes found.</p>
        </div>
      </section>

  </div>
</template>
