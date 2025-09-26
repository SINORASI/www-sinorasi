<template>
  <div class="container mx-auto min-h-screen py-24">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-bold text-center mb-8">HOT NEWS</h1>
      <div class="grid grid-cols-1 md:grid-cols-5 gap-8">
        <div class="md:col-span-1 space-y-8">
          <NewsCard v-for="news in leftNews" :key="news.id" :news="news" />
        </div>

        <div class="md:col-span-3">
          <FeaturedNewsCard :news="featuredNews" />
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8 border-l-2 border-r-2 border-gray-300 pl-4 pr-4">
            <NewsCard v-for="news in middleNews" :key="news.id" :news="news" />
          </div>
        </div>

        <div class="md:col-span-1 space-y-8">
          <NewsCard v-for="news in rightNews" :key="news.id" :news="news" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { newsData } from '~/datas/data'

const featuredNews = computed(() => newsData[0])
const leftNews = computed(() => newsData.slice(1, 4))
const middleNews = computed(() => newsData.slice(4, 7))
const rightNews = computed(() => newsData.slice(7, 13))

</script>