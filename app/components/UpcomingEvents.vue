<template>
  <div class="font-serif p-4 sm:p-6 md:p-8">
    <div class="max-w-5xl mx-auto">
      <div class="flex items-center mb-6">
        <div class="flex-grow border-t border-gray-400"></div>
        <h2 class="text-2xl font-bold mx-4 text-gray-800 tracking-widest">UPCOMING EVENTS</h2>
        <div class="flex-grow border-t border-gray-400"></div>
      </div>

      <div class="space-y-6">
        <EventCard
          v-for="event in events"
          :key="event.id"
          :date="event.date"
          :title="event.title"
          :details="event.details"
          :image-url="event.imageUrl"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import EventCard from './EventCard.vue';

const events = ref([
  {
    id: 1,
    date: 'Tanggal & Bulan',
    title: 'INI ADALAH NAMA EVENT / JUDUL EVENT',
    details: 'Hari, Jam • Tempat / Lokasi',
    imageUrl: '/images/placeholder.jpg',
  },
  {
    id: 2,
    date: '30 September',
    title: 'Community Tech Meetup',
    details: 'Sabtu, 14:00 • Gedung Inovasi / Lt. 3',
    imageUrl: '/images/placeholder.jpg',
  },
  {
    id: 3,
    date: '15 Oktober',
    title: 'Vue.js Workshop: The Next Level',
    details: 'Minggu, 09:00 • Ruang Seminar / Blok A',
    imageUrl: '/images/placeholder.jpg',
  },
]);
</script>