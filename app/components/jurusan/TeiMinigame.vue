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

const exitFullscreen = () => {
  minigameState.setIsRunning(false);
  emit("close");
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
    return "#404040"; // Dark Gray for ground
  }
  if (
    fromPin?.type === "power" ||
    toPin?.type === "power" ||
    fromPin?.type === "power-rail" ||
    toPin?.type === "power-rail" ||
    fromPin?.type === "led-positive" ||
    toPin?.type === "led-positive"
  ) {
    return "#f59e0b"; // Amber for power/positive
  }
  return "#06b6d4"; // Cyan for signal
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
  minigameState.setIsRunning(true);
  window.addEventListener("mousemove", handleDrag);
  window.addEventListener("mouseup", stopDrag);
  window.addEventListener("keydown", handleKeyPress);
});

onUnmounted(() => {
  window.removeEventListener("mousemove", handleDrag);
  window.removeEventListener("mouseup", stopDrag);
  window.removeEventListener("keydown", handleKeyPress);
});
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex flex-col font-nunito bg-linear-to-br from-green-700 via-green-600 to-green-900 text-white p-4 sm:p-6"
  >
    <!-- Header -->
    <div class="flex items-center justify-between pb-4 border-b border-white/20">
      <div class="flex items-center gap-4">
        <div class="p-2 rounded-lg bg-white/10">
          <svg class="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <h1 class="text-xl font-bold uppercase font-oswald sm:text-2xl">TEI Arduino Circuit</h1>
          <p class="text-sm text-white/70">Build Your First LED Circuit</p>
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
      <!-- Left Sidebar - Instructions -->
      <div
        class="w-full md:w-72 shrink-0 p-4 space-y-4 overflow-y-auto rounded-lg bg-black/20 backdrop-blur-sm border border-white/10"
      >
        <div class="p-4 border-l-4 border-orange-500 rounded-r-lg bg-black/20">
          <h3 class="mb-1 text-lg font-bold text-orange-400 font-oswald">Objective</h3>
          <p class="text-sm text-white/80">
            Connect the Arduino, LED, and Resistor to make the LED light up when Pin 13 is active!
          </p>
        </div>

        <div class="p-4 rounded-lg bg-black/20">
          <h3 class="mb-2 font-bold text-white font-oswald">Instructions</h3>
          <ol class="space-y-2 text-sm text-white/80 list-decimal list-inside">
            <li>Drag the LED and Resistor.</li>
            <li>Click a pin to start a wire.</li>
            <li>Click another pin to finish.</li>
            <li>Connect: <span class="font-mono text-yellow-300">GND → R → LED → Pin 13</span></li>
            <li>Click "Run Simulation" to test.</li>
          </ol>
        </div>

        <div class="p-4 rounded-lg bg-black/20">
          <h3 class="mb-2 font-bold text-white font-oswald">Status</h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-white/70">Wires:</span>
              <span class="font-bold">{{ wires.length }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-white/70">Simulated:</span>
              <span :class="hasSimulated ? 'text-green-400' : 'text-white/50'">
                {{ hasSimulated ? "Yes" : "No" }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-white/70">LED Status:</span>
              <span :class="ledGlowing ? 'text-red-400 animate-pulse' : 'text-white/50'">
                {{ ledGlowing ? "🔆 ON" : "⚫ OFF" }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Center - Circuit Board -->
      <div
        class="relative flex-1 p-4 sm:p-8 overflow-auto rounded-lg bg-black/20 backdrop-blur-sm border border-white/10"
        @mousemove="handleMouseMove"
      >
        <!-- SVG Layer for wires -->
        <svg id="wire-svg" class="absolute inset-0 w-full h-full pointer-events-none" style="z-index: 10">
          <!-- Drawn wires -->
          <g v-for="wire in wires" :key="wire.id">
            <line
              :x1="wire.fromPos.x"
              :y1="wire.fromPos.y"
              :x2="wire.toPos.x"
              :y2="wire.toPos.y"
              :stroke="getWireColor(wire)"
              stroke-width="4"
              class="transition-all"
            />
            <line
              :x1="wire.fromPos.x"
              :y1="wire.fromPos.y"
              :x2="wire.toPos.x"
              :y2="wire.toPos.y"
              stroke="white"
              stroke-width="10"
              stroke-opacity="0"
              class="cursor-pointer pointer-events-auto"
              @click="removeWire(wire.id)"
            />
          </g>

          <!-- Wire being drawn -->
          <line
            v-if="isDrawingWire && currentWireStart"
            :x1="currentWireStart.x"
            :y1="currentWireStart.y"
            :x2="mousePos.x"
            :y2="mousePos.y"
            stroke="#f59e0b"
            stroke-width="4"
            stroke-dasharray="8,6"
            opacity="0.8"
          />
        </svg>

        <!-- Components Layer -->
        <div class="relative" style="width: 800px; height: 600px; margin: auto">
          <!-- Arduino Uno -->
          <div class="absolute" style="left: 50px; top: 100px; width: 200px">
            <div class="p-4 bg-cyan-700/80 border-2 border-cyan-500/50 rounded-lg shadow-2xl">
              <div class="mb-2 text-xs font-bold text-center text-white/80 font-oswald">ARDUINO</div>
              <NuxtImg src="/images/minigame/tei/arduino uno.png" alt="Arduino Uno" class="w-full h-auto opacity-80" />

              <!-- Arduino pins (clickable) -->
              <div
                v-for="pin in arduinoPins"
                :key="pin.id"
                class="absolute w-4 h-4 transition-all border-2 border-white/50 rounded-full cursor-pointer hover:scale-150 hover:border-yellow-400"
                :class="{
                  'bg-gray-800': pin.type === 'ground',
                  'bg-red-600': pin.type === 'power',
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
            <div class="w-full h-full bg-white/5 backdrop-blur-sm rounded-lg shadow-2xl border-2 border-white/10">
              <div class="p-2 text-xs font-bold text-center text-white/50 font-oswald">BREADBOARD</div>

              <!-- Breadboard connection points -->
              <div
                v-for="point in breadboardPoints"
                :key="point.id"
                class="absolute w-3 h-3 transition-all bg-gray-900/50 border border-white/20 rounded-sm cursor-pointer hover:scale-150 hover:bg-yellow-500"
                :style="{ left: `${point.x - 308}px`, top: `${point.y - 108}px` }"
                @click="isDrawingWire ? finishDrawingWire(point) : startDrawingWire(point)"
                :title="point.label"
              ></div>
            </div>
          </div>

          <!-- LED (draggable) -->
          <div
            class="absolute cursor-move group"
            :style="{ left: `${ledPosition.x}px`, top: `${ledPosition.y}px`, transform: 'translate(-50%, -50%)' }"
            @mousedown="startDragLed"
          >
            <div class="relative">
              <div
                class="w-12 h-16 transition-all duration-300 rounded-full"
                :class="
                  ledGlowing ? 'bg-red-500 shadow-lg shadow-red-500/50' : 'bg-red-900/80 border-2 border-red-500/30'
                "
              >
                <div class="absolute inset-0 flex items-center justify-center text-xs font-bold text-white/80">LED</div>
              </div>

              <!-- LED pins -->
              <div
                v-for="pin in getLedPins"
                :key="pin.id"
                class="absolute w-3 h-3 transition-all border-2 border-white/50 rounded-full cursor-pointer group-hover:scale-150 hover:!scale-150 hover:border-yellow-400"
                :class="pin.type === 'led-positive' ? 'bg-red-600' : 'bg-gray-800'"
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
            class="absolute cursor-move group"
            :style="{
              left: `${resistorPosition.x}px`,
              top: `${resistorPosition.y}px`,
              transform: 'translate(-50%, -50%)',
            }"
            @mousedown="startDragResistor"
          >
            <div
              class="relative flex items-center justify-center w-20 h-8 bg-yellow-800/80 border-2 border-yellow-600/50 rounded shadow-lg"
            >
              <div class="text-xs font-bold text-white/80">220Ω</div>

              <!-- Resistor pins -->
              <div
                v-for="pin in getResistorPins"
                :key="pin.id"
                class="absolute w-3 h-3 transition-all bg-gray-800 border-2 border-white/50 rounded-full cursor-pointer group-hover:scale-150 hover:!scale-150 hover:border-yellow-400"
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

        <!-- Result Display -->
        <div
          v-if="hasSimulated"
          class="absolute inset-0 z-20 flex items-center justify-center p-4 bg-black/60 animate-fade-in"
          @click="clearAllWires"
        >
          <div
            class="p-8 text-center border-2 rounded-lg backdrop-blur-md animate-bounce-in"
            :class="isSuccess ? 'border-green-500 bg-blue-900/80' : 'border-red-500 bg-red-900/80'"
          >
            <div class="text-6xl mb-4">
              {{ isSuccess ? "✅" : "❌" }}
            </div>
            <div class="text-3xl font-bold mb-2 font-oswald" :class="isSuccess ? 'text-green-400' : 'text-red-400'">
              {{ isSuccess ? "Success!" : "Circuit Error!" }}
            </div>
            <div class="text-lg text-white/90 mb-6">
              {{ isSuccess ? "The LED is on! Perfect circuit!" : "Check your connections and try again." }}
            </div>
            <button class="px-6 py-2 font-bold text-white bg-white/10 rounded-lg hover:bg-white/20">
              Click to Reset
            </button>
          </div>
        </div>
      </div>

      <!-- Right Sidebar - Controls -->
      <div
        class="w-full md:w-72 shrink-0 p-4 space-y-4 overflow-y-auto rounded-lg bg-black/20 backdrop-blur-sm border border-white/10"
      >
        <!-- Simulation Control -->
        <button
          v-if="!hasSimulated"
          @click="checkCircuit"
          :disabled="wires.length === 0"
          class="w-full py-4 text-lg font-bold text-white transition-all duration-300 transform rounded-lg shadow-lg bg-gradient-to-r from-orange-500 to-yellow-500 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Run Simulation
        </button>

        <button
          v-else
          @click="clearAllWires"
          class="w-full py-4 text-lg font-bold text-white transition-all duration-300 transform rounded-lg shadow-lg bg-gradient-to-r from-sky-500 to-cyan-500 hover:scale-105"
        >
          Reset Circuit
        </button>

        <button
          @click="clearAllWires"
          :disabled="wires.length === 0 && !hasSimulated"
          class="w-full py-2 text-sm font-semibold text-white transition-all bg-white/10 rounded-lg hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Clear All Wires
        </button>

        <!-- Valid Solutions -->
        <div class="p-4 rounded-lg bg-black/20">
          <h3 class="mb-2 font-bold text-white font-oswald">Valid Circuits</h3>
          <div class="space-y-3 text-xs text-white/80">
            <div class="p-2 rounded bg-black/30">
              <div class="font-mono text-green-400">GND → R → LED(-) → LED(+) → Pin13</div>
            </div>
            <div class="p-2 rounded bg-black/30">
              <div class="font-mono text-green-400">Pin13 → LED(+) → LED(-) → R → GND</div>
            </div>
            <p class="text-xs text-white/60 italic">* R = Resistor, LED(+/-) = LED Pins</p>
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
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-bounce-in {
  animation: bounce-in 0.5s ease-out;
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

/* Prevent text selection while dragging */
.cursor-move {
  user-select: none;
}
</style>
