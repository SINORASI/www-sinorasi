<script lang="ts" setup>
import { ref } from 'vue';

const searchQuery = ref('');

useHead({
  title: 'Sarana Prasarana - Informasi - SMKN 2 Singosari',
  meta: [
    {
      name: 'description',
      content: 'Fasilitas sarana dan prasarana yang tersedia di SMK Negeri 2 Singosari untuk mendukung pembelajaran.'
    }
  ]
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
    <!-- Hero Section -->
    <section class="relative h-[500px] flex items-center justify-center">
      <div class="absolute inset-0 bg-gray-400"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-blue-900/70"></div>
      <div class="relative z-10">
        <div class="bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl shadow-xl rounded-2xl px-10 py-6 border border-blue-200">
          <h1 class="text-4xl md:text-5xl font-bold text-white tracking-wide">Sarana Dan Prasarana</h1>
        </div>
      </div>
    </section>

    <!-- Content Sections -->
    <section class="py-20">
      <div class="container mx-auto px-4 sm:px-6 max-w-6xl">
        <!-- Sarana Section -->
        <div class="mb-12">
          <div class="bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl shadow-xl rounded-2xl px-10 py-6 border border-blue-200 inline-block mb-6">
            <h2 class="text-3xl font-bold text-white">Sarana</h2>
          </div>
          <div class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-8">
            <div class="border-l-4 border-blue-600 pl-6 py-4">
              <p class="text-gray-700 leading-relaxed text-justify">
                ini adalah tempat dimana sejarah dari suatu organisasi di jelaskan jadi ini berisi penjelasan dari organisasi tertentu ini adalah tempat dimana sejarah dari suatu organisasi di jelaskan jadi ini berisi penjelasan dari organisasi tertentu ini adalah tempat dimana sejarah dari suatu organisasi di jelaskan jadi ini berisi penjelasan dari organisasi tertentu ini adalah tempat dimana sejarah dari suatu organisasi di jelaskan jadi ini berisi penjelasan dari organisasi tertentu
              </p>
            </div>
          </div>
        </div>

        <!-- Prasarana Section -->
        <div class="mb-12">
          <div class="bg-gradient-to-r from-orange-500 to-orange-600 backdrop-blur-2xl shadow-xl rounded-2xl px-10 py-6 border border-orange-200 inline-block mb-6">
            <h2 class="text-3xl font-bold text-white">Prasarana</h2>
          </div>
          <div class="bg-white rounded-2xl shadow-xl border-2 border-orange-100 p-8">
            <div class="border-l-4 border-orange-600 pl-6 py-4">
              <p class="text-gray-700 leading-relaxed text-justify">
                ini adalah tempat dimana sejarah dari suatu organisasi di jelaskan jadi ini berisi penjelasan dari organisasi tertentu ini adalah tempat dimana sejarah dari suatu organisasi di jelaskan jadi ini berisi penjelasan dari organisasi tertentu ini adalah tempat dimana sejarah dari suatu organisasi di jelaskan jadi ini berisi penjelasan dari organisasi tertentu ini adalah tempat dimana sejarah dari suatu organisasi di jelaskan jadi ini berisi penjelasan dari organisasi tertentu
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Facilities List Section -->
    <section class="py-20">
      <div class="container mx-auto px-4 sm:px-6">
        <!-- Section Title -->
        <div class="text-center mb-12">
          <div class="bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl shadow-xl rounded-2xl px-10 py-6 border border-blue-200 inline-block mb-6">
            <h2 class="text-3xl md:text-4xl font-bold text-white">Daftar Sarana dan Prasarana</h2>
          </div>
        </div>

        <!-- Category Buttons -->
        <div class="flex flex-wrap justify-center gap-4 mb-10">
          <button class="bg-white border-2 border-blue-100 hover:border-blue-600 hover:text-blue-600 rounded-xl py-3 px-8 font-semibold shadow-md hover:shadow-lg transition-all">
            Sarana Pembelajaran
          </button>
          <button class="bg-white border-2 border-orange-100 hover:border-orange-600 hover:text-orange-600 rounded-xl py-3 px-8 font-semibold shadow-md hover:shadow-lg transition-all">
            Sarana Infrastruktur
          </button>
        </div>

        <!-- Search Bar -->
        <div class="max-w-2xl mx-auto mb-12">
          <div class="relative">
            <Icon name="lucide:search" size="20" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari fasilitas..."
              class="w-full py-4 pl-12 pr-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm"
            />
          </div>
        </div>

        <!-- Facilities Grid -->
        <div class="max-w-6xl mx-auto space-y-6">
          <div 
            v-for="index in 3" 
            :key="index" 
            class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 overflow-hidden hover:shadow-2xl hover:border-blue-200 transition-all group"
          >
            <div class="relative h-80">
              <img 
                src="/images/background-aula.jpg" 
                :alt="`Fasilitas ${index}`"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div class="absolute bottom-0 left-0 p-8 z-10">
                <h3 class="text-white text-3xl font-bold leading-tight mb-2">
                  LINGKUP KERJA<br />
                  SISWA KEJURUAN
                </h3>
                <button class="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                  Lihat Detail
                  <Icon name="lucide:arrow-right" size="18" class="ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>