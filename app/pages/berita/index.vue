<script setup lang="ts">
useHead({
  title: 'Berita - SMKN 2 Singosari',
  meta: [
    {
      name: 'description',
      content: 'Berita terbaru dan informasi terkini dari SMK Negeri 2 Singosari'
    }
  ]
});
</script>

<template>
  <div class="container mx-auto px-6 py-12">
    <hot-news />
    <upcoming-events/>
    <search-not-found />
  </div>
</template>