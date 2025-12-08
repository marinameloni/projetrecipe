<script setup>
import AddRecipeForm from '~/components/AddRecipeForm.vue'

definePageMeta({
  middleware: ['auth']
})

function onLogoutClick () {
  const cookie = useCookie('recipe_token')
  cookie.value = null
  navigateTo('/login')
}

const config = useRuntimeConfig()

await useAsyncData('my-recipes', () => {
  const cookie = useCookie('recipe_token')
  return $fetch(`${config.public.apiUrl}/api/recipes/my-recipes`, {
    headers: {
      Authorization: `Bearer ${cookie.value}`
    }
  })
})


</script>

<template>
  <div class="p-dashboard">
    <AppHeader />
    <h1>Dashboard</h1>
    <AddRecipeForm />
    <YourRecipes />
    
    <button @click="onLogoutClick">Log out</button>

  </div>
</template>