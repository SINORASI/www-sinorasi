<script setup lang="ts">
const selectedFilter = ref("ALL");
const showDialog = ref(false);
const selectedPartner = ref<any>(null);
const currentImageIndex = ref(0);

useHead({
  title: "Mitra Industri - Informasi - SMKN 2 Singosari",
  meta: [
    {
      name: "description",
      content: "Daftar mitra industri dan kerjasama SMK Negeri 2 Singosari dengan berbagai perusahaan.",
    },
  ],
});

const filters = [
  { id: "ALL", label: "ALL" },
  { id: "RPL", label: "RPL" },
  { id: "DKV", label: "DKV" },
  { id: "TKJ", label: "TKJ" },
  { id: "TMT", label: "TMT" },
  { id: "TAV", label: "TAV" },
  { id: "TEI", label: "TEI" },
  { id: "BC", label: "BC" },
  { id: "AN", label: "AN" },
];

const selectFilter = (filterId: string) => {
  selectedFilter.value = filterId;
};

const openDialog = (partner: any) => {
  selectedPartner.value = partner;
  currentImageIndex.value = 0;
  showDialog.value = true;
  document.body.style.overflow = "hidden";
};

const closeDialog = () => {
  showDialog.value = false;
  selectedPartner.value = null;
  document.body.style.overflow = "auto";
};

const nextImage = () => {
  if (selectedPartner.value && selectedPartner.value.images) {
    currentImageIndex.value = (currentImageIndex.value + 1) % selectedPartner.value.images.length;
  }
};

const prevImage = () => {
  if (selectedPartner.value && selectedPartner.value.images) {
    currentImageIndex.value =
      currentImageIndex.value === 0 ? selectedPartner.value.images.length - 1 : currentImageIndex.value - 1;
  }
};

const goToImage = (index: number) => {
  currentImageIndex.value = index;
};

// Sample partner data
const partners = [
  {
    id: 1,
    name: "PT. Raiyan Gaming Sugiliwanto",
    description:
      "ini berita tentang deskripsi dari industri ini, tapi dalam sedkit dan ini narti atau diakhir dengan kata berikut si Lihat Selengkapnya...",
    fullDescription:
      "UBIG adalah suatu pt blalalallala kejuruan rekayasa perangkat lunak kelabapazi dengan indonesia ini sejak tahun 2000 dan lebih dari 100++ siswa siswi yang sudah menjalani pkl dan bahkan nketenrima di dalam industri tersebutkolaborasi dengan industri ini sejak tahun 2000 dan lebih dari 100++ siswa siswi yang sudah menjalani pkl dan bahkan nketenrima di dalam industri tersebutkolaborasi dengan",
    logo: "/images/placeholder.jpg",
    images: ["/images/logo.webp", "/images/logo.webp", "/images/logo.webp"],
    major: "RPL",
  },
  {
    id: 2,
    name: "PT. Raiyan Gaming Sugiliwanto",
    description:
      "ini berita tentang deskripsi dari industri ini, tapi dalam sedkit dan ini narti atau diakhir dengan kata berikut si Lihat Selengkapnya...",
    fullDescription:
      "UBIG adalah suatu pt blalalallala kejuruan rekayasa perangkat lunak kelabapazi dengan indonesia ini sejak tahun 2000 dan lebih dari 100++ siswa siswi yang sudah menjalani pkl dan bahkan nketenrima di dalam industri tersebutkolaborasi dengan industri ini sejak tahun 2000 dan lebih dari 100++ siswa siswi yang sudah menjalani pkl dan bahkan nketenrima di dalam industri tersebutkolaborasi dengan",
    logo: "/images/placeholder.jpg",
    images: ["/images/logo.webp", "/images/logo.webp", "/images/logo.webp"],
    major: "DKV",
  },
  {
    id: 3,
    name: "PT. Raiyan Gaming Sugiliwanto",
    description:
      "ini berita tentang deskripsi dari industri ini, tapi dalam sedkit dan ini narti atau diakhir dengan kata berikut si Lihat Selengkapnya...",
    fullDescription:
      "UBIG adalah suatu pt blalalallala kejuruan rekayasa perangkat lunak kelabapazi dengan indonesia ini sejak tahun 2000 dan lebih dari 100++ siswa siswi yang sudah menjalani pkl dan bahkan nketenrima di dalam industri tersebutkolaborasi dengan industri ini sejak tahun 2000 dan lebih dari 100++ siswa siswi yang sudah menjalani pkl dan bahkan nketenrima di dalam industri tersebutkolaborasi dengan",
    logo: "/images/placeholder.jpg",
    images: ["/images/logo.webp", "/images/logo.webp", "/images/logo.webp"],
    major: "TKJ",
  },
  {
    id: 4,
    name: "PT. Raiyan Gaming Sugiliwanto",
    description:
      "ini berita tentang deskripsi dari industri ini, tapi dalam sedkit dan ini narti atau diakhir dengan kata berikut si Lihat Selengkapnya...",
    fullDescription:
      "UBIG adalah suatu pt blalalallala kejuruan rekayasa perangkat lunak kelabapazi dengan indonesia ini sejak tahun 2000 dan lebih dari 100++ siswa siswi yang sudah menjalani pkl dan bahkan nketenrima di dalam industri tersebutkolaborasi dengan industri ini sejak tahun 2000 dan lebih dari 100++ siswa siswi yang sudah menjalani pkl dan bahkan nketenrima di dalam industri tersebutkolaborasi dengan",
    logo: "/images/placeholder.jpg",
    images: ["/images/logo.webp", "/images/logo.webp", "/images/logo.webp"],
    major: "RPL",
  },
  {
    id: 5,
    name: "PT. Raiyan Gaming Sugiliwanto",
    description:
      "ini berita tentang deskripsi dari industri ini, tapi dalam sedkit dan ini narti atau diakhir dengan kata berikut si Lihat Selengkapnya...",
    fullDescription:
      "UBIG adalah suatu pt blalalallala kejuruan rekayasa perangkat lunak kelabapazi dengan indonesia ini sejak tahun 2000 dan lebih dari 100++ siswa siswi yang sudah menjalani pkl dan bahkan nketenrima di dalam industri tersebutkolaborasi dengan industri ini sejak tahun 2000 dan lebih dari 100++ siswa siswi yang sudah menjalani pkl dan bahkan nketenrima di dalam industri tersebutkolaborasi dengan",
    logo: "/images/placeholder.jpg",
    images: ["/images/logo.webp", "/images/logo.webp", "/images/logo.webp"],
    major: "TMT",
  },
  {
    id: 6,
    name: "PT. Raiyan Gaming Sugiliwanto",
    description:
      "ini berita tentang deskripsi dari industri ini, tapi dalam sedkit dan ini narti atau diakhir dengan kata berikut si Lihat Selengkapnya...",
    fullDescription:
      "UBIG adalah suatu pt blalalallala kejuruan rekayasa perangkat lunak kelabapazi dengan indonesia ini sejak tahun 2000 dan lebih dari 100++ siswa siswi yang sudah menjalani pkl dan bahkan nketenrima di dalam industri tersebutkolaborasi dengan industri ini sejak tahun 2000 dan lebih dari 100++ siswa siswi yang sudah menjalani pkl dan bahkan nketenrima di dalam industri tersebutkolaborasi dengan",
    logo: "/images/placeholder.jpg",
    images: ["/images/logo.webp", "/images/logo.webp", "/images/logo.webp"],
    major: "TAV",
  },
  {
    id: 7,
    name: "PT. Raiyan Gaming Sugiliwanto",
    description:
      "ini berita tentang deskripsi dari industri ini, tapi dalam sedkit dan ini narti atau diakhir dengan kata berikut si Lihat Selengkapnya...",
    fullDescription:
      "UBIG adalah suatu pt blalalallala kejuruan rekayasa perangkat lunak kelabapazi dengan indonesia ini sejak tahun 2000 dan lebih dari 100++ siswa siswi yang sudah menjalani pkl dan bahkan nketenrima di dalam industri tersebutkolaborasi dengan industri ini sejak tahun 2000 dan lebih dari 100++ siswa siswi yang sudah menjalani pkl dan bahkan nketenrima di dalam industri tersebutkolaborasi dengan",
    logo: "/images/placeholder.jpg",
    images: ["/images/logo.webp", "/images/logo.webp", "/images/logo.webp"],
    major: "TEI",
  },
  {
    id: 8,
    name: "PT. Raiyan Gaming Sugiliwanto",
    description:
      "ini berita tentang deskripsi dari industri ini, tapi dalam sedkit dan ini narti atau diakhir dengan kata berikut si Lihat Selengkapnya...",
    fullDescription:
      "UBIG adalah suatu pt blalalallala kejuruan rekayasa perangkat lunak kelabapazi dengan indonesia ini sejak tahun 2000 dan lebih dari 100++ siswa siswi yang sudah menjalani pkl dan bahkan nketenrima di dalam industri tersebutkolaborasi dengan industri ini sejak tahun 2000 dan lebih dari 100++ siswa siswi yang sudah menjalani pkl dan bahkan nketenrima di dalam industri tersebutkolaborasi dengan",
    logo: "/images/placeholder.jpg",
    images: ["/images/logo.webp", "/images/logo.webp", "/images/logo.webp"],
    major: "BC",
  },
  {
    id: 9,
    name: "PT. Raiyan Gaming Sugiliwanto",
    description:
      "ini berita tentang deskripsi dari industri ini, tapi dalam sedkit dan ini narti atau diakhir dengan kata berikut si Lihat Selengkapnya...",
    fullDescription:
      "UBIG adalah suatu pt blalalallala kejuruan rekayasa perangkat lunak kelabapazi dengan indonesia ini sejak tahun 2000 dan lebih dari 100++ siswa siswi yang sudah menjalani pkl dan bahkan nketenrima di dalam industri tersebutkolaborasi dengan industri ini sejak tahun 2000 dan lebih dari 100++ siswa siswi yang sudah menjalani pkl dan bahkan nketenrima di dalam industri tersebutkolaborasi dengan",
    logo: "/images/placeholder.jpg",
    images: ["/images/logo.webp", "/images/logo.webp", "/images/logo.webp"],
    major: "AN",
  },
];

// Computed property to filter partners based on selected filter
const filteredPartners = computed(() => {
  if (selectedFilter.value === "ALL") {
    return partners;
  }
  return partners.filter((partner) => partner.major === selectedFilter.value);
});
</script>

<template>
  <div class="min-h-screen py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <div class="container px-4 mx-auto sm:px-6">
      <div class="max-w-7xl mx-auto bg-white/80 backdrop-blur-xl shadow-2xl shadow-blue-500/10 rounded-3xl overflow-hidden border border-white/20 animate-fade-in">
        <!-- Page Header -->
        <div class="relative px-8 py-16 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
          <div class="absolute inset-0 bg-black/10"></div>
          <div class="absolute inset-0 opacity-20">
            <div class="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
          </div>
          <div class="relative z-10">
            <h1 class="mb-6 text-5xl font-extrabold text-white md:text-6xl lg:text-7xl tracking-tight drop-shadow-lg">
              MITRA INDUSTRI
            </h1>
            <p class="max-w-4xl mx-auto text-xl leading-relaxed text-blue-100 font-medium">
              Mitra industri yang bekerjasama dengan SMK Negeri 02 Singosari dalam bidang Teknik hingga E-Craft baik itu
              kerjasama untuk Prakrin (PKL) ataupun bekerja sama dalam urusan mencari SDM yang jujur, sopan dan berkualitas
              tinggi
            </p>
          </div>
        </div>

        <!-- Filter Navigation Bar -->
        <div class="px-8 py-8 bg-gradient-to-r from-white to-gray-50 border-b border-gray-200/50">
          <div class="flex flex-wrap justify-center gap-4">
            <button
              v-for="(filter, index) in filters"
              :key="filter.id"
              @click="selectFilter(filter.id)"
              :class="[
                'px-8 py-3 rounded-2xl font-bold text-sm transition-all duration-500 transform hover:scale-105 animate-scale-in',
                selectedFilter === filter.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl shadow-blue-500/30 ring-2 ring-blue-500/20'
                  : 'bg-white/80 backdrop-blur-sm text-gray-700 border-2 border-gray-200/50 hover:border-blue-400 hover:text-blue-600 hover:shadow-lg hover:shadow-blue-500/10',
              ]"
              :style="{ animationDelay: `${index * 0.05}s` }"
            >
              {{ filter.label }}
            </button>
          </div>
        </div>

        <!-- Main Content Grid -->
        <div class="px-8 py-16 bg-gradient-to-b from-white to-gray-50/50">
          <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="(partner, index) in filteredPartners"
              :key="partner.id"
              @click="openDialog(partner)"
              class="group relative p-8 transition-all duration-500 bg-white/90 backdrop-blur-sm border border-white/20 shadow-xl shadow-blue-500/5 rounded-3xl hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 hover:scale-[1.02] cursor-pointer overflow-hidden animate-slide-in-up"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              <!-- Gradient overlay on hover -->
              <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <!-- Image Container -->
              <div class="relative mb-6 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl aspect-video group-hover:shadow-lg transition-all duration-500">
                <img :src="partner.logo" :alt="partner.name" class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <!-- Company Information -->
              <div class="relative z-10">
                <h3 class="mb-3 text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                  {{ partner.name }}
                </h3>
                <p class="text-sm leading-relaxed text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  {{ partner.description }}
                </p>
                <!-- View More Indicator -->
                <div class="mt-4 flex items-center text-blue-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <span>Lihat Detail</span>
                  <Icon name="lucide:arrow-right" size="16" class="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Fullscreen Dialog -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="showDialog && selectedPartner"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        @click.self="closeDialog"
      >
        <div
          class="bg-white/95 backdrop-blur-xl rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-y-auto shadow-2xl shadow-blue-500/20 border border-white/20 ring-1 ring-white/10"
        >
          <!-- Close Button -->
          <button
            @click="closeDialog"
            class="sticky z-10 float-right p-3 text-gray-600 transition-all bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl shadow-blue-500/10 top-6 right-6 hover:text-gray-800 hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-110 border border-white/20"
          >
            <Icon name="lucide:x" size="24" />
          </button>

          <div class="clear-both p-8 md:p-12">
            <div class="grid gap-8 md:grid-cols-2 md:gap-12">
              <!-- Left Side - Carousel -->
              <div class="flex flex-col">
                <!-- Main Image with Carousel -->
                <div class="overflow-hidden bg-gradient-to-br from-white to-blue-50/50 border border-blue-200/50 shadow-2xl shadow-blue-500/10 rounded-3xl">
                  <div class="relative aspect-square">
                    <div class="flex items-center justify-center w-full h-full p-8 bg-gradient-to-br from-blue-50/50 to-purple-50/30">
                      <img
                        :src="selectedPartner.images[currentImageIndex]"
                        :alt="selectedPartner.name"
                        class="object-contain max-w-full max-h-full transition-transform duration-300 hover:scale-105"
                      />
                    </div>

                    <!-- Previous Button -->
                    <button
                      v-if="selectedPartner.images.length > 1"
                      @click="prevImage"
                      class="absolute p-3 transition-all duration-300 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl shadow-blue-500/20 left-4 top-1/2 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white hover:scale-110 border border-white/20"
                    >
                      <Icon name="lucide:chevron-left" size="24" />
                    </button>

                    <!-- Next Button -->
                    <button
                      v-if="selectedPartner.images.length > 1"
                      @click="nextImage"
                      class="absolute p-3 transition-all duration-300 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl shadow-blue-500/20 right-4 top-1/2 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white hover:scale-110 border border-white/20"
                    >
                      <Icon name="lucide:chevron-right" size="24" />
                    </button>

                    <!-- Dots Indicator -->
                    <div
                      v-if="selectedPartner.images.length > 1"
                      class="absolute flex gap-3 -translate-x-1/2 bottom-6 left-1/2"
                    >
                      <button
                        v-for="(image, index) in selectedPartner.images"
                        :key="index"
                        @click="goToImage(index)"
                        :class="[
                          'rounded-full transition-all duration-300 hover:scale-125',
                          currentImageIndex === index ? 'bg-gradient-to-r from-blue-600 to-purple-600 w-8 h-3 shadow-lg' : 'bg-white/70 backdrop-blur-sm w-3 h-3 hover:bg-white/90 border border-white/30',
                        ]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right Side - Content -->
              <div class="flex flex-col">
                <!-- Company Name -->
                <div
                  class="px-8 py-6 mb-8 border border-blue-200/50 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-2xl shadow-xl shadow-blue-500/20"
                >
                  <h2 class="text-3xl font-extrabold text-white md:text-4xl tracking-tight drop-shadow-lg">
                    {{ selectedPartner.name }}
                  </h2>
                </div>

                <!-- Description Title -->
                <h3 class="flex items-center mb-3 text-lg font-bold text-gray-800">
                  <Icon name="lucide:info" size="20" class="mr-2 text-blue-600" />
                  Deskripsi Industri
                </h3>

                <!-- Full Description -->
                <div class="p-8 mb-8 border-l-4 border-blue-500 bg-gradient-to-r from-blue-50/80 to-purple-50/60 backdrop-blur-sm rounded-r-2xl shadow-lg shadow-blue-500/5 border border-blue-200/30">
                  <p class="leading-relaxed text-justify text-gray-700 text-lg">
                    {{ selectedPartner.fullDescription }}
                  </p>
                </div>

                <!-- Navigation Buttons -->
                <div class="flex items-center justify-center gap-6 mt-auto">
                  <!-- Kembali Button -->
                  <button
                    @click="closeDialog"
                    class="flex items-center gap-3 px-8 py-4 font-bold text-gray-700 transition-all duration-300 bg-white/90 backdrop-blur-sm border-2 border-gray-200/50 rounded-2xl hover:border-blue-500 hover:text-blue-600 hover:shadow-xl hover:shadow-blue-500/20 hover:scale-105"
                  >
                    <Icon name="lucide:arrow-left" size="20" />
                    Kembali
                  </button>

                  <!-- Home Button -->
                  <NuxtLink
                    to="/"
                    class="p-4 transition-all duration-300 bg-white/90 backdrop-blur-sm border-2 border-gray-200/50 rounded-2xl hover:border-blue-500 hover:text-blue-600 hover:shadow-xl hover:shadow-blue-500/20 hover:scale-105"
                  >
                    <Icon name="lucide:home" size="22" />
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Custom animations for enhanced visual effects */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
  50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.6); }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slide-in-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scale-in {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}

.animate-slide-in-up {
  animation: slide-in-up 0.6s ease-out;
}

.animate-scale-in {
  animation: scale-in 0.5s ease-out;
}

/* Apply floating animation to cards on hover */
.group:hover .group-hover\\:animate-float {
  animation: float 2s ease-in-out infinite;
}

/* Enhanced gradient text effect */
.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Glassmorphism effect */
.glass {
  backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(209, 213, 219, 0.3);
}

/* Smooth scrolling for modal */
.modal-content {
  scroll-behavior: smooth;
}

/* Custom scrollbar for modal */
.modal-content::-webkit-scrollbar {
  width: 8px;
}

.modal-content::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.modal-content::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 10px;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #5a67d8, #6b46c1);
}
</style>

