<script lang="ts" setup>
import { motion } from "motion-v";
import type { JobTitle } from "~/models/JobTitle";
import type { MajorData } from "~/models/MajorData";
import type { MajorName } from "~/models/MajorName";
import { majorColorSchemes } from "~/utils/majorColors";

const props = defineProps<{
  major?: MajorName;
}>();

interface ExpandedItems {
  [key: string]: boolean;
}

const items = ref<ExpandedItems>({});

const route = useRoute();
const major = props.major || (route.params.majorName as MajorName);

const { data: jobTitles } = await useFetch<Record<MajorName, JobTitle[]>>("/api/job-titles");
const { data: majorDatas } = await useFetch<Record<MajorName, MajorData>>("/api/majors");

const careers = computed(() => jobTitles.value?.[major] || []);

const majorColor = computed(() => majorColorSchemes[major]);

const toggleExpanded = (id: number): void => {
  items.value = {
    ...items.value,
    [id]: !items.value[id],
  };
};
</script>

<template>
  <div class="w-full">
    <div class="mx-auto max-w-7xl">
      <div class="space-y-4 md:space-y-6">
        <motion.div
          v-for="(career, idx) in careers"
          :key="idx"
          :initial="{ opacity: 0, y: 50 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, delay: idx * 0.1 }"
          class="overflow-hidden shadow-md rounded-2xl"
          :whileHover="{ scale: 1.02 }"
        >
          <motion.button
            @click="toggleExpanded(idx)"
            :style="{
              backgroundColor: majorColor.primary,
            }"
            class="flex items-center w-full gap-3 px-4 py-4 md:gap-4 md:px-5 md:py-5 lg:px-6 lg:py-5"
            :whileHover="{ scale: 1.01 }"
            :whileTap="{ scale: 0.99 }"
          >
            <motion.div
              class="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-white/50"
              :animate="{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }"
              :transition="{ duration: 2, repeat: Infinity, delay: idx * 0.3 }"
            ></motion.div>

            <motion.div
              class="shrink-0"
              :whileHover="{ rotate: [0, -10, 10, 0] }"
              :transition="{ type: 'spring', stiffness: 300 }"
            >
              <div
                class="flex items-center justify-center overflow-hidden md:h-12 md:w-12 lg:h-16 lg:w-16 xl:h-16 xl:w-16 rounded-full bg-white/10"
              >
                <Icon :name="`lucide:${career.icon}`" class="text-white" size="30" />
              </div>
            </motion.div>

            <span class="flex-1 text-lg font-semibold text-left text-white wrap-break-words md:text-xl lg:text-2xl">
              {{ career.title }}
            </span>

            <motion.svg
              v-if="career.description"
              :class="['w-5 h-5 sm:w-6 sm:h-6 text-white shrink-0']"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              :animate="{ rotate: items[idx] ? 180 : 0 }"
              :transition="{ type: 'spring', stiffness: 300 }"
              :whileHover="{ scale: 1.2 }"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
            </motion.svg>
          </motion.button>

          <motion.div
            v-if="career.description"
            :style="{ backgroundColor: majorColor.light }"
            :initial="{ height: 0, opacity: 0 }"
            :animate="{
              height: items[idx] ? 'auto' : 0,
              opacity: items[idx] ? 1 : 0,
            }"
            :transition="{ duration: 0.4, ease: 'easeInOut' }"
          >
            <motion.div
              class="px-4 py-4 border-t border-gray-200 md:px-5 md:py-5 lg:px-6 lg:py-6"
              :initial="{ y: 20, opacity: 0 }"
              :animate="{ y: 0, opacity: 1 }"
              :transition="{ delay: 0.1, duration: 0.3 }"
            >
              <p
                class="text-base leading-relaxed text-justify text-gray-700 wrap-break-words whitespace-pre-line md:text-lg lg:text-xl"
              >
                {{ career.description }}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        <div v-if="careers.length === 0" class="py-12 text-center">
          <p class="text-base text-gray-500 sm:text-lg">
            Tidak ada data karir tersedia untuk konsentrasi keahlian ini.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
