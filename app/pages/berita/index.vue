<script setup lang="ts">
import { motion } from "motion-v";

useHead({
  title: "Berita - SMKN 2 Singosari",
  meta: [
    {
      name: "description",
      content: "Berita terbaru dan informasi terkini dari SMK Negeri 2 Singosari",
    },
  ],
});

const searchQuery = ref("");
const selectedTags = ref<string[]>([]);
const currentPage = ref(1);
const itemsPerPage = 9;
const showAllTags = ref(false);

const { data: allNewsResponse } = await useFetch("/api/news", {
  query: { limit: 1000 },
});

const availableTags = computed(() => {
  const allNews = allNewsResponse.value?.data || [];
  const tagSet = new Set<string>();

  allNews.forEach((news: any) => {
    if (news.tags && Array.isArray(news.tags)) {
      news.tags.forEach((tag: string) => {
        if (tag.length > 2 && !/^\d+$/.test(tag)) {
          tagSet.add(tag);
        }
      });
    }
  });

  return Array.from(tagSet).sort();
});

const displayTags = computed(() => {
  if (showAllTags.value) {
    return availableTags.value;
  }
  return availableTags.value.slice(0, 10);
});

const offset = computed(() => (currentPage.value - 1) * itemsPerPage);

const {
  data: newsResponse,
  pending,
  error,
  refresh,
} = await useFetch("/api/news", {
  query: computed(() => ({
    search: searchQuery.value,
    tags: selectedTags.value.join(","),
    limit: itemsPerPage,
    offset: offset.value,
  })),
  watch: [searchQuery, selectedTags, offset],
});

const newsList = computed(() => newsResponse.value?.data || []);
const totalNews = computed(() => newsResponse.value?.total || 0);
const totalPages = computed(() => Math.ceil(totalNews.value / itemsPerPage));
const hasResults = computed(() => newsList.value.length > 0);

const handleSearch = (query: string) => {
  searchQuery.value = query;
  currentPage.value = 1;
};

const handleTagFilter = (tag: string) => {
  const index = selectedTags.value.indexOf(tag);
  if (index > -1) {
    selectedTags.value.splice(index, 1);
  } else {
    selectedTags.value.push(tag);
  }
  currentPage.value = 1;
};

const clearFilters = () => {
  searchQuery.value = "";
  selectedTags.value = [];
  currentPage.value = 1;
};

const goToPage = (page: number) => {
  currentPage.value = page;

  window.scrollTo({ top: 0, behavior: "smooth" });
};

const paginationRange = computed(() => {
  const range = [];
  const delta = 2;

  for (let i = 1; i <= totalPages.value; i++) {
    if (i === 1 || i === totalPages.value || (i >= currentPage.value - delta && i <= currentPage.value + delta)) {
      range.push(i);
    } else if (range[range.length - 1] !== "...") {
      range.push("...");
    }
  }

  return range;
});

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
};
</script>

<template>
  <div class="min-h-screen py-24 bg-linear-to-b from-white via-blue-50 to-white">
    <div class="container px-4 py-8 mx-auto sm:px-6 sm:py-12">
      <!-- Header Section with Motion -->
      <motion.div
        :initial="{ opacity: 0, y: -30 }"
        :animate="{ opacity: 1, y: 0 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :inViewOptions="{ margin: '0px 0px -100px 0px', once: true }"
        :transition="{ duration: 0.6, ease: 'easeOut' }"
        class="flex flex-col items-center mb-12"
      >
        <motion.div
          :initial="{ scale: 0.8, opacity: 0 }"
          :animate="{ scale: 1, opacity: 1 }"
          :transition="{ duration: 0.5, delay: 0.1 }"
          class="p-6 px-10 py-6 mb-4 border border-blue-200 shadow-xl bg-linear-to-r from-blue-600 to-blue-800 backdrop-blur-2xl rounded-2xl"
        >
          <h1 class="text-3xl font-bold text-white sm:text-4xl">Berita & Informasi</h1>
        </motion.div>
        <motion.p
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :transition="{ duration: 0.6, delay: 0.2 }"
          class="max-w-2xl text-center text-gray-600"
        >
          Informasi dan berita terbaru dari SMK Negeri 2 Singosari
        </motion.p>
      </motion.div>

      <!-- Search and Filter Section with Motion -->
      <motion.div
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :inViewOptions="{ margin: '0px 0px -100px 0px', once: true }"
        :transition="{ duration: 0.6, delay: 0.2 }"
        class="p-6 mb-8 bg-white border-2 border-blue-100 shadow-xl rounded-2xl sm:p-8"
      >
        <!-- Search Bar -->
        <motion.div
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :transition="{ duration: 0.5, delay: 0.3 }"
          class="mb-6"
        >
          <div class="relative group">
            <motion.input
              v-model="searchQuery"
              type="text"
              placeholder="Cari berita..."
              :initial="{ borderColor: 'rgb(229, 231, 235)' }"
              :whileHover="{ borderColor: 'rgb(59, 130, 246)' }"
              :whileFocus="{ borderColor: 'rgb(59, 130, 246)', scale: 1.01 }"
              :transition="{ duration: 0.3 }"
              class="w-full px-4 py-3 pl-12 pr-4 transition border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Icon
              name="lucide:search"
              size="20"
              class="absolute left-4 top-3.5 text-gray-400 group-hover:text-blue-400 transition-colors"
            />
          </div>
        </motion.div>

        <!-- Category Filter -->
        <motion.div
          :initial="{ opacity: 0, y: 10 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.5, delay: 0.4 }"
          class="mb-4"
        >
          <h3 class="mb-4 text-sm font-semibold text-gray-700">Filter berdasarkan kategori:</h3>
          <div class="flex flex-wrap gap-3">
            <motion.button
              v-for="(tag, index) in displayTags"
              :key="tag"
              @click="handleTagFilter(tag)"
              :initial="{ opacity: 0, scale: 0.8 }"
              :animate="{ opacity: 1, scale: 1 }"
              :transition="{ duration: 0.3, delay: 0.05 * index }"
              :whileHover="{ scale: 1.05, y: -2 }"
              :whileTap="{ scale: 0.98 }"
              :class="[
                'px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-md',
                selectedTags.includes(tag)
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-blue-50 border-2 border-gray-200',
              ]"
            >
              {{ tag }}
            </motion.button>
            <motion.button
              v-if="availableTags.length > 10"
              @click="showAllTags = !showAllTags"
              :initial="{ opacity: 0 }"
              :animate="{ opacity: 1 }"
              :transition="{ duration: 0.3, delay: 0.4 }"
              :whileHover="{ scale: 1.05 }"
              class="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-200 shadow-md"
            >
              <Icon :name="showAllTags ? 'lucide:chevron-up' : 'lucide:chevron-down'" size="16" class="inline mr-1" />
              {{ showAllTags ? "Tampilkan Lebih Sedikit" : `Tampilkan ${availableTags.length - 10} Lagi` }}
            </motion.button>
          </div>
        </motion.div>

        <!-- Active Filters Display -->
        <motion.div
          v-if="searchQuery || selectedTags.length > 0"
          :initial="{ opacity: 0, height: 0 }"
          :animate="{ opacity: 1, height: 'auto' }"
          :exit="{ opacity: 0, height: 0 }"
          :transition="{ duration: 0.3 }"
          class="flex flex-wrap items-center gap-2 pt-4 border-t border-gray-200"
        >
          <span class="text-sm font-medium text-gray-600">Filter aktif:</span>
          <motion.span
            v-if="searchQuery"
            :initial="{ opacity: 0, scale: 0.8, x: -10 }"
            :animate="{ opacity: 1, scale: 1, x: 0 }"
            :exit="{ opacity: 0, scale: 0.8 }"
            :transition="{ duration: 0.3 }"
            class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-800 bg-blue-100 rounded-full"
          >
            <Icon name="lucide:search" size="14" />
            "{{ searchQuery }}"
            <motion.button
              @click="searchQuery = ''"
              :whileHover="{ scale: 1.2 }"
              :whileTap="{ scale: 0.9 }"
              class="ml-1 hover:text-blue-900"
            >
              <Icon name="lucide:x" size="14" />
            </motion.button>
          </motion.span>
          <motion.span
            v-for="(tag, index) in selectedTags"
            :key="tag"
            :initial="{ opacity: 0, scale: 0.8, x: -10 }"
            :animate="{ opacity: 1, scale: 1, x: 0 }"
            :exit="{ opacity: 0, scale: 0.8, x: 10 }"
            :transition="{ duration: 0.3, delay: 0.05 * index }"
            class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-orange-800 bg-orange-100 rounded-full"
          >
            <Icon name="lucide:tag" size="14" />
            {{ tag }}
            <motion.button
              @click="handleTagFilter(tag)"
              :whileHover="{ scale: 1.2 }"
              :whileTap="{ scale: 0.9 }"
              class="ml-1 hover:text-orange-900"
            >
              <Icon name="lucide:x" size="14" />
            </motion.button>
          </motion.span>
          <motion.button
            @click="clearFilters"
            :whileHover="{ scale: 1.05 }"
            :whileTap="{ scale: 0.95 }"
            class="ml-2 text-sm font-semibold text-blue-600 hover:text-blue-800"
          >
            Hapus semua
          </motion.button>
        </motion.div>
      </motion.div>

      <!-- Results Counter -->
      <motion.div
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :whileInView="{ opacity: 1 }"
        :inViewOptions="{ margin: '0px 0px -100px 0px', once: true }"
        :transition="{ duration: 0.5, delay: 0.3 }"
        class="mb-6"
      >
        <p class="text-center text-gray-600">
          Menampilkan
          <motion.span
            :key="`${newsList.length}`"
            :initial="{ opacity: 0, y: 10 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.3 }"
            class="font-bold text-blue-600"
          >
            {{ newsList.length }}
          </motion.span>
          dari <span class="font-bold">{{ totalNews }}</span> berita
        </p>
      </motion.div>

      <!-- Loading State with Motion -->
      <div v-if="pending" class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <motion.div
          v-for="i in itemsPerPage"
          :key="i"
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.4, delay: 0.05 * i }"
          class="p-4 bg-white border border-gray-100 shadow-lg rounded-2xl"
        >
          <motion.div
            :animate="{ opacity: [0.5, 1, 0.5] }"
            :transition="{ duration: 1.5, repeat: Infinity }"
            class="w-full h-48 mb-4 bg-gray-200 rounded-lg"
          ></motion.div>
          <motion.div
            :animate="{ opacity: [0.5, 1, 0.5] }"
            :transition="{ duration: 1.5, repeat: Infinity }"
            class="w-1/3 h-4 mb-3 bg-gray-200 rounded"
          ></motion.div>
          <motion.div
            :animate="{ opacity: [0.5, 1, 0.5] }"
            :transition="{ duration: 1.5, repeat: Infinity }"
            class="w-full h-6 mb-2 bg-gray-200 rounded"
          ></motion.div>
          <motion.div
            :animate="{ opacity: [0.5, 1, 0.5] }"
            :transition="{ duration: 1.5, repeat: Infinity }"
            class="w-full h-4 bg-gray-200 rounded"
          ></motion.div>
        </motion.div>
      </div>

      <!-- Error State with Motion -->
      <motion.div
        v-else-if="error"
        :initial="{ opacity: 0, scale: 0.9 }"
        :animate="{ opacity: 1, scale: 1 }"
        :whileInView="{ opacity: 1, scale: 1 }"
        :inViewOptions="{ margin: '0px 0px -100px 0px', once: true }"
        :transition="{ duration: 0.5 }"
        class="p-12 text-center bg-white border-2 border-red-200 shadow-xl rounded-2xl"
      >
        <motion.div :animate="{ y: [0, -10, 0] }" :transition="{ duration: 2, repeat: Infinity }">
          <Icon name="lucide:alert-circle" size="64" class="mx-auto mb-4 text-red-400" />
        </motion.div>
        <h3 class="mb-2 text-xl font-bold text-red-800">Terjadi Kesalahan</h3>
        <p class="mb-6 text-red-600">Gagal memuat data berita. Silakan coba lagi.</p>
        <motion.button
          @click="refresh()"
          :whileHover="{ scale: 1.05 }"
          :whileTap="{ scale: 0.95 }"
          class="px-6 py-3 font-semibold text-white transition bg-red-600 rounded-lg hover:bg-red-700"
        >
          Muat Ulang
        </motion.button>
      </motion.div>

      <!-- No Results State with Motion -->
      <motion.div
        v-else-if="!hasResults"
        :initial="{ opacity: 0, scale: 0.9 }"
        :animate="{ opacity: 1, scale: 1 }"
        :whileInView="{ opacity: 1, scale: 1 }"
        :inViewOptions="{ margin: '0px 0px -100px 0px', once: true }"
        :transition="{ duration: 0.5 }"
        class="p-12 text-center bg-white border-2 border-blue-100 shadow-xl rounded-2xl"
      >
        <motion.div :animate="{ y: [0, -15, 0] }" :transition="{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }">
          <Icon name="lucide:inbox" size="64" class="mx-auto mb-4 text-gray-300" />
        </motion.div>
        <h3 class="mb-2 text-xl font-bold text-gray-700">Tidak Ada Hasil</h3>
        <p class="mb-6 text-gray-500">Tidak ditemukan berita yang sesuai dengan pencarian Anda.</p>
        <motion.button
          @click="clearFilters"
          :whileHover="{ scale: 1.05 }"
          :whileTap="{ scale: 0.95 }"
          class="px-6 py-3 font-semibold text-white transition bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
        >
          Hapus Filter
        </motion.button>
      </motion.div>

      <!-- News Grid with Motion -->
      <motion.div
        v-else
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :whileInView="{ opacity: 1 }"
        :inViewOptions="{ margin: '0px 0px -100px 0px', once: true }"
        :transition="{ duration: 0.5 }"
        class="grid grid-cols-1 gap-6 mb-12 sm:grid-cols-2 lg:grid-cols-3"
      >
        <motion.div
          v-for="(news, index) in newsList"
          :key="news.id"
          :initial="{ opacity: 0, y: 30 }"
          :animate="{ opacity: 1, y: 0 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :inViewOptions="{ margin: '0px 0px -50px 0px', once: true }"
          :transition="{ duration: 0.4, delay: 0.05 * index, ease: 'easeOut' }"
        >
          <NuxtLink
            :to="`/berita/${news.slug}`"
            class="relative flex flex-col h-full overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-lg cursor-pointer rounded-2xl group hover:shadow-2xl hover:border-blue-200"
          >
            <!-- Image Container -->
            <motion.div :whileHover="{ scale: 1.02 }" :transition="{ duration: 0.4 }" class="h-48 overflow-hidden">
              <motion.div :whileHover="{ scale: 1.15 }" :transition="{ duration: 0.5 }">
                <NuxtImg :src="news.thumbnail" class="object-cover w-full h-full" :alt="news.title" />
              </motion.div>
            </motion.div>

            <!-- Content -->
            <div class="flex flex-col grow p-5">
              <!-- Tags -->
              <motion.div
                :initial="{ opacity: 0 }"
                :animate="{ opacity: 1 }"
                :transition="{ duration: 0.4, delay: 0.08 * index }"
                class="flex flex-wrap gap-2 mb-3"
              >
                <motion.span
                  v-for="(tag, tagIndex) in news.tags.slice(0, 2)"
                  :key="tagIndex"
                  :initial="{ opacity: 0, scale: 0.8 }"
                  :animate="{ opacity: 1, scale: 1 }"
                  :transition="{ duration: 0.3, delay: 0.05 * tagIndex }"
                  :whileHover="{ scale: 1.05 }"
                  class="px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full cursor-default"
                >
                  {{ tag }}
                </motion.span>
              </motion.div>

              <!-- Title -->
              <motion.h3
                :initial="{ opacity: 0 }"
                :animate="{ opacity: 1 }"
                :transition="{ duration: 0.4, delay: 0.1 * index }"
                class="grow mb-2 text-lg font-bold text-gray-800 transition-colors group-hover:text-blue-600"
              >
                {{ news.title }}
              </motion.h3>

              <!-- Subtitle -->
              <motion.p
                :initial="{ opacity: 0 }"
                :animate="{ opacity: 1 }"
                :transition="{ duration: 0.4, delay: 0.12 * index }"
                class="mb-3 text-sm text-gray-600 line-clamp-2"
              >
                {{ news.subtitle }}
              </motion.p>

              <!-- Date -->
              <motion.div
                :initial="{ opacity: 0 }"
                :animate="{ opacity: 1 }"
                :transition="{ duration: 0.4, delay: 0.14 * index }"
                class="flex items-center text-xs text-gray-500"
              >
                <Icon name="lucide:calendar" size="14" class="mr-1" />
                {{ formatDate(news.publishedAt) }}
              </motion.div>
            </div>

            <!-- Decorative Hover Effect -->
            <motion.div
              :whileHover="{ opacity: 1, scale: 1 }"
              :initial="{ opacity: 0, scale: 0.8 }"
              class="absolute top-0 right-0 w-12 h-12 bg-linear-to-br from-blue-400 to-blue-600 rounded-full -mr-6 -mt-6 opacity-0 pointer-events-none"
            ></motion.div>
          </NuxtLink>
        </motion.div>
      </motion.div>

      <!-- Pagination with Motion -->
      <motion.div
        v-if="totalPages > 1 && hasResults"
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :inViewOptions="{ margin: '0px 0px -100px 0px', once: true }"
        :transition="{ duration: 0.5, delay: 0.4 }"
        class="flex items-center justify-center gap-2 mt-12"
      >
        <motion.button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
          :whileHover="currentPage !== 1 ? { scale: 1.1, x: -5 } : {}"
          :whileTap="currentPage !== 1 ? { scale: 0.95 } : {}"
          :class="[
            'px-5 py-3 rounded-lg font-semibold transition-all duration-300',
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-blue-50 shadow-md border border-gray-200',
          ]"
        >
          <Icon name="lucide:chevron-left" size="18" />
        </motion.button>

        <template v-for="(page, index) in paginationRange" :key="index">
          <motion.span
            v-if="page === '...'"
            :initial="{ opacity: 0 }"
            :animate="{ opacity: 1 }"
            :transition="{ duration: 0.3 }"
            class="px-3 py-2 font-bold text-gray-400"
          >
            ...
          </motion.span>
          <motion.button
            v-else
            @click="goToPage(page as number)"
            :initial="{ opacity: 0, scale: 0.8 }"
            :animate="{ opacity: 1, scale: 1 }"
            :transition="{ duration: 0.3, delay: 0.02 * index }"
            :whileHover="{ scale: 1.1, y: -2 }"
            :whileTap="{ scale: 0.95 }"
            :class="[
              'px-5 py-3 rounded-lg font-semibold transition-all duration-300',
              currentPage === page
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-blue-50 shadow-md border border-gray-200',
            ]"
          >
            {{ page }}
          </motion.button>
        </template>

        <motion.button
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          :whileHover="currentPage !== totalPages ? { scale: 1.1, x: 5 } : {}"
          :whileTap="currentPage !== totalPages ? { scale: 0.95 } : {}"
          :class="[
            'px-5 py-3 rounded-lg font-semibold transition-all duration-300',
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-blue-50 shadow-md border border-gray-200',
          ]"
        >
          <Icon name="lucide:chevron-right" size="18" />
        </motion.button>
      </motion.div>
    </div>
  </div>
</template>
