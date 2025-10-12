si
<script setup lang="ts">
const props = defineProps<{
  bgColor?: string;
}>();

const isColoredBackground = computed(() => !!props.bgColor && props.bgColor !== "#1f2937");
</script>

<template>
  <footer class="py-12 mt-16 text-white" :style="`background-color: ${bgColor || '#1f2937'}`">
    <div class="container px-6 mx-auto">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-4">
        <div class="md:col-span-1">
          <div class="flex items-center gap-4 mb-4">
            <img src="/images/logo-smk.webp" width="60" alt="Logo SMKN 2 Singosari" class="rounded-full" />
            <div>
              <h3 :class="['text-xl font-bold', isColoredBackground ? 'text-white' : 'text-white']">
                SMKN 2 Singosari
              </h3>
              <p :class="['text-sm', isColoredBackground ? 'text-white/80' : 'text-neutral-300']">
                Inovasi Raih Prestasi
              </p>
            </div>
          </div>
          <p :class="['text-sm leading-relaxed', isColoredBackground ? 'text-white/70' : 'text-neutral-300']">
            Sekolah Menengah Kejuruan Negeri 2 Singosari berkomitmen untuk mencetak lulusan yang unggul, berkarakter,
            dan siap menghadapi tantangan dunia kerja.
          </p>
        </div>

        <div class="md:col-span-1">
          <h4 :class="['mb-4 text-lg font-semibold', isColoredBackground ? 'text-white' : 'text-white']">
            Tautan Cepat
          </h4>
          <ul class="space-y-2">
            <li>
              <NuxtLink
                :to="'/'"
                :class="[
                  'transition duration-300',
                  isColoredBackground ? 'text-white/80 hover:text-white' : 'text-neutral-300 hover:text-white',
                ]"
                >Beranda</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/informasi/profile-sekolah"
                :class="[
                  'transition duration-300',
                  isColoredBackground ? 'text-white/80 hover:text-white' : 'text-neutral-300 hover:text-white',
                ]"
                >Profile Sekolah</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                :to="'/berita'"
                :class="[
                  'transition duration-300',
                  isColoredBackground ? 'text-white/80 hover:text-white' : 'text-neutral-300 hover:text-white',
                ]"
                >Berita</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                :to="'/acara'"
                :class="[
                  'transition duration-300',
                  isColoredBackground ? 'text-white/80 hover:text-white' : 'text-neutral-300 hover:text-white',
                ]"
                >Acara</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/informasi/kontak"
                :class="[
                  'transition duration-300',
                  isColoredBackground ? 'text-white/80 hover:text-white' : 'text-neutral-300 hover:text-white',
                ]"
                >Layanan</NuxtLink
              >
            </li>
          </ul>
        </div>

        <div class="md:col-span-1">
          <h4 :class="['mb-4 text-lg font-semibold', isColoredBackground ? 'text-white' : 'text-white']">
            Kontak Kami
          </h4>
          <div class="space-y-3">
            <div class="flex items-start gap-3">
              <Icon
                :name="'lucide:map-pin'"
                :size="20"
                :class="['mt-1', isColoredBackground ? 'text-white/60' : 'text-neutral-400']"
              />
              <div>
                <p :class="['text-sm', isColoredBackground ? 'text-white/80' : 'text-neutral-300']">
                  Jl. Perusahaan Raya No.20, Jajar, Tanjungtirto.
                </p>
                <p :class="['text-sm', isColoredBackground ? 'text-white/80' : 'text-neutral-300']">
                  Singosari, Kabupaten Malang
                </p>
                <p :class="['text-sm', isColoredBackground ? 'text-white/80' : 'text-neutral-300']">Jawa Timur 65153</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <Icon
                :name="'lucide:phone'"
                :size="20"
                :class="[isColoredBackground ? 'text-white/60' : 'text-neutral-400']"
              />
              <p :class="['text-sm', isColoredBackground ? 'text-white/80' : 'text-neutral-300']">(0341) 4345127</p>
            </div>
            <div class="flex items-center gap-3">
              <Icon
                :name="'lucide:mail'"
                :size="20"
                :class="[isColoredBackground ? 'text-white/60' : 'text-neutral-400']"
              />
              <p :class="['text-sm', isColoredBackground ? 'text-white/80' : 'text-neutral-300']">
                smkn2.singosari@yahoo.co.id
              </p>
            </div>
          </div>
        </div>

        <div class="md:col-span-1">
          <h4 :class="['mb-4 text-lg font-semibold', isColoredBackground ? 'text-white' : 'text-white']">Ikuti Kami</h4>
          <div class="flex gap-4">
            <a
              href="https://instagram.com/smkn2_singosari"
              :class="[
                'flex items-center justify-center w-10 h-10 transition duration-300 rounded-full',
                isColoredBackground ? 'bg-white/20 hover:bg-pink-600' : 'bg-neutral-700 hover:bg-pink-600',
              ]"
            >
              <Icon name="lucide:instagram" size="20" />
            </a>
            <a
              href="https://www.youtube.com/channel/UC0B8cIUqCnHMzoTNXxbRhFQ"
              :class="[
                'flex items-center justify-center w-10 h-10 transition duration-300 rounded-full',
                isColoredBackground ? 'bg-white/20 hover:bg-red-600' : 'bg-neutral-700 hover:bg-red-600',
              ]"
            >
              <Icon name="lucide:youtube" size="20" />
            </a>
            <a
              href="https://tiktok.com/@smkn2singosari"
              :class="[
                'flex items-center justify-center w-10 h-10 transition duration-300 rounded-full',
                isColoredBackground ? 'bg-white/20 hover:bg-black' : 'bg-neutral-700 hover:bg-black',
              ]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </a>
          </div>
          <div class="mt-6">
            <h5 :class="['mb-2 text-sm font-semibold', isColoredBackground ? 'text-white' : 'text-white']">
              Jam Operasional
            </h5>
            <p :class="['text-xs', isColoredBackground ? 'text-white/70' : 'text-neutral-300']">
              Senin - Jumat: 07:00 - 15:00
            </p>
            <p :class="['text-xs', isColoredBackground ? 'text-white/70' : 'text-neutral-300']">Sabtu: 08:00 - 12:00</p>
          </div>
        </div>
      </div>

      <div :class="['pt-8 mt-8 border-t', isColoredBackground ? 'border-white/30' : 'border-neutral-700']">
        <div class="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div>
            <h5 :class="['mb-3 text-sm font-semibold', isColoredBackground ? 'text-white' : 'text-neutral-300']">
              Program Studi
            </h5>
            <ul class="space-y-1">
              <li>
                <NuxtLink
                  :to="'/jurusan/tkj'"
                  :class="[
                    'text-xs transition duration-300',
                    isColoredBackground ? 'text-white/70 hover:text-white' : 'text-neutral-400 hover:text-white',
                  ]"
                  >Teknik Komputer Jaringan</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  :to="'/jurusan/rpl'"
                  :class="[
                    'text-xs transition duration-300',
                    isColoredBackground ? 'text-white/70 hover:text-white' : 'text-neutral-400 hover:text-white',
                  ]"
                  >Rekayasa Perangkat Lunak</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  :to="'/jurusan/dkv'"
                  :class="[
                    'text-xs transition duration-300',
                    isColoredBackground ? 'text-white/70 hover:text-white' : 'text-neutral-400 hover:text-white',
                  ]"
                  >Desain Komunikasi Visual</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  :to="'/jurusan/tei'"
                  :class="[
                    'text-xs transition duration-300',
                    isColoredBackground ? 'text-white/70 hover:text-white' : 'text-neutral-400 hover:text-white',
                  ]"
                  >Teknik Elektronika Industri</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  :to="'/jurusan/mekatronika'"
                  :class="[
                    'text-xs transition duration-300',
                    isColoredBackground ? 'text-white/70 hover:text-white' : 'text-neutral-400 hover:text-white',
                  ]"
                  >Teknik Mekatronika</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  :to="'/jurusan/broadcasting'"
                  :class="[
                    'text-xs transition duration-300',
                    isColoredBackground ? 'text-white/70 hover:text-white' : 'text-neutral-400 hover:text-white',
                  ]"
                  >Broadcasting</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  :to="'/jurusan/animasi'"
                  :class="[
                    'text-xs transition duration-300',
                    isColoredBackground ? 'text-white/70 hover:text-white' : 'text-neutral-400 hover:text-white',
                  ]"
                  >Animasi</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  :to="'/jurusan/tav'"
                  :class="[
                    'text-xs transition duration-300',
                    isColoredBackground ? 'text-white/70 hover:text-white' : 'text-neutral-400 hover:text-white',
                  ]"
                  >Teknik Audio Video</NuxtLink
                >
              </li>
            </ul>
          </div>
          <div>
            <h5 :class="['mb-3 text-sm font-semibold', isColoredBackground ? 'text-white' : 'text-neutral-300']">
              Fasilitas
            </h5>
            <ul class="space-y-1">
              <li>
                <NuxtLink
                  :to="'/informasi/sarana-prasarana'"
                  :class="[
                    'text-xs transition duration-300',
                    isColoredBackground ? 'text-white/70 hover:text-white' : 'text-neutral-400 hover:text-white',
                  ]"
                  >Sarana Prasarana</NuxtLink
                >
              </li>
            </ul>
          </div>
          <div>
            <h5 :class="['mb-3 text-sm font-semibold', isColoredBackground ? 'text-white' : 'text-neutral-300']">
              Informasi
            </h5>
            <ul class="space-y-1">
              <li>
                <NuxtLink
                  :to="'/berita'"
                  :class="[
                    'text-xs transition duration-300',
                    isColoredBackground ? 'text-white/70 hover:text-white' : 'text-neutral-400 hover:text-white',
                  ]"
                  >Berita</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  :to="'/organisasi'"
                  :class="[
                    'text-xs transition duration-300',
                    isColoredBackground ? 'text-white/70 hover:text-white' : 'text-neutral-400 hover:text-white',
                  ]"
                  >Organisasi</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  :to="'/informasi/struktur-organisasi'"
                  :class="[
                    'text-xs transition duration-300',
                    isColoredBackground ? 'text-white/70 hover:text-white' : 'text-neutral-400 hover:text-white',
                  ]"
                  >Struktur Organisasi</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  :to="'/informasi/guru'"
                  :class="[
                    'text-xs transition duration-300',
                    isColoredBackground ? 'text-white/70 hover:text-white' : 'text-neutral-400 hover:text-white',
                  ]"
                  >Guru</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  :to="'/informasi/kontak'"
                  :class="[
                    'text-xs transition duration-300',
                    isColoredBackground ? 'text-white/70 hover:text-white' : 'text-neutral-400 hover:text-white',
                  ]"
                  >Kontak</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  :to="'/ekstrakurikuler'"
                  :class="[
                    'text-xs transition duration-300',
                    isColoredBackground ? 'text-white/70 hover:text-white' : 'text-neutral-400 hover:text-white',
                  ]"
                  >Ekstrakurikuler</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  :to="'/acara'"
                  :class="[
                    'text-xs transition duration-300',
                    isColoredBackground ? 'text-white/70 hover:text-white' : 'text-neutral-400 hover:text-white',
                  ]"
                  >Acara</NuxtLink
                >
              </li>
            </ul>
          </div>
          <div>
            <h5 :class="['mb-3 text-sm font-semibold', isColoredBackground ? 'text-white' : 'text-neutral-300']">
              Utilitas
            </h5>
            <ul class="space-y-1">
              <li>
                <NuxtLink
                  :to="'/utilitas/anonymous-bk'"
                  :class="[
                    'text-xs transition duration-300',
                    isColoredBackground ? 'text-white/70 hover:text-white' : 'text-neutral-400 hover:text-white',
                  ]"
                  >Anonymous BK</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  :to="'/utilitas/traffic-tracker'"
                  :class="[
                    'text-xs transition duration-300',
                    isColoredBackground ? 'text-white/70 hover:text-white' : 'text-neutral-400 hover:text-white',
                  ]"
                  >Traffic Tracker</NuxtLink
                >
              </li>
            </ul>
          </div>
          <div>
            <h5 :class="['mb-3 text-sm font-semibold', isColoredBackground ? 'text-white' : 'text-neutral-300']">
              Layanan
            </h5>
            <ul class="space-y-1">
              <li>
                <a
                  href="https://www.kemdikbud.go.id"
                  target="_blank"
                  :class="[
                    'text-xs transition duration-300',
                    isColoredBackground ? 'text-white/70 hover:text-white' : 'text-neutral-400 hover:text-white',
                  ]"
                  >Kementerian Pendidikan dan Kebudayaan</a
                >
              </li>
              <li>
                <a
                  href="https://www.disdik.jatimprov.go.id"
                  target="_blank"
                  :class="[
                    'text-xs transition duration-300',
                    isColoredBackground ? 'text-white/70 hover:text-white' : 'text-neutral-400 hover:text-white',
                  ]"
                  >Dinas Pendidikan Jawa Timur</a
                >
              </li>
              <li>
                <a
                  href="https://www.malangkab.go.id"
                  target="_blank"
                  :class="[
                    'text-xs transition duration-300',
                    isColoredBackground ? 'text-white/70 hover:text-white' : 'text-neutral-400 hover:text-white',
                  ]"
                  >Pemerintah Kabupaten Malang</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div :class="['pt-8 mt-8 text-center border-t', isColoredBackground ? 'border-white/30' : 'border-neutral-700']">
        <p :class="['text-sm', isColoredBackground ? 'text-white/60' : 'text-neutral-400']">
          &copy; 2025 SMK Negeri 2 Singosari. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
