<template>
  <div class="container px-4 py-8 mx-auto">
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Motion
        v-for="card in currentSlideCards"
        :key="card.id"
        class="video-card-wrapper"
        :initial="{ opacity: 0, y: 50 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: card.id * 0.1 }"
        @mouseenter="handleMouseEnter(card.id)"
        @mouseleave="handleMouseLeave(card.id)"
        @touchstart="handleTouchStart(card.id)"
        @touchend="handleTouchEnd(card.id)"
        @click="navigateToJurusan(card.slug)"
      >
        <div class="video-card">
          <img v-show="hoveredCard !== card.id" :src="card.thumbnail" :alt="card.title" class="thumbnail" />
          
          <div
            v-if="card.videoType === 'youtube'"
            :id="`youtube-player-${card.id}`"
            class="video-element"
            :class="{ 'video-active': hoveredCard === card.id }"
          />

          
          <div :class="['card-header', { 'card-header-hidden': hoveredCard === card.id }]">
            <div class="card-header-content">
              <div class="card-logo">
                <img :src="card.logo" alt="Logo Jurusan" width="32" height="32" />
              </div>
              <h4 class="card-title">{{ card.title }}</h4>
            </div>
          </div>

          <div class="content-overlay" :class="{ 'content-visible': hoveredCard === card.id }">
            <div class="content-wrapper">
              <div class="content-left">
                <h3 class="title">{{ card.title }}</h3>
                <p class="description">{{ card.description }}</p>
                <button @click.stop="navigateToJurusan(card.slug)" class="learn-more-btn">Pelajari Lebih</button>
              </div>
              <div class="logo">
                <img :src="card.logo" alt="Logo Jurusan" width="60" height="60" />
              </div>
            </div>
          </div>
        </div>
      </Motion>
    </div>

    <Motion
      class="navigation"
      :initial="{ opacity: 0, y: 30 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.6, delay: 0.8 }"
    >
      <button class="nav-btn" @click="prevSlide" :disabled="currentSlide === 0">← Kembali</button>
      <button class="nav-btn view-all-btn" @click="navigateToMajorsList">Lihat Selengkapnya</button>
      <button class="nav-btn" @click="nextSlide" :disabled="currentSlide === totalSlides - 1">Selanjutnya →</button>
    </Motion>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { Motion } from "motion-v";

declare global {
  interface Window {
    YT: {
      Player: any;
      [key: string]: any;
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

interface VideoCard {
  id: number;
  thumbnail: string;
  videoUrl: string;
  videoType: "file" | "youtube";
  logo: string;
  title: string;
  description: string;
  slug: string;
  startTime: number;
}

const hoveredCard = ref<number | null>(null);
const currentSlide = ref(0);
const cardsPerSlide = 4;
type YTPlayer = {
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  setPlaybackRate: (rate: number) => void;
  playVideo: () => void;
  pauseVideo: () => void;
  getCurrentTime: () => number;
  getIframe: () => HTMLIFrameElement;
};

const youtubePlayers = ref<Record<number, YTPlayer>>({});
const playersReady = ref<Record<number, boolean>>({});
const playbackIntervals = ref<Record<number, number>>({});

const videoCards: VideoCard[] = [
  {
    id: 1,
    thumbnail: "/images/major/thumbnail/rpl-thumbnail.webp",
    videoUrl: "pKI-5JJPol8",
    videoType: "youtube",
    logo: "/images/majorIcon/logo-rpl.webp",
    title: "Rekayasa Perangkat Lunak",
    description: "Pemrograman, aplikasi, database, dan software untuk platform digital",
    slug: "rpl",
    startTime: 63,
  },
  {
    id: 2,
    thumbnail: "/images/major/thumbnail/tkj-thumbnail.webp",
    videoUrl: "GgSUvrHtFKY",
    videoType: "youtube",
    logo: "/images/majorIcon/logo-tkj.webp",
    title: "Teknik Komputer dan Jaringan",
    description:
      "Instalasi, konfigurasi, dan maintenance jaringan komputer, server, dan keamanan IT",
    slug: "tkj",
    startTime: 33,
  },
  {
    id: 3,
    thumbnail: "/images/major/thumbnail/dkv-thumbnail.webp",
    videoUrl: "tlfc46ZCu0c",
    videoType: "youtube",
    logo: "/images/majorIcon/logo-dkv.webp",
    title: "Desain Komunikasi Visual",
    description:
      "Desain grafis, branding, ilustrasi, dan komunikasi visual untuk media cetak dan digital",
    slug: "dkv",
    startTime: 11,
  },
  {
    id: 4,
    thumbnail: "/images/major/thumbnail/an-thumbnail.webp",
    videoUrl: "o-b0I1IorbU",
    videoType: "youtube",
    logo: "/images/majorIcon/logo-an.webp",
    title: "Animasi",
    description:
      "Teknik animasi 2D, 3D, motion graphics, character design, dan produksi multimedia",
    slug: "animasi",
    startTime: 11,
  },
  {
    id: 5,
    thumbnail: "/images/major/thumbnail/bc-thumbnail.webp",
    videoUrl: "Dcvcf2ssyfk",
    videoType: "youtube",
    logo: "/images/majorIcon/logo-bc.webp",
    title: "Broadcasting",
    description:
      "Produksi siaran televisi, radio, videografi, editing video, dan jurnalistik multimedia",
    slug: "broadcasting",
    startTime: 15,
  },
  {
    id: 6,
    thumbnail: "/images/major/thumbnail/ei-thumbnail.webp",
    videoUrl: "xXydNK3sI6I",
    videoType: "youtube",
    logo: "/images/majorIcon/logo-tei.webp",
    title: "Teknik Elektronika Industri",
    description: "Sistem kontrol industri, PLC, robotika, instrumentasi, dan otomasi pabrik",
    slug: "tei",
    startTime: 44,
  },
  {
    id: 7,
    thumbnail: "/images/major/thumbnail/mt-thumbnail.webp",
    videoUrl: "eBL7a0bNtKo",
    videoType: "youtube",
    logo: "/images/majorIcon/logo-mt.webp",
    title: "Mekatronika",
    description:
      "Menggabungkan mekanik, elektronik, dan komputer untuk sistem otomasi dan robotika",
    slug: "mekatronika",
    startTime: 41,
  },
  {
    id: 8,
    thumbnail: "/images/major/thumbnail/av-thumbnail.webp",
    videoUrl: "ygvL6UDvGv4",
    videoType: "youtube",
    logo: "/images/majorIcon/logo-tav.webp",
    title: "Teknik Audio Video",
    description:
      "Instalasi dan perawatan sistem audio video, sound system, home theater, dan multimedia",
    slug: "tav",
    startTime: 14,
  },
];

let apiLoaded = false;
onMounted(() => {
  if (!window.YT) {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    if (firstScriptTag?.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = () => {
      apiLoaded = true;
      initializePlayers();
    };
  } else {
    apiLoaded = true;
    initializePlayers();
  }
});

const initializePlayers = () => {
  currentSlideCards.value.forEach((card) => {
    if (card.videoType === "youtube" && !youtubePlayers.value[card.id]) {
      createPlayer(card.id, card.videoUrl);
    }
  });
};

const createPlayer = (id: number, videoId: string) => {
  if (!window.YT || !window.YT.Player) return;

  youtubePlayers.value[id] = new window.YT.Player(`youtube-player-${id}`, {
    videoId: videoId,
    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      fs: 0,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      mute: 1,
      loop: 1,
    },
    events: {
      onReady: (event: unknown) => {
        playersReady.value[id] = true;
        const ytEvent = event as { target: any };
        ytEvent.target.setPlaybackQuality("sd360");
        ytEvent.target.getIframe().style.width = "100%";
        ytEvent.target.getIframe().style.height = "100%";
      },
    },
  });
};

watch(currentSlide, () => {
  setTimeout(() => {
    if (apiLoaded) {
      initializePlayers();
    }
  }, 100);
});

const handleMouseEnter = (id: number) => {
  hoveredCard.value = id;
  const player = youtubePlayers.value[id];
  const card = videoCards.find((c) => c.id === id);

  if (player && playersReady.value[id] && card) {
    player.seekTo(card.startTime, true);
    player.setPlaybackRate(0.75);
    player.playVideo();

    if (playbackIntervals.value[id]) {
      clearInterval(playbackIntervals.value[id]);
    }

    playbackIntervals.value[id] = window.setInterval(() => {
      if (hoveredCard.value === id && player.getCurrentTime) {
        const currentTime = player.getCurrentTime();
        if (currentTime >= card.startTime + 15) {
          player.seekTo(card.startTime, true);
        }
      }
    }, 100);
  }
};

const handleMouseLeave = (id: number) => {
  hoveredCard.value = null;
  const player = youtubePlayers.value[id];
  const card = videoCards.find((c) => c.id === id);

  if (playbackIntervals.value[id]) {
    clearInterval(playbackIntervals.value[id]);
    delete playbackIntervals.value[id];
  }

  if (player && playersReady.value[id] && card) {
    player.pauseVideo();
    player.seekTo(card.startTime, true);
  }
};

const handleTouchStart = (id: number) => {
  hoveredCard.value = id;
  const player = youtubePlayers.value[id];
  const card = videoCards.find((c) => c.id === id);

  if (player && playersReady.value[id] && card) {
    player.seekTo(card.startTime, true);
    player.setPlaybackRate(0.75);
    player.playVideo();

    if (playbackIntervals.value[id]) {
      clearInterval(playbackIntervals.value[id]);
    }

    playbackIntervals.value[id] = window.setInterval(() => {
      if (hoveredCard.value === id && player.getCurrentTime) {
        const currentTime = player.getCurrentTime();
        if (currentTime >= card.startTime + 15) {
          player.seekTo(card.startTime, true);
        }
      }
    }, 100);
  }
};

const handleTouchEnd = (id: number) => {
  hoveredCard.value = null;
  const player = youtubePlayers.value[id];
  const card = videoCards.find((c) => c.id === id);

  if (playbackIntervals.value[id]) {
    clearInterval(playbackIntervals.value[id]);
    delete playbackIntervals.value[id];
  }

  if (player && playersReady.value[id] && card) {
    player.pauseVideo();
    player.seekTo(card.startTime, true);
  }
};

const totalSlides = computed(() => Math.ceil(videoCards.length / cardsPerSlide));

const currentSlideCards = computed(() => {
  const start = currentSlide.value * cardsPerSlide;
  const end = start + cardsPerSlide;
  return videoCards.slice(start, end);
});

const nextSlide = () => {
  if (currentSlide.value < totalSlides.value - 1) {
    currentSlide.value++;
  }
};

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--;
  }
};

const navigateToJurusan = (slug: string) => {
  window.location.href = `/jurusan/${slug}`;
};

const navigateToMajorsList = () => {
  window.location.href = `/jurusan`;
};
</script>

<style scoped>
.container {
  max-width: 1400px;
}

.video-card-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
}

.video-card {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(59, 130, 246, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease;
}

.video-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(59, 130, 246, 0.2);
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

.video-element iframe {
  width: 100%;
  height: 100%;
}

.video-active {
  opacity: 1;
}

.card-header {
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  z-index: 2;
  opacity: 1;
  transition: opacity 0.3s ease;
}

.card-header-hidden {
  opacity: 0;
}

.card-header-content {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 8px 12px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.card-logo {
  flex-shrink: 0;
}

.card-logo img {
  width: 32px;
  height: 32px;
  object-fit: contain;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
}

.card-title {
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
  margin: 0;
  line-height: 1.2;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.content-overlay {
  position: absolute;
  bottom: 0;
  height: 30%;
  width: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.7) 50%, transparent 100%);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 16px 16px 16px 16px;
  transform: translateY(100%);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
}

.content-visible {
  transform: translateY(0);
  opacity: 1;
}

.content-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.content-left {
  flex: 1;
  margin-right: 16px;
}

.logo {
  display: block;
}

.logo img {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.title {
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1.3;
}

.description {
  font-size: 0.875rem;
  line-height: 1.5;
  opacity: 0.95;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
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

.view-all-btn {
  background: #2563eb !important;
  padding: 12px 26px !important;
  width: 200px !important;
  font-weight: 600 !important;
  font-size: 0.9rem !important;
}

.view-all-btn:hover:not(:disabled) {
  background: #1d4ed8 !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3) !important;
}

.learn-more-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 8px;
}

.learn-more-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-1px);
}


@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .video-card-wrapper {
    aspect-ratio: 16 / 9;
  }

  .title {
    font-size: 1.1rem;
  }

  .description {
    font-size: 0.8rem;
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }

  .content-overlay {
    padding: 16px;
  }

  .content-wrapper {
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .content-left {
    margin-right: 0;
    text-align: center;
  }

  .logo img {
    width: 50px;
    height: 50px;
  }

  .card-header {
    top: 10px;
    left: 10px;
    right: 10px;
  }

  .card-header-content {
    padding: 6px 10px;
    gap: 6px;
  }

  .card-logo img {
    width: 28px;
    height: 28px;
  }

  .card-title {
    font-size: 0.8rem;
  }

  .thumbnail-overlay {
    height: 35px;
  }
}

@media (max-width: 640px) {
  .video-card-wrapper {
    aspect-ratio: 16 / 9;
  }

  .title {
    font-size: 1rem;
  }

  .content-wrapper {
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .content-left {
    margin-right: 0;
    text-align: center;
  }

  .card-header {
    top: 8px;
    left: 8px;
    right: 8px;
  }

  .card-header-content {
    padding: 5px 8px;
    gap: 5px;
  }

  .card-logo img {
    width: 24px;
    height: 24px;
  }

  .card-title {
    font-size: 0.75rem;
  }

  .thumbnail-overlay {
    height: 30px;
  }

  .nav-btn {
    font-size: 0.8rem;
    padding: 8px 16px;
  }
}


@media (min-width: 768px) and (max-width: 1024px) {
  .grid {
    gap: 1rem;
  }

  

  .navigation {
    margin-top: 40px;
  }
}


@media (min-width: 1024px) {
  .container {
    max-width: 1600px;
  }

  .grid {
    gap: 2rem;
  }

  

  .navigation {
    margin-top: 56px;
  }

  .nav-btn {
    width: 180px;
  }

  .view-all-btn {
    width: 220px !important;
  }
}
</style>
