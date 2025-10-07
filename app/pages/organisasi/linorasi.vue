<script setup lang="ts">
useHead({
  title: 'LINORASI - Organisasi - SMKN 2 Singosari',
  meta: [
    {
      name: 'description',
      content: 'LINORASI (Litbang Inovasi Raih Prestasi) SMK Negeri 2 Singosari - Informasi lengkap tentang organisasi litbang sekolah.'
    }
  ]
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-white via-purple-50 to-white py-24">
    <div class="container mx-auto px-4 sm:px-6">
      <div class="max-w-6xl mx-auto">
        <!-- Header Section -->
        <div class="text-center mb-12">
          <div class="bg-gradient-to-r from-purple-600 to-purple-800 backdrop-blur-2xl shadow-xl rounded-2xl px-10 py-6 border border-purple-200 inline-block mb-4">
            <h1 class="text-3xl md:text-4xl font-bold text-white">LINORASI</h1>
          </div>
          <p class="text-gray-600 text-lg max-w-2xl mx-auto">
            Litbang Inovasi Raih Prestasi SMK Negeri 2 Singosari
          </p>
        </div>

        <!-- Content Will Be Added Later -->
        <div class="bg-white rounded-2xl shadow-xl border-2 border-purple-100 p-8 md:p-10 text-center">
          <Icon name="lucide:construction" size="64" class="text-purple-600 mx-auto mb-4" />
          <h3 class="text-2xl font-bold text-gray-800 mb-3">Konten Segera Hadir</h3>
          <p class="text-gray-600 mb-6">
            Informasi lengkap tentang LINORASI akan segera ditambahkan.
          </p>
          <NuxtLink
            to="/organisasi"
            class="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            <Icon name="lucide:arrow-left" size="18" />
            Kembali ke Daftar Organisasi
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
