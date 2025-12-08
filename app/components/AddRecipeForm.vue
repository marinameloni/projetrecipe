<script setup lang="ts">
const payload = ref({
  title: '',
  description: '',
  image_url: '',
  cuisine_id: 0,
  goal_id: 0,
  DietaryInformation_id: 0,
  AllergiesInformation_id: 0
})

const config = useRuntimeConfig()
const isLoading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

async function onSubmit() {
  if (!payload.value.title || !payload.value.description || !payload.value.image_url || payload.value.cuisine_id === 0 || payload.value.goal_id === 0) {
    errorMessage.value = 'Please fill in all required fields.'
    return
  }

  const cookie = useCookie('recipe_token')
  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const res = await fetch(`${config.public.apiUrl}/api/recipes`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookie.value}`
      },
      body: JSON.stringify(payload.value)
    })

    if (res.ok) {
      successMessage.value = 'Recipe created successfully!'
      payload.value = {
        title: '',
        description: '',
        image_url: '',
        cuisine_id: 0,
        goal_id: 0,
        DietaryInformation_id: 0,
        AllergiesInformation_id: 0
      }
    } else {
      errorMessage.value = 'Failed to create recipe'
    }
  } catch {
    errorMessage.value = 'An error occurred while creating the recipe'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="m-addRecipeForm">
    <form class="m-addRecipeForm__form" @submit.prevent="onSubmit">
      <div v-if="successMessage" class="m-addRecipeForm__messageContainer m-addRecipeForm__messageContainer--success">{{ successMessage }}</div>
      <div v-if="errorMessage" class="m-addRecipeForm__messageContainer m-addRecipeForm__messageContainer--error">{{ errorMessage }}</div>

      <div class="m-addRecipeForm__section">
        <h2 class="m-addRecipeForm__sectionTitle">Add a recipe 🧑‍🍳</h2>
        
        <div class="m-addRecipeForm__formGroup">
          <label for="title" class="m-addRecipeForm__label m-addRecipeForm__label--required">Recipe Title</label>
          <input id="title" v-model="payload.title" type="text" class="m-addRecipeForm__input" placeholder="Enter recipe title" required>
        </div>

        <div class="m-addRecipeForm__formGroup">
          <label for="description" class="m-addRecipeForm__label m-addRecipeForm__label--required">Description</label>
          <textarea
            id="description"
            v-model="payload.description"
            class="m-addRecipeForm__textarea"
            placeholder="Describe your recipe"
            rows="4"
            required
          />
        </div>

        <div class="m-addRecipeForm__formGroup">
          <label for="image_url" class="m-addRecipeForm__label m-addRecipeForm__label--required">Image URL</label>
          <input id="image_url" v-model="payload.image_url" type="url" class="m-addRecipeForm__input" placeholder="https://example.com/image.jpg" required>
        </div>
      </div>

      <div class="m-addRecipeForm__section">
        <h2 class="m-addRecipeForm__sectionTitle">Recipe Details</h2>
        
        <div class="m-addRecipeForm__formGroup m-addRecipeForm__formGroup--row">
          <div>
            <label for="cuisine" class="m-addRecipeForm__label m-addRecipeForm__label--required">Cuisine</label>
            <select id="cuisine" v-model.number="payload.cuisine_id" class="m-addRecipeForm__select" required>
              <option :value="0">Select a cuisine</option>
              <option value="1">Asian</option>
              <option value="2">Italian</option>
              <option value="3">Chinese</option>
              <option value="4">French</option>
              <option value="5">Mexican</option>
              <option value="6">Indian</option>
              <option value="7">Mediterranean</option>
              <option value="8">American</option>
              <option value="9">Thai</option>
              <option value="10">Japanese</option>
            </select>
          </div>

          <div>
            <label for="goal" class="m-addRecipeForm__label m-addRecipeForm__label--required">Goal</label>
            <select id="goal" v-model.number="payload.goal_id" class="m-addRecipeForm__select" required>
              <option :value="0">Select a goal</option>
              <option value="1">Weight loss</option>
              <option value="2">Muscle gain</option>
            </select>
          </div>
        </div>

        <div class="m-addRecipeForm__formGroup m-addRecipeForm__formGroup--row">
          <div>
            <label for="dietaryInfo" class="m-addRecipeForm__label">Dietary Information</label>
            <select id="dietaryInfo" v-model.number="payload.DietaryInformation_id" class="m-addRecipeForm__select">
              <option value="0">Select dietary info</option>
              <option value="1">Vegan</option>
              <option value="2">Vegetarian</option>
              <option value="3">Gluten-Free</option>
              <option value="4">Dairy-Free</option>
              <option value="5">Nut-Free</option>
              <option value="6">Lactose-Free</option>
            </select>
          </div>
          <div>
            <label for="allergiesInfo" class="m-addRecipeForm__label">Allergies Information</label>
            <select id="allergiesInfo" v-model.number="payload.AllergiesInformation_id" class="m-addRecipeForm__select">
              <option value="0">Select allergies info</option>
              <option value="1">Peanut</option>
              <option value="2">Dairy</option>
              <option value="3">Egg</option>
              <option value="4">Soy</option>
              <option value="5">Wheat</option>
              <option value="6">Fish</option>
            </select>
          </div>
        </div>
      </div>

      <button type="submit" class="m-addRecipeForm__submitBtn" :disabled="isLoading">
        {{ isLoading ? 'Creating...' : 'Create Recipe' }}
      </button>
    </form>
  </div>
</template>