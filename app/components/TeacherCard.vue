<template>
  <div
    class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
    @click="$emit('showDetails', teacher)"
  >
    <div class="relative aspect-[3/3]">
      <img 
        :src="teacher.image || '/images/placeholder.jpg'" 
        :alt="teacher.name"
        class="w-full h-full object-cover"
      />
      
      <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
        <p class="font-semibold text-white text-center text-sm">
          {{ teacher.name }}{{ teacher.degree ? ', ' + teacher.degree : '' }}
        </p>
      </div>
    </div>
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