<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from "vue";
import { smoothScrollTo } from "~/utils/scrollUtils";

const headerClass = ref("bg-white/20 backdrop-blur-[8px] border-b-white/20 shadow-lg shadow-orange-500/10");
const sizeClass = ref("compact");
const isSidebarOpen = ref(false);
const route = useRoute();
const scrollItems = ref<Array<{ id: string; label: string }>>([]);

const scrollToSection = (id: string) => {
  smoothScrollTo(`#${id}`);
};

const populateScrollItems = async () => {
  if (route.path !== "/") return;

  await nextTick();
  scrollItems.value = [];

  const maxRetries = 5;
  const baseDelay = 100;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const delay = baseDelay * Math.pow(2, attempt);
    await new Promise((resolve) => setTimeout(resolve, delay));

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

    const populatedSections = homeSections.filter((section) => document.getElementById(section.id));

    if (populatedSections.length > 0) {
      scrollItems.value = populatedSections;
      // console.log(`Scroll items populated successfully on attempt ${attempt + 1}`);
      return;
    }
  }

  console.error("Failed to populate scroll items after maximum retries");
};

onMounted(() => {
  populateScrollItems();
});

watch(
  () => route.path,
  () => {
    populateScrollItems();
  }
);

onMounted(() => {
  headerClass.value = "bg-white/20 backdrop-blur-[8px] border-b-white/20 shadow-lg shadow-orange-500/10";
  sizeClass.value = "compact";
});
</script>

<template>
  <Motion
    :initial="{ y: -100, opacity: 0 }"
    :animate="{ y: 0, opacity: 1 }"
    :transition="{ duration: 0.8, ease: 'easeOut' }"
    class="z-999 fixed top-0 left-0 right-0"
  >
    <header :class="['z-999 border-b fixed top-0 left-0 right-0 transition-all duration-500 ease-in-out', headerClass]">
      <div
        :class="
          (sizeClass === 'full' ? 'p-4 gap-6' : 'p-3 gap-4') +
          ' flex items-center justify-around transition-all duration-500 ease-in-out'
        "
      >
        <Motion
          :initial="{ x: -50, opacity: 0 }"
          :animate="{ x: 0, opacity: 1 }"
          :transition="{ delay: 0.2, duration: 0.6 }"
        >
          <NuxtLink
            to="/"
            class="flex items-center justify-center transition-all duration-500 ease-in-out"
            :class="sizeClass === 'full' ? 'gap-5' : 'gap-3'"
          >
            <NuxtImg
              :src="'/images/logo-smk.webp'"
              :style="{ width: sizeClass === 'full' ? '80px' : '50px', transition: 'width 0.5s ease-in-out' }"
              alt="Logo SMKN 2 Singosari"
              width="1000"
              height="1000"
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
                :style="{
                  fontSize: sizeClass === 'full' ? '1rem' : '0.875rem',
                  transition: 'font-size 0.5s ease-in-out',
                }"
              >
                Inovasi Raih Prestasi
              </p>
            </div>
          </NuxtLink>
        </Motion>
        <Motion
          v-if="scrollItems.length > 0 && route.path === '/'"
          :initial="{ y: -20, opacity: 0 }"
          :animate="{ y: 0, opacity: 1 }"
          :transition="{ delay: 0.3, duration: 0.6 }"
        >
          <div
            :class="
              (sizeClass === 'full' ? 'gap-5' : 'gap-4') + ' hidden md:flex transition-all duration-500 ease-in-out'
            "
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
        </Motion>
        <Motion
          :initial="{ x: 50, opacity: 0 }"
          :animate="{ x: 0, opacity: 1 }"
          :transition="{ delay: 0.4, duration: 0.6 }"
        >
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
        </Motion>
      </div>
    </header>
  </Motion>

  <MobileSidebar :is-open="isSidebarOpen" @close="isSidebarOpen = false" />
</template>
