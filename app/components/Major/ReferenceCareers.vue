<script lang="ts" setup>
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
        <div
          v-for="(career, idx) in careers"
          :key="idx"
          class="overflow-hidden transition-all duration-300 shadow-md rounded-2xl hover:shadow-lg"
        >
          
          <button
            @click="toggleExpanded(idx)"
            :style="{
              backgroundColor: majorColor.primary,
            }"
            class="flex items-center w-full gap-3 px-4 py-4 transition-all duration-200 md:gap-4 md:px-5 md:py-5 lg:px-6 lg:py-5 hover:brightness-110"
          >
            
            <div class="shrink-0">
              <div
                class="flex items-center justify-center overflow-hidden md:h-12 md:w-12 lg:h-16 lg:w-16 xl:h-16 xl:w-16"
              >
                <Icon :name="`lucide:${career.icon}`" class="text-white" size="30" />
              </div>
            </div>

            
            <span class="flex-1 text-lg font-semibold text-left text-white wrap-break-words md:text-xl lg:text-2xl">
              {{ career.title }}
            </span>

            
            <svg
              v-if="career.description"
              :class="[
                'w-5 h-5 sm:w-6 sm:h-6 text-white transition-transform duration-300 shrink-0',
                items[idx] ? 'rotate-180' : 'rotate-0',
              ]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          
          <div
            v-if="career.description"
            :style="`background-color: ${majorColor.light}`"
            :class="[
              'transition-all duration-300 ease-in-out overflow-hidden',
              items[idx] ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0',
            ]"
          >
            <div class="px-4 py-4 border-t border-gray-200 md:px-5 md:py-5 lg:px-6 lg:py-6">
              <p class="text-base leading-relaxed text-justify text-gray-700 wrap-break-words whitespace-pre-line md:text-lg lg:text-xl">
                {{ career.description }}
              </p>
            </div>
          </div>
        </div>

        
        <div v-if="careers.length === 0" class="py-12 text-center">
          <p class="text-base text-gray-500 sm:text-lg">Tidak ada data karir tersedia untuk konsentrasi keahlian ini.</p>
        </div>
      </div>
    </div>
  </div>
</template>
