<script setup lang="ts">
definePageMeta({
  layout: "default",
  keepalive: false,
});

useHead({
  title: "Beranda - SMKN 2 Singosari",
  meta: [
    {
      name: "description",
      content:
        "SMK Negeri 2 Singosari - INORASI (Inovasi Raih Prestasi). Tempat di mana inovasi bertemu dengan prestasi melalui pendidikan kejuruan berkualitas.",
    },
  ],
});
</script>

<template>
  <main class="flex flex-col gap-52">
    <LazyHomeHero />
    <LazyHomeProfile />
    <LazyHomeWelcome />
    <LazyHomeAchievements />
    <LazyHomeUniforms />
    <LazyHomeTimeline />
    <LazyHomeMajors />
    <LazyHomeNews />
    <LazyFAQSection />
    <HomeBackToTop />
  </main>
</template>