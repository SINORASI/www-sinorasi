<script lang="ts" setup>
import { ref } from 'vue';
import type { MajorName, kaproProfile } from '~/types/majorType';

const kapros: Record<MajorName, kaproProfile[]> =  {
    rpl: [
        {
            image: '/images/profile-placeholder.png',
            jabatan: 'Kepala Jurusan Program RPL',
            kaproName: 'Alifah Diantebes Aindra, S.Pd',
            quote: 'Jadilah dirimu sendiri selagi dirimu masih mengenali dirimu'
        },
        {
            image: '/images/profile-placeholder.png',
            jabatan: 'Guru Produktif RPL',
            kaproName: 'Zulkifli Abdillah, S.Kom',
            quote: 'Jadilah dirimu sendiri selagi dirimu masih mengenali dirimu'
        },
        {
            image: '/images/profile-placeholder.png',
            jabatan: 'Kepala Jurusan Program RPL',
            kaproName: 'RR. Henning Gratyanis A, S.Pd',
            quote: 'Jadilah dirimu sendiri selagi dirimu masih mengenali dirimu'
        },
    ],
    tkj: [
        {
            image: '/images/profile-placeholder.png',
            jabatan: 'Kepala Jurusan Program TKJ',
            kaproName: 'Gayan Laga, S.Pd',
            quote: 'Jadilah dirimu sendiri selagi dirimu masih mengenali dirimu'
        },
    ],
    dkv: [
        {
            image: '/images/profile-placeholder.png',
            jabatan: 'Kepala Jurusan Program DKV',
            kaproName: 'Alifah Diantebes Aindra, S.Pd',
            quote: 'Jadilah dirimu sendiri selagi dirimu masih mengenali dirimu'
        },
    ],
    animasi: [
        {
            image: '/images/profile-placeholder.png',
            jabatan: 'Kepala Jurusan Program Animasi',
            kaproName: 'Alifah Diantebes Aindra, S.Pd',
            quote: 'Jadilah dirimu sendiri selagi dirimu masih mengenali dirimu'
        },
    ],
    broadcasting: [
        {
            image: '/images/profile-placeholder.png',
            jabatan: 'Kepala Jurusan Program Broadcasting',
            kaproName: 'Alifah Diantebes Aindra, S.Pd',
            quote: 'Jadilah dirimu sendiri selagi dirimu masih mengenali dirimu'
        },
    ],
    tei: [
        {
            image: '/images/profile-placeholder.png',
            jabatan: 'Kepala Jurusan Program TEI',
            kaproName: 'Alifah Diantebes Aindra, S.Pd',
            quote: 'Jadilah dirimu sendiri selagi dirimu masih mengenali dirimu'
        }
    ],
    mekatronika: [
        {
            image: '/images/profile-placeholder.png',
            jabatan: 'Kepala Jurusan Program Mekatronika',
            kaproName: 'Alifah Diantebes Aindra, S.Pd',
            quote: 'Jadilah dirimu sendiri selagi dirimu masih mengenali dirimu'
        }
    ],
    tav: [
        {
            image: '/images/profile-placeholder.png',
            jabatan: 'Kepala Jurusan Program TAV',
            kaproName: 'Alifah Diantebes Aindra, S.Pd',
            quote: 'Jadilah dirimu sendiri selagi dirimu masih mengenali dirimu sendiri'
        }
    ],
};

const route = useRoute();
const major = route.params.majorName as MajorName;
const kapro = kapros[major] || [];

const current = ref(0);

const prev = () => {
    current.value = (current.value - 1 + kapro.length) % kapro.length;
}

const next = () => {
    current.value = (current.value + 1) % kapro.length;
}
</script>

<template>
    <div class="flex justify-between">
      <div class="flex gap-5">
        <button @click="prev" class="border-neutral-400 border-1 cursor-pointer bg-neutral-300 p-2 flex items-center justify-center rounded-full shadow-lg transition hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:scale-110">
          <Icon name="lucide:chevron-left" size="24" />
        </button>
        <button @click="next" class="border-neutral-400 border-1 cursor-pointer bg-neutral-300 p-2 flex items-center justify-center rounded-full shadow-lg transition hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:scale-110">
          <Icon name="lucide:chevron-right" size="24" />
        </button>
      </div>
    </div>
</template>