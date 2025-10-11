<script lang="ts" setup>
import { ref, computed } from "vue";
import type { MajorName } from "~/models/MajorName";
import type { KaproProfile } from "~/models/KaproProfile";
import type { MajorData } from "~/models/MajorData";
import { majorColorSchemes } from "~/utils/majorColors";

const props = defineProps<{
  major?: MajorName;
}>();

// Fetch majors data from API
const { data: majorDatas } = await useFetch<Record<MajorName, MajorData>>("/api/majors");

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
      kaproName: "Chutman Efendi, S.Pd, Gr",
      quote: "Jadilah dirimu sendiri selagi dirimu masih mengenali dirimu",
    },
    {
      image: "/images/profile-placeholder.png",
      jabatan: "Guru Produktif TKJ",
      kaproName: "Gayan Laga, S.Pd",
      quote: "Jadilah dirimu sendiri selagi dirimu masih mengenali dirimu",
    },
    {
      image: "/images/profile-placeholder.png",
      jabatan: "Guru Produktif TKJ",
      kaproName: "Zulfa Rumailah, S.Pd",
      quote: "Berusahalah untuk dirimu sendiri, karena itu dirimu sendiri",
    },
    {
      image: "/images/profile-placeholder.png",
      jabatan: "Guru Produktif TKJ",
      kaproName: "Imam Syafi'i, S.Pd",
      quote: "Berusahalah untuk dirimu sendiri, karena itu dirimu sendiri",
    },
  ],
  dkv: [
    {
      image: "/images/profile-placeholder.png",
      jabatan: "Kepala Jurusan Program DKV",
      kaproName: "Ivan Satryana, S.Pd",
      quote: "Jadilah dirimu sendiri selagi dirimu masih mengenali dirimu",
    },
    {
      image: "/images/profile-placeholder.png",
      jabatan: "Guru Produktif DKV",
      kaproName: "Zoulfikar Ramsanjanie Aqsha, S.Kom",
      quote: "Berusahalah untuk dirimu sendiri, karena itu dirimu sendiri",
    },
    {
      image: "/images/profile-placeholder.png",
      jabatan: "Guru Produktif DKV",
      kaproName: "Mira Ayu, S.Pd",
      quote: "Berusahalah untuk dirimu sendiri, karena itu dirimu sendiri",
    },
    {
      image: "/images/profile-placeholder.png",
      jabatan: "Guru Produktif DKV",
      kaproName: "Nurrudin Septiawan, S.Kom",
      quote: "Berusahalah untuk dirimu sendiri, karena itu dirimu sendiri",
    },
    {
      image: "/images/profile-placeholder.png",
      jabatan: "Guru Produktif DKV",
      kaproName: "Aang Noeraries Wahyupidasa, S.Si",
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
    {
      image: "/images/profile-placeholder.png",
      jabatan: "Guru Produktif Animasi",
      kaproName: "Moh. Khamdan Syaifuddin, A.Md",
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
    {
      image: "/images/profile-placeholder.png",
      jabatan: "Guru Produktif Broadcasting",
      kaproName: "Fauzi Rahmadani, S.Sn",
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
    {
      image: "/images/profile-placeholder.png",
      jabatan: "Guru Produktif TEI",
      kaproName: "Bambang Ishartanto, ST",
      quote: "Berusahalah untuk dirimu sendiri, karena itu dirimu sendiri",
    },
    {
      image: "/images/profile-placeholder.png",
      jabatan: "Guru Produktif TEI",
      kaproName: "Dyah Ayu Komala, ST",
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
    {
      image: "/images/profile-placeholder.png",
      jabatan: "Guru Produktif TEI",
      kaproName: "Bambang Ishartanto, ST",
      quote: "Berusahalah untuk dirimu sendiri, karena itu dirimu sendiri",
    },
    {
      image: "/images/profile-placeholder.png",
      jabatan: "Guru Produktif TEI",
      kaproName: "Ewit Irniyah, S.Pd",
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
    {
      image: "/images/profile-placeholder.png",
      jabatan: "Guru Produktif TAV",
      kaproName: "Yoke Kurnia Dewanto H.H.P, ST",
      quote: "Berusahalah untuk dirimu sendiri, karena itu dirimu sendiri",
    },
  ],
};

const route = useRoute();
const major = props.major || (route.params.majorName as MajorName);
const kapro = kapros[major] || [];

// Get major color scheme
const majorColor = computed(() => {
  return (
    majorColorSchemes[major] || {
      primary: "#f97316",
      secondary: "#ea580c",
      accent: "#FFB366",
      light: "#FFF3E8",
      text: "#1f2937",
      bg: "#ffffff",
      hoverBg: "#fff7ed",
      border: "#fed7aa",
      headerBg: "#fff7ed",
    }
  );
});

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
  <div class="w-full max-w-6xl px-4 py-8 mx-auto">
    <div class="overflow-hidden">
      <!-- Grid Layout -->
      <div class="grid grid-cols-1 gap-8 p-6 lg:grid-cols-5 md:p-8 lg:p-10">
        <!-- Left: Image Section (2 columns on large screens) -->
        <div class="flex flex-col items-center justify-center space-y-6 lg:col-span-2">
          <!-- Profile Image -->
          <div class="relative w-full max-w-xs aspect-[3/4]">
            <div class="absolute inset-0 overflow-hidden bg-gray-100 rounded-2xl">
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
                  class="object-cover w-full h-full"
                />
              </Transition>
            </div>
          </div>

          <!-- Name and Position -->
          <div class="text-center space-y-2 w-full px-4 min-h-[120px] flex flex-col justify-center">
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
              <h2
                :key="current"
                class="text-xl md:text-2xl font-bold text-gray-900 min-h-[60px] flex items-center justify-center"
              >
                {{ kapro[current]?.kaproName }}
              </h2>
            </Transition>

            <Transition
              name="fade"
              mode="out-in"
              enter-active-class="transition-opacity duration-300 delay-75"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
              leave-active-class="transition-opacity duration-200"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <p
                :key="current"
                :style="{ color: majorColor.text }"
                class="text-sm md:text-base font-semibold min-h-[40px] flex items-center justify-center"
              >
                {{ kapro[current]?.jabatan }}
              </p>
            </Transition>
          </div>
        </div>

        <!-- Right: Quote Section (3 columns on large screens) -->
        <div class="lg:col-span-3 flex flex-col justify-between min-h-[400px] lg:min-h-[500px]">
          <!-- Quote -->
          <div class="flex items-center justify-center flex-1 p-6 md:p-8">
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
              <div :key="current" class="space-y-6 text-center">
                <!-- Quote Icon -->
                <div class="flex justify-center">
                  <div
                    :class="[
                      'w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center',
                      majorDatas?.[major]?.bgColor || 'bg-orange-500',
                    ]"
                  >
                    <Icon name="lucide:quote" class="text-white w-7 h-7 md:w-8 md:h-8" />
                  </div>
                </div>

                <!-- Quote Text -->
                <p class="text-2xl font-bold leading-relaxed text-gray-800 md:text-3xl lg:text-4xl">
                  {{ kapro[current]?.quote }}
                </p>
              </div>
            </Transition>
          </div>

          <!-- Navigation Controls -->
          <div class="pt-4 space-y-6">
            <!-- Progress Dots -->
            <div class="flex justify-center items-center gap-2 min-h-[16px]">
              <button
                v-for="(item, idx) in kapro"
                :key="idx"
                @click="current = idx"
                :style="{
                  backgroundColor: current === idx ? majorColor.primary : undefined,
                }"
                :class="[
                  'h-2 rounded-full transition-all duration-300',
                  current === idx ? 'w-12' : 'w-2',
                  current === idx ? '' : 'bg-gray-300 hover:bg-gray-400',
                ]"
                :aria-label="`Go to profile ${idx + 1}`"
              ></button>
            </div>

            <!-- Navigation Buttons -->
            <div class="flex items-center justify-between px-4">
              <!-- Previous Button -->
              <button
                @click="prev"
                :style="{
                  backgroundColor: majorColor.primary,
                }"
                class="flex items-center gap-2 px-5 py-3 font-semibold text-white transition-all duration-300 transform rounded-xl hover:-translate-x-1 hover:brightness-110"
                aria-label="Previous"
              >
                <Icon name="lucide:chevron-left" class="w-5 h-5" />
                <span class="text-sm">Previous</span>
              </button>

              <!-- Counter -->
              <div class="flex items-baseline gap-1">
                <span :style="{ color: majorColor.text }" class="text-2xl font-bold md:text-3xl">
                  {{ String(current + 1).padStart(2, "0") }}
                </span>
                <span class="text-lg text-gray-400 md:text-xl"> /{{ String(kapro.length).padStart(2, "0") }} </span>
              </div>

              <!-- Next Button -->
              <button
                @click="next"
                :style="{
                  backgroundColor: majorColor.primary,
                }"
                class="flex items-center gap-2 px-5 py-3 font-semibold text-white transition-all duration-300 transform rounded-xl hover:translate-x-1 hover:brightness-110"
                aria-label="Next"
              >
                <span class="text-sm">Next</span>
                <Icon name="lucide:chevron-right" class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
