<script lang="ts" setup>
import type { Organization } from '~/models/Organization';

useHead({
  title: 'Organisasi - SMKN 2 Singosari',
  meta: [
    {
      name: 'description',
      content: 'Daftar organisasi siswa di SMK Negeri 2 Singosari. Bergabunglah dan kembangkan kemampuanmu!'
    }
  ]
});

// Fetch organizations from API
const { data: organizationsResponse, pending, error } = await useFetch('/api/organizations');

const organizations = computed(() => organizationsResponse.value?.data || []);
</script>

<template>
    <div class="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white py-24">
        <!-- Header Section -->
        <div class="container mx-auto px-4 sm:px-6 py-8">
            <div class="flex flex-col items-center mb-12">
                <div class="bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl p-6 shadow-xl rounded-2xl px-10 py-6 border border-blue-200 mb-4">
                    <h1 class="text-3xl sm:text-4xl font-bold text-white">Organisasi Sekolah</h1>
                </div>
                <p class="text-gray-600 text-center max-w-2xl text-lg">
                    Organisasi siswa di SMK Negeri 2 Singosari yang mendukung pengembangan karakter dan keterampilan siswa
                </p>
            </div>

            <!-- Loading State -->
            <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div v-for="i in 6" :key="i" class="bg-white rounded-2xl shadow-lg border-2 border-blue-100 p-6 animate-pulse">
                    <div class="flex items-center justify-center mb-6">
                        <div class="w-24 h-24 bg-gray-200 rounded-full"></div>
                    </div>
                    <div class="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
                    <div class="space-y-2">
                        <div class="h-4 bg-gray-200 rounded"></div>
                        <div class="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                </div>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="bg-white rounded-2xl shadow-xl border-2 border-red-200 p-12 text-center">
                <Icon name="lucide:alert-circle" size="64" class="text-red-400 mx-auto mb-4" />
                <h3 class="text-xl font-bold text-red-800 mb-2">Terjadi Kesalahan</h3>
                <p class="text-red-600 mb-6">Gagal memuat data organisasi. Silakan coba lagi.</p>
            </div>

            <!-- Organizations Grid -->
            <div v-else-if="organizations.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <NuxtLink
                    v-for="org in organizations"
                    :key="org.id"
                    :to="`/organisasi/${org.slug}`"
                    class="group bg-white rounded-2xl shadow-lg border-2 border-blue-100 overflow-hidden hover:shadow-2xl hover:border-blue-300 transition-all duration-300 hover:-translate-y-2"
                >
                    <!-- Logo Section -->
                    <div class="flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-white border-b-2 border-blue-100">
                        <img 
                            :src="org.logo" 
                            :alt="`Logo ${org.name}`" 
                            class="h-32 w-32 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-lg"
                        />
                    </div>

                    <!-- Content Section -->
                    <div class="p-6">
                        <h2 class="text-2xl font-bold text-gray-800 mb-3 text-center group-hover:text-blue-600 transition-colors">
                            {{ org.name }}
                        </h2>
                        <p class="text-gray-600 text-center text-sm leading-relaxed line-clamp-3 mb-4">
                            {{ org.description }}
                        </p>

                        <!-- Statistics -->
                        <div v-if="org.statistics" class="grid grid-cols-2 gap-3 mb-4">
                            <div v-if="org.statistics.members" class="bg-blue-50 rounded-lg p-3 text-center border border-blue-100">
                                <div class="text-xl font-bold text-blue-600">{{ org.statistics.members }}+</div>
                                <div class="text-xs text-gray-600">Anggota</div>
                            </div>
                            <div v-if="org.statistics.years" class="bg-orange-50 rounded-lg p-3 text-center border border-orange-100">
                                <div class="text-xl font-bold text-orange-600">{{ org.statistics.years }}</div>
                                <div class="text-xs text-gray-600">Tahun</div>
                            </div>
                        </div>

                        <!-- CTA Button -->
                        <div class="flex items-center justify-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                            <span>Lihat Detail</span>
                            <Icon name="lucide:arrow-right" size="18" class="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </NuxtLink>
            </div>

            <!-- Empty State -->
            <div v-else class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-12 text-center">
                <Icon name="lucide:users" size="64" class="text-gray-300 mx-auto mb-4" />
                <h3 class="text-xl font-bold text-gray-700 mb-2">Belum Ada Organisasi</h3>
                <p class="text-gray-500">Data organisasi akan ditampilkan di sini.</p>
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

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
