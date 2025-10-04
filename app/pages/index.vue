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
        <SchoolTimeline />
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
        <AchievementCarousel />
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
          <ImageOverlayCard title="Kami Lolos Enam Bidang Lomba untuk Menuju Tingkat Provinsi" />
          <ImageOverlayCard title="Kami Lolos Enam Bidang Lomba untuk Menuju Tingkat Provinsi" />
          <ImageOverlayCard title="Kami Lolos Enam Bidang Lomba untuk Menuju Tingkat Provinsi" />
          <ImageOverlayCard title="Kami Lolos Enam Bidang Lomba untuk Menuju Tingkat Provinsi" />
          <ImageOverlayCard title="Kami Lolos Enam Bidang Lomba untuk Menuju Tingkat Provinsi" />
          <ImageOverlayCard title="Kami Lolos Enam Bidang Lomba untuk Menuju Tingkat Provinsi" />
          <ImageOverlayCard title="Kami Lolos Enam Bidang Lomba untuk Menuju Tingkat Provinsi" />
          <ImageOverlayCard title="Kami Lolos Enam Bidang Lomba untuk Menuju Tingkat Provinsi" />
        </div>
      </div>
    </section>
  </main>
</template>
