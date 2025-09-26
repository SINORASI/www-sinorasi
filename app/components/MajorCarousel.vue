<template>
  <div class="w-fit flex flex-col gap-5 items-center rounded-lg">
    <div class="hidden md:flex gap-5 items-center">
      <button
        @click="prev"
        class="h-fit w-fit border-neutral-400 flex items-center justify-center border cursor-pointer bg-tertiary p-2 items-center justify-center rounded-full shadow-lg transition hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:scale-110"
      >
        <Icon name="lucide:chevron-left" size="24" />
      </button>

      <div ref="carouselContainer" class="overflow-hidden flex md:gap-5 gap-0 snap-x snap-mandatory max-w-[1020px]">
        <div v-for="(item, index) in items" :key="index" class="flex flex-col gap-2 w-60 h-100 snap-center shrink-0 bg-secondary rounded-lg shadow-sm border border-neutral-300">
          <img :src="item.image" class="h-full w-full rounded-t-lg shadow-sm" />
          <div class="flex p-2 justify-around gap-5 items-center text-center bg-tertiary rounded-b-lg">
            <img :src="item.logo" class="w-16 h-16 object-contain" />
            <p class="text-base">{{ item.title }}</p>
          </div>
        </div>
      </div>

      <button
        @click="next"
        class="h-fit w-fit border-neutral-400 border flex items-center justify-center cursor-pointer bg-tertiary p-2 items-center justify-center rounded-full shadow-lg transition hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:scale-110"
      >
        <Icon name="lucide:chevron-right" size="24" />
      </button>
    </div>

    <div class="md:hidden flex flex-col items-center gap-5">
      <div class="overflow-hidden w-60">
        <div
          class="flex transition-transform duration-300 ease-in-out"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <div v-for="(item, index) in items" :key="index" class="flex flex-col gap-2 w-60 h-100 shrink-0 bg-secondary rounded-lg shadow-sm border border-neutral-300">
            <img :src="item.image" class="h-full w-full rounded-t-lg shadow-sm" />
            <div class="flex p-2 justify-around gap-5 items-center text-center bg-tertiary rounded-b-lg">
              <img :src="item.logo" class="w-16 h-16 object-contain" />
              <p class="text-base">{{ item.title }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex gap-5">
      <button
        @click="prev"
        :disabled="currentIndex === 0"
        class="border-neutral-400 border flex items-center justify-center cursor-pointer bg-tertiary p-2 items-center justify-center rounded-full shadow-lg transition hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:scale-110 disabled:opacity-50"
      >
        <Icon name="lucide:chevron-left" size="24" />
      </button>
      <button
        @click="next"
        :disabled="currentIndex === items.length - 1"
        class="border-neutral-400 border cursor-pointer bg-tertiary flex items-center justify-center p-2 items-center justify-center rounded-full shadow-lg transition hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:scale-110 disabled:opacity-50"
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
const carouselContainer = ref(null);

function next() {
  if (carouselContainer.value) {
    const maxScroll = carouselContainer.value.scrollWidth - carouselContainer.value.clientWidth;
    if (carouselContainer.value.scrollLeft < maxScroll) {
      carouselContainer.value.scrollTo({ left: carouselContainer.value.scrollLeft + 1020, behavior: 'smooth' });
    }
  }
  if (currentIndex.value < items.length - 1) {
    currentIndex.value++;
  }
}

function prev() {
  if (carouselContainer.value) {
    if (carouselContainer.value.scrollLeft > 0) {
      carouselContainer.value.scrollTo({ left: carouselContainer.value.scrollLeft - 1020, behavior: 'smooth' });
    }
  }
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
}
</script>
