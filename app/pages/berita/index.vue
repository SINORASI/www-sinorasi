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
  <div class="min-h-screen py-30">
    <div class="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <!-- Header Section -->
      <div class="mb-8">
        <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Berita Terkini</h1>
        <p class="text-gray-600">Informasi dan berita terbaru dari SMK Negeri 2 Singosari</p>
      </div>

      <!-- Search and Filter Section -->
      <div class="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-8">
        <!-- Search Bar -->
        <div class="mb-4">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari berita..."
              class="w-full px-4 py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            <svg
              class="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <!-- Tag Filters -->
        <div class="mb-4">
          <h3 class="text-sm font-semibold text-gray-700 mb-3">Filter berdasarkan kategori:</h3>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="tag in availableTags"
              :key="tag"
              @click="handleTagFilter(tag)"
              :class="[
                'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                selectedTag === tag
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
            >
              {{ tag }}
            </button>
          </div>
        </div>

        <!-- Active Filters Display -->
        <div v-if="searchQuery || selectedTag" class="flex items-center gap-2 flex-wrap">
          <span class="text-sm text-gray-600">Filter aktif:</span>
          <span v-if="searchQuery" class="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            Pencarian: "{{ searchQuery }}"
            <button @click="searchQuery = ''" class="ml-1 hover:text-blue-900">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </span>
          <span v-if="selectedTag" class="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            Kategori: {{ selectedTag }}
            <button @click="selectedTag = ''" class="ml-1 hover:text-blue-900">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </span>
          <button @click="clearFilters" class="text-sm text-blue-600 hover:text-blue-800 font-medium">
            Hapus semua filter
          </button>
        </div>
      </div>

      <!-- Results Count -->
      <div class="mb-6">
        <p class="text-gray-600">
          Menampilkan <span class="font-semibold">{{ newsList.length }}</span> dari 
          <span class="font-semibold">{{ totalNews }}</span> berita
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="i in itemsPerPage" :key="i" class="bg-white rounded-lg shadow-md p-4 animate-pulse">
          <div class="w-full h-32 bg-gray-200 rounded-md mb-4"></div>
          <div class="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div class="h-8 bg-gray-200 rounded w-full mb-2"></div>
          <div class="h-4 bg-gray-200 rounded w-full"></div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <svg class="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="text-lg font-semibold text-red-800 mb-2">Terjadi Kesalahan</h3>
        <p class="text-red-600 mb-4">Gagal memuat data berita. Silakan coba lagi.</p>
        <button @click="refresh()" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
          Muat Ulang
        </button>
      </div>

      <!-- No Results State -->
      <div v-else-if="!hasResults" class="bg-white rounded-lg shadow-sm p-12 text-center">
        <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="text-xl font-semibold text-gray-700 mb-2">Tidak Ada Hasil</h3>
        <p class="text-gray-500 mb-4">
          Tidak ditemukan berita yang sesuai dengan pencarian Anda.
        </p>
        <button @click="clearFilters" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Hapus Filter
        </button>
      </div>

      <!-- News Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <NewsCard 
          v-for="news in newsList" 
          :key="news.id" 
          :news="news"
        />
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1 && hasResults" class="flex justify-center items-center gap-2 mt-8">
        <!-- Previous Button -->
        <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
          :class="[
            'px-4 py-2 rounded-lg font-medium transition',
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
          ]"
        >
          Sebelumnya
        </button>

        <!-- Page Numbers -->
        <template v-for="(page, index) in paginationRange" :key="index">
          <span v-if="page === '...'" class="px-3 py-2 text-gray-400">...</span>
          <button
            v-else
            @click="goToPage(page as number)"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition',
              currentPage === page
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
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
            'px-4 py-2 rounded-lg font-medium transition',
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
          ]"
        >
          Selanjutnya
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