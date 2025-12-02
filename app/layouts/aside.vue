<template>
    <div class="ly-aside">
        <a href="/"><aside class="ly-aside-sidebar">Foodieland</aside></a>
        <main>
         <slot />
    </main>
</div>
</template>
<style lang="scss" scoped>
.ly-aside {
    display: flex;
}
.ly-aside-sidebar {
    width: 200px;
    background-color: #f0f0f0;
    padding: 20px;
}
.ly-aside main {
    flex-grow: 1;
    padding: 20px;
}
</style>