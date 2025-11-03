<script lang="ts" setup>
import { ref } from "vue";

const activeTab = ref<"sarana" | "prasarana">("sarana");

const saranaData = [
  {
    title: "Ruang Kelas",
    status: "Cukup Baik",
    description: "Tempat duduk dan meja siswa dalam kondisi cukup baik",
    icon: "lucide:door-open",
  },
  {
    title: "Lab Mekatronika",
    status: "Baik",
    description: "Fasilitas perakitan sepeda listrik dan peralatan mekatronika lengkap",
    icon: "lucide:cpu",
  },
  {
    title: "Lab Komputer",
    status: "Baik",
    description: "Komputer modern untuk mendukung pembelajaran teknologi informasi",
    icon: "lucide:computer",
  },
  {
    title: "Bengkel",
    status: "Baik",
    description: "Tempat praktik dan pembelajaran keterampilan teknik",
    icon: "lucide:wrench",
  },
  {
    title: "Perpustakaan",
    status: "Lengkap",
    description: "Koleksi buku yang terus bertambah untuk penunjang pembelajaran",
    icon: "lucide:book-open",
  },
  {
    title: "Media Pembelajaran",
    status: "Memadai",
    description: "Berbagai media pembelajaran untuk menunjang kegiatan belajar mengajar",
    icon: "lucide:presentation",
  },
];

const prasaranaData = [
  {
    facility: "Ruang Kelas",
    condition: "98% baik, 2% kurang baik",
    status: "Sangat Baik",
  },
  {
    facility: "Ruang Kantor",
    condition: "100% baik",
    status: "Sempurna",
  },
  {
    facility: "Ruang UKS",
    condition: "Belum memadai",
    status: "Perlu Peningkatan",
  },
  {
    facility: "Perpustakaan",
    condition: "90% baik",
    status: "Baik",
  },
  {
    facility: "Ruang Lab",
    condition: "Baik",
    status: "Baik",
  },
  {
    facility: "Kamar Kecil",
    condition: "85% baik",
    status: "Baik",
  },
  {
    facility: "Masjid (Tempat Ibadah)",
    condition: "100% baik",
    status: "Sempurna",
  },
  {
    facility: "Tempat Olahraga",
    condition: "75% baik",
    status: "Cukup Baik",
  },
];

const infrastrukturImages = [
  { src: "/images/infrastruktur/bkkdepan.jpg", alt: "BKK Depan" },
  { src: "/images/infrastruktur/depankaproav.jpg", alt: "Depan KAPRO AV" },
  { src: "/images/infrastruktur/gedunggedungdroneview.jpg", alt: "Gedung Drone View" },
  { src: "/images/infrastruktur/lapangan.jpg", alt: "Lapangan" },
  { src: "/images/infrastruktur/lapanganvoli.jpg", alt: "Lapangan Voli" },
  { src: "/images/infrastruktur/lobbydepan.jpg", alt: "Lobby Depan" },
  { src: "/images/infrastruktur/masjiddepan.jpg", alt: "Masjid Depan" },
];

useHead({
  title: "Sarana Prasarana - Informasi - SMKN 2 Singosari",
  meta: [
    {
      name: "description",
      content: "Fasilitas sarana dan prasarana yang tersedia di SMK Negeri 2 Singosari untuk mendukung pembelajaran.",
    },
  ],
});

const getStatusColor = (status: string) => {
  switch (status) {
    case "Sempurna":
      return "bg-green-100 text-green-800 border-green-300";
    case "Sangat Baik":
      return "bg-green-100 text-green-800 border-green-300";
    case "Baik":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "Cukup Baik":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "Perlu Peningkatan":
      return "bg-red-100 text-red-800 border-red-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};
</script>

<template>
  <div class="min-h-screen bg-linear-to-b from-white via-blue-50 to-white">
    <!-- Hero Section -->
    <section class="py-12 pt-32">
      <div class="container max-w-6xl px-4 mx-auto sm:px-6">
        <div class="text-center mb-16">
          <h1 class="text-5xl font-bold text-gray-900 mb-6">Sarana & Prasarana</h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            SMK Negeri 2 Singosari dilengkapi dengan berbagai fasilitas modern untuk mendukung proses pembelajaran yang optimal
          </p>
        </div>

        <!-- Tab Navigation -->
        <div class="flex justify-center gap-4 mb-12">
          <button
            @click="activeTab = 'sarana'"
            :class="[
              'px-8 py-3 font-semibold rounded-xl transition-all',
              activeTab === 'sarana'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white border-2 border-blue-200 text-gray-700 hover:border-blue-400',
            ]"
          >
            <Icon name="lucide:building-2" size="18" class="inline mr-2" />
            Sarana Pembelajaran
          </button>
          <button
            @click="activeTab = 'prasarana'"
            :class="[
              'px-8 py-3 font-semibold rounded-xl transition-all',
              activeTab === 'prasarana'
                ? 'bg-orange-600 text-white shadow-lg'
                : 'bg-white border-2 border-orange-200 text-gray-700 hover:border-orange-400',
            ]"
          >
            <Icon name="lucide:hard-hat" size="18" class="inline mr-2" />
            Prasarana Penunjang
          </button>
        </div>
      </div>
    </section>

    <!-- Sarana Section -->
    <section v-show="activeTab === 'sarana'" class="">
      <div class="container max-w-6xl px-4 pb-24 mx-auto sm:px-6">
        <!-- Overview Card -->
        <div class="mb-12">
          <div class="p-8 bg-linear-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl shadow-lg">
            <div class="flex items-start gap-4">
              <Icon name="lucide:info" size="32" class="text-blue-600 shrink-0 mt-1" />
              <div>
                <h2 class="text-2xl font-bold text-gray-900 mb-3">Sarana Pembelajaran</h2>
                <p class="text-gray-700 leading-relaxed">
                  Sarana pembelajaran di SMK Negeri 2 Singosari dapat dikatan cukup baik. Tempat duduk dan meja siswa yang ada di dalam ruangan dalam kondisi cukup baik. Untuk media pembelajaran sudah memadai, dengan tersedianya fasilitas-fasilitas modern untuk menunjang proses belajar mengajar yang efektif.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sarana Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(item, index) in saranaData" :key="index" class="group">
            <div class="h-full p-6 bg-white border-2 border-blue-100 rounded-2xl shadow-lg hover:shadow-xl hover:border-blue-300 transition-all duration-300">
              <div class="flex items-center justify-between mb-4">
                <Icon :name="item.icon" size="32" class="text-blue-600" />
                <span class="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                  {{ item.status }}
                </span>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">{{ item.title }}</h3>
              <p class="text-gray-600">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Prasarana Section -->
    <section v-show="activeTab === 'prasarana'" class="py-16">
      <div class="container max-w-6xl px-4 mx-auto sm:px-6">
        <!-- Overview Card -->
        <div class="mb-12">
          <div class="p-8 bg-linear-to-r from-orange-50 to-orange-100 border-2 border-orange-200 rounded-2xl shadow-lg">
            <div class="flex items-start gap-4">
              <Icon name="lucide:info" size="32" class="text-orange-600 shrink-0 mt-1" />
              <div>
                <h2 class="text-2xl font-bold text-gray-900 mb-3">Prasarana Penunjang</h2>
                <p class="text-gray-700 leading-relaxed">
                  Prasarana penunjang pembelajaran pada semua kelas tersedia dan sesuai dengan kondisi masing-masing. Berikut adalah kondisi detail dari setiap fasilitas prasarana yang ada di sekolah kami.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Prasarana Table -->
        <div class="mb-12">
          <h3 class="text-2xl font-bold text-gray-900 mb-6">Kondisi Fasilitas</h3>
          <div class="overflow-x-auto rounded-2xl border-2 border-orange-100 shadow-lg">
            <table class="w-full">
              <thead>
                <tr class="bg-linear-to-r from-orange-500 to-orange-600">
                  <th class="px-6 py-4 text-left text-white font-semibold">Fasilitas</th>
                  <th class="px-6 py-4 text-left text-white font-semibold">Kondisi</th>
                  <th class="px-6 py-4 text-center text-white font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in prasaranaData"
                  :key="index"
                  :class="[index % 2 === 0 ? 'bg-white' : 'bg-orange-50', 'hover:bg-orange-100 transition-colors']"
                >
                  <td class="px-6 py-4 text-gray-900 font-medium">{{ item.facility }}</td>
                  <td class="px-6 py-4 text-gray-700">{{ item.condition }}</td>
                  <td class="px-6 py-4 text-center">
                    <span :class="['inline-block px-4 py-2 rounded-full text-sm font-semibold border', getStatusColor(item.status)]">
                      {{ item.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Infrastruktur Gallery -->
        <div class="mb-12">
          <h3 class="text-2xl font-bold text-gray-900 mb-6">Galeri Infrastruktur</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="(image, index) in infrastrukturImages" :key="index" class="group">
              <div class="overflow-hidden bg-white border-2 border-orange-100 rounded-2xl shadow-lg hover:shadow-xl hover:border-orange-300 transition-all duration-300">
                <div class="relative w-full h-48 overflow-hidden bg-gray-200">
                  <img
                    :src="image.src"
                    :alt="image.alt"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div class="p-4">
                  <p class="text-sm font-semibold text-gray-700 text-center">{{ image.alt }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
