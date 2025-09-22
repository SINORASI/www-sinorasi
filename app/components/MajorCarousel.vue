<template>
  <div class="w-fit flex flex-col gap-5 items-center rounded-lg">
    <!-- Desktop Arrows -->
    <div class="hidden md:flex gap-5 items-center">
      <button
        @click="prev"
        class="h-fit w-fit border-neutral-400 border cursor-pointer bg-neutral-300 p-2 items-center justify-center rounded-full shadow-lg transition hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:scale-110"
      >
        <Icon name="lucide:chevron-left" size="24" />
      </button>

      <div ref="carouselContainer" class="overflow-hidden flex md:gap-5 gap-0 snap-x snap-mandatory">
        <div v-for="(item, index) in items" :key="index" class="flex flex-col gap-2 w-60 h-100 snap-center shrink-0">
          <img :src="item.image" class="h-full w-full rounded-lg shadow-sm" />
          <div class="flex p-2 justify-around gap-5 items-center text-center">
            <img :src="item.logo" class="w-15 h-15" />
            <p class="text-base">{{ item.title }}</p>
          </div>
        </div>
      </div>

      <button
        @click="next"
        class="h-fit w-fit border-neutral-400 border cursor-pointer bg-neutral-300 p-2 items-center justify-center rounded-full shadow-lg transition hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:scale-110"
      >
        <Icon name="lucide:chevron-right" size="24" />
      </button>
    </div>

    <!-- Mobile View with Single Card -->
    <div class="md:hidden flex flex-col items-center gap-5">
      <div ref="mobileCarousel" class="overflow-hidden w-60">
        <div
          class="flex transition-transform duration-300 ease-in-out"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <div v-for="(item, index) in items" :key="index" class="flex flex-col gap-2 w-60 h-100 shrink-0">
            <img :src="item.image" class="h-full w-full rounded-lg shadow-sm" />
            <div class="flex p-2 justify-around gap-5 items-center text-center">
              <img :src="item.logo" class="w-15 h-15" />
              <p class="text-base">{{ item.title }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Navigation Buttons -->
      <div class="flex gap-5">
        <button
          @click="prev"
          :disabled="currentIndex === 0"
          class="border-neutral-400 border cursor-pointer bg-neutral-300 p-2 items-center justify-center rounded-full shadow-lg transition hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:scale-110 disabled:opacity-50"
        >
          <Icon name="lucide:chevron-left" size="24" />
        </button>
        <button
          @click="next"
          :disabled="currentIndex === items.length - 1"
          class="border-neutral-400 border cursor-pointer bg-neutral-300 p-2 items-center justify-center rounded-full shadow-lg transition hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:scale-110 disabled:opacity-50"
        >
          <Icon name="lucide:chevron-right" size="24" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const items = [
  {
    image: "/images/placeholder.jpg",
    logo: "/images/logo.webp",
    title: "Rekayasa Perangkat Lunak",
  },
  {
    image: "/images/placeholder.jpg",
    logo: "/images/logo.webp",
    title: "Rekayasa Perangkat Lunak",
  },
  {
    image: "/images/placeholder.jpg",
    logo: "/images/logo.webp",
    title: "Rekayasa Perangkat Lunak",
  },
  {
    image: "/images/placeholder.jpg",
    logo: "/images/logo.webp",
    title: "Rekayasa Perangkat Lunak",
  },
];

const currentIndex = ref(0);

function next() {
  if (currentIndex.value < items.length - 1) {
    currentIndex.value++;
  }
}

function prev() {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
}
</script>
