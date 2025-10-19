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
      
      <div class="mb-12 text-center">
        <div
          class="inline-block px-10 py-6 mb-4 border border-blue-200 shadow-xl bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl rounded-2xl"
        >
          <h1 class="text-3xl font-bold text-white md:text-4xl">Hubungi Kami</h1>
        </div>
        <p class="max-w-2xl mx-auto text-lg text-gray-600">Informasi kontak dan lokasi SMK Negeri 2 Singosari</p>
      </div>

      
      <div class="grid max-w-5xl grid-cols-1 gap-6 mx-auto mb-16 md:grid-cols-3">
        <div
          class="p-8 text-center transition-shadow bg-white border-2 border-blue-100 shadow-xl rounded-2xl hover:shadow-2xl"
        >
          <div class="inline-block p-4 mb-4 bg-blue-100 rounded-full">
            <Icon name="lucide:map-pin" size="32" class="text-blue-600" />
          </div>
          <h3 class="mb-3 text-xl font-bold text-gray-800">Alamat</h3>
          <p class="leading-relaxed text-gray-600">
            Jl. Perusahaan Raya No.20, Jajar, Tanjungtirto<br />
            Kec. Singosari, Kabupaten Malang, Jawa Timur 65153
          </p>
        </div>

        <div
          class="p-8 text-center transition-shadow bg-white border-2 border-orange-100 shadow-xl rounded-2xl hover:shadow-2xl"
        >
          <div class="inline-block p-4 mb-4 bg-orange-100 rounded-full">
            <Icon name="lucide:phone" size="32" class="text-orange-600" />
          </div>
          <h3 class="mb-3 text-xl font-bold text-gray-800">Telepon</h3>
          <p class="leading-relaxed text-gray-600">(0341) 4345127</p>
        </div>

        <div
          class="p-8 text-center transition-shadow bg-white border-2 border-blue-100 shadow-xl rounded-2xl hover:shadow-2xl"
        >
          <div class="inline-block p-4 mb-4 bg-blue-100 rounded-full">
            <Icon name="lucide:mail" size="32" class="text-blue-600" />
          </div>
          <h3 class="mb-3 text-xl font-bold text-gray-800">Email</h3>
          <p class="leading-relaxed text-gray-600">smkn2.singosari@yahoo.co.id</p>
        </div>
      </div>

      
      <div class="max-w-5xl mx-auto">
        <div
          class="inline-block px-10 py-6 mb-8 border border-orange-200 shadow-xl bg-gradient-to-r from-orange-500 to-orange-600 backdrop-blur-2xl rounded-2xl"
        >
          <h2 class="text-2xl font-bold text-white">Lokasi Sekolah</h2>
        </div>

        <div class="p-8 bg-white border-2 border-blue-100 shadow-xl rounded-2xl">
          <div class="aspect-video rounded-xl overflow-hidden">
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d53004.90227511139!2d112.61905412163591!3d-7.903971658482226!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd62a2690b713bb%3A0x61a43c4cb3de3ff0!2sSMK%20Negeri%202%20Singosari!5e0!3m2!1sid!2sid!4v1760870911351!5m2!1sid!2sid" style="border:0;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="w-full h-full"></iframe>
          </div>
        </div>
      </div>

      
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

      
      <div class="max-w-5xl mx-auto mt-16">
        <div class="p-8 text-center bg-white border-2 border-blue-100 shadow-xl rounded-2xl">
          <h3 class="mb-6 text-2xl font-bold text-gray-800">Ikuti Kami</h3>
          <div class="flex justify-center gap-4">
            <a
              href="https://instagram.com/smkn2_singosari"
              class="flex items-center justify-center w-10 h-10 transition duration-300 rounded-full bg-neutral-200 text-gray-700 hover:bg-pink-600 hover:text-white"
            >
              <Icon name="lucide:instagram" size="20" />
            </a>
            <a
              href="https://www.youtube.com/channel/UC0B8cIUqCnHMzoTNXxbRhFQ"
              class="flex items-center justify-center w-10 h-10 transition duration-300 rounded-full bg-neutral-200 text-gray-700 hover:bg-red-600 hover:text-white"
            >
              <Icon name="lucide:youtube" size="20" />
            </a>
            <a
              href="https://tiktok.com/@smkn2singosari"
              class="flex items-center justify-center w-10 h-10 transition duration-300 rounded-full bg-neutral-200 text-gray-700 hover:bg-black hover:text-white"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
