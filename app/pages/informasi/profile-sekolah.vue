<script setup lang="ts">
import { ref } from 'vue';

const currentSlide = ref(0);

const nextSlide = () => {
  if (currentSlide.value < 3) {
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
  title: 'Profil Sekolah - Informasi - SMKN 2 Singosari',
  meta: [
    {
      name: 'description',
      content: 'Profil lengkap SMK Negeri 2 Singosari. Sejarah, visi misi, dan sambutan kepala sekolah.'
    }
  ]
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
    <!-- Welcome Section -->
    <section class="py-20 pt-32">
      <div class="container mx-auto px-4 sm:px-6">
        <div class="text-center mb-12">
          <div class="bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl shadow-xl rounded-2xl px-10 py-6 border border-blue-200 inline-block mb-4">
            <h2 class="text-3xl md:text-4xl font-bold text-white">Sambutan Kepala Sekolah</h2>
          </div>
          <p class="text-gray-600 text-lg">SMK Negeri 2 Singosari</p>
        </div>

        <div class="max-w-5xl mx-auto">
          <!-- Principal Photo -->
          <div class="flex justify-center mb-10">
            <div class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-6 w-fit">
              <img src="/images/kepsek.webp" alt="Kepala Sekolah" class="rounded-xl w-64 md:w-80" />
            </div>
          </div>

          <!-- Welcome Message -->
          <div class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-8 md:p-12 space-y-6 text-gray-700 leading-relaxed">
            <p class="font-bold text-xl text-blue-800">Assalamualaikum Warahmatullahi Wabarakatuh</p>
            
            <p class="text-justify">
              Puji syukur kepada Alloh SWT, Tuhan Yang Maha Esa yang telah memberikan rahmat dan anugerahNya sehingga website SMK Negeri 2 Singosari ini dapat terbit. Salah satu tujuan dari website ini adalah untuk menjawab akan setiap kebutuhan informasi dengan memanfaatkan sarana teknologi informasi yang ada. Kami sadar sepenuhnya dalam rangka memajukan pendidikan di era berkembangnya Teknologi Informasi yang begitu pesat, sangat diperlukan berbagai sarana prasarana yang kondusif, kebutuhan berbagai informasi siswa, guru, orangtua maupun masyarakat, sehingga kami berusaha mewujudkan hal tersebut semaksimal mungkin. Semoga dengan adanya website ini dapat membantu dan bermanfaat, terutama informasi yang berhubungan dengan pendidikan, ilmu pengetahuan dan informasi seputar SMK Negeri 2 Singosari.
            </p>
            
            <p class="text-justify">
              Besar harapan kami, sarana ini dapat memberi manfaat bagi semua pihak yang ada dilingkup pendidikan dan pemerhati pendidikan secara khusus bagi SMK Negeri 2 Singosari.
            </p>
            
            <p class="text-justify">
              Akhirnya kami mengharapkan masukan dari berbagai pihak untuk website ini agar kami terus belajar dan meng-update diri, sehingga tampilan, isi dan mutu website akan terus berkembang dan lebih baik nantinya. Terima kasih atas kerjasamanya, maju terus untuk mencapai SMK Negeri 2 Singosari yang lebih baik lagi.
            </p>
            
            <p class="font-bold text-xl text-blue-800">Wassalamualaikum Warahmatullahi Wabarakatuh</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Video Profile Section - Carousel -->
    <section class="py-20 relative">
      <div class="container mx-auto px-4 sm:px-6 mb-12">
        <div class="text-center">
          <div class="bg-gradient-to-r from-orange-500 to-orange-600 backdrop-blur-2xl shadow-xl rounded-2xl px-10 py-6 border border-orange-200 inline-block mb-4">
            <h2 class="text-3xl md:text-4xl font-bold text-white">Video Profil Sekolah</h2>
          </div>
          <p class="text-gray-600 max-w-3xl mx-auto text-lg">
            Mengenal lebih dekat SMK Negeri 2 Singosari - sekolah yang membangun generasi terampil dan berkarakter untuk masa depan yang lebih cerah.
          </p>
        </div>
      </div>

      <!-- Carousel Container -->
      <div class="relative">
        <div class="relative overflow-hidden" :style="{ height: currentSlide === 0 ? '320px' : '720px' }" style="transition: height 0.6s ease-in-out;">
          <!-- Slide 1: Original Three Images -->
          <Transition name="slide">
            <div v-show="currentSlide === 0" class="absolute inset-0 w-full">
              <div class="w-full h-full">
                <div class="grid md:grid-cols-3 h-full">
                  <!-- Video Profil -->
                  <div class="group cursor-pointer">
                    <div class="relative h-80 overflow-hidden">
                      <img src="/images/logo.webp" class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                      <div class="absolute inset-0 flex flex-col justify-end p-6">
                        <h3 class="text-white text-2xl font-bold mb-1">Video Profil</h3>
                        <p class="text-white/90 text-sm mb-3">SMK Negeri 02 Singosari</p>
                        <p class="text-white/80 text-xs leading-relaxed">
                          Lorem ipsum alergi makan nasi, kalo makan nasi nanti sakit perul telu mual dan muntah, muntah kalo udah muntah yaa berarti udah gak fit dan sakit
                        </p>
                      </div>
                    </div>
                  </div>

                  <!-- Center Image (no text) -->
                  <div class="group cursor-pointer">
                    <div class="relative h-80 overflow-hidden">
                      <img src="/images/background-aula.jpg" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    </div>
                  </div>

                  <!-- Fasilitas Sekolah -->
                  <div class="group cursor-pointer">
                    <div class="relative h-80 overflow-hidden">
                      <img src="/images/background-aula.jpg" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                      <div class="absolute inset-0 flex flex-col justify-end p-6">
                        <h3 class="text-white text-2xl font-bold mb-1">Fasilitas Sekolah</h3>
                        <p class="text-white/90 text-sm mb-3">SMK Negeri 02 Singosari</p>
                        <p class="text-white/80 text-xs leading-relaxed">
                          Lorem ipsum alergi makan nasi, kalo makan nasi nanti sakit perul telu mual dan muntah, muntah kalo udah muntah yaa berarti udah gak fit dan sakit
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition>

          <!-- Slide 2: Video Profil Sekolah -->
          <Transition name="slide">
            <div v-show="currentSlide === 1" class="absolute inset-0 w-full h-full bg-black flex items-center justify-center">
              <div class="w-full h-full max-w-7xl px-4 py-8 flex items-center justify-center">
                <div class="w-full aspect-video">
                  <ScriptYouTubePlayer video-id="Kks6HnhPzVQ" class="w-full h-full rounded-2xl overflow-hidden">
                    <template #placeholder="{ placeholder }">
                      <div class="relative w-full h-full bg-gray-900 rounded-2xl overflow-hidden">
                        <div class="absolute inset-0 flex items-center justify-center">
                          <div class="bg-white/90 rounded-full p-6 hover:scale-110 transition-transform duration-300 cursor-pointer">
                            <Icon name="lucide:play" size="48" class="text-orange-600" />
                          </div>
                        </div>
                        <div class="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                          <h3 class="text-white text-2xl md:text-3xl font-bold mb-2">Video Profil Sekolah</h3>
                          <p class="text-white/90 text-lg">SMK Negeri 02 Singosari</p>
                        </div>
                      </div>
                    </template>
                  </ScriptYouTubePlayer>
                </div>
              </div>
            </div>
          </Transition>

          <!-- Slide 3: Location & Maps Combined -->
          <Transition name="slide">
            <div v-show="currentSlide === 2" class="absolute inset-0 w-full h-full">
              <div class="grid md:grid-cols-2 h-full">
                <!-- Left: Maps/Image -->
                <div class="relative h-full">
                  <img src="/images/background-aula.jpg" class="w-full h-full object-cover" />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div class="absolute top-8 left-8">
                    <div class="bg-orange-500/90 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center gap-2">
                      <Icon name="lucide:map-pin" size="24" class="text-white" />
                      <span class="text-white font-bold">Maps Lokasi</span>
                    </div>
                  </div>
                </div>

                <!-- Right: Location Info -->
                <div class="relative h-full bg-gradient-to-br from-orange-600 to-orange-800">
                  <div class="absolute inset-0 flex flex-col justify-center p-12">
                    <div class="mb-6">
                      <Icon name="lucide:map-pin" size="56" class="text-white/80 mb-4" />
                      <h3 class="text-white text-4xl md:text-5xl font-bold mb-4">Lokasi Sekolah</h3>
                      <p class="text-white/90 text-xl mb-8">SMK Negeri 02 Singosari</p>
                    </div>
                    
                    <div class="space-y-6 text-white">
                      <div class="flex items-start gap-4">
                        <Icon name="lucide:map-pin" size="28" class="flex-shrink-0 mt-1" />
                        <div>
                          <p class="font-semibold text-lg mb-1">Alamat</p>
                          <p class="text-white/90 text-base">Jl. Raya Mondoroko No.1, Singosari, Kabupaten Malang, Jawa Timur 65153</p>
                        </div>
                      </div>
                      
                      <div class="flex items-start gap-4">
                        <Icon name="lucide:phone" size="28" class="flex-shrink-0 mt-1" />
                        <div>
                          <p class="font-semibold text-lg mb-1">Telepon</p>
                          <p class="text-white/90 text-base">(0341) 458380</p>
                        </div>
                      </div>
                      
                      <div class="flex items-start gap-4">
                        <Icon name="lucide:mail" size="28" class="flex-shrink-0 mt-1" />
                        <div>
                          <p class="font-semibold text-lg mb-1">Email</p>
                          <p class="text-white/90 text-base">info@smkn2singosari.sch.id</p>
                        </div>
                      </div>

                      <button class="mt-6 bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors inline-flex items-center gap-2">
                        <Icon name="lucide:external-link" size="20" />
                        Buka di Google Maps
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition>

          <!-- Slide 4: Mars SMKN -->
          <Transition name="slide">
            <div v-show="currentSlide === 3" class="absolute inset-0 w-full h-full bg-black flex items-center justify-center">
              <div class="w-full h-full max-w-7xl px-4 py-8 flex items-center justify-center">
                <div class="w-full aspect-video">
                  <ScriptYouTubePlayer video-id="Kks6HnhPzVQ" class="w-full h-full rounded-2xl overflow-hidden">
                    <template #placeholder="{ placeholder }">
                      <div class="relative w-full h-full bg-gray-900 rounded-2xl overflow-hidden">
                        <div class="absolute inset-0 flex items-center justify-center">
                          <div class="bg-white/90 rounded-full p-6 hover:scale-110 transition-transform duration-300 cursor-pointer">
                            <Icon name="lucide:play" size="48" class="text-green-600" />
                          </div>
                        </div>
                        <div class="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                          <h3 class="text-white text-2xl md:text-3xl font-bold mb-2">Mars SMKN 2 Singosari</h3>
                          <p class="text-white/90 text-lg">SMK Negeri 02 Singosari</p>
                        </div>
                      </div>
                    </template>
                  </ScriptYouTubePlayer>
                </div>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Navigation Arrows -->
        <button
          v-show="currentSlide > 0"
          @click="prevSlide"
          class="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-xl hover:scale-110 transition-all duration-200"
        >
          <Icon name="lucide:chevron-left" size="24" />
        </button>
        <button
          v-show="currentSlide < 3"
          @click="nextSlide"
          class="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-xl hover:scale-110 transition-all duration-200"
        >
          <Icon name="lucide:chevron-right" size="24" />
        </button>
      </div>

      <!-- Slide Indicators -->
      <div class="flex justify-center gap-3 mt-8">
        <button
          v-for="index in 4"
          :key="index"
          @click="goToSlide(index - 1)"
          :class="[
            'h-2 rounded-full transition-all duration-300',
            currentSlide === index - 1 ? 'w-8 bg-orange-600' : 'w-2 bg-gray-300 hover:bg-gray-400'
          ]"
        />
      </div>
    </section>

    <!-- History Section -->
    <section class="py-20">
      <div class="container mx-auto px-4 sm:px-6">
        <div class="text-center mb-12">
          <div class="bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl shadow-xl rounded-2xl px-10 py-6 border border-blue-200 inline-block mb-4">
            <h2 class="text-3xl md:text-4xl font-bold text-white">Sejarah Sekolah</h2>
          </div>
        </div>

        <div class="max-w-5xl mx-auto">
          <div class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 overflow-hidden">
            <div class="grid lg:grid-cols-2 gap-0">
              <div class="h-80 lg:h-auto bg-gray-300">
                <img src="/images/placeholder.jpg" alt="Sejarah" class="object-cover w-full h-full" />
              </div>
              <div class="p-8 md:p-10 flex flex-col justify-center">
                <h3 class="text-2xl font-bold text-gray-800 mb-4">Sejarah SMK Negeri 2 Singosari</h3>
                <p class="text-gray-700 leading-relaxed mb-6 text-justify">
                  Didirikan berdasarkan surat Perjanjian Kerjasama antara Bupati Malang dengan Direktur Pendidikan Sekolah Menengah Kejuruan No.0570ax/C5.4/Kep/KU/2007 Tanggal 25 Mei 2007. Sebagai Pengembangan dari Program Keahlian Teknik Audio Video, Teknik Elektronika Industri, dan Teknik Informatika (Rekayasa Perangkat Lunak) yang berasal dari SMK Negeri 1 Singosari yang telah meraih prestasi sebagai Juara Lomba Kompetensi Siswa baik tingkat Propinsi Jawa Timur maupun Tingkat Nasional.
                </p>
                <button class="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center w-fit group">
                  Baca Selengkapnya 
                  <Icon name="lucide:arrow-right" class="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Vision Mission Section -->
    <section class="py-20">
      <div class="container mx-auto px-4 sm:px-6">
        <div class="max-w-5xl mx-auto">
          <div class="bg-white rounded-2xl shadow-xl border-2 border-orange-100 p-8 md:p-10 mb-8">
            <div class="flex justify-between items-center">
              <div>
                <h2 class="text-3xl font-bold text-gray-800 mb-2">Visi Dan Misi</h2>
                <p class="text-gray-600">SMK Negeri 02 Singosari</p>
              </div>
              <button class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center hover:bg-orange-600 hover:text-white transition-colors">
                <Icon name="lucide:plus" size="24" />
              </button>
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-8">
              <div class="inline-block p-4 bg-blue-100 rounded-full mb-4">
                <Icon name="lucide:eye" size="32" class="text-blue-600" />
              </div>
              <h3 class="text-2xl font-bold text-gray-800 mb-4">Visi</h3>
              <p class="text-gray-700 leading-relaxed">
                Menjadi SMK unggulan yang menghasilkan lulusan berkarakter, kompeten, dan berdaya saing global.
              </p>
            </div>

            <div class="bg-white rounded-2xl shadow-xl border-2 border-orange-100 p-8">
              <div class="inline-block p-4 bg-orange-100 rounded-full mb-4">
                <Icon name="lucide:target" size="32" class="text-orange-600" />
              </div>
              <h3 class="text-2xl font-bold text-gray-800 mb-4">Misi</h3>
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
