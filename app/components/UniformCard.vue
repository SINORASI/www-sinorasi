<template>
  <Motion
    :class="[
      'group bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100 transition-all duration-300 hover:-translate-y-2',
      hoverBorderClass,
      'hover:shadow-2xl',
    ]"
    :initial="{ opacity: 0, scale: 0.9, y: 30 }"
    :animate="{ opacity: 1, scale: 1, y: 0 }"
    :transition="{ duration: 0.5, delay: 0.1 }"
  >
    
    <div class="relative overflow-hidden aspect-[4/5]">
      
      <div :class="['absolute inset-0', bgGradientClass]"></div>

      
      <div class="relative w-full h-full">
        <TransitionGroup
          enter-active-class="transition-all duration-600 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
          leave-active-class="transition-all duration-600 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
          enter-from-class="opacity-0 translate-x-[30px]"
          leave-to-class="opacity-0 -translate-x-[30px]"
        >
          <img
            v-for="(image, index) in currentImages"
            v-show="index === currentImageIndex"
            :key="`${selectedGrade}-${selectedGender}-${index}`"
            :src="image"
            :alt="`Seragam ${uniformType} Kelas ${selectedGrade} ${
              selectedGender === 'L' ? 'Laki-laki' : 'Perempuan'
            } - ${index + 1}`"
            class="absolute inset-5 w-[calc(100%-2.5rem)] h-[calc(100%-2.5rem)] object-contain rounded-lg z-50"
          />
        </TransitionGroup>
      </div>

      
      <div :class="['absolute inset-0', gradientOverlayClass]"></div>

      
      <div class="absolute z-60 top-4 left-4">
        <button
          @click="isMenuOpen = !isMenuOpen"
          :class="[
            'px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300',
            'backdrop-blur-md bg-white/90 border border-white/50 shadow-lg',
            'hover:bg-white hover:shadow-xl flex items-center gap-2',
            'text-gray-900',
          ]"
        >
          <Icon name="lucide:settings-2" size="16" />
          <span>{{ selectedGrade === 'X' ? '10' : '11' }} - </span>
          <Icon :name="selectedGender === 'L' ? 'material-symbols:male' : 'material-symbols:female'" size="16" />
          <span>{{ useAlmamater ? " + Jas" : "" }}</span>
          <Icon :name="isMenuOpen ? 'lucide:chevron-up' : 'lucide:chevron-down'" size="14" />
        </button>

        
        <Transition
          enter-active-class="transition-all duration-200 ease-out"
          leave-active-class="transition-all duration-150 ease-in"
          enter-from-class="opacity-0 -translate-y-[10px] scale-[0.95]"
          leave-to-class="opacity-0 -translate-y-[10px] scale-[0.95]"
        >
          <div
            v-if="isMenuOpen"
            class="absolute top-full left-0 mt-2 backdrop-blur-xl bg-white/95 border border-white/50 rounded-xl shadow-2xl overflow-hidden min-w-[200px]"
          >
            
            <div class="p-3 border-b border-gray-200/50">
              <div class="mb-2 text-xs font-bold text-gray-500">KELAS</div>
              <div class="flex gap-2">
                <button
                  @click="selectedGrade = 'X'"
                  :class="[
                    'flex-1 px-3 py-2 rounded-lg text-sm font-bold transition-all duration-200',
                    selectedGrade === 'X'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                  ]"
                >
                  10
                </button>
                <button
                  @click="selectedGrade = 'XI'"
                  :class="[
                    'flex-1 px-3 py-2 rounded-lg text-sm font-bold transition-all duration-200',
                    selectedGrade === 'XI'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                  ]"
                >
                  11
                </button>
              </div>
            </div>

            
            <div class="p-3">
              <div class="mb-2 text-xs font-bold text-gray-500">JENIS KELAMIN</div>
              <div class="space-y-2">
                <button
                  @click="selectGender('L')"
                  :class="[
                    'w-full px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2',
                    selectedGender === 'L'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                  ]"
                >
                  <Icon name="material-symbols:male" size="16" />
                  <span>Laki-laki</span>
                  <Icon v-if="selectedGender === 'L'" name="lucide:check" size="16" class="ml-auto" />
                </button>
                <button
                  @click="selectGender('P')"
                  :class="[
                    'w-full px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2',
                    selectedGender === 'P'
                      ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                  ]"
                >
                  <Icon name="material-symbols:female" size="16" />
                  <span>Perempuan</span>
                  <Icon v-if="selectedGender === 'P'" name="lucide:check" size="16" class="ml-auto" />
                </button>
              </div>
            </div>

            
            <div v-if="almamaterImages" class="p-3 border-t border-gray-200/50">
              <button
                @click="useAlmamater = !useAlmamater"
                :class="[
                  'w-full px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2',
                  useAlmamater
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                ]"
              >
                <Icon name="lucide:briefcase" size="16" />
                <span>Almamater (Jas)</span>
                <Icon v-if="useAlmamater" name="lucide:check" size="16" class="ml-auto" />
              </button>
            </div>
          </div>
        </Transition>
      </div>

      
      <div class="absolute px-3 py-1 rounded-full z-60 top-4 right-4 bg-white/90 backdrop-blur-sm">
        <span :class="['text-xs font-semibold', badgeTextClass]">{{ dayNumber }}</span>
      </div>

      
      <div class="absolute z-60 bottom-4 left-4">
        <p class="text-sm font-medium text-white/90 drop-shadow-md">{{ uniformDay }}</p>
        <h3 class="text-2xl font-bold text-white drop-shadow-lg">{{ day }}</h3>
      </div>

      
      <div class="absolute z-60 bottom-4 right-4 flex gap-1.5">
        <button
          v-for="(_, index) in currentImages"
          :key="index"
          @click="currentImageIndex = index"
          :class="[
            'w-2 h-2 rounded-full transition-all duration-300',
            index === currentImageIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80',
          ]"
          :aria-label="`Go to image ${index + 1}`"
        ></button>
      </div>
    </div>
  </Motion>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";

interface Props {
  gradeImages: {
    X: {
      L: string[];
      P: string[];
    };
    XI: {
      L: string[];
      P: string[];
    };
  };
  almamaterImages?: {
    X: {
      L: string[];
      P: string[];
    };
    XI: {
      L: string[];
      P: string[];
    };
  };
  day: string;
  dayNumber: string;
  uniformType: string;
  uniformDay: string;
  primaryColor: "blue" | "gray" | "amber" | "green" | "brown" | "sky";
}

const props = defineProps<Props>();

const currentImageIndex = ref(0);
const selectedGrade = ref<"X" | "XI">("X");
const selectedGender = ref<"L" | "P">("L");
const useAlmamater = ref(false);
const isMenuOpen = ref(false);
let intervalId: ReturnType<typeof setInterval> | null = null;

const currentImages = computed(() => {
  if (useAlmamater.value && props.almamaterImages) {
    return props.almamaterImages[selectedGrade.value][selectedGender.value];
  }
  return props.gradeImages[selectedGrade.value][selectedGender.value];
});

const selectGender = (gender: "L" | "P") => {
  selectedGender.value = gender;
  isMenuOpen.value = false;
};

watch([selectedGrade, selectedGender, useAlmamater], () => {
  currentImageIndex.value = 0;
});

const startAutoSlide = () => {
  intervalId = setInterval(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % currentImages.value.length;
  }, 4000);
};

const stopAutoSlide = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
};

onMounted(() => {
  startAutoSlide();
});

onUnmounted(() => {
  stopAutoSlide();
});

const colorMap = {
  blue: {
    hover: "hover:border-blue-300",
    bg: "bg-gradient-to-br from-blue-100 to-blue-200",
    gradient: "bg-gradient-to-t from-blue-900/60 to-transparent",
    badge: "text-blue-700",
    typeBadge: "bg-blue-50 text-blue-700",
    icon: "text-blue-600",
  },
  gray: {
    hover: "hover:border-gray-400",
    bg: "bg-gradient-to-br from-gray-100 to-gray-200",
    gradient: "bg-gradient-to-t from-gray-900/60 to-transparent",
    badge: "text-gray-700",
    typeBadge: "bg-gray-100 text-gray-700",
    icon: "text-gray-600",
  },
  amber: {
    hover: "hover:border-amber-400",
    bg: "bg-gradient-to-br from-amber-100 to-amber-200",
    gradient: "bg-gradient-to-t from-amber-900/60 to-transparent",
    badge: "text-amber-700",
    typeBadge: "bg-amber-50 text-amber-700",
    icon: "text-amber-600",
  },
  green: {
    hover: "hover:border-green-400",
    bg: "bg-gradient-to-br from-green-100 to-green-200",
    gradient: "bg-gradient-to-t from-green-900/60 to-transparent",
    badge: "text-green-700",
    typeBadge: "bg-green-50 text-green-700",
    icon: "text-green-700",
  },
  brown: {
    hover: "hover:border-yellow-700",
    bg: "bg-gradient-to-br from-yellow-700 to-yellow-800",
    gradient: "bg-gradient-to-t from-yellow-900/60 to-transparent",
    badge: "text-yellow-900",
    typeBadge: "bg-yellow-100 text-yellow-900",
    icon: "text-yellow-800",
  },
  sky: {
    hover: "hover:border-sky-400",
    bg: "bg-gradient-to-br from-sky-200 to-sky-300",
    gradient: "bg-gradient-to-t from-sky-700/60 to-transparent",
    badge: "text-sky-700",
    typeBadge: "bg-sky-50 text-sky-700",
    icon: "text-sky-600",
  },
};

const hoverBorderClass = computed(() => colorMap[props.primaryColor].hover);
const bgGradientClass = computed(() => colorMap[props.primaryColor].bg);
const gradientOverlayClass = computed(() => colorMap[props.primaryColor].gradient);
const badgeTextClass = computed(() => colorMap[props.primaryColor].badge);
const typeBadgeClass = computed(() => colorMap[props.primaryColor].typeBadge);
const iconColorClass = computed(() => colorMap[props.primaryColor].icon);
const tabActiveClass = computed(() => colorMap[props.primaryColor].badge);
const tabBorderClass = computed(() => {
  const borderColors: Record<string, string> = {
    blue: "border-blue-600",
    gray: "border-gray-600",
    amber: "border-amber-600",
    green: "border-green-600",
    brown: "border-yellow-800",
    sky: "border-sky-600",
  };
  return borderColors[props.primaryColor];
});
</script>
