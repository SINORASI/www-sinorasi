<script lang="ts" setup>
import { motion } from "motion-v";
import type { MajorName } from "~/models/MajorName";
import { majorColorSchemes } from "~/utils/majorColors";

const props = defineProps<{
  major: MajorName;
}>();

const majors: MajorName[] = ["rpl", "tkj", "dkv", "animasi", "broadcasting", "tei", "mekatronika", "tav"];

const { data: majorDatas } = await useFetch("/api/majors");

const currentColor = computed(
  () =>
    majorColorSchemes[props.major] || {
      primary: "#F78B21",
      secondary: "#E67E00",
      accent: "#FFB366",
      light: "#FFF3E8",
    }
);

const otherMajors = computed(() => majors.filter((m) => m !== props.major));

const majorIconMap: Record<MajorName, string> = {
  rpl: "logo-rpl.webp",
  tkj: "logo-tkj.webp",
  dkv: "logo-dkv.webp",
  animasi: "logo-an.webp",
  broadcasting: "logo-bc.webp",
  tei: "logo-tei.webp",
  mekatronika: "logo-mt.webp",
  tav: "logo-tav.webp",
};

const getMajorColor = (major: MajorName) => majorColorSchemes[major];
const getMajorName = (major: MajorName) => majorDatas.value?.[major]?.nameMajor || major;
const getMajorPath = (major: MajorName) => `/jurusan/${major}`;
const getMajorIcon = (major: MajorName) => `/images/majorIcon/${majorIconMap[major]}`;
</script>

<template>
  <motion.section
    class="relative py-16 mb-20 md:py-24"
    :initial="{ opacity: 0, y: 50 }"
    :whileInView="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.8 }"
    :inViewOptions="{ once: true }"
  >
    <div class="container relative z-10 px-4 mx-auto">
      <div class="max-w-6xl mx-auto">
        <!-- Header -->
        <motion.div
          class="mb-12 space-y-4 text-center md:mb-16"
          :initial="{ opacity: 0, y: 30 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, delay: 0.2 }"
          :inViewOptions="{ once: true }"
        >
          <h2
            class="text-3xl font-extrabold text-transparent md:text-5xl bg-linear-to-r bg-clip-text"
            :style="{ backgroundImage: `linear-gradient(135deg, ${currentColor.primary}, ${currentColor.accent})` }"
          >
            Jelajahi Jurusan Lainnya
          </h2>
          <p class="max-w-2xl mx-auto text-sm text-gray-600 md:text-lg">
            Temukan informasi lengkap tentang program-program unggulan lainnya di SMK Negeri 2 Singosari
          </p>
        </motion.div>

        <!-- Major Cards Grid -->
        <div class="flex justify-center">
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 w-full max-w-6xl">
            <motion.div
              v-for="(major, index) in otherMajors"
              :key="major"
              :initial="{ opacity: 0, y: 20 }"
              :whileInView="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.6, delay: 0.1 + index * 0.05 }"
              :inViewOptions="{ once: true }"
              :whileHover="{ y: -5, scale: 1.02 }"
              :transition-hover="{ duration: 0.3 }"
            >
              <NuxtLink :to="getMajorPath(major)" class="group block h-full">
                <div
                  class="relative h-full p-6 overflow-hidden transition-all duration-300 shadow-lg rounded-2xl md:p-8 hover:shadow-2xl"
                  :style="{
                    backgroundImage: `linear-gradient(135deg, ${getMajorColor(major).primary}, ${
                      getMajorColor(major).secondary
                    })`,
                  }"
                >
                  <!-- Overlay on hover -->
                  <div
                    class="absolute inset-0 opacity-0 transition-opacity duration-300 bg-black/10 group-hover:opacity-100"
                  ></div>

                  <!-- Content -->
                  <div class="relative z-10 flex flex-col items-center justify-center h-full gap-4 text-center">
                    <div
                      class="flex items-center justify-center w-16 h-16 rounded-full md:w-20 md:h-20 bg-white/20 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300"
                    >
                      <NuxtImg
                        :src="getMajorIcon(major)"
                        :alt="`${getMajorName(major)} Logo`"
                        class="object-contain w-10 h-10 md:w-12 md:h-12 drop-shadow-lg"
                      />
                    </div>

                    <div>
                      <h3 class="text-xl font-bold text-white md:text-2xl">{{ getMajorName(major) }}</h3>
                      <p class="mt-2 text-sm text-white/90">
                        {{ majorDatas?.[major]?.short }}
                      </p>
                    </div>

                    <div
                      class="flex items-center gap-2 mt-4 text-sm font-semibold text-white transition-transform duration-300 group-hover:translate-x-2"
                    >
                      <span>Pelajari Lebih Lanjut</span>
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  <!-- Decorative corner -->
                  <div
                    class="absolute -top-10 -right-10 w-32 h-32 opacity-10 rounded-full"
                    :style="{ background: `${getMajorColor(major).accent}` }"
                  ></div>
                </div>
              </NuxtLink>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  </motion.section>
</template>
