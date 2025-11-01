<script setup lang="ts">
import { motion } from "motion-v";

interface Achievement {
  image: string;
  title: string;
  description: string;
  slug: string | null;
  year?: number;
}

const carouselRef = ref<HTMLElement | null>(null);
const carouselInView = ref(false);

const currentAchievement = ref(0);
const isAutoPlaying = ref(true);
const autoPlayInterval = ref<ReturnType<typeof setInterval> | null>(null);
const progressValue = ref(0);
const progressInterval = ref<ReturnType<typeof setInterval> | null>(null);

// Fetch achievements with SSR
const { data: achievements, pending } = await useAsyncData(
  "homepage-achievements",
  () =>
    ($fetch as any)("/api/news", {
      query: { tag: "juara", limit: 10 },
    }),
  {
    server: true,
    transform: (response: any) => {
      console.log('HomeAchievements API response:', response);
      const transformed = (response.data || []).map((news: any) => ({
        image: news.thumbnail || "/images/placeholder.jpg",
        title: news.title,
        description: news.subtitle || news.description || "",
        slug: news.slug,
        year: news.createdAt ? new Date(news.createdAt).getFullYear() : new Date().getFullYear(),
      }));
      console.log('HomeAchievements transformed data:', transformed);
      return transformed;
    },
  }
);

const startAutoPlay = () => {
  if (!carouselInView.value) return;

  if (autoPlayInterval.value) clearInterval(autoPlayInterval.value);

  autoPlayInterval.value = setInterval(() => {
    if (isAutoPlaying.value && carouselInView.value) {
      nextAchievement();
    }
  }, 5000);
};

const stopAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value);
    autoPlayInterval.value = null;
  }
  if (progressInterval.value) {
    clearInterval(progressInterval.value);
    progressInterval.value = null;
  }
};

const resetProgress = () => {
  progressValue.value = 0;
  if (progressInterval.value) clearInterval(progressInterval.value);

  progressInterval.value = setInterval(() => {
    if (progressValue.value < 100) {
      progressValue.value += 2;
    } else {
      progressValue.value = 100;
    }
  }, 100);
};

const toggleAutoPlay = () => {
  isAutoPlaying.value = !isAutoPlaying.value;
  if (isAutoPlaying.value) {
    startAutoPlay();
  } else {
    stopAutoPlay();
  }
};

const prevAchievement = () => {
  const len = achievements.value?.length || 0;
  if (len === 0) return;
  currentAchievement.value = (currentAchievement.value - 1 + len) % len;
  resetProgress();
};

const nextAchievement = () => {
  const len = achievements.value?.length || 0;
  if (len === 0) return;
  currentAchievement.value = (currentAchievement.value + 1) % len;
  resetProgress();
};

const goToAchievement = (index: number) => {
  currentAchievement.value = index;
  resetProgress();
};

onMounted(() => {
  const checkVisibility = () => {
    if (carouselRef.value && typeof carouselRef.value.getBoundingClientRect === 'function') {
      const rect = carouselRef.value.getBoundingClientRect();
      carouselInView.value = rect.top < window.innerHeight && rect.bottom > 0;

      if (carouselInView.value) {
        startAutoPlay();
        resetProgress();
      } else {
        stopAutoPlay();
      }
    }
  };

  window.addEventListener("scroll", checkVisibility, { passive: true });
  checkVisibility(); // Check initial state

  onUnmounted(() => {
    window.removeEventListener("scroll", checkVisibility);
    stopAutoPlay();
  });
});
</script>

<template>
  <motion.section
    id="prestasi"
    class="relative overflow-hidden"
    :initial="{ opacity: 0, y: 50 }"
    :whileInView="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.8 }"
    :inViewOptions="{ once: true }"
  >
    <div class="container flex flex-col items-center gap-8 mx-auto relative z-10">
      <motion.div
        v-if="!pending && achievements && achievements.length > 0"
        ref="carouselRef"
        class="relative flex flex-col w-full max-w-5xl gap-6 p-8 mx-auto bg-white border-2 border-blue-100 shadow-xl rounded-2xl overflow-hidden"
        :initial="{ opacity: 0, scale: 0.95 }"
        :whileInView="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 0.6, delay: 0.2 }"
        :inViewOptions="{ once: true }"
      >
        <!-- Carousel Content -->
        <div class="overflow-hidden">
          <div
            class="flex transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${currentAchievement * 100}%)` }"
          >
            <div v-for="achievement in achievements" :key="achievement.title" class="shrink-0 w-full px-2">
              <div class="flex flex-col items-center gap-8 md:flex-row md:min-h-80">
                <div class="relative w-full md:w-1/3">
                  <NuxtImg
                    :src="achievement.image"
                    class="object-cover w-full rounded-lg shadow-md aspect-square transition-transform duration-300 hover:scale-105"
                    :alt="achievement.title"
                    loading="lazy"
                    width="400"
                    height="400"
                    format="webp"
                    quality="80"
                  />
                  <div class="absolute top-2 right-2 flex gap-1">
                    <div
                      class="px-2 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full flex items-center gap-1"
                    >
                      <Icon name="lucide:medal" size="10" />
                      <span>Juara</span>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col gap-4 text-center md:text-left md:w-2/3 md:pr-5 md:justify-center">
                  <h3 class="text-xl md:text-2xl font-bold text-gray-800">
                    {{ achievement.title }}
                  </h3>
                  <p class="leading-relaxed text-gray-600 text-sm md:text-base line-clamp-4">
                    {{ achievement.description }}
                  </p>
                  <div class="flex flex-wrap gap-2 justify-center md:justify-start">
                    <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                      Prestasi
                    </span>
                    <span class="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full"> LKS </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-200"></div>

        <!-- Controls -->
        <div class="flex flex-col gap-4">
          <!-- Progress Indicators -->
          <div class="flex items-center justify-center gap-2">
            <div class="flex gap-1">
              <button
                v-for="(achievement, index) in achievements"
                :key="index"
                @click="goToAchievement(index)"
                class="h-2 rounded-full transition-all duration-300 cursor-pointer"
                :class="index === currentAchievement ? 'bg-blue-600 w-6' : 'bg-gray-300 hover:bg-gray-400 w-2'"
                :aria-label="`Go to achievement ${index + 1}`"
              ></button>
            </div>
            <button
              @click="toggleAutoPlay"
              class="ml-4 p-2 rounded-full transition-all duration-300"
              :class="
                isAutoPlaying
                  ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              "
              :aria-label="isAutoPlaying ? 'Pause auto-play' : 'Start auto-play'"
            >
              <Icon :name="isAutoPlaying ? 'lucide:pause' : 'lucide:play'" size="16" />
            </button>
          </div>

          <!-- Progress Bar -->
          <div class="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
            <motion.div
              class="h-full bg-linear-to-r from-blue-500 to-blue-600 rounded-full"
              :style="{ width: `${progressValue}%` }"
              :transition="{ duration: 0.1 }"
            ></motion.div>
          </div>

          <!-- Navigation -->
          <div class="flex items-center justify-between">
            <div class="flex gap-4">
              <motion.button
                @click="prevAchievement"
                class="flex items-center justify-center p-3 bg-gray-100 border border-gray-200 rounded-full shadow-md hover:bg-blue-600 hover:text-white transition-colors"
                :whileHover="{ scale: 1.1 }"
                :whileTap="{ scale: 0.95 }"
                aria-label="Previous achievement"
              >
                <Icon name="lucide:chevron-left" size="20" />
              </motion.button>
              <motion.button
                @click="nextAchievement"
                class="flex items-center justify-center p-3 bg-gray-100 border border-gray-200 rounded-full shadow-md hover:bg-blue-600 hover:text-white transition-colors"
                :whileHover="{ scale: 1.1 }"
                :whileTap="{ scale: 0.95 }"
                aria-label="Next achievement"
              >
                <Icon name="lucide:chevron-right" size="20" />
              </motion.button>
            </div>
            <div class="flex items-center gap-2">
              <div class="font-bold text-gray-700">
                <span class="text-2xl text-blue-600">{{ String(currentAchievement + 1).padStart(2, "0") }}</span>
                <span class="mx-1 text-gray-400">/</span>
                <span class="text-lg">{{ String(achievements?.length || 0).padStart(2, "0") }}</span>
              </div>
              <div
                class="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold"
              >
                <Icon name="lucide:trophy" size="12" />
                <span>Prestasi</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <!-- Loading State -->
      <div v-else-if="pending" class="flex items-center justify-center py-20">
        <div class="flex flex-col items-center gap-3">
          <div class="w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin"></div>
          <p class="text-gray-600">Memuat prestasi...</p>
        </div>
      </div>
    </div>
  </motion.section>
</template>