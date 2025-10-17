<script setup lang="ts">
useHead({
  title: "Akun Dinonaktifkan - SMKN 2 Singosari",
  meta: [
    {
      name: "description",
      content: "Sistem akun sementara tidak tersedia.",
    },
  ],
});

</script>

<template>
  <div class="min-h-screen py-24 bg-gradient-to-b from-white via-gray-50 to-white">
    <div class="container px-4 mx-auto sm:px-6">
      <div class="max-w-2xl mx-auto text-center">
        <!-- Header -->
        <div class="mb-8">
          <div class="inline-flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full">
            <Icon name="lucide:user-x" size="40" class="text-gray-600" />
          </div>
          <h1 class="text-3xl font-bold text-gray-800 md:text-4xl">Akun Dinonaktifkan</h1>
          <p class="mt-2 text-gray-600">Sistem akun sementara tidak tersedia</p>
        </div>

        <!-- Message Card -->
        <div class="p-8 bg-white border-2 border-gray-100 shadow-xl rounded-2xl">
          <div class="mb-6">
            <Icon name="lucide:alert-triangle" size="48" class="mx-auto mb-4 text-yellow-500" />
            <h2 class="mb-4 text-xl font-semibold text-gray-800">Fitur Akun Sementara Tidak Tersedia</h2>
            <p class="text-gray-600">
              Sistem manajemen akun sedang dalam pemeliharaan. Anda masih dapat mengakses semua informasi dan konten website lainnya.
            </p>
          </div>

          <div class="mt-8">
            <NuxtLink
              to="/"
              class="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white transition-colors bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg"
            >
              <Icon name="lucide:home" size="20" />
              Kembali ke Beranda
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>