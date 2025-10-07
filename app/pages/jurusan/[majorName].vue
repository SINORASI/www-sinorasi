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

const route = useRoute();
const major = route.params.majorName as MajorName;

// Fetch majors data from API
const { data: majorDatas } = await useFetch<Record<MajorName, MajorData>>('/api/majors');

// Get major color
const majorColor = computed(() => majorColorSchemes[major] || {
  primary: "#667eea",
  secondary: "#764ba2",
  accent: "#9f7aea",
  light: "#f3f4f6",
  text: "#667eea",
  bg: "#667eea",
  hoverBg: "#764ba2",
  border: "#667eea",
  headerBg: "rgba(102, 126, 234, 0.3)",
});

// Set dynamic page title
useHead({
  title: () => majorDatas.value?.[major]?.nameMajor ? `${majorDatas.value[major].nameMajor} - SMKN 2 Singosari` : 'Jurusan - SMKN 2 Singosari',
  meta: [
    {
      name: 'description',
      content: () => majorDatas.value?.[major]?.nameMajor ? `Informasi lengkap tentang jurusan ${majorDatas.value[major].nameMajor} di SMK Negeri 2 Singosari` : 'Jurusan di SMK Negeri 2 Singosari'
    }
  ]
});
</script>

<template>
  <main class="overflow-x-hidden">
    <!-- Hero Section - Matching Reference Image -->
    <section 
      id="tentang-jurusan" 
      class="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <!-- Background with diagonal split design -->
      <div class="absolute inset-0">
        <!-- Black side (left) -->
        <div 
          class="absolute inset-0 bg-black"
          style="clip-path: polygon(0 0, 45% 0, 60% 100%, 0 100%);"
        ></div>
        
        <!-- Colored side (right) -->
        <div 
          class="absolute inset-0"
          :style="`background: ${majorColor.primary}`"
          style="clip-path: polygon(45% 0, 100% 0, 100% 100%, 60% 100%);"
        ></div>
      </div>

      <!-- Content -->
      <div class="relative z-10 w-full h-full min-h-screen flex items-center">
        <div class="container mx-auto px-8 py-16">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <!-- Left Side - Logo Image -->
            <div class="flex flex-col items-start justify-center">
              <!-- School Logo -->
              <div class="w-full max-w-md lg:max-w-lg">
                <img 
                  src="/images/logo.webp" 
                  alt="SMKN 2 Singosari Logo"
                  class="w-full h-auto object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            <!-- Right Side - Title & Graphics -->
            <div class="flex flex-col items-center lg:items-end justify-center space-y-6 lg:space-y-8">
              <!-- Main Title -->
              <div class="text-center lg:text-right w-full">
                <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-none uppercase tracking-tight drop-shadow-2xl">
                  {{ majorDatas?.[major]?.nameMajor }}
                </h1>
              </div>

              <!-- Laptop Illustration with Tech Badges -->
              <div class="relative w-full max-w-sm lg:max-w-md">
                <!-- Laptop -->
                <div class="bg-gray-800 rounded-2xl p-4 lg:p-6 shadow-2xl">
                  <!-- Screen -->
                  <div class="bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg aspect-video relative overflow-hidden">
                    <!-- Tech Badges -->
                    <div class="absolute inset-0 flex items-center justify-center gap-2 lg:gap-4 p-3 lg:p-4">
                      <div class="bg-orange-500 text-white font-bold text-xs lg:text-sm px-3 lg:px-4 py-2 lg:py-3 rounded-lg shadow-lg transform -rotate-6">
                        HTML
                      </div>
                      <div class="bg-blue-600 text-white font-bold text-xs lg:text-sm px-3 lg:px-4 py-2 lg:py-3 rounded-lg shadow-lg">
                        CSS
                      </div>
                      <div class="bg-green-500 text-white font-bold text-xs lg:text-sm px-3 lg:px-4 py-2 lg:py-3 rounded-lg shadow-lg transform rotate-6">
                        &lt;/&gt;
                      </div>
                    </div>
                  </div>
                  <!-- Keyboard -->
                  <div class="mt-2 lg:mt-3 h-2 lg:h-3 bg-gray-700 rounded-b-xl"></div>
                </div>
              </div>

              <!-- School Name Badge -->
              <div class="bg-white rounded-2xl px-6 lg:px-8 py-3 lg:py-4 shadow-2xl">
                <p class="text-xl sm:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r"
                   :style="`background-image: linear-gradient(135deg, ${majorColor.primary}, ${majorColor.secondary})`">
                  SMK Negeri 02 Singosari
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div 
          class="w-8 h-12 border-2 rounded-full flex justify-center pt-2 bg-white/10 backdrop-blur-sm"
          :style="`border-color: white`"
        >
          <div class="w-2 h-3 bg-white rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>

    <!-- Kepala Program Section -->
    <section 
      id="kepala-program" 
      class="min-h-screen py-16 md:py-24 relative"
      :style="`background: linear-gradient(to bottom, white, ${majorColor.light}10)`"
    >
      <div class="container mx-auto flex flex-col items-center gap-10 md:gap-12 px-4">
        <!-- Section Header -->
        <div class="text-center space-y-4 max-w-3xl">
          <div class="inline-block">
            <span 
              class="text-sm md:text-base font-bold uppercase tracking-widest px-4 py-2 rounded-full"
              :style="`background: ${majorColor.light}; color: ${majorColor.primary}`"
            >
              Kepemimpinan
            </span>
          </div>
          <h2 
            class="text-3xl md:text-5xl font-extrabold"
            :style="`color: ${majorColor.primary}`"
          >
            Kepala Program Keahlian
          </h2>
          <p class="text-gray-600 text-sm md:text-lg max-w-2xl mx-auto">
            Dipimpin oleh tenaga pengajar profesional dan berpengalaman di bidangnya
          </p>
        </div>

        <!-- Kapro Carousel -->
        <div 
          class="w-full bg-white rounded-3xl p-6 md:p-10"
        >
          <KaproCarousel />
        </div>
      </div>
    </section>

    <!-- Materi Pembelajaran Section -->
    <section 
      id="materi-pembelajaran" 
      class="min-h-screen py-16 md:py-24"
      :style="`background: linear-gradient(135deg, ${majorColor.primary}05, ${majorColor.accent}05)`"
    >
      <div class="container mx-auto flex justify-center items-center flex-col gap-10 md:gap-12 px-4">
        <!-- Section Header -->
        <div class="text-center space-y-4 max-w-3xl">
          <div class="inline-block">
            <span 
              class="text-sm md:text-base font-bold uppercase tracking-widest px-4 py-2 rounded-full"
              :style="`background: ${majorColor.primary}; color: white`"
            >
              Kurikulum
            </span>
          </div>
          <h2 
            class="text-3xl md:text-5xl font-extrabold bg-gradient-to-r bg-clip-text text-transparent"
            :style="`background-image: linear-gradient(135deg, ${majorColor.primary}, ${majorColor.accent})`"
          >
            Materi Pembelajaran
          </h2>
          <p class="text-gray-600 text-sm md:text-lg max-w-2xl mx-auto">
            Kurikulum yang dirancang untuk memenuhi kebutuhan industri modern
          </p>
        </div>

        <!-- Topics Component -->
        <div class="w-full max-w-7xl">
          <MajorTopics />
        </div>
      </div>
    </section>

    <!-- Kesempatan Kerja Section -->
    <section 
      id="kesempatan-kerja" 
      class="min-h-screen py-16 md:py-24 bg-white relative overflow-hidden"
    >
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute inset-0" style="background-image: radial-gradient(circle, #000 1px, transparent 1px); background-size: 20px 20px;"></div>
      </div>

      <div class="container mx-auto flex justify-center flex-col items-center px-4 relative z-10">
        <!-- Section Header -->
        <div class="text-center space-y-4 max-w-4xl mb-12 md:mb-16">
          <div class="inline-block">
            <span 
              class="text-sm md:text-base font-bold uppercase tracking-widest px-4 py-2 rounded-full"
              :style="`background: ${majorColor.light}; color: ${majorColor.primary}`"
            >
              Prospek Karir
            </span>
          </div>
          <h2 
            class="text-3xl md:text-5xl font-extrabold leading-tight"
            :style="`color: ${majorColor.primary}`"
          >
            Peluang Karir Setelah Lulus
          </h2>
          <p class="text-gray-600 text-base md:text-xl">
            Berbagai kesempatan kerja menanti lulusan {{ majorDatas?.[major]?.short }}
          </p>
        </div>

        <!-- Careers Component -->
        <div class="flex justify-center items-center flex-col w-full">
          <ReferenceCareers />
        </div>
      </div>
    </section>

    <!-- Mitra Kerja Section -->
    <section 
      id="mitra-kerja" 
      class="min-h-screen py-16 md:py-24"
      :style="`background: linear-gradient(to bottom, white, ${majorColor.light}15)`"
    >
      <div class="container mx-auto flex justify-center items-center px-4">
        <div class="flex flex-col justify-center items-center gap-10 md:gap-12 w-full max-w-7xl">
          <!-- Section Header -->
          <div class="text-center space-y-4">
            <div class="inline-block">
              <span 
                class="text-sm md:text-base font-bold uppercase tracking-widest px-4 py-2 rounded-full"
                :style="`background: ${majorColor.primary}; color: white`"
              >
                Kerjasama Industri
              </span>
            </div>
            <h2 
              class="text-3xl md:text-5xl font-extrabold bg-gradient-to-r bg-clip-text text-transparent"
              :style="`background-image: linear-gradient(135deg, ${majorColor.primary}, ${majorColor.accent})`"
            >
              Mitra Industri
            </h2>
            <p class="text-gray-600 text-sm md:text-lg max-w-2xl mx-auto">
              Bekerja sama dengan perusahaan terkemuka untuk pengalaman praktik kerja siswa
            </p>
          </div>

          <!-- Partners Slider -->
          <div class="w-full">
            <MajorPartnerSlider />
          </div>
        </div>
      </div>
    </section>

    <!-- Minigame Section -->
    <section 
      id="minigame" 
      class="min-h-screen py-16 md:py-24"
      :style="`background: linear-gradient(135deg, ${majorColor.primary}10, ${majorColor.accent}10)`"
    >
      <div class="container mx-auto flex justify-center items-center flex-col gap-8 md:gap-12 px-4">
        <!-- Section Header -->
        <div class="text-center space-y-4">
          <div class="inline-block">
            <span 
              class="text-sm md:text-base font-bold uppercase tracking-widest px-4 py-2 rounded-full bg-gradient-to-r text-white"
              :style="`background-image: linear-gradient(135deg, ${majorColor.primary}, ${majorColor.accent})`"
            >
              Interaktif
            </span>
          </div>
          <h2 
            class="text-3xl md:text-5xl font-extrabold"
            :style="`color: ${majorColor.primary}`"
          >
            Mini Game Edukatif
          </h2>
          <p class="text-gray-600 text-sm md:text-lg max-w-2xl mx-auto">
            Pelajari {{ majorDatas?.[major]?.short }} dengan cara yang menyenangkan!
          </p>
        </div>

        <!-- Minigame Container -->
        <div class="w-full max-w-6xl">
          <div
            class="relative flex justify-center items-center w-full min-h-[300px] md:min-h-[400px] 
                   rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden group
                   transform hover:scale-[1.02] transition-all duration-300"
            :style="`background: linear-gradient(135deg, ${majorColor.primary}, ${majorColor.accent})`"
          >
            <!-- Animated Background -->
            <div class="absolute inset-0 opacity-10">
              <div class="absolute inset-0 bg-gradient-to-br from-white to-transparent animate-pulse"></div>
            </div>

            <!-- Content -->
            <div class="relative z-10 text-center space-y-6">
              <div 
                class="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full bg-white/20 backdrop-blur-sm 
                       flex items-center justify-center shadow-xl group-hover:rotate-12 transition-transform duration-300"
              >
                <svg class="w-12 h-12 md:w-16 md:h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-2xl md:text-4xl font-bold text-white drop-shadow-lg">
                Game {{ majorDatas?.[major]?.short }}
              </h3>
              <p class="text-white/90 text-sm md:text-lg max-w-md mx-auto">
                Segera hadir! Game interaktif untuk mengenal lebih jauh tentang dunia {{ majorDatas?.[major]?.short }}
              </p>
              <button 
                class="px-8 py-3 bg-white rounded-full font-bold text-sm md:text-base
                       shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                :style="`color: ${majorColor.primary}`"
              >
                Coming Soon
              </button>
            </div>

            <!-- Decorative Elements -->
            <div class="absolute top-10 right-10 w-20 h-20 border-4 border-white/20 rounded-full animate-ping"></div>
            <div class="absolute bottom-10 left-10 w-16 h-16 border-4 border-white/20 rounded-full animate-ping" style="animation-delay: 1s;"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Prestasi Section -->
    <section 
      id="prestasi" 
      class="min-h-screen py-16 md:py-24 bg-gradient-to-b from-white to-gray-50"
    >
      <div class="container mx-auto flex justify-center items-center flex-col px-4">
        <!-- Section Header -->
        <div class="text-center space-y-4 mb-12 md:mb-16">
          <div class="inline-block">
            <span 
              class="text-sm md:text-base font-bold uppercase tracking-widest px-4 py-2 rounded-full"
              :style="`background: ${majorColor.light}; color: ${majorColor.primary}`"
            >
              Kebanggaan
            </span>
          </div>
          <h2 
            class="text-3xl md:text-5xl font-extrabold bg-gradient-to-r bg-clip-text text-transparent"
            :style="`background-image: linear-gradient(135deg, ${majorColor.primary}, ${majorColor.accent})`"
          >
            Prestasi Jurusan
          </h2>
          <p class="text-gray-600 text-sm md:text-lg max-w-2xl mx-auto">
            Berbagai pencapaian membanggakan yang telah diraih siswa {{ majorDatas?.[major]?.short }}
          </p>
        </div>

        <!-- Achievement Component -->
        <div class="flex justify-center items-center flex-col w-full max-w-7xl">
          <MajorAchievement />
        </div>
      </div>
    </section>

    <!-- Back to Top Button -->
    <button
      @click="scrollToTop"
      class="fixed bottom-8 right-8 w-14 h-14 rounded-full 
             flex items-center justify-center transform hover:scale-110 transition-all duration-300
             z-50 group"
      :style="`background: linear-gradient(135deg, ${majorColor.primary}, ${majorColor.accent})`"
    >
      <svg class="w-6 h-6 text-white group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  </main>
</template>

<script lang="ts">
export default {
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Smooth scrolling for all sections */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
}
</style>