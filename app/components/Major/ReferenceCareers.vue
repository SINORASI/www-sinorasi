<script lang="ts" setup>
import type { MajorName } from '~/models/MajorName';
import type { JobTitle } from '~/models/JobTitle';
import type { MajorData } from '~/models/MajorData';

interface ExpandedItems {
  [key: string]: boolean
}

const items = ref<ExpandedItems>({});

const route = useRoute();
const major = route.params.majorName as MajorName;

// Fetch job titles and major data from API
const { data: jobTitles } = await useFetch<Record<MajorName, JobTitle[]>>('/api/job-titles')
const { data: majorDatas } = await useFetch<Record<MajorName, MajorData>>('/api/majors')

const careers = computed(() => jobTitles.value?.[major] || [])

const toggleExpanded = (id: number): void => {
  items.value = {
    ...items.value,
    [id]: !items.value[id]
  }
}
</script>

<template>
  <div class="w-full px-4 sm:px-6 lg:px-8 py-6">    
    <div class="max-w-2xl mx-auto">
      <div class="space-y-3 sm:space-y-4">
        <div 
          v-for="(career, idx) in careers" 
          :key="idx" 
          class="transition-all duration-300 overflow-hidden rounded-2xl shadow-md hover:shadow-lg"
        >
          <!-- Career Button/Header -->
          <button
            @click="toggleExpanded(idx)"
            :class="[
              'w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center gap-4 transition-all duration-200',
              majorDatas?.[major]?.bgColor || 'bg-orange-500',
              majorDatas?.[major]?.hoverBgColor || 'hover:bg-orange-600',
            ]"
          >
            <!-- Profile Icon -->
            <div class="flex-shrink-0">
              <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 flex items-center justify-center overflow-hidden">
                <img 
                  :src="career.image || '/images/profile-placeholder.png'" 
                  :alt="`${career.title} icon`" 
                  class="w-full h-full object-cover"
                >
              </div>
            </div>

            <!-- Job Title -->
            <span class="flex-1 text-left text-black font-bold text-base sm:text-lg lg:text-xl break-words">
              {{ career.title }}
            </span>

            <!-- Dropdown Arrow -->
            <svg 
              v-if="career.description"
              :class="[
                'w-5 h-5 sm:w-6 sm:h-6 text-white transition-transform duration-300 flex-shrink-0',
                items[idx] ? 'rotate-180' : 'rotate-0'
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
              items[idx] 
                ? 'max-h-[1000px] opacity-100' 
                : 'max-h-0 opacity-0'
            ]"
          >
            <div class="px-4 sm:px-6 py-4 sm:py-5 border-t border-gray-200">
              <p class="text-gray-700 leading-relaxed text-sm sm:text-base break-words whitespace-pre-line">
                {{ career.description }}
              </p>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="careers.length === 0" class="text-center py-12">
          <p class="text-gray-500 text-base sm:text-lg">
            Tidak ada data karir tersedia untuk jurusan ini.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>