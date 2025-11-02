<script lang="ts" setup>
// @ts-nocheck
import * as Blockly from "blockly";
import { useMinigameState } from "~/composables/useMinigameState";

// Game state
const gameContainer = ref<HTMLElement | null>(null);
const workspace = ref<Blockly.WorkspaceSvg | null>(null);
const avatarPos = ref({ x: 0, y: 0 });
const avatarDirection = ref(0); // 0: right, 1: down, 2: left, 3: up
const gameStatus = ref<"idle" | "running" | "win" | "lose">("idle");
const isFullscreen = ref(false);

// Get minigame state from parent
const minigameState = useMinigameState();

// Simple maze layout (0 = path, 1 = wall, 2 = start, 3 = goal)
const maze = ref([
  [2, 0, 1, 0, 0],
  [0, 0, 1, 0, 1],
  [1, 0, 0, 0, 1],
  [1, 1, 1, 0, 0],
  [0, 0, 0, 0, 3],
]);

const MAZE_SIZE = 5;
const CELL_SIZE = 80;

// Initialize start position
const initGame = () => {
  for (let y = 0; y < MAZE_SIZE; y++) {
    for (let x = 0; x < MAZE_SIZE; x++) {
      const row = maze.value[y];
      if (row && row[x] === 2) {
        avatarPos.value = { x, y };
        avatarDirection.value = 0;
        break;
      }
    }
  }
};

// Blockly initialization
const initBlockly = () => {
  if (!workspace.value) {
    const blocklyDiv = document.getElementById("blocklyDiv");
    if (!blocklyDiv) return;

    // Define custom blocks
    Blockly.Blocks["move_forward"] = {
      init: function () {
        this.appendDummyInput().appendField("Move Forward");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("Move forward one step");
        this.setHelpUrl("");
      },
    };

    Blockly.Blocks["turn_left"] = {
      init: function () {
        this.appendDummyInput().appendField("Turn Left");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip("Turn 90 degrees left");
        this.setHelpUrl("");
      },
    };

    Blockly.Blocks["turn_right"] = {
      init: function () {
        this.appendDummyInput().appendField("Turn Right");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip("Turn 90 degrees right");
        this.setHelpUrl("");
      },
    };

    // Create workspace
    workspace.value = Blockly.inject(blocklyDiv, {
      toolbox: `
        <xml xmlns="https://developers.google.com/blockly/xml">
          <block type="move_forward"></block>
          <block type="turn_left"></block>
          <block type="turn_right"></block>
        </xml>
      `,
      grid: {
        spacing: 20,
        length: 3,
        colour: "#ccc",
        snap: true,
      },
      zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2,
      },
      trashcan: true,
    });
  }
};

// Move avatar forward
const moveForward = async () => {
  const directions = [
    { x: 1, y: 0 }, // right
    { x: 0, y: 1 }, // down
    { x: -1, y: 0 }, // left
    { x: 0, y: -1 }, // up
  ];

  const dir = directions[avatarDirection.value];
  if (!dir) return false;

  const newX = avatarPos.value.x + dir.x;
  const newY = avatarPos.value.y + dir.y;

  // Check bounds and walls
  if (newX >= 0 && newX < MAZE_SIZE && newY >= 0 && newY < MAZE_SIZE) {
    const row = maze.value[newY];
    if (row && row[newX] !== 1) {
      avatarPos.value = { x: newX, y: newY };
      await sleep(300);
      return true;
    }
  }
  return false;
};

// Turn left
const turnLeft = async () => {
  avatarDirection.value = (avatarDirection.value + 3) % 4;
  await sleep(200);
};

// Turn right
const turnRight = async () => {
  avatarDirection.value = (avatarDirection.value + 1) % 4;
  await sleep(200);
};

// Execute code
const runProgram = async () => {
  if (!workspace.value || gameStatus.value === "running") return;

  gameStatus.value = "running";
  // Initialize game before running
  initGame();

  const blocks = workspace.value.getTopBlocks(false);

  // Debug: Log blocks found
  // console.log("Total blocks in workspace:", workspace.value.getAllBlocks(false).length);
  // console.log("Top-level blocks:", blocks.length);
  // blocks.forEach((b, i) =>
    // console.log(`Block ${i}:`, b.type, "Previous:", b.getPreviousBlock(), "Next:", b.getNextBlock())
  //);

  try {
    // Execute only the first top-level block and its chain
    // Filter out blocks that are not in a connected chain
    for (const block of blocks) {
      // Skip blocks that are not meant to be executed (e.g., orphaned blocks)
      if (block.getPreviousBlock() === null) {
        // This is a top-level block, execute its chain
        // console.log("Executing block chain starting with:", block.type);
        await executeBlock(block);
      }
    }

    // Check win condition
    const goalPos = findGoal();
    if (goalPos && avatarPos.value.x === goalPos.x && avatarPos.value.y === goalPos.y) {
      gameStatus.value = "win";
    } else {
      gameStatus.value = "lose";
    }
  } catch (error) {
    console.error("Error executing program:", error);
    gameStatus.value = "lose";
  }
};

// Execute a single block
const executeBlock = async (block: Blockly.Block): Promise<void> => {
  if (!block) return;

  const type = block.type;

  switch (type) {
    case "move_forward":
      await moveForward();
      break;
    case "turn_left":
      await turnLeft();
      break;
    case "turn_right":
      await turnRight();
      break;
  }

  const nextBlock = block.getNextBlock();
  if (nextBlock) {
    await executeBlock(nextBlock);
  }
};

// Find goal position
const findGoal = () => {
  for (let y = 0; y < MAZE_SIZE; y++) {
    for (let x = 0; x < MAZE_SIZE; x++) {
      const row = maze.value[y];
      if (row && row[x] === 3) {
        return { x, y };
      }
    }
  }
  return null;
};

// Reset game
const resetGame = () => {
  gameStatus.value = "idle";
  initGame();
  if (workspace.value) {
    workspace.value.clear();
  }
};

// Sleep helper
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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
    // Emit event to parent when fullscreen is exited
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

// Get avatar rotation
const avatarRotation = computed(() => {
  const rotations = [0, 90, 180, 270];
  return rotations[avatarDirection.value];
});

// Get cell class
const getCellClass = (x: number, y: number) => {
  const row = maze.value[y];
  if (!row) return "bg-white/10";
  const cell = row[x];
  if (cell === 1) return "bg-black/40";
  if (cell === 2) return "bg-green-500/50";
  if (cell === 3) return "bg-yellow-500/50";
  return "bg-white/10";
};

const emit = defineEmits(["close"]);

onMounted(async () => {
  initGame();
  await nextTick();
  initBlockly();
  await enterFullscreen();

  document.addEventListener("fullscreenchange", handleFullscreenChange);

  // Resize Blockly when window resizes
  const handleResize = () => {
    if (workspace.value) {
      Blockly.svgResize(workspace.value as any);
    }
  };
  window.addEventListener("resize", handleResize);

  onUnmounted(() => {
    document.removeEventListener("fullscreenchange", handleFullscreenChange);
    window.removeEventListener("resize", handleResize);
    if (workspace.value) {
      workspace.value.dispose();
    }
  });
});
</script>

<template>
  <div
    ref="gameContainer"
    class="game-fullscreen-wrapper fixed inset-0 z-50 bg-linear-to-br from-blue-700 via-blue-600 to-blue-900 font-nunito"
  >
    <div class="min-h-screen p-4 md:p-8">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl md:text-4xl font-black text-white drop-shadow-lg font-oswald">🎮 Koder Labirin RPL</h1>
        <button
          @click="exitFullscreen"
          class="px-4 py-2 md:px-6 md:py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Keluar
        </button>
      </div>

      <!-- Main Game Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
        <!-- Left Column: Maze and Controls -->
        <div class="space-y-6">
          <!-- Maze Container -->
          <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl p-6 md:p-8">
            <h2 class="text-xl md:text-2xl font-bold text-white mb-4 text-center font-oswald">Arahkan ke Tujuan! 🎯</h2>

            <!-- Maze Grid -->
            <div class="flex items-center justify-center">
              <div
                class="grid gap-1 p-4 bg-black/20 rounded-xl shadow-inner relative"
                :style="`grid-template-columns: repeat(${MAZE_SIZE}, ${CELL_SIZE}px); grid-template-rows: repeat(${MAZE_SIZE}, ${CELL_SIZE}px);`"
              >
                <template v-for="(row, y) in maze" :key="`row-${y}`">
                  <div
                    v-for="(cell, x) in row"
                    :key="`${x}-${y}`"
                    class="border-2 border-white/20 rounded-lg transition-all duration-300"
                    :class="getCellClass(x, y)"
                    :style="`width: ${CELL_SIZE}px; height: ${CELL_SIZE}px;`"
                  >
                    <!-- Avatar -->
                    <div
                      v-if="avatarPos.x === x && avatarPos.y === y"
                      class="w-full h-full flex items-center justify-center transition-transform duration-300"
                      :style="`transform: rotate(${avatarRotation}deg);`"
                    >
                      <div class="text-4xl md:text-5xl">🤖</div>
                    </div>

                    <!-- Goal -->
                    <div v-else-if="cell === 3" class="w-full h-full flex items-center justify-center">
                      <div class="text-4xl md:text-5xl animate-pulse">🏆</div>
                    </div>
                  </div>
                </template>
              </div>
            </div>

            <!-- Instructions -->
            <div class="mt-4 p-4 bg-blue-500/10 border border-blue-400/30 rounded-lg">
              <p class="text-sm md:text-base text-blue-200">
                <strong>📝 Petunjuk:</strong> Gunakan blok di sebelah kanan untuk menavigasi robot (🤖) dari area
                hijau ke trofi (🏆). Hindari dinding gelap!
              </p>
            </div>
          </div>

          <!-- Control Buttons -->
          <div class="flex gap-4 justify-center">
            <button
              @click="runProgram"
              :disabled="gameStatus === 'running'"
              class="px-6 py-3 md:px-8 md:py-4 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-500 text-white font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Jalankan Kode
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
              Atur Ulang
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
            <div
              v-if="gameStatus === 'win'"
              class="p-6 bg-green-500/80 backdrop-blur-sm border-4 border-green-300 rounded-2xl shadow-xl text-white"
            >
              <h3 class="text-2xl md:text-3xl font-black text-center mb-2 font-oswald">🎉 Berhasil! 🎉</h3>
              <p class="text-center">Kamu berhasil menyelesaikan labirin! Kerja bagus, programmer masa depan!</p>
            </div>
            <div
              v-else-if="gameStatus === 'lose'"
              class="p-6 bg-red-500/80 backdrop-blur-sm border-4 border-red-300 rounded-2xl shadow-xl text-white"
            >
              <h3 class="text-2xl md:text-3xl font-black text-center mb-2 font-oswald">❌ Coba Lagi! ❌</h3>
              <p class="text-center">Robot tidak mencapai tujuan. Sesuaikan kode Anda dan coba lagi!</p>
            </div>
          </Transition>
        </div>

        <!-- Right Column: Blockly Workspace -->
        <div class="space-y-4">
          <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl p-4 md:p-6">
            <h2 class="text-xl md:text-2xl font-bold text-white mb-4 text-center font-oswald">🧩 Bangun Kode Anda</h2>
            <div
              id="blocklyDiv"
              class="rounded-xl overflow-hidden border-4 border-white/20"
              style="height: 600px; min-height: 400px"
            ></div>
          </div>

          <!-- Legend -->
          <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-4 md:p-6">
            <h3 class="text-lg font-bold text-white mb-3 font-oswald">📚 Referensi Blok</h3>
            <div class="space-y-2 text-sm md:text-base text-gray-200">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded shrink-0" style="background-color: #4c97ff"></div>
                <span><strong>Maju:</strong> Maju satu langkah dengan arah saat ini</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded shrink-0" style="background-color: #5ba55b"></div>
                <span><strong>Belok Kiri:</strong> Putar 90° berlawanan arah jarum jam</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded shrink-0" style="background-color: #ac68d9"></div>
                <span><strong>Belok Kanan:</strong> Putar 90° searah jarum jam</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Injecting styles for Blockly to match the dark theme */
.blocklyToolboxDiv {
  background-color: #1f2937; /* bg-gray-800 */
  color: white;
}
.blocklyTreeRow {
  color: white;
}
.blocklyTreeRow.blocklyTreeSelected {
  background-color: #374151 !important; /* bg-gray-700 */
}
.blocklyFlyoutBackground {
  fill: #374151; /* bg-gray-700 */
  fill-opacity: 0.8;
}
.blocklyScrollbarHandle {
  fill: #9ca3af; /* bg-gray-400 */
}
.blocklyTrash {
  opacity: 0.5;
}
.blocklyTrash:hover {
  opacity: 1;
}
.blocklyZoom>image {
  opacity: 0.5;
}
.blocklyZoom>image:hover {
  opacity: 1;
}
</style>

<style scoped>
.game-fullscreen-wrapper {
  font-family: "Nunito", "Inter", system-ui, -apple-system, sans-serif;
}

/* Custom scrollbar for the game container */
.game-fullscreen-wrapper::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.game-fullscreen-wrapper::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
}

.game-fullscreen-wrapper::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.4);
  border-radius: 5px;
}

.game-fullscreen-wrapper::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.6);
}
</style>
