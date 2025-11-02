<script setup lang="ts">
useHead({
  title: "Acara - SMKN 2 Singosari",
  meta: [
    {
      name: "description",
      content: "Acara dan kegiatan di SMK Negeri 2 Singosari",
    },
  ],
});
</script>

<template>
  <div class="min-h-screen py-24 bg-linear-to-br from-blue-50 via-white to-purple-50">
    <div class="container px-4 py-8 mx-auto sm:px-6">
      <div class="flex flex-col items-center mb-12">
        <div class="p-6 px-10 py-6 mb-4 border border-blue-200 shadow-2xl bg-linear-to-r from-blue-600 via-blue-700 to-purple-600 rounded-2xl">
          <h1 class="text-3xl font-bold text-white sm:text-4xl">Acara & Kegiatan</h1>
        </div>
        <p class="max-w-2xl text-lg text-center text-gray-700">
          Acara dan kegiatan di SMK Negeri 2 Singosari
        </p>
      </div>

      <div class="p-12 text-center bg-white/80 backdrop-blur-sm border-2 border-blue-100/50 shadow-2xl rounded-2xl">
        <Icon name="lucide:calendar-x" size="64" class="mx-auto mb-4 text-gray-300" />
        <h3 class="mb-2 text-xl font-bold text-gray-700">
          Tidak Ada Acara
        </h3>
        <p class="text-gray-500">
          Belum ada acara yang terdaftar.
        </p>
      </div>
    </div>
  </div>
</template>
