<template>
  <div class="font-serif py-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl mx-auto text-center">
      <h2 class="text-3xl font-bold text-gray-900 tracking-wide">
        BERITA YANG KAMU CARI ENGGAK ADA?
      </h2>

      <p class="mt-4 text-xl text-gray-600">
        Coba cari, mungkin aja ada
      </p>

      <div class="mt-8 relative">
        <div class="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <Icon name="lucide:search" />
        </div>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search"
          class="w-full py-4 pl-14 pr-5 text-lg border-2 border-black rounded-full focus:border-transparent"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const searchQuery = ref('');
</script>