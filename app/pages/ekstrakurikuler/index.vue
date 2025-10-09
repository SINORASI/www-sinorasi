<script lang="ts" setup>
import { ref, computed } from "vue";
import type { Extracurricular } from "~/models/Extracurricular";

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

// Fetch organizations
const { data: organizationsResponse } = await useFetch("/api/organizations");
const organizations = computed(() => organizationsResponse.value?.data || []);

// Fetch extracurriculars
const { data: extracurricularsResponse, pending, error } = await useFetch("/api/extracurriculars");
const extracurriculars = computed(() => extracurricularsResponse.value?.data || []);

// Categories
const categories = computed(() => {
  const cats = new Set<string>(["Semua"]);
  extracurriculars.value.forEach((extra: any) => {
    if (extra.category) cats.add(extra.category);
  });
  return Array.from(cats);
});

// Filtered organizations by search
const filteredOrganizations = computed(() => {
  if (!searchQuery.value.trim()) return organizations.value;
  const query = searchQuery.value.toLowerCase();
  return organizations.value.filter(
    (org: any) => org.name.toLowerCase().includes(query) || org.description?.toLowerCase().includes(query)
  );
});

// Filtered extracurriculars by category and search
const filteredExtracurriculars = computed(() => {
  let filtered = extracurriculars.value;

  if (selectedCategory.value !== "Semua") {
    filtered = filtered.filter((extra: any) => extra.category === selectedCategory.value);
  }

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (extra: any) => extra.name.toLowerCase().includes(query) || extra.description?.toLowerCase().includes(query)
    );
  }

  return filtered;
});

useHead({
  title: "Ekstrakurikuler - SMKN 2 Singosari",
  meta: [
    {
      name: "description",
      content: "Daftar ekstrakurikuler dan organisasi di SMK Negeri 2 Singosari. Kembangkan bakat dan minatmu!",
    },
  ],
});
</script>

<template>
  <div class="min-h-screen py-24 bg-gradient-to-b from-white via-blue-50 to-white">
    <div class="container px-4 py-8 mx-auto sm:px-6">
      <!-- Header Section -->
      <div class="flex flex-col items-center mb-12">
        <div
          class="p-6 px-10 py-6 mb-4 border border-blue-200 shadow-xl bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl rounded-2xl"
        >
          <h1 class="text-3xl font-bold text-white sm:text-4xl">Ekstrakurikuler & Organisasi</h1>
        </div>
        <p class="max-w-2xl text-center text-gray-600">Kembangkan bakat dan minatmu di SMK Negeri 2 Singosari</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid max-w-3xl grid-cols-1 gap-6 mx-auto mb-16 md:grid-cols-2">
        <div
          class="p-8 text-center transition-shadow bg-white border-2 border-blue-100 shadow-xl rounded-2xl hover:shadow-2xl"
        >
          <div class="inline-block p-4 mb-4 bg-blue-100 rounded-full">
            <Icon name="lucide:users" size="32" class="text-blue-600" />
          </div>
          <h2 class="mb-2 text-5xl font-bold text-blue-600">{{ organizations.length }}</h2>
          <p class="text-lg font-semibold text-gray-700">Organisasi</p>
        </div>
        <div
          class="p-8 text-center transition-shadow bg-white border-2 border-orange-100 shadow-xl rounded-2xl hover:shadow-2xl"
        >
          <div class="inline-block p-4 mb-4 bg-orange-100 rounded-full">
            <Icon name="lucide:trophy" size="32" class="text-orange-600" />
          </div>
          <h2 class="mb-2 text-5xl font-bold text-orange-600">{{ extracurriculars.length }}</h2>
          <p class="text-lg font-semibold text-gray-700">Ekstrakurikuler</p>
        </div>
      </div>

      <!-- Organisasi Section -->
      <section class="mb-20">
        <div class="mb-10 text-center">
          <div
            class="inline-block p-6 px-10 py-6 mb-4 border border-orange-200 shadow-xl bg-gradient-to-r from-orange-500 to-orange-600 backdrop-blur-2xl rounded-2xl"
          >
            <h2 class="text-3xl font-bold text-white">Organisasi Sekolah</h2>
          </div>
          <p class="max-w-2xl mx-auto text-gray-600">
            Kembangkan dan asah kemampuanmu dengan ikut organisasi yang ada di SMK Negeri 2 Singosari
          </p>
        </div>

        <!-- Search Bar -->
        <div class="max-w-md mx-auto mb-10">
          <div class="relative">
            <Icon name="lucide:search" size="20" class="absolute left-4 top-3.5 text-gray-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari Organisasi atau Ekstrakurikuler..."
              class="w-full py-3 pl-12 pr-4 transition border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <!-- Organisasi Grid -->
        <div v-if="pending" class="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="i in 6"
            :key="i"
            class="overflow-hidden bg-white border border-gray-100 shadow-lg rounded-2xl animate-pulse"
          >
            <div class="h-48 bg-gray-200"></div>
            <div class="p-6">
              <div class="h-6 mb-2 bg-gray-200 rounded"></div>
              <div class="w-2/3 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        <div
          v-else-if="filteredOrganizations.length > 0"
          class="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3"
        >
          <NuxtLink
            v-for="org in filteredOrganizations"
            :key="org.id"
            :to="`/organisasi/${org.slug}`"
            class="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-lg rounded-2xl hover:shadow-2xl hover:border-blue-200 group"
          >
            <div class="flex items-center justify-center h-48 p-6 bg-gradient-to-br from-blue-100 to-blue-50">
              <img
                :src="org.logo"
                :alt="`Logo ${org.name}`"
                class="object-contain max-w-full max-h-full transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div class="p-6">
              <h3 class="mb-2 text-xl font-bold text-gray-800 transition-colors group-hover:text-blue-600">
                {{ org.name }}
              </h3>
              <p class="text-sm text-gray-600 line-clamp-2">{{ org.description }}</p>
            </div>
          </NuxtLink>
        </div>

        <div v-else class="p-12 mb-8 text-center bg-white border-2 border-blue-100 shadow-xl rounded-2xl">
          <Icon name="lucide:search-x" size="64" class="mx-auto mb-4 text-gray-300" />
          <h3 class="mb-2 text-xl font-bold text-gray-700">Organisasi Tidak Ditemukan</h3>
          <p class="text-gray-500">Coba kata kunci lain atau hapus filter pencarian.</p>
        </div>
      </section>

      <!-- Ekstrakurikuler Section -->
      <section class="mb-20">
        <div class="mb-10 text-center">
          <div
            class="inline-block p-6 px-10 py-6 mb-4 border border-blue-200 shadow-xl bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl rounded-2xl"
          >
            <h2 class="text-3xl font-bold text-white">Ekstrakurikuler</h2>
          </div>
          <p class="max-w-2xl mx-auto mb-8 text-gray-600">Pilih ekstrakurikuler sesuai minat dan bakatmu</p>
        </div>

        <!-- Category Filter -->
        <div class="flex flex-wrap justify-center gap-3 mb-10">
          <button
            v-for="category in categories"
            :key="category"
            @click="selectedCategory = category"
            :class="[
              'px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border-2',
              selectedCategory === category
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 hover:bg-blue-600 hover:text-white border-gray-200 hover:border-blue-600',
            ]"
          >
            {{ category }}
          </button>
        </div>

        <!-- Ekstrakurikuler Grid -->
        <div v-if="pending" class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="i in 9" :key="i" class="p-6 bg-white border border-gray-100 shadow-lg rounded-2xl animate-pulse">
            <div class="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full"></div>
            <div class="w-3/4 h-6 mx-auto bg-gray-200 rounded"></div>
          </div>
        </div>

        <div
          v-else-if="filteredExtracurriculars.length > 0"
          class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <NuxtLink
            v-for="extra in filteredExtracurriculars"
            :key="extra.id"
            :to="`/ekstrakurikuler/${extra.slug}`"
            class="p-6 text-center transition-all duration-300 bg-white border border-gray-100 shadow-lg rounded-2xl hover:shadow-2xl hover:border-blue-200 group"
          >
            <div class="inline-block p-4 mb-4 transition-colors bg-blue-100 rounded-full group-hover:bg-blue-200">
              <Icon :name="extra.icon || 'lucide:activity'" size="32" class="text-blue-600" />
            </div>
            <h3 class="mb-2 text-xl font-bold text-gray-800 transition-colors group-hover:text-blue-600">
              {{ extra.name }}
            </h3>
            <p v-if="extra.description" class="text-sm text-gray-600 line-clamp-2">{{ extra.description }}</p>
            <p v-if="extra.category" class="mt-2 text-xs font-semibold text-blue-600">{{ extra.category }}</p>
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

      <!-- CTA Section -->
      <section
        class="max-w-3xl p-8 mx-auto text-center bg-white border-2 border-blue-100 shadow-xl rounded-2xl md:p-12"
      >
        <Icon name="lucide:lightbulb" size="48" class="mx-auto mb-4 text-orange-500" />
        <h2 class="mb-4 text-2xl font-bold text-gray-800 md:text-3xl">
          Tidak Menemukan Ekstrakurikuler Yang Kamu Inginkan?
        </h2>
        <p class="mb-6 text-lg text-gray-600">
          Tenang! Kamu bisa membuat komunitas ekstrakurikuler baru di SMK Negeri 2 Singosari
        </p>
        <button
          @click="openDialog"
          class="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white transition-colors bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg"
        >
          Lihat Caranya
          <Icon name="lucide:arrow-right" size="18" />
        </button>
      </section>
    </div>

    <!-- Dialog Modal -->
    <Teleport to="body">
      <Transition name="dialog">
        <div
          v-if="isDialogOpen"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black bg-opacity-50"
          @click.self="closeDialog"
        >
          <div
            class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-blue-100"
          >
            <!-- Dialog Header -->
            <div
              class="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-800 rounded-t-2xl"
            >
              <h2 class="text-2xl font-bold text-white">Cara Membuat Ekstrakurikuler Baru</h2>
              <button @click="closeDialog" class="text-white transition-colors hover:text-gray-200">
                <Icon name="lucide:x" size="24" />
              </button>
            </div>

            <!-- Dialog Content -->
            <div class="p-6 space-y-6">
              <!-- Step 1 -->
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

              <!-- Step 2 -->
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

              <!-- Step 3 -->
              <div class="flex gap-4">
                <div class="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full">
                  <span class="text-lg font-bold text-white">3</span>
                </div>
                <div>
                  <h3 class="mb-2 text-lg font-bold text-gray-800">Butuh Bantuan?</h3>
                  <p class="mb-4 leading-relaxed text-gray-600">
                    Jika masih bingung, silahkan hubungi kontak di bawah ini:
                  </p>

                  <!-- Contact Cards -->
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

            <!-- Dialog Footer -->
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

<style scoped>
.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.3s ease;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}
</style>
