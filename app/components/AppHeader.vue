<script setup lang="ts">
interface HeaderLink {
  label: string;
  url: string;
}

interface SiteSettings {
  headerLinks?: HeaderLink[];
  logo?: Record<string, unknown>;
  title?: string;
  description?: string;
}

const { siteSettings } = useSiteSettings() as { siteSettings: Ref<SiteSettings | null> };
</script>


<template>
  <header class="app-header">
    <div class="header-container">
      <NuxtLink to="/" class="logo">
        Foodieland
      </NuxtLink>
      
      <nav class="nav-menu">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/recipes">Recipes</NuxtLink>
        <NuxtLink to="/login">Login</NuxtLink>
        <template v-if="siteSettings?.headerLinks">
          <NuxtLink
            v-for="link in siteSettings.headerLinks"
            :key="link.url"
            :to="link.url"
          >
            {{ link.label }}
          </NuxtLink>
        </template>
      </nav>

      <div class="header-actions">
        <button class="search-btn" aria-label="Search">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>



<style lang="scss" scoped>
.app-header {
  background-color: #ffffff;
  border-bottom: 1px solid #e5e5e5;
  position: sticky;
  top: 0;
  z-index: 100;
  
  .header-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }

  .logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: #000000;
    text-decoration: none;
    white-space: nowrap;
    
    &:hover {
      color: #333333;
    }
  }

  .nav-menu {
    display: flex;
    gap: 2rem;
    flex: 1;
    justify-content: center;
    
    a {
      color: #000000;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s;
      
      &:hover,
      &.router-link-active {
        color: #666666;
      }
    }

    @media (max-width: 768px) {
      display: none;
    }
  }

  .header-actions {
    display: flex;
    gap: 1rem;
    align-items: center;
    
    .search-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      
      svg {
        width: 24px;
        height: 24px;
        stroke: #000000;
      }
      
      &:hover svg {
        stroke: #666666;
      }
    }
  }
}
</style>
