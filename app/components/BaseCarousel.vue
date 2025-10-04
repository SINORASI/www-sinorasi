<template>
  <div class="rounded-lg p-8 bg-neutral-100">
    <div class="relative overflow-hidden">
      <div
        class="flex transition-transform duration-300"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div
          v-for="(_, index) in slidesCount"
          :key="index"
          class="flex-shrink-0 w-full flex gap-5 items-center justify-center h-130"
        >
          <slot :name="`slide-${index}`" :index="index" />
        </div>
      </div>

      <button
        @click="prev"
        class="border-neutral-400 left-0 absolute top-60 m-5 border-1 cursor-pointer bg-neutral-300 p-2 flex items-center justify-center rounded-full transition hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:scale-110"
      >
        <Icon name="lucide:chevron-left" size="24" />
      </button>
      <button
        @click="next"
        class="absolute right-0 top-60 border-neutral-400 m-5 border-1 cursor-pointer bg-neutral-300 p-2 flex items-center justify-center rounded-full transition hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:scale-110"
      >
        <Icon name="lucide:chevron-right" size="24" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, useSlots } from 'vue'

const slots = useSlots()
const currentIndex = ref(0)

const slidesCount = computed(() => {
  return Object.keys(slots).filter(key => key.startsWith('slide-')).length
})

const next = () => {
  if (currentIndex.value < slidesCount.value - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0 
  }
}

const prev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = slidesCount.value - 1
  }
}
</script>