<script lang="ts" setup>
const route = useRoute()
console.log(route);
</script>

<template>
    <div>
        <h1>This is a blog post page about {{ route.params.slug }}</h1>
    </div>
</template>