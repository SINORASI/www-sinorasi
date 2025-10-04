<script setup lang="ts">
const selectedFilter = ref('ALL');
const showDialog = ref(false);
const selectedPartner = ref<any>(null);
const currentImageIndex = ref(0);

useHead({
  title: 'Mitra Industri - Informasi - SMKN 2 Singosari',
  meta: [
    {
      name: 'description',
      content: 'Daftar mitra industri dan kerjasama SMK Negeri 2 Singosari dengan berbagai perusahaan.'
    }
  ]
});

const filters = [
    { id: 'ALL', label: 'ALL' },
    { id: 'RPL', label: 'RPL' },
    { id: 'DKV', label: 'DKV' },
    { id: 'TKJ', label: 'TKJ' },
    { id: 'TMT', label: 'TMT' },
    { id: 'TAV', label: 'TAV' },
    { id: 'TEI', label: 'TEI' },
    { id: 'BC', label: 'BC' },
    { id: 'AN', label: 'AN' },
];

const selectFilter = (filterId: string) => {
    selectedFilter.value = filterId;
};

const openDialog = (partner: any) => {
    selectedPartner.value = partner;
    currentImageIndex.value = 0;
    showDialog.value = true;
    document.body.style.overflow = 'hidden';
};

const closeDialog = () => {
    showDialog.value = false;
    selectedPartner.value = null;
    document.body.style.overflow = 'auto';
};

const nextImage = () => {
    if (selectedPartner.value && selectedPartner.value.images) {
        currentImageIndex.value = (currentImageIndex.value + 1) % selectedPartner.value.images.length;
    }
};

const prevImage = () => {
    if (selectedPartner.value && selectedPartner.value.images) {
        currentImageIndex.value = currentImageIndex.value === 0 
            ? selectedPartner.value.images.length - 1 
            : currentImageIndex.value - 1;
    }
};

const goToImage = (index: number) => {
    currentImageIndex.value = index;
};


// Sample partner data
const partners = [
    {
        id: 1,
        name: 'PT. Raiyan Gaming Sugiliwanto',
        description: 'ini berita tentang deskripsi dari industri ini, tapi dalam sedkit dan ini narti atau diakhir dengan kata berikut si Lihat Selengkapnya...',
        fullDescription: 'UBIG adalah suatu pt blalalallala kejuruan rekayasa perangkat lunak kelabapazi dengan indonesia ini sejak tahun 2000 dan lebih dari 100++ siswa siswi yang sudah menjalani pkl dan bahkan nketenrima di dalam industri tersebutkolaborasi dengan industri ini sejak tahun 2000 dan lebih dari 100++ siswa siswi yang sudah menjalani pkl dan bahkan nketenrima di dalam industri tersebutkolaborasi dengan',
        logo: '/images/placeholder.jpg',
        images: ['/images/logo.webp', '/images/logo.webp', '/images/logo.webp'],
        major: 'RPL'
    },
    {
        id: 2,
        name: 'PT. Raiyan Gaming Sugiliwanto',
        description: 'ini berita tentang deskripsi dari industri ini, tapi dalam sedkit dan ini narti atau diakhir dengan kata berikut si Lihat Selengkapnya...',
        fullDescription: 'UBIG adalah suatu pt blalalallala kejuruan rekayasa perangkat lunak kelabapazi dengan indonesia ini sejak tahun 2000 dan lebih dari 100++ siswa siswi yang sudah menjalani pkl dan bahkan nketenrima di dalam industri tersebutkolaborasi dengan industri ini sejak tahun 2000 dan lebih dari 100++ siswa siswi yang sudah menjalani pkl dan bahkan nketenrima di dalam industri tersebutkolaborasi dengan',
        logo: '/images/placeholder.jpg',
        images: ['/images/logo.webp', '/images/logo.webp', '/images/logo.webp'],
        major: 'DKV'
    },
    {
        id: 3,
        name: 'PT. Raiyan Gaming Sugiliwanto',
        description: 'ini berita tentang deskripsi dari industri ini, tapi dalam sedkit dan ini narti atau diakhir dengan kata berikut si Lihat Selengkapnya...',
        fullDescription: 'UBIG adalah suatu pt blalalallala kejuruan rekayasa perangkat lunak kelabapazi dengan indonesia ini sejak tahun 2000 dan lebih dari 100++ siswa siswi yang sudah menjalani pkl dan bahkan nketenrima di dalam industri tersebutkolaborasi dengan industri ini sejak tahun 2000 dan lebih dari 100++ siswa siswi yang sudah menjalani pkl dan bahkan nketenrima di dalam industri tersebutkolaborasi dengan',
        logo: '/images/placeholder.jpg',
        images: ['/images/logo.webp', '/images/logo.webp', '/images/logo.webp'],
        major: 'TKJ'
    },
    {
        id: 4,
        name: 'PT. Raiyan Gaming Sugiliwanto',
        description: 'ini berita tentang deskripsi dari industri ini, tapi dalam sedkit dan ini narti atau diakhir dengan kata berikut si Lihat Selengkapnya...',
        fullDescription: 'UBIG adalah suatu pt blalalallala kejuruan rekayasa perangkat lunak kelabapazi dengan indonesia ini sejak tahun 2000 dan lebih dari 100++ siswa siswi yang sudah menjalani pkl dan bahkan nketenrima di dalam industri tersebutkolaborasi dengan industri ini sejak tahun 2000 dan lebih dari 100++ siswa siswi yang sudah menjalani pkl dan bahkan nketenrima di dalam industri tersebutkolaborasi dengan',
        logo: '/images/placeholder.jpg',
        images: ['/images/logo.webp', '/images/logo.webp', '/images/logo.webp'],
        major: 'RPL'
    },
    {
        id: 5,
        name: 'PT. Raiyan Gaming Sugiliwanto',
        description: 'ini berita tentang deskripsi dari industri ini, tapi dalam sedkit dan ini narti atau diakhir dengan kata berikut si Lihat Selengkapnya...',
        fullDescription: 'UBIG adalah suatu pt blalalallala kejuruan rekayasa perangkat lunak kelabapazi dengan indonesia ini sejak tahun 2000 dan lebih dari 100++ siswa siswi yang sudah menjalani pkl dan bahkan nketenrima di dalam industri tersebutkolaborasi dengan industri ini sejak tahun 2000 dan lebih dari 100++ siswa siswi yang sudah menjalani pkl dan bahkan nketenrima di dalam industri tersebutkolaborasi dengan',
        logo: '/images/placeholder.jpg',
        images: ['/images/logo.webp', '/images/logo.webp', '/images/logo.webp'],
        major: 'TMT'
    },
    {
        id: 6,
        name: 'PT. Raiyan Gaming Sugiliwanto',
        description: 'ini berita tentang deskripsi dari industri ini, tapi dalam sedkit dan ini narti atau diakhir dengan kata berikut si Lihat Selengkapnya...',
        fullDescription: 'UBIG adalah suatu pt blalalallala kejuruan rekayasa perangkat lunak kelabapazi dengan indonesia ini sejak tahun 2000 dan lebih dari 100++ siswa siswi yang sudah menjalani pkl dan bahkan nketenrima di dalam industri tersebutkolaborasi dengan industri ini sejak tahun 2000 dan lebih dari 100++ siswa siswi yang sudah menjalani pkl dan bahkan nketenrima di dalam industri tersebutkolaborasi dengan',
        logo: '/images/placeholder.jpg',
        images: ['/images/logo.webp', '/images/logo.webp', '/images/logo.webp'],
        major: 'TAV'
    },
    {
        id: 7,
        name: 'PT. Raiyan Gaming Sugiliwanto',
        description: 'ini berita tentang deskripsi dari industri ini, tapi dalam sedkit dan ini narti atau diakhir dengan kata berikut si Lihat Selengkapnya...',
        fullDescription: 'UBIG adalah suatu pt blalalallala kejuruan rekayasa perangkat lunak kelabapazi dengan indonesia ini sejak tahun 2000 dan lebih dari 100++ siswa siswi yang sudah menjalani pkl dan bahkan nketenrima di dalam industri tersebutkolaborasi dengan industri ini sejak tahun 2000 dan lebih dari 100++ siswa siswi yang sudah menjalani pkl dan bahkan nketenrima di dalam industri tersebutkolaborasi dengan',
        logo: '/images/placeholder.jpg',
        images: ['/images/logo.webp', '/images/logo.webp', '/images/logo.webp'],
        major: 'TEI'
    },
    {
        id: 8,
        name: 'PT. Raiyan Gaming Sugiliwanto',
        description: 'ini berita tentang deskripsi dari industri ini, tapi dalam sedkit dan ini narti atau diakhir dengan kata berikut si Lihat Selengkapnya...',
        fullDescription: 'UBIG adalah suatu pt blalalallala kejuruan rekayasa perangkat lunak kelabapazi dengan indonesia ini sejak tahun 2000 dan lebih dari 100++ siswa siswi yang sudah menjalani pkl dan bahkan nketenrima di dalam industri tersebutkolaborasi dengan industri ini sejak tahun 2000 dan lebih dari 100++ siswa siswi yang sudah menjalani pkl dan bahkan nketenrima di dalam industri tersebutkolaborasi dengan',
        logo: '/images/placeholder.jpg',
        images: ['/images/logo.webp', '/images/logo.webp', '/images/logo.webp'],
        major: 'BC'
    },
    {
        id: 9,
        name: 'PT. Raiyan Gaming Sugiliwanto',
        description: 'ini berita tentang deskripsi dari industri ini, tapi dalam sedkit dan ini narti atau diakhir dengan kata berikut si Lihat Selengkapnya...',
        fullDescription: 'UBIG adalah suatu pt blalalallala kejuruan rekayasa perangkat lunak kelabapazi dengan indonesia ini sejak tahun 2000 dan lebih dari 100++ siswa siswi yang sudah menjalani pkl dan bahkan nketenrima di dalam industri tersebutkolaborasi dengan industri ini sejak tahun 2000 dan lebih dari 100++ siswa siswi yang sudah menjalani pkl dan bahkan nketenrima di dalam industri tersebutkolaborasi dengan',
        logo: '/images/placeholder.jpg',
        images: ['/images/logo.webp', '/images/logo.webp', '/images/logo.webp'],
        major: 'AN'
    },
];

// Computed property to filter partners based on selected filter
const filteredPartners = computed(() => {
    if (selectedFilter.value === 'ALL') {
        return partners;
    }
    return partners.filter(partner => partner.major === selectedFilter.value);
});
</script>

<template>
    <section class="w-full h-fit bg-black p-4 py-20">
        <div class="max-w-7xl mx-auto">
            <!-- Title -->
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-6">
                MITRA INDUSTRI
            </h1>

            <!-- Description -->
            <p class="text-white text-center text-sm md:text-base lg:text-lg mb-10 max-w-5xl mx-auto px-4">
                Mitra industri yang bekerjasama dengan SMK Negeri 02 Singosari dalam bidang Teknik hingga E-Craft
                baik itu kerjasama untuk Prakrin (PKL) ataupun bekerja sama dalam urusan mencari SDM yang jujur,
                sopan dan berkualitas tinggi
            </p>

            <!-- Filter Buttons -->
            <div class="flex flex-wrap justify-center gap-3 md:gap-4">
                <button
                    v-for="filter in filters"
                    :key="filter.id"
                    @click="selectFilter(filter.id)"
                    :class="[
                        'px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold text-sm md:text-base transition-all duration-300',
                        selectedFilter === filter.id
                            ? 'bg-gray-300 text-black'
                            : 'bg-transparent text-white border-2 border-white hover:bg-white hover:text-black'
                    ]"
                >
                    {{ filter.label }}
                </button>
            </div>
        </div>
    </section>

    <!-- Partners Grid Section -->
    <section class="w-full h-fit bg-blue-600 p-6 md:p-10 lg:p-16">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                    v-for="partner in filteredPartners"
                    :key="partner.id"
                    class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                    <!-- Card Header with Logo and Name -->
                    <div class="flex items-start gap-4 mb-4">
                        <!-- Logo -->
                        <div class="w-16 h-16 bg-gray-700 rounded-xl flex-shrink-0 overflow-hidden">
                            <img 
                                :src="partner.logo" 
                                :alt="partner.name"
                                class="w-full h-full object-cover"
                            />
                        </div>
                        <!-- Company Name -->
                        <div class="flex-1">
                            <h3 class="font-bold text-base md:text-lg text-gray-900 leading-tight">
                                {{ partner.name }}
                            </h3>
                        </div>
                    </div>

                    <!-- Description -->
                    <p class="text-sm text-gray-700 leading-relaxed mb-4">
                        {{ partner.description }}
                    </p>

                    <!-- Lihat Selengkapnya Button -->
                    <button
                        @click="openDialog(partner)"
                        class="text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors duration-200"
                    >
                        Lihat Selengkapnya...
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- Fullscreen Dialog -->
    <Teleport to="body">
        <Transition name="dialog">
            <div
                v-if="showDialog && selectedPartner"
                class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
                @click.self="closeDialog"
            >
                <div class="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl">
                    <!-- Close Button -->
                    <button
                        @click="closeDialog"
                        class="absolute top-6 right-6 text-gray-500 hover:text-gray-700 text-3xl font-bold z-10"
                    >
                        ×
                    </button>

                    <div class="p-8 md:p-12">
                        <div class="grid md:grid-cols-2 gap-8 md:gap-12">
                            <!-- Left Side - Carousel -->
                            <div class="flex flex-col">
                                <!-- Main Image with Carousel -->
                                <div class="relative bg-gray-100 rounded-2xl overflow-hidden aspect-square mb-6">
                                    <img
                                        :src="selectedPartner.images[currentImageIndex]"
                                        :alt="selectedPartner.name"
                                        class="w-full h-full object-contain p-8"
                                    />
                                    
                                    <!-- Previous Button -->
                                    <button
                                        v-if="selectedPartner.images.length > 1"
                                        @click="prevImage"
                                        class="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all"
                                    >
                                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>

                                    <!-- Next Button -->
                                    <button
                                        v-if="selectedPartner.images.length > 1"
                                        @click="nextImage"
                                        class="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all"
                                    >
                                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>

                                    <!-- Dots Indicator -->
                                    <div
                                        v-if="selectedPartner.images.length > 1"
                                        class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2"
                                    >
                                        <button
                                            v-for="(image, index) in selectedPartner.images"
                                            :key="index"
                                            @click="goToImage(index)"
                                            :class="[
                                                'w-2 h-2 rounded-full transition-all',
                                                currentImageIndex === index ? 'bg-blue-600 w-6' : 'bg-gray-400'
                                            ]"
                                        />
                                    </div>
                                </div>
                            </div>

                            <!-- Right Side - Content -->
                            <div class="flex flex-col">
                                <!-- Company Name -->
                                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                    {{ selectedPartner.name }}
                                </h2>

                                <!-- Description Title -->
                                <h3 class="text-lg font-bold text-gray-900 mb-3">
                                    Deskripsi Industri :
                                </h3>

                                <!-- Full Description -->
                                <p class="text-gray-700 text-justify leading-relaxed mb-8">
                                    {{ selectedPartner.fullDescription }}
                                </p>

                                <!-- Navigation Buttons -->
                                <div class="flex items-center justify-center gap-4 mt-auto">
                                    <!-- Kembali Button -->
                                    <button
                                        @click="closeDialog"
                                        class="flex items-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors"
                                    >
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                                        </svg>
                                        Kembali
                                    </button>

                                    <!-- Home Button -->
                                    <button
                                        class="p-3 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                                    >
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                    </button>

                                    <!-- Selanjutnya Button -->
                                    <button
                                        class="flex items-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors"
                                    >
                                        Selanjutnya
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
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