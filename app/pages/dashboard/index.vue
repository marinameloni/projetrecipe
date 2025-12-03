<script setup>
definePageMeta({
    middleware: ['auth']
})

function onLogoutClick() {
    const tokenCookie = useCookie('recipe_token')
    tokenCookie.value = null
    navigateTo('/login')
}

const config = useRuntimeConfig()
const { data: recipes } = await useAsyncData('my-recipes',() => {
    return $fetch(`${config.public.apiUrl}/api/recipes/my-recipes`,{
        headers: {
            'Authorization': `Bearer ${useCookie('recipe_token').value}`
        }
    })
})
</script>
<template>
<div class="dashboard">
    <AppHeader/>
<h1>Welcome back, user </h1>
<h2>Your Dashboard</h2>
<button @click="onLogoutClick">Logout</button>

<h3>My Recipes</h3>
<ul>
     <li v-for="(recipe, index) in recipes" :key="index">
        <NuxtLink :to="`/recipe/${recipe.recipe_id}`">{{ recipe.title }}</NuxtLink>
        <button @click="onDeleteClick(recipe.recipe_id)">Delete</button>
        <button @click="onEditClick(recipe.recipe_id)">Edit</button>
    </li>
</ul>
<h4>Submit your recipes</h4>
<form action="">
    <input type="text" placeholder="Recipe Title">
    <textarea placeholder="Recipe Description"/>
    <button type="submit">Submit Recipe</button>
</form>
</div>
</template>
