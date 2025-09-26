<template>
  <NuxtLink :to="`/acara/${event.slug}`" class="block">
    <div :class="['flex items-center justify-between py-8 bg-secondary', direction === 'right' ? 'flex-row-reverse' : '']">
      <!-- Event Details -->
      <div class="flex flex-col h-full justify-between pr-12">
        <div>
          <p class="text-lg font-semibold text-gray-700">{{ event.date }}</p>
        </div>
        <div class="my-5">
          <h3 class="text-4xl font-bold text-gray-900 leading-tight">
            {{ event.title }}
          </h3>
        </div>
        <div>
          <p class="text-base text-gray-600">{{ event.details }}</p>
        </div>
      </div>

      <!-- Event Image -->
      <div class="flex-shrink-0">
        <img
          :src="event.imageUrl"
          alt="Event Image"
          class="w-64 h-64 object-cover rounded-xl shadow-lg"
        />
      </div>
    </div>
    <!-- Bottom Separator -->
    <div class="border-t border-gray-400"></div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Event } from '~/models/Event';

defineProps<{
  event: Event;
  direction?: string;
}>();
</script>