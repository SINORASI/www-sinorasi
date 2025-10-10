<script lang="ts" setup>
import type { News } from "~/models/News";

definePageMeta({
  layout: "default",
});

interface CounterProps {
  jurusanTarget?: number;
  siswaTarget?: number;
  prestasiTarget?: number;
  duration?: number;
}

const props = withDefaults(defineProps<CounterProps>(), {
  jurusanTarget: 8,
  siswaTarget: 1000,
  prestasiTarget: 50,
  duration: 2000,
});

const jurusanCount = ref(0);
const siswaCount = ref(0);
const prestasiCount = ref(0);

// News section
const selectedCategory = ref<string>("all");
const newsCategories = ref<string[]>(["all", "Pengumuman", "Prestasi", "Kerjasama", "Program Baru"]);
const newsData = ref<News[]>([]);
const isLoadingNews = ref(false);

// Fetch news data
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

// Filter news by category
const filterByCategory = (category: string) => {
  selectedCategory.value = category;
  fetchNews(category);
};

// Timeline data
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

// Achievement carousel data
const achievements = [
  {
    image: "/images/placeholder.jpg",
    title: "LKS 2023 Kab. Malang : Kami Lolos Enam Bidang Lomba untuk Menuju Tingkat Provinsi",
    description:
      "SMKN 2 Singosari sukses menggelar Lomba Kompetensi Siswa (LKS) SMK tingkat Kabupaten Malang selama dua hari sejak Senin (6/3). Hasilnya, 13 siswa berhasil meraih prestasi dengan 6 bidang lomba lolos ke tingkat Provinsi Jawa Timur.",
  },
  {
    image: "/images/placeholder.jpg",
    title: "Juara 1 Lomba Karya Tulis Ilmiah Tingkat Nasional",
    description:
      "Tim siswa SMKN 2 Singosari berhasil meraih juara 1 dalam Lomba Karya Tulis Ilmiah yang diselenggarakan oleh Kementerian Pendidikan dan Kebudayaan dengan tema Inovasi Teknologi untuk Masa Depan.",
  },
  {
    image: "/images/placeholder.jpg",
    title: "Prestasi di Kompetisi Robotik Internasional",
    description:
      "Siswa jurusan Teknik Mekatronika membawa pulang medali emas dalam kompetisi robotik internasional yang diadakan di Singapura, menunjukkan kemampuan tinggi dalam bidang teknologi.",
  },
  {
    image: "/images/placeholder.jpg",
    title: "Akreditasi Unggul untuk Program Keahlian RPL",
    description:
      "Program Keahlian Rekayasa Perangkat Lunak SMKN 2 Singosari mendapat akreditasi unggul dari Badan Akreditasi Nasional, menjadikan program ini sebagai salah satu yang terbaik di Indonesia.",
  },
  {
    image: "/images/placeholder.jpg",
    title: "Kerjasama dengan Industri Teknologi Terdepan",
    description:
      "SMKN 2 Singosari menjalin kerjasama strategis dengan perusahaan teknologi terkemuka untuk memberikan pengalaman praktis kepada siswa dalam dunia kerja nyata.",
  },
];

const currentAchievement = ref(0);

const nextAchievement = () => {
  currentAchievement.value = (currentAchievement.value + 1) % achievements.length;
};

const prevAchievement = () => {
  currentAchievement.value = (currentAchievement.value - 1 + achievements.length) % achievements.length;
};

const animateCounter = (counterRef: { value: number }, target: number, duration: number): void => {
  const startTime = performance.now();
  const startValue = 0;

  const animate = (currentTime: number): void => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const easeOut = 1 - Math.pow(1 - progress, 3);

    counterRef.value = Math.floor(startValue + (target - startValue) * easeOut);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      counterRef.value = target;
    }
  };

  requestAnimationFrame(animate);
};

onMounted(() => {
  setTimeout(() => {
    animateCounter(jurusanCount, props.jurusanTarget, props.duration);
    animateCounter(siswaCount, props.siswaTarget, props.duration);
    animateCounter(prestasiCount, props.prestasiTarget, props.duration);
  }, 100);

  // Fetch initial news data
  fetchNews();

  // Check if mobile
  const checkMobile = () => {
    isMobile.value = window.innerWidth < 768;
  };
  checkMobile();
  window.addEventListener("resize", checkMobile);

  onUnmounted(() => {
    window.removeEventListener("resize", checkMobile);
  });
});

// Set page title
useHead({
  title: "Beranda - SMKN 2 Singosari",
  meta: [
    {
      name: "description",
      content:
        "SMK Negeri 2 Singosari - SINORASI (Inovasi Raih Prestasi). Tempat di mana inovasi bertemu dengan prestasi melalui pendidikan kejuruan berkualitas.",
    },
  ],
});
</script>

<template>
  <main class="flex flex-col gap-52">
    <section class="flex items-center justify-center h-[75vh] px-4 pt-24 pb-10 md:pt-20">
      <div
        class="absolute bg-blend-overlay bg-[url(/images/bg-aula.webp)] w-full h-[85vh] bg-cover top-0 left-0 right-0"
      >
        <div class="w-full h-full bg-gradient-to-t from-black/65 to-transparent"></div>
        <div class="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-transparent via-gray-200 via-gray-100 via-gray-50 to-white"></div>
      </div>
      <div class="z-50 flex flex-col items-center max-w-4xl gap-8 text-center text-white">
        <h1 class="text-3xl font-bold transition-all duration-700 ease-out md:text-5xl lg:text-6xl">INORASI</h1>
        <p class="text-lg font-semibold transition-all duration-700 ease-out md:text-xl lg:text-2xl">
          Inovasi Raih Prestasi
        </p>
        <p class="max-w-2xl text-sm leading-relaxed transition-all duration-700 ease-out md:text-lg">
          SMK Negeri 2 Singosari - Tempat di mana inovasi bertemu dengan prestasi. Kami berkomitmen untuk membentuk
          generasi muda yang siap menghadapi tantangan masa depan melalui pendidikan kejuruan berkualitas.
        </p>
        <div class="flex flex-col items-center gap-4 mt-4 sm:flex-row">
          <a
            href="#information"
            class="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Pelajari Lebih Dalam
            <Icon name="lucide:book-open" size="16" />
          </a>
          <a
            href="#berita"
            class="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 border-2 border-white rounded-lg hover:bg-white hover:text-black @media (prefers-reduced-motion: reduce) { transition: none; }"
          >
            Berita Terbaru
            <Icon name="lucide:newspaper" size="16" />
          </a>
        </div>
        <div class="flex justify-center gap-8 mt-6">
          <div class="flex flex-col items-center">
            <div class="text-xl font-bold transition-all duration-700 ease-out md:text-3xl">{{ jurusanCount }}</div>
            <div class="text-sm transition-all duration-700 ease-out md:text-lg">Jurusan</div>
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
      </div>
    </section>

    <section id="profil-sekolah" class="py-20 h-min-screen bg-gradient-to-b from-white via-blue-50 to-white">
      <div class="container px-4 mx-auto md:px-10">
        <div class="flex flex-col gap-12 lg:flex-row lg:items-center">
          <!-- Drone Image -->
          <div class="w-full lg:w-1/2">
            <div class="relative group">
              <div
                class="relative overflow-hidden transition-all duration-500 transform border-4 border-white shadow-2xl rounded-2xl group-hover:scale-105 group-hover:shadow-3xl"
              >
                <img
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
          </div>

          <!-- School Facts and Intro -->
          <div class="flex flex-col w-full gap-6 lg:w-1/2">
            <div
              class="p-6 border border-blue-200 shadow-xl bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl rounded-2xl"
            >
              <h2 class="text-3xl font-bold text-center text-white lg:text-left">Tentang SMK Negeri 2 Singosari</h2>
            </div>

            <div class="p-8 bg-white border-2 border-blue-100 shadow-xl rounded-2xl">
              <div class="space-y-6">
                <p class="leading-relaxed text-gray-600">
                  SMK Negeri 2 Singosari adalah lembaga pendidikan kejuruan yang berkomitmen untuk menghasilkan lulusan
                  yang kompeten, inovatif, dan siap menghadapi tantangan dunia kerja modern.
                </p>

                <div class="grid grid-cols-2 gap-4">
                  <div class="p-4 text-center rounded-lg bg-blue-50">
                    <div class="text-2xl font-bold text-blue-600">{{ jurusanCount }}</div>
                    <div class="text-sm text-gray-600">Program Keahlian</div>
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
                    <div class="text-2xl font-bold text-purple-600">2007</div>
                    <div class="text-sm text-gray-600">Tahun Berdiri</div>
                  </div>
                </div>

                <p class="leading-relaxed text-gray-600">
                  Dengan fasilitas modern dan tenaga pengajar profesional, kami terus berinovasi dalam metode
                  pembelajaran untuk mencapai visi "Inovasi Raih Prestasi".
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="sambutan" class="py-20 bg-gradient-to-b from-white via-blue-50 to-white">
      <div class="container px-4 mx-auto md:px-10">
        <div class="flex flex-col items-center justify-center gap-12 lg:flex-row">
          
          <!-- Content Area -->
          <div class="flex flex-col w-full max-w-3xl gap-6 lg:w-3/5">
            <div
              class="p-6 border border-blue-200 shadow-xl bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl rounded-2xl"
            >
              <h2 class="text-3xl font-bold text-center text-white lg:text-left">Sambutan Kepala Sekolah</h2>
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
          </div>
          <!-- Photo Card -->
          <div class="w-full max-w-md lg:w-2/5">
            <div class="relative group">
              <div
                class="relative overflow-hidden transition-all duration-500 transform border-4 border-white shadow-2xl rounded-2xl group-hover:scale-105 group-hover:shadow-3xl"
              >
                <img
                  src="/images/kepsek.webp"
                  width="600"
                  height="600"
                  alt="Foto Kepala Sekolah"
                  class="w-full h-auto"
                />
                <div
                  class="absolute inset-0 transition-opacity duration-500 bg-gradient-to-t from-blue-900/70 to-transparent"
                ></div>
                <!-- Name overlay at bottom -->
                <div class="absolute bottom-0 left-0 right-0 p-4">
                  <p class="text-xl font-bold text-center text-white">Sumijah S.Pd M.Si</p>
                  <p class="text-sm text-center text-white/90">Kepala Sekolah SMKN 2 Singosari</p>
                </div>
              </div>
              <div
                class="absolute w-32 h-32 rounded-full -bottom-4 -left-4 bg-gradient-to-br from-orange-500 to-orange-700 opacity-20 blur-2xl -z-10"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Achievement Carousel Section -->
    <section id="prestasi" class="py-20 bg-gradient-to-b from-white via-blue-50 to-white">
      <div class="container flex flex-col items-center gap-8 mx-auto">
        <!-- Achievement Carousel -->
        <div
          class="relative flex flex-col w-full gap-6 p-8 mx-auto bg-white border-2 border-blue-100 shadow-xl max-w-7xl rounded-2xl"
        >
          <div class="overflow-hidden">
            <div
              class="flex transition-transform duration-500 ease-in-out"
              :style="{ transform: `translateX(-${currentAchievement * 100}%)` }"
            >
              <div v-for="(achievement, index) in achievements" :key="index" class="flex-shrink-0 w-full">
                <div class="flex flex-col items-center gap-8 md:flex-row">
                  <img
                    :src="achievement.image"
                    class="object-cover w-full rounded-lg shadow-md md:w-1/2 h-[32rem]"
                    alt="Achievement"
                  />
                  <div class="flex flex-col gap-4 text-center md:text-left md:w-1/2 md:pr-5">
                    <h3 class="text-2xl font-bold text-gray-800">{{ achievement.title }}</h3>
                    <p class="leading-relaxed text-gray-600">{{ achievement.description }}</p>
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
        </div>
      </div>
    </section>

    <!-- School Uniform Section -->
    <section id="seragam-sekolah" class="py-20 bg-gradient-to-b from-white via-gray-50 to-white">
      <div class="container px-4 mx-auto md:px-10">
        <div class="flex flex-col items-center gap-12">
          <!-- Section Header -->
          <div class="flex flex-col items-center gap-4 text-center">
            <div class="p-6 px-10 py-6 bg-white border border-orange-300 shadow-xl backdrop-blur-2xl rounded-2xl">
              <h2 class="text-3xl font-bold text-orange-600">Seragam Sekolah</h2>
            </div>
            <p class="max-w-2xl text-lg text-center text-white">Koleksi seragam sekolah SMK Negeri 2 Singosari</p>
          </div>

          <!-- Uniform Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-full max-w-[1600px]">
            <!-- Putih Putih -->
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
              :almamaterImages="{
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
              day="Putih Putih"
              dayNumber=""
              uniformType="Putih - Putih"
              primaryColor="gray"
            />

            <!-- Putih Abu -->
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
              primaryColor="gray"
            />

            <!-- Batik -->
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
              primaryColor="blue"
            />

            <!-- Pramuka -->
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
              primaryColor="brown"
            />

            <!-- Olahraga -->
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
              primaryColor="sky"
            />
          </div>

          <!-- Additional Info -->
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
    </section>

    <section
      id="jejak-sejarah"
      class="py-20 overflow-hidden h-min-screen bg-gradient-to-b from-white via-blue-50 to-white"
    >
      <div class="container relative flex flex-col items-center gap-8 px-4 mx-auto text-center md:px-10">
        <!-- Decorative Background Elements -->
        <div class="absolute top-0 left-0 bg-blue-200 rounded-full w-72 h-72 opacity-20 blur-3xl -z-10"></div>
        <div class="absolute bottom-0 right-0 bg-orange-200 rounded-full w-96 h-96 opacity-20 blur-3xl -z-10"></div>

        <!-- Section Header -->
        <div class="flex flex-col items-center gap-4">
          <div
            class="p-6 px-10 py-6 border border-blue-200 shadow-xl bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl rounded-2xl"
          >
            <h2 class="text-4xl font-bold text-white">Jejak Sejarah</h2>
          </div>
          <p class="max-w-2xl text-lg text-gray-600">
            Perjalanan panjang SMK Negeri 2 Singosari dalam mengembangkan pendidikan kejuruan berkualitas di Kabupaten
            Malang.
          </p>

          <!-- Year Range Badge -->
          <div class="flex items-center gap-3 px-6 py-3 bg-white border border-blue-100 rounded-full shadow-md">
            <Icon name="lucide:calendar" size="20" class="text-blue-600" />
            <span class="font-semibold text-gray-700">2007 - 2023</span>
            <span class="text-gray-400">|</span>
            <span class="font-bold text-blue-600">{{ timelineItems.length }} Milestone</span>
          </div>
        </div>

        <!-- Mobile Timeline -->
        <div v-if="isMobile" class="relative flex flex-col items-center w-full py-10">
          <div
            class="absolute top-0 w-1 h-full transform -translate-x-1/2 rounded-full shadow-lg left-1/2 bg-gradient-to-b from-blue-400 via-blue-600 to-blue-400"
          ></div>

          <div
            v-for="(item, index) in timelineItems"
            :key="index"
            class="relative flex flex-col items-center w-full max-w-md mb-16 group"
          >
            <!-- Connecting Line -->
            <div
              class="absolute top-0 w-1 h-8 transform -translate-x-1/2 left-1/2 bg-gradient-to-b from-transparent to-blue-600"
            ></div>

            <!-- Icon Circle -->
            <div
              class="z-20 flex items-center justify-center w-16 h-16 mb-6 transition-transform duration-300 border-4 border-white rounded-full shadow-xl bg-gradient-to-br from-blue-500 to-blue-700 group-hover:scale-110"
            >
              <Icon :name="item.icon" size="28" class="text-white" />
            </div>

            <!-- Content Card -->
            <div
              class="w-full p-6 text-center transition-all duration-300 bg-white border-2 border-blue-100 shadow-xl rounded-2xl hover:border-blue-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div
                :class="[
                  'inline-block px-4 py-2 rounded-full mb-4 font-bold text-lg',
                  index % 2 === 0
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                    : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white',
                ]"
              >
                {{ item.year }}
              </div>
              <h3 class="mb-3 text-xl font-bold text-gray-800">{{ item.title }}</h3>
              <p class="text-sm leading-relaxed text-gray-600">{{ item.description }}</p>
            </div>
          </div>
        </div>

        <!-- Desktop Timeline -->
        <div v-else class="timeline-container">
          <div class="timeline-line-gradient"></div>

          <div
            v-for="(item, index) in timelineItems"
            :key="index"
            class="timeline-item"
            :class="index % 2 === 0 ? 'left' : 'right'"
          >
            <!-- Content Card -->
            <div
              class="p-8 transition-all duration-300 bg-white border-2 border-blue-100 shadow-xl timeline-content rounded-2xl hover:border-blue-300 hover:shadow-2xl hover:scale-105 group"
            >
              <div
                :class="[
                  'inline-block px-4 py-2 rounded-full mb-4 font-bold text-lg shadow-md',
                  index % 2 === 0
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                    : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white',
                ]"
              >
                {{ item.year }}
              </div>
              <h3 class="mb-3 text-2xl font-bold text-gray-800 transition-colors group-hover:text-blue-600">
                {{ item.title }}
              </h3>
              <p class="leading-relaxed text-gray-600">{{ item.description }}</p>

              <!-- Decorative Corner -->
              <div
                :class="[
                  'absolute top-4 w-3 h-3 rounded-full',
                  index % 2 === 0 ? 'right-4 bg-blue-400' : 'left-4 bg-orange-400',
                ]"
              ></div>
            </div>

            <!-- Marker Icon -->
            <div class="timeline-marker-enhanced">
              <div
                :class="[
                  'timeline-marker-inner',
                  index % 2 === 0
                    ? 'bg-gradient-to-br from-blue-500 to-blue-700'
                    : 'bg-gradient-to-br from-orange-500 to-orange-700',
                ]"
              >
                <Icon :name="item.icon" size="28" class="text-white" />
              </div>
            </div>

            <!-- Connector Line -->
            <div
              :class="['timeline-connector', index % 2 === 0 ? 'timeline-connector-left' : 'timeline-connector-right']"
            ></div>
          </div>
        </div>

        <!-- Bottom CTA -->
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
    </section>
    <section id="jurusan" class="flex flex-col items-center gap-8 py-20 h-fit">
      <div
        class="p-6 px-10 py-6 border border-blue-200 shadow-xl bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl rounded-2xl"
      >
        <h2 class="text-3xl font-bold text-white">Jurusan</h2>
      </div>
      <div class="container flex items-center justify-center mx-auto">
        <MajorCarousel />
      </div>
    </section>

    <section id="berita" class="py-20 h-min-screen">
      <div class="container flex flex-col items-center gap-8 mx-auto">
        <div
          class="p-6 px-10 py-6 border border-blue-200 shadow-xl bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl rounded-2xl"
        >
          <h2 class="text-3xl font-bold text-white">Informasi & Berita</h2>
        </div>

        <!-- Category Filter -->
        <div class="flex flex-wrap justify-center gap-3">
          <button
            v-for="category in newsCategories"
            :key="category"
            @click="filterByCategory(category)"
            :class="[
              'font-semibold px-4 py-2 rounded-full transition-all duration-300 text-sm',
              selectedCategory === category
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200',
            ]"
          >
            {{ category === "all" ? "Semua" : category }}
          </button>
        </div>

        <!-- Loading State -->
        <div v-if="isLoadingNews" class="flex items-center justify-center py-20">
          <div class="flex flex-col items-center gap-3">
            <div class="w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin"></div>
            <p class="text-gray-600">Memuat berita...</p>
          </div>
        </div>

        <!-- News Grid -->
        <div
          v-else-if="newsData.length > 0"
          class="grid w-full grid-cols-1 gap-6 px-4 mt-5 sm:grid-cols-2 lg:grid-cols-4 place-items-stretch"
        >
          <NuxtLink
            v-for="news in newsData"
            :key="news.id"
            :to="`/berita/${news.slug}`"
            class="relative flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-lg cursor-pointer rounded-2xl group hover:shadow-xl"
          >
            <div class="h-48 overflow-hidden">
              <img
                :src="news.thumbnail"
                class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                :alt="news.title"
              />
            </div>
            <div class="flex flex-col flex-grow p-5">
              <p class="mb-2 text-xs font-semibold text-blue-600">{{ news.tags.join(", ") }}</p>
              <h3 class="flex-grow mb-2 font-bold text-gray-800">{{ news.title }}</h3>
              <p class="text-sm text-gray-500 line-clamp-2">{{ news.subtitle }}</p>
            </div>
          </NuxtLink>
        </div>

        <!-- Empty State -->
        <div v-else class="flex flex-col items-center justify-center gap-4 py-20">
          <Icon name="lucide:newspaper" size="64" class="text-gray-400" />
          <p class="text-lg text-gray-600">Tidak ada berita untuk kategori ini</p>
        </div>

        <!-- View All Button -->
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
    </section>
    <section id="faq">
      <FAQSection />
    </section>
  </main>
</template>

<style scoped>
:root {
  --model-uniform-height: 300px;
}

/* Desktop Timeline Styles */
.timeline-container {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 0;
}

.timeline-line-gradient {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(to bottom, transparent, #3b82f6 10%, #2563eb 50%, #3b82f6 90%, transparent);
  transform: translateX(-50%);
  border-radius: 2px;
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
}

.timeline-item {
  position: relative;
  margin-bottom: 4rem;
  clear: both;
}

.timeline-item.left .timeline-content {
  text-align: right;
  margin-right: 3rem;
  width: 42%;
  float: left;
}

.timeline-item.right .timeline-content {
  text-align: left;
  margin-left: 3rem;
  width: 42%;
  float: right;
}

.timeline-marker-enhanced {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.timeline-marker-inner {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.15);
  border: 5px solid white;
  transition: all 0.3s ease;
}

.timeline-item:hover .timeline-marker-inner {
  transform: scale(1.15) rotate(5deg);
  box-shadow: 0 12px 32px rgba(59, 130, 246, 0.2);
}

.timeline-connector {
  position: absolute;
  top: 50%;
  width: 60px;
  height: 3px;
  background: linear-gradient(to right, transparent, #3b82f6);
  transform: translateY(-50%);
}

.timeline-connector-left {
  right: 50%;
  margin-right: 32px;
}

.timeline-connector-right {
  left: 50%;
  margin-left: 32px;
  background: linear-gradient(to left, transparent, #3b82f6);
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.timeline-item {
  animation: fadeInUp 0.6s ease-out;
}
</style>
