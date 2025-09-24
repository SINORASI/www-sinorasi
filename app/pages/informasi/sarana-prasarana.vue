<template>
  <div class="py-30">
    <ImageCarousel />
  </div>
  <div class="bg-neutral-100 font-serif py-12 px-4 sm:px-6 lg:px-8">
    <div class="container mx-auto">
      <div class="text-center mb-10">
        <div class="bg-neutral-200/50 backdrop-blur-2xl p-4 rounded-lg border border-neutral-300">
          <h2 class="text-3xl font-bold">Sarana dan Prasarana</h2>
        </div>
      </div>
      <p class="text-center text-gray-700 mb-8">
        Berikut adalah fasilitas dan infrastruktur yang tersedia di SMK Negeri 2 Singosari untuk mendukung kegiatan belajar mengajar dan kegiatan siswa lainnya.
      </p>
      <div class="flex flex-wrap gap-6 md:gap-8 justify-center mb-12">
        <div class="text-center">
          <div class="text-2xl md:text-3xl font-bold text-blue-600">5</div>
          <div class="text-sm md:text-base text-gray-700">Laboratorium</div>
        </div>
        <div class="text-center">
          <div class="text-2xl md:text-3xl font-bold text-blue-600">24</div>
          <div class="text-sm md:text-base text-gray-700">Ruang Kelas</div>
        </div>
        <div class="text-center">
          <div class="text-2xl md:text-3xl font-bold text-blue-600">1</div>
          <div class="text-sm md:text-base text-gray-700">Aula</div>
        </div>
        <div class="text-center">
          <div class="text-2xl md:text-3xl font-bold text-blue-600">2</div>
          <div class="text-sm md:text-base text-gray-700">Lapangan Olahraga</div>
        </div>
        <div class="text-center">
          <div class="text-2xl md:text-3xl font-bold text-blue-600">1</div>
          <div class="text-sm md:text-base text-gray-700">Perpustakaan</div>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="facility in facilities" :key="facility.name" class="bg-white rounded-lg shadow-md overflow-hidden">
          <img :src="facility.image" :alt="facility.name" class="w-full h-48 object-cover" />
          <div class="p-6">
            <h3 class="text-xl font-semibold mb-2">{{ facility.name }}</h3>
            <p class="text-gray-700 mb-4">{{ facility.description }}</p>
            <div class="flex items-center">
              <span class="text-sm font-medium text-gray-600">Kondisi:</span>
              <span :class="facility.condition === 'Baik' ? 'text-green-600' : 'text-yellow-600'" class="ml-2 font-semibold">
                {{ facility.condition }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const facilities = [
  {
    name: 'Aula Utama',
    image: '/images/placeholder.jpg',
    description: 'Aula utama digunakan untuk acara-acara besar seperti upacara, pertemuan, dan lomba. Dilengkapi dengan sistem audio dan proyektor.',
    condition: 'Baik'
  },
  {
    name: 'Laboratorium RPL',
    image: '/images/placeholder.jpg',
    description: 'Lab komputer untuk jurusan Rekayasa Perangkat Lunak dengan 30 unit PC dan perangkat lunak pengembangan terbaru.',
    condition: 'Baik'
  },
  {
    name: 'Laboratorium TKJ',
    image: '/images/placeholder.jpg',
    description: 'Laboratorium Teknik Komputer dan Jaringan dengan peralatan jaringan, server, dan workstation untuk praktikum.',
    condition: 'Baik'
  },
  {
    name: 'Lapangan Olahraga',
    image: '/images/placeholder.jpg',
    description: 'Lapangan multifungsi untuk olahraga seperti basket, voli, dan upacara. Dilengkapi dengan tribun penonton.',
    condition: 'Baik'
  },
  {
    name: 'Perpustakaan',
    image: '/images/placeholder.jpg',
    description: 'Perpustakaan dengan koleksi buku, jurnal, dan ruang baca yang nyaman. Tersedia akses internet untuk penelitian.',
    condition: 'Baik'
  },
  {
    name: 'Kantin',
    image: '/images/placeholder.jpg',
    description: 'Kantin sekolah yang menyediakan makanan dan minuman sehat untuk siswa dan guru selama jam istirahat.',
    condition: 'Baik'
  },
  {
    name: 'Ruang Kelas',
    image: '/images/placeholder.jpg',
    description: 'Ruang kelas yang nyaman dengan fasilitas AC, proyektor, dan papan tulis interaktif untuk mendukung pembelajaran.',
    condition: 'Baik'
  },
  {
    name: 'Masjid',
    image: '/images/placeholder.jpg',
    description: 'Masjid sekolah untuk kegiatan ibadah dan pengajian. Tersedia ruang wudu dan tempat sholat yang bersih.',
    condition: 'Baik'
  }
]
</script>