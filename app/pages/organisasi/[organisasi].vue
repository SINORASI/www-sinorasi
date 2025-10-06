<script lang="ts" setup>
import type { Organization } from '~/models/Organization';

const route = useRoute();
const organizationSlug = route.params.organisasi as string;

// Fetch organization data from API
const { data: organizationData, pending, error } = await useFetch(`/api/organizations/${organizationSlug}`);

const organization = computed(() => organizationData.value as Organization | null);

// Dialog states
const showMembersDialog = ref(false);
const showSeksiBidangDialog = ref(false);
const selectedSection = ref<any>(null);
const carouselIndex = ref(0);

const openMembersDialog = () => {
    showMembersDialog.value = true;
    document.body.style.overflow = 'hidden';
};

const closeMembersDialog = () => {
    showMembersDialog.value = false;
    document.body.style.overflow = '';
};

const openSeksiBidangDialog = (section: any) => {
    selectedSection.value = section;
    carouselIndex.value = 0;
    showSeksiBidangDialog.value = true;
    document.body.style.overflow = 'hidden';
};

const closeSeksiBidangDialog = () => {
    showSeksiBidangDialog.value = false;
    document.body.style.overflow = '';
    selectedSection.value = null;
};

const nextCarousel = () => {
    if (selectedSection.value?.members) {
        carouselIndex.value = (carouselIndex.value + 1) % selectedSection.value.members.length;
    }
};

const prevCarousel = () => {
    if (selectedSection.value?.members) {
        carouselIndex.value = (carouselIndex.value - 1 + selectedSection.value.members.length) % selectedSection.value.members.length;
    }
};

const getVisibleMembers = () => {
    if (!selectedSection.value?.members) return [];
    const members = [];
    for (let i = 0; i < Math.min(5, selectedSection.value.members.length); i++) {
        const index = (carouselIndex.value + i) % selectedSection.value.members.length;
        members.push(selectedSection.value.members[index]);
    }
    return members;
};

// Set page meta
useHead({
  title: computed(() => organization.value ? `${organization.value.name} - SMKN 2 Singosari` : 'Organisasi - SMKN 2 Singosari'),
  meta: [
    {
      name: 'description',
      content: computed(() => organization.value?.description || 'Organisasi siswa di SMK Negeri 2 Singosari')
    }
  ]
});
</script>

<template>
    <div class="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
        <!-- Loading State -->
        <div v-if="pending" class="min-h-screen flex items-center justify-center">
            <div class="flex flex-col items-center gap-4">
                <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
                <p class="text-gray-600 text-lg">Memuat data organisasi...</p>
            </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error || !organization" class="min-h-screen flex items-center justify-center px-4">
            <div class="bg-white rounded-2xl shadow-xl border-2 border-red-200 p-12 text-center max-w-md">
                <Icon name="lucide:alert-circle" size="64" class="text-red-400 mx-auto mb-4" />
                <h3 class="text-xl font-bold text-red-800 mb-2">Organisasi Tidak Ditemukan</h3>
                <p class="text-red-600 mb-6">Organisasi yang Anda cari tidak tersedia.</p>
                <NuxtLink to="/organisasi" class="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                    Kembali ke Daftar Organisasi
                </NuxtLink>
            </div>
        </div>

        <!-- Organization Content -->
        <div v-else>
            <!-- Hero Section -->
            <section class="relative h-screen flex items-center justify-center">
                <div class="absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-800"></div>
                <div class="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-blue-900/70"></div>
                <div class="relative z-10 flex flex-col md:flex-row gap-12 items-center justify-center px-4">
                    <img :src="organization.logo" :alt="`Logo ${organization.name}`" class="h-40 w-40 md:h-60 md:w-60 object-contain drop-shadow-2xl"/>
                    <h1 class="text-5xl md:text-7xl font-bold text-white drop-shadow-lg text-center">
                        {{ organization.name }}
                    </h1>
                </div>
            </section>

            <!-- Statistics Section -->
            <section class="py-20">
                <div class="container mx-auto px-4 sm:px-6 max-w-6xl">
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div v-if="organization.statistics.members" class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-8 text-center hover:shadow-2xl transition-shadow">
                            <div class="text-4xl font-bold text-blue-600 mb-2">{{ organization.statistics.members }}+</div>
                            <div class="text-gray-600 font-medium">Anggota</div>
                        </div>
                        <div v-if="organization.statistics.programs" class="bg-white rounded-2xl shadow-xl border-2 border-orange-100 p-8 text-center hover:shadow-2xl transition-shadow">
                            <div class="text-4xl font-bold text-orange-600 mb-2">{{ organization.statistics.programs }}+</div>
                            <div class="text-gray-600 font-medium">Program Kerja</div>
                        </div>
                        <div v-if="organization.statistics.years" class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-8 text-center hover:shadow-2xl transition-shadow">
                            <div class="text-4xl font-bold text-blue-600 mb-2">{{ organization.statistics.years }}</div>
                            <div class="text-gray-600 font-medium">Tahun Berjalan</div>
                        </div>
                        <div v-if="organization.statistics.meetings" class="bg-white rounded-2xl shadow-xl border-2 border-orange-100 p-8 text-center hover:shadow-2xl transition-shadow">
                            <div class="text-4xl font-bold text-orange-600 mb-2">{{ organization.statistics.meetings }}x</div>
                            <div class="text-gray-600 font-medium">Pertemuan</div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- About Section -->
            <section class="py-20">
                <div class="container mx-auto px-4 sm:px-6 max-w-6xl">
                    <div class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 overflow-hidden">
                        <div class="grid lg:grid-cols-2 gap-0">
                            <div class="flex items-center justify-center p-12 bg-blue-50">
                                <img :src="organization.logo" :alt="`Logo ${organization.name}`" class="h-60 w-60 object-contain"/>
                            </div>
                            <div class="p-8 md:p-12 flex flex-col justify-center">
                                <div class="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl px-6 py-3 border border-blue-200 inline-block mb-6 w-fit">
                                    <h2 class="text-2xl md:text-3xl font-bold text-white">Apa Itu {{ organization.name }}?</h2>
                                </div>
                                <p class="text-gray-700 leading-relaxed mb-6 text-justify">
                                    {{ organization.description }}
                                </p>
                                <div class="bg-blue-50 border-l-4 border-blue-600 rounded-r-xl p-4">
                                    <h3 class="text-xl font-bold text-gray-800 mb-1">
                                        {{ organization.name }}
                                    </h3>
                                    <p class="text-gray-600">
                                        SMK Negeri 2 Singosari
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Organization Structure Grid -->
            <section v-if="organization.sections.length > 0" class="py-20">
                <div class="container mx-auto px-4 sm:px-6 max-w-6xl">
                    <div class="text-center mb-12">
                        <div class="bg-gradient-to-r from-orange-500 to-orange-600 backdrop-blur-2xl shadow-xl rounded-2xl px-10 py-6 border border-orange-200 inline-block mb-4">
                            <h2 class="text-3xl font-bold text-white">Struktur Organisasi</h2>
                        </div>
                    </div>

                    <div class="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
                        <!-- Left Column -->
                        <div class="flex flex-col gap-4">
                            <button
                                v-for="(section, index) in organization.sections.slice(0, Math.ceil(organization.sections.length / 2))"
                                :key="section.id"
                                @click="openSeksiBidangDialog(section)"
                                :class="['bg-white rounded-xl shadow-lg border-2 px-6 py-4 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer',
                                    index % 2 === 0 ? 'border-blue-100 hover:border-blue-300' : 'border-orange-100 hover:border-orange-300']"
                            >
                                <span class="font-bold text-gray-800">{{ section.name }}</span>
                            </button>
                        </div>

                        <!-- Center Logo -->
                        <div class="flex-shrink-0 bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-8">
                            <img :src="organization.logo" :alt="`Logo ${organization.name}`" class="h-32 w-32 object-contain"/>
                        </div>

                        <!-- Right Column -->
                        <div class="flex flex-col gap-4">
                            <button
                                v-for="(section, index) in organization.sections.slice(Math.ceil(organization.sections.length / 2))"
                                :key="section.id"
                                @click="openSeksiBidangDialog(section)"
                                :class="['bg-white rounded-xl shadow-lg border-2 px-6 py-4 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer',
                                    index % 2 === 0 ? 'border-orange-100 hover:border-orange-300' : 'border-blue-100 hover:border-blue-300']"
                            >
                                <span class="font-bold text-gray-800">{{ section.name }}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <!-- History Section -->
            <section v-if="organization.history" class="py-20">
                <div class="container mx-auto px-4 sm:px-6 max-w-6xl">
                    <div class="text-center mb-12">
                        <div class="bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl shadow-xl rounded-2xl px-10 py-6 border border-blue-200 inline-block mb-4">
                            <h2 class="text-3xl font-bold text-white">Sejarah Organisasi {{ organization.name }}</h2>
                        </div>
                        <p class="text-gray-600 text-lg">SMK Negeri 2 Singosari</p>
                    </div>

                    <div class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-8 md:p-12">
                        <p class="text-gray-700 leading-relaxed text-justify">
                            {{ organization.history }}
                        </p>
                    </div>
                </div>
            </section>

            <!-- Leadership Section -->
            <section class="py-20">
                <div class="container mx-auto px-4 sm:px-6 max-w-6xl">
                    <div class="text-center mb-12">
                        <div class="bg-gradient-to-r from-orange-500 to-orange-600 backdrop-blur-2xl shadow-xl rounded-2xl px-10 py-6 border border-orange-200 inline-block mb-4">
                            <h2 class="text-3xl font-bold text-white">Struktur Kepengurusan {{ organization.name }}</h2>
                        </div>
                        <p class="text-gray-600 text-lg">SMK Negeri 2 Singosari</p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        <!-- Sekretaris -->
                        <div v-if="organization.leadership.sekretaris && organization.leadership.sekretaris.length > 0" class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 overflow-hidden hover:shadow-2xl transition-shadow group">
                            <div class="h-48 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center overflow-hidden">
                                <img v-if="organization.leadership.sekretaris[0].image" :src="organization.leadership.sekretaris[0].image" :alt="organization.leadership.sekretaris[0].name" class="w-full h-full object-cover" />
                                <div v-else class="w-20 h-20 bg-blue-200 rounded-full group-hover:scale-110 transition-transform"></div>
                            </div>
                            <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center py-4">
                                <h4 class="font-bold text-lg">SEKRETARIS</h4>
                                <p class="text-sm mt-1">{{ organization.leadership.sekretaris[0].name }}</p>
                            </div>
                        </div>

                        <!-- Ketua & Wakil -->
                        <div v-if="organization.leadership.ketua && organization.leadership.ketua.length > 0" class="bg-white rounded-2xl shadow-xl border-2 border-orange-100 overflow-hidden hover:shadow-2xl transition-shadow group">
                            <div class="h-48 bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center overflow-hidden">
                                <img v-if="organization.leadership.ketua[0].image" :src="organization.leadership.ketua[0].image" :alt="organization.leadership.ketua[0].name" class="w-full h-full object-cover" />
                                <div v-else class="w-20 h-20 bg-orange-200 rounded-full group-hover:scale-110 transition-transform"></div>
                            </div>
                            <div class="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center py-4">
                                <h4 class="font-bold text-lg">KETUA & WAKIL</h4>
                                <p class="text-sm mt-1">{{ organization.leadership.ketua[0].name }}</p>
                                <p v-if="organization.leadership.wakil && organization.leadership.wakil.length > 0" class="text-sm">{{ organization.leadership.wakil[0].name }}</p>
                            </div>
                        </div>

                        <!-- Bendahara -->
                        <div v-if="organization.leadership.bendahara && organization.leadership.bendahara.length > 0" class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 overflow-hidden hover:shadow-2xl transition-shadow group">
                            <div class="h-48 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center overflow-hidden">
                                <img v-if="organization.leadership.bendahara[0].image" :src="organization.leadership.bendahara[0].image" :alt="organization.leadership.bendahara[0].name" class="w-full h-full object-cover" />
                                <div v-else class="w-20 h-20 bg-blue-200 rounded-full group-hover:scale-110 transition-transform"></div>
                            </div>
                            <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center py-4">
                                <h4 class="font-bold text-lg">BENDAHARA</h4>
                                <p class="text-sm mt-1">{{ organization.leadership.bendahara[0].name }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- View All Members Link -->
                    <div v-if="organization.sections.length > 0" class="text-center">
                        <button @click="openMembersDialog" class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-lg group">
                            Lihat Seluruh Anggota
                            <Icon name="lucide:arrow-right" size="20" class="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </section>

            <!-- Latest Activities Section -->
            <section v-if="organization.activities.length > 0" class="py-20">
                <div class="container mx-auto px-4 sm:px-6 max-w-6xl">
                    <div class="mb-12">
                        <div class="bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl shadow-xl rounded-2xl px-10 py-6 border border-blue-200 inline-block mb-4">
                            <h2 class="text-3xl font-bold text-white">Kegiatan Terbaru</h2>
                        </div>
                        <p class="text-gray-600 text-lg">SMK Negeri 2 Singosari</p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div v-for="activity in organization.activities" :key="activity.id" class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 overflow-hidden hover:shadow-2xl hover:border-blue-200 transition-all">
                            <div class="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden">
                                <img v-if="activity.image" :src="activity.image" :alt="activity.title" class="w-full h-full object-cover" />
                                <Icon v-else name="lucide:image" size="48" class="text-gray-400" />
                            </div>
                            <div class="p-6">
                                <h3 class="font-bold text-gray-800 mb-3 text-xl">{{ activity.title }}</h3>
                                <p class="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                                    {{ activity.description }}
                                </p>
                                <div class="flex items-center text-gray-500">
                                    <Icon name="lucide:calendar" size="16" class="mr-2" />
                                    <span class="text-sm font-medium">{{ new Date(activity.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Registration Section -->
            <section v-if="organization.contactInfo" class="py-20">
                <div class="container mx-auto px-4 sm:px-6 max-w-6xl">
                    <div class="text-center mb-12">
                        <div class="bg-gradient-to-r from-orange-500 to-orange-600 backdrop-blur-2xl shadow-xl rounded-2xl px-10 py-6 border border-orange-200 inline-block mb-4">
                            <h2 class="text-3xl font-bold text-white">Informasi Pendaftaran</h2>
                        </div>
                        <p class="text-gray-600 text-lg">SMK Negeri 2 Singosari</p>
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <!-- Contact Card -->
                        <div class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-8">
                            <div class="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl px-6 py-3 border border-blue-200 inline-block mb-6">
                                <h3 class="text-xl font-bold text-white">KONTAK TERKAIT</h3>
                            </div>
                            
                            <div class="space-y-6">
                                <div v-if="organization.contactInfo.instagram && organization.contactInfo.instagram.length > 0">
                                    <div class="flex items-center mb-3">
                                        <Icon name="lucide:instagram" size="20" class="text-pink-500 mr-3" />
                                        <span class="font-semibold text-gray-800">Instagram</span>
                                    </div>
                                    <div class="ml-8 space-y-2">
                                        <a v-for="ig in organization.contactInfo.instagram" :key="ig.handle" :href="`https://instagram.com/${ig.handle.replace('@', '')}`" target="_blank" class="text-sm text-blue-600 hover:text-blue-800 block">
                                            {{ ig.handle }}
                                        </a>
                                    </div>
                                </div>

                                <div v-if="organization.contactInfo.whatsapp && organization.contactInfo.whatsapp.length > 0">
                                    <div class="flex items-center mb-3">
                                        <Icon name="lucide:message-circle" size="20" class="text-green-500 mr-3" />
                                        <span class="font-semibold text-gray-800">WhatsApp</span>
                                    </div>
                                    <div class="ml-8 space-y-2">
                                        <a v-for="wa in organization.contactInfo.whatsapp" :key="wa.number" :href="`https://wa.me/${wa.number.replace(/[^0-9]/g, '')}`" target="_blank" class="text-sm text-blue-600 hover:text-blue-800 block">
                                            {{ wa.number }}
                                        </a>
                                    </div>
                                </div>

                                <div v-if="organization.contactInfo.socialMedia && organization.contactInfo.socialMedia.length > 0" class="pt-4 border-t border-gray-200">
                                    <h4 class="font-semibold text-gray-800 mb-3">Media Sosial Lainnya</h4>
                                    <div class="flex flex-wrap gap-3">
                                        <a v-for="social in organization.contactInfo.socialMedia" :key="social.platform" class="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition text-sm font-medium">
                                            <Icon :name="`lucide:${social.platform === 'facebook' ? 'facebook' : social.platform === 'youtube' ? 'youtube' : social.platform === 'tiktok' ? 'music' : 'share-2'}`" size="16" />
                                            {{ social.platform }}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Recruitment Info -->
                        <div class="bg-white rounded-2xl shadow-xl border-2 border-orange-100 p-8">
                            <div class="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl px-6 py-3 border border-orange-200 inline-block mb-6">
                                <h3 class="text-xl font-bold text-white">PERSYARATAN UMUM</h3>
                            </div>

                            <ul class="space-y-4">
                                <li class="flex items-start gap-3 p-4 bg-orange-50 rounded-xl border-l-4 border-orange-600">
                                    <Icon name="lucide:check-circle" size="20" class="text-orange-600 mt-0.5 flex-shrink-0" />
                                    <span class="text-gray-700">Siswa aktif SMKN 2 Singosari kelas X atau XI</span>
                                </li>
                                <li class="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border-l-4 border-blue-600">
                                    <Icon name="lucide:check-circle" size="20" class="text-blue-600 mt-0.5 flex-shrink-0" />
                                    <span class="text-gray-700">Mengisi formulir pendaftaran</span>
                                </li>
                                <li class="flex items-start gap-3 p-4 bg-orange-50 rounded-xl border-l-4 border-orange-600">
                                    <Icon name="lucide:check-circle" size="20" class="text-orange-600 mt-0.5 flex-shrink-0" />
                                    <span class="text-gray-700">Surat persetujuan orang tua</span>
                                </li>
                                <li class="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border-l-4 border-blue-600">
                                    <Icon name="lucide:check-circle" size="20" class="text-blue-600 mt-0.5 flex-shrink-0" />
                                    <span class="text-gray-700">Mengikuti seleksi administrasi dan wawancara</span>
                                </li>
                            </ul>

                            <div v-if="organization.recruitmentPeriod" class="mt-6 p-4 bg-gradient-to-r from-blue-50 to-orange-50 rounded-xl border-2 border-blue-200">
                                <p class="text-sm font-semibold text-gray-700 mb-1">Periode Pendaftaran</p>
                                <p class="text-lg font-bold text-blue-600">{{ organization.recruitmentPeriod }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <!-- Members Dialog -->
        <Teleport to="body">
            <Transition name="dialog">
                <div v-if="showMembersDialog && organization" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4" @click="closeMembersDialog">
                    <div class="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-blue-100" @click.stop>
                        <div class="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-t-2xl border-b border-blue-200 flex justify-between items-center z-10">
                            <h3 class="text-2xl font-bold text-white">Seluruh Anggota {{ organization.name }}</h3>
                            <button @click="closeMembersDialog" class="text-white hover:text-gray-200 bg-white/20 rounded-full p-2 hover:bg-white/30 transition-colors">
                                <Icon name="lucide:x" size="24" />
                            </button>
                        </div>
                        <div class="p-8">
                            <div v-if="organization.sections.length > 0" class="space-y-8">
                                <div v-for="section in organization.sections" :key="section.id" class="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                                    <h4 class="text-xl font-bold text-gray-800 mb-4">{{ section.name }}</h4>
                                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        <div v-for="member in section.members" :key="member.id" class="bg-white rounded-lg p-4 shadow-md border border-gray-200 text-center">
                                            <img :src="member.image" :alt="member.name" class="w-20 h-20 rounded-full mx-auto mb-3 object-cover" />
                                            <p class="font-semibold text-gray-800 text-sm">{{ member.name }}</p>
                                            <p class="text-xs text-gray-500 mt-1">{{ member.position }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p v-else class="text-gray-600 text-center py-8">Tidak ada data anggota</p>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>

        <!-- Section Detail Dialog -->
        <Teleport to="body">
            <Transition name="dialog">
                <div v-if="showSeksiBidangDialog && selectedSection" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4" @click="closeSeksiBidangDialog">
                    <div class="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-blue-100" @click.stop>
                        <div class="sticky top-0 bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-t-2xl border-b border-orange-200 flex justify-between items-center z-10">
                            <h3 class="text-2xl font-bold text-white">{{ selectedSection.name }}</h3>
                            <button @click="closeSeksiBidangDialog" class="text-white hover:text-gray-200 bg-white/20 rounded-full p-2 hover:bg-white/30 transition-colors">
                                <Icon name="lucide:x" size="24" />
                            </button>
                        </div>
                        <div class="p-8 space-y-8">
                            <!-- Section Info -->
                            <div class="grid md:grid-cols-2 gap-6">
                                <div class="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                                    <h4 class="font-bold text-blue-800 mb-2 flex items-center gap-2">
                                        <Icon name="lucide:eye" size="20" />
                                        Visi
                                    </h4>
                                    <p class="text-gray-700 leading-relaxed">{{ selectedSection.visi }}</p>
                                </div>
                                <div class="bg-orange-50 rounded-xl p-6 border-2 border-orange-200">
                                    <h4 class="font-bold text-orange-800 mb-2 flex items-center gap-2">
                                        <Icon name="lucide:target" size="20" />
                                        Misi
                                    </h4>
                                    <p class="text-gray-700 leading-relaxed">{{ selectedSection.misi }}</p>
                                </div>
                            </div>

                            <!-- Tasks -->
                            <div v-if="selectedSection.tasks" class="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                                <h4 class="font-bold text-gray-800 mb-3 flex items-center gap-2">
                                    <Icon name="lucide:clipboard-check" size="20" />
                                    Tugas & Tanggung Jawab
                                </h4>
                                <p class="text-gray-700 leading-relaxed">{{ selectedSection.tasks }}</p>
                            </div>

                            <!-- Programs -->
                            <div v-if="selectedSection.programs && selectedSection.programs.length > 0" class="bg-white rounded-xl p-6 border-2 border-blue-200">
                                <h4 class="font-bold text-blue-800 mb-4 flex items-center gap-2">
                                    <Icon name="lucide:list-checks" size="20" />
                                    Program Kerja
                                </h4>
                                <ul class="space-y-2">
                                    <li v-for="(program, idx) in selectedSection.programs" :key="idx" class="flex items-start gap-3">
                                        <Icon name="lucide:check-circle-2" size="18" class="text-blue-600 mt-0.5 flex-shrink-0" />
                                        <span class="text-gray-700">{{ program }}</span>
                                    </li>
                                </ul>
                            </div>

                            <!-- Members Carousel -->
                            <div class="bg-white rounded-xl p-6 border-2 border-orange-200">
                                <h4 class="font-bold text-orange-800 mb-6 flex items-center gap-2">
                                    <Icon name="lucide:users" size="20" />
                                    Anggota Seksi ({{ selectedSection.members.length }} orang)
                                </h4>
                                
                                <div class="relative">
                                    <div class="flex justify-center gap-4 mb-6 flex-wrap">
                                        <div v-for="member in getVisibleMembers()" :key="member.id" class="bg-gray-50 rounded-lg p-4 shadow-md border border-gray-200 text-center w-32">
                                            <img :src="member.image" :alt="member.name" class="w-16 h-16 rounded-full mx-auto mb-2 object-cover" />
                                            <p class="font-semibold text-gray-800 text-xs line-clamp-1">{{ member.name }}</p>
                                            <p class="text-xs text-gray-500 mt-1">{{ member.position }}</p>
                                        </div>
                                    </div>
                                    
                                    <div v-if="selectedSection.members.length > 5" class="flex justify-center gap-3">
                                        <button @click="prevCarousel" class="p-2 bg-orange-100 rounded-full hover:bg-orange-200 transition">
                                            <Icon name="lucide:chevron-left" size="20" class="text-orange-600" />
                                        </button>
                                        <button @click="nextCarousel" class="p-2 bg-orange-100 rounded-full hover:bg-orange-200 transition">
                                            <Icon name="lucide:chevron-right" size="20" class="text-orange-600" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
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

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>