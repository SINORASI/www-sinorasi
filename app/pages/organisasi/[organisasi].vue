<script lang="ts" setup>
import type { Organization } from "~/models/Organization";

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
  document.body.style.overflow = "hidden";
};

const closeMembersDialog = () => {
  showMembersDialog.value = false;
  document.body.style.overflow = "";
};

const openSeksiBidangDialog = (section: any) => {
  selectedSection.value = section;
  carouselIndex.value = 0;
  showSeksiBidangDialog.value = true;
  document.body.style.overflow = "hidden";
};

const closeSeksiBidangDialog = () => {
  showSeksiBidangDialog.value = false;
  document.body.style.overflow = "";
  selectedSection.value = null;
};

const nextCarousel = () => {
  if (selectedSection.value?.members) {
    carouselIndex.value = (carouselIndex.value + 1) % selectedSection.value.members.length;
  }
};

const prevCarousel = () => {
  if (selectedSection.value?.members) {
    carouselIndex.value =
      (carouselIndex.value - 1 + selectedSection.value.members.length) % selectedSection.value.members.length;
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
  title: computed(() =>
    organization.value ? `${organization.value.name} - SMKN 2 Singosari` : "Organisasi - SMKN 2 Singosari"
  ),
  meta: [
    {
      name: "description",
      content: computed(() => organization.value?.description || "Organisasi siswa di SMK Negeri 2 Singosari"),
    },
  ],
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
    <!-- Loading State -->
    <div v-if="pending" class="flex items-center justify-center min-h-screen">
      <div class="flex flex-col items-center gap-4">
        <div class="w-16 h-16 border-b-4 border-blue-600 rounded-full animate-spin"></div>
        <p class="text-lg text-gray-600">Memuat data organisasi...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error || !organization" class="flex items-center justify-center min-h-screen px-4">
      <div class="max-w-md p-12 text-center bg-white border-2 border-red-200 shadow-xl rounded-2xl">
        <Icon name="lucide:alert-circle" size="64" class="mx-auto mb-4 text-red-400" />
        <h3 class="mb-2 text-xl font-bold text-red-800">Organisasi Tidak Ditemukan</h3>
        <p class="mb-6 text-red-600">Organisasi yang Anda cari tidak tersedia.</p>
        <NuxtLink
          to="/organisasi"
          class="inline-block px-6 py-3 font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Kembali ke Daftar Organisasi
        </NuxtLink>
      </div>
    </div>

    <!-- Organization Content -->
    <div v-else>
      <!-- Hero Section -->
      <section class="relative flex items-center justify-center h-screen">
        <div class="absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-800"></div>
        <div class="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-blue-900/70"></div>
        <div class="relative z-10 flex flex-col items-center justify-center gap-12 px-4 md:flex-row">
          <img
            :src="organization.logo"
            :alt="`Logo ${organization.name}`"
            class="object-contain w-40 h-40 md:h-60 md:w-60 drop-shadow-2xl"
          />
          <h1 class="text-5xl font-bold text-center text-white md:text-7xl drop-shadow-lg">
            {{ organization.name }}
          </h1>
        </div>
      </section>

      <!-- Statistics Section -->
      <section class="py-20">
        <div class="container max-w-6xl px-4 mx-auto sm:px-6">
          <div class="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div
              v-if="organization.statistics.members"
              class="p-8 text-center transition-shadow bg-white border-2 border-blue-100 shadow-xl rounded-2xl hover:shadow-2xl"
            >
              <div class="mb-2 text-4xl font-bold text-blue-600">{{ organization.statistics.members }}+</div>
              <div class="font-medium text-gray-600">Anggota</div>
            </div>
            <div
              v-if="organization.statistics.programs"
              class="p-8 text-center transition-shadow bg-white border-2 border-orange-100 shadow-xl rounded-2xl hover:shadow-2xl"
            >
              <div class="mb-2 text-4xl font-bold text-orange-600">{{ organization.statistics.programs }}+</div>
              <div class="font-medium text-gray-600">Program Kerja</div>
            </div>
            <div
              v-if="organization.statistics.years"
              class="p-8 text-center transition-shadow bg-white border-2 border-blue-100 shadow-xl rounded-2xl hover:shadow-2xl"
            >
              <div class="mb-2 text-4xl font-bold text-blue-600">{{ organization.statistics.years }}</div>
              <div class="font-medium text-gray-600">Tahun Berjalan</div>
            </div>
            <div
              v-if="organization.statistics.meetings"
              class="p-8 text-center transition-shadow bg-white border-2 border-orange-100 shadow-xl rounded-2xl hover:shadow-2xl"
            >
              <div class="mb-2 text-4xl font-bold text-orange-600">{{ organization.statistics.meetings }}x</div>
              <div class="font-medium text-gray-600">Pertemuan</div>
            </div>
          </div>
        </div>
      </section>

      <!-- About Section -->
      <section class="py-20">
        <div class="container max-w-6xl px-4 mx-auto sm:px-6">
          <div class="overflow-hidden bg-white border-2 border-blue-100 shadow-xl rounded-2xl">
            <div class="grid gap-0 lg:grid-cols-2">
              <div class="flex items-center justify-center p-12 bg-blue-50">
                <img :src="organization.logo" :alt="`Logo ${organization.name}`" class="object-contain h-60 w-60" />
              </div>
              <div class="flex flex-col justify-center p-8 md:p-12">
                <div
                  class="inline-block px-6 py-3 mb-6 border border-blue-200 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl w-fit"
                >
                  <h2 class="text-2xl font-bold text-white md:text-3xl">Apa Itu {{ organization.name }}?</h2>
                </div>
                <p class="mb-6 leading-relaxed text-justify text-gray-700">
                  {{ organization.description }}
                </p>
                <div class="p-4 border-l-4 border-blue-600 bg-blue-50 rounded-r-xl">
                  <h3 class="mb-1 text-xl font-bold text-gray-800">
                    {{ organization.name }}
                  </h3>
                  <p class="text-gray-600">SMK Negeri 2 Singosari</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Organization Structure Grid -->
      <section v-if="organization.sections.length > 0" class="py-20">
        <div class="container max-w-6xl px-4 mx-auto sm:px-6">
          <div class="mb-12 text-center">
            <div
              class="inline-block px-10 py-6 mb-4 border border-orange-200 shadow-xl bg-gradient-to-r from-orange-500 to-orange-600 backdrop-blur-2xl rounded-2xl"
            >
              <h2 class="text-3xl font-bold text-white">Struktur Organisasi</h2>
            </div>
          </div>

          <div class="flex flex-col items-center justify-center gap-8 lg:flex-row lg:gap-16">
            <!-- Left Column -->
            <div class="flex flex-col gap-4">
              <button
                v-for="(section, index) in organization.sections.slice(0, Math.ceil(organization.sections.length / 2))"
                :key="section.id"
                @click="openSeksiBidangDialog(section)"
                :class="[
                  'bg-white rounded-xl shadow-lg border-2 px-6 py-4 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer',
                  index % 2 === 0
                    ? 'border-blue-100 hover:border-blue-300'
                    : 'border-orange-100 hover:border-orange-300',
                ]"
              >
                <span class="font-bold text-gray-800">{{ section.name }}</span>
              </button>
            </div>

            <!-- Center Logo -->
            <div class="flex-shrink-0 p-8 bg-white border-2 border-blue-100 shadow-xl rounded-2xl">
              <img :src="organization.logo" :alt="`Logo ${organization.name}`" class="object-contain w-32 h-32" />
            </div>

            <!-- Right Column -->
            <div class="flex flex-col gap-4">
              <button
                v-for="(section, index) in organization.sections.slice(Math.ceil(organization.sections.length / 2))"
                :key="section.id"
                @click="openSeksiBidangDialog(section)"
                :class="[
                  'bg-white rounded-xl shadow-lg border-2 px-6 py-4 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer',
                  index % 2 === 0
                    ? 'border-orange-100 hover:border-orange-300'
                    : 'border-blue-100 hover:border-blue-300',
                ]"
              >
                <span class="font-bold text-gray-800">{{ section.name }}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- History Section -->
      <section v-if="organization.history" class="py-20">
        <div class="container max-w-6xl px-4 mx-auto sm:px-6">
          <div class="mb-12 text-center">
            <div
              class="inline-block px-10 py-6 mb-4 border border-blue-200 shadow-xl bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl rounded-2xl"
            >
              <h2 class="text-3xl font-bold text-white">Sejarah Organisasi {{ organization.name }}</h2>
            </div>
            <p class="text-lg text-gray-600">SMK Negeri 2 Singosari</p>
          </div>

          <div class="p-8 bg-white border-2 border-blue-100 shadow-xl rounded-2xl md:p-12">
            <p class="leading-relaxed text-justify text-gray-700">
              {{ organization.history }}
            </p>
          </div>
        </div>
      </section>

      <!-- Leadership Section -->
      <section class="py-20">
        <div class="container max-w-6xl px-4 mx-auto sm:px-6">
          <div class="mb-12 text-center">
            <div
              class="inline-block px-10 py-6 mb-4 border border-orange-200 shadow-xl bg-gradient-to-r from-orange-500 to-orange-600 backdrop-blur-2xl rounded-2xl"
            >
              <h2 class="text-3xl font-bold text-white">Struktur Kepengurusan {{ organization.name }}</h2>
            </div>
            <p class="text-lg text-gray-600">SMK Negeri 2 Singosari</p>
          </div>

          <div class="grid grid-cols-1 gap-8 mb-8 md:grid-cols-3">
            <!-- Sekretaris -->
            <div
              v-if="organization.leadership.sekretaris && organization.leadership.sekretaris.length > 0"
              class="overflow-hidden transition-shadow bg-white border-2 border-blue-100 shadow-xl rounded-2xl hover:shadow-2xl group"
            >
              <div
                class="flex items-center justify-center h-48 overflow-hidden bg-gradient-to-br from-blue-100 to-blue-50"
              >
                <img
                  v-if="organization.leadership.sekretaris![0]!.image"
                  :src="organization.leadership.sekretaris![0]!.image"
                  :alt="organization.leadership.sekretaris![0]!.name"
                  class="object-cover w-full h-full"
                />
                <div v-else class="w-20 h-20 transition-transform bg-blue-200 rounded-full group-hover:scale-110"></div>
              </div>
              <div class="py-4 text-center text-white bg-gradient-to-r from-blue-600 to-blue-800">
                <h4 class="text-lg font-bold">SEKRETARIS</h4>
                <p class="mt-1 text-sm">{{ organization.leadership.sekretaris![0]!.name }}</p>
              </div>
            </div>

            <!-- Ketua & Wakil -->
            <div
              v-if="organization.leadership.ketua && organization.leadership.ketua.length > 0"
              class="overflow-hidden transition-shadow bg-white border-2 border-orange-100 shadow-xl rounded-2xl hover:shadow-2xl group"
            >
              <div
                class="flex items-center justify-center h-48 overflow-hidden bg-gradient-to-br from-orange-100 to-orange-50"
              >
                <img
                  v-if="organization.leadership.ketua![0]!.image"
                  :src="organization.leadership.ketua![0]!.image"
                  :alt="organization.leadership.ketua![0]!.name"
                  class="object-cover w-full h-full"
                />
                <div
                  v-else
                  class="w-20 h-20 transition-transform bg-orange-200 rounded-full group-hover:scale-110"
                ></div>
              </div>
              <div class="py-4 text-center text-white bg-gradient-to-r from-orange-500 to-orange-600">
                <h4 class="text-lg font-bold">KETUA & WAKIL</h4>
                <p class="mt-1 text-sm">{{ organization.leadership.ketua![0]!.name }}</p>
                <p v-if="organization.leadership.wakil && organization.leadership.wakil.length > 0" class="text-sm">
                  {{ organization.leadership.wakil![0]!.name }}
                </p>
              </div>
            </div>

            <!-- Bendahara -->
            <div
              v-if="organization.leadership.bendahara && organization.leadership.bendahara.length > 0"
              class="overflow-hidden transition-shadow bg-white border-2 border-blue-100 shadow-xl rounded-2xl hover:shadow-2xl group"
            >
              <div
                class="flex items-center justify-center h-48 overflow-hidden bg-gradient-to-br from-blue-100 to-blue-50"
              >
                <img
                  v-if="organization.leadership.bendahara![0]!.image"
                  :src="organization.leadership.bendahara![0]!.image"
                  :alt="organization.leadership.bendahara![0]!.name"
                  class="object-cover w-full h-full"
                />
                <div v-else class="w-20 h-20 transition-transform bg-blue-200 rounded-full group-hover:scale-110"></div>
              </div>
              <div class="py-4 text-center text-white bg-gradient-to-r from-blue-600 to-blue-800">
                <h4 class="text-lg font-bold">BENDAHARA</h4>
                <p class="mt-1 text-sm">{{ organization.leadership.bendahara![0]!.name }}</p>
              </div>
            </div>
          </div>

          <!-- View All Members Link -->
          <div v-if="organization.sections.length > 0" class="text-center">
            <button
              @click="openMembersDialog"
              class="inline-flex items-center gap-2 text-lg font-semibold text-blue-600 hover:text-blue-800 group"
            >
              Lihat Seluruh Anggota
              <Icon name="lucide:arrow-right" size="20" class="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      <!-- Latest Activities Section -->
      <section v-if="organization.activities.length > 0" class="py-20">
        <div class="container max-w-6xl px-4 mx-auto sm:px-6">
          <div class="mb-12">
            <div
              class="inline-block px-10 py-6 mb-4 border border-blue-200 shadow-xl bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl rounded-2xl"
            >
              <h2 class="text-3xl font-bold text-white">Kegiatan Terbaru</h2>
            </div>
            <p class="text-lg text-gray-600">SMK Negeri 2 Singosari</p>
          </div>

          <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div
              v-for="activity in organization.activities"
              :key="activity.id"
              class="overflow-hidden transition-all bg-white border-2 border-blue-100 shadow-xl rounded-2xl hover:shadow-2xl hover:border-blue-200"
            >
              <div
                class="flex items-center justify-center h-48 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300"
              >
                <img
                  v-if="activity.image"
                  :src="activity.image"
                  :alt="activity.title"
                  class="object-cover w-full h-full"
                />
                <Icon v-else name="lucide:image" size="48" class="text-gray-400" />
              </div>
              <div class="p-6">
                <h3 class="mb-3 text-xl font-bold text-gray-800">{{ activity.title }}</h3>
                <p class="mb-4 leading-relaxed text-gray-600 line-clamp-3">
                  {{ activity.description }}
                </p>
                <div class="flex items-center text-gray-500">
                  <Icon name="lucide:calendar" size="16" class="mr-2" />
                  <span class="text-sm font-medium">{{
                    new Date(activity.date).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Registration Section -->
      <section v-if="organization.contactInfo" class="py-20">
        <div class="container max-w-6xl px-4 mx-auto sm:px-6">
          <div class="mb-12 text-center">
            <div
              class="inline-block px-10 py-6 mb-4 border border-orange-200 shadow-xl bg-gradient-to-r from-orange-500 to-orange-600 backdrop-blur-2xl rounded-2xl"
            >
              <h2 class="text-3xl font-bold text-white">Informasi Pendaftaran</h2>
            </div>
            <p class="text-lg text-gray-600">SMK Negeri 2 Singosari</p>
          </div>

          <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <!-- Contact Card -->
            <div class="p-8 bg-white border-2 border-blue-100 shadow-xl rounded-2xl">
              <div
                class="inline-block px-6 py-3 mb-6 border border-blue-200 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl"
              >
                <h3 class="text-xl font-bold text-white">KONTAK TERKAIT</h3>
              </div>

              <div class="space-y-6">
                <div v-if="organization.contactInfo.instagram && organization.contactInfo.instagram.length > 0">
                  <div class="flex items-center mb-3">
                    <Icon name="lucide:instagram" size="20" class="mr-3 text-pink-500" />
                    <span class="font-semibold text-gray-800">Instagram</span>
                  </div>
                  <div class="ml-8 space-y-2">
                    <a
                      v-for="ig in organization.contactInfo.instagram"
                      :key="ig.handle"
                      :href="`https://instagram.com/${ig.handle.replace('@', '')}`"
                      target="_blank"
                      class="block text-sm text-blue-600 hover:text-blue-800"
                    >
                      {{ ig.handle }}
                    </a>
                  </div>
                </div>

                <div v-if="organization.contactInfo.whatsapp && organization.contactInfo.whatsapp.length > 0">
                  <div class="flex items-center mb-3">
                    <Icon name="lucide:message-circle" size="20" class="mr-3 text-green-500" />
                    <span class="font-semibold text-gray-800">WhatsApp</span>
                  </div>
                  <div class="ml-8 space-y-2">
                    <a
                      v-for="wa in organization.contactInfo.whatsapp"
                      :key="wa.number"
                      :href="`https://wa.me/${wa.number.replace(/[^0-9]/g, '')}`"
                      target="_blank"
                      class="block text-sm text-blue-600 hover:text-blue-800"
                    >
                      {{ wa.number }}
                    </a>
                  </div>
                </div>

                <div
                  v-if="organization.contactInfo.socialMedia && organization.contactInfo.socialMedia.length > 0"
                  class="pt-4 border-t border-gray-200"
                >
                  <h4 class="mb-3 font-semibold text-gray-800">Media Sosial Lainnya</h4>
                  <div class="flex flex-wrap gap-3">
                    <a
                      v-for="social in organization.contactInfo.socialMedia"
                      :key="social.platform"
                      class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-700 transition rounded-lg bg-blue-50 hover:bg-blue-100"
                    >
                      <Icon
                        :name="`lucide:${
                          social.platform === 'facebook'
                            ? 'facebook'
                            : social.platform === 'youtube'
                            ? 'youtube'
                            : social.platform === 'tiktok'
                            ? 'music'
                            : 'share-2'
                        }`"
                        size="16"
                      />
                      {{ social.platform }}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Recruitment Info -->
            <div class="p-8 bg-white border-2 border-orange-100 shadow-xl rounded-2xl">
              <div
                class="inline-block px-6 py-3 mb-6 border border-orange-200 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl"
              >
                <h3 class="text-xl font-bold text-white">PERSYARATAN UMUM</h3>
              </div>

              <ul class="space-y-4">
                <li class="flex items-start gap-3 p-4 border-l-4 border-orange-600 bg-orange-50 rounded-xl">
                  <Icon name="lucide:check-circle" size="20" class="text-orange-600 mt-0.5 flex-shrink-0" />
                  <span class="text-gray-700">Siswa aktif SMKN 2 Singosari kelas X atau XI</span>
                </li>
                <li class="flex items-start gap-3 p-4 border-l-4 border-blue-600 bg-blue-50 rounded-xl">
                  <Icon name="lucide:check-circle" size="20" class="text-blue-600 mt-0.5 flex-shrink-0" />
                  <span class="text-gray-700">Mengisi formulir pendaftaran</span>
                </li>
                <li class="flex items-start gap-3 p-4 border-l-4 border-orange-600 bg-orange-50 rounded-xl">
                  <Icon name="lucide:check-circle" size="20" class="text-orange-600 mt-0.5 flex-shrink-0" />
                  <span class="text-gray-700">Surat persetujuan orang tua</span>
                </li>
                <li class="flex items-start gap-3 p-4 border-l-4 border-blue-600 bg-blue-50 rounded-xl">
                  <Icon name="lucide:check-circle" size="20" class="text-blue-600 mt-0.5 flex-shrink-0" />
                  <span class="text-gray-700">Mengikuti seleksi administrasi dan wawancara</span>
                </li>
              </ul>

              <div
                v-if="organization.recruitmentPeriod"
                class="p-4 mt-6 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-orange-50 rounded-xl"
              >
                <p class="mb-1 text-sm font-semibold text-gray-700">Periode Pendaftaran</p>
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
        <div
          v-if="showMembersDialog && organization"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          @click="closeMembersDialog"
        >
          <div
            class="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-blue-100"
            @click.stop
          >
            <div
              class="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-blue-200 bg-gradient-to-r from-blue-600 to-blue-800 rounded-t-2xl"
            >
              <h3 class="text-2xl font-bold text-white">Seluruh Anggota {{ organization.name }}</h3>
              <button
                @click="closeMembersDialog"
                class="p-2 text-white transition-colors rounded-full hover:text-gray-200 bg-white/20 hover:bg-white/30"
              >
                <Icon name="lucide:x" size="24" />
              </button>
            </div>
            <div class="p-8">
              <div v-if="organization.sections.length > 0" class="space-y-8">
                <div
                  v-for="section in organization.sections"
                  :key="section.id"
                  class="p-6 border-2 border-gray-200 bg-gray-50 rounded-xl"
                >
                  <h4 class="mb-4 text-xl font-bold text-gray-800">{{ section.name }}</h4>
                  <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    <div
                      v-for="member in section.members"
                      :key="member.id"
                      class="p-4 text-center bg-white border border-gray-200 rounded-lg shadow-md"
                    >
                      <img
                        :src="member.image"
                        :alt="member.name"
                        class="object-cover w-20 h-20 mx-auto mb-3 rounded-full"
                      />
                      <p class="text-sm font-semibold text-gray-800">{{ member.name }}</p>
                      <p class="mt-1 text-xs text-gray-500">{{ member.position }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <p v-else class="py-8 text-center text-gray-600">Tidak ada data anggota</p>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Section Detail Dialog -->
    <Teleport to="body">
      <Transition name="dialog">
        <div
          v-if="showSeksiBidangDialog && selectedSection"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          @click="closeSeksiBidangDialog"
        >
          <div
            class="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-blue-100"
            @click.stop
          >
            <div
              class="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-orange-200 bg-gradient-to-r from-orange-500 to-orange-600 rounded-t-2xl"
            >
              <h3 class="text-2xl font-bold text-white">{{ selectedSection.name }}</h3>
              <button
                @click="closeSeksiBidangDialog"
                class="p-2 text-white transition-colors rounded-full hover:text-gray-200 bg-white/20 hover:bg-white/30"
              >
                <Icon name="lucide:x" size="24" />
              </button>
            </div>
            <div class="p-8 space-y-8">
              <!-- Section Info -->
              <div class="grid gap-6 md:grid-cols-2">
                <div class="p-6 border-2 border-blue-200 bg-blue-50 rounded-xl">
                  <h4 class="flex items-center gap-2 mb-2 font-bold text-blue-800">
                    <Icon name="lucide:eye" size="20" />
                    Visi
                  </h4>
                  <p class="leading-relaxed text-gray-700">{{ selectedSection.visi }}</p>
                </div>
                <div class="p-6 border-2 border-orange-200 bg-orange-50 rounded-xl">
                  <h4 class="flex items-center gap-2 mb-2 font-bold text-orange-800">
                    <Icon name="lucide:target" size="20" />
                    Misi
                  </h4>
                  <p class="leading-relaxed text-gray-700">{{ selectedSection.misi }}</p>
                </div>
              </div>

              <!-- Tasks -->
              <div v-if="selectedSection.tasks" class="p-6 border-2 border-gray-200 bg-gray-50 rounded-xl">
                <h4 class="flex items-center gap-2 mb-3 font-bold text-gray-800">
                  <Icon name="lucide:clipboard-check" size="20" />
                  Tugas & Tanggung Jawab
                </h4>
                <p class="leading-relaxed text-gray-700">{{ selectedSection.tasks }}</p>
              </div>

              <!-- Programs -->
              <div
                v-if="selectedSection.programs && selectedSection.programs.length > 0"
                class="p-6 bg-white border-2 border-blue-200 rounded-xl"
              >
                <h4 class="flex items-center gap-2 mb-4 font-bold text-blue-800">
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
              <div class="p-6 bg-white border-2 border-orange-200 rounded-xl">
                <h4 class="flex items-center gap-2 mb-6 font-bold text-orange-800">
                  <Icon name="lucide:users" size="20" />
                  Anggota Seksi ({{ selectedSection.members.length }} orang)
                </h4>

                <div class="relative">
                  <div class="flex flex-wrap justify-center gap-4 mb-6">
                    <div
                      v-for="member in getVisibleMembers()"
                      :key="member.id"
                      class="w-32 p-4 text-center border border-gray-200 rounded-lg shadow-md bg-gray-50"
                    >
                      <img
                        :src="member.image"
                        :alt="member.name"
                        class="object-cover w-16 h-16 mx-auto mb-2 rounded-full"
                      />
                      <p class="text-xs font-semibold text-gray-800 line-clamp-1">{{ member.name }}</p>
                      <p class="mt-1 text-xs text-gray-500">{{ member.position }}</p>
                    </div>
                  </div>

                  <div v-if="selectedSection.members.length > 5" class="flex justify-center gap-3">
                    <button @click="prevCarousel" class="p-2 transition bg-orange-100 rounded-full hover:bg-orange-200">
                      <Icon name="lucide:chevron-left" size="20" class="text-orange-600" />
                    </button>
                    <button @click="nextCarousel" class="p-2 transition bg-orange-100 rounded-full hover:bg-orange-200">
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
  line-clamp: 1;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
