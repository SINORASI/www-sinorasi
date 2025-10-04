<script lang="ts" setup>
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

// Timeline data
const isMobile = ref(false);
const timelineItems = [
  {
    year: '2007',
    title: 'Awal Berdiri',
    description: 'SMK Negeri 2 Singosari didirikan secara resmi pada tanggal 25 Mei 2007 berdasarkan surat Perjanjian Kerjasama No. 0570ax/C5.4/Kep/KU/2007 antara Bupati Malang dengan Direktur Pendidikan Sekolah Menengah Kejuruan.',
    icon: 'lucide:school'
  },
  {
    year: '2010',
    title: 'Pengembangan Program Keahlian',
    description: 'Sekolah mulai mengembangkan berbagai program keahlian untuk memenuhi kebutuhan industri lokal dan nasional.',
    icon: 'lucide:book-open'
  },
  {
    year: '2015',
    title: 'Akreditasi A',
    description: 'SMK Negeri 2 Singosari berhasil meraih akreditasi A dari Badan Akreditasi Nasional Sekolah/Madrasah.',
    icon: 'lucide:award'
  },
  {
    year: '2020',
    title: 'Digitalisasi Pembelajaran',
    description: 'Implementasi pembelajaran daring dan pengembangan platform digital untuk mendukung proses belajar mengajar di era pandemi.',
    icon: 'lucide:monitor'
  },
  {
    year: '2023',
    title: 'Prestasi LKS',
    description: 'Siswa SMK Negeri 2 Singosari berhasil meraih prestasi gemilang dalam Lomba Kompetensi Siswa tingkat kabupaten dan provinsi.',
    icon: 'lucide:trophy'
  }
];

// Achievement carousel data
const achievements = [
  {
    image: '/images/placeholder.jpg',
    title: 'LKS 2023 Kab. Malang : Kami Lolos Enam Bidang Lomba untuk Menuju Tingkat Provinsi',
    description: 'SMKN 2 Singosari sukses menggelar Lomba Kompetensi Siswa (LKS) SMK tingkat Kabupaten Malang selama dua hari sejak Senin (6/3). Hasilnya, 13 siswa berhasil meraih prestasi dengan 6 bidang lomba lolos ke tingkat Provinsi Jawa Timur.'
  },
  {
    image: '/images/placeholder.jpg',
    title: 'Juara 1 Lomba Karya Tulis Ilmiah Tingkat Nasional',
    description: 'Tim siswa SMKN 2 Singosari berhasil meraih juara 1 dalam Lomba Karya Tulis Ilmiah yang diselenggarakan oleh Kementerian Pendidikan dan Kebudayaan dengan tema Inovasi Teknologi untuk Masa Depan.'
  },
  {
    image: '/images/placeholder.jpg',
    title: 'Prestasi di Kompetisi Robotik Internasional',
    description: 'Siswa jurusan Teknik Mekatronika membawa pulang medali emas dalam kompetisi robotik internasional yang diadakan di Singapura, menunjukkan kemampuan tinggi dalam bidang teknologi.'
  },
  {
    image: '/images/placeholder.jpg',
    title: 'Akreditasi Unggul untuk Program Keahlian RPL',
    description: 'Program Keahlian Rekayasa Perangkat Lunak SMKN 2 Singosari mendapat akreditasi unggul dari Badan Akreditasi Nasional, menjadikan program ini sebagai salah satu yang terbaik di Indonesia.'
  },
  {
    image: '/images/placeholder.jpg',
    title: 'Kerjasama dengan Industri Teknologi Terdepan',
    description: 'SMKN 2 Singosari menjalin kerjasama strategis dengan perusahaan teknologi terkemuka untuk memberikan pengalaman praktis kepada siswa dalam dunia kerja nyata.'
  }
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
  
  // Check if mobile
  const checkMobile = () => {
    isMobile.value = window.innerWidth < 768;
  };
  checkMobile();
  window.addEventListener('resize', checkMobile);
  
  onUnmounted(() => {
    window.removeEventListener('resize', checkMobile);
  });
});

// Set page title
useHead({
  title: 'Beranda - SMKN 2 Singosari',
  meta: [
    {
      name: 'description',
      content: 'SMK Negeri 2 Singosari - SINORASI (Inovasi Raih Prestasi). Tempat di mana inovasi bertemu dengan prestasi melalui pendidikan kejuruan berkualitas.'
    }
  ]
});
</script>

<template>
  <main class="flex flex-col gap-20">
    <section class="flex items-center justify-center min-h-screen px-4 pt-24 pb-10 md:pt-20">
      <div
        class="absolute bg-blend-darken bg-[url(/images/background-aula.jpg)] w-full h-full bg-cover bg-top top-0 left-0 right-0 bottom-0"
      >
        <div class="w-full h-full bg-gradient-to-t from-black/65 to-transparent"></div>
      </div>
      <div class="z-50 flex flex-col items-center gap-6 md:flex-row md:gap-12">
        <div class="flex flex-col max-w-sm gap-2 text-center text-white md:gap-4 md:max-w-md md:text-left">
          <h1 class="text-2xl font-bold md:text-4xl lg:text-5xl">INORASI</h1>
          <p class="text-sm font-semibold md:text-lg lg:text-xl">Inovasi Raih Prestasi</p>
          <p class="text-xs leading-relaxed md:text-base">
            SMK Negeri 2 Singosari - Tempat di mana inovasi bertemu dengan prestasi. Kami berkomitmen untuk membentuk
            generasi muda yang siap menghadapi tantangan masa depan melalui pendidikan kejuruan berkualitas.
          </p>
          <div
            class="flex flex-col items-center justify-center gap-2 mt-2 sm:flex-row md:gap-3 md:mt-3 md:justify-start"
          >
            <a
              href="#information"
              class="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-white transition bg-blue-600 rounded-lg w-fit hover:bg-blue-700 md:px-5 md:py-2 md:text-sm"
            >
              Pelajari Lebih Dalam
              <Icon name="lucide:book-open" size="14" />
            </a>
            <a
              href="#berita"
              class="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-white transition border-2 border-white rounded-lg w-fit hover:bg-white hover:text-black md:px-5 md:py-2 md:text-sm"
            >
              Berita Terbaru
              <Icon name="lucide:newspaper" size="14" />
            </a>
          </div>
          <div class="flex justify-center gap-3 mt-3 md:gap-10 md:mt-4 md:justify-start">
            <div class="flex flex-col items-center justify-center">
              <div class="text-base font-bold md:text-2xl">{{ jurusanCount }}</div>
              <div class="text-xs md:text-lg">Jurusan</div>
            </div>
            <div class="flex flex-col items-center justify-center">
              <div class="text-base font-bold md:text-2xl">{{ siswaCount }}+</div>
              <div class="text-xs md:text-lg">Siswa</div>
            </div>
            <div class="flex flex-col items-center justify-center">
              <div class="text-base font-bold md:text-2xl">{{ prestasiCount }}+</div>
              <div class="text-xs md:text-lg">Prestasi</div>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-center mt-4 md:mt-0">
          <img src="/images/logo.webp" class="w-32 h-32 md:w-56 md:h-56 lg:w-64 lg:h-64 drop-shadow-lg" />
        </div>
      </div>
    </section>
    <section id="information" class="flex flex-col items-center justify-center h-fit">
      <div class="container flex flex-col gap-20 px-10 py-10 mx-auto text-center md:text-left md:flex-row md:px-30">
        <div class="flex flex-col items-center shadow-lg rounded-2xl">
          <img src="/images/kepsek.webp" width="600" height="600" alt="Foto Kepsek" class="rounded-t-2xl" />
          <div class="py-6 rounded-lg w-fit bg-secondary">
            <p class="text-lg font-bold">Sumijah S. Pd M.Si</p>
          </div>
        </div>
        <div class="flex flex-col justify-center w-full max-w-6xl gap-5">
          <div class="flex flex-col gap-2">
            <h1 class="text-4xl font-bold">Sambutan Kepala Sekolah</h1>
          <hr class="border-2 border-zinc-100 max-w-md w-full">
          <h2 class="text-2xl font-semibold">Sambutan</h2>
          <p class="max-w-4xl w-full">
            Assalamu'alaikum wr.wb. Puji syukur kepada Alloh SWT atas terbitnya website SMK Negeri 2 Singosari untuk
            menjawab kebutuhan informasi melalui teknologi informasi. Dalam memajukan pendidikan di era teknologi yang
            pesat, diperlukan sarana prasarana kondusif dan informasi bagi siswa, guru, orangtua maupun masyarakat.
            Semoga website ini bermanfaat untuk informasi pendidikan, ilmu pengetahuan dan seputar SMK Negeri 2
            Singosari. Besar harapan kami sarana ini memberi manfaat bagi semua pihak di lingkup pendidikan khususnya
            SMK Negeri 2 Singosari.
          </p>
          <p class="w-full max-w-4xl">
            Kami mengharapkan masukan dari berbagai pihak agar terus belajar dan meng-update sehingga tampilan, isi dan
            mutu website berkembang lebih baik. Terima kasih atas kerjasamanya, maju terus SMK Negeri 2 Singosari.
            Wassalamu'alaikum wr.wb.
          </p>
        </div>
        </div>
      </div>
    </section>
    <section class="h-min-screen" id="video-profil">
      <div class="container mx-auto px-10 md:px-60 flex text-center flex-col items-center gap-5">
        <div class="bg-secondary backdrop-blur-2xl py-4 px-8 rounded-lg shadow-md">
          <h2 class="text-4xl font-bold">Video Profil</h2>
        </div>
        <ScriptYouTubePlayer video-id="Kks6HnhPzVQ">
          <template #placeholder="{ placeholder }">
            <div class="relative">
              <img :src="'/images/placeholder.jpg'" alt="Video Placeholder" class="rounded-lg" />
            </div>
          </template>
        </ScriptYouTubePlayer>
      </div>
    </section>
    <section id="jejak-sejarah" class="h-min-screen py-20">
      <div class="text-center container mx-auto flex flex-col items-center gap-5 px-10 md:px-0">
        <div class="bg-secondary backdrop-blur-2xl p-4 shadow-md rounded-lg px-6 py-4">
          <h2 class="text-3xl font-bold">Sejarah</h2>
        </div>
        <p>
          Perjalanan SMK Negeri 2 Singosari dalam mengembangkan pendidikan kejuruan berkualitas di Kabupaten Malang.
        </p>
        
        <!-- Mobile Timeline -->
        <div v-if="isMobile" class="relative flex flex-col items-center py-10 w-full">
          <div class="absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-600 h-full top-0"></div>
          <div v-for="(item, index) in timelineItems" :key="index" class="relative flex flex-col items-center mb-12 w-full max-w-md">
            <div class="bg-white shadow-lg rounded-lg p-6 w-full text-center border border-neutral-300">
              <div :class="['px-3 py-1 rounded-full w-fit mb-4 mx-auto', index % 2 === 0 ? 'bg-blue-100' : 'bg-orange-100']">
                <span :class="['font-bold', index % 2 === 0 ? 'text-blue-600' : 'text-orange-600']">{{ item.year }}</span>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-2">{{ item.title }}</h3>
              <p class="text-gray-600 text-sm">{{ item.description }}</p>
            </div>
            <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md mt-4 z-10">
              <Icon :name="item.icon" size="20" class="text-blue-600" />
            </div>
            <div v-if="index < timelineItems.length - 1" class="w-1 h-8 bg-blue-600 mt-4"></div>
          </div>
        </div>
        
        <!-- Desktop Timeline -->
        <div v-else class="timeline">
          <div class="timeline-line"></div>
          <div v-for="(item, index) in timelineItems" :key="index" class="timeline-item" :class="index % 2 === 0 ? 'left' : 'right'">
            <div class="timeline-content bg-secondary shadow-lg rounded-lg p-6 border border-neutral-300">
              <div :class="['px-3 py-1 rounded-full w-fit mb-4', index % 2 === 0 ? 'bg-blue-100' : 'bg-orange-100']">
                <span :class="['font-bold', index % 2 === 0 ? 'text-blue-600' : 'text-orange-600']">{{ item.year }}</span>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-2">{{ item.title }}</h3>
              <p class="text-gray-600 text-sm">{{ item.description }}</p>
            </div>
            <div class="timeline-marker">
              <Icon :name="item.icon" size="24" :class="index % 2 === 0 ? 'text-blue-600' : 'text-orange-600'" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="h-fit flex items-center flex-col gap-10" id="Jurusan">
      <div class="bg-secondary backdrop-blur-2xl py-4 px-8 rounded-lg shadow-md">
        <h2 class="text-3xl font-bold">Daftar Jurusan</h2>
      </div>
      <div class="container flex items-center justify-center mx-auto">
        <MajorCarousel />
      </div>
    </section>
    <section>
      <div class="container mx-auto flex flex-col items-center gap-5">
        <div class="bg-secondary backdrop-blur-2xl px-8 py-4 shadow-md rounded-lg">
          <h2 class="text-3xl font-bold">Prestasi</h2>
        </div>
        
        <!-- Achievement Carousel -->
        <div class="relative flex flex-col w-full max-w-sm gap-5 p-4 mx-auto border rounded-lg shadow-sm md:w-200 md:max-w-none bg-secondary md:p-8 border-neutral-300">
          <div class="overflow-hidden">
            <div class="flex transition-transform duration-500 ease-in-out" :style="{ transform: `translateX(-${currentAchievement * 100}%)` }">
              <div v-for="(achievement, index) in achievements" :key="index" class="flex-shrink-0 w-full">
                <div class="flex flex-col items-center gap-6 md:flex-row md:gap-10">
                  <img :src="achievement.image" class="w-48 md:w-80" alt="Achievement" />
                  <div class="flex flex-col gap-5">
                    <h3 class="text-2xl font-bold">{{ achievement.title }}</h3>
                    <p>{{ achievement.description }}</p>
                  </div>
                </div>
              </div>
            </div> 
          </div>

          <div class="border-t border-gray-300"></div>

          <div class="flex justify-between">
            <div class="flex gap-5">
              <button @click="prevAchievement" class="flex items-center justify-center p-2 transition rounded-full shadow-lg cursor-pointer border-neutral-400 border-1 bg-tertiary hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:scale-110">
                <Icon name="lucide:chevron-left" size="24" />
              </button>
              <button @click="nextAchievement" class="flex items-center justify-center p-2 transition rounded-full shadow-lg cursor-pointer border-neutral-400 border-1 bg-tertiary hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:scale-110">
                <Icon name="lucide:chevron-right" size="24" />
              </button>
            </div>
            <div class="flex items-center justify-center">
              <h3 class="text-2xl font-bold">0{{ currentAchievement + 1 }}/0{{ achievements.length }}</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="h-min-screen" id="berita">
      <div class="container mx-auto flex flex-col items-center gap-5">
        <div class="bg-secondary backdrop-blur-2xl py-4 px-8 shadow-md rounded-lg">
          <h2 class="text-3xl font-bold">Berita</h2>
        </div>
        <div class="flex flex-wrap gap-5 justify-center">
          <p class="font-bold p-2 rounded-full bg-tertiary pl-4 pr-4">Kategori Berita</p>
          <p class="font-bold p-2 rounded-full bg-tertiary pl-4 pr-4">Kategori Berita</p>
          <p class="font-bold p-2 rounded-full bg-tertiary pl-4 pr-4">Kategori Berita</p>
          <p class="font-bold p-2 rounded-full bg-tertiary pl-4 pr-4">Kategori Berita</p>
        </div>
        <div class="grid w-full grid-cols-1 gap-5 mt-5 md:grid-cols-2 lg:grid-cols-4 place-items-center">
          <div v-for="i in 8" :key="i" class="relative w-80 h-80 bg-secondary rounded-lg shadow-sm overflow-hidden group cursor-pointer border border-neutral-300">
            <img src="/images/placeholder.jpg" width="auto" height="auto" class="w-full h-full object-cover" alt="Placeholder">
            <div class="absolute bottom-0 left-0 right-0 p-4 transition-transform duration-500 group-hover:-translate-y-8 bg-black/20 bg-opacity-50">
              <p class="font-bold text-white transition-transform duration-500 group-hover:-translate-y-2">Kami Lolos Enam Bidang Lomba untuk Menuju Tingkat Provinsi</p>
              <p class="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 mt-2"></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0;
}

.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: gray;
  transform: translateX(-50%);
}

.timeline-item {
  position: relative;
  margin-bottom: 3rem;
  clear: both;
}

.timeline-item.left .timeline-content {
  text-align: right;
  margin-right: 2rem;
  width: 45%;
  float: left;
}

.timeline-item.right .timeline-content {
  text-align: left;
  margin-left: 2rem;
  width: 45%;
  float: right;
}

.timeline-marker {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
