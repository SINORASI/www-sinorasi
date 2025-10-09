<script lang="ts" setup>
import type { MajorName } from "~/models/MajorName";
import type { JobTitle } from "~/models/JobTitle";
import type { MajorData } from "~/models/MajorData";
import { majorColorSchemes } from "~/utils/majorColors";

interface ExpandedItems {
  [key: string]: boolean;
}

const items = ref<ExpandedItems>({});

const route = useRoute();
const major = route.params.majorName as MajorName;

// Fetch job titles and major data from API
const { data: jobTitles } = await useFetch<Record<MajorName, JobTitle[]>>("/api/job-titles");
const { data: majorDatas } = await useFetch<Record<MajorName, MajorData>>("/api/majors");

const careers = computed(() => jobTitles.value?.[major] || []);

// Get major color scheme
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

const toggleExpanded = (id: number): void => {
  items.value = {
    ...items.value,
    [id]: !items.value[id],
  };
};
</script>

<template>
  <div class="w-full px-4 py-6 sm:px-6 lg:px-8">
    <div class="max-w-2xl mx-auto">
      <div class="space-y-3 sm:space-y-4">
        <div
          v-for="(career, idx) in careers"
          :key="idx"
          class="overflow-hidden transition-all duration-300 shadow-md rounded-2xl hover:shadow-lg"
        >
          <!-- Career Button/Header -->
          <button
            @click="toggleExpanded(idx)"
            :style="{
              backgroundColor: majorColor.primary,
            }"
            class="flex items-center w-full gap-4 px-4 py-4 transition-all duration-200 sm:px-6 sm:py-5 hover:brightness-110"
          >
            <!-- Profile Icon -->
            <div class="flex-shrink-0">
              <div
                class="flex items-center justify-center w-12 h-12 overflow-hidden rounded-full sm:w-14 sm:h-14 bg-white/90"
              >
                <img
                  :src="career.image || '/images/profile-placeholder.png'"
                  :alt="`${career.title} icon`"
                  class="object-cover w-full h-full"
                />
              </div>
            </div>

            <!-- Job Title -->
            <span class="flex-1 text-base font-bold text-left text-white break-words sm:text-lg lg:text-xl">
              {{ career.title }}
            </span>

            <!-- Dropdown Arrow -->
            <svg
              v-if="career.description"
              :class="[
                'w-5 h-5 sm:w-6 sm:h-6 text-white transition-transform duration-300 flex-shrink-0',
                items[idx] ? 'rotate-180' : 'rotate-0',
              ]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Dropdown Content -->
          <div
            v-if="career.description"
            :class="[
              'transition-all duration-300 ease-in-out overflow-hidden bg-white',
              items[idx] ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0',
            ]"
          >
            <div class="px-4 py-4 border-t border-gray-200 sm:px-6 sm:py-5">
              <p class="text-sm leading-relaxed text-gray-700 break-words whitespace-pre-line sm:text-base">
                {{ career.description }}
              </p>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="careers.length === 0" class="py-12 text-center">
          <p class="text-base text-gray-500 sm:text-lg">Tidak ada data karir tersedia untuk jurusan ini.</p>
        </div>
      </div>
    </div>
  </div>
</template>
