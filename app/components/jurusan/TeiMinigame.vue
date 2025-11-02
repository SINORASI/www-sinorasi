<!-- @ts-nocheck -->
<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useMinigameState } from "~/composables/useMinigameState";

const emit = defineEmits(["close"]);

// Get minigame state from parent
const minigameState = useMinigameState();

// Game state
const isDrawingWire = ref(false);
const currentWireStart = ref<{ id: string; x: number; y: number; type: string } | null>(null);
const mousePos = ref({ x: 0, y: 0 });
const wires = ref<
  Array<{ id: string; from: string; to: string; fromPos: { x: number; y: number }; toPos: { x: number; y: number } }>
>([]);
const hasSimulated = ref(false);
const isSuccess = ref(false);
const ledGlowing = ref(false);

// Component positions (draggable)
const ledPosition = ref({ x: 450, y: 250 });
const resistorPosition = ref({ x: 350, y: 350 });
const isDraggingLed = ref(false);
const isDraggingResistor = ref(false);
const dragOffset = ref({ x: 0, y: 0 });

// Arduino pins (clickable connection points)
const arduinoPins = [
  { id: "gnd", label: "GND", x: 150, y: 450, type: "ground" },
  { id: "pin13", label: "Pin 13", x: 150, y: 150, type: "digital" },
  { id: "5v", label: "5V", x: 150, y: 250, type: "power" },
];

// Breadboard connection points
const breadboardPoints = [
  { id: "bb-row1", label: "A1", x: 350, y: 200, type: "breadboard" },
  { id: "bb-row2", label: "A5", x: 350, y: 280, type: "breadboard" },
  { id: "bb-row3", label: "A10", x: 350, y: 360, type: "breadboard" },
  { id: "bb-row4", label: "A15", x: 350, y: 440, type: "breadboard" },
  { id: "bb-gnd", label: "GND Rail", x: 550, y: 450, type: "ground-rail" },
  { id: "bb-power", label: "+ Rail", x: 550, y: 150, type: "power-rail" },
];

// LED pins (relative to LED position)
const getLedPins = computed(() => [
  { id: "led-anode", label: "+", x: ledPosition.value.x, y: ledPosition.value.y - 20, type: "led-positive" },
  { id: "led-cathode", label: "-", x: ledPosition.value.x, y: ledPosition.value.y + 20, type: "led-negative" },
]);

// Resistor pins (relative to resistor position)
const getResistorPins = computed(() => [
  { id: "resistor-1", label: "R1", x: resistorPosition.value.x - 30, y: resistorPosition.value.y, type: "resistor" },
  { id: "resistor-2", label: "R2", x: resistorPosition.value.x + 30, y: resistorPosition.value.y, type: "resistor" },
]);

// All connection points
const allPins = computed(() => [...arduinoPins, ...breadboardPoints, ...getLedPins.value, ...getResistorPins.value]);

// Correct circuit configurations (multiple valid solutions)
const validCircuits = [
  // Solution 1: GND -> Resistor -> LED -> Pin 13
  {
    connections: [
      ["gnd", "resistor-1"],
      ["resistor-2", "led-cathode"],
      ["led-anode", "pin13"],
    ],
  },
  // Solution 2: Pin 13 -> LED -> Resistor -> GND
  {
    connections: [
      ["pin13", "led-anode"],
      ["led-cathode", "resistor-1"],
      ["resistor-2", "gnd"],
    ],
  },
  // Solution 3: Using breadboard connections
  {
    connections: [
      ["gnd", "bb-gnd"],
      ["bb-gnd", "resistor-1"],
      ["resistor-2", "led-cathode"],
      ["led-anode", "pin13"],
    ],
  },
];

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

// Wire drawing logic
const startDrawingWire = (pin: any) => {
  if (hasSimulated.value) return; // Can't draw after simulation

  isDrawingWire.value = true;
  currentWireStart.value = {
    id: pin.id,
    x: pin.x,
    y: pin.y,
    type: pin.type,
  };
};

const handleMouseMove = (event: MouseEvent) => {
  const svg = document.getElementById("wire-svg");
  if (!svg) return;

  const rect = svg.getBoundingClientRect();
  mousePos.value = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
};

const finishDrawingWire = (pin: any) => {
  if (!isDrawingWire.value || !currentWireStart.value) return;
  if (currentWireStart.value.id === pin.id) {
    // Can't connect to self
    cancelDrawing();
    return;
  }

  // Add the wire
  const wireId = `wire-${Date.now()}`;
  wires.value.push({
    id: wireId,
    from: currentWireStart.value.id,
    to: pin.id,
    fromPos: { x: currentWireStart.value.x, y: currentWireStart.value.y },
    toPos: { x: pin.x, y: pin.y },
  });

  cancelDrawing();
};

const cancelDrawing = () => {
  isDrawingWire.value = false;
  currentWireStart.value = null;
};

const removeWire = (wireId: string) => {
  if (hasSimulated.value) return;
  wires.value = wires.value.filter((w) => w.id !== wireId);
};

const clearAllWires = () => {
  wires.value = [];
  hasSimulated.value = false;
  isSuccess.value = false;
  ledGlowing.value = false;
};

// Component dragging
const startDragLed = (event: MouseEvent) => {
  if (hasSimulated.value) return;
  isDraggingLed.value = true;
  dragOffset.value = {
    x: event.clientX - ledPosition.value.x,
    y: event.clientY - ledPosition.value.y,
  };
};

const startDragResistor = (event: MouseEvent) => {
  if (hasSimulated.value) return;
  isDraggingResistor.value = true;
  dragOffset.value = {
    x: event.clientX - resistorPosition.value.x,
    y: event.clientY - resistorPosition.value.y,
  };
};

const handleDrag = (event: MouseEvent) => {
  if (isDraggingLed.value) {
    ledPosition.value = {
      x: event.clientX - dragOffset.value.x,
      y: event.clientY - dragOffset.value.y,
    };
  } else if (isDraggingResistor.value) {
    resistorPosition.value = {
      x: event.clientX - dragOffset.value.x,
      y: event.clientY - dragOffset.value.y,
    };
  }
};

const stopDrag = () => {
  isDraggingLed.value = false;
  isDraggingResistor.value = false;
};

// Circuit validation
const checkCircuit = () => {
  hasSimulated.value = true;

  // Create a set of connections from wires
  const userConnections = new Set(wires.value.map((wire) => `${wire.from}-${wire.to}`));

  // Also add reverse connections (wires are bidirectional)
  wires.value.forEach((wire) => {
    userConnections.add(`${wire.to}-${wire.from}`);
  });

  // Check if user's circuit matches any valid configuration
  for (const validCircuit of validCircuits) {
    const requiredConnections = validCircuit.connections;
    let allConnectionsPresent = true;

    for (const [from, to] of requiredConnections) {
      const hasConnection = userConnections.has(`${from}-${to}`) || userConnections.has(`${to}-${from}`);
      if (!hasConnection) {
        allConnectionsPresent = false;
        break;
      }
    }

    if (allConnectionsPresent) {
      // Success!
      isSuccess.value = true;
      ledGlowing.value = true;
      return;
    }
  }

  // Failed
  isSuccess.value = false;
  ledGlowing.value = false;
};

// Get wire color based on connection type
const getWireColor = (wire: any) => {
  const fromPin = allPins.value.find((p) => p.id === wire.from);
  const toPin = allPins.value.find((p) => p.id === wire.to);

  if (
    fromPin?.type === "ground" ||
    toPin?.type === "ground" ||
    fromPin?.type === "ground-rail" ||
    toPin?.type === "ground-rail" ||
    fromPin?.type === "led-negative" ||
    toPin?.type === "led-negative"
  ) {
    return "#000000"; // Black for ground
  }
  if (
    fromPin?.type === "power" ||
    toPin?.type === "power" ||
    fromPin?.type === "power-rail" ||
    toPin?.type === "power-rail" ||
    fromPin?.type === "led-positive" ||
    toPin?.type === "led-positive"
  ) {
    return "#EF4444"; // Red for power/positive
  }
  return "#3B82F6"; // Blue for signal
};

// Keyboard shortcuts
const handleKeyPress = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    cancelDrawing();
  } else if (event.key === "Delete" || event.key === "Backspace") {
    if (wires.value.length > 0 && !hasSimulated.value) {
      wires.value.pop(); // Remove last wire
    }
  } else if (event.key === "c" || event.key === "C") {
    clearAllWires();
  } else if (event.key === "Enter" || event.key === " ") {
    if (!hasSimulated.value && wires.value.length > 0) {
      checkCircuit();
    }
  }
};

onMounted(() => {
  enterFullscreen();
  window.addEventListener("mousemove", handleDrag);
  window.addEventListener("mouseup", stopDrag);
  window.addEventListener("keydown", handleKeyPress);
  document.addEventListener("fullscreenchange", handleFullscreenChange);
});

onUnmounted(() => {
  window.removeEventListener("mousemove", handleDrag);
  window.removeEventListener("mouseup", stopDrag);
  window.removeEventListener("keydown", handleKeyPress);
  document.removeEventListener("fullscreenchange", handleFullscreenChange);
});
</script>

<template>
  <div class="fixed inset-0 z-50 flex flex-col bg-linear-to-br from-gray-900 via-gray-800 to-gray-900">
    <!-- Header -->
    <div class="flex items-center justify-between p-4 bg-gray-900 shadow-lg md:p-6">
      <div class="flex items-center gap-3">
        <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-r from-green-500 to-green-600">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <h1 class="text-lg font-bold text-white md:text-2xl">TEI Arduino Circuit</h1>
          <p class="text-xs text-gray-400 md:text-sm">Build Your LED Circuit</p>
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
      <!-- Left Sidebar - Instructions -->
      <div class="w-64 p-4 overflow-y-auto bg-gray-800">
        <div class="space-y-4">
          <div class="p-4 border-2 border-green-500 rounded-lg bg-green-500 bg-opacity-10">
            <h3 class="mb-2 text-sm font-bold text-green-400">🎯 Goal</h3>
            <p class="text-xs text-gray-300">
              Connect the Arduino, LED, and Resistor to make the LED light up when Pin 13 is active!
            </p>
          </div>

          <div class="p-4 bg-gray-700 rounded-lg">
            <h3 class="mb-2 text-sm font-bold text-white">📋 Instructions</h3>
            <ol class="space-y-2 text-xs text-gray-300 list-decimal list-inside">
              <li>Drag LED and Resistor to desired positions</li>
              <li>Click a pin to start drawing a wire</li>
              <li>Click another pin to complete the wire</li>
              <li>Connect: <span class="font-mono text-green-400">GND → Resistor → LED → Pin 13</span></li>
              <li>Click "Run Simulation" to test</li>
            </ol>
          </div>

          <div class="p-4 bg-gray-700 rounded-lg">
            <h3 class="mb-2 text-sm font-bold text-white">🔌 Components</h3>
            <ul class="space-y-1 text-xs text-gray-300">
              <li>• <span class="font-semibold text-blue-400">Arduino Uno</span> - Microcontroller</li>
              <li>• <span class="font-semibold text-red-400">LED</span> - Light emitting diode</li>
              <li>• <span class="font-semibold text-yellow-400">Resistor</span> - 220Ω (current limiter)</li>
              <li>• <span class="font-semibold text-gray-400">Wires</span> - Connections</li>
            </ul>
          </div>

          <div class="p-4 border-2 border-yellow-500 rounded-lg bg-yellow-500 bg-opacity-10">
            <h3 class="mb-2 text-sm font-bold text-yellow-400">⚡ Circuit Rules</h3>
            <ul class="space-y-1 text-xs text-gray-300">
              <li>• LED has polarity (+ and -)</li>
              <li>• Always use resistor with LED</li>
              <li>• GND must connect to circuit</li>
              <li>• Pin 13 provides power</li>
            </ul>
          </div>

          <div class="p-4 bg-gray-700 rounded-lg">
            <h3 class="mb-2 text-sm font-bold text-white">⌨️ Shortcuts</h3>
            <ul class="space-y-1 text-xs text-gray-300">
              <li>• <kbd class="px-1 bg-gray-600 rounded">Esc</kbd> Cancel wire</li>
              <li>• <kbd class="px-1 bg-gray-600 rounded">Del</kbd> Remove last wire</li>
              <li>• <kbd class="px-1 bg-gray-600 rounded">C</kbd> Clear all</li>
              <li>• <kbd class="px-1 bg-gray-600 rounded">Enter</kbd> Run simulation</li>
            </ul>
          </div>

          <div class="p-4 bg-gray-700 rounded-lg">
            <h3 class="mb-2 text-sm font-bold text-white">📊 Status</h3>
            <div class="space-y-2 text-xs">
              <div class="flex justify-between">
                <span class="text-gray-400">Wires placed:</span>
                <span class="font-bold text-white">{{ wires.length }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Simulated:</span>
                <span :class="hasSimulated ? 'text-green-400' : 'text-gray-500'">
                  {{ hasSimulated ? "Yes" : "No" }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">LED Status:</span>
                <span :class="ledGlowing ? 'text-green-400 animate-pulse' : 'text-gray-500'">
                  {{ ledGlowing ? "🔆 ON" : "⚫ OFF" }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Center - Circuit Board -->
      <div class="relative flex-1 p-8 overflow-auto bg-gray-900" @mousemove="handleMouseMove">
        <!-- SVG Layer for wires -->
        <svg id="wire-svg" class="absolute inset-0 w-full h-full pointer-events-none" style="z-index: 10">
          <!-- Drawn wires -->
          <line
            v-for="wire in wires"
            :key="wire.id"
            :x1="wire.fromPos.x"
            :y1="wire.fromPos.y"
            :x2="wire.toPos.x"
            :y2="wire.toPos.y"
            :stroke="getWireColor(wire)"
            stroke-width="3"
            class="cursor-pointer pointer-events-auto"
            @click="removeWire(wire.id)"
          />

          <!-- Wire being drawn -->
          <line
            v-if="isDrawingWire && currentWireStart"
            :x1="currentWireStart.x"
            :y1="currentWireStart.y"
            :x2="mousePos.x"
            :y2="mousePos.y"
            stroke="#6B7280"
            stroke-width="3"
            stroke-dasharray="5,5"
            opacity="0.7"
          />
        </svg>

        <!-- Components Layer -->
        <div class="relative" style="width: 800px; height: 600px; margin: auto">
          <!-- Arduino Uno -->
          <div class="absolute" style="left: 50px; top: 100px; width: 200px">
            <div class="p-4 bg-blue-600 border-4 border-blue-800 rounded-lg shadow-2xl">
              <div class="mb-2 text-xs font-bold text-center text-white">Arduino Uno</div>
              <img src="/images/minigame/tei/arduino uno.png" alt="Arduino Uno" class="w-full h-auto" />

              <!-- Arduino pins (clickable) -->
              <div
                v-for="pin in arduinoPins"
                :key="pin.id"
                class="absolute w-4 h-4 transition-all border-2 border-white rounded-full cursor-pointer hover:scale-150"
                :class="{
                  'bg-black': pin.type === 'ground',
                  'bg-red-500': pin.type === 'power',
                  'bg-yellow-500': pin.type === 'digital',
                }"
                :style="{ left: `${pin.x - 58}px`, top: `${pin.y - 108}px` }"
                @click="isDrawingWire ? finishDrawingWire(pin) : startDrawingWire(pin)"
                :title="pin.label"
              ></div>
            </div>
          </div>

          <!-- Breadboard -->
          <div class="absolute" style="left: 300px; top: 100px; width: 300px; height: 400px">
            <div
              class="w-full h-full bg-linear-to-b from-amber-100 to-amber-200 rounded-lg shadow-2xl border-4 border-amber-300"
            >
              <div class="p-2 text-xs font-bold text-center text-gray-700">Breadboard</div>

              <!-- Breadboard connection points -->
              <div
                v-for="point in breadboardPoints"
                :key="point.id"
                class="absolute w-3 h-3 transition-all bg-gray-700 border border-gray-900 rounded-sm cursor-pointer hover:scale-150 hover:bg-green-500"
                :style="{ left: `${point.x - 308}px`, top: `${point.y - 108}px` }"
                @click="isDrawingWire ? finishDrawingWire(point) : startDrawingWire(point)"
                :title="point.label"
              ></div>
            </div>
          </div>

          <!-- LED (draggable) -->
          <div
            class="absolute cursor-move"
            :style="{ left: `${ledPosition.x}px`, top: `${ledPosition.y}px`, transform: 'translate(-50%, -50%)' }"
            @mousedown="startDragLed"
          >
            <div class="relative">
              <div
                class="w-12 h-16 rounded-full shadow-lg"
                :class="ledGlowing ? 'bg-red-500 animate-pulse shadow-red-500/50' : 'bg-red-800'"
              >
                <div class="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">LED</div>
              </div>

              <!-- LED pins -->
              <div
                v-for="pin in getLedPins"
                :key="pin.id"
                class="absolute w-3 h-3 transition-all border-2 border-white rounded-full cursor-pointer hover:scale-150"
                :class="pin.type === 'led-positive' ? 'bg-red-500' : 'bg-black'"
                :style="{
                  left: '50%',
                  top: pin.type === 'led-positive' ? '-8px' : 'calc(100% + 4px)',
                  transform: 'translateX(-50%)',
                }"
                @click.stop="isDrawingWire ? finishDrawingWire(pin) : startDrawingWire(pin)"
                :title="pin.label"
              ></div>
            </div>
          </div>

          <!-- Resistor (draggable) -->
          <div
            class="absolute cursor-move"
            :style="{
              left: `${resistorPosition.x}px`,
              top: `${resistorPosition.y}px`,
              transform: 'translate(-50%, -50%)',
            }"
            @mousedown="startDragResistor"
          >
            <div
              class="relative flex items-center justify-center w-20 h-8 bg-yellow-600 border-4 border-yellow-800 rounded shadow-lg"
            >
              <div class="text-xs font-bold text-white">220Ω</div>

              <!-- Resistor pins -->
              <div
                v-for="pin in getResistorPins"
                :key="pin.id"
                class="absolute w-3 h-3 transition-all bg-gray-700 border-2 border-white rounded-full cursor-pointer hover:scale-150"
                :style="{
                  left: pin.id === 'resistor-1' ? '-8px' : 'calc(100% + 4px)',
                  top: '50%',
                  transform: 'translateY(-50%)',
                }"
                @click.stop="isDrawingWire ? finishDrawingWire(pin) : startDrawingWire(pin)"
                :title="pin.label"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Sidebar - Controls -->
      <div class="w-64 p-4 overflow-y-auto bg-gray-800">
        <div class="space-y-4">
          <!-- Simulation Control -->
          <button
            v-if="!hasSimulated"
            @click="checkCircuit"
            :disabled="wires.length === 0"
            class="w-full py-4 text-lg font-bold text-white transition-all duration-300 transform rounded-lg shadow-lg bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ▶️ Run Simulation
          </button>

          <button
            v-else
            @click="clearAllWires"
            class="w-full py-4 text-lg font-bold text-white transition-all duration-300 transform rounded-lg shadow-lg bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:scale-105"
          >
            🔄 Reset Circuit
          </button>

          <button
            @click="clearAllWires"
            :disabled="wires.length === 0 && !hasSimulated"
            class="w-full py-2 text-sm font-semibold text-white transition-all bg-gray-700 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🗑️ Clear All Wires
          </button>

          <!-- Result Display -->
          <div
            v-if="hasSimulated"
            class="p-6 text-center border-2 rounded-lg animate-bounce-in"
            :class="
              isSuccess ? 'border-green-500 bg-green-500 bg-opacity-10' : 'border-red-500 bg-red-500 bg-opacity-10'
            "
          >
            <div class="text-4xl mb-2">
              {{ isSuccess ? "✅" : "❌" }}
            </div>
            <div class="text-lg font-bold mb-1" :class="isSuccess ? 'text-green-400' : 'text-red-400'">
              {{ isSuccess ? "Success!" : "Circuit Error!" }}
            </div>
            <div class="text-sm text-gray-300">
              {{ isSuccess ? "LED is glowing! Perfect circuit!" : "Check your connections and try again." }}
            </div>
          </div>

          <!-- Connection Hints -->
          <div class="p-4 bg-gray-700 rounded-lg">
            <h3 class="mb-2 text-sm font-bold text-white">💡 Connection Guide</h3>
            <div class="space-y-2 text-xs text-gray-300">
              <div class="flex items-center gap-2">
                <div class="w-4 h-4 bg-black rounded-full shrink-0"></div>
                <span>GND (Ground) - Black wire</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-4 h-4 bg-red-500 rounded-full shrink-0"></div>
                <span>Power/+ - Red wire</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-4 h-4 bg-blue-500 rounded-full shrink-0"></div>
                <span>Signal - Blue wire</span>
              </div>
            </div>
          </div>

          <!-- Valid Solutions -->
          <div class="p-4 bg-gray-700 rounded-lg">
            <h3 class="mb-2 text-sm font-bold text-white">✓ Valid Circuits</h3>
            <div class="space-y-3 text-xs text-gray-300">
              <div class="p-2 bg-gray-800 rounded">
                <div class="font-mono text-green-400">GND → R → LED(-) → LED(+) → Pin13</div>
              </div>
              <div class="p-2 bg-gray-800 rounded">
                <div class="font-mono text-green-400">Pin13 → LED(+) → LED(-) → R → GND</div>
              </div>
              <p class="text-xs text-gray-400 italic">
                * Both directions work!<br />
                * R = Resistor, LED(+/-) = LED pins
              </p>
            </div>
          </div>

          <!-- Component Info -->
          <div class="p-4 bg-gray-700 rounded-lg">
            <h3 class="mb-2 text-sm font-bold text-white">📖 Learn More</h3>
            <div class="space-y-2 text-xs text-gray-300">
              <p><strong>Pin 13:</strong> Digital output pin that provides 5V when HIGH</p>
              <p><strong>LED:</strong> Light Emitting Diode. Current flows from anode (+) to cathode (-)</p>
              <p><strong>Resistor:</strong> Limits current to protect LED from burning out</p>
              <p><strong>GND:</strong> Ground reference point (0V)</p>
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

kbd {
  font-family: monospace;
  font-size: 0.7rem;
  font-weight: 600;
}

/* Prevent text selection while dragging */
.cursor-move {
  user-select: none;
}
</style>
