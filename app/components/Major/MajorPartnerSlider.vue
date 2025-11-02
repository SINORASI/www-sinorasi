<script setup lang="ts">
import { computed, onMounted, ref, nextTick } from "vue";
import type { MajorName } from "~/models/MajorName";
import { majorColorSchemes } from "~/utils/majorColors";

const props = defineProps<{
  major: MajorName;
}>();

interface Company {
  id: number;
  name: string;
  logo: string;
}

const route = useRoute();
const major = props.major;

const majorColor = computed(() => majorColorSchemes[major]);

const { data: partnersData } = await useFetch<Company[]>(`/api/partners/${major}`);

const currentCompanies = computed(() => {
  return partnersData.value || [];
});

const duplicatedCompanies = computed(() => {
  const base = currentCompanies.value;
  return [...base, ...base, ...base];
});

const sliderRef = ref<HTMLElement>();
const imageRefs = ref<(HTMLElement | null)[]>([]);

onMounted(async () => {
  if (sliderRef.value && currentCompanies.value.length > 0) {
    const count = currentCompanies.value.length;
    const duration = count * 3;
    sliderRef.value.style.setProperty("--animation-duration", `${duration}s`);
  }

  await nextTick();

  // Simple lazy loading with scroll detection
  const checkVisibility = () => {
    imageRefs.value.forEach((img) => {
      if (!img) return;

      // Resolve to the underlying HTMLElement if this ref is a component instance
      const maybeEl = (img as any).$el ? (img as any).$el as HTMLElement : img as HTMLElement;

      if (!maybeEl || !maybeEl.dataset || !maybeEl.dataset.src || typeof maybeEl.getBoundingClientRect !== 'function') {
        return;
      }

      const rect = maybeEl.getBoundingClientRect();
      if (rect.top < window.innerHeight + 50 && rect.bottom > -50) {
        // If it's an actual <img>, set src directly so TypeScript accepts it
        if (maybeEl instanceof HTMLImageElement) {
          maybeEl.src = maybeEl.dataset.src;
          maybeEl.classList.remove('lazy');
        } else {
          // Fallback for components where $el is not an HTMLImageElement
          (maybeEl as any).classList.remove('lazy');
          try {
            (maybeEl as any).src = (maybeEl as any).dataset?.src;
          } catch {
            // ignore if src cannot be set
          }
        }

        // Remove from array to avoid checking again
        const index = imageRefs.value.indexOf(img);
        if (index > -1) imageRefs.value.splice(index, 1);
      }
    });
  };

  window.addEventListener('scroll', checkVisibility, { passive: true });
  checkVisibility(); // Check initial visibility
});
</script>

<template>
  <div class="w-full py-12 overflow-hidden">
    <div class="relative w-full overflow-hidden">
      <div class="absolute top-0 bottom-0 left-0 z-10 w-32"></div>
      <div class="absolute top-0 bottom-0 right-0 z-10 w-32"></div>

      <div class="py-8">
        <div ref="sliderRef" class="flex gap-12 slider-track w-max">
          <div
            v-for="(company, index) in duplicatedCompanies"
            :key="`${company.id}-${index}`"
            class="flex flex-col items-center transition-transform duration-300 slide-item shrink-0"
          >
            <div class="company-card p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1">
              <NuxtImg
                :src="company.logo"
                :alt="`${company.name} logo`"
                loading="lazy"
                class="object-contain h-20 transition-all duration-300 w-28 sm:w-36 sm:h-24 grayscale hover:grayscale-0"
                ref="imageRefs"
                :data-src="company.logo"
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
