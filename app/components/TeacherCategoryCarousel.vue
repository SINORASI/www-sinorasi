<template>
  <div class="w-full">
    <h2 class="text-3xl font-bold text-neutral-800 mb-8">{{ title }}</h2>

    <!-- Teacher Grid -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      <TeacherCard
        v-for="teacher in teachers"
        :key="teacher.id"
        :teacher="teacher"
        @show-details="teacher => $emit('open-modal', teacher, teachers, title)"
      />
    </div>

    <!-- Carousel Navigation & Pagination -->
    <div class="flex justify-between items-center mt-8">
      <button class="p-2 rounded-full hover:bg-neutral-200 transition-colors">
        <svg xmlns="http://www.w.org/2000/svg" class="h-6 w-6 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <div class="font-semibold text-neutral-700">
        {{ pagination }}
      </div>
      <button class="p-2 rounded-full hover:bg-neutral-200 transition-colors">
        <svg xmlns="http://www.w.org/2000/svg" class="h-6 w-6 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import TeacherCard from './TeacherCard.vue';

defineProps({
  title: String,
  pagination: String,
  teachers: Array,
});

defineEmits(['open-modal']);
</script>