<script setup lang="ts">
import { ref } from 'vue';

const slides = ref([
  { id: 1, text: 'Photo' },
  { id: 2, text: 'Another Photo' },
]);

const currentIndex = ref(0);

const goToSlide = (index: number) => {
  currentIndex.value = index;
};

useHead({
  title: 'Kontak - Informasi - SMKN 2 Singosari',
  meta: [
    {
      name: 'description',
      content: 'Hubungi kami di SMK Negeri 2 Singosari. Informasi kontak dan lokasi sekolah.'
    }
  ]
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white py-24">
    <div class="container mx-auto px-4 sm:px-6">
      <!-- Page Header -->
      <div class="text-center mb-12">
        <div class="bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl shadow-xl rounded-2xl px-10 py-6 border border-blue-200 inline-block mb-4">
          <h1 class="text-3xl md:text-4xl font-bold text-white">Hubungi Kami</h1>
        </div>
        <p class="text-gray-600 max-w-2xl mx-auto text-lg">Informasi kontak dan lokasi SMK Negeri 2 Singosari</p>
      </div>

      <!-- Contact Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
        <div class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-8 text-center hover:shadow-2xl transition-shadow">
          <div class="inline-block p-4 bg-blue-100 rounded-full mb-4">
            <Icon name="lucide:map-pin" size="32" class="text-blue-600" />
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-3">Alamat</h3>
          <p class="text-gray-600 leading-relaxed">
            SMK Negeri 2 Singosari<br>
            Jl. Raya Singosari No. 123<br>
            Singosari, Malang, Jawa Timur 65153
          </p>
        </div>

        <div class="bg-white rounded-2xl shadow-xl border-2 border-orange-100 p-8 text-center hover:shadow-2xl transition-shadow">
          <div class="inline-block p-4 bg-orange-100 rounded-full mb-4">
            <Icon name="lucide:phone" size="32" class="text-orange-600" />
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-3">Telepon</h3>
          <p class="text-gray-600 leading-relaxed">(0341) 123-4567</p>
        </div>

        <div class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-8 text-center hover:shadow-2xl transition-shadow">
          <div class="inline-block p-4 bg-blue-100 rounded-full mb-4">
            <Icon name="lucide:mail" size="32" class="text-blue-600" />
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-3">Email</h3>
          <p class="text-gray-600 leading-relaxed">info@smkn2singosari.sch.id</p>
        </div>
      </div>

      <!-- Map Section -->
      <div class="max-w-5xl mx-auto">
        <div class="bg-gradient-to-r from-orange-500 to-orange-600 backdrop-blur-2xl shadow-xl rounded-2xl px-10 py-6 border border-orange-200 inline-block mb-8">
          <h2 class="text-2xl font-bold text-white">Lokasi Sekolah</h2>
        </div>
        
        <div class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-8">
          <div class="aspect-video bg-gray-100 rounded-xl flex items-center justify-center border-2 border-gray-200">
            <div class="text-center">
              <Icon name="lucide:map" size="48" class="text-gray-400 mx-auto mb-3" />
              <p class="text-gray-500">Embedded Google Map here</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Image Carousel Section -->
      <div class="max-w-5xl mx-auto mt-16">
        <div class="bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl shadow-xl rounded-2xl px-10 py-6 border border-blue-200 inline-block mb-8">
          <h2 class="text-2xl font-bold text-white">Galeri Sekolah</h2>
        </div>
        
        <div class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-8">
          <div class="relative bg-gray-100 rounded-xl flex items-center justify-center aspect-video border-2 border-gray-200">
            <span class="text-gray-500 text-xl font-semibold">
              {{ slides[currentIndex]?.text }}
            </span>
          </div>

          <div class="flex justify-center items-center mt-6 space-x-3">
            <button
              v-for="(slide, index) in slides"
              :key="slide.id"
              @click="goToSlide(index)"
              :class="[
                'w-3 h-3 rounded-full transition-all duration-300 ease-in-out',
                currentIndex === index ? 'bg-blue-600 w-8' : 'bg-gray-300 hover:bg-gray-400'
              ]"
              :aria-label="'Go to slide ' + (index + 1)"
            ></button>
          </div>
        </div>
      </div>

      <!-- Social Media Section -->
      <div class="max-w-5xl mx-auto mt-16">
        <div class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-8 text-center">
          <h3 class="text-2xl font-bold text-gray-800 mb-6">Ikuti Kami</h3>
          <div class="flex justify-center gap-4">
            <a href="#" class="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full hover:bg-blue-600 hover:text-white transition-all">
              <Icon name="lucide:facebook" size="24" />
            </a>
            <a href="#" class="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full hover:bg-blue-600 hover:text-white transition-all">
              <Icon name="lucide:instagram" size="24" />
            </a>
            <a href="#" class="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full hover:bg-blue-600 hover:text-white transition-all">
              <Icon name="lucide:youtube" size="24" />
            </a>
            <a href="#" class="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full hover:bg-blue-600 hover:text-white transition-all">
              <Icon name="lucide:twitter" size="24" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>