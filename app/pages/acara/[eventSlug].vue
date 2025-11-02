<script setup lang="ts">
useHead({
  title: "Acara Tidak Ditemukan - SMKN 2 Singosari",
  meta: [
    {
      name: "description",
      content: "Acara SMKN 2 Singosari",
    },
  ],
});
</script>

<template>
  <div class="min-h-screen py-24 bg-linear-to-b from-white via-blue-50 to-white">
    <div class="container px-4 mx-auto sm:px-6">
      <div class="py-20 text-center">
        <div class="max-w-2xl p-12 mx-auto bg-white border-2 border-blue-100 shadow-xl rounded-2xl">
          <Icon name="lucide:calendar-x" size="64" class="mx-auto mb-6 text-gray-300" />
          <h1 class="mb-4 text-3xl font-bold text-gray-900">Acara Tidak Ditemukan</h1>
          <p class="mb-8 text-lg text-gray-600">Maaf, acara yang Anda cari tidak tersedia.</p>
          <NuxtLink
            to="/"
            class="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white transition-colors bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg"
          >
            <Icon name="lucide:arrow-left" size="18" />
            Kembali ke Beranda
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
