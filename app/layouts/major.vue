<script lang="ts" setup>
import MajorHeader from "~/components/Major/layout/MajorHeader.vue";
import AppFooter from "~/components/layout/AppFooter.vue";
</script>

<template>
  <div class="bg-primary">
    <MajorHeader />
    <slot />
    <AppFooter />
  </div>
</template>
