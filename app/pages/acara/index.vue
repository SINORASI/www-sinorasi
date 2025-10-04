<script setup lang="ts">
useHead({
  title: 'Acara - SMKN 2 Singosari',
  meta: [
    {
      name: 'description',
      content: 'Daftar acara dan kegiatan yang akan datang di SMK Negeri 2 Singosari'
    }
  ]
});
</script>

<template>
  <div class="container mx-auto px-6 py-12">
    <upcoming-events />
  </div>
</template>