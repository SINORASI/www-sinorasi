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
            <li><a href="#" class="text-neutral-300 hover:text-white transition duration-300">Beranda</a></li>
            <li><a href="#" class="text-neutral-300 hover:text-white transition duration-300">Tentang Kami</a></li>
            <li><a href="#" class="text-neutral-300 hover:text-white transition duration-300">Jurusan</a></li>
            <li><a href="#" class="text-neutral-300 hover:text-white transition duration-300">Prestasi</a></li>
            <li><a href="#" class="text-neutral-300 hover:text-white transition duration-300">Berita</a></li>
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
            <a href="#" class="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition duration-300">
              <Icon name="lucide:facebook" size="20" />
            </a>
            <a href="#" class="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center hover:bg-blue-400 transition duration-300">
              <Icon name="lucide:twitter" size="20" />
            </a>
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
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h5 class="text-sm font-semibold mb-3 text-neutral-300">Program Studi</h5>
            <ul class="space-y-1">
              <li><a href="#" class="text-xs text-neutral-400 hover:text-white transition duration-300">Teknik Komputer Jaringan</a></li>
              <li><a href="#" class="text-xs text-neutral-400 hover:text-white transition duration-300">Rekayasa Perangkat Lunak</a></li>
              <li><a href="#" class="text-xs text-neutral-400 hover:text-white transition duration-300">Multimedia</a></li>
            </ul>
          </div>
          <div>
            <h5 class="text-sm font-semibold mb-3 text-neutral-300">Fasilitas</h5>
            <ul class="space-y-1">
              <li><a href="#" class="text-xs text-neutral-400 hover:text-white transition duration-300">Laboratorium</a></li>
              <li><a href="#" class="text-xs text-neutral-400 hover:text-white transition duration-300">Perpustakaan</a></li>
              <li><a href="#" class="text-xs text-neutral-400 hover:text-white transition duration-300">Lapangan Olahraga</a></li>
            </ul>
          </div>
          <div>
            <h5 class="text-sm font-semibold mb-3 text-neutral-300">Informasi</h5>
            <ul class="space-y-1">
              <li><a href="#" class="text-xs text-neutral-400 hover:text-white transition duration-300">PPDB</a></li>
              <li><a href="#" class="text-xs text-neutral-400 hover:text-white transition duration-300">Kalender Akademik</a></li>
              <li><a href="#" class="text-xs text-neutral-400 hover:text-white transition duration-300">Kurikulum</a></li>
            </ul>
          </div>
          <div>
            <h5 class="text-sm font-semibold mb-3 text-neutral-300">Dukungan</h5>
            <ul class="space-y-1">
              <li><a href="#" class="text-xs text-neutral-400 hover:text-white transition duration-300">Bantuan</a></li>
              <li><a href="#" class="text-xs text-neutral-400 hover:text-white transition duration-300">Kontak Admin</a></li>
              <li><a href="#" class="text-xs text-neutral-400 hover:text-white transition duration-300">Sitemap</a></li>
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