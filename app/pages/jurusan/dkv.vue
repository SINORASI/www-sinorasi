<script lang="ts" setup>
import { motion, AnimatePresence } from "motion-v";
import KaproCarousel from "~/components/Major/KaproCarousel.vue";
import ReferenceCareers from "~/components/Major/ReferenceCareers.vue";
import type { MajorData } from "~/models/MajorData";
import type { MajorName } from "~/models/MajorName";
import { majorColorSchemes } from "~/utils/majorColors";

definePageMeta({
  layout: "major",
  pageTransition: {
    enterActiveClass: "page-enter-active",
    enterFromClass: "page-enter-from",
    enterToClass: "page-enter-to",
    leaveActiveClass: "page-leave-active",
    leaveFromClass: "page-leave-from",
    leaveToClass: "page-leave-to",
  },
});

const major: MajorName = "dkv";

const { data: majorDatas } = await useFetch<Record<MajorName, MajorData>>("/api/majors");

const majorColor = computed(
  () =>
    majorColorSchemes[major] || {
      primary: "#3598F9",
      secondary: "#2E7CE6",
      accent: "#6BB4FF",
      light: "#E8F4FF",
      text: "#3598F9",
      bg: "#3598F9",
      hoverBg: "#2E7CE6",
      border: "#3598F9",
      headerBg: "rgba(53, 152, 249, 0.3)",
      gradient: "linear-gradient(135deg, #3598F9, #2E7CE6)",
    }
);

const showBackToTop = ref(false);
const showGame = ref(false);

const startGame = () => {
  showGame.value = true;
};

const closeGame = () => {
  showGame.value = false;
};

useHead({
  title: () =>
    majorDatas.value?.[major]?.nameMajor
      ? `${majorDatas.value[major].nameMajor} - SMKN 2 Singosari`
      : "Jurusan - SMKN 2 Singosari",
  meta: [
    {
      name: "description",
      content: () =>
        majorDatas.value?.[major]?.nameMajor
          ? `Informasi lengkap tentang jurusan ${majorDatas.value[major].nameMajor} di SMK Negeri 2 Singosari`
          : "Jurusan di SMK Negeri 2 Singosari",
    },
  ],
});

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const scrollThreshold = 300;
    showBackToTop.value = scrollTop > scrollThreshold;
  };
  window.addEventListener("scroll", handleScroll);

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });
});
</script>

<template>
  <main class="overflow-hidden scroll-smooth">
    <div id="tentang-jurusan" class="relative flex items-center justify-center min-h-screen overflow-hidden">
      <div class="absolute inset-0" :style="`background: ${majorColor.gradient}`"></div>

      <div class="relative z-10 flex items-center w-full h-full min-h-screen">
        <div class="container px-8 py-16 mx-auto">
          <div class="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <div class="flex flex-col items-start justify-center">
              <div class="w-full max-w-md lg:max-w-lg">
                <img
                  src="/images/majorIcon/logo-dkv.webp"
                  alt="DKV Logo"
                  class="object-contain w-full h-auto drop-shadow-2xl"
                />
              </div>
            </div>

            <div class="flex flex-col items-center justify-center space-y-6 lg:items-end lg:space-y-8">
              <div class="w-full text-center lg:text-right">
                <h1
                  class="text-4xl font-black leading-none tracking-tight text-white uppercase sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl drop-shadow-2xl"
                >
                  {{ majorDatas?.[major]?.nameMajor }}
                </h1>
              </div>

              <div class="relative w-full max-w-sm lg:max-w-md">
                <img
                  src="/images/majorIcon/logo-dkv.webp"
                  alt="DKV Ornament"
                  class="object-contain w-full h-auto drop-shadow-2xl"
                />
              </div>

              <div class="px-6 py-3 bg-white shadow-2xl rounded-2xl lg:px-8 lg:py-4">
                <p
                  class="text-xl font-bold text-transparent sm:text-2xl lg:text-3xl bg-clip-text bg-linear-to-r"
                  :style="`background-image: linear-gradient(135deg, ${majorColor.primary}, ${majorColor.secondary})`"
                >
                  SMK Negeri 02 Singosari
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="absolute z-20 transform -translate-x-1/2 bottom-8 left-1/2 animate-bounce">
        <div
          class="flex justify-center w-8 h-12 pt-2 border-2 rounded-full bg-white/10 backdrop-blur-sm"
          :style="`border-color: white`"
        >
          <div class="w-2 h-3 bg-white rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>

    <motion.section
      id="kepala-program"
      class="relative min-h-screen py-16 md:py-24"
      :initial="{ opacity: 0, y: 50 }"
      :whileInView="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.8, delay: 0.1 }"
      :inViewOptions="{ once: true }"
    >
      <div class="container flex flex-col items-center gap-10 px-4 mx-auto md:gap-12">
        <div class="max-w-3xl space-y-4 text-center">
          <div class="inline-block">
            <span
              class="px-4 py-2 text-sm font-bold tracking-widest uppercase rounded-full md:text-base"
              :style="`background: ${majorColor.light}; color: ${majorColor.primary}`"
            >
              Kepemimpinan
            </span>
          </div>
          <h2 class="text-3xl font-extrabold md:text-5xl" :style="`color: ${majorColor.primary}`">
            Kepala Program Keahlian
          </h2>
          <p class="max-w-2xl mx-auto text-sm text-gray-600 md:text-lg">
            Dipimpin oleh tenaga pengajar profesional dan berpengalaman di bidangnya
          </p>
        </div>

        <div class="w-full p-6 bg-white rounded-3xl md:p-10">
          <KaproCarousel :major="major" />
        </div>
      </div>
    </motion.section>

    <motion.section
      id="materi-pembelajaran"
      class="min-h-screen py-16 md:py-24"
      :initial="{ opacity: 0, y: 50 }"
      :whileInView="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.8, delay: 0.2 }"
      :inViewOptions="{ once: true }"
    >
      <div class="container flex flex-col items-center justify-center gap-10 px-4 mx-auto md:gap-12">
        <div class="max-w-3xl space-y-4 text-center">
          <div class="inline-block">
            <span
              class="px-4 py-2 text-sm font-bold tracking-widest uppercase rounded-full md:text-base"
              :style="`background: ${majorColor.primary}; color: white`"
            >
              Kurikulum
            </span>
          </div>
          <h2
            class="text-3xl font-extrabold text-transparent md:text-5xl bg-linear-to-r bg-clip-text"
            :style="`background-image: linear-gradient(135deg, ${majorColor.primary}, ${majorColor.accent})`"
          >
            Materi Pembelajaran
          </h2>
          <p class="max-w-2xl mx-auto text-sm text-gray-600 md:text-lg">
            Kurikulum yang dirancang untuk memenuhi kebutuhan industri modern
          </p>
        </div>

        <div class="w-full max-w-7xl">
          <MajorTopics :major="major" />
        </div>
      </div>
    </motion.section>

    <motion.section
      id="tools-software"
      :initial="{ opacity: 0, y: 50 }"
      :whileInView="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.8, delay: 0.3 }"
      :inViewOptions="{ once: true }"
    >
      <MajorTools :major="major" />
    </motion.section>

    <motion.section
      id="kesempatan-kerja"
      class="relative min-h-screen py-16 overflow-hidden md:py-24"
      :initial="{ opacity: 0, y: 50 }"
      :whileInView="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.8, delay: 0.4 }"
      :inViewOptions="{ once: true }"
    >
      <div class="absolute inset-0 opacity-5">
        <div
          class="absolute inset-0"
          style="background-image: radial-gradient(circle, #000 1px, transparent 1px); background-size: 20px 20px"
        ></div>
      </div>

      <div class="container relative z-10 flex flex-col items-center justify-center px-4 mx-auto">
        <div class="max-w-4xl mb-12 space-y-4 text-center md:mb-16">
          <div class="inline-block">
            <span
              class="px-4 py-2 text-sm font-bold tracking-widest uppercase rounded-full md:text-base"
              :style="`background: ${majorColor.light}; color: ${majorColor.primary}`"
            >
              Prospek Karir
            </span>
          </div>
          <h2 class="text-3xl font-extrabold leading-tight md:text-5xl" :style="`color: ${majorColor.primary}`">
            Peluang Karir Setelah Lulus
          </h2>
          <p class="text-base text-gray-600 md:text-xl">
            Berbagai kesempatan kerja menanti lulusan {{ majorDatas?.[major]?.short }}
          </p>
        </div>

        <div class="flex flex-col items-center justify-center w-full">
          <ReferenceCareers :major="major" />
        </div>
      </div>
    </motion.section>

    <motion.section
      id="mitra-kerja"
      class="py-16 md:py-24"
      :initial="{ opacity: 0, y: 50 }"
      :whileInView="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.8, delay: 0.5 }"
      :inViewOptions="{ once: true }"
    >
      <div class="container flex items-center justify-center px-4 mx-auto">
        <div class="flex flex-col items-center justify-center w-full gap-10 md:gap-12 max-w-7xl">
          <div class="space-y-4 text-center">
            <div class="inline-block">
              <span
                class="px-4 py-2 text-sm font-bold tracking-widest uppercase rounded-full md:text-base"
                :style="`background: ${majorColor.primary}; color: white`"
              >
                Kerjasama Industri
              </span>
            </div>
            <h2
              class="text-3xl font-extrabold text-transparent md:text-5xl bg-linear-to-r bg-clip-text"
              :style="`background-image: linear-gradient(135deg, ${majorColor.primary}, ${majorColor.accent})`"
            >
              Mitra Industri
            </h2>
            <p class="max-w-2xl mx-auto text-sm text-gray-600 md:text-lg">
              Bekerja sama dengan perusahaan terkemuka untuk pengalaman praktik kerja siswa
            </p>
          </div>

          <div class="w-full">
            <MajorPartnerSlider :major="major" />
          </div>
        </div>
      </div>
    </motion.section>

    <motion.section
      id="minigame"
      class="min-h-screen py-16 md:py-24"
      :initial="{ opacity: 0, y: 50 }"
      :whileInView="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.8, delay: 0.6 }"
      :inViewOptions="{ once: true }"
    >
      <div class="container flex flex-col items-center justify-center gap-8 px-4 mx-auto md:gap-12">
        <div class="space-y-4 text-center">
          <div class="inline-block">
            <span
              class="px-4 py-2 text-sm font-bold tracking-widest text-white uppercase rounded-full md:text-base bg-linear-to-r"
              :style="`background-image: linear-gradient(135deg, ${majorColor.primary}, ${majorColor.accent})`"
            >
              Interaktif
            </span>
          </div>
          <h2 class="text-3xl font-extrabold md:text-5xl" :style="`color: ${majorColor.primary}`">
            Mini Game Edukatif
          </h2>
          <p class="max-w-2xl mx-auto text-sm text-gray-600 md:text-lg">
            Pelajari {{ majorDatas?.[major]?.short }} dengan cara yang menyenangkan!
          </p>
        </div>

        <div class="w-full max-w-6xl">
          <div
            class="relative flex justify-center items-center w-full min-h-[300px] md:min-h-[400px] rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden group transform hover:scale-[1.02] transition-all duration-300"
            :style="`background: linear-gradient(135deg, ${majorColor.primary}, ${majorColor.accent})`"
          >
            <div class="absolute inset-0 opacity-10">
              <div class="absolute inset-0 bg-linear-to-br from-white to-transparent animate-pulse"></div>
            </div>

            <div class="relative z-10 space-y-6 text-center">
              <div
                class="flex items-center justify-center w-24 h-24 mx-auto transition-transform duration-300 rounded-full shadow-xl md:w-32 md:h-32 bg-white/20 backdrop-blur-sm group-hover:rotate-12"
              >
                <svg class="w-12 h-12 text-white md:w-16 md:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-white md:text-4xl drop-shadow-lg">DKV Coloring Book</h3>
              <p class="max-w-md mx-auto text-sm text-white/90 md:text-lg">
                Warnai sketsa digital dan pelajari konsep desain grafis dengan alat pewarnaan profesional
              </p>
              <button
                @click="startGame"
                class="px-8 py-3 text-sm font-bold transition-all duration-300 transform bg-white rounded-full shadow-lg md:text-base hover:shadow-xl hover:-translate-y-1 flex items-center gap-2 mx-auto"
                :style="`color: ${majorColor.primary}`"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Play Game
              </button>
            </div>

            <div class="absolute w-20 h-20 border-4 rounded-full top-10 right-10 border-white/20 animate-ping"></div>
            <div
              class="absolute w-16 h-16 border-4 rounded-full bottom-10 left-10 border-white/20 animate-ping"
              style="animation-delay: 1s"
            ></div>
          </div>
        </div>
      </div>
    </motion.section>

    <!-- Lazy-loaded Minigame Component -->
    <LazyJurusanDkvMinigame v-if="showGame" @close="closeGame" />

    <motion.section
      id="prestasi"
      class="min-h-screen py-16 md:py-24"
      :initial="{ opacity: 0, y: 50 }"
      :whileInView="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.8, delay: 0.7 }"
      :inViewOptions="{ once: true }"
    >
      <div class="container flex flex-col items-center justify-center px-4 mx-auto">
        <div class="mb-12 space-y-4 text-center md:mb-16">
          <div class="inline-block">
            <span
              class="px-4 py-2 text-sm font-bold tracking-widest uppercase rounded-full md:text-base"
              :style="`background: ${majorColor.light}; color: ${majorColor.primary}`"
            >
              Kebanggaan
            </span>
          </div>
          <h2
            class="text-3xl font-extrabold text-transparent md:text-5xl bg-linear-to-r bg-clip-text"
            :style="`background-image: linear-gradient(135deg, ${majorColor.primary}, ${majorColor.accent})`"
          >
            Prestasi Jurusan
          </h2>
          <p class="max-w-2xl mx-auto text-sm text-gray-600 md:text-lg">
            Berbagai pencapaian membanggakan yang telah diraih siswa {{ majorDatas?.[major]?.short }}
          </p>
        </div>

        <div class="flex flex-col items-center justify-center w-full max-w-7xl">
          <MajorAchievement :major="major" />
        </div>
      </div>
    </motion.section>

    <AnimatePresence>
      <motion.button
        v-if="showBackToTop"
        @click="scrollToTop"
        class="fixed z-50 flex items-center justify-center transition-all duration-300 transform rounded-full bottom-8 right-8 w-14 h-14 hover:scale-110 group cursor-pointer"
        :style="{ background: `linear-gradient(135deg, ${majorColor.primary}, ${majorColor.accent})` }"
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :exit="{ opacity: 0, y: 20 }"
        :transition="{ duration: 0.3, ease: 'easeInOut' }"
      >
        <svg
          class="w-6 h-6 text-white transition-transform group-hover:-translate-y-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </AnimatePresence>
  </main>
</template>
