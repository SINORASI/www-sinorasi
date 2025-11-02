<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useNuxtApp } from '#app';

const nuxtApp = useNuxtApp();
const loading = ref(true);

nuxtApp.hook('page:loading:end', () => {
  loading.value = false;
});

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

  ogUrl: "https://smkn2-singosari.sch.id",
  twitterCard: "summary_large_image",
});

watch(loading, (isLoading) => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = isLoading ? 'hidden' : '';
  }
});
</script>

<template>
  <div>
    <Transition name="loading">
      <div v-if="loading" class="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-linear-to-br from-slate-50 via-blue-50 to-slate-100">
        <img src="/images/logo-smk.webp" alt="SMK Negeri 2 Singosari" class="w-48 h-48 mb-4" />
        <p class="text-xl text-gray-600">Loading...</p>
      </div>
    </Transition>
    <div v-show="!loading">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
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

.loading-enter-active,
.loading-leave-active {
  transition: opacity 1s ease;
}

.loading-enter-from,
.loading-leave-to {
  opacity: 0;
}

.loading-enter-to,
.loading-leave-from {
  opacity: 1;
}
</style>
