2<template>
  <transition name="sidebar" class="transition-all duration-300 ease-in-out">
    <div v-if="isOpen" class="fixed inset-0 z-[9000] flex">
      <div class="fixed inset-0 transition-opacity duration-300 ease-in-out bg-black/50 backdrop-blur-sm" @click="$emit('close')"></div>

      <div class="relative flex flex-col w-full h-full transition-transform duration-300 ease-in-out bg-white shadow-2xl sm:ml-auto sm:w-96">
        <div class="flex items-center justify-between flex-shrink-0 gap-3 p-4 border-b border-gray-200">
          <div class="flex-1 min-w-0">
            <h2 class="text-lg font-semibold text-gray-800 truncate">{{ pageTitle }}</h2>
            <p class="text-sm text-gray-500 truncate">{{ pageSubtitle }}</p>
          </div>
          <button
            @click="$emit('close')"
            class="flex-shrink-0 p-2 transition-colors duration-200 rounded-full hover:bg-gray-100"
          >
            <Icon name="lucide:x" size="20" class="text-gray-600" />
          </button>
        </div>

        <div class="flex-1 p-4 overflow-y-auto">
           <!-- Profile Section -->
           <div class="mb-6">
             <div class="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg">
               <div class="flex items-center gap-3 mb-3">
                 <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                   <Icon name="lucide:user" size="20" class="text-white" />
                 </div>
                 <div>
                   <p class="text-white font-semibold">Selamat Datang</p>
                   <p class="text-blue-100 text-sm">Silakan masuk untuk akses penuh</p>
                 </div>
               </div>
               <div class="flex gap-2">
                 <NuxtLink
                   to="/login"
                   @click="$emit('close')"
                   class="flex-1 bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg text-center hover:bg-blue-50 transition-colors"
                 >
                   Masuk
                 </NuxtLink>
                 <NuxtLink
                   to="/register"
                   @click="$emit('close')"
                   class="flex-1 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg text-center border-2 border-white hover:bg-blue-700 transition-colors"
                 >
                   Registrasi
                 </NuxtLink>
               </div>
             </div>
           </div>

           <div class="relative mb-4">
             <div class="relative">
               <input
                 type="text"
                 placeholder="Cari halaman, berita, jurusan, atau ekstrakurikuler..."
                 v-model="searchQuery"
                 class="w-full px-3 py-3 pr-10 text-lg text-gray-800 transition-all duration-200 border border-gray-200 rounded-lg outline-none bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
               />
               <button
                 v-if="searchQuery.trim()"
                 @click="searchQuery = ''"
                 class="absolute p-1 text-gray-400 transition-colors transform -translate-y-1/2 rounded-full right-3 top-1/2 hover:text-gray-600 hover:bg-gray-200"
               >
                 <Icon name="lucide:x" size="20" />
               </button>
               <Icon
                 v-else
                 name="lucide:search"
                 size="20"
                 class="absolute text-gray-400 transform -translate-y-1/2 pointer-events-none right-3 top-1/2"
               />
             </div>

            <!-- Home Button for Major Pages -->
            <NuxtLink v-if="menuItems !== currentMenuItems" to="/" @click="emit('close')" class="block mt-3">
              <div
                class="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg px-4 py-3 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <div class="flex items-center gap-3">
                  <Icon name="lucide:home" size="24" class="flex-shrink-0" />
                  <div class="flex-1">
                    <p class="text-base font-semibold">Kembali ke Beranda</p>
                    <p class="text-xs text-blue-100">Halaman utama website</p>
                  </div>
                  <Icon name="lucide:arrow-right" size="20" class="flex-shrink-0" />
                </div>
              </div>
            </NuxtLink>

            <!-- Language Switcher -->
            <div class="relative mt-3">
              <button
                @click="showLanguageMenu = !showLanguageMenu"
                class="flex items-center justify-between w-full px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div class="flex items-center gap-3">
                  <Icon name="lucide:languages" size="20" class="text-gray-600" />
                  <span class="text-sm font-medium text-gray-700">
                    {{ languages.find(lang => lang.code === currentLanguage)?.flag }}
                    {{ languages.find(lang => lang.code === currentLanguage)?.name }}
                  </span>
                </div>
                <Icon
                  name="lucide:chevron-down"
                  size="16"
                  class="text-gray-500 transition-transform"
                  :class="{ 'rotate-180': showLanguageMenu }"
                />
              </button>

              <!-- Language Menu Dropdown -->
              <Transition name="dropdown">
                <div
                  v-if="showLanguageMenu"
                  class="absolute top-full left-0 right-0 z-10 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg"
                >
                  <div
                    v-for="lang in languages"
                    :key="lang.code"
                    @click="switchLanguage(lang.code)"
                    class="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
                    :class="{ 'bg-blue-50 border-blue-200': lang.code === currentLanguage }"
                  >
                    <span class="text-lg">{{ lang.flag }}</span>
                    <span class="text-sm font-medium text-gray-700">{{ lang.name }}</span>
                    <Icon
                      v-if="lang.code === currentLanguage"
                      name="lucide:check"
                      size="16"
                      class="ml-auto text-blue-600"
                    />
                  </div>
                </div>
              </Transition>
            </div>

            <!-- Dark Mode Toggle (Disabled) -->
            <div
              class="flex items-center justify-between px-4 py-3 mt-3 border border-gray-200 rounded-lg cursor-not-allowed bg-gray-50 opacity-60"
            >
              <div class="flex items-center gap-3">
                <Icon name="lucide:moon" size="20" class="text-gray-500" />
                <span class="text-sm font-medium text-gray-600">Mode Gelap</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="px-2 py-1 text-xs text-gray-500 bg-gray-200 rounded">Segera Hadir</span>
                <div class="relative inline-block w-12 h-6 bg-gray-300 rounded-full">
                  <div class="absolute w-4 h-4 transition-transform bg-white rounded-full left-1 top-1"></div>
                </div>
              </div>
            </div>

            <div
              v-if="searchQuery.trim() && filteredMenuItems.length === 0"
              class="p-3 mt-2 border border-yellow-200 rounded-lg bg-yellow-50"
            >
              <p class="text-sm text-yellow-700">
                <Icon name="lucide:info" size="16" class="inline mr-1" />
                Tidak ada hasil untuk "<strong>{{ searchQuery }}</strong
                >". Coba kata kunci lain seperti "voli", "basket", "robotik", "prestasi", atau "rpl".
              </p>
            </div>
            <div
              v-if="searchQuery.trim() && filteredMenuItems.length > 0"
              class="p-2 mt-2 border border-green-200 rounded-lg bg-green-50"
            >
              <p class="text-xs text-green-700">
                <Icon name="lucide:check-circle" size="14" class="inline mr-1" />
                Ditemukan {{ filteredMenuItems.reduce((total, section) => total + section.submenu.length, 0) }} hasil
              </p>
            </div>
          </div>
          <div v-for="(item, index) in filteredMenuItems" :key="index" class="mb-6">
            <h3
              @click="toggleSection(item.title)"
              class="flex items-center justify-between mb-3 text-base font-semibold text-gray-800 cursor-pointer"
            >
              {{ item.title }}
              <div class="flex items-center gap-2">
                <span v-if="searchQuery.trim()" class="px-2 py-1 text-xs text-blue-700 bg-blue-100 rounded-full">
                  {{ item.submenu.length }}
                </span>
                <Icon
                  name="lucide:chevron-down"
                  size="16"
                  class="transition-transform"
                  :class="{ 'rotate-180': openSections[item.title] ?? false }"
                />
              </div>
            </h3>
            <div v-if="(openSections[item.title] ?? false) || searchQuery.trim()">
              <div
                v-for="(sub, subIndex) in item.submenu"
                :key="subIndex"
                class="mb-3 ml-4 transition-colors duration-200 border-l-2 border-gray-200 hover:border-blue-300"
              >
                <a v-if="sub.external" :href="sub.to" target="_blank" class="block" @click="emit('close')">
                  <div
                    class="flex items-start gap-3 p-2 transition-colors duration-200 rounded cursor-pointer hover:bg-gray-50"
                    :class="{ 'bg-blue-50 border border-blue-200': searchQuery.trim() && (sub as any).score > 80 }"
                  >
                    <Icon :name="sub.icon" size="18" class="mt-0.5 flex-shrink-0" :style="{ color: '#000000' }" />
                    <div class="flex-1">
                      <div class="flex items-center gap-2">
                        <p
                          class="text-sm font-medium text-gray-900"
                          v-html="highlightSearchTerm(sub.title, searchQuery)"
                        ></p>
                        <span
                          v-if="item.title === 'Berita' && sub.title !== 'Semua Berita'"
                          class="text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded"
                        >
                          Berita
                        </span>
                        <span
                          v-if="searchQuery.trim() && (sub as any).score > 90"
                          class="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded"
                        >
                          Perfect match
                        </span>
                        <span
                          v-else-if="searchQuery.trim() && (sub as any).score > 70"
                          class="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded"
                        >
                          Good match
                        </span>
                      </div>
                      <p
                        class="text-xs leading-relaxed text-gray-600"
                        v-html="highlightSearchTerm(sub.desc, searchQuery)"
                      ></p>
                    </div>
                  </div>
                </a>
                <NuxtLink v-else :to="sub.to || '#'" class="block" @click="emit('close')">
                  <div
                    class="flex items-start gap-3 p-2 transition-colors duration-200 rounded cursor-pointer hover:bg-gray-50"
                    :class="{ 'bg-blue-50 border border-blue-200': searchQuery.trim() && (sub as any).score > 80 }"
                  >
                    <Icon
                      :name="sub.icon"
                      size="18"
                      class="mt-0.5 flex-shrink-0"
                      :style="{ color: item.title === 'Jurusan' ? getIconColor(sub.title) : '#000000' }"
                    />
                    <div class="flex-1">
                      <div class="flex items-center gap-2">
                        <p
                          class="text-sm font-medium text-gray-900"
                          v-html="highlightSearchTerm(sub.title, searchQuery)"
                        ></p>
                        <span
                          v-if="item.title === 'Berita' && sub.title !== 'Semua Berita'"
                          class="text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded"
                        >
                          Berita
                        </span>
                        <span
                          v-if="searchQuery.trim() && (sub as any).score > 90"
                          class="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded"
                        >
                          Perfect match
                        </span>
                        <span
                          v-else-if="searchQuery.trim() && (sub as any).score > 70"
                          class="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded"
                        >
                          Good match
                        </span>
                      </div>
                      <p
                        class="text-xs leading-relaxed text-gray-600"
                        v-html="highlightSearchTerm(sub.desc, searchQuery)"
                      ></p>
                    </div>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { majorColorSchemes } from "~/utils/majorColors";
import type { MajorName } from "~/models/MajorName";
import type { News } from "~/models/News";

const currentLanguage = ref('id')
const showLanguageMenu = ref(false)

const languages = [
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'en', name: 'English', flag: '🇺🇸' }
]

const switchLanguage = (langCode: string) => {
  currentLanguage.value = langCode
  showLanguageMenu.value = false
  // TODO: Implement actual language switching logic
}

// Get current route for dynamic title
const route = useRoute();

// Fetch news data from API
const { data: newsResponse } = await useFetch("/api/news", {
  query: { limit: 8 },
});

const newsData = computed(() => {
  const response = newsResponse.value as { data?: News[]; total?: number } | null;
  return response?.data || [];
});

// Fetch organizations data from API
const { data: organizationsResponse } = await useFetch("/api/organizations", {
  query: { limit: 10 },
});

const organizationsData = computed(() => {
  const response = organizationsResponse.value as { data?: any[]; total?: number } | null;
  return response?.data || [];
});

// Define emit function
const emit = defineEmits<{
  close: [];
}>();

// Watch for route changes and auto-close sidebar
watch(
  () => route.path,
  (newPath, oldPath) => {
    // Only auto-close if the route actually changed
    if (newPath !== oldPath) {
      // Small delay to allow for smooth transition
      setTimeout(() => {
        emit("close");
      }, 100);
    }
  },
  { immediate: false }
);

// Computed property for dynamic page title
const pageTitle = computed(() => {
  const path = route.path;

  // Handle specific routes
  if (path === "/") return "Beranda";
  if (path === "/berita") return "Berita Terbaru";
  if (path === "/acara") return "Events & Acara";
  if (path === "/organisasi") return "Organisasi Sekolah";
  if (path === "/ekstrakurikuler") return "Ekstrakurikuler";
  if (path === "/informasi/profile-sekolah") return "Profil Sekolah";
  if (path === "/informasi/struktur-organisasi") return "Struktur Organisasi";
  if (path === "/informasi/sarana-prasarana") return "Sarana Prasarana";
  if (path === "/informasi/guru") return "Data Guru";
  if (path === "/informasi/kontak") return "Kontak Kami";
  if (path === "/utilitas/anonymous-bk") return "Anonymous BK";
  if (path === "/utilitas/traffic-tracker") return "Traffic Tracker";

  // Handle dynamic routes
  if (path.startsWith("/jurusan/")) {
    const majorName = (route.params.majorName as string) || (path.split("/").pop() as string);
    const majorMap: Record<string, string> = {
      rpl: "Rekayasa Perangkat Lunak",
      tkj: "Teknik Komputer Jaringan",
      dkv: "Desain Komunikasi Visual",
      tei: "Teknik Elektronika Industri",
      mekatronika: "Mekatronika",
      broadcasting: "Broadcasting",
      animasi: "Animasi",
      tav: "Teknik Audio Visual",
    };
    return majorMap[majorName] || "Jurusan";
  }

  if (path.startsWith("/berita/")) {
    return "Detail Berita";
  }

  if (path.startsWith("/acara/")) {
    return "Detail Acara";
  }

  if (path.startsWith("/ekstrakurikuler/")) {
    const extraName = route.params.extra as string;
    if (extraName === "voli") return "Ekstrakurikuler Voli";
    if (extraName === "basket") return "Ekstrakurikuler Basket";
    if (extraName === "catur") return "Ekstrakurikuler Catur";
    return "Ekstrakurikuler";
  }

  if (path.startsWith("/organisasi/")) {
    return "Detail Organisasi";
  }

  // Default fallback
  return "SMKN 2 Singosari";
});

// Computed property for page subtitle
const pageSubtitle = computed(() => {
  const path = route.path;

  if (path === "/") return "Halaman utama website";
  if (path === "/berita") return "Informasi dan kabar terbaru";
  if (path === "/acara") return "Events dan kegiatan sekolah";
  if (path === "/organisasi") return "Organisasi di sekolah";
  if (path === "/ekstrakurikuler") return "Kegiatan ekstrakurikuler";
  if (path === "/informasi/profile-sekolah") return "Informasi lengkap sekolah";
  if (path === "/informasi/struktur-organisasi") return "Struktur pengelola sekolah";
  if (path === "/informasi/sarana-prasarana") return "Fasilitas dan bangunan sekolah";
  if (path === "/informasi/guru") return "Informasi tenaga pendidik";
  if (path === "/informasi/kontak") return "Hubungi kami";
  if (path === "/utilitas/anonymous-bk") return "Konsultasi anonim";
  if (path === "/utilitas/traffic-tracker") return "Cek waktu perjalanan";

  // Handle dynamic routes
  if (path.startsWith("/jurusan/")) {
    const majorName = (route.params.majorName as string) || (path.split("/").pop() as string);
    const majorMap: Record<string, string> = {
      rpl: "Rekayasa Perangkat Lunak",
      tkj: "Teknik Komputer Jaringan",
      dkv: "Desain Komunikasi Visual",
      tei: "Teknik Elektronika Industri",
      mekatronika: "Mekatronika",
      broadcasting: "Broadcasting",
      animasi: "Animasi",
      tav: "Teknik Audio Visual",
    };
    return `Program Keahlian ${majorMap[majorName] || "Unknown"}`;
  }

  if (path.startsWith("/berita/")) {
    return "Baca berita lengkap";
  }

  if (path.startsWith("/acara/")) {
    return "Informasi detail acara";
  }

  if (path.startsWith("/ekstrakurikuler/")) {
    return "Informasi kegiatan ekstrakurikuler";
  }

  if (path.startsWith("/organisasi/")) {
    return "Detail organisasi sekolah";
  }

  return "SMKN 2 Singosari";
});

const menuItems = [
  {
    title: "Beranda",
    submenu: [
      {
        title: "Home",
        desc: "Halaman utama website",
        icon: "lucide:home",
        to: "/",
        external: false,
        tags: ["home", "beranda"],
      },
      {
        title: "Dashboard",
        desc: "Dashboard pengguna",
        icon: "lucide:layout-dashboard",
        to: "/dashboard",
        external: false,
        tags: ["dashboard", "profil", "user"],
      },
    ],
  },
  {
    title: "Tentang Kami",
    submenu: [
      {
        title: "Profile Sekolah",
        desc: "Profil lengkap sekolah",
        icon: "lucide:cannabis",
        to: "/informasi/profile-sekolah",
        external: false,
        tags: ["profile", "sekolah", "tentang", "kami"],
      },
      {
        title: "Struktur Organisasi",
        desc: "Tim pengelola",
        icon: "lucide:users",
        to: "/informasi/struktur-organisasi",
        external: false,
        tags: ["struktur", "organisasi", "tim", "pengelola"],
      },
      {
        title: "Sarana Prasarana",
        desc: "Kondisi bangunan sekolah",
        icon: "lucide:building-2",
        to: "/informasi/sarana-prasarana",
        external: false,
        tags: ["sarana", "prasarana", "bangunan", "sekolah", "fasilitas"],
      },
    ],
  },
  {
    title: "Jurusan",
    submenu: [
      {
        title: "RPL",
        desc: "Rekayasa Perangkat Lunak",
        icon: "lucide:code",
        to: "/jurusan/rpl",
        external: false,
        tags: ["rpl", "rekayasa", "perangkat", "lunak", "programming"],
      },
      {
        title: "TKJ",
        desc: "Teknik Komputer Jaringan",
        icon: "lucide:network",
        to: "/jurusan/tkj",
        external: false,
        tags: ["tkj", "teknik", "komputer", "jaringan", "networking"],
      },
      {
        title: "DKV",
        desc: "Desain Komunikasi Visual",
        icon: "lucide:palette",
        to: "/jurusan/dkv",
        external: false,
        tags: ["dkv", "desain", "komunikasi", "visual", "design"],
      },
      {
        title: "EI",
        desc: "Teknik Elektronika Industri",
        icon: "lucide:zap",
        to: "/jurusan/tei",
        external: false,
        tags: ["tei", "elektronika", "industri", "elektronik"],
      },
      {
        title: "MT",
        desc: "Mekatronika",
        icon: "lucide:cog",
        to: "/jurusan/mekatronika",
        external: false,
        tags: ["mekatronika", "mekatronik"],
      },
      {
        title: "BC",
        desc: "Broadcasting",
        icon: "lucide:video",
        to: "/jurusan/broadcasting",
        external: false,
        tags: ["broadcasting", "broadcast"],
      },
      {
        title: "Animasi",
        desc: "Animasi",
        icon: "lucide:film",
        to: "/jurusan/animasi",
        external: false,
        tags: ["animasi", "animation"],
      },
      {
        title: "AV",
        desc: "Teknik Audio Visual",
        icon: "lucide:audio-lines",
        to: "/jurusan/tav",
        external: false,
        tags: ["tav", "audio", "visual", "teknik"],
      },
    ],
  },
  {
    title: "Informasi",
    submenu: [
      {
        title: "Berita",
        desc: "Berita terbaru sekolah",
        icon: "lucide:newspaper",
        to: "/berita",
        external: false,
        tags: ["berita", "news"],
      },
      {
        title: "Organisasi",
        desc: "Semua organisasi sekolah",
        icon: "lucide:person-standing",
        to: "/organisasi",
        external: false,
        tags: ["organisasi", "organization", "semua"],
      },
      {
        title: "Extracurricular",
        desc: "Ekstrakurikuler yang ada di sekolah",
        icon: "lucide:workflow",
        to: "/ekstrakurikuler/",
        external: false,
        tags: ["ekstrakurikuler", "extracurricular", "extra"],
      },
      {
        title: "Events",
        desc: "Acara yang sedang/akan berlansung di sekolah",
        icon: "lucide:hand-metal",
        to: "/acara",
        external: false,
        tags: ["events", "acara"],
      },
    ],
  },
  {
    title: "Organisasi",
    submenu: [
      {
        title: "Semua Organisasi",
        desc: "Daftar lengkap organisasi sekolah",
        icon: "lucide:users",
        to: "/organisasi",
        external: false,
        tags: ["organisasi", "semua", "daftar"],
      },
      {
        title: "AMBALAN",
        desc: "Ambalan Pramuka SMKN 2 Singosari",
        icon: "lucide:shield",
        to: "/organisasi/ambalan",
        external: false,
        tags: ["ambalan", "pramuka", "kepramukaan", "organisasi"],
      },
      {
        title: "LINORASI",
        desc: "Litbang Inovasi Raih Prestasi",
        icon: "lucide:lightbulb",
        to: "/organisasi/linorasi",
        external: false,
        tags: ["linorasi", "litbang", "inovasi", "penelitian", "organisasi"],
      },
      {
        title: "BDI",
        desc: "Badan Dakwah Islam",
        icon: "lucide:book-open",
        to: "/organisasi/bdi",
        external: false,
        tags: ["bdi", "dakwah", "islam", "rohis", "organisasi"],
      },
      ...organizationsData.value.map((org: any) => ({
        title: org.name,
        desc: org.description,
        icon: "lucide:users-round",
        to: `/organisasi/${org.slug}`,
        external: false,
        tags: [
          "organisasi",
          org.name.toLowerCase(),
          ...org.name.toLowerCase().split(" "),
          ...(org.description
            ?.toLowerCase()
            .split(" ")
            .filter((word: string) => word.length > 3) || []),
        ],
      })),
    ],
  },
  {
    title: "Berita",
    submenu: [
      {
        title: "Semua Berita",
        desc: "Daftar lengkap berita sekolah",
        icon: "lucide:newspaper",
        to: "/berita",
        external: false,
        tags: ["berita", "news", "semua", "daftar"],
      },
      ...newsData.value.slice(0, 8).map((news: News) => ({
        title: news.title,
        desc: news.subtitle,
        icon: "lucide:file-text",
        to: `/berita/${news.slug}`,
        external: false,
        tags: [
          "berita",
          "news",
          ...news.tags.map((tag: string) => tag.toLowerCase()),
          ...news.title.toLowerCase().split(" "),
          ...news.subtitle.toLowerCase().split(" "),
        ].filter((tag: string) => tag.length > 2),
      })),
    ],
  },
  {
    title: "Ekstrakurikuler",
    submenu: [
      {
        title: "Voli",
        desc: "Ekstrakurikuler Bola Voli",
        icon: "lucide:trophy",
        to: "/ekstrakurikuler/voli",
        external: false,
        tags: ["voli", "volleyball", "bola voli", "olahraga", "volley"],
      },
      {
        title: "Basket",
        desc: "Ekstrakurikuler Bola Basket",
        icon: "lucide:trophy",
        to: "/ekstrakurikuler/basket",
        external: false,
        tags: ["basket", "basketball", "bola basket", "olahraga"],
      },
      {
        title: "Catur",
        desc: "Ekstrakurikuler Catur",
        icon: "lucide:crown",
        to: "/ekstrakurikuler/catur",
        external: false,
        tags: ["catur", "chess", "strategi", "permainan"],
      },
      {
        title: "Semua Ekstrakurikuler",
        desc: "Daftar lengkap ekstrakurikuler",
        icon: "lucide:workflow",
        to: "/ekstrakurikuler/",
        external: false,
        tags: ["ekstrakurikuler", "extracurricular", "extra", "semua", "daftar"],
      },
    ],
  },
  {
    title: "Utilitas",
    submenu: [
      {
        title: "Anonymous BK",
        desc: "Konsultasi anonim",
        icon: "lucide:shield",
        to: "/utilitas/anonymous-bk",
        external: false,
        tags: ["anonymous", "bk", "konsultasi", "counseling"],
      },
      {
        title: "Traffic Tracker",
        desc: "Temukan berapa lama kamu bisa kesekolah!",
        icon: "lucide:bar-chart",
        to: "/utilitas/traffic-tracker",
        external: false,
        tags: ["traffic", "tracker", "sekolah", "time"],
      },
      {
        title: "E-Report",
        desc: "Laporkan kerusakan fasilitas sekolah",
        icon: "lucide:alert-triangle",
        to: "/utilitas/e-report",
        external: false,
        tags: ["report", "laporan", "kerusakan", "fasilitas", "maintenance", "perbaikan"],
      },
    ],
  },
  {
    title: "Layanan",
    submenu: [
      {
        title: "E-Dapodik",
        desc: "Sistem Dapodik",
        icon: "lucide:database",
        to: "http://dapodik.smkn2-singosari.sch.id/",
        external: true,
        tags: ["dapodik", "data", "layanan"],
      },
      {
        title: "E-Perpustakaan",
        desc: "Perpustakaan Digital",
        icon: "lucide:book-open",
        to: "http://perpus.smkn2-singosari.sch.id/",
        external: true,
        tags: ["perpustakaan", "library", "buku", "layanan"],
      },
      {
        title: "E-Prakerin",
        desc: "Sistem Praktek Kerja Industri",
        icon: "lucide:briefcase",
        to: "http://prakerin.smkn2-singosari.sch.id/",
        external: true,
        tags: ["prakerin", "pkl", "magang", "industri", "layanan"],
      },
      {
        title: "E-Raport",
        desc: "Raport Digital",
        icon: "lucide:file-text",
        to: "http://eraportbaru.smkn2-singosari.sch.id/",
        external: true,
        tags: ["raport", "nilai", "rapor", "layanan"],
      },
      {
        title: "E-BKK",
        desc: "Bursa Kerja Khusus",
        icon: "lucide:users",
        to: "http://bkk.smkn2-singosari.sch.id",
        external: true,
        tags: ["bkk", "bursa", "kerja", "lowongan", "layanan"],
      },
      {
        title: "E-DataCenter",
        desc: "Data Center Sekolah",
        icon: "lucide:hard-drive",
        to: "http://cloud.smkn2-singosari.sch.id/",
        external: true,
        tags: ["datacenter", "cloud", "storage", "layanan"],
      },
      {
        title: "E-Kelulusan",
        desc: "Informasi Kelulusan",
        icon: "lucide:graduation-cap",
        to: "http://kelulusan.smkn2-singosari.sch.id/",
        external: true,
        tags: ["kelulusan", "lulus", "graduation", "layanan"],
      },
      {
        title: "Kementerian Pendidikan dan Kebudayaan",
        desc: "Situs resmi Kemdikbud",
        icon: "lucide:external-link",
        to: "https://www.kemdikbud.go.id",
        external: true,
        tags: ["kemdikbud", "pendidikan", "layanan"],
      },
      {
        title: "Dinas Pendidikan Jawa Timur",
        desc: "Dinas Pendidikan Provinsi Jawa Timur",
        icon: "lucide:external-link",
        to: "https://www.disdik.jatimprov.go.id",
        external: true,
        tags: ["disdik", "jatim", "pendidikan", "layanan"],
      },
      {
        title: "Pemerintah Kabupaten Malang",
        desc: "Situs resmi Pemkab Malang",
        icon: "lucide:external-link",
        to: "https://www.malangkab.go.id",
        external: true,
        tags: ["malangkab", "pemerintah", "kabupaten", "layanan"],
      },
    ],
  },
];

const props = defineProps<{
  isOpen: boolean;
  menuItems?: any[];
}>();

// Use passed menuItems prop if available, otherwise use default menuItems
const currentMenuItems = computed(() => props.menuItems || menuItems);

const searchQuery = ref("");

// Advanced search algorithm with fuzzy matching and relevance scoring
const filteredMenuItems = computed(() => {
  if (!searchQuery.value.trim()) return currentMenuItems.value;

  const query = searchQuery.value.toLowerCase().trim();

  // Helper function to calculate relevance score
  const calculateRelevanceScore = (item: any) => {
    let score = 0;
    const title = item.title.toLowerCase();
    const desc = item.desc.toLowerCase();
    // Handle both menu types: with tags (global) and without tags (major-specific)
    const tags = item.tags ? item.tags.map((tag: string) => tag.toLowerCase()) : [];

    // Exact title match gets highest score
    if (title === query) score += 100;
    // Title starts with query gets high score
    else if (title.startsWith(query)) score += 80;
    // Title contains query gets medium-high score
    else if (title.includes(query)) score += 60;

    // Only search tags if they exist
    if (tags.length > 0) {
      // Exact tag match gets high score
      if (tags.some((tag: string) => tag === query)) score += 90;
      // Tag starts with query gets medium-high score
      else if (tags.some((tag: string) => tag.startsWith(query))) score += 70;
      // Tag contains query gets medium score
      else if (tags.some((tag: string) => tag.includes(query))) score += 50;
    }

    // Description contains query gets lower score
    if (desc.includes(query)) score += 30;

    // Additional word matching for major-specific menus (without tags)
    if (tags.length === 0) {
      // Split title and desc into words for better matching
      const titleWords = title.split(/\s+/);
      const descWords = desc.split(/\s+/);
      const queryWords = query.split(/\s+/);

      queryWords.forEach((queryWord) => {
        if (queryWord.length > 2) {
          titleWords.forEach((titleWord: string) => {
            if (titleWord.startsWith(queryWord)) score += 40;
            else if (titleWord.includes(queryWord)) score += 20;
          });
          descWords.forEach((descWord: string) => {
            if (descWord.startsWith(queryWord)) score += 25;
            else if (descWord.includes(queryWord)) score += 15;
          });
        }
      });
    }

    // Fuzzy matching for common typos and partial matches
    const fuzzyMatches = [
      { pattern: /vol[iy]?/, matches: ["voli", "volleyball", "volley"] },
      { pattern: /basket/, matches: ["basket", "basketball"] },
      { pattern: /catur/, matches: ["catur", "chess"] },
      { pattern: /extra?/, matches: ["ekstrakurikuler", "extracurricular"] },
      { pattern: /organisasi/, matches: ["organisasi", "organization"] },
      { pattern: /berita|news/, matches: ["berita", "news"] },
      { pattern: /acara/, matches: ["acara", "events", "event"] },
      { pattern: /prestasi/, matches: ["prestasi", "achievement", "juara"] },
      { pattern: /robotik/, matches: ["robotik", "robot", "teknologi"] },
      { pattern: /kerjasama/, matches: ["kerjasama", "partnership", "industri"] },
      { pattern: /program/, matches: ["program", "tahun", "ajaran", "kurikulum", "pembelajaran"] },
      { pattern: /teknologi/, matches: ["teknologi", "technology", "digital"] },
      { pattern: /magang/, matches: ["magang", "internship", "industri"] },
      { pattern: /lab|laboratorium/, matches: ["lab", "laboratorium", "praktikum", "fasilitas"] },
      { pattern: /karir|kerja/, matches: ["karir", "kerja", "pekerjaan", "profesi"] },
      { pattern: /kompetensi|skill/, matches: ["kompetensi", "skill", "keahlian", "kemampuan"] },
      { pattern: /pengenalan|intro/, matches: ["pengenalan", "introduction", "apa itu", "tentang"] },
    ];

    fuzzyMatches.forEach(({ pattern, matches }) => {
      if (pattern.test(query)) {
        matches.forEach((match) => {
          if (title.includes(match) || desc.includes(match) || tags.some((tag: string) => tag.includes(match))) {
            score += 45;
          }
        });
      }
    });

    return score;
  };

  // Filter and score all items
  const scoredItems = currentMenuItems.value
    .map((section) => {
      const scoredSubmenu = section.submenu
        .map((item: any) => ({ ...item, score: calculateRelevanceScore(item) }))
        .filter((item: any) => item.score > 0)
        .sort((a: any, b: any) => b.score - a.score); // Sort by relevance score descending

      return {
        ...section,
        submenu: scoredSubmenu,
      };
    })
    .filter((section) => section.submenu.length > 0);

  // If we have results, return them sorted by best match
  if (scoredItems.length > 0) {
    return scoredItems;
  }

  // Fallback: more lenient search for any partial matches
  const fallbackItems = currentMenuItems.value
    .map((section) => ({
      ...section,
      submenu: section.submenu.filter((item: any) => {
        const tags = item.tags || [];
        const searchText = `${item.title} ${item.desc} ${tags.join(" ")}`.toLowerCase();
        return query.split(" ").some((word) => word.length > 2 && searchText.includes(word));
      }),
    }))
    .filter((section) => section.submenu.length > 0);

  return fallbackItems;
});

// Function to highlight search terms in text
const highlightSearchTerm = (text: string, query: string): string => {
  if (!query.trim()) return text;

  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  return text.replace(regex, '<mark class="px-1 text-yellow-900 bg-yellow-200 rounded">$1</mark>');
};

const getIconColor = (displayName: string): string => {
  const majorMap: Record<string, MajorName> = {
    RPL: "rpl",
    TKJ: "tkj",
    DKV: "dkv",
    EI: "tei",
    MT: "mekatronika",
    BC: "broadcasting",
    Animasi: "animasi",
    AV: "tav",
  };
  const major = majorMap[displayName] || "rpl";
  return majorColorSchemes[major]?.primary;
};

const openSections = ref<Record<string, boolean>>({});

const toggleSection = (title: string) => {
  openSections.value[title] = !(openSections.value[title] ?? false);
};
</script>

