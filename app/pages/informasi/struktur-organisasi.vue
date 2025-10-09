<script lang="ts" setup>
useHead({
  title: "Struktur Organisasi - Informasi - SMKN 2 Singosari",
  meta: [
    {
      name: "description",
      content: "Struktur organisasi sekolah SMK Negeri 2 Singosari. Kepala sekolah dan jajarannya.",
    },
  ],
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
    <!-- Hero Section -->
    <section class="relative h-[600px] flex items-center justify-center">
      <div class="absolute inset-0 bg-gray-600"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-blue-900/70"></div>
      <div class="relative z-10 px-4 text-center text-white">
        <h1 class="mb-4 text-5xl font-bold md:text-6xl">Struktur Organisasi</h1>
        <p class="text-xl md:text-2xl">SMK Negeri 2 Singosari</p>
      </div>
    </section>

    <!-- Kepala Sekolah Section -->
    <section class="py-20">
      <div class="container max-w-6xl px-4 mx-auto sm:px-6">
        <div class="p-8 bg-white border-2 border-blue-100 shadow-xl rounded-2xl md:p-12">
          <div class="mb-10 text-center">
            <div
              class="inline-block px-10 py-6 border border-blue-200 shadow-xl bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl rounded-2xl"
            >
              <h2 class="text-2xl font-bold text-white md:text-3xl">Kepala Sekolah</h2>
            </div>
          </div>

          <div class="flex flex-col items-center justify-center gap-6 mb-8 md:flex-row">
            <div class="w-48 md:w-56">
              <img src="/images/placeholder.jpg" alt="Profile Guru" class="w-full shadow-lg rounded-xl" />
            </div>
            <div class="w-64 md:w-80">
              <img src="/images/placeholder.jpg" alt="Profile Guru" class="w-full shadow-lg rounded-xl" />
            </div>
            <div class="w-48 md:w-56">
              <img src="/images/placeholder.jpg" alt="Profile Guru" class="w-full shadow-lg rounded-xl" />
            </div>
          </div>

          <div class="max-w-2xl mx-auto">
            <p class="leading-relaxed text-center text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, quo iure possimus dolorum eum nihil
              saepe architecto natus, porro quae nam impedit libero iste id? Enim aliquid illo voluptatibus. Eaque.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Kepala Tata Usaha Section -->
    <section class="py-10">
      <div class="container max-w-6xl px-4 mx-auto sm:px-6">
        <div class="p-8 bg-white border-2 border-orange-100 shadow-xl rounded-2xl md:p-12">
          <div class="mb-10 text-center">
            <div
              class="inline-block px-10 py-6 border border-orange-200 shadow-xl bg-gradient-to-r from-orange-500 to-orange-600 backdrop-blur-2xl rounded-2xl"
            >
              <h2 class="text-2xl font-bold text-white md:text-3xl">Kepala Tata Usaha</h2>
            </div>
          </div>

          <div class="flex flex-col items-center justify-center gap-6 mb-8 md:flex-row">
            <div class="w-48 md:w-56">
              <img src="/images/placeholder.jpg" alt="Profile Guru" class="w-full shadow-lg rounded-xl" />
            </div>
            <div class="w-64 md:w-80">
              <img src="/images/placeholder.jpg" alt="Profile Guru" class="w-full shadow-lg rounded-xl" />
            </div>
            <div class="w-48 md:w-56">
              <img src="/images/placeholder.jpg" alt="Profile Guru" class="w-full shadow-lg rounded-xl" />
            </div>
          </div>

          <div class="max-w-2xl mx-auto">
            <p class="leading-relaxed text-center text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, quo iure possimus dolorum eum nihil
              saepe architecto natus, porro quae nam impedit libero iste id? Enim aliquid illo voluptatibus. Eaque.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Wakil Kepala Sekolah Section -->
    <section class="py-10 pb-20">
      <div class="container max-w-6xl px-4 mx-auto sm:px-6">
        <div class="p-8 bg-white border-2 border-blue-100 shadow-xl rounded-2xl md:p-12">
          <div class="mb-10 text-center">
            <div
              class="inline-block px-8 py-6 border border-blue-200 shadow-xl bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl rounded-2xl"
            >
              <h2 class="text-xl font-bold text-white md:text-2xl">Wakil Kepala Sekolah Bagian Kesiswaan</h2>
            </div>
          </div>

          <div class="flex flex-col items-center justify-center gap-6 mb-8 md:flex-row">
            <div class="w-48 md:w-56">
              <img src="/images/placeholder.jpg" alt="Profile Guru" class="w-full shadow-lg rounded-xl" />
            </div>
            <div class="w-64 md:w-80">
              <img src="/images/placeholder.jpg" alt="Profile Guru" class="w-full shadow-lg rounded-xl" />
            </div>
            <div class="w-48 md:w-56">
              <img src="/images/placeholder.jpg" alt="Profile Guru" class="w-full shadow-lg rounded-xl" />
            </div>
          </div>

          <div class="max-w-2xl mx-auto">
            <p class="leading-relaxed text-center text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, quo iure possimus dolorum eum nihil
              saepe architecto natus, porro quae nam impedit libero iste id? Enim aliquid illo voluptatibus. Eaque.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
