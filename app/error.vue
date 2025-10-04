<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError,
})
</script>

<template>
  <div class="flex items-center justify-center flex-col h-screen gap-6">
    <h1 class="font-bold text-4xl">{{ error?.statusCode }}</h1>
    <p class="text-2xl text-neutral-300">{{ error?.statusMessage }}</p>
    <NuxtLink to="/">Kembali ke beranda</NuxtLink>
  </div>
</template>
