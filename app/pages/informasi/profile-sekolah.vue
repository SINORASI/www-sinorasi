<script setup lang="ts">
import { ref } from "vue";
import { motion, AnimatePresence } from "motion-v";

const isVisionMissionExpanded = ref(false);
const expandedCard = ref<number | null>(null);

const toggleVisionMission = () => {
  isVisionMissionExpanded.value = !isVisionMissionExpanded.value;
};

const expandCard = (index: number) => {
  expandedCard.value = index;
};

const closeCard = () => {
  expandedCard.value = null;
};

const nextCard = () => {
  if (expandedCard.value !== null) {
    expandedCard.value = (expandedCard.value + 1) % 3;
  }
};

const prevCard = () => {
  if (expandedCard.value !== null) {
    expandedCard.value = (expandedCard.value - 1 + 3) % 3;
  }
};

useHead({
  title: "Profil Sekolah - Informasi - SMKN 2 Singosari",
  meta: [
    {
      name: "description",
      content: "Profil lengkap SMK Negeri 2 Singosari. Sejarah, visi misi, dan sambutan kepala sekolah.",
    },
  ],
});
</script>

<template>
  <div class="min-h-screen bg-linear-to-b from-white via-blue-50 to-white relative overflow-hidden">
    <div class="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-10 blur-3xl animate-pulse"></div>
    <div
      class="absolute bottom-40 right-20 w-40 h-40 bg-orange-200 rounded-full opacity-10 blur-3xl animate-pulse delay-1000"
    ></div>
    <div
      class="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-200 rounded-full opacity-10 blur-2xl animate-pulse delay-500"
    ></div>

    <motion.section
      class="py-32 relative z-10"
      :initial="{ opacity: 0, y: 50 }"
      :whileInView="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.8 }"
      :inViewOptions="{ once: true }"
    >
      <div class="container w-max-[1200px] px-4 mx-auto sm:px-6">
        <motion.div
          class="mb-12 text-center"
          :initial="{ opacity: 0, scale: 0.8 }"
          :whileInView="{ opacity: 1, scale: 1 }"
          :transition="{ duration: 0.6, delay: 0.2 }"
          :inViewOptions="{ once: true }"
        >
          <div
            class="inline-block px-10 py-6 mb-4 border border-blue-200 shadow-xl bg-linear-to-r from-blue-600 to-blue-800 backdrop-blur-2xl rounded-2xl hover:scale-105 transition-transform duration-300"
          >
            <h2 class="text-3xl font-bold text-white md:text-4xl">Sambutan Kepala Sekolah</h2>
          </div>
          <p class="text-lg text-gray-600">SMK Negeri 2 Singosari</p>
        </motion.div>

        <div class="mx-auto">
          <div class="flex flex-col gap-8">
            <motion.div
              class="flex flex-col items-center justify-center lg:flex-row lg:items-center lg:gap-8"
              :initial="{ opacity: 0, y: 30 }"
              :whileInView="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.8, delay: 0.4 }"
              :inViewOptions="{ once: true }"
            >
              <motion.div
                class="p-6 bg-white border-2 border-blue-100 shadow-xl rounded-2xl w-fit hover:shadow-2xl transition-shadow duration-300"
                :whileHover="{ scale: 1.05 }"
                :transition="{ duration: 0.3 }"
              >
                <img src="/images/kepsek.webp" alt="Kepala Sekolah" class="w-64 rounded-xl md:w-80" />
              </motion.div>
              <motion.div
                class="max-w-xl mx-5 p-6 mt-6 border-2 border-blue-100 shadow-xl bg-blue-50 rounded-2xl lg:mt-0 hover:shadow-2xl transition-shadow duration-300"
                :initial="{ opacity: 0, x: 30 }"
                :whileInView="{ opacity: 1, x: 0 }"
                :transition="{ duration: 0.8, delay: 0.6 }"
                :inViewOptions="{ once: true }"
              >
                <blockquote class="italic text-center text-2xl text-gray-700 lg:text-left">
                  "Pendidikan adalah kunci untuk membuka pintu masa depan yang lebih baik. Mari bersama-sama membangun
                  generasi yang unggul dan berkarakter."
                </blockquote>
                <cite class="block mt-4 text-sm font-semibold text-center text-blue-600 lg:text-left"
                  >- Sumijah S.Pd M.Si</cite
                >
              </motion.div>
            </motion.div>

            <motion.div
              class="flex items-center justify-center"
              :initial="{ opacity: 0, y: 30 }"
              :whileInView="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.8, delay: 0.8 }"
              :inViewOptions="{ once: true }"
            >
              <div
                class="w-full max-w-5xl p-8 space-y-6 leading-relaxed text-gray-700 bg-white border-2 border-blue-100 shadow-xl rounded-2xl md:p-12 hover:shadow-2xl transition-shadow duration-300"
              >
                <p class="text-xl font-bold text-blue-800">Assalamualaikum Warahmatullahi Wabarakatuh</p>

                <p class="text-justify">
                  Puji syukur kepada Alloh SWT, Tuhan Yang Maha Esa yang telah memberikan rahmat dan anugerahNya
                  sehingga website SMK Negeri 2 Singosari ini dapat terbit. Salah satu tujuan dari website ini adalah
                  untuk menjawab akan setiap kebutuhan informasi dengan memanfaatkan sarana teknologi informasi yang
                  ada.
                </p>

                <p class="text-justify">
                  Kami sadar sepenuhnya dalam rangka memajukan pendidikan di era berkembangnya Teknologi Informasi yang
                  begitu pesat, sangat diperlukan berbagai sarana prasarana yang kondusif, kebutuhan berbagai informasi
                  siswa, guru, orangtua maupun masyarakat, sehingga kami berusaha mewujudkan hal tersebut semaksimal
                  mungkin.
                </p>

                <p class="text-xl font-bold text-blue-800">Wassalamualaikum Warahmatullahi Wabarakatuh</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>

    <motion.section
      class="py-20 relative"
      :initial="{ opacity: 0, y: 50 }"
      :whileInView="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.8 }"
      :inViewOptions="{ once: true }"
    >
      <div class="absolute top-10 right-10 w-20 h-20 bg-orange-200 rounded-full opacity-10 blur-2xl"></div>
      <div class="absolute bottom-20 left-20 w-16 h-16 bg-blue-200 rounded-full opacity-10 blur-2xl"></div>

      <div class="container max-w-[1200px] px-4 mx-auto sm:px-6">
        <div class="max-w-5xl mx-auto">
          <motion.button
            v-if="!isVisionMissionExpanded"
            @click="toggleVisionMission"
            class="w-full group"
            :whileHover="{ scale: 1.02 }"
            :transition="{ duration: 0.3 }"
          >
            <div
              class="p-8 transition-all duration-300 bg-white border-2 border-orange-100 shadow-xl rounded-2xl md:p-10 hover:border-orange-300 hover:shadow-2xl"
            >
              <div class="flex items-center justify-between">
                <div>
                  <h2 class="mb-2 text-3xl font-bold text-gray-800">Visi Dan Misi</h2>
                  <p class="text-gray-600">SMK Negeri 02 Singosari</p>
                </div>
                <motion.div
                  class="flex items-center justify-center w-12 h-12 transition-transform duration-300 bg-orange-100 rounded-full group-hover:rotate-90 hover:bg-orange-600 hover:text-white"
                  :animate="{ rotate: isVisionMissionExpanded ? 180 : 0 }"
                  :transition="{ duration: 0.3 }"
                >
                  <Icon name="lucide:plus" size="24" />
                </motion.div>
              </div>
            </div>
          </motion.button>

          <AnimatePresence>
            <motion.div
              v-if="isVisionMissionExpanded"
              class="overflow-hidden border-2 border-orange-100 shadow-xl rounded-2xl backdrop-blur-xl bg-white/95"
              :initial="{ height: 0, opacity: 0 }"
              :animate="{ height: 'auto', opacity: 1 }"
              :exit="{ height: 0, opacity: 0 }"
              :transition="{ duration: 0.5, ease: 'easeInOut' }"
            >
              <motion.button
                @click="toggleVisionMission"
                class="w-full group"
                :whileHover="{ scale: 1.01 }"
                :transition="{ duration: 0.2 }"
              >
                <div class="p-8 md:p-10">
                  <div class="flex items-center justify-between">
                    <div>
                      <h2 class="mb-2 text-3xl font-bold text-gray-800">Visi Dan Misi</h2>
                      <p class="text-gray-600">SMK Negeri 02 Singosari</p>
                    </div>
                    <motion.div
                      class="flex items-center justify-center w-12 h-12 transition-transform duration-300 bg-orange-100 rounded-full group-hover:rotate-180 hover:bg-orange-600 hover:text-white"
                      :animate="{ rotate: isVisionMissionExpanded ? 180 : 0 }"
                      :transition="{ duration: 0.3 }"
                    >
                      <Icon name="lucide:minus" size="24" />
                    </motion.div>
                  </div>
                </div>
              </motion.button>

              <motion.div
                class="px-8 pb-8 md:px-10 md:pb-10"
                :initial="{ opacity: 0, y: 20 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.4, delay: 0.2 }"
              >
                <div class="grid gap-6 md:grid-cols-2">
                  <motion.div
                    class="p-8 bg-white border-2 border-blue-100 shadow-xl rounded-2xl hover:shadow-2xl transition-shadow duration-300"
                    :whileHover="{ scale: 1.03, y: -5 }"
                    :transition="{ duration: 0.3 }"
                  >
                    <motion.div
                      class="inline-block p-4 mb-4 bg-blue-100 rounded-full"
                      :whileHover="{ rotate: 360 }"
                      :transition="{ duration: 0.6 }"
                    >
                      <Icon name="lucide:eye" size="32" class="text-blue-600" />
                    </motion.div>
                    <h3 class="mb-4 text-2xl font-bold text-gray-800">Visi</h3>
                    <p class="leading-relaxed text-gray-700">
                      Menjadi SMK unggulan yang menghasilkan lulusan berkarakter, kompeten, dan berdaya saing global.
                    </p>
                  </motion.div>

                  <motion.div
                    class="p-8 bg-white border-2 border-orange-100 shadow-xl rounded-2xl hover:shadow-2xl transition-shadow duration-300"
                    :whileHover="{ scale: 1.03, y: -5 }"
                    :transition="{ duration: 0.3 }"
                  >
                    <motion.div
                      class="inline-block p-4 mb-4 bg-orange-100 rounded-full"
                      :whileHover="{ rotate: 360 }"
                      :transition="{ duration: 0.6 }"
                    >
                      <Icon name="lucide:target" size="32" class="text-orange-600" />
                    </motion.div>
                    <h3 class="mb-4 text-2xl font-bold text-gray-800">Misi</h3>
                    <ul class="space-y-3 text-gray-700">
                      <motion.li
                        v-for="(mission, index) in [
                          'Menyelenggarakan pendidikan berkualitas',
                          'Mengembangkan kompetensi siswa',
                          'Membentuk karakter unggul',
                        ]"
                        :key="index"
                        class="flex items-start"
                        :initial="{ opacity: 0, x: -20 }"
                        :whileInView="{ opacity: 1, x: 0 }"
                        :transition="{ duration: 0.4, delay: index * 0.1 }"
                        :inViewOptions="{ once: true }"
                      >
                        <motion.div :whileHover="{ scale: 1.2 }" :transition="{ duration: 0.2 }">
                          <Icon name="lucide:check-circle" size="20" class="text-orange-600 mr-2 mt-0.5 shrink-0" />
                        </motion.div>
                        <span>{{ mission }}</span>
                      </motion.li>
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.section>

    <motion.section
      class="relative py-20"
      :initial="{ opacity: 0, y: 50 }"
      :whileInView="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.8 }"
      :inViewOptions="{ once: true }"
    >
      <div class="absolute top-20 left-1/4 w-24 h-24 bg-orange-200 rounded-full opacity-10 blur-3xl"></div>
      <div class="absolute bottom-10 right-1/3 w-32 h-32 bg-blue-200 rounded-full opacity-10 blur-3xl"></div>

      <div class="container px-4 mx-auto">
        <motion.div
          class="text-center mb-12"
          :initial="{ opacity: 0, scale: 0.8 }"
          :whileInView="{ opacity: 1, scale: 1 }"
          :transition="{ duration: 0.6, delay: 0.2 }"
          :inViewOptions="{ once: true }"
        >
          <div
            class="inline-block px-10 py-6 mb-4 border border-orange-200 shadow-xl bg-linear-to-r from-orange-500 to-orange-600 backdrop-blur-2xl rounded-2xl hover:scale-105 transition-transform duration-300"
          >
            <h2 class="text-3xl font-bold text-white md:text-4xl">Video Profil Sekolah</h2>
          </div>
          <p class="max-w-3xl mx-auto text-lg text-black">
            Mengenal lebih dekat SMK Negeri 2 Singosari - sekolah yang membangun generasi terampil dan berkarakter untuk
            masa depan yang lebih cerah.
          </p>
        </motion.div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-0 w-full mx-auto max-w-6xl">
          <motion.div
            class="rounded-tl-lg rounded-bl-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
            @click="expandCard(0)"
            :whileHover="{ scale: 1.05 }"
            :transition="{ duration: 0.3 }"
          >
            <div class="relative w-full h-96 overflow-hidden group">
              <img
                src="/images/thumbnail/profile-thumbnail.webp"
                alt="Video Profil Thumbnail"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div
                class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
              <div
                class="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 via-black/70 to-transparent p-4 backdrop-blur-sm"
              >
                <motion.div :whileHover="{ scale: 1.05 }" :transition="{ duration: 0.2 }">
                  <Icon name="lucide:play-circle" size="48" class="text-white mb-2 mx-auto opacity-80" />
                </motion.div>
                <h3 class="text-xl font-bold text-white font-sans">Video Profil</h3>
                <p class="text-sm text-gray-200 mt-2 font-sans">
                  Temukan lebih dalam tentang visi, misi, dan program unggulan SMK Negeri 2 Singosari melalui video
                  profil kami.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            class="shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
            @click="expandCard(1)"
            :whileHover="{ scale: 1.05 }"
            :transition="{ duration: 0.3 }"
          >
            <div class="relative w-full h-96 overflow-hidden group">
              <img
                src="/images/thumbnail/mars-thumbnail.webp"
                alt="Mars SMK Thumbnail"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div
                class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
              <div
                class="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 via-black/70 to-transparent p-4 backdrop-blur-sm"
              >
                <motion.div :whileHover="{ scale: 1.05 }" :transition="{ duration: 0.2 }">
                  <Icon name="lucide:music" size="48" class="text-white mb-2 mx-auto opacity-80" />
                </motion.div>
                <h3 class="text-xl font-bold text-white font-sans">Mars SMK</h3>
                <p class="text-sm text-gray-200 mt-2 font-sans">
                  Dengarkan mars sekolah yang penuh semangat dan identitas kami sebagai komunitas SMK Negeri 2
                  Singosari.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            class="rounded-tr-lg rounded-br-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
            @click="expandCard(2)"
            :whileHover="{ scale: 1.05 }"
            :transition="{ duration: 0.3 }"
          >
            <div class="relative w-full h-96 overflow-hidden group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d53004.90227511139!2d112.61905412163591!3d-7.903971658482226!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd62a2690b713bb%3A0x61a43c4cb3de3ff0!2sSMK%20Negeri%202%20Singosari!5e0!3m2!1sid!2sid!4v1760870911351!5m2!1sid!2sid"
                style="border: 0"
                allowfullscreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                class="absolute inset-0 w-full h-full"
              ></iframe>
              <div
                class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
              <div
                class="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 via-black/70 to-transparent p-4 backdrop-blur-sm"
              >
                <motion.div :whileHover="{ scale: 1.05 }" :transition="{ duration: 0.2 }">
                  <Icon name="lucide:map-pin" size="48" class="text-white mb-2 mx-auto opacity-80" />
                </motion.div>
                <h3 class="text-xl font-bold text-white font-sans">Maps Lokasi</h3>
                <p class="text-sm text-gray-200 mt-2 font-sans">
                  Jelajahi lokasi sekolah kami melalui peta interaktif dan temukan cara mudah untuk mengunjungi SMK
                  Negeri 2 Singosari.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
          <motion.div
            v-if="expandedCard !== null"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            @click="closeCard"
            :initial="{ opacity: 0 }"
            :animate="{ opacity: 1 }"
            :exit="{ opacity: 0 }"
            :transition="{ duration: 0.3 }"
          >
            <motion.div
              class="relative w-3/5 h-4/6 mx-auto"
              @click.stop
              :initial="{ scale: 0.9, opacity: 0 }"
              :animate="{ scale: 1, opacity: 1 }"
              :exit="{ scale: 0.9, opacity: 0 }"
              :transition="{ duration: 0.3, ease: 'easeOut' }"
            >
              <motion.button
                @click="closeCard"
                class="absolute top-4 right-4 z-10 w-12 h-12 bg-gray-600 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-gray-500 transition-colors"
                :whileHover="{ scale: 1.1 }"
                :whileTap="{ scale: 0.9 }"
              >
                <Icon name="lucide:x" size="24" />
              </motion.button>

              <motion.button
                @click="prevCard"
                class="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gray-600 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-gray-500 transition-colors"
                :whileHover="{ scale: 1.1 }"
                :whileTap="{ scale: 0.9 }"
              >
                <Icon name="lucide:chevron-left" size="24" />
              </motion.button>
              <motion.button
                @click="nextCard"
                class="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gray-600 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-gray-500 transition-colors"
                :whileHover="{ scale: 1.1 }"
                :whileTap="{ scale: 0.9 }"
              >
                <Icon name="lucide:chevron-right" size="24" />
              </motion.button>

              <motion.div
                class="bg-white rounded-2xl shadow-2xl overflow-hidden"
                :initial="{ y: 20 }"
                :animate="{ y: 0 }"
                :transition="{ duration: 0.4, delay: 0.1 }"
              >
                <div v-if="expandedCard === 0" class="relative">
                  <div class="aspect-video">
                    <iframe
                      src="https://www.youtube.com/embed/Kks6HnhPzVQ"
                      class="absolute inset-0 w-full h-full"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                      title="Video Profil SMK Negeri 2 Singosari"
                    ></iframe>
                  </div>
                  <div class="p-8">
                    <h3 class="text-2xl font-bold text-gray-800 mb-4">Video Profil</h3>
                    <p class="text-gray-700 leading-relaxed">
                      Temukan lebih dalam tentang visi, misi, dan program unggulan SMK Negeri 2 Singosari melalui video
                      profil kami. Video ini menampilkan kegiatan sehari-hari, fasilitas, dan prestasi yang telah diraih
                      oleh sekolah kami.
                    </p>
                  </div>
                </div>

                <div v-if="expandedCard === 1" class="relative">
                  <div class="aspect-video">
                    <video class="absolute inset-0 w-full h-full object-cover" controls autoplay>
                      <source
                        src="https://smkn2-singosari.sch.id/wp-content/uploads/2023/10/marssmkn2.mp4"
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div class="p-8">
                    <h3 class="text-2xl font-bold text-gray-800 mb-4">Mars SMK</h3>
                    <p class="text-gray-700 leading-relaxed">
                      Dengarkan mars sekolah yang penuh semangat dan identitas kami sebagai komunitas SMK Negeri 2
                      Singosari. Mars ini menjadi simbol kebersamaan dan semangat juang siswa-siswi dalam menjalani
                      pendidikan.
                    </p>
                  </div>
                </div>

                <div v-if="expandedCard === 2" class="relative">
                  <div class="aspect-video">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d53004.90227511139!2d112.61905412163591!3d-7.903971658482226!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd62a2690b713bb%3A0x61a43c4cb3de3ff0!2sSMK%20Negeri%202%20Singosari!5e0!3m2!1sid!2sid!4v1760870911351!5m2!1sid!2sid"
                      style="border: 0"
                      allowfullscreen
                      loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade"
                      class="absolute inset-0 w-full h-full"
                    ></iframe>
                  </div>
                  <div class="p-8">
                    <h3 class="text-2xl font-bold text-gray-800 mb-4">Maps Lokasi</h3>
                    <p class="text-gray-700 leading-relaxed">
                      Jelajahi lokasi sekolah kami melalui peta interaktif dan temukan cara mudah untuk mengunjungi SMK
                      Negeri 2 Singosari. Sekolah kami terletak di daerah strategis dengan akses transportasi yang mudah
                      dijangkau.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>

    <motion.section
      class="py-20 relative"
      :initial="{ opacity: 0, y: 50 }"
      :whileInView="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.8 }"
      :inViewOptions="{ once: true }"
    >
      <div class="absolute top-10 left-1/4 w-20 h-20 bg-blue-200 rounded-full opacity-10 blur-2xl"></div>
      <div class="absolute bottom-20 right-1/3 w-24 h-24 bg-orange-200 rounded-full opacity-10 blur-2xl"></div>

      <div class="container px-4 mx-auto sm:px-6">
        <motion.div
          class="mb-12 text-center"
          :initial="{ opacity: 0, scale: 0.8 }"
          :whileInView="{ opacity: 1, scale: 1 }"
          :transition="{ duration: 0.6, delay: 0.2 }"
          :inViewOptions="{ once: true }"
        >
          <div
            class="inline-block px-10 py-6 mb-4 border border-blue-200 shadow-xl bg-linear-to-r from-blue-600 to-blue-800 backdrop-blur-2xl rounded-2xl hover:scale-105 transition-transform duration-300"
          >
            <h2 class="text-3xl font-bold text-white md:text-4xl">Sejarah Sekolah</h2>
          </div>
        </motion.div>

        <div class="max-w-5xl mx-auto">
          <motion.div
            class="overflow-hidden bg-white border-2 border-blue-100 shadow-xl rounded-2xl hover:shadow-2xl transition-shadow duration-300"
            :whileHover="{ scale: 1.02 }"
            :transition="{ duration: 0.3 }"
          >
            <div class="p-8 md:p-10">
              <motion.h3
                class="mb-4 text-2xl font-bold text-gray-800"
                :initial="{ opacity: 0, x: -20 }"
                :whileInView="{ opacity: 1, x: 0 }"
                :transition="{ duration: 0.6, delay: 0.4 }"
                :inViewOptions="{ once: true }"
              >
                Sejarah SMK Negeri 2 Singosari
              </motion.h3>
              <motion.p
                class="leading-relaxed text-justify text-gray-700"
                :initial="{ opacity: 0, y: 20 }"
                :whileInView="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.6, delay: 0.6 }"
                :inViewOptions="{ once: true }"
              >
                Didirikan berdasarkan surat Perjanjian Kerjasama antara Bupati Malang dengan Direktur Pendidikan Sekolah
                Menengah Kejuruan No.0570ax/C5.4/Kep/KU/2007 Tanggal 25 Mei 2007. Sebagai Pengembangan dari Program
                Keahlian Teknik Audio Video, Teknik Elektronika Industri, dan Teknik Informatika (Rekayasa Perangkat
                Lunak) yang berasal dari SMK Negeri 1 Singosari yang telah meraih prestasi sebagai Juara Lomba
                Kompetensi Siswa baik tingkat Propinsi Jawa Timur maupun Tingkat Nasional.
              </motion.p>

              <motion.div
                class="mt-6 flex items-center justify-center"
                :initial="{ opacity: 0, scale: 0.8 }"
                :whileInView="{ opacity: 1, scale: 1 }"
                :transition="{ duration: 0.6, delay: 0.8 }"
                :inViewOptions="{ once: true }"
              >
                <div class="flex items-center space-x-4 bg-blue-50 px-6 py-3 rounded-full">
                  <Icon name="lucide:calendar" size="20" class="text-blue-600" />
                  <span class="text-sm font-semibold text-blue-800">Didirikan: 25 Mei 2007</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  </div>
</template>
