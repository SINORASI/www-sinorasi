<template>
  <div
    class="overflow-hidden transition-shadow bg-white rounded-lg shadow-md cursor-pointer hover:shadow-xl"
    @click="$emit('showDetails', teacher)"
  >
    <div class="relative aspect-3/4">
      <img :src="teacher.image" :alt="teacher.name" class="object-cover w-full h-full" loading="lazy" decoding="async" />

      <div class="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/70 to-transparent">
        <p class="text-sm font-semibold text-center text-white">
          {{ teacher.degree ? `${teacher.name}, ${teacher.degree}` : teacher.name }}
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

defineEmits(["showDetails"]);
</script>
