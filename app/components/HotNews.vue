<template>
  <div class="bg-gray-100 min-h-screen p-4 sm:p-6 md:p-8">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-bold text-center mb-8">HOT NEWS</h1>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Left Column -->
        <div class="md:col-span-1 space-y-8">
          <NewsCard v-for="news in leftNews" :key="news.id" :news="news" />
        </div>

        <!-- Middle Column -->
        <div class="md:col-span-2">
          <FeaturedNewsCard :news="featuredNews" />
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
            <NewsCard v-for="news in middleNews" :key="news.id" :news="news" />
          </div>
        </div>

        <!-- Right Column -->
        <div class="md:col-span-1 space-y-8">
          <NewsCard v-for="news in rightNews" :key="news.id" :news="news" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { newsData } from '~/datas/data'

// Get featured news (first news)
const featuredNews = computed(() => newsData[0])

// Get left column news (next 3)
const leftNews = computed(() => newsData.slice(1, 4))

// Get middle column news (next 2)
const middleNews = computed(() => newsData.slice(4, 6))

// Get right column news (next 3)
const rightNews = computed(() => newsData.slice(6, 9))
</script>