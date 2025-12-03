<script setup lang="ts">
const payload = ref({
  title: "",
  description: "",
  image_url: "",
  cuisine_id: 0,
  goal_id: 0,
  DietaryInformation_id: 0,
  AllergiesInformation_id: 0,
});

const config = useRuntimeConfig();

async function onSubmit() {
  if (
    !payload.value.title ||
    !payload.value.description ||
    !payload.value.image_url ||
    payload.value.cuisine_id === 0 ||
    payload.value.goal_id === 0
  ) {
    alert("Please fill in all required fields.");
    return;
  }
  const cookie = useCookie("recipe_token");

  try {
    await fetch(`${config.public.apiUrl}/api/recipes`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie.value}`,
      },
      body: JSON.stringify(payload.value),
    });
  } catch (err) {
    console.log(err);
  }
}
</script>

<template>
  <div>
    <form action="" @submit.prevent="onSubmit">
      {{ payload }}
      <div>
        <label for="title">Titre</label>
        <input id="title" v-model="payload.title" type="text" />
      </div>
      <div>
        <label for="description">Description</label>
        <textarea id="description" v-model="payload.description"></textarea>
      </div>
      <div>
        <label for="image_url">Image URL</label>
        <input id="image_url" v-model="payload.image_url" type="text" />
      </div>
      <div>
        <label for="cuisine">Cuisine</label>
        <select id="cuisine" v-model="payload.cuisine_id">
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
        <label for="goal">Objectifs</label>
        <select id="goal" v-model="payload.goal_id">
          <option value="1">Weight loss</option>
          <option value="2">Pork</option>
        </select>

        <label for="dietaryInfo">Dietary Information</label>
        <select id="dietaryInfo" v-model="payload.DietaryInformation_id">
            <option value="1">Vegan</option>
            <option value="2">Vegetarian</option>
            <option value="3">Gluten-Free</option>
            <option value="4">Dairy-Free</option>
            <option value="5">Nut-Free</option>
            <option value="6">Lactose-Free</option>
        </select>

        <label for="allergiesInfo">Allergies Information</label>
        <select id="allergiesInfo" v-model="payload.AllergiesInformation_id">
            <option value="1">Peanut</option>
            <option value="2">Dairy</option>
            <option value="3">Egg</option>
            <option value="4">Soy</option>
            <option value="5">Wheat</option>
            <option value="6">Fish</option>
        </select>
      </div>
      <MyButton type="submit" variant="red">Submit Recipe</MyButton>
    </form>
  </div>
</template>