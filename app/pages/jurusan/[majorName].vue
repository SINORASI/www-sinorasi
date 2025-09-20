<script lang="ts" setup>
import KaproCarousel from '~/components/Major/KaproCarousel.vue';
import { majorDatas } from '~/datas/data';
import type { MajorName } from '~/models/MajorName';
import ReferenceJob from '~/components/Major/ReferenceJob.vue';
import MajorTopics from '~/components/Major/MajorTopics.vue';

definePageMeta({
    layout: 'major'
});

const route = useRoute();
const major = route.params.majorName as MajorName;

</script>

<template>
    <main>
        <section class="min-h-screen flex flex-col items-center justify-center md:gap-15 gap-8 px-4 pt-24 md:pt-20 pb-10">
            <div class="flex md:flex-row flex-col justify-center items-center gap-4">
                <img :src="majorDatas[major]?.logo" alt="logo jurusan" class="md:w-70 w-20">
                <h1 class="font-bold text-4xl tracking-wider text-center">{{ majorDatas[major]?.nameMajor }}</h1>
            </div>

            <hr class="border-1 border-zinc-200 max-w-4xl w-full">

            <div class="flex md:max-w-4xl max-w-lg w-full p-2">
                <p class="text-center tracking-wide break-words">di poin ini akan di jelaskan sedikt tentang jurusan RPL, RPL tuh ngapain aja sih dll. di poin ini akan di jelaskan sedikt tentang jurusan RPL, RPL tuh ngapain aja sih dll. di poin ini akan di jelaskan sedikt tentang jurusan RPL, RPL tuh ngapain aja sih dll. di poin ini akan di jelaskan sedikt tentang jurusan RPL, RPL tuh ngapain aja sih dll</p>
            </div>
        </section>

        <section class="min-h-screen">
            <div class="container mx-auto flex flex-col items-center gap-5">
                <KaproCarousel />
            </div>
        </section>

        <section class="min-h-screen">
            <div class="flex justify-center items-center flex-col gap-4.5">
                <h1 class="text-3xl font-bold text-center mb-12 text-gray-800">Apa saja yang dipelajari di jurusan RPL?</h1>
                <div>
                    <MajorTopics />
                </div>
            </div>
        </section>

        <section class="min-h-screen">
            <div class="flex justify-center flex-col items-center">
                <h1 class="font-bold text-4xl">Saat Lulus nanti punya kesempatan kerja jadi apa?</h1>
                <div class="flex justify-center items-center flex-col mt-8">
                    <ReferenceJob />
                </div>
            </div>
        </section>

        <section class="min-h-screen">
            <div class="flex justify-center items-center">
                <h1 class="text-4xl font-bold tracking-wide">Bekerja Sama Dengan Industri Berikut</h1>
                <div class="flex flex-col justify-center items-center gap-2.5">
                    
                </div>
            </div>
        </section>

        <section class="min-h-screen">
            <div class="flex justify-center items-center flex-col gap-4.5">
                <h1 class="tracking-wide font-bold text-4xl">Minigame</h1>
                <div class="flex justify-center items-center max-w-6xl w-full h-84 bg-zinc-500 p-6 rounded-lg">
                    <h1 class="text-white">Minigame RPL</h1>
                </div>
            </div>
        </section>

        <section class="min-h-screen">
            <div class="flex justify-center items-center flex-col">
                <div class="flex justify-center items-center flex-col gap-4 mt-8">
                    <MajorAchievement />
                </div>
            </div>
        </section>
    </main>
</template>