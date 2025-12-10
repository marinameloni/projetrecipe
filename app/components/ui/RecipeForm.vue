<template>
  <form :class="formClasses" @submit.prevent="onSubmit">
    <!-- Success/Error Messages -->
    <div v-if="successMessage" :class="['m-addRecipeForm__messageContainer', 'm-addRecipeForm__messageContainer--success']">
      {{ successMessage }}
    </div>
    <div v-if="errorMessage" :class="['m-addRecipeForm__messageContainer', 'm-addRecipeForm__messageContainer--error']">
      {{ errorMessage }}
    </div>

    <!-- Basic Information Section -->
    <div class="m-addRecipeForm__section">
      <h3 class="m-addRecipeForm__sectionTitle">
        <slot name="basicTitle">Basic Information</slot>
      </h3>
      
      <div class="m-addRecipeForm__formGroup">
        <label class="m-addRecipeForm__label m-addRecipeForm__label--required">
          Title
        </label>
        <input
          v-model="formData.title"
          type="text"
          class="m-addRecipeForm__input"
          placeholder="Enter recipe title"
          required
        >
      </div>

      <div class="m-addRecipeForm__formGroup">
        <label class="m-addRecipeForm__label m-addRecipeForm__label--required">
          Description
        </label>
        <textarea
          v-model="formData.description"
          class="m-addRecipeForm__textarea"
          placeholder="Enter recipe description"
          required
        />
      </div>

      <div class="m-addRecipeForm__formGroup">
        <label class="m-addRecipeForm__label m-addRecipeForm__label--required">
          Image URL
        </label>
        <input
          v-model="formData.image_url"
          type="url"
          class="m-addRecipeForm__input"
          placeholder="https://example.com/image.jpg"
          required
        >
      </div>
    </div>

    <!-- Categories Section -->
    <div class="m-addRecipeForm__section">
      <h3 class="m-addRecipeForm__sectionTitle">
        <slot name="categoriesTitle">Categories</slot>
      </h3>
      
      <div class="m-addRecipeForm__formGroup m-addRecipeForm__formGroup--row">
        <div>
          <label class="m-addRecipeForm__label m-addRecipeForm__label--required">
            Cuisine
          </label>
          <select
            v-model.number="formData.cuisine_id"
            class="m-addRecipeForm__select"
            required
          >
            <option value="0" disabled>Select cuisine</option>
            <option v-for="cuisine in cuisines" :key="cuisine.value" :value="cuisine.value">
              {{ cuisine.label }}
            </option>
          </select>
        </div>

        <div>
          <label class="m-addRecipeForm__label m-addRecipeForm__label--required">
            Goal
          </label>
          <select
            v-model.number="formData.goal_id"
            class="m-addRecipeForm__select"
            required
          >
            <option value="0" disabled>Select goal</option>
            <option v-for="goal in goals" :key="goal.value" :value="goal.value">
              {{ goal.label }}
            </option>
          </select>
        </div>
      </div>

      <div v-if="showOptionalFields" class="m-addRecipeForm__formGroup m-addRecipeForm__formGroup--row">
        <div>
          <label class="m-addRecipeForm__label">
            Dietary Information
          </label>
          <select
            v-model.number="formData.DietaryInformation_id"
            class="m-addRecipeForm__select"
          >
            <option value="0">None</option>
            <option v-for="diet in dietaryOptions" :key="diet.value" :value="diet.value">
              {{ diet.label }}
            </option>
          </select>
        </div>

        <div>
          <label class="m-addRecipeForm__label">
            Allergy Information
          </label>
          <select
            v-model.number="formData.AllergiesInformation_id"
            class="m-addRecipeForm__select"
          >
            <option value="0">None</option>
            <option v-for="allergy in allergyOptions" :key="allergy.value" :value="allergy.value">
              {{ allergy.label }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Submit Button -->
    <button
      type="submit"
      class="m-addRecipeForm__submitBtn"
      :disabled="isSubmitting"
    >
      {{ isSubmitting ? 'Submitting...' : submitButtonLabel }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface FormData {
  title: string
  description: string
  image_url: string
  cuisine_id: number
  goal_id: number
  DietaryInformation_id: number
  AllergiesInformation_id: number
}

interface SelectOption {
  value: number
  label: string
}

interface Props {
  initialData?: Partial<FormData>
  cuisines?: SelectOption[]
  goals?: SelectOption[]
  dietaryOptions?: SelectOption[]
  allergyOptions?: SelectOption[]
  submitButtonLabel?: string
  showOptionalFields?: boolean
  variant?: 'default'
}

const props = withDefaults(defineProps<Props>(), {
  initialData: () => ({}),
  cuisines: () => [
    { value: 1, label: 'Italian' },
    { value: 2, label: 'French' },
    { value: 3, label: 'Asian' },
    { value: 4, label: 'Mexican' },
    { value: 5, label: 'Mediterranean' }
  ],
  goals: () => [
    { value: 1, label: 'Weight Loss' },
    { value: 2, label: 'Muscle Gain' },
    { value: 3, label: 'Healthy Eating' }
  ],
  dietaryOptions: () => [
    { value: 1, label: 'Vegetarian' },
    { value: 2, label: 'Vegan' },
    { value: 3, label: 'Gluten-Free' }
  ],
  allergyOptions: () => [
    { value: 1, label: 'Nuts' },
    { value: 2, label: 'Dairy' },
    { value: 3, label: 'Shellfish' }
  ],
  submitButtonLabel: 'Submit Recipe',
  showOptionalFields: true,
  variant: 'default'
})

const emit = defineEmits<{
  submit: [data: FormData]
  success: [message: string]
  error: [message: string]
}>()

const formData = ref<FormData>({
  title: props.initialData?.title || '',
  description: props.initialData?.description || '',
  image_url: props.initialData?.image_url || '',
  cuisine_id: props.initialData?.cuisine_id || 0,
  goal_id: props.initialData?.goal_id || 0,
  DietaryInformation_id: props.initialData?.DietaryInformation_id || 0,
  AllergiesInformation_id: props.initialData?.AllergiesInformation_id || 0
})

const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const formClasses = computed(() => ['c-form-recipe'])

const onSubmit = async () => {
  if (!formData.value.title || !formData.value.description || !formData.value.image_url || 
      formData.value.cuisine_id === 0 || formData.value.goal_id === 0) {
    errorMessage.value = 'Please fill in all required fields.'
    successMessage.value = ''
    return
  }

  isSubmitting.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    emit('submit', formData.value)
  } catch {
    errorMessage.value = 'An error occurred. Please try again.'
    emit('error', errorMessage.value)
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  formData.value = {
    title: '',
    description: '',
    image_url: '',
    cuisine_id: 0,
    goal_id: 0,
    DietaryInformation_id: 0,
    AllergiesInformation_id: 0
  }
  successMessage.value = ''
  errorMessage.value = ''
}

const setSuccess = (message: string) => {
  successMessage.value = message
  errorMessage.value = ''
  emit('success', message)
}

const setError = (message: string) => {
  errorMessage.value = message
  successMessage.value = ''
  emit('error', message)
}

defineExpose({
  resetForm,
  setSuccess,
  setError
})
</script>

<style scoped lang="scss">
.m-addRecipeForm {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  background: linear-gradient(135deg, #ffffff 0%, var(--blue-1) 100%);
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &__section {
    margin-bottom: 32px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__sectionTitle {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 24px;
    padding-bottom: 12px;
    border-bottom: 2px solid #e0f2ff;
  }

  &__formGroup {
    margin-bottom: 20px;

    &--row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }
  }

  &__label {
    display: block;
    font-size: 1rem;
    color: #4a4a4a;
    margin-bottom: 8px;
    font-weight: 600;

    &--required::after {
      content: ' *';
      color: #ff6b6b;
    }
  }

  &__input,
  &__textarea,
  &__select {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e8e8e8;
    border-radius: 8px;
    font-size: 16px;
    font-family: inherit;
    background-color: #ffffff;
    color: #1a1a1a;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: #4287f5;
      box-shadow: 0 0 0 3px rgba(66, 135, 245, 0.1);
    }

    &:disabled {
      background-color: #f5f5f5;
      color: #999;
      cursor: not-allowed;
    }
  }

  &__textarea {
    min-height: 120px;
    resize: vertical;
  }

  &__messageContainer {
    margin-bottom: 20px;
    padding: 16px 20px;
    border-radius: 8px;
    font-size: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &--success {
      background-color: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }

    &--error {
      background-color: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }
  }

  &__submitBtn {
    width: 100%;
    padding: 14px 24px;
    margin-top: 24px;
    background-color: #4287f5;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover:not(:disabled) {
      background-color: #2d5dd6;
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(66, 135, 245, 0.3);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
      opacity: 0.7;
    }
  }
}
</style>
