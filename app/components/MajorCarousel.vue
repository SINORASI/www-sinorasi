<template>
  <div class="max-w-[1400px] xl:max-w-[1600px] px-4 py-8 mx-auto">
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:gap-8 lg:gap-4">
      <div
        v-for="card in currentSlideCards"
        :key="card.id"
        class="relative w-full aspect-video"
        @mouseenter="handleMouseEnter(card.id)"
        @mouseleave="handleMouseLeave(card.id)"
        @touchstart="handleTouchStart(card.id)"
        @touchend="handleTouchEnd(card.id)"
        @click="navigateToJurusan(card.slug)"
      >
        <div class="relative w-full h-full rounded-xl overflow-hidden shadow-[0_4px_6px_rgba(59,130,246,0.1)] cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(59,130,246,0.2)]">
          <img v-show="hoveredCard !== card.id" :src="card.thumbnail" :alt="card.title" class="absolute object-cover object-center w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
          <!-- YouTube player container -->
          <div
            v-if="card.videoType === 'youtube'"
            :id="`youtube-player-${card.id}`"
            class="absolute object-cover object-center w-full h-full transition-opacity duration-300 ease-in-out -translate-x-1/2 -translate-y-1/2 opacity-0 pointer-events-none top-1/2 left-1/2"
            :class="{ 'opacity-100': hoveredCard === card.id }"
          />

          <!-- Logo and title positioned above overlay - fade on hover -->
          <div :class="['absolute top-3 left-3 right-3 z-10 opacity-100 transition-opacity duration-300 ease-in-out md:top-2.5 md:left-2.5 md:right-2.5 sm:top-2 sm:left-2 sm:right-2', { 'opacity-0': hoveredCard === card.id }]">
            <div class="flex items-center gap-2 bg-black/70 backdrop-blur-md p-2 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.3)] md:p-1.5 md:px-2.5 md:gap-1.5 sm:p-1.25 sm:px-2 sm:gap-1.25">
              <div class="flex-shrink-0">
                <img :src="card.logo" alt="Logo Jurusan" class="w-8 h-8 object-contain drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] md:w-7 md:h-7 sm:w-6 sm:h-6" />
              </div>
              <h4 class="text-white text-sm font-semibold text-shadow-[0_1px_2px_rgba(0,0,0,0.7)] m-0 leading-tight line-clamp-1 overflow-hidden md:text-xs sm:text-xs">{{ card.title }}</h4>
            </div>
          </div>

          <div :class="['absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-black/90 via-black/70 to-transparent backdrop-blur-xl px-4 pb-4 translate-y-full transition-transform duration-500 ease-out opacity-0 flex items-end md:p-4 md:h-[35%] sm:h-[30%]', { 'translate-y-0 opacity-100': hoveredCard === card.id }]">
            <div class="flex items-start justify-between text-white md:flex-col md:items-center md:gap-3 sm:flex-col sm:items-center sm:gap-2">
              <div class="flex-1 mr-4 md:mr-0 md:text-center sm:mr-0 sm:text-center">
                <h3 class="text-lg font-bold leading-tight md:text-lg sm:text-base">{{ card.title }}</h3>
                <p class="overflow-hidden text-sm leading-relaxed opacity-95 line-clamp-1 md:text-xs md:line-clamp-2">{{ card.description }}</p>
                <button @click.stop="navigateToJurusan(card.slug)" class="bg-white/20 text-white border border-white/30 px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition-all duration-200 mt-2 hover:bg-white/30 hover:border-white/50 hover:-translate-y-0.5">Pelajari Lebih</button>
              </div>
              <div class="block">
                <img :src="card.logo" alt="Logo Jurusan" class="w-[60px] h-[60px] object-contain md:w-[50px] md:h-[50px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap justify-center gap-4 mt-12 xl:mt-14 lg:mt-10">
      <button class="px-6 py-2.5 bg-[#146fee] text-white border-none rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 w-[150px] hover:not(:disabled):bg-[#5c91e7] hover:not(:disabled):-translate-y-0.5 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-50 xl:w-[180px] sm:text-xs sm:px-4 sm:py-2" @click="prevSlide" :disabled="currentSlide === 0">← Kembali</button>
      <button class="px-6 py-2.5 bg-[#146fee] text-white border-none rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 w-[150px] hover:not(:disabled):bg-[#5c91e7] hover:not(:disabled):-translate-y-0.5 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-50 xl:w-[180px] sm:text-xs sm:px-4 sm:py-2 bg-blue-600 px-[26px] py-3 w-[200px] font-semibold text-[0.9rem] hover:not(:disabled):bg-blue-700 hover:not(:disabled):-translate-y-0.5 hover:not(:disabled):shadow-[0_4px_12px_rgba(37,99,235,0.3)] xl:w-[220px]" @click="navigateToMajorsList">Lihat Selengkapnya</button>
      <button class="px-6 py-2.5 bg-[#146fee] text-white border-none rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 w-[150px] hover:not(:disabled):bg-[#5c91e7] hover:not(:disabled):-translate-y-0.5 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-50 xl:w-[180px] sm:text-xs sm:px-4 sm:py-2" @click="nextSlide" :disabled="currentSlide === totalSlides - 1">Selanjutnya →</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";

// YouTube API type definition
declare global {
  interface Window {
    YT: any;
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
const youtubePlayers = ref<Record<number, any>>({});
const playersReady = ref<Record<number, boolean>>({});
const playbackIntervals = ref<Record<number, number>>({});

// Load YouTube API
let apiLoaded = false;
onMounted(() => {
  if (!window.YT) {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    if (firstScriptTag && firstScriptTag.parentNode) {
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
      onReady: (event: any) => {
        playersReady.value[id] = true;
        event.target.setPlaybackQuality('hd720');
        event.target.getIframe().style.width = '100%';
        event.target.getIframe().style.height = '100%';
      },
    },
  });
};

// Watch for slide changes
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
  const card = videoCards.find(c => c.id === id);

  if (player && playersReady.value[id] && card) {
    player.seekTo(card.startTime, true);
    player.setPlaybackRate(0.75);
    player.playVideo();

    // Clear any existing interval
    if (playbackIntervals.value[id]) {
      clearInterval(playbackIntervals.value[id]);
    }

    // Monitor playback and loop between startTime and startTime + 5 seconds
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
  const card = videoCards.find(c => c.id === id);

  // Clear interval
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
  const card = videoCards.find(c => c.id === id);

  if (player && playersReady.value[id] && card) {
    player.seekTo(card.startTime, true);
    player.setPlaybackRate(0.75);
    player.playVideo();

    // Clear any existing interval
    if (playbackIntervals.value[id]) {
      clearInterval(playbackIntervals.value[id]);
    }

    // Monitor playback and loop between startTime and startTime + 5 seconds
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
  const card = videoCards.find(c => c.id === id);

  // Clear interval
  if (playbackIntervals.value[id]) {
    clearInterval(playbackIntervals.value[id]);
    delete playbackIntervals.value[id];
  }

  if (player && playersReady.value[id] && card) {
    player.pauseVideo();
    player.seekTo(card.startTime, true);
  }
};

const videoCards: VideoCard[] = [
  {
    id: 1,
    thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop",
    videoUrl: "pKI-5JJPol8",
    videoType: "youtube",
    logo: "/images/majorIcon/logo-rpl.webp",
    title: "Rekayasa Perangkat Lunak",
    description:
      "Pemrograman, aplikasi, database, dan software untuk platform digital",
    slug: "rpl",
    startTime: 63,
  },
  {
    id: 2,
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
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
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
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
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    videoUrl: "o-b0I1IorbU",
    videoType: "youtube",
    logo: "/images/majorIcon/logo-an.webp",
    title: "Animasi",
    description: "Teknik animasi 2D, 3D, motion graphics, character design, dan produksi multimedia",
    slug: "animasi",
    startTime: 11,
  },
  {
    id: 5,
    thumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
    videoUrl: "Dcvcf2ssyfk",
    videoType: "youtube",
    logo: "/images/majorIcon/logo-bc.webp",
    title: "Broadcasting",
    description: "Produksi siaran televisi, radio, videografi, editing video, dan jurnalistik multimedia",
    slug: "broadcasting",
    startTime: 15,
  },
  {
    id: 6,
    thumbnail: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop",
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
    thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop",
    videoUrl: "eBL7a0bNtKo",
    videoType: "youtube",
    logo: "/images/majorIcon/logo-mt.webp",
    title: "Mekatronika",
    description: "Menggabungkan mekanik, elektronik, dan komputer untuk sistem otomasi dan robotika",
    slug: "mekatronika",
    startTime: 41,
  },
  {
    id: 8,
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
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

