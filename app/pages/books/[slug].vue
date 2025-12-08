<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";

const BOOK_QUERY = groq`*[_type == "book" && slug.current == $slug][0]{_id, title, slug, publishedAt, image, body, author->{name}, categories[]->{...}}`;
const { params } = useRoute();

const { data: book } = await useLazySanityQuery<SanityDocument>(BOOK_QUERY, params);
const { projectId, dataset } = useSanity().client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null;
</script>

<template>
  <main v-if="book" class="m-bookDetail">
    <div class="m-bookDetail__wrapper">
      <a href="/books" class="m-bookDetail__backLink">&larr; Back to books</a>
      
      <div class="m-bookDetail__container">
        <div class="m-bookCover">
          <img
            v-if="book.image"
            :src="urlFor(book.image)?.width(400).height(600).url()"
            :alt="book?.title"
            class="m-bookCover__image"
            width="400"
            height="600">
        </div>

        <div class="m-bookContent">
          <div class="m-bookContent__header">
            <h1 v-if="book.title" class="m-bookContent__title">{{ book.title }}</h1>
            <p v-if="book.body" class="m-bookContent__subtitle">{{ book.body }}</p>
            <p v-if ="book.author" class="m-bookContent__author">by {{ book.author?.name }}</p>
            <div class="m-bookContent__meta">
              <p v-if="book.publishedAt" class="m-bookContent__publishedAt">
                <strong>Published:</strong> {{ new Date(book.publishedAt).toLocaleDateString() }} in {{ book.category?.title || 'General' }}
              </p>
            </div>
          </div>

          <div v-if="book.body" class="m-bookContent__body">
            <SanityContent :blocks="book.body" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>