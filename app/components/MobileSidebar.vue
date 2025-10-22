<template>
  <AnimatePresence>
    <motion.div
      v-if="isOpen"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :exit="{ opacity: 0 }"
      :transition="{ duration: 0.3, ease: 'easeInOut' }"
      class="z-[99999]"
    >
      <div class="fixed inset-0 z-[99999] flex">
        <motion.div
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 0.5 }"
          :exit="{ opacity: 0 }"
          :transition="{ duration: 0.3, ease: 'easeInOut' }"
          class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100000]"
          @click="$emit('close')"
        ></motion.div>

        <motion.div
          :initial="{ x: '100%' }"
          :animate="{ x: '0%' }"
          :exit="{ x: '100%' }"
          :transition="{ duration: 0.3, ease: 'easeInOut' }"
          class="relative flex flex-col w-full h-full bg-white shadow-2xl sm:ml-auto sm:w-96 z-[100001]"
        >
          <div class="flex items-center justify-between flex-shrink-0 gap-3 p-4 border-b border-gray-200">
            <div class="flex-1 min-w-0">
              <h2 class="text-lg font-semibold text-gray-800 truncate">Navigasi</h2>
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
            <div class="mb-6">
              <div class="p-4 bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl shadow-lg">
                <div class="flex items-center gap-3 mb-3">
                  <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Icon name="lucide:user-x" size="20" class="text-white" />
                  </div>
                  <div>
                    <p class="text-white font-semibold">{{ $t("sidebar.profile.disabled") }}</p>
                    <p class="text-gray-100 text-sm">{{ $t("sidebar.profile.disabledDesc") }}</p>
                  </div>
                </div>
                <div class="text-center">
                  <p class="text-gray-200 text-sm">{{ $t("sidebar.profile.comingSoon") }}</p>
                </div>
              </div>
            </div>

            <div class="relative mb-4">
              <div class="relative">
                <input
                  type="text"
                  :placeholder="$t('sidebar.search.placeholder')"
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

              <NuxtLink v-if="menuItems !== currentMenuItems" to="/" @click="$emit('close')" class="block mt-3">
                <div
                  class="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg px-4 py-3 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <div class="flex items-center gap-3">
                    <Icon name="lucide:home" size="24" class="flex-shrink-0" />
                    <div class="flex-1">
                      <p class="text-base font-semibold">{{ $t("sidebar.homeButton.title") }}</p>
                      <p class="text-xs text-blue-100">{{ $t("sidebar.homeButton.subtitle") }}</p>
                    </div>
                    <Icon name="lucide:arrow-right" size="20" class="flex-shrink-0" />
                  </div>
                </div>
              </NuxtLink>

              <div v-if="false" class="relative mt-3">
                <button
                  @click="showLanguageMenu = !showLanguageMenu"
                  class="flex items-center justify-between w-full px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div class="flex items-center gap-3">
                    <Icon name="lucide:languages" size="20" class="text-gray-600" />
                    <span class="text-sm font-medium text-gray-800">{{ $t("sidebar.languageSwitcher.label") }}</span>
                  </div>
                  <Icon
                    name="lucide:chevron-down"
                    size="16"
                    class="text-gray-500 transition-transform"
                    :class="{ 'rotate-180': showLanguageMenu }"
                  />
                </button>

                <transition name="dropdown" class="transition-all duration-200 ease-in-out">
                  <div
                    v-if="showLanguageMenu"
                    class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                  >
                    <button
                      v-for="lang in languages"
                      :key="lang.code"
                      @click="switchLanguage(lang.code)"
                      class="flex items-center justify-between w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                      :class="{ 'bg-blue-50 text-blue-700': currentLanguage === lang.code }"
                    >
                      <div class="flex items-center gap-3">
                        <span class="text-lg">{{ lang.flag }}</span>
                        <span class="text-sm font-medium">{{ lang.name }}</span>
                      </div>
                      <Icon v-if="currentLanguage === lang.code" name="lucide:check" size="16" class="text-blue-600" />
                    </button>
                  </div>
                </transition>
              </div>

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
                  {{ $t("sidebar.search.noResults", { query: searchQuery }) }}
                </p>
              </div>
              <div
                v-if="searchQuery.trim() && filteredMenuItems.length > 0"
                class="p-2 mt-2 border border-green-200 rounded-lg bg-green-50"
              >
                <p class="text-xs text-green-700">
                  <Icon name="lucide:check-circle" size="14" class="inline mr-1" />
                  {{
                    $t("sidebar.search.resultsCount", {
                      count: (filteredMenuItems as Record<string, unknown>[]).reduce((total: number, section: Record<string, unknown>) => total + ((section.submenu as unknown[]).length), 0),
                    })
                  }}
                </p>
              </div>
            </div>
            <div v-for="(item, index) in filteredMenuItems" :key="index" class="mb-6">
              <h3
                @click="toggleSection((item as Record<string, unknown>).title as string)"
                class="flex items-center justify-between mb-3 text-base font-semibold text-gray-800 cursor-pointer"
              >
                {{ $t(`sidebar.sections.${((item as Record<string, unknown>).title as string).toLowerCase().replace(/\s+/g, "")}`) }}
                <div class="flex items-center gap-2">
                  <span v-if="searchQuery.trim()" class="px-2 py-1 text-xs text-blue-700 bg-blue-100 rounded-full">
                    {{ ((item as Record<string, unknown>).submenu as unknown[]).length }}
                  </span>
                  <Icon
                    name="lucide:chevron-down"
                    size="16"
                    class="transition-transform"
                    :class="{ 'rotate-180': openSections[(item as Record<string, unknown>).title as string] ?? false }"
                  />
                </div>
              </h3>

              <AnimatePresence>
                <motion.div
                  v-if="(openSections[(item as Record<string, unknown>).title as string] ?? false) || searchQuery.trim()"
                  :initial="{ opacity: 0, height: 0 }"
                  :animate="{ opacity: 1, height: 'auto' }"
                  :exit="{ opacity: 0, height: 0 }"
                  :transition="{ duration: 0.3, ease: 'easeInOut' }"
                  class="overflow-hidden" >
                  <div
                    v-for="(sub, subIndex) in (item as Record<string, unknown>).submenu"
                    :key="subIndex"
                    class="mb-3 ml-4 transition-colors duration-200 border-l-2 border-gray-200 hover:border-blue-300"
                  >
                    <a v-if="(sub as Record<string, unknown>).external" :href="(sub as Record<string, unknown>).to as string" target="_blank" class="block" @click="$emit('close')">
                      <div
                        class="flex items-start gap-3 p-2 transition-colors duration-200 rounded cursor-pointer hover:bg-gray-50"
                        :class="{ 'bg-blue-50 border border-blue-200': searchQuery.trim() && ((sub as Record<string, unknown>).score as number) > 80 }"
                      >
                        <Icon :name="(sub as Record<string, unknown>).icon as string" size="18" class="mt-0.5 flex-shrink-0 text-gray-900" />
                        <div class="flex-1">
                          <div class="flex items-center gap-2">
                            <p
                              class="text-sm font-medium text-gray-900"
                              v-html="highlightSearchTerm((sub as Record<string, unknown>).title as string, searchQuery)"
                            ></p>
                            <span
                              v-if="((item as Record<string, unknown>).title as string) === 'Berita' && ((sub as Record<string, unknown>).title as string) !== 'Semua Berita'"
                              class="text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded"
                            >
                              {{ $t("sidebar.matches.news") }}
                            </span>
                            <span
                              v-if="searchQuery.trim() && ((sub as Record<string, unknown>).score as number) > 90"
                              class="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded"
                            >
                              {{ $t("sidebar.matches.perfect") }}
                            </span>
                            <span
                              v-else-if="searchQuery.trim() && ((sub as Record<string, unknown>).score as number) > 70"
                              class="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded"
                            >
                              {{ $t("sidebar.matches.good") }}
                            </span>
                          </div>
                          <p
                            class="text-xs leading-relaxed text-gray-600"
                            v-html="highlightSearchTerm((sub as Record<string, unknown>).desc as string, searchQuery)"
                          ></p>
                        </div>
                      </div>
                    </a>
                    <NuxtLink v-else :to="((sub as Record<string, unknown>).to as string) || '#'" class="block" @click="$emit('close')">
                      <div
                        class="flex items-start gap-3 p-2 transition-colors duration-200 rounded cursor-pointer hover:bg-gray-50"
                        :class="{ 'bg-blue-50 border border-blue-200': searchQuery.trim() && ((sub as Record<string, unknown>).score as number) > 80 }"
                      >
                        <Icon
                          :name="(sub as Record<string, unknown>).icon as string"
                          size="18"
                          class="mt-0.5 flex-shrink-0 text-gray-900"
                          :style="{ color: ((item as Record<string, unknown>).title as string) === 'Konsentrasi Keahlian' ? getIconColor((sub as Record<string, unknown>).title as string) : undefined }"
                        />
                        <div class="flex-1">
                          <div class="flex items-center gap-2">
                            <p
                              class="text-sm font-medium text-gray-900"
                              v-html="highlightSearchTerm((sub as Record<string, unknown>).title as string, searchQuery)"
                            ></p>
                            <span
                              v-if="((item as Record<string, unknown>).title as string) === 'Berita' && ((sub as Record<string, unknown>).title as string) !== 'Semua Berita'"
                              class="text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded"
                            >
                              {{ $t("sidebar.matches.news") }}
                            </span>
                            <span
                              v-if="searchQuery.trim() && ((sub as Record<string, unknown>).score as number) > 90"
                              class="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded"
                            >
                              {{ $t("sidebar.matches.perfect") }}
                            </span>
                            <span
                              v-else-if="searchQuery.trim() && ((sub as Record<string, unknown>).score as number) > 70"
                              class="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded"
                            >
                              {{ $t("sidebar.matches.good") }}
                            </span>
                          </div>
                          <p
                            class="text-xs leading-relaxed text-gray-600"
                            v-html="highlightSearchTerm((sub as Record<string, unknown>).desc as string, searchQuery)"
                          ></p>
                        </div>
                      </div>
                    </NuxtLink>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  </AnimatePresence>
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
import { computed, ref, watch } from "vue";
import { motion, AnimatePresence } from "motion-v";
import type { Extracurricular } from "~/models/Extracurricular";
import type { MajorName } from "~/models/MajorName";
import type { News } from "~/models/News";
import type { Organization } from "~/models/Organization";
import { majorColorSchemes } from "~/utils/majorColors";

const props = withDefaults(defineProps<{
  isOpen: boolean;
  menuItems?: unknown[];
}>(), {
  isOpen: false,
});

defineEmits<{
  close: [];
}>();

const { locales, setLocale } = useI18n();
const currentLanguage = computed(() => {
  const { $i18n } = useNuxtApp();
  return $i18n.locale.value;
});
const showLanguageMenu = ref(false);

const languages = computed(() => locales.value);

const switchLanguage = async (langCode: string) => {
  await setLocale(langCode as "id" | "en");
  showLanguageMenu.value = false;
};

const route = useRoute();

const { data: newsResponse } = await useFetch("/api/news", {
  query: { limit: 8 },
});

const newsData = computed(() => {
  const response = newsResponse.value as { data?: News[]; total?: number } | null;
  return response?.data || [];
});

const { data: organizationsResponse } = await useFetch("/api/organizations", {
  query: { limit: 10 },
});

const organizationsData = computed(() => {
  const response = organizationsResponse.value as { data?: Organization[]; total?: number } | null;
  return response?.data || [];
});

const { data: extracurricularsResponse } = await useFetch("/api/extracurriculars", {
  query: { limit: 50 },
});

const extracurricularsData = computed(() => {
  const response = extracurricularsResponse.value as {
    data?: Extracurricular[];
    total?: number;
  } | null;
  return response?.data || [];
});

const topExtracurriculars = computed(() => {
  const manualItems = ["Voli", "Basket", "Catur"];
  return extracurricularsData.value
    .filter((extra) => !manualItems.includes(extra.name))
    .slice(0, 5)
    .map((extra) => ({
      title: extra.name,
      desc: extra.description,
      icon: "lucide:users-2",
      to: `/ekstrakurikuler/${extra.slug}`,
      external: false,
      tags: [
        "ekstrakurikuler",
        "extra",
        extra.name.toLowerCase(),
        ...extra.name.toLowerCase().split(" "),
      ],
    }));
});

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
  if (path === "/utilitas/si-sarana") return "Sistem Informasi Sarana Prasarana";

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
        tags: ["dashboard", "user", "profil"],
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
    title: "Konsentrasi Keahlian",
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
        title: "Events",
        desc: "Acara yang sedang/akan berlansung di sekolah",
        icon: "lucide:hand-metal",
        to: "/acara",
        external: false,
        tags: ["events", "acara"],
      },
      {
        title: "Data Guru",
        desc: "Informasi tenaga pendidik",
        icon: "lucide:users",
        to: "/informasi/guru",
        external: false,
        tags: ["guru", "data", "tenaga", "pendidik", "teacher"],
      },
      {
        title: "Mitra Industri",
        desc: "Kerjasama dengan industri",
        icon: "lucide:building",
        to: "/informasi/mitra-industri",
        external: false,
        tags: ["mitra", "industri", "kerjasama", "partnership"],
      },
      {
        title: "Kontak",
        desc: "Hubungi kami",
        icon: "lucide:phone",
        to: "/informasi/kontak",
        external: false,
        tags: ["kontak", "contact", "hubungi"],
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
      ...organizationsData.value
        .filter(
          (org: Organization) => !["futsal-club", "english-club", "paskibra"].includes(org.slug),
        )
        .map((org: Organization) => ({
          title: org.name,
          desc: org.shortDescription || org.description,
          icon: "lucide:users-round",
          to: `/organisasi/${org.slug}`,
          external: false,
          tags: [
            "organisasi",
            org.name.toLowerCase(),
            ...org.name.toLowerCase().split(" "),
            ...((org.shortDescription || org.description)
              ?.toLowerCase()
              .split(" ")
              .filter((word) => word.length > 3) || []),
          ],
        })),
    ],
  },
  {
    title: "Ekstrakurikuler",
    submenu: [
      {
        title: "Semua Ekstrakurikuler",
        desc: "Daftar lengkap ekstrakurikuler",
        icon: "lucide:workflow",
        to: "/ekstrakurikuler/",
        external: false,
        tags: ["ekstrakurikuler", "extracurricular", "extra", "semua", "daftar"],
      },
      ...topExtracurriculars.value,
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
          ...news.tags.map((tag) => tag.toLowerCase()),
          ...news.title.toLowerCase().split(" "),
          ...news.subtitle.toLowerCase().split(" "),
        ].filter((tag) => tag.length > 2),
      })),
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
        title: "SI Sarana",
        desc: "Sistem Informasi Sarana Prasarana sekolah",
        icon: "lucide:alert-triangle",
        to: "/utilitas/si-sarana",
        external: false,
        tags: [
          "si",
          "sarana",
          "prasarana",
          "report",
          "laporan",
          "kerusakan",
          "fasilitas",
          "maintenance",
          "perbaikan",
        ],
      },
    ],
  },
  {
    title: "Layanan",
    submenu: [
      {
        title: "Direktorat SMK",
        desc: "Direktorat Sekolah Menengah Kejuruan",
        icon: "lucide:building",
        to: "http://smk.kemdikbud.go.id/",
        external: true,
        tags: ["direktorat", "smk", "kemdikbud", "layanan"],
      },
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
    ],
  },
];

const currentMenuItems = computed(() => props.menuItems || menuItems);

const searchQuery = ref("");

const filteredMenuItems = computed(() => {
  if (!searchQuery.value.trim()) return currentMenuItems.value;

  const query = searchQuery.value.toLowerCase().trim();

  const calculateRelevanceScore = (item: Record<string, unknown>) => {
    let score = 0;
    const title = (item.title as string).toLowerCase();
    const desc = (item.desc as string).toLowerCase();

    const tags = (item.tags as string[])
      ? (item.tags as string[]).map((tag: string) => tag.toLowerCase())
      : [];

    if (title === query) score += 100;
    else if (title.startsWith(query)) score += 80;
    else if (title.includes(query)) score += 60;

    if (tags.length > 0) {
      if (tags.some((tag: string) => tag === query)) score += 90;
      else if (tags.some((tag: string) => tag.startsWith(query))) score += 70;
      else if (tags.some((tag: string) => tag.includes(query))) score += 50;
    }

    if (desc.includes(query)) score += 30;

    if (tags.length === 0) {
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
      {
        pattern: /pengenalan|intro/,
        matches: ["pengenalan", "introduction", "apa itu", "tentang"],
      },
    ];

    fuzzyMatches.forEach(({ pattern, matches }) => {
      if (pattern.test(query)) {
        matches.forEach((match) => {
          if (
            title.includes(match) ||
            desc.includes(match) ||
            tags.some((tag: string) => tag.includes(match))
          ) {
            score += 45;
          }
        });
      }
    });

    return score;
  };

  const scoredItems = (currentMenuItems.value as Record<string, unknown>[])
    .map((section: Record<string, unknown>) => {
      const scoredSubmenu = (section.submenu as Record<string, unknown>[])
        .map((item: Record<string, unknown>) => ({ ...item, score: calculateRelevanceScore(item) }))
        .filter((item: Record<string, unknown> & { score: number }) => item.score > 0)
        .sort(
          (
            a: Record<string, unknown> & { score: number },
            b: Record<string, unknown> & { score: number },
          ) => b.score - a.score,
        );

      return {
        ...section,
        submenu: scoredSubmenu,
      };
    })
    .filter((section) => section.submenu.length > 0);

  if (scoredItems.length > 0) {
    return scoredItems;
  }

  const fallbackItems = (currentMenuItems.value as Record<string, unknown>[])
    .map((section: Record<string, unknown>) => ({
      ...section,
      submenu: (section.submenu as Record<string, unknown>[]).filter(
        (item: Record<string, unknown>) => {
          const tags = (item.tags as string[]) || [];
          const searchText = `${item.title} ${item.desc} ${tags.join(" ")}`.toLowerCase();
          return query.split(" ").some((word) => word.length > 2 && searchText.includes(word));
        },
      ),
    }))
    .filter((section) => section.submenu.length > 0);

  return fallbackItems;
});

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
