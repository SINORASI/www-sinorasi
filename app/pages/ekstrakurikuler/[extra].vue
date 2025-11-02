<script lang="ts" setup>
import { computed } from "vue";
import type { Extracurricular } from "~/models/Extracurricular";

const route = useRoute();
const extraSlug = computed(() => route.params.extra as string);

const { data: extraResponse, pending, error } = await useFetch(`/api/extracurriculars/${extraSlug.value}`);
const extra = computed(() => extraResponse.value as Extracurricular | null);

const { data: relatedResponse } = await useFetch("/api/extracurriculars", {
  query: { limit: 6 },
});
const relatedExtras = computed(() => {
  const all = relatedResponse.value?.data || [];
  return all.filter((e: any) => e.slug !== extraSlug.value).slice(0, 3);
});

useHead({
  title: computed(() => (extra.value ? `${extra.value.name} - Ekstrakurikuler SMKN 2 Singosari` : "Ekstrakurikuler")),
  meta: [
    {
      name: "description",
      content: computed(() => extra.value?.description || "Ekstrakurikuler SMK Negeri 2 Singosari"),
    },
  ],
});
</script>

<template>
  <div class="min-h-screen py-30 bg-linear-to-br from-blue-50 via-white to-orange-50">
    <div v-if="pending" class="container px-4 py-8 mx-auto">
      <div class="p-8 mb-8 bg-white shadow-xl rounded-2xl animate-pulse">
        <div class="w-1/3 h-8 mb-4 bg-gray-200 rounded"></div>
        <div class="w-2/3 h-4 bg-gray-200 rounded"></div>
      </div>
      <div class="grid gap-8 mb-8 md:grid-cols-2">
        <div class="p-6 bg-white shadow-xl rounded-2xl animate-pulse">
          <div class="h-64 bg-gray-200 rounded"></div>
        </div>
        <div class="space-y-4">
          <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>

    <div v-else-if="error || !extra" class="container px-4 py-8 mx-auto">
      <div class="p-12 text-center bg-white border-2 border-red-100 shadow-xl rounded-2xl">
        <Icon name="lucide:alert-circle" size="64" class="mx-auto mb-4 text-red-400" />
        <h1 class="mb-2 text-2xl font-bold text-gray-800">Ekstrakurikuler Tidak Ditemukan</h1>
        <p class="mb-6 text-gray-600">Ekstrakurikuler yang Anda cari tidak tersedia atau telah dihapus.</p>
        <NuxtLink
          to="/ekstrakurikuler"
          class="inline-block px-6 py-3 font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          <Icon name="lucide:arrow-left" size="20" class="inline mr-2" />
          Kembali ke Daftar
        </NuxtLink>
      </div>
    </div>

    <div v-else class="container px-4 py-8 mx-auto max-w-[1200px]">
      <nav class="flex items-center mb-6 space-x-2 text-sm text-gray-600">
        <NuxtLink to="/" class="transition hover:text-blue-600">Home</NuxtLink>
        <Icon name="lucide:chevron-right" size="16" />
        <NuxtLink to="/ekstrakurikuler" class="transition hover:text-blue-600">Ekstrakurikuler</NuxtLink>
        <Icon name="lucide:chevron-right" size="16" />
        <span class="font-semibold text-gray-800">{{ extra.name }}</span>
      </nav>

      <div class="p-8 mb-8 text-white shadow-2xl bg-linear-to-r from-blue-600 to-blue-800 rounded-2xl md:p-12">
        <div class="flex items-center mb-4">
          <div class="p-3 mr-4 rounded-full bg-white/20 backdrop-blur-sm">
            <Icon :name="extra.icon || 'lucide:activity'" size="32" />
          </div>
          <div>
            <h1 class="text-4xl font-bold">{{ extra.name }}</h1>
            <p v-if="extra.category" class="mt-1 text-lg text-blue-100">{{ extra.category }}</p>
          </div>
        </div>
        <p class="text-lg text-blue-50">{{ extra.description }}</p>
      </div>



      <div
        v-if="extra.fullDescription"
        class="max-w-6xl mx-auto mb-8 overflow-hidden bg-white border-2 border-blue-100 shadow-xl rounded-2xl"
      >
        <div class="grid gap-0 lg:grid-cols-2">
          <div class="h-80 lg:h-auto">
            <SmartImage
              :src="extra.image || '/images/placeholder.jpg'"
              :alt="extra.name"
              class="object-cover w-full h-full"
            />
          </div>
          <div class="flex flex-col justify-center p-8 md:p-10">
            <div
              class="inline-block px-6 py-3 mb-6 border border-blue-200 shadow-xl bg-linear-to-r from-blue-600 to-blue-800 backdrop-blur-2xl rounded-xl w-fit"
            >
              <h2 class="text-2xl font-bold text-white md:text-3xl">Tentang</h2>
            </div>
            <div
              class="text-lg leading-relaxed prose prose-lg text-gray-700 max-w-none"
              v-html="extra.fullDescription"
            ></div>
          </div>
        </div>
      </div>

      <div class="grid max-w-6xl gap-8 mx-auto mb-8 md:grid-cols-2">
        <div class="p-6 bg-white border-2 border-blue-100 shadow-xl rounded-2xl">
          <h2 class="flex items-center mb-4 text-2xl font-bold text-gray-800">
            <Icon name="lucide:info" size="24" class="mr-2 text-blue-600" />
            Informasi
          </h2>
          <div class="space-y-4">
            <div v-if="extra.coach" class="flex items-start">
              <Icon name="lucide:user" size="20" class="text-blue-600 mr-3 mt-0.5" />
              <div>
                <p class="font-semibold text-gray-700">Pembina</p>
                <p class="text-gray-600">{{ extra.coach }}</p>
              </div>
            </div>
            <div v-if="extra.schedule" class="flex items-start">
              <Icon name="lucide:calendar" size="20" class="text-blue-600 mr-3 mt-0.5" />
              <div>
                <p class="font-semibold text-gray-700">Jadwal</p>
                <p class="text-gray-600">{{ extra.schedule }}</p>
              </div>
            </div>
            <div v-if="extra.location" class="flex items-start">
              <Icon name="lucide:map-pin" size="20" class="text-blue-600 mr-3 mt-0.5" />
              <div>
                <p class="font-semibold text-gray-700">Lokasi</p>
                <p class="text-gray-600">{{ extra.location }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="p-6 bg-white border-2 border-blue-100 shadow-xl rounded-2xl">
          <h2 class="flex items-center mb-4 text-2xl font-bold text-gray-800">
            <Icon name="lucide:clipboard-check" size="24" class="mr-2 text-blue-600" />
            Persyaratan
          </h2>
          <ul class="space-y-3">
            <li class="flex items-start text-gray-700">
              <Icon name="lucide:check-circle" size="20" class="text-blue-600 mr-3 mt-0.5 shrink-0" />
              <span>Siswa kelas 10-12</span>
            </li>
            <li v-for="(req, idx) in extra.requirements" :key="idx" class="flex items-start text-gray-700">
              <Icon name="lucide:check-circle" size="20" class="text-blue-600 mr-3 mt-0.5 shrink-0" />
              <span>{{ req }}</span>
            </li>
          </ul>
        </div>
      </div>





      <div v-if="relatedExtras.length > 0" class="p-8 bg-white border-2 border-blue-100 shadow-xl rounded-2xl">
        <h2 class="flex items-center mb-6 text-2xl font-bold text-gray-800">
          <Icon name="lucide:sparkles" size="24" class="mr-2 text-blue-600" />
          Ekstrakurikuler Lainnya
        </h2>
        <div class="grid gap-6 md:grid-cols-3">
          <NuxtLink
            v-for="related in relatedExtras"
            :key="related.id"
            :to="`/ekstrakurikuler/${related.slug}`"
            class="p-6 text-center transition-all duration-300 border-2 border-blue-100 shadow-lg bg-linear-to-br from-blue-50 to-white rounded-2xl hover:shadow-2xl hover:border-blue-300 group"
          >
            <div class="inline-block p-4 mb-4 transition-colors bg-blue-100 rounded-full group-hover:bg-blue-200">
              <Icon :name="related.icon || 'lucide:activity'" size="32" class="text-blue-600" />
            </div>
            <h3 class="mb-2 text-xl font-bold text-gray-800 transition-colors group-hover:text-blue-600">
              {{ related.name }}
            </h3>
            <p v-if="related.category" class="text-sm font-semibold text-blue-600">{{ related.category }}</p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
