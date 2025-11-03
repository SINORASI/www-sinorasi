<!-- @ts-nocheck -->
<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import * as PIXI from "pixi.js";
import { useMinigameState } from "~/composables/useMinigameState";

const emit = defineEmits(["close"]);
const minigameState = useMinigameState();

// Game state
const pixiApp = ref<PIXI.Application | null>(null);
const canvasContainer = ref<HTMLDivElement | null>(null);

// Safety checklist
const showSafetyCheck = ref(true);
const safetyItems = ref({
  helmet: false,
  gloves: false,
  apron: false,
});

// Game mechanics
const isWelding = ref(false);
const isGameStarted = ref(false);
const userPath = ref<Array<{ x: number; y: number; time: number }>>([]);
const startTime = ref(0);
const endTime = ref(0);

// Score
const showScore = ref(false);
const accuracyScore = ref(0);
const speedScore = ref(0);

// Pixi.js objects
let metalPlate: PIXI.Graphics | null = null;
let seamPath: PIXI.Graphics | null = null;
let welderTool: PIXI.Sprite | null = null;
let sparksContainer: PIXI.Container | null = null;
let weldBeadGraphics: PIXI.Graphics | null = null;

// Perfect seam path (bezier curve)
const perfectSeamPoints: Array<{ x: number; y: number }> = [];

// Generate perfect seam path (curved line across the metal plate)
const generatePerfectSeam = () => {
  perfectSeamPoints.length = 0;

  // Create a gentle S-curve across the canvas
  const startX = 150;
  const startY = 300;
  const endX = 850;
  const endY = 300;
  const steps = 100;

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    // Bezier curve with control points for S-shape
    const cp1x = 350;
    const cp1y = 250;
    const cp2x = 650;
    const cp2y = 350;

    // Cubic bezier formula
    const x =
      Math.pow(1 - t, 3) * startX +
      3 * Math.pow(1 - t, 2) * t * cp1x +
      3 * (1 - t) * Math.pow(t, 2) * cp2x +
      Math.pow(t, 3) * endX;

    const y =
      Math.pow(1 - t, 3) * startY +
      3 * Math.pow(1 - t, 2) * t * cp1y +
      3 * (1 - t) * Math.pow(t, 2) * cp2y +
      Math.pow(t, 3) * endY;

    perfectSeamPoints.push({ x, y });
  }
};

// Initialize Pixi.js
const initPixi = async () => {
  if (!canvasContainer.value) return;

  // Create Pixi application
  pixiApp.value = new PIXI.Application();
  await pixiApp.value.init({
    width: 1000,
    height: 600,
    backgroundColor: 0x1a202c, // Dark blue-gray, fits the theme
    antialias: true,
  });

  canvasContainer.value.appendChild(pixiApp.value.canvas);

  // Generate seam path
  generatePerfectSeam();

  // Draw metal plates
  drawMetalPlate();

  // Draw seam guide
  drawSeamGuide();

  // Create welder tool
  createWelderTool();

  // Create sparks container
  sparksContainer = new PIXI.Container();
  pixiApp.value.stage.addChild(sparksContainer);

  // Create weld bead graphics
  weldBeadGraphics = new PIXI.Graphics();
  pixiApp.value.stage.addChild(weldBeadGraphics);

  // Add mouse/touch event listeners
  pixiApp.value.stage.eventMode = "static";
  pixiApp.value.stage.hitArea = pixiApp.value.screen;

  pixiApp.value.stage.on("pointerdown", onMouseDown);
  pixiApp.value.stage.on("pointermove", onMouseMove);
  pixiApp.value.stage.on("pointerup", onMouseUp);

  // Start animation loop
  pixiApp.value.ticker.add(animate);
};

// Draw metal plate background
const drawMetalPlate = () => {
  if (!pixiApp.value) return;

  metalPlate = new PIXI.Graphics();

  // Draw two metal plates with gap
  metalPlate.rect(100, 200, 400, 200);
  metalPlate.fill({ color: 0x808080 });

  metalPlate.rect(500, 200, 400, 200);
  metalPlate.fill({ color: 0x808080 });

  // Add metallic texture effect
  metalPlate.rect(100, 200, 800, 200);
  metalPlate.stroke({ width: 2, color: 0x404040 });

  pixiApp.value.stage.addChild(metalPlate);
};

// Draw seam guide line
const drawSeamGuide = () => {
  if (!pixiApp.value) return;

  seamPath = new PIXI.Graphics();

  // Draw the perfect seam path as a dashed line
  for (let i = 0; i < perfectSeamPoints.length - 1; i++) {
    const currentPoint = perfectSeamPoints[i];
    const nextPoint = perfectSeamPoints[i + 1];
    if (currentPoint && nextPoint && i % 4 < 2) {
      // Create dashed effect
      seamPath.moveTo(currentPoint.x, currentPoint.y);
      seamPath.lineTo(nextPoint.x, nextPoint.y);
    }
  }

  seamPath.stroke({ width: 3, color: 0xffff00, alpha: 0.5 });
  pixiApp.value.stage.addChild(seamPath);
};

// Create welder tool sprite
const createWelderTool = () => {
  if (!pixiApp.value) return;

  // Create a simple welder tool graphic (torch shape)
  const toolGraphic = new PIXI.Graphics();

  // Handle
  toolGraphic.rect(-5, -40, 10, 40);
  toolGraphic.fill({ color: 0x555555 });

  // Nozzle
  toolGraphic.rect(-8, -45, 16, 10);
  toolGraphic.fill({ color: 0x888888 });

  // Tip
  toolGraphic.moveTo(0, -45);
  toolGraphic.lineTo(-4, -50);
  toolGraphic.lineTo(4, -50);
  toolGraphic.lineTo(0, -45);
  toolGraphic.fill({ color: 0xcccccc });

  const texture = pixiApp.value.renderer.generateTexture(toolGraphic);
  welderTool = new PIXI.Sprite(texture);
  welderTool.anchor.set(0.5, 1);
  welderTool.visible = false;

  pixiApp.value.stage.addChild(welderTool);
};

// Mouse event handlers
const onMouseDown = (event: PIXI.FederatedPointerEvent) => {
  if (!isGameStarted.value || showScore.value) return;

  isWelding.value = true;
  startTime.value = Date.now();
  userPath.value = [];

  // Clear previous weld bead
  if (weldBeadGraphics) {
    weldBeadGraphics.clear();
  }

  const pos = event.global;
  userPath.value.push({ x: pos.x, y: pos.y, time: Date.now() });
};

const onMouseMove = (event: PIXI.FederatedPointerEvent) => {
  const pos = event.global;

  // Move welder tool to follow mouse
  if (welderTool) {
    welderTool.x = pos.x;
    welderTool.y = pos.y;
    welderTool.visible = isGameStarted.value;
  }

  // Record path if welding
  if (isWelding.value) {
    userPath.value.push({ x: pos.x, y: pos.y, time: Date.now() });

    // Draw weld bead
    if (weldBeadGraphics && userPath.value.length > 1) {
      const last = userPath.value[userPath.value.length - 2];
      if (last) {
        weldBeadGraphics.moveTo(last.x, last.y);
        weldBeadGraphics.lineTo(pos.x, pos.y);
        weldBeadGraphics.stroke({ width: 8, color: 0xff6600, alpha: 0.8 });
      }
    }
  }
};

const onMouseUp = () => {
  if (!isWelding.value) return;

  isWelding.value = false;
  endTime.value = Date.now();

  // Calculate score
  calculateScore();
};

// Animation loop
const animate = (delta: PIXI.Ticker) => {
  // Create sparks when welding
  if (isWelding.value && welderTool && sparksContainer) {
    createSparks(welderTool.x, welderTool.y);
  }

  // Update and remove old sparks
  if (sparksContainer) {
    sparksContainer.children.forEach((spark: any) => {
      spark.alpha -= 0.02;
      spark.y += spark.vy;
      spark.x += spark.vx;

      if (spark.alpha <= 0 && sparksContainer) {
        sparksContainer.removeChild(spark);
      }
    });
  }
}; // Create spark particles
const createSparks = (x: number, y: number) => {
  if (!sparksContainer || !pixiApp.value) return;

  // Create 3-5 sparks per frame
  const sparkCount = Math.floor(Math.random() * 3) + 3;

  for (let i = 0; i < sparkCount; i++) {
    const spark = new PIXI.Graphics();
    spark.circle(0, 0, Math.random() * 2 + 1);
    spark.fill({ color: 0xffaa00 });

    spark.x = x + (Math.random() - 0.5) * 10;
    spark.y = y - 50 + (Math.random() - 0.5) * 10;
    spark.alpha = 1;

    // Random velocity
    (spark as any).vx = (Math.random() - 0.5) * 3;
    (spark as any).vy = Math.random() * 2 + 1;

    sparksContainer.addChild(spark);
  }
};

// Calculate accuracy and speed score
const calculateScore = () => {
  if (userPath.value.length < 10) {
    accuracyScore.value = 0;
    speedScore.value = 0;
    showScore.value = true;
    return;
  }

  // Calculate accuracy by comparing user path to perfect seam
  let totalDistance = 0;
  let checkedPoints = 0;

  userPath.value.forEach((point) => {
    // Find closest point on perfect seam
    let minDist = Infinity;

    perfectSeamPoints.forEach((perfect) => {
      const dist = Math.sqrt(Math.pow(point.x - perfect.x, 2) + Math.pow(point.y - perfect.y, 2));
      if (dist < minDist) {
        minDist = dist;
      }
    });

    totalDistance += minDist;
    checkedPoints++;
  });

  // Average distance from seam
  const avgDistance = totalDistance / checkedPoints;

  // Convert to accuracy percentage (closer = better)
  // Perfect score if within 10px, 0% if more than 50px away
  const maxDeviation = 50;
  accuracyScore.value = Math.max(0, Math.min(100, 100 - (avgDistance / maxDeviation) * 100));

  // Calculate speed score
  const totalTime = endTime.value - startTime.value; // milliseconds
  const idealTime = 3000; // 3 seconds is ideal
  const tolerance = 2000; // ±2 seconds tolerance

  const timeDiff = Math.abs(totalTime - idealTime);
  speedScore.value = Math.max(0, Math.min(100, 100 - (timeDiff / tolerance) * 100));

  showScore.value = true;
};

// Safety checklist
const toggleSafetyItem = (item: "helmet" | "gloves" | "apron") => {
  safetyItems.value[item] = !safetyItems.value[item];
};

const allSafetyChecked = computed(() => {
  return safetyItems.value.helmet && safetyItems.value.gloves && safetyItems.value.apron;
});

const startWelding = () => {
  if (!allSafetyChecked.value) return;

  showSafetyCheck.value = false;
  isGameStarted.value = true;
};

const resetGame = () => {
  showScore.value = false;
  isWelding.value = false;
  userPath.value = [];

  // Clear weld bead
  if (weldBeadGraphics) {
    weldBeadGraphics.clear();
  }

  accuracyScore.value = 0;
  speedScore.value = 0;
};

const restartGame = () => {
  resetGame();
  showSafetyCheck.value = true;
  isGameStarted.value = false;
  safetyItems.value = {
    helmet: false,
    gloves: false,
    apron: false,
  };
};

const isFullscreen = ref(false);

// Exit fullscreen
const exitFullscreen = async () => {
  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    }
    minigameState.setIsRunning(false);
  } catch (error) {
    console.error("Error exiting fullscreen:", error);
    minigameState.setIsRunning(false);
  }

  // Cleanup Pixi
  if (pixiApp.value) {
    pixiApp.value.destroy(true, { children: true });
    pixiApp.value = null;
  }

  emit("close");
};

// Handle fullscreen change
const handleFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement;
  if (!isFullscreen.value) {
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
    } catch (error) {
      console.warn("Fullscreen request failed, continuing without fullscreen:", error);
      isFullscreen.value = false;
    }
    minigameState.setIsRunning(true);
  }
};

// Get grade from score
const getGrade = (score: number) => {
  if (score >= 90) return { grade: "A+", color: "#4ade80" }; // green-400
  if (score >= 80) return { grade: "A", color: "#22c55e" }; // green-500
  if (score >= 70) return { grade: "B", color: "#60a5fa" }; // blue-400
  if (score >= 60) return { grade: "C", color: "#facc15" }; // yellow-400
  return { grade: "D", color: "#f87171" }; // red-400
};

const accuracyGrade = computed(() => getGrade(accuracyScore.value));
const speedGrade = computed(() => getGrade(speedScore.value));
const overallGrade = computed(() => getGrade((accuracyScore.value + speedScore.value) / 2));

onMounted(() => {
  enterFullscreen();
  initPixi();
  document.addEventListener("fullscreenchange", handleFullscreenChange);
});

onUnmounted(() => {
  if (pixiApp.value) {
    pixiApp.value.destroy(true, { children: true });
  }
  document.removeEventListener("fullscreenchange", handleFullscreenChange);
});
</script>

<template>
  <div class="fixed inset-0 z-50 flex flex-col font-nunito bg-linear-to-br from-emerald-700 via-emerald-600 to-emerald-900 text-white">
    <!-- Header -->
    <div class="flex items-center justify-between p-4 border-b border-white/20">
      <div class="flex items-center gap-4">
        <div class="p-2 rounded-lg bg-white/10">
          <svg class="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <h1 class="text-xl font-bold uppercase font-oswald sm:text-2xl">TMT Welding Simulator</h1>
          <p class="text-sm text-white/70">Master the perfect weld.</p>
        </div>
      </div>

      <button @click="exitFullscreen" class="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white transition-all duration-300 bg-red-600 rounded-lg hover:bg-red-700 hover:shadow-lg hover:scale-105">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        <span class="hidden md:inline">Exit</span>
      </button>
    </div>

    <!-- Main Content -->
    <div class="relative flex flex-1 overflow-hidden">
      <!-- Canvas Container -->
      <div class="flex items-center justify-center flex-1 p-4 sm:p-8">
        <div ref="canvasContainer" class="relative border-4 border-white/20 rounded-lg shadow-2xl bg-black/20"></div>
      </div>

      <!-- Safety Checklist Overlay -->
      <div v-if="showSafetyCheck" class="absolute inset-0 z-20 flex items-center justify-center bg-black/70 backdrop-blur-sm">
        <div class="max-w-md w-full p-6 sm:p-8 border-2 border-orange-500/50 rounded-lg bg-black/30 animate-bounce-in">
          <div class="mb-6 text-center">
            <div class="mb-4 text-6xl">⚠️</div>
            <h2 class="mb-2 text-3xl font-bold text-orange-400 font-oswald">Safety First!</h2>
            <p class="text-white/70">Gear up before you weld.</p>
          </div>

          <div class="space-y-3 mb-6">
            <!-- Helmet -->
            <div
              @click="toggleSafetyItem('helmet')"
              class="flex items-center gap-4 p-4 transition-all border-2 rounded-lg cursor-pointer"
              :class="
                safetyItems.helmet
                  ? 'border-green-500 bg-green-900/50'
                  : 'border-white/20 bg-white/10 hover:bg-white/20'
              "
            >
              <img src="/images/minigame/tmt/welding-mask.png" alt="Topeng Las" class="w-12 h-12 object-contain" />
              <div class="flex-1">
                <div class="font-bold text-white">Welding Helmet</div>
                <div class="text-sm text-white/60">Protects eyes from flash</div>
              </div>
              <div v-if="safetyItems.helmet" class="text-3xl text-green-400">✓</div>
            </div>

            <!-- Gloves -->
            <div
              @click="toggleSafetyItem('gloves')"
              class="flex items-center gap-4 p-4 transition-all border-2 rounded-lg cursor-pointer"
              :class="
                safetyItems.gloves
                  ? 'border-green-500 bg-green-900/50'
                  : 'border-white/20 bg-white/10 hover:bg-white/20'
              "
            >
              <img src="/images/minigame/tmt/glove.png" alt="Sarung Tangan" class="w-12 h-12 object-contain" />
              <div class="flex-1">
                <div class="font-bold text-white">Welding Gloves</div>
                <div class="text-sm text-white/60">Protects hands from heat & sparks</div>
              </div>
              <div v-if="safetyItems.gloves" class="text-3xl text-green-400">✓</div>
            </div>

            <!-- Apron -->
            <div
              @click="toggleSafetyItem('apron')"
              class="flex items-center gap-4 p-4 transition-all border-2 rounded-lg cursor-pointer"
              :class="
                safetyItems.apron
                  ? 'border-green-500 bg-green-900/50'
                  : 'border-white/20 bg-white/10 hover:bg-white/20'
              "
            >
              <img src="/images/minigame/tmt/welding-suit.png" alt="Baju Las" class="w-12 h-12 object-contain" />
              <div class="flex-1">
                <div class="font-bold text-white">Leather Apron</div>
                <div class="text-sm text-white/60">Protects body from sparks</div>
              </div>
              <div v-if="safetyItems.apron" class="text-3xl text-green-400">✓</div>
            </div>
          </div>

          <button
            @click="startWelding"
            :disabled="!allSafetyChecked"
            class="w-full py-4 text-lg font-bold text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-orange-500 to-yellow-500 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ allSafetyChecked ? "✓ Start Welding" : "Equip Safety Gear" }}
          </button>
        </div>
      </div>

      <!-- Score Overlay -->
      <div
        v-if="showScore && !showSafetyCheck"
        class="absolute inset-0 z-20 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      >
        <div class="max-w-2xl w-full p-8 border-2 border-orange-500/50 rounded-lg bg-black/30 animate-bounce-in">
          <div class="mb-6 text-center">
            <div class="mb-4 text-6xl">
              {{ overallGrade.grade === "A+" || overallGrade.grade === "A" ? "🏆" : "📊" }}
            </div>
            <h2 class="mb-2 text-3xl font-bold text-orange-400 font-oswald">Weld Complete!</h2>
            <div class="text-xl font-bold" :style="{ color: overallGrade.color }">
              Overall Grade: {{ overallGrade.grade }}
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <!-- Accuracy Score -->
            <div class="p-6 border-2 rounded-lg bg-black/20" :style="{ borderColor: accuracyGrade.color }">
              <div class="mb-2 text-sm font-semibold text-white/70 uppercase">Accuracy</div>
              <div class="mb-3 text-4xl font-bold" :style="{ color: accuracyGrade.color }">
                {{ Math.round(accuracyScore) }}%
              </div>
              <div class="mb-2 text-lg font-bold" :style="{ color: accuracyGrade.color }">
                Grade: {{ accuracyGrade.grade }}
              </div>
              <div class="w-full h-3 overflow-hidden bg-white/10 rounded-full">
                <div
                  class="h-full transition-all duration-1000 rounded-full"
                  :style="{ width: `${accuracyScore}%`, backgroundColor: accuracyGrade.color }"
                ></div>
              </div>
              <div class="mt-2 text-xs text-white/60">How close you were to the line.</div>
            </div>

            <!-- Speed Score -->
            <div class="p-6 border-2 rounded-lg bg-black/20" :style="{ borderColor: speedGrade.color }">
              <div class="mb-2 text-sm font-semibold text-white/70 uppercase">Speed</div>
              <div class="mb-3 text-4xl font-bold" :style="{ color: speedGrade.color }">
                {{ Math.round(speedScore) }}%
              </div>
              <div class="mb-2 text-lg font-bold" :style="{ color: speedGrade.color }">
                Grade: {{ speedGrade.grade }}
              </div>
              <div class="w-full h-3 overflow-hidden bg-white/10 rounded-full">
                <div
                  class="h-full transition-all duration-1000 rounded-full"
                  :style="{ width: `${speedScore}%`, backgroundColor: speedGrade.color }"
                ></div>
              </div>
              <div class="mt-2 text-xs text-white/60">Consistent welding speed.</div>
            </div>
          </div>

          <div class="p-4 mb-6 border border-blue-500/50 rounded-lg bg-black/20">
            <h3 class="mb-2 text-sm font-bold text-blue-400 font-oswald">💡 Pro Tips</h3>
            <ul class="space-y-1 text-xs text-white/70 list-disc list-inside">
              <li v-if="accuracyScore < 70">• Keep the torch steady and follow the yellow guide line.</li>
              <li v-if="speedScore < 70">• Maintain a consistent speed - not too fast, not too slow.</li>
              <li v-if="accuracyScore >= 70 && speedScore >= 70">• Great job! Your technique is improving!</li>
              <li>• Practice makes perfect - real welding takes years of skill.</li>
            </ul>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <button
              @click="resetGame"
              class="py-3 font-bold text-white transition-all rounded-lg bg-white/10 hover:bg-white/20"
            >
              🔄 Try Again
            </button>
            <button
              @click="restartGame"
              class="py-3 font-bold text-white transition-all rounded-lg bg-gradient-to-r from-orange-500 to-yellow-500 hover:scale-105"
            >
              🏠 New Session
            </button>
          </div>
        </div>
      </div>

      <!-- Instructions Sidebar -->
      <div v-if="isGameStarted && !showScore" class="w-64 p-4 overflow-y-auto bg-black/20 border-l-2 border-white/10">
        <div class="space-y-4">
          <div class="p-4 border border-orange-500/50 rounded-lg bg-black/30">
            <h3 class="mb-2 text-sm font-bold text-orange-400 font-oswald">🎯 Instructions</h3>
            <ol class="space-y-2 text-xs text-white/70 list-decimal list-inside">
              <li>Click and hold to start welding.</li>
              <li>Follow the dashed yellow line.</li>
              <li>Maintain a steady speed and accuracy.</li>
              <li>Release to finish and see your score.</li>
            </ol>
          </div>

          <div class="p-4 rounded-lg bg-black/30">
            <h3 class="mb-2 text-sm font-bold text-white font-oswald">⚡ Welding Tips</h3>
            <ul class="space-y-1 text-xs text-white/70 list-disc list-inside">
              <li>Maintain a consistent travel speed.</li>
              <li>Keep a uniform arc length.</li>
              <li>Ensure proper penetration.</li>
              <li>Follow the joint precisely.</li>
            </ul>
          </div>

          <div class="p-4 rounded-lg bg-black/30">
            <h3 class="mb-2 text-sm font-bold text-white font-oswald">🎓 Grading</h3>
            <div class="space-y-1 text-xs">
              <div class="flex justify-between">
                <span class="text-white/60">90-100%:</span>
                <span class="font-bold text-green-400">A+ Expert</span>
              </div>
              <div class="flex justify-between">
                <span class="text-white/60">80-89%:</span>
                <span class="font-bold text-green-500">A Proficient</span>
              </div>
              <div class="flex justify-between">
                <span class="text-white/60">70-79%:</span>
                <span class="font-bold text-blue-400">B Good</span>
              </div>
              <div class="flex justify-between">
                <span class="text-white/60">60-69%:</span>
                <span class="font-bold text-yellow-400">C Practice</span>
              </div>
              <div class="flex justify-between">
                <span class="text-white/60">&lt;60%:</span>
                <span class="font-bold text-red-400">D Keep Trying</span>
              </div>
            </div>
          </div>

          <div class="p-4 border border-yellow-500/50 rounded-lg bg-black/30">
            <h3 class="mb-2 text-sm font-bold text-yellow-400 font-oswald">⚠️ Safety Reminder</h3>
            <p class="text-xs text-white/70">
              Real welding requires training, certification, and strict safety protocols. Always wear appropriate PPE.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes bounce-in {
  0% { opacity: 0; transform: scale(0.8); }
  50% { transform: scale(1.05); }
  100% { opacity: 1; transform: scale(1); }
}
.animate-bounce-in { animation: bounce-in 0.5s ease-out; }
</style>
