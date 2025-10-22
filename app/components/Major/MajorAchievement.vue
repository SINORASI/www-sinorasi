<script setup lang="ts">
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

const { data: achievementsData } = await useFetch<Achievement[]>(
  `/api/achievements?major=${major}`,
);
const { data: _majorDatas } = await useFetch<Record<MajorName, MajorData>>("/api/majors");

const currentIndex = ref<number>(0);
const selectedAchievement = ref<Achievement | null>(null);
const slideDirection = ref<"left" | "right" | "">("");

const achievements = computed(() => achievementsData.value || []);

const majorColor = computed(() => {
  return majorColorSchemes[major];
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
      currentIndex.value =
        (currentIndex.value - 1 + achievements.value.length) % achievements.value.length;
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
          class="z-10 flex items-center justify-center flex-shrink-0 w-10 h-10 transition-all duration-300 rounded-full shadow-lg md:w-12 md:h-12 hover:scale-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
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
          class="flex-shrink-0 hidden w-40 scale-90 pointer-events-none lg:block xl:w-48 opacity-30"
        >
          <div
            class="overflow-hidden bg-white border-4 shadow-lg rounded-xl"
            :style="`border-color: ${majorColor.primary}`"
          >
            
            <div
              class="relative flex items-center justify-center h-44 xl:h-52 bg-gradient-to-br from-gray-100 to-gray-200"
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

        
        <div
          v-if="currentAchievement"
          class="flex-shrink-0 w-full max-w-[200px] sm:max-w-[240px] md:max-w-[280px] lg:max-w-[320px] cursor-pointer"
          @click="openModal(currentAchievement)"
        >
          <Motion
            :key="currentAchievement.id"
            :initial="{ opacity: 0, scale: 0.8, x: slideDirection === 'left' ? 100 : slideDirection === 'right' ? -100 : 0 }"
            :animate="{ opacity: 1, scale: 1, x: 0 }"
            :transition="{ duration: 0.6, ease: 'easeOut' }"
            class="w-full h-full"
          >
            <div
              class="bg-white rounded-2xl shadow-2xl border-4 md:border-[5px] overflow-hidden w-full h-full transform hover:scale-105 hover:shadow-3xl transition-all duration-300 group"
              :style="`border-color: ${majorColor.primary}`"
            >
              
              <div
                class="relative flex items-center justify-center h-56 overflow-hidden sm:h-64 md:h-72 lg:h-80 bg-gradient-to-br from-gray-100 to-gray-200"
              >
                
                <div class="relative z-10 flex flex-col items-center">
                  
                  <Motion
                    :initial="{ y: 20, opacity: 0 }"
                    :animate="{ y: 0, opacity: 1 }"
                    :transition="{ delay: 0.2, duration: 0.5 }"
                  >
                    <div
                      class="w-16 h-16 transition-transform duration-300 transform rounded-full shadow-2xl sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 group-hover:scale-110"
                      :style="`background: ${majorColor.light}`"
                    ></div>
                  </Motion>
                  
                  <Motion
                    :initial="{ y: 30, opacity: 0 }"
                    :animate="{ y: 0, opacity: 1 }"
                    :transition="{ delay: 0.4, duration: 0.5 }"
                  >
                    <div
                      class="w-20 mt-2 transition-transform duration-300 transform rounded-t-full shadow-xl h-18 sm:w-24 sm:h-20 md:w-28 md:h-24 lg:w-32 lg:h-28 md:mt-3 group-hover:scale-105"
                      :style="`background: ${majorColor.light}`"
                    ></div>
                  </Motion>
                </div>
              </div>

              
              <Motion
                :initial="{ y: 20, opacity: 0 }"
                :animate="{ y: 0, opacity: 1 }"
                :transition="{ delay: 0.6, duration: 0.5 }"
              >
                <div
                  class="px-3 py-3 text-sm font-bold text-center text-white shadow-inner md:px-4 md:py-4 sm:text-base md:text-lg"
                  :style="`background: ${majorColor.primary}`"
                >
                  <p class="truncate">{{ currentAchievement.studentName }}</p>
                </div>
              </Motion>
            </div>
          </Motion>
        </div>

        
        <div
          v-if="rightAchievement && !isAnimating"
          class="flex-shrink-0 hidden w-40 scale-90 pointer-events-none lg:block xl:w-48 opacity-30"
        >
          <div
            class="overflow-hidden bg-white border-4 shadow-lg rounded-xl"
            :style="`border-color: ${majorColor.primary}`"
          >
            
            <div
              class="relative flex items-center justify-center h-44 xl:h-52 bg-gradient-to-br from-gray-100 to-gray-200"
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
          class="z-10 flex items-center justify-center flex-shrink-0 w-10 h-10 transition-all duration-300 rounded-full shadow-lg md:w-12 md:h-12 hover:scale-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
          :style="`background: linear-gradient(135deg, ${majorColor.primary}, ${majorColor.accent})`"
          @click.prevent="nextSlide"
          :disabled="achievements.length === 0"
        >
          <svg class="w-5 h-5 text-white md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      
      <Motion
        v-if="currentAchievement"
        :key="`details-${currentAchievement.id}`"
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ delay: 0.3, duration: 0.6 }"
        class="w-full max-w-4xl px-4 text-center"
      >
        
        <Motion
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ delay: 0.5, duration: 0.5 }"
        >
          <h3 class="mb-3 text-base font-bold leading-tight text-gray-800 sm:text-lg md:text-xl lg:text-2xl md:mb-4">
            {{ currentAchievement.title }}
          </h3>
        </Motion>

        
        <Motion
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ delay: 0.7, duration: 0.5 }"
        >
          <p class="max-w-3xl mx-auto text-xs leading-relaxed text-gray-600 sm:text-sm md:text-base">
            {{ currentAchievement.description }}
          </p>
        </Motion>
      </Motion>
    </div>

    
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="selectedAchievement"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          @click.self="closeModal"
        >
          <div
            class="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300"
            @click.stop
          >
            
            <button
              class="absolute z-10 flex items-center justify-center w-10 h-10 transition-all duration-300 bg-gray-100 rounded-full shadow-lg top-4 right-4 md:top-6 md:right-6 md:w-12 md:h-12 hover:bg-gray-200 hover:scale-110"
              @click="closeModal"
            >
              <svg class="w-5 h-5 text-gray-700 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            
            <div
              class="px-6 py-8 text-center text-white md:px-8 md:py-10 rounded-t-3xl"
              :style="`background: linear-gradient(135deg, ${majorColor.primary}, ${majorColor.secondary})`"
            >
              <div class="inline-block mb-4">
                <div
                  class="flex items-center justify-center w-20 h-20 rounded-full shadow-2xl md:w-24 md:h-24 bg-white/20 backdrop-blur-sm"
                >
                  <svg class="w-10 h-10 text-white md:w-12 md:h-12" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path
                      fill-rule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <h2 class="mb-2 text-2xl font-bold md:text-3xl">
                {{ selectedAchievement.title }}
              </h2>
              <div class="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-sm font-semibold">
                {{ selectedAchievement.year }}
              </div>
            </div>

            
            <div class="px-6 py-6 md:px-8 md:py-8">
              
              <div class="pb-6 mb-6 border-b border-gray-200">
                <div class="flex items-center gap-4">
                  <div
                    class="flex items-center justify-center w-16 h-16 rounded-full shadow-lg md:w-20 md:h-20"
                    :style="`background: linear-gradient(135deg, ${majorColor.primary}, ${majorColor.secondary})`"
                  >
                    <span class="text-2xl font-bold text-white md:text-3xl">
                      {{ selectedAchievement.studentName.charAt(0) }}
                    </span>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-lg font-bold text-gray-800 md:text-xl">
                      {{ selectedAchievement.studentName }}
                    </h3>
                    <p class="text-sm text-gray-600">Siswa Berprestasi</p>
                  </div>
                </div>
              </div>

              
              <div class="mb-6">
                <h4 class="mb-3 text-sm font-semibold tracking-wide text-gray-500 uppercase">Deskripsi Prestasi</h4>
                <p class="leading-relaxed text-gray-700">
                  {{ selectedAchievement.description }}
                </p>
              </div>

              
              <div
                class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 md:p-6 rounded-2xl"
                :style="`background: linear-gradient(135deg, ${majorColor.light}20, ${majorColor.accent}10)`"
              >
                <div>
                  <p class="mb-1 text-xs tracking-wide text-gray-500 uppercase">Tahun</p>
                  <p class="text-lg font-bold" :style="`color: ${majorColor.primary}`">
                    {{ selectedAchievement.year }}
                  </p>
                </div>
                <div>
                  <p class="mb-1 text-xs tracking-wide text-gray-500 uppercase">Kategori</p>
                  <p class="text-lg font-bold" :style="`color: ${majorColor.primary}`">Prestasi Akademik</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
</style>
