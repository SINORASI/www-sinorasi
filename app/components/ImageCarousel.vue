<template>
  <div class="bg-neutral-100 p-8 flex items-center justify-center font-serif">
    <div class="w-full max-w-4xl">
      <!-- Main Display Area -->
      <div
        class="relative bg-white rounded-2xl shadow-lg flex items-center justify-center aspect-video"
      >
        <span class="text-neutral-800 text-xl font-semibold">
          {{ slides[currentIndex].text }}
        </span>
      </div>

      <!-- Pagination Dots -->
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

// Sample data for carousel slides. Add more objects to create more slides.
const slides = ref([
  { id: 1, text: 'Photo' },
  { id: 2, text: 'Another Photo' },
]);

// Reactive state to keep track of the current slide index
const currentIndex = ref(0);

// Function to change the current slide when a dot is clicked
const goToSlide = (index) => {
  currentIndex.value = index;
};
</script>