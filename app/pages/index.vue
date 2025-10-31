<script setup lang="ts">
definePageMeta({
  layout: "default",
  keepalive: false,
});

const showContent = ref(false);

onMounted(() => {
  console.log('index.vue onMounted called');
  requestAnimationFrame(() => {
    console.log('Setting showContent to true');
    showContent.value = true;
  });
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
  <main v-if="showContent" class="flex flex-col gap-52">
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