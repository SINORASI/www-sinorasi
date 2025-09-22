<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface Profile {
  id: number;
  name: string;
  achievement?: string;
}

const profiles: Profile[] = [
  { id: 1, name: "Ahmad Wijaya", achievement: "Juara 1 Web Design" },
  { id: 2, name: "Lorem Ipsum", achievement: "Juara 1 Programming" },
  { id: 3, name: "Siti Nurhaliza", achievement: "Juara 1 Database" },
  { id: 4, name: "Budi Santoso", achievement: "Juara 1 Network" },
  { id: 5, name: "Rina Dewi", achievement: "Juara 1 UI/UX" },
  { id: 6, name: "Fajar Pratama", achievement: "Juara 1 Mobile Dev" },
  { id: 7, name: "Maya Sari", achievement: "Juara 1 Data Science" }
];

const currentIndex = ref<number>(1);
let autoPlayInterval: ReturnType<typeof setInterval> | null = null;

const leftProfile = computed(() => {
  const index = (currentIndex.value - 1 + profiles.length) % profiles.length;
  return profiles[index];
});

const centerProfile = computed(() => {
  return profiles[currentIndex.value];
});

const rightProfile = computed(() => {
  const index = (currentIndex.value + 1) % profiles.length;
  return profiles[index];
});

const nextSlide = (): void => {
  currentIndex.value = (currentIndex.value + 1) % profiles.length;
};

const previousSlide = (): void => {
  currentIndex.value = (currentIndex.value - 1 + profiles.length) % profiles.length;
};

const goToSlide = (index: number): void => {
  currentIndex.value = index;
};

const startAutoPlay = (): void => {
  autoPlayInterval = setInterval(nextSlide, 4000);
};

const stopAutoPlay = (): void => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
  }
};

const handleKeydown = (e: KeyboardEvent): void => {
  if (e.key === 'ArrowLeft') {
    previousSlide();
  } else if (e.key === 'ArrowRight') {
    nextSlide();
  }
};

onMounted(() => {
  startAutoPlay();
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  stopAutoPlay();
  document.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
  <div class="carousel-wrapper">
    <div 
      class="carousel-container"
      @mouseenter="stopAutoPlay"
      @mouseleave="startAutoPlay"
    >
      <button 
        class="carousel-button prev-btn"
        @click="previousSlide"
        :aria-label="'Previous profile'"
      >
        <svg 
          class="w-8 h-8" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="3" 
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <div class="carousel-content">
        <div class="profile-card side-card">
          <div class="profile-image">
            <div class="avatar-head"></div>
            <div class="avatar-body"></div>
          </div>
          <div class="profile-name">
            {{ leftProfile?.name }}
          </div>
        </div>

        <div class="profile-card main-card">
          <div class="profile-image main-image">
            <div class="avatar-head"></div>
            <div class="avatar-body"></div>
          </div>
          <div class="profile-name main-name">
            {{ centerProfile?.name }}
          </div>
        </div>

        <div class="profile-card side-card">
          <div class="profile-image">
            <div class="avatar-head"></div>
            <div class="avatar-body"></div>
          </div>
          <div class="profile-name">
            {{ rightProfile?.name }}
          </div>
        </div>
      </div>

      <button 
        class="carousel-button next-btn"
        @click="nextSlide"
        :aria-label="'Next profile'"
      >
        <svg 
          class="w-8 h-8" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="3" 
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>

    <div class="carousel-indicators">
      <button
        v-for="(profile, index) in profiles"
        :key="profile.id"
        class="indicator"
        :class="{ 'active': index === currentIndex }"
        @click="goToSlide(index)"
        :aria-label="`Go to ${profile.name}`"
      />
    </div>

    <h2 class="carousel-title">
      Juara 1 Lomba Kompetensi Siswa Tingkat Provinsi Jawa Timur
    </h2>
  </div>
</template>

<style scoped>
.carousel-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  /* background-color: #f3f4f6; */
  padding: 2rem;
}

.carousel-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
  margin-bottom: 2rem;
}

.carousel-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  background: transparent;
  border: none;
  color: #374151;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.carousel-button:hover {
  background-color: rgba(0, 0, 0, 0.1);
  transform: scale(1.1);
}

.carousel-button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.carousel-content {
  display: flex;
  align-items: center;
  gap: 2.5rem;
  perspective: 1000px;
}

.profile-card {
  background: white;
  border: 4px solid #3b82f6;
  border-radius: 0.75rem;
  padding: 2rem;
  text-align: center;
  transition: all 0.5s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  min-height: 24rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.main-card {
  transform: scale(1.1);
  z-index: 10;
  width: 20rem;
  border-color: #2563eb;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
}

.side-card {
  transform: scale(0.85);
  opacity: 0.7;
  width: 18rem;
}

.profile-image {
  position: relative;
  width: 9rem;
  height: 9rem;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  border: 4px solid white;
  overflow: hidden;
  background: linear-gradient(135deg, #a0a0a0, #d0d0d0);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.main-image {
  width: 11rem;
  height: 11rem;
}

.avatar-head {
  position: absolute;
  background-color: #4b5563;
  border-radius: 50%;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 60px;
}

.main-image .avatar-head {
  width: 70px;
  height: 70px;
}

.avatar-body {
  position: absolute;
  background-color: #4b5563;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 80px;
  border-radius: 50px 50px 0 0;
}

.main-image .avatar-body {
  width: 120px;
  height: 95px;
}

.profile-name {
  background: linear-gradient(to right, #374151, #1f2937);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 1rem;
  margin-top: 1rem;
  box-shadow: 0 5px 15px rgba(44, 62, 80, 0.3);
  letter-spacing: 0.5px;
}

.main-name {
  font-size: 1.125rem;
  padding: 1rem 2rem;
}

.carousel-indicators {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
  width: 100%;
}

.indicator {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background-color: #9ca3af;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.indicator.active {
  background-color: #3b82f6;
  transform: scale(1.25);
}

.carousel-title {
  text-align: center;
  font-size: 1.875rem;
  font-weight: bold;
  color: #1f2937;
  margin-top: 2rem;
  letter-spacing: 1px;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .carousel-content {
    gap: 1rem;
  }
  
  .side-card {
    display: none;
  }
  
  .main-card {
    width: 18rem;
    transform: scale(1);
  }
  
  .carousel-button {
    width: 3rem;
    height: 3rem;
  }
  
  .carousel-title {
    font-size: 1.5rem;
    padding: 0 1rem;
  }

  .carousel-container {
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .main-card {
    width: 16rem;
    padding: 1.5rem;
  }
  
  .profile-image {
    width: 8rem;
    height: 8rem;
  }
  
  .main-image {
    width: 9rem;
    height: 9rem;
  }
  
  .carousel-title {
    font-size: 1.25rem;
  }

  .carousel-wrapper {
    padding: 1rem;
  }
}
</style>