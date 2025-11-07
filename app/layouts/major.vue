<script lang="ts" setup>
import type { MajorName } from "~/models/MajorName";
import { majorColorSchemes } from "~/utils/majorColors";
import MajorHeader from "~/components/Major/layout/MajorHeader.vue";
import { provideMinigameState } from "~/composables/useMinigameState";

const route = useRoute();

const major = computed(() => (route.params.majorName as MajorName) || (route.path.split("/").pop() as MajorName));
const majorColor = computed(() => majorColorSchemes[major.value]);

// Provide minigame state for all child components
provideMinigameState();

const isTransitioning = ref(false);

watch(route, (newRoute, oldRoute) => {
  if (oldRoute && newRoute.path !== oldRoute.path) {
    isTransitioning.value = true;
    setTimeout(() => {
      isTransitioning.value = false;
    }, 400);
  }
});

const backgroundStyle = computed(() => {
  if (isTransitioning.value) {
    return "background: transparent";
  }
  return `background: linear-gradient(135deg, ${majorColor.value.primary}08, ${majorColor.value.accent}08)`;
});
</script>

<template>
  <div class="major-layout">
    <MajorHeader />
    <div class="flex-1">
      <slot />
    </div>
    <LayoutAppFooter :bg-color="majorColor.primary" class="mt-auto" />
  </div>
</template>
