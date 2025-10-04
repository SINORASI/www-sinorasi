<script setup lang="ts">
const route = useRoute();
const orgName = route.params.organisasi as string;

// Capitalize first letter for display
const displayName = orgName.charAt(0).toUpperCase() + orgName.slice(1);

useHead({
  title: `${displayName} - Organisasi - SMKN 2 Singosari`,
  meta: [
    {
      name: 'description',
      content: `Informasi lengkap tentang organisasi ${displayName} di SMK Negeri 2 Singosari`
    }
  ]
});
</script>

<template>
    <section id="hero" class="py-50 h-fit">
        <div class="flex flex-col gap-20">
            <div class="mx-auto flex items-center gap-20 justify-center">
                <img src="/images/logo.webp" class="w-50 h-50" alt="Logo WEBP">
                <h2 class="font-bold text-4xl">Ambalan</h2>
            </div>
            <div class="text-center bg-neutral-300 w-full grid grid-cols-4 p-10">
                <div class="flex flex-col gap-3">
                    <p class="font-bold text-3xl">50+</p>
                    <p class="font-bold text-4xl">Anggota</p>
                </div>
                <div class="flex flex-col gap-3">
                    <p class="font-bold text-3xl">50+</p>
                    <p class="font-bold text-4xl">Anggota</p>
                </div>
                <div class="flex flex-col gap-3">
                    <p class="font-bold text-3xl">50+</p>
                    <p class="font-bold text-4xl">Anggota</p>
                </div>
                <div class="flex flex-col gap-3">
                    <p class="font-bold text-3xl">50+</p>
                    <p class="font-bold text-4xl">Anggota</p>
                </div>
            </div>
        </div>
    </section>
    <section class="py-50 h-min-screen">
        <div class="flex flex-col gap-8 items-center justify-center container mx-auto">
            <h2 class="font-bold text-3xl">Apa Sih Nama Tim Paskibra SMK Negeri 2 Singosari</h2>
            <button class="cursor-pointer font-semibold py-2 px-4 border border-gray-400 rounded shadow">Klik Di Sini!</button>
            <p class="text-base">
                ini adalah tempat dimana sejarah dari suatu organisasi di jelaskan jadi ini berisi penjelasan dari organisasi tertentu ini adalah tempat dimana sejarah dari suatu organisasi di jelaskan jadi ini berisi penjelasan dari organisasi tertentu ini adalah tempat dimana sejarah dari suatu organisasi di jelaskan jadi ini berisi penjelasan dari organisasi tertentu ini adalah tempat dimana sejarah dari suatu organisasi di jelaskan jadi ini berisi penjelasan dari organisasi tertentu  
            </p>
            <div class="flex flex-col gap-5">
                <h3 class="font-bold text-2xl">SEJARAH SINGKAT</h3>
                <p class="text-base">
                ini adalah tempat dimana sejarah dari suatu organisasi di jelaskan jadi ini berisi penjelasan dari organisasi tertentu ini adalah tempat dimana sejarah dari suatu organisasi di jelaskan jadi ini berisi penjelasan dari organisasi tertentu ini adalah tempat dimana sejarah dari suatu organisasi di jelaskan jadi ini berisi penjelasan dari organisasi tertentu ini adalah tempat dimana sejarah dari suatu organisasi di jelaskan jadi ini berisi penjelasan dari organisasi tertentu  
                </p>
            </div>
            <div class="flex flex-col gap-3">
                <h3 class="font-bold text-2xl">Struktur Organisasi</h3>
            </div>
        </div>
    </section>
    <section class="py-30 h-min-screen">
        <div class="gap-5 grid grid-cols-2 container mx-auto">
            <ActivityCard />
            <ActivityCard />
            <ActivityCard />
            <ActivityCard />
        </div>
    </section>
    <section class="py-30 h-screen">
        <div class="container mx-auto flex flex-col items-center justify-center gap-5">
            <h2 class="text-center font-bold text-3xl">INFORMASI PEDAFTARAN PASKIBRA SMK NEGERI 2 SINGOSARI</h2>
        </div>
    </section>
</template>