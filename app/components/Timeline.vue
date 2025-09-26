<template>
  <div v-if="isMobile">
    <MobileTimeline :timeline-items="timelineItems" />
  </div>
  <div v-else class="timeline">
    <div class="timeline-line"></div>
    <div v-for="(item, index) in timelineItems" :key="index" class="timeline-item" :class="index % 2 === 0 ? 'left' : 'right'">
      <div class="timeline-content bg-secondary shadow-lg rounded-lg p-6 border border-neutral-300">
        <div :class="['px-3 py-1 rounded-full w-fit mb-4', index % 2 === 0 ? 'bg-blue-100' : 'bg-orange-100']">
          <span :class="['font-bold', index % 2 === 0 ? 'text-blue-600' : 'text-orange-600']">{{ item.year }}</span>
        </div>
        <h3 class="text-xl font-bold text-gray-800 mb-2">{{ item.title }}</h3>
        <p class="text-gray-600 text-sm">{{ item.description }}</p>
      </div>
      <div class="timeline-marker">
        <Icon :name="item.icon" size="24" :class="index % 2 === 0 ? 'text-blue-600' : 'text-orange-600'" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isMobile = ref(false)

const timelineItems = [
  {
    year: '2007',
    title: 'Awal Berdiri',
    description: 'SMK Negeri 2 Singosari didirikan secara resmi pada tanggal 25 Mei 2007 berdasarkan surat Perjanjian Kerjasama No. 0570ax/C5.4/Kep/KU/2007 antara Bupati Malang dengan Direktur Pendidikan Sekolah Menengah Kejuruan.',
    icon: 'lucide:school'
  },
  {
    year: '2010',
    title: 'Pengembangan Program Keahlian',
    description: 'Sekolah mulai mengembangkan berbagai program keahlian untuk memenuhi kebutuhan industri lokal dan nasional.',
    icon: 'lucide:book-open'
  },
  {
    year: '2015',
    title: 'Akreditasi A',
    description: 'SMK Negeri 2 Singosari berhasil meraih akreditasi A dari Badan Akreditasi Nasional Sekolah/Madrasah.',
    icon: 'lucide:award'
  },
  {
    year: '2020',
    title: 'Digitalisasi Pembelajaran',
    description: 'Implementasi pembelajaran daring dan pengembangan platform digital untuk mendukung proses belajar mengajar di era pandemi.',
    icon: 'lucide:monitor'
  },
  {
    year: '2023',
    title: 'Prestasi LKS',
    description: 'Siswa SMK Negeri 2 Singosari berhasil meraih prestasi gemilang dalam Lomba Kompetensi Siswa tingkat kabupaten dan provinsi.',
    icon: 'lucide:trophy'
  }
]

onMounted(() => {
  const checkMobile = () => {
    isMobile.value = window.innerWidth < 768
  }
  checkMobile()
  window.addEventListener('resize', checkMobile)
  onUnmounted(() => {
    window.removeEventListener('resize', checkMobile)
  })
})
</script>

<style scoped>
.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0;
}

.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: gray;
  transform: translateX(-50%);
}

.timeline-item {
  position: relative;
  margin-bottom: 3rem;
  clear: both;
}

.timeline-item.left .timeline-content {
  text-align: right;
  margin-right: 2rem;
  width: 45%;
  float: left;
}

.timeline-item.right .timeline-content {
  text-align: left;
  margin-left: 2rem;
  width: 45%;
  float: right;
}

.timeline-item.center .timeline-content {
  text-align: center;
  width: 100%;
  float: none;
  margin: 0;
}

.timeline-marker {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .timeline-item.center {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 3rem;
  }

  .timeline-marker {
    position: static;
    margin-bottom: 1rem;
    order: -1;
  }
}
</style>