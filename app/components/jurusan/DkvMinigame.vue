<!-- @ts-nocheck -->
<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['close'])

// Game state
const currentSketchIndex = ref(0)
const activeColor = ref('#FF5733')
const activeTool = ref<'bucket' | 'eyedropper'>('bucket')
const canvasRef = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)
const sketchImage = ref<HTMLImageElement | null>(null)
const coloredPixels = ref<ImageData | null>(null)
const isLoading = ref(true)

// Available sketches
const sketches = [
  { id: 1, name: 'Ino Pose 1', sketch: '/images/minigame/dkv/Ino1_sket.png', reference: '/images/minigame/dkv/Ino1_color.png' },
  { id: 2, name: 'Ino Pose 2', sketch: '/images/minigame/dkv/Ino2_sket.png', reference: '/images/minigame/dkv/Ino2_color.png' },
  { id: 3, name: 'Ino Pose 3', sketch: '/images/minigame/dkv/Ino pose 3 sketc.png', reference: '/images/minigame/dkv/Ino pose 1 color_.png' },
  { id: 4, name: 'Ino Pose 4', sketch: '/images/minigame/dkv/Ino pose 4 sketc.png', reference: '/images/minigame/dkv/Ino pose 4 color.png' },
  { id: 5, name: 'Rasi Pose 1', sketch: '/images/minigame/dkv/Rasi pose 1 sketc.png', reference: '/images/minigame/dkv/Rasi pose 1 color.png' },
  { id: 6, name: 'Rasi Pose 2', sketch: '/images/minigame/dkv/Rasi1_sket.png', reference: '/images/minigame/dkv/Rasi1_color.png' },
  { id: 7, name: 'Rasi Pose 3', sketch: '/images/minigame/dkv/Rasi2_sket.png', reference: '/images/minigame/dkv/Rasi2_color.png' },
  { id: 8, name: 'Rasi Pose 4', sketch: '/images/minigame/dkv/Rasi pose 4 sketc.png', reference: '/images/minigame/dkv/Rasi pose 4 color.png' },
]

// Color palette
const colorPalette = [
  // Basic colors
  '#FF5733', '#FFC300', '#DAF7A6', '#33FF57', '#33D4FF',
  '#3357FF', '#8E44AD', '#E91E63', '#FF6B9D', '#FFFFFF',
  // Skin tones
  '#FFE0BD', '#F1C27D', '#E0AC69', '#C68642', '#8D5524',
  // Dark colors
  '#000000', '#2C3E50', '#34495E', '#7F8C8D', '#95A5A6',
  // Pastels
  '#FFB6C1', '#FFE4B5', '#E6E6FA', '#B0E0E6', '#F0E68C',
]

const currentSketch = computed(() => sketches[currentSketchIndex.value]!)

// Fullscreen management
const enterFullscreen = () => {
  const element = document.documentElement as any
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen()
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen()
  }
}

const exitFullscreen = () => {
  const doc = document as any
  if (doc.exitFullscreen) {
    doc.exitFullscreen()
  } else if (doc.webkitExitFullscreen) {
    doc.webkitExitFullscreen()
  } else if (doc.msExitFullscreen) {
    doc.msExitFullscreen()
  }
  emit('close')
}

// Load sketch image
const loadSketch = async () => {
  isLoading.value = true
  const img = new Image()
  img.crossOrigin = 'anonymous'
  
  img.onload = () => {
    sketchImage.value = img
    initCanvas()
    isLoading.value = false
  }
  
  img.onerror = () => {
    console.error('Failed to load sketch image')
    isLoading.value = false
  }
  
  if (currentSketch.value) {
    img.src = currentSketch.value.sketch
  }
}

// Initialize canvas
const initCanvas = () => {
  if (!canvasRef.value || !sketchImage.value) return
  
  const canvas = canvasRef.value
  const image = sketchImage.value
  
  // Set canvas size to match image
  canvas.width = image.width
  canvas.height = image.height
  
  ctx.value = canvas.getContext('2d', { willReadFrequently: true })
  
  if (ctx.value) {
    // Draw the sketch
    ctx.value.clearRect(0, 0, canvas.width, canvas.height)
    ctx.value.fillStyle = '#FFFFFF'
    ctx.value.fillRect(0, 0, canvas.width, canvas.height)
    ctx.value.drawImage(image, 0, 0)
    
    // Store the current colored pixels
    coloredPixels.value = ctx.value.getImageData(0, 0, canvas.width, canvas.height)
  }
}

// Flood fill algorithm (paint bucket)
const floodFill = (x: number, y: number, fillColor: string) => {
  if (!ctx.value || !canvasRef.value || !coloredPixels.value) return
  
  const canvas = canvasRef.value
  const imageData = ctx.value.getImageData(0, 0, canvas.width, canvas.height)
  const pixels = imageData.data
  
  // Convert hex color to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1]!, 16),
      g: parseInt(result[2]!, 16),
      b: parseInt(result[3]!, 16)
    } : null
  }
  
  const fillRgb = hexToRgb(fillColor)
  if (!fillRgb) return
  
  const startPos = (y * canvas.width + x) * 4
  const startR = pixels[startPos]!
  const startG = pixels[startPos + 1]!
  const startB = pixels[startPos + 2]!
  
  // Don't fill if clicking on black lines (sketch outline)
  if (startR < 50 && startG < 50 && startB < 50) return
  
  // Don't fill if already the same color
  if (startR === fillRgb.r && startG === fillRgb.g && startB === fillRgb.b) return
  
  const stack: [number, number][] = [[x, y]]
  const visited = new Set<string>()
  
  while (stack.length > 0) {
    const [cx, cy] = stack.pop()!
    const key = `${cx},${cy}`
    
    if (visited.has(key)) continue
    if (cx < 0 || cx >= canvas.width || cy < 0 || cy >= canvas.height) continue
    
    visited.add(key)
    
    const pos = (cy * canvas.width + cx) * 4
    const r = pixels[pos]!
    const g = pixels[pos + 1]!
    const b = pixels[pos + 2]!
    
    // Stop at black lines (sketch outline)
    if (r < 50 && g < 50 && b < 50) continue
    
    // Check if pixel matches start color (with tolerance)
    const tolerance = 30
    if (
      Math.abs(r - startR!) <= tolerance &&
      Math.abs(g - startG!) <= tolerance &&
      Math.abs(b - startB!) <= tolerance
    ) {
      // Fill this pixel
      pixels[pos] = fillRgb.r
      pixels[pos + 1] = fillRgb.g
      pixels[pos + 2] = fillRgb.b
      pixels[pos + 3] = 255
      
      // Add neighbors to stack
      stack.push([cx + 1, cy])
      stack.push([cx - 1, cy])
      stack.push([cx, cy + 1])
      stack.push([cx, cy - 1])
    }
  }
  
  ctx.value.putImageData(imageData, 0, 0)
  coloredPixels.value = imageData
}

// Eyedropper tool
const pickColor = (x: number, y: number) => {
  if (!ctx.value || !canvasRef.value) return
  
  const canvas = canvasRef.value
  const imageData = ctx.value.getImageData(x, y, 1, 1)
  const pixels = imageData.data
  
  const r = pixels[0]!
  const g = pixels[1]!
  const b = pixels[2]!
  
  // Don't pick black (sketch lines)
  if (r < 50 && g < 50 && b < 50) return
  
  // Convert RGB to hex
  const rgbToHex = (r: number, g: number, b: number) => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }).join('')
  }
  
  activeColor.value = rgbToHex(r, g, b)
  activeTool.value = 'bucket'
}

// Handle canvas click
const handleCanvasClick = (event: MouseEvent) => {
  if (!canvasRef.value) return
  
  const canvas = canvasRef.value
  const rect = canvas.getBoundingClientRect()
  const scaleX = canvas.width / rect.width
  const scaleY = canvas.height / rect.height
  
  const x = Math.floor((event.clientX - rect.left) * scaleX)
  const y = Math.floor((event.clientY - rect.top) * scaleY)
  
  if (activeTool.value === 'bucket') {
    floodFill(x, y, activeColor.value)
  } else if (activeTool.value === 'eyedropper') {
    pickColor(x, y)
  }
}

// Select sketch
const selectSketch = (index: number) => {
  currentSketchIndex.value = index
  loadSketch()
}

// Reset canvas
const resetCanvas = () => {
  if (!sketchImage.value) return
  initCanvas()
}

// Download artwork
const downloadArtwork = () => {
  if (!canvasRef.value || !currentSketch.value) return
  
  const canvas = canvasRef.value
  const link = document.createElement('a')
  link.download = `dkv-coloring-${currentSketch.value.name.toLowerCase().replace(/\s+/g, '-')}.png`
  link.href = canvas.toDataURL()
  link.click()
}

// Keyboard shortcuts
const handleKeyPress = (event: KeyboardEvent) => {
  if (event.key === 'b' || event.key === 'B') {
    activeTool.value = 'bucket'
  } else if (event.key === 'i' || event.key === 'I') {
    activeTool.value = 'eyedropper'
  } else if (event.key === 'r' || event.key === 'R') {
    resetCanvas()
  }
}

onMounted(() => {
  enterFullscreen()
  loadSketch()
  window.addEventListener('keydown', handleKeyPress)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress)
})
</script>

<template>
  <div class="fixed inset-0 z-50 flex flex-col bg-linear-to-br from-purple-50 via-pink-50 to-blue-50">
    <!-- Header -->
    <div class="flex items-center justify-between p-4 bg-white shadow-lg md:p-6">
      <div class="flex items-center gap-3">
        <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-r from-purple-500 to-pink-500">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        </div>
        <div>
          <h1 class="text-lg font-bold text-gray-800 md:text-2xl">DKV Coloring Book</h1>
          <p class="text-xs text-gray-500 md:text-sm">Digital Art & Design</p>
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
      <!-- Left Sidebar - Sketch Selector -->
      <div class="w-48 p-4 overflow-y-auto bg-white border-r md:w-64">
        <h3 class="mb-3 text-sm font-bold text-gray-700 md:text-base">Select Sketch</h3>
        <div class="space-y-2">
          <button
            v-for="(sketch, index) in sketches"
            :key="sketch.id"
            @click="selectSketch(index)"
            class="relative w-full p-2 overflow-hidden text-left transition-all duration-200 border-2 rounded-lg group"
            :class="currentSketchIndex === index ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'"
          >
            <div class="flex items-center gap-2">
              <div class="shrink-0 w-12 h-12 overflow-hidden bg-gray-100 rounded md:w-16 md:h-16">
                <img :src="sketch.sketch" :alt="sketch.name" class="object-cover w-full h-full">
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-semibold text-gray-800 truncate md:text-sm">{{ sketch.name }}</p>
                <p class="text-xs text-gray-500">{{ index + 1 }}/{{ sketches.length }}</p>
              </div>
            </div>
            <div
              v-if="currentSketchIndex === index"
              class="absolute top-2 right-2"
            >
              <div class="w-3 h-3 bg-purple-500 rounded-full"></div>
            </div>
          </button>
        </div>
      </div>

      <!-- Center - Canvas Area -->
      <div class="flex flex-col flex-1 p-4 overflow-hidden md:p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-bold text-gray-800 md:text-xl">{{ currentSketch.name }}</h2>
          <div class="flex gap-2">
            <button
              @click="downloadArtwork"
              class="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-white transition-all rounded-lg bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              title="Download your artwork"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span class="hidden md:inline">Save</span>
            </button>
            <button
              @click="resetCanvas"
              class="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-white transition-all rounded-lg bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
              title="Reset canvas (R key)"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span class="hidden md:inline">Reset</span>
            </button>
          </div>
        </div>

        <!-- Canvas -->
        <div class="flex items-center justify-center flex-1 overflow-auto bg-white border-2 border-gray-200 rounded-lg shadow-inner">
          <div v-if="isLoading" class="text-center">
            <div class="w-16 h-16 mx-auto border-4 border-purple-200 rounded-full animate-spin border-t-purple-500"></div>
            <p class="mt-4 text-gray-600">Loading sketch...</p>
          </div>
          <canvas
            v-else
            ref="canvasRef"
            @click="handleCanvasClick"
            class="max-w-full max-h-full cursor-crosshair"
            :class="activeTool === 'eyedropper' ? 'cursor-crosshair' : 'cursor-pointer'"
          ></canvas>
        </div>
      </div>

      <!-- Right Sidebar - Tools & Colors -->
      <div class="w-48 p-4 overflow-y-auto bg-white border-l md:w-64">
        <!-- Tools -->
        <div class="mb-6">
          <h3 class="mb-3 text-sm font-bold text-gray-700 md:text-base">Tools</h3>
          <div class="space-y-2">
            <button
              @click="activeTool = 'bucket'"
              class="flex items-center w-full gap-3 px-3 py-3 text-left transition-all border-2 rounded-lg"
              :class="activeTool === 'bucket' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'"
            >
              <svg class="shrink-0 w-5 h-5" :class="activeTool === 'bucket' ? 'text-purple-500' : 'text-gray-600'" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold" :class="activeTool === 'bucket' ? 'text-purple-700' : 'text-gray-800'">Paint Bucket</p>
                <p class="text-xs text-gray-500">Press B</p>
              </div>
            </button>

            <button
              @click="activeTool = 'eyedropper'"
              class="flex items-center w-full gap-3 px-3 py-3 text-left transition-all border-2 rounded-lg"
              :class="activeTool === 'eyedropper' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'"
            >
              <svg class="shrink-0 w-5 h-5" :class="activeTool === 'eyedropper' ? 'text-purple-500' : 'text-gray-600'" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold" :class="activeTool === 'eyedropper' ? 'text-purple-700' : 'text-gray-800'">Eyedropper</p>
                <p class="text-xs text-gray-500">Press I</p>
              </div>
            </button>
          </div>
        </div>

        <!-- Active Color -->
        <div class="mb-6">
          <h3 class="mb-3 text-sm font-bold text-gray-700 md:text-base">Active Color</h3>
          <div class="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg">
            <div
              class="shrink-0 w-12 h-12 border-2 border-gray-300 rounded-lg shadow-inner"
              :style="{ backgroundColor: activeColor }"
            ></div>
            <div class="flex-1 min-w-0">
              <p class="text-xs font-mono text-gray-600 uppercase">{{ activeColor }}</p>
            </div>
          </div>
        </div>

        <!-- Color Palette -->
        <div>
          <h3 class="mb-3 text-sm font-bold text-gray-700 md:text-base">Color Palette</h3>
          <div class="grid grid-cols-5 gap-2">
            <button
              v-for="color in colorPalette"
              :key="color"
              @click="activeColor = color; activeTool = 'bucket'"
              class="relative w-full transition-all border-2 rounded-lg shadow-sm aspect-square hover:scale-110"
              :class="activeColor === color ? 'border-purple-500 ring-2 ring-purple-300' : 'border-gray-300'"
              :style="{ backgroundColor: color }"
              :title="color"
            >
              <div
                v-if="activeColor === color"
                class="absolute inset-0 flex items-center justify-center"
              >
                <svg class="w-4 h-4" :class="color === '#FFFFFF' || color === '#FFE0BD' ? 'text-gray-800' : 'text-white'" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
            </button>
          </div>
        </div>

        <!-- Quick Tips -->
        <div class="p-3 mt-6 border-2 border-purple-200 rounded-lg bg-purple-50">
          <h4 class="mb-2 text-xs font-bold text-purple-700">Quick Tips:</h4>
          <ul class="space-y-1 text-xs text-purple-600">
            <li>• Press <kbd class="px-1 bg-white rounded">B</kbd> for Bucket</li>
            <li>• Press <kbd class="px-1 bg-white rounded">I</kbd> for Eyedropper</li>
            <li>• Press <kbd class="px-1 bg-white rounded">R</kbd> to Reset</li>
            <li>• Click areas to fill with color</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
kbd {
  font-family: monospace;
  font-size: 0.75rem;
  font-weight: 600;
}

canvas {
  image-rendering: crisp-edges;
  image-rendering: -moz-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
}
</style>
