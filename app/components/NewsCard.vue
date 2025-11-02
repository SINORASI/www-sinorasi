<script setup lang="ts">
import type { News } from "~/models/News";

defineProps<{
  news: News;
}>();

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
};
</script>

<template>
  <NuxtLink
    :to="`/berita/${news.slug}`"
    class="block overflow-hidden transition-shadow rounded-lg shadow-md bg-secondary hover:shadow-lg"
  >
    <div class="p-4">
      <div class="w-full h-32 mb-4 overflow-hidden bg-gray-200 rounded-md">
        <SmartImage :src="news.thumbnail" :alt="news.title" class="object-cover w-full h-full" />
      </div>
      <span
        v-if="news.tags.length > 0"
        class="bg-blue-100 text-blue-800 text-xs font-medium inline-block px-2.5 py-0.5 rounded-full mb-2"
      >
        {{ news.tags[0] }}
      </span>
      <h3 class="mb-1 text-lg font-bold line-clamp-2">{{ news.title }}</h3>
      <p class="text-sm text-gray-600 line-clamp-2">
        {{ news.subtitle }}
      </p>
      <p class="text-xs text-gray-500 mt-1">
        {{ formatDate(news.publishedAt) }}
      </p>
    </div>
  </NuxtLink>
</template>
