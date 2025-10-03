<script setup lang="ts">
import { ref } from "vue";

const items = [
  {
    image: "/images/placeholder.jpg",
    logo: "/images/majorIcon/rpl.webp",
    title: "Rekayasa Perangkat Lunak",
  },
  {
    image: "/images/placeholder.jpg",
    logo: "/images/majorIcon/tkj.webp",
    title: "Teknik Komputer Jaringan",
  },
  {
    image: "/images/placeholder.jpg",
    logo: "/images/majorIcon/dkv.webp",
    title: "Desain Komunikasi Visual",
  },
  {
    image: "/images/placeholder.jpg",
    logo: "/images/majorIcon/animasi.webp",
    title: "Animasi",
  },
  {
    image: "/images/placeholder.jpg",
    logo: "/images/majorIcon/broadcasting.webp",
    title: "Broadcasting",
  },
  {
    image: "/images/placeholder.jpg",
    logo: "/images/majorIcon/tei.webp",
    title: "Teknik Elektronika Industri",
  },
  {
    image: "/images/placeholder.jpg",
    logo: "/images/majorIcon/mekatronika.webp",
    title: "Teknik Mekatronika",
  },
  {
    image: "/images/placeholder.jpg",
    logo: "/images/majorIcon/tav.webp",
    title: "Teknik Audio Video",
  },
];

const currentIndex = ref(0);
const carouselContainer = ref<HTMLElement | null>(null);

function next() {
  if (carouselContainer.value) {
    const maxScroll = carouselContainer.value.scrollWidth - carouselContainer.value.clientWidth;
    if (carouselContainer.value.scrollLeft >= maxScroll) {
      carouselContainer.value.scrollTo({ left: carouselContainer.value.scrollLeft + 1020, behavior: 'smooth' });
      currentIndex.value = 0;
    } else {
      carouselContainer.value.scrollTo({ 
        left: carouselContainer.value.scrollLeft + 1020, 
        behavior: 'smooth' 
      });
      currentIndex.value = (currentIndex.value + 1) % items.length;
    }
  }
}

function prev() {
  if (carouselContainer.value) {
    if (carouselContainer.value.scrollLeft <= 0) {
      const maxScroll = carouselContainer.value.scrollWidth - carouselContainer.value.clientWidth
      carouselContainer.value.scrollTo({ left: maxScroll, behavior: 'instant' })
      currentIndex.value = items.length - 1
    } else {
      carouselContainer.value.scrollTo({
        left: carouselContainer.value.scrollLeft - 1020,
        behavior: 'smooth'
      })
      currentIndex.value = (currentIndex.value - 1 + items.length) % items.length
    }
  }
}
</script>

<template>
  <div class="flex flex-col items-center gap-5 rounded-lg w-fit">
    <div class="items-center hidden gap-5 md:flex">
      <button
        @click="prev"
        class="flex items-center justify-center p-2 transition border rounded-full shadow-lg cursor-pointer h-fit w-fit border-neutral-400 bg-tertiary hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:scale-110"
      >
        <Icon name="lucide:chevron-left" size="24" />
      </button>

      <div ref="carouselContainer" class="overflow-hidden flex md:gap-5 gap-0 snap-x snap-mandatory max-w-[1020px]">
        <div v-for="(item, index) in items" :key="index" class="flex flex-col gap-2 border rounded-lg shadow-sm w-60 h-100 snap-center shrink-0 bg-secondary border-neutral-300">
          <img :src="item.image" class="w-full h-full rounded-t-lg shadow-sm" />
          <div class="flex items-center justify-around gap-5 p-2 text-center rounded-b-lg bg-tertiary">
            <img :src="item.logo" class="object-contain w-16 h-16" />
            <p class="text-base">{{ item.title }}</p>
          </div>
        </div>
      </div>

      <button
        @click="next"
        class="flex items-center justify-center p-2 transition border rounded-full shadow-lg cursor-pointer h-fit w-fit border-neutral-400 bg-tertiary hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:scale-110"
      >
        <Icon name="lucide:chevron-right" size="24" />
      </button>
    </div>

    <div class="flex flex-col items-center gap-5 md:hidden">
      <div class="overflow-hidden w-60">
        <div
          class="flex transition-transform duration-300 ease-in-out"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <div v-for="(item, index) in items" :key="index" class="flex flex-col gap-2 border rounded-lg shadow-sm w-60 h-100 shrink-0 bg-secondary border-neutral-300">
            <img :src="item.image" class="w-full h-full rounded-t-lg shadow-sm" />
            <div class="flex items-center justify-around gap-5 p-2 text-center rounded-b-lg bg-tertiary">
              <img :src="item.logo" class="object-contain w-16 h-16" />
              <p class="text-base">{{ item.title }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex gap-5">
      <button
        @click="prev"
        :disabled="currentIndex === 0"
        class="flex items-center justify-center p-2 transition border rounded-full shadow-lg cursor-pointer border-neutral-400 bg-tertiary hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:scale-110 disabled:opacity-50"
      >
        <Icon name="lucide:chevron-left" size="24" />
      </button>
      <button
        @click="next"
        :disabled="currentIndex === items.length - 1"
        class="flex items-center justify-center p-2 transition border rounded-full shadow-lg cursor-pointer border-neutral-400 bg-tertiary hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:scale-110 disabled:opacity-50"
      >
        <Icon name="lucide:chevron-right" size="24" />
      </button>
      </div>
    </div>
  </div>
</template>