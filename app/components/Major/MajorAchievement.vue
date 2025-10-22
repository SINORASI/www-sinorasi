<script setup lang="ts">
import { computed, ref } from "vue";
import type { MajorData } from "~/models/MajorData";
import type { MajorName } from "~/models/MajorName";
import { majorColorSchemes } from "~/utils/majorColors";

const props = defineProps<{
  major?: MajorName;
}>();

interface Achievement {
  id: number;
  title: string;
  description: string;
  studentName: string;
  year: number;
}

const route = useRoute();
const major = props.major || (route.params.majorName as MajorName);

const { data: achievementsData } = await useFetch<Achievement[]>(
  `/api/achievements?major=${major}`,
);
const { data: _majorDatas } = await useFetch<Record<MajorName, MajorData>>("/api/majors");

const currentIndex = ref<number>(0);
const selectedAchievement = ref<Achievement | null>(null);

const achievements = computed(() => achievementsData.value || []);
const totalAchievements = computed(() => achievements.value.length);

const majorColor = computed(() => {
  return majorColorSchemes[major];
});

const currentAchievement = computed(() => {
  if (totalAchievements.value === 0) return null;
  return achievements.value[currentIndex.value];
});

const nextSlide = (): void => {
  if (totalAchievements.value > 1) {
    currentIndex.value = (currentIndex.value + 1) % totalAchievements.value;
  }
};

const previousSlide = (): void => {
  if (totalAchievements.value > 1) {
    currentIndex.value =
      (currentIndex.value - 1 + totalAchievements.value) % totalAchievements.value;
  }
};

const getCardStyle = (index: number) => {
  const total = totalAchievements.value;
  let offset = index - currentIndex.value;

  // Handle circular wrapping
  if (total > 2) {
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;
  }

  const isCurrent = offset === 0;
  const scale = isCurrent ? 1 : 0.85;
  // Use a percentage-based translation for better responsiveness
  const translateX = offset * 70;

  return {
    transform: `translateX(${translateX}%) scale(${scale})`,
    zIndex: total - Math.abs(offset),
    pointerEvents: isCurrent ? ("auto" as const) : ("none" as const),
  };
};

const getCardClasses = (index: number) => {
  const total = totalAchievements.value;
  let offset = index - currentIndex.value;

  if (total > 2) {
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;
  }

  return {
    "cursor-pointer": offset === 0,
    "opacity-100": offset === 0,
    "opacity-0 lg:opacity-30": Math.abs(offset) === 1,
    "opacity-0": Math.abs(offset) > 1,
  };
};

const openModal = (achievement: Achievement): void => {
  selectedAchievement.value = achievement;
};

const closeModal = (): void => {
  selectedAchievement.value = null;
};
</script>

<template>
    <div class="w-full">
        <div
            class="relative flex flex-col items-center gap-6 px-2 md:gap-8 md:px-4"
        >
            <div
                class="relative flex items-center justify-between w-full max-w-5xl"
            >
                <button
                    class="z-20 flex items-center justify-center flex-shrink-0 w-10 h-10 transition-all duration-300 rounded-full shadow-lg md:w-12 md:h-12 hover:scale-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                    :style="`background: linear-gradient(135deg, ${majorColor.primary}, ${majorColor.accent})`"
                    @click.prevent="previousSlide"
                    :disabled="totalAchievements <= 1"
                >
                    <svg
                        class="w-5 h-5 text-white md:w-6 md:h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="3"
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>

                <div
                    class="relative w-full h-[420px] sm:h-[450px] md:h-[500px] flex items-center justify-center"
                >
                    <div
                        v-for="(achievement, index) in achievements"
                        :key="achievement.id"
                        class="absolute w-full max-w-[200px] sm:max-w-[240px] md:max-w-[280px] lg:max-w-[320px] transition-all duration-500 ease-in-out"
                        :style="getCardStyle(index)"
                        :class="getCardClasses(index)"
                        @click="
                            currentIndex === index
                                ? openModal(achievement)
                                : null
                        "
                    >
                        <div
                            class="bg-white rounded-2xl shadow-2xl border-4 md:border-[5px] overflow-hidden w-full h-full transform group-hover:scale-105 group-hover:shadow-3xl transition-all duration-300"
                            :style="`border-color: ${majorColor.primary}`"
                        >
                            <div
                                class="relative flex items-center justify-center h-56 overflow-hidden sm:h-64 md:h-72 lg:h-80 bg-gradient-to-br from-gray-100 to-gray-200"
                            >
                                <div
                                    class="relative z-10 flex flex-col items-center"
                                >
                                    <div
                                        class="w-16 h-16 transition-transform duration-300 transform rounded-full shadow-2xl sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
                                        :style="`background: ${majorColor.light}`"
                                    ></div>
                                    <div
                                        class="w-20 mt-2 transition-transform duration-300 transform rounded-t-full shadow-xl h-18 sm:w-24 sm:h-20 md:w-28 md:h-24 lg:w-32 lg:h-28 md:mt-3"
                                        :style="`background: ${majorColor.light}`"
                                    ></div>
                                </div>
                            </div>
                            <div
                                class="px-3 py-3 text-sm font-bold text-center text-white shadow-inner md:px-4 md:py-4 sm:text-base md:text-lg"
                                :style="`background: ${majorColor.primary}`"
                            >
                                <p class="truncate">
                                    {{ achievement.studentName }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    class="z-20 flex items-center justify-center flex-shrink-0 w-10 h-10 transition-all duration-300 rounded-full shadow-lg md:w-12 md:h-12 hover:scale-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                    :style="`background: linear-gradient(135deg, ${majorColor.primary}, ${majorColor.accent})`"
                    @click.prevent="nextSlide"
                    :disabled="totalAchievements <= 1"
                >
                    <svg
                        class="w-5 h-5 text-white md:w-6 md:h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="3"
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            </div>

            <div
                v-if="currentAchievement"
                class="w-full max-w-4xl px-4 text-center min-h-[100px]"
            >
                <Transition name="fade-slide" mode="out-in">
                    <div :key="currentAchievement.id">
                        <h3
                            class="mb-3 text-base font-bold leading-tight text-gray-800 sm:text-lg md:text-xl lg:text-2xl md:mb-4"
                        >
                            {{ currentAchievement.title }}
                        </h3>
                        <p
                            class="max-w-3xl mx-auto text-xs leading-relaxed text-gray-600 sm:text-sm md:text-base"
                        >
                            {{ currentAchievement.description }}
                        </p>
                    </div>
                </Transition>
            </div>
        </div>

        <Teleport to="body">
            <Transition name="modal">
                <div
                    v-if="selectedAchievement"
                    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    @click.self="closeModal"
                >
                    <div
                        class="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300"
                        @click.stop
                    >
                        <button
                            class="absolute z-10 flex items-center justify-center w-10 h-10 transition-all duration-300 bg-gray-100 rounded-full shadow-lg top-4 right-4 md:top-6 md:right-6 md:w-12 md:h-12 hover:bg-gray-200 hover:scale-110"
                            @click="closeModal"
                        >
                            <svg
                                class="w-5 h-5 text-gray-700 md:w-6 md:h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        <div
                            class="px-6 py-8 text-center text-white md:px-8 md:py-10 rounded-t-3xl"
                            :style="`background: linear-gradient(135deg, ${majorColor.primary}, ${majorColor.secondary})`"
                        >
                            <div class="inline-block mb-4">
                                <div
                                    class="flex items-center justify-center w-20 h-20 rounded-full shadow-2xl md:w-24 md:h-24 bg-white/20 backdrop-blur-sm"
                                >
                                    <svg
                                        class="w-10 h-10 text-white md:w-12 md:h-12"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <h2 class="mb-2 text-2xl font-bold md:text-3xl">
                                {{ selectedAchievement.title }}
                            </h2>
                            <div
                                class="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-sm font-semibold"
                            >
                                {{ selectedAchievement.year }}
                            </div>
                        </div>
                        <div class="px-6 py-6 md:px-8 md:py-8">
                            <div class="pb-6 mb-6 border-b border-gray-200">
                                <div class="flex items-center gap-4">
                                    <div
                                        class="flex items-center justify-center flex-shrink-0 w-16 h-16 rounded-full shadow-lg md:w-20 md:h-20"
                                        :style="`background: linear-gradient(135deg, ${majorColor.primary}, ${majorColor.secondary})`"
                                    >
                                        <span
                                            class="text-2xl font-bold text-white md:text-3xl"
                                        >
                                            {{
                                                selectedAchievement.studentName.charAt(
                                                    0,
                                                )
                                            }}
                                        </span>
                                    </div>
                                    <div>
                                        <h3
                                            class="text-lg font-bold text-gray-800 md:text-xl"
                                        >
                                            {{
                                                selectedAchievement.studentName
                                            }}
                                        </h3>
                                        <p class="text-sm text-gray-600">
                                            Siswa Berprestasi
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="mb-6">
                                <h4
                                    class="mb-3 text-sm font-semibold tracking-wide text-gray-500 uppercase"
                                >
                                    Deskripsi Prestasi
                                </h4>
                                <p class="leading-relaxed text-gray-700">
                                    {{ selectedAchievement.description }}
                                </p>
                            </div>
                            <div
                                class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 md:p-6 rounded-2xl"
                                :style="`background: linear-gradient(135deg, ${majorColor.light}20, ${majorColor.accent}10)`"
                            >
                                <div>
                                    <p
                                        class="mb-1 text-xs tracking-wide text-gray-500 uppercase"
                                    >
                                        Tahun
                                    </p>
                                    <p
                                        class="text-lg font-bold"
                                        :style="`color: ${majorColor.primary}`"
                                    >
                                        {{ selectedAchievement.year }}
                                    </p>
                                </div>
                                <div>
                                    <p
                                        class="mb-1 text-xs tracking-wide text-gray-500 uppercase"
                                    >
                                        Kategori
                                    </p>
                                    <p
                                        class="text-lg font-bold"
                                        :style="`color: ${majorColor.primary}`"
                                    >
                                        Prestasi Akademik
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition:
        opacity 0.3s ease,
        transform 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(20px);
}

.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}
.modal-enter-active .transform,
.modal-leave-active .transform {
    transition: transform 0.3s ease;
}
.modal-enter-from .transform {
    transform: scale(0.95) translateY(20px);
}
.modal-leave-to .transform {
    transform: scale(0.95) translateY(20px);
}
</style>
