<script lang="ts" setup>
import KaproCarousel from "~/components/Major/KaproCarousel.vue";
import type { MajorName } from "~/models/MajorName";
import type { MajorData } from "~/models/MajorData";
import ReferenceCareers from "~/components/Major/ReferenceCareers.vue";
import MajorTopics from "~/components/Major/MajorTopics.vue";
import MajorPartnerSlider from "~/components/Major/MajorPartnerSlider.vue";
import MajorAchievement from "~/components/Major/MajorAchievement.vue";
import { majorColorSchemes } from "~/utils/majorColors";

definePageMeta({
  layout: "major",
});

const major: MajorName = "rpl";

// Fetch majors data from API
const { data: majorDatas } = await useFetch<Record<MajorName, MajorData>>("/api/majors");

// Get major color
const majorColor = computed(
  () =>
    majorColorSchemes[major] || {
      primary: "#667eea",
      secondary: "#764ba2",
      accent: "#9f7aea",
      light: "#f3f4f6",
      text: "#667eea",
      bg: "#667eea",
      hoverBg: "#764ba2",
      border: "#667eea",
      headerBg: "rgba(102, 126, 234, 0.3)",
      gradient: "linear-gradient(135deg, #667eea, #764ba2)",
    }
);

// Set dynamic page title
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
</script>

<template>
  <main class="overflow-x-hidden">
    <!-- Hero Section - Matching Reference Image -->
    <section id="tentang-jurusan" class="relative flex items-center justify-center min-h-screen overflow-hidden">
      <!-- Background with gradient -->
      <div class="absolute inset-0" :style="`background: ${majorColor.gradient}`"></div>

      <!-- Content -->
      <div class="relative z-10 flex items-center w-full h-full min-h-screen">
        <div class="container px-8 py-16 mx-auto">
          <div class="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <!-- Left Side - Logo Image -->
            <div class="flex flex-col items-start justify-center">
              <!-- School Logo -->
              <div class="w-full max-w-md lg:max-w-lg">
                <img
                  src="/images/logo-smk.webp"
                  alt="SMKN 2 Singosari Logo"
                  class="object-contain w-full h-auto drop-shadow-2xl"
                />
              </div>
            </div>

            <!-- Right Side - Title & Graphics -->
            <div class="flex flex-col items-center justify-center space-y-6 lg:items-end lg:space-y-8">
              <!-- Main Title -->
              <div class="w-full text-center lg:text-right">
                <h1
                  class="text-4xl font-black leading-none tracking-tight text-white uppercase sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl drop-shadow-2xl"
                >
                  {{ majorDatas?.[major]?.nameMajor }}
                </h1>
              </div>

              <!-- Laptop Illustration with Tech Badges -->
              <div class="relative w-full max-w-sm lg:max-w-md">
                <!-- Laptop -->
                <div class="p-4 bg-gray-800 shadow-2xl rounded-2xl lg:p-6">
                  <!-- Screen -->
                  <div
                    class="relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 aspect-video"
                  >
                    <!-- Tech Badges -->
                    <div class="absolute inset-0 flex items-center justify-center gap-2 p-3 lg:gap-4 lg:p-4">
                      <div
                        class="px-3 py-2 text-xs font-bold text-white transform bg-orange-500 rounded-lg shadow-lg lg:text-sm lg:px-4 lg:py-3 -rotate-6"
                      >
                        HTML
                      </div>
                      <div
                        class="px-3 py-2 text-xs font-bold text-white bg-blue-600 rounded-lg shadow-lg lg:text-sm lg:px-4 lg:py-3"
                      >
                        CSS
                      </div>
                      <div
                        class="px-3 py-2 text-xs font-bold text-white transform bg-green-500 rounded-lg shadow-lg lg:text-sm lg:px-4 lg:py-3 rotate-6"
                      >
                        CODE
                      </div>
                    </div>
                  </div>
                  <!-- Keyboard -->
                  <div class="h-2 mt-2 bg-gray-700 lg:mt-3 lg:h-3 rounded-b-xl"></div>
                </div>
              </div>

              <!-- School Name Badge -->
              <div class="px-6 py-3 bg-white shadow-2xl rounded-2xl lg:px-8 lg:py-4">
                <p
                  class="text-xl font-bold text-transparent sm:text-2xl lg:text-3xl bg-clip-text bg-gradient-to-r"
                  :style="`background-image: linear-gradient(135deg, ${majorColor.primary}, ${majorColor.secondary})`"
                >
                  SMK Negeri 02 Singosari
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute z-20 transform -translate-x-1/2 bottom-8 left-1/2 animate-bounce">
        <div
          class="flex justify-center w-8 h-12 pt-2 border-2 rounded-full bg-white/10 backdrop-blur-sm"
          :style="`border-color: white`"
        >
          <div class="w-2 h-3 bg-white rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>

    <!-- Kepala Program Section -->
    <section
      id="kepala-program"
      class="relative min-h-screen py-16 md:py-24"
      :style="`background: linear-gradient(to bottom, white, ${majorColor.light}10)`"
    >
      <div class="container flex flex-col items-center gap-10 px-4 mx-auto md:gap-12">
        <!-- Section Header -->
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

        <!-- Kapro Carousel -->
        <div class="w-full p-6 bg-white rounded-3xl md:p-10">
          <KaproCarousel :major="major" />
        </div>
      </div>
    </section>

    <!-- Materi Pembelajaran Section -->
    <section
      id="materi-pembelajaran"
      class="min-h-screen py-16 md:py-24"
      :style="`background: linear-gradient(135deg, ${majorColor.primary}05, ${majorColor.accent}05)`"
    >
      <div class="container flex flex-col items-center justify-center gap-10 px-4 mx-auto md:gap-12">
        <!-- Section Header -->
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
            class="text-3xl font-extrabold text-transparent md:text-5xl bg-gradient-to-r bg-clip-text"
            :style="`background-image: linear-gradient(135deg, ${majorColor.primary}, ${majorColor.accent})`"
          >
            Materi Pembelajaran
          </h2>
          <p class="max-w-2xl mx-auto text-sm text-gray-600 md:text-lg">
            Kurikulum yang dirancang untuk memenuhi kebutuhan industri modern
          </p>
        </div>

        <!-- Topics Component -->
        <div class="w-full max-w-7xl">
          <MajorTopics :major="major" />
        </div>
      </div>
    </section>

    <!-- Kesempatan Kerja Section -->
    <section id="kesempatan-kerja" class="relative min-h-screen py-16 overflow-hidden bg-white md:py-24">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-5">
        <div
          class="absolute inset-0"
          style="background-image: radial-gradient(circle, #000 1px, transparent 1px); background-size: 20px 20px"
        ></div>
      </div>

      <div class="container relative z-10 flex flex-col items-center justify-center px-4 mx-auto">
        <!-- Section Header -->
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

        <!-- Careers Component -->
        <div class="flex flex-col items-center justify-center w-full">
          <ReferenceCareers :major="major" />
        </div>
      </div>
    </section>

    <!-- Mitra Kerja Section -->
    <section
      id="mitra-kerja"
      class="min-h-screen py-16 md:py-24"
      :style="`background: linear-gradient(to bottom, white, ${majorColor.light}15)`"
    >
      <div class="container flex items-center justify-center px-4 mx-auto">
        <div class="flex flex-col items-center justify-center w-full gap-10 md:gap-12 max-w-7xl">
          <!-- Section Header -->
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
              class="text-3xl font-extrabold text-transparent md:text-5xl bg-gradient-to-r bg-clip-text"
              :style="`background-image: linear-gradient(135deg, ${majorColor.primary}, ${majorColor.accent})`"
            >
              Mitra Industri
            </h2>
            <p class="max-w-2xl mx-auto text-sm text-gray-600 md:text-lg">
              Bekerja sama dengan perusahaan terkemuka untuk pengalaman praktik kerja siswa
            </p>
          </div>

          <!-- Partners Slider -->
          <div class="w-full">
            <MajorPartnerSlider :major="major" />
          </div>
        </div>
      </div>
    </section>

    <!-- Minigame Section -->
    <section id="minigame" class="min-h-screen py-16 md:py-24">
      <div class="container flex flex-col items-center justify-center gap-8 px-4 mx-auto md:gap-12">
        <!-- Section Header -->
        <div class="space-y-4 text-center">
          <div class="inline-block">
            <span
              class="px-4 py-2 text-sm font-bold tracking-widest text-white uppercase rounded-full md:text-base bg-gradient-to-r"
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

        <!-- Minigame Container -->
        <div class="w-full max-w-6xl">
          <div
            class="relative flex justify-center items-center w-full min-h-[300px] md:min-h-[400px] rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden group transform hover:scale-[1.02] transition-all duration-300"
            :style="`background: linear-gradient(135deg, ${majorColor.primary}, ${majorColor.accent})`"
          >
            <!-- Animated Background -->
            <div class="absolute inset-0 opacity-10">
              <div class="absolute inset-0 bg-gradient-to-br from-white to-transparent animate-pulse"></div>
            </div>

            <!-- Content -->
            <div class="relative z-10 space-y-6 text-center">
              <div
                class="flex items-center justify-center w-24 h-24 mx-auto transition-transform duration-300 rounded-full shadow-xl md:w-32 md:h-32 bg-white/20 backdrop-blur-sm group-hover:rotate-12"
              >
                <svg class="w-12 h-12 text-white md:w-16 md:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-white md:text-4xl drop-shadow-lg">
                Game {{ majorDatas?.[major]?.short }}
              </h3>
              <p class="max-w-md mx-auto text-sm text-white/90 md:text-lg">
                Segera hadir! Game interaktif untuk mengenal lebih jauh tentang dunia {{ majorDatas?.[major]?.short }}
              </p>
              <button
                class="px-8 py-3 text-sm font-bold transition-all duration-300 transform bg-white rounded-full shadow-lg md:text-base hover:shadow-xl hover:-translate-y-1"
                :style="`color: ${majorColor.primary}`"
              >
                Coming Soon
              </button>
            </div>

            <!-- Decorative Elements -->
            <div class="absolute w-20 h-20 border-4 rounded-full top-10 right-10 border-white/20 animate-ping"></div>
            <div
              class="absolute w-16 h-16 border-4 rounded-full bottom-10 left-10 border-white/20 animate-ping"
              style="animation-delay: 1s"
            ></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Prestasi Section -->
    <section id="prestasi" class="min-h-screen py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div class="container flex flex-col items-center justify-center px-4 mx-auto">
        <!-- Section Header -->
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
            class="text-3xl font-extrabold text-transparent md:text-5xl bg-gradient-to-r bg-clip-text"
            :style="`background-image: linear-gradient(135deg, ${majorColor.primary}, ${majorColor.accent})`"
          >
            Prestasi Jurusan
          </h2>
          <p class="max-w-2xl mx-auto text-sm text-gray-600 md:text-lg">
            Berbagai pencapaian membanggakan yang telah diraih siswa {{ majorDatas?.[major]?.short }}
          </p>
        </div>

        <!-- Achievement Component -->
        <div class="flex flex-col items-center justify-center w-full max-w-7xl">
          <MajorAchievement :major="major" />
        </div>
      </div>
    </section>

    <!-- Back to Top Button -->
    <button
      @click="scrollToTop"
      class="fixed z-50 flex items-center justify-center transition-all duration-300 transform rounded-full bottom-8 right-8 w-14 h-14 hover:scale-110 group"
      :style="`background: linear-gradient(135deg, ${majorColor.primary}, ${majorColor.accent})`"
    >
      <svg
        class="w-6 h-6 text-white transition-transform group-hover:-translate-y-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  </main>
</template>

<script lang="ts">
export default {
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>

