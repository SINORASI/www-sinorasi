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
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        class="absolute w-80 h-80 rounded-full bg-cyan-200 blur-3xl opacity-20"
        :initial="{ x: -50, y: -20 }"
        :animate="{ x: 80, y: 80 }"
        :transition="{ duration: 20, repeat: Infinity, repeatType: 'reverse' }"
        :whileInView="{ opacity: 1 }"
      ></motion.div>
      <motion.div
        class="absolute w-72 h-72 rounded-full bg-indigo-200 blur-3xl opacity-20 right-0 top-1/2"
        :initial="{ x: 50, y: -20 }"
        :animate="{ x: -80, y: 80 }"
        :transition="{ duration: 20, repeat: Infinity, repeatType: 'reverse' }"
        :whileInView="{ opacity: 1 }"
      ></motion.div>
    </div>
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
