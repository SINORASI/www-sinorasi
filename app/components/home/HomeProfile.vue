<script setup lang="ts">
import { motion } from "motion-v";

const sectionRef = ref<HTMLElement | null>(null);
const sectionInView = ref(false);

const stats = ref([
  { value: 8, label: "Konsentrasi Keahlian", color: "blue", current: 0 },
  { value: 1200, label: "Siswa Aktif", color: "orange", current: 0 },
  { value: 200, label: "Prestasi", color: "green", current: 0 },
  { value: 2007, label: "Tahun Berdiri", color: "purple", current: 0 },
]);

const hoveredIndex = ref<number | null>(null);

const startAnimation = async () => {
  const { animate } = await import("motion-v");

  stats.value.forEach((stat, index) => {
    animate(0, stat.value, {
      duration: 2,
      ease: "easeOut",
      delay: index * 0.2,
      onUpdate: (latest) => (stat.current = Math.floor(latest)),
    });
  });
};

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (!entry) return;
      sectionInView.value = entry.isIntersecting;
      if (entry.isIntersecting && (stats.value[0]?.current ?? 0) === 0) {
        startAnimation();
      }
    },
    { threshold: 0.3 }
  );

  if (sectionRef.value) observer.observe(sectionRef.value);

  onUnmounted(() => observer.disconnect());
});
</script>

<template>
  <motion.section
    ref="sectionRef"
    id="profil-sekolah"
    class="relative py-20 bg-linear-to-b from-white via-blue-50 to-white overflow-hidden"
    :initial="{ opacity: 0, y: 50 }"
    :whileInView="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.8 }"
    :inViewOptions="{ once: true }"
  >
    <!-- Decorative Elements -->
    <div class="absolute top-0 left-1/2 w-72 h-72 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-orange-200 rounded-full opacity-20 blur-3xl"></div>

    <div class="container px-4 mx-auto md:px-10 relative z-10">
      <div class="flex flex-col gap-12 lg:flex-row lg:items-center">
        <!-- Image -->
        <motion.div
          class="w-full lg:w-1/2"
          :initial="{ opacity: 0, x: -50 }"
          :whileInView="{ opacity: 1, x: 0 }"
          :transition="{ duration: 0.8, delay: 0.2 }"
          :inViewOptions="{ once: true }"
        >
          <div class="relative group">
            <div
              class="relative overflow-hidden rounded-2xl border-4 border-white shadow-2xl transition-transform duration-500 group-hover:scale-105"
            >
              <NuxtImg
                src="/images/aula-drone.webp"
                alt="Drone view of SMK Negeri 2 Singosari"
                class="object-cover w-full h-auto"
                loading="lazy"
                width="800"
                height="600"
                format="webp"
                quality="85"
              />
              <div
                class="absolute inset-0 bg-linear-to-t from-blue-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              ></div>
            </div>
          </div>
        </motion.div>

        <!-- Content -->
        <motion.div
          class="flex flex-col w-full gap-6 lg:w-1/2"
          :initial="{ opacity: 0, x: 50 }"
          :whileInView="{ opacity: 1, x: 0 }"
          :transition="{ duration: 0.8, delay: 0.4 }"
          :inViewOptions="{ once: true }"
        >
          <div class="inline-block">
            <span
              class="px-6 py-3 flex justify-center items-center text-lg font-bold tracking-widest uppercase rounded-full md:text-xl bg-blue-700 text-white"
            >
              Tentang SMK Negeri 2 Singosari
            </span>
          </div>

          <div class="p-8 bg-white border-2 border-blue-100 shadow-xl rounded-2xl">
            <div class="space-y-6">
              <p class="leading-relaxed text-gray-600">
                SMK Negeri 2 Singosari adalah lembaga pendidikan kejuruan yang berkomitmen untuk menghasilkan lulusan
                yang kompeten, inovatif, dan siap menghadapi tantangan dunia kerja modern.
              </p>

              <!-- Stats Grid -->
              <div class="grid grid-cols-2 gap-4">
                <motion.div
                  v-for="(stat, index) in stats"
                  :key="index"
                  class="p-4 text-center rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group"
                  :class="`bg-${stat.color}-50 hover:bg-${stat.color}-100`"
                  :initial="{ opacity: 0, scale: 0.8 }"
                  :whileInView="{ opacity: 1, scale: 1 }"
                  :transition="{ duration: 0.6, delay: index * 0.1 }"
                  :inViewOptions="{ once: true }"
                  @mouseenter="hoveredIndex = index"
                  @mouseleave="hoveredIndex = null"
                >
                  <motion.div
                    class="text-2xl font-bold transition-colors"
                    :class="`text-${stat.color}-600 group-hover:text-${stat.color}-700`"
                    :animate="{ scale: hoveredIndex === index ? 1.1 : 1 }"
                    :transition="{ duration: 0.3 }"
                  >
                    {{ stat.current }}{{ index === 1 || index === 2 ? "+" : "" }}
                  </motion.div>
                  <div class="text-sm text-gray-600 group-hover:text-gray-700">
                    {{ stat.label }}
                  </div>
                  <motion.div
                    class="w-full h-1 rounded-full mt-2 overflow-hidden"
                    :class="`bg-${stat.color}-200`"
                    :initial="{ scaleX: 0 }"
                    :animate="{ scaleX: hoveredIndex === index ? 1 : 0 }"
                    :transition="{ duration: 0.5 }"
                    style="transform-origin: left"
                  >
                    <div class="w-full h-full rounded-full" :class="`bg-${stat.color}-500`"></div>
                  </motion.div>
                </motion.div>
              </div>

              <p class="leading-relaxed text-gray-600">
                Dengan fasilitas modern dan tenaga pengajar profesional, kami terus berinovasi dalam metode pembelajaran
                untuk mencapai visi "Inovasi Raih Prestasi".
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </motion.section>
</template>
