<script lang="ts" setup>
import { ref } from 'vue';
import type { MajorName } from '~/models/MajorName';
import type { kaproProfile } from '~/models/kaproProfile';
import { majorDatas } from '~/datas/data';

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
            quote: 'Berusahalah untuk dirimu sendiri, karena itu dirimu sendiri'
        },
        {
            image: '/images/profile-placeholder.png',
            jabatan: 'Guru Produktif RPL',
            kaproName: 'RR. Henning Gratyanis A, S.Pd',
            quote: 'Kowe lapo ae hah, kelas 10 lapo ae'
        },
    ],
    tkj: [
        {
            image: '/images/profile-placeholder.png',
            jabatan: 'Kepala Jurusan Program TKJ',
            kaproName: 'Gayan Laga, S.Pd',
            quote: 'Jadilah dirimu sendiri selagi dirimu masih mengenali dirimu'
        },
        {
            image: '/images/profile-placeholder.png',
            jabatan: 'Guru Produktif TKJ',
            kaproName: 'Zulfa Rumailah, S.Pd',
            quote: 'Berusahalah untuk dirimu sendiri, karena itu dirimu sendiri'
        },
    ],
    dkv: [
        {
            image: '/images/profile-placeholder.png',
            jabatan: 'Kepala Jurusan Program DKV',
            kaproName: 'Zoulfikar Ramsanjanie Aqsha, S.Kom',
            quote: 'Jadilah dirimu sendiri selagi dirimu masih mengenali dirimu'
        },
        {
            image: '/images/profile-placeholder.png',
            jabatan: 'Guru Produktif DKV',
            kaproName: 'Ivan Satryana, S.Pd',
            quote: 'Berusahalah untuk dirimu sendiri, karena itu dirimu sendiri'
        },
    ],
    animasi: [
        {
            image: '/images/profile-placeholder.png',
            jabatan: 'Kepala Jurusan Program Animasi',
            kaproName: 'Dimas Maharendra Oktendima, S.Pd',
            quote: 'Jadilah dirimu sendiri selagi dirimu masih mengenali dirimu'
        },
        {
            image: '/images/profile-placeholder.png',
            jabatan: 'Guru Produktif Animasi',
            kaproName: 'Wardatul Maulidiyah, S.Pd',
            quote: 'Berusahalah untuk dirimu sendiri, karena itu dirimu sendiri'
        },
    ],
    broadcasting: [
        {
            image: '/images/profile-placeholder.png',
            jabatan: 'Kepala Jurusan Program Broadcasting',
            kaproName: 'Febrina Candra Cahyaning Dian, S.Sn',
            quote: 'Jadilah dirimu sendiri selagi dirimu masih mengenali dirimu'
        },
        {
            image: '/images/profile-placeholder.png',
            jabatan: 'Guru Produktif Broadcasting',
            kaproName: 'Sofianasari, S.Sn',
            quote: 'Berusahalah untuk dirimu sendiri, karena itu dirimu sendiri'
        },
    ],
    tei: [
        {
            image: '/images/profile-placeholder.png',
            jabatan: 'Kepala Jurusan Program TEI',
            kaproName: 'Mokhamad Amrul Sadat, ST, M.Pd',
            quote: 'Jadilah dirimu sendiri selagi dirimu masih mengenali dirimu'
        },
        {
            image: '/images/profile-placeholder.png',
            jabatan: 'Guru Produktif TEI',
            kaproName: 'Anjar Afif Afandi, ST, M.Pd',
            quote: 'Berusahalah untuk dirimu sendiri, karena itu dirimu sendiri'
        },
    ],
    mekatronika: [
        {
            image: '/images/profile-placeholder.png',
            jabatan: 'Kepala Jurusan Program Mekatronika',
            kaproName: 'Hermawan, ST, M.Pd',
            quote: 'Jadilah dirimu sendiri selagi dirimu masih mengenali dirimu'
        },
        {
            image: '/images/profile-placeholder.png',
            jabatan: 'Guru Produktif Mekatronika',
            kaproName: 'Anjar Afif Afandi, ST, M.Pd',
            quote: 'Berusahalah untuk dirimu sendiri, karena itu dirimu sendiri'
        },
    ],
    tav: [
        {
            image: '/images/profile-placeholder.png',
            jabatan: 'Kepala Jurusan Program TAV',
            kaproName: 'Falkudin, S.T',
            quote: 'Jadilah dirimu sendiri selagi dirimu masih mengenali dirimu sendiri'
        },
        {
            image: '/images/profile-placeholder.png',
            jabatan: 'Guru Produktif TAV',
            kaproName: 'Drs. H. Ahmad Maksum, M.Pd',
            quote: 'Berusahalah untuk dirimu sendiri, karena itu dirimu sendiri'
        },
    ],
};

const route = useRoute();
const major = route.params.majorName as MajorName;
const kapro = kapros[major] || [];

const current = ref(0);
const direction = ref('next');

const prev = () => {
  direction.value = 'prev';
  current.value = (current.value - 1 + kapro.length) % kapro.length;
}

const next = () => {
  direction.value = 'next';
  current.value = (current.value + 1) % kapro.length;
}

const getTransitionClasses = () => {
  if (direction.value === 'next') {
    return {
      enterFrom: 'opacity-0 transform translate-x-8',
      enterTo: 'opacity-100 transform translate-x-0',
      leaveFrom: 'opacity-100 transform translate-x-0',
      leaveTo: 'opacity-0 transform -translate-x-8'
    }
  } else {
    return {
      enterFrom: 'opacity-0 transform -translate-x-8',
      enterTo: 'opacity-100 transform translate-x-0',
      leaveFrom: 'opacity-100 transform translate-x-0',
      leaveTo: 'opacity-0 transform translate-x-8'
    }
  }
}
</script>

<template>
  <div class="w-full max-w-sm md:w-250 md:max-w-none flex flex-col gap-5 rounded-lg p-4 md:p-8 relative mx-auto">
    <div class="rounded-lg bg-zinc-200/20 p-4 flex justify-center items-center">
        <Transition 
            name="slide" 
            mode="out-in"
            enter-active-class="transition-all duration-500 ease-out"
            :enter-from-class="getTransitionClasses().enterFrom"
            :enter-to-class="getTransitionClasses().enterTo"
            leave-active-class="transition-all duration-500 ease-in"
            :leave-from-class="getTransitionClasses().leaveFrom"
            :leave-to-class="getTransitionClasses().leaveTo"
          >
            <h1 :key="current" class="font-bold tracking-wider text-2xl">{{ kapro[current]?.jabatan }}</h1>
        </Transition>
    </div>
    <div class="flex items-center gap-4 w-full">
        <button 
        @click="prev"
        :class="`border-neutral-400 border cursor-pointer bg-neutral-300 p-2 flex items-center justify-center rounded-full shadow-lg transition hover: hover:text-white hover:scale-110 flex-shrink-0 ${majorDatas[major]?.btnColor}`"
      >
        <Icon name="lucide:chevron-left" size="24" />
      </button>

      <div class="flex justify-center w-48 md:w-60">
        <Transition 
          name="slide" 
          mode="out-in"
          enter-active-class="transition-all duration-500 ease-out"
          :enter-from-class="getTransitionClasses().enterFrom"
          :enter-to-class="getTransitionClasses().enterTo"
          leave-active-class="transition-all duration-500 ease-in"
          :leave-from-class="getTransitionClasses().leaveFrom"
          :leave-to-class="getTransitionClasses().leaveTo"
        >
          <img 
            :key="current"
            :src="kapro[current]?.image" 
            class="w-48 md:w-60 rounded-lg" 
            alt="Kapro Tool"
          />
        </Transition>
      </div>

      <button 
        @click="next" 
        :class="`border-neutral-400 border cursor-pointer bg-neutral-300 p-2 flex items-center justify-center rounded-full shadow-lg transition hover:text-white hover:scale-110 flex-shrink-0 ${majorDatas[major]?.btnColor}`"
      >
        <Icon name="lucide:chevron-right" size="24" />
      </button>

      <div class="flex justify-center items-center flex-1 ml-8 bg-zinc-200/20 p-6 rounded-lg h-75">
        <Transition 
          name="slide" 
          mode="out-in"
          enter-active-class="transition-all duration-500 ease-out"
          :enter-from-class="getTransitionClasses().enterFrom"
          :enter-to-class="getTransitionClasses().enterTo"
          leave-active-class="transition-all duration-500 ease-in"
          :leave-from-class="getTransitionClasses().leaveFrom"
          :leave-to-class="getTransitionClasses().leaveTo"
        >
          <p 
            :key="current"
            class="tracking-wide font-bold text-lg text-center max-w-md"
          >
            {{ kapro[current]?.quote }}
          </p>
        </Transition>
      </div>
    </div>
    
    <div class="flex justify-between items-center py-3 ml-5">
      <div class="flex gap-5">
        <div class="text-center p-4 rounded-lg bg-zinc-200/20 w-[320px]">
          <Transition 
            name="slide" 
            mode="out-in"
            enter-active-class="transition-all duration-500 ease-out"
            :enter-from-class="getTransitionClasses().enterFrom"
            :enter-to-class="getTransitionClasses().enterTo"
            leave-active-class="transition-all duration-500 ease-in"
            :leave-from-class="getTransitionClasses().leaveFrom"
            :leave-to-class="getTransitionClasses().leaveTo"
          >
          <h2 :key="current" class="font-bold tracking-wide">
            {{ kapro[current]?.kaproName }}
          </h2>
          </Transition>
        </div>
      </div>
      <div class="flex items-center justify-center mr-10">
        <h3 class="text-2xl font-bold">
          0{{ current + 1 }}/0{{ kapro.length }}
        </h3>
      </div>
    </div>
  </div>
</template>