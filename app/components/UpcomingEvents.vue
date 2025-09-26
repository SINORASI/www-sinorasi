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
          v-for="(event, index) in eventData"
          :key="event.id"
          :event="event"
          :direction="index % 2 === 0 ? 'left' : 'right'"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { eventData } from '~/datas/data';
</script>