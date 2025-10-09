<template>
  <div
    class="fixed inset-0 z-50 flex flex-col items-center justify-center p-8 font-serif text-white transition-opacity bg-neutral-800/95"
    @click.self="$emit('close')"
  >
    <div class="grid items-center w-full max-w-6xl grid-cols-1 gap-8 mx-auto md:grid-cols-3">
      <div class="text-center md:text-left">
        <p class="mb-2 text-xl text-neutral-300">{{ categoryTitle }}</p>
        <h3 class="text-4xl font-bold">{{ teacher.name }}, {{ teacher.degree }}</h3>
        <p class="mt-2 text-lg text-neutral-400">{{ teacher.university }}</p>
      </div>

      <div class="flex justify-center order-first md:order-none">
        <div class="flex items-center justify-center w-64 h-64 rounded-lg bg-neutral-200">
          <svg
            xmlns="http://www.w.org/2000/svg"
            class="w-32 h-32 text-neutral-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
      </div>

      <div class="text-center md:text-left">
        <h4 class="mb-3 text-3xl font-bold">Quote</h4>
        <p class="leading-relaxed text-neutral-300">"{{ teacher.quote }}"</p>
      </div>
    </div>

    <div class="absolute flex items-center space-x-4 bottom-10">
      <button
        @click="$emit('navigate', -1)"
        class="flex items-center justify-center p-3 transition-colors rounded-full bg-white/20 hover:bg-white/40"
      >
        <Icon name="lucide:chevron-left" size="18" class="text-neutral-400" />
      </button>
      <button
        @click="$emit('navigate', 1)"
        class="flex items-center justify-center p-3 transition-colors rounded-full bg-white/20 hover:bg-white/40"
      >
        <Icon name="lucide:chevron-right" size="18" class="text-neutral-400" />
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  teacher: Object,
  categoryTitle: String,
});

defineEmits(["close", "navigate"]);
</script>
