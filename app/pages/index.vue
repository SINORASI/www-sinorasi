<script lang="ts" setup>
definePageMeta({
  layout: "default",
});
</script>

<template>
  <main class="flex flex-col gap-20">
    <section class="min-h-screen flex items-center justify-center pt-24 md:pt-20 pb-10 px-4">
      <div
        class="absolute bg-blend-darken bg-[url(/images/background-aula.jpg)] w-full h-full bg-cover bg-top top-0 left-0 right-0 bottom-0"
      >
        <div class="bg-gradient-to-t from-black/65 to-transparent w-full h-full"></div>
      </div>
      <div class="z-50 flex md:flex-row flex-col items-center md:gap-12 gap-6">
        <div class="flex flex-col gap-2 md:gap-3 text-white max-w-sm md:max-w-md text-center md:text-left">
          <h1 class="text-2xl md:text-4xl lg:text-5xl font-bold">INORASI</h1>
          <p class="text-sm md:text-lg lg:text-xl font-semibold">Inovasi Raih Prestasi</p>
          <p class="text-xs md:text-base leading-relaxed">
            SMK Negeri 2 Singosari - Tempat di mana inovasi bertemu dengan prestasi. Kami berkomitmen untuk membentuk
            generasi muda yang siap menghadapi tantangan masa depan melalui pendidikan kejuruan berkualitas.
          </p>
          <div
            class="flex flex-col sm:flex-row gap-2 md:gap-3 mt-2 md:mt-3 justify-center md:justify-start items-center"
          >
            <a
              href="#information"
              class="w-fit bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 md:px-5 md:py-2 rounded-lg font-semibold transition flex items-center gap-2 text-xs md:text-sm"
            >
              Pelajari Lebih Dalam
              <Icon name="lucide:book-open" size="14" />
            </a>
            <a
              href="#berita"
              class="w-fit border-2 border-white text-white hover:bg-white hover:text-black px-3 py-2 md:px-5 md:py-2 rounded-lg font-semibold transition flex items-center gap-2 text-xs md:text-sm"
            >
              Berita Terbaru
              <Icon name="lucide:newspaper" size="14" />
            </a>
          </div>
          <div class="flex gap-3 md:gap-5 mt-3 md:mt-4 justify-center md:justify-start">
            <div class="text-center">
              <div class="text-base md:text-xl font-bold">8</div>
              <div class="text-xs md:text-sm">Jurusan</div>
            </div>
            <div class="text-center">
              <div class="text-base md:text-xl font-bold">1000+</div>
              <div class="text-xs md:text-sm">Siswa</div>
            </div>
            <div class="text-center">
              <div class="text-base md:text-xl font-bold">50+</div>
              <div class="text-xs md:text-sm">Prestasi</div>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-center mt-4 md:mt-0">
          <img src="/images/logo.webp" class="w-32 h-32 md:w-56 md:h-56 lg:w-64 lg:h-64 drop-shadow-lg" />
        </div>
      </div>
    </section>
    <section id="information" class="flex items-center justify-center flex-col h-fit">
      <div class="w-fit bg-neutral-200/50 backdrop-blur-2xl p-4 rounded-lg border border-neutral-300">
          <h2 class="text-3xl font-bold">Sambutan Kepala Sekolah</h2>
        </div>
      <div class="text-center md:text-left flex flex-col md:flex-row gap-10 container mx-auto px-10 md:px-30">
        <div class="flex items-center flex-col gap-10">
          <img src="/images/kepsek.webp" width="auto" height="auto" alt="Foto Kepsek" />
          <div class="w-fit bg-neutral-200 rounded-lg p-2">
            <p class="font-bold">Sumijah S. Pd M.Si</p>
          </div>
        </div>
        <div class="flex justify-center flex-col gap-5">
          <h2 class="text-3xl font-bold">Selamat datang di SMK Negeri 2 Singosari</h2>
          <p>
            Assalamu'alaikum wr.wb. Puji syukur kepada Alloh SWT atas terbitnya website SMK Negeri 2 Singosari untuk
            menjawab kebutuhan informasi melalui teknologi informasi. Dalam memajukan pendidikan di era teknologi yang
            pesat, diperlukan sarana prasarana kondusif dan informasi bagi siswa, guru, orangtua maupun masyarakat.
            Semoga website ini bermanfaat untuk informasi pendidikan, ilmu pengetahuan dan seputar SMK Negeri 2
            Singosari. Besar harapan kami sarana ini memberi manfaat bagi semua pihak di lingkup pendidikan khususnya
            SMK Negeri 2 Singosari.
          </p>
          <p>
            Kami mengharapkan masukan dari berbagai pihak agar terus belajar dan meng-update sehingga tampilan, isi dan
            mutu website berkembang lebih baik. Terima kasih atas kerjasamanya, maju terus SMK Negeri 2 Singosari.
            Wassalamu'alaikum wr.wb.
          </p>
        </div>
      </div>
    </section>
    <section class="h-min-screen">
      <div class="container mx-auto px-10 md:px-60 flex text-center flex-col items-center gap-5">
        <div class="bg-neutral-200/50 backdrop-blur-2xl p-4 rounded-lg border border-neutral-300">
          <h2 class="text-3xl font-bold">Video Profil Sekolah</h2>
        </div>
        <p>
          Video profil ini memperlihatkan perjalanan dan komitmen sekolah dalam membentuk peserta didik yang unggul
          dalam berprestasi, berkarakter, serta siap menghadapi tantangan di masa depan.
        </p>
        <ScriptYouTubePlayer video-id="Kks6HnhPzVQ">
          <template #placeholder="{ placeholder }">
            <div class="relative">
              <img :src="'/images/placeholder.jpg'" alt="Video Placeholder" class="rounded-lg">
            </div>
          </template>
        </ScriptYouTubePlayer>
      </div>
    </section>
    <section class="h-min-screen py-20">
      <div class="text-center container mx-auto flex flex-col items-center gap-5 px-10 md:px-0">
        <div class="bg-neutral-200/50 backdrop-blur-2xl p-4 rounded-lg border border-neutral-300">
          <h2 class="text-3xl font-bold">Jejak Sejarah Kami</h2>
        </div>
        <p>
          Perjalanan SMK Negeri 2 Singosari dalam mengembangkan pendidikan kejuruan berkualitas di Kabupaten Malang.
        </p>
        <Timeline />
      </div>
    </section>
    <section class="h-fit">
      <div class="container mx-auto flex items-center justify-center">
        <MajorCarousel />
      </div>
    </section>
    <section class="h-fit">
      <div class="container mx-auto flex flex-col items-center gap-5">
        <div class="bg-neutral-200/50 backdrop-blur-2xl p-4 rounded-lg border border-neutral-300">
          <h2 class="text-3xl font-bold">Prestasi</h2>
        </div>
        <AchievementCarousel />
      </div>
    </section>
    <section class="h-min-screen" id="berita">
      <div class="container mx-auto flex flex-col items-center gap-5">
        <div class="bg-neutral-200/50 backdrop-blur-2xl p-4 rounded-lg border border-neutral-300">
          <h2 class="text-3xl font-bold">Berita Terbaru</h2>
        </div>
        <p>SMK Negeri 2 Singosari</p>
        <div class="flex flex-wrap gap-5 justify-center">
          <p class="font-bold p-2 rounded-full bg-neutral-100 pl-4 pr-4">Kategori Berita</p>
          <p class="font-bold p-2 rounded-full bg-neutral-100 pl-4 pr-4">Kategori Berita</p>
          <p class="font-bold p-2 rounded-full bg-neutral-100 pl-4 pr-4">Kategori Berita</p>
          <p class="font-bold p-2 rounded-full bg-neutral-100 pl-4 pr-4">Kategori Berita</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-full mt-5 place-items-center">
          <CardNews title="Kami Lolos Enam Bidang Lomba untuk Menuju Tingkat Provinsi" />
          <CardNews title="Kami Lolos Enam Bidang Lomba untuk Menuju Tingkat Provinsi" />
          <CardNews title="Kami Lolos Enam Bidang Lomba untuk Menuju Tingkat Provinsi" />
          <CardNews title="Kami Lolos Enam Bidang Lomba untuk Menuju Tingkat Provinsi" />
          <CardNews title="Kami Lolos Enam Bidang Lomba untuk Menuju Tingkat Provinsi" />
          <CardNews title="Kami Lolos Enam Bidang Lomba untuk Menuju Tingkat Provinsi" />
          <CardNews title="Kami Lolos Enam Bidang Lomba untuk Menuju Tingkat Provinsi" />
          <CardNews title="Kami Lolos Enam Bidang Lomba untuk Menuju Tingkat Provinsi" />
        </div>
      </div>
    </section>
  </main>
</template>
