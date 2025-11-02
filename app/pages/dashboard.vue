<script setup lang="ts">
const user = {
  name: "John Doe",
  username: "johndoe",
  email: "john@example.com",
  role: "Siswa",
  class: "XII RPL 1",
  avatar: "/images/profile-placeholder.png",
  joinDate: "2023-08-15",
  lastLogin: new Date().toISOString().split("T")[0],
};

const handleLogout = async () => {
  await navigateTo("/");
};

const searchQuery = ref("");

useHead({
  title: "Dashboard - SMKN 2 Singosari",
  meta: [
    {
      name: "description",
      content: "Dashboard pengguna SMK Negeri 2 Singosari.",
    },
  ],
});

const utilityFeatures = [
  {
    title: "Anonymous BK",
    description: "Konsultasi anonim dengan BK sekolah",
    icon: "lucide:shield",
    href: "/utilitas/anonymous-bk",
    color: "blue",
  },
  {
    title: "SI Sarana",
    description: "Sistem Informasi Sarana Prasarana sekolah",
    icon: "lucide:alert-triangle",
    href: "/utilitas/si-sarana",
    color: "orange",
  },
  {
    title: "Traffic Tracker",
    description: "Cek estimasi waktu tempuh ke sekolah",
    icon: "lucide:bar-chart",
    href: "/utilitas/traffic-tracker",
    color: "green",
  },
];

const quickActions = [
  { title: "Berita Terbaru", href: "/berita", icon: "lucide:newspaper" },
  { title: "Ekstrakurikuler", href: "/ekstrakurikuler", icon: "lucide:workflow" },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>

<template>
  <div class="min-h-screen py-32 bg-linear-to-b from-white via-blue-50 to-white">
    <div class="container px-4 mx-auto sm:px-6">
      <div class="max-w-6xl mx-auto">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-800 md:text-4xl">Dashboard</h1>
          <p class="mt-2 text-gray-600">Selamat datang kembali, {{ user.name }}!</p>
        </div>

        <div class="p-6 mb-8 bg-white border-2 border-blue-100 shadow-xl rounded-2xl md:p-8">
          <div class="flex flex-col items-center gap-6 md:flex-row md:items-start">
            <div class="shrink-0">
              <NuxtImg
                :src="user.avatar"
                :alt="user.name"
                class="object-cover w-24 h-24 border-4 border-blue-200 rounded-full shadow-lg md:w-32 md:h-32"
              />
            </div>
            <div class="flex-1 text-center md:text-left">
              <h2 class="text-2xl font-bold text-gray-800 md:text-3xl">{{ user.name }}</h2>
              <p class="text-lg text-blue-600 md:text-xl">@{{ user.username }}</p>
              <div class="flex flex-col gap-2 mt-4 md:flex-row md:gap-6">
                <div class="flex items-center gap-2">
                  <Icon name="lucide:mail" size="18" class="text-gray-500" />
                  <span class="text-gray-600">{{ user.email }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <Icon name="lucide:user-check" size="18" class="text-gray-500" />
                  <span class="text-gray-600">{{ user.role }} - {{ user.class }}</span>
                </div>
              </div>
              <div class="flex flex-col gap-2 mt-4 md:flex-row md:gap-6">
                <div class="flex items-center gap-2">
                  <Icon name="lucide:calendar" size="18" class="text-gray-500" />
                  <span class="text-sm text-gray-500">Bergabung: {{ formatDate(user.joinDate || "") }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <Icon name="lucide:clock" size="18" class="text-gray-500" />
                  <span class="text-sm text-gray-500">Login terakhir: {{ formatDate(user.lastLogin || "") }}</span>
                </div>
              </div>
            </div>
            <div class="flex gap-3 md:flex-col">
              <NuxtLink
                to="/profile"
                class="px-4 py-2 text-sm font-semibold text-blue-600 transition-colors bg-blue-100 rounded-lg hover:bg-blue-200 text-center"
              >
                Edit Profil
              </NuxtLink>
              <button
                @click="handleLogout"
                class="px-4 py-2 text-sm font-semibold text-red-600 transition-colors bg-red-100 rounded-lg hover:bg-red-200"
              >
                Keluar
              </button>
            </div>
          </div>
        </div>

        <div class="mb-8">
          <h3 class="mb-4 text-xl font-bold text-gray-800 md:text-2xl">Aksi Cepat</h3>
          <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
            <NuxtLink
              v-for="action in quickActions"
              :key="action.title"
              :to="action.href"
              class="flex flex-col items-center gap-3 p-4 transition-all bg-white border-2 border-gray-100 shadow-lg rounded-xl hover:shadow-xl hover:border-blue-300 hover:-translate-y-1"
            >
              <Icon :name="action.icon" size="32" class="text-blue-600" />
              <span class="text-sm font-semibold text-center text-gray-700">{{ action.title }}</span>
            </NuxtLink>
          </div>
        </div>

        <div>
          <h3 class="mb-4 text-xl font-bold text-gray-800 md:text-2xl">Fitur Utilitas</h3>
          <div class="grid gap-6 md:grid-cols-3">
            <NuxtLink
              v-for="feature in utilityFeatures"
              :key="feature.title"
              :to="feature.href"
              class="block p-6 transition-all bg-white border-2 shadow-xl rounded-2xl hover:shadow-2xl hover:-translate-y-2"
              :class="`border-${feature.color}-100 hover:border-${feature.color}-300`"
            >
              <div class="flex items-center gap-4 mb-4">
                <div class="flex items-center justify-center w-12 h-12 rounded-xl" :class="`bg-${feature.color}-100`">
                  <Icon :name="feature.icon" :size="24" :class="`text-${feature.color}-600`" />
                </div>
                <h4 class="text-lg font-bold text-gray-800">{{ feature.title }}</h4>
              </div>
              <p class="text-gray-600">{{ feature.description }}</p>
              <div class="flex items-center mt-4 text-sm font-semibold text-blue-600">
                <span>Pelajari lebih lanjut</span>
                <Icon name="lucide:arrow-right" size="16" class="ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
