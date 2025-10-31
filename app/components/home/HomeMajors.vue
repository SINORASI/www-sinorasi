<script setup lang="ts">
import { motion } from "motion-v";
</script>

<template>
  <motion.section
    id="jurusan"
    class="relative flex flex-col items-center gap-8 py-20 overflow-hidden"
    :initial="{ opacity: 0, y: 50 }"
    :whileInView="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.8 }"
    :inViewOptions="{ once: true }"
  >
    <motion.div
      class="inline-block relative z-10"
      :initial="{ opacity: 0, scale: 0.8 }"
      :animate="{ opacity: 1, scale: 1 }"
      :transition="{ duration: 0.6, delay: 0.2 }"
      :inViewOptions="{ once: true }"
    >
      <span
        class="px-8 py-3 text-xl font-bold tracking-widest uppercase rounded-full md:text-2xl bg-blue-700 text-white"
      >
        Jurusan
      </span>
    </motion.div>
    <div class="container flex items-center justify-center mx-auto relative z-10">
      <MajorCarousel />
    </div>
  </motion.section>
</template>
