<template>
  <transition name="sidebar">
    <div v-if="isOpen" class="fixed inset-0 z-[100] flex">
      <div
        class="sidebar-backdrop fixed inset-0 bg-black/50 backdrop-blur-sm"
        @click="$emit('close')"
      ></div>

      <div class="sidebar-panel relative ml-auto flex h-full w-80 max-w-[90vw] flex-col bg-white shadow-2xl">
        <div class="flex flex-shrink-0 items-center justify-between border-b border-gray-200 p-4">
          <h2 class="text-lg font-bold text-gray-800">Menu</h2>
          <button
            @click="$emit('close')"
            class="rounded-full p-2 transition-colors duration-200 hover:bg-gray-100"
          >
            <Icon name="lucide:x" size="20" class="text-gray-600" />
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-4">
          <div v-for="(item, index) in menuItems" :key="index" class="mb-6">
            <h3 class="mb-3 text-base font-semibold text-gray-800">{{ item.title }}</h3>
            <div v-for="(sub, subIndex) in item.submenu" :key="subIndex" class="mb-3 ml-4 border-l-2 border-gray-200 transition-colors duration-200 hover:border-blue-300">
              <NuxtLink :to="sub.to" class="block">
                <div class="flex cursor-pointer items-start gap-3 rounded p-2 transition-colors duration-200 hover:bg-gray-50">
                  <Icon :name="sub.icon" size="18" class="mt-0.5 flex-shrink-0 text-blue-600" />
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">{{ sub.title }}</p>
                    <p class="text-xs leading-relaxed text-gray-600">{{ sub.desc }}</p>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
defineProps<{
  isOpen: boolean
  menuItems: Array<{
    title: string
    submenu: Array<{
      title: string
      desc: string
      icon: string
      to?: string
    }>
  }>
}>()

defineEmits<{
  close: []
}>()
</script>

<style scoped>
.sidebar-enter-active,
.sidebar-leave-active {
  transition: all 0.3s ease-in-out;
}

.sidebar-enter-from,
.sidebar-leave-to {
  opacity: 0;
}

.sidebar-enter-active .sidebar-panel,
.sidebar-leave-active .sidebar-panel {
    transition: transform 0.3s ease-in-out;
}

.sidebar-enter-from .sidebar-panel,
.sidebar-leave-to .sidebar-panel {
  transform: translateX(100%);
}

.sidebar-enter-active .sidebar-backdrop,
.sidebar-leave-active .sidebar-backdrop {
    transition: opacity 0.3s ease-in-out;
}

.sidebar-enter-from .sidebar-backdrop,
.sidebar-leave-to .sidebar-backdrop {
  opacity: 0;
}
</style>