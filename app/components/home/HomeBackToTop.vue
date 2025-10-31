<script setup lang="ts">
import { motion, AnimatePresence } from "motion-v";
import { smoothScrollTo } from "~/utils/scrollUtils";
import { useThrottledScroll } from "~/utils/eventHelpers";

const showBackToTop = ref(false);

const handleScroll = () => {
  const scrollTop = window.scrollY;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollThreshold = documentHeight * 0.2;
  showBackToTop.value = scrollTop > scrollThreshold;
};

useThrottledScroll(handleScroll, 150);

const scrollToTop = () => {
  smoothScrollTo(0);
};
</script>

<template>
  <AnimatePresence>
    <motion.button
      v-if="showBackToTop"
      @click="scrollToTop"
      class="fixed z-50 flex items-center justify-center bottom-8 right-8 w-14 h-14 rounded-full shadow-lg bg-linear-to-br from-blue-500 to-blue-700 hover:scale-110 transition-transform group"
      :initial="{ opacity: 0, y: 20 }"
      :animate="{ opacity: 1, y: 0 }"
      :exit="{ opacity: 0, y: 20 }"
      :transition="{ duration: 0.3, ease: 'easeInOut' }"
      aria-label="Back to top"
    >
      <svg
        class="w-6 h-6 text-white transition-transform group-hover:-translate-y-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </motion.button>
  </AnimatePresence>
</template>
