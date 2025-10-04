<script setup lang="ts">
interface DaySchedule {
  day: string;
  dayName: string;
  status: 'LATIHAN' | 'LIBUR';
  time?: string;
}

const weekSchedule = ref<DaySchedule[]>([
  {
    day: 'SENIN',
    dayName: 'Senin',
    status: 'LATIHAN',
    time: '15.00 - 17.00'
  },
  {
    day: 'SELASA',
    dayName: 'Selasa',
    status: 'LIBUR',
    time: '15.00 - 17.00'
  },
  {
    day: 'RABU',
    dayName: 'Rabu',
    status: 'LIBUR',
    time: '15.00 - 17.00'
  },
  {
    day: 'KAMIS',
    dayName: 'Kamis',
    status: 'LATIHAN',
    time: '15.00 - 17.00'
  },
  {
    day: 'JUMAT',
    dayName: 'Jumat',
    status: 'LIBUR',
    time: '15.00 - 17.00'
  },
  {
    day: 'SABTU',
    dayName: 'Sabtu',
    status: 'LATIHAN',
    time: '15.00 - 17.00'
  },
  {
    day: 'MINGGU',
    dayName: 'Minggu',
    status: 'LIBUR',
    time: '15.00 - 17.00'
  }
]);

const getCardClass = (status: string) => {
  return status === 'LATIHAN' 
    ? 'bg-green-300 border-green-400' 
    : 'bg-white border-gray-300';
};

const getTextClass = (status: string) => {
  return status === 'LATIHAN' ? 'text-black' : 'text-black';
};
</script>

<template>
  <div class="py-50 min-h-screen bg-gray-50 p-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Jadwal Latihan Ekstrakurikuler Basket</h1>
        <p class="text-gray-600">SMK Negeri 02 Singosari</p>
      </div>

      <!-- Week Schedule Grid -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div 
          v-for="day in weekSchedule" 
          :key="day.day"
          class="rounded-lg border-2 shadow-md overflow-hidden transition-transform hover:scale-105"
          :class="getCardClass(day.status)"
        >
          <!-- Day Header -->
          <div class="text-center py-2 px-4 border-b-2" :class="day.status === 'LATIHAN' ? 'border-green-400' : 'border-gray-300'">
            <h3 class="text-sm font-semibold" :class="getTextClass(day.status)">
              {{ day.day }}
            </h3>
          </div>

          <!-- Status -->
          <div class="text-center py-6">
            <p class="text-3xl font-bold" :class="getTextClass(day.status)">
              {{ day.status }}
            </p>
          </div>

          <!-- Time -->
          <div class="text-center py-2 px-4 border-t-2" :class="day.status === 'LATIHAN' ? 'border-green-400' : 'border-gray-300'">
            <p class="text-xs font-medium" :class="getTextClass(day.status)">
              Jam Pertemuan
            </p>
            <p class="text-sm font-semibold" :class="getTextClass(day.status)">
              {{ day.time }}
            </p>
          </div>
        </div>
      </div>

      <!-- Legend or Notes (Optional) -->
      <div class="mt-8 flex gap-4 justify-center">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 bg-green-300 border-2 border-green-400 rounded"></div>
          <span class="text-sm text-gray-700">Hari Latihan</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 bg-white border-2 border-gray-300 rounded"></div>
          <span class="text-sm text-gray-700">Hari Libur</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Additional custom styles if needed */
</style>