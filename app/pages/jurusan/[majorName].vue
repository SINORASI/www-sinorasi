<script lang="ts" setup>
import KaproCarousel from '~/components/Major/KaproCarousel.vue';
import { majorDatas } from '~/datas/data';
import type { MajorName } from '~/types/majorType';

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
                <h2 class="text-3xl font-bold">Prestasi</h2>
                <KaproCarousel />
            </div>
        </section>

        <section class="min-h-screen">
            <div class="flex justify-center items-center">
                <h1>Apa saja yang dipelajari di jurusan RPL?</h1>
                <div class="grid grid-cols-2 gap-2.5">
                    <div class="">

                    </div>
                </div>
            </div>
        </section>

        <section class="min-h-screen">
            <div class="flex justify-center flex-col items-center">
                <h1 class="font-bold text-4xl">Saat Lulus nanti punya kesempatan kerja jadi apa?</h1>
                <div class="flex justify-center items-center flex-col gap-4 mt-4.5">
                    <div class="bg-zinc-300 p-4 rounded-2xl flex justify-left items-center gap-2.5">
                        <img src="/images/logo.webp" width="60" alt="logo profesi">
                        <h2>Software Engineer</h2>
                    </div>
                    <div class="bg-zinc-300 p-4 rounded-2xl flex justify-left items-center gap-2.5">
                        <img src="/images/logo.webp" width="60" alt="logo profesi">
                        <h2>Web Developer</h2>
                    </div>
                    <div class="bg-zinc-300 p-4 rounded-2xl flex justify-left items-center gap-2.5">
                        <img src="/images/logo.webp" width="60" alt="logo profesi">
                        <h2>Data Analyst</h2>
                    </div>
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
            <div class="flex justify-center items-center ">
                <div class="">

                </div>
            </div>
        </section>
    </main>
</template>