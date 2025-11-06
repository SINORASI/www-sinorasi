<!-- @ts-nocheck -->
<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import * as PIXI from "pixi.js";

const emit = defineEmits(["close"]);

// ============================================================================
// GAME STATE MANAGEMENT
// ============================================================================

enum GameStage {
  PREPARATION = "preparation",
  EXECUTION = "execution",
  CLEANING = "cleaning",
  RESULTS = "results",
}

const currentStage = ref<GameStage>(GameStage.PREPARATION);
const isFullscreen = ref(false);

// ============================================================================
// STAGE 1: PREPARATION STATE
// ============================================================================

const safetyChecklist = ref({
  apron: false,
  gloves: false,
  mask: false,
  cableConnected: false,
});

const allSafetyComplete = computed(() => {
  return (
    safetyChecklist.value.apron &&
    safetyChecklist.value.gloves &&
    safetyChecklist.value.mask &&
    safetyChecklist.value.cableConnected
  );
});

// ============================================================================
// STAGE 2: EXECUTION STATE
// ============================================================================

const weldingLevels = [
  { id: 1, name: "Sambungan Datar", difficulty: "Easy", completed: false },
  { id: 2, name: "Sambungan T", difficulty: "Medium", completed: false },
  { id: 3, name: "Sambungan Sudut", difficulty: "Medium", completed: false },
  { id: 4, name: "Sambungan Tumpang", difficulty: "Hard", completed: false },
  { id: 5, name: "Sambungan Tepi", difficulty: "Hard", completed: false },
];

const selectedLevel = ref(0);
const chances = ref(4);
const electrodesInPack = ref(10);
const currentElectrodeLength = ref(100); // 100% = full electrode
const isWelding = ref(false);
const isElectrodeGrabbed = ref(false);
const weldProgress = ref(0);
const weldPath = ref<Array<{ x: number; y: number }>>([]);

// ============================================================================
// STAGE 3: CLEANING STATE
// ============================================================================

const CleaningToolType = {
  NONE: "none",
  HAMMER: "hammer",
  BRUSH: "brush",
} as const;

const selectedCleaningTool = ref<string>(CleaningToolType.NONE);
const slagRemovalProgress = ref(0);
const cleanlinessScore = ref(0);

// ============================================================================
// NOTIFICATION SYSTEM
// ============================================================================

interface Notification {
  id: string;
  message: string;
  type: "error" | "warning" | "success" | "info";
  duration: number;
}

const notifications = ref<Notification[]>([]);

const showNotification = (
  message: string,
  type: "error" | "warning" | "success" | "info" = "info",
  duration: number = 3000
) => {
  const id = `notif-${Date.now()}-${Math.random()}`;
  notifications.value.push({ id, message, type, duration });

  if (duration > 0) {
    setTimeout(() => {
      notifications.value = notifications.value.filter((n) => n.id !== id);
    }, duration);
  }
};

// ============================================================================
// SCORING
// ============================================================================

const accuracyScore = ref(0);
const speedScore = ref(0);
const finalScore = ref(0);

// ============================================================================
// PIXI.JS SETUP
// ============================================================================

const pixiApp = ref<PIXI.Application | null>(null);
const canvasContainer = ref<HTMLDivElement | null>(null);

// Pixi.js objects
let metalPlate: PIXI.Graphics | null = null;
let seamPath: PIXI.Graphics | null = null;
let welderTool: PIXI.Sprite | null = null;
let electrodeSprite: PIXI.Graphics | null = null;
let sparksContainer: PIXI.Container | null = null;
let weldBeadGraphics: PIXI.Graphics | null = null;
let slagGraphics: PIXI.Graphics | null = null;
let cleanWeldGraphics: PIXI.Graphics | null = null;
let groundClampSprite: PIXI.Sprite | null = null;
let hammerSprite: PIXI.Sprite | null = null;
let brushSprite: PIXI.Sprite | null = null;
let cleaningAnimContainer: PIXI.Container | null = null;

// Seam paths for different levels
const seamPaths: Record<number, Array<{ x: number; y: number }>> = {};

// ============================================================================
// PIXI.JS INITIALIZATION
// ============================================================================

const initPixi = async () => {
  if (!canvasContainer.value) return;

  pixiApp.value = new PIXI.Application();
  await pixiApp.value.init({
    width: 1000,
    height: 600,
    backgroundColor: 0x1a202c, // Dark blue-gray, fits the theme
    antialias: true,
  });

  canvasContainer.value.appendChild(pixiApp.value.canvas);
  // set custom cursor for the minigame canvas
  try {
    canvasContainer.value.style.cursor = "url(/images/minigame/tmt/cursor.png) 12 12, auto";
  } catch (e) {
    // ignore if not supported
  }

  // Generate seam paths for all levels
  generateSeamPaths();

  // Initial render
  renderStage();

  // Setup mouse events
  setupPixiEvents();

  // Start animation loop
  pixiApp.value.ticker.add(animationLoop);
};

// ============================================================================
// SEAM PATH GENERATION
// ============================================================================

const generateSeamPaths = () => {
  // Level 1: Simple straight line
  seamPaths[0] = [];
  for (let i = 0; i <= 100; i++) {
    const t = i / 100;
    seamPaths[0].push({
      x: 200 + t * 600,
      y: 300,
    });
  }

  // Level 2: T-Joint (horizontal + vertical)
  seamPaths[1] = [];
  for (let i = 0; i <= 50; i++) {
    const t = i / 50;
    seamPaths[1].push({ x: 500, y: 200 + t * 200 });
  }
  for (let i = 1; i <= 50; i++) {
    const t = i / 50;
    seamPaths[1].push({ x: 500 - t * 150, y: 400 });
    seamPaths[1].push({ x: 500 + t * 150, y: 400 });
  }

  // Level 3: Corner Joint (L-shape)
  seamPaths[2] = [];
  for (let i = 0; i <= 50; i++) {
    const t = i / 50;
    seamPaths[2].push({ x: 300, y: 200 + t * 200 });
  }
  for (let i = 1; i <= 50; i++) {
    const t = i / 50;
    seamPaths[2].push({ x: 300 + t * 200, y: 400 });
  }

  // Level 4: Lap Joint (curved)
  seamPaths[3] = [];
  for (let i = 0; i <= 100; i++) {
    const t = i / 100;
    const x = 200 + t * 600;
    const y = 300 + Math.sin(t * Math.PI * 2) * 50;
    seamPaths[3].push({ x, y });
  }

  // Level 5: Edge Joint (complex curve)
  seamPaths[4] = [];
  for (let i = 0; i <= 100; i++) {
    const t = i / 100;
    const x = 200 + t * 600;
    const y = 300 + Math.sin(t * Math.PI * 4) * 30 + Math.cos(t * Math.PI * 2) * 20;
    seamPaths[4].push({ x, y });
  }
};

// ============================================================================
// RENDERING FUNCTIONS
// ============================================================================

const renderStage = () => {
  if (!pixiApp.value) return;

  // Clear previous graphics
  pixiApp.value.stage.removeChildren();

  if (currentStage.value === GameStage.EXECUTION) {
    renderExecutionStage();
  } else if (currentStage.value === GameStage.CLEANING) {
    renderCleaningStage();
  }
};

const renderExecutionStage = () => {
  if (!pixiApp.value) return;

  // Draw metal plates
  metalPlate = new PIXI.Graphics();
  metalPlate.rect(150, 250, 700, 100);
  metalPlate.fill({ color: 0x808080 });
  pixiApp.value.stage.addChild(metalPlate);

  // Draw seam path guide
  seamPath = new PIXI.Graphics();
  const currentPath = seamPaths[selectedLevel.value] || [];
  for (let i = 0; i < currentPath.length - 1; i++) {
    const p1 = currentPath[i];
    const p2 = currentPath[i + 1];
    if (p1 && p2 && i % 4 < 2) {
      seamPath.moveTo(p1.x, p1.y);
      seamPath.lineTo(p2.x, p2.y);
    }
  }
  seamPath.stroke({ width: 2, color: 0xffff00, alpha: 0.5 });
  pixiApp.value.stage.addChild(seamPath);

  // Create weld bead graphics container
  weldBeadGraphics = new PIXI.Graphics();
  pixiApp.value.stage.addChild(weldBeadGraphics);

  // Create sparks container
  sparksContainer = new PIXI.Container();
  pixiApp.value.stage.addChild(sparksContainer);

  // cleaning animation container
  cleaningAnimContainer = new PIXI.Container();
  pixiApp.value.stage.addChild(cleaningAnimContainer);

  // Create electrode sprite
  if (isElectrodeGrabbed.value) {
    createElectrodeSprite();
  }
  // create tool sprites (hidden until used)
  try {
    hammerSprite = PIXI.Sprite.from("/images/minigame/tmt/welding-hammer.png");
    hammerSprite.anchor.set(0.5);
    hammerSprite.visible = false;
    hammerSprite.scale.set(0.6);
    pixiApp.value.stage.addChild(hammerSprite);

    brushSprite = PIXI.Sprite.from("/images/minigame/tmt/steel-wire-brush.png");
    brushSprite.anchor.set(0.5);
    brushSprite.visible = false;
    brushSprite.scale.set(0.7);
    pixiApp.value.stage.addChild(brushSprite);
  } catch (e) {
    // fallback if assets missing
  }

  // show ground clamp if cable connected
  if (safetyChecklist.value.cableConnected) {
    try {
      if (!groundClampSprite) {
        groundClampSprite = PIXI.Sprite.from("/images/minigame/tmt/welding-ground-clamp.png");
        groundClampSprite.anchor.set(0.5);
        groundClampSprite.scale.set(0.6);
      }
      groundClampSprite.x = 180;
      groundClampSprite.y = 310;
      pixiApp.value.stage.addChild(groundClampSprite);
    } catch (e) {
      // ignore
    }
  }
};

const renderCleaningStage = () => {
  if (!pixiApp.value) return;

  // Draw metal plates
  metalPlate = new PIXI.Graphics();
  metalPlate.rect(150, 250, 700, 100);
  metalPlate.fill({ color: 0x808080 });
  pixiApp.value.stage.addChild(metalPlate);

  // Draw completed weld bead
  cleanWeldGraphics = new PIXI.Graphics();
  const currentPath = seamPaths[selectedLevel.value] || [];
  for (let i = 0; i < currentPath.length - 1; i++) {
    const p1 = currentPath[i];
    const p2 = currentPath[i + 1];
    if (p1 && p2) {
      cleanWeldGraphics.moveTo(p1.x, p1.y);
      cleanWeldGraphics.lineTo(p2.x, p2.y);
    }
  }
  cleanWeldGraphics.stroke({ width: 8, color: 0xff9500, alpha: 0.8 });
  pixiApp.value.stage.addChild(cleanWeldGraphics);

  // Draw slag overlay
  slagGraphics = new PIXI.Graphics();
  for (let i = 0; i < currentPath.length - 1; i++) {
    const p1 = currentPath[i];
    const p2 = currentPath[i + 1];
    if (p1 && p2) {
      slagGraphics.moveTo(p1.x, p1.y);
      slagGraphics.lineTo(p2.x, p2.y);
    }
  }
  slagGraphics.stroke({ width: 12, color: 0x3d3d3d, alpha: 0.9 });
  pixiApp.value.stage.addChild(slagGraphics);
};

// ============================================================================
// ELECTRODE SPRITE
// ============================================================================

const createElectrodeSprite = () => {
  if (!pixiApp.value || electrodeSprite) return;

  electrodeSprite = new PIXI.Graphics();
  updateElectrodeSprite();
  pixiApp.value.stage.addChild(electrodeSprite);
};

const updateElectrodeSprite = () => {
  if (!electrodeSprite) return;

  electrodeSprite.clear();
  const length = (currentElectrodeLength.value / 100) * 60;

  // Electrode rod
  electrodeSprite.rect(-3, -length, 6, length);
  electrodeSprite.fill({ color: 0xcc7722 });

  // Electrode tip
  electrodeSprite.circle(0, -length, 4);
  electrodeSprite.fill({ color: 0xffaa44 });
};

// Replace electrode with broken sprite
const showBrokenElectrode = (x: number, y: number) => {
  if (!pixiApp.value) return;
  try {
    const broken = PIXI.Sprite.from("/images/minigame/tmt/broken-electrode.png");
    broken.anchor.set(0.5, 0.5);
    broken.x = x;
    broken.y = y;
    broken.scale.set(0.6);
    pixiApp.value.stage.addChild(broken);
    // fade out
    let life = 60;
    const tick = (ticker: PIXI.Ticker) => {
      life--;
      broken.alpha = life / 60;
      broken.y += 0.5;
      if (life <= 0 && pixiApp.value) {
        pixiApp.value.ticker.remove(tick);
        if (broken.parent) broken.parent.removeChild(broken);
      }
    };
    pixiApp.value.ticker.add(tick);
  } catch (e) {
    // ignore
  }
};

// ============================================================================
// MOUSE/TOUCH EVENTS
// ============================================================================

let mouseX = 0;
let mouseY = 0;

// Forward declarations for functions used in event handlers
let gameOver: () => void;
let completeGame: () => void;

const setupPixiEvents = () => {
  if (!pixiApp.value) return;

  pixiApp.value.stage.eventMode = "static";
  pixiApp.value.stage.hitArea = pixiApp.value.screen;

  pixiApp.value.stage.on("pointermove", (event: PIXI.FederatedPointerEvent) => {
    mouseX = event.global.x;
    mouseY = event.global.y;

    if (electrodeSprite) {
      electrodeSprite.x = mouseX;
      electrodeSprite.y = mouseY;
    }

    if (isWelding.value && currentStage.value === GameStage.EXECUTION) {
      handleWelding(event);
    }

    if (currentStage.value === GameStage.CLEANING) {
      handleCleaning(event);
    }
  });

  pixiApp.value.stage.on("pointerdown", () => {
    if (isElectrodeGrabbed.value && currentStage.value === GameStage.EXECUTION) {
      startWelding();
    }
  });

  pixiApp.value.stage.on("pointerup", () => {
    if (isWelding.value) {
      stopWelding();
    }
  });
};

// ============================================================================
// WELDING LOGIC
// ============================================================================

let weldStartTime = 0;
let lastWeldPoint = { x: 0, y: 0 };
let weldSpeed = 0;

const startWelding = () => {
  isWelding.value = true;
  weldStartTime = Date.now();
  lastWeldPoint = { x: mouseX, y: mouseY };
  weldPath.value = [{ x: mouseX, y: mouseY }];
};

const handleWelding = (event: PIXI.FederatedPointerEvent) => {
  const pos = event.global;
  weldPath.value.push({ x: pos.x, y: pos.y });

  // Calculate speed
  const dx = pos.x - lastWeldPoint.x;
  const dy = pos.y - lastWeldPoint.y;
  weldSpeed = Math.sqrt(dx * dx + dy * dy);
  lastWeldPoint = { x: pos.x, y: pos.y };

  // Deplete electrode
  const depletionRate = 0.05; // % per frame
  currentElectrodeLength.value = Math.max(0, currentElectrodeLength.value - depletionRate);
  updateElectrodeSprite();

  // Check for electrode break conditions
  if (weldSpeed > 15) {
    // Too fast
    breakElectrode("Bergerak terlalu cepat!");
  } else if (weldSpeed < 0.5 && weldSpeed > 0) {
    // Too slow (burning)
    breakElectrode("Bergerak terlalu lambat - terbakar!");
  }

  // Draw weld bead
  if (weldBeadGraphics && weldPath.value.length > 1) {
    const last = weldPath.value[weldPath.value.length - 2];
    if (last) {
      weldBeadGraphics.moveTo(last.x, last.y);
      weldBeadGraphics.lineTo(pos.x, pos.y);
      weldBeadGraphics.stroke({ width: 6, color: 0xff6600, alpha: 0.8 });
    }
  }

  // Create sparks
  createSparks(pos.x, pos.y);

  // Check if electrode depleted
  if (currentElectrodeLength.value <= 0) {
    stopWelding();
    isElectrodeGrabbed.value = false;
    if (electrodeSprite && pixiApp.value) {
      // show broken electrode visual at last position
      showBrokenElectrode(mouseX, mouseY);
      pixiApp.value.stage.removeChild(electrodeSprite);
      electrodeSprite = null;
    }
  }

  // Update progress
  calculateWeldProgress();
};

const stopWelding = () => {
  isWelding.value = false;
  calculateAccuracy();
};

const breakElectrode = (reason: string) => {
  isWelding.value = false;
  isElectrodeGrabbed.value = false;
  currentElectrodeLength.value = 100;

  if (electrodeSprite && pixiApp.value) {
    showBrokenElectrode(lastWeldPoint.x || mouseX, lastWeldPoint.y || mouseY);
    pixiApp.value.stage.removeChild(electrodeSprite);
    electrodeSprite = null;
  }

  chances.value--;

  // Show notification
  showNotification(`⚠️ Elektroda patah! ${reason} — Kesempatan tersisa: ${chances.value}/4`, "error", 4000);

  if (chances.value <= 0) {
    gameOver();
  }
};

const calculateWeldProgress = () => {
  const currentPath = seamPaths[selectedLevel.value] || [];
  if (currentPath.length === 0) return;

  let coveredPoints = 0;
  for (const seamPoint of currentPath) {
    const isNear = weldPath.value.some((weldPoint) => {
      const dist = Math.sqrt(Math.pow(weldPoint.x - seamPoint.x, 2) + Math.pow(weldPoint.y - seamPoint.y, 2));
      return dist < 15; // Tolerance
    });
    if (isNear) coveredPoints++;
  }

  weldProgress.value = (coveredPoints / currentPath.length) * 100;

  if (weldProgress.value >= 95) {
    completeWelding();
  }
};

const calculateAccuracy = () => {
  const currentPath = seamPaths[selectedLevel.value] || [];
  if (currentPath.length === 0 || weldPath.value.length === 0) return;

  let totalDistance = 0;
  for (const weldPoint of weldPath.value) {
    let minDist = Infinity;
    for (const seamPoint of currentPath) {
      const dist = Math.sqrt(Math.pow(weldPoint.x - seamPoint.x, 2) + Math.pow(weldPoint.y - seamPoint.y, 2));
      if (dist < minDist) minDist = dist;
    }
    totalDistance += minDist;
  }

  const avgDistance = totalDistance / weldPath.value.length;
  accuracyScore.value = Math.max(0, Math.min(100, 100 - (avgDistance / 50) * 100));
};

const completeWelding = () => {
  currentStage.value = GameStage.CLEANING;
  renderStage();
};

// ============================================================================
// CLEANING LOGIC
// ============================================================================

const handleCleaning = (event: PIXI.FederatedPointerEvent) => {
  if (!pixiApp.value || !cleaningAnimContainer || !slagGraphics) return;

  const pos = event.global;

  if (selectedCleaningTool.value === CleaningToolType.HAMMER) {
    // show hammer hit animation at pos
    if (hammerSprite) {
      hammerSprite.x = pos.x;
      hammerSprite.y = pos.y - 20;
      hammerSprite.visible = true;
      hammerSprite.rotation = (Math.random() - 0.5) * 0.4;
      // simple hit animation
      let scale = 0.6;
      hammerSprite.scale.set(scale);
      const hitTicker = (ticker: PIXI.Ticker) => {
        scale -= 0.02 * ticker.deltaTime;
        if (hammerSprite) {
          hammerSprite.scale.set(Math.max(0.4, scale));
          hammerSprite.y += 0.6 * ticker.deltaTime;
          if (scale <= 0.45) {
            hammerSprite.visible = false;
            pixiApp.value?.ticker.remove(hitTicker);
          }
        }
      };
      pixiApp.value.ticker.add(hitTicker);
    }

    // update progress visually
    slagRemovalProgress.value = Math.min(100, slagRemovalProgress.value + 1.2);
    if (slagGraphics) slagGraphics.alpha = Math.max(0, 1 - slagRemovalProgress.value / 120);

    if (slagRemovalProgress.value >= 100) {
      if (pixiApp.value && slagGraphics) {
        pixiApp.value.stage.removeChild(slagGraphics);
        slagGraphics = null;
      }
    }
  } else if (selectedCleaningTool.value === CleaningToolType.BRUSH) {
    // animate brush following pointer
    if (brushSprite) {
      brushSprite.x = pos.x;
      brushSprite.y = pos.y - 8;
      brushSprite.visible = true;
      brushSprite.rotation = Math.sin(Date.now() / 80) * 0.8;
    }

    // polishing effect
    cleanlinessScore.value = Math.min(100, cleanlinessScore.value + 0.6);
    // reduce slag alpha gradually
    if (slagGraphics) slagGraphics.alpha = Math.max(0, 1 - (cleanlinessScore.value + slagRemovalProgress.value) / 200);

    if (cleanlinessScore.value >= 100) {
      completeGame();
    }
  }
};

// ============================================================================
// SPARKS PARTICLE EFFECT
// ============================================================================

const createSparks = (x: number, y: number) => {
  if (!sparksContainer || !pixiApp.value) return;

  const sparkCount = Math.floor(Math.random() * 3) + 2;
  for (let i = 0; i < sparkCount; i++) {
    const spark = new PIXI.Graphics();
    spark.circle(0, 0, Math.random() * 2 + 1);
    spark.fill({ color: 0xffaa00 });

    spark.x = x + (Math.random() - 0.5) * 10;
    spark.y = y + (Math.random() - 0.5) * 10;
    spark.alpha = 1;

    (spark as any).vx = (Math.random() - 0.5) * 3;
    (spark as any).vy = Math.random() * 2 + 1;

    sparksContainer.addChild(spark);
  }
};

const animationLoop = (ticker: PIXI.Ticker) => {
  if (!sparksContainer) return;

  // Update sparks
  sparksContainer.children.forEach((spark: any) => {
    spark.alpha -= 0.02;
    spark.y += spark.vy;
    spark.x += spark.vx;

    if (spark.alpha <= 0 && sparksContainer) {
      sparksContainer.removeChild(spark);
    }
  });
};

// ============================================================================
// GAME FLOW FUNCTIONS (defined early for hoisting)
// ============================================================================

// When cleaning finishes for a level, progress to next level or finish all
const levelResults: Array<{ accuracy: number; cleanliness: number; speed: number }> = [];

gameOver = () => {
  showNotification("💥 Game Over! Kesempatan habis. Coba lagi lain kali!", "error", 3000);
  // Delay exit to allow notification to be seen
  setTimeout(() => {
    exitFullscreen();
  }, 1000);
};

completeGame = () => {
  // capture result for this level
  speedScore.value = 80; // simplified per-level speed
  levelResults.push({ accuracy: accuracyScore.value, cleanliness: cleanlinessScore.value, speed: speedScore.value });

  // reset per-level scoring
  accuracyScore.value = 0;
  cleanlinessScore.value = 0;
  slagRemovalProgress.value = 0;

  // mark level complete
  const currentLevel = weldingLevels[selectedLevel.value];
  if (currentLevel) {
    currentLevel.completed = true;
  }

  if (selectedLevel.value < weldingLevels.length - 1) {
    // proceed to next level
    const next = selectedLevel.value + 1;
    const nextLevel = weldingLevels[next];
    showNotification(
      `✅ Level selesai! Lanjut ke level berikutnya: ${nextLevel?.name || "Berikutnya"}`,
      "success",
      2000
    );
    selectedLevel.value = next;
    weldPath.value = [];
    weldProgress.value = 0;
    isElectrodeGrabbed.value = false;
    currentStage.value = GameStage.EXECUTION;
    renderStage();
  } else {
    // all levels done -> show final results
    // aggregate final score
    const avgAccuracy = Math.round(levelResults.reduce((s, r) => s + r.accuracy, 0) / levelResults.length || 0);
    const avgClean = Math.round(levelResults.reduce((s, r) => s + r.cleanliness, 0) / levelResults.length || 0);
    const avgSpeed = Math.round(levelResults.reduce((s, r) => s + r.speed, 0) / levelResults.length || 0);
    finalScore.value = Math.round((avgAccuracy + avgClean + avgSpeed) / 3);
    accuracyScore.value = avgAccuracy;
    cleanlinessScore.value = avgClean;
    speedScore.value = avgSpeed;
    currentStage.value = GameStage.RESULTS;
  }
};

// ============================================================================
// ELECTRODE & GRABBING
// ============================================================================

const grabElectrode = () => {
  if (electrodesInPack.value <= 0) {
    showNotification("❌ Tidak ada elektroda tersisa di dalam kotak!", "warning", 2000);
    return;
  }

  electrodesInPack.value--;
  currentElectrodeLength.value = 100;
  isElectrodeGrabbed.value = true;
  showNotification("✓ Elektroda diambil! Siap untuk mengelas.", "success", 1500);
  createElectrodeSprite();
};

const startExecution = () => {
  currentStage.value = GameStage.EXECUTION;
  renderStage();
};

const selectLevel = (index: number) => {
  selectedLevel.value = index;
  weldPath.value = [];
  weldProgress.value = 0;
  if (weldBeadGraphics) {
    weldBeadGraphics.clear();
  }
  renderStage();
};

const restartGame = () => {
  // Reset all state
  currentStage.value = GameStage.PREPARATION;
  safetyChecklist.value = { apron: false, gloves: false, mask: false, cableConnected: false };
  chances.value = 4;
  electrodesInPack.value = 10;
  selectedLevel.value = 0;
  weldProgress.value = 0;
  accuracyScore.value = 0;
  speedScore.value = 0;
  cleanlinessScore.value = 0;
  slagRemovalProgress.value = 0;
  isElectrodeGrabbed.value = false;
  weldPath.value = [];

  if (pixiApp.value) {
    pixiApp.value.stage.removeChildren();
  }
};

// ============================================================================
// FULLSCREEN MANAGEMENT
// ============================================================================

const exitFullscreen = async () => {
  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    }
    // Re-enable body scroll when exiting fullscreen
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  } catch (error) {
    console.error("Error exiting fullscreen:", error);
    // Re-enable body scroll even if error occurs
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  }

  if (pixiApp.value) {
    pixiApp.value.destroy(true, { children: true });
    pixiApp.value = null;
  }

  emit("close");
};

const handleFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement;
  if (!isFullscreen.value) {
    // Re-enable body scroll when exiting fullscreen
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    emit("close");
  }
};

const enterFullscreen = async () => {
  const container = document.documentElement;
  if (container) {
    try {
      await container.requestFullscreen();
      isFullscreen.value = true;
      // Disable body scroll when fullscreen is active
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } catch (error) {
      console.warn("Fullscreen request failed:", error);
      isFullscreen.value = false;
    }
  }
};

// ============================================================================
// LIFECYCLE
// ============================================================================

onMounted(async () => {
  await enterFullscreen();
  await initPixi();
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
  <div
    class="fixed inset-0 z-50 flex flex-col font-nunito bg-linear-to-br from-emerald-700 via-emerald-600 to-emerald-900 text-white"
  >
    <!-- Notifications Container -->
    <div class="fixed top-4 right-4 z-60 space-y-2 pointer-events-none">
      <Transition v-for="notification in notifications" :key="notification.id" name="notification" appear>
        <div
          class="pointer-events-auto px-4 py-3 rounded-lg shadow-lg text-white font-semibold border-l-4"
          :class="{
            'bg-red-600/80 border-red-400': notification.type === 'error',
            'bg-yellow-500/80 border-yellow-300': notification.type === 'warning',
            'bg-green-600/80 border-green-400': notification.type === 'success',
            'bg-blue-600/80 border-blue-400': notification.type === 'info',
          }"
        >
          {{ notification.message }}
        </div>
      </Transition>
    </div>

    <!-- Header -->
    <div class="flex items-center justify-between p-4 border-b border-white/20">
      <div class="flex items-center gap-4">
        <div class="p-2 rounded-lg bg-white/10">
          <svg class="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <h1 class="text-xl font-bold uppercase font-oswald sm:text-2xl">TMT Advanced Welder</h1>
          <p class="text-sm text-white/70">
            Stage
            {{
              currentStage === "preparation"
                ? "1"
                : currentStage === "execution"
                ? "2"
                : currentStage === "cleaning"
                ? "3"
                : "Selesai"
            }}:
            {{
              currentStage === "preparation"
                ? "Persiapan"
                : currentStage === "execution"
                ? "Eksekusi"
                : currentStage === "cleaning"
                ? "Pembersihan"
                : "Hasil"
            }}
          </p>
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

    <!-- Main Content Area -->
    <div class="relative flex flex-1 overflow-hidden">
      <!-- Canvas Container (Pixi.js) -->
      <div class="flex items-center justify-center flex-1 p-4 sm:p-8">
        <div ref="canvasContainer" class="relative border-4 border-white/20 rounded-lg shadow-2xl bg-black/20"></div>
      </div>

      <!-- ====================================================================== -->
      <!-- STAGE 1: PREPARATION OVERLAY (DOM UI) -->
      <!-- ====================================================================== -->
      <div
        v-if="currentStage === GameStage.PREPARATION"
        class="absolute inset-0 z-20 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      >
        <div class="max-w-2xl w-full p-6 sm:p-8 border-2 border-orange-500/50 rounded-lg bg-black/30 animate-bounce-in">
          <div class="mb-6 text-center">
            <div class="mb-4 text-6xl">⚠️</div>
            <h2 class="mb-2 text-3xl font-bold text-orange-400 font-oswald">Stage 1: Safety & Setup</h2>
            <p class="text-white/70">Complete all preparation steps before welding.</p>
          </div>

          <div class="space-y-3 mb-6">
            <!-- Safety Equipment -->
            <div
              @click="safetyChecklist.apron = !safetyChecklist.apron"
              class="flex items-center gap-4 p-4 transition-all border-2 rounded-lg cursor-pointer"
              :class="
                safetyChecklist.apron
                  ? 'border-green-500 bg-green-900/50'
                  : 'border-white/20 bg-white/10 hover:bg-white/20'
              "
            >
              <NuxtImg src="/images/minigame/tmt/welding-suit.png" alt="Apron" class="w-12 h-12 object-contain" />
              <div class="flex-1">
                <div class="font-bold text-white">Wear Leather Apron</div>
                <div class="text-sm text-white/60">Protects body from sparks</div>
              </div>
              <div v-if="safetyChecklist.apron" class="text-3xl text-green-400">✓</div>
            </div>

            <div
              @click="safetyChecklist.gloves = !safetyChecklist.gloves"
              class="flex items-center gap-4 p-4 transition-all border-2 rounded-lg cursor-pointer"
              :class="
                safetyChecklist.gloves
                  ? 'border-green-500 bg-green-900/50'
                  : 'border-white/20 bg-white/10 hover:bg-white/20'
              "
            >
              <NuxtImg src="/images/minigame/tmt/glove.png" alt="Sarung Tangan" class="w-12 h-12 object-contain" />
              <div class="flex-1">
                <div class="font-bold text-white">Wear Welding Gloves</div>
                <div class="text-sm text-white/60">Protects hands from heat</div>
              </div>
              <div v-if="safetyChecklist.gloves" class="text-3xl text-green-400">✓</div>
            </div>

            <div
              @click="safetyChecklist.mask = !safetyChecklist.mask"
              class="flex items-center gap-4 p-4 transition-all border-2 rounded-lg cursor-pointer"
              :class="
                safetyChecklist.mask
                  ? 'border-green-500 bg-green-900/50'
                  : 'border-white/20 bg-white/10 hover:bg-white/20'
              "
            >
              <NuxtImg src="/images/minigame/tmt/welding-mask.png" alt="Topeng" class="w-12 h-12 object-contain" />
              <div class="flex-1">
                <div class="font-bold text-white">Wear Welding Mask</div>
                <div class="text-sm text-white/60">Protects eyes from flash</div>
              </div>
              <div v-if="safetyChecklist.mask" class="text-3xl text-green-400">✓</div>
            </div>

            <!-- Tool Setup -->
            <div
              @click="safetyChecklist.cableConnected = !safetyChecklist.cableConnected"
              class="flex items-center gap-4 p-4 transition-all border-2 rounded-lg cursor-pointer"
              :class="
                safetyChecklist.cableConnected
                  ? 'border-green-500 bg-green-900/50'
                  : 'border-white/20 bg-white/10 hover:bg-white/20'
              "
            >
              <NuxtImg src="/images/minigame/tmt/electrode-holder.png" alt="Kabel" class="w-12 h-12 object-contain" />
              <div class="flex-1">
                <div class="font-bold text-white">Connect Electrode Holder</div>
                <div class="text-sm text-white/60">Connect to the welding machine</div>
              </div>
              <div v-if="safetyChecklist.cableConnected" class="text-3xl text-green-400">✓</div>
            </div>
          </div>

          <button
            @click="startExecution"
            :disabled="!allSafetyComplete"
            class="w-full py-4 text-lg font-bold text-white transition-all duration-300 rounded-lg bg-linear-to-r from-orange-500 to-yellow-500 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ allSafetyComplete ? "✓ Start Welding" : "Complete All Safety Steps" }}
          </button>
        </div>
      </div>

      <!-- ====================================================================== -->
      <!-- STAGE 2: EXECUTION SIDEBAR (DOM UI) -->
      <!-- ====================================================================== -->
      <div
        v-if="currentStage === GameStage.EXECUTION"
        class="w-80 p-4 overflow-y-auto bg-black/20 border-l-2 border-white/10"
      >
        <div class="space-y-4">
          <!-- Status Panel -->
          <div class="p-4 border border-orange-500/50 rounded-lg bg-black/30">
            <h3 class="mb-3 text-lg font-bold text-orange-400 font-oswald">Status</h3>
            <div class="space-y-2 text-sm text-white">
              <div class="flex justify-between">
                <span>Chances:</span>
                <span class="font-bold">{{ chances }}/4</span>
              </div>
              <div class="flex justify-between">
                <span>Electrodes in Pack:</span>
                <span class="font-bold">{{ electrodesInPack }}</span>
              </div>
              <div class="flex justify-between">
                <span>Electrode Length:</span>
                <span class="font-bold">{{ Math.round(currentElectrodeLength) }}%</span>
              </div>
              <div class="flex justify-between">
                <span>Progress:</span>
                <span class="font-bold">{{ Math.round(weldProgress) }}%</span>
              </div>
            </div>
            <div class="w-full h-2 mt-2 overflow-hidden bg-white/10 rounded-full">
              <div
                class="h-full transition-all duration-300 bg-linear-to-r from-orange-500 to-yellow-500"
                :style="{ width: `${weldProgress}%` }"
              ></div>
            </div>
          </div>

          <!-- Electrode Pack Button -->
          <button
            @click="grabElectrode"
            :disabled="isElectrodeGrabbed || electrodesInPack <= 0"
            class="w-full p-4 transition-all border border-yellow-500/50 rounded-lg bg-black/30 hover:bg-black/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <NuxtImg
              src="/images/minigame/tmt/electrode-pack.png"
              alt="Kotak Elektroda"
              class="w-16 h-16 mx-auto mb-2"
            />
            <div class="text-lg font-bold text-white">Grab Electrode</div>
            <div class="text-sm text-white/70">{{ electrodesInPack }} left</div>
          </button>

          <!-- Level Selection -->
          <div class="p-4 rounded-lg bg-black/30 border border-white/10">
            <h3 class="mb-3 text-lg font-bold text-white font-oswald">Welding Level</h3>
            <div class="space-y-2">
              <div
                v-for="(level, index) in weldingLevels"
                :key="level.id"
                @click="selectLevel(index)"
                class="p-3 transition-all border-2 rounded-lg cursor-pointer"
                :class="
                  selectedLevel === index
                    ? 'border-orange-500 bg-orange-900/50'
                    : 'border-white/20 bg-white/10 hover:bg-white/20'
                "
              >
                <div class="flex justify-between items-center">
                  <span class="font-bold text-white">{{ level.name }}</span>
                  <span
                    class="text-xs px-2 py-1 rounded font-semibold"
                    :class="{
                      'bg-green-500 text-white': level.difficulty === 'Easy',
                      'bg-yellow-500 text-black': level.difficulty === 'Medium',
                      'bg-red-500 text-white': level.difficulty === 'Hard',
                    }"
                  >
                    {{ level.difficulty }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Instructions -->
          <div class="p-4 border border-blue-500/50 rounded-lg bg-black/30">
            <h3 class="mb-2 text-sm font-bold text-blue-400 font-oswald">💡 Instructions</h3>
            <ul class="space-y-1 text-xs text-white/70 list-disc list-inside">
              <li>Click "Grab Electrode" to start.</li>
              <li>Hold mouse and drag along the yellow line.</li>
              <li>Maintain a steady speed.</li>
              <li>Watch your electrode length!</li>
              <li>Grab a new electrode when it runs out.</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- ====================================================================== -->
      <!-- STAGE 3: CLEANING TOOLS (DOM UI) -->
      <!-- ====================================================================== -->
      <div
        v-if="currentStage === GameStage.CLEANING"
        class="w-80 p-4 overflow-y-auto bg-black/20 border-l-2 border-white/10"
      >
        <div class="space-y-4">
          <div class="p-4 border border-blue-500/50 rounded-lg bg-black/30">
            <h3 class="mb-3 text-lg font-bold text-blue-400 font-oswald">Cleaning Stage</h3>
            <div class="space-y-2 text-sm text-white">
              <div class="flex justify-between">
                <span>Slag Removal:</span>
                <span class="font-bold">{{ Math.round(slagRemovalProgress) }}%</span>
              </div>
              <div class="flex justify-between">
                <span>Cleanliness:</span>
                <span class="font-bold">{{ Math.round(cleanlinessScore) }}%</span>
              </div>
            </div>
          </div>

          <!-- Cleaning Tools -->
          <div class="space-y-3">
            <button
              @click="selectedCleaningTool = CleaningToolType.HAMMER"
              class="w-full p-4 transition-all border-2 rounded-lg"
              :class="
                selectedCleaningTool === CleaningToolType.HAMMER
                  ? 'border-yellow-500 bg-yellow-900/50'
                  : 'border-white/20 bg-white/10 hover:bg-white/20'
              "
            >
              <NuxtImg src="/images/minigame/tmt/welding-hammer.png" alt="Palu" class="w-16 h-16 mx-auto mb-2" />
              <div class="text-lg font-bold text-white">Slag Hammer</div>
              <div class="text-sm text-white/70">Remove slag</div>
            </button>

            <button
              @click="selectedCleaningTool = CleaningToolType.BRUSH"
              class="w-full p-4 transition-all border-2 rounded-lg"
              :class="
                selectedCleaningTool === CleaningToolType.BRUSH
                  ? 'border-yellow-500 bg-yellow-900/50'
                  : 'border-white/20 bg-white/10 hover:bg-white/20'
              "
            >
              <NuxtImg src="/images/minigame/tmt/steel-wire-brush.png" alt="Sikat" class="w-16 h-16 mx-auto mb-2" />
              <div class="text-lg font-bold text-white">Wire Brush</div>
              <div class="text-sm text-white/70">Polish the weld</div>
            </button>
          </div>

          <!-- Instructions -->
          <div class="p-4 border border-yellow-500/50 rounded-lg bg-black/30">
            <h3 class="mb-2 text-sm font-bold text-yellow-400 font-oswald">💡 Instructions</h3>
            <ul class="space-y-1 text-xs text-white/70 list-disc list-inside">
              <li>Select the Slag Hammer.</li>
              <li>Click on the slag to remove it.</li>
              <li>Select the Wire Brush.</li>
              <li>Drag over the weld to polish it.</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- ====================================================================== -->
      <!-- STAGE 4: RESULTS SCREEN (DOM UI) -->
      <!-- ====================================================================== -->
      <div
        v-if="currentStage === GameStage.RESULTS"
        class="absolute inset-0 z-20 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      >
        <div class="max-w-2xl w-full p-8 border-2 border-green-500/50 rounded-lg bg-black/30 animate-bounce-in">
          <div class="mb-6 text-center">
            <div class="mb-4 text-6xl">🏆</div>
            <h2 class="mb-2 text-3xl font-bold text-green-400 font-oswald">Welding Complete!</h2>
            <div class="text-2xl font-bold text-white">Final Score: {{ finalScore }}/100</div>
          </div>

          <div class="grid grid-cols-3 gap-4 mb-6 text-center">
            <div class="p-4 border border-blue-500/50 rounded-lg bg-black/20">
              <div class="text-sm text-white/70">Accuracy</div>
              <div class="text-3xl font-bold text-blue-400">{{ Math.round(accuracyScore) }}%</div>
            </div>
            <div class="p-4 border border-yellow-500/50 rounded-lg bg-black/20">
              <div class="text-sm text-white/70">Speed</div>
              <div class="text-3xl font-bold text-yellow-400">{{ Math.round(speedScore) }}%</div>
            </div>
            <div class="p-4 border border-green-500/50 rounded-lg bg-black/20">
              <div class="text-sm text-white/70">Cleanliness</div>
              <div class="text-3xl font-bold text-green-400">{{ Math.round(cleanlinessScore) }}%</div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <button
              @click="restartGame"
              class="py-3 font-bold text-white transition-all rounded-lg bg-white/10 hover:bg-white/20"
            >
              🔄 Play Again
            </button>
            <button
              @click="exitFullscreen"
              class="py-3 font-bold text-white transition-all rounded-lg bg-linear-to-r from-orange-500 to-yellow-500 hover:scale-105"
            >
              🏠 Exit Game
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
.animate-bounce-in {
  animation: bounce-in 0.5s ease-out;
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease-out;
}
.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
