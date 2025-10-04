<script lang="ts" setup>
import KaproCarousel from "~/components/Major/KaproCarousel.vue";
import type { MajorName } from "~/models/MajorName";
import type { MajorData } from "~/models/MajorData";
import ReferenceCareers from "~/components/Major/ReferenceCareers.vue";
import MajorTopics from "~/components/Major/MajorTopics.vue";
import MajorPartnerSlider from "~/components/Major/MajorPartnerSlider.vue";

definePageMeta({
  layout: "major",
});

const route = useRoute();
const major = route.params.majorName as MajorName;

// Fetch majors data from API
const { data: majorDatas } = await useFetch<Record<MajorName, MajorData>>('/api/majors');

// Set dynamic page title
useHead({
  title: () => majorDatas.value?.[major]?.nameMajor ? `${majorDatas.value[major].nameMajor} - SMKN 2 Singosari` : 'Jurusan - SMKN 2 Singosari',
  meta: [
    {
      name: 'description',
      content: () => majorDatas.value?.[major]?.nameMajor ? `Informasi lengkap tentang jurusan ${majorDatas.value[major].nameMajor} di SMK Negeri 2 Singosari` : 'Jurusan di SMK Negeri 2 Singosari'
    }
  ]
});
</script>

<template>
  <main class="overflow-x-hidden">
    <section id="tentang-jurusan" class="min-h-screen flex flex-col items-center justify-center md:gap-15 gap-8 px-4 pt-24 md:pt-20 pb-10">
      <div class="flex md:flex-row flex-col justify-center items-center gap-4">
        <img :src="majorDatas[major]?.logo" alt="logo jurusan" class="md:w-70 w-20" />
        <h2 class="font-bold text-4xl tracking-wider text-center">{{ majorDatas[major]?.nameMajor }}</h2>
      </div>

      <hr class="border-1 border-zinc-200 max-w-4xl w-full" />

      <div class="flex md:max-w-4xl max-w-lg w-full p-2">
        <p class="text-center tracking-wide break-words">
          di poin ini akan di jelaskan sedikt tentang jurusan {{ majorDatas[major]?.short }},
          {{ majorDatas[major]?.short }} tuh ngapain aja sih dll. di poin ini akan di jelaskan sedikt tentang jurusan
          {{ majorDatas[major]?.short }}, {{ majorDatas[major]?.short }} tuh ngapain aja sih dll. di poin ini akan di
          jelaskan sedikt tentang jurusan {{ majorDatas[major]?.short }}, {{ majorDatas[major]?.short }} tuh ngapain aja
          sih dll. di poin ini akan di jelaskan sedikt tentang jurusan {{ majorDatas[major]?.short }},
          {{ majorDatas[major]?.short }} tuh ngapain aja sih dll
        </p>
      </div>
    </section>

    <section id="kepala-program" class="min-h-screen">
      <div class="container mx-auto flex flex-col items-center gap-5 px-4">
        <KaproCarousel />
      </div>
    </section>

    <section id="materi-pembelajaran" class="min-h-screen">
      <div class="flex justify-center items-center flex-col gap-4.5 px-4">
        <div class="w-full">
          <MajorTopics />
        </div>
      </div>
    </section>

    <section id="kesempatan-kerja" class="min-h-screen">
      <div class="flex justify-center flex-col items-center px-4">
        <h2 class="font-bold text-2xl md:text-4xl text-center">Saat Lulus nanti punya kesempatan kerja jadi apa?</h2>
        <div class="flex justify-center items-center flex-col mt-8 w-full">
          <ReferenceCareers />
        </div>
      </div>
    </section>

    <section id="mitra-kerja" class="min-h-screen">
      <div class="flex justify-center items-center px-4">
        <div class="flex flex-col justify-center items-center gap-2.5 w-full">
          <MajorPartnerSlider />
        </div>
      </div>
    </section>

    <section id="minigame" class="min-h-screen">
      <div class="flex justify-center items-center flex-col gap-4.5 px-4">
        <h2 class="tracking-wide font-bold text-2xl md:text-4xl text-center">Minigame</h2>
        <div
          class="flex justify-center items-center max-w-6xl w-full h-64 md:h-84 bg-zinc-500 p-4 md:p-6 rounded-lg mx-auto"
        >
          <h1 class="text-white text-center">Minigame {{ majorDatas[major]?.short }}</h1>
        </div>
      </div>
    </section>

    <section id="prestasi" class="min-h-screen">
      <div class="flex justify-center items-center flex-col px-4">
        <div class="flex justify-center items-center flex-col gap-4 mt-8 w-full">
          <MajorAchievement />
        </div>
      </div>
    </section>
  </main>
</template>
