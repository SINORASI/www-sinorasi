<script lang="ts" setup>
    import MajorHeader from '~/components/Major/MajorHeader.vue';
    import AppFooter from '~/components/layout/AppFooter.vue';
</script>

<template>
    <div>
        <MajorHeader />
        <slot />
        <AppFooter />
    </div>
</template>