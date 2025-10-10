<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from "vue";

const headerClass = ref("bg-white/20 backdrop-blur-[8px] border-b-white/20 shadow-lg shadow-orange-500/10");
const sizeClass = ref("compact");
const isSidebarOpen = ref(false);
const route = useRoute();
const scrollItems = ref<Array<{ id: string; label: string }>>([]);

// const navItems = [
//   { label: "Home", href: "/" },
//   { label: "Profile", href: "/informasi/profile-sekolah" },
//   { label: "Departments", href: "/jurusan" },
//   { label: "Facilities", href: "/informasi/sarana-prasarana" },
//   { label: "Achievements", href: "#achievements" },
//   { label: "News", href: "/berita" },
//   { label: "Contact", href: "/informasi/kontak" },
// ];

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const populateScrollItems = async () => {
  await nextTick();
  scrollItems.value = [];

  // Add a small delay to ensure DOM is fully rendered
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Exclude scroll items on major pages
  if (route.path.startsWith("/jurusan/")) {
    return;
  }

  // Only show scroll items on the home page
  if (route.path === "/") {
    // Use custom short labels for home page sections
    const homeSections = [
      { id: "profil-sekolah", label: "Profil" },
      { id: "sambutan", label: "Sambutan" },
      { id: "prestasi", label: "Prestasi" },
      { id: "seragam-sekolah", label: "Seragam" },
      { id: "jejak-sejarah", label: "Sejarah" },
      { id: "jurusan", label: "Jurusan" },
      { id: "berita", label: "Berita" },
      { id: "faq", label: "FAQ" },
    ];

    // Verify sections exist on the page
    homeSections.forEach((section) => {
      if (document.getElementById(section.id)) {
        scrollItems.value.push(section);
      }
    });
  }
};

onMounted(() => {
  populateScrollItems();

  // Retry once more after a longer delay to ensure DOM is fully loaded
  setTimeout(() => {
    if (scrollItems.value.length === 0) {
      populateScrollItems();
    }
  }, 500);
});

watch(
  () => route.path,
  () => {
    // Wait for next tick and longer delay for the page to fully render
    nextTick(() => {
      setTimeout(() => {
        populateScrollItems();
      }, 500);
    });
  }
);

onMounted(() => {
  // Apply consistent glassmorphism effect on all pages
  headerClass.value = "bg-white/20 backdrop-blur-[8px] border-b-white/20 shadow-lg shadow-orange-500/10";
  sizeClass.value = "compact";
});
</script>

<template>
  <header
    :class="['z-[999] border-b-1 fixed top-0 left-0 right-0 transition-all duration-500 ease-in-out', headerClass]"
  >
    <div
      :class="
        (sizeClass === 'full' ? 'p-4 gap-6' : 'p-3 gap-4') +
        ' flex items-center justify-around transition-all duration-500 ease-in-out'
      "
    >
      <NuxtLink
        to="/"
        class="flex items-center justify-center transition-all duration-500 ease-in-out"
        :class="sizeClass === 'full' ? 'gap-5' : 'gap-3'"
      >
        <img
          :src="'/images/logo-smk.webp'"
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
      </NuxtLink>
      <div
        v-if="scrollItems.length > 0 && route.path === '/'"
        :class="(sizeClass === 'full' ? 'gap-5' : 'gap-4') + ' hidden md:flex transition-all duration-500 ease-in-out'"
      >
        <button
          v-for="item in scrollItems"
          :key="item.id"
          @click="scrollToSection(item.id)"
          :style="{
            fontSize: sizeClass === 'full' ? '1rem' : '0.875rem',
            transition: 'font-size 0.5s ease-in-out',
          }"
          class="relative transition-colors duration-300 cursor-pointer hover:text-blue-600 group"
        >
          {{ item.label }}
          <span
            class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"
          ></span>
        </button>
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

  <MobileSidebar :is-open="isSidebarOpen" @close="isSidebarOpen = false" />
</template>
