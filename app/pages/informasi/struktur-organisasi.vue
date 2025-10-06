<script lang="ts" setup>
useHead({
  title: 'Struktur Organisasi - Informasi - SMKN 2 Singosari',
  meta: [
    {
      name: 'description',
      content: 'Struktur organisasi sekolah SMK Negeri 2 Singosari. Kepala sekolah dan jajarannya.'
    }
  ]
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
    <!-- Hero Section -->
    <section class="relative h-[600px] flex items-center justify-center">
      <div class="absolute inset-0 bg-gray-600"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-blue-900/70"></div>
      <div class="relative z-10 text-center text-white px-4">
        <h1 class="text-5xl md:text-6xl font-bold mb-4">Struktur Organisasi</h1>
        <p class="text-xl md:text-2xl">SMK Negeri 2 Singosari</p>
      </div>
    </section>

    <!-- Kepala Sekolah Section -->
    <section class="py-20">
      <div class="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-8 md:p-12">
          <div class="text-center mb-10">
            <div class="bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl shadow-xl rounded-2xl px-10 py-6 border border-blue-200 inline-block">
              <h2 class="text-2xl md:text-3xl font-bold text-white">Kepala Sekolah</h2>
            </div>
          </div>

          <div class="flex flex-col md:flex-row justify-center items-center gap-6 mb-8">
            <div class="w-48 md:w-56">
              <img src="/images/placeholder.jpg" alt="Profile Guru" class="rounded-xl shadow-lg w-full">
            </div>
            <div class="w-64 md:w-80">
              <img src="/images/placeholder.jpg" alt="Profile Guru" class="rounded-xl shadow-lg w-full">
            </div>
            <div class="w-48 md:w-56">
              <img src="/images/placeholder.jpg" alt="Profile Guru" class="rounded-xl shadow-lg w-full">
            </div>
          </div>

          <div class="max-w-2xl mx-auto">
            <p class="text-gray-700 text-center leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, quo iure possimus dolorum eum nihil saepe architecto natus, porro quae nam impedit libero iste id? Enim aliquid illo voluptatibus. Eaque.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Kepala Tata Usaha Section -->
    <section class="py-10">
      <div class="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div class="bg-white rounded-2xl shadow-xl border-2 border-orange-100 p-8 md:p-12">
          <div class="text-center mb-10">
            <div class="bg-gradient-to-r from-orange-500 to-orange-600 backdrop-blur-2xl shadow-xl rounded-2xl px-10 py-6 border border-orange-200 inline-block">
              <h2 class="text-2xl md:text-3xl font-bold text-white">Kepala Tata Usaha</h2>
            </div>
          </div>

          <div class="flex flex-col md:flex-row justify-center items-center gap-6 mb-8">
            <div class="w-48 md:w-56">
              <img src="/images/placeholder.jpg" alt="Profile Guru" class="rounded-xl shadow-lg w-full">
            </div>
            <div class="w-64 md:w-80">
              <img src="/images/placeholder.jpg" alt="Profile Guru" class="rounded-xl shadow-lg w-full">
            </div>
            <div class="w-48 md:w-56">
              <img src="/images/placeholder.jpg" alt="Profile Guru" class="rounded-xl shadow-lg w-full">
            </div>
          </div>

          <div class="max-w-2xl mx-auto">
            <p class="text-gray-700 text-center leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, quo iure possimus dolorum eum nihil saepe architecto natus, porro quae nam impedit libero iste id? Enim aliquid illo voluptatibus. Eaque.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Wakil Kepala Sekolah Section -->
    <section class="py-10 pb-20">
      <div class="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-8 md:p-12">
          <div class="text-center mb-10">
            <div class="bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl shadow-xl rounded-2xl px-8 py-6 border border-blue-200 inline-block">
              <h2 class="text-xl md:text-2xl font-bold text-white">Wakil Kepala Sekolah Bagian Kesiswaan</h2>
            </div>
          </div>

          <div class="flex flex-col md:flex-row justify-center items-center gap-6 mb-8">
            <div class="w-48 md:w-56">
              <img src="/images/placeholder.jpg" alt="Profile Guru" class="rounded-xl shadow-lg w-full">
            </div>
            <div class="w-64 md:w-80">
              <img src="/images/placeholder.jpg" alt="Profile Guru" class="rounded-xl shadow-lg w-full">
            </div>
            <div class="w-48 md:w-56">
              <img src="/images/placeholder.jpg" alt="Profile Guru" class="rounded-xl shadow-lg w-full">
            </div>
          </div>

          <div class="max-w-2xl mx-auto">
            <p class="text-gray-700 text-center leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, quo iure possimus dolorum eum nihil saepe architecto natus, porro quae nam impedit libero iste id? Enim aliquid illo voluptatibus. Eaque.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>