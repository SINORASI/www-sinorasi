<script setup lang="ts">
import type { MajorName } from "~/models/MajorName";
import type { MajorData } from "~/models/MajorData";
import type { MajorTopic } from "~/models/MajorTopic";
import { majorColorSchemes } from "~/utils/majorColors";

const props = defineProps<{
  major?: MajorName;
}>();

// Fetch majors data and topics from API
const { data: majorDatas } = await useFetch<Record<MajorName, MajorData>>("/api/majors");
const { data: majorTopics } = await useFetch<Record<MajorName, MajorTopic[]>>("/api/major-topics");

interface ExpandedItems {
  [key: string]: boolean;
}

const expandedLeftItems = ref<ExpandedItems>({});
const expandedRightItems = ref<ExpandedItems>({});
const leftOpenOrder = ref<string[]>([]);
const rightOpenOrder = ref<string[]>([]);

const route = useRoute();
const major = props.major || (route.params.majorName as MajorName);

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

// Split topics into two columns dynamically
const leftColumnTopics = computed(() => {
  const topics = majorTopics.value?.[major] || [];
  return topics.filter((_, idx) => idx % 2 === 0);
});

const rightColumnTopics = computed(() => {
  const topics = majorTopics.value?.[major] || [];
  return topics.filter((_, idx) => idx % 2 === 1);
});

const toggleLeftExpanded = (id: string): void => {
  if (expandedLeftItems.value[id]) {
    // Close the item
    expandedLeftItems.value = {
      ...expandedLeftItems.value,
      [id]: false,
    };
    leftOpenOrder.value = leftOpenOrder.value.filter((item) => item !== id);
  } else {
    // Check if we already have 2 items open
    if (leftOpenOrder.value.length >= 2) {
      const oldestId = leftOpenOrder.value[0];
      if (oldestId) {
        expandedLeftItems.value = {
          ...expandedLeftItems.value,
          [oldestId]: false,
        };
        leftOpenOrder.value = leftOpenOrder.value.slice(1);
      }
    }
    // Open the new item
    expandedLeftItems.value = {
      ...expandedLeftItems.value,
      [id]: true,
    };
    leftOpenOrder.value.push(id);
  }
};

const toggleRightExpanded = (id: string): void => {
  if (expandedRightItems.value[id]) {
    // Close the item
    expandedRightItems.value = {
      ...expandedRightItems.value,
      [id]: false,
    };
    rightOpenOrder.value = rightOpenOrder.value.filter((item) => item !== id);
  } else {
    // Check if we already have 2 items open
    if (rightOpenOrder.value.length >= 2) {
      const oldestId = rightOpenOrder.value[0];
      if (oldestId) {
        expandedRightItems.value = {
          ...expandedRightItems.value,
          [oldestId]: false,
        };
        rightOpenOrder.value = rightOpenOrder.value.slice(1);
      }
    }
    // Open the new item
    expandedRightItems.value = {
      ...expandedRightItems.value,
      [id]: true,
    };
    rightOpenOrder.value.push(id);
  }
};
</script>

<template>
  <div class="w-full">
    <!-- Two Column Grid -->
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 md:gap-5 lg:gap-6">
      <!-- Left Column -->
      <div class="space-y-4">
        <div v-for="(topic, index) in leftColumnTopics" :key="topic.id" class="transition-all duration-300">
          <!-- Collapsed State -->
          <button v-if="!expandedLeftItems[topic.id]" @click="toggleLeftExpanded(topic.id)" class="w-full group">
            <div
              class="relative flex items-center justify-between gap-3 px-5 py-4 md:px-6 md:py-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              :style="`background: ${majorColor.primary}`"
            >
              <!-- Title -->
              <div class="flex-1 min-w-0 text-left">
                <h3 class="pr-2 text-sm font-semibold leading-snug text-white md:text-base line-clamp-2">
                  {{ topic.title }}
                </h3>
              </div>

              <!-- Plus Icon -->
              <div class="flex-shrink-0">
                <div
                  class="flex items-center justify-center w-8 h-8 transition-transform duration-300 rounded-lg md:w-9 md:h-9 bg-white/20 group-hover:rotate-90"
                >
                  <svg class="w-4 h-4 text-white md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </div>
            </div>
          </button>

          <!-- Expanded State -->
          <div v-else class="overflow-hidden bg-white shadow-lg rounded-xl animate-expand">
            <!-- Header (Clickable to collapse) -->
            <button @click="toggleLeftExpanded(topic.id)" class="w-full group">
              <div
                class="relative flex items-center justify-between gap-3 px-5 py-4 md:px-6 md:py-5"
                :style="`background: ${majorColor.primary}`"
              >
                <!-- Title -->
                <div class="flex-1 min-w-0 text-left">
                  <h3 class="pr-2 text-sm font-semibold leading-snug text-white md:text-base">
                    {{ topic.title }}
                  </h3>
                </div>

                <!-- Minus Icon -->
                <div class="flex-shrink-0">
                  <div
                    class="flex items-center justify-center w-8 h-8 transition-transform duration-300 rounded-lg md:w-9 md:h-9 bg-white/20 group-hover:rotate-180"
                  >
                    <svg class="w-4 h-4 text-white md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M20 12H4" />
                    </svg>
                  </div>
                </div>
              </div>
            </button>

            <!-- Content Area with Animation -->
            <div class="p-4 md:p-5 lg:p-6 animate-slide-down">
              <p class="text-sm leading-relaxed text-gray-700 md:text-base">
                {{ topic.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="space-y-4">
        <div v-for="(topic, index) in rightColumnTopics" :key="topic.id" class="transition-all duration-300">
          <!-- Collapsed State -->
          <button v-if="!expandedRightItems[topic.id]" @click="toggleRightExpanded(topic.id)" class="w-full group">
            <div
              class="relative flex items-center justify-between gap-3 px-5 py-4 md:px-6 md:py-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              :style="`background: ${majorColor.primary}`"
            >
              <!-- Title -->
              <div class="flex-1 min-w-0 text-left">
                <h3 class="pr-2 text-sm font-semibold leading-snug text-white md:text-base line-clamp-2">
                  {{ topic.title }}
                </h3>
              </div>

              <!-- Plus Icon -->
              <div class="flex-shrink-0">
                <div
                  class="flex items-center justify-center w-8 h-8 transition-transform duration-300 rounded-lg md:w-9 md:h-9 bg-white/20 group-hover:rotate-90"
                >
                  <svg class="w-4 h-4 text-white md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </div>
            </div>
          </button>

          <!-- Expanded State -->
          <div v-else class="overflow-hidden bg-white shadow-lg rounded-xl animate-expand">
            <!-- Header (Clickable to collapse) -->
            <button @click="toggleRightExpanded(topic.id)" class="w-full group">
              <div
                class="relative flex items-center justify-between gap-3 px-5 py-4 md:px-6 md:py-5"
                :style="`background: ${majorColor.primary}`"
              >
                <!-- Title -->
                <div class="flex-1 min-w-0 text-left">
                  <h3 class="pr-2 text-sm font-semibold leading-snug text-white md:text-base">
                    {{ topic.title }}
                  </h3>
                </div>

                <!-- Minus Icon -->
                <div class="flex-shrink-0">
                  <div
                    class="flex items-center justify-center w-8 h-8 transition-transform duration-300 rounded-lg md:w-9 md:h-9 bg-white/20 group-hover:rotate-180"
                  >
                    <svg class="w-4 h-4 text-white md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M20 12H4" />
                    </svg>
                  </div>
                </div>
              </div>
            </button>

            <!-- Content Area with Animation -->
            <div class="p-4 md:p-5 lg:p-6 animate-slide-down">
              <p class="text-sm leading-relaxed text-gray-700 md:text-base">
                {{ topic.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="leftColumnTopics.length === 0 && rightColumnTopics.length === 0" class="py-16 text-center md:py-20">
      <div
        class="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full shadow-lg md:w-24 md:h-24"
        :style="`background: ${majorColor.light}`"
      >
        <svg
          class="w-10 h-10 md:w-12 md:h-12"
          :style="`color: ${majorColor.primary}`"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      </div>
      <h3 class="mb-2 text-xl font-bold text-gray-800 md:text-2xl">Belum Ada Materi</h3>
      <p class="px-4 text-sm text-gray-600 md:text-base">
        Materi pembelajaran untuk jurusan ini akan segera ditambahkan.
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Expand Animation - Card appears smoothly */
@keyframes expand {
  0% {
    opacity: 0;
    transform: scaleY(0.95) translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: scaleY(1) translateY(0);
  }
}

/* Slide Down Animation - Description content slides in */
@keyframes slideDown {
  0% {
    opacity: 0;
    transform: translateY(-15px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-expand {
  animation: expand 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  transform-origin: top;
}

.animate-slide-down {
  animation: slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.1s forwards;
  opacity: 0;
}
</style>
