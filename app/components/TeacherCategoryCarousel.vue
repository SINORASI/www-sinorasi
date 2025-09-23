<template>
  <div class="w-full">
    <h2 class="text-3xl font-bold text-neutral-800 mb-8">{{ title }}</h2>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      <TeacherCard
        v-for="teacher in teachers"
        :key="teacher.id"
        :teacher="teacher"
        @show-details="teacher => $emit('open-modal', teacher, teachers, title)"
      />
    </div>

    <div class="flex justify-between items-center mt-8">
      <button class="p-2 rounded-full hover:bg-neutral-200 transition-colors">
        <Icon name="lucide:chevron-left" size="18" class="text-neutral-400" />
      </button>
      <div class="font-semibold text-neutral-700">
        {{ pagination }}
      </div>
      <button class="p-2 rounded-full hover:bg-neutral-200 transition-colors">
        <Icon name="lucide:chevron-right" size="18" class="text-neutral-400" />
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