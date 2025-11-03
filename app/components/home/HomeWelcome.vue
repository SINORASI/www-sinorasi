<script setup lang="ts">
import { motion } from "motion-v";
</script>

<template>
  <motion.section
    id="sambutan"
    class="relative overflow-hidden"
    :initial="{ opacity: 0, y: 50 }"
    :whileInView="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.8 }"
    :inViewOptions="{ once: true }"
  >
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        class="absolute w-80 h-80 rounded-full bg-blue-200 blur-3xl opacity-20"
        :initial="{ x: -50, y: -20 }"
        :animate="{ x: 80, y: 80 }"
        :transition="{ duration: 20, repeat: Infinity, repeatType: 'reverse' }"
        :whileInView="{ opacity: 1 }"
      ></motion.div>
      <motion.div
        class="absolute w-72 h-72 rounded-full bg-purple-200 blur-3xl opacity-20 right-0 top-1/2"
        :initial="{ x: 50, y: -20 }"
        :animate="{ x: -80, y: 80 }"
        :transition="{ duration: 20, repeat: Infinity, repeatType: 'reverse' }"
        :whileInView="{ opacity: 1 }"
      ></motion.div>
    </div>
    <div class="container px-4 mx-auto md:px-10 relative z-10">
      <div class="flex flex-col items-center justify-center gap-12 lg:flex-row">
        <!-- Content -->
        <motion.div
          class="flex flex-col w-full max-w-3xl gap-6 lg:w-3/5"
          :initial="{ opacity: 0, x: -50 }"
          :whileInView="{ opacity: 1, x: 0 }"
          :transition="{ duration: 0.8, delay: 0.2 }"
          :inViewOptions="{ once: true }"
        >
          <div class="inline-block">
            <span
              class="px-6 py-3 flex justify-center items-center text-lg font-bold tracking-widest uppercase rounded-full md:text-xl bg-blue-700 text-white"
            >
              Sambutan Kepala Sekolah
            </span>
          </div>

          <div class="p-8 bg-white border-2 border-blue-100 shadow-xl rounded-2xl">
            <h2 class="mb-4 text-2xl font-bold text-gray-800">Assalamu'alaikum Wr. Wb.</h2>
            <div class="space-y-4 leading-relaxed text-gray-600">
              <p>
                Puji syukur kepada Allah SWT atas terbitnya website SMK Negeri 2 Singosari untuk menjawab kebutuhan
                informasi melalui teknologi informasi. Dalam memajukan pendidikan di era teknologi yang pesat,
                diperlukan sarana prasarana kondusif dan informasi bagi siswa, guru, orangtua maupun masyarakat.
              </p>
              <p>
                Besar harapan kami sarana ini memberi manfaat bagi semua pihak di lingkup pendidikan khususnya SMK
                Negeri 2 Singosari. Kami mengharapkan masukan dari berbagai pihak agar terus belajar dan meng-update
                sehingga tampilan, isi dan mutu website berkembang lebih baik. Terima kasih atas kerjasamanya, maju
                terus SMK Negeri 2 Singosari.
              </p>
              <p class="italic">Wassalamu'alaikum wr.wb.</p>
            </div>
          </div>
        </motion.div>

        <!-- Image -->
        <motion.div
          class="w-full max-w-xl lg:w-90"
          :initial="{ opacity: 0, x: 50 }"
          :whileInView="{ opacity: 1, x: 0 }"
          :transition="{ duration: 0.8, delay: 0.4 }"
          :inViewOptions="{ once: true }"
        >
          <div class="relative max-w-sm group">
            <div
              class="relative overflow-hidden rounded-2xl border-4 border-white shadow-2xl transition-transform duration-500 group-hover:scale-105"
            >
              <NuxtImg
                src="/images/kepsek.webp"
                alt="Foto Kepala Sekolah"
                class="w-full h-auto object-cover"
                loading="lazy"
                format="webp"
                quality="85"
              />
              <div class="absolute inset-0 bg-linear-to-t from-blue-900/70 to-transparent"></div>

              <div class="absolute bottom-0 left-0 right-0 p-4">
                <p class="text-xl font-bold text-center text-white">Sumijah S.Pd M.Si</p>
                <p class="text-sm text-center text-white/90">Kepala Sekolah SMKN 2 Singosari</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </motion.section>
</template>
