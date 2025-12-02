<script lang="ts" setup>
const route = useRoute()
const config = useRuntimeConfig()
const apiBase = (config.public.apiUrl || '').replace(/\/+$/, '')

const hasData = (res: unknown): res is { data: Recipe } => {
  return !!res && typeof res === 'object' && 'data' in (res as Record<string, unknown>)
}

const { data: recipe } = await useAsyncData<Recipe | null>(
  () => `recipe-${route.params.id}`,
  async () => {
    try {
      const res = await $fetch<Recipe | { data: Recipe }>(`${apiBase}/api/recipes/${route.params.id}`)
      return hasData(res) ? res.data : res
    } catch (err) {
      console.error('Failed to fetch recipe:', err)
      return null
    }
  },
  { server: false, default: () => null }
)

definePageMeta({
  layout: 'aside'
})
</script>

<template>
  <div>
    <div v-if="recipe">
      <h1>{{ recipe.title }}</h1>

      <div v-if="recipe.image_url" class="m-card__mediaWrapper">
        <img :src="recipe.image_url" :alt="recipe.title">
      </div>

      <p>{{ recipe.description }}</p>

      <div class="m-card">
        <ul>
          <li><strong>ID:</strong> {{ recipe.recipe_id }}</li>

          <li v-if="recipe.cuisine_name"><strong>Cuisine:</strong> {{ recipe.cuisine_name }}</li>
          <li v-if="recipe.goal_name"><strong>Goal:</strong> {{ recipe.goal_name }}</li>
          <li v-if="recipe.diet_name"><strong>Diet:</strong> {{ recipe.diet_name }}</li>
          <li v-if="recipe.allergy_name"><strong>Allergy:</strong> {{ recipe.allergy_name }}</li>
        </ul>
      </div>
    </div>
    <div v-else>
      <p>Recipe not found.</p>
    </div>
  </div>
</template>