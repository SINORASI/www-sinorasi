<template>
  <footer class="bg-neutral-800 text-white py-12 mt-16">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="md:col-span-1">
          <div class="flex items-center gap-4 mb-4">
            <img src="/images/logo.webp" width="60" alt="Logo SMKN 2 Singosari" class="rounded-full" />
            <div>
              <h3 class="text-xl font-bold">SMKN 2 Singosari</h3>
              <p class="text-sm text-neutral-300">Inovasi Raih Prestasi</p>
            </div>
          </div>
          <p class="text-sm text-neutral-300 leading-relaxed">
            Sekolah Menengah Kejuruan Negeri 2 Singosari berkomitmen untuk mencetak lulusan yang unggul, berkarakter, dan siap menghadapi tantangan dunia kerja.
          </p>
        </div>

        <div class="md:col-span-1">
          <h4 class="text-lg font-semibold mb-4">Tautan Cepat</h4>
          <ul class="space-y-2">
            <li><NuxtLink to="/" class="text-neutral-300 hover:text-white transition duration-300">Beranda</NuxtLink></li>
            <li><NuxtLink to="/informasi/profile-sekolah" class="text-neutral-300 hover:text-white transition duration-300">Profile Sekolah</NuxtLink></li>
            <li><NuxtLink to="/berita" class="text-neutral-300 hover:text-white transition duration-300">Berita</NuxtLink></li>
            <li><NuxtLink to="/acara" class="text-neutral-300 hover:text-white transition duration-300">Acara</NuxtLink></li>
            <li><NuxtLink to="/informasi/kontak" class="text-neutral-300 hover:text-white transition duration-300">Layanan</NuxtLink></li>
          </ul>
        </div>

        <div class="md:col-span-1">
          <h4 class="text-lg font-semibold mb-4">Kontak Kami</h4>
          <div class="space-y-3">
            <div class="flex items-start gap-3">
              <Icon name="lucide:map-pin" size="20" class="text-neutral-400 mt-1" />
              <div>
                <p class="text-sm text-neutral-300">Jl. Raya Singosari No.123</p>
                <p class="text-sm text-neutral-300">Singosari, Malang</p>
                <p class="text-sm text-neutral-300">Jawa Timur 65153</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <Icon name="lucide:phone" size="20" class="text-neutral-400" />
              <p class="text-sm text-neutral-300">(0341) 123-4567</p>
            </div>
            <div class="flex items-center gap-3">
              <Icon name="lucide:mail" size="20" class="text-neutral-400" />
              <p class="text-sm text-neutral-300">info@smkn2singosari.sch.id</p>
            </div>
          </div>
        </div>

        <div class="md:col-span-1">
          <h4 class="text-lg font-semibold mb-4">Ikuti Kami</h4>
          <div class="flex gap-4">
            <a href="#" class="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center hover:bg-pink-600 transition duration-300">
              <Icon name="lucide:instagram" size="20" />
            </a>
            <a href="#" class="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center hover:bg-red-600 transition duration-300">
              <Icon name="lucide:youtube" size="20" />
            </a>
          </div>
          <div class="mt-6">
            <h5 class="text-sm font-semibold mb-2">Jam Operasional</h5>
            <p class="text-xs text-neutral-300">Senin - Jumat: 07:00 - 15:00</p>
            <p class="text-xs text-neutral-300">Sabtu: 08:00 - 12:00</p>
          </div>
        </div>

      </div>

      <div class="border-t border-neutral-700 mt-8 pt-8">
        <div class="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div>
            <h5 class="text-sm font-semibold mb-3 text-neutral-300">Program Studi</h5>
            <ul class="space-y-1">
              <li><NuxtLink to="/jurusan/tkj" class="text-xs text-neutral-400 hover:text-white transition duration-300">Teknik Komputer Jaringan</NuxtLink></li>
              <li><NuxtLink to="/jurusan/rpl" class="text-xs text-neutral-400 hover:text-white transition duration-300">Rekayasa Perangkat Lunak</NuxtLink></li>
              <li><NuxtLink to="/jurusan/dkv" class="text-xs text-neutral-400 hover:text-white transition duration-300">Desain Komunikasi Visual</NuxtLink></li>
              <li><NuxtLink to="/jurusan/tei" class="text-xs text-neutral-400 hover:text-white transition duration-300">Teknik Elektronika Industri</NuxtLink></li>
              <li><NuxtLink to="/jurusan/mekatronika" class="text-xs text-neutral-400 hover:text-white transition duration-300">Teknik Mekatronika</NuxtLink></li>
              <li><NuxtLink to="/jurusan/broadcasting" class="text-xs text-neutral-400 hover:text-white transition duration-300">Broadcasting</NuxtLink></li>
              <li><NuxtLink to="/jurusan/animasi" class="text-xs text-neutral-400 hover:text-white transition duration-300">Animasi</NuxtLink></li>
              <li><NuxtLink to="/jurusan/tav" class="text-xs text-neutral-400 hover:text-white transition duration-300">Teknik Audio Video</NuxtLink></li>
            </ul>
          </div>
          <div>
            <h5 class="text-sm font-semibold mb-3 text-neutral-300">Fasilitas</h5>
            <ul class="space-y-1">
              <li><NuxtLink to="/informasi/sarana-prasarana" class="text-xs text-neutral-400 hover:text-white transition duration-300">Sarana Prasarana</NuxtLink></li>
            </ul>
          </div>
          <div>
            <h5 class="text-sm font-semibold mb-3 text-neutral-300">Informasi</h5>
            <ul class="space-y-1">
              <li><NuxtLink to="/berita" class="text-xs text-neutral-400 hover:text-white transition duration-300">Berita</NuxtLink></li>
              <li><NuxtLink to="/organisasi" class="text-xs text-neutral-400 hover:text-white transition duration-300">Organisasi</NuxtLink></li>
              <li><NuxtLink to="/informasi/struktur-organisasi" class="text-xs text-neutral-400 hover:text-white transition duration-300">Struktur Organisasi</NuxtLink></li>
              <li><NuxtLink to="/informasi/guru" class="text-xs text-neutral-400 hover:text-white transition duration-300">Guru</NuxtLink></li>
              <li><NuxtLink to="/informasi/kontak" class="text-xs text-neutral-400 hover:text-white transition duration-300">Kontak</NuxtLink></li>
              <li><NuxtLink to="/ekstrakurikuler" class="text-xs text-neutral-400 hover:text-white transition duration-300">Ekstrakurikuler</NuxtLink></li>
              <li><NuxtLink to="/acara" class="text-xs text-neutral-400 hover:text-white transition duration-300">Acara</NuxtLink></li>
            </ul>
          </div>
          <div>
            <h5 class="text-sm font-semibold mb-3 text-neutral-300">Utilitas</h5>
            <ul class="space-y-1">
              <li><NuxtLink to="/utilitas/anonymous-bk" class="text-xs text-neutral-400 hover:text-white transition duration-300">Anonymous BK</NuxtLink></li>
              <li><NuxtLink to="/utilitas/traffic-tracker" class="text-xs text-neutral-400 hover:text-white transition duration-300">Traffic Tracker</NuxtLink></li>
            </ul>
          </div>
          <div>
            <h5 class="text-sm font-semibold mb-3 text-neutral-300">Layanan</h5>
            <ul class="space-y-1">
              <li><a href="https://www.kemdikbud.go.id" target="_blank" class="text-xs text-neutral-400 hover:text-white transition duration-300">Kementerian Pendidikan dan Kebudayaan</a></li>
              <li><a href="https://www.disdik.jatimprov.go.id" target="_blank" class="text-xs text-neutral-400 hover:text-white transition duration-300">Dinas Pendidikan Jawa Timur</a></li>
              <li><a href="https://www.malangkab.go.id" target="_blank" class="text-xs text-neutral-400 hover:text-white transition duration-300">Pemerintah Kabupaten Malang</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div class="border-t border-neutral-700 mt-8 pt-8 text-center">
        <p class="text-sm text-neutral-400">
          &copy; 2024 SMK Negeri 2 Singosari. All rights reserved.
        </p>
      </div>

    </div>
  </footer>
</template>