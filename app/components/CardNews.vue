<script lang="ts" setup>
defineProps(['title', 'image'])
</script>

<template>
    <div class="relative w-80 h-80 shadow-sm">
        <img src="/images/placeholder.jpg" width="auto" height="auto" class="h-full object-cover" alt="Placeholder">
        <div class="absolute text-center justify-center left-0 right-0 bottom-0 p-4 bg-neutral-300/80">
            <p class="font-bold text-neutral-700">{{ title }}</p>
        </div>
    </div>
</template>