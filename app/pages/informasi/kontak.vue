<script setup lang="ts">
import { ref } from "vue";

const slides = ref([
  { id: 1, text: "Photo" },
  { id: 2, text: "Another Photo" },
]);

const currentIndex = ref(0);

const goToSlide = (index: number) => {
  currentIndex.value = index;
};

useHead({
  title: "Kontak - Informasi - SMKN 2 Singosari",
  meta: [
    {
      name: "description",
      content: "Hubungi kami di SMK Negeri 2 Singosari. Informasi kontak dan lokasi sekolah.",
    },
  ],
});
</script>

<template>
  <div class="min-h-screen py-24 bg-gradient-to-b from-white via-blue-50 to-white">
    <div class="container px-4 mx-auto sm:px-6">
      <!-- Page Header -->
      <div class="mb-12 text-center">
        <div
          class="inline-block px-10 py-6 mb-4 border border-blue-200 shadow-xl bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl rounded-2xl"
        >
          <h1 class="text-3xl font-bold text-white md:text-4xl">Hubungi Kami</h1>
        </div>
        <p class="max-w-2xl mx-auto text-lg text-gray-600">Informasi kontak dan lokasi SMK Negeri 2 Singosari</p>
      </div>

      <!-- Contact Cards -->
      <div class="grid max-w-5xl grid-cols-1 gap-6 mx-auto mb-16 md:grid-cols-3">
        <div
          class="p-8 text-center transition-shadow bg-white border-2 border-blue-100 shadow-xl rounded-2xl hover:shadow-2xl"
        >
          <div class="inline-block p-4 mb-4 bg-blue-100 rounded-full">
            <Icon name="lucide:map-pin" size="32" class="text-blue-600" />
          </div>
          <h3 class="mb-3 text-xl font-bold text-gray-800">Alamat</h3>
          <p class="leading-relaxed text-gray-600">
            SMK Negeri 2 Singosari<br />
            Jl. Raya Singosari No. 123<br />
            Singosari, Malang, Jawa Timur 65153
          </p>
        </div>

        <div
          class="p-8 text-center transition-shadow bg-white border-2 border-orange-100 shadow-xl rounded-2xl hover:shadow-2xl"
        >
          <div class="inline-block p-4 mb-4 bg-orange-100 rounded-full">
            <Icon name="lucide:phone" size="32" class="text-orange-600" />
          </div>
          <h3 class="mb-3 text-xl font-bold text-gray-800">Telepon</h3>
          <p class="leading-relaxed text-gray-600">(0341) 123-4567</p>
        </div>

        <div
          class="p-8 text-center transition-shadow bg-white border-2 border-blue-100 shadow-xl rounded-2xl hover:shadow-2xl"
        >
          <div class="inline-block p-4 mb-4 bg-blue-100 rounded-full">
            <Icon name="lucide:mail" size="32" class="text-blue-600" />
          </div>
          <h3 class="mb-3 text-xl font-bold text-gray-800">Email</h3>
          <p class="leading-relaxed text-gray-600">info@smkn2singosari.sch.id</p>
        </div>
      </div>

      <!-- Map Section -->
      <div class="max-w-5xl mx-auto">
        <div
          class="inline-block px-10 py-6 mb-8 border border-orange-200 shadow-xl bg-gradient-to-r from-orange-500 to-orange-600 backdrop-blur-2xl rounded-2xl"
        >
          <h2 class="text-2xl font-bold text-white">Lokasi Sekolah</h2>
        </div>

        <div class="p-8 bg-white border-2 border-blue-100 shadow-xl rounded-2xl">
          <div class="flex items-center justify-center bg-gray-100 border-2 border-gray-200 aspect-video rounded-xl">
            <div class="text-center">
              <Icon name="lucide:map" size="48" class="mx-auto mb-3 text-gray-400" />
              <p class="text-gray-500">Embedded Google Map here</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Image Carousel Section -->
      <div class="max-w-5xl mx-auto mt-16">
        <div
          class="inline-block px-10 py-6 mb-8 border border-blue-200 shadow-xl bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl rounded-2xl"
        >
          <h2 class="text-2xl font-bold text-white">Galeri Sekolah</h2>
        </div>

        <div class="p-8 bg-white border-2 border-blue-100 shadow-xl rounded-2xl">
          <div
            class="relative flex items-center justify-center bg-gray-100 border-2 border-gray-200 rounded-xl aspect-video"
          >
            <span class="text-xl font-semibold text-gray-500">
              {{ slides[currentIndex]?.text }}
            </span>
          </div>

          <div class="flex items-center justify-center mt-6 space-x-3">
            <button
              v-for="(slide, index) in slides"
              :key="slide.id"
              @click="goToSlide(index)"
              :class="[
                'w-3 h-3 rounded-full transition-all duration-300 ease-in-out',
                currentIndex === index ? 'bg-blue-600 w-8' : 'bg-gray-300 hover:bg-gray-400',
              ]"
              :aria-label="'Go to slide ' + (index + 1)"
            ></button>
          </div>
        </div>
      </div>

      <!-- Social Media Section -->
      <div class="max-w-5xl mx-auto mt-16">
        <div class="p-8 text-center bg-white border-2 border-blue-100 shadow-xl rounded-2xl">
          <h3 class="mb-6 text-2xl font-bold text-gray-800">Ikuti Kami</h3>
          <div class="flex justify-center gap-4">
            <a
              href="#"
              class="inline-flex items-center justify-center w-12 h-12 transition-all bg-blue-100 rounded-full hover:bg-blue-600 hover:text-white"
            >
              <Icon name="lucide:facebook" size="24" />
            </a>
            <a
              href="#"
              class="inline-flex items-center justify-center w-12 h-12 transition-all bg-blue-100 rounded-full hover:bg-blue-600 hover:text-white"
            >
              <Icon name="lucide:instagram" size="24" />
            </a>
            <a
              href="#"
              class="inline-flex items-center justify-center w-12 h-12 transition-all bg-blue-100 rounded-full hover:bg-blue-600 hover:text-white"
            >
              <Icon name="lucide:youtube" size="24" />
            </a>
            <a
              href="#"
              class="inline-flex items-center justify-center w-12 h-12 transition-all bg-blue-100 rounded-full hover:bg-blue-600 hover:text-white"
            >
              <Icon name="lucide:twitter" size="24" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
