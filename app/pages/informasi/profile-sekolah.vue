<script setup lang="ts">
import { ref } from "vue";

const currentSlide = ref(0);

const nextSlide = () => {
  if (currentSlide.value < 2) {
    currentSlide.value++;
  }
};

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--;
  }
};

const goToSlide = (index: number) => {
  currentSlide.value = index;
};

useHead({
  title: "Profil Sekolah - Informasi - SMKN 2 Singosari",
  meta: [
    {
      name: "description",
      content: "Profil lengkap SMK Negeri 2 Singosari. Sejarah, visi misi, dan sambutan kepala sekolah.",
    },
  ],
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
    <!-- Welcome Section -->
    <section class="py-20 pt-32">
      <div class="container px-4 mx-auto sm:px-6">
        <div class="mb-12 text-center">
          <div
            class="inline-block px-10 py-6 mb-4 border border-blue-200 shadow-xl bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl rounded-2xl"
          >
            <h2 class="text-3xl font-bold text-white md:text-4xl">Sambutan Kepala Sekolah</h2>
          </div>
          <p class="text-lg text-gray-600">SMK Negeri 2 Singosari</p>
        </div>

        <div class="mx-auto max-w-7xl">
          <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <!-- Principal Photo and Quote -->
            <div class="flex flex-col items-center">
              <div class="p-6 mb-6 bg-white border-2 border-blue-100 shadow-xl rounded-2xl w-fit">
                <img src="/images/kepsek.webp" alt="Kepala Sekolah" class="w-64 rounded-xl md:w-80" />
              </div>
              <div class="max-w-md p-6 border-2 border-blue-100 shadow-xl bg-blue-50 rounded-2xl">
                <blockquote class="italic text-center text-gray-700">
                  "Pendidikan adalah kunci untuk membuka pintu masa depan yang lebih baik. Mari bersama-sama membangun
                  generasi yang unggul dan berkarakter."
                </blockquote>
                <cite class="block mt-4 text-sm font-semibold text-blue-600">- Sumijah S.Pd M.Si</cite>
              </div>
            </div>

            <!-- Welcome Message -->
            <div class="flex items-center">
              <div
                class="w-full p-8 space-y-6 leading-relaxed text-gray-700 bg-white border-2 border-blue-100 shadow-xl rounded-2xl md:p-12"
              >
                <p class="text-xl font-bold text-blue-800">Assalamualaikum Warahmatullahi Wabarakatuh</p>

                <p class="text-justify">
                  Puji syukur kepada Alloh SWT, Tuhan Yang Maha Esa yang telah memberikan rahmat dan anugerahNya
                  sehingga website SMK Negeri 2 Singosari ini dapat terbit. Salah satu tujuan dari website ini adalah
                  untuk menjawab akan setiap kebutuhan informasi dengan memanfaatkan sarana teknologi informasi yang
                  ada.
                </p>

                <p class="text-justify">
                  Kami sadar sepenuhnya dalam rangka memajukan pendidikan di era berkembangnya Teknologi Informasi yang
                  begitu pesat, sangat diperlukan berbagai sarana prasarana yang kondusif, kebutuhan berbagai informasi
                  siswa, guru, orangtua maupun masyarakat, sehingga kami berusaha mewujudkan hal tersebut semaksimal
                  mungkin.
                </p>

                <p class="text-xl font-bold text-blue-800">Wassalamualaikum Warahmatullahi Wabarakatuh</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Video Profile Section - Carousel -->
    <section class="relative py-20">
      <div class="container px-4 mx-auto mb-12 sm:px-6">
        <div class="text-center">
          <div
            class="inline-block px-10 py-6 mb-4 border border-orange-200 shadow-xl bg-gradient-to-r from-orange-500 to-orange-600 backdrop-blur-2xl rounded-2xl"
          >
            <h2 class="text-3xl font-bold text-white md:text-4xl">Video Profil Sekolah</h2>
          </div>
          <p class="max-w-3xl mx-auto text-lg text-gray-600">
            Mengenal lebih dekat SMK Negeri 2 Singosari - sekolah yang membangun generasi terampil dan berkarakter untuk
            masa depan yang lebih cerah.
          </p>
        </div>
      </div>

      <!-- Carousel Container -->
      <div class="relative">
        <div class="relative overflow-hidden" :style="{ height: '720px' }" style="transition: height 0.6s ease-in-out">
          <!-- Slide 1: Video Profil -->
          <Transition name="slide">
            <div
              v-show="currentSlide === 0"
              class="absolute inset-0 flex items-center justify-center w-full h-full bg-black"
            >
              <div class="flex items-center justify-center w-full h-full px-4 py-8 max-w-7xl">
                <div class="relative w-full aspect-video">
                  <img
                    src="/images/placeholder.jpg"
                    alt="Video Profil Placeholder"
                    class="object-cover w-full h-full rounded-2xl"
                  />
                  <div class="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl">
                    <div class="text-center text-white">
                      <Icon name="lucide:play-circle" size="64" class="mb-4" />
                      <h3 class="text-xl font-bold">Video Profil Sekolah</h3>
                      <p class="text-sm opacity-90">Coming Soon</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition>

          <!-- Slide 2: Mars SMKN -->
          <Transition name="slide">
            <div
              v-show="currentSlide === 1"
              class="absolute inset-0 flex items-center justify-center w-full h-full bg-black"
            >
              <div class="flex items-center justify-center w-full h-full px-4 py-8 max-w-7xl">
                <div class="relative w-full aspect-video">
                  <img
                    src="/images/placeholder.jpg"
                    alt="Mars SMKN Placeholder"
                    class="object-cover w-full h-full rounded-2xl"
                  />
                  <div class="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl">
                    <div class="text-center text-white">
                      <Icon name="lucide:music" size="64" class="mb-4" />
                      <h3 class="text-xl font-bold">Mars SMK Negeri 2 Singosari</h3>
                      <p class="text-sm opacity-90">Coming Soon</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition>

          <!-- Slide 3: Maps -->
          <Transition name="slide">
            <div
              v-show="currentSlide === 2"
              class="absolute inset-0 flex items-center justify-center w-full h-full bg-black"
            >
              <div class="flex items-center justify-center w-full h-full px-4 py-8 max-w-7xl">
                <div class="relative w-full aspect-video">
                  <img
                    src="/images/background-aula.jpg"
                    alt="Maps Placeholder"
                    class="object-cover w-full h-full rounded-2xl"
                  />
                  <div class="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl">
                    <div class="text-center text-white">
                      <Icon name="lucide:map-pin" size="64" class="mb-4" />
                      <h3 class="text-xl font-bold">Lokasi & Peta Sekolah</h3>
                      <p class="text-sm opacity-90">Interactive Map Coming Soon</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Navigation Arrows - Always Visible -->
      <button
        @click="prevSlide"
        :class="[
          'absolute z-20 p-3 text-gray-800 transition-all duration-200 -translate-y-1/2 rounded-full shadow-xl left-4 top-1/2',
          currentSlide === 0
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-white/90 hover:bg-white hover:scale-110 cursor-pointer',
        ]"
      >
        <Icon name="lucide:chevron-left" size="24" />
      </button>
      <button
        @click="nextSlide"
        :class="[
          'absolute z-20 p-3 text-gray-800 transition-all duration-200 -translate-y-1/2 rounded-full shadow-xl right-4 top-1/2',
          currentSlide === 2
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-white/90 hover:bg-white hover:scale-110 cursor-pointer',
        ]"
      >
        <Icon name="lucide:chevron-right" size="24" />
      </button>

      <!-- Slide Indicators -->
      <div class="flex justify-center gap-3 mt-8">
        <button
          v-for="index in 3"
          :key="index"
          @click="goToSlide(index - 1)"
          :class="[
            'h-2 rounded-full transition-all duration-300',
            currentSlide === index - 1 ? 'w-8 bg-orange-600' : 'w-2 bg-gray-300 hover:bg-gray-400',
          ]"
        />
      </div>
    </section>

    <!-- History Section -->
    <section class="py-20">
      <div class="container px-4 mx-auto sm:px-6">
        <div class="mb-12 text-center">
          <div
            class="inline-block px-10 py-6 mb-4 border border-blue-200 shadow-xl bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl rounded-2xl"
          >
            <h2 class="text-3xl font-bold text-white md:text-4xl">Sejarah Sekolah</h2>
          </div>
        </div>

        <div class="max-w-5xl mx-auto">
          <div class="overflow-hidden bg-white border-2 border-blue-100 shadow-xl rounded-2xl">
            <div class="grid gap-0 lg:grid-cols-2">
              <div class="bg-gray-300 h-80 lg:h-auto">
                <img src="/images/placeholder.jpg" alt="Sejarah" class="object-cover w-full h-full" />
              </div>
              <div class="flex flex-col justify-center p-8 md:p-10">
                <h3 class="mb-4 text-2xl font-bold text-gray-800">Sejarah SMK Negeri 2 Singosari</h3>
                <p class="mb-6 leading-relaxed text-justify text-gray-700">
                  Didirikan berdasarkan surat Perjanjian Kerjasama antara Bupati Malang dengan Direktur Pendidikan
                  Sekolah Menengah Kejuruan No.0570ax/C5.4/Kep/KU/2007 Tanggal 25 Mei 2007. Sebagai Pengembangan dari
                  Program Keahlian Teknik Audio Video, Teknik Elektronika Industri, dan Teknik Informatika (Rekayasa
                  Perangkat Lunak) yang berasal dari SMK Negeri 1 Singosari yang telah meraih prestasi sebagai Juara
                  Lomba Kompetensi Siswa baik tingkat Propinsi Jawa Timur maupun Tingkat Nasional.
                </p>
                <button class="inline-flex items-center font-semibold text-blue-600 hover:text-blue-800 w-fit group">
                  Baca Selengkapnya
                  <Icon name="lucide:arrow-right" class="ml-2 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Vision Mission Section -->
    <section class="py-20">
      <div class="container px-4 mx-auto sm:px-6">
        <div class="max-w-5xl mx-auto">
          <div class="p-8 mb-8 bg-white border-2 border-orange-100 shadow-xl rounded-2xl md:p-10">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="mb-2 text-3xl font-bold text-gray-800">Visi Dan Misi</h2>
                <p class="text-gray-600">SMK Negeri 02 Singosari</p>
              </div>
              <button
                class="flex items-center justify-center w-12 h-12 transition-colors bg-orange-100 rounded-full hover:bg-orange-600 hover:text-white"
              >
                <Icon name="lucide:plus" size="24" />
              </button>
            </div>
          </div>

          <div class="grid gap-6 md:grid-cols-2">
            <div class="p-8 bg-white border-2 border-blue-100 shadow-xl rounded-2xl">
              <div class="inline-block p-4 mb-4 bg-blue-100 rounded-full">
                <Icon name="lucide:eye" size="32" class="text-blue-600" />
              </div>
              <h3 class="mb-4 text-2xl font-bold text-gray-800">Visi</h3>
              <p class="leading-relaxed text-gray-700">
                Menjadi SMK unggulan yang menghasilkan lulusan berkarakter, kompeten, dan berdaya saing global.
              </p>
            </div>

            <div class="p-8 bg-white border-2 border-orange-100 shadow-xl rounded-2xl">
              <div class="inline-block p-4 mb-4 bg-orange-100 rounded-full">
                <Icon name="lucide:target" size="32" class="text-orange-600" />
              </div>
              <h3 class="mb-4 text-2xl font-bold text-gray-800">Misi</h3>
              <ul class="space-y-3 text-gray-700">
                <li class="flex items-start">
                  <Icon name="lucide:check-circle" size="20" class="text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Menyelenggarakan pendidikan berkualitas</span>
                </li>
                <li class="flex items-start">
                  <Icon name="lucide:check-circle" size="20" class="text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Mengembangkan kompetensi siswa</span>
                </li>
                <li class="flex items-start">
                  <Icon name="lucide:check-circle" size="20" class="text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Membentuk karakter unggul</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.6s ease-in-out;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
