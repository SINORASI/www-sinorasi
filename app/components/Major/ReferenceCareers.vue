<script lang="ts" setup>
import type { MajorName } from '~/models/MajorName';
import type { JobTitle } from '~/models/JobTitle';
import type { MajorData } from '~/models/MajorData';

interface ExpandedItems {
  [key: string]: boolean
}

const Items = ref<ExpandedItems>({});

const route = useRoute();
const major = route.params.majorName as MajorName;

// Fetch job titles and major data from API
const { data: JobTitles } = await useFetch<Record<MajorName, JobTitle[]>>('/api/job-titles')
const { data: majorDatas } = await useFetch<Record<MajorName, MajorData>>('/api/majors')

const Careers = computed(() => JobTitles.value?.[major] || [])

const toggleExpanded = (id: number): void => {
  Items.value = {
    ...Items.value,
    [id]: !Items.value[id]
  }
}
</script>

<template>
    <div class="max-w-4xl mx-auto">    
      <div class="grid grid-cols-1 gap-8">
        <div class="space-y-4">
          <div 
            v-for="(career, idx) in Careers" 
            :key="idx" 
            class="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <button
              @click="toggleExpanded(idx)"
              :class="[
                `w-full p-4 flex items-center justify-left transition-all duration-200 text-white font-semibold text-lg gap-4.5 ${majorDatas[major]?.bgColor} ${majorDatas[major]?.hoverBgColor}`
              ]"
            >
              <img :src="career.image" alt="Logo Perusahaan" width="60">
              <span>{{ career.title }}</span> 
            </button>

            <div 
              :class="[
                'transition-all duration-300 ease-in-out overflow-hidden',
                Items[idx] 
                  ? 'max-h-96 opacity-100' 
                  : 'max-h-0 opacity-0'
              ]"
            >
              <div class="p-6 bg-white">
                <p class="text-gray-700 leading-relaxed">
                  {{ career.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>