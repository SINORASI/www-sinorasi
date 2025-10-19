<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - SMK Negeri 2 Singosari` : "SMK Negeri 2 Singosari";
  },
});

useSeoMeta({
  title: "Sinorasi - SMK Negeri 2 Singosari",
  description:
    "Selamat datang di website resmi SMK Negeri 2 Singosari, pusat pendidikan vokasi unggulan yang siap membentuk generasi masa depan yang kompeten dan siap bersaing di dunia industri.",
  ogTitle: "Sinorasi - SMK Negeri 2 Singosari",
  ogDescription:
    "Selamat datang di website resmi SMK Negeri 2 Singosari, pusat pendidikan vokasi unggulan yang siap membentuk generasi masa depan yang kompeten dan siap bersaing di dunia industri.",
  // ogImage: '/images/og-image.jpg',
  ogUrl: "https://smkn2-singosari.sch.id",
  twitterCard: "summary_large_image",
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.6s ease-in-out, filter 0.6s ease-in-out;
}
.page-enter-from {
  opacity: 0;
  filter: blur(1rem);
}
.page-enter-to {
  opacity: 1;
  filter: blur(0);
}
.page-leave-from {
  opacity: 1;
  filter: blur(0);
}
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
