<script lang="ts" setup>
interface CarouselMember {
    name: string;
    image: string;
}

const showMembersDialog = ref(false);
const showSeksiBidangDialog = ref(false);
const selectedSeksiBidang = ref(1);
const carouselIndex = ref(0);

const openMembersDialog = () => {
    showMembersDialog.value = true;
};

const closeMembersDialog = () => {
    showMembersDialog.value = false;
};

const openSeksiBidangDialog = (bidangNumber: number) => {
    selectedSeksiBidang.value = bidangNumber;
    carouselIndex.value = 0;
    showSeksiBidangDialog.value = true;
};

const closeSeksiBidangDialog = () => {
    showSeksiBidangDialog.value = false;
};

// Carousel data - 5 members
const carouselMembers: CarouselMember[] = [
    { name: 'Sumiijah S.Pd M.Pd', image: '/images/profile-placeholder.png' },
    { name: 'Member 2', image: '/images/profile-placeholder.png' },
    { name: 'Member 3', image: '/images/profile-placeholder.png' },
    { name: 'Member 4', image: '/images/profile-placeholder.png' },
    { name: 'Member 5', image: '/images/profile-placeholder.png' },
];

const nextCarousel = () => {
    carouselIndex.value = (carouselIndex.value + 1) % carouselMembers.length;
};

const prevCarousel = () => {
    carouselIndex.value = (carouselIndex.value - 1 + carouselMembers.length) % carouselMembers.length;
};

const getVisibleMembers = (): CarouselMember[] => {
    const members: CarouselMember[] = [];
    for (let i = 0; i < 5; i++) {
        const index = (carouselIndex.value + i) % carouselMembers.length;
        const member = carouselMembers[index];
        if (member) {
            members.push(member);
        }
    }
    return members;
};
</script>

<template>
    <section class="bg-neutral-500 py-30 h-screen w-full flex items-center justify-center">
        <div class="flex gap-20 items-center justify-around">
            <img src="/images/logo.webp" alt="Logo" class="h-60 w-60 object-contain"/>
            <h1 class="text-6xl font-bold text-transparent whitespace-nowrap" style="-webkit-text-stroke: 1px white;">
                PASKIBRA
            </h1>
        </div>
    </section>
    <section class="min-h-screen container mx-auto py-20">
        <div class="container mx-auto px-8 max-w-6xl">
            <!-- Statistics Cards -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                <div class="bg-white rounded-xl p-6 text-center shadow-lg">
                    <div class="text-3xl font-bold text-gray-800 mb-2">50+</div>
                    <div class="text-gray-600 font-medium">Anggota</div>
                </div>
                <div class="bg-white rounded-xl p-6 text-center shadow-lg">
                    <div class="text-3xl font-bold text-gray-800 mb-2">50+</div>
                    <div class="text-gray-600 font-medium">Program Kerja</div>
                </div>
                <div class="bg-white rounded-xl p-6 text-center shadow-lg">
                    <div class="text-3xl font-bold text-gray-800 mb-2">15 Tahun</div>
                    <div class="text-gray-600 font-medium">Berjalan</div>
                </div>
                <div class="bg-white rounded-xl p-6 text-center shadow-lg">
                    <div class="text-3xl font-bold text-gray-800 mb-2">3x</div>
                    <div class="text-gray-600 font-medium">Pertemuan</div>
                </div>
            </div>

            <!-- Main Content -->
            <div class="flex flex-col lg:flex-row gap-12 items-center">
                <!-- Logo -->
                <div class="flex-shrink-0">
                    <img src="/images/logo.webp" alt="Logo" class="h-40 w-40 lg:h-60 lg:w-60 object-contain"/>
                </div>

                <!-- Text Content -->
                <div class="flex-1 text-center lg:text-left">
                    <h1 class="text-4xl lg:text-6xl font-bold text-gray-800 mb-6">
                        Apa Itu PASKIBRA?
                    </h1>
                    <p class="text-gray-700 text-lg leading-relaxed mb-8">
                        Caranya gampang banget, kamu cuman perlu ngumpulin temen temen yang minat ekstrakurikulernya sama sepertimu, untuk membuat komunitas ekstrakurikuler baru baru, minimal kamu membutuhkan 10 orang atau lebih. setelah itu kalian dapat menghubungi pihak OSIS SMK Negeri 2 Singosari untuk menyampaikan bahwa kalian ingin membuat komunitas ekstrakurikuler baru, dan nantinya dari pihak OSIS akan menyampaikan aspirasi kalian kepada WAKA KESISWAAN atau yang bersangkutan. Nanti, dari pihak sekolah akan membuat keputusan "apakah komunitas ekstrakurikuler baru yang kamu buat itu sudah memenuhi standart atau tidak".
                    </p>
                    
                    <div class="border-l-4 border-blue-500 pl-6">
                        <h2 class="text-2xl font-bold text-gray-800 mb-2">
                            Arti Logo Organisasi Paskibra
                        </h2>
                        <p class="text-gray-600 text-lg">
                            SMK Negeri 02 Singosari
                        </p>
                    </div>
                </div>
            </div>

            <!-- Organization Layout -->
            <div class="mt-20 flex items-center justify-center gap-16">
                <!-- Left Column -->
                <div class="flex flex-col gap-4">
                    <div class="bg-white rounded-lg px-6 py-3 shadow-lg">
                        <span class="font-bold text-gray-800">ORGANISASI</span>
                    </div>
                    <div class="bg-white rounded-lg px-6 py-3 shadow-lg">
                        <span class="font-bold text-gray-800">ORGANISASI</span>
                    </div>
                    <div class="bg-white rounded-lg px-6 py-3 shadow-lg">
                        <span class="font-bold text-gray-800">ORGANISASI</span>
                    </div>
                    <div class="bg-white rounded-lg px-6 py-3 shadow-lg">
                        <span class="font-bold text-gray-800">ORGANISASI</span>
                    </div>
                </div>

                <!-- Center Logo -->
                <div class="flex-shrink-0">
                    <img src="/images/logo.webp" alt="Logo" class="h-32 w-32 object-contain"/>
                </div>

                <!-- Right Column -->
                <div class="flex flex-col gap-4">
                    <div class="bg-white rounded-lg px-6 py-3 shadow-lg">
                        <span class="font-bold text-gray-800">ORGANISASI</span>
                    </div>
                    <div class="bg-white rounded-lg px-6 py-3 shadow-lg">
                        <span class="font-bold text-gray-800">ORGANISASI</span>
                    </div>
                    <div class="bg-white rounded-lg px-6 py-3 shadow-lg">
                        <span class="font-bold text-gray-800">ORGANISASI</span>
                    </div>
                    <div class="bg-white rounded-lg px-6 py-3 shadow-lg">
                        <span class="font-bold text-gray-800">ORGANISASI</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Organizational Structure Section -->
    <section class="py-20 bg-gray-50">
        <div class="container mx-auto px-8 max-w-6xl">
            <!-- Section Header -->
            <div class="text-center mb-16">
                <h2 class="text-4xl font-bold text-gray-800 mb-4">
                    Sejarah Organisasi PASKIBRA?
                </h2>
                <p class="text-gray-600 mb-2">SMK Negeri 02 Singosari</p>
                <p class="text-gray-700 leading-relaxed max-w-4xl mx-auto">
                    Caranya gampang banget, kamu cuman perlu ngumpulin temen temen yang minat ekstrakurikulernya sama sepertimu, untuk membuat komunitas ekstrakurikuler baru baru, minimal kamu membutuhkan 10 orang atau lebih. setelah itu kalian dapat menghubungi pihak OSIS SMK Negeri 2 Singosari untuk menyampaikan bahwa kalian ingin membuat komunitas ekstrakurikuler baru, dan nantinya dari pihak OSIS akan menyampaikan aspirasi kalian kepada WAKA KESISWAAN atau yang bersangkutan. Nanti, dari pihak sekolah akan membuat keputusan "apakah komunitas ekstrakurikuler baru yang kamu buat itu sudah memenuhi standart atau tidak".
                </p>
            </div>

            <!-- Organizational Structure -->
            <div class="text-center mb-12">
                <h3 class="text-3xl font-bold text-gray-800 mb-2">
                    STRUKTUR ORGANISASI PASKIBRA
                </h3>
                <p class="text-gray-600">SMK Negeri 02 Singosari</p>
            </div>

            <!-- Organization Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <!-- Sekretaris -->
                <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div class="h-48 bg-gray-200 flex items-center justify-center">
                        <div class="w-20 h-20 bg-gray-300 rounded-full"></div>
                    </div>
                    <div class="bg-gray-800 text-white text-center py-3">
                        <h4 class="font-bold text-lg">SEKRETARIS</h4>
                    </div>
                </div>

                <!-- Ketua & Wakil -->
                <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div class="h-48 bg-gray-200 flex items-center justify-center">
                        <div class="w-20 h-20 bg-gray-300 rounded-full"></div>
                    </div>
                    <div class="bg-gray-800 text-white text-center py-3">
                        <h4 class="font-bold text-lg">KETUA & WAKIL</h4>
                    </div>
                </div>

                <!-- Bendahara -->
                <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div class="h-48 bg-gray-200 flex items-center justify-center">
                        <div class="w-20 h-20 bg-gray-300 rounded-full"></div>
                    </div>
                    <div class="bg-gray-800 text-white text-center py-3">
                        <h4 class="font-bold text-lg">BENDAHARA</h4>
                    </div>
                </div>
            </div>

            <!-- View All Members Link -->
            <div class="text-center">
                <button @click="openMembersDialog" class="text-blue-600 hover:text-blue-800 font-medium underline">
                    Lihat Seluruh Anggota...
                </button>
            </div>
        </div>
    </section>

    <!-- Latest Activities Section -->
    <section class="py-20 bg-white">
        <div class="container mx-auto px-8 max-w-6xl">
            <!-- Section Header -->
            <div class="mb-12">
                <h2 class="text-4xl font-bold text-gray-800 mb-2">
                    Kegiatan Terbaru Dari Paskibra
                </h2>
                <p class="text-gray-600">SMK Negeri 02 Singosari</p>
            </div>

            <!-- Activities Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Activity Card 1 -->
                <div class="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                    <!-- Image Placeholder -->
                    <div class="h-48 bg-gray-600 flex items-center justify-center">
                        <div class="w-16 h-16 bg-gray-500 rounded"></div>
                    </div>
                    <!-- Content -->
                    <div class="p-4">
                        <h3 class="font-bold text-gray-800 mb-2">Judul Aktivitas</h3>
                        <p class="text-gray-600 text-sm mb-3 leading-relaxed">
                            cadet dpenengs dimasa aktivitas terhadiat walker aktivitasunt tentang aktivitas terhadiat walker dipetiengu tentang aktivitas terhadiat walker...
                        </p>
                        <div class="text-right">
                            <span class="text-gray-500 text-sm font-medium">10-3-2045</span>
                        </div>
                    </div>
                </div>

                <!-- Activity Card 2 -->
                <div class="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                    <!-- Image Placeholder -->
                    <div class="h-48 bg-gray-600 flex items-center justify-center">
                        <div class="w-16 h-16 bg-gray-500 rounded"></div>
                    </div>
                    <!-- Content -->
                    <div class="p-4">
                        <h3 class="font-bold text-gray-800 mb-2">Judul Aktivitas</h3>
                        <p class="text-gray-600 text-sm mb-3 leading-relaxed">
                            cadet dpenengs dimasa aktivitas terhadiat walker aktivitasunt tentang aktivitas terhadiat walker dipetiengu tentang aktivitas terhadiat walker...
                        </p>
                        <div class="text-right">
                            <span class="text-gray-500 text-sm font-medium">10-3-2045</span>
                        </div>
                    </div>
                </div>

                <!-- Activity Card 3 -->
                <div class="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                    <!-- Image Placeholder -->
                    <div class="h-48 bg-gray-600 flex items-center justify-center">
                        <div class="w-16 h-16 bg-gray-500 rounded"></div>
                    </div>
                    <!-- Content -->
                    <div class="p-4">
                        <h3 class="font-bold text-gray-800 mb-2">Judul Aktivitas</h3>
                        <p class="text-gray-600 text-sm mb-3 leading-relaxed">
                            cadet dpenengs dimasa aktivitas terhadiat walker aktivitasunt tentang aktivitas terhadiat walker dipetiengu tentang aktivitas terhadiat walker...
                        </p>
                        <div class="text-right">
                            <span class="text-gray-500 text-sm font-medium">10-3-2045</span>
                        </div>
                    </div>
                </div>

                <!-- Activity Card 4 -->
                <div class="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                    <!-- Image Placeholder -->
                    <div class="h-48 bg-gray-600 flex items-center justify-center">
                        <div class="w-16 h-16 bg-gray-500 rounded"></div>
                    </div>
                    <!-- Content -->
                    <div class="p-4">
                        <h3 class="font-bold text-gray-800 mb-2">Judul Aktivitas</h3>
                        <p class="text-gray-600 text-sm mb-3 leading-relaxed">
                            cadet dpenengs dimasa aktivitas terhadiat walker aktivitasunt tentang aktivitas terhadiat walker dipetiengu tentang aktivitas terhadiat walker...
                        </p>
                        <div class="text-right">
                            <span class="text-gray-500 text-sm font-medium">10-3-2045</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Registration Information Section -->
    <section class="py-20 bg-gray-50">
        <div class="container mx-auto px-8 max-w-6xl">
            <!-- Section Header -->
            <div class="text-center mb-12">
                <h2 class="text-4xl font-bold text-gray-800 mb-2">
                    INFORMASI PENDAFTARAN PASKIBRA
                </h2>
                <p class="text-gray-600">SMK Negeri 02 Singosari</p>
            </div>

            <!-- Content Layout -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Contact Information Card -->
                <div class="bg-white rounded-lg p-6 shadow-lg lg:col-span-1">
                    <h3 class="text-xl font-bold text-gray-800 mb-6">KONTAK TERKAIT</h3>
                    
                    <!-- Instagram Section -->
                    <div class="mb-6">
                        <div class="flex items-center mb-3">
                            <Icon name="lucide:instagram" class="w-6 h-6 text-pink-500 mr-3" />
                            <span class="font-semibold text-gray-800">Instagram</span>
                        </div>
                        <div class="ml-9 space-y-1 text-sm text-gray-600">
                            <div class="flex justify-between">
                                <span>Miftahul</span>
                                <span>: @v_seto_v7</span>
                            </div>
                            <div class="flex justify-between">
                                <span>SMKn 2 SGS</span>
                                <span>: @smkn2_singosari</span>
                            </div>
                            <div class="flex justify-between">
                                <span>OSIS</span>
                                <span>: @osis.stemdasil</span>
                            </div>
                        </div>
                    </div>

                    <!-- WhatsApp Section -->
                    <div class="mb-6">
                        <div class="flex items-center mb-3">
                            <Icon name="lucide:message-circle" class="w-6 h-6 text-green-500 mr-3" />
                            <span class="font-semibold text-gray-800">WhatsApp</span>
                        </div>
                        <div class="ml-9 space-y-1 text-sm text-gray-600">
                            <div class="flex justify-between items-center">
                                <span>Miftahul</span>
                                <div class="flex items-center">
                                    <span>: 083839717167</span>
                                    <Icon name="lucide:external-link" class="w-3 h-3 ml-1" />
                                </div>
                            </div>
                            <div class="flex justify-between items-center">
                                <span>Fauzia</span>
                                <div class="flex items-center">
                                    <span>: 081234567890</span>
                                    <Icon name="lucide:external-link" class="w-3 h-3 ml-1" />
                                </div>
                            </div>
                            <div class="flex justify-between items-center">
                                <span>Admin</span>
                                <div class="flex items-center">
                                    <span>: 089876543210</span>
                                    <Icon name="lucide:external-link" class="w-3 h-3 ml-1" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Media Social Section -->
                    <div>
                        <div class="flex items-center mb-3">
                            <Icon name="lucide:share-2" class="w-6 h-6 text-blue-500 mr-3" />
                            <span class="font-semibold text-gray-800">Media Sosial</span>
                        </div>
                        <div class="ml-9 space-y-1 text-sm text-gray-600">
                            <div class="flex items-center">
                                <Icon name="lucide:facebook" class="w-4 h-4 text-blue-600 mr-2" />
                                <span>SmkndusSingosari</span>
                            </div>
                            <div class="flex items-center">
                                <Icon name="lucide:music" class="w-4 h-4 text-black mr-2" />
                                <span>smkn2_singosari</span>
                            </div>
                            <div class="flex items-center">
                                <Icon name="lucide:instagram" class="w-4 h-4 text-pink-500 mr-2" />
                                <span>smkn2_singosari</span>
                            </div>
                            <div class="flex items-center">
                                <Icon name="lucide:youtube" class="w-4 h-4 text-red-600 mr-2" />
                                <span>SMK NEGERI 2 SINGOSARI Official</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Poster/Recruitment Card -->
                <div class="bg-white rounded-lg p-6 shadow-lg lg:col-span-2">
                    <div class="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                        <div class="text-center text-gray-600">
                            <Icon name="lucide:image" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <p class="font-semibold">Poster Pendaftaran / open recruitment organisasi</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Full Screen Members Dialog -->
    <Teleport to="body">
        <Transition name="fade">
            <div v-if="showMembersDialog" class="fixed inset-0 z-50 bg-white overflow-y-auto">
                <!-- Close Button -->
                <button 
                    @click="closeMembersDialog" 
                    class="fixed top-8 right-8 z-10 bg-gray-800 text-white rounded-full p-3 hover:bg-gray-700 transition-colors shadow-lg"
                >
                    <Icon name="lucide:x" class="w-6 h-6" />
                </button>

                <!-- Dialog Content -->
                <div class="container mx-auto px-8 max-w-6xl py-30">
                    <h2 class="text-4xl font-bold text-gray-800 text-center mb-12">Struktur Organisasi Lengkap</h2>
                    
                    <!-- Leadership Row -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <!-- Sekretaris -->
                        <div class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                            <div class="h-32 bg-gray-200 flex items-center justify-center">
                                <div class="w-16 h-16 bg-gray-300 rounded-full"></div>
                            </div>
                            <div class="bg-gray-800 text-white text-center py-2">
                                <h4 class="font-bold">SEKRETARIS</h4>
                            </div>
                        </div>

                        <!-- Ketua & Wakil -->
                        <div class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                            <div class="h-32 bg-gray-200 flex items-center justify-center">
                                <div class="w-16 h-16 bg-gray-300 rounded-full"></div>
                            </div>
                            <div class="bg-gray-800 text-white text-center py-2">
                                <h4 class="font-bold">KETUA & WAKIL</h4>
                            </div>
                        </div>

                        <!-- Bendahara -->
                        <div class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                            <div class="h-32 bg-gray-200 flex items-center justify-center">
                                <div class="w-16 h-16 bg-gray-300 rounded-full"></div>
                            </div>
                            <div class="bg-gray-800 text-white text-center py-2">
                                <h4 class="font-bold">BENDAHARA</h4>
                            </div>
                        </div>
                    </div>

                    <!-- Sections Grid (2 columns) -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Seksi Bidang 1 -->
                        <button @click="openSeksiBidangDialog(1)" class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer">
                            <div class="h-40 bg-gray-200 flex items-center justify-center">
                                <div class="w-20 h-20 bg-gray-300 rounded-full"></div>
                            </div>
                            <div class="bg-gray-800 text-white text-center py-2">
                                <h4 class="font-bold">SEKSI BIDANG 1</h4>
                            </div>
                        </button>

                        <!-- Seksi Bidang 2 -->
                        <button @click="openSeksiBidangDialog(2)" class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer">
                            <div class="h-40 bg-gray-200 flex items-center justify-center">
                                <div class="w-20 h-20 bg-gray-300 rounded-full"></div>
                            </div>
                            <div class="bg-gray-800 text-white text-center py-2">
                                <h4 class="font-bold">SEKSI BIDANG 2</h4>
                            </div>
                        </button>

                        <!-- Seksi Bidang 3 -->
                        <button @click="openSeksiBidangDialog(3)" class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer">
                            <div class="h-40 bg-gray-200 flex items-center justify-center">
                                <div class="w-20 h-20 bg-gray-300 rounded-full"></div>
                            </div>
                            <div class="bg-gray-800 text-white text-center py-2">
                                <h4 class="font-bold">SEKSI BIDANG 3</h4>
                            </div>
                        </button>

                        <!-- Seksi Bidang 4 -->
                        <button @click="openSeksiBidangDialog(4)" class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer">
                            <div class="h-40 bg-gray-200 flex items-center justify-center">
                                <div class="w-20 h-20 bg-gray-300 rounded-full"></div>
                            </div>
                            <div class="bg-gray-800 text-white text-center py-2">
                                <h4 class="font-bold">SEKSI BIDANG 4</h4>
                            </div>
                        </button>

                        <!-- Seksi Bidang 5 -->
                        <button @click="openSeksiBidangDialog(5)" class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer">
                            <div class="h-40 bg-gray-200 flex items-center justify-center">
                                <div class="w-20 h-20 bg-gray-300 rounded-full"></div>
                            </div>
                            <div class="bg-gray-800 text-white text-center py-2">
                                <h4 class="font-bold">SEKSI BIDANG 5</h4>
                            </div>
                        </button>

                        <!-- Seksi Bidang 6 -->
                        <button @click="openSeksiBidangDialog(6)" class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer">
                            <div class="h-40 bg-gray-200 flex items-center justify-center">
                                <div class="w-20 h-20 bg-gray-300 rounded-full"></div>
                            </div>
                            <div class="bg-gray-800 text-white text-center py-2">
                                <h4 class="font-bold">SEKSI BIDANG 6</h4>
                            </div>
                        </button>

                        <!-- Seksi Bidang 7 -->
                        <button @click="openSeksiBidangDialog(7)" class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer">
                            <div class="h-40 bg-gray-200 flex items-center justify-center">
                                <div class="w-20 h-20 bg-gray-300 rounded-full"></div>
                            </div>
                            <div class="bg-gray-800 text-white text-center py-2">
                                <h4 class="font-bold">SEKSI BIDANG 7</h4>
                            </div>
                        </button>

                        <!-- Seksi Bidang 8 -->
                        <button @click="openSeksiBidangDialog(8)" class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer">
                            <div class="h-40 bg-gray-200 flex items-center justify-center">
                                <div class="w-20 h-20 bg-gray-300 rounded-full"></div>
                            </div>
                            <div class="bg-gray-800 text-white text-center py-2">
                                <h4 class="font-bold">SEKSI BIDANG 8</h4>
                            </div>
                        </button>

                        <!-- Seksi Bidang 9 -->
                        <button @click="openSeksiBidangDialog(9)" class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer">
                            <div class="h-40 bg-gray-200 flex items-center justify-center">
                                <div class="w-20 h-20 bg-gray-300 rounded-full"></div>
                            </div>
                            <div class="bg-gray-800 text-white text-center py-2">
                                <h4 class="font-bold">SEKSI BIDANG 9</h4>
                            </div>
                        </button>

                        <!-- Seksi Bidang 10 -->
                        <button @click="openSeksiBidangDialog(10)" class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer">
                            <div class="h-40 bg-gray-200 flex items-center justify-center">
                                <div class="w-20 h-20 bg-gray-300 rounded-full"></div>
                            </div>
                            <div class="bg-gray-800 text-white text-center py-2">
                                <h4 class="font-bold">SEKSI BIDANG 10</h4>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>

    <!-- Seksi Bidang Detail Dialog -->
    <Teleport to="body">
        <Transition name="fade">
            <div v-if="showSeksiBidangDialog" class="fixed inset-0 z-50 bg-white overflow-y-auto">
                <!-- Close Button -->
                <button 
                    @click="closeSeksiBidangDialog" 
                    class="fixed top-8 right-8 z-10 bg-gray-800 text-white rounded-full p-3 hover:bg-gray-700 transition-colors shadow-lg"
                >
                    <Icon name="lucide:x" class="w-6 h-6" />
                </button>

                <!-- Dialog Content -->
                <div class="container mx-auto px-8 max-w-6xl py-30">
                    <!-- Title -->
                    <h2 class="text-4xl font-bold text-gray-800 text-center mb-8">
                        Ketua Seksi Bidang {{ selectedSeksiBidang }}
                    </h2>

                    <!-- Carousel Section -->
                    <div class="mb-12">
                        <div class="relative">
                            <!-- Carousel Track -->
                            <div class="flex items-center justify-center gap-4 mb-6">
                                <div 
                                    v-for="(member, index) in getVisibleMembers()" 
                                    :key="index"
                                    :class="[
                                        'transition-all duration-300',
                                        index === 2 ? 'scale-100 opacity-100' : 'scale-75 opacity-60'
                                    ]"
                                >
                                    <div class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200" :class="index === 2 ? 'w-40' : 'w-32'">
                                        <div :class="index === 2 ? 'h-44' : 'h-36'" class="bg-gray-300 flex items-center justify-center">
                                            <img :src="member.image" :alt="member.name" class="w-full h-full object-cover" />
                                        </div>
                                        <div v-if="index === 2" class="bg-white text-center py-2 border-t">
                                            <p class="text-sm font-semibold text-gray-800">{{ member.name }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Carousel Controls -->
                            <div class="flex justify-center gap-4">
                                <button 
                                    @click="prevCarousel"
                                    class="bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition-colors"
                                >
                                    <Icon name="lucide:chevron-left" class="w-6 h-6 text-gray-700" />
                                </button>
                                <button 
                                    @click="nextCarousel"
                                    class="bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition-colors"
                                >
                                    <Icon name="lucide:chevron-right" class="w-6 h-6 text-gray-700" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Content Sections -->
                    <div class="space-y-8">
                        <!-- Visi -->
                        <div>
                            <h3 class="text-2xl font-bold text-gray-800 mb-4">Visi</h3>
                            <p class="text-gray-700 leading-relaxed">
                                claret dipajakan tentang area dui gyaru bidang terhadiat, sambattakan "tyaru berbeda indirektical di anak negeri Di Gunopun berubaha mengabartakan insalam mengpositin neperoleh yang 90 guhi area, pancat dui di guhi bidang terhadiat, sambattakan "tyaru berbeda indirektical indalam di anak Di Gunopun berubaha mengan berubaha mengabar mengal mengpositin di gunopun berubaha mengulapaka
                            </p>
                        </div>

                        <!-- Misi -->
                        <div>
                            <h3 class="text-2xl font-bold text-gray-800 mb-4">Misi</h3>
                            <p class="text-gray-700 leading-relaxed">
                                claret dipajakan tentang area dui gyaru bidang terhadiat, sambattakan "tyaru berbeda indirektical di anak negeri Di Gunopun berubaha mengabartakan insalam mengpositin neperoleh yang 90 guhi area, pancat dui di guhi bidang terhadiat, sambattakan "tyaru berbeda indirektical indalam di anak Di Gunopun berubaha mengan berubaha mengabar mengal mengpositin di gunopun berubaha mengulapaka
                            </p>
                        </div>

                        <!-- Tugas dari Ketua -->
                        <div>
                            <h3 class="text-2xl font-bold text-gray-800 mb-4">Tugas dari Ketua</h3>
                            <p class="text-gray-700 leading-relaxed mb-4">
                                claret dipajakan tentang area dui gyaru bidang terhadiat, sambattakan "tyaru berbeda indirektical di anak negeri Di Gunopun berubaha mengabartakan insalam mengpositin neperoleh yang 90 guhi area, pancat dui di guhi bidang terhadiat, sambattakan "tyaru berbeda indirektical indalam di anak Di Gunopun berubaha mengan berubaha mengabar mengal mengpositin di gunopun berubaha mengulapaka
                            </p>
                        </div>

                        <!-- Program Kerja -->
                        <div>
                            <h3 class="text-2xl font-bold text-gray-800 mb-4">Program Kerja</h3>
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <!-- Left Column -->
                                <div class="space-y-3">
                                    <div class="bg-white border border-gray-300 rounded-lg p-4">
                                        <p class="text-gray-700 text-sm">• claret dipajakan tentang asal dui guatu bidang terhadiat</p>
                                    </div>
                                    <div class="bg-white border border-gray-300 rounded-lg p-4">
                                        <p class="text-gray-700 text-sm">• claret dipajakan tentang asal dui gyaru bidang terhadiat sambattakan "tyaru berbeda indirektical di anak negeri Di Gunopun berubaha</p>
                                    </div>
                                    <div class="bg-white border border-gray-300 rounded-lg p-4">
                                        <p class="text-gray-700 text-sm">• claret dipajakan tentang asal dui guatu bidang terhadiat</p>
                                    </div>
                                </div>

                                <!-- Right Column -->
                                <div class="space-y-3">
                                    <div class="bg-white border border-gray-300 rounded-lg p-4">
                                        <p class="text-gray-700 text-sm">• claret dipajakan tentang asal dui gyaru bidang terhadiat sambattakan "tyaru berbeda indirektical di anak negeri Di Gunopun berubaha</p>
                                    </div>
                                    <div class="bg-white border border-gray-300 rounded-lg p-4">
                                        <p class="text-gray-700 text-sm">• claret dipajakan tentang asal dui guatu bidang terhadiat</p>
                                    </div>
                                </div>
                            </div>

                            <p class="text-gray-700 leading-relaxed">
                                claret dipajakan tentang area dui gyaru bidang terhadiat, sambattakan "tyaru berbeda indirektical di anak negeri Di Gunopun berubaha mengabartakan insalam mengpositin neperoleh yang 90 guhi area, pancat dui di guhi bidang terhadiat, sambattakan "tyaru berbeda indirektical indalam berubaha insalam dui di guhi bidang terhadiat, sambattakan "tyaru berbeda indirektical di anak Di Gunopun berubaha mengan dui di guhi bidang terhadiat area "tyaru berbeda indirektical indalam di anak Di Gunopun berubaha mengan berubaha mengabar mengpositin di gunopun berubaha mengulapaka berubaha insalam dui di guhi bidang terhadiat, Gunopun berubaha mengulapaka
                            </p>

                            <!-- Navigation Buttons -->
                            <div class="flex justify-center gap-4 mt-8">
                                <button class="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold px-6 py-2 rounded-lg transition-colors">
                                    <Icon name="lucide:arrow-left" class="w-5 h-5" />
                                    Kembali
                                </button>
                                <button class="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold px-6 py-2 rounded-lg transition-colors">
                                    <Icon name="lucide:home" class="w-5 h-5" />
                                    Selengkapnya
                                    <Icon name="lucide:arrow-right" class="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>