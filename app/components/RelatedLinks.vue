<template>
  <div class="p-4 sm:p-6 md:p-8">
    <div class="max-w-4xl mx-auto">
      <!-- Optional Title -->
      <h2 class="text-3xl font-bold mb-8">Link Terkait</h2>

      <!-- Links List Container -->
      <div class="flex flex-col gap-5">
        <!-- Loop through each link item -->
        <div v-for="link in links" :key="link.id" class="py-5">
          <div class="flex items-center space-x-4 md:space-x-6">
            <!-- Image/Icon Placeholder -->
            <div class="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-2xl">
              <!-- You can place an <img> or an icon SVG here -->
            </div>

            <!-- Text Content -->
            <div class="flex-grow">
              <h3 class="font-semibold text-lg">{{ link.title }}</h3>
              <p class="text-gray-400 text-sm">{{ link.description }}</p>
            </div>

            <!-- Action Button -->
            <div class="flex-shrink-0">
              <button
                class="cursor-pointer bg-white text-black font-semibold px-6 py-2.5 rounded-lg shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white transition-colors"
              >
                Masuk
              </button>
            </div>
          </div>
          <!-- Separator Line -->
          <div class="mt-5 border-b border-blue-500/30"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Sample data for the related links list
const links = ref([
  { id: 1, title: 'Portal Layanan Publik', description: 'Akses semua layanan di satu tempat.' },
  { id: 2, title: 'Informasi Beasiswa', description: 'Cari tahu tentang peluang beasiswa.' },
  { id: 3, title: 'Cek Status Kependudukan', description: 'Verifikasi data KTP dan KK Anda.' },
  { id: 4, title: 'Layanan Kesehatan Online', description: 'Konsultasi dengan dokter terpercaya.' },
  { id: 5, title: 'Pendaftaran Wajib Pajak', description: 'Daftarkan NPWP Anda secara online.' },
  { id: 6, title: 'Sistem Informasi Akademik', description: 'Portal untuk mahasiswa dan dosen.' },
]);
</script>