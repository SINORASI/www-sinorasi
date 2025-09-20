<template>
  <section class="flex items-center justify-center h-screen container mx-auto my-24 px-6">
    <div class="flex flex-col items-center justify-center gap-10">
      <h1 class="font-bold text-4xl">Sambutan</h1>

      <div class="bg-neutral-100 rounded-lg p-8">
        <div class="relative overflow-hidden">
          <div class="flex transition-transform duration-300" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
            <div class="flex-shrink-0 w-full flex gap-5 items-center justify-center h-130">
              <div class="flex gap-5">
                <div class="flex justify-start text-right flex-col gap-5">
                  <h2 class="font-bold text-3xl">Lorem Ipsum</h2>
                  <p class="text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, aut beatae consequatur deleniti esse expedita minus necessitatibus neque perspiciatis ratione.</p>
                </div>
                <div class="shrink-0 w-60 h-60 ">
                  <img src="/images/logo.webp" class="w-full h-full shadow-sm rounded-lg" />
                </div>
                <div class="flex justify-end flex-col gap-5">
                  <h2 class="font-bold text-3xl">Lorem Ipsum</h2>
                  <p class="text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, aut beatae consequatur deleniti esse expedita minus necessitatibus neque perspiciatis ratione.</p>
                </div>
              </div>
            </div>
            <div class="flex-shrink-0 w-full flex gap-5 items-center justify-center h-130">
              <div class="flex gap-5">
                <div class="flex justify-start text-right flex-col gap-5">
                  <h2 class="font-bold text-3xl">Dolor Sit</h2>
                  <p class="text-sm">Dolor sit amet, consectetur adipisicing elit. Accusantium, aut beatae consequatur deleniti esse expedita minus necessitatibus neque perspiciatis ratione.</p>
                </div>
                <div class="shrink-0 w-60 h-60 ">
                  <img src="/images/logo.webp" class="w-full h-full shadow-sm rounded-lg" />
                </div>
                <div class="flex justify-end flex-col gap-5">
                  <h2 class="font-bold text-3xl">Amet Consectetur</h2>
                  <p class="text-sm">Amet consectetur adipisicing elit. Accusantium, aut beatae consequatur deleniti esse expedita minus necessitatibus neque perspiciatis ratione.</p>
                </div>
              </div>
            </div>
          </div>
          <button @click="prev" class="border-neutral-400 left-0 absolute top-60 m-5 border-1 cursor-pointer bg-neutral-300 p-2 flex items-center justify-center rounded-full shadow-lg transition hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:scale-110">
          <Icon name="lucide:chevron-left" size="24" />
          </button>
          <button @click="next" class="absolute right-0 top-60 border-neutral-400 m-5 border-1 cursor-pointer bg-neutral-300 p-2 flex items-center justify-center rounded-full shadow-lg transition hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:scale-110">
            <Icon name="lucide:chevron-right" size="24" />
          </button>
        </div>
      </div>
    </div>
  </section>
  <section class="flex items-center justify-center h-screen container mx-auto px-6 py-12">
    <div class="bg-neutral-200 p-8 rounded-lg flex flex-col items-center justify-center gap-5">
      <h2 class="font-bold text-3xl">Video Profil Sekolah</h2>
      <p class="text-sm w-6/12 text-center">Video profil ini memperlihatkan perjalanan dan komitmen sekolah dalam membentuk peserta didik yang unggul dalam berprestasi, berkarakter, serta siap menghadapi tantangan di masa depan.</p>
      <div class="bg-neutral-600 h-100 w-full rounded-lg shadow-sm">

      </div>
    </div>
  </section>
  <section class="flex items-center justify-center h-screen container mx-auto px-6 py-12">
    <div class="flex flex-col items-center justify-center gap-10">
      <h2 class="font-bold text-3xl">Visi dan Misi</h2>
      <p class="text-sm">Video profil ini memperlihatkan perjalanan dan komitmen sekolah dalam membentuk peserta didik yang unggul dalam berprestasi, berkarakter, serta siap menghadapi tantangan di masa depan.</p>
      <Carousel>
        <template #slide-0>
           <div class="flex items-center p-10 justify-center rounded-lg">
            <div class="flex gap-5 items-center">
              <div class="w-fit h-fit bg-neutral-300 rounded-lg p-4">
                <h3 class="font-bold text-2xl">Visi</h3>
              </div>
              <div class="flex flex-col  gap-5">
                <div class="p-4 text-center bg-neutral-300 rounded-lg shadow-sm">
                  <p class="text-sm">SMK Negeri 2 Singosari memiliki komitmen jangka panjang terhadap pengembangan sumber daya manusia.Pandangan kedepan dan cita-cita SMK Negeri 2 Singosari dinyatakan dalam Visi sebagai berikut :</p>
                </div>
                <div class="p-4 text-center bg-neutral-300 rounded-lg shadow-sm">
                  <p class="text-sm">SMK Negeri 2 Singosari memiliki komitmen jangka panjang terhadap pengembangan sumber daya manusia.Pandangan kedepan dan cita-cita SMK Negeri 2 Singosari dinyatakan dalam Visi sebagai berikut :</p>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template #slide-1>
          <div class="flex items-center p-10 justify-center rounded-lg">
            <div class="flex gap-5 items-center">
              <div class="w-fit h-fit bg-neutral-300 rounded-lg p-4">
                <h3 class="font-bold text-2xl">Visi</h3>
              </div>
              <div class="flex flex-col  gap-5">
                <div class="p-4 text-center bg-neutral-300 rounded-lg shadow-sm">
                  <p class="text-sm">SMK Negeri 2 Singosari memiliki komitmen jangka panjang terhadap pengembangan sumber daya manusia.Pandangan kedepan dan cita-cita SMK Negeri 2 Singosari dinyatakan dalam Visi sebagai berikut :</p>
                </div>
                <div class="p-4 text-center bg-neutral-300 rounded-lg shadow-sm">
                  <p class="text-sm">SMK Negeri 2 Singosari memiliki komitmen jangka panjang terhadap pengembangan sumber daya manusia.Pandangan kedepan dan cita-cita SMK Negeri 2 Singosari dinyatakan dalam Visi sebagai berikut :</p>
                </div>
              </div>
            </div>
          </div>
        </template>
      </Carousel>
      
    </div>
  </section>
  <section class="flex items-center justify-center h-screen container mx-auto px-30 py-12">
    <div class="flex flex-col items-center justify-center gap-10">
      <h2 class="font-bold text-3xl">Sejarah SMK Negeri 02 Singosari</h2>
      <div class="flex flex-col gap-4">
        <p class="text-sm">
          Didirikan berdasarkan surat Perjanjian Kerjasama antara Bupati Malang dengan Direktur Pendidikan Sekolah Menengah Kejuruan No.0570ax/C5.4/Kep/KU/2007 Tanggal 25 Mei 2007. Sebagai Pengembangan dari Program Keahlian Teknik Audio Video, Teknik Elektronika Industri, dan Teknik Informatika (Rekayasa Perangkat Lunak) yang berasal dari SMK Negeri 1 Singosari yang telah meraih prestasi sebagai Juara Lomba Kompetensi Siswa baik tingkat Propinsi Jawa Timur maupun Tingkat Nasional.
        </p>
        <p class="text-sm">
          Sebagai awal berdirinya Sekolah terpadu yang direncanakan oleh Pemkab Malang yang nantinya terdiri atas TK Pembina, SD Negeri dan SMP Negeri di kabupaten Malang, dengan menempati Lahan seluas kurang lebih 4,9 Ha. Pendidik dan Tenaga kependidikan serta peralatan semua berasal dari SMK Negeri 1 Singosari dan ditambah dengan peralatan serta fasilitas (Hotspot Internet Akses menggunakan WIFI, Lab.Komputer, dll) baru sehingga lebih lengkap dan memadai.
        </p>
        <p class="text-sm">
          Di awal tahun pelajaran 2008/2009 mulai Operasional dan menerima siswa baru dengan 3 Program Keahlian yaitu AV,EI dan RPL yang jumlah siswanya 205 orang siswa (6 rombel).Pada 20 maret tahun 2009 pergantian Kepala Sekolah dari Plt. Bapak H.Bagus Gunawan,S.Pd, M.Si ke Kepala UPTD definitive Bapak Drs.H.M. Qodri MP.Sa, yang selanjutnya dibuka lagi 4 program keahlian khusus Informatika (TKJ,MM,ANM dan BC) jadi jumlah seluruhnya ada 7 Program Keahlian. Pada tahun pelajaran 2010/2011 dibuka lagi 1 program Keahlian Elektro (Mekatronika) sehingga lengkap sudah seluruh Program Elektro dan Informatika ada di SMK Negeri 2 Singosari yang berbasis pendidikan elektro dan IT Negeri di Kabupaten malang, sejak 1 Juni 2011 terjadi penggantian Kepala Sekolah Ke Drs.SUHARTO
        </p>
      </div>

    </div>
  </section>
  <section class="flex items-center justify-center h-screen container mx-auto px-6 py-12">
    <div class="flex flex-col items-center justify-center gap-10">
      <h2 class="font-bold text-3xl">Mars SMKN2 2 Singosari</h2>
    </div>
  </section>
  <section class="flex items-center justify-center h-screen container mx-auto px-6 py-12">
    <div class="flex flex-col items-center justify-center gap-10">
      <h2 class="font-bold text-3xl">Kontak</h2>
      <div class="flex flex-col gap-2">
        <div class="flex flex-col gap-2">
          <div class="w-fit h-fit p-4 rounded-lg bg-neutral-300 text-center">
            <h3 class="font-bold text-2xl">Alamat</h3>
          </div>
          <div class="p-4 rounded-lg bg-neutral-200 text-center">
            <p class="text-base">Jl. Perusahaan No.20, Tunjungtirto, Singosari, Jajar, Tanjungtirto, Kec. Singosari, Malang, Jawa Timur 65153</p>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <div class="w-fit h-fit p-4 rounded-lg bg-neutral-300 text-center">
            <h3 class="font-bold text-2xl">Alamat</h3>
          </div>
          <div class="p-4 rounded-lg bg-neutral-200 text-center">
            <p class="text-base">Jl. Perusahaan No.20, Tunjungtirto, Singosari, Jajar, Tanjungtirto, Kec. Singosari, Malang, Jawa Timur 65153</p>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <div class="w-fit h-fit p-4 rounded-lg bg-neutral-300 text-center">
            <h3 class="font-bold text-2xl">Alamat</h3>
          </div>
          <div class="p-4 rounded-lg bg-neutral-200 text-center">
            <p class="text-base">Jl. Perusahaan No.20, Tunjungtirto, Singosari, Jajar, Tanjungtirto, Kec. Singosari, Malang, Jawa Timur 65153</p>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <div class="w-fit h-fit p-4 rounded-lg bg-neutral-300 text-center">
            <h3 class="font-bold text-2xl">Alamat</h3>
          </div>
          <div class="p-4 rounded-lg bg-neutral-200 text-center">
            <p class="text-base">Jl. Perusahaan No.20, Tunjungtirto, Singosari, Jajar, Tanjungtirto, Kec. Singosari, Malang, Jawa Timur 65153</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const currentIndex = ref(0);

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % 2;
};

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + 2) % 2;
};
</script>