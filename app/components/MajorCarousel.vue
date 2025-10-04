<template>
  <div class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="card in currentSlideCards"
        :key="card.id"
        class="video-card-wrapper"
        @mouseenter="handleMouseEnter(card.id)"
        @mouseleave="handleMouseLeave(card.id)"
        @click="navigateToJurusan(card.slug)"
      >
        <div class="video-card">
          <img
            v-show="hoveredCard !== card.id"
            :src="card.thumbnail"
            :alt="card.title"
            class="thumbnail"
          />
          <iframe
            v-if="card.videoType === 'youtube'"
            :ref="el => setVideoRef(card.id, el)"
            :src="`https://www.youtube.com/embed/${card.videoUrl}?autoplay=1&mute=1&loop=1&playlist=${card.videoUrl}&controls=0&showinfo=0&rel=0&modestbranding=1&start=${card.startTime || 10}&end=${card.endTime || 20}&playbackRate=${card.speed || 0.5}`"
            class="video-element youtube-iframe"
            :class="{ 'video-active': hoveredCard === card.id }"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
          />
          
          <div 
            class="content-overlay"
            :class="{ 'content-visible': hoveredCard === card.id }"
          >
            <div class="content-wrapper">
              <div class="logo">
                <img :src="card.logo" alt="Logo Jurusan" width="60" height="60">
              </div>
              <h3 class="title">{{ card.title }}</h3>
              <p class="description">{{ card.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="navigation">
      <button 
        class="nav-btn" 
        @click="prevSlide"
        :disabled="currentSlide === 0"
      >
        ← Kembali
      </button>
      <button 
        class="nav-btn" 
        @click="nextSlide"
        :disabled="currentSlide === totalSlides - 1"
      >
        Selanjutnya →
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface VideoCard {
  id: number
  thumbnail: string
  videoUrl: string
  videoType: 'file' | 'youtube'
  logo: string
  title: string
  description: string
  slug: string
  startTime?: number
  endTime?: number
  speed?: number
}

const hoveredCard = ref<number | null>(null)
const videoRefs = ref<Record<number, HTMLVideoElement>>({})
const currentSlide = ref(0)
const cardsPerSlide = 4

const videoCards: VideoCard[] = [
  {
    id: 1,
    thumbnail: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
    videoUrl: 'pKI-5JJPol8',
    videoType: 'youtube',
    logo: '/images/majorIcon/rpl.webp',
    title: 'Rekayasa Perangkat Lunak',
    description: 'Mempelajari pemrograman, pengembangan aplikasi, database, dan pembuatan software untuk berbagai platform digital',
    slug: 'rpl',
    startTime: 5,
    endTime: 15,
    speed: 1
  },
  {
    id: 2,
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
    videoUrl: 'GgSUvrHtFKY',
    videoType: 'youtube',
    logo: '/images/majorIcon/tkj.webp',
    title: 'Teknik Komputer dan Jaringan',
    description: 'Fokus pada instalasi, konfigurasi, dan maintenance jaringan komputer, server, serta sistem keamanan IT',
    slug: 'tkj',
    startTime: 5,
    endTime: 15,
    speed: 1
  },
  {
    id: 3,
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop',
    videoUrl: 'tlfc46ZCu0c',
    videoType: 'youtube',
    logo: '/images/majorIcon/dkv.webp',
    title: 'Desain Komunikasi Visual',
    description: 'Mengembangkan kemampuan desain grafis, branding, ilustrasi, dan komunikasi visual untuk media cetak dan digital',
    slug: 'dkv',
    startTime: 5,
    endTime: 15,
    speed: 1
  },
  {
    id: 4,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    videoUrl: 'o-b0I1IorbU',
    videoType: 'youtube',
    logo: '/images/majorIcon/animasi.webp',
    title: 'Animasi',
    description: 'Mempelajari teknik animasi 2D, 3D, motion graphics, character design, dan produksi konten multimedia',
    slug: 'animasi',
    startTime: 5,
    endTime: 15,
    speed: 1
  },
  {
    id: 5,
    thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
    videoUrl: 'Dcvcf2ssyfk',
    videoType: 'youtube',
    logo: '/images/majorIcon/broadcasting.webp',
    title: 'Broadcasting',
    description: 'Menguasai produksi siaran televisi, radio, videografi, editing video, dan jurnalistik multimedia',
    slug: 'broadcasting',
    startTime: 5,
    endTime: 15,
    speed: 1
  },
  {
    id: 6,
    thumbnail: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop',
    videoUrl: 'xXydNK3sI6I',
    videoType: 'youtube',
    logo: '/images/majorIcon/tei.webp',
    title: 'Teknik Elektronika Industri',
    description: 'Pembelajaran sistem kontrol industri, PLC, robotika, instrumentasi, dan otomasi pabrik modern',
    slug: 'tei',
    startTime: 5,
    endTime: 15,
    speed: 1
  },
  {
    id: 7,
    thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop',
    videoUrl: 'eBL7a0bNtKo',
    videoType: 'youtube',
    logo: '/images/majorIcon/mekatronika.webp',
    title: 'Mekatronika',
    description: 'Menggabungkan mekanik, elektronik, dan komputer untuk merancang sistem otomasi dan robotika industri',
    slug: 'mekatronika',
    startTime: 5,
    endTime: 15,
    speed: 1
  },
  {
    id: 8,
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
    videoUrl: 'ygvL6UDvGv4',
    videoType: 'youtube',
    logo: '/images/majorIcon/tav.webp',
    title: 'Teknik Audio Video',
    description: 'Mempelajari instalasi dan perawatan sistem audio video, sound system, home theater, dan teknologi multimedia',
    slug: 'tav',
    startTime: 5,
    endTime: 15,
    speed: 1
  }
]

const totalSlides = computed(() => Math.ceil(videoCards.length / cardsPerSlide))

const currentSlideCards = computed(() => {
  const start = currentSlide.value * cardsPerSlide
  const end = start + cardsPerSlide
  return videoCards.slice(start, end)
})

const setVideoRef = (id: number, el: any) => {
  if (el) {
    videoRefs.value[id] = el as HTMLVideoElement
  }
}

const handleMouseEnter = (id: number) => {
  hoveredCard.value = id
  const video = videoRefs.value[id]
  if (video && video.tagName === 'VIDEO') {
    video.currentTime = 0
    video.play().catch(err => console.log('Video play failed:', err))
  }
}

const handleMouseLeave = (id: number) => {
  hoveredCard.value = null
  const video = videoRefs.value[id]
  if (video && video.tagName === 'VIDEO') {
    video.pause()
    video.currentTime = 0
  }
}

const nextSlide = () => {
  if (currentSlide.value < totalSlides.value - 1) {
    currentSlide.value++
  }
}

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
  }
}

const navigateToJurusan = (slug: string) => {
  window.location.href = `/jurusan/${slug}`
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}

.video-card-wrapper {
  position: relative;
  width: 100%;
  height: 320px;
}

.video-card {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease;
}

.video-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.thumbnail,
.video-element {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.video-element {
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.youtube-iframe {
  border: none;
  object-fit: cover;
}

.video-active {
  opacity: 1;
}

.content-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.7) 50%, transparent 100%);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 24px;
  transform: translateY(100%);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  display: flex;
  align-items: flex-end;
}

.content-visible {
  transform: translateY(0);
  opacity: 1;
}

.content-wrapper {
  text-align: left;
  color: white;
}

.logo {
  margin-bottom: 10px;
  display: inline-block;
}

.logo img {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.title {
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 8px;
  line-height: 1.3;
}

.description {
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 12px;
  opacity: 0.95;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.navigation {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 48px;
  flex-wrap: wrap;
}

.nav-btn {
  padding: 10px 24px;
  background: #146fee;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  width: 150px;
}

.nav-btn:hover:not(:disabled) {
  background: #5c91e7;
  transform: translateY(-2px);
}

.nav-btn:disabled {
  background: #6b7280;
  cursor: not-allowed;
  opacity: 0.5;
}

/* Responsive Design */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
  
  .video-card-wrapper {
    height: 240px;
  }
  
  .title {
    font-size: 1.1rem;
  }
  
  .description {
    font-size: 0.8rem;
    -webkit-line-clamp: 2;
  }
  
  .content-overlay {
    padding: 16px;
  }
  
  .logo img {
    width: 50px;
    height: 50px;
  }
}

@media (max-width: 640px) {
  .video-card-wrapper {
    height: 200px;
  }
  
  .title {
    font-size: 1rem;
  }
  
  .nav-btn {
    font-size: 0.8rem;
    padding: 8px 16px;
  }
}
</style>