<script lang="ts" setup>
import type { MajorName } from '~/models/MajorName';
import type { jobTitle } from '~/models/jobTitles';

const JobTitles: Record<MajorName, jobTitle[]> = {
  rpl: [
    {
      image: '/images/logo.webp',
      title: 'Software Engineer',
      description: 'lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti'
    },
    {
      image: '/images/logo.webp',
      title: 'Web Developer',
      description: 'lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti'
    },
    {
      image: '/images/logo.webp',
      title: 'Frontend Developer',
      description: 'lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti'
    },
  ],
  tkj: [
    {
      image: '/images/logo.webp',
      title: 'Software Engineer',
      description: 'lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti'
    },
    {
      image: '/images/logo.webp',
      title: 'Software Engineer',
      description: 'lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti'
    },
    {
      image: '/images/logo.webp',
      title: 'Software Engineer',
      description: 'lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti'
    },
  ],
  dkv: [
    {
      image: '/images/logo.webp',
      title: 'Software Engineer',
      description: 'lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti'
    },
    {
      image: '/images/logo.webp',
      title: 'Software Engineer',
      description: 'lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti'
    },
    {
      image: '/images/logo.webp',
      title: 'Software Engineer',
      description: 'lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti'
    },
  ],
  animasi: [
    {
      image: '/images/logo.webp',
      title: 'Software Engineer',
      description: 'lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti'
    },
    {
      image: '/images/logo.webp',
      title: 'Software Engineer',
      description: 'lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti'
    },
    {
      image: '/images/logo.webp',
      title: 'Software Engineer',
      description: 'lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti'
    },
  ],
  broadcasting: [
    {
      image: '/images/logo.webp',
      title: 'Software Engineer',
      description: 'lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti'
    },
    {
      image: '/images/logo.webp',
      title: 'Software Engineer',
      description: 'lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti'
    },
    {
      image: '/images/logo.webp',
      title: 'Software Engineer',
      description: 'lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti'
    },
  ],
  tei: [
    {
      image: '/images/logo.webp',
      title: 'Software Engineer',
      description: 'lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti'
    },
    {
      image: '/images/logo.webp',
      title: 'Software Engineer',
      description: 'lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti'
    },
    {
      image: '/images/logo.webp',
      title: 'Software Engineer',
      description: 'lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti'
    },
  ],
  mekatronika: [
    {
      image: '/images/logo.webp',
      title: 'Software Engineer',
      description: 'lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti'
    },
    {
      image: '/images/logo.webp',
      title: 'Software Engineer',
      description: 'lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti'
    },
    {
      image: '/images/logo.webp',
      title: 'Software Engineer',
      description: 'lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti'
    },
  ],
  tav: [
    {
      image: '/images/logo.webp',
      title: 'Software Engineer',
      description: 'lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti'
    },
    {
      image: '/images/logo.webp',
      title: 'Software Engineer',
      description: 'lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti'
    },
    {
      image: '/images/logo.webp',
      title: 'Software Engineer',
      description: 'lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti'
    },
  ],
}

const route = useRoute();
const major = route.params.majorName as MajorName;
const careers = JobTitles[major] || [];

const activeIndex = ref<number | null>(null)

// Function to toggle the accordion
function toggleJCareer(index: number): void {
  activeIndex.value = activeIndex.value === index ? null : index
}
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div class="w-full max-w-lg space-y-4">
      <div v-for="(career, index) in careers" :key="index" class="transition-all duration-300 shadow-xl" :class="{ 'rounded-2xl': activeIndex !== index, 'rounded-lg': activeIndex === index }">
        <!-- The button container -->
        <button
          @click="toggleCareer(index)"
          class="flex items-center justify-between w-full px-6 py-4 space-x-4 text-left transition-colors duration-200 ease-in-out cursor-pointer bg-orange-500 hover:bg-orange-600 focus:outline-none"
          :class="{ 'rounded-2xl': activeIndex !== index, 'rounded-t-2xl': activeIndex === index }"
        >
          <div class="flex items-center justify-center w-10 h-10 text-xl text-white rounded-full bg-orange-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A12 12 0 0112 15c2.685 0 5.2-.676 7.319-1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span class="flex-grow text-lg font-semibold text-white">
            {{ career.title }}
          </span>
          <!-- Plus/Minus Icon -->
          <svg 
            v-if="activeIndex !== index" 
            class="w-6 h-6 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          <svg 
            v-else 
            class="w-6 h-6 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
          </svg>
        </button>

        <!-- The collapsible content area for the description -->
        <div
          :class="{ 'max-h-0 p-0': activeIndex !== index, 'max-h-96 px-6 pb-4 pt-4 rounded-b-2xl shadow-xl': activeIndex === index }"
          class="overflow-hidden transition-all duration-300 ease-in-out bg-white"
        >
          <p class="text-sm text-gray-700">
            {{ career.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>