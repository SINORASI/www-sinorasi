<!-- @ts-nocheck -->
<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useMinigameState } from "~/composables/useMinigameState";

const emit = defineEmits(["close"]);

// Get minigame state from parent
const minigameState = useMinigameState();

// Game state
const iso = ref(400);
const aperture = ref(8);
const shutterSpeed = ref(250);
const currentScenarioIndex = ref(0);
const hasSubmitted = ref(false);
const score = ref(0);
const showResult = ref(false);

// Photography scenarios with different lighting conditions
const scenarios = [
  {
    id: 1,
    name: "Bright Daylight",
    image: "/images/major/hero-major-ornament/bc/camera.webp",
    description: "Outdoor scene with full sun",
    targetISO: 200,
    targetAperture: 11,
    targetShutter: 500,
    difficulty: "Easy",
  },
  {
    id: 2,
    name: "Golden Hour",
    image: "/images/major/hero-major-ornament/bc/film-clip.webp",
    description: "Warm sunset lighting",
    targetISO: 400,
    targetAperture: 5.6,
    targetShutter: 250,
    difficulty: "Medium",
  },
  {
    id: 3,
    name: "Indoor Studio",
    image: "/images/majorIcon/logo-bc.webp",
    description: "Controlled artificial lighting",
    targetISO: 800,
    targetAperture: 4,
    targetShutter: 125,
    difficulty: "Hard",
  },
];

// ISO values (standard stops)
const isoValues = [100, 200, 400, 800, 1600, 3200, 6400];
const isoMin = 0;
const isoMax = isoValues.length - 1;

// Aperture values (f-stops)
const apertureValues = [1.4, 2, 2.8, 4, 5.6, 8, 11, 16, 22];
const apertureMin = 0;
const apertureMax = apertureValues.length - 1;

// Shutter speed values (1/x seconds)
const shutterValues = [30, 60, 125, 250, 500, 1000, 2000, 4000];
const shutterMin = 0;
const shutterMax = shutterValues.length - 1;

// Current scenario
const currentScenario = computed(() => scenarios[currentScenarioIndex.value]!);

// Calculate exposure value (EV) - simplified photography formula
// EV = log2(N² / t) where N = aperture, t = shutter time in seconds
// Adjusted for ISO sensitivity
const calculateEV = (isoVal: number, apertureVal: number, shutterVal: number) => {
  // Convert slider values to actual camera settings
  const isoActual = isoValues[Math.round(isoVal)]!;
  const apertureActual = apertureValues[Math.round(apertureVal)]!;
  const shutterActual = shutterValues[Math.round(shutterVal)]!;

  // Simple EV calculation (normalized for game purposes)
  const isoFactor = isoActual / 100;
  const apertureFactor = apertureActual * apertureActual;
  const shutterFactor = 1000 / shutterActual;

  return (isoFactor * shutterFactor) / apertureFactor;
};

const currentEV = computed(() => {
  return calculateEV(iso.value, aperture.value, shutterSpeed.value);
});

const targetEV = computed(() => {
  const scenario = currentScenario.value!;
  const targetIsoIndex = isoValues.indexOf(scenario.targetISO);
  const targetApertureIndex = apertureValues.indexOf(scenario.targetAperture);
  const targetShutterIndex = shutterValues.indexOf(scenario.targetShutter);

  return calculateEV(targetIsoIndex, targetApertureIndex, targetShutterIndex);
});

// Calculate how close the current settings are to perfect (0-100%)
const exposureAccuracy = computed(() => {
  const difference = Math.abs(currentEV.value - targetEV.value);
  const maxDifference = 10; // Maximum expected difference
  const accuracy = Math.max(0, 100 - (difference / maxDifference) * 100);
  return Math.round(accuracy);
});

// Visual feedback based on exposure
const viewfinderStyle = computed(() => {
  const accuracy = exposureAccuracy.value;

  // Brightness adjustment
  let brightness = 50 + (accuracy / 100) * 50; // 50% to 100%

  // Too bright or too dark based on deviation
  const evDiff = currentEV.value - targetEV.value;
  if (evDiff > 2) brightness += 30; // Overexposed
  if (evDiff < -2) brightness -= 30; // Underexposed

  brightness = Math.max(20, Math.min(150, brightness));

  // Blur if settings are way off
  const blur = accuracy < 50 ? (50 - accuracy) / 10 : 0;

  return {
    filter: `brightness(${brightness}%) blur(${blur}px)`,
    transition: "filter 0.3s ease",
  };
});

// Get current values as actual camera settings
const currentISO = computed(() => isoValues[Math.round(iso.value)]);
const currentAperture = computed(() => apertureValues[Math.round(aperture.value)]);
const currentShutter = computed(() => shutterValues[Math.round(shutterSpeed.value)]);

// Result message based on accuracy
const resultMessage = computed(() => {
  const accuracy = exposureAccuracy.value;
  if (accuracy >= 90) return { text: "Perfect Shot! 📸", color: "#10B981", grade: "A+" };
  if (accuracy >= 75) return { text: "Great Exposure! 👍", color: "#3B82F6", grade: "A" };
  if (accuracy >= 60) return { text: "Good Attempt! 😊", color: "#F59E0B", grade: "B" };
  if (accuracy >= 40) return { text: "Needs Adjustment 🤔", color: "#EF4444", grade: "C" };
  return { text: "Try Again! 💪", color: "#DC2626", grade: "D" };
});

const isFullscreen = ref(false);

// Exit fullscreen
const exitFullscreen = async () => {
  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    }
    // Re-enable body scroll when exiting fullscreen
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    minigameState.setIsRunning(false);
  } catch (error) {
    console.error("Error exiting fullscreen:", error);
    // Re-enable body scroll even if error occurs
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    minigameState.setIsRunning(false);
  }
};

// Handle fullscreen change
const handleFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement;
  if (!isFullscreen.value) {
    // Re-enable body scroll when exiting fullscreen
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    minigameState.setIsRunning(false);
    emit("close");
  }
};

// Enter fullscreen
const enterFullscreen = async () => {
  const container = document.documentElement;
  if (container) {
    try {
      await container.requestFullscreen();
      isFullscreen.value = true;
      // Disable body scroll when fullscreen is active
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } catch (error) {
      console.warn("Fullscreen request failed, continuing without fullscreen:", error);
      isFullscreen.value = false;
    }
    // Always set game as running, whether fullscreen succeeded or not
    minigameState.setIsRunning(true);
  }
};

// Take photo and show results
const takePhoto = () => {
  hasSubmitted.value = true;
  showResult.value = true;
  score.value = exposureAccuracy.value;

  // Camera shutter animation sound (visual feedback)
  setTimeout(() => {
    showResult.value = true;
  }, 300);
};

// Reset current scenario
const resetSettings = () => {
  iso.value = Math.floor(isoValues.length / 2);
  aperture.value = Math.floor(apertureValues.length / 2);
  shutterSpeed.value = Math.floor(shutterValues.length / 2);
  hasSubmitted.value = false;
  showResult.value = false;
  score.value = 0;
};

// Next scenario
const nextScenario = () => {
  if (currentScenarioIndex.value < scenarios.length - 1) {
    currentScenarioIndex.value++;
    resetSettings();
  }
};

// Previous scenario
const previousScenario = () => {
  if (currentScenarioIndex.value > 0) {
    currentScenarioIndex.value--;
    resetSettings();
  }
};

// Keyboard shortcuts
const handleKeyPress = (event: KeyboardEvent) => {
  if (event.key === " " || event.key === "Enter") {
    event.preventDefault();
    if (!hasSubmitted.value) {
      takePhoto();
    } else {
      resetSettings();
    }
  } else if (event.key === "r" || event.key === "R") {
    resetSettings();
  } else if (event.key === "ArrowRight") {
    nextScenario();
  } else if (event.key === "ArrowLeft") {
    previousScenario();
  }
};

onMounted(() => {
  enterFullscreen();
  resetSettings();
  window.addEventListener("keydown", handleKeyPress);
  document.addEventListener("fullscreenchange", handleFullscreenChange);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyPress);
  document.removeEventListener("fullscreenchange", handleFullscreenChange);
});
</script>

<template>
  <div class="fixed inset-0 z-50 flex flex-col bg-linear-to-br from-gray-900 via-gray-800 to-black">
    <!-- Header -->
    <div class="flex items-center justify-between p-4 bg-gray-900 shadow-lg md:p-6">
      <div class="flex items-center gap-3">
        <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-r from-red-500 to-orange-500">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <div>
          <h1 class="text-lg font-bold text-white md:text-2xl">BC Photo Simulator</h1>
          <p class="text-xs text-gray-400 md:text-sm">Master the Exposure Triangle</p>
        </div>
      </div>

      <button
        @click="exitFullscreen"
        class="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 rounded-lg bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 hover:shadow-lg"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <span class="hidden md:inline">Exit</span>
      </button>
    </div>

    <!-- Main Content -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Left Side - Viewfinder -->
      <div class="flex flex-col items-center justify-center flex-1 p-4 md:p-8">
        <div class="w-full max-w-3xl space-y-4">
          <!-- Scenario Info -->
          <div class="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div>
              <h3 class="text-lg font-bold text-white">{{ currentScenario.name }}</h3>
              <p class="text-sm text-gray-400">{{ currentScenario.description }}</p>
            </div>
            <div
              class="px-3 py-1 text-xs font-bold text-white rounded-full"
              :class="{
                'bg-green-500': currentScenario.difficulty === 'Easy',
                'bg-yellow-500': currentScenario.difficulty === 'Medium',
                'bg-red-500': currentScenario.difficulty === 'Hard',
              }"
            >
              {{ currentScenario.difficulty }}
            </div>
          </div>

          <!-- Viewfinder -->
          <div class="relative overflow-hidden bg-black border-4 border-gray-700 rounded-lg aspect-video shadow-2xl">
            <!-- Image with dynamic filter -->
            <div class="flex items-center justify-center w-full h-full p-8" :style="viewfinderStyle">
              <img
                :src="currentScenario.image"
                :alt="currentScenario.name"
                class="object-contain max-w-full max-h-full"
              />
            </div>

            <!-- Viewfinder overlay grid -->
            <div class="absolute inset-0 pointer-events-none">
              <!-- Rule of thirds grid -->
              <div class="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-30">
                <div class="border border-white"></div>
                <div class="border border-white"></div>
                <div class="border border-white"></div>
                <div class="border border-white"></div>
                <div class="border border-white"></div>
                <div class="border border-white"></div>
                <div class="border border-white"></div>
                <div class="border border-white"></div>
                <div class="border border-white"></div>
              </div>

              <!-- Camera info overlay -->
              <div
                class="absolute flex items-center gap-2 p-2 text-xs font-mono text-white bg-black rounded top-2 left-2 bg-opacity-70"
              >
                <span>ISO {{ currentISO }}</span>
                <span>•</span>
                <span>f/{{ currentAperture }}</span>
                <span>•</span>
                <span>1/{{ currentShutter }}</span>
              </div>

              <!-- Exposure meter indicator -->
              <div class="absolute p-2 bg-black rounded bottom-2 left-2 bg-opacity-70">
                <div class="flex items-center gap-2">
                  <div class="text-xs font-bold text-white">EV</div>
                  <div class="flex gap-1">
                    <div
                      v-for="i in 5"
                      :key="i"
                      class="w-2 h-4 border border-white"
                      :class="{
                        'bg-red-500': exposureAccuracy < 40 && i <= 2,
                        'bg-yellow-500': exposureAccuracy >= 40 && exposureAccuracy < 75 && i <= 3,
                        'bg-green-500': exposureAccuracy >= 75 && i <= Math.ceil(exposureAccuracy / 20),
                      }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Shutter animation -->
            <div
              v-if="hasSubmitted && !showResult"
              class="absolute inset-0 bg-white animate-pulse"
              style="animation-duration: 0.3s"
            ></div>
          </div>

          <!-- Exposure Meter Bar -->
          <div class="p-4 space-y-2 bg-gray-800 rounded-lg">
            <div class="flex items-center justify-between">
              <span class="text-sm font-semibold text-gray-300">Exposure Accuracy</span>
              <span class="text-lg font-bold text-white">{{ exposureAccuracy }}%</span>
            </div>
            <div class="h-6 overflow-hidden bg-gray-700 rounded-full">
              <div
                class="h-full transition-all duration-300 rounded-full"
                :style="{
                  width: `${exposureAccuracy}%`,
                  background:
                    exposureAccuracy >= 75
                      ? 'linear-gradient(90deg, #10B981, #34D399)'
                      : exposureAccuracy >= 50
                      ? 'linear-gradient(90deg, #F59E0B, #FBBF24)'
                      : 'linear-gradient(90deg, #EF4444, #F87171)',
                }"
              ></div>
            </div>
          </div>

          <!-- Result Display -->
          <div
            v-if="showResult"
            class="p-6 text-center border-2 rounded-lg animate-bounce-in"
            :style="{ borderColor: resultMessage.color, backgroundColor: resultMessage.color + '20' }"
          >
            <div class="text-4xl font-black md:text-6xl" :style="{ color: resultMessage.color }">
              {{ resultMessage.grade }}
            </div>
            <div class="mt-2 text-xl font-bold text-white md:text-2xl">
              {{ resultMessage.text }}
            </div>
            <div class="mt-1 text-sm text-gray-300">Score: {{ score }}%</div>
          </div>
        </div>
      </div>

      <!-- Right Side - Controls -->
      <div class="w-full p-4 overflow-y-auto bg-gray-900 md:w-96 md:p-6">
        <div class="space-y-6">
          <!-- ISO Control -->
          <div class="p-4 bg-gray-800 rounded-lg">
            <div class="flex items-center justify-between mb-3">
              <label class="text-sm font-bold text-gray-300">ISO Sensitivity</label>
              <span class="text-2xl font-bold text-white">{{ currentISO }}</span>
            </div>
            <input
              v-model.number="iso"
              type="range"
              :min="isoMin"
              :max="isoMax"
              step="0.1"
              class="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-red"
              :disabled="hasSubmitted"
            />
            <div class="flex justify-between mt-2 text-xs text-gray-500">
              <span>100</span>
              <span class="text-gray-400">Light Sensitivity</span>
              <span>6400</span>
            </div>
          </div>

          <!-- Aperture Control -->
          <div class="p-4 bg-gray-800 rounded-lg">
            <div class="flex items-center justify-between mb-3">
              <label class="text-sm font-bold text-gray-300">Aperture (f-stop)</label>
              <span class="text-2xl font-bold text-white">f/{{ currentAperture }}</span>
            </div>
            <input
              v-model.number="aperture"
              type="range"
              :min="apertureMin"
              :max="apertureMax"
              step="0.1"
              class="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-orange"
              :disabled="hasSubmitted"
            />
            <div class="flex justify-between mt-2 text-xs text-gray-500">
              <span>f/1.4</span>
              <span class="text-gray-400">Depth of Field</span>
              <span>f/22</span>
            </div>
          </div>

          <!-- Shutter Speed Control -->
          <div class="p-4 bg-gray-800 rounded-lg">
            <div class="flex items-center justify-between mb-3">
              <label class="text-sm font-bold text-gray-300">Shutter Speed</label>
              <span class="text-2xl font-bold text-white">1/{{ currentShutter }}</span>
            </div>
            <input
              v-model.number="shutterSpeed"
              type="range"
              :min="shutterMin"
              :max="shutterMax"
              step="0.1"
              class="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-blue"
              :disabled="hasSubmitted"
            />
            <div class="flex justify-between mt-2 text-xs text-gray-500">
              <span>1/30s</span>
              <span class="text-gray-400">Motion Freeze</span>
              <span>1/4000s</span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="space-y-3">
            <button
              v-if="!hasSubmitted"
              @click="takePhoto"
              class="w-full py-4 text-lg font-bold text-white transition-all duration-300 transform rounded-lg shadow-lg bg-linear-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 hover:scale-105 hover:shadow-xl"
            >
              📸 Take Photo
            </button>

            <button
              v-else
              @click="resetSettings"
              class="w-full py-4 text-lg font-bold text-white transition-all duration-300 transform rounded-lg shadow-lg bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:scale-105"
            >
              🔄 Try Again
            </button>

            <div class="grid grid-cols-2 gap-3">
              <button
                @click="previousScenario"
                :disabled="currentScenarioIndex === 0"
                class="py-2 text-sm font-semibold text-white transition-all duration-200 bg-gray-700 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>
              <button
                @click="nextScenario"
                :disabled="currentScenarioIndex === scenarios.length - 1"
                class="py-2 text-sm font-semibold text-white transition-all duration-200 bg-gray-700 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            </div>
          </div>

          <!-- Tips -->
          <div class="p-4 border-2 border-red-500 rounded-lg bg-red-500 bg-opacity-10">
            <h4 class="mb-2 text-sm font-bold text-red-400">💡 Pro Tips:</h4>
            <ul class="space-y-1 text-xs text-gray-300">
              <li>• <strong>ISO:</strong> Higher = brighter, but more noise</li>
              <li>• <strong>Aperture:</strong> Lower f-number = more light, shallow DOF</li>
              <li>• <strong>Shutter:</strong> Faster = less light, freeze motion</li>
              <li>• Watch the exposure meter for feedback!</li>
              <li>• Press <kbd class="px-1 text-xs bg-gray-700 rounded">Space</kbd> to shoot</li>
            </ul>
          </div>

          <!-- Scenario Progress -->
          <div class="p-4 bg-gray-800 rounded-lg">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-semibold text-gray-300">Scenario Progress</span>
              <span class="text-sm text-white">{{ currentScenarioIndex + 1 }} / {{ scenarios.length }}</span>
            </div>
            <div class="flex gap-2">
              <div
                v-for="(scenario, index) in scenarios"
                :key="scenario.id"
                class="flex-1 h-2 rounded-full"
                :class="index === currentScenarioIndex ? 'bg-red-500' : 'bg-gray-700'"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom range slider styles */
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid white;
}

input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid white;
}

.slider-red::-webkit-slider-thumb {
  background: linear-gradient(135deg, #ef4444, #dc2626);
}

.slider-red::-moz-range-thumb {
  background: linear-gradient(135deg, #ef4444, #dc2626);
}

.slider-orange::-webkit-slider-thumb {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.slider-orange::-moz-range-thumb {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.slider-blue::-webkit-slider-thumb {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
}

.slider-blue::-moz-range-thumb {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
}

input[type="range"]:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@keyframes bounce-in {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-bounce-in {
  animation: bounce-in 0.5s ease-out;
}

kbd {
  font-family: monospace;
  font-size: 0.75rem;
  font-weight: 600;
}
</style>
