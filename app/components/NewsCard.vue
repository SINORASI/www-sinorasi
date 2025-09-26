<template>
  <NuxtLink :to="`/berita/${news.slug}`" class="block bg-secondary rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <div class="p-4">
      <div class="w-full h-32 bg-gray-200 rounded-md mb-4 overflow-hidden">
        <img :src="news.thumbnail" :alt="news.title" class="w-full h-full object-cover" />
      </div>
      <span v-if="news.tags.length > 0" class="bg-blue-100 text-blue-800 text-xs font-medium inline-block px-2.5 py-0.5 rounded-full mb-2">
        {{ news.tags[0] }}
      </span>
      <h3 class="text-lg font-bold mb-1 line-clamp-2">{{ news.title }}</h3>
      <p class="text-gray-600 text-sm line-clamp-2">
        {{ news.subtitle }}
      </p>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { News } from '~/models/News'

defineProps<{
  news: News
}>()
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>