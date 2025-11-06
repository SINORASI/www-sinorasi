<template>
  <motion.div
    class="fixed inset-0 z-9999 flex flex-col items-center justify-center p-4 md:p-8 font-serif text-white bg-neutral-800/95"
    @click.self="$emit('close')"
    :whileInView="{ opacity: 1 }"
    :transition="{ duration: 0.3 }"
    :inViewOptions="{ once: true }"
  >
    <motion.div
      class="grid items-center w-full max-w-6xl grid-cols-1 gap-6 md:gap-8 mx-auto md:grid-cols-3"
      :whileInView="{ scale: 1, opacity: 1 }"
      :transition="{ duration: 0.3, delay: 0.1 }"
      :inViewOptions="{ once: true }"
    >
      <div class="text-center md:text-left">
        <p class="mb-2 text-lg md:text-xl text-neutral-300">{{ categoryTitle }}</p>
        <h3 class="text-2xl md:text-3xl lg:text-4xl font-bold">{{ teacher.degree ? `${teacher.name}, ${teacher.degree}` : teacher.name }}</h3>
        <p class="mt-2 text-base md:text-lg text-neutral-400">{{ teacher.university }}</p>
      </div>

      <div class="flex justify-center order-first md:order-0">
        <div
          class="flex items-center justify-center w-48 h-48 md:w-64 md:h-64 rounded-lg bg-neutral-200 overflow-hidden"
        >
          <img :src="teacher.image" :alt="teacher.name" class="object-cover w-full h-full" loading="lazy" decoding="async" />
        </div>
      </div>

      <div class="text-center md:text-left">
        <h4 class="mb-3 text-xl md:text-2xl lg:text-3xl font-bold">Quote</h4>
        <p class="leading-relaxed text-neutral-300 text-sm md:text-base">"{{ teacher.quote }}"</p>
      </div>
    </motion.div>

    <div class="absolute flex items-center space-x-3 md:space-x-4 bottom-6 md:bottom-10">
      <button
        @click="$emit('navigate', -1)"
        class="flex items-center justify-center p-2 md:p-3 transition-colors rounded-full bg-white/20 hover:bg-white/40"
      >
        <Icon name="lucide:chevron-left" size="16 md:18" class="text-neutral-400" />
      </button>
      <button
        @click="$emit('navigate', 1)"
        class="flex items-center justify-center p-2 md:p-3 transition-colors rounded-full bg-white/20 hover:bg-white/40"
      >
        <Icon name="lucide:chevron-right" size="16 md:18" class="text-neutral-400" />
      </button>
    </div>
  </motion.div>
</template>

<script setup>
import { motion } from "motion-v";

defineProps({
  teacher: Object,
  categoryTitle: String,
});

defineEmits(["close", "navigate"]);
</script>
