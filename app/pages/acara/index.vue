<script setup lang="ts">
import { motion } from "motion-v";

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
  <div class="min-h-screen py-24 bg-linear-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
    <div class="absolute inset-0 opacity-5">
      <div class="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
      <div class="absolute top-40 right-20 w-40 h-40 bg-purple-400 rounded-full blur-3xl"></div>
      <div class="absolute bottom-20 left-1/3 w-36 h-36 bg-indigo-400 rounded-full blur-3xl"></div>
    </div>

    <div class="container px-4 py-8 mx-auto sm:px-6 relative z-10">
      <div class="flex flex-col items-center mb-12">
        <motion.div
          :initial="{ opacity: 0, y: -50 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }"
          class="p-6 px-10 py-6 mb-4 border border-blue-200 shadow-2xl bg-linear-to-r from-blue-600 via-blue-700 to-purple-600 backdrop-blur-2xl rounded-2xl"
        >
          <h1 class="text-3xl font-bold text-white sm:text-4xl">Acara & Kegiatan</h1>
        </motion.div>
        <motion.p
          :initial="{ opacity: 0, y: 30 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.8, delay: 0.2, ease: 'easeOut' }"
          class="max-w-2xl text-lg text-center text-gray-700"
        >
          Daftar acara dan kegiatan yang akan datang di SMK Negeri 2 Singosari
        </motion.p>
      </div>

      <motion.div
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.4, ease: 'easeOut' }"
        class="p-6 mb-8 bg-white/80 backdrop-blur-sm border-2 border-blue-100/50 shadow-2xl rounded-2xl"
      >
        <div class="flex flex-wrap justify-center gap-3">
          <motion.button
            v-for="(option, index) in filterOptions"
            :key="option.value"
            @click="selectedFilter = option.value as any"
            :class="[
              'flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300',
              selectedFilter === option.value
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'bg-gray-50 text-gray-700 hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-300',
            ]"
            :initial="{ opacity: 0, x: -20 }"
            :animate="{ opacity: 1, x: 0 }"
            :transition="{ duration: 0.5, delay: 0.6 + index * 0.1, ease: 'easeOut' }"
          >
            <Icon :name="option.icon" size="20" />
            {{ option.label }}
          </motion.button>
        </div>

        <motion.div
          v-if="selectedFilter !== 'all'"
          :initial="{ opacity: 0, scale: 0.95 }"
          :animate="{ opacity: 1, scale: 1 }"
          :transition="{ duration: 0.4, ease: 'easeOut' }"
          class="pt-4 mt-4 text-center border-t border-gray-200"
        >
          <span class="text-sm text-gray-600">
            Filter aktif:
            <span class="font-bold text-blue-600">{{
              filterOptions.find((o) => o.value === selectedFilter)?.label
            }}</span>
            <button @click="selectedFilter = 'all'" class="ml-2 text-sm text-blue-600 underline hover:text-blue-800">
              Hapus filter
            </button>
          </span>
        </motion.div>
      </motion.div>

      <motion.div
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5, delay: 0.8, ease: 'easeOut' }"
        class="mb-6 text-center"
      >
        <p class="text-gray-600">
          Menampilkan <span class="font-bold text-blue-600">{{ events.length }}</span> dari
          <span class="font-bold">{{ totalEvents }}</span> acara
        </p>
      </motion.div>

      <motion.div
        v-if="pending"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ duration: 0.3 }"
        class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        <motion.div
          v-for="i in 6"
          :key="i"
          class="overflow-hidden bg-white border-2 border-blue-100 shadow-lg rounded-2xl"
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.4, delay: i * 0.1, ease: 'easeOut' }"
        >
          <div class="h-48 bg-gray-200 animate-pulse"></div>
          <div class="p-6">
            <div class="w-1/3 h-4 mb-4 bg-gray-200 rounded animate-pulse"></div>
            <div class="w-full h-6 mb-3 bg-gray-200 rounded animate-pulse"></div>
            <div class="w-2/3 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        v-else-if="error"
        :initial="{ opacity: 0, scale: 0.9 }"
        :animate="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 0.5, ease: 'easeOut' }"
        class="p-12 text-center bg-white/80 backdrop-blur-sm border-2 border-red-200/50 shadow-2xl rounded-2xl"
      >
        <motion.div
          :initial="{ scale: 0 }"
          :animate="{ scale: 1 }"
          :transition="{ duration: 0.4, delay: 0.2, type: 'spring', stiffness: 200 }"
        >
          <Icon name="lucide:alert-circle" size="64" class="mx-auto mb-4 text-red-400" />
        </motion.div>
        <motion.h3
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.4, delay: 0.3 }"
          class="mb-2 text-xl font-bold text-red-800"
        >
          Terjadi Kesalahan
        </motion.h3>
        <motion.p
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.4, delay: 0.4 }"
          class="mb-6 text-red-600"
        >
          Gagal memuat data acara. Silakan coba lagi.
        </motion.p>
        <motion.button
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.4, delay: 0.5 }"
          :whileHover="{ scale: 1.05 }"
          :whileTap="{ scale: 0.95 }"
          @click="refresh()"
          class="px-6 py-3 font-semibold text-white transition bg-red-600 rounded-lg shadow-md hover:bg-red-700"
        >
          Muat Ulang
        </motion.button>
      </motion.div>

      <motion.div
        v-else-if="events.length === 0"
        :initial="{ opacity: 0, scale: 0.9 }"
        :animate="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 0.5, ease: 'easeOut' }"
        class="p-12 text-center bg-white/80 backdrop-blur-sm border-2 border-blue-100/50 shadow-2xl rounded-2xl"
      >
        <motion.div
          :initial="{ scale: 0, rotate: -180 }"
          :animate="{ scale: 1, rotate: 0 }"
          :transition="{ duration: 0.6, delay: 0.2, type: 'spring', stiffness: 150 }"
        >
          <Icon name="lucide:calendar-x" size="64" class="mx-auto mb-4 text-gray-300" />
        </motion.div>
        <motion.h3
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.4, delay: 0.4 }"
          class="mb-2 text-xl font-bold text-gray-700"
        >
          Tidak Ada Acara
        </motion.h3>
        <motion.p
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.4, delay: 0.5 }"
          class="mb-6 text-gray-500"
        >
          {{
            selectedFilter === "upcoming"
              ? "Tidak ada acara yang akan datang saat ini."
              : selectedFilter === "past"
              ? "Belum ada acara yang telah selesai."
              : "Belum ada acara yang terdaftar."
          }}
        </motion.p>
        <motion.button
          v-if="selectedFilter !== 'all'"
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.4, delay: 0.6 }"
          :whileHover="{ scale: 1.05 }"
          :whileTap="{ scale: 0.95 }"
          @click="selectedFilter = 'all'"
          class="px-6 py-3 font-semibold text-white transition bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
        >
          Lihat Semua Acara
        </motion.button>
      </motion.div>

      <motion.div
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ duration: 0.3, delay: 0.9 }"
        class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        <motion.div
          v-for="(event, index) in events"
          :key="event.id"
          :initial="{ opacity: 0, y: 50, scale: 0.9 }"
          :animate="{ opacity: 1, y: 0, scale: 1 }"
          :transition="{
            duration: 0.6,
            delay: 1.0 + index * 0.1,
            ease: 'easeOut',
            type: 'spring',
            stiffness: 100,
          }"
          :whileHover="{ y: -8, scale: 1.02 }"
          :whileTap="{ scale: 0.98 }"
        >
          <NuxtLink
            :to="`/acara/${event.slug}`"
            class="flex flex-col overflow-hidden bg-white/80 backdrop-blur-sm border-2 border-blue-100/50 shadow-xl group rounded-2xl hover:shadow-2xl hover:border-blue-300/70"
          >
            <motion.div
              class="h-48 overflow-hidden bg-linear-to-br from-gray-200 to-gray-300"
              :whileHover="{ scale: 1.05 }"
              :transition="{ duration: 0.3 }"
            >
              <SmartImage :src="event.imageUrl" :alt="event.title" class="object-cover w-full h-full" />
            </motion.div>

            <div class="flex flex-col grow p-6">
              <motion.div
                :initial="{ opacity: 0, x: -20 }"
                :animate="{ opacity: 1, x: 0 }"
                :transition="{ duration: 0.4, delay: 1.2 + index * 0.1 }"
                class="flex items-center gap-2 mb-3 font-semibold text-blue-600"
              >
                <Icon name="lucide:calendar" size="16" />
                <span class="text-sm">{{ event.date }}</span>
              </motion.div>

              <motion.h3
                :initial="{ opacity: 0, y: 20 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.4, delay: 1.3 + index * 0.1 }"
                class="grow mb-3 text-xl font-bold text-gray-800 line-clamp-2 group-hover:text-blue-600"
              >
                {{ event.title }}
              </motion.h3>

              <motion.p
                :initial="{ opacity: 0, y: 20 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.4, delay: 1.4 + index * 0.1 }"
                class="mb-4 text-sm text-gray-600 line-clamp-2"
              >
                {{ event.details }}
              </motion.p>

              <motion.div
                :initial="{ opacity: 0, y: 20 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.4, delay: 1.5 + index * 0.1 }"
                class="flex items-center pt-4 font-semibold text-blue-600 border-t border-gray-200 group-hover:gap-2"
              >
                <span>Lihat Detail</span>
                <motion.div :whileHover="{ x: 4 }" :transition="{ duration: 0.2 }">
                  <Icon name="lucide:arrow-right" size="18" />
                </motion.div>
              </motion.div>
            </div>
          </NuxtLink>
        </motion.div>
      </motion.div>
    </div>
  </div>
</template>
