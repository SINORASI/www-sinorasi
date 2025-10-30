<template>
  <NuxtLink :to="`/acara/${event.slug}`" class="block">
    <div
      :class="['flex items-center justify-between py-8 bg-secondary', direction === 'right' ? 'flex-row-reverse' : '']"
    >
      <div class="flex flex-col justify-between h-full pr-12">
        <div>
          <p class="text-lg font-semibold text-gray-700">{{ event.date }}</p>
        </div>
        <div class="my-5">
          <h3 class="text-4xl font-bold leading-tight text-gray-900">
            {{ event.title }}
          </h3>
        </div>
        <div>
          <p class="text-base text-gray-600">{{ event.details }}</p>
        </div>
      </div>

      <div class="shrink-0">
        <NuxtImg :src="event.imageUrl" alt="Event Image" class="object-cover w-64 h-64 shadow-lg rounded-xl" loading="lazy" placeholder="blur" />
      </div>
    </div>

    <div class="border-t border-gray-400"></div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Event } from "~/models/Event";

defineProps<{
  event: Event;
  direction?: string;
}>();
</script>
