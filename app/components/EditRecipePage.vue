<script setup lang="ts">
const props = defineProps<{
  recipe: FullRecipe | null
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
  update: [recipe: FullRecipe]
}>()

const config = useRuntimeConfig()
const apiBase = (config.public.apiUrl || '').replace(/\/+$/, '')
const token = useCookie('recipe_token')

const formData = ref({
  title: '',
  description: '',
  image_url: '',
  cuisine_id: 0,
  goal_id: 0,
  DietaryInformation_id: 0,
  AllergiesInformation_id: 0
})

const isLoading = ref(false)
const errorMessage = ref('')

const { data: cuisines } = await useAsyncData<Cuisine[]>('cuisines', async () => {
  try {
    const res = await $fetch<ApiResponse<Cuisine[]>>(`${apiBase}/api/cuisines`)
    return res.data || []
  } catch {
    return []
  }
})

const { data: goals } = await useAsyncData<Goal[]>('goals', async () => {
  try {
    const res = await $fetch<ApiResponse<Goal[]>>(`${apiBase}/api/goals`)
    return res.data || []
  } catch {
    return []
  }
})

watch(() => props.recipe, (recipe) => {
  if (recipe) {
    formData.value = {
      title: recipe.title || '',
      description: recipe.description || '',
      image_url: recipe.image_url || '',
      cuisine_id: recipe.cuisine_id || 0,
      goal_id: recipe.goal_id || 0,
      DietaryInformation_id: recipe.DietaryInformation_id || 0,
      AllergiesInformation_id: recipe.AllergiesInformation_id || 0
    }
    errorMessage.value = ''
  }
}, { deep: true })

async function onSubmit() {
  if (!formData.value.title || !formData.value.description || !formData.value.image_url) {
    errorMessage.value = 'Please fill in all required fields.'
    return
  }

  if (!props.recipe) return

  isLoading.value = true
  errorMessage.value = ''

  try {
    const updatedRecipe = await $fetch<FullRecipe>(`${apiBase}/api/recipes/${props.recipe.recipe_id}`, {
      method: 'PUT',
      headers: token.value ? { Authorization: `Bearer ${token.value}` } : {},
      body: formData.value
    })
    emit('update', updatedRecipe)
    emit('close')
  } catch {
    errorMessage.value = 'Failed to update recipe'
  } finally {
    isLoading.value = false
  }
}

function onClose() {
  emit('close')
}
</script>

<template>
  <div v-if="isOpen" class="m-editModal">
    <div class="m-editModal__overlay" @click="onClose" />
    <div class="m-editModal__content">
      <div class="m-editModal__header">
        <h2>Edit Recipe</h2>
        <button class="m-editModal__closeBtn" @click="onClose">✕</button>
      </div>

      <form class="m-editModal__form" @submit.prevent="onSubmit">
        <div v-if="errorMessage" class="m-editModal__error">{{ errorMessage }}</div>

        <div class="m-editModal__group">
          <label for="title" class="m-editModal__label">Title *</label>
          <input 
            id="title" 
            v-model="formData.title" 
            type="text" 
            class="m-editModal__input"
            placeholder="Recipe title"
            required>
        </div>

        <div class="m-editModal__group">
          <label for="description" class="m-editModal__label">Description *</label>
          <textarea 
            id="description" 
            v-model="formData.description" 
            class="m-editModal__textarea"
            placeholder="Recipe description"
            rows="4"
            required />
        </div>

        <div class="m-editModal__group">
          <label for="image_url" class="m-editModal__label">Image URL *</label>
          <input 
            id="image_url" 
            v-model="formData.image_url" 
            type="url" 
            class="m-editModal__input"
            placeholder="https://example.com/image.jpg"
            required>
        </div>

        <div class="m-editModal__row">
          <div class="m-editModal__group">
            <label for="cuisine" class="m-editModal__label">Cuisine</label>
            <select id="cuisine" v-model.number="formData.cuisine_id" class="m-editModal__select">
              <option value="0">Select a cuisine</option>
              <option v-for="cuisine in cuisines" :key="cuisine.cuisine_id" :value="cuisine.cuisine_id">
                {{ cuisine.name }}
              </option>
            </select>
          </div>

          <div class="m-editModal__group">
            <label for="goal" class="m-editModal__label">Goal</label>
            <select id="goal" v-model.number="formData.goal_id" class="m-editModal__select">
              <option value="0">Select a goal</option>
              <option v-for="goal in goals" :key="goal.goal_id" :value="goal.goal_id">
                {{ goal.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="m-editModal__actions">
          <button type="button" class="m-editModal__btn m-editModal__btn--cancel" @click="onClose">Cancel</button>
          <button type="submit" class="m-editModal__btn m-editModal__btn--submit" :disabled="isLoading">
            {{ isLoading ? 'Saving...' : 'Save Changes' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.m-editModal {
  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }

  &__content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    max-width: 600px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    z-index: 1000;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    border-bottom: 1px solid #eee;

    h2 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
      color: #1a1a1a;
    }
  }

  &__closeBtn {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #999;
    transition: color 0.2s ease;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      color: #1a1a1a;
    }
  }

  &__form {
    padding: 24px;
  }

  &__error {
    padding: 12px 16px;
    background-color: #ffe6e6;
    border: 1px solid #ff6b6b;
    border-radius: 8px;
    color: #c92a2a;
    margin-bottom: 16px;
    font-size: 14px;
  }

  &__group {
    margin-bottom: 20px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  &__label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #1a1a1a;
    font-size: 14px;
  }

  &__input,
  &__textarea,
  &__select {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 14px;
    font-family: inherit;
    transition: border-color 0.2s ease;

    &:focus {
      outline: none;
      border-color: #4CAF50;
      box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
    }
  }

  &__textarea {
    resize: vertical;
    line-height: 1.5;
  }

  &__row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }

  &__actions {
    display: flex;
    gap: 12px;
    padding-top: 24px;
    border-top: 1px solid #eee;
    margin-top: 24px;
  }

  &__btn {
    flex: 1;
    padding: 12px 16px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
    text-transform: uppercase;
    letter-spacing: 0.5px;

    &--cancel {
      background-color: #f0f0f0;
      color: #666;

      &:hover {
        background-color: #e0e0e0;
      }
    }

    &--submit {
      background-color: #4CAF50;
      color: white;

      &:hover:not(:disabled) {
        background-color: #45a049;
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }
  }
}

@media (max-width: 768px) {
  .m-editModal {
    &__content {
      width: 95%;
      max-height: 95vh;
    }

    &__header {
      padding: 16px;
    }

    &__form {
      padding: 16px;
    }

    &__row {
      grid-template-columns: 1fr;
    }
  }
}
</style>
