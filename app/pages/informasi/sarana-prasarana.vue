<script lang="ts" setup>
import { ref } from 'vue';

const searchQuery = ref('');
</script>

<template>
  <main>
    <section class="h-[550px] w-full bg-zinc-400 flex justify-center items-center">
      <div class="flex justify-center items-center">
        <h1 class="text-white font-bold text-4xl tracking-wider">Sarana Dan Prasarana</h1>
      </div>
    </section>

    <section class=" h-fit w-full flex justify-center items-center gap-2 flex-col">
      <div class="max-w-6xl w-full p-6 flex flex-col gap-6 mt-10">
        <h1 class="font-bold tracking-wide text-2xl">Sarana</h1>
        <p class="text-md border-l-blue-600 border-l-4 pl-6 py-4">ini adalah tempat dimana sejarah dari suatu organisasi di jelaskan jadi ini berisi penjelasan dari organisasi tertentu ini adalah tempat dimana sejarah dari suatu organisasi di jelaskan jadi ini berisi penjelasan dari organisasi tertentu ini adalah tempat dimana sejarah dari suatu organisasi di jelaskan jadi ini berisi penjelasan dari organisasi tertentu ini adalah tempat dimana sejarah dari suatu organisasi di jelaskan jadi ini berisi penjelasan dari organisasi tertentu  </p>
      </div>
      <div class="max-w-6xl w-full p-6 flex flex-col gap-6 mt-6">
        <h1 class="font-bold tracking-wide text-2xl">Prasarana</h1>
        <p class="text-md border-l-orange-600 border-l-4 pl-6 py-4">ini adalah tempat dimana sejarah dari suatu organisasi di jelaskan jadi ini berisi penjelasan dari organisasi tertentu ini adalah tempat dimana sejarah dari suatu organisasi di jelaskan jadi ini berisi penjelasan dari organisasi tertentu ini adalah tempat dimana sejarah dari suatu organisasi di jelaskan jadi ini berisi penjelasan dari organisasi tertentu ini adalah tempat dimana sejarah dari suatu organisasi di jelaskan jadi ini berisi penjelasan dari organisasi tertentu  </p>
      </div>
    </section>

    <section class="h-fit w-full flex flex-col justify-center items-center gap-4 py-12">
      <div class="max-w-6xl w-full mt-14">
        <h1 class="font-bold tracking-wider text-4xl text-center">Daftar Sarana dan Prasarana</h1>
      </div>
      <div class="flex justify-center items-center gap-4 mt-6">
        <div class="bg-zinc-200 rounded-lg py-4 px-6">
          <h2 class="font-bold tracking-wide">Sarana Pembelajaran</h2>
        </div>
        <div class="bg-zinc-200 rounded-lg py-4 px-6">
          <h2 class="font-bold tracking-wide">Sarana Infrastruktur</h2>
        </div>
      </div>

      <div class="flex justify-center items-center gap-4">
        <div class="font-serif py-4 px-4 sm:px-6 lg:px-8">
          <div class="w-[700px] mx-auto text-center">
            <div class="mt-8 relative">
              <div class="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Icon name="lucide:search" />
              </div>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search"
                class="w-full py-4 pl-14 pr-5 text-lg border-2 border-black rounded-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col justify-center items-center gap-6 max-w-6xl w-full mx-auto mt-8 px-4">
        <div 
          v-for="index in 3" 
          :key="index" 
          class="relative h-84 w-full rounded-lg overflow-hidden shadow-lg"
        >
          <img 
            src="/images/background-aula.jpg" 
            :alt="`Lingkup Kejuruan ${index}`"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-black/20 bg-opacity-40"></div>
          <div class="absolute top-6 left-6 z-10">
            <h2 class="text-white text-2xl md:text-3xl font-bold leading-tight">
              LINGKUP KERJA<br />
              SISWA KEJURUAN
            </h2>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>