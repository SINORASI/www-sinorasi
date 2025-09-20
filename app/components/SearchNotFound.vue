<template>
  <div class="bg-gray-100 font-serif py-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl mx-auto text-center">
      <!-- Main Heading -->
      <h2 class="text-3xl font-bold text-gray-900 tracking-wide">
        BERITA YANG KAMU CARI ENGGAK ADA?
      </h2>

      <!-- Subheading -->
      <p class="mt-4 text-xl text-gray-600">
        Coba cari, mungkin aja ada
      </p>

      <!-- Search Bar -->
      <div class="mt-8 relative">
        <div class="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <!-- Search Icon SVG -->
          <svg
            class="h-6 w-6 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search"
          class="w-full py-4 pl-14 pr-5 text-lg border-2 border-black rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// A ref to hold the search input value
const searchQuery = ref('');
</script>