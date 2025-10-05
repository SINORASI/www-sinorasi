<script setup lang="ts">
import type { MajorName } from "~/models/MajorName";
import type { MajorData } from "~/models/MajorData";
import type { MajorTopic } from "~/models/MajorTopic";

// Fetch majors data and topics from API
const { data: majorDatas } = await useFetch<Record<MajorName, MajorData>>('/api/majors');
const { data: majorTopics } = await useFetch<Record<MajorName, MajorTopic[]>>('/api/major-topics');

interface ExpandedItems {
  [key: string]: boolean;
}

const expandedLeftItems = ref<ExpandedItems>({});
const expandedRightItems = ref<ExpandedItems>({});
const leftOpenOrder = ref<string[]>([]);
const rightOpenOrder = ref<string[]>([]);

const route = useRoute();
const major = route.params.majorName as MajorName;

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
  <div class="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
    <div class="max-w-6xl mx-auto">
      <!-- Header Section -->
      <div class="mb-8 sm:mb-10">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 text-center">
          Apa Saja Yang Dipelajari Di Jurusan {{ majorDatas?.[major]?.nameMajor || 'RPL' }} ?
        </h2>
      </div>

      <!-- Two Column Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <!-- Left Column -->
        <div class="space-y-4">
          <div 
            v-for="topic in leftColumnTopics" 
            :key="topic.id"
            class="transition-all duration-300"
          >
            <!-- Collapsed Button -->
            <button
              v-if="!expandedLeftItems[topic.id]"
              @click="toggleLeftExpanded(topic.id)"
              :class="[
                'w-full px-5 py-3.5 flex items-center justify-between rounded-md transition-all duration-200',
                majorDatas?.[major]?.bgColor || 'bg-orange-500',
                majorDatas?.[major]?.hoverBgColor || 'hover:bg-orange-600'
              ]"
            >
              <span class="text-black font-bold text-sm sm:text-base uppercase tracking-wide">
                {{ topic.title }}
              </span>
              
              <!-- Plus Icon -->
              <div class="w-7 h-7 flex items-center justify-center bg-white rounded flex-shrink-0 ml-3">
                <svg 
                  class="w-5 h-5 text-orange-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </button>

            <!-- Expanded Card -->
            <div
              v-else
              class="bg-white rounded-md overflow-hidden border border-gray-200"
            >
              <!-- Header -->
              <button
                @click="toggleLeftExpanded(topic.id)"
                :class="[
                  'w-full px-5 py-3.5 flex items-center justify-between transition-all duration-200',
                  majorDatas?.[major]?.bgColor || 'bg-orange-500',
                  majorDatas?.[major]?.hoverBgColor || 'hover:bg-orange-600'
                ]"
              >
                <span class="text-black font-bold text-sm sm:text-base uppercase tracking-wide">
                  {{ topic.title }}
                </span>
                
                <!-- Minus Icon -->
                <div class="w-7 h-7 flex items-center justify-center bg-white rounded flex-shrink-0 ml-3">
                  <svg 
                    class="w-5 h-5 text-orange-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M20 12H4" />
                  </svg>
                </div>
              </button>

              <!-- Content -->
              <div class="p-5 sm:p-6 bg-white">
                <p class="text-gray-700 text-sm sm:text-base leading-relaxed">
                  {{ topic.description }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="space-y-4">
          <div 
            v-for="topic in rightColumnTopics" 
            :key="topic.id"
            class="transition-all duration-300"
          >
            <!-- Collapsed Button -->
            <button
              v-if="!expandedRightItems[topic.id]"
              @click="toggleRightExpanded(topic.id)"
              :class="[
                'w-full px-5 py-3.5 flex items-center justify-between rounded-md transition-all duration-200',
                majorDatas?.[major]?.bgColor || 'bg-orange-500',
                majorDatas?.[major]?.hoverBgColor || 'hover:bg-orange-600'
              ]"
            >
              <span class="text-black font-bold text-sm sm:text-base uppercase tracking-wide">
                {{ topic.title }}
              </span>
              
              <!-- Plus Icon -->
              <div class="w-7 h-7 flex items-center justify-center bg-white rounded flex-shrink-0 ml-3">
                <svg 
                  class="w-5 h-5 text-orange-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </button>

            <!-- Expanded Card -->
            <div
              v-else
              class="bg-white rounded-md overflow-hidden border border-gray-200"
            >
              <!-- Header -->
              <button
                @click="toggleRightExpanded(topic.id)"
                :class="[
                  'w-full px-5 py-3.5 flex items-center justify-between transition-all duration-200',
                  majorDatas?.[major]?.bgColor || 'bg-orange-500',
                  majorDatas?.[major]?.hoverBgColor || 'hover:bg-orange-600'
                ]"
              >
                <span class="text-black font-bold text-sm sm:text-base uppercase tracking-wide">
                  {{ topic.title }}
                </span>
                
                <!-- Minus Icon -->
                <div class="w-7 h-7 flex items-center justify-center bg-white rounded flex-shrink-0 ml-3">
                  <svg 
                    class="w-5 h-5 text-orange-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M20 12H4" />
                  </svg>
                </div>
              </button>

              <!-- Content -->
              <div class="p-5 sm:p-6 bg-white">
                <p class="text-gray-700 text-sm sm:text-base leading-relaxed">
                  {{ topic.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div 
        v-if="leftColumnTopics.length === 0 && rightColumnTopics.length === 0" 
        class="text-center py-12"
      >
        <p class="text-gray-500 text-base">
          Belum ada topik pembelajaran untuk jurusan ini.
        </p>
      </div>
    </div>
  </div>
</template>