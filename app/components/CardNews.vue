<script lang="ts" setup>
defineProps(['title', 'description', 'image'])
</script>

<template>
    <div class="relative w-80 h-80 bg-white rounded-lg shadow-sm overflow-hidden group cursor-pointer">
        <img src="/images/placeholder.jpg" width="auto" height="auto" class="w-full h-full object-cover" alt="Placeholder">
        <div class="absolute bottom-0 left-0 right-0 p-4 transition-transform duration-500 group-hover:-translate-y-8">
            <p class="font-bold text-white transition-transform duration-500 group-hover:-translate-y-2">{{ title }}</p>
            <p class="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 mt-2">{{ description }}</p>
        </div>
    </div>
</template>
