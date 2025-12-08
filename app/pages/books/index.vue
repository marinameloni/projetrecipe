<script setup lang="ts">
import type { SanityDocument } from "@sanity/client"

const query = `*[
  _type == "book"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`

const { data: books } = await useLazySanityQuery<SanityDocument[]>(query)

useHead({
  title: 'Our Books | Foodieland',
  meta: [{ name: 'description', content: 'Explore our collection of recipe books and culinary guides.' }]
})
</script>

<template>
  <div class="m-booksPage">
    <AppHeader />
    
    <div class="m-booksPage__wrapper">
      <div class="m-booksPage__header">
        <h1 class="m-booksPage__title">Our Books</h1>
        <p class="m-booksPage__subtitle">Explore our collection of recipe books and culinary guides</p>
      </div>

      <ul v-if="books" class="m-booksList">
        <li v-for="book in books" :key="book._id" class="m-bookCard">
          <NuxtLink :to="`/books/${book.slug.current}`" class="m-bookCard__link">
            <div class="m-bookCard__cover">
              <img 
                :src="book.imageUrl || 'https://placeholder.pics/svg/300x400'" 
                :alt="book.title"
                class="m-bookCard__image">
            </div>
            <div class="m-bookCard__content">
              <h2 class="m-bookCard__title">{{ book.title }}</h2>
              <p class="m-bookCard__date">{{ new Date(book.publishedAt).toLocaleDateString() }}</p>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>
