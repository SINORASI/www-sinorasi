<script setup lang="ts">
import { ref, computed } from 'vue';
import type { MajorName } from '~/models/MajorName';

interface Achievement {
  id: number;
  title: string;
  description: string;
  studentName: string;
  year: number;
}

const route = useRoute();
const major = route.params.majorName as MajorName;

const { data: achievementsData } = await useFetch<Achievement[]>(`/api/achievements?major=${major}`);

const currentIndex = ref<number>(0);
const selectedAchievement = ref<Achievement | null>(null);
const slideDirection = ref<'left' | 'right' | ''>('');

const achievements = computed(() => achievementsData.value || []);

const currentAchievement = computed(() => {
  if (achievements.value.length === 0) return null;
  return achievements.value[currentIndex.value];
});

const leftAchievement = computed(() => {
  if (achievements.value.length === 0) return null;
  const total = achievements.value.length;
  const prevIndex = (currentIndex.value - 1 + total) % total;
  return achievements.value[prevIndex];
});

const rightAchievement = computed(() => {
  if (achievements.value.length === 0) return null;
  const total = achievements.value.length;
  const nextIndex = (currentIndex.value + 1) % total;
  return achievements.value[nextIndex];
});

const nextSlide = (): void => {
  if (achievements.value.length > 0) {
    slideDirection.value = 'left';
    currentIndex.value = (currentIndex.value + 1) % achievements.value.length;
    setTimeout(() => {
      slideDirection.value = '';
    }, 600);
  }
};

const previousSlide = (): void => {
  if (achievements.value.length > 0) {
    slideDirection.value = 'right';
    currentIndex.value = (currentIndex.value - 1 + achievements.value.length) % achievements.value.length;
    setTimeout(() => {
      slideDirection.value = '';
    }, 600);
  }
};

const openModal = (achievement: Achievement): void => {
  selectedAchievement.value = achievement;
};

const closeModal = (): void => {
  selectedAchievement.value = null;
};
</script>

<template>
  <div class="achievement-section">
    <div class="container">
      <!-- Carousel -->
      <div class="carousel-container">
        <button 
          class="nav-btn prev-btn"
          @click.prevent="previousSlide"
          :disabled="achievements.length === 0"
        >
          <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <!-- Left blur card -->
        <div 
          class="blur-card left" 
          v-if="leftAchievement"
          :class="{ 'slide-from-left': slideDirection === 'right', 'slide-to-left': slideDirection === 'left' }"
        >
          <div class="card-image">
            <div class="avatar-container">
              <div class="avatar-head"></div>
              <div class="avatar-body"></div>
            </div>
          </div>
          <div class="card-name">
            {{ leftAchievement.studentName }}
          </div>
        </div>

        <div class="card-wrapper" v-if="currentAchievement">
          <div 
            class="achievement-card"
            :class="{ 'slide-from-right': slideDirection === 'left', 'slide-from-left': slideDirection === 'right' }"
            @click="openModal(currentAchievement)"
          >
            <div class="card-image">
              <div class="avatar-container">
                <div class="avatar-head"></div>
                <div class="avatar-body"></div>
              </div>
            </div>
            <div class="card-name">
              {{ currentAchievement.studentName }}
            </div>
          </div>
        </div>

        <!-- Right blur card -->
        <div 
          class="blur-card right" 
          v-if="rightAchievement"
          :class="{ 'slide-from-right': slideDirection === 'left', 'slide-to-right': slideDirection === 'right' }"
        >
          <div class="card-image">
            <div class="avatar-container">
              <div class="avatar-head"></div>
              <div class="avatar-body"></div>
            </div>
          </div>
          <div class="card-name">
            {{ rightAchievement.studentName }}
          </div>
        </div>

        <button 
          class="nav-btn next-btn"
          @click.prevent="nextSlide"
          :disabled="achievements.length === 0"
        >
          <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <!-- Title -->
      <div class="achievement-title" v-if="currentAchievement">
        {{ currentAchievement.title }}
      </div>

      <!-- Modal Content -->
      <div class="modal-overlay" v-if="selectedAchievement" @click="closeModal">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3 class="modal-title">{{ selectedAchievement.title }}</h3>
            <button class="close-btn" @click.prevent="closeModal">
              <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="modal-body">
            <div class="modal-card">
              <div class="card-image">
                <div class="avatar-container">
                  <div class="avatar-head"></div>
                  <div class="avatar-body"></div>
                </div>
              </div>
              <div class="card-name">
                {{ selectedAchievement.studentName }}
              </div>
            </div>

            <div class="modal-info">
              <p class="modal-subtitle">{{ selectedAchievement.studentName }} - {{ selectedAchievement.year }}</p>
              <p class="modal-description">{{ selectedAchievement.description }}</p>
              <p class="modal-description">{{ selectedAchievement.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.achievement-section {
  background: white;
  padding: 3rem 1.5rem;
  min-height: 700px;
}

.container {
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
}

/* Carousel */
.carousel-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  max-width: 1800px;
  overflow: hidden;
  position: relative;
}

.nav-btn {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #e5e7eb;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
  z-index: 10;
}

.nav-btn .icon {
  width: 26px;
  height: 26px;
  color: #374151;
}

.nav-btn:hover:not(:disabled) {
  background: #d1d5db;
  transform: scale(1.1);
}

.nav-btn:active:not(:disabled) {
  transform: scale(0.95);
}

.nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.blur-card {
  width: 100%;
  max-width: 450px;
  background: white;
  border: 5px solid #f97316;
  border-radius: 14px;
  overflow: hidden;
  opacity: 0.35;
  filter: blur(2px);
  transform: scale(0.92);
  pointer-events: none;
  flex-shrink: 0;
  transition: all 0.5s ease;
}

.blur-card .card-image {
  height: 520px;
}

.blur-card .avatar-head {
  width: 110px;
  height: 110px;
}

.blur-card .avatar-body {
  width: 170px;
  height: 135px;
  border-radius: 85px 85px 0 0;
}

.blur-card .card-name {
  padding: 1.25rem;
  font-size: 1.25rem;
}

.card-wrapper {
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 450px;
}

.achievement-card {
  width: 100%;
  max-width: 450px;
  background: white;
  border: 5px solid #f97316;
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s ease;
  box-shadow: 0 8px 16px -2px rgba(0, 0, 0, 0.12);
}

.achievement-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.18);
}

/* Slide Animations */
@keyframes slideFromRight {
  0% {
    opacity: 0;
    transform: translateX(120%) scale(0.92);
  }
  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes slideFromLeft {
  0% {
    opacity: 0;
    transform: translateX(-120%) scale(0.92);
  }
  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes slideToLeft {
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-120%);
  }
}

@keyframes slideToRight {
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(120%);
  }
}

@keyframes blurSlideFromRight {
  0% {
    opacity: 0;
    transform: translateX(100%) scale(0.92);
  }
  100% {
    opacity: 0.35;
    transform: translateX(0) scale(0.92);
  }
}

@keyframes blurSlideFromLeft {
  0% {
    opacity: 0;
    transform: translateX(-100%) scale(0.92);
  }
  100% {
    opacity: 0.35;
    transform: translateX(0) scale(0.92);
  }
}

@keyframes blurSlideToLeft {
  0% {
    opacity: 0.35;
    transform: translateX(0) scale(0.92);
  }
  100% {
    opacity: 0;
    transform: translateX(-100%) scale(0.92);
  }
}

@keyframes blurSlideToRight {
  0% {
    opacity: 0.35;
    transform: translateX(0) scale(0.92);
  }
  100% {
    opacity: 0;
    transform: translateX(100%) scale(0.92);
  }
}

.slide-from-right {
  animation: slideFromRight 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-from-left {
  animation: slideFromLeft 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-to-left {
  animation: slideToLeft 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-to-right {
  animation: slideToRight 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.blur-card.slide-from-right {
  animation: blurSlideFromRight 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.blur-card.slide-from-left {
  animation: blurSlideFromLeft 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.blur-card.slide-to-left {
  animation: blurSlideToLeft 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.blur-card.slide-to-right {
  animation: blurSlideToRight 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.card-image {
  background: #e5e7eb;
  height: 520px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.avatar-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-head {
  position: absolute;
  background-color: #9ca3af;
  border-radius: 50%;
  width: 110px;
  height: 110px;
  top: 33%;
  left: 50%;
  transform: translateX(-50%);
}

.avatar-body {
  position: absolute;
  background-color: #9ca3af;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  width: 170px;
  height: 135px;
  border-radius: 85px 85px 0 0;
}

.card-name {
  background: #374151;
  color: white;
  padding: 1.25rem;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
}

/* Title */
.achievement-title {
  text-align: center;
  font-size: 1.375rem;
  font-weight: 700;
  color: #1f2937;
  line-height: 1.6;
  max-width: 1100px;
  padding: 0 2rem;
  margin-top: 0.5rem;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  animation: fadeInOverlay 0.3s ease-out;
}

@keyframes fadeInOverlay {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-content {
  background: white;
  border-radius: 14px;
  max-width: 950px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  animation: modalSlideIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 2rem;
  border-bottom: 2px solid #e5e7eb;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  line-height: 1.4;
  flex: 1;
}

.close-btn {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #f3f4f6;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.close-btn .icon {
  width: 22px;
  height: 22px;
  color: #6b7280;
}

.close-btn:hover {
  background: #e5e7eb;
  transform: rotate(90deg);
}

.close-btn:active {
  transform: scale(0.95) rotate(90deg);
}

.modal-body {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.modal-card {
  width: 100%;
  max-width: 450px;
  background: white;
  border: 5px solid #f97316;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 8px 16px -2px rgba(0, 0, 0, 0.12);
}

.modal-card .card-image {
  height: 520px;
}

.modal-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.modal-subtitle {
  font-size: 1.125rem;
  font-weight: 600;
  color: #4b5563;
  text-align: center;
}

.modal-description {
  font-size: 1rem;
  line-height: 1.8;
  color: #374151;
  text-align: justify;
}

/* Responsive */
@media (max-width: 1024px) {
  .blur-card,
  .card-wrapper,
  .achievement-card,
  .modal-card {
    max-width: 360px;
  }

  .card-image,
  .blur-card .card-image,
  .modal-card .card-image {
    height: 440px;
  }

  .avatar-head,
  .blur-card .avatar-head {
    width: 95px;
    height: 95px;
  }

  .avatar-body,
  .blur-card .avatar-body {
    width: 145px;
    height: 115px;
    border-radius: 72px 72px 0 0;
  }

  .card-name,
  .blur-card .card-name {
    padding: 1.125rem;
    font-size: 1.125rem;
  }
}

@media (max-width: 768px) {
  .achievement-section {
    padding: 2.5rem 1rem;
  }

  .carousel-container {
    gap: 1rem;
  }

  .nav-btn {
    width: 46px;
    height: 46px;
  }

  .nav-btn .icon {
    width: 22px;
    height: 22px;
  }

  .blur-card {
    display: none;
  }

  .card-wrapper,
  .achievement-card,
  .modal-card {
    max-width: 340px;
  }

  .card-image,
  .modal-card .card-image {
    height: 400px;
  }

  .avatar-head {
    width: 85px;
    height: 85px;
  }

  .avatar-body {
    width: 130px;
    height: 105px;
    border-radius: 65px 65px 0 0;
  }

  .card-name {
    padding: 1rem;
    font-size: 1.125rem;
  }

  .achievement-title {
    font-size: 1.125rem;
  }

  .modal-header {
    padding: 1.75rem;
  }

  .modal-title {
    font-size: 1.25rem;
  }

  .modal-body {
    padding: 1.75rem;
  }
}

@media (max-width: 480px) {
  .carousel-container {
    gap: 0.75rem;
  }

  .nav-btn {
    width: 42px;
    height: 42px;
  }

  .card-wrapper,
  .achievement-card,
  .modal-card {
    max-width: 280px;
  }

  .card-image,
  .modal-card .card-image {
    height: 340px;
  }

  .avatar-head {
    width: 75px;
    height: 75px;
  }

  .avatar-body {
    width: 120px;
    height: 95px;
    border-radius: 60px 60px 0 0;
  }

  .card-name {
    padding: 0.875rem;
    font-size: 1rem;
  }

  .achievement-title {
    font-size: 1rem;
    padding: 0 1rem;
  }
}
</style>