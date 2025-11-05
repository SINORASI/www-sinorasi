<script lang="ts" setup>
import { motion } from "motion-v";
import { computed, ref, onMounted } from "vue";
import type { KaproProfile } from "~/models/KaproProfile";
import type { MajorData } from "~/models/MajorData";
import type { MajorName } from "~/models/MajorName";
import { majorColorSchemes } from "~/utils/majorColors";
import kaprosData from "~/data/kaprosData.json";

const props = defineProps<{
  major?: MajorName;
}>();

const { data: _majorDatas } = await useFetch<Record<MajorName, MajorData>>("/api/majors");

const kapros: Record<MajorName, KaproProfile[]> = kaprosData;

const route = useRoute();
const major = props.major || (route.params.majorName as MajorName);
const kapro = kapros[major] || [];

const majorColor = computed(() => {
  return (
    majorColorSchemes[major] || {
      primary: "#f97316",
      secondary: "#ea580c",
      accent: "#FFB366",
      light: "#FFF3E8",
      text: "#1f2937",
      bg: "#ffffff",
      hoverBg: "#fff7ed",
      border: "#fed7aa",
      headerBg: "#fff7ed",
    }
  );
});

const current = ref(0);
const direction = ref("next");
const isVisible = ref(false);

const prev = () => {
  direction.value = "prev";
  current.value = (current.value - 1 + kapro.length) % kapro.length;
};

const next = () => {
  direction.value = "next";
  current.value = (current.value + 1) % kapro.length;
};

const getTransitionClasses = () => {
  if (direction.value === "next") {
    return {
      enterFrom: "opacity-0 transform translate-x-full",
      enterTo: "opacity-100 transform translate-x-0",
      leaveFrom: "opacity-100 transform translate-x-0",
      leaveTo: "opacity-0 transform -translate-x-full",
    };
  } else {
    return {
      enterFrom: "opacity-0 transform -translate-x-full",
      enterTo: "opacity-100 transform translate-x-0",
      leaveFrom: "opacity-100 transform translate-x-0",
      leaveTo: "opacity-0 transform translate-x-full",
    };
  }
};

onMounted(() => {
  const checkVisibility = () => {
    const element = document.querySelector(".kapro-carousel-container");
    if (element && typeof element.getBoundingClientRect === "function") {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        isVisible.value = true;
        window.removeEventListener("scroll", checkVisibility);
      }
    }
  };

  window.addEventListener("scroll", checkVisibility, { passive: true });
  // Check initial visibility
  checkVisibility();
});

onUnmounted(() => {
  // No cleanup needed since we remove the listener inside checkVisibility
});
</script>

<template>
  <div class="w-full max-w-6xl px-4 py-8 mx-auto kapro-carousel-container">
    <div class="overflow-hidden">
      <div class="grid grid-cols-1 gap-8 p-6 lg:grid-cols-5 md:p-8 lg:p-10">
        <motion.div
          class="flex flex-col items-center justify-center space-y-6 lg:col-span-2"
          :initial="{ opacity: 0, x: -50 }"
          :animate="{ opacity: 1, x: 0 }"
          :transition="{ duration: 0.8 }"
        >
          <motion.div
            class="relative w-full max-w-xs aspect-3/4"
            :whileHover="{ scale: 1.05 }"
            :transition="{ type: 'spring', stiffness: 300 }"
          >
            <div
              class="absolute inset-0 overflow-hidden rounded-2xl flex justify-center items-center"
              :style="{ backgroundColor: majorColor.light }"
            >
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

              <motion.div
                :key="current"
                class="w-full h-full"
                :initial="{ scale: 0.8, opacity: 0 }"
                :animate="{ scale: 1, opacity: 1 }"
                :transition="{ duration: 0.5 }"
              >
                <NuxtImg
                  :src="kapro[current]?.image"
                  :alt="kapro[current]?.kaproName"
                  class="object-cover w-full h-full"
                  loading="lazy"
                  decoding="async"
                  width="320"
                  height="427"
                />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            class="text-center space-y-2 w-full px-4 min-h-[120px] flex flex-col justify-center"
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.6, delay: 0.3 }"
          >
            <motion.h2
              :key="current"
              class="text-xl md:text-2xl font-bold text-gray-900 min-h-[60px] flex items-center justify-center"
              :initial="{ opacity: 0, y: 10 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.4 }"
            >
              {{ kapro[current]?.kaproName }}
            </motion.h2>

            <motion.p
              :key="current"
              :style="{ color: majorColor.text }"
              class="text-sm md:text-base font-semibold min-h-10 flex items-center justify-center"
              :initial="{ opacity: 0 }"
              :animate="{ opacity: 1 }"
              :transition="{ duration: 0.4, delay: 0.2 }"
            >
              {{ kapro[current]?.jabatan }}
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.div
          class="lg:col-span-3 flex flex-col justify-between min-h-[400px] lg:min-h-[500px]"
          :initial="{ opacity: 0, x: 50 }"
          :animate="{ opacity: 1, x: 0 }"
          :transition="{ duration: 0.8, delay: 0.2 }"
        >
          <motion.div
            class="flex items-center justify-center flex-1 p-6 md:p-8"
            :initial="{ opacity: 0, scale: 0.9 }"
            :animate="{ opacity: 1, scale: 1 }"
            :transition="{ duration: 0.6, delay: 0.4 }"
          >
            <motion.div
              :key="current"
              class="space-y-6 text-center"
              :initial="{ opacity: 0, y: 20 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.5 }"
            >
              <motion.div
                class="flex justify-center"
                :whileHover="{ scale: 1.1, rotate: 5 }"
                :transition="{ type: 'spring', stiffness: 300 }"
              >
                <div
                  class="flex items-center justify-center rounded-full w-14 h-14 md:w-16 md:h-16"
                  :style="{ backgroundColor: majorColor.bg }"
                >
                  <Icon name="lucide:quote" class="text-white w-7 h-7 md:w-8 md:h-8" />
                </div>
              </motion.div>

              <motion.p
                class="text-2xl font-bold leading-relaxed text-gray-800 md:text-3xl lg:text-4xl"
                :initial="{ opacity: 0, y: 10 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.5, delay: 0.2 }"
              >
                {{ kapro[current]?.quote }}
              </motion.p>
            </motion.div>
          </motion.div>

          <motion.div
            class="pt-4 space-y-6"
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.6, delay: 0.6 }"
          >
            <div class="flex justify-center items-center gap-2 min-h-4">
              <motion.button
                v-for="(item, idx) in kapro"
                :key="idx"
                @click="current = idx"
                :style="{
                  backgroundColor: current === idx ? majorColor.primary : undefined,
                }"
                :class="[
                  'h-2 rounded-full transition-all duration-300',
                  current === idx ? 'w-12' : 'w-2',
                  current === idx ? '' : 'bg-gray-300 hover:bg-gray-400',
                ]"
                :whileHover="{ scale: 1.2 }"
                :whileTap="{ scale: 0.9 }"
                :aria-label="`Go to profile ${idx + 1}`"
              ></motion.button>
            </div>

            <div class="flex items-center justify-between px-4">
              <motion.button
                @click="prev"
                :style="{
                  backgroundColor: majorColor.primary,
                }"
                class="flex items-center gap-2 px-5 py-3 font-semibold text-white transition-all duration-300 transform rounded-xl hover:-translate-x-1 hover:brightness-110"
                :whileHover="{ scale: 1.05, x: -2 }"
                :whileTap="{ scale: 0.95 }"
                aria-label="Previous"
              >
                <Icon name="lucide:chevron-left" class="w-5 h-5" />
                <span class="text-sm">Previous</span>
              </motion.button>

              <motion.div
                class="flex items-baseline gap-1"
                :initial="{ scale: 0 }"
                :animate="{ scale: 1 }"
                :transition="{ delay: 0.8, type: 'spring', stiffness: 200 }"
              >
                <span :style="{ color: majorColor.text }" class="text-2xl font-bold md:text-3xl">
                  {{ String(current + 1).padStart(2, "0") }}
                </span>
                <span class="text-lg text-gray-400 md:text-xl"> /{{ String(kapro.length).padStart(2, "0") }} </span>
              </motion.div>

              <motion.button
                @click="next"
                :style="{
                  backgroundColor: majorColor.primary,
                }"
                class="flex items-center gap-2 px-5 py-3 font-semibold text-white transition-all duration-300 transform rounded-xl hover:translate-x-1 hover:brightness-110"
                :whileHover="{ scale: 1.05, x: 2 }"
                :whileTap="{ scale: 0.95 }"
                aria-label="Next"
              >
                <span class="text-sm">Next</span>
                <Icon name="lucide:chevron-right" class="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </div>
</template>
