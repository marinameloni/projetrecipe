<script setup lang="ts">
import RecipeCard from '~/components/ui/RecipeCard.vue'

const config = useRuntimeConfig()

// Normalize base URL
const apiBase = (config.public.apiUrl || '').replace(/\/+$/, '')

const { data: recipes } = await useAsyncData<Recipe[]>(
  'recipes-list-page',
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
  'cuisines-list-page',
  async () => {
    const { data } = await $fetch<ApiResponse<Cuisine[]>>(
      `${apiBase}/api/cuisines`
    )
    return data
  },
  { server: false, default: () => [] }
)

const selectedCategories = ref<string[]>([])
const searchInput = ref<string>('')

// Pagination
const page = ref(1)
const RECIPES_PER_PAGE = 6

// Watch for filter changes
watch(() => [selectedCategories.value, searchInput.value], () => {
  page.value = 1
})

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

const displayedRecipes = computed<Recipe[]>(() => {
  if (!filteredRecipes.value) return []
  return filteredRecipes.value.slice((page.value - 1) * RECIPES_PER_PAGE, page.value * RECIPES_PER_PAGE)
})

const totalPages = computed(() => {
  return Math.ceil(filteredRecipes.value.length / RECIPES_PER_PAGE)
})

function onPageClick(pageNumber: number) {
  page.value = pageNumber
}

function toggleFavorite(recipeId: number) {
  // Handle favorite toggle
  console.log('Toggle favorite:', recipeId)
}

useHead({
  title: 'All Recipes | Foodieland',
  meta: [
    {
      name: 'description',
      content: 'Browse all recipes from Foodieland. Find the perfect recipe by cuisine and difficulty level.'
    }
  ]
})

definePageMeta({
  layout: 'aside'
})
</script>

<template>
  <div class="o-container">
    <div class="o-section o-section--withSidebar">
      <CategoryFilterSidebar 
        :cuisines="cuisines || []" 
        :selected="selectedCategories" 
        @update:selected="(v) => selectedCategories = v" 
      />
      
      <div class="o-section__main">
        <SearchBar v-model="searchInput" />
        
        <div class="o-section__content">
          <h3>All Recipes</h3>
          <p>Explore our collection of delicious recipes. Browse by cuisine, difficulty level, or search for your favorite dish.</p>
        </div>
        
        <!-- Pagination Controls -->
        <div v-if="totalPages > 1" class="o-pagination">
          <button 
            v-for="n in totalPages" 
            :key="`page-${n}`"
            class="o-pagination__button"
            :class="{ 'o-pagination__button--active': page === n }"
            @click="onPageClick(n)"
          >
            {{ n }}
          </button>
        </div>

        <!-- Recipes Grid using new UI component -->
        <div v-if="displayedRecipes && displayedRecipes.length" class="o-gridList">
          <RecipeCard
            v-for="recipe in displayedRecipes"
            :key="recipe.recipe_id"
            :title="recipe.title"
            :image-src="recipe.image_url"
            :image-alt="recipe.title"
            :is-favorite="false"
            :link-to="`/recipe/${recipe.recipe_id}`"
            @favorite-click="toggleFavorite(recipe.recipe_id)"
          />
        </div>
        <p v-else>No recipes found.</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
// Reuse existing styles from index page
.o-gridList {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  list-style: none;
  padding: 0;
  margin: 40px 0;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
</style>
