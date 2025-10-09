<template>
  <footer class="py-12 mt-16 text-white bg-neutral-800">
    <div class="container px-6 mx-auto">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-4">
        <div class="md:col-span-1">
          <div class="flex items-center gap-4 mb-4">
            <img src="/images/logo-smk.webp" width="60" alt="Logo SMKN 2 Singosari" class="rounded-full" />
            <div>
              <h3 class="text-xl font-bold">SMKN 2 Singosari</h3>
              <p class="text-sm text-neutral-300">Inovasi Raih Prestasi</p>
            </div>
          </div>
          <p class="text-sm leading-relaxed text-neutral-300">
            Sekolah Menengah Kejuruan Negeri 2 Singosari berkomitmen untuk mencetak lulusan yang unggul, berkarakter,
            dan siap menghadapi tantangan dunia kerja.
          </p>
        </div>

        <div class="md:col-span-1">
          <h4 class="mb-4 text-lg font-semibold">Tautan Cepat</h4>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/" class="transition duration-300 text-neutral-300 hover:text-white">Beranda</NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/informasi/profile-sekolah"
                class="transition duration-300 text-neutral-300 hover:text-white"
                >Profile Sekolah</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/berita" class="transition duration-300 text-neutral-300 hover:text-white">Berita</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/acara" class="transition duration-300 text-neutral-300 hover:text-white">Acara</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/informasi/kontak" class="transition duration-300 text-neutral-300 hover:text-white"
                >Layanan</NuxtLink
              >
            </li>
          </ul>
        </div>

        <div class="md:col-span-1">
          <h4 class="mb-4 text-lg font-semibold">Kontak Kami</h4>
          <div class="space-y-3">
            <div class="flex items-start gap-3">
              <Icon name="lucide:map-pin" size="20" class="mt-1 text-neutral-400" />
              <div>
                <p class="text-sm text-neutral-300">Jl. Perusahaan Raya No.20, Jajar, Tanjungtirto.</p>
                <p class="text-sm text-neutral-300">Singosari, Kabupaten Malang</p>
                <p class="text-sm text-neutral-300">Jawa Timur 65153</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <Icon name="lucide:phone" size="20" class="text-neutral-400" />
              <p class="text-sm text-neutral-300">(0341) 4345127</p>
            </div>
            <div class="flex items-center gap-3">
              <Icon name="lucide:mail" size="20" class="text-neutral-400" />
              <p class="text-sm text-neutral-300">smkn2.singosari@yahoo.co.id</p>
            </div>
          </div>
        </div>

        <div class="md:col-span-1">
          <h4 class="mb-4 text-lg font-semibold">Ikuti Kami</h4>
          <div class="flex gap-4">
            <a
              href="https://instagram.com/smkn2_singosari"
              class="flex items-center justify-center w-10 h-10 transition duration-300 rounded-full bg-neutral-700 hover:bg-pink-600"
            >
              <Icon name="lucide:instagram" size="20" />
            </a>
            <a
              href="https://www.youtube.com/channel/UC0B8cIUqCnHMzoTNXxbRhFQ"
              class="flex items-center justify-center w-10 h-10 transition duration-300 rounded-full bg-neutral-700 hover:bg-red-600"
            >
              <Icon name="lucide:youtube" size="20" />
            </a>
          </div>
          <div class="mt-6">
            <h5 class="mb-2 text-sm font-semibold">Jam Operasional</h5>
            <p class="text-xs text-neutral-300">Senin - Jumat: 07:00 - 15:00</p>
            <p class="text-xs text-neutral-300">Sabtu: 08:00 - 12:00</p>
          </div>
        </div>
      </div>

      <div class="pt-8 mt-8 border-t border-neutral-700">
        <div class="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div>
            <h5 class="mb-3 text-sm font-semibold text-neutral-300">Program Studi</h5>
            <ul class="space-y-1">
              <li>
                <NuxtLink to="/jurusan/tkj" class="text-xs transition duration-300 text-neutral-400 hover:text-white"
                  >Teknik Komputer Jaringan</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="/jurusan/rpl" class="text-xs transition duration-300 text-neutral-400 hover:text-white"
                  >Rekayasa Perangkat Lunak</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="/jurusan/dkv" class="text-xs transition duration-300 text-neutral-400 hover:text-white"
                  >Desain Komunikasi Visual</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="/jurusan/tei" class="text-xs transition duration-300 text-neutral-400 hover:text-white"
                  >Teknik Elektronika Industri</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/jurusan/mekatronika"
                  class="text-xs transition duration-300 text-neutral-400 hover:text-white"
                  >Teknik Mekatronika</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/jurusan/broadcasting"
                  class="text-xs transition duration-300 text-neutral-400 hover:text-white"
                  >Broadcasting</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/jurusan/animasi"
                  class="text-xs transition duration-300 text-neutral-400 hover:text-white"
                  >Animasi</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="/jurusan/tav" class="text-xs transition duration-300 text-neutral-400 hover:text-white"
                  >Teknik Audio Video</NuxtLink
                >
              </li>
            </ul>
          </div>
          <div>
            <h5 class="mb-3 text-sm font-semibold text-neutral-300">Fasilitas</h5>
            <ul class="space-y-1">
              <li>
                <NuxtLink
                  to="/informasi/sarana-prasarana"
                  class="text-xs transition duration-300 text-neutral-400 hover:text-white"
                  >Sarana Prasarana</NuxtLink
                >
              </li>
            </ul>
          </div>
          <div>
            <h5 class="mb-3 text-sm font-semibold text-neutral-300">Informasi</h5>
            <ul class="space-y-1">
              <li>
                <NuxtLink to="/berita" class="text-xs transition duration-300 text-neutral-400 hover:text-white"
                  >Berita</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="/organisasi" class="text-xs transition duration-300 text-neutral-400 hover:text-white"
                  >Organisasi</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/informasi/struktur-organisasi"
                  class="text-xs transition duration-300 text-neutral-400 hover:text-white"
                  >Struktur Organisasi</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="/informasi/guru" class="text-xs transition duration-300 text-neutral-400 hover:text-white"
                  >Guru</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/informasi/kontak"
                  class="text-xs transition duration-300 text-neutral-400 hover:text-white"
                  >Kontak</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/ekstrakurikuler"
                  class="text-xs transition duration-300 text-neutral-400 hover:text-white"
                  >Ekstrakurikuler</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="/acara" class="text-xs transition duration-300 text-neutral-400 hover:text-white"
                  >Acara</NuxtLink
                >
              </li>
            </ul>
          </div>
          <div>
            <h5 class="mb-3 text-sm font-semibold text-neutral-300">Utilitas</h5>
            <ul class="space-y-1">
              <li>
                <NuxtLink
                  to="/utilitas/anonymous-bk"
                  class="text-xs transition duration-300 text-neutral-400 hover:text-white"
                  >Anonymous BK</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/utilitas/traffic-tracker"
                  class="text-xs transition duration-300 text-neutral-400 hover:text-white"
                  >Traffic Tracker</NuxtLink
                >
              </li>
            </ul>
          </div>
          <div>
            <h5 class="mb-3 text-sm font-semibold text-neutral-300">Layanan</h5>
            <ul class="space-y-1">
              <li>
                <a
                  href="https://www.kemdikbud.go.id"
                  target="_blank"
                  class="text-xs transition duration-300 text-neutral-400 hover:text-white"
                  >Kementerian Pendidikan dan Kebudayaan</a
                >
              </li>
              <li>
                <a
                  href="https://www.disdik.jatimprov.go.id"
                  target="_blank"
                  class="text-xs transition duration-300 text-neutral-400 hover:text-white"
                  >Dinas Pendidikan Jawa Timur</a
                >
              </li>
              <li>
                <a
                  href="https://www.malangkab.go.id"
                  target="_blank"
                  class="text-xs transition duration-300 text-neutral-400 hover:text-white"
                  >Pemerintah Kabupaten Malang</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="pt-8 mt-8 text-center border-t border-neutral-700">
        <p class="text-sm text-neutral-400">&copy; 2024 SMK Negeri 2 Singosari. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
