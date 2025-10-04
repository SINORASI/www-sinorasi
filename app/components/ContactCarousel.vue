<template>
  <div class="p-8 flex items-center justify-center font-serif">
    <div class="w-full max-w-4xl">
      <div
        class="relative bg-white rounded-2xl shadow-sm flex items-center justify-center aspect-video"
      >
        <span class="text-neutral-800 text-xl font-semibold">
          {{ slides[currentIndex].text }}
        </span>
      </div>

      <div class="flex justify-center items-center mt-6 space-x-3">
        <button
          v-for="(slide, index) in slides"
          :key="slide.id"
          @click="goToSlide(index)"
          :class="[
            'w-3 h-3 rounded-full transition-colors duration-300 ease-in-out',
            currentIndex === index ? 'bg-neutral-700' : 'bg-neutral-300'
          ]"
          :aria-label="'Go to slide ' + (index + 1)"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const slides = ref([
  { id: 1, text: 'Photo' },
  { id: 2, text: 'Another Photo' },
]);

const currentIndex = ref(0);

const goToSlide = (index) => {
  currentIndex.value = index;
};
</script>