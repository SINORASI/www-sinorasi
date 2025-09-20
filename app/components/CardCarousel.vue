<template>
  <div class="w-fit h-fit p-4 rounded-lg bg-neutral-300 text-center">
    <div class="relative overflow-hidden rounded-lg">
      <div class="flex transition-transform duration-300" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <div v-for="(content, index) in contents" :key="index" class="flex-shrink-0 w-full">
          <h3 class="font-bold text-2xl">{{ content.title }}</h3>
          <p class="text-base mt-2">{{ content.text }}</p>
        </div>
      </div>
      <button @click="prev" class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full">‹</button>
      <button @click="next" class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full">›</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Content {
  title: string;
  text: string;
}

defineProps<{
  contents: Content[];
}>();

const currentIndex = ref(0);

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % 2;
};

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + 2) % 2;
};

</script>
