<script setup lang="ts">
import { motion } from "motion-v";

useHead({
  title: "Struktur Organisasi - Informasi - SMKN 2 Singosari",
  meta: [
    {
      name: "description",
      content: "Struktur organisasi sekolah SMK Negeri 2 Singosari. Kepala sekolah dan jajarannya.",
    },
  ],
});
</script>

<template>
  <div class="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute -top-40 -right-40 w-80 h-80 bg-linear-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"
      ></div>
      <div
        class="absolute top-1/2 -left-40 w-96 h-96 bg-linear-to-tr from-indigo-400/15 to-cyan-500/15 rounded-full blur-3xl animate-pulse delay-1000"
      ></div>
      <div
        class="absolute -bottom-40 right-1/4 w-72 h-72 bg-linear-to-tl from-purple-400/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"
      ></div>
    </div>

    <section class="relative h-[500px] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-linear-to-br from-slate-900 via-blue-900 to-indigo-900"></div>
      <div class="absolute inset-0 bg-linear-to-t from-transparent via-blue-900/20 to-transparent"></div>

      <div class="absolute inset-0">
        <motion.div
          class="absolute top-20 left-20 w-2 h-2 bg-white/30 rounded-full"
          :initial="{ opacity: 0 }"
          :whileInView="{ opacity: 1 }"
          :animate="{ y: [0, 20, 0] }"
          :transition="{ duration: 3, repeat: Infinity, ease: 'easeInOut' }"
          :inViewOptions="{ once: false, margin: '-100px' }"
        ></motion.div>
        <motion.div
          class="absolute top-32 right-32 w-1 h-1 bg-white/40 rounded-full"
          :initial="{ opacity: 0 }"
          :whileInView="{ opacity: 1 }"
          :animate="{ y: [0, -15, 0] }"
          :transition="{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }"
          :inViewOptions="{ once: false, margin: '-100px' }"
        ></motion.div>
        <motion.div
          class="absolute bottom-24 left-1/3 w-1.5 h-1.5 bg-white/25 rounded-full"
          :initial="{ opacity: 0 }"
          :whileInView="{ opacity: 1 }"
          :animate="{ y: [0, 25, 0] }"
          :transition="{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }"
          :inViewOptions="{ once: false, margin: '-100px' }"
        ></motion.div>
        <motion.div
          class="absolute top-1/3 right-20 w-1 h-1 bg-white/35 rounded-full"
          :initial="{ opacity: 0 }"
          :whileInView="{ opacity: 1 }"
          :animate="{ y: [0, -20, 0] }"
          :transition="{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }"
          :inViewOptions="{ once: false, margin: '-100px' }"
        ></motion.div>
      </div>

      <motion.div
        class="relative z-10 px-4 text-center text-white"
        :initial="{ opacity: 0, y: 30 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8 }"
        :inViewOptions="{ once: true }"
      >
        <div>
          <motion.h1
            class="mb-6 text-4xl font-bold md:text-6xl lg:text-7xl bg-linear-to-r from-white via-blue-100 to-white bg-clip-text text-transparent"
            :initial="{ opacity: 0, y: 20 }"
            :whileInView="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.8, delay: 0.2 }"
            :inViewOptions="{ once: true }"
          >
            Struktur Organisasi
          </motion.h1>
          <motion.p
            class="text-lg md:text-xl lg:text-2xl text-blue-100 font-light"
            :initial="{ opacity: 0, y: 20 }"
            :whileInView="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.8, delay: 0.4 }"
            :inViewOptions="{ once: true }"
          >
            SMK Negeri 2 Singosari
          </motion.p>
          <motion.div
            class="mt-8 flex justify-center"
            :initial="{ opacity: 0, scaleX: 0 }"
            :whileInView="{ opacity: 1, scaleX: 1 }"
            :transition="{ duration: 0.6, delay: 0.6 }"
            :inViewOptions="{ once: true }"
          >
            <div class="w-24 h-1 bg-linear-to-r from-transparent via-white to-transparent rounded-full"></div>
          </motion.div>
        </div>
      </motion.div>
    </section>

    <section class="relative z-10 py-16 px-4">
      <div class="container max-w-7xl mx-auto">
        <motion.div
          class="text-center mb-16"
          :initial="{ opacity: 0, y: 30 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.8 }"
          :inViewOptions="{ once: true }"
        >
          <motion.div
            class="inline-block p-8 bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-1"
            :whileHover="{ y: -8 }"
            :transition="{ duration: 0.3 }"
          >
            <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Hierarki Kepemimpinan</h2>
            <p class="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Struktur organisasi SMK Negeri 2 Singosari yang menunjukkan hierarki kepemimpinan dari Kepala Sekolah
              hingga staf pengajar dan tenaga kependidikan.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          class="bg-white/60 backdrop-blur-sm border border-white/50 rounded-3xl shadow-2xl p-8 md:p-12"
          :initial="{ opacity: 0, scale: 0.95 }"
          :whileInView="{ opacity: 1, scale: 1 }"
          :transition="{ duration: 0.8, delay: 0.2 }"
          :inViewOptions="{ once: true }"
        >
          <OrgChart />
        </motion.div>

        <motion.div
          class="mt-16 grid md:grid-cols-3 gap-8"
          :initial="{ opacity: 0 }"
          :whileInView="{ opacity: 1 }"
          :transition="{ duration: 0.6, delay: 0.3 }"
          :inViewOptions="{ once: true }"
        >
          <motion.div
            class="bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
            :initial="{ opacity: 0, y: 30 }"
            :whileInView="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.6, delay: 0.3 }"
            :inViewOptions="{ once: true }"
            :whileHover="{ y: -5, scale: 1.02 }"
            :transition-hover="{ duration: 0.3 }"
          >
            <motion.div
              class="w-12 h-12 bg-linear-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4"
              :whileHover="{ scale: 1.1, rotate: 5 }"
            >
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                ></path>
              </svg>
            </motion.div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Visi & Misi</h3>
            <p class="text-gray-600 text-sm">
              Komitmen untuk mencapai visi sekolah melalui kerja sama tim yang solid dan terstruktur.
            </p>
          </motion.div>

          <motion.div
            class="bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
            :initial="{ opacity: 0, y: 30 }"
            :whileInView="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.6, delay: 0.4 }"
            :inViewOptions="{ once: true }"
            :whileHover="{ y: -5, scale: 1.02 }"
            :transition-hover="{ duration: 0.3 }"
          >
            <motion.div
              class="w-12 h-12 bg-linear-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4"
              :whileHover="{ scale: 1.1, rotate: 5 }"
            >
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </motion.div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Kolaborasi</h3>
            <p class="text-gray-600 text-sm">
              Sistem kerja sama yang efektif antara semua unsur dalam struktur organisasi sekolah.
            </p>
          </motion.div>

          <motion.div
            class="bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
            :initial="{ opacity: 0, y: 30 }"
            :whileInView="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.6, delay: 0.5 }"
            :inViewOptions="{ once: true }"
            :whileHover="{ y: -5, scale: 1.02 }"
            :transition-hover="{ duration: 0.3 }"
          >
            <motion.div
              class="w-12 h-12 bg-linear-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4"
              :whileHover="{ scale: 1.1, rotate: 5 }"
            >
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </motion.div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Efisiensi</h3>
            <p class="text-gray-600 text-sm">
              Struktur yang memungkinkan pengambilan keputusan yang cepat dan efektif untuk kemajuan sekolah.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  </div>
</template>
