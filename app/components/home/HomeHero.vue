<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { motion } from "motion-v";
import { smoothScrollTo } from "~/utils/scrollUtils";

const heroRef = ref<HTMLElement | null>(null);
const heroInView = ref(false);
const prefersReducedMotion = ref(false);
const isMobile = ref(false);
let checkVisibility: (() => void) | null = null;

interface Props {
  jurusanTarget?: number;
  siswaTarget?: number;
  prestasiTarget?: number;
  duration?: number;
}

const props = withDefaults(defineProps<Props>(), {
  jurusanTarget: 8,
  siswaTarget: 1200,
  prestasiTarget: 200,
  duration: 3000,
});

const jurusanCount = ref(0);
const siswaCount = ref(0);
const prestasiCount = ref(0);

const particleCount = computed(() => (isMobile.value ? 5 : 10));

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

const startCounterAnimation = async () => {
  const { animate } = await import("motion-v");
  const durationInSeconds = props.duration / 1000;

  animate(0, props.jurusanTarget, {
    duration: durationInSeconds,
    ease: "easeOut",
    onUpdate: (latest) => (jurusanCount.value = Math.floor(latest)),
  });

  animate(0, props.siswaTarget, {
    duration: durationInSeconds,
    ease: "easeOut",
    delay: 0.1,
    onUpdate: (latest) => (siswaCount.value = Math.floor(latest)),
  });

  animate(0, props.prestasiTarget, {
    duration: durationInSeconds,
    ease: "easeOut",
    delay: 0.2,
    onUpdate: (latest) => (prestasiCount.value = Math.floor(latest)),
  });
};

onMounted(() => {
  nextTick(() => {
    prefersReducedMotion.value = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });

    // Load hero immediately without waiting for scroll
    heroInView.value = true;
    startCounterAnimation();

    // Simple scroll-based trigger instead of IntersectionObserver
    checkVisibility = () => {
      if (heroRef.value) {
        const rect = heroRef.value.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        heroInView.value = isVisible;
      }
    };

    window.addEventListener("scroll", checkVisibility, { passive: true });
  });
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
  if (checkVisibility) {
    window.removeEventListener("scroll", checkVisibility);
  }
});
</script>

<template>
  <section
    ref="heroRef"
    id="hero"
    class="relative min-h-screen px-4 pt-24 pb-10 md:pt-20 overflow-hidden bg-linear-to-br from-blue-700 via-blue-600 to-blue-900"
  >
    <!-- Background Video - Lazy Loaded -->
    <video
      v-if="heroInView && !prefersReducedMotion"
      class="absolute inset-0 w-full h-full object-cover z-0"
      autoplay
      muted
      loop
      playsinline
      preload="none"
      poster="/images/guru/foto-guru-bersama.webp"
      width="2000"
      height="1125"
      aria-hidden="true"
    />

    <div class="absolute inset-0 bg-black/40 z-5"></div>

    <!-- Particles - Reduced Count -->
    <div v-if="heroInView && !prefersReducedMotion" class="absolute inset-0 overflow-hidden">
      <div
        v-for="i in particleCount"
        :key="i"
        class="particle"
        :class="`particle-${(i % 3) + 1}`"
        :style="{
          left: `${(i * 10) % 100}%`,
          top: `${(i * 15) % 100}%`,
          animationDelay: `${i * 0.5}s`,
        }"
      ></div>
    </div>

    <!-- Floating Shapes - Only when in view -->
    <div v-if="heroInView && !prefersReducedMotion" class="hero-shapes">
      <div class="hero-shape hero-shape-1"></div>
      <div class="hero-shape hero-shape-2"></div>
      <div class="hero-shape hero-shape-3"></div>
    </div>

    <!-- Main Content Grid -->
    <div
      class="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-4 lg:gap-8 min-h-[70vh] md:min-h-[80vh] items-center py-4 max-w-7xl mx-auto relative z-10"
    >
      <!-- Left Image -->
      <motion.div
        class="relative rounded-xl overflow-hidden shadow-2xl lg:[clip-path:polygon(0_0,100%_0,85%_100%,0_100%)] min-h-[200px] md:min-h-[300px] bg-white/10 backdrop-blur-sm border border-white/20"
        :initial="{ opacity: 0, x: -50 }"
        :whileInView="{ opacity: 1, x: 0 }"
        :transition="{ duration: 0.8 }"
        :inViewOptions="{ once: true }"
      >
        <div class="relative group overflow-hidden">
          <NuxtImg
            src="/images/seragam/putih-putih/10-putih-putih-jas-l/DSC04215.webp"
            alt="Students in school uniform"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="eager"
            width="400"
            height="600"
            format="webp"
            quality="80"
          />
          <div class="absolute inset-0 bg-linear-to-tr from-blue-900/40 via-transparent to-orange-900/20"></div>
        </div>
      </motion.div>

      <!-- Center Content -->
      <motion.div
        class="flex flex-col justify-center items-center text-center lg:items-start lg:text-left gap-6 text-white relative z-20 p-6 lg:p-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow-2xl"
        :initial="{ opacity: 0, y: 50 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8, delay: 0.2 }"
        :inViewOptions="{ once: true }"
      >
        <h1
          class="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center font-oswald tracking-wide leading-tight"
        >
          INORASI - <span class="text-orange-500">Inovasi</span> Raih
          <span class="text-yellow-500 font-bold">Prestasi</span>
        </h1>
        <p class="text-base sm:text-lg md:text-xl lg:text-2xl font-nunito leading-relaxed max-w-2xl">
          Pendidikan inovatif untuk pemimpin masa depan. Temukan program-program dinamis kami dan komunitas yang
          bersemangat.
        </p>
        <p class="max-w-2xl text-sm sm:text-base leading-relaxed text-gray-200">
          SMK Negeri 2 Singosari - Tempat di mana inovasi bertemu dengan prestasi. Kami berkomitmen untuk membentuk
          generasi muda yang siap menghadapi tantangan masa depan.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center gap-3 mt-4">
          <a
            @click.prevent="smoothScrollTo('#jurusan')"
            class="flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold text-white bg-orange-500 rounded-lg hover:bg-orange-600 cursor-pointer shadow-xl hover:scale-105 transition-transform"
            role="button"
          >
            Jelajahi Program
            <Icon name="lucide:graduation-cap" size="18" />
          </a>
          <a
            @click.prevent="smoothScrollTo('#profil-sekolah')"
            class="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 text-sm md:text-sm font-semibold text-orange-500 border-2 border-orange-500 rounded-lg hover:bg-orange-500 hover:text-white cursor-pointer shadow-lg hover:scale-105 transition-transform"
            role="button"
          >
            Tur Virtual
            <Icon name="lucide:map" size="16" />
          </a>
        </div>

        <!-- Stats Counter -->
        <div class="flex justify-center lg:justify-start w-full gap-4 mt-6">
          <div
            class="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-lg p-3 shadow-lg hover:scale-105 transition-transform"
          >
            <div class="text-xl md:text-2xl lg:text-3xl font-bold text-white">
              {{ jurusanCount }}
            </div>
            <div class="text-xs md:text-sm text-gray-200">Konsentrasi Keahlian</div>
          </div>
          <div
            class="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-lg p-3 shadow-lg hover:scale-105 transition-transform"
          >
            <div class="text-xl md:text-2xl lg:text-3xl font-bold text-white">{{ siswaCount }}+</div>
            <div class="text-xs md:text-sm text-gray-200">Siswa</div>
          </div>
          <div
            class="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-lg p-3 shadow-lg hover:scale-105 transition-transform"
          >
            <div class="text-xl md:text-2xl lg:text-3xl font-bold text-white">{{ prestasiCount }}+</div>
            <div class="text-xs md:text-sm text-gray-200">Prestasi</div>
          </div>
        </div>
      </motion.div>

      <!-- Right Image -->
      <motion.div
        class="relative rounded-xl overflow-hidden shadow-2xl lg:[clip-path:polygon(15%_0,100%_0,100%_100%,0_100%)] min-h-[200px] md:min-h-[300px] bg-white/10 backdrop-blur-sm border border-white/20"
        :initial="{ opacity: 0, x: 50 }"
        :whileInView="{ opacity: 1, x: 0 }"
        :transition="{ duration: 0.8, delay: 0.4 }"
        :inViewOptions="{ once: true }"
      >
        <div class="relative group overflow-hidden">
          <NuxtImg
            src="/images/seragam/putih-putih/11-putih-putih-jas-l/DSC04320.webp"
            alt="Diverse students collaborating"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="eager"
            width="400"
            height="600"
            format="webp"
            quality="80"
          />
          <div class="absolute inset-0 bg-linear-to-tl from-orange-900/40 via-transparent to-blue-900/20"></div>
        </div>
      </motion.div>
    </div>
  </section>
</template>

<style scoped>
.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.3), rgba(249, 115, 22, 0.2));
  border-radius: 50%;
  pointer-events: none;
  will-change: transform, opacity;
}

.particle-1 {
  animation: particle-float-1 15s ease-in-out infinite;
}

.particle-2 {
  animation: particle-float-2 18s ease-in-out infinite;
}

.particle-3 {
  animation: particle-float-3 12s ease-in-out infinite;
}

@keyframes particle-float-1 {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.2;
  }
  50% {
    transform: translate(20px, -30px) scale(1.2);
    opacity: 0.4;
  }
}

@keyframes particle-float-2 {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.15;
  }
  50% {
    transform: translate(-15px, -25px) scale(1.1);
    opacity: 0.35;
  }
}

@keyframes particle-float-3 {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.2;
  }
  50% {
    transform: translate(10px, -20px) scale(1.15);
    opacity: 0.3;
  }
}

.hero-shapes {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.hero-shape {
  position: absolute;
  background: white;
  opacity: 0.15;
  border-radius: 50%;
  will-change: transform;
}

.hero-shape-1 {
  top: 5rem;
  left: 2.5rem;
  width: 4rem;
  height: 4rem;
  animation: float-rotate 6s ease-in-out infinite;
}

.hero-shape-2 {
  bottom: 10rem;
  right: 5rem;
  width: 3rem;
  height: 3rem;
  transform: rotate(45deg);
  animation: float-rotate 8s ease-in-out infinite 1s;
}

.hero-shape-3 {
  bottom: 10rem;
  left: 5rem;
  width: 5rem;
  height: 5rem;
  border-radius: 0.5rem;
  animation: float-rotate 7s ease-in-out infinite 2s;
}

@keyframes float-rotate {
  0%,
  100% {
    transform: translateY(0) rotate(0deg) scale(1);
  }
  50% {
    transform: translateY(-20px) rotate(180deg) scale(1.1);
  }
}

@media (max-width: 768px) {
  .hero-shapes {
    display: none;
  }
}
</style>
