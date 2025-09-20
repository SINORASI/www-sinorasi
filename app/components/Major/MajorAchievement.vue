<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Main Carousel Section -->
    <div class="relative bg-white py-16 px-8">
      <div class="max-w-6xl mx-auto">
        <!-- Carousel Container -->
        <div class="flex items-center justify-center gap-8">
          <!-- Left Arrow -->
          <button 
            @click="previousSlide"
            class="p-3 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors z-10"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>

          <!-- Cards Container with Stacked Layout -->
          <div class="relative flex items-center justify-center" style="width: 500px; height: 320px;">
            <!-- Left Card (Behind) -->
            <Transition
              :name="`slide-side-${slideDirection}`"
              mode="out-in"
            >
              <div 
                :key="`left-${currentIndex}`"
                class="absolute left-8 cursor-pointer transform transition-all duration-500 hover:scale-105 z-10"
                style="transform: translateX(-20px) translateY(10px) rotate(-5deg);"
                @click="selectCard(getPreviousAchievement())"
              >
                <div class="w-40 h-48 bg-white rounded-lg shadow-lg border-4 border-orange-400 overflow-hidden transform transition-all duration-300">
                  <div class="h-32 bg-gray-300 flex items-center justify-center">
                    <div class="w-16 h-16 bg-gray-500 rounded-full"></div>
                  </div>
                  <div class="p-3 bg-gray-600">
                    <p class="text-white text-xs text-center">{{ getPreviousAchievement().description }}</p>
                  </div>
                </div>
              </div>
            </Transition>

            <!-- Right Card (Behind) -->
            <Transition
              :name="`slide-side-${slideDirection}`"
              mode="out-in"
            >
              <div 
                :key="`right-${currentIndex}`"
                class="absolute right-8 cursor-pointer transform transition-all duration-500 hover:scale-105 z-10"
                style="transform: translateX(20px) translateY(10px) rotate(5deg);"
                @click="selectCard(getNextAchievement())"
              >
                <div class="w-40 h-48 bg-white rounded-lg shadow-lg border-4 border-orange-400 overflow-hidden transform transition-all duration-300">
                  <div class="h-32 bg-gray-300 flex items-center justify-center">
                    <div class="w-16 h-16 bg-gray-500 rounded-full"></div>
                  </div>
                  <div class="p-3 bg-gray-600">
                    <p class="text-white text-xs text-center">{{ getNextAchievement().description }}</p>
                  </div>
                </div>
              </div>
            </Transition>

            <!-- Center Main Card (Front) -->
            <Transition
              :name="`slide-center-${slideDirection}`"
              mode="out-in"
            >
              <div 
                :key="`center-${currentIndex}`"
                class="absolute left-1/2 transform -translate-x-1/2 cursor-pointer transition-all duration-500 hover:scale-105 z-20"
                @click="selectCard(achievements[currentIndex]!)"
              >
                <div class="w-56 h-64 bg-white rounded-lg shadow-2xl border-4 border-orange-500 overflow-hidden transform transition-all duration-300">
                  <div class="h-44 bg-gray-200 flex items-center justify-center">
                    <div class="w-24 h-24 bg-gray-500 rounded-full"></div>
                  </div>
                  <div class="p-4 bg-gray-700">
                    <p class="text-white text-sm text-center font-medium">{{ achievements[currentIndex]?.description }}</p>
                  </div>
                </div>
              </div>
            </Transition>
          </div>

          <!-- Right Arrow -->
          <button 
            @click="nextSlide"
            class="p-3 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors z-10"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        <!-- Achievement Title with Animation -->
        <Transition name="fade" mode="out-in">
          <div :key="currentIndex" class="text-center mt-8">
            <h3 class="text-lg font-semibold text-gray-800 transition-all duration-300">
              {{ achievements[currentIndex]?.subtitle }}
            </h3>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Achievement {
  id: number
  title: string
  subtitle: string
  description: string
  fullDescription: string
  image: string
}

const currentIndex = ref<number>(0)
const selectedCard = ref<Achievement | null>(null)
const slideDirection = ref<'left' | 'right'>('left')

const achievements: Achievement[] = [
  {
    id: 1,
    title: "JUARA 1",
    subtitle: "LOMBA KOMPETENSI SISWA (LKS) IT SOFTWARE TINGKAT PROVINSI JAWA TIMUR",
    description: "Lorem Ipsum",
    fullDescription: "Sarana pembelajaran bisa didapatin cukup baik di ruang kelas. Tempat duduk dan meja siswa yang ada di dalam ruangan ada dalam kondisi cukup baik. Untuk media pembelajaran sudah memadai, antara lain terdapat Lab. Mekatronika antara lain lab.perkiraan seperti listrik, Lab. Komputer, dan Bengali. Jumlah buku semakin lengkap.",
    image: "/images/achievement1.jpg"
  },
  {
    id: 2,
    title: "JUARA 2",
    subtitle: "LOMBA ROBOTIKA NASIONAL TINGKAT SMA/SMK",
    description: "Lorem Ipsum",
    fullDescription: "Prestasi gemilang dalam bidang robotika yang menunjukkan kemampuan teknis dan inovasi siswa dalam mengembangkan teknologi robotika modern. Kompetisi ini melibatkan berbagai aspek mulai dari programming, desain mekanik, hingga presentasi hasil karya kepada juri ahli.",
    image: "/images/achievement2.jpg"
  },
  {
    id: 3,
    title: "JUARA 3",
    subtitle: "KOMPETISI PROGRAMMING NASIONAL TINGKAT MAHASISWA",
    description: "Lorem Ipsum",
    fullDescription: "Pencapaian luar biasa dalam kompetisi programming yang membutuhkan skill algoritma dan pemecahan masalah tingkat tinggi. Tim berhasil menyelesaikan berbagai tantangan coding dalam waktu terbatas dengan solusi yang efisien dan kreatif.",
    image: "/images/achievement3.jpg"
  },
  {
    id: 4,
    title: "JUARA 1",
    subtitle: "LOMBA DESAIN UI/UX TINGKAT NASIONAL",
    description: "Lorem Ipsum",
    fullDescription: "Meraih juara pertama dalam kompetisi desain antarmuka pengguna yang mengedepankan kreativitas, usability, dan user experience. Karya yang dihasilkan menunjukkan pemahaman mendalam tentang prinsip-prinsip desain modern dan kebutuhan pengguna.",
    image: "/images/achievement4.jpg"
  },
  {
    id: 5,
    title: "JUARA 2",
    subtitle: "HACKATHON TEKNOLOGI PENDIDIKAN 2024",
    description: "Lorem Ipsum",
    fullDescription: "Berhasil mengembangkan solusi teknologi inovatif untuk dunia pendidikan dalam waktu 48 jam. Tim menunjukkan kemampuan kolaborasi, kreativitas, dan implementasi teknologi terkini untuk menyelesaikan tantangan real-world dalam sektor pendidikan.",
    image: "/images/achievement5.jpg"
  }
]

const nextSlide = (): void => {
  slideDirection.value = 'left' // Kartu bergerak ke kiri (slide maju)
  currentIndex.value = (currentIndex.value + 1) % achievements.length
}

const previousSlide = (): void => {
  slideDirection.value = 'right' // Kartu bergerak ke kanan (slide mundur)  
  currentIndex.value = (currentIndex.value - 1 + achievements.length) % achievements.length
}

const getPreviousAchievement = (): Achievement => {
  const prevIndex = (currentIndex.value - 1 + achievements.length) % achievements.length
  return achievements[prevIndex]!
}

const getNextAchievement = (): Achievement => {
  const nextIndex = (currentIndex.value + 1) % achievements.length
  return achievements[nextIndex]!
}

const selectCard = (achievement: Achievement): void => {
  selectedCard.value = achievement
}

const closeDetail = (): void => {
  selectedCard.value = null
}
</script>

<style scoped>
/* Directional slide animations for side cards */
.slide-side-left-enter-active,
.slide-side-left-leave-active {
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-side-left-enter-from {
  opacity: 0;
  transform: translateX(-80px) translateY(10px) scale(0.8) rotate(-5deg);
}

.slide-side-left-leave-to {
  opacity: 0;
  transform: translateX(80px) translateY(10px) scale(0.8) rotate(-5deg);
}

.slide-side-right-enter-active,
.slide-side-right-leave-active {
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-side-right-enter-from {
  opacity: 0;
  transform: translateX(80px) translateY(10px) scale(0.8) rotate(5deg);
}

.slide-side-right-leave-to {
  opacity: 0;
  transform: translateX(-80px) translateY(10px) scale(0.8) rotate(5deg);
}

/* Directional slide animations for center card */
.slide-center-left-enter-active,
.slide-center-left-leave-active {
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-center-left-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateX(-100px) translateY(-10px) scale(0.9);
}

.slide-center-left-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateX(100px) translateY(10px) scale(0.9);
}

.slide-center-right-enter-active,
.slide-center-right-leave-active {
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-center-right-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateX(100px) translateY(-10px) scale(0.9);
}

.slide-center-right-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateX(-100px) translateY(10px) scale(0.9);
}

/* Fade animation for title */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Modal fade animation */
.modal-fade-enter-active {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.modal-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0.06, 0.68, 0.19);
}

.modal-fade-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.modal-fade-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

/* Slide up animation for detail content */
.slide-up-enter-active {
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(40px);
}

/* Hover effects */
.hover\:scale-105:hover {
  transform: scale(1.05);
}

.hover\:scale-110:hover {
  transform: scale(1.1);
}

/* Custom animations for better performance */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.animate-slide-in {
  animation: slideIn 0.5s ease-out;
}

.animate-pulse {
  animation: pulse 2s infinite;
}
</style>