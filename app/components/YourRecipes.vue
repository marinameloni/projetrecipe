<script setup lang="ts">
const config = useRuntimeConfig()
const apiBase = (config.public.apiUrl || '').replace(/\/+$/, '')
const token = useCookie('recipe_token')

const { data: recipes } = await useAsyncData<Recipe[]>('recipes-list', async () => {
  try {
    const res = await $fetch<ApiResponse<Recipe[]>>(`${apiBase}/api/recipes`)
    return res.data
  } catch (err) {
    console.error(err)
    return []
  }
}, { server: false, default: () => [] })

const isEditModalOpen = ref(false)
const selectedRecipe = ref<FullRecipe | null>(null)
const currentPage = ref(1)
const perPage = 6

const totalPages = computed(() => Math.ceil((recipes.value?.length || 0) / perPage))
const displayedRecipes = computed(() => {
  if (!recipes.value) return []
  const start = (currentPage.value - 1) * perPage
  return recipes.value.slice(start, start + perPage)
})
const pageNumbers = computed(() => Array.from({ length: totalPages.value }, (_, i) => i + 1))

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

async function editRecipe(recipeId: number) {
  try {
    const fullRecipe = await $fetch<FullRecipe>(`${apiBase}/api/recipes/${recipeId}`, {
      headers: token.value ? { Authorization: `Bearer ${token.value}` } : {}
    })
    selectedRecipe.value = fullRecipe
    isEditModalOpen.value = true
  } catch {
    alert('Failed to load recipe')
  }
}

async function deleteRecipe(recipeId: number) {
  if (!confirm('Delete this recipe?')) return
  
  try {
    await $fetch(`${apiBase}/api/recipes/${recipeId}`, {
      method: 'DELETE',
      headers: token.value ? { Authorization: `Bearer ${token.value}` } : {}
    })
    
    if (recipes.value) {
      recipes.value = recipes.value.filter(r => r.recipe_id !== recipeId)
      if (currentPage.value > totalPages.value) {
        currentPage.value = Math.max(1, totalPages.value)
      }
    }
  } catch {
    alert('Failed to delete recipe')
  }
}

function onRecipeUpdated(updatedRecipe: FullRecipe) {
  if (!recipes.value) return
  
  const index = recipes.value.findIndex(r => r.recipe_id === updatedRecipe.recipe_id)
  if (index !== -1) {
    recipes.value[index] = { ...recipes.value[index], ...updatedRecipe }
  }
  isEditModalOpen.value = false
  selectedRecipe.value = null
}

useHead({
  title: 'Simple and Tasty Recipes | Home',
  meta: [{ name: 'description', content: 'Discover simple and tasty recipes from various cuisines.' }]
})

definePageMeta({ layout: 'aside' })
</script>


<template>
  <div>
    <div v-if="recipes && recipes.length > 0" class="m-yourRecipes">
      <h2>Your Recipes</h2>
      <ul class="m-yourRecipes__list">
        <li v-for="recipe in displayedRecipes" :key="recipe.recipe_id" class="m-yourRecipes__item">
          <img 
            v-if="recipe.image_url" 
            :src="recipe.image_url" 
            :alt="recipe.title"
            class="m-yourRecipes__image">
          <div class="m-yourRecipes__content">
            <h3 class="m-yourRecipes__title">{{ recipe.title }}</h3>
            <p class="m-yourRecipes__description">{{ recipe.description }}</p>
            
            <div class="m-yourRecipes__meta">
              <div v-if="recipe.cuisine_name" class="m-yourRecipes__metaItem">
                <strong>Cuisine:</strong> {{ recipe.cuisine_name }}
              </div>
              <div v-if="recipe.goal_name" class="m-yourRecipes__metaItem">
                <strong>Goal:</strong> {{ recipe.goal_name }}
              </div>
            </div>

            <div class="m-yourRecipes__actions">
              <button class="m-yourRecipes__actionBtn m-yourRecipes__actionBtn--edit" @click="editRecipe(recipe.recipe_id)">Edit</button>
              <button class="m-yourRecipes__actionBtn m-yourRecipes__actionBtn--delete" @click="deleteRecipe(recipe.recipe_id)">Delete</button>
            </div>
          </div>
        </li>
      </ul>

      <ul v-if="totalPages > 1" class="m-pagination">
        <li class="m-pagination__item">
          <button 
            class="m-pagination__btn" 
            :class="{ 'm-pagination__btn--disabled': currentPage === 1 }"
            :disabled="currentPage === 1"
            @click="goToPage(currentPage - 1)">
            ← Previous
          </button>
        </li>

        <li class="m-pagination__info m-pagination__item">
          Page {{ currentPage }} of {{ totalPages }}
        </li>

        <li v-for="page in pageNumbers" :key="page" class="m-pagination__item">
          <button 
            class="m-pagination__btn"
            :class="{ 'm-pagination__btn--active': page === currentPage }"
            @click="goToPage(page)">
            {{ page }}
          </button>
        </li>

        <li class="m-pagination__item">
          <button 
            class="m-pagination__btn"
            :class="{ 'm-pagination__btn--disabled': currentPage === totalPages }"
            :disabled="currentPage === totalPages"
            @click="goToPage(currentPage + 1)">
            Next →
          </button>
        </li>
      </ul>
    </div>
    <div v-else class="m-emptyState">
      <div class="m-emptyState__icon">📝</div>
      <h2 class="m-emptyState__title">No Recipes Yet</h2>
      <p class="m-emptyState__message">You haven't created any recipes yet. Start by adding your first recipe!</p>
      <NuxtLink to="/recipe" class="m-emptyState__cta">Create Recipe</NuxtLink>
    </div>

    <EditRecipeModal 
      :recipe="selectedRecipe" 
      :is-open="isEditModalOpen"
      @close="isEditModalOpen = false"
      @update="onRecipeUpdated" />
  </div>
</template>