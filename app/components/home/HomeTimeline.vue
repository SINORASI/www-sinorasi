<script setup lang="ts">
import { motion, AnimatePresence } from "motion-v";

const timelineRef = ref<HTMLElement | null>(null);
const timelineInView = ref(false);
const isMobile = ref(false);

const timelineItems = [
  {
    year: "2007",
    title: "Awal Berdiri",
    description:
      "SMK Negeri 2 Singosari didirikan secara resmi pada tanggal 25 Mei 2007 berdasarkan surat Perjanjian Kerjasama No. 0570ax/C5.4/Kep/KU/2007 antara Bupati Malang dengan Direktur Pendidikan Sekolah Menengah Kejuruan.",
    icon: "lucide:school",
  },
  {
    year: "2010",
    title: "Pengembangan Program Keahlian",
    description:
      "Sekolah mulai mengembangkan berbagai program keahlian untuk memenuhi kebutuhan industri lokal dan nasional.",
    icon: "lucide:book-open",
  },
  {
    year: "2015",
    title: "Akreditasi A",
    description: "SMK Negeri 2 Singosari berhasil meraih akreditasi A dari Badan Akreditasi Nasional Sekolah/Madrasah.",
    icon: "lucide:award",
  },
  {
    year: "2020",
    title: "Digitalisasi Pembelajaran",
    description:
      "Implementasi pembelajaran daring dan pengembangan platform digital untuk mendukung proses belajar mengajar di era pandemi.",
    icon: "lucide:monitor",
  },
  {
    year: "2023",
    title: "Prestasi LKS",
    description:
      "Siswa SMK Negeri 2 Singosari berhasil meraih prestasi gemilang dalam Lomba Kompetensi Siswa tingkat kabupaten dan provinsi.",
    icon: "lucide:trophy",
  },
];

const clickedMarkers = ref([true, false, false, false, false]);
const showAllIcons = ref(false);
const animationStarted = ref(false);
const lineScale = ref(0.1);
const cardVisibility = ref([false, false, false, false, false]);
const showModal = ref(false);
const selectedTimelineItem = ref<(typeof timelineItems)[0] | null>(null);

const startStaggeredAnimation = async () => {
  const { animate } = await import("motion-v");

  animationStarted.value = true;
  showAllIcons.value = true;

  animate(0.1, 1.0, {
    duration: 2,
    ease: "easeInOut",
    onUpdate: (latest) => (lineScale.value = latest),
  });

  timelineItems.forEach((_, index) => {
    setTimeout(() => {
      clickedMarkers.value[index] = true;
      cardVisibility.value[index] = true;
    }, index * 300);
  });
};

const toggleMarker = (index: number) => {
  if (index !== 0) return;

  if (!showAllIcons.value) {
    startStaggeredAnimation();
  } else {
    showAllIcons.value = false;
    animationStarted.value = false;
    clickedMarkers.value = [true, false, false, false, false];
    cardVisibility.value = [false, false, false, false, false];

    import("motion-v").then(({ animate }) => {
      const startScale = lineScale.value;
      animate(startScale, 0.1, {
        duration: 3,
        ease: "easeInOut",
        onUpdate: (latest) => (lineScale.value = latest),
      });
    });
  }
};

const openModal = (item: (typeof timelineItems)[0]) => {
  selectedTimelineItem.value = item;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedTimelineItem.value = null;
};

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile, { passive: true });

  const checkVisibility = () => {
    if (timelineRef.value && typeof timelineRef.value.getBoundingClientRect === 'function') {
      const rect = timelineRef.value.getBoundingClientRect();
      timelineInView.value = rect.top < window.innerHeight && rect.bottom > 0;
      if (timelineInView.value && !animationStarted.value) {
        setTimeout(() => startStaggeredAnimation(), 500);
      }
    }
  };

  window.addEventListener("scroll", checkVisibility, { passive: true });
  checkVisibility(); // Check initial state

  onUnmounted(() => {
    window.removeEventListener("resize", checkMobile);
    window.removeEventListener("scroll", checkVisibility);
  });
});
</script>

<template>
  <motion.section
    ref="timelineRef"
    id="jejak-sejarah"
    class="relative py-20 overflow-hidden"
    :initial="{ opacity: 0, y: 50 }"
    :whileInView="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.8 }"
    :inViewOptions="{ once: true }"
  >
    <div class="container relative flex flex-col items-center gap-8 px-4 mx-auto text-center md:px-10 z-10">
      <!-- Header -->
      <div class="flex flex-col items-center gap-4">
        <div class="inline-block">
          <span
            class="px-8 py-3 text-xl font-bold tracking-widest uppercase rounded-full md:text-2xl bg-blue-700 text-white"
          >
            Jejak Sejarah
          </span>
        </div>
        <p class="max-w-2xl my-5 text-lg text-gray-600">
          Perjalanan panjang SMK Negeri 2 Singosari dalam mengembangkan pendidikan kejuruan berkualitas di Kabupaten
          Malang.
        </p>

        <div class="flex items-center gap-3 px-6 py-3 bg-white border border-blue-100 rounded-full shadow-md">
          <Icon name="lucide:calendar" size="20" class="text-blue-600" />
          <span class="font-semibold text-gray-700">2007 - 2023</span>
          <span class="text-gray-400">|</span>
          <span class="font-bold text-blue-600">{{ timelineItems.length }} Milestone</span>
        </div>
      </div>

      <!-- Mobile Timeline -->
      <div v-if="isMobile" class="relative flex flex-col items-center w-full py-10">
        <motion.div
          class="absolute top-0 w-1 h-full transform rounded-full shadow-lg left-1/2 bg-linear-to-b from-blue-400 via-blue-600 to-blue-400"
          :initial="{ scaleY: 0.1 }"
          :animate="{ scaleY: lineScale }"
          :transition="{ duration: 2, ease: 'easeInOut' }"
          style="transform-origin: top"
        ></motion.div>

        <div
          v-for="(item, index) in timelineItems"
          :key="index"
          class="relative flex flex-col items-center w-full max-w-md mb-12 group"
          :class="{ 'opacity-0': !showAllIcons && index > 0 }"
          :style="{ transition: 'opacity 0.5s ease-in-out' }"
        >
          <motion.div
            v-if="showAllIcons || index === 0"
            :class="[
              'z-20 flex items-center justify-center w-16 h-16 mb-6 transition-all duration-300 border-4 border-white rounded-full shadow-xl bg-linear-to-br from-blue-500 to-blue-700 group-hover:scale-110 cursor-pointer',
              clickedMarkers[index] ? 'ring-4 ring-yellow-400' : '',
            ]"
            :initial="{ opacity: index === 0 ? 1 : 0, scale: index === 0 ? 1 : 0 }"
            :animate="{
              opacity: clickedMarkers[index] ? 1 : 0,
              scale: clickedMarkers[index] ? 1 : 0,
            }"
            :transition="{ duration: 0.8, delay: index * 0.2 }"
            @click="index === 0 && toggleMarker(index)"
            @dblclick="openModal(item)"
          >
            <Icon :name="item.icon" size="28" class="text-white" />
          </motion.div>

          <motion.div
            v-if="cardVisibility[index]"
            :initial="{ opacity: 0, y: -50 }"
            :whileInView="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.8 }"
            :inViewOptions="{ once: true }"
          >
            <div
              class="w-full p-6 text-center bg-white border-2 border-blue-100 shadow-xl rounded-2xl hover:border-blue-300 hover:shadow-2xl transition-all"
            >
              <div
                :class="[
                  'inline-block px-6 py-3 rounded-full mb-4 font-bold text-lg',
                  index % 2 === 0
                    ? 'bg-linear-to-r from-blue-500 to-blue-600 text-white'
                    : 'bg-linear-to-r from-orange-500 to-orange-600 text-white',
                ]"
              >
                {{ item.year }}
              </div>
              <h3 class="mb-3 text-xl font-bold text-gray-800">
                {{ item.title }}
              </h3>
              <p class="text-sm leading-relaxed text-justify text-gray-600">
                {{ item.description }}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <!-- Desktop Timeline -->
      <div v-else class="relative max-w-[1200px] mx-auto py-24">
        <motion.div
          class="absolute left-1/2 top-0 bottom-0 w-1 bg-linear-to-b from-transparent via-blue-500 to-transparent -translate-x-1/2 rounded-sm shadow-lg z-10"
          :initial="{ scaleY: 0.1 }"
          :animate="{ scaleY: lineScale }"
          :transition="{ duration: 2, ease: 'easeInOut' }"
          style="transform-origin: top"
        ></motion.div>

        <div
          v-for="(item, index) in timelineItems"
          :key="index"
          class="relative clear-both mb-12 group"
          :class="{ 'opacity-0': !showAllIcons && index > 0 }"
          :style="{ transition: 'opacity 0.5s ease-in-out' }"
        >
          <motion.div
            v-if="cardVisibility[index]"
            :initial="{ opacity: 0, y: -50 }"
            :whileInView="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.8 }"
            :inViewOptions="{ once: true }"
          >
            <div
              :class="[
                'p-8 bg-white/90 backdrop-blur-lg border border-white/30 shadow-2xl rounded-2xl hover:shadow-3xl hover:scale-105 transition-all h-[300px] w-[42%] z-20 flex flex-col justify-center items-center text-center',
                index % 2 === 0 ? 'mr-12 float-left' : 'ml-12 float-right',
              ]"
            >
              <div
                :class="[
                  'inline-block px-6 py-3 rounded-full mb-4 font-bold text-lg shadow-lg',
                  index % 2 === 0
                    ? 'bg-linear-to-r from-blue-500 to-blue-600 text-white'
                    : 'bg-linear-to-r from-orange-500 to-orange-600 text-white',
                ]"
              >
                {{ item.year }}
              </div>
              <h3
                :class="[
                  'mb-3 text-2xl font-bold text-gray-800 transition-colors',
                  index % 2 === 0 ? 'group-hover:text-blue-600' : 'group-hover:text-orange-600',
                ]"
              >
                {{ item.title }}
              </h3>
              <p class="leading-relaxed text-gray-600">
                {{ item.description }}
              </p>
            </div>
          </motion.div>

          <motion.div
            v-if="showAllIcons || index === 0"
            class="absolute z-40 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
            :initial="{ opacity: index === 0 ? 1 : 0, scale: index === 0 ? 1 : 0 }"
            :animate="{
              opacity: clickedMarkers[index] ? 1 : 0,
              scale: clickedMarkers[index] ? 1 : 0,
            }"
            :transition="{ duration: 0.8, delay: index * 0.2 }"
          >
            <div
              :class="[
                'w-16 h-16 rounded-full flex items-center justify-center shadow-xl border-[5px] border-white/80 backdrop-blur-sm transition-all duration-500 group-hover:scale-115 cursor-pointer',
                index % 2 === 0
                  ? 'bg-linear-to-br from-blue-500 to-blue-700'
                  : 'bg-linear-to-br from-orange-500 to-orange-700',
              ]"
              @click="index === 0 && toggleMarker(index)"
              @dblclick="openModal(item)"
            >
              <Icon :name="item.icon" size="28" class="text-white" />
            </div>
          </motion.div>

          <motion.div
            v-if="cardVisibility[index]"
            :class="[
              'absolute top-1/2 w-[60px] h-[3px] -translate-y-1/2 z-1 transition-all duration-500 rounded-full',
              index % 2 === 0
                ? 'right-1/2 mr-8 bg-linear-to-r from-transparent via-blue-500 to-blue-600'
                : 'left-1/2 ml-8 bg-linear-to-l from-transparent via-blue-500 to-blue-600',
            ]"
            :initial="{ scaleX: 0 }"
            :animate="{ scaleX: cardVisibility[index] ? 1 : 0 }"
            :transition="{ duration: 0.8 }"
            :style="{ transformOrigin: index % 2 === 0 ? 'right' : 'left' }"
          ></motion.div>
        </div>
      </div>

      <!-- CTA -->
      <div class="max-w-2xl px-8 py-6 mt-10 text-white shadow-xl bg-linear-to-r from-blue-600 to-blue-800 rounded-2xl">
        <div class="flex flex-wrap items-center justify-between gap-6">
          <div class="flex-1 min-w-[200px]">
            <h3 class="mb-2 text-xl font-bold">Ingin Tahu Lebih Banyak?</h3>
            <p class="text-sm text-blue-100">Lihat profil lengkap sekolah kami</p>
          </div>
          <NuxtLink
            to="/informasi/profile-sekolah"
            class="inline-flex items-center gap-2 px-6 py-3 font-semibold text-blue-600 bg-white rounded-lg shadow-md hover:bg-blue-50 transition-colors"
          >
            Profil Sekolah
            <Icon name="lucide:arrow-right" size="18" />
          </NuxtLink>
        </div>
      </div>

      <!-- Modal -->
      <AnimatePresence>
        <motion.div
          v-if="showModal && selectedTimelineItem"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
          @click="closeModal"
        >
          <motion.div
            class="relative max-w-2xl w-full max-h-[80vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
            :initial="{ scale: 0.9, opacity: 0 }"
            :animate="{ scale: 1, opacity: 1 }"
            :exit="{ scale: 0.9, opacity: 0 }"
            @click.stop
          >
            <div class="p-8">
              <div class="flex items-center justify-between mb-6">
                <div class="flex items-center gap-4">
                  <div class="p-3 rounded-full bg-blue-100">
                    <Icon :name="selectedTimelineItem.icon" size="32" class="text-blue-600" />
                  </div>
                  <div>
                    <h3 class="text-2xl font-bold text-gray-800">
                      {{ selectedTimelineItem.title }}
                    </h3>
                    <p class="text-lg font-semibold text-blue-600">
                      {{ selectedTimelineItem.year }}
                    </p>
                  </div>
                </div>
                <button @click="closeModal" class="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <Icon name="lucide:x" size="24" class="text-gray-500" />
                </button>
              </div>

              <div class="prose prose-lg max-w-none">
                <p class="text-gray-700 leading-relaxed mb-6">
                  {{ selectedTimelineItem.description }}
                </p>
              </div>

              <div class="flex items-center justify-between pt-6 border-t border-gray-200">
                <div class="text-sm text-gray-500">Klik di luar modal untuk menutup</div>
                <button
                  @click="closeModal"
                  class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  </motion.section>
</template>
