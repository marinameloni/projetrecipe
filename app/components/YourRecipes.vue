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

// Pagination
const page = ref(1)
const RECIPES_PER_PAGE = 6

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

// Reset to page 1 when filters change
watch(() => [selectedCategories.value, searchInput.value], () => {
  page.value = 1
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

const firstRecipeId = computed<number | null>(() => recipes?.value?.[0]?.recipe_id ?? null)

useHead({
  title: 'Simple and Tasty Recipes | Home',
  meta: [
    {
      name: 'description',
      content: 'Discover simple and tasty recipes from various cuisines. Browse our collection of delicious recipes with detailed instructions and ingredients.'
    }
  ]
})

definePageMeta({
  layout: 'aside'
})
</script>


<template>

    <div class="m-yourRecipes">
        <h2>Your Recipes</h2>
        <ul>
        <li v-for="recipe in recipes" :key="recipe.recipe_id" class="m-yourRecipes__item">
            <h3>{{ recipe.title }}</h3>
            <p>{{ recipe.description }}</p>
            <img :src="recipe.image_url" alt="Recipe Image">
            <p>Cuisine: {{ recipe.cuisine_name }}</p>
            <p>Category: {{ recipe.category_name }}</p>
            <p>Goal: {{ recipe.goal_name }}</p>
            <p>Dietary Information: {{ recipe.dietary_information_name }}</p>
            <p>Allergies Information: {{ recipe.allergies_information_name }}</p>
            <button @click="editRecipe(recipe.recipe_id)">Edit</button>
            <button @click="deleteRecipe(recipe.recipe_id)">Delete</button>
        </li>
        </ul>
    </div>
</template>