<script setup lang="ts">
import { motion } from "motion-v";
import type { News } from "~/models/News";

const selectedCategory = ref<string>("all");
const newsCategories = ref<string[]>(["all", "Pengumuman", "Prestasi", "Kerjasama", "Program Baru"]);

// Fetch news with SSR
const {
  data: newsData,
  pending: isLoadingNews,
  refresh: refreshNews,
} = await useAsyncData(
  "homepage-news",
  () =>
    // Cast the $fetch call to unknown and then to Promise<any> to bypass Nuxt's recursive route-type inference
    $fetch("/api/news" as string, {
      query: {
        limit: 8,
        tag: selectedCategory.value !== "all" ? selectedCategory.value : undefined,
      },
    }) as unknown as Promise<any>,
  {
    watch: [selectedCategory],
    server: true,
    transform: (response: any) => response.data || [],
  }
);

const filterByCategory = (category: string) => {
  selectedCategory.value = category;
};
</script>

<template>
  <motion.section
    id="berita"
    class="relative overflow-hidden"
    :initial="{ opacity: 0, y: 50 }"
    :whileInView="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.8 }"
    :inViewOptions="{ once: true }"
  >
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        class="absolute w-80 h-80 rounded-full bg-pink-200 blur-3xl opacity-20"
        :initial="{ x: -50, y: -20 }"
        :animate="{ x: 80, y: 80 }"
        :transition="{ duration: 20, repeat: Infinity, repeatType: 'reverse' }"
        :whileInView="{ opacity: 1 }"
      ></motion.div>
      <motion.div
        class="absolute w-72 h-72 rounded-full bg-red-200 blur-3xl opacity-20 right-0 top-1/2"
        :initial="{ x: 50, y: -20 }"
        :animate="{ x: -80, y: 80 }"
        :transition="{ duration: 20, repeat: Infinity, repeatType: 'reverse' }"
        :whileInView="{ opacity: 1 }"
      ></motion.div>
    </div>
    <div class="container flex flex-col items-center gap-8 mx-auto relative z-10">
      <!-- Featured News -->
      <motion.div
        v-if="newsData && newsData.length > 0"
        class="w-full max-w-6xl mb-8"
        :initial="{ opacity: 0, y: -30 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6 }"
        :inViewOptions="{ once: true }"
      >
        <div class="relative overflow-hidden rounded-2xl shadow-2xl bg-linear-to-r from-blue-600 to-blue-800">
          <div class="absolute inset-0 bg-black/20"></div>
          <div class="relative p-8 md:p-12 text-white">
            <div class="flex flex-col md:flex-row items-center gap-6">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-4">
                  <Icon name="lucide:newspaper" size="24" class="text-yellow-400" />
                  <span class="text-sm font-semibold text-yellow-400 uppercase tracking-wide">Berita Utama</span>
                </div>
                <h2 class="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                  {{ newsData[0]?.title || "" }}
                </h2>
                <p class="text-blue-100 mb-6 line-clamp-3">
                  {{ newsData[0]?.subtitle || "" }}
                </p>
                <NuxtLink
                  :to="`/berita/${newsData[0]?.slug || ''}`"
                  class="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
                >
                  Baca Selengkapnya
                  <Icon name="lucide:arrow-right" size="16" />
                </NuxtLink>
              </div>
              <div class="w-full md:w-80 h-48 md:h-56">
                <NuxtImg
                  :src="newsData[0]?.thumbnail || '/images/placeholder.jpg'"
                  class="w-full h-full object-cover rounded-lg shadow-lg"
                  :alt="newsData[0]?.title || ''"
                  loading="lazy"
                  width="600"
                  height="400"
                  format="webp"
                  quality="80"
                />
              </div>
            </div>
          </div>
          <div class="absolute top-4 right-4">
            <div class="px-3 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full">TERBARU</div>
          </div>
        </div>
      </motion.div>

      <!-- Section Title -->
      <motion.div
        class="px-8 py-3 text-xl font-bold tracking-widest text-center uppercase rounded-full md:text-2xl bg-blue-50 text-blue-700"
        :initial="{ opacity: 0, scale: 0.8 }"
        :animate="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 0.6, delay: 0.2 }"
        :inViewOptions="{ once: true }"
      >
        Informasi & Berita
      </motion.div>

      <!-- Category Filter -->
      <div class="flex flex-wrap justify-center gap-3">
        <motion.button
          v-for="category in newsCategories"
          :key="category"
          @click="filterByCategory(category)"
          :class="[
            'font-semibold px-6 py-3 rounded-full transition-all duration-300 text-sm relative overflow-hidden',
            selectedCategory === category
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200 hover:border-blue-300',
          ]"
          :initial="{ opacity: 0, scale: 0.8 }"
          :whileInView="{ opacity: 1, scale: 1 }"
          :transition="{ duration: 0.4, delay: 0.1 }"
          :inViewOptions="{ once: true }"
          :whileHover="{ scale: 1.05 }"
          :whileTap="{ scale: 0.95 }"
        >
          <span class="relative z-10">{{ category === "all" ? "Semua" : category }}</span>
        </motion.button>
      </div>

      <!-- Loading State -->
      <div v-if="isLoadingNews" class="flex items-center justify-center py-20">
        <div class="flex flex-col items-center gap-3">
          <div class="w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin"></div>
          <p class="text-gray-600">Memuat berita...</p>
        </div>
      </div>

      <!-- News Grid -->
      <div
        v-else-if="newsData && newsData.length > 0"
        class="grid w-full grid-cols-1 gap-6 px-4 mt-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        <motion.div
          v-for="(news, index) in newsData"
          :key="news.id"
          :initial="{ opacity: 0, y: 20 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, delay: index * 0.1 }"
          :inViewOptions="{ once: true }"
        >
          <NuxtLink
            :to="`/berita/${news.slug}`"
            class="relative flex flex-col overflow-hidden bg-white border border-gray-100 shadow-lg rounded-2xl group hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div class="relative h-48 overflow-hidden">
              <NuxtImg
                :src="news.thumbnail"
                class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                :alt="news.title"
                loading="lazy"
                width="400"
                height="300"
                format="webp"
                quality="80"
              />
              <div class="absolute top-3 left-3">
                <div class="px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                  {{ news.tags[0] || "Berita" }}
                </div>
              </div>
              <div
                class="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
            </div>
            <div class="flex flex-col grow p-5">
              <div class="flex items-center justify-between mb-2">
                <p class="text-xs font-semibold text-blue-600">
                  {{ news.tags.join(", ") }}
                </p>
                <Icon
                  name="lucide:arrow-right"
                  size="16"
                  class="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <h3 class="grow mb-2 font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                {{ news.title }}
              </h3>
              <p class="text-sm text-gray-500 line-clamp-2 group-hover:text-gray-700 transition-colors">
                {{ news.subtitle }}
              </p>
              <div class="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <span class="text-xs text-gray-400">Baca lebih lanjut</span>
                <div class="flex items-center gap-1 text-blue-500">
                  <Icon name="lucide:eye" size="12" />
                  <span class="text-xs">Detail</span>
                </div>
              </div>
            </div>
          </NuxtLink>
        </motion.div>
      </div>

      <!-- Empty State -->
      <div v-else class="flex flex-col items-center justify-center gap-4 py-20">
        <Icon name="lucide:newspaper" size="64" class="text-gray-400" />
        <p class="text-lg text-gray-600">Tidak ada berita untuk kategori ini</p>
      </div>

      <!-- View All CTA -->
      <div class="mt-8">
        <NuxtLink
          to="/berita"
          class="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-colors"
        >
          Lihat Semua Berita
          <Icon name="lucide:arrow-right" size="18" />
        </NuxtLink>
      </div>
    </div>
  </motion.section>
</template>
