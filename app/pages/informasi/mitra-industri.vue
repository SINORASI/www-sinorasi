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
  <div class="min-h-screen py-24 bg-gradient-to-b from-white via-blue-50 to-white">
    <div class="container px-4 mx-auto sm:px-6">
      <!-- Page Header -->
      <div class="mb-12 text-center">
        <div
          class="inline-block px-10 py-6 mb-6 border border-blue-200 shadow-xl bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl rounded-2xl"
        >
          <h1 class="text-4xl font-bold text-white md:text-5xl">MITRA INDUSTRI</h1>
        </div>
        <p class="max-w-4xl mx-auto text-lg leading-relaxed text-gray-600">
          Mitra industri yang bekerjasama dengan SMK Negeri 02 Singosari dalam bidang Teknik hingga E-Craft baik itu
          kerjasama untuk Prakrin (PKL) ataupun bekerja sama dalam urusan mencari SDM yang jujur, sopan dan berkualitas
          tinggi
        </p>
      </div>

      <!-- Filter Buttons -->
      <div class="flex flex-wrap justify-center gap-3 mb-12">
        <button
          v-for="filter in filters"
          :key="filter.id"
          @click="selectFilter(filter.id)"
          :class="[
            'px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300',
            selectedFilter === filter.id
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600',
          ]"
        >
          {{ filter.label }}
        </button>
      </div>

      <!-- Partners Grid -->
      <div class="mx-auto max-w-7xl">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="partner in filteredPartners"
            :key="partner.id"
            class="p-6 transition-all duration-300 bg-white border-2 border-blue-100 shadow-xl rounded-2xl hover:shadow-2xl hover:border-blue-200"
          >
            <!-- Card Header with Logo and Name -->
            <div class="flex items-start gap-4 mb-4">
              <!-- Logo -->
              <div class="flex-shrink-0 w-16 h-16 overflow-hidden bg-blue-100 rounded-xl">
                <img :src="partner.logo" :alt="partner.name" class="object-cover w-full h-full" />
              </div>
              <!-- Company Name -->
              <div class="flex-1">
                <h3 class="text-lg font-bold leading-tight text-gray-900">
                  {{ partner.name }}
                </h3>
              </div>
            </div>

            <!-- Description -->
            <p class="mb-4 text-sm leading-relaxed text-gray-600">
              {{ partner.description }}
            </p>

            <!-- Lihat Selengkapnya Button -->
            <button
              @click="openDialog(partner)"
              class="inline-flex items-center text-sm font-semibold text-blue-600 transition-colors hover:text-blue-800 group"
            >
              Lihat Selengkapnya
              <Icon name="lucide:arrow-right" size="16" class="ml-1 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Fullscreen Dialog -->
  <Teleport to="body">
    <Transition name="dialog">
      <div
        v-if="showDialog && selectedPartner"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
        @click.self="closeDialog"
      >
        <div
          class="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-blue-100"
        >
          <!-- Close Button -->
          <button
            @click="closeDialog"
            class="sticky z-10 float-right p-2 text-gray-500 transition-all bg-white rounded-full shadow-md top-4 right-4 hover:text-gray-700 hover:shadow-lg"
          >
            <Icon name="lucide:x" size="24" />
          </button>

          <div class="clear-both p-8 md:p-12">
            <div class="grid gap-8 md:grid-cols-2 md:gap-12">
              <!-- Left Side - Carousel -->
              <div class="flex flex-col">
                <!-- Main Image with Carousel -->
                <div class="overflow-hidden bg-white border-2 border-blue-100 shadow-lg rounded-2xl">
                  <div class="relative aspect-square">
                    <div class="flex items-center justify-center w-full h-full p-8 bg-blue-50">
                      <img
                        :src="selectedPartner.images[currentImageIndex]"
                        :alt="selectedPartner.name"
                        class="object-contain max-w-full max-h-full"
                      />
                    </div>

                    <!-- Previous Button -->
                    <button
                      v-if="selectedPartner.images.length > 1"
                      @click="prevImage"
                      class="absolute p-2 transition-all -translate-y-1/2 bg-white rounded-full shadow-lg left-4 top-1/2 hover:bg-blue-600 hover:text-white"
                    >
                      <Icon name="lucide:chevron-left" size="24" />
                    </button>

                    <!-- Next Button -->
                    <button
                      v-if="selectedPartner.images.length > 1"
                      @click="nextImage"
                      class="absolute p-2 transition-all -translate-y-1/2 bg-white rounded-full shadow-lg right-4 top-1/2 hover:bg-blue-600 hover:text-white"
                    >
                      <Icon name="lucide:chevron-right" size="24" />
                    </button>

                    <!-- Dots Indicator -->
                    <div
                      v-if="selectedPartner.images.length > 1"
                      class="absolute flex gap-2 -translate-x-1/2 bottom-4 left-1/2"
                    >
                      <button
                        v-for="(image, index) in selectedPartner.images"
                        :key="index"
                        @click="goToImage(index)"
                        :class="[
                          'rounded-full transition-all',
                          currentImageIndex === index ? 'bg-blue-600 w-6 h-2' : 'bg-gray-300 w-2 h-2 hover:bg-gray-400',
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
                  class="px-6 py-4 mb-6 border border-blue-200 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl"
                >
                  <h2 class="text-2xl font-bold text-white md:text-3xl">
                    {{ selectedPartner.name }}
                  </h2>
                </div>

                <!-- Description Title -->
                <h3 class="flex items-center mb-3 text-lg font-bold text-gray-800">
                  <Icon name="lucide:info" size="20" class="mr-2 text-blue-600" />
                  Deskripsi Industri
                </h3>

                <!-- Full Description -->
                <div class="p-6 mb-8 border-l-4 border-blue-600 bg-blue-50 rounded-r-xl">
                  <p class="leading-relaxed text-justify text-gray-700">
                    {{ selectedPartner.fullDescription }}
                  </p>
                </div>

                <!-- Navigation Buttons -->
                <div class="flex items-center justify-center gap-4 mt-auto">
                  <!-- Kembali Button -->
                  <button
                    @click="closeDialog"
                    class="flex items-center gap-2 px-6 py-3 font-semibold text-gray-700 transition-all bg-white border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:text-blue-600"
                  >
                    <Icon name="lucide:arrow-left" size="18" />
                    Kembali
                  </button>

                  <!-- Home Button -->
                  <NuxtLink
                    to="/"
                    class="p-3 transition-all bg-white border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:text-blue-600"
                  >
                    <Icon name="lucide:home" size="20" />
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
.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.3s ease;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}
</style>
