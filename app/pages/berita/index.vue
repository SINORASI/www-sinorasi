<script setup lang="ts">
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
  <div class="min-h-screen py-24 bg-gradient-to-b from-white via-blue-50 to-white">
    <div class="container px-4 py-8 mx-auto sm:px-6 sm:py-12">
      <div class="flex flex-col items-center mb-12">
        <div
          class="p-6 px-10 py-6 mb-4 border border-blue-200 shadow-xl bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl rounded-2xl"
        >
          <h1 class="text-3xl font-bold text-white sm:text-4xl">Berita & Informasi</h1>
        </div>
        <p class="max-w-2xl text-center text-gray-600">Informasi dan berita terbaru dari SMK Negeri 2 Singosari</p>
      </div>

      <div class="p-6 mb-8 bg-white border-2 border-blue-100 shadow-xl rounded-2xl sm:p-8">
        <div class="mb-6">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari berita..."
              class="w-full px-4 py-3 pl-12 pr-4 transition border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Icon name="lucide:search" size="20" class="absolute left-4 top-3.5 text-gray-400" />
          </div>
        </div>

        <div class="mb-4">
          <h3 class="mb-4 text-sm font-semibold text-gray-700">Filter berdasarkan kategori:</h3>
          <div class="flex flex-wrap gap-3">
            <button
              v-for="tag in displayTags"
              :key="tag"
              @click="handleTagFilter(tag)"
              :class="[
                'px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300',
                selectedTags.includes(tag)
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-blue-50 border-2 border-gray-200',
              ]"
            >
              {{ tag }}
            </button>
            <button
              v-if="availableTags.length > 10"
              @click="showAllTags = !showAllTags"
              class="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-200"
            >
              <Icon :name="showAllTags ? 'lucide:chevron-up' : 'lucide:chevron-down'" size="16" class="inline mr-1" />
              {{ showAllTags ? "Tampilkan Lebih Sedikit" : `Tampilkan ${availableTags.length - 10} Lagi` }}
            </button>
          </div>
        </div>

        <div
          v-if="searchQuery || selectedTags.length > 0"
          class="flex flex-wrap items-center gap-2 pt-4 border-t border-gray-200"
        >
          <span class="text-sm font-medium text-gray-600">Filter aktif:</span>
          <span
            v-if="searchQuery"
            class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-800 bg-blue-100 rounded-full"
          >
            <Icon name="lucide:search" size="14" />
            "{{ searchQuery }}"
            <button @click="searchQuery = ''" class="ml-1 hover:text-blue-900">
              <Icon name="lucide:x" size="14" />
            </button>
          </span>
          <span
            v-for="tag in selectedTags"
            :key="tag"
            class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-orange-800 bg-orange-100 rounded-full"
          >
            <Icon name="lucide:tag" size="14" />
            {{ tag }}
            <button @click="handleTagFilter(tag)" class="ml-1 hover:text-orange-900">
              <Icon name="lucide:x" size="14" />
            </button>
          </span>
          <button @click="clearFilters" class="ml-2 text-sm font-semibold text-blue-600 hover:text-blue-800">
            Hapus semua
          </button>
        </div>
      </div>

      <div class="mb-6">
        <p class="text-center text-gray-600">
          Menampilkan <span class="font-bold text-blue-600">{{ newsList.length }}</span> dari
          <span class="font-bold">{{ totalNews }}</span> berita
        </p>
      </div>

      <div v-if="pending" class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="i in itemsPerPage"
          :key="i"
          class="p-4 bg-white border border-gray-100 shadow-lg rounded-2xl animate-pulse"
        >
          <div class="w-full h-48 mb-4 bg-gray-200 rounded-lg"></div>
          <div class="w-1/3 h-4 mb-3 bg-gray-200 rounded"></div>
          <div class="w-full h-6 mb-2 bg-gray-200 rounded"></div>
          <div class="w-full h-4 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div v-else-if="error" class="p-12 text-center bg-white border-2 border-red-200 shadow-xl rounded-2xl">
        <Icon name="lucide:alert-circle" size="64" class="mx-auto mb-4 text-red-400" />
        <h3 class="mb-2 text-xl font-bold text-red-800">Terjadi Kesalahan</h3>
        <p class="mb-6 text-red-600">Gagal memuat data berita. Silakan coba lagi.</p>
        <button
          @click="refresh()"
          class="px-6 py-3 font-semibold text-white transition bg-red-600 rounded-lg hover:bg-red-700"
        >
          Muat Ulang
        </button>
      </div>

      <div v-else-if="!hasResults" class="p-12 text-center bg-white border-2 border-blue-100 shadow-xl rounded-2xl">
        <Icon name="lucide:inbox" size="64" class="mx-auto mb-4 text-gray-300" />
        <h3 class="mb-2 text-xl font-bold text-gray-700">Tidak Ada Hasil</h3>
        <p class="mb-6 text-gray-500">Tidak ditemukan berita yang sesuai dengan pencarian Anda.</p>
        <button
          @click="clearFilters"
          class="px-6 py-3 font-semibold text-white transition bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
        >
          Hapus Filter
        </button>
      </div>

      <div v-else class="grid grid-cols-1 gap-6 mb-12 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="news in newsList"
          :key="news.id"
          :to="`/berita/${news.slug}`"
          class="relative flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-lg cursor-pointer rounded-2xl group hover:shadow-2xl hover:border-blue-200"
        >
          <div class="h-48 overflow-hidden">
            <NuxtImg
              :src="news.thumbnail"
              class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              :alt="news.title"
            />
          </div>
          <div class="flex flex-col flex-grow p-5">
            <div class="flex flex-wrap gap-2 mb-3">
              <span
                v-for="(tag, index) in news.tags.slice(0, 2)"
                :key="index"
                class="px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full"
              >
                {{ tag }}
              </span>
            </div>
            <h3 class="flex-grow mb-2 text-lg font-bold text-gray-800 transition-colors group-hover:text-blue-600">
              {{ news.title }}
            </h3>
            <p class="mb-3 text-sm text-gray-600 line-clamp-2">{{ news.subtitle }}</p>
            <div class="flex items-center text-xs text-gray-500">
              <Icon name="lucide:calendar" size="14" class="mr-1" />
              {{ formatDate(news.publishedAt) }}
            </div>
          </div>
        </NuxtLink>
      </div>

      <div v-if="totalPages > 1 && hasResults" class="flex items-center justify-center gap-2 mt-12">
        <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
          :class="[
            'px-5 py-3 rounded-lg font-semibold transition-all duration-300',
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-blue-50 shadow-md border border-gray-200',
          ]"
        >
          <Icon name="lucide:chevron-left" size="18" />
        </button>

        <template v-for="(page, index) in paginationRange" :key="index">
          <span v-if="page === '...'" class="px-3 py-2 font-bold text-gray-400">...</span>
          <button
            v-else
            @click="goToPage(page as number)"
            :class="[
              'px-5 py-3 rounded-lg font-semibold transition-all duration-300',
              currentPage === page
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-blue-50 shadow-md border border-gray-200',
            ]"
          >
            {{ page }}
          </button>
        </template>

        <!-- Next Button -->
        <button
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          :class="[
            'px-5 py-3 rounded-lg font-semibold transition-all duration-300',
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-blue-50 shadow-md border border-gray-200',
          ]"
        >
          <Icon name="lucide:chevron-right" size="18" />
        </button>
      </div>
    </div>
  </div>
</template>
