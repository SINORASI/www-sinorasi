<template>
  <div class="p-8 rounded-lg bg-neutral-100">
    <div class="relative overflow-hidden">
      <div class="flex transition-transform duration-300" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <div
          v-for="(_, index) in slidesCount"
          :key="index"
          class="flex items-center justify-center flex-shrink-0 w-full gap-5 h-130"
        >
          <slot :name="`slide-${index}`" :index="index" />
        </div>
      </div>

      <button
        @click="prev"
        class="absolute left-0 flex items-center justify-center p-2 m-5 transition rounded-full cursor-pointer border-neutral-400 top-60 border-1 bg-neutral-300 hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:scale-110"
      >
        <Icon name="lucide:chevron-left" size="24" />
      </button>
      <button
        @click="next"
        class="absolute right-0 flex items-center justify-center p-2 m-5 transition rounded-full cursor-pointer top-60 border-neutral-400 border-1 bg-neutral-300 hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:scale-110"
      >
        <Icon name="lucide:chevron-right" size="24" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, useSlots } from "vue";

const slots = useSlots();
const currentIndex = ref(0);

const slidesCount = computed(() => {
  return Object.keys(slots).filter((key) => key.startsWith("slide-")).length;
});

const next = () => {
  if (currentIndex.value < slidesCount.value - 1) {
    currentIndex.value++;
  } else {
    currentIndex.value = 0;
  }
};

const prev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  } else {
    currentIndex.value = slidesCount.value - 1;
  }
};
</script>
