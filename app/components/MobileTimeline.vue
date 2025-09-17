<template>
  <div class="relative flex flex-col items-center py-10">
    <!-- Vertical line in center -->
    <div class="absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-600 h-full top-0"></div>
    <div v-for="(item, index) in timelineItems" :key="index" class="relative flex flex-col items-center mb-12 w-full max-w-md">
      <!-- Card -->
      <div class="bg-white shadow-lg rounded-lg p-6 w-full text-center">
        <div :class="['px-3 py-1 rounded-full w-fit mb-4 mx-auto', index % 2 === 0 ? 'bg-blue-100' : 'bg-orange-100']">
          <span :class="['font-bold', index % 2 === 0 ? 'text-blue-600' : 'text-orange-600']">{{ item.year }}</span>
        </div>
        <h3 class="text-xl font-bold text-gray-800 mb-2">{{ item.title }}</h3>
        <p class="text-gray-600 text-sm">{{ item.description }}</p>
      </div>
      <!-- Icon at bottom of card -->
      <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md mt-4 z-10">
        <Icon :name="item.icon" size="20" class="text-blue-600" />
      </div>
      <!-- Connecting line to next -->
      <div v-if="index < timelineItems.length - 1" class="w-1 h-8 bg-blue-600 mt-4"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  timelineItems: Array<{
    year: string
    title: string
    description: string
    icon: string
  }>
}>()
</script>