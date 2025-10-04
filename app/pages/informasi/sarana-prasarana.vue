<script lang="ts" setup>

</script>

<template>
  <div class="py-30">
    <ImageCarousel />
  </div>
  <div class="px-4 py-12 font-serif bg-neutral-100 sm:px-6 lg:px-8">
    <div class="container mx-auto">
      <div class="mb-10 text-center">
        <div class="p-4 border rounded-lg bg-neutral-200/50 backdrop-blur-2xl border-neutral-300">
          <h2 class="text-3xl font-bold">Sarana dan Prasarana</h2>
        </div>
      </div>
      <p class="mb-8 text-center text-gray-700">
        Berikut adalah fasilitas dan infrastruktur yang tersedia di SMK Negeri 2 Singosari untuk mendukung kegiatan belajar mengajar dan kegiatan siswa lainnya.
      </p>
      <div class="flex flex-wrap justify-center gap-6 mb-12 md:gap-8">
        <div class="text-center">
          <div class="text-2xl font-bold text-blue-600 md:text-3xl">5</div>
          <div class="text-sm text-gray-700 md:text-base">Laboratorium</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-blue-600 md:text-3xl">24</div>
          <div class="text-sm text-gray-700 md:text-base">Ruang Kelas</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-blue-600 md:text-3xl">1</div>
          <div class="text-sm text-gray-700 md:text-base">Aula</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-blue-600 md:text-3xl">2</div>
          <div class="text-sm text-gray-700 md:text-base">Lapangan Olahraga</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-blue-600 md:text-3xl">1</div>
          <div class="text-sm text-gray-700 md:text-base">Perpustakaan</div>
        </div>
      </div>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="facility in facilities" :key="facility.name" class="overflow-hidden bg-white rounded-lg shadow-md">
          <img :src="facility.image" :alt="facility.name" class="object-cover w-full h-48" />
          <div class="p-6">
            <h3 class="mb-2 text-xl font-semibold">{{ facility.name }}</h3>
            <p class="mb-4 text-gray-700">{{ facility.description }}</p>
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