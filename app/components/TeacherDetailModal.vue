<template>
  <div
    class="fixed inset-0 z-50 bg-neutral-800/95 flex flex-col items-center justify-center p-8 font-serif text-white transition-opacity"
    @click.self="$emit('close')"
  >
    <div class="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-8">
      <!-- Left: Details -->
      <div class="text-center md:text-left">
        <!-- The category title is now dynamic -->
        <p class="text-xl text-neutral-300 mb-2">{{ categoryTitle }}</p>
        <h3 class="text-4xl font-bold">{{ teacher.name }}, {{ teacher.degree }}</h3>
        <p class="text-lg text-neutral-400 mt-2">{{ teacher.university }}</p>
      </div>

      <!-- Center: Photo -->
      <div class="flex justify-center order-first md:order-none">
        <div class="w-64 h-64 bg-neutral-200 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w.org/2000/svg" class="h-32 w-32 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
        </div>
      </div>

      <!-- Right: Quote -->
      <div class="text-center md:text-left">
        <h4 class="text-3xl font-bold mb-3">Quote</h4>
        <p class="text-neutral-300 leading-relaxed">"{{ teacher.quote }}"</p>
      </div>
    </div>

    <!-- Bottom Navigation -->
    <div class="absolute bottom-10 flex items-center space-x-4">
      <button @click="$emit('navigate', -1)" class="p-3 bg-white/20 rounded-full hover:bg-white/40 transition-colors">
        <svg xmlns="http://www.w.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button @click="$emit('navigate', 1)" class="p-3 bg-white/20 rounded-full hover:bg-white/40 transition-colors">
        <svg xmlns="http://www.w.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  teacher: Object,
  categoryTitle: String,
});

defineEmits(['close', 'navigate']);
</script>