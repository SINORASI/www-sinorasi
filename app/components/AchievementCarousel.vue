<template>
  <div class="relative flex flex-col w-full max-w-sm gap-5 p-4 mx-auto border rounded-lg shadow-sm md:w-200 md:max-w-none bg-secondary md:p-8 border-neutral-300">
    <div class="overflow-hidden">
      <div class="flex transition-transform duration-500 ease-in-out" :style="{ transform: `translateX(-${current * 100}%)` }">
        <div v-for="(achievement, index) in achievements" :key="index" class="flex-shrink-0 w-full">
          <div class="flex flex-col items-center gap-6 md:flex-row md:gap-10">
            <img :src="achievement.image" class="w-48 md:w-80" alt="Achievement" />
            <div class="flex flex-col gap-5">
              <h3 class="text-2xl font-bold">{{ achievement.title }}</h3>
              <p>{{ achievement.description }}</p>
            </div>
          </div>
        </div>
      </div> 
    </div>

    <div class="border-t border-gray-300"></div>

    <div class="flex justify-between">
      <div class="flex gap-5">
        <button @click="prev" class="flex items-center justify-center p-2 transition rounded-full shadow-lg cursor-pointer border-neutral-400 border-1 bg-tertiary hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:scale-110">
          <Icon name="lucide:chevron-left" size="24" />
        </button>
        <button @click="next" class="flex items-center justify-center p-2 transition rounded-full shadow-lg cursor-pointer border-neutral-400 border-1 bg-tertiary hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:scale-110">
          <Icon name="lucide:chevron-right" size="24" />
        </button>
      </div>
      <div class="flex items-center justify-center">
        <h3 class="text-2xl font-bold">0{{ current + 1 }}/0{{ achievements.length }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const achievements = [
  {
    image: '/images/placeholder.jpg',
    title: 'LKS 2023 Kab. Malang : Kami Lolos Enam Bidang Lomba untuk Menuju Tingkat Provinsi',
    description: 'SMKN 2 Singosari sukses menggelar Lomba Kompetensi Siswa (LKS) SMK tingkat Kabupaten Malang selama dua hari sejak Senin (6/3). Hasilnya, 13 siswa berhasil meraih prestasi dengan 6 bidang lomba lolos ke tingkat Provinsi Jawa Timur.'
  },
  {
    image: '/images/placeholder.jpg',
    title: 'Juara 1 Lomba Karya Tulis Ilmiah Tingkat Nasional',
    description: 'Tim siswa SMKN 2 Singosari berhasil meraih juara 1 dalam Lomba Karya Tulis Ilmiah yang diselenggarakan oleh Kementerian Pendidikan dan Kebudayaan dengan tema Inovasi Teknologi untuk Masa Depan.'
  },
  {
    image: '/images/placeholder.jpg',
    title: 'Prestasi di Kompetisi Robotik Internasional',
    description: 'Siswa jurusan Teknik Mekatronika membawa pulang medali emas dalam kompetisi robotik internasional yang diadakan di Singapura, menunjukkan kemampuan tinggi dalam bidang teknologi.'
  },
  {
    image: '/images/placeholder.jpg',
    title: 'Akreditasi Unggul untuk Program Keahlian RPL',
    description: 'Program Keahlian Rekayasa Perangkat Lunak SMKN 2 Singosari mendapat akreditasi unggul dari Badan Akreditasi Nasional, menjadikan program ini sebagai salah satu yang terbaik di Indonesia.'
  },
  {
    image: '/images/placeholder.jpg',
    title: 'Kerjasama dengan Industri Teknologi Terdepan',
    description: 'SMKN 2 Singosari menjalin kerjasama strategis dengan perusahaan teknologi terkemuka untuk memberikan pengalaman praktis kepada siswa dalam dunia kerja nyata.'
  }
]

const current = ref(0)

const next = () => {
  current.value = (current.value + 1) % achievements.length
}

const prev = () => {
  current.value = (current.value - 1 + achievements.length) % achievements.length
}
</script>