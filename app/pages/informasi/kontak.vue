<script setup lang="ts">
import { ref } from "vue";
import { motion, AnimatePresence } from "motion-v";

const slides = ref([
  { id: 1, src: "/images/infrastruktur/bkkdepan.jpg", alt: "Gedung BKK SMKN 2 Singosari" },
  { id: 2, src: "/images/infrastruktur/depankaproav.jpg", alt: "Gedung Kapro AV SMKN 2 Singosari" },
  { id: 3, src: "/images/infrastruktur/gedunggedungdroneview.jpg", alt: "Pemandangan SMKN 2 Singosari dari atas" },
  { id: 4, src: "/images/infrastruktur/lapangan.jpg", alt: "Lapangan SMKN 2 Singosari" },
  { id: 5, src: "/images/infrastruktur/lapanganvoli.jpg", alt: "Lapangan Voli SMKN 2 Singosari" },
  { id: 6, src: "/images/infrastruktur/lobbydepan.jpg", alt: "Lobby depan SMKN 2 Singosari" },
  { id: 7, src: "/images/infrastruktur/masjiddepan.jpg", alt: "Masjid SMKN 2 Singosari" },
]);

const currentIndex = ref(0);

const goToSlide = (index: number) => {
  currentIndex.value = index;
};

useHead({
  title: "Kontak - Informasi - SMKN 2 Singosari",
  meta: [
    {
      name: "description",
      content: "Hubungi kami di SMK Negeri 2 Singosari. Informasi kontak dan lokasi sekolah.",
    },
  ],
});
</script>

<template>
  <div class="min-h-screen py-24 bg-linear-to-b from-white via-blue-50 to-white">
    <div class="container px-4 mx-auto sm:px-6">

      <motion.div
        class="mb-12 text-center"
        :initial="{ opacity: 0, y: 50 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8, ease: 'easeOut' }"
        :inViewOptions="{ once: true, margin: '-100px' }"
      >
        <motion.div
          class="inline-block px-10 py-6 mb-4 border border-blue-200 shadow-xl bg-linear-to-r from-blue-600 to-blue-800 backdrop-blur-2xl rounded-2xl"
          :initial="{ scale: 0.8, opacity: 0 }"
          :whileInView="{ scale: 1, opacity: 1 }"
          :transition="{ duration: 0.6, delay: 0.2, ease: 'easeOut' }"
          :whileHover="{ scale: 1.05 }"
          :inViewOptions="{ once: true, margin: '-50px' }"
        >
          <h1 class="text-3xl font-bold text-white md:text-4xl">Hubungi Kami</h1>
        </motion.div>
        <motion.p
          class="max-w-2xl mx-auto text-lg text-gray-600"
          :initial="{ opacity: 0 }"
          :whileInView="{ opacity: 1 }"
          :transition="{ duration: 0.6, delay: 0.4 }"
          :inViewOptions="{ once: true, margin: '-50px' }"
        >
          Informasi kontak dan lokasi SMK Negeri 2 Singosari
        </motion.p>
      </motion.div>

      
      <div class="grid max-w-5xl grid-cols-1 gap-6 mx-auto mb-16 md:grid-cols-3">
        <motion.div
          class="p-8 text-center transition-shadow bg-white border-2 border-blue-100 shadow-xl rounded-2xl hover:shadow-2xl"
          :initial="{ opacity: 0, y: 30 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, delay: 0.6 }"
          :whileHover="{ y: -5, scale: 1.02 }"
          :inViewOptions="{ once: true, margin: '-50px' }"
        >
          <motion.div
            class="inline-block p-4 mb-4 bg-blue-100 rounded-full"
            :initial="{ scale: 0 }"
            :whileInView="{ scale: 1 }"
            :transition="{ duration: 0.5, delay: 0.8, type: 'spring', stiffness: 200 }"
            :inViewOptions="{ once: true, margin: '-30px' }"
          >
            <Icon name="lucide:map-pin" size="32" class="text-blue-600" />
          </motion.div>
          <h3 class="mb-3 text-xl font-bold text-gray-800">Alamat</h3>
          <p class="leading-relaxed text-gray-600">
            Jl. Perusahaan Raya No.20, Jajar, Tanjungtirto<br />
            Kec. Singosari, Kabupaten Malang, Jawa Timur 65153
          </p>
        </motion.div>

        <motion.div
          class="p-8 text-center transition-shadow bg-white border-2 border-orange-100 shadow-xl rounded-2xl hover:shadow-2xl"
          :initial="{ opacity: 0, y: 30 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, delay: 0.8 }"
          :whileHover="{ y: -5, scale: 1.02 }"
          :inViewOptions="{ once: true, margin: '-50px' }"
        >
          <motion.div
            class="inline-block p-4 mb-4 bg-orange-100 rounded-full"
            :initial="{ scale: 0 }"
            :whileInView="{ scale: 1 }"
            :transition="{ duration: 0.5, delay: 1.0, type: 'spring', stiffness: 200 }"
            :inViewOptions="{ once: true, margin: '-30px' }"
          >
            <Icon name="lucide:phone" size="32" class="text-orange-600" />
          </motion.div>
          <h3 class="mb-3 text-xl font-bold text-gray-800">Telepon</h3>
          <p class="leading-relaxed text-gray-600">(0341) 4345127</p>
        </motion.div>

        <motion.div
          class="p-8 text-center transition-shadow bg-white border-2 border-blue-100 shadow-xl rounded-2xl hover:shadow-2xl"
          :initial="{ opacity: 0, y: 30 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, delay: 1.0 }"
          :whileHover="{ y: -5, scale: 1.02 }"
          :inViewOptions="{ once: true, margin: '-50px' }"
        >
          <motion.div
            class="inline-block p-4 mb-4 bg-blue-100 rounded-full"
            :initial="{ scale: 0 }"
            :whileInView="{ scale: 1 }"
            :transition="{ duration: 0.5, delay: 1.2, type: 'spring', stiffness: 200 }"
            :inViewOptions="{ once: true, margin: '-30px' }"
          >
            <Icon name="lucide:mail" size="32" class="text-blue-600" />
          </motion.div>
          <h3 class="mb-3 text-xl font-bold text-gray-800">Email</h3>
          <p class="leading-relaxed text-gray-600">smkn2.singosari@yahoo.co.id</p>
        </motion.div>
      </div>

      
      <div class="max-w-5xl mx-auto">
        <motion.div
          class="inline-block px-10 py-6 mb-8 border border-orange-200 shadow-xl bg-linear-to-r from-orange-500 to-orange-600 backdrop-blur-2xl rounded-2xl"
          :initial="{ opacity: 0, scale: 0.9 }"
          :whileInView="{ opacity: 1, scale: 1 }"
          :transition="{ duration: 0.6, delay: 1.4 }"
          :inViewOptions="{ once: true, margin: '-100px' }"
        >
          <h2 class="text-2xl font-bold text-white">Lokasi Sekolah</h2>
        </motion.div>

        <motion.div
          class="p-8 bg-white border-2 border-blue-100 shadow-xl rounded-2xl"
          :initial="{ opacity: 0, scale: 0.95 }"
          :whileInView="{ opacity: 1, scale: 1 }"
          :transition="{ duration: 0.7, delay: 1.6 }"
          :whileHover="{ scale: 1.02, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }"
          :inViewOptions="{ once: true, margin: '-50px' }"
        >
          <motion.div
            class="aspect-video rounded-xl overflow-hidden"
            :initial="{ opacity: 0 }"
            :whileInView="{ opacity: 1 }"
            :transition="{ duration: 0.8, delay: 1.8 }"
            :inViewOptions="{ once: true, margin: '-30px' }"
          >
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d53004.90227511139!2d112.61905412163591!3d-7.903971658482226!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd62a2690b713bb%3A0x61a43c4cb3de3ff0!2sSMK%20Negeri%202%20Singosari!5e0!3m2!1sid!2sid!4v1760870911351!5m2!1sid!2sid" style="border:0;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="w-full h-full"></iframe>
          </motion.div>
        </motion.div>
      </div>

      
      <div class="max-w-5xl mx-auto mt-16">
        <motion.div
          class="inline-block px-10 py-6 mb-8 border border-blue-200 shadow-xl bg-linear-to-r from-blue-600 to-blue-800 backdrop-blur-2xl rounded-2xl"
          :initial="{ opacity: 0, scale: 0.9 }"
          :whileInView="{ opacity: 1, scale: 1 }"
          :transition="{ duration: 0.6, delay: 2.0 }"
          :inViewOptions="{ once: true, margin: '-100px' }"
        >
          <h2 class="text-2xl font-bold text-white">Galeri Sekolah</h2>
        </motion.div>

        <motion.div
          class="p-8 bg-white border-2 border-blue-100 shadow-xl rounded-2xl"
          :initial="{ opacity: 0, y: 30 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.7, delay: 2.2 }"
          :inViewOptions="{ once: true, margin: '-50px' }"
        >
          <motion.div
            class="relative flex items-center justify-center bg-gray-100 border-2 border-gray-200 rounded-xl aspect-video cursor-pointer overflow-hidden"
            :initial="{ opacity: 0, scale: 0.95 }"
            :whileInView="{ opacity: 1, scale: 1 }"
            :transition="{ duration: 0.6, delay: 2.4 }"
            :whileHover="{ scale: 1.02, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }"
            :whileTap="{ scale: 0.98 }"
            :inViewOptions="{ once: true, margin: '-30px' }"
            @click="goToSlide((currentIndex + 1) % slides.length)"
          >
            <AnimatePresence>
              <motion.img
                :key="slides[currentIndex].id"
                :src="slides[currentIndex].src"
                :alt="slides[currentIndex].alt"
                class="absolute inset-0 w-full h-full object-cover"
                :initial="{ opacity: 0, scale: 1.1 }"
                :animate="{ opacity: 1, scale: 1 }"
                :exit="{ opacity: 0, scale: 0.9 }"
                :transition="{ duration: 0.5, ease: 'easeInOut' }"
              />
            </AnimatePresence>
            <div class="absolute inset-0 flex items-center justify-between px-4">
              <motion.button
                @click.stop="goToSlide(currentIndex === 0 ? slides.length - 1 : currentIndex - 1)"
                class="p-2 bg-white bg-opacity-80 rounded-full shadow-lg hover:bg-opacity-100 transition-all duration-200"
                :initial="{ x: -20, opacity: 0 }"
                :whileInView="{ x: 0, opacity: 1 }"
                :transition="{ duration: 0.5, delay: 2.6 }"
                :inViewOptions="{ once: true, margin: '-20px' }"
              >
                <Icon name="lucide:chevron-left" size="20" class="text-gray-600" />
              </motion.button>
              <motion.button
                @click.stop="goToSlide((currentIndex + 1) % slides.length)"
                class="p-2 bg-white bg-opacity-80 rounded-full shadow-lg hover:bg-opacity-100 transition-all duration-200"
                :initial="{ x: 20, opacity: 0 }"
                :whileInView="{ x: 0, opacity: 1 }"
                :transition="{ duration: 0.5, delay: 2.6 }"
                :inViewOptions="{ once: true, margin: '-20px' }"
              >
                <Icon name="lucide:chevron-right" size="20" class="text-gray-600" />
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            class="flex items-center justify-center mt-6 space-x-3"
            :initial="{ opacity: 0, y: 10 }"
            :whileInView="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.5, delay: 2.8 }"
            :inViewOptions="{ once: true, margin: '-30px' }"
          >
            <motion.button
              v-for="(slide, index) in slides"
              :key="slide.id"
              @click="goToSlide(index)"
              :class="[
                'rounded-full transition-all duration-300 ease-in-out',
                currentIndex === index ? 'bg-blue-600 w-8 h-3' : 'bg-gray-300 hover:bg-gray-400 w-3 h-3',
              ]"
              :aria-label="'Go to slide ' + (index + 1)"
              :initial="{ scale: 0 }"
              :whileInView="{ scale: 1 }"
              :transition="{ duration: 0.3, delay: 3.0 + index * 0.1, type: 'spring', stiffness: 300 }"
              :inViewOptions="{ once: true, margin: '-20px' }"
            ></motion.button>
          </motion.div>
        </motion.div>
      </div>

      
      <motion.div
        class="max-w-5xl mx-auto mt-16"
        :initial="{ opacity: 0 }"
        :whileInView="{ opacity: 1 }"
        :transition="{ duration: 0.6, delay: 3.2 }"
        :inViewOptions="{ once: true, margin: '-100px' }"
      >
        <motion.div
          class="p-8 text-center bg-white border-2 border-blue-100 shadow-xl rounded-2xl"
          :initial="{ opacity: 0, y: 30 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.7, delay: 3.4 }"
          :inViewOptions="{ once: true, margin: '-50px' }"
        >
          <motion.h3
            class="mb-6 text-2xl font-bold text-gray-800"
            :initial="{ opacity: 0, scale: 0.9 }"
            :whileInView="{ opacity: 1, scale: 1 }"
            :transition="{ duration: 0.5, delay: 3.6 }"
            :inViewOptions="{ once: true, margin: '-30px' }"
          >
            Ikuti Kami
          </motion.h3>
          <motion.div
            class="flex justify-center gap-4"
            :initial="{ opacity: 0 }"
            :whileInView="{ opacity: 1 }"
            :transition="{ duration: 0.5, delay: 3.8 }"
            :inViewOptions="{ once: true, margin: '-30px' }"
          >
            <motion.a
              href="https://instagram.com/smkn2_singosari"
              class="flex items-center justify-center w-10 h-10 transition duration-300 rounded-full bg-neutral-200 text-gray-700 hover:bg-pink-600 hover:text-white"
              :initial="{ scale: 0, rotate: -180 }"
              :whileInView="{ scale: 1, rotate: 0 }"
              :transition="{ duration: 0.6, delay: 4.0, type: 'spring', stiffness: 200 }"
              :whileHover="{ scale: 1.2, rotate: 5 }"
              :whileTap="{ scale: 0.95 }"
              :inViewOptions="{ once: true, margin: '-20px' }"
            >
              <Icon name="lucide:instagram" size="20" />
            </motion.a>
            <motion.a
              href="https://www.youtube.com/channel/UC0B8cIUqCnHMzoTNXxbRhFQ"
              class="flex items-center justify-center w-10 h-10 transition duration-300 rounded-full bg-neutral-200 text-gray-700 hover:bg-red-600 hover:text-white"
              :initial="{ scale: 0, rotate: -180 }"
              :whileInView="{ scale: 1, rotate: 0 }"
              :transition="{ duration: 0.6, delay: 4.2, type: 'spring', stiffness: 200 }"
              :whileHover="{ scale: 1.2, rotate: -5 }"
              :whileTap="{ scale: 0.95 }"
              :inViewOptions="{ once: true, margin: '-20px' }"
            >
              <Icon name="lucide:youtube" size="20" />
            </motion.a>
            <motion.a
              href="https://tiktok.com/@smkn2singosari"
              class="flex items-center justify-center w-10 h-10 transition duration-300 rounded-full bg-neutral-200 text-gray-700 hover:bg-black hover:text-white"
              :initial="{ scale: 0, rotate: -180 }"
              :whileInView="{ scale: 1, rotate: 0 }"
              :transition="{ duration: 0.6, delay: 4.4, type: 'spring', stiffness: 200 }"
              :whileHover="{ scale: 1.2, rotate: 5 }"
              :whileTap="{ scale: 0.95 }"
              :inViewOptions="{ once: true, margin: '-20px' }"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  </div>
</template>
