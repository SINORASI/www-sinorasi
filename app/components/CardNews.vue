<script lang="ts" setup>
defineProps(['title', 'description', 'image'])
</script>

<template>
    <div class="relative w-80 h-80 shadow-sm overflow-hidden group cursor-pointer">
        <img src="/images/placeholder.jpg" width="auto" height="auto" class="h-full object-cover" alt="Placeholder">
        <div class="absolute text-center justify-center left-0 right-0 top-0 h-full p-4 bg-neutral-300/80 transform translate-y-full transition-all duration-500 ease-in-out group-hover:translate-y-0 group-hover:bg-neutral-300/90">
            <p class="font-bold text-neutral-700 mb-2">{{ title }}</p>
            <p class="text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">{{ description }}</p>
        </div>
    </div>
</template>