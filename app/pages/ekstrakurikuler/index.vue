<script lang="ts" setup>
import { ref, computed } from 'vue';
import type { Extracurricular } from '~/models/Extracurricular';

const isDialogOpen = ref(false);
const searchQuery = ref('');
const selectedCategory = ref('Semua');

const openDialog = () => {
  isDialogOpen.value = true;
  document.body.style.overflow = 'hidden';
};

const closeDialog = () => {
  isDialogOpen.value = false;
  document.body.style.overflow = '';
};

// Fetch organizations
const { data: organizationsResponse } = await useFetch('/api/organizations');
const organizations = computed(() => organizationsResponse.value?.data || []);

// Fetch extracurriculars
const { data: extracurricularsResponse, pending, error } = await useFetch('/api/extracurriculars');
const extracurriculars = computed(() => extracurricularsResponse.value?.data || []);

// Categories
const categories = computed(() => {
  const cats = new Set<string>(['Semua']);
  extracurriculars.value.forEach((extra: any) => {
    if (extra.category) cats.add(extra.category);
  });
  return Array.from(cats);
});

// Filtered organizations by search
const filteredOrganizations = computed(() => {
  if (!searchQuery.value.trim()) return organizations.value;
  const query = searchQuery.value.toLowerCase();
  return organizations.value.filter((org: any) => 
    org.name.toLowerCase().includes(query) || 
    org.description?.toLowerCase().includes(query)
  );
});

// Filtered extracurriculars by category and search
const filteredExtracurriculars = computed(() => {
  let filtered = extracurriculars.value;
  
  if (selectedCategory.value !== 'Semua') {
    filtered = filtered.filter((extra: any) => extra.category === selectedCategory.value);
  }
  
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter((extra: any) => 
      extra.name.toLowerCase().includes(query) ||
      extra.description?.toLowerCase().includes(query)
    );
  }
  
  return filtered;
});

useHead({
  title: 'Ekstrakurikuler - SMKN 2 Singosari',
  meta: [
    {
      name: 'description',
      content: 'Daftar ekstrakurikuler dan organisasi di SMK Negeri 2 Singosari. Kembangkan bakat dan minatmu!'
    }
  ]
});
</script>

<template>
    <div class="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white py-24">
        <div class="container mx-auto px-4 sm:px-6 py-8">
            <!-- Header Section -->
            <div class="flex flex-col items-center mb-12">
                <div class="bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl p-6 shadow-xl rounded-2xl px-10 py-6 border border-blue-200 mb-4">
                    <h1 class="text-3xl sm:text-4xl font-bold text-white">Ekstrakurikuler & Organisasi</h1>
                </div>
                <p class="text-gray-600 text-center max-w-2xl">Kembangkan bakat dan minatmu di SMK Negeri 2 Singosari</p>
            </div>

            <!-- Stats Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
                <div class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-8 text-center hover:shadow-2xl transition-shadow">
                    <div class="inline-block p-4 bg-blue-100 rounded-full mb-4">
                        <Icon name="lucide:users" size="32" class="text-blue-600" />
                    </div>
                    <h2 class="text-5xl font-bold text-blue-600 mb-2">{{ organizations.length }}</h2>
                    <p class="text-lg font-semibold text-gray-700">Organisasi</p>
                </div>
                <div class="bg-white rounded-2xl shadow-xl border-2 border-orange-100 p-8 text-center hover:shadow-2xl transition-shadow">
                    <div class="inline-block p-4 bg-orange-100 rounded-full mb-4">
                        <Icon name="lucide:trophy" size="32" class="text-orange-600" />
                    </div>
                    <h2 class="text-5xl font-bold text-orange-600 mb-2">{{ extracurriculars.length }}</h2>
                    <p class="text-lg font-semibold text-gray-700">Ekstrakurikuler</p>
                </div>
            </div>

            <!-- Organisasi Section -->
            <section class="mb-20">
                <div class="text-center mb-10">
                    <div class="bg-gradient-to-r from-orange-500 to-orange-600 backdrop-blur-2xl p-6 shadow-xl rounded-2xl px-10 py-6 border border-orange-200 inline-block mb-4">
                        <h2 class="text-3xl font-bold text-white">Organisasi Sekolah</h2>
                    </div>
                    <p class="text-gray-600 max-w-2xl mx-auto">
                        Kembangkan dan asah kemampuanmu dengan ikut organisasi yang ada di SMK Negeri 2 Singosari
                    </p>
                </div>

                <!-- Search Bar -->
                <div class="max-w-md mx-auto mb-10">
                    <div class="relative">
                        <Icon name="lucide:search" size="20" class="absolute left-4 top-3.5 text-gray-400" />
                        <input
                            v-model="searchQuery"
                            type="text"
                            placeholder="Cari Organisasi atau Ekstrakurikuler..."
                            class="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>
                </div>

                <!-- Organisasi Grid -->
                <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div v-for="i in 6" :key="i" class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-pulse">
                        <div class="h-48 bg-gray-200"></div>
                        <div class="p-6">
                            <div class="h-6 bg-gray-200 rounded mb-2"></div>
                            <div class="h-4 bg-gray-200 rounded w-2/3"></div>
                        </div>
                    </div>
                </div>

                <div v-else-if="filteredOrganizations.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <NuxtLink
                        v-for="org in filteredOrganizations"
                        :key="org.id"
                        :to="`/organisasi/${org.slug}`"
                        class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-blue-200 transition-all duration-300 group"
                    >
                        <div class="h-48 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center p-6">
                            <img :src="org.logo" :alt="`Logo ${org.name}`" class="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div class="p-6">
                            <h3 class="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-2">{{ org.name }}</h3>
                            <p class="text-gray-600 text-sm line-clamp-2">{{ org.description }}</p>
                        </div>
                    </NuxtLink>
                </div>

                <div v-else class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-12 text-center mb-8">
                    <Icon name="lucide:search-x" size="64" class="text-gray-300 mx-auto mb-4" />
                    <h3 class="text-xl font-bold text-gray-700 mb-2">Organisasi Tidak Ditemukan</h3>
                    <p class="text-gray-500">Coba kata kunci lain atau hapus filter pencarian.</p>
                </div>
            </section>

            <!-- Ekstrakurikuler Section -->
            <section class="mb-20">
                <div class="text-center mb-10">
                    <div class="bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl p-6 shadow-xl rounded-2xl px-10 py-6 border border-blue-200 inline-block mb-4">
                        <h2 class="text-3xl font-bold text-white">Ekstrakurikuler</h2>
                    </div>
                    <p class="text-gray-600 max-w-2xl mx-auto mb-8">
                        Pilih ekstrakurikuler sesuai minat dan bakatmu
                    </p>
                </div>

                <!-- Category Filter -->
                <div class="flex flex-wrap justify-center gap-3 mb-10">
                    <button
                        v-for="category in categories"
                        :key="category"
                        @click="selectedCategory = category"
                        :class="[
                            'px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border-2',
                            selectedCategory === category
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-white text-gray-700 hover:bg-blue-600 hover:text-white border-gray-200 hover:border-blue-600'
                        ]"
                    >
                        {{ category }}
                    </button>
                </div>

                <!-- Ekstrakurikuler Grid -->
                <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="i in 9" :key="i" class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-pulse">
                        <div class="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                        <div class="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
                    </div>
                </div>

                <div v-else-if="filteredExtracurriculars.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <NuxtLink
                        v-for="extra in filteredExtracurriculars"
                        :key="extra.id"
                        :to="`/ekstrakurikuler/${extra.slug}`"
                        class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 group text-center"
                    >
                        <div class="inline-block p-4 bg-blue-100 rounded-full mb-4 group-hover:bg-blue-200 transition-colors">
                            <Icon :name="extra.icon || 'lucide:activity'" size="32" class="text-blue-600" />
                        </div>
                        <h3 class="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-2">{{ extra.name }}</h3>
                        <p v-if="extra.description" class="text-sm text-gray-600 line-clamp-2">{{ extra.description }}</p>
                        <p v-if="extra.category" class="text-xs text-blue-600 font-semibold mt-2">{{ extra.category }}</p>
                    </NuxtLink>
                </div>

                <div v-else class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-12 text-center">
                    <Icon name="lucide:search-x" size="64" class="text-gray-300 mx-auto mb-4" />
                    <h3 class="text-xl font-bold text-gray-700 mb-2">Ekstrakurikuler Tidak Ditemukan</h3>
                    <p class="text-gray-500 mb-6">
                        {{ searchQuery ? 'Coba kata kunci lain atau' : '' }} 
                        {{ selectedCategory !== 'Semua' ? 'Pilih kategori lain' : 'Belum ada ekstrakurikuler terdaftar' }}
                    </p>
                    <button v-if="selectedCategory !== 'Semua' || searchQuery" @click="selectedCategory = 'Semua'; searchQuery = ''" class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                        Reset Filter
                    </button>
                </div>
            </section>

            <!-- CTA Section -->
            <section class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-8 md:p-12 text-center max-w-3xl mx-auto">
                <Icon name="lucide:lightbulb" size="48" class="text-orange-500 mx-auto mb-4" />
                <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                    Tidak Menemukan Ekstrakurikuler Yang Kamu Inginkan?
                </h2>
                <p class="text-lg text-gray-600 mb-6">
                    Tenang! Kamu bisa membuat komunitas ekstrakurikuler baru di SMK Negeri 2 Singosari
                </p>
                <button
                    @click="openDialog"
                    class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                >
                    Lihat Caranya
                    <Icon name="lucide:arrow-right" size="18" />
                </button>
            </section>
        </div>

        <!-- Dialog Modal -->
        <Teleport to="body">
            <Transition name="dialog">
                <div
                    v-if="isDialogOpen"
                    class="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4"
                    @click.self="closeDialog"
                >
                    <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-blue-100">
                        <!-- Dialog Header -->
                        <div class="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-800 rounded-t-2xl">
                            <h2 class="text-2xl font-bold text-white">Cara Membuat Ekstrakurikuler Baru</h2>
                            <button @click="closeDialog" class="text-white hover:text-gray-200 transition-colors">
                                <Icon name="lucide:x" size="24" />
                            </button>
                        </div>

                        <!-- Dialog Content -->
                        <div class="p-6 space-y-6">
                            <!-- Step 1 -->
                            <div class="flex gap-4">
                                <div class="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                    <span class="text-lg font-bold text-white">1</span>
                                </div>
                                <div>
                                    <h3 class="font-bold text-gray-800 mb-2 text-lg">Persyaratan</h3>
                                    <p class="text-gray-600 leading-relaxed">
                                        Untuk menjadi ketua ekstrakurikuler, kamu harus berusia minimal 16 tahun, bersekolah di SMKN 2 Singosari, dan lulus tes leadership.
                                    </p>
                                </div>
                            </div>

                            <!-- Step 2 -->
                            <div class="flex gap-4">
                                <div class="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                    <span class="text-lg font-bold text-white">2</span>
                                </div>
                                <div>
                                    <h3 class="font-bold text-gray-800 mb-2 text-lg">Proses Pendaftaran</h3>
                                    <p class="text-gray-600 leading-relaxed">
                                        Ajukan proposal ekstrakurikuler baru kepada pihak sekolah dengan detail kegiatan dan tujuan yang jelas.
                                    </p>
                                </div>
                            </div>

                            <!-- Step 3 -->
                            <div class="flex gap-4">
                                <div class="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                    <span class="text-lg font-bold text-white">3</span>
                                </div>
                                <div>
                                    <h3 class="font-bold text-gray-800 mb-2 text-lg">Butuh Bantuan?</h3>
                                    <p class="text-gray-600 leading-relaxed mb-4">
                                        Jika masih bingung, silahkan hubungi kontak di bawah ini:
                                    </p>

                                    <!-- Contact Cards -->
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div class="bg-blue-50 border-2 border-blue-100 rounded-xl p-4">
                                            <div class="flex items-center gap-2 mb-3">
                                                <Icon name="lucide:instagram" size="20" class="text-pink-600" />
                                                <span class="font-semibold text-gray-800">Instagram</span>
                                            </div>
                                            <div class="space-y-2 text-sm">
                                                <p class="text-gray-700">@dika_abid_21</p>
                                                <p class="text-gray-700">@andika_alrizalianty</p>
                                            </div>
                                        </div>

                                        <div class="bg-green-50 border-2 border-green-100 rounded-xl p-4">
                                            <div class="flex items-center gap-2 mb-3">
                                                <Icon name="lucide:message-circle" size="20" class="text-green-600" />
                                                <span class="font-semibold text-gray-800">WhatsApp</span>
                                            </div>
                                            <div class="space-y-2 text-sm">
                                                <p class="text-gray-700">085859731672</p>
                                                <p class="text-gray-700">+62 85845980017</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Dialog Footer -->
                        <div class="flex justify-center p-6 border-t border-gray-200">
                            <button @click="closeDialog" class="text-gray-600 hover:text-gray-800 font-semibold inline-flex items-center gap-2">
                                <Icon name="lucide:arrow-left" size="18" />
                                Kembali
                            </button>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<style scoped>
.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.3s ease;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}
</style>
