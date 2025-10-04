<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isLoaded = ref(false)
const progress = ref(0)
const loadingText = ref('Loading...')

onMounted(() => {
  const loadingMessages = [
    'Initializing...',
    'Loading resources...',
    'Preparing interface...',
    'Almost ready...',
    'Complete'
  ]
  
  let messageIndex = 0
  
  const interval = setInterval(() => {
    progress.value += Math.random() * 12 + 3
    
    // Update loading message based on progress
    const newMessageIndex = Math.floor((progress.value / 100) * (loadingMessages.length - 1))
    if (newMessageIndex !== messageIndex && newMessageIndex < loadingMessages.length) {
      messageIndex = newMessageIndex
      loadingText.value = loadingMessages[messageIndex] || 'Loading...'
    }
    
    if (progress.value >= 100) {
      progress.value = 100
      loadingText.value = 'Complete'
      clearInterval(interval)
      setTimeout(() => {
        isLoaded.value = true
      }, 800)
    }
  }, 180)
})
</script>

<template>
  <div class="apple-loader">
    <!-- Background -->
    <div class="loader-background"></div>
    
    <!-- Main Content Container -->
    <div class="content-container">
      <!-- Logo Section -->
      <div class="logo-section">
        <!-- SMKN2SGS Logo -->
        <div class="logo-wrapper">
          <div class="logo-container">
            <img 
              src="/images/logo.webp" 
              alt="SMKN 2 Singosari"
              class="logo-image smkn-logo"
            />
          </div>
        </div>
        
        <!-- Elegant Separator -->
        <div class="separator">
          <div class="separator-line"></div>
          <div class="separator-symbol">×</div>
          <div class="separator-line"></div>
        </div>
        
        <!-- SINORASI Logo -->
        <div class="logo-wrapper">
          <div class="logo-container">
            <img 
              src="/images/sinorasi-logo-transparent.png" 
              alt="SINORASI"
              class="logo-image sinorasi-logo"
            />
          </div>
        </div>
      </div>
      
      <!-- Text Section -->
      <div class="text-section">
        <h1 class="main-title">SMKN2SGS × SINORASI</h1>
        <p class="subtitle">Excellence in Digital Education</p>
      </div>
      
      <!-- Progress Section -->
      <div class="progress-section">
        <!-- Apple-style Progress Ring -->
        <div class="progress-ring-container">
          <svg class="progress-ring" width="60" height="60">
            <circle
              class="progress-ring-background"
              cx="30"
              cy="30"
              r="25"
              fill="none"
              stroke="rgba(255, 138, 0, 0.2)"
              stroke-width="3"
            />
            <circle
              class="progress-ring-progress"
              cx="30"
              cy="30"
              r="25"
              fill="none"
              stroke="#FF8A00"
              stroke-width="3"
              stroke-linecap="round"
              :stroke-dasharray="`${2 * Math.PI * 25}`"
              :stroke-dashoffset="`${2 * Math.PI * 25 * (1 - progress / 100)}`"
            />
          </svg>
          <div class="progress-percentage">{{ Math.round(progress) }}%</div>
        </div>
        
        <!-- Loading Text -->
        <div class="loading-status">{{ loadingText }}</div>
      </div>
    </div>
    
    <!-- Subtle Animation Overlay -->
    <div class="ambient-overlay">
      <div class="ambient-particle" v-for="i in 8" :key="i" 
           :style="{ 
             '--delay': `${i * 2}s`,
             '--duration': `${8 + Math.random() * 4}s`
           }"></div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=SF+Pro+Display:wght@300;400;500;600;700&display=swap');

.apple-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  overflow: hidden;
  z-index: 9999;
}

.loader-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 25% 25%, rgba(255, 138, 0, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(255, 138, 0, 0.06) 0%, transparent 50%);
}

.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  max-width: 400px;
  padding: 2rem;
  animation: contentFadeIn 1s ease-out;
}

/* Logo Section */
.logo-section {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 1rem;
}

.logo-wrapper {
  position: relative;
}

.logo-container {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 138, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 
    0 8px 32px rgba(255, 138, 0, 0.1),
    0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  animation: logoFloat 3s ease-in-out infinite;
}

.logo-container:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 12px 40px rgba(255, 138, 0, 0.15),
    0 4px 12px rgba(0, 0, 0, 0.08);
}

.logo-image {
  width: 50px;
  height: 50px;
  object-fit: contain;
  filter: brightness(1.1) contrast(1.05);
  transition: all 0.3s ease;
}

.sinorasi-logo {
  animation: gentleRotate 8s linear infinite;
}

/* Elegant Separator */
.separator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  opacity: 0.6;
}

.separator-line {
  width: 24px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #FF8A00, transparent);
  animation: lineGlow 2s ease-in-out infinite alternate;
}

.separator-symbol {
  font-size: 1.2rem;
  color: #FF8A00;
  font-weight: 300;
  animation: symbolPulse 2s ease-in-out infinite;
}

/* Text Section */
.text-section {
  text-align: center;
  margin-bottom: 1rem;
}

.main-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: #1d1d1f;
  margin-bottom: 0.5rem;
  letter-spacing: -0.5px;
  animation: titleSlide 1s ease-out 0.3s both;
}

.subtitle {
  font-size: 1rem;
  font-weight: 400;
  color: #86868b;
  margin: 0;
  letter-spacing: 0.2px;
  animation: subtitleSlide 1s ease-out 0.6s both;
}

/* Progress Section */
.progress-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.progress-ring-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-ring {
  transform: rotate(-90deg);
  animation: ringRotate 2s ease-in-out infinite;
}

.progress-ring-progress {
  transition: stroke-dashoffset 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  filter: drop-shadow(0 0 4px rgba(255, 138, 0, 0.3));
}

.progress-percentage {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.875rem;
  font-weight: 500;
  color: #FF8A00;
  letter-spacing: -0.2px;
}

.loading-status {
  font-size: 0.875rem;
  font-weight: 400;
  color: #86868b;
  text-align: center;
  letter-spacing: 0.1px;
  min-height: 1.2rem;
  animation: statusFade 0.5s ease-out;
}

/* Ambient Overlay */
.ambient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.ambient-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, rgba(255, 138, 0, 0.4) 0%, transparent 70%);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  animation: ambientFloat var(--duration) ease-in-out infinite;
  animation-delay: var(--delay);
}

/* Animations */
@keyframes contentFadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes logoFloat {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-4px);
  }
}

@keyframes gentleRotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes lineGlow {
  0% {
    opacity: 0.4;
  }
  100% {
    opacity: 0.8;
  }
}

@keyframes symbolPulse {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}

@keyframes titleSlide {
  0% {
    opacity: 0;
    transform: translateY(15px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes subtitleSlide {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes ringRotate {
  0%, 100% {
    transform: rotate(-90deg) scale(1);
  }
  50% {
    transform: rotate(-90deg) scale(1.02);
  }
}

@keyframes statusFade {
  0% {
    opacity: 0;
    transform: translateY(5px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes ambientFloat {
  0%, 100% {
    transform: translate(-50%, -50%) translateX(0px) translateY(0px);
    opacity: 0;
  }
  25% {
    opacity: 0.6;
  }
  50% {
    transform: translate(-50%, -50%) translateX(60px) translateY(-30px);
    opacity: 0.8;
  }
  75% {
    opacity: 0.4;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .content-container {
    gap: 2.5rem;
    padding: 1.5rem;
    max-width: 320px;
  }
  
  .logo-section {
    gap: 1.5rem;
  }
  
  .logo-container {
    width: 70px;
    height: 70px;
    border-radius: 18px;
  }
  
  .logo-image {
    width: 44px;
    height: 44px;
  }
  
  .main-title {
    font-size: 1.5rem;
  }
  
  .subtitle {
    font-size: 0.9rem;
  }
  
  .separator-line {
    width: 20px;
  }
}

@media (max-width: 480px) {
  .content-container {
    gap: 2rem;
    padding: 1rem;
  }
  
  .logo-section {
    flex-direction: column;
    gap: 1rem;
  }
  
  .separator {
    transform: rotate(90deg);
  }
  
  .main-title {
    font-size: 1.25rem;
    line-height: 1.3;
  }
  
  .subtitle {
    font-size: 0.85rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .apple-loader {
    background: linear-gradient(135deg, #1c1c1e 0%, #000000 100%);
  }
  
  .loader-background {
    background: 
      radial-gradient(circle at 25% 25%, rgba(255, 138, 0, 0.12) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(255, 138, 0, 0.08) 0%, transparent 50%);
  }
  
  .logo-container {
    background: rgba(28, 28, 30, 0.9);
    border: 1px solid rgba(255, 138, 0, 0.3);
    box-shadow: 
      0 8px 32px rgba(255, 138, 0, 0.15),
      0 2px 8px rgba(0, 0, 0, 0.3);
  }
  
  .main-title {
    color: #f5f5f7;
  }
  
  .subtitle {
    color: #a1a1a6;
  }
  
  .loading-status {
    color: #a1a1a6;
  }
}
</style>