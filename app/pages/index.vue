<script setup lang="ts">
const { data: recipes, error } = await useAsyncData("recipes", async () => {
  const response = await $fetch<{ data: Recipe[] }>("http://localhost:4000/api/recipes");
  return response.data;
});

if (error && error.value) throw new Error("Page not Found");
definePageMeta({
  layout: 'aside'
})
</script>

<template>
  <div>
    <div class="o-recipeBlock">
      <div class="m-card">
        <div class="m-card__contentLeft">
          <h1>Spicy delicious chicken wings</h1>
        </div>

        <div class="m-card__mediaWrapper">
          <img src="https://placeholder.pics/svg/600x400" alt="Delicious Chicken Wings">
        </div>

        <button class="a-button -primary">View Recipe
        </button>
      </div>
    </div>
    
    <h2>Categories</h2>
    <h3>Simple and fun recipes</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    
    <ul v-if="recipes && recipes.length">
      <li v-for="(recipe, index) in recipes" :key="index">{{ recipe.title }}</li>
    </ul>
  </div>
</template>

