<script setup lang="ts">
import { motion, AnimatePresence } from "motion-v";
import { computed, ref } from "vue";
import type { MajorName } from "~/models/MajorName";
import { majorColorSchemes } from "~/utils/majorColors";

// --- PROPS ---
const props = defineProps<{
  major?: MajorName;
}>();

// --- TYPES ---
interface Achievement {
  id: number;
  title: string;
  description: string;
  studentName: string;
  year: number;
}

// A new type to hold the calculated display properties for each card.
interface DisplayAchievement extends Achievement {
  displayProps: {
    scale: number;
    rotateY: number;
    x: string;
    zIndex: number;
    opacity: number;
  };
}

// --- DATA & STATE ---
const route = useRoute();
const major = props.major || (route.params.majorName as MajorName);
const { data: achievementsData } = await useFetch<Achievement[]>(`/api/achievements${major ? `?major=${major}` : ""}`);

const currentIndex = ref(0);
const selectedAchievement = ref<Achievement | null>(null);

// --- COMPUTED PROPERTIES ---
const achievements = computed(() => achievementsData.value || []);
const totalAchievements = computed(() => achievements.value.length);
const currentAchievement = computed(() => achievements.value[currentIndex.value] || null);

/**
 * The core of the new animation mechanism.
 * This computed property maps over the achievements and calculates the CSS transform
 * properties for each card based on its distance from the current index.
 */
const displayAchievements = computed<DisplayAchievement[]>(() => {
  const displayWindow = 2; // How many cards to show on each side of the main one.

  return achievements.value
    .map((achievement, i) => {
      const distance = i - currentIndex.value;

      // Only compute for cards within our display window for performance.
      if (Math.abs(distance) > displayWindow) {
        return null;
      }

      let props = {};

      if (distance === 0) {
        // Current item
        props = { scale: 1, rotateY: 0, x: "0%", zIndex: 10, opacity: 1 };
      } else {
        // Items on the sides
        const isLeft = distance < 0;
        props = {
          scale: 0.8,
          rotateY: isLeft ? 45 : -45,
          x: `${isLeft ? -60 : 60}%`, // Push side cards out
          zIndex: 5 - Math.abs(distance),
          opacity: 0.5,
        };
      }

      return { ...achievement, displayProps: props as DisplayAchievement['displayProps'] };
    })
    .filter((a): a is DisplayAchievement => a !== null); // Filter out the null values
});

/**
 * Dynamically computes the color scheme. Falls back to a default blue theme.
 */
const majorColor = computed(() => {
  if (major && majorColorSchemes[major]) {
    return majorColorSchemes[major];
  }
  return { primary: "#1d4ed8", secondary: "#1e40af", accent: "#3b82f6", light: "#dbeafe" };
});

// --- METHODS ---
const changeSlide = (direction: "next" | "prev"): void => {
  if (totalAchievements.value === 0) return;
  if (direction === "next") {
    currentIndex.value = (currentIndex.value + 1) % totalAchievements.value;
  } else {
    currentIndex.value = (currentIndex.value - 1 + totalAchievements.value) % totalAchievements.value;
  }
};

const openModal = (achievement: Achievement | null): void => {
  if (achievement) selectedAchievement.value = achievement;
};

const closeModal = (): void => {
  selectedAchievement.value = null;
};
</script>

<template>
  <div class="w-full">
    <div class="relative flex flex-col items-center gap-6 px-2 md:gap-8 md:px-4">
      <!-- Carousel Container -->
      <div class="relative flex items-center justify-center w-full h-96" style="perspective: 1200px">
        <!-- Main Carousel View -->
        <AnimatePresence>
          <motion.div
            v-for="item in displayAchievements"
            :key="item.id"
            class="absolute w-full max-w-[200px] sm:max-w-60 md:max-w-[280px] lg:max-w-[320px] h-full cursor-pointer"
            :initial="item.displayProps"
            :animate="item.displayProps"
            :transition="{ type: 'spring', stiffness: 300, damping: 30 }"
            @click="item.displayProps.scale === 1 ? openModal(item) : null"
          >
            <!-- Card Content -->
            <div
              class="relative w-full h-full overflow-hidden bg-white border-4 shadow-2xl rounded-2xl group"
              :style="{ borderColor: majorColor.primary }"
            >
              <div class="flex items-center justify-center h-full bg-gray-100">
                <!-- Abstract Trophy Graphic -->
                <div class="relative z-10 flex flex-col items-center">
                  <motion.div
                    class="w-16 h-16 rounded-full shadow-2xl sm:w-20 sm:h-20 md:w-24 md:h-24"
                    :style="{ background: majorColor.light }"
                    :animate="{ scale: item.displayProps.scale === 1 ? 1 : 0.8 }"
                  />
                  <motion.div
                    class="w-20 h-16 mt-2 rounded-t-full shadow-xl sm:w-24 sm:h-20 md:w-28 md:h-24"
                    :style="{ background: majorColor.light }"
                    :animate="{ scale: item.displayProps.scale === 1 ? 1 : 0.8 }"
                  />
                </div>
              </div>
              <div
                class="absolute bottom-0 left-0 right-0 px-3 py-3 text-sm font-bold text-center text-white shadow-inner sm:text-base md:px-4 md:py-4"
                :style="`background: ${majorColor.primary}`"
              >
                <p class="truncate">{{ item.studentName }}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <!-- Navigation Buttons -->
        <button
          @click.prevent="changeSlide('prev')"
          :disabled="totalAchievements < 2"
          class="absolute z-20 flex items-center justify-center w-10 h-10 transition-all duration-300 rounded-full shadow-lg left-2 sm:left-4 md:left-8 lg:left-12 top-1/2 -translate-y-1/2 md:w-12 md:h-12 hover:scale-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
          :style="`background: linear-gradient(135deg, ${majorColor.primary}, ${majorColor.accent})`"
          aria-label="Previous achievement"
        >
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7" /></svg>
        </button>

        <button
          @click.prevent="changeSlide('next')"
          :disabled="totalAchievements < 2"
          class="absolute z-20 flex items-center justify-center w-10 h-10 transition-all duration-300 rounded-full shadow-lg right-2 sm:right-4 md:right-8 lg:right-12 top-1/2 -translate-y-1/2 md:w-12 md:h-12 hover:scale-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
          :style="`background: linear-gradient(135deg, ${majorColor.primary}, ${majorColor.accent})`"
          aria-label="Next achievement"
        >
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      <!-- Achievement Details Below Carousel -->
      <div class="w-full max-w-4xl px-4 text-center h-28">
        <AnimatePresence>
          <motion.div
            v-if="currentAchievement"
            :key="currentAchievement.id"
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :exit="{ opacity: 0, y: -20 }"
            :transition="{ duration: 0.5, ease: 'easeOut' }"
            class="absolute w-full max-w-4xl px-4 text-center left-1/2 -translate-x-1/2"
          >
            <h3 class="mb-3 text-base font-bold leading-tight text-gray-800 sm:text-lg md:text-xl lg:text-2xl md:mb-4">
              {{ currentAchievement.title }}
            </h3>
            <p class="max-w-3xl mx-auto text-xs leading-relaxed text-gray-600 sm:text-sm md:text-base">
              {{ currentAchievement.description }}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>

    <!-- Details Modal (Teleported to body) -->
    <Teleport to="body">
      <AnimatePresence>
        <motion.div
          v-if="selectedAchievement"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
          @click.self="closeModal"
        >
          <motion.div
            class="relative w-full max-w-2xl overflow-y-auto bg-white shadow-2xl rounded-3xl max-h-[90vh]"
            :initial="{ scale: 0.9, opacity: 0 }"
            :animate="{ scale: 1, opacity: 1 }"
            :exit="{ scale: 0.9, opacity: 0 }"
            :transition="{ duration: 0.3, ease: 'easeOut' }"
          >
            <!-- Modal content remains largely the same, as it was already effective -->
            <button
              class="absolute z-10 flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full shadow-lg top-4 right-4 md:top-6 md:right-6 md:w-12 md:h-12"
              @click="closeModal" aria-label="Close modal"
            >
              <svg class="w-5 h-5 text-gray-700 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div class="px-6 py-8 text-center text-white md:px-8 md:py-10 rounded-t-3xl" :style="{ background: `linear-gradient(135deg, ${majorColor.primary}, ${majorColor.secondary})` }">
              <h2 class="mb-2 text-2xl font-bold md:text-3xl">{{ selectedAchievement.title }}</h2>
              <div class="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-sm font-semibold">{{ selectedAchievement.year }}</div>
            </div>
            <div class="px-6 py-6 md:px-8 md:py-8">
              <div class="pb-6 mb-6 border-b border-gray-200">
                <div class="flex items-center gap-4">
                  <div class="flex items-center justify-center w-16 h-16 rounded-full shadow-lg md:w-20 md:h-20" :style="{ background: `linear-gradient(135deg, ${majorColor.primary}, ${majorColor.secondary})` }">
                    <span class="text-2xl font-bold text-white md:text-3xl">{{ selectedAchievement.studentName.charAt(0) }}</span>
                  </div>
                  <div>
                    <h3 class="text-lg font-bold text-gray-800 md:text-xl">{{ selectedAchievement.studentName }}</h3>
                    <p class="text-sm text-gray-600">Siswa Berprestasi</p>
                  </div>
                </div>
              </div>
              <div class="mb-6">
                <h4 class="mb-3 text-sm font-semibold tracking-wide text-gray-500 uppercase">Deskripsi Prestasi</h4>
                <p class="leading-relaxed text-gray-700">{{ selectedAchievement.description }}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </Teleport>
  </div>
</template>