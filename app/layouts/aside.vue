<template>
    <div class="ly-aside">
        <aside class="ly-aside-sidebar">Sidebar</aside>
        <main> Contenu de la page
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