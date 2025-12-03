<template>
  <div>
    <AppHeader />
    <div class="error-page">
      <div class="error-content">
        <h1 class="error-code">404</h1>
        <h2 class="error-title">Page Not Found</h2>
        <p class="error-description">
          Oops! The page you're looking for doesn't exist. 
          It might have been moved or deleted.
        </p>
        <NuxtLink to="/" class="home-button">
          Go Back Home
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '404 - Page Not Found',
  meta: [
    {
      name: 'description',
      content: 'The page you are looking for could not be found.'
    }
  ]
})
</script>

<style lang="scss" scoped>
.error-page {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);

  .error-content {
    text-align: center;
    max-width: 600px;
    padding: 3rem;
    background: white;
    border-radius: 16px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  }

  .error-code {
    font-size: 8rem;
    font-weight: 900;
    color: #ff6b6b;
    margin: 0;
    line-height: 1;
    
    @media (max-width: 768px) {
      font-size: 6rem;
    }
  }

  .error-title {
    font-size: 2rem;
    font-weight: 700;
    color: #333;
    margin: 1rem 0;
    
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  .error-description {
    font-size: 1.125rem;
    color: #666;
    margin: 1.5rem 0 2rem;
    line-height: 1.6;
  }

  .home-button {
    display: inline-block;
    padding: 1rem 2rem;
    background-color: #000;
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: #333;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
    
    &:active {
      transform: translateY(0);
    }
  }
}
</style>
