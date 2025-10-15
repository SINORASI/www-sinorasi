<script lang="ts" setup>
interface CarouselMember {
  name: string;
  image: string;
}

const showMembersDialog = ref(false);
const showSeksiBidangDialog = ref(false);
const selectedSeksiBidang = ref(1);
const carouselIndex = ref(0);

const openMembersDialog = () => {
  showMembersDialog.value = true;
};

const closeMembersDialog = () => {
  showMembersDialog.value = false;
};

const openSeksiBidangDialog = (bidangNumber: number) => {
  selectedSeksiBidang.value = bidangNumber;
  carouselIndex.value = 0;
  showSeksiBidangDialog.value = true;
};

const closeSeksiBidangDialog = () => {
  showSeksiBidangDialog.value = false;
};

useHead({
  title: "Organisasi - SMKN 2 Singosari",
  meta: [
    {
      name: "description",
      content: "Daftar organisasi siswa di SMK Negeri 2 Singosari. Bergabunglah dan kembangkan kemampuanmu!",
    },
  ],
});

// Carousel data - 5 members
const carouselMembers: CarouselMember[] = [
  { name: "Sumiijah S.Pd M.Pd", image: "/images/profile-placeholder.png" },
  { name: "Member 2", image: "/images/profile-placeholder.png" },
  { name: "Member 3", image: "/images/profile-placeholder.png" },
  { name: "Member 4", image: "/images/profile-placeholder.png" },
  { name: "Member 5", image: "/images/profile-placeholder.png" },
];

const nextCarousel = () => {
  carouselIndex.value = (carouselIndex.value + 1) % carouselMembers.length;
};

const prevCarousel = () => {
  carouselIndex.value = (carouselIndex.value - 1 + carouselMembers.length) % carouselMembers.length;
};

const getVisibleMembers = (): CarouselMember[] => {
  const members: CarouselMember[] = [];
  for (let i = 0; i < 5; i++) {
    const index = (carouselIndex.value + i) % carouselMembers.length;
    const member = carouselMembers[index];
    if (member) {
      members.push(member);
    }
  }
  return members;
};
</script>

<template>
  <section class="flex items-center justify-center w-full h-screen bg-neutral-500 py-30">
    <div class="flex items-center justify-around gap-20">
      <img src="/images/logo-smk.webp" alt="Logo" class="object-contain h-60 w-60" />
      <h1 class="text-6xl font-bold text-transparent whitespace-nowrap [-webkit-text-stroke:1px_white]">
        
      </h1>
    </div>
  </section>
  <section class="container min-h-screen py-20 mx-auto">
    <div class="container max-w-6xl px-8 mx-auto">
      <!-- Statistics Cards -->
      <div class="grid grid-cols-2 gap-6 mb-16 md:grid-cols-4">
        <div class="p-6 text-center bg-white shadow-lg rounded-xl">
          <div class="mb-2 text-3xl font-bold text-gray-800">50+</div>
          <div class="font-medium text-gray-600">Anggota</div>
        </div>
        <div class="p-6 text-center bg-white shadow-lg rounded-xl">
          <div class="mb-2 text-3xl font-bold text-gray-800">50+</div>
          <div class="font-medium text-gray-600">Program Kerja</div>
        </div>
        <div class="p-6 text-center bg-white shadow-lg rounded-xl">
          <div class="mb-2 text-3xl font-bold text-gray-800">15 Tahun</div>
          <div class="font-medium text-gray-600">Berjalan</div>
        </div>
        <div class="p-6 text-center bg-white shadow-lg rounded-xl">
          <div class="mb-2 text-3xl font-bold text-gray-800">3x</div>
          <div class="font-medium text-gray-600">Pertemuan</div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="flex flex-col items-center gap-12 lg:flex-row">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <img src="/images/logo-smk.webp" alt="Logo" class="object-contain w-40 h-40 lg:h-60 lg:w-60" />
        </div>

        <!-- Text Content -->
        <div class="flex-1 text-center lg:text-left">
          <h1 class="mb-6 text-4xl font-bold text-gray-800 lg:text-6xl">Apa Itu ?</h1>
          <p class="mb-8 text-lg leading-relaxed text-gray-700">
            Caranya gampang banget, kamu cuman perlu ngumpulin temen temen yang minat ekstrakurikulernya sama sepertimu,
            untuk membuat komunitas ekstrakurikuler baru baru, minimal kamu membutuhkan 10 orang atau lebih. setelah itu
            kalian dapat menghubungi pihak OSIS SMK Negeri 2 Singosari untuk menyampaikan bahwa kalian ingin membuat
            komunitas ekstrakurikuler baru, dan nantinya dari pihak OSIS akan menyampaikan aspirasi kalian kepada WAKA
            KESISWAAN atau yang bersangkutan. Nanti, dari pihak sekolah akan membuat keputusan "apakah komunitas
            ekstrakurikuler baru yang kamu buat itu sudah memenuhi standart atau tidak".
          </p>

          <div class="pl-6 border-l-4 border-blue-500">
            <h2 class="mb-2 text-2xl font-bold text-gray-800">Arti Logo Organisasi</h2>
            <p class="text-lg text-gray-600">SMK Negeri 02 Singosari</p>
          </div>
        </div>
      </div>

      <!-- Organization Layout -->
      <div class="flex items-center justify-center gap-16 mt-20">
        <!-- Left Column -->
        <div class="flex flex-col gap-4">
          <div class="px-6 py-3 bg-white rounded-lg shadow-lg">
            <span class="font-bold text-gray-800">ORGANISASI</span>
          </div>
          <div class="px-6 py-3 bg-white rounded-lg shadow-lg">
            <span class="font-bold text-gray-800">ORGANISASI</span>
          </div>
          <div class="px-6 py-3 bg-white rounded-lg shadow-lg">
            <span class="font-bold text-gray-800">ORGANISASI</span>
          </div>
          <div class="px-6 py-3 bg-white rounded-lg shadow-lg">
            <span class="font-bold text-gray-800">ORGANISASI</span>
          </div>
        </div>

        <!-- Center Logo -->
        <div class="flex-shrink-0">
          <img src="/images/logo-smk.webp" alt="Logo" class="object-contain w-32 h-32" />
        </div>

        <!-- Right Column -->
        <div class="flex flex-col gap-4">
          <div class="px-6 py-3 bg-white rounded-lg shadow-lg">
            <span class="font-bold text-gray-800">ORGANISASI</span>
          </div>
          <div class="px-6 py-3 bg-white rounded-lg shadow-lg">
            <span class="font-bold text-gray-800">ORGANISASI</span>
          </div>
          <div class="px-6 py-3 bg-white rounded-lg shadow-lg">
            <span class="font-bold text-gray-800">ORGANISASI</span>
          </div>
          <div class="px-6 py-3 bg-white rounded-lg shadow-lg">
            <span class="font-bold text-gray-800">ORGANISASI</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Organizational Structure Section -->
  <section class="py-20 bg-gray-50">
    <div class="container max-w-6xl px-8 mx-auto">
      <!-- Section Header -->
      <div class="mb-16 text-center">
        <h2 class="mb-4 text-4xl font-bold text-gray-800">Sejarah Organisasi ?</h2>
        <p class="mb-2 text-gray-600">SMK Negeri 02 Singosari</p>
        <p class="max-w-4xl mx-auto leading-relaxed text-gray-700">
          Caranya gampang banget, kamu cuman perlu ngumpulin temen temen yang minat ekstrakurikulernya sama sepertimu,
          untuk membuat komunitas ekstrakurikuler baru baru, minimal kamu membutuhkan 10 orang atau lebih. setelah itu
          kalian dapat menghubungi pihak OSIS SMK Negeri 2 Singosari untuk menyampaikan bahwa kalian ingin membuat
          komunitas ekstrakurikuler baru, dan nantinya dari pihak OSIS akan menyampaikan aspirasi kalian kepada WAKA
          KESISWAAN atau yang bersangkutan. Nanti, dari pihak sekolah akan membuat keputusan "apakah komunitas
          ekstrakurikuler baru yang kamu buat itu sudah memenuhi standart atau tidak".
        </p>
      </div>

      <!-- Organizational Structure -->
      <div class="mb-12 text-center">
        <h3 class="mb-2 text-3xl font-bold text-gray-800">STRUKTUR ORGANISASI </h3>
        <p class="text-gray-600">SMK Negeri 02 Singosari</p>
      </div>

      <!-- Organization Cards -->
      <div class="grid grid-cols-1 gap-8 mb-8 md:grid-cols-3">
        <!-- Sekretaris -->
        <div class="overflow-hidden bg-white rounded-lg shadow-lg">
          <div class="flex items-center justify-center h-48 bg-gray-200">
            <div class="w-20 h-20 bg-gray-300 rounded-full"></div>
          </div>
          <div class="py-3 text-center text-white bg-gray-800">
            <h4 class="text-lg font-bold">SEKRETARIS</h4>
          </div>
        </div>

        <!-- Ketua & Wakil -->
        <div class="overflow-hidden bg-white rounded-lg shadow-lg">
          <div class="flex items-center justify-center h-48 bg-gray-200">
            <div class="w-20 h-20 bg-gray-300 rounded-full"></div>
          </div>
          <div class="py-3 text-center text-white bg-gray-800">
            <h4 class="text-lg font-bold">KETUA & WAKIL</h4>
          </div>
        </div>

        <!-- Bendahara -->
        <div class="overflow-hidden bg-white rounded-lg shadow-lg">
          <div class="flex items-center justify-center h-48 bg-gray-200">
            <div class="w-20 h-20 bg-gray-300 rounded-full"></div>
          </div>
          <div class="py-3 text-center text-white bg-gray-800">
            <h4 class="text-lg font-bold">BENDAHARA</h4>
          </div>
        </div>
      </div>

      <!-- View All Members Link -->
      <div class="text-center">
        <button @click="openMembersDialog" class="font-medium text-blue-600 underline hover:text-blue-800">
          Lihat Seluruh Anggota...
        </button>
      </div>
    </div>
  </section>

  <!-- Latest Activities Section -->
  <section class="py-20 bg-white">
    <div class="container max-w-6xl px-8 mx-auto">
      <!-- Section Header -->
      <div class="mb-12">
        <h2 class="mb-2 text-4xl font-bold text-gray-800">Kegiatan Terbaru Dari</h2>
        <p class="text-gray-600">SMK Negeri 02 Singosari</p>
      </div>

      <!-- Activities Grid -->
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
        <!-- Activity Card 1 -->
        <div class="overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm">
          <!-- Image Placeholder -->
          <div class="flex items-center justify-center h-48 bg-gray-600">
            <div class="w-16 h-16 bg-gray-500 rounded"></div>
          </div>
          <!-- Content -->
          <div class="p-4">
            <h3 class="mb-2 font-bold text-gray-800">Judul Aktivitas</h3>
            <p class="mb-3 text-sm leading-relaxed text-gray-600">
              
              dipetiengu tentang aktivitas terhadiat walker...
            </p>
            <div class="text-right">
              <span class="text-sm font-medium text-gray-500">10-3-2045</span>
            </div>
          </div>
        </div>

        <!-- Activity Card 2 -->
        <div class="overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm">
          <!-- Image Placeholder -->
          <div class="flex items-center justify-center h-48 bg-gray-600">
            <div class="w-16 h-16 bg-gray-500 rounded"></div>
          </div>
          <!-- Content -->
          <div class="p-4">
            <h3 class="mb-2 font-bold text-gray-800">Judul Aktivitas</h3>
            <p class="mb-3 text-sm leading-relaxed text-gray-600">
              
              dipetiengu tentang aktivitas terhadiat walker...
            </p>
            <div class="text-right">
              <span class="text-sm font-medium text-gray-500">10-3-2045</span>
            </div>
          </div>
        </div>

        <!-- Activity Card 3 -->
        <div class="overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm">
          <!-- Image Placeholder -->
          <div class="flex items-center justify-center h-48 bg-gray-600">
            <div class="w-16 h-16 bg-gray-500 rounded"></div>
          </div>
          <!-- Content -->
          <div class="p-4">
            <h3 class="mb-2 font-bold text-gray-800">Judul Aktivitas</h3>
            <p class="mb-3 text-sm leading-relaxed text-gray-600">
              
              dipetiengu tentang aktivitas terhadiat walker...
            </p>
            <div class="text-right">
              <span class="text-sm font-medium text-gray-500">10-3-2045</span>
            </div>
          </div>
        </div>

        <!-- Activity Card 4 -->
        <div class="overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm">
          <!-- Image Placeholder -->
          <div class="flex items-center justify-center h-48 bg-gray-600">
            <div class="w-16 h-16 bg-gray-500 rounded"></div>
          </div>
          <!-- Content -->
          <div class="p-4">
            <h3 class="mb-2 font-bold text-gray-800">Judul Aktivitas</h3>
            <p class="mb-3 text-sm leading-relaxed text-gray-600">
              
              dipetiengu tentang aktivitas terhadiat walker...
            </p>
            <div class="text-right">
              <span class="text-sm font-medium text-gray-500">10-3-2045</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Registration Information Section -->
  <section class="py-20 bg-gray-50">
    <div class="container max-w-6xl px-8 mx-auto">
      <!-- Section Header -->
      <div class="mb-12 text-center">
        <h2 class="mb-2 text-4xl font-bold text-gray-800">INFORMASI PENDAFTARAN </h2>
        <p class="text-gray-600">SMK Negeri 02 Singosari</p>
      </div>

      <!-- Content Layout -->
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <!-- Contact Information Card -->
        <div class="p-6 bg-white rounded-lg shadow-lg lg:col-span-1">
          <h3 class="mb-6 text-xl font-bold text-gray-800">KONTAK TERKAIT</h3>

          <!-- Instagram Section -->
          <div class="mb-6">
            <div class="flex items-center mb-3">
              <Icon name="lucide:instagram" class="w-6 h-6 mr-3 text-pink-500" />
              <span class="font-semibold text-gray-800">Instagram</span>
            </div>
            <div class="space-y-1 text-sm text-gray-600 ml-9">
              <div class="flex justify-between">
                <span>Miftahul</span>
                <span>: @v_seto_v7</span>
              </div>
              <div class="flex justify-between">
                <span>SMKn 2 SGS</span>
                <span>: @smkn2_singosari</span>
              </div>
              <div class="flex justify-between">
                <span>OSIS</span>
                <span>: @osis.stemdasil</span>
              </div>
            </div>
          </div>

          <!-- WhatsApp Section -->
          <div class="mb-6">
            <div class="flex items-center mb-3">
              <Icon name="lucide:message-circle" class="w-6 h-6 mr-3 text-green-500" />
              <span class="font-semibold text-gray-800">WhatsApp</span>
            </div>
            <div class="space-y-1 text-sm text-gray-600 ml-9">
              <div class="flex items-center justify-between">
                <span>Miftahul</span>
                <div class="flex items-center">
                  <span>: 083839717167</span>
                  <Icon name="lucide:external-link" class="w-3 h-3 ml-1" />
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span>Fauzia</span>
                <div class="flex items-center">
                  <span>: 081234567890</span>
                  <Icon name="lucide:external-link" class="w-3 h-3 ml-1" />
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span>Admin</span>
                <div class="flex items-center">
                  <span>: 089876543210</span>
                  <Icon name="lucide:external-link" class="w-3 h-3 ml-1" />
                </div>
              </div>
            </div>
          </div>

          <!-- Media Social Section -->
          <div>
            <div class="flex items-center mb-3">
              <Icon name="lucide:share-2" class="w-6 h-6 mr-3 text-blue-500" />
              <span class="font-semibold text-gray-800">Media Sosial</span>
            </div>
            <div class="space-y-1 text-sm text-gray-600 ml-9">
              <div class="flex items-center">
                <Icon name="lucide:facebook" class="w-4 h-4 mr-2 text-blue-600" />
                <span>SmkndusSingosari</span>
              </div>
              <div class="flex items-center">
                <Icon name="lucide:music" class="w-4 h-4 mr-2 text-black" />
                <span>smkn2_singosari</span>
              </div>
              <div class="flex items-center">
                <Icon name="lucide:instagram" class="w-4 h-4 mr-2 text-pink-500" />
                <span>smkn2_singosari</span>
              </div>
              <div class="flex items-center">
                <Icon name="lucide:youtube" class="w-4 h-4 mr-2 text-red-600" />
                <span>SMK NEGERI 2 SINGOSARI Official</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Poster/Recruitment Card -->
        <div class="p-6 bg-white rounded-lg shadow-lg lg:col-span-2">
          <div class="flex items-center justify-center bg-gray-200 rounded-lg h-96">
            <div class="text-center text-gray-600">
              <Icon name="lucide:image" class="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p class="font-semibold">Poster Pendaftaran / open recruitment organisasi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Full Screen Members Dialog -->
  <Teleport to="body">
    <Transition name="fade" class="[&_.fade-enter-active]:transition-opacity [&_.fade-enter-active]:duration-300 [&_.fade-enter-active]:ease-in-out [&_.fade-leave-active]:transition-opacity [&_.fade-leave-active]:duration-300 [&_.fade-leave-active]:ease-in-out [&_.fade-enter-from]:opacity-0 [&_.fade-leave-to]:opacity-0">
      <div v-if="showMembersDialog" class="fixed inset-0 z-50 overflow-y-auto bg-white">
        <!-- Close Button -->
        <button
          @click="closeMembersDialog"
          class="fixed z-10 p-3 text-white transition-colors bg-gray-800 rounded-full shadow-lg top-8 right-8 hover:bg-gray-700"
        >
          <Icon name="lucide:x" class="w-6 h-6" />
        </button>

        <!-- Dialog Content -->
        <div class="container max-w-6xl px-8 mx-auto py-30">
          <h2 class="mb-12 text-4xl font-bold text-center text-gray-800">Struktur Organisasi Lengkap</h2>

          <!-- Leadership Row -->
          <div class="grid grid-cols-1 gap-6 mb-6 md:grid-cols-3">
            <!-- Sekretaris -->
            <div class="overflow-hidden bg-white border border-gray-200 rounded-lg shadow-lg">
              <div class="flex items-center justify-center h-32 bg-gray-200">
                <div class="w-16 h-16 bg-gray-300 rounded-full"></div>
              </div>
              <div class="py-2 text-center text-white bg-gray-800">
                <h4 class="font-bold">SEKRETARIS</h4>
              </div>
            </div>

            <!-- Ketua & Wakil -->
            <div class="overflow-hidden bg-white border border-gray-200 rounded-lg shadow-lg">
              <div class="flex items-center justify-center h-32 bg-gray-200">
                <div class="w-16 h-16 bg-gray-300 rounded-full"></div>
              </div>
              <div class="py-2 text-center text-white bg-gray-800">
                <h4 class="font-bold">KETUA & WAKIL</h4>
              </div>
            </div>

            <!-- Bendahara -->
            <div class="overflow-hidden bg-white border border-gray-200 rounded-lg shadow-lg">
              <div class="flex items-center justify-center h-32 bg-gray-200">
                <div class="w-16 h-16 bg-gray-300 rounded-full"></div>
              </div>
              <div class="py-2 text-center text-white bg-gray-800">
                <h4 class="font-bold">BENDAHARA</h4>
              </div>
            </div>
          </div>

          <!-- Sections Grid (2 columns) -->
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <!-- Seksi Bidang 1 -->
            <button
              @click="openSeksiBidangDialog(1)"
              class="overflow-hidden transition-shadow bg-white border border-gray-200 rounded-lg shadow-lg cursor-pointer hover:shadow-xl"
            >
              <div class="flex items-center justify-center h-40 bg-gray-200">
                <div class="w-20 h-20 bg-gray-300 rounded-full"></div>
              </div>
              <div class="py-2 text-center text-white bg-gray-800">
                <h4 class="font-bold">SEKSI BIDANG 1</h4>
              </div>
            </button>

            <!-- Seksi Bidang 2 -->
            <button
              @click="openSeksiBidangDialog(2)"
              class="overflow-hidden transition-shadow bg-white border border-gray-200 rounded-lg shadow-lg cursor-pointer hover:shadow-xl"
            >
              <div class="flex items-center justify-center h-40 bg-gray-200">
                <div class="w-20 h-20 bg-gray-300 rounded-full"></div>
              </div>
              <div class="py-2 text-center text-white bg-gray-800">
                <h4 class="font-bold">SEKSI BIDANG 2</h4>
              </div>
            </button>

            <!-- Seksi Bidang 3 -->
            <button
              @click="openSeksiBidangDialog(3)"
              class="overflow-hidden transition-shadow bg-white border border-gray-200 rounded-lg shadow-lg cursor-pointer hover:shadow-xl"
            >
              <div class="flex items-center justify-center h-40 bg-gray-200">
                <div class="w-20 h-20 bg-gray-300 rounded-full"></div>
              </div>
              <div class="py-2 text-center text-white bg-gray-800">
                <h4 class="font-bold">SEKSI BIDANG 3</h4>
              </div>
            </button>

            <!-- Seksi Bidang 4 -->
            <button
              @click="openSeksiBidangDialog(4)"
              class="overflow-hidden transition-shadow bg-white border border-gray-200 rounded-lg shadow-lg cursor-pointer hover:shadow-xl"
            >
              <div class="flex items-center justify-center h-40 bg-gray-200">
                <div class="w-20 h-20 bg-gray-300 rounded-full"></div>
              </div>
              <div class="py-2 text-center text-white bg-gray-800">
                <h4 class="font-bold">SEKSI BIDANG 4</h4>
              </div>
            </button>

            <!-- Seksi Bidang 5 -->
            <button
              @click="openSeksiBidangDialog(5)"
              class="overflow-hidden transition-shadow bg-white border border-gray-200 rounded-lg shadow-lg cursor-pointer hover:shadow-xl"
            >
              <div class="flex items-center justify-center h-40 bg-gray-200">
                <div class="w-20 h-20 bg-gray-300 rounded-full"></div>
              </div>
              <div class="py-2 text-center text-white bg-gray-800">
                <h4 class="font-bold">SEKSI BIDANG 5</h4>
              </div>
            </button>

            <!-- Seksi Bidang 6 -->
            <button
              @click="openSeksiBidangDialog(6)"
              class="overflow-hidden transition-shadow bg-white border border-gray-200 rounded-lg shadow-lg cursor-pointer hover:shadow-xl"
            >
              <div class="flex items-center justify-center h-40 bg-gray-200">
                <div class="w-20 h-20 bg-gray-300 rounded-full"></div>
              </div>
              <div class="py-2 text-center text-white bg-gray-800">
                <h4 class="font-bold">SEKSI BIDANG 6</h4>
              </div>
            </button>

            <!-- Seksi Bidang 7 -->
            <button
              @click="openSeksiBidangDialog(7)"
              class="overflow-hidden transition-shadow bg-white border border-gray-200 rounded-lg shadow-lg cursor-pointer hover:shadow-xl"
            >
              <div class="flex items-center justify-center h-40 bg-gray-200">
                <div class="w-20 h-20 bg-gray-300 rounded-full"></div>
              </div>
              <div class="py-2 text-center text-white bg-gray-800">
                <h4 class="font-bold">SEKSI BIDANG 7</h4>
              </div>
            </button>

            <!-- Seksi Bidang 8 -->
            <button
              @click="openSeksiBidangDialog(8)"
              class="overflow-hidden transition-shadow bg-white border border-gray-200 rounded-lg shadow-lg cursor-pointer hover:shadow-xl"
            >
              <div class="flex items-center justify-center h-40 bg-gray-200">
                <div class="w-20 h-20 bg-gray-300 rounded-full"></div>
              </div>
              <div class="py-2 text-center text-white bg-gray-800">
                <h4 class="font-bold">SEKSI BIDANG 8</h4>
              </div>
            </button>

            <!-- Seksi Bidang 9 -->
            <button
              @click="openSeksiBidangDialog(9)"
              class="overflow-hidden transition-shadow bg-white border border-gray-200 rounded-lg shadow-lg cursor-pointer hover:shadow-xl"
            >
              <div class="flex items-center justify-center h-40 bg-gray-200">
                <div class="w-20 h-20 bg-gray-300 rounded-full"></div>
              </div>
              <div class="py-2 text-center text-white bg-gray-800">
                <h4 class="font-bold">SEKSI BIDANG 9</h4>
              </div>
            </button>

            <!-- Seksi Bidang 10 -->
            <button
              @click="openSeksiBidangDialog(10)"
              class="overflow-hidden transition-shadow bg-white border border-gray-200 rounded-lg shadow-lg cursor-pointer hover:shadow-xl"
            >
              <div class="flex items-center justify-center h-40 bg-gray-200">
                <div class="w-20 h-20 bg-gray-300 rounded-full"></div>
              </div>
              <div class="py-2 text-center text-white bg-gray-800">
                <h4 class="font-bold">SEKSI BIDANG 10</h4>
              </div>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>

  <!-- Seksi Bidang Detail Dialog -->
  <Teleport to="body">
    <Transition name="fade" class="[&_.fade-enter-active]:transition-opacity [&_.fade-enter-active]:duration-300 [&_.fade-enter-active]:ease-in-out [&_.fade-leave-active]:transition-opacity [&_.fade-leave-active]:duration-300 [&_.fade-leave-active]:ease-in-out [&_.fade-enter-from]:opacity-0 [&_.fade-leave-to]:opacity-0">
      <div v-if="showSeksiBidangDialog" class="fixed inset-0 z-50 overflow-y-auto bg-white">
        <!-- Close Button -->
        <button
          @click="closeSeksiBidangDialog"
          class="fixed z-10 p-3 text-white transition-colors bg-gray-800 rounded-full shadow-lg top-8 right-8 hover:bg-gray-700"
        >
          <Icon name="lucide:x" class="w-6 h-6" />
        </button>

        <!-- Dialog Content -->
        <div class="container max-w-6xl px-8 mx-auto py-30">
          <!-- Title -->
          <h2 class="mb-8 text-4xl font-bold text-center text-gray-800">
            Ketua Seksi Bidang {{ selectedSeksiBidang }}
          </h2>

          <!-- Carousel Section -->
          <div class="mb-12">
            <div class="relative">
              <!-- Carousel Track -->
              <div class="flex items-center justify-center gap-4 mb-6">
                <div
                  v-for="(member, index) in getVisibleMembers()"
                  :key="index"
                  :class="[
                    'transition-all duration-300',
                    index === 2 ? 'scale-100 opacity-100' : 'scale-75 opacity-60',
                  ]"
                >
                  <div
                    class="overflow-hidden bg-white border border-gray-200 rounded-lg shadow-lg"
                    :class="index === 2 ? 'w-40' : 'w-32'"
                  >
                    <div :class="index === 2 ? 'h-44' : 'h-36'" class="flex items-center justify-center bg-gray-300">
                      <img :src="member.image" :alt="member.name" class="object-cover w-full h-full" />
                    </div>
                    <div v-if="index === 2" class="py-2 text-center bg-white border-t">
                      <p class="text-sm font-semibold text-gray-800">{{ member.name }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Carousel Controls -->
              <div class="flex justify-center gap-4">
                <button @click="prevCarousel" class="p-2 transition-colors bg-gray-200 rounded-full hover:bg-gray-300">
                  <Icon name="lucide:chevron-left" class="w-6 h-6 text-gray-700" />
                </button>
                <button @click="nextCarousel" class="p-2 transition-colors bg-gray-200 rounded-full hover:bg-gray-300">
                  <Icon name="lucide:chevron-right" class="w-6 h-6 text-gray-700" />
                </button>
              </div>
            </div>
          </div>

          <!-- Content Sections -->
          <div class="space-y-8">
            <!-- Visi -->
            <div>
              <h3 class="mb-4 text-2xl font-bold text-gray-800">Visi</h3>
              <p class="leading-relaxed text-gray-700">
                
              </p>
            </div>

            <!-- Misi -->
            <div>
              <h3 class="mb-4 text-2xl font-bold text-gray-800">Misi</h3>
              <p class="leading-relaxed text-gray-700">
                
              </p>
            </div>

            <!-- Tugas dari Ketua -->
            <div>
              <h3 class="mb-4 text-2xl font-bold text-gray-800">Tugas dari Ketua</h3>
              <p class="mb-4 leading-relaxed text-gray-700">
                
              </p>
            </div>

            <!-- Program Kerja -->
            <div>
              <h3 class="mb-4 text-2xl font-bold text-gray-800">Program Kerja</h3>

              <div class="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2">
                <!-- Left Column -->
                <div class="space-y-3">
                  <div class="p-4 bg-white border border-gray-300 rounded-lg">
                    <p class="text-sm text-gray-700">• </p>
                  </div>
                  <div class="p-4 bg-white border border-gray-300 rounded-lg">
                    <p class="text-sm text-gray-700">
                      • claret dipajakan tentang asal dui gyaru bidang terhadiat sambattakan "tyaru berbeda indirektical
                      di anak negeri Di Gunopun berubaha
                    </p>
                  </div>
                  <div class="p-4 bg-white border border-gray-300 rounded-lg">
                    <p class="text-sm text-gray-700">• </p>
                  </div>
                </div>

                <!-- Right Column -->
                <div class="space-y-3">
                  <div class="p-4 bg-white border border-gray-300 rounded-lg">
                    <p class="text-sm text-gray-700">
                      • claret dipajakan tentang asal dui gyaru bidang terhadiat sambattakan "tyaru berbeda indirektical
                      di anak negeri Di Gunopun berubaha
                    </p>
                  </div>
                  <div class="p-4 bg-white border border-gray-300 rounded-lg">
                    <p class="text-sm text-gray-700">• </p>
                  </div>
                </div>
              </div>

              <p class="leading-relaxed text-gray-700">
                
              </p>

              <!-- Navigation Buttons -->
              <div class="flex justify-center gap-4 mt-8">
                <button
                  class="flex items-center gap-2 px-6 py-2 font-semibold text-gray-800 transition-colors bg-yellow-400 rounded-lg hover:bg-yellow-500"
                >
                  <Icon name="lucide:arrow-left" class="w-5 h-5" />
                  Kembali
                </button>
                <button
                  class="flex items-center gap-2 px-6 py-2 font-semibold text-gray-800 transition-colors bg-yellow-400 rounded-lg hover:bg-yellow-500"
                >
                  <Icon name="lucide:home" class="w-5 h-5" />
                  Selengkapnya
                  <Icon name="lucide:arrow-right" class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

