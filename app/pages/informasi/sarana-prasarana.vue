<script lang="ts" setup>
import { ref } from "vue";

const searchQuery = ref("");

useHead({
  title: "Sarana Prasarana - Informasi - SMKN 2 Singosari",
  meta: [
    {
      name: "description",
      content: "Fasilitas sarana dan prasarana yang tersedia di SMK Negeri 2 Singosari untuk mendukung pembelajaran.",
    },
  ],
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
    <section class="py-20 pt-32">
      <div class="container max-w-6xl px-4 mx-auto sm:px-6">
        <div class="mb-12">
          <div
            class="inline-block px-10 py-6 mb-6 border border-blue-200 shadow-xl bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl rounded-2xl"
          >
            <h2 class="text-3xl font-bold text-white">Sarana</h2>
          </div>
          <div class="p-8 bg-white border-2 border-blue-100 shadow-xl rounded-2xl">
            <div class="py-4 pl-6 border-l-4 border-blue-600">
              <p class="leading-relaxed text-justify text-gray-700">
                ini adalah tempat dimana sejarah dari suatu organisasi di jelaskan jadi ini berisi penjelasan dari
                organisasi tertentu ini adalah tempat dimana sejarah dari suatu organisasi di jelaskan jadi ini berisi
                penjelasan dari organisasi tertentu ini adalah tempat dimana sejarah dari suatu organisasi di jelaskan
                jadi ini berisi penjelasan dari organisasi tertentu ini adalah tempat dimana sejarah dari suatu
                organisasi di jelaskan jadi ini berisi penjelasan dari organisasi tertentu
              </p>
            </div>
          </div>
        </div>

        <div class="mb-12">
          <div
            class="inline-block px-10 py-6 mb-6 border border-orange-200 shadow-xl bg-gradient-to-r from-orange-500 to-orange-600 backdrop-blur-2xl rounded-2xl"
          >
            <h2 class="text-3xl font-bold text-white">Prasarana</h2>
          </div>
          <div class="p-8 bg-white border-2 border-orange-100 shadow-xl rounded-2xl">
            <div class="py-4 pl-6 border-l-4 border-orange-600">
              <p class="leading-relaxed text-justify text-gray-700">
                ini adalah tempat dimana sejarah dari suatu organisasi di jelaskan jadi ini berisi penjelasan dari
                organisasi tertentu ini adalah tempat dimana sejarah dari suatu organisasi di jelaskan jadi ini berisi
                penjelasan dari organisasi tertentu ini adalah tempat dimana sejarah dari suatu organisasi di jelaskan
                jadi ini berisi penjelasan dari organisasi tertentu ini adalah tempat dimana sejarah dari suatu
                organisasi di jelaskan jadi ini berisi penjelasan dari organisasi tertentu
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20">
      <div class="container px-4 mx-auto sm:px-6">
        <div class="mb-12 text-center">
          <div
            class="inline-block px-10 py-6 mb-6 border border-blue-200 shadow-xl bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl rounded-2xl"
          >
            <h2 class="text-3xl font-bold text-white md:text-4xl">Daftar Sarana dan Prasarana</h2>
          </div>
        </div>

        <div class="flex flex-wrap justify-center gap-4 mb-10">
          <button
            class="px-8 py-3 font-semibold transition-all bg-white border-2 border-blue-100 shadow-md hover:border-blue-600 hover:text-blue-600 rounded-xl hover:shadow-lg"
          >
            Sarana Pembelajaran
          </button>
          <button
            class="px-8 py-3 font-semibold transition-all bg-white border-2 border-orange-100 shadow-md hover:border-orange-600 hover:text-orange-600 rounded-xl hover:shadow-lg"
          >
            Sarana Infrastruktur
          </button>
        </div>

        <div class="max-w-2xl mx-auto mb-12">
          <div class="relative">
            <Icon name="lucide:search" size="20" class="absolute text-gray-400 -translate-y-1/2 left-4 top-1/2" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari fasilitas..."
              class="w-full py-4 pl-12 pr-4 transition border-2 border-gray-200 shadow-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div class="max-w-6xl gap-6 mx-auto space-y-6">
          <div
            v-for="index in 3"
            :key="index"
            class="overflow-hidden transition-all bg-white border-2 border-blue-100 shadow-xl rounded-2xl hover:shadow-2xl hover:border-blue-200 group"
          >
            <div class="relative h-80">
              <NuxtImg
                src="/images/bg-aula.webp"
                :alt="`Fasilitas ${index}`"
                class="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div class="absolute bottom-0 left-0 z-10 p-8">
                <h3 class="mb-2 text-3xl font-bold leading-tight text-white">
                  LINGKUP KERJA<br />
                  SISWA KEJURUAN
                </h3>
                <button
                  class="inline-flex items-center px-4 py-2 mt-4 font-semibold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                >
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
