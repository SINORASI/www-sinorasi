<script setup lang="ts">
import type { Organization } from "~/models/Organization";

const organizations = ref<Organization[]>([
  {
    id: "1",
    slug: "osis",
    name: "OSIS SMKN 2 Singosari",
    logo: "/images/placeholder.jpg",
    description:
      "Organisasi Siswa Intra Sekolah yang menjadi wadah bagi siswa untuk mengembangkan potensi dan kreativitas.",
    history: "Didirikan sejak tahun 2000, OSIS telah menjadi pilar utama dalam kegiatan siswa.",
    established: "2000",
    contactInfo: {
      instagram: [{ label: "Instagram", handle: "@osis_smkn2" }],
      whatsapp: [{ label: "WhatsApp", number: "+6281234567890" }],
    },
    statistics: {
      members: 45,
      programs: 12,
      years: 24,
      meetings: 48,
    },
    leadership: {
      ketua: [
        {
          id: "1",
          name: "Ahmad Rahman",
          image: "/images/profile-placeholder.png",
          position: "Ketua OSIS",
        },
      ],
      wakil: [
        {
          id: "2",
          name: "Siti Nurhaliza",
          image: "/images/profile-placeholder.png",
          position: "Wakil Ketua OSIS",
        },
      ],
      sekretaris: [
        {
          id: "3",
          name: "Budi Santoso",
          image: "/images/profile-placeholder.png",
          position: "Sekretaris",
        },
      ],
      bendahara: [
        {
          id: "4",
          name: "Maya Sari",
          image: "/images/profile-placeholder.png",
          position: "Bendahara",
        },
      ],
    },
    sections: [],
    activities: [],
  },
  {
    id: "3",
    slug: "pmr",
    name: "PMR SMKN 2 Singosari",
    logo: "/images/placeholder.jpg",
    description: "Palang Merah Remaja yang fokus pada kegiatan kemanusiaan dan pertolongan pertama.",
    history: "PMR telah berperan aktif dalam kegiatan sosial dan kesehatan siswa.",
    established: "2005",
    contactInfo: {
      whatsapp: [{ label: "WhatsApp", number: "+6281234567891" }],
    },
    statistics: {
      members: 28,
      programs: 15,
      years: 19,
      meetings: 36,
    },
    leadership: {
      ketua: [
        {
          id: "7",
          name: "Fajar Nugroho",
          image: "/images/profile-placeholder.png",
          position: "Ketua PMR",
        },
      ],
      sekretaris: [
        {
          id: "8",
          name: "Lina Kusuma",
          image: "/images/profile-placeholder.png",
          position: "Sekretaris",
        },
      ],
    },
    sections: [],
    activities: [],
  },
  {
    id: "4",
    slug: "linorasi",
    name: "LINORASI SMKN 2 Singosari",
    logo: "/images/placeholder.jpg",
    description: "Litbang Inovasi Raih Prestasi yang fokus pada pengembangan inovasi dan prestasi siswa.",
    history: "LINORASI didirikan untuk mendorong inovasi dan pencapaian prestasi siswa.",
    established: "2018",
    contactInfo: {
      instagram: [{ label: "Instagram", handle: "@linorasi_smkn2" }],
      socialMedia: [{ platform: "youtube", handle: "@linorasi_official" }],
    },
    statistics: {
      members: 25,
      programs: 20,
      years: 6,
      meetings: 30,
    },
    leadership: {
      ketua: [
        {
          id: "9",
          name: "Eko Prasetyo",
          image: "/images/profile-placeholder.png",
          position: "Ketua LINORASI",
        },
      ],
      wakil: [
        {
          id: "10",
          name: "Rina Amelia",
          image: "/images/profile-placeholder.png",
          position: "Wakil Ketua",
        },
      ],
    },
    sections: [],
    activities: [],
  },
  {
    id: "5",
    slug: "bdi",
    name: "BDI SMKN 2 Singosari",
    logo: "/images/placeholder.jpg",
    description: "Badan Dakwah Islam yang fokus pada pengembangan spiritual dan kegiatan keagamaan.",
    history: "BDI didirikan untuk memperkuat nilai-nilai keislaman di lingkungan sekolah.",
    established: "2008",
    contactInfo: {
      instagram: [{ label: "Instagram", handle: "@bdi_smkn2" }],
      whatsapp: [{ label: "WhatsApp", number: "+6281234567892" }],
    },
    statistics: {
      members: 35,
      programs: 18,
      years: 16,
      meetings: 40,
    },
    leadership: {
      ketua: [
        {
          id: "11",
          name: "Ahmad Fauzi",
          image: "/images/profile-placeholder.png",
          position: "Ketua BDI",
        },
      ],
      sekretaris: [
        {
          id: "12",
          name: "Nur Hasanah",
          image: "/images/profile-placeholder.png",
          position: "Sekretaris",
        },
      ],
    },
    sections: [],
    activities: [],
  },
]);

const searchQuery = ref("");

useHead({
  title: "Admin - Kelola Organisasi - SMKN 2 Singosari",
  meta: [
    {
      name: "description",
      content: "Panel admin untuk mengelola organisasi SMK Negeri 2 Singosari.",
    },
  ],
});

const filteredOrganizations = computed(() => {
  if (!searchQuery.value.trim()) return organizations.value;
  const query = searchQuery.value.toLowerCase();
  return organizations.value.filter(
    (org) =>
      org.name.toLowerCase().includes(query) ||
      org.description.toLowerCase().includes(query) ||
      org.slug.toLowerCase().includes(query)
  );
});
</script>

<template>
  <div class="min-h-screen py-24 bg-gradient-to-b from-white via-purple-50 to-white">
    <div class="container px-4 mx-auto sm:px-6">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col gap-4 mb-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-800 md:text-4xl">Kelola Organisasi</h1>
            <p class="mt-2 text-gray-600">Panel admin untuk mengelola organisasi sekolah</p>
          </div>
          <button
            class="flex items-center gap-2 px-6 py-3 font-semibold text-white transition-colors bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 hover:shadow-lg"
          >
            <Icon name="lucide:plus" size="20" />
            Tambah Organisasi Baru
          </button>
        </div>

        <div class="grid grid-cols-1 gap-6 mb-8 md:grid-cols-5">
          <div class="md:col-span-4">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Cari organisasi berdasarkan nama atau deskripsi..."
                class="w-full px-4 py-3 pr-12 text-lg transition border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
              <Icon
                name="lucide:search"
                size="24"
                class="absolute text-gray-400 transform -translate-y-1/2 right-4 top-1/2"
              />
            </div>
          </div>
          <div class="flex items-center justify-center p-4 bg-white border-2 border-purple-100 shadow-xl rounded-xl">
            <div class="text-center">
              <p class="text-2xl font-bold text-purple-600">{{ organizations.length }}</p>
              <p class="text-sm text-gray-600">Total Organisasi</p>
            </div>
          </div>
        </div>

        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="org in filteredOrganizations"
            :key="org.id"
            class="p-6 bg-white border-2 border-gray-100 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            <div class="flex items-center gap-4 mb-4">
              <NuxtImg
                :src="org.logo"
                :alt="org.name"
                class="object-cover w-16 h-16 rounded-xl border-2 border-purple-200"
              />
              <div class="flex-1">
                <h3 class="text-lg font-bold text-gray-800 line-clamp-1">{{ org.name }}</h3>
                <p class="text-sm text-purple-600 font-medium">
                  {{ org.established ? `Sejak ${org.established}` : "Tahun Berdiri Tidak Diketahui" }}
                </p>
              </div>
            </div>

            <p class="text-gray-600 text-sm mb-4 line-clamp-3">{{ org.description }}</p>

            <div class="grid grid-cols-2 gap-3 mb-4">
              <div class="text-center p-3 bg-purple-50 rounded-lg">
                <p class="text-lg font-bold text-purple-600">{{ org.statistics.members }}</p>
                <p class="text-xs text-gray-600">Anggota</p>
              </div>
              <div class="text-center p-3 bg-blue-50 rounded-lg">
                <p class="text-lg font-bold text-blue-600">{{ org.statistics.programs }}</p>
                <p class="text-xs text-gray-600">Program</p>
              </div>
            </div>

            <div class="mb-4">
              <p class="text-sm font-semibold text-gray-700 mb-2">Pengurus Utama:</p>
              <div class="space-y-1">
                <div
                  v-for="leader in (org.leadership.ketua || []).slice(0, 2)"
                  :key="leader.id"
                  class="flex items-center gap-2"
                >
                  <NuxtImg :src="leader.image" :alt="leader.name" class="w-6 h-6 rounded-full border border-gray-200" />
                  <span class="text-xs text-gray-600">{{ leader.name }}</span>
                </div>
              </div>
            </div>

            <div class="mb-4">
              <p class="text-sm font-semibold text-gray-700 mb-2">Kontak:</p>
              <div class="flex flex-wrap gap-2">
                <div
                  v-if="org.contactInfo?.instagram?.length"
                  class="flex items-center gap-1 px-2 py-1 bg-pink-50 text-pink-700 rounded text-xs"
                >
                  <Icon name="lucide:instagram" size="12" />
                  IG
                </div>
                <div
                  v-if="org.contactInfo?.whatsapp?.length"
                  class="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 rounded text-xs"
                >
                  <Icon name="lucide:message-circle" size="12" />
                  WA
                </div>
                <div
                  v-if="org.contactInfo?.socialMedia?.length"
                  class="flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 rounded text-xs"
                >
                  <Icon name="lucide:globe" size="12" />
                  Web
                </div>
              </div>
            </div>

            <div class="flex gap-2">
              <button
                class="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold text-blue-600 transition-colors bg-blue-100 rounded-lg hover:bg-blue-200"
              >
                <Icon name="lucide:eye" size="16" />
                Lihat
              </button>
              <button
                class="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold text-orange-600 transition-colors bg-orange-100 rounded-lg hover:bg-orange-200"
              >
                <Icon name="lucide:edit" size="16" />
                Edit
              </button>
              <button
                class="flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold text-red-600 transition-colors bg-red-100 rounded-lg hover:bg-red-200"
              >
                <Icon name="lucide:trash" size="16" />
              </button>
            </div>
          </div>
        </div>

        <div
          v-if="filteredOrganizations.length === 0"
          class="p-12 text-center bg-white border-2 border-gray-100 shadow-xl rounded-2xl"
        >
          <Icon name="lucide:users" size="48" class="mx-auto mb-4 text-gray-400" />
          <h3 class="text-lg font-semibold text-gray-600 mb-2">Tidak ada organisasi ditemukan</h3>
          <p class="text-gray-500">Coba ubah kata kunci pencarian atau tambah organisasi baru</p>
        </div>
      </div>
    </div>
  </div>
</template>
