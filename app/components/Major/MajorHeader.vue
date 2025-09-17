<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const headerClass = ref('bg-transparent border-b-transparent')
const sizeClass = ref('full')

const menuItems = [
  {
    title: 'Pengenalan',
    submenu: [
      { title: 'Apa itu RPL?', desc: 'Pengantar jurusan RPL', icon: 'lucide:info' },
      { title: 'Kurikulum', desc: 'Mata pelajaran yang dipelajari', icon: 'lucide:book' }
    ]
  },
  {
    title: 'Kompetensi',
    submenu: [
      { title: 'Programming', desc: 'Pengembangan perangkat lunak', icon: 'lucide:code' },
      { title: 'Database', desc: 'Manajemen data', icon: 'lucide:database' },
      { title: 'Web Development', desc: 'Pembuatan website', icon: 'lucide:globe' }
    ]
  },
  {
    title: 'Fasilitas',
    submenu: [
      { title: 'Lab Komputer', desc: 'Fasilitas praktikum', icon: 'lucide:monitor' },
      { title: 'Software', desc: 'Tools pengembangan', icon: 'lucide:tool' }
    ]
  },
  {
    title: 'Karir',
    submenu: [
      { title: 'Prospect Kerja', desc: 'Peluang karir lulusan', icon: 'lucide:briefcase' },
      { title: 'Alumni', desc: 'Kisah sukses alumni', icon: 'lucide:users' }
    ]
  }
]

onMounted(() => {
  const handleScroll = () => {
    if (window.scrollY > window.innerHeight) {
      headerClass.value = 'bg-orange-600/30 backdrop-blur-2xl border-b-orange-400'
      sizeClass.value = 'compact'
    } else {
      headerClass.value = 'bg-transparent border-b-transparent'
      sizeClass.value = 'full'
    }
  }
  window.addEventListener('scroll', handleScroll)
  // Call once to set initial state
  handleScroll()
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
})
</script>

<template>
<header :class="['z-100 border-b-1 fixed top-0 left-0 right-0 transition-all duration-500 ease-in-out', headerClass]">
    <div :class="(sizeClass === 'full' ? 'p-4 gap-5' : 'p-3 gap-4') + ' flex justify-around items-center transition-all duration-500 ease-in-out'">
        <div :class="(sizeClass === 'full' ? 'gap-5' : 'gap-3') + ' flex justify-center items-center transition-all duration-500 ease-in-out'">
            <img :src="'/images/majorIcon/rpl.webp'" :style="{ width: sizeClass === 'full' ? '60px' : '40px', transition: 'width 0.5s ease-in-out' }" alt="Logo Jurusan">
            <div class="flex flex-col">
                <h2 :style="{ fontSize: sizeClass === 'full' ? '1.5rem' : '1.125rem', transition: 'font-size 0.5s ease-in-out' }" class="font-bold">RPL</h2>
                <p :style="{ fontSize: sizeClass === 'full' ? '1rem' : '0.875rem', transition: 'font-size 0.5s ease-in-out' }">Rekayasa Perangkat Lunak</p>
            </div>
        </div>

        <div :class="(sizeClass === 'full' ? 'gap-5' : 'gap-4') + ' hidden md:flex transition-all duration-500 ease-in-out'">
            <div v-for="(item, index) in menuItems" :key="index" class="relative group">
                <div :class="(sizeClass === 'full' ? 'gap-3' : 'gap-2') + ' flex cursor-pointer items-center justify-center transition-all duration-500 ease-in-out'">
                    <p :style="{ fontSize: sizeClass === 'full' ? '1rem' : '0.875rem', transition: 'font-size 0.5s ease-in-out' }" class="group-hover:text-orange-600 transition-colors duration-300">{{ item.title }}</p>
                    <span class="group-hover:rotate-180 transition-transform duration-500 ease-in-out inline-flex items-center">
                        <Icon name="lucide:chevron-down" :size="sizeClass === 'full' ? 20 : 16" :style="{ transform: sizeClass === 'full' ? 'scale(1)' : 'scale(0.8)', transition: 'transform 0.5s ease-in-out' }" />
                    </span>
                </div>
                <!-- Submenu -->
                <div class="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-gray-200">
                    <div class="py-2">
                        <div v-for="(sub, subIndex) in item.submenu" :key="subIndex" class="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200">
                            <div class="flex items-center gap-3">
                                <Icon :name="sub.icon" size="20" class="text-orange-600" />
                                <div>
                                    <p class="font-medium text-gray-900">{{ sub.title }}</p>
                                    <p class="text-sm text-gray-600">{{ sub.desc }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="transition-all duration-500 ease-in-out">
            <button class="cursor-pointer">
                <Icon name="lucide:align-justify" :size="sizeClass === 'full' ? 30 : 24" :style="{ transform: sizeClass === 'full' ? 'scale(1)' : 'scale(0.8)', transition: 'transform 0.5s ease-in-out' }" />
            </button>
        </div>
    </div>
</header>
</template>