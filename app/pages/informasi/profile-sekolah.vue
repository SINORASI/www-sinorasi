<script setup lang="ts">
import { ref } from "vue";

const isVisionMissionExpanded = ref(false);
const expandedCard = ref<number | null>(null);

const toggleVisionMission = () => {
  isVisionMissionExpanded.value = !isVisionMissionExpanded.value;
};

const expandCard = (index: number) => {
  expandedCard.value = index;
};

const closeCard = () => {
  expandedCard.value = null;
};

const nextCard = () => {
  if (expandedCard.value !== null) {
    expandedCard.value = (expandedCard.value + 1) % 3;
  }
};

const prevCard = () => {
  if (expandedCard.value !== null) {
    expandedCard.value = (expandedCard.value - 1 + 3) % 3;
  }
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
    <section class="py-32">
      <div class="container w-max-[1200px] px-4 mx-auto sm:px-6">
        <div class="mb-12 text-center">
          <div
            class="inline-block px-10 py-6 mb-4 border border-blue-200 shadow-xl bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl rounded-2xl"
          >
            <h2 class="text-3xl font-bold text-white md:text-4xl">Sambutan Kepala Sekolah</h2>
          </div>
          <p class="text-lg text-gray-600">SMK Negeri 2 Singosari</p>
        </div>

        <div class="mx-auto">
          <div class="flex flex-col gap-8">
            <!-- Principal Photo and Quote -->
            <div class="flex flex-col items-center justify-center lg:flex-row lg:items-center lg:gap-8">
              <div class="p-6 bg-white border-2 border-blue-100 shadow-xl rounded-2xl w-fit">
                <img src="/images/kepsek.webp" alt="Kepala Sekolah" class="w-64 rounded-xl md:w-80" />
              </div>
              <div class="max-w-xl mx-5 p-6 mt-6 border-2 border-blue-100 shadow-xl bg-blue-50 rounded-2xl lg:mt-0">
                <blockquote class="italic text-center text-2xl text-gray-700 lg:text-left">
                  "Pendidikan adalah kunci untuk membuka pintu masa depan yang lebih baik. Mari bersama-sama membangun
                  generasi yang unggul dan berkarakter."
                </blockquote>
                <cite class="block mt-4 text-sm font-semibold text-center text-blue-600 lg:text-left"
                  >- Sumijah S.Pd M.Si</cite
                >
              </div>
            </div>

            <!-- Welcome Message -->
            <div class="flex items-center justify-center">
              <div
                class="w-full max-w-5xl p-8 space-y-6 leading-relaxed text-gray-700 bg-white border-2 border-blue-100 shadow-xl rounded-2xl md:p-12"
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

    <!-- Vision Mission Section -->
    <section class="py-20">
      <div class="container max-w-[1200px] px-4 mx-auto sm:px-6">
        <div class="max-w-5xl mx-auto">
          <!-- Collapsed Header -->
          <button v-if="!isVisionMissionExpanded" @click="toggleVisionMission" class="w-full group">
            <div
              class="p-8 transition-all duration-300 bg-white border-2 border-orange-100 shadow-xl rounded-2xl md:p-10 hover:border-orange-300 hover:shadow-2xl"
            >
              <div class="flex items-center justify-between">
                <div>
                  <h2 class="mb-2 text-3xl font-bold text-gray-800">Visi Dan Misi</h2>
                  <p class="text-gray-600">SMK Negeri 02 Singosari</p>
                </div>
                <div
                  class="flex items-center justify-center w-12 h-12 transition-transform duration-300 bg-orange-100 rounded-full group-hover:rotate-90 hover:bg-orange-600 hover:text-white"
                >
                  <Icon name="lucide:plus" size="24" />
                </div>
              </div>
            </div>
          </button>

          <!-- Expanded Content -->
          <div
            v-else
            class="overflow-hidden border-2 border-orange-100 shadow-xl rounded-2xl animate-expand backdrop-blur-xl bg-white/95"
          >
            <!-- Header (Clickable to collapse) -->
            <button @click="toggleVisionMission" class="w-full group">
              <div class="p-8 md:p-10">
                <div class="flex items-center justify-between">
                  <div>
                    <h2 class="mb-2 text-3xl font-bold text-gray-800">Visi Dan Misi</h2>
                    <p class="text-gray-600">SMK Negeri 02 Singosari</p>
                  </div>
                  <div
                    class="flex items-center justify-center w-12 h-12 transition-transform duration-300 bg-orange-100 rounded-full group-hover:rotate-180 hover:bg-orange-600 hover:text-white"
                  >
                    <Icon name="lucide:minus" size="24" />
                  </div>
                </div>
              </div>
            </button>

            <!-- Content Area with Animation -->
            <div class="px-8 pb-8 md:px-10 md:pb-10 animate-slide-down">
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
        </div>
      </div>
    </section>

    <!-- Video Profile Section -->
    <section class="relative py-20">

      <div class="container px-4 mx-auto">
        <div class="text-center mb-12">
          <div
            class="inline-block px-10 py-6 mb-4 border border-orange-200 shadow-xl bg-gradient-to-r from-orange-500 to-orange-600 backdrop-blur-2xl rounded-2xl"
          >
            <h2 class="text-3xl font-bold text-white md:text-4xl">Video Profil Sekolah</h2>
          </div>
          <p class="max-w-3xl mx-auto text-lg text-black">
            Mengenal lebih dekat SMK Negeri 2 Singosari - sekolah yang membangun generasi terampil dan berkarakter untuk
            masa depan yang lebih cerah.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-0 w-full mx-auto">
          <!-- Card 1: Video Profil -->
           <div class="rounded-tl-lg rounded-bl-lg shadow-lg overflow-hidden cursor-pointer transition-transform" @click="expandCard(0)">
             <div class="relative w-full h-96 overflow-hidden">
               <img src="/images/thumbnail/profile-thumbnail.webp" alt="Video Profil Thumbnail" class="absolute inset-0 w-full h-full object-cover" />
              <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 backdrop-blur-sm">
                <h3 class="text-xl font-bold text-white font-sans">Video Profil</h3>
                <p class="text-sm text-gray-200 mt-2 font-sans">
                  Temukan lebih dalam tentang visi, misi, dan program unggulan SMK Negeri 2 Singosari melalui video profil
                  kami.
                </p>
              </div>
            </div>
          </div>

          <!-- Card 2: Mars SMK -->
           <div class="shadow-lg overflow-hidden cursor-pointer transition-transform" @click="expandCard(1)">
             <div class="relative w-full h-96 overflow-hidden">
               <img src="/images/thumbnail/mars-thumbnail.webp" alt="Mars SMK Thumbnail" class="absolute inset-0 w-full h-full object-cover" />
              <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 backdrop-blur-sm">
                <h3 class="text-xl font-bold text-white font-sans">Mars SMK</h3>
                <p class="text-sm text-gray-200 mt-2 font-sans">
                  Dengarkan mars sekolah yang penuh semangat dan identitas kami sebagai komunitas SMK Negeri 2 Singosari.
                </p>
              </div>
            </div>
          </div>

          <!-- Card 3: Maps Lokasi -->
           <div class="rounded-tr-lg rounded-br-lg shadow-lg overflow-hidden cursor-pointer transition-transform" @click="expandCard(2)">
            <div class="relative w-full h-96 overflow-hidden">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.036!2d112.665!3d-7.888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd629b46b6e7c8b%3A0x4e7b8b8b8b8b8b8b!2sJl.%20Perusahaan%20Raya%20No.20%2C%20Jajar%2C%20Tanjungtirto%2C%20Kec.%20Singosari%2C%20Kabupaten%20Malang%2C%20Jawa%20Timur%2065153!5e0!3m2!1sen!2sid!4v1697550000000!5m2!1sen!2sid" class="absolute inset-0 w-full h-full" frameborder="0" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 backdrop-blur-sm">
                <h3 class="text-xl font-bold text-white font-sans">Maps Lokasi</h3>
                <p class="text-sm text-gray-200 mt-2 font-sans">
                  Jelajahi lokasi sekolah kami melalui peta interaktif dan temukan cara mudah untuk mengunjungi SMK Negeri
                  2 Singosari.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Expanded Card Overlay -->
        <div v-if="expandedCard !== null" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" @click="closeCard">
          <div class="relative w-4/5 h-5/6 mx-auto" @click.stop>
            <!-- Close Button -->
            <button @click="closeCard" class="absolute top-4 right-4 z-10 w-12 h-12 bg-gray-600 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-gray-500 transition-colors">
              <Icon name="lucide:x" size="24" />
            </button>

            <!-- Navigation Buttons -->
            <button @click="prevCard" class="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gray-600 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-gray-500 transition-colors">
              <Icon name="lucide:chevron-left" size="24" />
            </button>
            <button @click="nextCard" class="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gray-600 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-gray-500 transition-colors">
              <Icon name="lucide:chevron-right" size="24" />
            </button>

            <!-- Expanded Content -->
            <div class="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <!-- Card 0: Video Profil -->
              <div v-if="expandedCard === 0" class="relative">
                <div class="aspect-video">
                  <iframe src="https://www.youtube.com/embed/Kks6HnhPzVQ" class="absolute inset-0 w-full h-full" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="Video Profil SMK Negeri 2 Singosari"></iframe>
                </div>
                <div class="p-8">
                  <h3 class="text-2xl font-bold text-gray-800 mb-4">Video Profil</h3>
                  <p class="text-gray-700 leading-relaxed">
                    Temukan lebih dalam tentang visi, misi, dan program unggulan SMK Negeri 2 Singosari melalui video profil
                    kami. Video ini menampilkan kegiatan sehari-hari, fasilitas, dan prestasi yang telah diraih oleh sekolah kami.
                  </p>
                </div>
              </div>

              <!-- Card 1: Mars SMK -->
              <div v-if="expandedCard === 1" class="relative">
                <div class="aspect-video">
                  <video class="absolute inset-0 w-full h-full object-cover" controls autoplay>
                    <source src="https://smkn2-singosari.sch.id/wp-content/uploads/2023/10/marssmkn2.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div class="p-8">
                  <h3 class="text-2xl font-bold text-gray-800 mb-4">Mars SMK</h3>
                  <p class="text-gray-700 leading-relaxed">
                    Dengarkan mars sekolah yang penuh semangat dan identitas kami sebagai komunitas SMK Negeri 2 Singosari.
                    Mars ini menjadi simbol kebersamaan dan semangat juang siswa-siswi dalam menjalani pendidikan.
                  </p>
                </div>
              </div>

              <!-- Card 2: Maps Lokasi -->
              <div v-if="expandedCard === 2" class="relative">
                <div class="aspect-video">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.036!2d112.665!3d-7.888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd629b46b6e7c8b%3A0x4e7b8b8b8b8b8b8b!2sJl.%20Perusahaan%20Raya%20No.20%2C%20Jajar%2C%20Tanjungtirto%2C%20Kec.%20Singosari%2C%20Kabupaten%20Malang%2C%20Jawa%20Timur%2065153!5e0!3m2!1sen!2sid!4v1697550000000!5m2!1sen!2sid" class="absolute inset-0 w-full h-full" frameborder="0" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div class="p-8">
                  <h3 class="text-2xl font-bold text-gray-800 mb-4">Maps Lokasi</h3>
                  <p class="text-gray-700 leading-relaxed">
                    Jelajahi lokasi sekolah kami melalui peta interaktif dan temukan cara mudah untuk mengunjungi SMK Negeri
                    2 Singosari. Sekolah kami terletak di daerah strategis dengan akses transportasi yang mudah dijangkau.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
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
  </div>
</template>
