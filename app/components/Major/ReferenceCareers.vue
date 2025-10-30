<script lang="ts" setup>
import type { JobTitle } from "~/models/JobTitle";
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

const careers = computed(() => jobTitles.value?.[major] || []);

const majorColor = computed(() => majorColorSchemes[major]);

const toggleExpanded = (id: number): void => {
  items.value = {
    ...items.value,
    [id]: !items.value[id],
  };
};

// Lazy loading with IntersectionObserver
const visibleItems = ref<Set<number>>(new Set());
const observer = ref<IntersectionObserver | null>(null);

onMounted(() => {
  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const idx = parseInt(entry.target.getAttribute('data-idx') || '0');
        if (entry.isIntersecting) {
          visibleItems.value.add(idx);
        }
      });
    },
    { threshold: 0.1 }
  );
});

onUnmounted(() => {
  observer.value?.disconnect();
});

const observeElement = (el: Element, idx: number) => {
  if (observer.value) {
    el.setAttribute('data-idx', idx.toString());
    observer.value.observe(el);
  }
};
</script>

<template>
  <div class="w-full">
    <div class="mx-auto max-w-7xl">
      <div class="space-y-4 md:space-y-6">
        <div
          v-for="(career, idx) in careers"
          :key="idx"
          ref="observeElement($el, idx)"
          v-memo="[career.title, career.icon, majorColor.primary, majorColor.light]"
          :class="[
            'overflow-hidden shadow-md rounded-2xl transition-all duration-300 ease-in-out',
            visibleItems.has(idx) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          ]"
          :style="{ transitionDelay: `${idx * 100}ms` }"
        >
          <button
            @click="toggleExpanded(idx)"
            :style="{
              backgroundColor: majorColor.primary,
            }"
            class="flex items-center w-full gap-3 px-4 py-4 md:gap-4 md:px-5 md:py-5 lg:px-6 lg:py-5 transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95"
          >
            <div
              class="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse"
              :style="{ animationDelay: `${idx * 300}ms` }"
            ></div>

            <div
              class="shrink-0 transition-transform duration-300 ease-in-out hover:rotate-12"
            >
              <div
                class="flex items-center justify-center overflow-hidden md:h-12 md:w-12 lg:h-16 lg:w-16 xl:h-16 xl:w-16 rounded-full bg-white/10"
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
                'w-5 h-5 sm:w-6 sm:h-6 text-white shrink-0 transition-all duration-300 ease-in-out',
                items[idx] ? 'rotate-180' : 'rotate-0'
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
            :style="{ backgroundColor: majorColor.light }"
            :class="[
              'transition-all duration-400 ease-in-out overflow-hidden',
              items[idx] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            ]"
          >
            <div
              class="px-4 py-4 border-t border-gray-200 md:px-5 md:py-5 lg:px-6 lg:py-6 transition-all duration-300 ease-in-out"
              :class="items[idx] ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'"
              :style="{ transitionDelay: items[idx] ? '100ms' : '0ms' }"
            >
              <p
                class="text-base leading-relaxed text-justify text-gray-700 wrap-break-words whitespace-pre-line md:text-lg lg:text-xl"
              >
                {{ career.description }}
              </p>
            </div>
          </div>
        </div>

        <div v-if="careers.length === 0" v-memo="true" class="py-12 text-center">
          <p class="text-base text-gray-500 sm:text-lg">
            Tidak ada data karir tersedia untuk konsentrasi keahlian ini.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
