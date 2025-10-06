<script lang="ts" setup>
import { computed } from 'vue';
import type { Extracurricular } from '~/models/Extracurricular';

const route = useRoute();
const extraSlug = computed(() => route.params.extra as string);

// Fetch extracurricular data
const { data: extraResponse, pending, error } = await useFetch(`/api/extracurriculars/${extraSlug.value}`);
const extra = computed(() => extraResponse.value as Extracurricular | null);

// Fetch related extracurriculars
const { data: relatedResponse } = await useFetch('/api/extracurriculars', {
  query: { limit: 6 }
});
const relatedExtras = computed(() => {
  const all = relatedResponse.value?.data || [];
  return all.filter((e: any) => e.slug !== extraSlug.value).slice(0, 3);
});

useHead({
  title: computed(() => extra.value ? `${extra.value.name} - Ekstrakurikuler SMKN 2 Singosari` : 'Ekstrakurikuler'),
  meta: [
    {
      name: 'description',
      content: computed(() => extra.value?.description || 'Ekstrakurikuler SMK Negeri 2 Singosari')
    }
  ]
});
</script>

<template>
    <div class="py-30 min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <!-- Loading State -->
        <div v-if="pending" class="container mx-auto px-4 py-8">
            <div class="bg-white rounded-2xl shadow-xl p-8 mb-8 animate-pulse">
                <div class="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div class="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
            <div class="grid md:grid-cols-2 gap-8 mb-8">
                <div class="bg-white rounded-2xl shadow-xl p-6 animate-pulse">
                    <div class="h-64 bg-gray-200 rounded"></div>
                </div>
                <div class="space-y-4">
                    <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error || !extra" class="container mx-auto px-4 py-8">
            <div class="bg-white rounded-2xl shadow-xl border-2 border-red-100 p-12 text-center">
                <Icon name="lucide:alert-circle" size="64" class="text-red-400 mx-auto mb-4" />
                <h1 class="text-2xl font-bold text-gray-800 mb-2">Ekstrakurikuler Tidak Ditemukan</h1>
                <p class="text-gray-600 mb-6">Ekstrakurikuler yang Anda cari tidak tersedia atau telah dihapus.</p>
                <NuxtLink to="/ekstrakurikuler" class="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                    <Icon name="lucide:arrow-left" size="20" class="inline mr-2" />
                    Kembali ke Daftar
                </NuxtLink>
            </div>
        </div>

        <!-- Content -->
        <div v-else class="container mx-auto px-4 py-8">
            <!-- Breadcrumb -->
            <nav class="flex items-center space-x-2 text-sm text-gray-600 mb-6">
                <NuxtLink to="/" class="hover:text-blue-600 transition">Home</NuxtLink>
                <Icon name="lucide:chevron-right" size="16" />
                <NuxtLink to="/ekstrakurikuler" class="hover:text-blue-600 transition">Ekstrakurikuler</NuxtLink>
                <Icon name="lucide:chevron-right" size="16" />
                <span class="text-gray-800 font-semibold">{{ extra.name }}</span>
            </nav>

            <!-- Hero Section -->
            <div class="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-2xl p-8 md:p-12 text-white mb-8">
                <div class="flex items-center mb-4">
                    <div class="p-3 bg-white/20 backdrop-blur-sm rounded-full mr-4">
                        <Icon :name="extra.icon || 'lucide:activity'" size="32" />
                    </div>
                    <div>
                        <h1 class="text-4xl font-bold">{{ extra.name }}</h1>
                        <p v-if="extra.category" class="text-blue-100 text-lg mt-1">{{ extra.category }}</p>
                    </div>
                </div>
                <p class="text-lg text-blue-50">{{ extra.description }}</p>
            </div>

            <!-- Stats Cards -->
            <div class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-8 max-w-4xl mx-auto mb-8">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    <div v-if="extra.memberCount" class="text-center">
                        <p class="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{{ extra.memberCount }}+</p>
                        <p class="text-gray-600 font-medium">Anggota</p>
                    </div>
                    <div v-if="extra.achievementCount" class="text-center">
                        <p class="text-3xl md:text-4xl font-bold text-orange-600 mb-2">{{ extra.achievementCount }}+</p>
                        <p class="text-gray-600 font-medium">Juara</p>
                    </div>
                    <div v-if="extra.yearEstablished" class="text-center">
                        <p class="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{{ new Date().getFullYear() - extra.yearEstablished }}</p>
                        <p class="text-gray-600 font-medium">Tahun</p>
                    </div>
                    <div v-if="extra.meetingsPerWeek" class="text-center">
                        <p class="text-3xl md:text-4xl font-bold text-orange-600 mb-2">{{ extra.meetingsPerWeek }}</p>
                        <p class="text-gray-600 font-medium">Pertemuan</p>
                    </div>
                </div>
            </div>

            <!-- About Section -->
            <div v-if="extra.fullDescription" class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 overflow-hidden max-w-6xl mx-auto mb-8">
                <div class="grid lg:grid-cols-2 gap-0">
                    <div class="h-80 lg:h-auto">
                        <img :src="extra.image || '/images/placeholder.jpg'" :alt="extra.name" class="object-cover w-full h-full" />
                    </div>
                    <div class="p-8 md:p-10 flex flex-col justify-center">
                        <div class="bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl shadow-xl rounded-xl px-6 py-3 border border-blue-200 inline-block mb-6 w-fit">
                            <h2 class="text-2xl md:text-3xl font-bold text-white">Tentang</h2>
                        </div>
                        <div class="text-gray-700 leading-relaxed text-lg prose prose-lg max-w-none" v-html="extra.fullDescription"></div>
                    </div>
                </div>
            </div>

            <!-- Information Cards -->
            <div class="grid md:grid-cols-2 gap-8 mb-8 max-w-6xl mx-auto">
                <!-- Info Card -->
                <div class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-6">
                    <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                        <Icon name="lucide:info" size="24" class="text-blue-600 mr-2" />
                        Informasi
                    </h2>
                    <div class="space-y-4">
                        <div v-if="extra.coach" class="flex items-start">
                            <Icon name="lucide:user" size="20" class="text-blue-600 mr-3 mt-0.5" />
                            <div>
                                <p class="font-semibold text-gray-700">Pembina</p>
                                <p class="text-gray-600">{{ extra.coach }}</p>
                            </div>
                        </div>
                        <div v-if="extra.schedule" class="flex items-start">
                            <Icon name="lucide:calendar" size="20" class="text-blue-600 mr-3 mt-0.5" />
                            <div>
                                <p class="font-semibold text-gray-700">Jadwal</p>
                                <p class="text-gray-600">{{ extra.schedule }}</p>
                            </div>
                        </div>
                        <div v-if="extra.location" class="flex items-start">
                            <Icon name="lucide:map-pin" size="20" class="text-blue-600 mr-3 mt-0.5" />
                            <div>
                                <p class="font-semibold text-gray-700">Lokasi</p>
                                <p class="text-gray-600">{{ extra.location }}</p>
                            </div>
                        </div>
                        <div v-if="extra.fee" class="flex items-start">
                            <Icon name="lucide:wallet" size="20" class="text-orange-600 mr-3 mt-0.5" />
                            <div>
                                <p class="font-semibold text-gray-700">Biaya</p>
                                <p class="text-orange-600 font-bold">{{ extra.fee }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Requirements Card -->
                <div v-if="extra.requirements && extra.requirements.length > 0" class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-6">
                    <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                        <Icon name="lucide:clipboard-check" size="24" class="text-blue-600 mr-2" />
                        Persyaratan
                    </h2>
                    <ul class="space-y-3">
                        <li v-for="(req, idx) in extra.requirements" :key="idx" class="flex items-start text-gray-700">
                            <Icon name="lucide:check-circle" size="20" class="text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                            <span>{{ req }}</span>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Activities Section -->
            <div v-if="extra.activities && extra.activities.length > 0" class="max-w-6xl mx-auto mb-8">
                <div class="text-center mb-12">
                    <div class="bg-gradient-to-r from-orange-500 to-orange-600 backdrop-blur-2xl shadow-xl rounded-2xl px-10 py-6 border border-orange-200 inline-block mb-4">
                        <h2 class="text-3xl md:text-4xl font-bold text-white">Aktivitas Terkait</h2>
                    </div>
                    <p class="text-gray-600 text-lg">Berbagai kegiatan dan prestasi yang telah dicapai</p>
                </div>
                
                <div class="grid md:grid-cols-2 gap-8">
                    <div 
                        v-for="(activity, idx) in extra.activities" 
                        :key="idx"
                        class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-blue-200 transition-all duration-300"
                    >
                        <img :src="activity.image || '/images/placeholder.jpg'" :alt="activity.title" class="object-cover w-full h-56" />
                        <div class="p-6">
                            <h3 class="text-xl font-bold text-gray-800 mb-3">{{ activity.title }}</h3>
                            <p class="text-gray-600 leading-relaxed mb-4">{{ activity.description }}</p>
                            <div v-if="activity.date" class="flex items-center text-blue-600 font-semibold">
                                <Icon name="lucide:calendar" size="18" class="mr-2" />
                                <span>{{ activity.date }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Registration Section -->
            <div v-if="extra.registrationOpen" class="max-w-5xl mx-auto mb-8">
                <div class="text-center mb-12">
                    <div class="bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl shadow-xl rounded-2xl px-10 py-6 border border-blue-200 inline-block mb-4">
                        <h2 class="text-3xl md:text-4xl font-bold text-white">Informasi Pendaftaran</h2>
                    </div>
                    <p class="text-gray-600 text-lg">Bergabunglah dengan ekstrakurikuler {{ extra.name.toLowerCase() }} dan kembangkan potensi Anda</p>
                </div>
                
                <div class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-8 md:p-12">
                    <div v-if="extra.registrationPeriod" class="bg-gradient-to-r from-blue-50 to-orange-50 border-2 border-blue-200 rounded-xl p-6 text-center mb-8">
                        <p class="text-2xl font-bold text-blue-800 mb-2">{{ extra.registrationPeriod }}</p>
                        <p v-if="extra.contactInfo" class="text-gray-700 mb-4">Untuk informasi lebih lanjut, hubungi:</p>
                        <div class="flex flex-col md:flex-row items-center justify-center gap-4 text-gray-700">
                            <div v-if="extra.contactInfo" class="flex items-center">
                                <Icon name="lucide:phone" size="18" class="mr-2 text-blue-600" />
                                <span class="font-semibold">{{ extra.contactInfo }}</span>
                            </div>
                            <span v-if="extra.contactInfo && extra.location" class="hidden md:inline text-gray-400">|</span>
                            <div v-if="extra.location" class="flex items-center">
                                <Icon name="lucide:map-pin" size="18" class="mr-2 text-orange-600" />
                                <span>{{ extra.location }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Related Extracurriculars -->
            <div v-if="relatedExtras.length > 0" class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <Icon name="lucide:sparkles" size="24" class="text-blue-600 mr-2" />
                    Ekstrakurikuler Lainnya
                </h2>
                <div class="grid md:grid-cols-3 gap-6">
                    <NuxtLink
                        v-for="related in relatedExtras"
                        :key="related.id"
                        :to="`/ekstrakurikuler/${related.slug}`"
                        class="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg border-2 border-blue-100 p-6 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 group text-center"
                    >
                        <div class="inline-block p-4 bg-blue-100 rounded-full mb-4 group-hover:bg-blue-200 transition-colors">
                            <Icon :name="related.icon || 'lucide:activity'" size="32" class="text-blue-600" />
                        </div>
                        <h3 class="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-2">
                            {{ related.name }}
                        </h3>
                        <p v-if="related.category" class="text-sm text-blue-600 font-semibold">{{ related.category }}</p>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>
