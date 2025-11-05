<script setup lang="ts">
definePageMeta({
  layout: "default",
});

const showDialog = ref(false);
const selectedPartner = ref<any>(null);
const currentImageIndex = ref(0);

useHead({
  title: "Mitra Industri - Informasi - SMKN 2 Singosari",
  meta: [
    {
      name: "description",
      content: "Daftar mitra industri dan kerjasama SMK Negeri 2 Singosari dengan berbagai perusahaan.",
    },
  ],
});

const openDialog = (partner: any) => {
  selectedPartner.value = partner;
  currentImageIndex.value = 0;
  showDialog.value = true;
  document.body.style.overflow = "hidden";
};

const closeDialog = () => {
  showDialog.value = false;
  selectedPartner.value = null;
  document.body.style.overflow = "auto";
};

const nextImage = () => {
  if (selectedPartner.value?.images) {
    currentImageIndex.value = (currentImageIndex.value + 1) % selectedPartner.value.images.length;
  }
};

const prevImage = () => {
  if (selectedPartner.value?.images) {
    currentImageIndex.value =
      currentImageIndex.value === 0 ? selectedPartner.value.images.length - 1 : currentImageIndex.value - 1;
  }
};

const goToImage = (index: number) => {
  currentImageIndex.value = index;
};

let businessPartnersData: any = null;
try {
  businessPartnersData = await $fetch("/images/industri/business_partners.json");
} catch (error) {
  console.error("Error loading business partners data:", error);
}

const partners = computed(() => {
  if (!businessPartnersData?.business_partners) return [];

  return businessPartnersData.business_partners.map((partner: any, index: number) => ({
    id: index + 1,
    name: partner.business_name,
    description: `Mitra industri ${partner.business_name} yang telah berkolaborasi dengan SMK Negeri 2 Singosari dalam program pengembangan keterampilan siswa.`,
    fullDescription: `Perusahaan ${partner.business_name} telah menjadi mitra strategis SMK Negeri 2 Singosari dalam program pengembangan sumber daya manusia. Melalui kerjasama ini, siswa mendapatkan kesempatan untuk praktik kerja lapangan, magang, dan pengembangan kompetensi yang sesuai dengan kebutuhan industri modern.`,
    logo: partner.images.length > 0 ? `/images/industri/${partner.images[0].path}` : "/images/placeholder.jpg",
    images: partner.images.map((img: any) => `/images/industri/${img.path}`),
    major: "ALL",
  }));
});
</script>

<template>
  <main>
    <div class="min-h-screen py-24 bg-linear-to-br from-gray-50 via-white to-gray-100">
      <div class="container px-4 mx-auto sm:px-6">
        <div
          class="max-w-7xl mx-auto bg-white shadow-2xl shadow-gray-300/20 rounded-3xl overflow-hidden border border-gray-200 animate-fade-in"
        >
          <div
            class="relative px-8 py-20 text-center bg-linear-to-r from-slate-800 via-slate-700 to-slate-900 overflow-hidden"
          >
            <div class="absolute inset-0 bg-black/20"></div>
            <div class="absolute inset-0 opacity-10">
              <div class="absolute inset-0 bg-linear-to-br from-orange-400/20 to-transparent"></div>
            </div>
            <div
              class="absolute top-0 left-0 w-32 h-32 bg-orange-400/10 rounded-full -translate-x-16 -translate-y-16"
            ></div>
            <div
              class="absolute bottom-0 right-0 w-48 h-48 bg-orange-400/10 rounded-full translate-x-24 translate-y-24"
            ></div>
            <div class="relative z-10">
              <div
                class="inline-flex items-center gap-3 px-6 py-2 mb-6 bg-orange-400/20 backdrop-blur-sm rounded-full border border-orange-400/30"
              >
                <Icon name="lucide:handshake" size="20" class="text-orange-400" />
                <span class="text-sm font-semibold text-orange-300 uppercase tracking-wider">Partnership Program</span>
              </div>
              <h1 class="mb-6 text-5xl font-extrabold text-white md:text-6xl lg:text-7xl tracking-tight">
                MITRA
                <span class="text-orange-400">INDUSTRI</span>
              </h1>
              <p class="max-w-4xl mx-auto text-xl leading-relaxed text-gray-300 font-medium">
                Membangun kemitraan strategis antara SMK Negeri 02 Singosari dengan dunia industri untuk menciptakan
                generasi muda yang siap kerja, inovatif, dan berkontribusi bagi kemajuan bangsa
              </p>
              <div class="flex flex-wrap justify-center gap-8 mt-8 text-sm text-gray-400">
                <div class="flex items-center gap-2">
                  <Icon name="lucide:users" size="16" />
                  <span>100+ Siswa Terlatih</span>
                </div>
                <div class="flex items-center gap-2">
                  <Icon name="lucide:building" size="16" />
                  <span>50+ Mitra Industri</span>
                </div>
                <div class="flex items-center gap-2">
                  <Icon name="lucide:award" size="16" />
                  <span>Program Berkualitas</span>
                </div>
              </div>
            </div>
          </div>

          <div class="px-8 py-12 bg-linear-to-r from-slate-50 to-gray-100 border-b border-gray-200">
            <div class="grid gap-8 md:grid-cols-3">
              <div class="text-center">
                <div class="inline-flex items-center justify-center w-16 h-16 mb-4 bg-orange-400/20 rounded-full">
                  <Icon name="lucide:briefcase" size="32" class="text-orange-600" />
                </div>
                <h3 class="mb-2 text-lg font-bold text-gray-800">Praktik Kerja Lapangan</h3>
                <p class="text-sm text-gray-600">
                  Program magang dan praktik kerja untuk pengembangan keterampilan siswa
                </p>
              </div>
              <div class="text-center">
                <div class="inline-flex items-center justify-center w-16 h-16 mb-4 bg-slate-600/20 rounded-full">
                  <Icon name="lucide:users" size="32" class="text-slate-700" />
                </div>
                <h3 class="mb-2 text-lg font-bold text-gray-800">Rekrutmen SDM</h3>
                <p class="text-sm text-gray-600">Penyaluran tenaga kerja terampil ke dunia industri</p>
              </div>
              <div class="text-center">
                <div class="inline-flex items-center justify-center w-16 h-16 mb-4 bg-orange-400/20 rounded-full">
                  <Icon name="lucide:lightbulb" size="32" class="text-orange-600" />
                </div>
                <h3 class="mb-2 text-lg font-bold text-gray-800">Kolaborasi Inovasi</h3>
                <p class="text-sm text-gray-600">Pengembangan teknologi dan inovasi bersama mitra industri</p>
              </div>
            </div>
          </div>

          <div class="px-8 py-16 bg-linear-to-b from-white to-slate-50">
            <div class="mb-8 text-center">
              <h2 class="mb-4 text-2xl font-bold text-gray-800">Daftar Mitra Industri</h2>
              <p class="text-gray-600">Klik pada kartu perusahaan untuk melihat detail kemitraan</p>
            </div>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div
                v-for="(partner, index) in partners"
                :key="partner.id"
                @click="openDialog(partner)"
                class="group relative p-6 transition-all duration-500 bg-white border border-gray-200 shadow-lg rounded-2xl hover:shadow-2xl hover:shadow-slate-500/20 hover:-translate-y-1 hover:border-orange-300 cursor-pointer overflow-hidden animate-slide-in-up"
                :style="{ animationDelay: `${index * 0.1}s` }"
              >
                <div
                  class="absolute inset-0 bg-linear-to-br from-orange-50/50 to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                ></div>

                <div
                  class="relative mb-4 overflow-hidden bg-linear-to-br from-gray-50 to-gray-100 rounded-xl aspect-video group-hover:shadow-md transition-all duration-500 border border-gray-100"
                >
                  <NuxtImg
                    :src="partner.logo"
                    :alt="partner.name"
                    class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    class="absolute inset-0 bg-linear-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  ></div>
                  <div
                    class="absolute top-3 right-3 px-2 py-1 bg-slate-700/90 backdrop-blur-sm rounded-lg text-xs font-semibold text-white"
                  >
                    Industri
                  </div>
                </div>

                <div class="relative z-10">
                  <h3
                    class="mb-2 text-lg font-bold text-gray-900 group-hover:text-slate-700 transition-colors duration-300 line-clamp-2"
                  >
                    {{ partner.name }}
                  </h3>
                  <p
                    class="text-sm leading-relaxed text-gray-600 group-hover:text-gray-700 transition-colors duration-300 line-clamp-3"
                  >
                    {{ partner.description }}
                  </p>
                  <div
                    class="mt-4 flex items-center justify-center text-orange-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 bg-orange-50/50 rounded-lg py-2"
                  >
                    <Icon name="lucide:eye" size="16" class="mr-2" />
                    <span>Lihat Detail Kemitraan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showDialog && selectedPartner"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        @click.self="closeDialog"
      >
        <div
          class="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto shadow-2xl shadow-slate-500/30 border border-gray-200"
        >
          <button
            @click="closeDialog"
            class="sticky z-10 float-right p-3 text-gray-600 transition-all bg-white rounded-xl shadow-lg top-6 right-6 hover:text-gray-800 hover:shadow-xl hover:scale-110 border border-gray-200"
          >
            <Icon name="lucide:x" size="24" />
          </button>

          <div class="clear-both p-8 md:p-12">
            <div class="grid gap-8 md:grid-cols-2 md:gap-12">
              <div class="flex flex-col">
                <div
                  class="overflow-hidden bg-linear-to-br from-gray-50 to-slate-100 border border-gray-200 shadow-xl shadow-slate-500/10 rounded-2xl"
                >
                  <div class="relative aspect-square">
                    <div
                      class="flex items-center justify-center w-full h-full p-8 bg-linear-to-br from-white to-gray-50"
                    >
                      <SmartImage
                        :src="selectedPartner.images[currentImageIndex]"
                        :alt="selectedPartner.name"
                        class="object-contain max-w-full max-h-full transition-transform duration-300 hover:scale-105"
                      />
                    </div>

                    <button
                      v-if="selectedPartner.images.length > 1"
                      @click="prevImage"
                      class="absolute p-3 transition-all duration-300 -translate-y-1/2 bg-white rounded-xl shadow-lg left-4 top-1/2 hover:bg-slate-700 hover:text-white hover:scale-110 border border-gray-200"
                    >
                      <Icon name="lucide:chevron-left" size="24" />
                    </button>

                    <button
                      v-if="selectedPartner.images.length > 1"
                      @click="nextImage"
                      class="absolute p-3 transition-all duration-300 -translate-y-1/2 bg-white rounded-xl shadow-lg right-4 top-1/2 hover:bg-slate-700 hover:text-white hover:scale-110 border border-gray-200"
                    >
                      <Icon name="lucide:chevron-right" size="24" />
                    </button>

                    <div
                      v-if="selectedPartner.images.length > 1"
                      class="absolute flex gap-3 -translate-x-1/2 bottom-6 left-1/2"
                    >
                      <button
                        v-for="(image, index) in selectedPartner.images"
                        :key="index"
                        @click="goToImage(index)"
                        :class="[
                          'rounded-full transition-all duration-300 hover:scale-125',
                          currentImageIndex === index
                            ? 'bg-slate-700 w-8 h-3 shadow-lg'
                            : 'bg-gray-300 w-3 h-3 hover:bg-gray-400 border border-gray-300',
                        ]"
                      />
                    </div>
                  </div>
                </div>

                <div class="mt-6 grid grid-cols-2 gap-4">
                  <div class="text-center p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <Icon name="lucide:users" size="24" class="mx-auto mb-2 text-slate-600" />
                    <div class="text-2xl font-bold text-slate-800">100+</div>
                    <div class="text-xs text-slate-600">Siswa Terlatih</div>
                  </div>
                  <div class="text-center p-4 bg-orange-50 rounded-xl border border-orange-200">
                    <Icon name="lucide:calendar" size="24" class="mx-auto mb-2 text-orange-600" />
                    <div class="text-2xl font-bold text-orange-800">5+</div>
                    <div class="text-xs text-orange-600">Tahun Kerjasama</div>
                  </div>
                </div>
              </div>

              <div class="flex flex-col">
                <div class="mb-6">
                  <div
                    class="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-slate-100 rounded-full text-sm font-semibold text-slate-700"
                  >
                    <Icon name="lucide:building" size="16" />
                    Mitra Industri
                  </div>
                  <h2 class="text-3xl font-bold text-gray-900 md:text-4xl tracking-tight">
                    {{ selectedPartner.name }}
                  </h2>
                </div>

                <div class="mb-6">
                  <h3 class="flex items-center mb-4 text-lg font-bold text-gray-800">
                    <Icon name="lucide:handshake" size="20" class="mr-2 text-orange-600" />
                    Ringkasan Kemitraan
                  </h3>
                  <div class="p-6 bg-linear-to-r from-slate-50 to-gray-50 rounded-xl border border-slate-200">
                    <p class="leading-relaxed text-gray-700">
                      {{ selectedPartner.description }}
                    </p>
                  </div>
                </div>

                <div class="mb-8">
                  <h3 class="flex items-center mb-4 text-lg font-bold text-gray-800">
                    <Icon name="lucide:info" size="20" class="mr-2 text-slate-600" />
                    Detail Kemitraan
                  </h3>
                  <div class="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
                    <p class="leading-relaxed text-justify text-gray-700">
                      {{ selectedPartner.fullDescription }}
                    </p>
                  </div>
                </div>

                <div class="flex items-center justify-center gap-4 mt-auto">
                  <button
                    @click="closeDialog"
                    class="flex items-center gap-3 px-6 py-3 font-semibold text-gray-700 transition-all duration-300 bg-gray-100 rounded-xl hover:bg-gray-200 hover:scale-105 border border-gray-200"
                  >
                    <Icon name="lucide:arrow-left" size="18" />
                    Kembali
                  </button>

                  <NuxtLink
                    to="/"
                    class="flex items-center gap-3 px-6 py-3 font-semibold text-white transition-all duration-300 bg-linear-to-r from-slate-700 to-slate-800 rounded-xl hover:from-slate-800 hover:to-slate-900 hover:scale-105 shadow-lg"
                  >
                    <Icon name="lucide:home" size="18" />
                    Beranda
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes subtle-float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}

.animate-slide-in-up {
  animation: slide-in-up 0.6s ease-out;
}

.animate-scale-in {
  animation: scale-in 0.5s ease-out;
}

.group:hover {
  animation: subtle-float 3s ease-in-out infinite;
}

.line-clamp-2 {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.gradient-text {
  background: linear-gradient(135deg, #374151 0%, #1f2937 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.modal-content {
  scroll-behavior: smooth;
}

.modal-content::-webkit-scrollbar {
  width: 6px;
}

.modal-content::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}

.modal-content::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #64748b, #475569);
  border-radius: 10px;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #334155, #1e293b);
}

.shadow-professional {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.shadow-professional-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: #fef3c7;
  border-radius: 6px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #fb923c, #f97316);
  border-radius: 6px;
  border: 2px solid #fef3c7;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #ea580c, #dc2626);
}
</style>
