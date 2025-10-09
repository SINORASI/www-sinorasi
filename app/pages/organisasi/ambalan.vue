<script setup lang="ts">
useHead({
  title: "AMBALAN - Organisasi - SMKN 2 Singosari",
  meta: [
    {
      name: "description",
      content:
        "AMBALAN (Ambalan Pramuka) SMK Negeri 2 Singosari - Informasi lengkap tentang organisasi pramuka sekolah.",
    },
  ],
});
</script>

<template>
  <div class="min-h-screen py-24 bg-gradient-to-b from-white via-green-50 to-white">
    <div class="container px-4 mx-auto sm:px-6">
      <div class="max-w-6xl mx-auto">
        <!-- Header Section -->
        <div class="mb-12 text-center">
          <div
            class="inline-block px-10 py-6 mb-4 border border-green-200 shadow-xl bg-gradient-to-r from-green-600 to-green-800 backdrop-blur-2xl rounded-2xl"
          >
            <h1 class="text-3xl font-bold text-white md:text-4xl">AMBALAN</h1>
          </div>
          <p class="max-w-2xl mx-auto text-lg text-gray-600">Ambalan Pramuka SMK Negeri 2 Singosari</p>
        </div>

        <!-- Content Will Be Added Later -->
        <div class="p-8 text-center bg-white border-2 border-green-100 shadow-xl rounded-2xl md:p-10">
          <Icon name="lucide:construction" size="64" class="mx-auto mb-4 text-green-600" />
          <h3 class="mb-3 text-2xl font-bold text-gray-800">Konten Segera Hadir</h3>
          <p class="mb-6 text-gray-600">Informasi lengkap tentang AMBALAN akan segera ditambahkan.</p>
          <NuxtLink
            to="/organisasi"
            class="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white transition-colors duration-200 bg-green-600 rounded-lg shadow-md hover:bg-green-700 hover:shadow-lg"
          >
            <Icon name="lucide:arrow-left" size="18" />
            Kembali ke Daftar Organisasi
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
