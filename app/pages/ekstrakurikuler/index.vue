<script lang="ts" setup>
import { computed, ref } from "vue";

const isDialogOpen = ref(false);
const searchQuery = ref("");
const selectedCategory = ref("Semua");

const openDialog = () => {
  isDialogOpen.value = true;
  document.body.style.overflow = "hidden";
};

const closeDialog = () => {
  isDialogOpen.value = false;
  document.body.style.overflow = "";
};

const { data: extracurricularsResponse, pending, error } = await useFetch("/api/extracurriculars");
const extracurriculars = computed(() => extracurricularsResponse.value?.data || []);

const categories = computed(() => {
  const cats = new Set<string>(["Semua"]);
  extracurriculars.value.forEach((extra: any) => {
    if (extra.category) cats.add(extra.category);
  });
  return Array.from(cats);
});

const filteredExtracurriculars = computed(() => {
  let filtered = extracurriculars.value;

  if (selectedCategory.value !== "Semua") {
    filtered = filtered.filter((extra: any) => extra.category === selectedCategory.value);
  }

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (extra: any) =>
        extra.name.toLowerCase().includes(query) ||
        extra.description?.toLowerCase().includes(query),
    );
  }

  return filtered;
});

useHead({
  title: "Ekstrakurikuler - SMKN 2 Singosari",
  meta: [
    {
      name: "description",
      content:
        "Daftar ekstrakurikuler dan organisasi di SMK Negeri 2 Singosari. Kembangkan bakat dan minatmu!",
    },
  ],
});
</script>

<template>
  <div class="min-h-screen py-24 bg-gradient-to-br from-blue-50 via-white to-blue-50 relative overflow-hidden">
    
    <div class="absolute inset-0">
      <div
        class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-200/30 via-cyan-200/30 to-orange-200/30 animate-gradient-shift"
      ></div>
      <div class="absolute top-20 left-10 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl animate-float"></div>
      <div
        class="absolute top-40 right-20 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl animate-float"
        style="animation-delay: -2s"
      ></div>
      <div
        class="absolute bottom-20 left-1/4 w-80 h-80 bg-orange-300/20 rounded-full blur-3xl animate-float"
        style="animation-delay: -4s"
      ></div>
      <div
        class="absolute bottom-40 right-10 w-64 h-64 bg-cyan-300/20 rounded-full blur-3xl animate-float"
        style="animation-delay: -6s"
      ></div>
    </div>

    
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-20 left-20 w-4 h-4 bg-gray-300/30 rotate-45 animate-bounce-in"
        style="animation-delay: 0.5s"
      ></div>
      <div
        class="absolute top-40 right-40 w-6 h-6 border-2 border-gray-400/40 rounded-full animate-bounce-in"
        style="animation-delay: 1s"
      ></div>
      <div
        class="absolute bottom-60 left-40 w-3 h-3 bg-gray-300/30 rotate-12 animate-bounce-in"
        style="animation-delay: 1.5s"
      ></div>
      <div
        class="absolute bottom-40 right-60 w-5 h-5 border-2 border-gray-400/40 rounded-lg animate-bounce-in"
        style="animation-delay: 2s"
      ></div>
      <div
        class="absolute top-60 right-20 w-2 h-2 bg-gray-300/30 rounded-full animate-bounce-in"
        style="animation-delay: 2.5s"
      ></div>
    </div>

    <div class="container px-4 py-8 mx-auto sm:px-6 relative z-10">
      
      <div class="flex flex-col items-center mb-20 animate-fade-in-up">
        <div class="relative group mb-8">
          
          <div class="relative">
            <h1
              class="text-5xl sm:text-6xl lg:text-7xl text-center font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-orange-600 animate-gradient-shift drop-shadow-2xl"
            >
              EKSTRAKURIKULER
            </h1>
            
            <div
              class="absolute inset-0 text-5xl sm:text-6xl text-center lg:text-7xl font-black text-blue-600 blur-sm opacity-75 animate-pulse"
            >
              EKSTRAKURIKULER
            </div>
            
            <div class="absolute -inset-4 border-2 border-blue-600/50 rounded-3xl animate-pulse-glow"></div>
          </div>

          
          <div class="mt-6 relative">
            <p
              class="text-xl sm:text-2xl text-gray-800 font-light tracking-wide animate-slide-in-left text-center max-w-4xl leading-relaxed"
            >
              Temukan passionmu dan kembangkan potensimu melalui berbagai kegiatan ekstrakurikuler yang menantang dan
              inspiratif
            </p>
            
            <div class="flex justify-center items-center gap-6 mt-6">
              <div class="w-20 h-px bg-gradient-to-r from-transparent to-blue-600 animate-shimmer"></div>
              <div class="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
              <div class="w-20 h-px bg-gradient-to-l from-transparent to-orange-600 animate-shimmer"></div>
            </div>
          </div>
        </div>
      </div>

      
      <div class="grid max-w-5xl grid-cols-1 gap-8 mx-auto mb-24 md:grid-cols-2">
        <div class="relative group">
          
          <div
            class="bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-xl border border-blue-300/50 rounded-2xl p-8 text-center hover-lift stagger-1 animate-scale-in overflow-hidden shadow-lg"
          >
            
            <div
              class="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-200/30 via-cyan-200/30 to-orange-200/30 animate-gradient-shift"
            ></div>
            <div class="absolute inset-[1px] bg-gradient-to-br from-white to-gray-50 rounded-2xl"></div>

            
            <div class="relative z-10">
              
              <div
                class="inline-block p-6 mb-6 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl shadow-2xl animate-bounce-in relative"
              >
                <Icon name="lucide:trophy" size="40" class="text-white animate-pulse" />
                <div class="absolute inset-0 bg-blue-400/20 rounded-2xl blur-xl animate-pulse-glow"></div>
              </div>

              
              <div class="mb-4">
                <h2
                  class="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 animate-gradient-shift drop-shadow-lg"
                >
                  {{ extracurriculars.length }}
                </h2>
                
                <div class="flex justify-center gap-1 mt-2">
                  <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <div class="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" style="animation-delay: 0.2s"></div>
                  <div class="w-2 h-2 bg-orange-500 rounded-full animate-pulse" style="animation-delay: 0.4s"></div>
                </div>
              </div>

              <p class="text-xl font-bold text-gray-800 mb-4 tracking-wider">EKSTRAKURIKULER</p>
              <div
                class="w-24 h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent mx-auto animate-shimmer"
              ></div>
            </div>

            
            <div
              class="absolute top-4 right-4 w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 animate-ping"
            ></div>
            <div
              class="absolute bottom-4 left-4 w-1 h-1 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 animate-ping"
              style="animation-delay: 0.5s"
            ></div>
          </div>
        </div>

        <div class="relative group">
          
          <div
            class="bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-xl border border-blue-300/50 rounded-2xl p-8 text-center hover-lift stagger-2 animate-scale-in overflow-hidden shadow-lg"
          >
            
            <div
              class="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-200/30 via-cyan-200/30 to-orange-200/30 animate-gradient-shift"
            ></div>
            <div class="absolute inset-[1px] bg-gradient-to-br from-white to-gray-50 rounded-2xl"></div>

            
            <div class="relative z-10">
              
              <div
                class="inline-block p-6 mb-6 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl shadow-2xl animate-bounce-in relative"
              >
                <Icon name="lucide:activity" size="40" class="text-white animate-pulse" />
                <div class="absolute inset-0 bg-blue-400/20 rounded-2xl blur-xl animate-pulse-glow"></div>
              </div>

              
              <div class="mb-4">
                <h2
                  class="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 animate-gradient-shift drop-shadow-lg"
                >
                  {{ extracurriculars.length }}
                </h2>
                
                <div class="flex justify-center gap-1 mt-2">
                  <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <div class="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" style="animation-delay: 0.2s"></div>
                  <div class="w-2 h-2 bg-orange-500 rounded-full animate-pulse" style="animation-delay: 0.4s"></div>
                </div>
              </div>

              <p class="text-xl font-bold text-gray-800 mb-4 tracking-wider">AKTIVITAS</p>
              <div
                class="w-24 h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent mx-auto animate-shimmer"
              ></div>
            </div>

            
            <div
              class="absolute top-4 right-4 w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 animate-ping"
            ></div>
            <div
              class="absolute bottom-4 left-4 w-1 h-1 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 animate-ping"
              style="animation-delay: 0.5s"
            ></div>
          </div>
        </div>
      </div>

      
      <section class="mb-24 animate-fade-in-on-scroll">
        <div class="mb-16 text-center">
          
          <div class="relative mb-8">
            <h2
              class="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-orange-600 animate-gradient-shift"
            >
              PILIH EKSTRAKURIKULER
            </h2>
            
            <div
              class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full animate-shimmer"
            ></div>
            
            <div class="absolute inset-0 text-4xl sm:text-5xl font-black text-blue-600/30 blur-lg animate-pulse">
              PILIH EKSTRAKURIKULER
            </div>
          </div>

          <p
            class="max-w-4xl mx-auto text-gray-700 text-lg sm:text-xl leading-relaxed animate-slide-in-right font-light"
          >
            Temukan kegiatan yang sesuai dengan passion dan minatmu. Setiap ekstrakurikuler dirancang untuk
            mengembangkan skill dan karaktermu secara maksimal
          </p>

          
          <div class="flex justify-center items-center gap-8 mt-8">
            <div class="w-12 h-px bg-gradient-to-r from-transparent to-blue-600 animate-shimmer"></div>
            <div class="w-4 h-4 border-2 border-blue-600 rotate-45 animate-spin"></div>
            <div class="w-12 h-px bg-gradient-to-l from-transparent to-cyan-600 animate-shimmer"></div>
          </div>
        </div>

        
        <div class="flex flex-wrap justify-center gap-4 mb-16">
          <button
            v-for="category in categories"
            :key="category"
            @click="selectedCategory = category"
            :class="[
              'px-8 py-4 rounded-xl text-sm font-bold tracking-wider transition-all duration-500 border-2 hover-lift animate-scale-in relative overflow-hidden',
              selectedCategory === category
                ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-blue-400 shadow-2xl animate-pulse-glow'
                : 'bg-white/90 backdrop-blur-sm text-gray-700 hover:text-gray-900 border-gray-300/50 hover:border-blue-400 hover:from-blue-500/20 hover:to-cyan-500/20',
            ]"
          >
            
            <span class="relative z-10">{{ category }}</span>
            <div
              v-if="selectedCategory === category"
              class="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 animate-gradient-shift"
            ></div>
            
            <div
              class="absolute top-2 right-2 w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping"
            ></div>
          </button>
        </div>

        
        <div v-if="pending" class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="i in 9"
            :key="i"
            class="bg-white/90 backdrop-blur-xl border border-gray-300/50 p-8 text-center rounded-2xl animate-pulse shadow-lg"
          >
            <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl"></div>
            <div class="w-4/5 h-8 mx-auto mb-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
            <div class="w-3/5 h-4 mx-auto bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
          </div>
        </div>

        <div
          v-else-if="filteredExtracurriculars.length > 0"
          class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          <NuxtLink
            v-for="(extra, index) in filteredExtracurriculars"
            :key="extra.id"
            :to="`/ekstrakurikuler/${extra.slug}`"
            :class="[
              'bg-white/90 backdrop-blur-xl border border-gray-300/50 hover:border-blue-400/50 p-8 text-center rounded-2xl hover-lift group animate-scale-in transition-all duration-500 overflow-hidden relative shadow-lg',
              `stagger-${(index % 6) + 1}`,
            ]"
          >
            
            <div
              class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            ></div>

            
            <div class="relative mb-6">
              <div
                class="inline-block p-6 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl group-hover:from-blue-500 group-hover:to-cyan-600 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-xl"
              >
                <Icon
                  :name="extra.icon || 'lucide:activity'"
                  size="40"
                  class="text-gray-700 group-hover:text-white transition-colors duration-300"
                />
                
                <div
                  class="absolute inset-0 bg-blue-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                ></div>
              </div>
              
              <div
                class="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping"
              ></div>
              <div
                class="absolute -bottom-1 -left-1 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping"
                style="animation-delay: 0.2s"
              ></div>
            </div>

            
            <h3 class="mb-4 text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
              {{ extra.name }}
            </h3>

            
            <p
              v-if="extra.description"
              class="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-4 group-hover:text-gray-800 transition-colors duration-300"
            >
              {{ extra.description }}
            </p>

            
            <div
              v-if="extra.category"
              class="inline-block px-4 py-2 text-xs font-bold bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-600 border border-blue-400/30 rounded-full mb-4 group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-all duration-300"
            >
              {{ extra.category }}
            </div>

            
            <div class="flex items-center justify-center">
              <Icon
                name="lucide:arrow-right"
                size="20"
                class="text-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2"
              />
            </div>

            
            <div
              class="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-400/50 transition-all duration-500"
            ></div>
          </NuxtLink>
        </div>

        <div v-else class="p-12 text-center bg-white border-2 border-blue-100 shadow-xl rounded-2xl">
          <Icon name="lucide:search-x" size="64" class="mx-auto mb-4 text-gray-300" />
          <h3 class="mb-2 text-xl font-bold text-gray-700">Ekstrakurikuler Tidak Ditemukan</h3>
          <p class="mb-6 text-gray-500">
            {{ searchQuery ? "Coba kata kunci lain atau" : "" }}
            {{ selectedCategory !== "Semua" ? "Pilih kategori lain" : "Belum ada ekstrakurikuler terdaftar" }}
          </p>
          <button
            v-if="selectedCategory !== 'Semua' || searchQuery"
            @click="
              selectedCategory = 'Semua';
              searchQuery = '';
            "
            class="px-6 py-3 font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Reset Filter
          </button>
        </div>
      </section>

      
      <section class="max-w-5xl p-12 mx-auto text-center animate-fade-in-on-scroll relative">
        
        <div
          class="bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-xl border border-blue-300/50 rounded-3xl p-12 hover-lift overflow-hidden relative group shadow-xl"
        >
          
          <div
            class="absolute inset-0 bg-gradient-to-r from-blue-200/20 via-cyan-200/20 to-orange-200/20 animate-gradient-shift"
          ></div>

          
          <div class="absolute top-6 left-6 w-3 h-3 bg-blue-400 rounded-full animate-float opacity-60"></div>
          <div
            class="absolute top-8 right-8 w-2 h-2 bg-cyan-400 rounded-full animate-float opacity-60"
            style="animation-delay: -1s"
          ></div>
          <div
            class="absolute bottom-6 left-8 w-1 h-1 bg-orange-400 rounded-full animate-float opacity-60"
            style="animation-delay: -2s"
          ></div>

          <div class="relative z-10">
            
            <div
              class="inline-block p-8 mb-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl shadow-2xl animate-bounce-in relative"
            >
              <Icon name="lucide:lightbulb" size="56" class="text-white animate-pulse" />
              
              <div class="absolute inset-0 bg-blue-400/30 rounded-3xl blur-2xl animate-pulse-glow"></div>
            </div>

            
            <h2
              class="mb-8 text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-orange-600 animate-gradient-shift"
            >
              BUAT EKSTRAKURIKULER BARU
            </h2>

            
            <p class="mb-10 text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Tidak menemukan ekstrakurikuler yang sesuai dengan passionmu? Jadilah pionir dan buat komunitas baru yang
              akan menginspirasi teman-teman lainnya!
            </p>

            
            <button
              @click="openDialog"
              class="inline-flex items-center gap-4 px-10 py-5 font-bold text-white transition-all duration-500 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 animate-pulse-glow relative overflow-hidden group/btn"
            >
              
              <div
                class="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300 pointer-events-none"
              ></div>

              <span class="relative z-10 text-lg tracking-wider">MULAI SEKARANG</span>
              <Icon
                name="lucide:arrow-right"
                size="24"
                class="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-2"
              />

              
              <div
                class="absolute top-3 right-3 w-1 h-1 bg-white rounded-full opacity-0 group-hover/btn:opacity-100 animate-ping pointer-events-none"
              ></div>
              <div
                class="absolute bottom-3 left-3 w-1 h-1 bg-white rounded-full opacity-0 group-hover/btn:opacity-100 animate-ping pointer-events-none"
                style="animation-delay: 0.2s"
              ></div>
            </button>

            
            <div
              class="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-blue-400/50 transition-all duration-500"
            ></div>
          </div>
        </div>
      </section>
    </div>

    
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        leave-active-class="transition-opacity duration-300"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isDialogOpen"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black bg-opacity-30"
          @click.self="closeDialog"
        >
          <div
            class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-blue-100"
          >
            
            <div
              class="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-800 rounded-t-2xl"
            >
              <h2 class="text-2xl font-bold text-white">Cara Membuat Ekstrakurikuler Baru</h2>
              <button @click="closeDialog" class="text-white transition-colors hover:text-gray-200">
                <Icon name="lucide:x" size="24" />
              </button>
            </div>

            
            <div class="p-6 space-y-6">
              
              <div class="flex gap-4">
                <div class="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full">
                  <span class="text-lg font-bold text-white">1</span>
                </div>
                <div>
                  <h3 class="mb-2 text-lg font-bold text-gray-800">Persyaratan</h3>
                  <p class="leading-relaxed text-gray-600">
                    Untuk menjadi ketua ekstrakurikuler, kamu harus berusia minimal 16 tahun, bersekolah di SMKN 2
                    Singosari, dan lulus tes leadership.
                  </p>
                </div>
              </div>

              
              <div class="flex gap-4">
                <div class="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full">
                  <span class="text-lg font-bold text-white">2</span>
                </div>
                <div>
                  <h3 class="mb-2 text-lg font-bold text-gray-800">Proses Pendaftaran</h3>
                  <p class="leading-relaxed text-gray-600">
                    Ajukan proposal ekstrakurikuler baru kepada pihak sekolah dengan detail kegiatan dan tujuan yang
                    jelas.
                  </p>
                </div>
              </div>

              
              <div class="flex gap-4">
                <div class="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full">
                  <span class="text-lg font-bold text-white">3</span>
                </div>
                <div>
                  <h3 class="mb-2 text-lg font-bold text-gray-800">Butuh Bantuan?</h3>
                  <p class="mb-4 leading-relaxed text-gray-600">
                    Jika masih bingung, silahkan hubungi kontak di bawah ini:
                  </p>

                  
                  <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div class="p-4 border-2 border-blue-100 bg-blue-50 rounded-xl">
                      <div class="flex items-center gap-2 mb-3">
                        <Icon name="lucide:instagram" size="20" class="text-pink-600" />
                        <span class="font-semibold text-gray-800">Instagram</span>
                      </div>
                      <div class="space-y-2 text-sm">
                        <p class="text-gray-700">@dika_abid_21</p>
                        <p class="text-gray-700">@andika_alrizalianty</p>
                      </div>
                    </div>

                    <div class="p-4 border-2 border-green-100 bg-green-50 rounded-xl">
                      <div class="flex items-center gap-2 mb-3">
                        <Icon name="lucide:message-circle" size="20" class="text-green-600" />
                        <span class="font-semibold text-gray-800">WhatsApp</span>
                      </div>
                      <div class="space-y-2 text-sm">
                        <p class="text-gray-700">085859731672</p>
                        <p class="text-gray-700">+62 85845980017</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            
            <div class="flex justify-center p-6 border-t border-gray-200">
              <button
                @click="closeDialog"
                class="inline-flex items-center gap-2 font-semibold text-gray-600 hover:text-gray-800"
              >
                <Icon name="lucide:arrow-left" size="18" />
                Kembali
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
