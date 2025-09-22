<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Company {
  id: number
  name: string
  logo: string
  website?: string
}

interface CompanyData {
  [key: string]: Company[]
}

interface Props {
  majorName?: string
}

const props = withDefaults(defineProps<Props>(), {
  majorName: 'tkj'
})

const companiesData: CompanyData = {
  tkj: [
    { id: 1, name: 'Microsoft', logo: '/api/placeholder/200/80', website: 'https://microsoft.com' },
    { id: 2, name: 'Google', logo: '/api/placeholder/200/80', website: 'https://google.com' },
    { id: 3, name: 'IBM', logo: '/api/placeholder/200/80', website: 'https://ibm.com' },
    { id: 4, name: 'Amazon', logo: '/api/placeholder/200/80', website: 'https://amazon.com' },
    { id: 5, name: 'Oracle', logo: '/api/placeholder/200/80', website: 'https://oracle.com' },
    { id: 6, name: 'Cisco', logo: '/api/placeholder/200/80', website: 'https://cisco.com' }
  ]
}

const currentCompanies = computed(() => {
  return companiesData[props.majorName] || []
})

// Digandakan untuk menciptakan efek loop
const duplicatedCompanies = computed(() => {
  return [...currentCompanies.value, ...currentCompanies.value]
})

const sliderRef = ref<HTMLElement>()

onMounted(() => {
  if (sliderRef.value) {
    const count = currentCompanies.value.length
    const duration = count * 3 // 3 detik per logo
    sliderRef.value.style.setProperty('--animation-duration', `${duration}s`)
  }
})

const openCompanyWebsite = (company: Company) => {
  if (company.website) {
    window.open(company.website, '_blank')
  }
}
</script>

<template>
  <div class="w-full overflow-hidden py-12 relative bg-white">
    <div class="text-center text-black font-bold mb-8">
      <h2 class="text-4xl font-bold">Bekerja Sama Dengan Industri Berikut</h2>
    </div>

    <div class="relative w-full overflow-hidden h-[120px]">
      <div
        ref="sliderRef"
        class="slider-track"
      >
        <div
          v-for="(company, index) in duplicatedCompanies"
          :key="`${company.id}-${index}`"
          class="slide-item"
          @click="openCompanyWebsite(company)"
        >
          <img
            :src="company.logo"
            :alt="`${company.name} logo`"
            class="w-32 sm:w-40 md:w-44 h-16 sm:h-18 md:h-20 object-contain grayscale hover:grayscale-0 transition duration-300"
          />
          <p class="text-black mt-2 text-xs sm:text-sm text-center font-semibold px-2">
            {{ company.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slider-track {
  display: flex;
  gap: 2rem;
  width: max-content;
  animation: scroll-left var(--animation-duration, 30s) linear infinite;
}

.slide-item {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  margin-top: 0.5rem;
}

@keyframes scroll-left {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
