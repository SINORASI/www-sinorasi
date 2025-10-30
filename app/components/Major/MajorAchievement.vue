<script setup lang="ts">
import { motion, AnimatePresence } from "motion-v";
import { computed, ref } from "vue";
import type { MajorData } from "~/models/MajorData";
import type { MajorName } from "~/models/MajorName";
import { majorColorSchemes } from "~/utils/majorColors";

const props = defineProps<{
  major?: MajorName;
}>();

interface Achievement {
  id: number;
  title: string;
  description: string;
  studentName: string;
  year: number;
}

const route = useRoute();
const major = props.major || (route.params.majorName as MajorName);

const { data: achievementsData } = await useFetch<Achievement[]>(`/api/achievements${major ? `?major=${major}` : ""}`);
const { data: _majorDatas } = await useFetch<Record<MajorName, MajorData>>("/api/majors");

const currentIndex = ref<number>(0);
const selectedAchievement = ref<Achievement | null>(null);
const slideDirection = ref<"left" | "right" | "">("");

const achievements = computed(() => achievementsData.value || []);

const majorColor = computed(() => {
  if (major && majorColorSchemes[major]) {
    return majorColorSchemes[major];
  }
  // Default color scheme for general achievements
  return {
    primary: "#1d4ed8",
    secondary: "#1e40af",
    accent: "#3b82f6",
    light: "#dbeafe",
    text: "#1d4ed8",
    bg: "#1d4ed8",
    hoverBg: "#1e40af",
    border: "#1d4ed8",
    headerBg: "rgba(29, 78, 216, 0.3)",
    gradient: "linear-gradient(135deg, #1d4ed8, #1e40af)",
  };
});

const currentAchievement = computed(() => {
  if (achievements.value.length === 0) return null;
  return achievements.value[currentIndex.value];
});

const leftAchievement = computed(() => {
  if (achievements.value.length === 0) return null;
  const total = achievements.value.length;
  const prevIndex = (currentIndex.value - 1 + total) % total;
  return achievements.value[prevIndex];
});

const rightAchievement = computed(() => {
  if (achievements.value.length === 0) return null;
  const total = achievements.value.length;
  const nextIndex = (currentIndex.value + 1) % total;
  return achievements.value[nextIndex];
});

const isAnimating = ref(false);

const nextSlide = (): void => {
  if (achievements.value.length > 0 && !isAnimating.value) {
    isAnimating.value = true;
    slideDirection.value = "left";

    setTimeout(() => {
      currentIndex.value = (currentIndex.value + 1) % achievements.value.length;
    }, 150);

    setTimeout(() => {
      slideDirection.value = "";
      isAnimating.value = false;
    }, 600);
  }
};

const previousSlide = (): void => {
  if (achievements.value.length > 0 && !isAnimating.value) {
    isAnimating.value = true;
    slideDirection.value = "right";

    setTimeout(() => {
      currentIndex.value = (currentIndex.value - 1 + achievements.value.length) % achievements.value.length;
    }, 150);

    setTimeout(() => {
      slideDirection.value = "";
      isAnimating.value = false;
    }, 600);
  }
};

const openModal = (achievement: Achievement): void => {
  selectedAchievement.value = achievement;
};

const closeModal = (): void => {
  selectedAchievement.value = null;
};
</script>

<template>
  <div class="w-full">
    <div class="relative flex flex-col items-center gap-6 px-2 md:gap-8 md:px-4">
      <div class="relative flex items-center justify-center w-full gap-3 md:gap-6 lg:gap-8">
        <button
          class="z-10 flex items-center justify-center shrink-0 w-10 h-10 transition-all duration-300 rounded-full shadow-lg md:w-12 md:h-12 hover:scale-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
          :style="`background: linear-gradient(135deg, ${majorColor.primary}, ${majorColor.accent})`"
          @click.prevent="previousSlide"
          :disabled="achievements.length === 0"
        >
          <svg class="w-5 h-5 text-white md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div
          v-if="leftAchievement && !isAnimating"
          class="shrink-0 hidden w-40 scale-90 pointer-events-none lg:block xl:w-48 opacity-30"
        >
          <div
            class="overflow-hidden bg-white border-4 shadow-lg rounded-xl"
            :style="`border-color: ${majorColor.primary}`"
          >
            <div
              class="relative flex items-center justify-center h-44 xl:h-52 bg-linear-to-br from-gray-100 to-gray-200"
            >
              <div class="relative">
                <div
                  class="absolute w-12 h-12 transform -translate-x-1/2 rounded-full -top-5 left-1/2"
                  :style="`background: ${majorColor.light}`"
                ></div>
                <div class="w-16 rounded-t-full h-14 mt-9" :style="`background: ${majorColor.light}`"></div>
              </div>
            </div>

            <div
              class="px-3 py-2.5 text-center text-white font-bold text-xs truncate"
              :style="`background: ${majorColor.primary}`"
            >
              {{ leftAchievement.studentName }}
            </div>
          </div>
        </div>

        <motion.div
          v-if="currentAchievement"
          class="shrink-0 w-full max-w-[200px] sm:max-w-60 md:max-w-[280px] lg:max-w-[320px] cursor-pointer"
          @click="openModal(currentAchievement)"
          :initial="{ opacity: 0, scale: 0.8 }"
          :animate="{ opacity: 1, scale: 1 }"
          :transition="{ duration: 0.6 }"
          :whileHover="{ scale: 1.05 }"
          :whileTap="{ scale: 0.95 }"
        >
          <motion.div
            :key="currentAchievement.id"
            :initial="{
              opacity: 0,
              scale: 0.8,
              x: slideDirection === 'left' ? 100 : slideDirection === 'right' ? -100 : 0,
            }"
            :animate="{ opacity: 1, scale: 1, x: 0 }"
            :transition="{ duration: 0.6, ease: 'easeOut' }"
            class="w-full h-full"
          >
            <motion.div
              class="bg-white rounded-2xl shadow-2xl border-4 md:border-[5px] overflow-hidden w-full h-full group"
              :style="{ borderColor: majorColor.primary }"
              :whileHover="{
                scale: 1.05,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                y: -5,
              }"
              :transition="{ type: 'spring', stiffness: 300 }"
            >
              <div
                class="relative flex items-center justify-center h-56 overflow-hidden sm:h-64 md:h-72 lg:h-80 bg-linear-to-br from-gray-100 to-gray-200"
              >
                <!-- Floating particles around trophy -->
                <motion.div
                  class="absolute top-4 right-4 w-2 h-2 rounded-full opacity-60"
                  :style="{ background: majorColor.primary }"
                  :animate="{
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 1, 0.6],
                  }"
                  :transition="{ duration: 2, repeat: Infinity }"
                ></motion.div>
                <motion.div
                  class="absolute bottom-6 left-6 w-1.5 h-1.5 rounded-full opacity-50"
                  :style="{ background: majorColor.accent }"
                  :animate="{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }"
                  :transition="{ duration: 3, repeat: Infinity, delay: 1 }"
                ></motion.div>

                <div class="relative z-10 flex flex-col items-center">
                  <motion.div
                    :initial="{ y: 20, opacity: 0 }"
                    :animate="{ y: 0, opacity: 1 }"
                    :transition="{ delay: 0.2, duration: 0.5 }"
                    :whileHover="{ rotate: [0, -5, 5, 0], scale: 1.1 }"
                  >
                    <motion.div
                      class="w-16 h-16 transition-transform duration-300 transform rounded-full shadow-2xl sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
                      :style="{ background: majorColor.light }"
                      :animate="{
                        boxShadow: [
                          `0 0 0 0 ${majorColor.primary}40`,
                          `0 0 0 10px ${majorColor.primary}00`,
                          `0 0 0 0 ${majorColor.primary}40`,
                        ],
                      }"
                      :transition="{ duration: 2, repeat: Infinity }"
                    ></motion.div>
                  </motion.div>

                  <motion.div
                    :initial="{ y: 30, opacity: 0 }"
                    :animate="{ y: 0, opacity: 1 }"
                    :transition="{ delay: 0.4, duration: 0.5 }"
                    :whileHover="{ scale: 1.05 }"
                  >
                    <motion.div
                      class="w-20 mt-2 transition-transform duration-300 transform rounded-t-full shadow-xl h-18 sm:w-24 sm:h-20 md:w-28 md:h-24 lg:w-32 lg:h-28 md:mt-3"
                      :style="{ background: majorColor.light }"
                      :animate="{
                        y: [0, -2, 0],
                      }"
                      :transition="{ duration: 3, repeat: Infinity, ease: 'easeInOut' }"
                    ></motion.div>
                  </motion.div>
                </div>
              </div>

              <motion.div
                :initial="{ y: 20, opacity: 0 }"
                :animate="{ y: 0, opacity: 1 }"
                :transition="{ delay: 0.6, duration: 0.5 }"
                :whileHover="{ scale: 1.02 }"
              >
                <div
                  class="px-3 py-3 text-sm font-bold text-center text-white shadow-inner md:px-4 md:py-4 sm:text-base md:text-lg"
                  :style="`background: ${majorColor.primary}`"
                >
                  <p class="truncate">{{ currentAchievement.studentName }}</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        <div
          v-if="rightAchievement && !isAnimating"
          class="shrink-0 hidden w-40 scale-90 pointer-events-none lg:block xl:w-48 opacity-30"
        >
          <div
            class="overflow-hidden bg-white border-4 shadow-lg rounded-xl"
            :style="`border-color: ${majorColor.primary}`"
          >
            <div
              class="relative flex items-center justify-center h-44 xl:h-52 bg-linear-to-br from-gray-100 to-gray-200"
            >
              <div class="relative">
                <div
                  class="absolute w-12 h-12 transform -translate-x-1/2 rounded-full -top-5 left-1/2"
                  :style="`background: ${majorColor.light}`"
                ></div>
                <div class="w-16 rounded-t-full h-14 mt-9" :style="`background: ${majorColor.light}`"></div>
              </div>
            </div>

            <div
              class="px-3 py-2.5 text-center text-white font-bold text-xs truncate"
              :style="`background: ${majorColor.primary}`"
            >
              {{ rightAchievement.studentName }}
            </div>
          </div>
        </div>

        <button
          class="z-10 flex items-center justify-center shrink-0 w-10 h-10 transition-all duration-300 rounded-full shadow-lg md:w-12 md:h-12 hover:scale-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
          :style="`background: linear-gradient(135deg, ${majorColor.primary}, ${majorColor.accent})`"
          @click.prevent="nextSlide"
          :disabled="achievements.length === 0"
        >
          <svg class="w-5 h-5 text-white md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <motion.div
        v-if="currentAchievement"
        :key="`details-${currentAchievement.id}`"
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ delay: 0.3, duration: 0.6 }"
        class="w-full max-w-4xl px-4 text-center"
      >
        <motion.h3
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ delay: 0.5, duration: 0.5 }"
          class="mb-3 text-base font-bold leading-tight text-gray-800 sm:text-lg md:text-xl lg:text-2xl md:mb-4"
          :whileHover="{ scale: 1.02 }"
        >
          {{ currentAchievement.title }}
        </motion.h3>

        <motion.p
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ delay: 0.7, duration: 0.5 }"
          class="max-w-3xl mx-auto text-xs leading-relaxed text-gray-600 sm:text-sm md:text-base"
          :whileHover="{ scale: 1.01 }"
        >
          {{ currentAchievement.description }}
        </motion.p>
      </motion.div>
    </div>

    <Teleport to="body">
      <AnimatePresence>
        <motion.div
          v-if="selectedAchievement"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
          :transition="{ duration: 0.3 }"
          @click.self="closeModal"
        >
          <motion.div
            class="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            :initial="{ scale: 0.8, opacity: 0, y: 50 }"
            :animate="{ scale: 1, opacity: 1, y: 0 }"
            :exit="{ scale: 0.8, opacity: 0, y: 50 }"
            :transition="{ duration: 0.4, ease: 'easeOut' }"
            @click.stop
          >
            <motion.button
              class="absolute z-10 flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full shadow-lg top-4 right-4 md:top-6 md:right-6 md:w-12 md:h-12"
              :whileHover="{ scale: 1.1, backgroundColor: '#e5e7eb' }"
              :whileTap="{ scale: 0.9 }"
              @click="closeModal"
            >
              <svg class="w-5 h-5 text-gray-700 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            <motion.div
              class="px-6 py-8 text-center text-white md:px-8 md:py-10 rounded-t-3xl"
              :style="{ background: `linear-gradient(135deg, ${majorColor.primary}, ${majorColor.secondary})` }"
              :initial="{ opacity: 0, y: -20 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ delay: 0.2, duration: 0.5 }"
            >
              <motion.div
                class="inline-block mb-4"
                :initial="{ scale: 0 }"
                :animate="{ scale: 1 }"
                :transition="{ delay: 0.4, type: 'spring', stiffness: 200 }"
              >
                <motion.div
                  class="flex items-center justify-center w-20 h-20 rounded-full shadow-2xl md:w-24 md:h-24 bg-white/20 backdrop-blur-sm"
                  :animate="{
                    boxShadow: [
                      '0 0 0 0 rgba(255,255,255,0.2)',
                      '0 0 0 20px rgba(255,255,255,0)',
                      '0 0 0 0 rgba(255,255,255,0.2)',
                    ],
                  }"
                  :transition="{ duration: 2, repeat: Infinity }"
                >
                  <svg class="w-10 h-10 text-white md:w-12 md:h-12" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path
                      fill-rule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </motion.div>
              </motion.div>
              <motion.h2
                class="mb-2 text-2xl font-bold md:text-3xl"
                :initial="{ opacity: 0, y: 20 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ delay: 0.6, duration: 0.5 }"
              >
                {{ selectedAchievement.title }}
              </motion.h2>
              <motion.div
                class="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-sm font-semibold"
                :initial="{ opacity: 0, scale: 0.8 }"
                :animate="{ opacity: 1, scale: 1 }"
                :transition="{ delay: 0.8, duration: 0.4 }"
              >
                {{ selectedAchievement.year }}
              </motion.div>
            </motion.div>

            <motion.div
              class="px-6 py-6 md:px-8 md:py-8"
              :initial="{ opacity: 0, y: 20 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ delay: 0.3, duration: 0.5 }"
            >
              <motion.div
                class="pb-6 mb-6 border-b border-gray-200"
                :initial="{ opacity: 0, x: -20 }"
                :animate="{ opacity: 1, x: 0 }"
                :transition="{ delay: 0.5, duration: 0.5 }"
              >
                <div class="flex items-center gap-4">
                  <motion.div
                    class="flex items-center justify-center w-16 h-16 rounded-full shadow-lg md:w-20 md:h-20"
                    :style="{ background: `linear-gradient(135deg, ${majorColor.primary}, ${majorColor.secondary})` }"
                    :whileHover="{ scale: 1.1, rotate: 5 }"
                  >
                    <span class="text-2xl font-bold text-white md:text-3xl">
                      {{ selectedAchievement.studentName.charAt(0) }}
                    </span>
                  </motion.div>
                  <div class="flex-1">
                    <h3 class="text-lg font-bold text-gray-800 md:text-xl">
                      {{ selectedAchievement.studentName }}
                    </h3>
                    <p class="text-sm text-gray-600">Siswa Berprestasi</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                class="mb-6"
                :initial="{ opacity: 0 }"
                :animate="{ opacity: 1 }"
                :transition="{ delay: 0.7, duration: 0.5 }"
              >
                <h4 class="mb-3 text-sm font-semibold tracking-wide text-gray-500 uppercase">Deskripsi Prestasi</h4>
                <p class="leading-relaxed text-gray-700">
                  {{ selectedAchievement.description }}
                </p>
              </motion.div>

              <motion.div
                class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 md:p-6 rounded-2xl"
                :style="{ background: `linear-gradient(135deg, ${majorColor.light}20, ${majorColor.accent}10)` }"
                :initial="{ opacity: 0, scale: 0.95 }"
                :animate="{ opacity: 1, scale: 1 }"
                :transition="{ delay: 0.9, duration: 0.5 }"
                :whileHover="{ scale: 1.02 }"
              >
                <motion.div :whileHover="{ scale: 1.05 }" :transition="{ type: 'spring', stiffness: 300 }">
                  <p class="mb-1 text-xs tracking-wide text-gray-500 uppercase">Tahun</p>
                  <p class="text-lg font-bold" :style="`color: ${majorColor.primary}`">
                    {{ selectedAchievement.year }}
                  </p>
                </motion.div>
                <motion.div :whileHover="{ scale: 1.05 }" :transition="{ type: 'spring', stiffness: 300 }">
                  <p class="mb-1 text-xs tracking-wide text-gray-500 uppercase">Kategori</p>
                  <p class="text-lg font-bold" :style="`color: ${majorColor.primary}`">Prestasi Akademik</p>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </Teleport>
  </div>
</template>

<style scoped></style>
