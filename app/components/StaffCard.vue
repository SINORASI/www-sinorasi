<template>
  <div class="flex flex-col">
    <img :src="staff.image" class="w-50 h-50 rounded-lg shadow-sm" :alt="staff.name" />
    <div class="flex flex-col items-center">
      <p class="font-bold text-base">{{ staff.name }}</p>
      <p class="text-base">{{ staff.position }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Staff } from '../models/Staff';

defineProps<{
  staff: Staff;
}>();
</script>