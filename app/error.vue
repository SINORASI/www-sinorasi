<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: {
    type: Object as () => NuxtError,
    required: true,
  },
});

const handleError = () => {
  clearError({ redirect: "/" });
};

const pageTitle = computed(() => (props.error.statusCode === 404 ? "Halaman Tidak Ditemukan" : "Terjadi Kesalahan"));
const errorMessage = computed(() =>
  props.error.statusCode === 404
    ? "Maaf, kami tidak dapat menemukan halaman yang Anda cari."
    : "Terjadi kesalahan tak terduga. Silakan coba lagi nanti."
);
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-slate-50">
    <Motion
      :initial="{ y: -20, opacity: 0 }"
      :animate="{ y: 0, opacity: 1 }"
      :transition="{ duration: 0.5, ease: 'easeOut' }"
      class="w-full max-w-md p-8 mx-4 space-y-6 text-center bg-white border rounded-lg shadow-lg border-slate-200"
    >
      <div>
        <h1 class="text-6xl font-bold text-orange-500">
          {{ error.statusCode }}
        </h1>
        <h2 class="mt-4 text-2xl font-semibold text-slate-800">
          {{ pageTitle }}
        </h2>
        <p class="mt-2 text-slate-600">
          {{ errorMessage }}
        </p>
      </div>

      <div class="flex items-center justify-center">
        <Icon v-if="error.statusCode === 404" name="lucide:search-x" class="w-24 h-24 text-orange-400" />
        <Icon v-else name="lucide:server-crash" class="w-24 h-24 text-red-500" />
      </div>

      <button
        @click="handleError"
        class="inline-flex items-center justify-center px-6 py-3 font-medium text-white transition-colors duration-300 bg-blue-600 rounded-lg shadow-md gap-x-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Icon name="lucide:arrow-left" class="w-5 h-5" />
        Kembali ke Beranda
      </button>
    </Motion>
  </div>
</template>
