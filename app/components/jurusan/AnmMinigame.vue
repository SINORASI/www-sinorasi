<script lang="ts" setup>
// @ts-nocheck
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import draggable from "vuedraggable";
import { useMinigameState } from "~/composables/useMinigameState";

// Level configuration
interface Level {
  id: number;
  name: string;
  character: string;
  totalFrames: number;
  frameRate: number; // ms per frame
  correctOrder: number[]; // indices
}

const levels: Level[] = [
  {
    id: 1,
    name: "Ino Stand - Easy",
    character: "ino stand",
    totalFrames: 4,
    frameRate: 200,
    correctOrder: [0, 1, 2, 3],
  },
  {
    id: 2,
    name: "Ino Walk - Medium",
    character: "ino walk",
    totalFrames: 6,
    frameRate: 150,
    correctOrder: [0, 1, 2, 3, 4, 5],
  },
  {
    id: 3,
    name: "Rasi Stand - Easy",
    character: "rasi stand",
    totalFrames: 4,
    frameRate: 200,
    correctOrder: [0, 1, 2, 3],
  },
  {
    id: 4,
    name: "Rasi Walk - Hard",
    character: "rasi walk",
    totalFrames: 8,
    frameRate: 120,
    correctOrder: [0, 1, 2, 3, 4, 5, 6, 7],
  },
];

// Game state
const gameContainer = ref<HTMLElement | null>(null);
const isFullscreen = ref(false);
const currentLevel = ref(0);
const gameStatus = ref<"idle" | "checking" | "win" | "lose">("idle");
const isPlaying = ref(false);

// Get minigame state from parent
const minigameState = useMinigameState();

// Frame arrays
const framePool = ref<number[]>([]);
const timeline = ref<number[]>([]);

// Animation preview
const previewFrame = ref(0);
let animationInterval: NodeJS.Timeout | null = null;

// Get current level
const level = computed(() => levels[currentLevel.value]);

// Shuffle array helper
const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Initialize level
const initLevel = () => {
  const totalFrames = level.value.totalFrames;
  framePool.value = shuffleArray(Array.from({ length: totalFrames }, (_, i) => i));
  timeline.value = [];
  gameStatus.value = "idle";
  stopPreview();
};

// Get frame image path
const getFrameImage = (frameIndex: number, character?: string) => {
  const char = character || level.value.character;
  // For walk cycles, we have numbered frames
  if (char.includes("walk")) {
    const walkNum = Math.floor(frameIndex / 3) + 1; // Group frames
    return `/images/minigame/an/${char} ${walkNum}.png`;
  }
  // For stand, use the base image
  return `/images/minigame/an/${char}.png`;
};

// Play animation preview
const playPreview = () => {
  if (timeline.value.length === 0) {
    alert("Please add frames to the timeline first!");
    return;
  }

  if (isPlaying.value) {
    stopPreview();
    return;
  }

  isPlaying.value = true;
  previewFrame.value = 0;

  animationInterval = setInterval(() => {
    previewFrame.value = (previewFrame.value + 1) % timeline.value.length;
  }, level.value.frameRate);
};

// Stop animation preview
const stopPreview = () => {
  isPlaying.value = false;
  if (animationInterval) {
    clearInterval(animationInterval);
    animationInterval = null;
  }
  previewFrame.value = 0;
};

// Submit answer
const submitAnswer = () => {
  stopPreview();
  gameStatus.value = "checking";

  // Check if timeline is complete
  if (timeline.value.length !== level.value.totalFrames) {
    gameStatus.value = "lose";
    setTimeout(() => {
      gameStatus.value = "idle";
    }, 2000);
    return;
  }

  // Check if order is correct
  const isCorrect = timeline.value.every((frame, index) => frame === level.value.correctOrder[index]);

  if (isCorrect) {
    gameStatus.value = "win";
  } else {
    gameStatus.value = "lose";
    setTimeout(() => {
      gameStatus.value = "idle";
    }, 2000);
  }
};

// Reset level
const resetLevel = () => {
  initLevel();
};

// Next level
const nextLevel = () => {
  if (currentLevel.value < levels.length - 1) {
    currentLevel.value++;
    initLevel();
  } else {
    // All levels completed
    currentLevel.value = 0;
    initLevel();
  }
};

// Select level
const selectLevel = (levelIndex: number) => {
  currentLevel.value = levelIndex;
  initLevel();
  gameStatus.value = "idle";
};

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

// Enter fullscreen on mount
const enterFullscreen = async () => {
  if (gameContainer.value) {
    try {
      await gameContainer.value.requestFullscreen();
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

// Get preview image
const previewImage = computed(() => {
  if (timeline.value.length === 0) return null;
  const frameIndex = timeline.value[previewFrame.value];
  return getFrameImage(frameIndex);
});

const emit = defineEmits(["close"]);

onMounted(async () => {
  initLevel();
  await nextTick();
  await enterFullscreen();

  document.addEventListener("fullscreenchange", handleFullscreenChange);

  onUnmounted(() => {
    document.removeEventListener("fullscreenchange", handleFullscreenChange);
    stopPreview();
  });
});
</script>

<template>
  <div
    ref="gameContainer"
    class="game-fullscreen-wrapper fixed inset-0 z-50 bg-linear-to-br from-pink-500 via-pink-400 to-purple-500 overflow-auto"
  >
    <div class="min-h-screen p-4 md:p-8">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl md:text-4xl font-black text-white drop-shadow-lg">🎬 ANM Sprite Sorter</h1>
          <p class="text-sm md:text-base text-white/90 mt-1">Level {{ currentLevel + 1 }}: {{ level.name }}</p>
        </div>
        <button
          @click="exitFullscreen"
          class="px-4 py-2 md:px-6 md:py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Exit
        </button>
      </div>

      <!-- Main Game Layout -->
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Left Column: Instructions & Frame Pool -->
          <div class="lg:col-span-1 space-y-6">
            <!-- Instructions -->
            <div class="bg-white rounded-2xl shadow-2xl p-6">
              <h2 class="text-xl font-bold text-gray-800 mb-4">📋 How to Play</h2>
              <div class="space-y-2 text-sm text-gray-700">
                <p><strong>Goal:</strong> Arrange sprite frames in the correct animation sequence.</p>
                <ol class="list-decimal list-inside space-y-1 ml-2">
                  <li>Drag frames from pool to timeline</li>
                  <li>Arrange them in correct order</li>
                  <li>Click "Play Preview" to test</li>
                  <li>Click "Submit" when ready</li>
                </ol>
              </div>
            </div>

            <!-- Frame Pool -->
            <div class="bg-white rounded-2xl shadow-2xl p-6">
              <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                🎨 Frame Pool
                <span class="text-sm font-normal text-gray-500">({{ framePool.length }} left)</span>
              </h3>
              <draggable
                v-model="framePool"
                :item-key="(item) => `pool-${item}`"
                class="min-h-[150px] p-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 grid grid-cols-2 gap-3"
                group="frames"
              >
                <template #item="{ element }">
                  <div
                    class="frame-item bg-white p-2 rounded-lg shadow-md cursor-move hover:scale-105 transition-transform duration-200 border-2 border-pink-200"
                  >
                    <img :src="getFrameImage(element)" :alt="`Frame ${element + 1}`" class="w-full h-auto rounded" />
                    <div class="text-center text-xs font-bold text-pink-600 mt-1">Frame {{ element + 1 }}</div>
                  </div>
                </template>
              </draggable>
            </div>

            <!-- Level Selector -->
            <div class="bg-white rounded-2xl shadow-2xl p-6">
              <h3 class="text-lg font-bold text-gray-800 mb-4">🎯 Levels</h3>
              <div class="grid grid-cols-2 gap-2">
                <button
                  v-for="(lvl, index) in levels"
                  :key="lvl.id"
                  @click="selectLevel(index)"
                  :class="[
                    'px-3 py-2 rounded-lg font-bold text-sm transition-all duration-200',
                    currentLevel === index ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                  ]"
                >
                  Level {{ index + 1 }}
                </button>
              </div>
            </div>
          </div>

          <!-- Middle & Right Columns: Timeline & Preview -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Preview Window -->
            <div class="bg-white rounded-2xl shadow-2xl p-6">
              <h2 class="text-xl font-bold text-gray-800 mb-4 text-center">🎥 Animation Preview</h2>
              <div class="flex justify-center items-center">
                <div class="relative bg-gray-900 rounded-xl p-8 min-h-[250px] flex items-center justify-center">
                  <div v-if="previewImage" class="w-48 h-48 flex items-center justify-center">
                    <img :src="previewImage" alt="Animation Preview" class="max-w-full max-h-full object-contain" />
                  </div>
                  <div v-else class="text-white text-center">
                    <svg
                      class="w-16 h-16 mx-auto mb-2 opacity-50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    <p class="text-sm">Add frames to timeline to preview</p>
                  </div>
                </div>
              </div>

              <!-- Preview Controls -->
              <div class="flex justify-center gap-4 mt-6">
                <button
                  @click="playPreview"
                  :disabled="timeline.length === 0"
                  class="px-6 py-3 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      v-if="!isPlaying"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6" />
                  </svg>
                  {{ isPlaying ? "Stop" : "Play" }} Preview
                </button>
              </div>
            </div>

            <!-- Timeline -->
            <div class="bg-white rounded-2xl shadow-2xl p-6">
              <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                🎞️ Timeline
                <span class="text-sm font-normal text-gray-500"
                  >({{ timeline.length }}/{{ level.totalFrames }} frames)</span
                >
              </h3>
              <draggable
                v-model="timeline"
                :item-key="(item) => `timeline-${item}`"
                class="min-h-[120px] p-4 bg-linear-to-r from-pink-50 to-purple-50 rounded-xl border-2 border-dashed border-pink-300 flex gap-2 overflow-x-auto"
                group="frames"
              >
                <template #item="{ element, index }">
                  <div
                    class="frame-item-timeline bg-white p-2 rounded-lg shadow-md cursor-move hover:scale-105 transition-transform duration-200 border-2 border-purple-300 shrink-0"
                  >
                    <img
                      :src="getFrameImage(element)"
                      :alt="`Frame ${element + 1}`"
                      class="w-20 h-20 object-contain rounded"
                    />
                    <div class="text-center text-xs font-bold text-purple-600 mt-1">
                      {{ index + 1 }}
                    </div>
                  </div>
                </template>
              </draggable>
            </div>

            <!-- Control Buttons -->
            <div class="flex gap-4 justify-center flex-wrap">
              <button
                @click="submitAnswer"
                :disabled="gameStatus === 'checking' || timeline.length === 0"
                class="px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Submit Answer
              </button>

              <button
                @click="resetLevel"
                class="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Reset
              </button>
            </div>

            <!-- Status Messages -->
            <Transition
              enter-active-class="transition-all duration-300"
              enter-from-class="opacity-0 scale-90"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition-all duration-300"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-90"
            >
              <div v-if="gameStatus === 'win'" class="p-6 bg-green-100 border-4 border-green-500 rounded-2xl shadow-xl">
                <h3 class="text-2xl font-black text-green-700 text-center mb-2">✨ Perfect Animation! ✨</h3>
                <p class="text-center text-gray-700 mb-4">
                  You've arranged the sprites correctly! The animation flows smoothly!
                </p>
                <div class="flex justify-center gap-4">
                  <button
                    v-if="currentLevel < levels.length - 1"
                    @click="nextLevel"
                    class="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-all duration-200"
                  >
                    Next Level →
                  </button>
                  <button
                    @click="resetLevel"
                    class="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition-all duration-200"
                  >
                    Try Again
                  </button>
                </div>
              </div>
              <div
                v-else-if="gameStatus === 'lose'"
                class="p-6 bg-red-100 border-4 border-red-500 rounded-2xl shadow-xl"
              >
                <h3 class="text-2xl font-black text-red-700 text-center mb-2">❌ Animation Broken!</h3>
                <p class="text-center text-gray-700">The frame order isn't quite right. Try again!</p>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.game-fullscreen-wrapper {
  font-family: "Inter", system-ui, -apple-system, sans-serif;
}

.frame-item {
  min-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.frame-item-timeline {
  width: 100px;
}

.ghost {
  opacity: 0.5;
  background: #fce7f3;
}

/* Custom scrollbar */
.game-fullscreen-wrapper::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.game-fullscreen-wrapper::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}

.game-fullscreen-wrapper::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 5px;
}

.game-fullscreen-wrapper::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>
