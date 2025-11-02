<!-- @ts-nocheck -->
<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import draggable from "vuedraggable";
import { useMinigameState } from "~/composables/useMinigameState";

const emit = defineEmits(["close"]);
const minigameState = useMinigameState();

// T568B Standard wire order (1-8)
const T568B_STANDARD = ["white-orange", "orange", "white-green", "blue", "white-blue", "green", "white-brown", "brown"];

// Wire color mappings for display
const wireColors: Record<string, { bg: string; label: string; text: string }> = {
  "white-orange": {
    bg: "background-image: linear-gradient(135deg, #fff 48%, #ff9800 52%)",
    label: "White-Orange",
    text: "text-black",
  },
  orange: { bg: "background-color: #ff9800", label: "Orange", text: "text-white" },
  "white-green": {
    bg: "background-image: linear-gradient(135deg, #fff 48%, #4caf50 52%)",
    label: "White-Green",
    text: "text-black",
  },
  blue: { bg: "background-color: #2196f3", label: "Blue", text: "text-white" },
  "white-blue": {
    bg: "background-image: linear-gradient(135deg, #fff 48%, #2196f3 52%)",
    label: "White-Blue",
    text: "text-black",
  },
  green: { bg: "background-color: #4caf50", label: "Green", text: "text-white" },
  "white-brown": {
    bg: "background-image: linear-gradient(135deg, #fff 48%, #795548 52%)",
    label: "White-Brown",
    text: "text-black",
  },
  brown: { bg: "background-color: #795548", label: "Brown", text: "text-white" },
};

// Game state
const gameStatus = ref<"idle" | "checking" | "win" | "lose">("idle");
const wirePool = ref<string[]>([]);
const connectorSlots = ref<string[]>([]);

// Shuffle array helper
const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const itemI = newArray[i];
    const itemJ = newArray[j];
    if (itemI !== undefined && itemJ !== undefined) {
      newArray[i] = itemJ;
      newArray[j] = itemI;
    }
  }
  return newArray;
};

// Initialize/Reset game
const initGame = () => {
  wirePool.value = shuffleArray([...T568B_STANDARD]);
  connectorSlots.value = [];
  gameStatus.value = "idle";
};

// Crimp cable (check answer)
const crimpCable = () => {
  if (connectorSlots.value.length !== 8) return;
  gameStatus.value = "checking";

  const isCorrect = connectorSlots.value.every((wire, index) => wire === T568B_STANDARD[index]);

  setTimeout(() => {
    if (isCorrect) {
      gameStatus.value = "win";
    } else {
      gameStatus.value = "lose";
    }
  }, 500);
};

// Reset game
const resetGame = () => {
  initGame();
};

const exitFullscreen = () => {
  minigameState.setIsRunning(false);
  emit("close");
};

// Get wire style
const getWireStyle = (wireName: string) => wireColors[wireName]?.bg || "";
const getWireLabel = (wireName: string) => wireColors[wireName]?.label || wireName;
const getWireTextStyle = (wireName: string) => wireColors[wireName]?.text || "text-white";

const draggableOptions = {
  animation: 200,
  group: "wires",
  ghostClass: "ghost",
  dragClass: "drag",
};

onMounted(() => {
  initGame();
  minigameState.setIsRunning(true);
});

onUnmounted(() => {
  // Cleanup if needed
});
</script>

<template>
  <div class="fixed inset-0 z-50 flex flex-col font-nunito bg-linear-to-br from-blue-700 via-blue-600 to-blue-900 text-white p-4 sm:p-6 overflow-hidden">
    <!-- Header -->
    <div class="flex items-center justify-between pb-4 border-b border-white/20">
      <div class="flex items-center gap-4">
        <div class="p-2 rounded-lg bg-white/10">
          <svg class="w-6 h-6 text-orange-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>
        <div>
          <h1 class="text-xl font-bold uppercase font-oswald sm:text-2xl">TKJ LAN Cable Crimper</h1>
          <p class="text-sm text-white/70">Arrange the wires to the T568B standard.</p>
        </div>
      </div>
      <button @click="exitFullscreen" class="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white transition-all duration-300 bg-red-600 rounded-lg hover:bg-red-700 hover:shadow-lg hover:scale-105">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        <span class="hidden md:inline">Exit</span>
      </button>
    </div>

    <!-- Main Game Layout -->
    <div class="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 overflow-hidden">
      <!-- Left Side: Instructions & Wire Pool -->
      <div class="lg:col-span-1 flex flex-col gap-6 overflow-y-auto pr-2">
        <div class="p-4 rounded-lg bg-black/20 backdrop-blur-sm border border-white/10">
          <h2 class="text-lg font-bold text-orange-400 font-oswald mb-2">Instructions</h2>
          <ol class="list-decimal list-inside space-y-1 text-sm text-white/80">
            <li>Drag wires from the "Wire Pool".</li>
            <li>Drop them into the RJ45 connector slots.</li>
            <li>Arrange them in the T568B standard order.</li>
            <li>Click "Crimp Cable" to check your work.</li>
          </ol>
        </div>

        <div class="p-4 rounded-lg bg-black/20 backdrop-blur-sm border border-white/10 flex-1 flex flex-col">
          <h3 class="text-lg font-bold text-yellow-400 font-oswald mb-3">Wire Pool</h3>
          <draggable
            v-model="wirePool"
            v-bind="draggableOptions"
            item-key="element"
            class="grid grid-cols-2 gap-3 flex-1 content-start"
          >
            <template #item="{ element }">
              <div class="wire-item" :style="getWireStyle(element)">
                <span class="font-bold drop-shadow-md" :class="getWireTextStyle(element)">{{ getWireLabel(element) }}</span>
              </div>
            </template>
          </draggable>
        </div>
      </div>

      <!-- Right Side: RJ45 Connector & Reference -->
      <div class="lg:col-span-2 flex flex-col gap-6 overflow-y-auto pr-2">
        <div class="p-6 rounded-lg bg-black/20 backdrop-blur-sm border border-white/10">
          <h2 class="text-xl font-bold text-center text-white font-oswald mb-4">RJ45 Connector</h2>
          <div class="max-w-md mx-auto">
            <div class="relative p-4 bg-black/30 rounded-t-lg">
              <img src="/images/minigame/tkj/rj45-top.png" alt="RJ45 Connector Top" class="w-full h-auto opacity-80" />
            </div>
            <draggable
              v-model="connectorSlots"
              v-bind="draggableOptions"
              item-key="element"
              class="connector-slots-container bg-gray-800/50 p-2 grid grid-cols-8 gap-1"
            >
              <template #item="{ element, index }">
                <div class="connector-slot" :style="getWireStyle(element)"></div>
              </template>
              <template #header>
                <div v-if="connectorSlots.length < 8" class="empty-state col-span-8 text-center py-10 text-white/40 border-2 border-dashed border-white/20 rounded-lg">
                  Drop wires here
                </div>
              </template>
            </draggable>
            <div class="relative p-4 bg-black/30 rounded-b-lg">
              <img src="/images/minigame/tkj/rj45-bottom.png" alt="RJ45 Connector Bottom" class="w-full h-auto opacity-80" />
            </div>
          </div>
        </div>

        <div class="flex items-center justify-center gap-4">
          <button @click="crimpCable" :disabled="gameStatus === 'checking' || connectorSlots.length !== 8" class="px-8 py-3 text-lg font-bold text-white transition-all duration-300 transform rounded-lg shadow-lg bg-gradient-to-r from-orange-500 to-yellow-500 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
            Crimp Cable
          </button>
          <button @click="resetGame" class="px-8 py-3 text-lg font-bold text-white transition-all bg-white/10 rounded-lg hover:bg-white/20">
            Reset
          </button>
        </div>

        <div class="p-4 rounded-lg bg-black/20 backdrop-blur-sm border border-white/10">
          <h4 class="text-base font-bold text-center text-yellow-300 font-oswald mb-2">T568B Standard Reference</h4>
          <div class="grid grid-cols-8 gap-2 text-xs">
            <div v-for="(wire, index) in T568B_STANDARD" :key="index" class="text-center">
              <div class="font-bold text-white">{{ index + 1 }}</div>
              <div class="h-8 rounded mt-1 border border-white/20" :style="getWireStyle(wire)"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Status Modal -->
    <div v-if="gameStatus === 'win' || gameStatus === 'lose'" class="absolute inset-0 z-20 flex items-center justify-center p-4 bg-black/60 animate-fade-in" @click="resetGame">
      <div class="p-8 text-center border-2 rounded-lg backdrop-blur-md animate-bounce-in" :class="gameStatus === 'win' ? 'border-green-500 bg-blue-900/80' : 'border-red-500 bg-red-900/80'">
        <div class="text-6xl mb-4">{{ gameStatus === 'win' ? '✅' : '❌' }}</div>
        <div class="text-3xl font-bold mb-2 font-oswald" :class="gameStatus === 'win' ? 'text-green-400' : 'text-red-400'">
          {{ gameStatus === 'win' ? 'Connection Success!' : 'Connection Failed!' }}
        </div>
        <div class="text-lg text-white/90 mb-6">
          {{ gameStatus === 'win' ? 'Perfect! Your cable is crimped to the T568B standard!' : 'The wire order is incorrect. Check the reference and try again.' }}
        </div>
        <button class="px-6 py-2 font-bold text-white bg-white/10 rounded-lg hover:bg-white/20">
          Click to Play Again
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
@keyframes bounce-in {
  0% { opacity: 0; transform: scale(0.8); }
  50% { transform: scale(1.05); }
  100% { opacity: 1; transform: scale(1); }
}
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-bounce-in { animation: bounce-in 0.5s ease-out; }
.animate-fade-in { animation: fade-in 0.3s ease-out; }

.wire-item {
  @apply p-3 rounded-lg shadow-md cursor-move hover:scale-105 transition-transform duration-200 border-2 border-transparent;
}
.wire-item span {
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}

.connector-slots-container {
  min-height: 60px;
}
.connector-slot {
  @apply h-12 rounded-sm transition-all duration-200;
  background-size: 200% 200%;
}

.ghost {
  @apply opacity-50 bg-yellow-400 scale-105;
}
.drag {
  @apply opacity-100;
}

/* Custom scrollbar for the game container */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}
.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}
.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>
