<template>
  <transition name="sidebar">
    <div v-if="isOpen" class="fixed inset-0 z-[100] flex">
      <div
        class="sidebar-backdrop fixed inset-0 bg-black/50 backdrop-blur-sm"
        @click="$emit('close')"
      ></div>

      <div class="sidebar-panel relative sm:ml-auto flex h-full w-full sm:w-80 flex-col bg-white shadow-2xl">
        <div class="flex flex-shrink-0 items-end justify-end border-b border-gray-200 p-4">
          <button
            @click="$emit('close')"
            class="rounded-full p-2 transition-colors duration-200 hover:bg-gray-100"
          >
            <Icon name="lucide:x" size="20" class="text-gray-600" />
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-4">
          <div class="mb-4">
            <input type="text" placeholder="Search..." v-model="searchQuery" class="w-full text-lg text-gray-800 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div v-for="(item, index) in filteredMenuItems" :key="index" class="mb-6">
            <h3 @click="toggleSection(item.title)" class="cursor-pointer mb-3 text-base font-semibold text-gray-800 flex items-center justify-between">
              {{ item.title }}
              <Icon name="lucide:chevron-down" size="16" class="transition-transform" :class="{ 'rotate-180': openSections[item.title] ?? false }" />
            </h3>
            <div v-if="(openSections[item.title] ?? false) || searchQuery.trim()">
              <div v-for="(sub, subIndex) in item.submenu" :key="subIndex" class="mb-3 ml-4 border-l-2 border-gray-200 transition-colors duration-200 hover:border-blue-300">
              <NuxtLink :to="sub.to" class="block">
                <div class="flex cursor-pointer items-start gap-3 rounded p-2 transition-colors duration-200 hover:bg-gray-50">
                  <Icon :name="sub.icon" size="18" class="mt-0.5 flex-shrink-0" :style="{ color: item.title === 'Jurusan' ? getIconColor(sub.title) : '#000000' }" />
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">{{ sub.title }}</p>
                    <p class="text-xs leading-relaxed text-gray-600">{{ sub.desc }}</p>
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
import { ref, computed } from 'vue'
import { majorColorSchemes } from "~/utils/majorColors";
import type { MajorName } from "~/models/MajorName";

const menuItems = [
  {
    title: "Beranda",
    submenu: [
      { title: "Home", desc: "Halaman utama website", icon: "lucide:home", to: "/", tags: ["home", "beranda"] },
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
        tags: ["profile", "sekolah", "tentang", "kami"],
      },
      {
        title: "Struktur Organisasi",
        desc: "Tim pengelola",
        icon: "lucide:users",
        to: "/informasi/struktur-organisasi",
        tags: ["struktur", "organisasi", "tim", "pengelola"],
      },
      {
        title: "Sarana Prasarana",
        desc: "Kondisi bangunan sekolah",
        icon: "lucide:building-2",
        to: "/informasi/sarana-prasarana",
        tags: ["sarana", "prasarana", "bangunan", "sekolah", "fasilitas"],
      }
    ],
  },
  {
    title: "Jurusan",
    submenu: [
      { title: "RPL", desc: "Rekayasa Perangkat Lunak", icon: "lucide:code", to: "/jurusan/rpl", tags: ["rpl", "rekayasa", "perangkat", "lunak", "programming"] },
      { title: "TKJ", desc: "Teknik Komputer Jaringan", icon: "lucide:network", to: "/jurusan/tkj", tags: ["tkj", "teknik", "komputer", "jaringan", "networking"] },
      { title: "DKV", desc: "Desain Komunikasi Visual", icon: "lucide:palette", to: "/jurusan/dkv", tags: ["dkv", "desain", "komunikasi", "visual", "design"] },
      { title: "EI", desc: "Teknik Elektronika Industri", icon: "lucide:zap", to: "/jurusan/tei", tags: ["tei", "elektronika", "industri", "elektronik"] },
      { title: "MT", desc: "Mekatronika", icon: "lucide:cog", to: "/jurusan/mekatronika", tags: ["mekatronika", "mekatronik"] },
      { title: "BC", desc: "Broadcasting", icon: "lucide:video", to: "/jurusan/broadcasting", tags: ["broadcasting", "broadcast"] },
      { title: "Animasi", desc: "Animasi", icon: "lucide:film", to: "/jurusan/animasi", tags: ["animasi", "animation"] },
      { title: "AV", desc: "Teknik Audio Visual", icon: "lucide:audio-lines", to: "/jurusan/tav", tags: ["tav", "audio", "visual", "teknik"] },
    ],
  },
  {
    title: "Informasi",
    submenu: [
      { title: "Berita", desc: "Berita terbaru sekolah", icon: "lucide:newspaper", to: "/berita", tags: ["berita", "news"] },
      { title: "Organisasi", desc: "Organisasi yang ada di sekolah", icon: "lucide:person-standing", to: "/organisasi", tags: ["organisasi", "organization"] },
      { title: "Extracurricular", desc: "Ekstrakurikuler yang ada di sekolah", icon: "lucide:workflow", to: "/ekstrakurikuler/", tags: ["ekstrakurikuler", "extracurricular", "extra"] },
      { title: "Events", desc: "Acara yang sedang/akan berlansung di sekolah", icon: "lucide:hand-metal", to: "/acara", tags: ["events", "acara"] },
    ],
  },
  {
    title: "Utilitas",
    submenu: [
      { title: "Anonymous BK", desc: "Konsultasi anonim", icon: "lucide:shield", to: "/utilitas/anonymous-bk", tags: ["anonymous", "bk", "konsultasi", "counseling"] },
      {
        title: "Traffic Tracker",
        desc: "Temukan berapa lama kamu bisa kesekolah!",
        icon: "lucide:bar-chart",
        to: "/utilitas/traffic-tracker",
        tags: ["traffic", "tracker", "sekolah", "time"],
      },
    ],
  },
];

const searchQuery = ref('')

const filteredMenuItems = computed(() => {
  if (!searchQuery.value.trim()) return menuItems

  const query = searchQuery.value.toLowerCase()

  return menuItems.map(item => ({
    ...item,
    submenu: item.submenu.filter(sub =>
      sub.title.toLowerCase().includes(query) ||
      sub.desc.toLowerCase().includes(query) ||
      sub.tags.some(tag => tag.toLowerCase().includes(query))
    )
  })).filter(item => item.submenu.length > 0)
})

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

defineProps<{
  isOpen: boolean
}>()

defineEmits<{
  close: []
}>()

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