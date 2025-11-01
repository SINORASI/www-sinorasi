<script lang="ts" setup>
// @ts-nocheck
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import draggable from "vuedraggable";

// T568B Standard wire order (1-8)
const T568B_STANDARD = ["white-orange", "orange", "white-green", "blue", "white-blue", "green", "white-brown", "brown"];

// Wire color mappings for display
const wireColors: Record<string, { bg: string; label: string }> = {
  "white-orange": {
    bg: "linear-gradient(135deg, #fff 0%, #fff 45%, #ff6600 55%, #ff6600 100%)",
    label: "White-Orange",
  },
  orange: { bg: "#ff6600", label: "Orange" },
  "white-green": { bg: "linear-gradient(135deg, #fff 0%, #fff 45%, #00cc00 55%, #00cc00 100%)", label: "White-Green" },
  blue: { bg: "#0066ff", label: "Blue" },
  "white-blue": { bg: "linear-gradient(135deg, #fff 0%, #fff 45%, #0066ff 55%, #0066ff 100%)", label: "White-Blue" },
  green: { bg: "#00cc00", label: "Green" },
  "white-brown": { bg: "linear-gradient(135deg, #fff 0%, #fff 45%, #8B4513 55%, #8B4513 100%)", label: "White-Brown" },
  brown: { bg: "#8B4513", label: "Brown" },
};

// Game state
const gameContainer = ref<HTMLElement | null>(null);
const isFullscreen = ref(false);
const gameStatus = ref<"idle" | "checking" | "win" | "lose">("idle");

// Wire pool (scrambled initially)
const wirePool = ref<string[]>([]);

// Connector slots (user's arrangement)
const connectorSlots = ref<string[]>(Array(8).fill(""));

// Shuffle array helper
const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Initialize/Reset game
const initGame = () => {
  wirePool.value = shuffleArray([...T568B_STANDARD]);
  connectorSlots.value = Array(8).fill("");
  gameStatus.value = "idle";
};

// Crimp cable (check answer)
const crimpCable = () => {
  gameStatus.value = "checking";

  // Check if all slots are filled
  if (connectorSlots.value.some((slot) => !slot)) {
    gameStatus.value = "lose";
    setTimeout(() => {
      gameStatus.value = "idle";
    }, 2000);
    return;
  }

  // Check if order matches T568B standard
  const isCorrect = connectorSlots.value.every((wire, index) => wire === T568B_STANDARD[index]);

  if (isCorrect) {
    gameStatus.value = "win";
  } else {
    gameStatus.value = "lose";
    setTimeout(() => {
      gameStatus.value = "idle";
    }, 2000);
  }
};

// Reset game
const resetGame = () => {
  initGame();
};

// Exit fullscreen
const exitFullscreen = async () => {
  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    }
  } catch (error) {
    console.error("Error exiting fullscreen:", error);
  }
};

// Handle fullscreen change
const handleFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement;
  if (!isFullscreen.value) {
    emit("close");
  }
};

// Enter fullscreen on mount
const enterFullscreen = async () => {
  if (gameContainer.value) {
    try {
      await gameContainer.value.requestFullscreen();
      isFullscreen.value = true;
    } catch (error) {
      console.error("Error entering fullscreen:", error);
    }
  }
};

// Get wire style
const getWireStyle = (wireName: string) => {
  const wire = wireColors[wireName];
  return {
    background: wire?.bg || "#ccc",
  };
};

// Get wire label
const getWireLabel = (wireName: string) => {
  return wireColors[wireName]?.label || wireName;
};

// Draggable options for pool
const poolDragOptions = computed(() => ({
  animation: 200,
  group: "wires",
  disabled: false,
  ghostClass: "ghost",
}));

// Draggable options for slots
const slotDragOptions = computed(() => ({
  animation: 200,
  group: "wires",
  disabled: false,
  ghostClass: "ghost",
}));

const emit = defineEmits(["close"]);

onMounted(async () => {
  initGame();
  await nextTick();
  await enterFullscreen();

  document.addEventListener("fullscreenchange", handleFullscreenChange);

  onUnmounted(() => {
    document.removeEventListener("fullscreenchange", handleFullscreenChange);
  });
});
</script>

<template>
  <div
    ref="gameContainer"
    class="game-fullscreen-wrapper fixed inset-0 z-50 bg-linear-to-br from-yellow-500 via-yellow-400 to-orange-400 overflow-auto"
  >
    <div class="min-h-screen p-4 md:p-8">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl md:text-4xl font-black text-white drop-shadow-lg">🔌 TKJ LAN Cable Crimper</h1>
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
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Left Side: Instructions & Wire Pool -->
          <div class="space-y-6">
            <!-- Instructions -->
            <div class="bg-white rounded-2xl shadow-2xl p-6">
              <h2 class="text-xl md:text-2xl font-bold text-gray-800 mb-4">📋 Instructions</h2>
              <div class="space-y-3 text-sm md:text-base text-gray-700">
                <p><strong>Goal:</strong> Arrange the 8 colored wires in the correct T568B standard order.</p>
                <p><strong>How to Play:</strong></p>
                <ol class="list-decimal list-inside space-y-1 ml-2">
                  <li>Drag wires from the pool below</li>
                  <li>Drop them into the RJ45 connector slots (1-8)</li>
                  <li>Follow the T568B wiring standard</li>
                  <li>Click "Crimp Cable" to check your work</li>
                </ol>
              </div>
            </div>

            <!-- Wire Pool -->
            <div class="bg-white rounded-2xl shadow-2xl p-6">
              <h3 class="text-lg md:text-xl font-bold text-gray-800 mb-4">🎨 Wire Pool</h3>
              <draggable
                v-model="wirePool"
                :options="poolDragOptions"
                item-key="id"
                class="min-h-[200px] p-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 grid grid-cols-2 gap-3"
                group="wires"
              >
                <template #item="{ element }">
                  <div
                    class="wire-item p-3 rounded-lg shadow-md cursor-move hover:scale-105 transition-transform duration-200 border-2 border-gray-200"
                    :style="getWireStyle(element)"
                  >
                    <span class="text-xs font-bold text-white drop-shadow-md text-center block">
                      {{ getWireLabel(element) }}
                    </span>
                  </div>
                </template>
              </draggable>
            </div>

            <!-- T568B Reference -->
            <div class="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
              <h4 class="text-sm font-bold text-blue-900 mb-2">💡 T568B Standard Reference:</h4>
              <div class="grid grid-cols-4 gap-2 text-xs">
                <div v-for="(wire, index) in T568B_STANDARD" :key="index" class="text-center">
                  <div class="font-bold text-blue-900">{{ index + 1 }}</div>
                  <div class="h-6 rounded mt-1 border border-gray-300" :style="getWireStyle(wire)"></div>
                  <div class="text-[10px] text-gray-600 mt-1">{{ wire.split("-").join(" ") }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Side: RJ45 Connector -->
          <div class="space-y-6">
            <!-- Connector Display -->
            <div class="bg-white rounded-2xl shadow-2xl p-6">
              <h2 class="text-xl md:text-2xl font-bold text-gray-800 mb-4 text-center">🔌 RJ45 Connector</h2>

              <!-- RJ45 Visual -->
              <div class="relative bg-linear-to-b from-gray-700 to-gray-900 rounded-2xl p-8 shadow-inner">
                <!-- Connector Slots -->
                <div class="space-y-2">
                  <div v-for="(slot, index) in connectorSlots" :key="index" class="flex items-center gap-4">
                    <!-- Slot Number -->
                    <div
                      class="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-gray-900 shrink-0"
                    >
                      {{ index + 1 }}
                    </div>

                    <!-- Drop Zone -->
                    <draggable
                      v-model="connectorSlots"
                      :options="slotDragOptions"
                      item-key="id"
                      class="flex-1"
                      group="wires"
                      @start="drag = true"
                      @end="drag = false"
                    >
                      <template #item="{ element, index: slotIndex }">
                        <div
                          v-if="slotIndex === index"
                          class="h-12 rounded-lg flex items-center justify-center cursor-move hover:scale-105 transition-all duration-200 border-2 border-white/20 shadow-lg"
                          :style="element ? getWireStyle(element) : { background: 'rgba(255,255,255,0.1)' }"
                          :class="element ? 'wire-filled' : 'wire-empty'"
                        >
                          <span v-if="element" class="text-xs font-bold text-white drop-shadow-md">
                            {{ getWireLabel(element) }}
                          </span>
                          <span v-else class="text-xs text-white/50">Drop wire here</span>
                        </div>
                      </template>
                    </draggable>
                  </div>
                </div>
              </div>
            </div>

            <!-- Control Buttons -->
            <div class="flex gap-4 justify-center">
              <button
                @click="crimpCable"
                :disabled="gameStatus === 'checking'"
                class="px-6 py-3 md:px-8 md:py-4 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Crimp Cable
              </button>

              <button
                @click="resetGame"
                class="px-6 py-3 md:px-8 md:py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <h3 class="text-2xl md:text-3xl font-black text-green-700 text-center mb-2">
                  ✅ Connection Successful!
                </h3>
                <p class="text-center text-gray-700">
                  Perfect! Your cable is crimped correctly according to T568B standard!
                </p>
              </div>
              <div
                v-else-if="gameStatus === 'lose'"
                class="p-6 bg-red-100 border-4 border-red-500 rounded-2xl shadow-xl"
              >
                <h3 class="text-2xl md:text-3xl font-black text-red-700 text-center mb-2">❌ Connection Failed!</h3>
                <p class="text-center text-gray-700">
                  The wire order is incorrect. Check the T568B standard and try again!
                </p>
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

.wire-item {
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wire-filled {
  animation: pulse-subtle 2s ease-in-out infinite;
}

.wire-empty {
  border-style: dashed !important;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

@keyframes pulse-subtle {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.9;
  }
}

/* Custom scrollbar for the game container */
.game-fullscreen-wrapper::-webkit-scrollbar {
  width: 10px;
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
