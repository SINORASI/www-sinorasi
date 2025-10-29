<script lang="ts" setup>
import { motion } from "motion-v";

useHead({
  title: "Organisasi - SMKN 2 Singosari",
  meta: [
    {
      name: "description",
      content: "Daftar organisasi siswa di SMK Negeri 2 Singosari. Bergabunglah dan kembangkan kemampuanmu!",
    },
  ],
});

const { data: organizationsResponse, pending, error } = await useFetch("/api/organizations");

const organizations = computed(() => organizationsResponse.value?.data || []);
</script>

<template>
  <div class="min-h-screen py-24 bg-linear-to-b from-white via-blue-50 to-white">
    <div class="container px-4 py-8 mx-auto sm:px-6">
      <motion.div
        class="flex flex-col items-center mb-12"
        :inViewOptions="{ once: true }"
        initial="hidden"
        whileInView="visible"
        :variants="{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.6, staggerChildren: 0.3 } },
        }"
      >
        <motion.div
          class="p-6 px-10 py-6 mb-4 border border-blue-200 shadow-xl bg-linear-to-r from-blue-600 to-blue-800 backdrop-blur-2xl rounded-2xl"
          :variants="{
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
          }"
        >
          <h1 class="text-3xl font-bold text-white sm:text-4xl">Organisasi Sekolah</h1>
        </motion.div>
        <motion.p
          class="max-w-2xl text-lg text-center text-gray-600"
          :variants="{
            hidden: { opacity: 0, x: 100 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
          }"
        >
          Organisasi siswa di SMK Negeri 2 Singosari yang mendukung pengembangan karakter dan keterampilan siswa
        </motion.p>
      </motion.div>

      <motion.div
        v-if="pending"
        class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        :inViewOptions="{ once: true }"
        initial="hidden"
        whileInView="visible"
        :variants="{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } },
        }"
      >
        <motion.div
          v-for="i in 6"
          :key="i"
          class="p-6 bg-white border-2 border-blue-100 shadow-lg rounded-2xl animate-pulse"
          :variants="{
            hidden: { opacity: 0, y: 30, scale: 0.9 },
            visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
          }"
        >
          <motion.div
            class="flex items-center justify-center mb-6"
            :variants="{
              hidden: { opacity: 0, rotate: -10 },
              visible: { opacity: 1, rotate: 0, transition: { duration: 0.4, delay: 0.1 } },
            }"
          >
            <div class="w-24 h-24 bg-gray-200 rounded-full"></div>
          </motion.div>
          <motion.div
            class="w-3/4 h-6 mx-auto mb-4 bg-gray-200 rounded"
            :variants="{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.4, delay: 0.2 } },
            }"
          ></motion.div>
          <motion.div
            class="space-y-2"
            :variants="{
              hidden: { opacity: 0, x: 20 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.4, delay: 0.3 } },
            }"
          >
            <div class="h-4 bg-gray-200 rounded"></div>
            <div class="w-5/6 h-4 bg-gray-200 rounded"></div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        v-else-if="error"
        class="p-12 text-center bg-white border-2 border-red-200 shadow-xl rounded-2xl"
        :inViewOptions="{ once: true }"
        initial="hidden"
        whileInView="visible"
        :variants="{
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
        }"
      >
        <motion.div
          :variants="{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
          }"
        >
          <Icon name="lucide:alert-circle" size="64" class="mx-auto mb-4 text-red-400" />
        </motion.div>
        <motion.h3
          class="mb-2 text-xl font-bold text-red-800"
          :variants="{
            hidden: { opacity: 0, x: -30 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.4 } },
          }"
        >
          Terjadi Kesalahan
        </motion.h3>
        <motion.p
          class="mb-6 text-red-600"
          :variants="{
            hidden: { opacity: 0, x: 30 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.6 } },
          }"
        >
          Gagal memuat data organisasi. Silakan coba lagi.
        </motion.p>
      </motion.div>

      <motion.div
        v-else-if="organizations.length > 0"
        class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        :inViewOptions="{ once: true }"
        initial="hidden"
        whileInView="visible"
        :variants="{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } },
        }"
      >
        <NuxtLink
          v-for="org in organizations"
          :key="org.id"
          :to="`/organisasi/${org.slug}`"
          class="overflow-hidden transition-all duration-300 bg-white border-2 border-blue-100 shadow-lg group rounded-2xl hover:shadow-2xl hover:border-blue-300 hover:-translate-y-2"
        >
          <motion.div
            :variants="{
              hidden: { opacity: 0, y: 30, scale: 0.9 },
              visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
            }"
          >
            <motion.div
              class="flex items-center justify-center p-8 border-b-2 border-blue-100 bg-linear-to-br from-blue-50 to-white"
              :variants="{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.1 } },
              }"
            >
              <NuxtImg
                :src="org.logo"
                :alt="`Logo ${org.name}`"
                :class="[
                  'object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-lg bg-transparent',
                  org.slug === 'pmr' ? 'w-80 h-40' : 'w-40 h-40',
                ]"
              />
            </motion.div>

            <motion.div
              class="p-6"
              :variants="{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.4, delay: 0.2, staggerChildren: 0.1 } },
              }"
            >
              <motion.h2
                class="mb-3 text-2xl font-bold text-center text-gray-800 transition-colors group-hover:text-blue-600"
                :variants="{
                  hidden: { opacity: 0, y: -10 },
                  visible: { opacity: 1, y: 0 },
                }"
              >
                {{ org.name }}
              </motion.h2>
              <motion.p
                class="mb-4 text-sm leading-relaxed text-center text-gray-600 line-clamp-3"
                :variants="{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }"
              >
                {{ org.description }}
              </motion.p>

              <motion.div
                v-if="org.statistics"
                class="grid grid-cols-2 gap-3 mb-4"
                :variants="{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, delay: 0.3 } },
                }"
              >
                <motion.div
                  v-if="org.statistics.members"
                  class="p-3 text-center border border-blue-100 rounded-lg bg-blue-50"
                  :variants="{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }"
                >
                  <div class="text-xl font-bold text-blue-600">{{ org.statistics.members }}+</div>
                  <div class="text-xs text-gray-600">Anggota</div>
                </motion.div>
                <motion.div
                  v-if="org.statistics.years"
                  class="p-3 text-center border border-orange-100 rounded-lg bg-orange-50"
                  :variants="{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0 },
                  }"
                >
                  <div class="text-xl font-bold text-orange-600">{{ org.statistics.years }}</div>
                  <div class="text-xs text-gray-600">Tahun</div>
                </motion.div>
              </motion.div>

              <motion.div
                class="flex items-center justify-center gap-2 font-semibold text-blue-600 transition-all group-hover:gap-3"
                :variants="{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.4 } },
                }"
              >
                <span>Lihat Detail</span>
                <Icon name="lucide:arrow-right" size="18" class="transition-transform group-hover:translate-x-1" />
              </motion.div>
            </motion.div>
          </motion.div>
        </NuxtLink>
      </motion.div>

      <motion.div
        v-else
        class="p-12 text-center bg-white border-2 border-blue-100 shadow-xl rounded-2xl"
        :inViewOptions="{ once: true }"
        initial="hidden"
        whileInView="visible"
        :variants="{
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
        }"
      >
        <motion.div
          :variants="{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
          }"
        >
          <Icon name="lucide:users" size="64" class="mx-auto mb-4 text-gray-300" />
        </motion.div>
        <motion.h3
          class="mb-2 text-xl font-bold text-gray-700"
          :variants="{
            hidden: { opacity: 0, x: -30 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.4 } },
          }"
        >
          Belum Ada Organisasi
        </motion.h3>
        <motion.p
          class="text-gray-500"
          :variants="{
            hidden: { opacity: 0, x: 30 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.6 } },
          }"
        >
          Data organisasi akan ditampilkan di sini.
        </motion.p>
      </motion.div>
    </div>
  </div>
</template>
