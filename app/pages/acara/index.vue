<script setup lang="ts">
import type { Event } from '~/models/Event';

useHead({
  title: 'Acara - SMKN 2 Singosari',
  meta: [
    {
      name: 'description',
      content: 'Daftar acara dan kegiatan yang akan datang di SMK Negeri 2 Singosari'
    }
  ]
});

// State
const selectedFilter = ref<'all' | 'upcoming' | 'past'>('all');

// Fetch events with filter
const { data: eventsResponse, pending, error, refresh } = await useFetch('/api/events', {
  query: computed(() => ({
    upcoming: selectedFilter.value === 'upcoming' ? 'true' : undefined,
    past: selectedFilter.value === 'past' ? 'true' : undefined,
  })),
  watch: [selectedFilter]
});

const events = computed(() => eventsResponse.value?.data || []);
const totalEvents = computed(() => eventsResponse.value?.total || 0);

const filterOptions = [
  { value: 'all', label: 'Semua Acara', icon: 'lucide:calendar' },
  { value: 'upcoming', label: 'Akan Datang', icon: 'lucide:calendar-clock' },
  { value: 'past', label: 'Selesai', icon: 'lucide:calendar-check' }
];
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white py-24">
    <div class="container mx-auto px-4 sm:px-6 py-8">
      <!-- Header -->
      <div class="flex flex-col items-center mb-12">
        <div class="bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl p-6 shadow-xl rounded-2xl px-10 py-6 border border-blue-200 mb-4">
          <h1 class="text-3xl sm:text-4xl font-bold text-white">Acara & Kegiatan</h1>
        </div>
        <p class="text-gray-600 text-center max-w-2xl text-lg">
          Daftar acara dan kegiatan yang akan datang di SMK Negeri 2 Singosari
        </p>
      </div>

      <!-- Filter Section -->
      <div class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-6 mb-8">
        <div class="flex flex-wrap gap-3 justify-center">
          <button
            v-for="option in filterOptions"
            :key="option.value"
            @click="selectedFilter = option.value as any"
            :class="[
              'flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300',
              selectedFilter === option.value
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'bg-gray-50 text-gray-700 hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-300'
            ]"
          >
            <Icon :name="option.icon" size="20" />
            {{ option.label }}
          </button>
        </div>

        <div v-if="selectedFilter !== 'all'" class="mt-4 pt-4 border-t border-gray-200 text-center">
          <span class="text-sm text-gray-600">
            Filter aktif: 
            <span class="font-bold text-blue-600">{{ filterOptions.find(o => o.value === selectedFilter)?.label }}</span>
            <button @click="selectedFilter = 'all'" class="ml-2 text-blue-600 hover:text-blue-800 underline text-sm">
              Hapus filter
            </button>
          </span>
        </div>
      </div>

      <!-- Results Count -->
      <div class="mb-6 text-center">
        <p class="text-gray-600">
          Menampilkan <span class="font-bold text-blue-600">{{ events.length }}</span> dari 
          <span class="font-bold">{{ totalEvents }}</span> acara
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="i in 6" :key="i" class="bg-white rounded-2xl shadow-lg border-2 border-blue-100 overflow-hidden animate-pulse">
          <div class="h-48 bg-gray-200"></div>
          <div class="p-6">
            <div class="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div class="h-6 bg-gray-200 rounded w-full mb-3"></div>
            <div class="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-white rounded-2xl shadow-xl border-2 border-red-200 p-12 text-center">
        <Icon name="lucide:alert-circle" size="64" class="text-red-400 mx-auto mb-4" />
        <h3 class="text-xl font-bold text-red-800 mb-2">Terjadi Kesalahan</h3>
        <p class="text-red-600 mb-6">Gagal memuat data acara. Silakan coba lagi.</p>
        <button @click="refresh()" class="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold shadow-md">
          Muat Ulang
        </button>
      </div>

      <!-- Empty State -->
      <div v-else-if="events.length === 0" class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-12 text-center">
        <Icon name="lucide:calendar-x" size="64" class="text-gray-300 mx-auto mb-4" />
        <h3 class="text-xl font-bold text-gray-700 mb-2">Tidak Ada Acara</h3>
        <p class="text-gray-500 mb-6">
          {{ selectedFilter === 'upcoming' ? 'Tidak ada acara yang akan datang saat ini.' : 
             selectedFilter === 'past' ? 'Belum ada acara yang telah selesai.' : 
             'Belum ada acara yang terdaftar.' }}
        </p>
        <button v-if="selectedFilter !== 'all'" @click="selectedFilter = 'all'" class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold shadow-md">
          Lihat Semua Acara
        </button>
      </div>

      <!-- Events Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <NuxtLink
          v-for="event in events"
          :key="event.id"
          :to="`/acara/${event.slug}`"
          class="group bg-white rounded-2xl shadow-lg border-2 border-blue-100 overflow-hidden hover:shadow-2xl hover:border-blue-300 transition-all duration-300 hover:-translate-y-2 flex flex-col"
        >
          <!-- Event Image -->
          <div class="h-48 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
            <img 
              :src="event.imageUrl" 
              :alt="event.title" 
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          <!-- Event Content -->
          <div class="p-6 flex flex-col flex-grow">
            <!-- Date Badge -->
            <div class="flex items-center gap-2 text-blue-600 font-semibold mb-3">
              <Icon name="lucide:calendar" size="16" />
              <span class="text-sm">{{ event.date }}</span>
            </div>

            <!-- Title -->
            <h3 class="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors flex-grow">
              {{ event.title }}
            </h3>

            <!-- Details -->
            <p class="text-sm text-gray-600 mb-4 line-clamp-2">
              {{ event.details }}
            </p>

            <!-- Read More -->
            <div class="flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all pt-4 border-t border-gray-200">
              <span>Lihat Detail</span>
              <Icon name="lucide:arrow-right" size="18" class="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

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