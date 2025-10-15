<script setup lang="ts">
import type { Staff } from '~/models/Staff'

interface OrgNode {
  id: string
  name: string
  position: string
  image: string
  level: number
  children?: OrgNode[]
  department?: string
}

// Mock organizational structure data
const orgData = ref<OrgNode[]>([
  {
    id: 'kepsek',
    name: 'Sumijah S.Pd, M.Si',
    position: 'Kepala Sekolah',
    image: '/images/kepsek.webp',
    level: 1,
    children: [
      {
        id: 'wakasek-kesiswaan',
        name: 'Wakil Kepala Sekolah',
        position: 'Wakil Kepala Sekolah Bagian Kesiswaan',
        image: '/images/placeholder.jpg',
        level: 2,
        department: 'kesiswaan',
        children: []
      },
      {
        id: 'wakasek-kurikulum',
        name: 'Wakil Kepala Sekolah',
        position: 'Wakil Kepala Sekolah Bagian Kurikulum',
        image: '/images/placeholder.jpg',
        level: 2,
        department: 'kurikulum',
        children: []
      },
      {
        id: 'wakasek-sarpras',
        name: 'Wakil Kepala Sekolah',
        position: 'Wakil Kepala Sekolah Bagian Sarpras',
        image: '/images/placeholder.jpg',
        level: 2,
        department: 'sapras',
        children: []
      },
      {
        id: 'wakasek-humas',
        name: 'Wakil Kepala Sekolah',
        position: 'Wakil Kepala Sekolah Bagian Humas',
        image: '/images/placeholder.jpg',
        level: 2,
        department: 'humas',
        children: []
      }
    ]
  }
])

// Fetch staff data for each department
const staffData = ref<Record<string, Staff[]>>({})

onMounted(async () => {
  try {
    const response = await $fetch('/api/staff')
    staffData.value = response as Record<string, Staff[]>

    // Update orgData with actual staff data
    if (orgData.value[0] && orgData.value[0].children) {
      orgData.value[0].children.forEach(child => {
        if (child.department && staffData.value[child.department]) {
          child.children = staffData.value[child.department]?.map((staff, index) => ({
            id: `${child.department}-${index}`,
            name: staff.name,
            position: staff.position,
            image: staff.image,
            level: 3
          })) || []
        }
      })
    }
  } catch (error) {
    console.error('Failed to fetch staff data:', error)
  }
})

// Animation states
const visibleNodes = ref<Set<string>>(new Set())
const hoveredNode = ref<string | null>(null)

// Refs for position calculation
const chartContainer = ref<HTMLElement>()
const cardRefs = ref<Record<string, HTMLElement>>({})

// Animate nodes on mount
onMounted(() => {
  setTimeout(() => {
    visibleNodes.value.add('kepsek')
  }, 200)

  setTimeout(() => {
    if (orgData.value[0]?.children) {
      orgData.value[0].children.forEach(child => {
        visibleNodes.value.add(child.id)
      })
    }
  }, 600)

  setTimeout(() => {
    if (orgData.value[0]?.children) {
      orgData.value[0].children.forEach(child => {
        child.children?.forEach(grandchild => {
          visibleNodes.value.add(grandchild.id)
        })
      })
    }
  }, 1000)
})

const getNodeColor = (level: number) => {
  switch (level) {
    case 1: return 'from-purple-500 to-purple-700'
    case 2: return 'from-blue-500 to-blue-700'
    case 3: return 'from-green-500 to-green-700'
    default: return 'from-gray-500 to-gray-700'
  }
}

const getNodeSize = (level: number) => {
  switch (level) {
    case 1: return 'w-32 h-32'
    case 2: return 'w-24 h-24'
    case 3: return 'w-20 h-20'
    default: return 'w-16 h-16'
  }
}

const getNodeShadow = (level: number) => {
  switch (level) {
    case 1: return 'shadow-2xl'
    case 2: return 'shadow-xl'
    case 3: return 'shadow-lg'
    default: return 'shadow-md'
  }
}

// Function to calculate card positions
const getCardPosition = (nodeId: string) => {
  const card = cardRefs.value[nodeId]
  if (!card || !chartContainer.value) return null

  const containerRect = chartContainer.value.getBoundingClientRect()
  const cardRect = card.getBoundingClientRect()

  return {
    x: cardRect.left - containerRect.left + cardRect.width / 2,
    y: cardRect.top - containerRect.top + cardRect.height / 2,
    width: cardRect.width,
    height: cardRect.height
  }
}

// Generate connecting lines data
const connectingLines = computed(() => {
  const lines: Array<{from: {x: number, y: number}, to: {x: number, y: number}, level: number}> = []

  const addLines = (node: OrgNode) => {
    if (node.children) {
      const parentPos = getCardPosition(node.id)
      if (parentPos) {
        node.children.forEach(child => {
          const childPos = getCardPosition(child.id)
          if (childPos) {
            lines.push({
              from: { x: parentPos.x, y: parentPos.y + parentPos.height / 2 },
              to: { x: childPos.x, y: childPos.y - childPos.height / 2 },
              level: node.level
            })
          }
          addLines(child)
        })
      }
    }
  }

  orgData.value.forEach(node => addLines(node))
  return lines
})
</script>

<template>
  <div ref="chartContainer" class="relative w-full overflow-hidden">
    <!-- Background decorative elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-10 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute top-40 right-20 w-24 h-24 bg-purple-200/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div class="absolute bottom-20 left-1/4 w-20 h-20 bg-green-200/20 rounded-full blur-xl animate-pulse delay-2000"></div>
    </div>

    <!-- Organizational Chart -->
    <div class="relative z-10 py-16">
      <!-- Dynamic Connecting Lines -->
      <svg class="absolute inset-0 w-full h-full pointer-events-none z-0" style="overflow: visible;">
        <defs>
          <linearGradient id="line-gradient-1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#8B5CF6" stop-opacity="0.8"/>
            <stop offset="100%" stop-color="#3B82F6" stop-opacity="0.6"/>
          </linearGradient>
          <linearGradient id="line-gradient-2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.8"/>
            <stop offset="100%" stop-color="#10B981" stop-opacity="0.6"/>
          </linearGradient>
        </defs>
        <g v-for="line in connectingLines" :key="`line-${line.from.x}-${line.from.y}-${line.to.x}-${line.to.y}`">
          <path
            :d="`M ${line.from.x} ${line.from.y} Q ${line.from.x} ${(line.from.y + line.to.y) / 2} ${line.to.x} ${line.to.y}`"
            :stroke="`url(#line-gradient-${line.level})`"
            stroke-width="2"
            fill="none"
            class="opacity-0 animate-fade-in"
            style="animation-delay: 1.2s; animation-duration: 1s;"
          />
        </g>
      </svg>
      <!-- Level 1: Kepala Sekolah -->
      <div class="flex justify-center mb-16">
        <div
          v-for="node in orgData"
          :key="node.id"
          ref="cardRefs[node.id] = $el"
          class="relative group"
          :class="{
            'opacity-0 scale-75': !visibleNodes.has(node.id),
            'opacity-100 scale-100': visibleNodes.has(node.id)
          }"
          style="transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
        >
          <!-- Connection line to children -->
          <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-purple-400 to-transparent"></div>

          <!-- Node Card -->
          <div
            class="relative bg-white/90 backdrop-blur-sm border-2 border-white/50 rounded-2xl p-4 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
            @mouseenter="hoveredNode = node.id"
            @mouseleave="hoveredNode = null"
          >
            <!-- Avatar -->
            <div class="flex justify-center mb-3">
              <div :class="`relative ${getNodeSize(node.level)} rounded-full overflow-hidden border-4 border-white ${getNodeShadow(node.level)}`">
                <img
                  :src="node.image"
                  :alt="node.name"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div :class="`absolute inset-0 bg-gradient-to-t ${getNodeColor(node.level)} opacity-0 group-hover:opacity-20 transition-opacity duration-300`"></div>
              </div>
            </div>

            <!-- Info -->
            <div class="text-center">
              <h3 class="font-bold text-gray-800 text-sm leading-tight mb-1">{{ node.name }}</h3>
              <p class="text-xs text-gray-600 leading-tight">{{ node.position }}</p>
            </div>

            <!-- Hover effect -->
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      </div>

      <!-- Connecting line from Kepala Sekolah to all Wakasek -->
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl pointer-events-none">
        <svg class="w-full h-32" viewBox="0 0 600 128" preserveAspectRatio="none">
          <!-- Horizontal line from center -->
          <line x1="300" y1="64" x2="75" y2="64" stroke="url(#gradient1)" stroke-width="2" class="opacity-60"/>
          <line x1="300" y1="64" x2="525" y2="64" stroke="url(#gradient1)" stroke-width="2" class="opacity-60"/>
          <!-- Vertical lines to each wakasek -->
          <line x1="75" y1="64" x2="75" y2="128" stroke="url(#gradient2)" stroke-width="2" class="opacity-60"/>
          <line x1="187.5" y1="64" x2="187.5" y2="128" stroke="url(#gradient2)" stroke-width="2" class="opacity-60"/>
          <line x1="300" y1="64" x2="300" y2="128" stroke="url(#gradient2)" stroke-width="2" class="opacity-60"/>
          <line x1="412.5" y1="64" x2="412.5" y2="128" stroke="url(#gradient2)" stroke-width="2" class="opacity-60"/>
          <line x1="525" y1="64" x2="525" y2="128" stroke="url(#gradient2)" stroke-width="2" class="opacity-60"/>
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#8B5CF6" stop-opacity="0.6"/>
              <stop offset="50%" stop-color="#3B82F6" stop-opacity="0.8"/>
              <stop offset="100%" stop-color="#8B5CF6" stop-opacity="0.6"/>
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.8"/>
              <stop offset="100%" stop-color="#10B981" stop-opacity="0.6"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <!-- Level 2: Wakil Kepala Sekolah -->
      <div class="flex justify-center flex-wrap gap-8 mb-16 relative">
        <div
          v-for="(node, index) in orgData[0]?.children || []"
          :key="node.id"
          ref="cardRefs[node.id] = $el"
          class="relative group"
          :class="{
            'opacity-0 scale-75 translate-y-8': !visibleNodes.has(node.id),
            'opacity-100 scale-100 translate-y-0': visibleNodes.has(node.id)
          }"
          style="transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
        >
          <!-- Connection line to children -->
          <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-12 bg-gradient-to-b from-blue-400 to-transparent"></div>

          <!-- Node Card -->
          <div
            class="relative bg-white/90 backdrop-blur-sm border-2 border-white/50 rounded-xl p-3 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 cursor-pointer"
            @mouseenter="hoveredNode = node.id"
            @mouseleave="hoveredNode = null"
          >
            <!-- Avatar -->
            <div class="flex justify-center mb-2">
              <div :class="`relative ${getNodeSize(node.level)} rounded-full overflow-hidden border-3 border-white ${getNodeShadow(node.level)}`">
                <img
                  :src="node.image"
                  :alt="node.name"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div :class="`absolute inset-0 bg-gradient-to-t ${getNodeColor(node.level)} opacity-0 group-hover:opacity-20 transition-opacity duration-300`"></div>
              </div>
            </div>

            <!-- Info -->
            <div class="text-center">
              <h3 class="font-semibold text-gray-800 text-xs leading-tight mb-1">{{ node.name }}</h3>
              <p class="text-xs text-gray-600 leading-tight">{{ node.position }}</p>
            </div>

            <!-- Hover effect -->
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      </div>

      <!-- Level 3: Staff -->
      <div class="flex justify-center flex-wrap gap-4">
        <div
          v-for="parent in orgData[0]?.children || []"
          :key="`group-${parent.id}`"
          class="flex flex-wrap justify-center gap-3"
        >
          <div
            v-for="node in parent.children || []"
            :key="node.id"
            ref="cardRefs[node.id] = $el"
            class="relative group"
            :class="{
              'opacity-0 scale-75 translate-y-4': !visibleNodes.has(node.id),
              'opacity-100 scale-100 translate-y-0': visibleNodes.has(node.id)
            }"
            style="transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
          >
            <!-- Node Card -->
            <div
              class="relative bg-white/90 backdrop-blur-sm border-2 border-white/50 rounded-lg p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              @mouseenter="hoveredNode = node.id"
              @mouseleave="hoveredNode = null"
            >
              <!-- Avatar -->
              <div class="flex justify-center mb-1">
                <div :class="`relative ${getNodeSize(node.level)} rounded-full overflow-hidden border-2 border-white ${getNodeShadow(node.level)}`">
                  <img
                    :src="node.image"
                    :alt="node.name"
                    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div :class="`absolute inset-0 bg-gradient-to-t ${getNodeColor(node.level)} opacity-0 group-hover:opacity-20 transition-opacity duration-300`"></div>
                </div>
              </div>

              <!-- Info -->
              <div class="text-center">
                <h3 class="font-medium text-gray-800 text-xs leading-tight mb-0.5">{{ node.name }}</h3>
                <p class="text-xs text-gray-600 leading-tight">{{ node.position }}</p>
              </div>

              <!-- Hover effect -->
              <div class="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Legend -->
    <div class="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
      <h4 class="text-sm font-semibold text-gray-800 mb-2">Legenda</h4>
      <div class="space-y-1 text-xs">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full"></div>
          <span>Kepala Sekolah</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"></div>
          <span>Wakil Kepala Sekolah</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 bg-gradient-to-r from-green-500 to-green-700 rounded-full"></div>
          <span>Staff</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shadow-3xl {
  box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
}

@keyframes fade-in {
  from {
    opacity: 0;
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
  }
  to {
    opacity: 0.7;
    stroke-dasharray: 1000;
    stroke-dashoffset: 0;
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}
</style>