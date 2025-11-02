<script setup lang="ts">
import { motion, AnimatePresence } from "motion-v";
import { ref, computed, onMounted, onUnmounted } from "vue";

const timelineRef = ref<HTMLElement | null>(null);
const timelineInView = ref(false);
const isMobile = ref(false);
const hoveredIndex = ref<number | null>(null);

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
    if (timelineRef.value && typeof timelineRef.value.getBoundingClientRect === "function") {
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
    class="relative py-24 overflow-hidden"
    :initial="{ opacity: 0 }"
    :whileInView="{ opacity: 1 }"
    :transition="{ duration: 0.8 }"
    :inViewOptions="{ once: true }"
  >
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        class="absolute w-96 h-96 rounded-full bg-blue-200 blur-3xl opacity-20"
        :initial="{ x: -200, y: -200 }"
        :animate="{ x: 200, y: 200 }"
        :transition="{ duration: 20, repeat: Infinity, repeatType: 'reverse' }"
      ></motion.div>
      <motion.div
        class="absolute w-80 h-80 rounded-full bg-orange-200 blur-3xl opacity-20 right-0 top-1/2"
        :initial="{ x: 200, y: 100 }"
        :animate="{ x: -200, y: -100 }"
        :transition="{ duration: 25, repeat: Infinity, repeatType: 'reverse' }"
      ></motion.div>
    </div>

    <div class="container relative flex flex-col items-center gap-12 px-4 mx-auto text-center md:px-10 z-10">
      <!-- Header Section -->
      <motion.div
        class="flex flex-col items-center gap-6"
        :initial="{ opacity: 0, y: 30 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8, delay: 0.1 }"
        :inViewOptions="{ once: true }"
      >
        <motion.div class="inline-block" :whileHover="{ scale: 1.05 }" :whileTap="{ scale: 0.95 }"
          >>
          <span
            class="px-8 py-4 text-2xl font-black tracking-widest uppercase rounded-2xl md:text-3xl bg-linear-to-r from-blue-600 to-blue-700 text-white shadow-xl hover:shadow-2xl transition-shadow"
          >
            Jejak Sejarah
          </span>
        </motion.div>

        <motion.p
          class="max-w-3xl text-lg md:text-xl text-gray-700 leading-relaxed font-medium"
          :initial="{ opacity: 0 }"
          :whileInView="{ opacity: 1 }"
          :transition="{ duration: 0.8, delay: 0.2 }"
          :inViewOptions="{ once: true }"
        >
          Perjalanan panjang SMK Negeri 2 Singosari dalam mengembangkan pendidikan kejuruan berkualitas di Kabupaten
          Malang. Dari pemulaan hingga prestasi gemilang.
        </motion.p>

        <motion.div
          class="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-4"
          :initial="{ opacity: 0, scale: 0.9 }"
          :whileInView="{ opacity: 1, scale: 1 }"
          :transition="{ duration: 0.8, delay: 0.3 }"
          :inViewOptions="{ once: true }"
        >
          <div
            class="px-6 py-3 bg-white border-2 border-blue-200 rounded-full shadow-md hover:shadow-lg transition-shadow"
          >
            <div class="flex items-center gap-2">
              <Icon name="lucide:calendar" size="20" class="text-blue-600" />
              <span class="font-bold text-gray-800">2007 - 2023</span>
            </div>
          </div>
          <div
            class="px-6 py-3 bg-white border-2 border-purple-200 rounded-full shadow-md hover:shadow-lg transition-shadow"
          >
            <div class="flex items-center gap-2">
              <Icon name="lucide:milestone" size="20" class="text-purple-600" />
              <span class="font-bold text-gray-800">{{ timelineItems.length }} Milestone</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <!-- Mobile Timeline -->
      <div v-if="isMobile" class="relative flex flex-col items-center w-full py-10">
        <motion.div
          class="absolute top-0 w-1.5 h-full rounded-full shadow-xl left-1/2 bg-linear-to-b from-blue-400 via-blue-600 to-orange-600"
          :initial="{ scaleY: 0.1 }"
          :animate="{ scaleY: lineScale }"
          :transition="{ duration: 2, ease: 'easeInOut' }"
          style="transform-origin: top"
        ></motion.div>

        <div
          v-for="(item, index) in timelineItems"
          :key="index"
          class="relative flex flex-col items-center w-full max-w-md mb-16 group"
          @mouseenter="hoveredIndex = index"
          @mouseleave="hoveredIndex = null"
        >
          <motion.div
            v-if="showAllIcons || index === 0"
            :class="[
              'z-20 flex items-center justify-center w-20 h-20 mb-6 border-4 border-white rounded-full shadow-xl cursor-pointer',
              'bg-linear-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800',
              'transition-all duration-300 group-hover:scale-125 group-hover:shadow-2xl',
              hoveredIndex === index ? 'ring-4 ring-yellow-400 ring-offset-2' : '',
            ]"
            :initial="{ opacity: index === 0 ? 1 : 0, scale: index === 0 ? 1 : 0 }"
            :animate="{
              opacity: clickedMarkers[index] ? 1 : 0,
              scale: clickedMarkers[index] ? 1 : 0,
            }"
            :transition="{ duration: 0.8, delay: index * 0.2 }"
            :whileHover="{ scale: 1.1, rotateZ: 10 }"
            @click="index === 0 ? toggleMarker(index) : openModal(item)"
          >
            <Icon :name="item.icon" size="32" class="text-white" />
          </motion.div>

          <motion.div
            v-if="cardVisibility[index]"
            :initial="{ opacity: 0, y: -30, scale: 0.95 }"
            :animate="{ opacity: 1, y: 0, scale: 1 }"
            :transition="{ duration: 0.6, delay: 0.1 }"
          >
            <motion.div
              class="w-full p-8 bg-white border-2 border-blue-100 shadow-lg rounded-3xl hover:border-blue-300 hover:shadow-2xl transition-all"
              :whileHover="{ y: -5, scale: 1.02 }"
            >
              <motion.div
                :class="[
                  'inline-block px-6 py-3 rounded-full mb-4 font-bold text-lg shadow-md',
                  index % 2 === 0
                    ? 'bg-linear-to-r from-blue-500 to-blue-600 text-white'
                    : 'bg-linear-to-r from-orange-500 to-orange-600 text-white',
                ]"
                :initial="{ scale: 0 }"
                :animate="{ scale: 1 }"
                :transition="{ duration: 0.5, type: 'spring' }"
              >
                {{ item.year }}
              </motion.div>
              <h3 class="mb-4 text-2xl font-bold text-gray-800 leading-tight">
                {{ item.title }}
              </h3>
              <p class="text-base leading-relaxed text-gray-600 text-justify">
                {{ item.description }}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <!-- Desktop Timeline -->
      <div v-else class="relative w-full max-w-6xl mx-auto py-24">
        <motion.div
          class="absolute left-1/2 top-0 bottom-0 w-1 bg-linear-to-b from-transparent via-blue-500 to-transparent -translate-x-1/2 rounded-full shadow-lg z-10"
          :initial="{ scaleY: 0.1 }"
          :animate="{ scaleY: lineScale }"
          :transition="{ duration: 2, ease: 'easeInOut' }"
          style="transform-origin: top"
        ></motion.div>

        <div
          v-for="(item, index) in timelineItems"
          :key="index"
          class="relative clear-both mb-24 group"
          @mouseenter="hoveredIndex = index"
          @mouseleave="hoveredIndex = null"
        >
          <motion.div
            v-if="cardVisibility[index]"
            :initial="{ opacity: 0, x: index % 2 === 0 ? -100 : 100, scale: 0.9 }"
            :animate="{ opacity: 1, x: 0, scale: 1 }"
            :transition="{ duration: 0.8, delay: 0.2 }"
          >
            <motion.div
              :class="[
                'p-10 bg-white/95 backdrop-blur-xl border-2 shadow-xl rounded-3xl transition-all',
                'h-auto min-h-80 w-[45%] z-20 flex flex-col justify-center items-center text-center',
                index % 2 === 0
                  ? 'mr-12 float-left border-blue-200 hover:border-blue-400'
                  : 'ml-12 float-right border-orange-200 hover:border-orange-400',
              ]"
              :whileHover="{ y: -8, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.2)' }"
            >
              <motion.div
                :class="[
                  'inline-block px-8 py-4 rounded-2xl mb-6 font-bold text-xl shadow-lg',
                  index % 2 === 0
                    ? 'bg-linear-to-r from-blue-500 to-blue-600 text-white'
                    : 'bg-linear-to-r from-orange-500 to-orange-600 text-white',
                ]"
                :initial="{ scale: 0, rotate: -10 }"
                :animate="{ scale: 1, rotate: 0 }"
                :transition="{ duration: 0.6, type: 'spring', stiffness: 100 }"
              >
                {{ item.year }}
              </motion.div>
              <h3
                :class="[
                  'mb-3 text-2xl font-bold text-gray-800 leading-tight transition-colors',
                  index % 2 === 0 ? 'group-hover:text-blue-600' : 'group-hover:text-orange-600',
                ]"
              >
                {{ item.title }}
              </h3>
              <p class="text-base leading-relaxed text-gray-600 mb-6">
                {{ item.description }}
              </p>
            </motion.div>
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
            <motion.div
              :class="[
                'w-20 h-20 rounded-full flex items-center justify-center shadow-2xl border-[6px] border-white/90',
                'backdrop-blur-lg transition-all duration-500 cursor-pointer',
                'hover:shadow-3xl hover:ring-4 hover:ring-yellow-300',
                index % 2 === 0
                  ? 'bg-linear-to-br from-blue-500 to-blue-700'
                  : 'bg-linear-to-br from-orange-500 to-orange-700',
              ]"
              :whileHover="{ scale: 1.1, rotateZ: 5 }"
              @click="index === 0 ? toggleMarker(index) : openModal(item)"
            >
              <Icon :name="item.icon" size="36" class="text-white" />
            </motion.div>
          </motion.div>

          <motion.div
            v-if="cardVisibility[index]"
            :class="[
              'absolute top-1/2 w-16 h-1 -translate-y-1/2 z-1 transition-all duration-500 rounded-full',
              index % 2 === 0
                ? 'right-1/2 mr-12 bg-linear-to-r from-transparent via-blue-500 to-blue-600'
                : 'left-1/2 ml-12 bg-linear-to-l from-transparent via-blue-500 to-orange-600',
            ]"
            :initial="{ scaleX: 0, opacity: 0 }"
            :animate="{ scaleX: cardVisibility[index] ? 1 : 0, opacity: cardVisibility[index] ? 1 : 0 }"
            :transition="{ duration: 0.8, delay: 0.3 }"
            :style="{ transformOrigin: index % 2 === 0 ? 'right' : 'left' }"
          ></motion.div>
        </div>
      </div>

      <!-- CTA Section -->
      <motion.div
        class="max-w-3xl w-full px-8 py-10 mt-16 text-white shadow-2xl bg-linear-to-r from-blue-600 via-blue-700 to-blue-800 rounded-3xl border border-blue-500/50"
        :initial="{ opacity: 0, y: 50, scale: 0.95 }"
        :whileInView="{ opacity: 1, y: 0, scale: 1 }"
        :transition="{ duration: 0.8 }"
        :inViewOptions="{ once: true }"
        :whileHover="{ y: -5 }"
      >
        <div class="flex flex-col md:flex-row items-center justify-between gap-8">
          <div class="flex-1">
            <h3 class="mb-3 text-2xl md:text-3xl font-black">Ingin Tahu Lebih Banyak?</h3>
            <p class="text-blue-100 text-lg">Jelajahi profil lengkap dan prestasi sekolah kami</p>
          </div>
          <motion.div :whileHover="{ scale: 1.05 }" :whileTap="{ scale: 0.95 }">
            <NuxtLink
              to="/informasi/profile-sekolah"
              class="inline-flex items-center gap-3 px-8 py-4 font-bold text-blue-600 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              <span>Profil Sekolah</span>
              <Icon name="lucide:arrow-right" size="20" />
            </NuxtLink>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </motion.section>
</template>
