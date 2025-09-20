<template>
  <div
    class="bg-neutral-200/50 p-4 rounded-lg text-center cursor-pointer hover:shadow-xl hover:transform hover:-translate-y-1 transition-all duration-300"
    @click="$emit('showDetails', teacher)"
  >
    <div class="aspect-square bg-neutral-300 rounded-md flex items-center justify-center mb-4">
      <!-- Placeholder Icon or an <img> tag -->
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
    </div>
    <p class="font-semibold text-neutral-800">{{ teacher.name }}, {{ teacher.degree }}</p>
  </div>
</template>

<script setup>
defineProps({
  teacher: {
    type: Object,
    required: true,
  },
});

defineEmits(['showDetails']);
</script>