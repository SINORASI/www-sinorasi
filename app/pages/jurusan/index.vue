<script lang="ts" setup>
import type { MajorData } from "~/models/MajorData";
import type { MajorName } from "~/models/MajorName";

const { data: majorDatas } = await useFetch<Record<MajorName, MajorData>>("/api/majors");

const showBackToTop = ref(false);

useHead({
  title: "Jurusan - SMKN 2 Singosari",
  meta: [
    {
      name: "description",
      content: "Jelajahi semua program keahlian yang tersedia di SMK Negeri 2 Singosari",
    },
  ],
});
</script>

<template>
  <main class="min-h-screen py-36 bg-gray-50">
    <div class="container px-4 mx-auto">
      
      <div class="mb-12 text-center">
        <div class="inline-block">
          <span
            class="px-4 py-2 text-sm font-bold tracking-widest text-gray-700 uppercase bg-gray-200 rounded-full md:text-base"
          >
            Program Keahlian
          </span>
        </div>
        <h1 class="mt-4 text-3xl font-extrabold text-gray-800 md:text-5xl">Semua Jurusan SMKN 2 Singosari</h1>
        <p class="max-w-2xl mx-auto mt-4 text-sm text-gray-600 md:text-lg">
          Jelajahi berbagai program keahlian yang tersedia di SMK Negeri 2 Singosari. Temukan jurusan yang sesuai dengan
          minat dan bakat Anda.
        </p>
      </div>

      
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div
          v-for="(majorData, majorKey) in majorDatas"
          :key="majorKey"
          class="p-6 transition-all duration-300 transform bg-white shadow-lg rounded-2xl hover:shadow-xl hover:-translate-y-1"
        >
          
          <div class="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full">
            <img :src="majorData.logo" :alt="`${majorData.short} Logo`" class="object-contain w-10 h-10" />
          </div>

          
          <h3 class="mb-3 text-xl font-bold text-center text-gray-800">
            {{ majorData.nameMajor }}
          </h3>

          
          <p class="mb-4 text-sm text-center text-gray-600">
            {{ majorData.description }}
          </p>

          
          <div class="mb-4">
            <h4 class="mb-2 text-sm font-semibold text-gray-700">Prasyarat:</h4>
            <ul class="text-xs text-gray-600 list-disc list-inside">
              <li v-for="prereq in majorData.prerequisites" :key="prereq">{{ prereq }}</li>
            </ul>
          </div>

          
          <div class="mb-4">
            <h4 class="mb-2 text-sm font-semibold text-gray-700">Mata Pelajaran Utama:</h4>
            <ul class="text-xs text-gray-600 list-disc list-inside">
              <li v-for="course in majorData.relatedCourses" :key="course">{{ course }}</li>
            </ul>
          </div>

          
          <div class="text-center">
            <NuxtLink
              :to="`/jurusan/${majorKey}`"
              class="inline-block px-6 py-3 text-sm font-semibold text-white transition-all duration-300 bg-blue-600 rounded-lg hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5"
            >
              Lihat Detail
            </NuxtLink>
          </div>
        </div>
      </div>

      
      <div class="mt-12 text-center">
        <NuxtLink
          to="/#jurusan"
          class="inline-flex items-center gap-2 px-8 py-4 font-semibold text-white transition-all duration-300 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5"
        >
          <Icon name="lucide:arrow-left" size="18" />
          Kembali ke Beranda
        </NuxtLink>
      </div>
    </div>
  </main>
</template>
