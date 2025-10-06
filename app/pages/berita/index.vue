<script setup lang="ts">
useHead({
  title: 'Berita - SMKN 2 Singosari',
  meta: [
    {
      name: 'description',
      content: 'Berita terbaru dan informasi terkini dari SMK Negeri 2 Singosari'
    }
  ]
});

// State management
const searchQuery = ref('');
const selectedTag = ref('');
const currentPage = ref(1);
const itemsPerPage = 9;

// Available tags (can be fetched from API or derived from news data)
const availableTags = ref<string[]>([
  'Pengumuman',
  'Program Baru',
  'Prestasi',
  'Robotik',
  'Kompetisi',
  'Kerjasama',
  'Industri',
  'Magang',
  'Tahun Ajaran'
]);

// Computed offset for pagination
const offset = computed(() => (currentPage.value - 1) * itemsPerPage);

// Fetch news data with reactive query parameters
const { data: newsResponse, pending, error, refresh } = await useFetch('/api/news', {
  query: {
    search: searchQuery,
    tag: selectedTag,
    limit: itemsPerPage,
    offset: offset
  },
  watch: [searchQuery, selectedTag, offset]
});

// Computed properties
const newsList = computed(() => newsResponse.value?.data || []);
const totalNews = computed(() => newsResponse.value?.total || 0);
const totalPages = computed(() => Math.ceil(totalNews.value / itemsPerPage));
const hasResults = computed(() => newsList.value.length > 0);

// Methods
const handleSearch = (query: string) => {
  searchQuery.value = query;
  currentPage.value = 1; // Reset to first page on new search
};

const handleTagFilter = (tag: string) => {
  if (selectedTag.value === tag) {
    selectedTag.value = ''; // Clear filter if same tag clicked
  } else {
    selectedTag.value = tag;
  }
  currentPage.value = 1; // Reset to first page on new filter
};

const clearFilters = () => {
  searchQuery.value = '';
  selectedTag.value = '';
  currentPage.value = 1;
};

const goToPage = (page: number) => {
  currentPage.value = page;
  // Scroll to top smoothly
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Computed for pagination display
const paginationRange = computed(() => {
  const range = [];
  const delta = 2; // Number of pages to show on each side of current page
  
  for (let i = 1; i <= totalPages.value; i++) {
    if (
      i === 1 ||
      i === totalPages.value ||
      (i >= currentPage.value - delta && i <= currentPage.value + delta)
    ) {
      range.push(i);
    } else if (
      range[range.length - 1] !== '...'
    ) {
      range.push('...');
    }
  }
  
  return range;
});
</script>

<template>
  <div class="min-h-screen py-24 bg-gradient-to-b from-white via-blue-50 to-white">
    <div class="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <!-- Header Section -->
      <div class="flex flex-col items-center mb-12">
        <div class="bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl p-6 shadow-xl rounded-2xl px-10 py-6 border border-blue-200 mb-4">
          <h1 class="text-3xl sm:text-4xl font-bold text-white">Berita & Informasi</h1>
        </div>
        <p class="text-gray-600 text-center max-w-2xl">Informasi dan berita terbaru dari SMK Negeri 2 Singosari</p>
      </div>

      <!-- Search and Filter Section -->
      <div class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-6 sm:p-8 mb-8">
        <!-- Search Bar -->
        <div class="mb-6">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari berita..."
              class="w-full px-4 py-3 pl-12 pr-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            <Icon name="lucide:search" size="20" class="absolute left-4 top-3.5 text-gray-400" />
          </div>
        </div>

        <!-- Tag Filters -->
        <div class="mb-4">
          <h3 class="text-sm font-semibold text-gray-700 mb-4">Filter berdasarkan kategori:</h3>
          <div class="flex flex-wrap gap-3">
            <button
              v-for="tag in availableTags"
              :key="tag"
              @click="handleTagFilter(tag)"
              :class="[
                'px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300',
                selectedTag === tag
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-blue-50 border-2 border-gray-200'
              ]"
            >
              {{ tag }}
            </button>
          </div>
        </div>

        <!-- Active Filters Display -->
        <div v-if="searchQuery || selectedTag" class="flex items-center gap-2 flex-wrap pt-4 border-t border-gray-200">
          <span class="text-sm font-medium text-gray-600">Filter aktif:</span>
          <span v-if="searchQuery" class="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            <Icon name="lucide:search" size="14" />
            "{{ searchQuery }}"
            <button @click="searchQuery = ''" class="ml-1 hover:text-blue-900">
              <Icon name="lucide:x" size="14" />
            </button>
          </span>
          <span v-if="selectedTag" class="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
            <Icon name="lucide:tag" size="14" />
            {{ selectedTag }}
            <button @click="selectedTag = ''" class="ml-1 hover:text-orange-900">
              <Icon name="lucide:x" size="14" />
            </button>
          </span>
          <button @click="clearFilters" class="text-sm text-blue-600 hover:text-blue-800 font-semibold ml-2">
            Hapus semua
          </button>
        </div>
      </div>

      <!-- Results Count -->
      <div class="mb-6">
        <p class="text-gray-600 text-center">
          Menampilkan <span class="font-bold text-blue-600">{{ newsList.length }}</span> dari 
          <span class="font-bold">{{ totalNews }}</span> berita
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="i in itemsPerPage" :key="i" class="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 animate-pulse">
          <div class="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
          <div class="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
          <div class="h-6 bg-gray-200 rounded w-full mb-2"></div>
          <div class="h-4 bg-gray-200 rounded w-full"></div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-white rounded-2xl shadow-xl border-2 border-red-200 p-12 text-center">
        <Icon name="lucide:alert-circle" size="64" class="text-red-400 mx-auto mb-4" />
        <h3 class="text-xl font-bold text-red-800 mb-2">Terjadi Kesalahan</h3>
        <p class="text-red-600 mb-6">Gagal memuat data berita. Silakan coba lagi.</p>
        <button @click="refresh()" class="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold">
          Muat Ulang
        </button>
      </div>

      <!-- No Results State -->
      <div v-else-if="!hasResults" class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-12 text-center">
        <Icon name="lucide:inbox" size="64" class="text-gray-300 mx-auto mb-4" />
        <h3 class="text-xl font-bold text-gray-700 mb-2">Tidak Ada Hasil</h3>
        <p class="text-gray-500 mb-6">
          Tidak ditemukan berita yang sesuai dengan pencarian Anda.
        </p>
        <button @click="clearFilters" class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold shadow-md">
          Hapus Filter
        </button>
      </div>

      <!-- News Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <NuxtLink
          v-for="news in newsList"
          :key="news.id"
          :to="`/berita/${news.slug}`"
          class="relative bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer border border-gray-100 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 flex flex-col"
        >
          <div class="h-48 overflow-hidden">
            <img :src="news.thumbnail" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" :alt="news.title">
          </div>
          <div class="p-5 flex flex-col flex-grow">
            <div class="flex flex-wrap gap-2 mb-3">
              <span v-for="(tag, index) in news.tags.slice(0, 2)" :key="index" class="text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
                {{ tag }}
              </span>
            </div>
            <h3 class="font-bold text-gray-800 mb-2 flex-grow group-hover:text-blue-600 transition-colors text-lg">{{ news.title }}</h3>
            <p class="text-sm text-gray-600 line-clamp-2 mb-3">{{ news.subtitle }}</p>
            <div class="flex items-center text-xs text-gray-500">
              <Icon name="lucide:calendar" size="14" class="mr-1" />
              {{ new Date(news.publishedAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) }}
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1 && hasResults" class="flex justify-center items-center gap-2 mt-12">
        <!-- Previous Button -->
        <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
          :class="[
            'px-5 py-3 rounded-lg font-semibold transition-all duration-300',
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-blue-50 shadow-md border border-gray-200'
          ]"
        >
          <Icon name="lucide:chevron-left" size="18" />
        </button>

        <!-- Page Numbers -->
        <template v-for="(page, index) in paginationRange" :key="index">
          <span v-if="page === '...'" class="px-3 py-2 text-gray-400 font-bold">...</span>
          <button
            v-else
            @click="goToPage(page as number)"
            :class="[
              'px-5 py-3 rounded-lg font-semibold transition-all duration-300',
              currentPage === page
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-blue-50 shadow-md border border-gray-200'
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
              : 'bg-white text-gray-700 hover:bg-blue-50 shadow-md border border-gray-200'
          ]"
        >
          <Icon name="lucide:chevron-right" size="18" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>