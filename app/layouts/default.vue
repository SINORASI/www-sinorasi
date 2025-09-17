<script lang="ts" setup>
    import AppHeader from '~/components/layout/AppHeader.vue';
    import AppFooter from '~/components/layout/AppFooter.vue';
</script>

<template>
    <div>
        <AppHeader />
        <slot/>
        <AppFooter />
    </div>
</template>