<script lang="ts" setup>
import type { Organization } from "~/models/Organization";

useHead({
  title: "Organisasi - SMKN 2 Singosari",
  meta: [
    {
      name: "description",
      content: "Daftar organisasi siswa di SMK Negeri 2 Singosari. Bergabunglah dan kembangkan kemampuanmu!",
    },
  ],
});

// Fetch organizations from API
const { data: organizationsResponse, pending, error } = await useFetch("/api/organizations");

const organizations = computed(() => organizationsResponse.value?.data || []);
</script>

<template>
  <div class="min-h-screen py-24 bg-gradient-to-b from-white via-blue-50 to-white">
    <!-- Header Section -->
    <div class="container px-4 py-8 mx-auto sm:px-6">
      <div class="flex flex-col items-center mb-12">
        <div
          class="p-6 px-10 py-6 mb-4 border border-blue-200 shadow-xl bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl rounded-2xl"
        >
          <h1 class="text-3xl font-bold text-white sm:text-4xl">Organisasi Sekolah</h1>
        </div>
        <p class="max-w-2xl text-lg text-center text-gray-600">
          Organisasi siswa di SMK Negeri 2 Singosari yang mendukung pengembangan karakter dan keterampilan siswa
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="i in 6" :key="i" class="p-6 bg-white border-2 border-blue-100 shadow-lg rounded-2xl animate-pulse">
          <div class="flex items-center justify-center mb-6">
            <div class="w-24 h-24 bg-gray-200 rounded-full"></div>
          </div>
          <div class="w-3/4 h-6 mx-auto mb-4 bg-gray-200 rounded"></div>
          <div class="space-y-2">
            <div class="h-4 bg-gray-200 rounded"></div>
            <div class="w-5/6 h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="p-12 text-center bg-white border-2 border-red-200 shadow-xl rounded-2xl">
        <Icon name="lucide:alert-circle" size="64" class="mx-auto mb-4 text-red-400" />
        <h3 class="mb-2 text-xl font-bold text-red-800">Terjadi Kesalahan</h3>
        <p class="mb-6 text-red-600">Gagal memuat data organisasi. Silakan coba lagi.</p>
      </div>

      <!-- Organizations Grid -->
      <div v-else-if="organizations.length > 0" class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="org in organizations"
          :key="org.id"
          :to="`/organisasi/${org.slug}`"
          class="overflow-hidden transition-all duration-300 bg-white border-2 border-blue-100 shadow-lg group rounded-2xl hover:shadow-2xl hover:border-blue-300 hover:-translate-y-2"
        >
          <!-- Logo Section -->
          <div
            class="flex items-center justify-center p-8 border-b-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white"
          >
            <img
              :src="org.logo"
              :alt="`Logo ${org.name}`"
              class="object-contain w-32 h-32 transition-transform duration-300 group-hover:scale-110 drop-shadow-lg"
            />
          </div>

          <!-- Content Section -->
          <div class="p-6">
            <h2 class="mb-3 text-2xl font-bold text-center text-gray-800 transition-colors group-hover:text-blue-600">
              {{ org.name }}
            </h2>
            <p class="mb-4 text-sm leading-relaxed text-center text-gray-600 line-clamp-3">
              {{ org.description }}
            </p>

            <!-- Statistics -->
            <div v-if="org.statistics" class="grid grid-cols-2 gap-3 mb-4">
              <div v-if="org.statistics.members" class="p-3 text-center border border-blue-100 rounded-lg bg-blue-50">
                <div class="text-xl font-bold text-blue-600">{{ org.statistics.members }}+</div>
                <div class="text-xs text-gray-600">Anggota</div>
              </div>
              <div v-if="org.statistics.years" class="p-3 text-center border border-orange-100 rounded-lg bg-orange-50">
                <div class="text-xl font-bold text-orange-600">{{ org.statistics.years }}</div>
                <div class="text-xs text-gray-600">Tahun</div>
              </div>
            </div>

            <!-- CTA Button -->
            <div
              class="flex items-center justify-center gap-2 font-semibold text-blue-600 transition-all group-hover:gap-3"
            >
              <span>Lihat Detail</span>
              <Icon name="lucide:arrow-right" size="18" class="transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Empty State -->
      <div v-else class="p-12 text-center bg-white border-2 border-blue-100 shadow-xl rounded-2xl">
        <Icon name="lucide:users" size="64" class="mx-auto mb-4 text-gray-300" />
        <h3 class="mb-2 text-xl font-bold text-gray-700">Belum Ada Organisasi</h3>
        <p class="text-gray-500">Data organisasi akan ditampilkan di sini.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
