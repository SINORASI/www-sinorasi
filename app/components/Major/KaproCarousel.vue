<script lang="ts" setup>
import { ref } from "vue";
import type { MajorName } from "~/models/MajorName";
import type { KaproProfile } from "~/models/KaproProfile";
import type { MajorData } from "~/models/MajorData";

// Fetch majors data from API
const { data: majorDatas } = await useFetch<Record<MajorName, MajorData>>('/api/majors');

const kapros: Record<MajorName, KaproProfile[]> = {
  rpl: [
    {
      image: "/images/profile-placeholder.png",
      jabatan: "Kepala Jurusan Program RPL",
      kaproName: "Alifah Diantebes Aindra, S.Pd",
      quote: "Jadilah dirimu sendiri selagi dirimu masih mengenali dirimu",
    },
    {
      image: "/images/profile-placeholder.png",
      jabatan: "Guru Produktif RPL",
      kaproName: "Zulkifli Abdillah, S.Kom",
      quote: "Berusahalah untuk dirimu sendiri, karena itu dirimu sendiri",
    },
    {
      image: "/images/profile-placeholder.png",
      jabatan: "Guru Produktif RPL",
      kaproName: "RR. Henning Gratyanis A, S.Pd",
      quote: "Berusahalah untuk dirimu sendiri, karena itu dirimu sendiri",
    },
  ],
  tkj: [
    {
      image: "/images/profile-placeholder.png",
      jabatan: "Kepala Jurusan Program TKJ",
      kaproName: "Gayan Laga, S.Pd",
      quote: "Jadilah dirimu sendiri selagi dirimu masih mengenali dirimu",
    },
    {
      image: "/images/profile-placeholder.png",
      jabatan: "Guru Produktif TKJ",
      kaproName: "Zulfa Rumailah, S.Pd",
      quote: "Berusahalah untuk dirimu sendiri, karena itu dirimu sendiri",
    },
  ],
  dkv: [
    {
      image: "/images/profile-placeholder.png",
      jabatan: "Kepala Jurusan Program DKV",
      kaproName: "Zoulfikar Ramsanjanie Aqsha, S.Kom",
      quote: "Jadilah dirimu sendiri selagi dirimu masih mengenali dirimu",
    },
    {
      image: "/images/profile-placeholder.png",
      jabatan: "Guru Produktif DKV",
      kaproName: "Ivan Satryana, S.Pd",
      quote: "Berusahalah untuk dirimu sendiri, karena itu dirimu sendiri",
    },
  ],
  animasi: [
    {
      image: "/images/profile-placeholder.png",
      jabatan: "Kepala Jurusan Program Animasi",
      kaproName: "Dimas Maharendra Oktendima, S.Pd",
      quote: "Jadilah dirimu sendiri selagi dirimu masih mengenali dirimu",
    },
    {
      image: "/images/profile-placeholder.png",
      jabatan: "Guru Produktif Animasi",
      kaproName: "Wardatul Maulidiyah, S.Pd",
      quote: "Berusahalah untuk dirimu sendiri, karena itu dirimu sendiri",
    },
  ],
  broadcasting: [
    {
      image: "/images/profile-placeholder.png",
      jabatan: "Kepala Jurusan Program Broadcasting",
      kaproName: "Febrina Candra Cahyaning Dian, S.Sn",
      quote: "Jadilah dirimu sendiri selagi dirimu masih mengenali dirimu",
    },
    {
      image: "/images/profile-placeholder.png",
      jabatan: "Guru Produktif Broadcasting",
      kaproName: "Sofianasari, S.Sn",
      quote: "Berusahalah untuk dirimu sendiri, karena itu dirimu sendiri",
    },
  ],
  tei: [
    {
      image: "/images/profile-placeholder.png",
      jabatan: "Kepala Jurusan Program TEI",
      kaproName: "Mokhamad Amrul Sadat, ST, M.Pd",
      quote: "Jadilah dirimu sendiri selagi dirimu masih mengenali dirimu",
    },
    {
      image: "/images/profile-placeholder.png",
      jabatan: "Guru Produktif TEI",
      kaproName: "Anjar Afif Afandi, ST, M.Pd",
      quote: "Berusahalah untuk dirimu sendiri, karena itu dirimu sendiri",
    },
  ],
  mekatronika: [
    {
      image: "/images/profile-placeholder.png",
      jabatan: "Kepala Jurusan Program Mekatronika",
      kaproName: "Hermawan, ST, M.Pd",
      quote: "Jadilah dirimu sendiri selagi dirimu masih mengenali dirimu",
    },
    {
      image: "/images/profile-placeholder.png",
      jabatan: "Guru Produktif Mekatronika",
      kaproName: "Anjar Afif Afandi, ST, M.Pd",
      quote: "Berusahalah untuk dirimu sendiri, karena itu dirimu sendiri",
    },
  ],
  tav: [
    {
      image: "/images/profile-placeholder.png",
      jabatan: "Kepala Jurusan Program TAV",
      kaproName: "Falkudin, S.T",
      quote: "Jadilah dirimu sendiri selagi dirimu masih mengenali dirimu sendiri",
    },
    {
      image: "/images/profile-placeholder.png",
      jabatan: "Guru Produktif TAV",
      kaproName: "Drs. H. Ahmad Maksum, M.Pd",
      quote: "Berusahalah untuk dirimu sendiri, karena itu dirimu sendiri",
    },
  ],
};

const route = useRoute();
const major = route.params.majorName as MajorName;
const kapro = kapros[major] || [];

const current = ref(0);
const direction = ref("next");

const prev = () => {
  direction.value = "prev";
  current.value = (current.value - 1 + kapro.length) % kapro.length;
};

const next = () => {
  direction.value = "next";
  current.value = (current.value + 1) % kapro.length;
};

const getTransitionClasses = () => {
  if (direction.value === "next") {
    return {
      enterFrom: "opacity-0 transform translate-x-full",
      enterTo: "opacity-100 transform translate-x-0",
      leaveFrom: "opacity-100 transform translate-x-0",
      leaveTo: "opacity-0 transform -translate-x-full",
    };
  } else {
    return {
      enterFrom: "opacity-0 transform -translate-x-full",
      enterTo: "opacity-100 transform translate-x-0",
      leaveFrom: "opacity-100 transform translate-x-0",
      leaveTo: "opacity-0 transform translate-x-full",
    };
  }
};
</script>

<template>
  <div class="w-full max-w-5xl mx-auto px-4 py-6">
    <div class="bg-white rounded-xl overflow-hidden">
      
      <!-- Grid Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 p-5 lg:p-8">
        
        <!-- Left: Image Section -->
        <div class="flex flex-col items-center space-y-4">
          <!-- Position Badge -->
          <Transition
            name="fade"
            mode="out-in"
            enter-active-class="transition-opacity duration-300"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-200"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div 
              :key="current"
              :class="[
                'px-5 py-1.5 rounded-full font-bold text-xs sm:text-sm',
                majorDatas?.[major]?.bgColor || 'bg-orange-500'
              ]"
            >
              {{ kapro[current]?.jabatan }}
            </div>
          </Transition>

          <!-- Profile Image -->
          <div class="relative w-56 sm:w-64 aspect-[3/4]">
            <div class="absolute inset-0 rounded-lg overflow-hidden shadow-md bg-gray-200">
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
                  :alt="kapro[current]?.kaproName"
                  class="w-full h-full object-cover"
                />
              </Transition>
            </div>
          </div>

          <!-- Name -->
          <Transition
            name="fade"
            mode="out-in"
            enter-active-class="transition-opacity duration-300"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-200"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <h2 :key="current" class="text-lg sm:text-xl font-bold text-gray-900 text-center px-2">
              {{ kapro[current]?.kaproName }}
            </h2>
          </Transition>
        </div>

        <!-- Right: Quote Section -->
        <div class="flex flex-col justify-between min-h-[350px]">
          
          <!-- Quote -->
          <div class="flex-1 flex items-center justify-center p-4">
            <Transition
              name="fade"
              mode="out-in"
              enter-active-class="transition-opacity duration-400"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
              leave-active-class="transition-opacity duration-300"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <div :key="current" class="text-center">
                <div 
                  :class="[
                    'w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4',
                    majorDatas?.[major]?.bgColor || 'bg-orange-500'
                  ]"
                >
                  <Icon name="lucide:quote" class="w-5 h-5 text-white" />
                </div>
                <p class="text-xl sm:text-2xl font-medium text-gray-800 leading-relaxed">
                  {{ kapro[current]?.quote }}
                </p>
              </div>
            </Transition>
          </div>

          <!-- Navigation -->
          <div class="space-y-3">
            <!-- Dots -->
            <div class="flex justify-center items-center gap-2">
              <button
                v-for="(item, idx) in kapro"
                :key="idx"
                @click="current = idx"
                :class="[
                  'h-1.5 rounded-full transition-all duration-300',
                  current === idx ? 'w-10' : 'w-1.5',
                  current === idx 
                    ? (majorDatas?.[major]?.bgColor || 'bg-orange-500')
                    : 'bg-gray-300 hover:bg-gray-400'
                ]"
                :aria-label="`Go to profile ${idx + 1}`"
              ></button>
            </div>

            <!-- Buttons -->
            <div class="flex items-center justify-between">
              <button
                @click="prev"
                :class="[
                  'flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300',
                  'bg-gray-100 hover:bg-gray-200 text-gray-700'
                ]"
                aria-label="Previous"
              >
                <Icon name="lucide:chevron-left" class="w-4 h-4" />
                <span class="text-xs sm:text-sm">Prev</span>
              </button>

              <div class="flex items-baseline gap-1">
                <span 
                  :class="[
                    'text-xl font-bold',
                    majorDatas?.[major]?.textColor || 'text-orange-500'
                  ]"
                >
                  {{ String(current + 1).padStart(2, '0') }}
                </span>
                <span class="text-base text-gray-400">
                  /{{ String(kapro.length).padStart(2, '0') }}
                </span>
              </div>

              <button
                @click="next"
                :class="[
                  'flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300',
                  'bg-gray-100 hover:bg-gray-200 text-gray-700'
                ]"
                aria-label="Next"
              >
                <span class="text-xs sm:text-sm">Next</span>
                <Icon name="lucide:chevron-right" class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>