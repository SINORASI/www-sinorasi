<script setup lang="ts">
import type { MajorName } from "~/models/MajorName";
import { majorColorSchemes } from "~/utils/majorColors";
import toolsData from "~/data/toolsData.json";

const props = defineProps<{
  major: MajorName;
}>();

const majorColor = computed(() => majorColorSchemes[props.major]);

const tools = computed(() => toolsData[props.major] || []);

// Simple scroll-based visibility detection
const visibleCards = ref(new Set<number>());
const cardRefs = ref<any[]>([]);

const checkVisibility = () => {
  cardRefs.value.forEach((card, index) => {
    if (card) {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        visibleCards.value.add(index);
      }
    }
  });
};

onMounted(() => {
  window.addEventListener("scroll", checkVisibility, { passive: true });
  // Check initial visibility
  nextTick(() => checkVisibility());
});

onUnmounted(() => {
  window.removeEventListener("scroll", checkVisibility);
});
</script>

<template>
  <section
    id="tools"
    class="py-16 md:py-24"
  >
    <div class="container flex flex-col items-center justify-center gap-10 px-4 mx-auto md:gap-12">
      <div v-memo="[majorColor.primary, majorColor.accent, major]" class="max-w-3xl space-y-4 text-center">
        <div class="inline-block">
          <span
            class="px-4 py-2 text-sm font-bold tracking-widest uppercase rounded-full md:text-base"
            :style="{ background: majorColor.primary, color: 'white' }"
          >
            Tools & Equipment
          </span>
        </div>
        <h2
          class="text-3xl font-extrabold text-transparent md:text-5xl bg-linear-to-r bg-clip-text"
          :style="{ backgroundImage: `linear-gradient(135deg, ${majorColor.primary}, ${majorColor.accent})` }"
        >
          Alat dan Peralatan
        </h2>
        <p class="max-w-2xl mx-auto text-sm text-gray-600 md:text-lg">
          Berbagai tools dan equipment yang digunakan dalam pembelajaran konsentrasi keahlian {{ major }}
        </p>
      </div>

      <div class="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(tool, index) in tools"
          :key="tool.name"
          :ref="
            (el) => {
              if (el) cardRefs[index] = el;
            }
          "
          :data-index="index"
          class="tool-card flex flex-col items-center p-6 bg-white shadow-lg rounded-2xl transition-all duration-600 ease-out hover:scale-105 hover:-translate-y-1 hover:shadow-2xl"
          :class="{
            'opacity-0 translate-y-12 scale-90': !visibleCards.has(index),
            'opacity-100 translate-y-0 scale-100': visibleCards.has(index),
          }"
          :style="{ transitionDelay: `${index * 100}ms` }"
        >
          <div
            class="absolute top-4 right-4 w-1 h-1 rounded-full opacity-60 animate-pulse"
            :style="{ background: majorColor.primary, animationDelay: `${index * 200}ms` }"
          ></div>

          <div
            class="icon-container flex items-center justify-center w-16 h-16 mb-4 rounded-full shadow-md transition-transform duration-300 hover:rotate-12 hover:scale-110"
            :style="{ background: majorColor.light, color: majorColor.primary }"
          >
            <Icon :name="tool.icon" :size="32" />
          </div>

          <h3
            class="mb-2 text-lg font-bold text-center text-gray-800 md:text-xl transition-opacity duration-400"
            :class="{ 'opacity-0': !visibleCards.has(index), 'opacity-100': visibleCards.has(index) }"
            :style="{ transitionDelay: `${index * 100 + 300}ms` }"
          >
            {{ tool.name }}
          </h3>

          <p
            class="text-sm text-center text-gray-600 md:text-base transition-opacity duration-400"
            :class="{ 'opacity-0': !visibleCards.has(index), 'opacity-100': visibleCards.has(index) }"
            :style="{ transitionDelay: `${index * 100 + 500}ms` }"
          >
            {{ tool.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
