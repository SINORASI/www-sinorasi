<script lang="ts" setup>
interface FAQItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

const faqItems = ref<FAQItem[]>([
  {
    question: "Apa itu SMK Negeri 2 Singosari?",
    answer:
      "SMK Negeri 2 Singosari adalah sekolah menengah kejuruan yang berlokasi di Singosari, Kabupaten Malang. Sekolah ini menyediakan berbagai program keahlian untuk mempersiapkan siswa menghadapi dunia kerja dengan kompetensi yang sesuai kebutuhan industri.",
    isOpen: false,
  },
  {
    question: "Jurusan apa saja yang tersedia di SMK Negeri 2 Singosari?",
    answer:
      "SMK Negeri 2 Singosari memiliki 8 jurusan unggulan yaitu: Rekayasa Perangkat Lunak (RPL), Teknik Komputer dan Jaringan (TKJ), Teknik Audio Video (TAV), Teknik Elektronika Industri (TEI), Desain Komunikasi Visual (DKV), Animasi, Broadcasting, dan Teknik Mekatronika.",
    isOpen: false,
  },
  {
    question: "Bagaimana cara mendaftar di SMK Negeri 2 Singosari?",
    answer:
      "Pendaftaran siswa baru dilakukan melalui sistem PPDB (Penerimaan Peserta Didik Baru) online yang diselenggarakan oleh Dinas Pendidikan Provinsi Jawa Timur. Informasi lengkap mengenai jadwal dan persyaratan pendaftaran akan diumumkan melalui website resmi sekolah dan media sosial kami.",
    isOpen: false,
  },
  {
    question: "Apa saja fasilitas yang tersedia di sekolah?",
    answer:
      "SMK Negeri 2 Singosari dilengkapi dengan berbagai fasilitas modern seperti laboratorium komputer, workshop praktik, perpustakaan, aula, lapangan olahraga, kantin, mushola, dan ruang kelas ber-AC. Setiap jurusan juga memiliki laboratorium khusus sesuai dengan bidang keahliannya.",
    isOpen: false,
  },
  {
    question: "Apakah ada program magang atau Praktek Kerja Lapangan (PKL)?",
    answer:
      "Ya, SMK Negeri 2 Singosari memiliki program Praktek Kerja Lapangan (PKL) yang wajib diikuti oleh seluruh siswa. Program ini memberikan kesempatan kepada siswa untuk belajar langsung di dunia industri dan memperoleh pengalaman kerja nyata sesuai dengan bidang keahliannya.",
    isOpen: false,
  },
  {
    question: "Bagaimana prospek kerja lulusan SMK Negeri 2 Singosari?",
    answer:
      "Lulusan SMK Negeri 2 Singosari memiliki prospek kerja yang sangat baik. Banyak alumni yang telah bekerja di perusahaan-perusahaan ternama baik di tingkat nasional maupun internasional. Selain itu, lulusan juga dapat melanjutkan pendidikan ke jenjang perguruan tinggi.",
    isOpen: false,
  },
  {
    question: "Apakah ada ekstrakurikuler di sekolah?",
    answer:
      "SMK Negeri 2 Singosari menyediakan berbagai kegiatan ekstrakurikuler untuk mengembangkan bakat dan minat siswa, seperti OSIS, Paskibra, Pramuka, PMR, olahraga (basket, futsal, voli), seni (musik, tari, teater), dan berbagai klub teknologi sesuai dengan bidang keahlian.",
    isOpen: false,
  },
  {
    question: "Bagaimana sistem pembelajaran di SMK Negeri 2 Singosari?",
    answer:
      "Sistem pembelajaran di SMK Negeri 2 Singosari menggabungkan teori dan praktik dengan perbandingan 30:70. Sekolah menerapkan Kurikulum Merdeka yang berfokus pada pengembangan kompetensi siswa. Pembelajaran juga didukung dengan teknologi digital dan metode teaching factory.",
    isOpen: false,
  },
]);

const toggleFAQ = (index: number) => {
  if (faqItems.value[index]) {
    faqItems.value[index].isOpen = !faqItems.value[index].isOpen;
  }
};
</script>

<template>
  <section class="py-20" id="faq">
    <div class="container px-4 mx-auto md:px-10">
      <div class="flex flex-col items-center gap-8">
        <!-- Section Header -->
        <div class="px-8 py-4 rounded-lg shadow-md bg-secondary backdrop-blur-2xl">
          <h2 class="text-3xl font-bold">Pertanyaan yang Sering Diajukan</h2>
        </div>

        <p class="max-w-2xl text-center text-gray-600">
          Temukan jawaban atas pertanyaan umum tentang SMK Negeri 2 Singosari
        </p>

        <!-- FAQ Items -->
        <div class="w-full max-w-4xl space-y-4">
          <div
            v-for="(item, index) in faqItems"
            :key="index"
            class="overflow-hidden transition-shadow duration-300 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md"
          >
            <!-- Question Button -->
            <button
              @click="toggleFAQ(index)"
              class="flex items-center justify-between w-full px-6 py-4 text-left transition-colors duration-200 hover:bg-gray-50"
            >
              <span class="pr-4 font-semibold text-gray-800">{{ item.question }}</span>
              <Icon
                name="lucide:chevron-down"
                size="24"
                class="flex-shrink-0 text-blue-600 transition-transform duration-300"
                :class="{ 'rotate-180': item.isOpen }"
              />
            </button>

            <!-- Answer Panel -->
            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 max-h-0"
              enter-to-class="opacity-100 max-h-96"
              leave-active-class="transition-all duration-300 ease-in"
              leave-from-class="opacity-100 max-h-96"
              leave-to-class="opacity-0 max-h-0"
            >
              <div v-show="item.isOpen" class="overflow-hidden">
                <div class="px-6 py-4 border-t border-gray-200 bg-gray-50">
                  <p class="leading-relaxed text-gray-700">{{ item.answer }}</p>
                </div>
              </div>
            </Transition>
          </div>
        </div>

        <!-- Contact CTA -->
        <div class="mt-8 text-center">
          <p class="mb-4 text-gray-600">Masih ada pertanyaan lain?</p>
          <NuxtLink
            to="/informasi/kontak"
            class="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white transition-colors duration-200 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg"
          >
            Hubungi Kami
            <Icon name="lucide:arrow-right" size="18" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Custom styles if needed */
</style>
