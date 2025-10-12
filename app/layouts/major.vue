<script lang="ts" setup>
import MajorHeader from "~/components/Major/layout/MajorHeader.vue";
import AppFooter from "~/components/layout/AppFooter.vue";
import type { MajorName } from "~/models/MajorName";
import { majorColorSchemes } from "~/utils/majorColors";

const route = useRoute();
const major = (route.params.majorName as MajorName) || (route.path.split("/").pop() as MajorName);
const majorColor = majorColorSchemes[major];
</script>

<template>
  <div
    class="flex flex-col min-h-screen major-layout"
    :style="`background: linear-gradient(135deg, ${majorColor.primary}08, ${majorColor.accent}08)`"
  >
    <MajorHeader />
    <div class="flex-1">
      <slot />
    </div>
    <AppFooter :bg-color="majorColor.primary" class="mt-auto" />
  </div>
</template>
