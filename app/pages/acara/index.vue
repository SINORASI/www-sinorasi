<script setup lang="ts">
useHead({
  title: "Acara - SMKN 2 Singosari",
  meta: [
    {
      name: "description",
      content: "Daftar acara dan kegiatan yang akan datang di SMK Negeri 2 Singosari",
    },
  ],
});

const selectedFilter = ref<"all" | "upcoming" | "past">("all");

const {
  data: eventsResponse,
  pending,
  error,
  refresh,
} = await useFetch("/api/events", {
  query: computed(() => ({
    upcoming: selectedFilter.value === "upcoming" ? "true" : undefined,
    past: selectedFilter.value === "past" ? "true" : undefined,
  })),
  watch: [selectedFilter],
});

const events = computed(() => eventsResponse.value?.data || []);
const totalEvents = computed(() => eventsResponse.value?.total || 0);

const filterOptions = [
  { value: "all", label: "Semua Acara", icon: "lucide:calendar" },
  { value: "upcoming", label: "Akan Datang", icon: "lucide:calendar-clock" },
  { value: "past", label: "Selesai", icon: "lucide:calendar-check" },
];
</script>

<template>
  <div class="min-h-screen py-24 bg-linear-to-b from-white via-blue-50 to-white">
    <div class="container px-4 py-8 mx-auto sm:px-6">
      <div class="flex flex-col items-center mb-12">
        <div
          class="p-6 px-10 py-6 mb-4 border border-blue-200 shadow-xl bg-linear-to-r from-blue-600 to-blue-800 backdrop-blur-2xl rounded-2xl"
        >
          <h1 class="text-3xl font-bold text-white sm:text-4xl">Acara & Kegiatan</h1>
        </div>
        <p class="max-w-2xl text-lg text-center text-gray-600">
          Daftar acara dan kegiatan yang akan datang di SMK Negeri 2 Singosari
        </p>
      </div>

      <div class="p-6 mb-8 bg-white border-2 border-blue-100 shadow-xl rounded-2xl">
        <div class="flex flex-wrap justify-center gap-3">
          <button
            v-for="option in filterOptions"
            :key="option.value"
            @click="selectedFilter = option.value as any"
            :class="[
              'flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300',
              selectedFilter === option.value
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'bg-gray-50 text-gray-700 hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-300',
            ]"
          >
            <Icon :name="option.icon" size="20" />
            {{ option.label }}
          </button>
        </div>

        <div v-if="selectedFilter !== 'all'" class="pt-4 mt-4 text-center border-t border-gray-200">
          <span class="text-sm text-gray-600">
            Filter aktif:
            <span class="font-bold text-blue-600">{{
              filterOptions.find((o) => o.value === selectedFilter)?.label
            }}</span>
            <button @click="selectedFilter = 'all'" class="ml-2 text-sm text-blue-600 underline hover:text-blue-800">
              Hapus filter
            </button>
          </span>
        </div>
      </div>

      <div class="mb-6 text-center">
        <p class="text-gray-600">
          Menampilkan <span class="font-bold text-blue-600">{{ events.length }}</span> dari
          <span class="font-bold">{{ totalEvents }}</span> acara
        </p>
      </div>

      <div v-if="pending" class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="i in 6"
          :key="i"
          class="overflow-hidden bg-white border-2 border-blue-100 shadow-lg rounded-2xl animate-pulse"
        >
          <div class="h-48 bg-gray-200"></div>
          <div class="p-6">
            <div class="w-1/3 h-4 mb-4 bg-gray-200 rounded"></div>
            <div class="w-full h-6 mb-3 bg-gray-200 rounded"></div>
            <div class="w-2/3 h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      <div v-else-if="error" class="p-12 text-center bg-white border-2 border-red-200 shadow-xl rounded-2xl">
        <Icon name="lucide:alert-circle" size="64" class="mx-auto mb-4 text-red-400" />
        <h3 class="mb-2 text-xl font-bold text-red-800">Terjadi Kesalahan</h3>
        <p class="mb-6 text-red-600">Gagal memuat data acara. Silakan coba lagi.</p>
        <button
          @click="refresh()"
          class="px-6 py-3 font-semibold text-white transition bg-red-600 rounded-lg shadow-md hover:bg-red-700"
        >
          Muat Ulang
        </button>
      </div>

      <div
        v-else-if="events.length === 0"
        class="p-12 text-center bg-white border-2 border-blue-100 shadow-xl rounded-2xl"
      >
        <Icon name="lucide:calendar-x" size="64" class="mx-auto mb-4 text-gray-300" />
        <h3 class="mb-2 text-xl font-bold text-gray-700">Tidak Ada Acara</h3>
        <p class="mb-6 text-gray-500">
          {{
            selectedFilter === "upcoming"
              ? "Tidak ada acara yang akan datang saat ini."
              : selectedFilter === "past"
              ? "Belum ada acara yang telah selesai."
              : "Belum ada acara yang terdaftar."
          }}
        </p>
        <button
          v-if="selectedFilter !== 'all'"
          @click="selectedFilter = 'all'"
          class="px-6 py-3 font-semibold text-white transition bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
        >
          Lihat Semua Acara
        </button>
      </div>

      <div v-else class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="event in events"
          :key="event.id"
          :to="`/acara/${event.slug}`"
          class="flex flex-col overflow-hidden transition-all duration-300 bg-white border-2 border-blue-100 shadow-lg group rounded-2xl hover:shadow-2xl hover:border-blue-300 hover:-translate-y-2"
        >
          <div class="h-48 overflow-hidden bg-linear-to-br from-gray-200 to-gray-300">
            <NuxtImg
              :src="event.imageUrl"
              :alt="event.title"
              class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          <div class="flex flex-col grow p-6">
            <div class="flex items-center gap-2 mb-3 font-semibold text-blue-600">
              <Icon name="lucide:calendar" size="16" />
              <span class="text-sm">{{ event.date }}</span>
            </div>

            <h3
              class="grow mb-3 text-xl font-bold text-gray-800 transition-colors line-clamp-2 group-hover:text-blue-600"
            >
              {{ event.title }}
            </h3>

            <p class="mb-4 text-sm text-gray-600 line-clamp-2">
              {{ event.details }}
            </p>

            <div
              class="flex items-center pt-4 font-semibold text-blue-600 transition-all border-t border-gray-200 group-hover:gap-2"
            >
              <span>Lihat Detail</span>
              <Icon name="lucide:arrow-right" size="18" class="transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
