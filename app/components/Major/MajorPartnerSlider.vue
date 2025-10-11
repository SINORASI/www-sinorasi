<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import type { MajorName } from "~/models/MajorName";

const props = defineProps<{
  major?: MajorName;
}>();

interface Company {
  id: number;
  name: string;
  logo: string;
  website?: string;
}

const route = useRoute();
const major = props.major || (route.params.majorName as MajorName);

// Fetch partners data from API
const { data: partnersData } = await useFetch<Company[]>(`/api/partners/${major}`);

const currentCompanies = computed(() => {
  return partnersData.value || [];
});

// Triple the array for seamless infinite loop
const duplicatedCompanies = computed(() => {
  const base = currentCompanies.value;
  return [...base, ...base, ...base];
});

const sliderRef = ref<HTMLElement>();

onMounted(() => {
  if (sliderRef.value && currentCompanies.value.length > 0) {
    const count = currentCompanies.value.length;
    const duration = count * 3; // 3 seconds per item
    sliderRef.value.style.setProperty("--animation-duration", `${duration}s`);
  }
});

const openCompanyWebsite = (company: Company) => {
  if (company.website) {
    window.open(company.website, "_blank");
  }
};
</script>

<template>
  <div class="w-full py-12 overflow-hidden bg-white">
    <div class="relative w-full overflow-hidden">
      <div class="absolute top-0 bottom-0 left-0 z-10 w-32 bg-gradient-to-r from-white to-transparent"></div>
      <div class="absolute top-0 bottom-0 right-0 z-10 w-32 bg-gradient-to-l from-white to-transparent"></div>

      <div class="py-8">
        <div ref="sliderRef" class="flex gap-12 slider-track w-max">
          <div
            v-for="(company, index) in duplicatedCompanies"
            :key="`${company.id}-${index}`"
            class="flex flex-col items-center transition-transform duration-300 slide-item shrink-0"
            @click="openCompanyWebsite(company)"
          >
            <div class="company-card p-6 rounded-[1rem] transition-all duration-300 cursor-pointer hover:-translate-y-1">
              <img
                :src="company.logo"
                :alt="`${company.name} logo`"
                class="object-contain h-20 transition-all duration-300 w-28 sm:w-36 sm:h-24 grayscale hover:grayscale-0"
              />
            </div>
            <p class="mt-3 text-xs font-semibold text-center text-gray-700 sm:text-sm">
              {{ company.name }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slider-track {
  animation: scroll-left var(--animation-duration, 30s) linear infinite;
}

.slider-track:hover {
  animation-play-state: paused;
}

@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-100% / 3));
  }
}
</style>
