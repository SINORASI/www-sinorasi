<script lang="ts" setup>
import { motion } from "motion-v";
import type { MajorName } from "~/models/MajorName";
import { majorColorSchemes } from "~/utils/majorColors";

const props = defineProps<{
  major: MajorName;
}>();

const { data: majorDatas } = await useFetch("/api/majors");

const majorData = computed(() => majorDatas.value?.[props.major]);

const colors = computed(
  () =>
    majorColorSchemes[props.major] || {
      primary: "#F78B21",
      secondary: "#E67E00",
      accent: "#FFB366",
      light: "#FFF3E8",
      text: "#F78B21",
      bg: "#F78B21",
      hoverBg: "#E67E00",
      border: "#F78B21",
      headerBg: "rgba(247, 139, 33, 0.3)",
      gradient: "linear-gradient(135deg, #F78B21, #E67E00)",
    }
);
</script>

<template>
  <motion.section
    id="deskripsi-jurusan"
    class="relative py-16 overflow-hidden md:py-24"
    :initial="{ opacity: 0, y: 50 }"
    :whileInView="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.8 }"
    :inViewOptions="{ once: true }"
  >
    <div class="container relative z-10 px-4 mx-auto">
      <div class="max-w-6xl mx-auto">
        <!-- Title Section -->
        <motion.div
          class="mb-12 space-y-4 text-center md:mb-16"
          :initial="{ opacity: 0, y: 30 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, delay: 0.2 }"
          :inViewOptions="{ once: true }"
        >
          <div class="inline-block">
            <span
              class="px-4 py-2 text-sm font-bold tracking-widest uppercase rounded-full md:text-base"
              :style="{ background: colors.light, color: colors.primary }"
            >
              Tentang Jurusan
            </span>
          </div>
          <h2
            class="text-3xl font-extrabold text-transparent md:text-5xl bg-linear-to-r bg-clip-text"
            :style="{ backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }"
          >
            Mengenal {{ majorData?.nameMajor }}
          </h2>
        </motion.div>

        <!-- Main Content Card -->
        <motion.div
          class="relative overflow-hidden bg-white shadow-2xl rounded-3xl"
          :initial="{ opacity: 0, scale: 0.95 }"
          :whileInView="{ opacity: 1, scale: 1 }"
          :transition="{ duration: 0.7, delay: 0.3 }"
          :inViewOptions="{ once: true }"
        >
          <!-- Colored Top Border -->
          <div
            class="h-2"
            :style="{ backgroundImage: `linear-gradient(90deg, ${colors.primary}, ${colors.accent})` }"
          ></div>

          <div class="p-8 md:p-12">
            <!-- Description -->
            <motion.div
              class="mb-8 md:mb-12"
              :initial="{ opacity: 0, y: 20 }"
              :whileInView="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.6, delay: 0.4 }"
              :inViewOptions="{ once: true }"
            >
              <div class="flex items-start gap-4">
                <div
                  class="shrink-0 p-3 rounded-2xl"
                  :style="{ backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }"
                >
                  <svg class="w-6 h-6 text-white md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="mb-3 text-xl font-bold md:text-2xl" :style="{ color: colors.primary }">
                    Deskripsi Program
                  </h3>
                  <p class="text-base leading-relaxed text-gray-700 md:text-lg">
                    {{ majorData?.description }}
                  </p>
                </div>
              </div>
            </motion.div>
            <!-- Grid Section -->
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              <!-- Prerequisites -->
              <motion.div
                class="relative p-6 overflow-hidden transition-all duration-300 border-2 md:p-8 rounded-2xl hover:shadow-xl group"
                :style="{ borderColor: colors.light }"
                :initial="{ opacity: 0, x: -20 }"
                :whileInView="{ opacity: 1, x: 0 }"
                :transition="{ duration: 0.6, delay: 0.5 }"
                :inViewOptions="{ once: true }"
                :whileHover="{ scale: 1.02 }"
              >
                <div
                  class="absolute top-0 right-0 w-32 h-32 transition-transform duration-300 opacity-10 group-hover:scale-110"
                  :style="{ background: colors.primary }"
                  style="clip-path: polygon(100% 0, 0 0, 100% 100%)"
                ></div>

                <div class="relative">
                  <div class="flex items-center gap-3 mb-4">
                    <div
                      class="p-2 rounded-lg"
                      :style="{ backgroundImage: `linear-gradient(135deg, ${colors.primary}15, ${colors.accent}15)` }"
                    >
                      <svg
                        class="w-6 h-6 md:w-7 md:h-7"
                        :style="{ color: colors.primary }"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h4 class="text-lg font-bold md:text-xl" :style="{ color: colors.primary }">Persyaratan</h4>
                  </div>
                  <ul class="space-y-3">
                    <li
                      v-for="(prerequisite, index) in majorData?.prerequisites"
                      :key="index"
                      class="flex items-start gap-3 text-sm text-gray-700 md:text-base"
                    >
                      <span
                        class="shrink-0 w-1.5 h-1.5 rounded-full mt-2"
                        :style="{ background: colors.primary }"
                      ></span>
                      <span>{{ prerequisite }}</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              <!-- Related Courses -->
              <motion.div
                class="relative p-6 overflow-hidden transition-all duration-300 border-2 md:p-8 rounded-2xl hover:shadow-xl group"
                :style="{ borderColor: colors.light }"
                :initial="{ opacity: 0, x: 20 }"
                :whileInView="{ opacity: 1, x: 0 }"
                :transition="{ duration: 0.6, delay: 0.6 }"
                :inViewOptions="{ once: true }"
                :whileHover="{ scale: 1.02 }"
              >
                <div
                  class="absolute top-0 right-0 w-32 h-32 transition-transform duration-300 opacity-10 group-hover:scale-110"
                  :style="{ background: colors.secondary }"
                  style="clip-path: polygon(100% 0, 0 0, 100% 100%)"
                ></div>

                <div class="relative">
                  <div class="flex items-center gap-3 mb-4">
                    <div
                      class="p-2 rounded-lg"
                      :style="{ backgroundImage: `linear-gradient(135deg, ${colors.primary}15, ${colors.accent}15)` }"
                    >
                      <svg
                        class="w-6 h-6 md:w-7 md:h-7"
                        :style="{ color: colors.primary }"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <h4 class="text-lg font-bold md:text-xl" :style="{ color: colors.primary }">Mata Pelajaran</h4>
                  </div>
                  <ul class="space-y-3">
                    <li
                      v-for="(course, index) in majorData?.relatedCourses"
                      :key="index"
                      class="flex items-start gap-3 text-sm text-gray-700 md:text-base"
                    >
                      <span
                        class="shrink-0 w-1.5 h-1.5 rounded-full mt-2"
                        :style="{ background: colors.secondary }"
                      ></span>
                      <span>{{ course }}</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>

          <!-- Bottom Accent -->
          <div
            class="h-1"
            :style="{ backgroundImage: `linear-gradient(90deg, ${colors.accent}, ${colors.primary})` }"
          ></div>
        </motion.div>

        <!-- Stats Cards -->
        <motion.div
          class="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3 md:mt-12"
          :initial="{ opacity: 0, y: 30 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, delay: 0.7 }"
          :inViewOptions="{ once: true }"
        >
          <!-- Stat Card 1 -->
          <motion.div
            class="relative p-6 overflow-hidden text-center text-white shadow-lg rounded-2xl group"
            :style="{ backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }"
            :whileHover="{ y: -5, scale: 1.02 }"
            :transition="{ duration: 0.3 }"
          >
            <div
              class="absolute inset-0 transition-opacity duration-300 opacity-0 bg-white/10 group-hover:opacity-100"
            ></div>
            <div class="relative">
              <div class="mb-2 text-3xl font-bold md:text-4xl">100%</div>
              <div class="text-sm font-medium md:text-base opacity-90">Lulusan Bersertifikat</div>
            </div>
          </motion.div>

          <!-- Stat Card 2 -->
          <motion.div
            class="relative p-6 overflow-hidden text-center text-white shadow-lg rounded-2xl group"
            :style="{ backgroundImage: `linear-gradient(135deg, ${colors.secondary}, ${colors.accent})` }"
            :whileHover="{ y: -5, scale: 1.02 }"
            :transition="{ duration: 0.3 }"
          >
            <div
              class="absolute inset-0 transition-opacity duration-300 opacity-0 bg-white/10 group-hover:opacity-100"
            ></div>
            <div class="relative">
              <div class="mb-2 text-3xl font-bold md:text-4xl">15+</div>
              <div class="text-sm font-medium md:text-base opacity-90">Mitra Industri</div>
            </div>
          </motion.div>

          <!-- Stat Card 3 -->
          <motion.div
            class="relative p-6 overflow-hidden text-center text-white shadow-lg rounded-2xl group"
            :style="{ backgroundImage: `linear-gradient(135deg, ${colors.accent}, ${colors.primary})` }"
            :whileHover="{ y: -5, scale: 1.02 }"
            :transition="{ duration: 0.3 }"
          >
            <div
              class="absolute inset-0 transition-opacity duration-300 opacity-0 bg-white/10 group-hover:opacity-100"
            ></div>
            <div class="relative">
              <div class="mb-2 text-3xl font-bold md:text-4xl">95%</div>
              <div class="text-sm font-medium md:text-base opacity-90">Tingkat Penyerapan Kerja</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </motion.section>
</template>
