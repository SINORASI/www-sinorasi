<script lang="ts" setup>
import type { MajorName } from '~/types/majorType';
import type { careerProps } from '~/types/majorType';

const CareerJobs: Record<MajorName, careerProps[]> = {
    rpl: [
        { image: '/images/logo.webp', title: 'Software Engineer' },
        { image: '/images/logo.webp', title: 'Web Developer' },
        { image: '/images/logo.webp', title: 'Data Analyst' },
        { image: '/images/logo.webp', title: 'Frontend Developer' },
        { image: '/images/logo.webp', title: 'Backend Developer' },
    ],
    tkj: [
        { image: '/images/logo.webp', title: 'Software Engineer' },
        { image: '/images/logo.webp', title: 'Web Developer' },
        { image: '/images/logo.webp', title: 'Data Analyst' },
        { image: '/images/logo.webp', title: 'Frontend Developer' },
        { image: '/images/logo.webp', title: 'Backend Developer' },
    ],
    dkv: [
        { image: '/images/logo.webp', title: 'Software Engineer' },
        { image: '/images/logo.webp', title: 'Web Developer' },
        { image: '/images/logo.webp', title: 'Data Analyst' },
        { image: '/images/logo.webp', title: 'Frontend Developer' },
        { image: '/images/logo.webp', title: 'Backend Developer' },
    ],
    animasi: [
        { image: '/images/logo.webp', title: 'Software Engineer' },
        { image: '/images/logo.webp', title: 'Web Developer' },
        { image: '/images/logo.webp', title: 'Data Analyst' },
        { image: '/images/logo.webp', title: 'Frontend Developer' },
        { image: '/images/logo.webp', title: 'Backend Developer' },
    ],
    broadcasting: [
        { image: '/images/logo.webp', title: 'Software Engineer' },
        { image: '/images/logo.webp', title: 'Web Developer' },
        { image: '/images/logo.webp', title: 'Data Analyst' },
        { image: '/images/logo.webp', title: 'Frontend Developer' },
        { image: '/images/logo.webp', title: 'Backend Developer' },
    ],
    tei: [
        { image: '/images/logo.webp', title: 'Software Engineer' },
        { image: '/images/logo.webp', title: 'Web Developer' },
        { image: '/images/logo.webp', title: 'Data Analyst' },
        { image: '/images/logo.webp', title: 'Frontend Developer' },
        { image: '/images/logo.webp', title: 'Backend Developer' },
    ],
    mekatronika: [
        { image: '/images/logo.webp', title: 'Software Engineer' },
        { image: '/images/logo.webp', title: 'Web Developer' },
        { image: '/images/logo.webp', title: 'Data Analyst' },
        { image: '/images/logo.webp', title: 'Frontend Developer' },
        { image: '/images/logo.webp', title: 'Backend Developer' },
    ],
    tav: [
        { image: '/images/logo.webp', title: 'Software Engineer' },
        { image: '/images/logo.webp', title: 'Web Developer' },
        { image: '/images/logo.webp', title: 'Data Analyst' },
        { image: '/images/logo.webp', title: 'Frontend Developer' },
        { image: '/images/logo.webp', title: 'Backend Developer' },
    ],
}

const route = useRoute();
const major = route.params.majorName as MajorName;

</script>

<template>
    <div class="flex justify-center items-center flex-col gap-2.5">
        <div class="max-w-6xl w-full grid grid-cols-2 gap-4.5">
            <div class="bg-gray-500 rounded-2xl px-4 py-3 flex justify-left items-center gap-2.5">
                <!-- <img :src="CareerJobs[]" alt=""> -->
            </div>
        </div>
    </div>
</template>