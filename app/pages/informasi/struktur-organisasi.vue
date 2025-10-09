<script lang="ts" setup>
const wakaCards = [
  {
    title: "Waka Kurikulum",
    subtitle: "Curriculum",
    icon: "lucide:book-open",
    color: "blue",
    description: "Mengelola kurikulum pembelajaran, pengembangan materi ajar, dan evaluasi program pendidikan.",
  },
  {
    title: "Waka Kesiswaan",
    subtitle: "Student Affairs",
    icon: "lucide:users",
    color: "green",
    description: "Mengurus kesejahteraan siswa, kegiatan ekstrakurikuler, dan pembinaan karakter siswa.",
  },
  {
    title: "Waka Humas",
    subtitle: "Public Relations",
    icon: "lucide:megaphone",
    color: "orange",
    description: "Menjalin hubungan dengan masyarakat, media, dan stakeholder eksternal sekolah.",
  },
  {
    title: "Waka Sarpras",
    subtitle: "Facilities",
    icon: "lucide:building",
    color: "purple",
    description: "Mengelola sarana dan prasarana sekolah, maintenance, dan pengadaan fasilitas.",
  },
];

const logoPoints = [
  { id: 1, x: 25, y: 25, title: "Buku Terbuka", description: "Simbol ilmu pengetahuan yang terbuka untuk semua siswa" },
  { id: 2, x: 75, y: 25, title: "Roda Gigi", description: "Mewakili teknologi dan inovasi dalam dunia industri" },
  { id: 3, x: 25, y: 75, title: "Gedung Sekolah", description: "Fondasi pendidikan yang kuat dan berkualitas" },
  { id: 4, x: 75, y: 75, title: "Api", description: "Semangat dan motivasi untuk mencapai prestasi" },
];

const selectedPoint = ref<(typeof logoPoints)[0] | null>(null);

const showModal = (point: (typeof logoPoints)[0]) => {
  selectedPoint.value = point;
};

const closeModal = () => {
  selectedPoint.value = null;
};

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
              <img src="/images/kepsek.webp" alt="Kepala Sekolah" class="w-full shadow-lg rounded-xl" />
            </div>
          </div>

          <div class="max-w-2xl mx-auto">
            <p class="leading-relaxed text-center text-gray-700">
              Sumijah, S.Pd., M.Si. memimpin SMK Negeri 2 Singosari dengan komitmen tinggi untuk mencetak generasi muda
              yang unggul dalam bidang kejuruan dan berkarakter.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Wakil Kepala Sekolah Cards -->
    <section class="py-20">
      <div class="container px-4 mx-auto sm:px-6">
        <div class="mb-12 text-center">
          <div
            class="inline-block px-10 py-6 border border-orange-200 shadow-xl bg-gradient-to-r from-orange-500 to-orange-600 backdrop-blur-2xl rounded-2xl"
          >
            <h2 class="text-3xl font-bold text-white">Wakil Kepala Sekolah</h2>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="card in wakaCards"
            :key="card.title"
            class="p-6 transition-all duration-300 bg-white border-2 shadow-xl rounded-2xl hover:shadow-2xl"
          >
            <div class="flex flex-col items-center text-center">
              <div :class="`p-4 rounded-full mb-4 bg-${card.color}-100`">
                <Icon :name="card.icon" :class="`text-${card.color}-600`" size="32" />
              </div>
              <h3 class="mb-2 text-xl font-bold text-gray-800">{{ card.title }}</h3>
              <p class="mb-4 text-sm font-medium text-gray-600">{{ card.subtitle }}</p>
              <p class="text-sm leading-relaxed text-gray-700">{{ card.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Logo Meaning Interactive Section -->
    <section class="py-20 pb-32">
      <div class="container px-4 mx-auto sm:px-6">
        <div class="mb-12 text-center">
          <div
            class="inline-block px-10 py-6 border border-blue-200 shadow-xl bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl rounded-2xl"
          >
            <h2 class="text-3xl font-bold text-white">Makna Logo</h2>
          </div>
        </div>

        <div class="max-w-4xl mx-auto">
          <div class="relative p-8 bg-white border-2 border-blue-100 shadow-xl rounded-2xl">
            <div class="relative">
              <img src="/images/logo-smk.webp" alt="Logo SMK" class="w-full max-w-md mx-auto" />

              <!-- Interactive Points -->
              <button
                v-for="point in logoPoints"
                :key="point.id"
                @click="showModal(point)"
                :style="{ left: point.x + '%', top: point.y + '%' }"
                class="absolute w-6 h-6 transition-transform duration-200 bg-orange-500 border-2 border-white rounded-full shadow-lg hover:scale-125 animate-pulse"
              ></button>
            </div>

            <p class="mt-6 text-center text-gray-700">Klik pada titik-titik di logo untuk mengetahui makna simbolnya</p>
          </div>
        </div>

        <!-- Modal -->
        <div
          v-if="selectedPoint"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          @click="closeModal"
        >
          <div class="max-w-md p-6 bg-white shadow-2xl rounded-2xl" @click.stop>
            <h3 class="mb-3 text-xl font-bold text-gray-800">{{ selectedPoint.title }}</h3>
            <p class="mb-4 text-gray-700">{{ selectedPoint.description }}</p>
            <button @click="closeModal" class="px-4 py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600">
              Tutup
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
