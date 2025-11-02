<script setup lang="ts">
import type { MajorName } from "~/models/MajorName";
import type { MajorTopic } from "~/models/MajorTopic";
import { majorColorSchemes } from "~/utils/majorColors";
import { usePageSections } from "~/composables/usePageSections";

const { motion, AnimatePresence } = await import("motion-v");

const props = defineProps<{
  major?: MajorName;
}>();

// Extract page sections for sidebar
const { extractSections } = usePageSections();

const { data: majorTopics } = await useFetch<Record<MajorName, MajorTopic[]>>("/api/major-topics");

interface ExpandedItems {
  [key: string]: boolean;
}

const expandedLeftItems = ref<ExpandedItems>({});
const expandedRightItems = ref<ExpandedItems>({});
const leftOpenOrder = ref<string[]>([]);
const rightOpenOrder = ref<string[]>([]);

const leftVisible = ref<Record<string, boolean>>({});
const rightVisible = ref<Record<string, boolean>>({});
const refs = ref<(Element | ComponentPublicInstance | null)[]>([]);

const setRef = (el: Element | ComponentPublicInstance | null) => {
  if (el) refs.value.push(el);
};

const checkVisibility = () => {
  refs.value.forEach((el) => {
    if (el instanceof Element) {
      const id = el.getAttribute("data-id");
      if (id) {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          if (leftColumnTopics.value.some((t) => t.id === id)) {
            leftVisible.value[id] = true;
          } else if (rightColumnTopics.value.some((t) => t.id === id)) {
            rightVisible.value[id] = true;
          }
        }
      }
    }
  });
};

onMounted(() => {
  window.addEventListener("scroll", checkVisibility, { passive: true });
  // Check initial visibility
  nextTick(() => checkVisibility());

  // Extract page sections for sidebar
  extractSections();
});

onUnmounted(() => {
  window.removeEventListener("scroll", checkVisibility);
});

const route = useRoute();
const major = props.major || (route.params.majorName as MajorName);

const majorColor = computed(() => majorColorSchemes[major]);

const majorColorRgb = computed(() => hexToRgb(majorColor.value.primary));
const leftColumnTopics = computed(() => {
  const topics = majorTopics.value?.[major] || [];
  return topics.filter((_, idx) => idx % 2 === 0);
});

const rightColumnTopics = computed(() => {
  const topics = majorTopics.value?.[major] || [];
  return topics.filter((_, idx) => idx % 2 === 1);
});

const hexToRgb = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
};

const toggleLeftExpanded = (id: string): void => {
  if (expandedLeftItems.value[id]) {
    expandedLeftItems.value = {
      ...expandedLeftItems.value,
      [id]: false,
    };
    leftOpenOrder.value = leftOpenOrder.value.filter((item) => item !== id);
  } else {
    if (leftOpenOrder.value.length >= 2) {
      const oldestId = leftOpenOrder.value[0];
      if (oldestId) {
        expandedLeftItems.value = {
          ...expandedLeftItems.value,
          [oldestId]: false,
        };
        leftOpenOrder.value = leftOpenOrder.value.slice(1);
      }
    }

    expandedLeftItems.value = {
      ...expandedLeftItems.value,
      [id]: true,
    };
    leftOpenOrder.value.push(id);
  }
};

const toggleRightExpanded = (id: string): void => {
  if (expandedRightItems.value[id]) {
    expandedRightItems.value = {
      ...expandedRightItems.value,
      [id]: false,
    };
    rightOpenOrder.value = rightOpenOrder.value.filter((item) => item !== id);
  } else {
    if (rightOpenOrder.value.length >= 2) {
      const oldestId = rightOpenOrder.value[0];
      if (oldestId) {
        expandedRightItems.value = {
          ...expandedRightItems.value,
          [oldestId]: false,
        };
        rightOpenOrder.value = rightOpenOrder.value.slice(1);
      }
    }

    expandedRightItems.value = {
      ...expandedRightItems.value,
      [id]: true,
    };
    rightOpenOrder.value.push(id);
  }
};
</script>

<template>
  <div class="w-full">
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 md:gap-5 lg:gap-6">
      <div class="space-y-4">
        <motion.div
          v-for="(topic, index) in leftColumnTopics"
          :key="topic.id"
          :ref="setRef"
          :data-id="topic.id"
          :initial="leftVisible[topic.id] ? { opacity: 0, x: -50 } : {}"
          :animate="leftVisible[topic.id] ? { opacity: 1, x: 0 } : {}"
          :transition="{ duration: 0.6, delay: index * 0.1 }"
          class="transition-all duration-300"
        >
          <motion.button
            v-if="!expandedLeftItems[topic.id]"
            @click="toggleLeftExpanded(topic.id)"
            class="w-full group"
            :whileHover="{ scale: 1.02 }"
            :whileTap="{ scale: 0.98 }"
          >
            <motion.div
              class="relative flex items-center justify-between gap-3 px-5 py-4 md:px-6 md:py-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              :style="{ background: majorColor.primary }"
              :whileHover="{ y: -2, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)' }"
            >
              <motion.div
                class="absolute top-2 right-2 w-1 h-1 rounded-full bg-white/40"
                :animate="{
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 1, 0.4],
                }"
                :transition="{ duration: 2, repeat: Infinity, delay: index * 0.2 }"
              ></motion.div>

              <div class="flex-1 min-w-0 text-left">
                <h3 class="pr-2 text-sm font-semibold leading-snug text-white md:text-base line-clamp-2">
                  {{ topic.title }}
                </h3>
              </div>

              <div class="shrink-0">
                <motion.div
                  class="flex items-center justify-center w-8 h-8 rounded-lg md:w-9 md:h-9 bg-white/20"
                  :animate="{ rotate: expandedLeftItems[topic.id] ? 180 : 0 }"
                  :transition="{ type: 'spring', stiffness: 300 }"
                  :whileHover="{ rotate: expandedLeftItems[topic.id] ? 225 : 90 }"
                >
                  <svg class="w-4 h-4 text-white md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          </motion.button>

          <motion.div
            v-else
            class="overflow-hidden border shadow-lg rounded-xl backdrop-blur-xl border-white/20"
            :style="{ background: `rgba(${majorColorRgb.r}, ${majorColorRgb.g}, ${majorColorRgb.b}, 0.2)` }"
            :initial="{ height: 0, opacity: 0 }"
            :animate="{ height: 'auto', opacity: 1 }"
            :exit="{ height: 0, opacity: 0 }"
            :transition="{ duration: 0.4, ease: 'easeOut' }"
          >
            <motion.button @click="toggleLeftExpanded(topic.id)" class="w-full group" :whileHover="{ scale: 1.01 }">
              <div
                class="relative flex items-center justify-between gap-3 px-5 py-4 md:px-6 md:py-5"
                :style="{ background: majorColor.primary }"
              >
                <div class="flex-1 min-w-0 text-left">
                  <h3 class="pr-2 text-sm font-semibold leading-snug text-white md:text-base">
                    {{ topic.title }}
                  </h3>
                </div>

                <div class="shrink-0">
                  <motion.div
                    class="flex items-center justify-center w-8 h-8 rounded-lg md:w-9 md:h-9 bg-white/20"
                    :animate="{ rotate: 180 }"
                    :transition="{ type: 'spring', stiffness: 300 }"
                    :whileHover="{ rotate: 225 }"
                  >
                    <svg class="w-4 h-4 text-white md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M20 12H4" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </motion.button>

            <motion.div
              class="p-4 md:p-5 lg:p-6"
              :initial="{ opacity: 0, y: 20 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ delay: 0.2, duration: 0.4 }"
            >
              <p class="text-sm leading-relaxed text-justify text-gray-700 md:text-base">
                {{ topic.description }}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div class="space-y-4">
        <motion.div
          v-for="(topic, index) in rightColumnTopics"
          :key="topic.id"
          :ref="setRef"
          :data-id="topic.id"
          :initial="rightVisible[topic.id] ? { opacity: 0, x: 50 } : {}"
          :animate="rightVisible[topic.id] ? { opacity: 1, x: 0 } : {}"
          :transition="{ duration: 0.6, delay: index * 0.1 }"
          class="transition-all duration-300"
        >
          <motion.button
            v-if="!expandedRightItems[topic.id]"
            @click="toggleRightExpanded(topic.id)"
            class="w-full group"
            :whileHover="{ scale: 1.02 }"
            :whileTap="{ scale: 0.98 }"
          >
            <motion.div
              class="relative flex items-center justify-between gap-3 px-5 py-4 md:px-6 md:py-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              :style="{ background: majorColor.primary }"
              :whileHover="{ y: -2, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)' }"
            >
              <motion.div
                class="absolute top-2 right-2 w-1 h-1 rounded-full bg-white/40"
                :animate="{
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 1, 0.4],
                }"
                :transition="{ duration: 2, repeat: Infinity, delay: index * 0.2 }"
              ></motion.div>

              <div class="flex-1 min-w-0 text-left">
                <h3 class="pr-2 text-sm font-semibold leading-snug text-white md:text-base line-clamp-2">
                  {{ topic.title }}
                </h3>
              </div>

              <div class="shrink-0">
                <motion.div
                  class="flex items-center justify-center w-8 h-8 rounded-lg md:w-9 md:h-9 bg-white/20"
                  :animate="{ rotate: expandedRightItems[topic.id] ? 180 : 0 }"
                  :transition="{ type: 'spring', stiffness: 300 }"
                  :whileHover="{ rotate: expandedRightItems[topic.id] ? 225 : 90 }"
                >
                  <svg class="w-4 h-4 text-white md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          </motion.button>

          <motion.div
            v-else
            class="overflow-hidden border shadow-lg rounded-xl backdrop-blur-xl border-white/20"
            :style="{ background: `rgba(${majorColorRgb.r}, ${majorColorRgb.g}, ${majorColorRgb.b}, 0.2)` }"
            :initial="{ height: 0, opacity: 0 }"
            :animate="{ height: 'auto', opacity: 1 }"
            :exit="{ height: 0, opacity: 0 }"
            :transition="{ duration: 0.4, ease: 'easeOut' }"
          >
            <motion.button @click="toggleRightExpanded(topic.id)" class="w-full group" :whileHover="{ scale: 1.01 }">
              <div
                class="relative flex items-center justify-between gap-3 px-5 py-4 md:px-6 md:py-5"
                :style="{ background: majorColor.primary }"
              >
                <div class="flex-1 min-w-0 text-left">
                  <h3 class="pr-2 text-sm font-semibold leading-snug text-white md:text-base">
                    {{ topic.title }}
                  </h3>
                </div>

                <div class="shrink-0">
                  <motion.div
                    class="flex items-center justify-center w-8 h-8 rounded-lg md:w-9 md:h-9 bg-white/20"
                    :animate="{ rotate: 180 }"
                    :transition="{ type: 'spring', stiffness: 300 }"
                    :whileHover="{ rotate: 225 }"
                  >
                    <svg class="w-4 h-4 text-white md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M20 12H4" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </motion.button>

            <motion.div
              class="p-4 md:p-5 lg:p-6"
              :initial="{ opacity: 0, y: 20 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ delay: 0.2, duration: 0.4 }"
            >
              <p class="text-sm leading-relaxed text-justify text-gray-700 md:text-base">
                {{ topic.description }}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>

    <div
      v-if="leftColumnTopics.length === 0 && rightColumnTopics.length === 0"
      v-memo="[majorColor.light, majorColor.primary]"
      class="py-16 text-center md:py-20"
    >
      <div
        class="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full shadow-lg md:w-24 md:h-24"
        :style="{ background: majorColor.light }"
      >
        <svg
          class="w-10 h-10 md:w-12 md:h-12"
          :style="{ color: majorColor.primary }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      </div>
      <h3 class="mb-2 text-xl font-bold text-gray-800 md:text-2xl">Belum Ada Materi</h3>
      <p class="px-4 text-sm text-gray-600 md:text-base">
        Materi pembelajaran untuk konsentrasi keahlian ini akan segera ditambahkan.
      </p>
    </div>
  </div>
</template>
