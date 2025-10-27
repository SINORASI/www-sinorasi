<script lang="ts" setup>
import { motion, animate, AnimatePresence } from "motion-v";
import type { News } from "~/models/News";

definePageMeta({
  layout: "default",
  keepalive: false,
});

const showContent = ref(false);

interface CounterProps {
  jurusanTarget?: number;
  siswaTarget?: number;
  prestasiTarget?: number;
  tahunTarget?: number;
  duration?: number;
}

const props = withDefaults(defineProps<CounterProps>(), {
  jurusanTarget: 8,
  siswaTarget: 1200,
  prestasiTarget: 200,
  tahunTarget: 2007,
  duration: 3000,
});

const jurusanCount = ref(0);
const siswaCount = ref(0);
const prestasiCount = ref(0);
const tahunCount = ref(0);

const selectedCategory = ref<string>("all");
const newsCategories = ref<string[]>(["all", "Pengumuman", "Prestasi", "Kerjasama", "Program Baru"]);
const newsData = ref<News[]>([]);
const isLoadingNews = ref(false);
const showBackToTop = ref(false);

const fetchNews = async (category: string = "all") => {
  isLoadingNews.value = true;
  try {
    const query: Record<string, any> = { limit: 8 };
    if (category !== "all") {
      query.tag = category;
    }

    const response = await $fetch("/api/news", { query });
    newsData.value = response.data || [];
  } catch (error) {
    console.error("Error fetching news:", error);
    newsData.value = [];
  } finally {
    isLoadingNews.value = false;
  }
};

const filterByCategory = (category: string) => {
  selectedCategory.value = category;
  fetchNews(category);
};

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

// Reset animation states
const resetAnimationStates = () => {
  clickedMarkers.value = [true, false, false, false, false];
  showAllIcons.value = false;
  animationStarted.value = false;
  lineScale.value = 0.1;
  cardVisibility.value = [false, false, false, false, false];
  currentAchievement.value = 0;
};

const startStaggeredAnimation = () => {
  // Prevent animation if page is not fully mounted or elements are null
  if (typeof window === "undefined") return;

  animationStarted.value = true;
  showAllIcons.value = true;

  animate(0.1, 1.0, {
    duration: 3, // 3000ms
    ease: "easeInOut",
    onUpdate: (latest) => (lineScale.value = latest),
  });

  timelineItems.forEach((_, index) => {
    setTimeout(() => {
      if (clickedMarkers.value && cardVisibility.value) {
        clickedMarkers.value[index] = true;
        cardVisibility.value[index] = true;
      }
    }, index * 400);
  });
};

const toggleMarker = (index: number) => {
  if (index !== 0 || typeof window === "undefined") return;

  if (!showAllIcons.value) {
    startStaggeredAnimation();
  } else {
    showAllIcons.value = false;
    animationStarted.value = false;
    if (clickedMarkers.value && cardVisibility.value) {
      clickedMarkers.value = [true, false, false, false, false];
      cardVisibility.value = [false, false, false, false, false];
    }

    const startScale = lineScale.value;
    animate(startScale, 0.1, {
      duration: 5, // 5000ms
      ease: "easeInOut",
      onUpdate: (latest) => (lineScale.value = latest),
    });
  }
};

const achievements = computed(() => {
  const filtered = newsData.value
    .filter((news) => {
      const content = news.content ? news.content.toLowerCase() : "";
      return content.includes("juara") || content.includes("prestasi");
    })
    .slice(0, 5)
    .map((news) => ({
      image: news.thumbnail || "/images/placeholder.jpg",
      title: news.title,
      description: news.content
        ? news.content.replace(/<[^>]*>/g, "").slice(0, Math.floor(news.content.replace(/<[^>]*>/g, "").length / 2)) +
          "..."
        : news.subtitle,
      slug: news.slug,
    }));

  if (filtered.length === 0) {
    return [
      {
        image: "/images/placeholder.jpg",
        title: "LKS 2023 Kab. Malang : Kami Lolos Enam Bidang Lomba untuk Menuju Tingkat Provinsi",
        description:
          "SMKN 2 Singosari sukses menggelar Lomba Kompetensi Siswa (LKS) SMK tingkat Kabupaten Malang selama dua hari sejak Senin (6/3). Hasilnya, 13 siswa berhasil meraih prestasi dengan 6 bidang lomba lolos ke tingkat Provinsi Jawa Timur.",
        slug: null,
      },
      {
        image: "/images/placeholder.jpg",
        title: "Juara 1 Lomba Karya Tulis Ilmiah Tingkat Nasional",
        description:
          "Tim siswa SMKN 2 Singosari berhasil meraih juara 1 dalam Lomba Karya Tulis Ilmiah yang diselenggarakan oleh Kementerian Pendidikan dan Kebudayaan dengan tema Inovasi Teknologi untuk Masa Depan.",
        slug: null,
      },
    ];
  }

  return filtered;
});

const currentAchievement = ref(0);

const nextAchievement = () => {
  const len = achievements.value.length;
  currentAchievement.value = (currentAchievement.value + 1) % len;
};

const prevAchievement = () => {
  const len = achievements.value.length;
  currentAchievement.value = (currentAchievement.value - 1 + len) % len;
};

const heroImages = ref([
  "/images/seragam/putih-putih/10-putih-putih-jas-l/DSC04215.webp",
  "/images/seragam/putih-putih/11-putih-putih-jas-l/DSC04320.webp",
]);
const currentHeroImage = ref(0);

onMounted(() => {
  // Scroll to top on mount
  if (import.meta.client) {
    window.scrollTo(0, 0);
  }

  // Show content after a brief delay to ensure proper motion-v initialization
  setTimeout(() => {
    showContent.value = true;
  }, 50);

  // Only run animations on client side
  if (import.meta.client) {
    setTimeout(() => {
      const durationInSeconds = props.duration / 1000;
      const ease = "easeOut";

      animate(0, props.jurusanTarget, {
        duration: durationInSeconds,
        ease: ease,
        onUpdate: (latest) => (jurusanCount.value = Math.floor(latest)),
      });
      animate(0, props.siswaTarget, {
        duration: durationInSeconds,
        ease: ease,
        onUpdate: (latest) => (siswaCount.value = Math.floor(latest)),
      });
      animate(0, props.prestasiTarget, {
        duration: durationInSeconds,
        ease: ease,
        onUpdate: (latest) => (prestasiCount.value = Math.floor(latest)),
      });
      animate(0, props.tahunTarget, {
        duration: durationInSeconds,
        ease: ease,
        onUpdate: (latest) => (tahunCount.value = Math.floor(latest)),
      });
    }, 100);

    fetchNews();

    const checkMobile = () => {
      if (window) {
        isMobile.value = window.innerWidth < 768;
      }
    };
    checkMobile();
    window?.addEventListener("resize", checkMobile);

    const handleScroll = () => {
      if (window && document) {
        const scrollTop = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const scrollThreshold = documentHeight * (1 / 5);
        showBackToTop.value = scrollTop > scrollThreshold;
      }
    };
    window?.addEventListener("scroll", handleScroll);

    const heroInterval = setInterval(() => {
      currentHeroImage.value = (currentHeroImage.value + 1) % heroImages.value.length;
    }, 5000);

    onUnmounted(() => {
      window?.removeEventListener("resize", checkMobile);
      window?.removeEventListener("scroll", handleScroll);
      clearInterval(heroInterval);
    });
  }
});

const scrollToTop = () => {
  if (import.meta.client && window) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

useHead({
  title: "Beranda - SMKN 2 Singosari",
  meta: [
    {
      name: "description",
      content:
        "SMK Negeri 2 Singosari - INORASI (Inovasi Raih Prestasi). Tempat di mana inovasi bertemu dengan prestasi melalui pendidikan kejuruan berkualitas.",
    },
  ],
});
</script>

<template>
  <main v-if="showContent" class="flex flex-col gap-52">
    <section
      id="hero"
      class="relative flex items-center justify-center min-h-screen px-4 pt-24 pb-10 md:pt-20 overflow-hidden"
    >
      <motion.div
        class="absolute top-20 left-10 w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-20"
        :animate="{ y: [0, -20, 0] }"
        :transition="{
          duration: 6,
          ease: 'easeInOut',
          repeat: Infinity,
        }"
      />
      <div
        class="absolute top-40 right-20 w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 transform rotate-45 opacity-25 hero-shape-2"
      ></div>
      <div
        class="absolute bottom-40 left-20 w-20 h-20 bg-gradient-to-br from-blue-300 to-orange-400 rounded-lg opacity-15 hero-shape-3"
      ></div>

      <div class="absolute top-100 right-30 z-0">
        <Icon name="lucide:lightbulb" size="120" class="text-blue-300 opacity-10 hero-ornament-1" />
      </div>
      <div class="absolute bottom-59 right-130 z-0">
        <Icon name="lucide:rocket" size="140" class="text-orange-300 opacity-8 hero-ornament-2" />
      </div>
      <div class="absolute top-50 left-100 z-0">
        <Icon name="lucide:star" size="110" class="text-blue-400 opacity-12 hero-ornament-3" />
      </div>

      <div
        class="absolute top-10 right-1/4 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-10 large-hero-shape-1"
      ></div>
      <div
        class="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-green-400 to-blue-400 transform rotate-45 opacity-8 large-hero-shape-2"
      ></div>
      <div
        class="absolute top-1/2 left-5 w-28 h-28 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-lg opacity-12 large-hero-shape-3"
      ></div>

      <div
        class="container flex flex-col justify-center items-center max-w-5xl mx-auto gap-18 lg:flex-row relative z-10"
      >
        <motion.div
          class="flex flex-col justify-center items-center w-full lg:w-1/3"
          :initial="{ opacity: 0, x: -50 }"
          :whileInView="{ opacity: 1, x: 0 }"
          :transition="{ duration: 0.8 }"
          :inViewOptions="{ once: true }"
        >
          <div class="relative group">
            <NuxtImg
              src="/images/seragam/putih-putih/10-putih-putih-l/DSC04123.webp"
              alt="Student"
              class="object-cover transition-transform duration-300 rounded-lg shadow-lg w-60 md:w-150 h-100 md:h-150 group-hover:scale-105"
            />
          </div>
        </motion.div>

        <motion.div
          class="flex flex-col items-center w-full gap-8 text-center text-black lg:w-2/3 lg:items-start lg:text-left"
          :initial="{ opacity: 0, x: 50 }"
          :whileInView="{ opacity: 1, x: 0 }"
          :transition="{ duration: 0.8, delay: 0.2 }"
          :inViewOptions="{ once: true }"
        >
          <h1 class="text-3xl font-black transition-all duration-700 ease-out md:text-4xl lg:text-5xl">
            SMK NEGERI 2 SINGOSARI
          </h1>
          <p class="text-lg font-semibold transition-all duration-700 ease-out md:text-xl lg:text-2xl">
            INORASI - Inovasi Raih Prestasi
          </p>
          <p class="max-w-2xl text-sm leading-relaxed transition-all duration-700 ease-out md:text-lg">
            SMK Negeri 2 Singosari - Tempat di mana inovasi bertemu dengan prestasi. Kami berkomitmen untuk membentuk
            generasi muda yang siap menghadapi tantangan masa depan melalui pendidikan kejuruan berkualitas.
          </p>
          <div class="flex flex-col items-center gap-4 mt-4 sm:flex-row">
            <a
              href="#profil-sekolah"
              class="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Pelajari Lebih Dalam
              <Icon name="lucide:book-open" size="16" />
            </a>
            <a
              href="#berita"
              class="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-blue-600 transition-all duration-300 border-2 border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white"
            >
              Berita Terbaru
              <Icon name="lucide:newspaper" size="16" />
            </a>
          </div>
          <div class="flex justify-center w-full gap-8 mt-6 lg:justify-start">
            <div class="flex flex-col items-center">
              <div class="text-xl font-bold transition-all duration-700 ease-out md:text-3xl">
                {{ jurusanCount }}
              </div>
              <div class="text-sm transition-all duration-700 ease-out md:text-lg">Konsentrasi Keahlian</div>
            </div>
            <div class="flex flex-col items-center">
              <div class="text-xl font-bold transition-all duration-700 ease-out md:text-3xl">{{ siswaCount }}+</div>
              <div class="text-sm transition-all duration-700 ease-out md:text-lg">Siswa</div>
            </div>
            <div class="flex flex-col items-center">
              <div class="text-xl font-bold transition-all duration-700 ease-out md:text-3xl">{{ prestasiCount }}+</div>
              <div class="text-sm transition-all duration-700 ease-out md:text-lg">Prestasi</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    <motion.section
      id="profil-sekolah"
      class="relative py-20 h-min-screen bg-gradient-to-b from-white via-blue-50 to-white overflow-hidden"
      :initial="{ opacity: 0, y: 50 }"
      :whileInView="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.8 }"
      :inViewOptions="{ once: true }"
    >
      <div class="absolute top-0 left-1/2 z-0">
        <Icon name="lucide:graduation-cap" size="160" class="text-blue-400 opacity-10 profil-ornament-1" />
      </div>
      <div class="absolute top-1/4 left-20 z-0">
        <Icon name="lucide:book" size="130" class="text-orange-300 opacity-8 profil-ornament-2" />
      </div>
      <div class="absolute bottom-10 right-10 z-0">
        <Icon name="lucide:school" size="180" class="text-blue-300 opacity-12 profil-ornament-3" />
      </div>

      <div
        class="absolute bottom-10 left-20 w-44 h-44 bg-gradient-to-br from-orange-400 to-red-400 transform rotate-45 opacity-6 large-profil-shape-2"
      ></div>

      <div
        class="absolute top-[-50] left-1/4 w-40 h-40 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full opacity-8 large-profil-shape-1"
      ></div>
      <div
        class="absolute bottom-10 right-1/3 w-48 h-48 bg-gradient-to-br from-orange-400 to-red-400 transform rotate-45 opacity-6 large-profil-shape-2"
      ></div>

      <div class="container px-4 mx-auto md:px-10 relative z-10">
        <div class="flex flex-col gap-12 lg:flex-row lg:items-center">
          <motion.div
            class="w-full lg:w-1/2"
            :initial="{ opacity: 0, x: -50 }"
            :whileInView="{ opacity: 1, x: 0 }"
            :transition="{ duration: 0.8, delay: 0.2 }"
            :inViewOptions="{ once: true }"
          >
            <div class="relative group">
              <div
                class="relative overflow-hidden transition-all duration-500 transform border-4 border-white shadow-2xl rounded-2xl group-hover:scale-105 group-hover:shadow-3xl"
              >
                <NuxtImg
                  src="/images/aula-drone.webp"
                  alt="Drone view of SMK Negeri 2 Singosari"
                  class="object-cover w-full h-auto"
                />
                <div
                  class="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-t from-blue-900/50 to-transparent group-hover:opacity-100"
                ></div>
              </div>
              <div
                class="absolute w-32 h-32 rounded-full -bottom-4 -left-4 bg-gradient-to-br from-orange-500 to-orange-700 opacity-20 blur-2xl -z-10"
              ></div>
            </div>
          </motion.div>

          <motion.div
            class="flex flex-col w-full gap-6 lg:w-1/2"
            :initial="{ opacity: 0, x: 50 }"
            :whileInView="{ opacity: 1, x: 0 }"
            :transition="{ duration: 0.8, delay: 0.4 }"
            :inViewOptions="{ once: true }"
          >
            <div class="inline-block">
              <span
                class="px-2 py-3 flex justify-center items-center text-lg font-bold tracking-widest uppercase rounded-full md:text-xl"
                :style="`background: #1d4ed8; color: white`"
              >
                Tentang SMK Negeri 2 Singosari
              </span>
            </div>

            <div class="p-8 bg-white border-2 border-blue-100 shadow-xl rounded-2xl">
              <div class="space-y-6">
                <p class="leading-relaxed text-gray-600">
                  SMK Negeri 2 Singosari adalah lembaga pendidikan kejuruan yang berkomitmen untuk menghasilkan lulusan
                  yang kompeten, inovatif, dan siap menghadapi tantangan dunia kerja modern.
                </p>

                <div class="grid grid-cols-2 gap-4">
                  <div class="p-4 text-center rounded-lg bg-blue-50">
                    <div class="text-2xl font-bold text-blue-600">
                      {{ jurusanCount }}
                    </div>
                    <div class="text-sm text-gray-600">Konsentrasi Keahlian</div>
                  </div>
                  <div class="p-4 text-center rounded-lg bg-orange-50">
                    <div class="text-2xl font-bold text-orange-600">{{ siswaCount }}+</div>
                    <div class="text-sm text-gray-600">Siswa Aktif</div>
                  </div>
                  <div class="p-4 text-center rounded-lg bg-green-50">
                    <div class="text-2xl font-bold text-green-600">{{ prestasiCount }}+</div>
                    <div class="text-sm text-gray-600">Prestasi</div>
                  </div>
                  <div class="p-4 text-center rounded-lg bg-purple-50">
                    <div class="text-2xl font-bold text-purple-600">
                      {{ tahunCount }}
                    </div>
                    <div class="text-sm text-gray-600">Tahun Berdiri</div>
                  </div>
                </div>

                <p class="leading-relaxed text-gray-600">
                  Dengan fasilitas modern dan tenaga pengajar profesional, kami terus berinovasi dalam metode
                  pembelajaran untuk mencapai visi "Inovasi Raih Prestasi".
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>

    <motion.section
      id="sambutan"
      class="relative overflow-hidden"
      :initial="{ opacity: 0, y: 50 }"
      :whileInView="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.8 }"
      :inViewOptions="{ once: true }"
    >
      <div class="absolute top-20 right-50 z-0">
        <Icon name="lucide:handshake" size="150" class="text-blue-300 opacity-10 sambutan-ornament-1" />
      </div>
      <div class="absolute bottom-20 right-12 z-0">
        <Icon name="lucide:message-circle" size="125" class="text-orange-300 opacity-8 sambutan-ornament-2" />
      </div>
      <div class="absolute top-1/2 left-16 z-0">
        <Icon name="lucide:award" size="170" class="text-blue-400 opacity-12 sambutan-ornament-3" />
      </div>

      <div class="absolute top-5 left-70 z-0">
        <svg width="200" height="200" viewBox="0 0 24 24" class="text-yellow-300 opacity-20 large-svg-1">
          <path
            fill="currentColor"
            d="M12 2C13.1 2 14 2.9 14 4V5C14 5.55 14.45 6 15 6S16 5.55 16 5V4C16 1.79 14.21 0 12 0S8 1.79 8 4V5C8 5.55 8.45 6 9 6S10 5.55 10 5V4C10 2.9 10.9 2 12 2M12 6C8.13 6 5 9.13 5 13C5 14.65 5.67 16.17 6.78 17.22L8.07 15.93C7.5 15.25 7.14 14.4 7.07 13.5H9.07C9.15 14.05 9.4 14.56 9.78 15L12 17.22L14.22 15C14.6 14.56 14.85 14.05 14.93 13.5H16.93C16.86 14.4 16.5 15.25 15.93 15.93L17.22 17.22C18.33 16.17 19 14.65 19 13C19 9.13 15.87 6 12 6M12 8C14.76 8 17 10.24 17 13C17 13.5 16.95 14 16.84 14.5H15.16C15.05 14 15 13.5 15 13C15 11.34 13.66 10 12 10S9 11.34 9 13C9 13.5 8.95 14 8.84 14.5H7.16C7.05 14 7 13.5 7 13C7 10.24 9.24 8 12 8M12 11C12.55 11 13 11.45 13 12S12.55 13 13 13 11 12.55 11 12 11.45 11 12 11M12 18C11.45 18 11 18.45 11 19V22H13V19C13 18.45 12.55 18 12 18Z"
          />
        </svg>
      </div>

      <div class="container px-4 mx-auto md:px-10 relative z-10">
        <div class="flex flex-col items-center justify-center gap-12 lg:flex-row">
          <motion.div
            class="flex flex-col w-full max-w-3xl gap-6 lg:w-3/5"
            :initial="{ opacity: 0, x: -50 }"
            :whileInView="{ opacity: 1, x: 0 }"
            :transition="{ duration: 0.8, delay: 0.2 }"
            :inViewOptions="{ once: true }"
          >
            <div class="inline-block">
              <span
                class="px-2 py-3 flex justify-center items-center text-lg font-bold tracking-widest uppercase rounded-full md:text-xl"
                :style="`background: #1d4ed8; color: white`"
              >
                Sambutan Kepala Sekolah
              </span>
            </div>

            <div class="p-8 bg-white border-2 border-blue-100 shadow-xl rounded-2xl">
              <h3 class="mb-4 text-2xl font-bold text-gray-800">Assalamu'alaikum Wr. Wb.</h3>
              <div class="space-y-4 leading-relaxed text-gray-600">
                <p>
                  Puji syukur kepada Allah SWT atas terbitnya website SMK Negeri 2 Singosari untuk menjawab kebutuhan
                  informasi melalui teknologi informasi. Dalam memajukan pendidikan di era teknologi yang pesat,
                  diperlukan sarana prasarana kondusif dan informasi bagi siswa, guru, orangtua maupun masyarakat.
                </p>
                <p>
                  Besar harapan kami sarana ini memberi manfaat bagi semua pihak di lingkup pendidikan khususnya SMK
                  Negeri 2 Singosari. Kami mengharapkan masukan dari berbagai pihak agar terus belajar dan meng-update
                  sehingga tampilan, isi dan mutu website berkembang lebih baik. Terima kasih atas kerjasamanya, maju
                  terus SMK Negeri 2 Singosari.
                </p>
                <p class="italic">Wassalamu'alaikum wr.wb.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            class="w-full max-w-xl lg:w-1/5"
            :initial="{ opacity: 0, x: 50 }"
            :whileInView="{ opacity: 1, x: 0 }"
            :transition="{ duration: 0.8, delay: 0.4 }"
            :inViewOptions="{ once: true }"
          >
            <div class="relative max-w-xs group">
              <div
                class="relative overflow-hidden transition-all duration-500 transform border-4 border-white shadow-2xl rounded-2xl group-hover:scale-105 group-hover:shadow-3xl"
              >
                <NuxtImg
                  src="/images/kepsek.webp"
                  width="600"
                  height="600"
                  alt="Foto Kepala Sekolah"
                  class="w-full h-auto"
                />
                <div
                  class="absolute inset-0 transition-opacity duration-500 bg-gradient-to-t from-blue-900/70 to-transparent"
                ></div>

                <div class="absolute bottom-0 left-0 right-0 p-4">
                  <p class="text-xl font-bold text-center text-white">Sumijah S.Pd M.Si</p>
                  <p class="text-sm text-center text-white/90">Kepala Sekolah SMKN 2 Singosari</p>
                </div>
              </div>
              <div
                class="absolute w-32 h-32 rounded-full -bottom-4 -left-4 bg-gradient-to-br from-orange-500 to-orange-700 opacity-20 blur-2xl -z-10"
              ></div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>

    <motion.section
      id="prestasi"
      class="relative overflow-hidden"
      :initial="{ opacity: 0, y: 50 }"
      :whileInView="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.8 }"
      :inViewOptions="{ once: true }"
    >
      <div class="absolute inset-0 wave-pattern opacity-50 z-0"></div>

      <div
        class="absolute bottom-0 left-80 w-42 h-42 bg-gradient-to-br from-violet-400 to-purple-400 rounded-full opacity-9 large-prestasi-shape-1"
      ></div>
      <div
        class="absolute bottom-0 right-80 w-48 h-48 bg-gradient-to-br from-pink-400 to-rose-400 transform rotate-45 opacity-7 large-prestasi-shape-2"
      ></div>

      <div class="absolute bottom-20 left-10 z-0">
        <Icon name="lucide:trophy" size="120" class="text-orange-300 opacity-10 prestasi-ornament-1" />
      </div>
      <div class="absolute top-0 right-80 z-0">
        <Icon name="lucide:medal" size="135" class="text-blue-400 opacity-8 prestasi-ornament-2" />
      </div>
      <div class="absolute bottom-1/3 right-12 z-0">
        <Icon name="lucide:star" size="155" class="text-orange-300 opacity-12 prestasi-ornament-3" />
      </div>

      <div class="container flex flex-col items-center gap-8 mx-auto relative z-10">
        <motion.div
          class="relative flex flex-col w-full max-w-5xl gap-6 p-8 mx-auto bg-white border-2 border-blue-100 shadow-xl rounded-2xl"
          :initial="{ opacity: 0, scale: 0.95 }"
          :whileInView="{ opacity: 1, scale: 1 }"
          :transition="{ duration: 0.6, delay: 0.2 }"
          :inViewOptions="{ once: true }"
        >
          <div class="overflow-hidden">
            <div
              class="flex transition-transform duration-500 ease-in-out"
              :style="{
                transform: `translateX(-${currentAchievement * 100}%)`,
              }"
            >
              <div v-for="(achievement, index) in achievements" :key="index" class="flex-shrink-0 w-full">
                <NuxtLink v-if="achievement.slug" :to="`/berita/${achievement.slug}`" class="block cursor-pointer">
                  <div class="flex flex-col items-center gap-8 md:flex-row md:h-80">
                    <NuxtImg
                      :src="achievement.image"
                      class="object-cover w-full rounded-lg shadow-md aspect-square md:w-1/3"
                      alt="Achievement"
                    />
                    <div class="flex flex-col gap-4 text-center md:text-left md:w-2/3 md:pr-5 md:justify-center">
                      <h3 class="text-xl md:text-2xl font-bold text-gray-800">
                        {{ achievement.title }}
                      </h3>
                      <p class="leading-relaxed text-gray-600 text-sm md:text-base line-clamp-4">
                        {{ achievement.description }}
                      </p>
                    </div>
                  </div>
                </NuxtLink>
                <div v-else class="flex flex-col items-center gap-8 md:flex-row md:h-80">
                  <NuxtImg
                    :src="achievement.image"
                    class="object-cover w-full rounded-lg shadow-md aspect-square md:w-1/3"
                    alt="Achievement"
                  />
                  <div class="flex flex-col gap-4 text-center md:text-left md:w-2/3 md:pr-5 md:justify-center">
                    <h3 class="text-xl md:text-2xl font-bold text-gray-800">
                      {{ achievement.title }}
                    </h3>
                    <p class="leading-relaxed text-gray-600 text-sm md:text-base line-clamp-4">
                      {{ achievement.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="border-t border-gray-200"></div>

          <div class="flex items-center justify-between">
            <div class="flex gap-4">
              <button
                @click="prevAchievement"
                class="flex items-center justify-center p-3 transition bg-gray-100 border border-gray-200 rounded-full shadow-md cursor-pointer hover:bg-blue-600 hover:text-white hover:scale-110"
              >
                <Icon name="lucide:chevron-left" size="20" />
              </button>
              <button
                @click="nextAchievement"
                class="flex items-center justify-center p-3 transition bg-gray-100 border border-gray-200 rounded-full shadow-md cursor-pointer hover:bg-blue-600 hover:text-white hover:scale-110"
              >
                <Icon name="lucide:chevron-right" size="20" />
              </button>
            </div>
            <div class="font-bold text-gray-700">
              <span class="text-2xl text-blue-600">{{ String(currentAchievement + 1).padStart(2, "0") }}</span>
              <span class="mx-1 text-gray-400">/</span>
              <span class="text-lg">{{ String(achievements.length).padStart(2, "0") }}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>

    <motion.section
      id="seragam-sekolah"
      class="relative overflow-hidden"
      :initial="{ opacity: 0, y: 50 }"
      :whileInView="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.8 }"
      :inViewOptions="{ once: true }"
    >
      <div class="absolute top-20 left-16 w-3 h-3 bg-yellow-300 rounded-full opacity-70 sparkle-1"></div>
      <div class="absolute top-40 right-24 w-4 h-4 bg-blue-300 rounded-full opacity-60 sparkle-2"></div>
      <div class="absolute bottom-32 left-12 w-2 h-2 bg-pink-300 rounded-full opacity-80 sparkle-3"></div>

      <div class="absolute bottom-20 right-12 z-0">
        <Icon name="lucide:badge" size="165" class="text-orange-300 opacity-8 seragam-ornament-2" />
      </div>
      <div class="absolute top-1/2 left-16 z-0">
        <Icon name="lucide:shirt" size="175" class="text-blue-400 opacity-12 seragam-ornament-3" />
      </div>

      <div
        class="absolute top-5 left-1/6 w-40 h-40 bg-gradient-to-br from-indigo-400 to-blue-400 rounded-full opacity-10 large-berita-shape-1"
      ></div>
      <div
        class="absolute bottom-10 right-1/5 w-45 h-45 bg-gradient-to-br from-teal-400 to-cyan-400 transform rotate-45 opacity-8 large-berita-shape-2"
      ></div>
      <div
        class="absolute top-1/2 right-1/4 w-35 h-35 bg-gradient-to-br from-amber-400 to-yellow-400 rounded-lg opacity-9 large-berita-shape-3"
      ></div>

      <div class="container px-4 mx-auto md:px-10 relative z-10">
        <div class="flex flex-col items-center gap-12">
          <motion.div
            class="flex flex-col items-center gap-4 text-center"
            :initial="{ opacity: 0, y: -30 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.6, delay: 0.2 }"
            :inViewOptions="{ once: true }"
          >
            <span
              class="px-8 py-3 text-xl font-bold tracking-widest text-center uppercase rounded-full md:text-2xl"
              style="background: #eff6ff; color: #1d4ed8"
            >
              Seragam Sekolah
            </span>
            <p class="max-w-2xl text-lg text-center text-white">Koleksi seragam sekolah SMK Negeri 2 Singosari</p>
          </motion.div>

          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-full max-w-[1600px]">
            <UniformCard
              :gradeImages="{
                X: {
                  L: [
                    '/images/seragam/putih-putih/10-putih-putih-jas-l/DSC04215.webp',
                    '/images/seragam/putih-putih/10-putih-putih-jas-l/DSC04261.webp',
                    '/images/seragam/putih-putih/10-putih-putih-jas-l/DSC04269.webp',
                    '/images/seragam/putih-putih/10-putih-putih-jas-l/DSC04273.webp',
                  ],
                  P: [
                    '/images/seragam/putih-putih/10-putih-putih-jas-p/DSC04215.webp',
                    '/images/seragam/putih-putih/10-putih-putih-jas-p/DSC04249.webp',
                    '/images/seragam/putih-putih/10-putih-putih-jas-p/DSC04256.webp',
                    '/images/seragam/putih-putih/10-putih-putih-jas-p/DSC04256.webp',
                  ],
                },
                XI: {
                  L: [
                    '/images/seragam/putih-putih/11-putih-putih-jas-l/DSC04320.webp',
                    '/images/seragam/putih-putih/11-putih-putih-jas-l/DSC04340.webp',
                    '/images/seragam/putih-putih/11-putih-putih-jas-l/DSC04341.webp',
                    '/images/seragam/putih-putih/11-putih-putih-jas-l/DSC04349.webp',
                  ],
                  P: [
                    '/images/seragam/putih-putih/11-putih-putih-jas-p/DSC04320.webp',
                    '/images/seragam/putih-putih/11-putih-putih-jas-p/DSC04354.webp',
                    '/images/seragam/putih-putih/11-putih-putih-jas-p/DSC04356.webp',
                    '/images/seragam/putih-putih/11-putih-putih-jas-p/DSC04363.webp',
                  ],
                },
              }"
              day="Almamater (Jas)"
              dayNumber=""
              uniformType="Almamater (Jas)"
              uniformDay="Senin"
              primaryColor="sky"
            />

            <UniformCard
              :gradeImages="{
                X: {
                  L: [
                    '/images/seragam/putih-putih/10-putih-putih-l/DSC04123.webp',
                    '/images/seragam/putih-putih/10-putih-putih-l/DSC04170.webp',
                    '/images/seragam/putih-putih/10-putih-putih-l/DSC04177.webp',
                    '/images/seragam/putih-putih/10-putih-putih-l/DSC04188.webp',
                  ],
                  P: [
                    '/images/seragam/putih-putih/10-putih-putih-p/10-putih-putih-p-1.webp',
                    '/images/seragam/putih-putih/10-putih-putih-p/DSC04123.webp',
                    '/images/seragam/putih-putih/10-putih-putih-p/DSC04200.webp',
                    '/images/seragam/putih-putih/10-putih-putih-p/DSC04209.webp',
                  ],
                },
                XI: {
                  L: [
                    '/images/seragam/putih-putih/11-putih-putih-l/11-putih-putih-l-1.webp',
                    '/images/seragam/putih-putih/11-putih-putih-l/11-putih-putih-l-2.webp',
                    '/images/seragam/putih-putih/11-putih-putih-l/11-putih-putih-l-3.webp',
                    '/images/seragam/putih-putih/11-putih-putih-l/11-putih-putih-m.webp',
                  ],
                  P: [
                    '/images/seragam/putih-putih/11-putih-putih-l/11-putih-putih-l-1.webp',
                    '/images/seragam/putih-putih/11-putih-putih-l/11-putih-putih-l-2.webp',
                    '/images/seragam/putih-putih/11-putih-putih-l/11-putih-putih-l-3.webp',
                    '/images/seragam/putih-putih/11-putih-putih-l/11-putih-putih-m.webp',
                  ],
                },
              }"
              day="Putih Putih"
              dayNumber=""
              uniformType="Putih - Putih"
              uniformDay="Senin"
              primaryColor="gray"
            />

            <UniformCard
              :gradeImages="{
                X: {
                  L: [
                    '/images/seragam/putih-abu/10-putih-abu-l/DSC04368.webp',
                    '/images/seragam/putih-abu/10-putih-abu-l/DSC04388.webp',
                    '/images/seragam/putih-abu/10-putih-abu-l/DSC04393.webp',
                    '/images/seragam/putih-abu/10-putih-abu-l/DSC04396.webp',
                  ],
                  P: [
                    '/images/seragam/putih-abu/10-putih-abu-p/DSC04368.webp',
                    '/images/seragam/putih-abu/10-putih-abu-p/DSC04404.webp',
                    '/images/seragam/putih-abu/10-putih-abu-p/DSC04408.webp',
                    '/images/seragam/putih-abu/10-putih-abu-p/DSC04412.webp',
                  ],
                },
                XI: {
                  L: [
                    '/images/seragam/putih-abu/11-putih-abu-l/DSC03955.webp',
                    '/images/seragam/putih-abu/11-putih-abu-l/DSC04067.webp',
                    '/images/seragam/putih-abu/11-putih-abu-l/DSC04079.webp',
                    '/images/seragam/putih-abu/11-putih-abu-l/DSC04086.webp',
                  ],
                  P: [
                    '/images/seragam/putih-abu/11-putih-abu-p/DSC03955.webp',
                    '/images/seragam/putih-abu/11-putih-abu-p/DSC04033.webp',
                    '/images/seragam/putih-abu/11-putih-abu-p/DSC04051.webp',
                    '/images/seragam/putih-abu/11-putih-abu-p/DSC04100.webp',
                  ],
                },
              }"
              day="Putih Abu"
              dayNumber=""
              uniformType="Putih - Abu"
              uniformDay="Selasa & Rabu"
              primaryColor="gray"
            />

            <UniformCard
              :gradeImages="{
                X: {
                  L: [
                    '/images/seragam/batik/10-batik-l/DSC04420.webp',
                    '/images/seragam/batik/10-batik-l/DSC04462.webp',
                    '/images/seragam/batik/10-batik-l/DSC04466.webp',
                    '/images/seragam/batik/10-batik-l/DSC04470.webp',
                  ],
                  P: [
                    '/images/seragam/batik/10-batik-p/DSC04420.webp',
                    '/images/seragam/batik/10-batik-p/DSC04446.webp',
                    '/images/seragam/batik/10-batik-p/DSC04448.webp',
                    '/images/seragam/batik/10-batik-p/DSC04455.webp',
                  ],
                },
                XI: {
                  L: [
                    '/images/seragam/batik/11-batik-l/DSC04477.webp',
                    '/images/seragam/batik/11-batik-l/DSC04508.webp',
                    '/images/seragam/batik/11-batik-l/DSC04512.webp',
                    '/images/seragam/batik/11-batik-l/DSC04515.webp',
                  ],
                  P: [
                    '/images/seragam/batik/11-batik-p/DSC04477.webp',
                    '/images/seragam/batik/11-batik-p/DSC04491.webp',
                    '/images/seragam/batik/11-batik-p/DSC04495.webp',
                    '/images/seragam/batik/11-batik-p/DSC04503.webp',
                  ],
                },
              }"
              day="Batik"
              dayNumber=""
              uniformType="Batik"
              uniformDay="Kamis"
              primaryColor="blue"
            />

            <UniformCard
              :gradeImages="{
                X: {
                  L: [
                    '/images/seragam/pramuka/10-pramuka-l/DSC04526.webp',
                    '/images/seragam/pramuka/10-pramuka-l/DSC04547.webp',
                    '/images/seragam/pramuka/10-pramuka-l/DSC04550.webp',
                    '/images/seragam/pramuka/10-pramuka-l/DSC04555.webp',
                  ],
                  P: [
                    '/images/seragam/pramuka/10-pramuka-p/DSC04526.webp',
                    '/images/seragam/pramuka/10-pramuka-p/DSC04562.webp',
                    '/images/seragam/pramuka/10-pramuka-p/DSC04565.webp',
                    '/images/seragam/pramuka/10-pramuka-p/DSC04569.webp',
                  ],
                },
                XI: {
                  L: [
                    '/images/seragam/pramuka/11-pramuka-l/DSC04675.webp',
                    '/images/seragam/pramuka/11-pramuka-l/DSC04678.webp',
                    '/images/seragam/pramuka/11-pramuka-l/DSC04688.webp',
                    '/images/seragam/pramuka/11-pramuka-l/DSC04743.webp',
                  ],
                  P: [
                    '/images/seragam/pramuka/11-pramuka-p/DSC04743.webp',
                    '/images/seragam/pramuka/11-pramuka-p/DSC04775.webp',
                    '/images/seragam/pramuka/11-pramuka-p/DSC04782.webp',
                    '/images/seragam/pramuka/11-pramuka-p/DSC04791.webp',
                  ],
                },
              }"
              day="Pramuka"
              dayNumber=""
              uniformType="Pramuka"
              uniformDay="Jum'at"
              primaryColor="brown"
            />

            <UniformCard
              :gradeImages="{
                X: {
                  L: [
                    '/images/seragam/olahraga/10-olahraga-l/DSC04801.webp',
                    '/images/seragam/olahraga/10-olahraga-l/DSC04842.webp',
                    '/images/seragam/olahraga/10-olahraga-l/DSC04856.webp',
                    '/images/seragam/olahraga/10-olahraga-l/DSC04858.webp',
                  ],
                  P: [
                    '/images/seragam/olahraga/10-olahraga-p/DSC04801.webp',
                    '/images/seragam/olahraga/10-olahraga-p/DSC04829.webp',
                    '/images/seragam/olahraga/10-olahraga-p/DSC04867.webp',
                    '/images/seragam/olahraga/10-olahraga-p/DSC04871.webp',
                  ],
                },
                XI: {
                  L: [
                    '/images/seragam/olahraga/11-olahraga-l/DSC04578.webp',
                    '/images/seragam/olahraga/11-olahraga-l/DSC04599.webp',
                    '/images/seragam/olahraga/11-olahraga-l/DSC04608.webp',
                    '/images/seragam/olahraga/11-olahraga-l/DSC04614.webp',
                  ],
                  P: [
                    '/images/seragam/olahraga/11-olahraga-p/DSC04578.webp',
                    '/images/seragam/olahraga/11-olahraga-p/DSC04615.webp',
                    '/images/seragam/olahraga/11-olahraga-p/DSC04625.webp',
                    '/images/seragam/olahraga/11-olahraga-p/DSC04631.webp',
                  ],
                },
              }"
              day="Olahraga"
              dayNumber=""
              uniformType="Olahraga"
              uniformDay="Sesuai Jadwal"
              primaryColor="sky"
            />
          </div>

          <div class="w-full max-w-4xl p-6 bg-white shadow-lg rounded-2xl">
            <div class="flex gap-4">
              <Icon name="lucide:info" size="24" class="text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 class="mb-2 font-bold text-gray-800">Catatan Penting</h4>
                <ul class="space-y-1 text-sm text-gray-600 list-disc list-inside">
                  <li>Seragam harus dikenakan dengan rapi dan sesuai ketentuan</li>
                  <li>Sepatu hitam dengan kaos kaki putih wajib digunakan setiap hari</li>
                  <li>Atribut sekolah seperti name tag dan badge harus dipasang dengan benar</li>
                  <li>Rambut harus dipotong rapi sesuai dengan peraturan sekolah</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>

    <motion.section
      id="jejak-sejarah"
      class="relative py-20 overflow-hidden h-min-screen"
      :initial="{ opacity: 0, y: 50 }"
      :whileInView="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.8 }"
      :inViewOptions="{ once: true }"
    >
      <div class="absolute top-20 right-1/4 z-0">
        <Icon name="lucide:clock" size="200" class="text-blue-300 opacity-10 timeline-ornament-1" />
      </div>
      <div class="absolute bottom-32 right-12 z-0">
        <Icon name="lucide:calendar" size="140" class="text-orange-300 opacity-8 timeline-ornament-2" />
      </div>
      <div class="absolute top-1/2 left-16 z-0">
        <Icon name="lucide:scroll" size="185" class="text-blue-400 opacity-12 timeline-ornament-3" />
      </div>

      <div
        class="absolute top-10 left-1/4 w-38 h-38 bg-gradient-to-br from-green-400 to-teal-400 rounded-full opacity-8 large-timeline-shape-1"
      ></div>
      <div
        class="absolute bottom-20 right-1/3 w-42 h-42 bg-gradient-to-br from-orange-400 to-red-400 transform rotate-45 opacity-6 large-timeline-shape-2"
      ></div>
      <div
        class="absolute top-1/3 right-5 w-36 h-36 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-lg opacity-10 large-timeline-shape-3"
      ></div>

      <div class="absolute top-1/4 left-10 z-0">
        <Icon name="lucide:book-open" size="75" class="text-blue-300 opacity-20 large-icon-4" />
      </div>

      <div class="container relative flex flex-col items-center gap-8 px-4 mx-auto text-center md:px-10 z-10">
        <div class="absolute top-0 left-0 bg-blue-200 rounded-full w-72 h-72 opacity-20 blur-3xl z-10"></div>
        <div class="absolute bottom-0 right-0 bg-orange-200 rounded-full w-96 h-96 opacity-20 blur-3xl z-10"></div>

        <div class="flex flex-col items-center gap-4">
          <div class="inline-block">
            <span
              class="px-8 py-3 text-xl font-bold tracking-widest uppercase rounded-full md:text-2xl"
              :style="`background: #1d4ed8; color: white`"
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

        <div v-if="isMobile" class="relative flex flex-col items-center w-full py-10">
          <motion.div
            class="absolute top-0 w-1 h-full transform rounded-full shadow-lg left-1/2 bg-gradient-to-b from-blue-400 via-blue-600 to-blue-400"
            :initial="{ scaleY: 0.1 }"
            :animate="{ scaleY: lineScale }"
            :transition="{ duration: 3, ease: 'easeInOut' }"
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
              class="absolute top-0 w-1 h-8 transform -translate-x-1/2 left-1/2 bg-gradient-to-b from-transparent to-blue-600"
              :initial="{ scaleY: index === 0 ? 1 : 0 }"
              :animate="{ scaleY: clickedMarkers[index] ? 1 : 0 }"
              :transition="{ duration: 3, delay: index * 0.2 }"
              style="transform-origin: top"
            ></motion.div>

            <motion.div
              v-if="showAllIcons || index === 0"
              :class="[
                'z-20 flex items-center justify-center w-16 h-16 mb-6 transition-all duration-300 border-4 border-white rounded-full shadow-xl bg-gradient-to-br from-blue-500 to-blue-700 group-hover:scale-110',
                clickedMarkers[index] ? 'ring-4 ring-yellow-400' : '',
                'cursor-pointer pointer-events-auto',
              ]"
              :initial="{
                opacity: index === 0 ? 1 : 0,
                scale: index === 0 ? 1 : 0,
              }"
              :animate="{
                opacity: clickedMarkers[index] ? 1 : 0,
                scale: clickedMarkers[index] ? 1 : 0,
              }"
              :transition="{ duration: 0.8, delay: index * 0.2 }"
              @click="index === 0 && toggleMarker(index)"
            >
              <Icon :name="item.icon" size="28" class="text-white" />
            </motion.div>

            <motion.div
              v-if="cardVisibility[index]"
              :initial="{ opacity: 0, y: -100 }"
              :whileInView="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.8, delay: 0 }"
              :inViewOptions="{ once: true }"
            >
              <div
                class="w-full p-6 text-center transition-all duration-300 bg-white border-2 border-blue-100 shadow-xl rounded-2xl hover:border-blue-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <div
                  :class="[
                    'inline-block px-6 py-3 rounded-full mb-4 font-bold text-lg',
                    index % 2 === 0
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                      : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white',
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

        <div v-else class="relative max-w-[1200px] mx-auto py-24">
          <motion.div
            class="absolute left-1/2 top-0 bottom-0 w-1 bg-[linear-gradient(to_bottom,transparent_0%_0%,#3b82f6_10%_50%,#2563eb_50%_90%,#3b82f6_90%_95%,transparent)] -translate-x-1/2 rounded-sm shadow-[0_0_20px_rgba(59,130,246,0.3)] z-10"
            :initial="{ scaleY: 1 }"
            :animate="{ scaleY: lineScale }"
            :transition="{ duration: 0.1, ease: 'linear' }"
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
              :initial="{ opacity: 0, y: -100 }"
              :whileInView="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.8, delay: 0 }"
              :inViewOptions="{ once: true }"
            >
              <div
                :class="[
                  'p-8 transition-all duration-500 bg-white/80 backdrop-blur-lg border border-white/30 shadow-2xl rounded-2xl hover:border-white/50 hover:shadow-3xl hover:scale-105 hover:-translate-y-2 group h-[300px] w-[42%] z-20 flex flex-col justify-center items-center text-center',
                  index % 2 === 0 ? 'mr-12 float-left' : 'ml-12 float-right',
                ]"
              >
                <div
                  :class="[
                    'inline-block px-6 py-3 rounded-full mb-4 font-bold text-lg shadow-lg',
                    index % 2 === 0
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                      : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white',
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

                <div
                  :class="[
                    'absolute top-4 w-3 h-3 rounded-full',
                    index % 2 === 0 ? 'right-4 bg-blue-400' : 'left-4 bg-orange-400',
                  ]"
                ></div>
              </div>
            </motion.div>

            <motion.div
              v-if="showAllIcons || index === 0"
              class="absolute z-40 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
              :initial="{
                opacity: index === 0 ? 1 : 0,
                scale: index === 0 ? 1 : 0,
              }"
              :animate="{
                opacity: clickedMarkers[index] ? 1 : 0,
                scale: clickedMarkers[index] ? 1 : 0,
              }"
              :transition="{ duration: 0.8, delay: index * 0.2 }"
            >
              <div
                :class="[
                  'w-16 h-16 rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(59,130,246,0.15)] border-[5px] border-white/80 backdrop-blur-sm transition-all duration-500 ease-in-out group-hover:scale-115 group-hover:rotate-[10deg] group-hover:shadow-[0_16px_40px_rgba(59,130,246,0.3)] cursor-pointer pointer-events-auto',
                  index % 2 === 0
                    ? 'bg-gradient-to-br from-blue-500 to-blue-700'
                    : 'bg-gradient-to-br from-orange-500 to-orange-700',
                  clickedMarkers[index],
                ]"
                @click="index === 0 && toggleMarker(index)"
              >
                <Icon :name="item.icon" size="28" class="text-white" />
              </div>
            </motion.div>

            <motion.div
              v-if="cardVisibility[index]"
              :class="[
                'absolute top-1/2 w-[60px] h-[3px] -translate-y-1/2 z-1 transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] group-hover:h-[4px]',
                index % 2 === 0
                  ? 'right-1/2 mr-8 bg-gradient-to-r from-transparent via-blue-500 to-blue-600 rounded-full'
                  : 'left-1/2 ml-8 bg-gradient-to-l from-transparent via-blue-500 to-blue-600 rounded-full',
              ]"
              :initial="{ scaleX: 0 }"
              :animate="{ scaleX: cardVisibility[index] ? 1 : 0 }"
              :transition="{ duration: 0.8, delay: 0 }"
              :style="{
                transformOrigin: index % 2 === 0 ? 'right' : 'left',
              }"
            ></motion.div>
          </div>
        </div>

        <div
          class="max-w-2xl px-8 py-6 mt-10 text-white shadow-xl bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl"
        >
          <div class="flex flex-wrap items-center justify-between gap-6">
            <div class="flex-1 min-w-[200px]">
              <h3 class="mb-2 text-xl font-bold">Ingin Tahu Lebih Banyak?</h3>
              <p class="text-sm text-blue-100">Lihat profil lengkap sekolah kami</p>
            </div>
            <NuxtLink
              to="/informasi/profile-sekolah"
              class="inline-flex items-center gap-2 px-6 py-3 font-semibold text-blue-600 transition-colors duration-200 bg-white rounded-lg shadow-md hover:bg-blue-50 hover:shadow-lg"
            >
              Profil Sekolah
              <Icon name="lucide:arrow-right" size="18" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </motion.section>

    <motion.section
      id="jurusan"
      class="relative flex flex-col items-center gap-8 py-20 h-fit overflow-hidden"
      :initial="{ opacity: 0, y: 50 }"
      :whileInView="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.8 }"
      :inViewOptions="{ once: true }"
    >
      <div class="absolute bottom-50 right-0 z-0">
        <svg width="300" height="300" viewBox="0 0 24 24" class="text-green-300 opacity-20 large-svg-jurusan">
          <path
            fill="currentColor"
            d="M12 2C13.1 2 14 2.9 14 4V5H16V4C16 1.79 14.21 0 12 0S8 1.79 8 4V5H10V4C10 2.9 10.9 2 12 2M12 6C8.13 6 5 9.13 5 13C5 14.65 5.67 16.17 6.78 17.22L8.07 15.93C7.5 15.25 7.14 14.4 7.07 13.5H9.07C9.15 14.05 9.4 14.56 9.78 15L12 17.22L14.22 15C14.6 14.56 14.85 14.05 14.93 13.5H16.93C16.86 14.4 16.5 15.25 15.93 15.93L17.22 17.22C18.33 16.17 19 14.65 19 13C19 9.13 15.87 6 12 6M12 8C14.76 8 17 10.24 17 13C17 13.5 16.95 14 16.84 14.5H15.16C15.05 14 15 13.5 15 13C15 11.34 13.66 10 12 10S9 11.34 9 13C9 13.5 8.95 14 8.84 14.5H7.16C7.05 14 7 13.5 7 13C7 10.24 9.24 8 12 8M12 11C12.55 11 13 11.45 13 12S12.55 13 13 13 11 12.55 11 12 11.45 11 12 11M12 18C11.45 18 11 18.45 11 19V22H13V19C13 18.45 12.55 18 12 18Z"
          />
        </svg>
      </div>

      <div class="absolute bottom-20 right-1/4 z-0">
        <Icon name="lucide:compass" size="210" class="text-blue-300 opacity-10 jurusan-ornament-1" />
      </div>
      <div class="absolute bottom-20 right left-0 z-0">
        <Icon name="lucide:route" size="150" class="text-orange-300 opacity-8 jurusan-ornament-2" />
      </div>

      <div
        class="absolute top-32 left-12 w-12 h-6 bg-gradient-to-r from-pink-300 to-pink-500 rounded-full opacity-20 abstract-1"
      ></div>
      <div
        class="absolute bottom-20 right-12 w-16 h-8 bg-gradient-to-r from-cyan-300 to-cyan-500 rounded-full opacity-25 abstract-2"
      ></div>

      <motion.div
        class="inline-block relative z-10"
        :initial="{ opacity: 0, scale: 0.8 }"
        :animate="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 0.6, delay: 0.2 }"
        :inViewOptions="{ once: true }"
      >
        <span
          class="px-8 py-3 text-xl font-bold tracking-widest uppercase rounded-full md:text-2xl"
          :style="`background: #1d4ed8; color: white`"
        >
          Jurusan
        </span>
      </motion.div>
      <div class="container flex items-center justify-center mx-auto relative z-10">
        <MajorCarousel />
      </div>
    </motion.section>

    <motion.section
      id="berita"
      class="relative h-min-screen overflow-hidden"
      :initial="{ opacity: 0, y: 50 }"
      :whileInView="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.8 }"
      :inViewOptions="{ once: true }"
    >
      <div class="absolute inset-0 curve-pattern opacity-40 z-0"></div>

      <div
        class="absolute top-5 left-1/6 w-35 h-35 bg-gradient-to-br from-indigo-400 to-blue-400 rounded-full opacity-10 large-berita-shape-1"
      ></div>
      <div
        class="absolute bottom-10 right-1/5 w-40 h-40 bg-gradient-to-br from-teal-400 to-cyan-400 transform rotate-45 opacity-8 large-berita-shape-2"
      ></div>
      <div
        class="absolute top-1/2 right-1/4 w-30 h-30 bg-gradient-to-br from-amber-400 to-yellow-400 rounded-lg opacity-9 large-berita-shape-3"
      ></div>

      <div class="absolute top-20 right-1/4 z-0">
        <Icon name="lucide:newspaper" size="220" class="text-blue-300 opacity-10 berita-ornament-1" />
      </div>
      <div class="absolute bottom-20 right-12 z-0">
        <Icon name="lucide:megaphone" size="160" class="text-orange-300 opacity-8 berita-ornament-2" />
      </div>
      <div class="absolute top-1/2 left-16 z-0">
        <Icon name="lucide:rss" size="180" class="text-blue-400 opacity-12 berita-ornament-3" />
      </div>

      <div class="container flex flex-col items-center gap-8 mx-auto relative z-10">
        <motion.div
          class="px-8 py-3 text-xl font-bold tracking-widest text-center uppercase rounded-full md:text-2xl"
          style="background: #eff6ff; color: #1d4ed8"
          :initial="{ opacity: 0, scale: 0.8 }"
          :animate="{ opacity: 1, scale: 1 }"
          :transition="{ duration: 0.6, delay: 0.2 }"
          :inViewOptions="{ once: true }"
        >
          Informasi & Berita
        </motion.div>

        <div class="flex flex-wrap justify-center gap-3">
          <button
            v-for="category in newsCategories"
            :key="category"
            @click="filterByCategory(category)"
            :class="[
              'font-semibold px-6 py-3 rounded-full transition-all duration-300 text-sm',
              selectedCategory === category
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200',
            ]"
          >
            {{ category === "all" ? "Semua" : category }}
          </button>
        </div>

        <div v-if="isLoadingNews" class="flex items-center justify-center py-20">
          <div class="flex flex-col items-center gap-3">
            <div class="w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin"></div>
            <p class="text-gray-600">Memuat berita...</p>
          </div>
        </div>

        <div
          v-else-if="newsData.length > 0"
          class="grid w-full grid-cols-1 gap-6 px-4 mt-5 sm:grid-cols-2 lg:grid-cols-4 place-items-stretch"
        >
          <motion.div
            v-for="(news, index) in newsData"
            :key="news.id"
            :initial="{ opacity: 0, y: 20 }"
            :whileInView="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.6 }"
            :inViewOptions="{ once: true }"
          >
            <NuxtLink
              :to="`/berita/${news.slug}`"
              class="relative flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-lg cursor-pointer rounded-2xl group hover:shadow-xl"
            >
              <div class="h-48 overflow-hidden">
                <NuxtImg
                  :src="news.thumbnail"
                  class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  :alt="news.title"
                />
              </div>
              <div class="flex flex-col flex-grow p-5">
                <p class="mb-2 text-xs font-semibold text-blue-600">
                  {{ news.tags.join(", ") }}
                </p>
                <h3 class="flex-grow mb-2 font-bold text-gray-800">
                  {{ news.title }}
                </h3>
                <p class="text-sm text-gray-500 line-clamp-2">
                  {{ news.subtitle }}
                </p>
              </div>
            </NuxtLink>
          </motion.div>
        </div>

        <div v-else class="flex flex-col items-center justify-center gap-4 py-20">
          <Icon name="lucide:newspaper" size="64" class="text-gray-400" />
          <p class="text-lg text-gray-600">Tidak ada berita untuk kategori ini</p>
        </div>

        <div class="mt-8">
          <NuxtLink
            to="/berita"
            class="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white transition-colors duration-200 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg"
          >
            Lihat Semua Berita
            <Icon name="lucide:arrow-right" size="18" />
          </NuxtLink>
        </div>
      </div>
    </motion.section>

    <motion.section
      id="faq"
      class="relative overflow-hidden"
      :initial="{ opacity: 0, y: 50 }"
      :whileInView="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.8 }"
      :inViewOptions="{ once: true }"
    >
      <div class="absolute inset-0 faq-pattern opacity-30 z-0"></div>

      <div
        class="absolute top-5 left-1/5 w-40 h-40 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full opacity-8 large-faq-shape-1"
      ></div>
      <div
        class="absolute bottom-10 right-1/4 w-45 h-45 bg-gradient-to-br from-pink-400 to-purple-400 transform rotate-45 opacity-6 large-faq-shape-2"
      ></div>
      <div
        class="absolute top-1/2 right-1/3 w-35 h-35 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-lg opacity-10 large-faq-shape-3"
      ></div>

      <div class="absolute top-1/4 left-10 z-0">
        <Icon name="lucide:help-circle" size="70" class="text-indigo-300 opacity-25 large-icon-5" />
      </div>

      <div class="absolute top-20 right-50 z-0">
        <Icon name="lucide:help-circle" size="230" class="text-blue-300 opacity-10 faq-ornament-1" />
      </div>
      <div class="absolute bottom-20 right-12 z-0">
        <Icon name="lucide:lightbulb" size="170" class="text-orange-300 opacity-8 faq-ornament-2" />
      </div>
      <div class="absolute top-1/2 left-16 z-0">
        <Icon name="lucide:message-square" size="190" class="text-blue-400 opacity-12 faq-ornament-3" />
      </div>

      <div class="relative z-10">
        <FAQSection />
      </div>
    </motion.section>

    <AnimatePresence>
      <motion.button
        v-if="showBackToTop"
        @click="scrollToTop"
        class="fixed z-50 flex items-center justify-center transition-all duration-300 transform rounded-full bottom-8 right-8 w-14 h-14 hover:scale-110 group cursor-pointer"
        :style="{ background: `linear-gradient(135deg, #3b82f6, #1d4ed8)` }"
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :exit="{ opacity: 0, y: 20 }"
        :transition="{ duration: 0.3, ease: 'easeInOut' }"
      >
        <svg
          class="w-6 h-6 text-white transition-transform group-hover:-translate-y-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </AnimatePresence>
  </main>
</template>

<style scoped>
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes float-delayed {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
}

@keyframes float-slow {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes rotate-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

@keyframes pulse-slow {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.4;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}

@keyframes bounce-gentle {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
}

@keyframes rotate-very-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes float-very-slow {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
}

@keyframes fade-in-out {
  0%,
  100% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.6;
  }
}

.hero-shape-2 {
  animation: float-delayed 8s ease-in-out infinite;
}

.hero-shape-3 {
  animation: float-slow 7s ease-in-out infinite;
}

.large-hero-shape-1 {
  animation: float-very-slow 12s ease-in-out infinite;
}

.large-hero-shape-2 {
  animation: float-very-slow 15s ease-in-out infinite reverse;
}

.large-hero-shape-3 {
  animation: float-slow 10s ease-in-out infinite 2s;
}

.wave-pattern {
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23dbeafe' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.curve-pattern {
  background: url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q25 0 50 10 T100 10' stroke='%23dbeafe' stroke-width='2' fill='none' opacity='0.3'/%3E%3C/svg%3E");
}

.sparkle-1 {
  animation: twinkle 2s ease-in-out infinite;
}

.sparkle-2 {
  animation: twinkle 2.5s ease-in-out infinite 0.5s;
}

.sparkle-3 {
  animation: twinkle 1.8s ease-in-out infinite 1s;
}

.large-profil-shape-1 {
  animation: float-very-slow 14s ease-in-out infinite;
}

.large-profil-shape-2 {
  animation: float-very-slow 16s ease-in-out infinite reverse;
}

.large-profil-shape-3 {
  animation: float-slow 11s ease-in-out infinite 1s;
}

.large-prestasi-shape-1 {
  animation: float-very-slow 13s ease-in-out infinite;
}

.large-prestasi-shape-2 {
  animation: float-very-slow 17s ease-in-out infinite reverse;
}

.large-berita-shape-1 {
  animation: float-very-slow 15s ease-in-out infinite;
}

.large-berita-shape-2 {
  animation: float-very-slow 18s ease-in-out infinite reverse;
}

.large-berita-shape-3 {
  animation: float-slow 12s ease-in-out infinite 2s;
}

.large-timeline-shape-1 {
  animation: float-very-slow 14s ease-in-out infinite;
}

.large-timeline-shape-2 {
  animation: float-very-slow 16s ease-in-out infinite reverse;
}

.large-timeline-shape-3 {
  animation: float-slow 11s ease-in-out infinite 1s;
}

.large-faq-shape-1 {
  animation: float-very-slow 13s ease-in-out infinite;
}

.large-faq-shape-2 {
  animation: float-very-slow 17s ease-in-out infinite reverse;
}

.large-faq-shape-3 {
  animation: float-slow 10s ease-in-out infinite 2s;
}

.large-icon-4 {
  animation: float 8s ease-in-out infinite, rotate-very-slow 32s linear infinite;
}

.large-icon-5 {
  animation: float 9s ease-in-out infinite, rotate-very-slow 28s linear infinite reverse;
}

.large-svg-1 {
  animation: float 6s ease-in-out infinite, rotate-very-slow 22s linear infinite;
}

.large-svg-jurusan {
  animation: float 7s ease-in-out infinite, rotate-very-slow 30s linear infinite reverse;
}

.abstract-1 {
  animation: float 5s ease-in-out infinite;
}

.abstract-2 {
  animation: fade-in-out 4.5s ease-in-out infinite 1s;
}

.faq-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23dbeafe' fill-opacity='0.15'%3E%3Ctext x='40' y='25' font-family='Arial' font-size='20' text-anchor='middle'%3E%3F%3C/text%3E%3Ctext x='10' y='55' font-family='Arial' font-size='16' text-anchor='middle'%3E%F0%9F%92%A1%3C/text%3E%3Ctext x='70' y='15' font-family='Arial' font-size='18' text-anchor='middle'%3E%3F%3C/text%3E%3Ctext x='40' y='75' font-family='Arial' font-size='14' text-anchor='middle'%3E%F0%9F%92%A1%3C/text%3E%3C/g%3E%3C/svg%3E");
}

/* Thematic ornament animations */
.hero-ornament-1 {
  animation: float 6s ease-in-out infinite, rotate-very-slow 35s linear infinite;
}

.hero-ornament-2 {
  animation: float-delayed 8s ease-in-out infinite, rotate-very-slow 40s linear infinite reverse;
}

.hero-ornament-3 {
  animation: float-slow 7s ease-in-out infinite, rotate-very-slow 38s linear infinite;
}

.profil-ornament-1 {
  animation: float 7s ease-in-out infinite, rotate-very-slow 36s linear infinite;
}

.profil-ornament-2 {
  animation: float-delayed 9s ease-in-out infinite, rotate-very-slow 42s linear infinite reverse;
}

.profil-ornament-3 {
  animation: float-slow 8s ease-in-out infinite, rotate-very-slow 39s linear infinite;
}

.sambutan-ornament-1 {
  animation: float 6.5s ease-in-out infinite, rotate-very-slow 37s linear infinite;
}

.sambutan-ornament-2 {
  animation: float-delayed 8.5s ease-in-out infinite, rotate-very-slow 41s linear infinite reverse;
}

.sambutan-ornament-3 {
  animation: float-slow 7.5s ease-in-out infinite, rotate-very-slow 38s linear infinite;
}

.prestasi-ornament-1 {
  animation: float 7.5s ease-in-out infinite, rotate-very-slow 36s linear infinite;
}

.prestasi-ornament-2 {
  animation: float-delayed 9.5s ease-in-out infinite, rotate-very-slow 42s linear infinite reverse;
}

.prestasi-ornament-3 {
  animation: float-slow 8.5s ease-in-out infinite, rotate-very-slow 39s linear infinite;
}

.seragam-ornament-2 {
  animation: float-delayed 8s ease-in-out infinite, rotate-very-slow 40s linear infinite reverse;
}

.seragam-ornament-3 {
  animation: float-slow 7s ease-in-out infinite, rotate-very-slow 38s linear infinite;
}

.timeline-ornament-1 {
  animation: float 7s ease-in-out infinite, rotate-very-slow 36s linear infinite;
}

.timeline-ornament-2 {
  animation: float-delayed 9s ease-in-out infinite, rotate-very-slow 42s linear infinite reverse;
}

.timeline-ornament-3 {
  animation: float-slow 8s ease-in-out infinite, rotate-very-slow 39s linear infinite;
}

.jurusan-ornament-1 {
  animation: float 6.5s ease-in-out infinite, rotate-very-slow 37s linear infinite;
}

.jurusan-ornament-2 {
  animation: float-delayed 8.5s ease-in-out infinite, rotate-very-slow 41s linear infinite reverse;
}

.jurusan-ornament-3 {
  animation: float-slow 7.5s ease-in-out infinite, rotate-very-slow 38s linear infinite;
}

.berita-ornament-1 {
  animation: float 7.5s ease-in-out infinite, rotate-very-slow 36s linear infinite;
}

.berita-ornament-2 {
  animation: float-delayed 9.5s ease-in-out infinite, rotate-very-slow 42s linear infinite reverse;
}

.berita-ornament-3 {
  animation: float-slow 8.5s ease-in-out infinite, rotate-very-slow 39s linear infinite;
}

.faq-ornament-1 {
  animation: float 6s ease-in-out infinite, rotate-very-slow 35s linear infinite;
}

.faq-ornament-2 {
  animation: float-delayed 8s ease-in-out infinite, rotate-very-slow 40s linear infinite reverse;
}

.faq-ornament-3 {
  animation: float-slow 7s ease-in-out infinite, rotate-very-slow 38s linear infinite;
}

@media (max-width: 768px) {
  .hero-shape-1,
  .hero-shape-2,
  .hero-shape-3,
  .large-hero-shape-1,
  .large-hero-shape-2,
  .large-hero-shape-3,
  .sparkle-1,
  .sparkle-2,
  .sparkle-3,
  .large-profil-shape-1,
  .large-profil-shape-2,
  .large-profil-shape-3,
  .large-prestasi-shape-1,
  .large-prestasi-shape-2,
  .large-berita-shape-1,
  .large-berita-shape-2,
  .large-berita-shape-3,
  .large-timeline-shape-1,
  .large-timeline-shape-2,
  .large-timeline-shape-3,
  .large-faq-shape-1,
  .large-faq-shape-2,
  .large-faq-shape-3,
  .large-icon-4,
  .large-icon-5,
  .large-svg-1,
  .abstract-1,
  .abstract-2,
  .large-svg-jurusan,
  .hero-ornament-1,
  .hero-ornament-2,
  .hero-ornament-3,
  .profil-ornament-1,
  .profil-ornament-2,
  .profil-ornament-3,
  .sambutan-ornament-1,
  .sambutan-ornament-2,
  .sambutan-ornament-3,
  .prestasi-ornament-1,
  .prestasi-ornament-2,
  .prestasi-ornament-3,
  .seragam-ornament-2,
  .seragam-ornament-3,
  .timeline-ornament-1,
  .timeline-ornament-2,
  .timeline-ornament-3,
  .jurusan-ornament-1,
  .jurusan-ornament-2,
  .jurusan-ornament-3,
  .berita-ornament-1,
  .berita-ornament-2,
  .berita-ornament-3,
  .faq-ornament-1,
  .faq-ornament-2,
  .faq-ornament-3 {
    display: none;
  }

  .faq-pattern {
    display: none;
  }
}

@media (max-width: 1024px) {
  .animated-icon {
    width: 32px;
    height: 32px;
  }
}
</style>
