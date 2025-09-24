<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { majorColorSchemes } from "~/utils/majorColors";
import type { MajorName } from "~/models/MajorName";
import { JobTitles } from "~/datas/data";

const headerClass = ref("bg-transparent border-b-transparent");
const sizeClass = ref("full");
const isSidebarOpen = ref(false);

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

const menuItems = [
  {
    title: "Beranda",
    submenu: [
      { title: "Home", desc: "Halaman utama website", icon: "lucide:home", to: "/" },
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
      },
      {
        title: "Struktur Organisasi",
        desc: "Tim pengelola",
        icon: "lucide:users",
        to: "/informasi/struktur-organisasi",
      },
      {
        title: "Sarana Prasarana",
        desc: "Kondisi bangunan sekolah",
        icon: "lucide:building-2",
        to: "/informasi/sarana-prasarana",
      }
    ],
  },
  {
    title: "Jurusan",
    submenu: [
      { title: "RPL", desc: "Rekayasa Perangkat Lunak", icon: "lucide:code", to: "/jurusan/rpl" },
      { title: "TKJ", desc: "Teknik Komputer Jaringan", icon: "lucide:network", to: "/jurusan/tkj" },
      { title: "DKV", desc: "Desain Komunikasi Visual", icon: "lucide:palette", to: "/jurusan/dkv" },
      { title: "EI", desc: "Teknik Elektronika Industri", icon: "lucide:zap", to: "/jurusan/tei" },
      { title: "MT", desc: "Mekatronika", icon: "lucide:cog", to: "/jurusan/mekatronika" },
      { title: "BC", desc: "Broadcasting", icon: "lucide:video", to: "/jurusan/broadcasting" },
      { title: "Animasi", desc: "Animasi", icon: "lucide:film", to: "/jurusan/animasi" },
      { title: "AV", desc: "Teknik Audio Visual", icon: "lucide:audio-lines", to: "/jurusan/tav" },
    ],
  },
  {
    title: "Informasi",
    submenu: [
      { title: "Berita", desc: "Berita terbaru sekolah", icon: "lucide:newspaper", to: "/berita" },
      { title: "Organisasi", desc: "Organisasi yang ada di sekolah", icon: "lucide:person-standing", to: "/organisasi" },
      { title: "Extracurricular", desc: "Ekstrakurikuler yang ada di sekolah", icon: "lucide:workflow", to: "/ekstrakurikuler/" },
      { title: "Events", desc: "Acara yang sedang/akan berlansung di sekolah", icon: "lucide:hand-metal", to: "/acara" },
    ],
  },
  {
    title: "Utilitas",
    submenu: [
      { title: "Anonymous BK", desc: "Konsultasi anonim", icon: "lucide:shield", to: "/utilitas/anonymous-bk" },
      {
        title: "Traffic Tracker",
        desc: "Temukan berapa lama kamu bisa kesekolah!",
        icon: "lucide:bar-chart",
        to: "/utilitas/traffic-tracker",
      },
    ],
  },
];

onMounted(() => {
  const handleScroll = () => {
    if (window.scrollY > window.innerHeight) {
      headerClass.value = "bg-neutral-600/30 backdrop-blur-2xl border-b-neutral-400";
      sizeClass.value = "compact";
    } else {
      headerClass.value = "bg-transparent border-b-transparent";
      sizeClass.value = "full";
    }
  };
  window.addEventListener("scroll", handleScroll);
  handleScroll();
  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });
});
</script>

<template>
  <header :class="['z-100 border-b-1 fixed top-0 left-0 right-0 transition-all duration-500 ease-in-out', headerClass]">
    <div
      :class="
        (sizeClass === 'full' ? 'p-4 gap-5' : 'p-3 gap-4') +
        ' flex items-center justify-around transition-all duration-500 ease-in-out'
      "
    >
      <div
        :class="
          (sizeClass === 'full' ? 'gap-5' : 'gap-3') +
          ' flex items-center justify-center transition-all duration-500 ease-in-out'
        "
      >
        <img
          :src="'/images/logo.webp'"
          :style="{ width: sizeClass === 'full' ? '80px' : '50px', transition: 'width 0.5s ease-in-out' }"
          alt="Logo SMKN 2 Singosari"
        />
        <div class="flex flex-col">
          <h2
            :style="{
              fontSize: sizeClass === 'full' ? '1.3rem' : '1.125rem',
              transition: 'font-size 0.5s ease-in-out',
            }"
            class="font-bold"
          >
            SMKN 2 Singosari
          </h2>
          <p
            class="-mt-1"
            :style="{ fontSize: sizeClass === 'full' ? '1rem' : '0.875rem', transition: 'font-size 0.5s ease-in-out' }"
          >
            Inovasi Raih Prestasi
          </p>
        </div>
      </div>
      <div
        :class="(sizeClass === 'full' ? 'gap-5' : 'gap-4') + ' hidden md:flex transition-all duration-500 ease-in-out'"
      >
        <div v-for="(item, index) in menuItems" :key="index" class="relative group">
          <div
            :class="
              (sizeClass === 'full' ? 'gap-3' : 'gap-2') +
              ' flex cursor-pointer items-center justify-center transition-all duration-500 ease-in-out'
            "
          >
            <p
              :style="{
                fontSize: sizeClass === 'full' ? '1rem' : '0.875rem',
                transition: 'font-size 0.5s ease-in-out',
              }"
              class="group-hover:text-blue-600 transition-colors duration-300"
            >
              {{ item.title }}
            </p>
            <span class="group-hover:rotate-180 transition-transform duration-500 ease-in-out inline-flex items-center">
              <Icon
                name="lucide:chevron-down"
                :size="sizeClass === 'full' ? 20 : 16"
                :style="{
                  transform: sizeClass === 'full' ? 'scale(1)' : 'scale(0.8)',
                  transition: 'transform 0.5s ease-in-out',
                }"
              />
            </span>
          </div>
          <div
            class="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-gray-200"
          >
            <div class="py-2">
              <NuxtLink
                v-for="(sub, subIndex) in item.submenu"
                :key="subIndex"
                :to="sub.to"
                class="block px-4 py-3 hover:bg-gray-50 transition-colors duration-200"
              >
                <div class="flex items-center gap-3">
                  <Icon :name="sub.icon" size="20" :style="{ color: item.title === 'Jurusan' ? getIconColor(sub.title) : '#000000' }" />
                  <div>
                    <p class="font-medium text-gray-900">{{ sub.title }}</p>
                    <p class="text-sm text-gray-600">{{ sub.desc }}</p>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      <div class="transition-all duration-500 ease-in-out">
        <button class="cursor-pointer" @click="isSidebarOpen = !isSidebarOpen">
          <Icon
            name="lucide:align-justify"
            :size="sizeClass === 'full' ? 30 : 24"
            :style="{
              transform: sizeClass === 'full' ? 'scale(1)' : 'scale(0.8)',
              transition: 'transform 0.5s ease-in-out',
            }"
          />
        </button>
      </div>
    </div>
  </header>

  <MobileSidebar :is-open="isSidebarOpen" :menu-items="menuItems" @close="isSidebarOpen = false" />
</template>
