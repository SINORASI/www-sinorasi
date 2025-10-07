<script setup lang="ts">
import { ref, computed } from 'vue';
import type { MajorName } from '~/models/MajorName';
import type { MajorData } from '~/models/MajorData';
import { majorColorSchemes } from '~/utils/majorColors';

interface Achievement {
  id: number;
  title: string;
  description: string;
  studentName: string;
  year: number;
}

const route = useRoute();
const major = route.params.majorName as MajorName;

// Fetch achievements and major data
const { data: achievementsData } = await useFetch<Achievement[]>(`/api/achievements?major=${major}`);
const { data: majorDatas } = await useFetch<Record<MajorName, MajorData>>('/api/majors');

const currentIndex = ref<number>(0);
const selectedAchievement = ref<Achievement | null>(null);
const slideDirection = ref<'left' | 'right' | ''>('');

const achievements = computed(() => achievementsData.value || []);

// Get major color scheme
const majorColor = computed(() => {
  return majorColorSchemes[major] || {
    primary: '#f97316',
    secondary: '#ea580c',
    accent: '#FFB366',
    light: '#FFF3E8',
    text: '#1f2937',
    bg: '#ffffff',
    hoverBg: '#fff7ed',
    border: '#fed7aa',
    headerBg: '#fff7ed'
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
    slideDirection.value = 'left';
    
    setTimeout(() => {
      currentIndex.value = (currentIndex.value + 1) % achievements.value.length;
    }, 50);
    
    setTimeout(() => {
      slideDirection.value = '';
      isAnimating.value = false;
    }, 500);
  }
};

const previousSlide = (): void => {
  if (achievements.value.length > 0 && !isAnimating.value) {
    isAnimating.value = true;
    slideDirection.value = 'right';
    
    setTimeout(() => {
      currentIndex.value = (currentIndex.value - 1 + achievements.value.length) % achievements.value.length;
    }, 50);
    
    setTimeout(() => {
      slideDirection.value = '';
      isAnimating.value = false;
    }, 500);
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
    <!-- Carousel Container -->
    <div class="relative flex flex-col items-center gap-6 md:gap-8 px-2 md:px-4">
      <!-- Cards Row -->
      <div class="relative flex items-center justify-center gap-3 md:gap-6 lg:gap-8 w-full">
        <!-- Previous Button -->
        <button 
          class="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full shadow-lg
                 flex items-center justify-center transition-all duration-300 z-10
                 hover:scale-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
          :style="`background: linear-gradient(135deg, ${majorColor.primary}, ${majorColor.accent})`"
          @click.prevent="previousSlide"
          :disabled="achievements.length === 0"
        >
          <svg class="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <!-- Left Preview Card (hidden on mobile) -->
        <div 
          v-if="leftAchievement && !isAnimating"
          class="hidden lg:block flex-shrink-0 w-40 xl:w-48 opacity-30 scale-90 pointer-events-none"
        >
          <div 
            class="bg-white rounded-xl shadow-lg border-4 overflow-hidden"
            :style="`border-color: ${majorColor.primary}`"
          >
            <!-- Avatar -->
            <div class="relative h-44 xl:h-52 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div class="relative">
                <div 
                  class="w-12 h-12 rounded-full absolute -top-5 left-1/2 transform -translate-x-1/2"
                  :style="`background: ${majorColor.light}`"
                ></div>
                <div 
                  class="w-16 h-14 rounded-t-full mt-9"
                  :style="`background: ${majorColor.light}`"
                ></div>
              </div>
            </div>
            <!-- Name Badge -->
            <div 
              class="px-3 py-2.5 text-center text-white font-bold text-xs truncate"
              :style="`background: ${majorColor.primary}`"
            >
              {{ leftAchievement.studentName }}
            </div>
          </div>
        </div>

        <!-- Main Card -->
        <div 
          v-if="currentAchievement"
          class="flex-shrink-0 w-full max-w-[200px] sm:max-w-[240px] md:max-w-[280px] lg:max-w-[320px] 
                 cursor-pointer transition-all duration-400"
          :class="{ 
            'animate-slide-in-right': slideDirection === 'left', 
            'animate-slide-in-left': slideDirection === 'right' 
          }"
          @click="openModal(currentAchievement)"
        >
          <div 
            class="bg-white rounded-2xl shadow-2xl border-4 md:border-[5px] overflow-hidden w-full h-full
                   transform hover:scale-105 hover:shadow-3xl transition-all duration-300 group"
            :style="`border-color: ${majorColor.primary}`"
          >
            <!-- Avatar Section -->
            <div 
              class="relative h-56 sm:h-64 md:h-72 lg:h-80
                     flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200"
            >
              <!-- Avatar -->
              <div class="relative z-10 flex flex-col items-center">
                <!-- Head -->
                <div 
                  class="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28
                         rounded-full shadow-2xl
                         transform group-hover:scale-110 transition-transform duration-300"
                  :style="`background: ${majorColor.light}`"
                ></div>
                <!-- Body -->
                <div 
                  class="w-20 h-18 sm:w-24 sm:h-20 md:w-28 md:h-24 lg:w-32 lg:h-28
                         rounded-t-full shadow-xl mt-2 md:mt-3
                         transform group-hover:scale-105 transition-transform duration-300"
                  :style="`background: ${majorColor.light}`"
                ></div>
              </div>
            </div>

            <!-- Name Badge -->
            <div 
              class="px-3 py-3 md:px-4 md:py-4 text-center text-white font-bold 
                     text-sm sm:text-base md:text-lg shadow-inner"
              :style="`background: ${majorColor.primary}`"
            >
              <p class="truncate">{{ currentAchievement.studentName }}</p>
            </div>
          </div>
        </div>

        <!-- Right Preview Card (hidden on mobile) -->
        <div 
          v-if="rightAchievement && !isAnimating"
          class="hidden lg:block flex-shrink-0 w-40 xl:w-48 opacity-30 scale-90 pointer-events-none"
        >
          <div 
            class="bg-white rounded-xl shadow-lg border-4 overflow-hidden"
            :style="`border-color: ${majorColor.primary}`"
          >
            <!-- Avatar -->
            <div class="relative h-44 xl:h-52 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div class="relative">
                <div 
                  class="w-12 h-12 rounded-full absolute -top-5 left-1/2 transform -translate-x-1/2"
                  :style="`background: ${majorColor.light}`"
                ></div>
                <div 
                  class="w-16 h-14 rounded-t-full mt-9"
                  :style="`background: ${majorColor.light}`"
                ></div>
              </div>
            </div>
            <!-- Name Badge -->
            <div 
              class="px-3 py-2.5 text-center text-white font-bold text-xs truncate"
              :style="`background: ${majorColor.primary}`"
            >
              {{ rightAchievement.studentName }}
            </div>
          </div>
        </div>

        <!-- Next Button -->
        <button 
          class="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full shadow-lg
                 flex items-center justify-center transition-all duration-300 z-10
                 hover:scale-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
          :style="`background: linear-gradient(135deg, ${majorColor.primary}, ${majorColor.accent})`"
          @click.prevent="nextSlide"
          :disabled="achievements.length === 0"
        >
          <svg class="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <!-- Achievement Details Below Card -->
      <div 
        v-if="currentAchievement"
        class="w-full max-w-4xl text-center px-4"
      >
        <!-- Achievement Title -->
        <h3 class="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-3 md:mb-4 leading-tight">
          {{ currentAchievement.title }}
        </h3>
        
        <!-- Achievement Description -->
        <p class="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed max-w-3xl mx-auto">
          {{ currentAchievement.description }}
        </p>
      </div>
    </div>

    <!-- Modal for Full Details -->
    <Teleport to="body">
      <Transition name="modal">
        <div 
          v-if="selectedAchievement" 
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          @click.self="closeModal"
        >
          <div 
            class="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto
                   transform transition-all duration-300"
            @click.stop
          >
            <!-- Close Button -->
            <button 
              class="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 
                     rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center
                     transition-all duration-300 hover:scale-110 z-10 shadow-lg"
              @click="closeModal"
            >
              <svg class="w-5 h-5 md:w-6 md:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <!-- Modal Header -->
            <div 
              class="px-6 py-8 md:px-8 md:py-10 text-center text-white rounded-t-3xl"
              :style="`background: linear-gradient(135deg, ${majorColor.primary}, ${majorColor.secondary})`"
            >
              <div class="inline-block mb-4">
                <div 
                  class="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/20 backdrop-blur-sm 
                         flex items-center justify-center shadow-2xl"
                >
                  <svg class="w-10 h-10 md:w-12 md:h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                    <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                </div>
              </div>
              <h2 class="text-2xl md:text-3xl font-bold mb-2">
                {{ selectedAchievement.title }}
              </h2>
              <div class="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-sm font-semibold">
                {{ selectedAchievement.year }}
              </div>
            </div>

            <!-- Modal Body -->
            <div class="px-6 py-6 md:px-8 md:py-8">
              <!-- Student Info -->
              <div class="mb-6 pb-6 border-b border-gray-200">
                <div class="flex items-center gap-4">
                  <div 
                    class="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-lg"
                    :style="`background: linear-gradient(135deg, ${majorColor.primary}, ${majorColor.secondary})`"
                  >
                    <span class="text-2xl md:text-3xl text-white font-bold">
                      {{ selectedAchievement.studentName.charAt(0) }}
                    </span>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-lg md:text-xl font-bold text-gray-800">
                      {{ selectedAchievement.studentName }}
                    </h3>
                    <p class="text-sm text-gray-600">
                      Siswa Berprestasi
                    </p>
                  </div>
                </div>
              </div>

              <!-- Description -->
              <div class="mb-6">
                <h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  Deskripsi Prestasi
                </h4>
                <p class="text-gray-700 leading-relaxed">
                  {{ selectedAchievement.description }}
                </p>
              </div>

              <!-- Additional Details -->
              <div 
                class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-6 rounded-2xl"
                :style="`background: linear-gradient(135deg, ${majorColor.light}20, ${majorColor.accent}10)`"
              >
                <div>
                  <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">Tahun</p>
                  <p class="text-lg font-bold" :style="`color: ${majorColor.primary}`">
                    {{ selectedAchievement.year }}
                  </p>
                </div>
                <div>
                  <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">Kategori</p>
                  <p class="text-lg font-bold" :style="`color: ${majorColor.primary}`">
                    Prestasi Akademik
                  </p>
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
/* Slide Animations - Smooth and consistent */
@keyframes slideInRight {
  0% {
    opacity: 0;
    transform: translateX(100%) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes slideInLeft {
  0% {
    opacity: 0;
    transform: translateX(-100%) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

.animate-slide-in-right {
  animation: slideInRight 0.5s cubic-bezier(0.34, 1.2, 0.64, 1) forwards;
}

.animate-slide-in-left {
  animation: slideInLeft 0.5s cubic-bezier(0.34, 1.2, 0.64, 1) forwards;
}

/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active > div,
.modal-leave-active > div {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-enter-from > div {
  transform: scale(0.9) translateY(-20px);
  opacity: 0;
}

.modal-leave-to > div {
  transform: scale(0.95) translateY(10px);
  opacity: 0;
}

/* Custom Scrollbar for Modal */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Performance optimizations - ensure smooth animations */
.animate-slide-in-right,
.animate-slide-in-left {
  will-change: transform, opacity;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
}

/* Ensure container maintains size during transitions */
.animate-slide-in-right,
.animate-slide-in-left {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
