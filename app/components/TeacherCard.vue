<template>
  <div
    class="bg-secondary p-4 rounded-lg text-center cursor-pointer hover:shadow-xl hover:transform hover:-translate-y-1 transition-all duration-300"
    @click="$emit('showDetails', teacher)"
  >
    <div class="aspect-square bg-tertiary rounded-md flex items-center justify-center mb-4">
      <img src="/images/placeholder.jpg" class="w-full h-full rounded-lg" />
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