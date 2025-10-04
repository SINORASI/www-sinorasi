<template>
  <transition name="sidebar">
    <div v-if="isOpen" class="fixed inset-0 z-[100] flex">
      <div
        class="sidebar-backdrop fixed inset-0 bg-black/50 backdrop-blur-sm"
        @click="$emit('close')"
      ></div>

      <div class="sidebar-panel relative sm:ml-auto flex h-full w-full sm:w-80 flex-col bg-white shadow-2xl">
        <div class="flex flex-shrink-0 items-center justify-between border-b border-gray-200 p-4">
          <div class="flex-1">
            <h2 class="text-lg font-semibold text-gray-800 truncate">{{ pageTitle }}</h2>
            <p class="text-sm text-gray-500 truncate">{{ pageSubtitle }}</p>
          </div>
          <button
            @click="$emit('close')"
            class="rounded-full p-2 transition-colors duration-200 hover:bg-gray-100 ml-2"
          >
            <Icon name="lucide:x" size="20" class="text-gray-600" />
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-4">
          <div class="mb-4 relative">
            <div class="relative">
              <input 
                type="text" 
                placeholder="Cari halaman, berita, jurusan, atau ekstrakurikuler..." 
                v-model="searchQuery" 
                class="w-full text-lg text-gray-800 bg-gray-50 border border-gray-200 rounded-lg px-3 py-3 pr-10 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
              />
              <Icon name="lucide:search" size="20" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <div v-if="searchQuery.trim() && filteredMenuItems.length === 0" class="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p class="text-sm text-yellow-700">
                <Icon name="lucide:info" size="16" class="inline mr-1" />
                Tidak ada hasil untuk "<strong>{{ searchQuery }}</strong>". Coba kata kunci lain seperti "voli", "basket", "robotik", "prestasi", atau "rpl".
              </p>
            </div>
            <div v-if="searchQuery.trim() && filteredMenuItems.length > 0" class="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
              <p class="text-xs text-green-700">
                <Icon name="lucide:check-circle" size="14" class="inline mr-1" />
                Ditemukan {{ filteredMenuItems.reduce((total, section) => total + section.submenu.length, 0) }} hasil
              </p>
            </div>
          </div>
          <div v-for="(item, index) in filteredMenuItems" :key="index" class="mb-6">
            <h3 @click="toggleSection(item.title)" class="cursor-pointer mb-3 text-base font-semibold text-gray-800 flex items-center justify-between">
              {{ item.title }}
              <div class="flex items-center gap-2">
                <span v-if="searchQuery.trim()" class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  {{ item.submenu.length }}
                </span>
                <Icon name="lucide:chevron-down" size="16" class="transition-transform" :class="{ 'rotate-180': openSections[item.title] ?? false }" />
              </div>
            </h3>
            <div v-if="(openSections[item.title] ?? false) || searchQuery.trim()">
              <div v-for="(sub, subIndex) in item.submenu" :key="subIndex" class="mb-3 ml-4 border-l-2 border-gray-200 transition-colors duration-200 hover:border-blue-300">
                <a v-if="sub.external" :href="sub.to" target="_blank" class="block" @click="emit('close')">
                  <div class="flex cursor-pointer items-start gap-3 rounded p-2 transition-colors duration-200 hover:bg-gray-50" :class="{ 'bg-blue-50 border border-blue-200': searchQuery.trim() && (sub as any).score > 80 }">
                    <Icon :name="sub.icon" size="18" class="mt-0.5 flex-shrink-0" :style="{ color: '#000000' }" />
                    <div class="flex-1">
                      <div class="flex items-center gap-2">
                        <p class="text-sm font-medium text-gray-900" v-html="highlightSearchTerm(sub.title, searchQuery)"></p>
                        <span v-if="item.title === 'Berita' && sub.title !== 'Semua Berita'" class="text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded">
                          Berita
                        </span>
                        <span v-if="searchQuery.trim() && (sub as any).score > 90" class="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                          Perfect match
                        </span>
                        <span v-else-if="searchQuery.trim() && (sub as any).score > 70" class="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                          Good match
                        </span>
                      </div>
                      <p class="text-xs leading-relaxed text-gray-600" v-html="highlightSearchTerm(sub.desc, searchQuery)"></p>
                    </div>
                  </div>
                </a>
                <NuxtLink v-else :to="sub.to" class="block" @click="emit('close')">
                  <div class="flex cursor-pointer items-start gap-3 rounded p-2 transition-colors duration-200 hover:bg-gray-50" :class="{ 'bg-blue-50 border border-blue-200': searchQuery.trim() && (sub as any).score > 80 }">
                    <Icon :name="sub.icon" size="18" class="mt-0.5 flex-shrink-0" :style="{ color: item.title === 'Jurusan' ? getIconColor(sub.title) : '#000000' }" />
                    <div class="flex-1">
                      <div class="flex items-center gap-2">
                        <p class="text-sm font-medium text-gray-900" v-html="highlightSearchTerm(sub.title, searchQuery)"></p>
                        <span v-if="item.title === 'Berita' && sub.title !== 'Semua Berita'" class="text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded">
                          Berita
                        </span>
                        <span v-if="searchQuery.trim() && (sub as any).score > 90" class="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                          Perfect match
                        </span>
                        <span v-else-if="searchQuery.trim() && (sub as any).score > 70" class="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                          Good match
                        </span>
                      </div>
                      <p class="text-xs leading-relaxed text-gray-600" v-html="highlightSearchTerm(sub.desc, searchQuery)"></p>
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

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { majorColorSchemes } from "~/utils/majorColors";
import type { MajorName } from "~/models/MajorName";
import { newsData } from "~/datas/data";

// Get current route for dynamic title
const route = useRoute()

// Define emit function
const emit = defineEmits<{
  close: []
}>()

// Watch for route changes and auto-close sidebar
watch(() => route.path, (newPath, oldPath) => {
  // Only auto-close if the route actually changed
  if (newPath !== oldPath) {
    // Small delay to allow for smooth transition
    setTimeout(() => {
      emit('close')
    }, 100)
  }
}, { immediate: false })

// Computed property for dynamic page title
const pageTitle = computed(() => {
  const path = route.path
  
  // Handle specific routes
  if (path === '/') return 'Beranda'
  if (path === '/berita') return 'Berita Terbaru'
  if (path === '/acara') return 'Events & Acara'
  if (path === '/organisasi') return 'Organisasi Sekolah'
  if (path === '/ekstrakurikuler') return 'Ekstrakurikuler'
  if (path === '/informasi/profile-sekolah') return 'Profil Sekolah'
  if (path === '/informasi/struktur-organisasi') return 'Struktur Organisasi'
  if (path === '/informasi/sarana-prasarana') return 'Sarana Prasarana'
  if (path === '/informasi/guru') return 'Data Guru'
  if (path === '/informasi/kontak') return 'Kontak Kami'
  if (path === '/utilitas/anonymous-bk') return 'Anonymous BK'
  if (path === '/utilitas/traffic-tracker') return 'Traffic Tracker'
  
  // Handle dynamic routes
  if (path.startsWith('/jurusan/')) {
    const majorName = route.params.majorName as string
    const majorMap: Record<string, string> = {
      'rpl': 'Rekayasa Perangkat Lunak',
      'tkj': 'Teknik Komputer Jaringan',
      'dkv': 'Desain Komunikasi Visual',
      'tei': 'Teknik Elektronika Industri',
      'mekatronika': 'Mekatronika',
      'broadcasting': 'Broadcasting',
      'animasi': 'Animasi',
      'tav': 'Teknik Audio Visual'
    }
    return majorMap[majorName] || 'Jurusan'
  }
  
  if (path.startsWith('/berita/')) {
    return 'Detail Berita'
  }
  
  if (path.startsWith('/acara/')) {
    return 'Detail Acara'
  }
  
  if (path.startsWith('/ekstrakurikuler/')) {
    const extraName = route.params.extra as string
    if (extraName === 'voli') return 'Ekstrakurikuler Voli'
    if (extraName === 'basket') return 'Ekstrakurikuler Basket'
    if (extraName === 'catur') return 'Ekstrakurikuler Catur'
    return 'Ekstrakurikuler'
  }
  
  if (path.startsWith('/organisasi/')) {
    return 'Detail Organisasi'
  }
  
  // Default fallback
  return 'SMKN 2 Singosari'
})

// Computed property for page subtitle
const pageSubtitle = computed(() => {
  const path = route.path
  
  if (path === '/') return 'Halaman utama website'
  if (path === '/berita') return 'Informasi dan kabar terbaru'
  if (path === '/acara') return 'Events dan kegiatan sekolah'
  if (path === '/organisasi') return 'Organisasi di sekolah'
  if (path === '/ekstrakurikuler') return 'Kegiatan ekstrakurikuler'
  if (path === '/informasi/profile-sekolah') return 'Informasi lengkap sekolah'
  if (path === '/informasi/struktur-organisasi') return 'Struktur pengelola sekolah'
  if (path === '/informasi/sarana-prasarana') return 'Fasilitas dan bangunan sekolah'
  if (path === '/informasi/guru') return 'Informasi tenaga pendidik'
  if (path === '/informasi/kontak') return 'Hubungi kami'
  if (path === '/utilitas/anonymous-bk') return 'Konsultasi anonim'
  if (path === '/utilitas/traffic-tracker') return 'Cek waktu perjalanan'
  
  // Handle dynamic routes
  if (path.startsWith('/jurusan/')) {
    const majorName = route.params.majorName as string
    const majorMap: Record<string, string> = {
      'rpl': 'Rekayasa Perangkat Lunak',
      'tkj': 'Teknik Komputer Jaringan', 
      'dkv': 'Desain Komunikasi Visual',
      'tei': 'Teknik Elektronika Industri',
      'mekatronika': 'Mekatronika',
      'broadcasting': 'Broadcasting',
      'animasi': 'Animasi',
      'tav': 'Teknik Audio Visual'
    }
    return `Program Keahlian ${majorMap[majorName] || 'Unknown'}`
  }
  
  if (path.startsWith('/berita/')) {
    return 'Baca berita lengkap'
  }
  
  if (path.startsWith('/acara/')) {
    return 'Informasi detail acara'
  }
  
  if (path.startsWith('/ekstrakurikuler/')) {
    return 'Informasi kegiatan ekstrakurikuler'
  }
  
  if (path.startsWith('/organisasi/')) {
    return 'Detail organisasi sekolah'
  }
  
  return 'SMKN 2 Singosari'
})

const menuItems = [
  {
    title: "Beranda",
    submenu: [
      { title: "Home", desc: "Halaman utama website", icon: "lucide:home", to: "/", external: false, tags: ["home", "beranda"] },
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
      }
    ],
  },
  {
    title: "Jurusan",
    submenu: [
      { title: "RPL", desc: "Rekayasa Perangkat Lunak", icon: "lucide:code", to: "/jurusan/rpl", external: false, tags: ["rpl", "rekayasa", "perangkat", "lunak", "programming"] },
      { title: "TKJ", desc: "Teknik Komputer Jaringan", icon: "lucide:network", to: "/jurusan/tkj", external: false, tags: ["tkj", "teknik", "komputer", "jaringan", "networking"] },
      { title: "DKV", desc: "Desain Komunikasi Visual", icon: "lucide:palette", to: "/jurusan/dkv", external: false, tags: ["dkv", "desain", "komunikasi", "visual", "design"] },
      { title: "EI", desc: "Teknik Elektronika Industri", icon: "lucide:zap", to: "/jurusan/tei", external: false, tags: ["tei", "elektronika", "industri", "elektronik"] },
      { title: "MT", desc: "Mekatronika", icon: "lucide:cog", to: "/jurusan/mekatronika", external: false, tags: ["mekatronika", "mekatronik"] },
      { title: "BC", desc: "Broadcasting", icon: "lucide:video", to: "/jurusan/broadcasting", external: false, tags: ["broadcasting", "broadcast"] },
      { title: "Animasi", desc: "Animasi", icon: "lucide:film", to: "/jurusan/animasi", external: false, tags: ["animasi", "animation"] },
      { title: "AV", desc: "Teknik Audio Visual", icon: "lucide:audio-lines", to: "/jurusan/tav", external: false, tags: ["tav", "audio", "visual", "teknik"] },
    ],
  },
  {
    title: "Informasi",
    submenu: [
      { title: "Berita", desc: "Berita terbaru sekolah", icon: "lucide:newspaper", to: "/berita", external: false, tags: ["berita", "news"] },
      { title: "Organisasi", desc: "Organisasi yang ada di sekolah", icon: "lucide:person-standing", to: "/organisasi", external: false, tags: ["organisasi", "organization"] },
      { title: "Extracurricular", desc: "Ekstrakurikuler yang ada di sekolah", icon: "lucide:workflow", to: "/ekstrakurikuler/", external: false, tags: ["ekstrakurikuler", "extracurricular", "extra"] },
      { title: "Events", desc: "Acara yang sedang/akan berlansung di sekolah", icon: "lucide:hand-metal", to: "/acara", external: false, tags: ["events", "acara"] },
    ],
  },
  {
    title: "Berita",
    submenu: [
      { title: "Semua Berita", desc: "Daftar lengkap berita sekolah", icon: "lucide:newspaper", to: "/berita", external: false, tags: ["berita", "news", "semua", "daftar"] },
      ...newsData.slice(0, 8).map(news => ({
        title: news.title,
        desc: news.subtitle,
        icon: "lucide:file-text",
        to: `/berita/${news.slug}`,
        external: false,
        tags: [
          "berita", 
          "news", 
          ...news.tags.map(tag => tag.toLowerCase()),
          ...news.title.toLowerCase().split(' '),
          ...news.subtitle.toLowerCase().split(' ')
        ].filter(tag => tag.length > 2)
      }))
    ],
  },
  {
    title: "Ekstrakurikuler",
    submenu: [
      { title: "Voli", desc: "Ekstrakurikuler Bola Voli", icon: "lucide:trophy", to: "/ekstrakurikuler/voli", external: false, tags: ["voli", "volleyball", "bola voli", "olahraga", "volley"] },
      { title: "Basket", desc: "Ekstrakurikuler Bola Basket", icon: "lucide:trophy", to: "/ekstrakurikuler/basket", external: false, tags: ["basket", "basketball", "bola basket", "olahraga"] },
      { title: "Catur", desc: "Ekstrakurikuler Catur", icon: "lucide:crown", to: "/ekstrakurikuler/catur", external: false, tags: ["catur", "chess", "strategi", "permainan"] },
      { title: "Semua Ekstrakurikuler", desc: "Daftar lengkap ekstrakurikuler", icon: "lucide:workflow", to: "/ekstrakurikuler/", external: false, tags: ["ekstrakurikuler", "extracurricular", "extra", "semua", "daftar"] },
    ],
  },
  {
    title: "Utilitas",
    submenu: [
      { title: "Anonymous BK", desc: "Konsultasi anonim", icon: "lucide:shield", to: "/utilitas/anonymous-bk", external: false, tags: ["anonymous", "bk", "konsultasi", "counseling"] },
      {
        title: "Traffic Tracker",
        desc: "Temukan berapa lama kamu bisa kesekolah!",
        icon: "lucide:bar-chart",
        to: "/utilitas/traffic-tracker",
        external: false,
        tags: ["traffic", "tracker", "sekolah", "time"],
      },
    ],
  },
  {
    title: "Layanan",
    submenu: [
      { title: "Kementerian Pendidikan dan Kebudayaan", desc: "Situs resmi Kemdikbud", icon: "lucide:external-link", to: "https://www.kemdikbud.go.id", external: true, tags: ["kemdikbud", "pendidikan", "layanan"] },
      { title: "Dinas Pendidikan Jawa Timur", desc: "Dinas Pendidikan Provinsi Jawa Timur", icon: "lucide:external-link", to: "https://www.disdik.jatimprov.go.id", external: true, tags: ["disdik", "jatim", "pendidikan", "layanan"] },
      { title: "Pemerintah Kabupaten Malang", desc: "Situs resmi Pemkab Malang", icon: "lucide:external-link", to: "https://www.malangkab.go.id", external: true, tags: ["malangkab", "pemerintah", "kabupaten", "layanan"] },
    ],
  },
];

const props = defineProps<{
  isOpen: boolean
  menuItems?: any[]
}>()

// Use passed menuItems prop if available, otherwise use default menuItems
const currentMenuItems = computed(() => props.menuItems || menuItems)

const searchQuery = ref('')

// Advanced search algorithm with fuzzy matching and relevance scoring
const filteredMenuItems = computed(() => {
  if (!searchQuery.value.trim()) return currentMenuItems.value

  const query = searchQuery.value.toLowerCase().trim()
  
  // Helper function to calculate relevance score
  const calculateRelevanceScore = (item: any) => {
    let score = 0
    const title = item.title.toLowerCase()
    const desc = item.desc.toLowerCase()
    const tags = item.tags.map((tag: string) => tag.toLowerCase())
    
    // Exact title match gets highest score
    if (title === query) score += 100
    // Title starts with query gets high score
    else if (title.startsWith(query)) score += 80
    // Title contains query gets medium-high score
    else if (title.includes(query)) score += 60
    
    // Exact tag match gets high score
    if (tags.some((tag: string) => tag === query)) score += 90
    // Tag starts with query gets medium-high score  
    else if (tags.some((tag: string) => tag.startsWith(query))) score += 70
    // Tag contains query gets medium score
    else if (tags.some((tag: string) => tag.includes(query))) score += 50
    
    // Description contains query gets lower score
    if (desc.includes(query)) score += 30
    
    // Fuzzy matching for common typos and partial matches
    const fuzzyMatches = [
      { pattern: /vol[iy]?/, matches: ['voli', 'volleyball', 'volley'] },
      { pattern: /basket/, matches: ['basket', 'basketball'] },
      { pattern: /catur/, matches: ['catur', 'chess'] },
      { pattern: /extra?/, matches: ['ekstrakurikuler', 'extracurricular'] },
      { pattern: /organisasi/, matches: ['organisasi', 'organization'] },
      { pattern: /berita|news/, matches: ['berita', 'news'] },
      { pattern: /acara/, matches: ['acara', 'events', 'event'] },
      { pattern: /prestasi/, matches: ['prestasi', 'achievement', 'juara'] },
      { pattern: /robotik/, matches: ['robotik', 'robot', 'teknologi'] },
      { pattern: /kerjasama/, matches: ['kerjasama', 'partnership', 'industri'] },
      { pattern: /program/, matches: ['program', 'tahun', 'ajaran'] },
      { pattern: /teknologi/, matches: ['teknologi', 'technology', 'digital'] },
      { pattern: /magang/, matches: ['magang', 'internship', 'industri'] }
    ]
    
    fuzzyMatches.forEach(({ pattern, matches }) => {
      if (pattern.test(query)) {
        matches.forEach(match => {
          if (title.includes(match) || tags.some((tag: string) => tag.includes(match))) {
            score += 45
          }
        })
      }
    })
    
    return score
  }

  // Filter and score all items
  const scoredItems = currentMenuItems.value.map(section => {
    const scoredSubmenu = section.submenu
      .map((item: any) => ({ ...item, score: calculateRelevanceScore(item) }))
      .filter((item: any) => item.score > 0)
      .sort((a: any, b: any) => b.score - a.score) // Sort by relevance score descending
    
    return {
      ...section,
      submenu: scoredSubmenu
    }
  }).filter(section => section.submenu.length > 0)

  // If we have results, return them sorted by best match
  if (scoredItems.length > 0) {
    return scoredItems
  }

  // Fallback: more lenient search for any partial matches
  const fallbackItems = currentMenuItems.value.map(section => ({
    ...section,
    submenu: section.submenu.filter((item: any) => {
      const searchText = `${item.title} ${item.desc} ${item.tags.join(' ')}`.toLowerCase()
      return query.split(' ').some(word => 
        word.length > 2 && searchText.includes(word)
      )
    })
  })).filter(section => section.submenu.length > 0)

  return fallbackItems
})

// Function to highlight search terms in text
const highlightSearchTerm = (text: string, query: string): string => {
  if (!query.trim()) return text
  
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  return text.replace(regex, '<mark class="bg-yellow-200 text-yellow-900 px-1 rounded">$1</mark>')
}

const getMajorName = (displayName: string): MajorName => {
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
  return majorMap[displayName] || "rpl";
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

const openSections = ref<Record<string, boolean>>({})

const toggleSection = (title: string) => {
  openSections.value[title] = !(openSections.value[title] ?? false)
}
</script>

<style scoped>
.sidebar-enter-active,
.sidebar-leave-active {
  transition: all 0.3s ease-in-out;
}

.sidebar-enter-from,
.sidebar-leave-to {
  opacity: 0;
}

.sidebar-enter-active .sidebar-panel,
.sidebar-leave-active .sidebar-panel {
    transition: transform 0.3s ease-in-out;
}

.sidebar-enter-from .sidebar-panel,
.sidebar-leave-to .sidebar-panel {
  transform: translateX(100%);
}

.sidebar-enter-active .sidebar-backdrop,
.sidebar-leave-active .sidebar-backdrop {
    transition: opacity 0.3s ease-in-out;
}

.sidebar-enter-from .sidebar-backdrop,
.sidebar-leave-to .sidebar-backdrop {
  opacity: 0;
}
</style>