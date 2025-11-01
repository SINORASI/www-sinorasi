<!-- @ts-nocheck -->
<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";

const emit = defineEmits(["close"]);

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

    ctx.fillStyle = "rgb(15, 23, 42)"; // Dark background
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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
        // Bass - Red to Orange
        gradient.addColorStop(0, "#EF4444");
        gradient.addColorStop(1, "#F97316");
      } else if (i < (bufferLength * 2) / 3) {
        // Mid - Yellow to Green
        gradient.addColorStop(0, "#EAB308");
        gradient.addColorStop(1, "#22C55E");
      } else {
        // Treble - Cyan to Blue
        gradient.addColorStop(0, "#06B6D4");
        gradient.addColorStop(1, "#3B82F6");
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(x, cHeight - barHeight, barWidth, barHeight);

      x += barWidth + 1;
    }
  };

  draw();
};

// Fullscreen management
const enterFullscreen = () => {
  const element = document.documentElement as any;
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
};

const exitFullscreen = () => {
  const doc = document as any;
  if (doc.exitFullscreen) {
    doc.exitFullscreen();
  } else if (doc.webkitExitFullscreen) {
    doc.webkitExitFullscreen();
  } else if (doc.msExitFullscreen) {
    doc.msExitFullscreen();
  }

  // Cleanup audio
  stopAudio();
  if (audioContext.value) {
    audioContext.value.close();
  }

  emit("close");
};

// Format dB value
const formatDB = (value: number) => {
  return value > 0 ? `+${value}` : `${value}`;
};

// Get quality grade
const qualityGrade = computed(() => {
  if (qualityScore.value >= 90) return { grade: "A+", color: "#22C55E", text: "Perfect!" };
  if (qualityScore.value >= 80) return { grade: "A", color: "#10B981", text: "Excellent!" };
  if (qualityScore.value >= 70) return { grade: "B", color: "#3B82F6", text: "Good!" };
  if (qualityScore.value >= 60) return { grade: "C", color: "#F59E0B", text: "Fair" };
  return { grade: "D", color: "#EF4444", text: "Keep trying!" };
});

onMounted(() => {
  enterFullscreen();
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
  <div class="fixed inset-0 z-50 flex flex-col bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
    <!-- Header -->
    <div class="flex items-center justify-between p-4 shadow-lg bg-slate-900 md:p-6">
      <div class="flex items-center gap-3">
        <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-r from-teal-500 to-teal-600">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
            />
          </svg>
        </div>
        <div>
          <h1 class="text-lg font-bold text-white md:text-2xl">TAV EQ Challenge</h1>
          <p class="text-xs text-gray-400 md:text-sm">Master the Audio Mix</p>
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
      <!-- Left Sidebar - Info -->
      <div class="w-64 p-4 overflow-y-auto bg-slate-800">
        <div class="space-y-4">
          <!-- Level Info -->
          <div class="p-4 border-2 border-teal-500 rounded-lg bg-teal-500 bg-opacity-10">
            <h3 class="mb-2 text-sm font-bold text-teal-400">📊 {{ currentLevelData.name }}</h3>
            <p class="text-xs text-gray-300">
              {{ currentLevelData.description }}
            </p>
          </div>

          <!-- Instructions -->
          <div class="p-4 rounded-lg bg-slate-700">
            <h3 class="mb-2 text-sm font-bold text-white">🎯 Your Mission</h3>
            <ol class="space-y-2 text-xs text-gray-300 list-decimal list-inside">
              <li>Play the audio track</li>
              <li>Adjust the EQ sliders (Bass, Mid, Treble)</li>
              <li>Listen to the changes</li>
              <li>Click "Check My Mix" to see your score</li>
              <li>Score 80% or higher to pass!</li>
            </ol>
          </div>

          <!-- Hint -->
          <div class="p-4 border-2 border-yellow-500 rounded-lg bg-yellow-500 bg-opacity-10">
            <h3 class="mb-2 text-sm font-bold text-yellow-400">💡 Hint</h3>
            <p class="text-xs text-gray-300">
              {{ currentLevelData.hint }}
            </p>
          </div>

          <!-- EQ Guide -->
          <div class="p-4 rounded-lg bg-slate-700">
            <h3 class="mb-2 text-sm font-bold text-white">🎚️ EQ Guide</h3>
            <div class="space-y-2 text-xs text-gray-300">
              <div class="flex items-center gap-2">
                <div class="w-4 h-4 rounded-full bg-red-500 shrink-0"></div>
                <span><strong>Bass:</strong> 20-200 Hz (Warmth, Power)</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-4 h-4 rounded-full bg-yellow-500 shrink-0"></div>
                <span><strong>Mid:</strong> 200-3200 Hz (Presence)</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-4 h-4 rounded-full bg-blue-500 shrink-0"></div>
                <span><strong>Treble:</strong> 3200+ Hz (Clarity)</span>
              </div>
            </div>
          </div>

          <!-- Progress -->
          <div class="p-4 rounded-lg bg-slate-700">
            <h3 class="mb-2 text-sm font-bold text-white">📈 Progress</h3>
            <div class="space-y-2 text-xs">
              <div class="flex justify-between">
                <span class="text-gray-400">Level:</span>
                <span class="font-bold text-white">{{ currentLevel + 1 }} / {{ levels.length }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Quality Score:</span>
                <span class="font-bold" :style="{ color: hasChecked ? qualityGrade.color : '#fff' }">
                  {{ hasChecked ? `${qualityScore}%` : "Not checked" }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Center - Main Game Area -->
      <div class="relative flex-1 p-8 overflow-auto bg-slate-900">
        <!-- Loading State -->
        <div v-if="isLoading" class="flex items-center justify-center h-full">
          <div class="text-center">
            <div
              class="w-16 h-16 mx-auto mb-4 border-4 border-teal-500 rounded-full animate-spin border-t-transparent"
            ></div>
            <p class="text-white">Loading Audio...</p>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="loadError" class="flex items-center justify-center h-full">
          <div class="p-6 text-center border-2 border-red-500 rounded-lg bg-red-500 bg-opacity-10">
            <p class="mb-4 text-red-400">{{ loadError }}</p>
            <button
              @click="initAudio"
              class="px-4 py-2 text-sm font-bold text-white transition-all rounded-lg bg-teal-500 hover:bg-teal-600"
            >
              Retry
            </button>
          </div>
        </div>

        <!-- Main Game -->
        <div v-else class="flex flex-col items-center justify-center max-w-6xl mx-auto space-y-6">
          <!-- Audio Visualizer -->
          <div class="w-full p-4 rounded-xl bg-slate-800">
            <canvas
              ref="canvasRef"
              width="1000"
              height="200"
              class="w-full h-auto border-2 rounded-lg border-slate-700"
            ></canvas>
          </div>

          <!-- Audio Controls -->
          <div class="flex items-center gap-4">
            <button
              @click="togglePlayback"
              class="flex items-center justify-center w-16 h-16 transition-all duration-300 rounded-full shadow-lg bg-linear-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 hover:scale-110"
            >
              <svg v-if="!isPlaying" class="w-8 h-8 ml-1 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              <svg v-else class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            </button>

            <div class="text-white">
              <p class="text-sm font-bold">{{ isPlaying ? "Playing" : "Paused" }}</p>
              <p class="text-xs text-gray-400">{{ currentLevelData.name }}</p>
            </div>
          </div>

          <!-- EQ Sliders -->
          <div class="flex items-end justify-center w-full gap-8 p-8 rounded-xl bg-slate-800">
            <!-- Bass Slider -->
            <div class="flex flex-col items-center space-y-3">
              <div class="text-center">
                <div class="text-2xl font-bold text-red-400">{{ formatDB(bassGain) }} dB</div>
                <div class="text-sm text-gray-400">Bass</div>
              </div>
              <input
                v-model.number="bassGain"
                type="range"
                min="-12"
                max="12"
                step="0.5"
                class="w-64 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-vertical"
                style="writing-mode: bt-lr; -webkit-appearance: slider-vertical"
              />
              <div class="text-xs text-gray-500">20-200 Hz</div>
            </div>

            <!-- Mid Slider -->
            <div class="flex flex-col items-center space-y-3">
              <div class="text-center">
                <div class="text-2xl font-bold text-yellow-400">{{ formatDB(midGain) }} dB</div>
                <div class="text-sm text-gray-400">Mid</div>
              </div>
              <input
                v-model.number="midGain"
                type="range"
                min="-12"
                max="12"
                step="0.5"
                class="w-64 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-vertical"
                style="writing-mode: bt-lr; -webkit-appearance: slider-vertical"
              />
              <div class="text-xs text-gray-500">200-3200 Hz</div>
            </div>

            <!-- Treble Slider -->
            <div class="flex flex-col items-center space-y-3">
              <div class="text-center">
                <div class="text-2xl font-bold text-blue-400">{{ formatDB(trebleGain) }} dB</div>
                <div class="text-sm text-gray-400">Treble</div>
              </div>
              <input
                v-model.number="trebleGain"
                type="range"
                min="-12"
                max="12"
                step="0.5"
                class="w-64 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-vertical"
                style="writing-mode: bt-lr; -webkit-appearance: slider-vertical"
              />
              <div class="text-xs text-gray-500">3200+ Hz</div>
            </div>
          </div>

          <!-- Quality Bar -->
          <div v-if="hasChecked" class="w-full p-6 rounded-xl bg-slate-800">
            <h3 class="mb-3 text-lg font-bold text-center text-white">Mix Quality</h3>
            <div class="relative w-full h-8 overflow-hidden bg-gray-700 rounded-full">
              <div
                class="h-full transition-all duration-1000 ease-out bg-linear-to-r"
                :style="{
                  width: `${qualityScore}%`,
                  backgroundImage: `linear-gradient(90deg, ${qualityGrade.color}, ${qualityGrade.color})`,
                }"
              ></div>
              <div class="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">
                {{ qualityScore }}% - {{ qualityGrade.text }}
              </div>
            </div>
          </div>

          <!-- Level Complete -->
          <div
            v-if="showLevelComplete"
            class="p-6 text-center border-2 border-green-500 rounded-lg animate-bounce-in bg-green-500 bg-opacity-10"
          >
            <div class="mb-2 text-4xl">🎉</div>
            <div class="mb-1 text-lg font-bold text-green-400">Level Complete!</div>
            <div class="mb-4 text-sm text-gray-300">Great job! Your mix sounds professional.</div>
            <button
              v-if="currentLevel < levels.length - 1"
              @click="nextLevel"
              class="px-6 py-3 font-bold text-white transition-all rounded-lg bg-teal-500 hover:bg-teal-600"
            >
              Next Level →
            </button>
            <div v-else class="text-yellow-400">🏆 You've completed all levels!</div>
          </div>
        </div>
      </div>

      <!-- Right Sidebar - Controls -->
      <div class="w-64 p-4 overflow-y-auto bg-slate-800">
        <div class="space-y-4">
          <!-- Check Button -->
          <button
            @click="calculateQuality"
            :disabled="!isPlaying && !hasChecked"
            class="w-full py-4 text-lg font-bold text-white transition-all duration-300 transform rounded-lg shadow-lg bg-linear-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🎚️ Check My Mix
          </button>

          <button
            @click="resetLevel"
            class="w-full py-2 text-sm font-semibold text-white transition-all rounded-lg bg-slate-700 hover:bg-slate-600"
          >
            🔄 Reset EQ
          </button>

          <!-- Current Settings -->
          <div class="p-4 rounded-lg bg-slate-700">
            <h3 class="mb-2 text-sm font-bold text-white">⚙️ Current EQ</h3>
            <div class="space-y-2 text-xs">
              <div class="flex justify-between">
                <span class="text-gray-400">Bass:</span>
                <span class="font-mono font-bold text-red-400">{{ formatDB(bassGain) }} dB</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Mid:</span>
                <span class="font-mono font-bold text-yellow-400">{{ formatDB(midGain) }} dB</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Treble:</span>
                <span class="font-mono font-bold text-blue-400">{{ formatDB(trebleGain) }} dB</span>
              </div>
            </div>
          </div>

          <!-- Tips -->
          <div class="p-4 border-2 border-purple-500 rounded-lg bg-purple-500 bg-opacity-10">
            <h3 class="mb-2 text-sm font-bold text-purple-400">🎓 EQ Tips</h3>
            <ul class="space-y-1 text-xs text-gray-300">
              <li>• Subtle changes often sound better</li>
              <li>• Cut before you boost</li>
              <li>• Use your ears, not your eyes</li>
              <li>• Less is usually more</li>
              <li>• Each track needs different EQ</li>
            </ul>
          </div>

          <!-- Score Grading -->
          <div class="p-4 rounded-lg bg-slate-700">
            <h3 class="mb-2 text-sm font-bold text-white">📊 Grading Scale</h3>
            <div class="space-y-1 text-xs">
              <div class="flex justify-between">
                <span class="text-gray-400">90-100%:</span>
                <span class="font-bold text-green-400">A+ Perfect</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">80-89%:</span>
                <span class="font-bold text-green-500">A Excellent</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">70-79%:</span>
                <span class="font-bold text-blue-400">B Good</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">60-69%:</span>
                <span class="font-bold text-yellow-400">C Fair</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">&lt;60%:</span>
                <span class="font-bold text-red-400">D Try Again</span>
              </div>
            </div>
          </div>

          <!-- Level Select -->
          <div class="p-4 rounded-lg bg-slate-700">
            <h3 class="mb-2 text-sm font-bold text-white">📚 Levels</h3>
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
                class="w-full px-3 py-2 text-xs font-semibold text-left transition-all rounded-lg"
                :class="
                  currentLevel === index ? 'bg-teal-600 text-white' : 'bg-slate-600 text-gray-300 hover:bg-slate-500'
                "
              >
                {{ index + 1 }}. {{ level.name.replace("Level " + (index + 1) + ": ", "") }}
              </button>
            </div>
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

.animate-bounce-in {
  animation: bounce-in 0.5s ease-out;
}

/* Vertical slider styling */
input[type="range"] {
  height: 250px;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #14b8a6, #06b6d4);
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(20, 184, 166, 0.5);
}

input[type="range"]::-webkit-slider-thumb:hover {
  box-shadow: 0 4px 12px rgba(20, 184, 166, 0.8);
  transform: scale(1.1);
}

input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #14b8a6, #06b6d4);
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(20, 184, 166, 0.5);
  border: none;
}

input[type="range"]::-moz-range-thumb:hover {
  box-shadow: 0 4px 12px rgba(20, 184, 166, 0.8);
  transform: scale(1.1);
}
</style>
