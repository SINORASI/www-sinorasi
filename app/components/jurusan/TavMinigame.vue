<!-- @ts-nocheck -->
<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useMinigameState } from "~/composables/useMinigameState";

const emit = defineEmits(["close"]);

// Get minigame state from parent
const minigameState = useMinigameState();

// Audio state
const audioContext = ref<AudioContext | null>(null);
const audioBuffer = ref<AudioBuffer | null>(null);
const sourceNode = ref<AudioBufferSourceNode | null>(null);
const analyserNode = ref<AnalyserNode | null>(null);
const bassFilter = ref<BiquadFilterNode | null>(null);
const midFilter = ref<BiquadFilterNode | null>(null);
const trebleFilter = ref<BiquadFilterNode | null>(null);
const gainNode = ref<GainNode | null>(null);

// Game state
const isPlaying = ref(false);
const isLoading = ref(true);
const loadError = ref("");
const currentLevel = ref(0);
const qualityScore = ref(0);
const hasChecked = ref(false);
const showLevelComplete = ref(false);

// EQ controls (in dB)
const bassGain = ref(0);
const midGain = ref(0);
const trebleGain = ref(0);

// Canvas for visualizer
const canvasRef = ref<HTMLCanvasElement | null>(null);
const animationFrameId = ref<number | null>(null);

// Levels definition
const levels = [
  {
    name: "Level 1: Radio Voice",
    description: "Fix this muffled voice recording",
    audioFile: "/audio/minigame/tav/track1.mp3",
    target: { bass: -6, mid: 3, treble: 6 }, // Reduce bass, boost mids and highs
    tolerance: 3, // ±3 dB tolerance
    hint: "Tip: Reduce low frequencies, boost high frequencies for clarity",
  },
  {
    name: "Level 2: Bassline Fix",
    description: "This track needs more punch in the low end",
    audioFile: "/audio/minigame/tav/track2.mp3",
    target: { bass: 8, mid: -2, treble: -4 }, // Boost bass, reduce others
    tolerance: 3,
    hint: "Tip: Boost the bass, reduce highs to avoid harshness",
  },
  {
    name: "Level 3: Balanced Mix",
    description: "Create a balanced, professional sound",
    audioFile: "/audio/minigame/tav/track3.mp3",
    target: { bass: 2, mid: 4, treble: 3 }, // Slight boosts across the board
    tolerance: 2.5, // Tighter tolerance
    hint: "Tip: Subtle boosts create warmth without muddiness",
  },
];

const currentLevelData = computed(() => levels[currentLevel.value]!);

// Initialize Web Audio API
const initAudio = async () => {
  try {
    isLoading.value = true;
    loadError.value = "";

    // Create AudioContext
    audioContext.value = new (window.AudioContext || (window as any).webkitAudioContext)();

    // Create filter nodes (3-band EQ)
    bassFilter.value = audioContext.value.createBiquadFilter();
    bassFilter.value.type = "lowshelf";
    bassFilter.value.frequency.value = 200; // Bass frequency

    midFilter.value = audioContext.value.createBiquadFilter();
    midFilter.value.type = "peaking";
    midFilter.value.frequency.value = 1000; // Mid frequency
    midFilter.value.Q.value = 1;

    trebleFilter.value = audioContext.value.createBiquadFilter();
    trebleFilter.value.type = "highshelf";
    trebleFilter.value.frequency.value = 3200; // Treble frequency

    // Create analyser for visualization
    analyserNode.value = audioContext.value.createAnalyser();
    analyserNode.value.fftSize = 2048;
    analyserNode.value.smoothingTimeConstant = 0.8;

    // Create gain node
    gainNode.value = audioContext.value.createGain();
    gainNode.value.gain.value = 0.7;

    // Load the audio file
    await loadAudioFile(currentLevelData.value.audioFile);

    isLoading.value = false;
  } catch (error) {
    console.error("Audio initialization error:", error);
    loadError.value = "Failed to initialize audio. Please refresh the page.";
    isLoading.value = false;
  }
};

// Load audio file
const loadAudioFile = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    audioBuffer.value = await audioContext.value!.decodeAudioData(arrayBuffer);
  } catch (error) {
    console.error("Error loading audio file:", error);
    // For demo purposes, create a simple tone if file doesn't exist
    createDemoTone();
  }
};

// Create a demo tone if audio file is missing
const createDemoTone = () => {
  const sampleRate = audioContext.value!.sampleRate;
  const duration = 10; // 10 seconds
  const buffer = audioContext.value!.createBuffer(2, sampleRate * duration, sampleRate);

  for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < channelData.length; i++) {
      // Create a mix of frequencies for demo
      const t = i / sampleRate;
      channelData[i] =
        Math.sin(2 * Math.PI * 200 * t) * 0.3 + // Bass
        Math.sin(2 * Math.PI * 1000 * t) * 0.3 + // Mid
        Math.sin(2 * Math.PI * 3200 * t) * 0.2; // Treble
    }
  }

  audioBuffer.value = buffer;
};

// Play/Pause audio
const togglePlayback = () => {
  if (!audioContext.value || !audioBuffer.value) return;

  if (isPlaying.value) {
    stopAudio();
  } else {
    playAudio();
  }
};

const playAudio = () => {
  if (!audioContext.value || !audioBuffer.value) return;

  // Stop existing source if any
  if (sourceNode.value) {
    sourceNode.value.stop();
  }

  // Create new source node
  sourceNode.value = audioContext.value.createBufferSource();
  sourceNode.value.buffer = audioBuffer.value;
  sourceNode.value.loop = true;

  // Connect the audio graph: source -> bass -> mid -> treble -> gain -> analyser -> destination
  sourceNode.value.connect(bassFilter.value!);
  bassFilter.value!.connect(midFilter.value!);
  midFilter.value!.connect(trebleFilter.value!);
  trebleFilter.value!.connect(gainNode.value!);
  gainNode.value!.connect(analyserNode.value!);
  analyserNode.value!.connect(audioContext.value.destination);

  sourceNode.value.start(0);
  isPlaying.value = true;

  // Start visualizer
  startVisualizer();
};

const stopAudio = () => {
  if (sourceNode.value) {
    sourceNode.value.stop();
    sourceNode.value = null;
  }
  isPlaying.value = false;

  // Stop visualizer
  if (animationFrameId.value) {
    cancelAnimationFrame(animationFrameId.value);
    animationFrameId.value = null;
  }
};

// Update EQ filters when sliders change
watch([bassGain, midGain, trebleGain], () => {
  if (bassFilter.value) {
    bassFilter.value.gain.value = bassGain.value;
  }
  if (midFilter.value) {
    midFilter.value.gain.value = midGain.value;
  }
  if (trebleFilter.value) {
    trebleFilter.value.gain.value = trebleGain.value;
  }
});

// Calculate quality score
const calculateQuality = () => {
  hasChecked.value = true;
  const target = currentLevelData.value.target;
  const tolerance = currentLevelData.value.tolerance;

  // Calculate error for each band
  const bassError = Math.abs(bassGain.value - target.bass);
  const midError = Math.abs(midGain.value - target.mid);
  const trebleError = Math.abs(trebleGain.value - target.treble);

  // Calculate individual scores (0-100)
  const bassScore = Math.max(0, 100 - (bassError / tolerance) * 100);
  const midScore = Math.max(0, 100 - (midError / tolerance) * 100);
  const trebleScore = Math.max(0, 100 - (trebleError / tolerance) * 100);

  // Average score
  const avgScore = (bassScore + midScore + trebleScore) / 3;
  qualityScore.value = Math.round(avgScore);

  // Check if level is complete (score >= 80)
  if (qualityScore.value >= 80) {
    showLevelComplete.value = true;
  }
};

// Reset current level
const resetLevel = () => {
  bassGain.value = 0;
  midGain.value = 0;
  trebleGain.value = 0;
  hasChecked.value = false;
  qualityScore.value = 0;
  showLevelComplete.value = false;
};

// Next level
const nextLevel = async () => {
  if (currentLevel.value < levels.length - 1) {
    stopAudio();
    currentLevel.value++;
    resetLevel();
    await loadAudioFile(currentLevelData.value.audioFile);
  }
};

// Visualizer
const startVisualizer = () => {
  if (!canvasRef.value || !analyserNode.value) return;

  const canvas = canvasRef.value;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const bufferLength = analyserNode.value.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const draw = () => {
    animationFrameId.value = requestAnimationFrame(draw);

    analyserNode.value!.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const barWidth = (canvas.width / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      // guard against undefined values from the analyser or canvas
      const value = dataArray[i] ?? 0;
      const cHeight = canvas.height ?? 0;
      barHeight = (value / 255) * cHeight * 0.8;

      // Gradient based on frequency
      const gradient = ctx.createLinearGradient(0, cHeight - barHeight, 0, cHeight);
      if (i < bufferLength / 3) {
        // Bass - Orange
        gradient.addColorStop(0, "rgba(251, 146, 60, 0.8)");
        gradient.addColorStop(1, "rgba(249, 115, 22, 0.5)");
      } else if (i < (bufferLength * 2) / 3) {
        // Mid - Yellow
        gradient.addColorStop(0, "rgba(250, 204, 21, 0.9)");
        gradient.addColorStop(1, "rgba(234, 179, 8, 0.6)");
      } else {
        // Treble - White
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0.5)");
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(x, cHeight - barHeight, barWidth, barHeight);

      x += barWidth + 1;
    }
  };

  draw();
};

const exitFullscreen = () => {
  minigameState.setIsRunning(false);
  emit("close");
};

// Format dB value
const formatDB = (value: number) => {
  return value > 0 ? `+${value}` : `${value}`;
};

// Get quality grade
const qualityGrade = computed(() => {
  if (qualityScore.value >= 90) return { grade: "A+", color: "text-green-400", text: "Perfect!" };
  if (qualityScore.value >= 80) return { grade: "A", color: "text-green-500", text: "Excellent!" };
  if (qualityScore.value >= 70) return { grade: "B", color: "text-sky-400", text: "Good!" };
  if (qualityScore.value >= 60) return { grade: "C", color: "text-yellow-400", text: "Fair" };
  return { grade: "D", color: "text-red-400", text: "Keep trying!" };
});

onMounted(() => {
  minigameState.setIsRunning(true);
  initAudio();
});

onUnmounted(() => {
  stopAudio();
  if (audioContext.value) {
    audioContext.value.close();
  }
  if (animationFrameId.value) {
    cancelAnimationFrame(animationFrameId.value);
  }
});
</script>

<template>
  <div class="fixed inset-0 z-50 flex flex-col font-nunito bg-linear-to-br from-blue-700 via-blue-600 to-blue-900 text-white p-4 sm:p-6">
    <!-- Header -->
    <div class="flex items-center justify-between pb-4 border-b border-white/20">
      <div class="flex items-center gap-4">
        <div class="p-2 rounded-lg bg-white/10">
          <svg class="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
            />
          </svg>
        </div>
        <div>
          <h1 class="text-xl font-bold uppercase font-oswald sm:text-2xl">TAV EQ Challenge</h1>
          <p class="text-sm text-white/70">Master the Art of Audio Mixing</p>
        </div>
      </div>

      <button
        @click="exitFullscreen"
        class="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white transition-all duration-300 bg-red-600 rounded-lg hover:bg-red-700 hover:shadow-lg hover:scale-105"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <span class="hidden md:inline">Exit</span>
      </button>
    </div>

    <!-- Main Content -->
    <div class="flex flex-1 gap-6 mt-6 overflow-hidden">
      <!-- Left Sidebar - Info -->
      <div class="w-full md:w-72 shrink-0 p-4 space-y-4 overflow-y-auto rounded-lg bg-black/20 backdrop-blur-sm border border-white/10">
        <!-- Level Info -->
        <div class="p-4 border-l-4 border-orange-500 rounded-r-lg bg-black/20">
          <h3 class="mb-1 text-lg font-bold text-orange-400 font-oswald">{{ currentLevelData.name }}</h3>
          <p class="text-sm text-white/80">
            {{ currentLevelData.description }}
          </p>
        </div>

        <!-- Instructions -->
        <div class="p-4 rounded-lg bg-black/20">
          <h3 class="mb-2 font-bold text-white font-oswald">Your Mission</h3>
          <ol class="space-y-2 text-sm text-white/80 list-decimal list-inside">
            <li>Play the audio track.</li>
            <li>Adjust the EQ sliders.</li>
            <li>Listen to the changes.</li>
            <li>Click "Check My Mix" to see your score.</li>
            <li>Score 80% or higher to pass!</li>
          </ol>
        </div>

        <!-- Hint -->
        <div class="p-4 border-l-4 border-yellow-400 rounded-r-lg bg-black/20">
          <h3 class="mb-1 font-bold text-yellow-300 font-oswald">Hint</h3>
          <p class="text-sm text-white/80">
            {{ currentLevelData.hint }}
          </p>
        </div>

        <!-- Progress -->
        <div class="p-4 rounded-lg bg-black/20">
          <h3 class="mb-2 font-bold text-white font-oswald">Progress</h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-white/70">Level:</span>
              <span class="font-bold">{{ currentLevel + 1 }} / {{ levels.length }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-white/70">Quality Score:</span>
              <span class="font-bold" :class="hasChecked ? qualityGrade.color : ''">
                {{ hasChecked ? `${qualityScore}%` : "Unchecked" }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Center - Main Game Area -->
      <div class="relative flex-1 p-4 sm:p-8 flex flex-col items-center justify-center overflow-auto rounded-lg bg-black/20 backdrop-blur-sm border border-white/10">
        <!-- Loading State -->
        <div v-if="isLoading" class="flex flex-col items-center justify-center h-full gap-4">
          <div class="w-16 h-16 border-4 border-orange-500 rounded-full animate-spin border-t-transparent"></div>
          <p class="text-lg font-bold font-oswald">Loading Audio...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="loadError" class="flex flex-col items-center justify-center h-full gap-4 p-6 text-center border-2 border-red-500 rounded-lg bg-red-500/10">
          <p class="text-red-400">{{ loadError }}</p>
          <button
            @click="initAudio"
            class="px-4 py-2 text-sm font-bold text-white transition-all bg-orange-500 rounded-lg hover:bg-orange-600"
          >
            Retry
          </button>
        </div>

        <!-- Main Game -->
        <div v-else class="flex flex-col items-center justify-around w-full h-full max-w-6xl mx-auto">
          <!-- Audio Visualizer -->
          <div class="w-full p-2 rounded-xl bg-black/20">
            <canvas
              ref="canvasRef"
              width="1000"
              height="200"
              class="w-full h-auto"
            ></canvas>
          </div>

          <!-- Audio Controls -->
          <div class="flex items-center gap-4 my-4">
            <button
              @click="togglePlayback"
              class="flex items-center justify-center w-16 h-16 transition-all duration-300 bg-orange-500 rounded-full shadow-lg hover:bg-orange-600 hover:scale-110"
            >
              <svg v-if="!isPlaying" class="w-8 h-8 ml-1 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              <svg v-else class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            </button>

            <div>
              <p class="text-lg font-bold font-oswald">{{ isPlaying ? "Playing" : "Paused" }}</p>
              <p class="text-sm text-white/70">{{ currentLevelData.name }}</p>
            </div>
          </div>

          <!-- EQ Sliders -->
          <div class="flex flex-col sm:flex-row items-center sm:items-end justify-center w-full gap-8 p-4 sm:p-8 rounded-xl bg-black/20">
            <!-- Bass Slider -->
            <div class="flex flex-col items-center space-y-3">
              <div class="text-center">
                <div class="text-2xl font-bold text-orange-400 font-oswald">{{ formatDB(bassGain) }} dB</div>
                <div class="text-sm text-white/80">Bass</div>
              </div>
              <input
                v-model.number="bassGain"
                type="range"
                min="-12"
                max="12"
                step="0.5"
                class="w-64 h-2 rounded-lg appearance-none cursor-pointer slider-vertical"
                style="writing-mode: bt-lr; -webkit-appearance: slider-vertical; appearance: slider-vertical;"
              />
              <div class="text-xs text-white/60">20-200 Hz</div>
            </div>

            <!-- Mid Slider -->
            <div class="flex flex-col items-center space-y-3">
              <div class="text-center">
                <div class="text-2xl font-bold text-yellow-400 font-oswald">{{ formatDB(midGain) }} dB</div>
                <div class="text-sm text-white/80">Mid</div>
              </div>
              <input
                v-model.number="midGain"
                type="range"
                min="-12"
                max="12"
                step="0.5"
                class="w-64 h-2 rounded-lg appearance-none cursor-pointer slider-vertical"
                style="writing-mode: bt-lr; -webkit-appearance: slider-vertical; appearance: slider-vertical;"
              />
              <div class="text-xs text-white/60">200-3200 Hz</div>
            </div>

            <!-- Treble Slider -->
            <div class="flex flex-col items-center space-y-3">
              <div class="text-center">
                <div class="text-2xl font-bold text-sky-300 font-oswald">{{ formatDB(trebleGain) }} dB</div>
                <div class="text-sm text-white/80">Treble</div>
              </div>
              <input
                v-model.number="trebleGain"
                type="range"
                min="-12"
                max="12"
                step="0.5"
                class="w-64 h-2 rounded-lg appearance-none cursor-pointer slider-vertical"
                style="writing-mode: bt-lr; -webkit-appearance: slider-vertical; appearance: slider-vertical;"
              />
              <div class="text-xs text-white/60">3200+ Hz</div>
            </div>
          </div>

          <!-- Quality Bar -->
          <div v-if="hasChecked" class="w-full max-w-3xl p-4 mt-4 rounded-xl bg-black/20">
            <h3 class="mb-3 text-lg font-bold text-center font-oswald">Mix Quality</h3>
            <div class="relative w-full h-8 overflow-hidden rounded-full bg-black/30">
              <div
                class="h-full transition-all duration-1000 ease-out bg-green-500"
                :style="{ width: `${qualityScore}%` }"
              ></div>
              <div class="absolute inset-0 flex items-center justify-center text-sm font-bold">
                {{ qualityScore }}% - {{ qualityGrade.text }}
              </div>
            </div>
          </div>
        </div>

        <!-- Level Complete Modal -->
        <div
          v-if="showLevelComplete"
          class="absolute inset-0 z-20 flex items-center justify-center p-4 bg-black/60 animate-fade-in"
        >
          <div class="p-8 text-center border-2 border-green-500 rounded-lg bg-blue-900/80 backdrop-blur-md animate-bounce-in">
            <div class="mb-2 text-6xl">🎉</div>
            <div class="mb-2 text-3xl font-bold text-green-400 font-oswald">Level Complete!</div>
            <div class="mb-6 text-lg text-white/90">Great job! Your mix sounds professional.</div>
            <button
              v-if="currentLevel < levels.length - 1"
              @click="nextLevel"
              class="px-8 py-3 font-bold text-white transition-all bg-orange-500 rounded-lg hover:bg-orange-600 hover:scale-105"
            >
              Next Level →
            </button>
            <div v-else class="text-2xl font-bold text-yellow-400 font-oswald">🏆 You've completed all levels!</div>
          </div>
        </div>
      </div>

      <!-- Right Sidebar - Controls -->
      <div class="w-full md:w-72 shrink-0 p-4 space-y-4 overflow-y-auto rounded-lg bg-black/20 backdrop-blur-sm border border-white/10">
        <!-- Check Button -->
        <button
          @click="calculateQuality"
          :disabled="!isPlaying && !hasChecked"
          class="w-full py-4 text-lg font-bold text-white transition-all duration-300 transform rounded-lg shadow-lg bg-gradient-to-r from-orange-500 to-yellow-500 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Check My Mix
        </button>

        <button
          @click="resetLevel"
          class="w-full py-2 text-sm font-semibold text-white transition-all bg-white/10 rounded-lg hover:bg-white/20"
        >
          Reset EQ
        </button>

        <!-- Current Settings -->
        <div class="p-4 rounded-lg bg-black/20">
          <h3 class="mb-2 font-bold text-white font-oswald">Current EQ</h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-white/70">Bass:</span>
              <span class="font-mono font-bold text-orange-400">{{ formatDB(bassGain) }} dB</span>
            </div>
            <div class="flex justify-between">
              <span class="text-white/70">Mid:</span>
              <span class="font-mono font-bold text-yellow-400">{{ formatDB(midGain) }} dB</span>
            </div>
            <div class="flex justify-between">
              <span class="text-white/70">Treble:</span>
              <span class="font-mono font-bold text-sky-300">{{ formatDB(trebleGain) }} dB</span>
            </div>
          </div>
        </div>

        <!-- Level Select -->
        <div class="p-4 rounded-lg bg-black/20">
          <h3 class="mb-2 font-bold text-white font-oswald">Levels</h3>
          <div class="space-y-2">
            <button
              v-for="(level, index) in levels"
              :key="index"
              @click="
                currentLevel = index;
                resetLevel();
                stopAudio();
                loadAudioFile(level.audioFile);
              "
              class="w-full px-3 py-2 text-sm font-semibold text-left transition-all rounded-lg"
              :class="
                currentLevel === index ? 'bg-orange-500 text-white' : 'bg-white/10 text-white/80 hover:bg-white/20'
              "
            >
              {{ index + 1 }}. {{ level.name.replace("Level " + (index + 1) + ": ", "") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-bounce-in {
  animation: bounce-in 0.5s ease-out;
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

/* Vertical slider styling */
input[type="range"].slider-vertical {
  height: 250px;
  background: rgba(0, 0, 0, 0.3);
}

input[type="range"].slider-vertical::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #fb923c, #facc15);
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 2px 8px rgba(251, 146, 60, 0.5);
  transition: all 0.2s ease;
}

input[type="range"].slider-vertical::-webkit-slider-thumb:hover {
  box-shadow: 0 4px 12px rgba(251, 146, 60, 0.8);
  transform: scale(1.1);
}

input[type="range"].slider-vertical::-moz-range-thumb {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #fb923c, #facc15);
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 2px 8px rgba(251, 146, 60, 0.5);
}

input[type="range"].slider-vertical::-moz-range-thumb:hover {
  box-shadow: 0 4px 12px rgba(251, 146, 60, 0.8);
  transform: scale(1.1);
}
</style>
