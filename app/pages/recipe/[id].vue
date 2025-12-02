<script lang="ts" setup>
const route = useRoute()
const config = useRuntimeConfig()
const apiBase = (config.public.apiUrl || '').replace(/\/+$/, '')

const { data: recipe } = await useAsyncData(
  () => `recipe-${route.params.id}`,
  async () => {
    try {
      const res = await $fetch(`${apiBase}/api/recipes/${route.params.id}`)
      return res.data
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
  <div class="recipe-page-wrapper">
    <div v-if="recipe" class="recipe-container">
      
      <header class="recipe-header">
        <h1 class="recipe-title">{{ recipe.title }}</h1>
        
        <div class="recipe-meta-bar">
          
          <div class="meta-group author-group">
            <div class="avatar">
               <img src="https://i.pravatar.cc/150?img=33" alt="Author">
            </div>
            <div class="meta-text">
              <span class="label">John Smith</span>
              <span class="sub-label">15 March 2022</span>
            </div>
          </div>

          <div class="divider" />

          <div class="meta-group">
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div class="meta-text">
              <span class="label">PREP TIME</span>
              <span class="sub-label">15 Minutes</span>
            </div>
          </div>

           <div class="divider" />

          <div class="meta-group">
             <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div class="meta-text">
              <span class="label">COOK TIME</span>
              <span class="sub-label">25 Minutes</span>
            </div>
          </div>

           <div class="divider" />

          <div class="meta-group">
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="currentColor" stroke="none">
              <path d="M61.821 11.045c.703-1.309-.891-.912-.891-.912s-10.627 10.201-12.104 8.951S59.231 8.057 57.825 6.23c-1.301-1.703-11.74 10.455-12.994 8.97c-1.242-1.482 8.939-12.123 8.939-12.123s.387-1.602-.912-.9C36.851 10.785 34.812 18.81 34.812 18.81s-.551 1.563.645 2.771c.117.105-29.204 29.26-33.129 33.196c-1.91 1.908 5.098 8.801 6.996 6.893c3.926-3.936 33.024-33.303 33.129-33.194c1.207 1.205 2.766.652 2.766.652s8.012-2.045 16.602-18.083" />
              <path d="M32.028 40.507c7.803 7.82 20.958 20.999 20.958 20.999s5.742-1.879 6.551-6.729L38.662 33.861a5104.35 5104.35 0 0 0-6.634 6.646" />
              <path d="M21.76 33.729a5059.26 5059.26 0 0 0 8.387-8.4L7.459 2.598s-.41-.43-1.313.477C4.353 4.862.884 16.248 15.591 30.977c2.331 2.336 4.359 2.66 6.169 2.752" />
            </svg>
            <span class="label">Chicken</span>
          </div>

          <div class="action-buttons">
            <button class="action-btn">
              <div class="icon-circle">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
              </div>
              <span>PRINT</span>
            </button>
            <button class="action-btn">
              <div class="icon-circle">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
              </div>
              <span>SHARE</span>
            </button>
          </div>
        </div>
      </header>

      <main class="recipe-grid">
        
        <div class="image-wrapper">
          <img v-if="recipe.image_url" :src="recipe.image_url" :alt="recipe.title" class="main-image">
          <div class="play-button-overlay">
            <div class="play-circle">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
        </div>

        <aside class="info-card">
          <h3>Recipe Information</h3>
          
          <ul class="info-list">
             <li class="info-item">
              <span class="info-label">ID</span>
              <span class="info-value">{{ recipe.recipe_id }}</span>
            </li>
            <li v-if="recipe.cuisine_name" class="info-item">
              <span class="info-label">Cuisine</span>
              <span class="info-value">{{ recipe.cuisine_name }}</span>
            </li>
            <li v-if="recipe.goal_name" class="info-item">
              <span class="info-label">Goal</span>
              <span class="info-value">{{ recipe.goal_name }}</span>
            </li>
            <li v-if="recipe.diet_name" class="info-item">
              <span class="info-label">Diet</span>
              <span class="info-value">{{ recipe.diet_name }}</span>
            </li>
            <li v-if="recipe.allergy_name" class="info-item">
              <span class="info-label">Allergy</span>
              <span class="info-value">{{ recipe.allergy_name }}</span>
            </li>
          </ul>

          <div class="card-footer-text">
            Start cooking this delicious recipe today!
          </div>
        </aside>

      </main>

      <p>{{ recipe.description }}</p>

      <section class="ingredients-section">
        <h3>Ingredients</h3>
        <ul v-if="recipe.ingredients && recipe.ingredients.length" class="ingredients-checklist">
          <li v-for="ingredient in recipe.ingredients" :key="ingredient.ingredient_id" class="ingredient-item">
            <label class="checkbox-label">
              <input type="checkbox" class="ingredient-checkbox">
              <span class="checkbox-custom" />
              <span class="ingredient-text">
                {{ ingredient.quantity }} {{ ingredient.unit }} {{ ingredient.name }}
              </span>
            </label>
          </li>
        </ul>
        <p v-else class="no-ingredients">No ingredients listed.</p>
      </section>

      <section class="instructions-section">
        <h3>Instructions</h3>
        <ol v-if="recipe.instructions && recipe.instructions.length" class="instructions-list">
          <li v-for="(step, index) in recipe.instructions" :key="index" class="instruction-step">
            {{ step }}
          </li>
        </ol>
        <p v-else class="no-instructions">No instructions provided.</p>
        </section>

    </div>
    <div v-else class="loading-state">
      <p>Loading recipe...</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/pages/recipe-detail';
</style>