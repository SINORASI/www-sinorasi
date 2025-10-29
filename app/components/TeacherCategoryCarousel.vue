<template>
  <div class="relative flex flex-col items-center w-full p-4 py-8 rounded-lg shadow-sm bg-neutral-100">
    <div class="px-12 py-4 mb-12 rounded-full shadow-lg">
      <h2 class="text-2xl font-bold md:text-3xl text-neutral-800">{{ title }}</h2>
    </div>

    <div class="relative w-full px-4 md:px-16 max-w-7xl">
      <button
        @click="scrollLeft"
        :disabled="!canScrollLeft"
        class="absolute left-0 z-10 p-2 md:p-3 transition-all -translate-y-1/2 rounded-full shadow-lg top-1/2 bg-white/90 hover:bg-white hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Icon name="lucide:chevron-left" size="24 md:32" class="text-neutral-700" />
      </button>

      <div class="flex items-center justify-center gap-3 md:gap-6 px-2 md:px-4">
        <motion.div
          v-for="(teacher, index) in visibleTeachers"
          :key="teacher.id"
          :whileInView="{ opacity: 1, y: 0 }"
          :transition="{ delay: index * 0.1, duration: 0.5 }"
          :inViewOptions="{ once: true }"
          class="shrink-0 w-48 md:w-64"
        >
          <TeacherCard :teacher="teacher" @show-details="(teacher) => $emit('open-modal', teacher, teachers, title)" />
        </motion.div>
      </div>

      <button
        @click="scrollRight"
        :disabled="!canScrollRight"
        class="absolute right-0 z-10 p-2 md:p-3 transition-all -translate-y-1/2 rounded-full shadow-lg top-1/2 bg-white/90 hover:bg-white hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Icon name="lucide:chevron-right" size="24 md:32" class="text-neutral-700" />
      </button>
    </div>

    <div v-if="description" class="max-w-4xl px-4 mt-8 text-center">
      <p class="text-base leading-relaxed text-neutral-700">
        {{ description }}
      </p>
    </div>

    <div class="flex justify-end w-full px-4 mt-6 max-w-7xl">
      <button
        @click="openDialog"
        class="flex items-center gap-1 font-semibold underline transition-colors text-neutral-600 hover:text-neutral-800 text-sm md:text-base"
      >
        <span>Lihat Selengkapnya</span>
        <Icon name="lucide:arrow-right" size="16 md:18" />
      </button>
    </div>

    <Teleport to="body">
      <Transition name="dialog">
        <div
          v-if="isDialogOpen"
          class="fixed inset-0 z-50 overflow-y-auto transition-opacity duration-300 bg-white"
          @click.self="closeDialog"
        >
          <div class="min-h-screen p-8 py-30">
            <div class="mx-auto mb-8 max-w-7xl px-4">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-800">{{ title }}</h2>
                <button @click="closeDialog" class="p-2 transition-colors rounded-full hover:bg-neutral-100">
                  <Icon name="lucide:x" size="24 md:32" class="text-neutral-700" />
                </button>
              </div>
              <p v-if="description" class="text-base md:text-lg leading-relaxed text-neutral-700">
                {{ description }}
              </p>
            </div>

            <div class="mx-auto mb-12 max-w-7xl px-4">
              <h3 class="mb-6 text-xl md:text-2xl font-bold text-neutral-800">Daftar Guru</h3>
              <div
                class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
              >
                <motion.div
                  v-for="(teacher, index) in teachers"
                  :key="teacher.id"
                  :whileInView="{ opacity: 1, y: 0 }"
                  :transition="{ delay: index * 0.05, duration: 0.5 }"
                  :inViewOptions="{ once: true }"
                  class="w-full"
                >
                  <TeacherCard
                    :teacher="teacher"
                    @show-details="(teacher) => $emit('open-modal', teacher, teachers, title)"
                  />
                </motion.div>
              </div>
            </div>

            <div v-if="materialsByClass && materialsByClass.length > 0" class="mx-auto mb-12 max-w-7xl px-4">
              <h3 class="mb-8 text-xl md:text-2xl font-bold text-center text-neutral-800">Materi Yang Diajarkan</h3>

              <div class="space-y-6 md:space-y-8">
                <div v-for="classData in materialsByClass" :key="classData.className" class="space-y-4">
                  <div class="flex justify-center">
                    <div
                      class="px-4 md:px-8 py-2 md:py-3 text-base md:text-lg font-bold text-white rounded-lg bg-neutral-800"
                    >
                      {{ classData.className }}
                    </div>
                  </div>

                  <div class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                    <div
                      v-for="(material, index) in classData.materials"
                      :key="index"
                      class="px-4 md:px-6 py-2 md:py-3 font-medium text-center rounded-lg bg-neutral-200 text-neutral-800 text-sm md:text-base"
                    >
                      {{ material }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-6 md:mt-8">
                <button
                  class="flex items-center justify-center gap-2 px-4 md:px-6 py-2 font-semibold transition-colors rounded-lg bg-neutral-300 hover:bg-neutral-400 text-neutral-800 text-sm md:text-base"
                >
                  <Icon name="lucide:arrow-left" size="16 md:18" />
                  Sebelumnya
                </button>
                <button
                  class="flex items-center justify-center gap-2 px-4 md:px-6 py-2 font-semibold transition-colors rounded-lg bg-neutral-300 hover:bg-neutral-400 text-neutral-800 text-sm md:text-base"
                >
                  Selanjutnya
                  <Icon name="lucide:arrow-right" size="16 md:18" />
                </button>
              </div>
            </div>

            <div v-if="teachingFocus" class="mx-auto mb-12 max-w-7xl px-4">
              <div class="p-4 md:p-8 rounded-lg bg-neutral-100">
                <h3 class="flex items-center gap-2 mb-4 text-xl md:text-2xl font-bold text-neutral-800">
                  <Icon name="lucide:target" size="24 md:28" class="text-blue-600" />
                  Fokus Pembelajaran
                </h3>
                <p class="text-base md:text-lg leading-relaxed text-neutral-700">{{ teachingFocus }}</p>
              </div>
            </div>

            <div v-if="classes && classes.length > 0" class="mx-auto mb-12 max-w-7xl px-4">
              <div class="p-4 md:p-8 rounded-lg bg-neutral-100">
                <h3 class="flex items-center gap-2 mb-4 text-xl md:text-2xl font-bold text-neutral-800">
                  <Icon name="lucide:school" size="24 md:28" class="text-green-600" />
                  Kelas yang Diajar
                </h3>
                <div class="flex flex-wrap gap-2 md:gap-3">
                  <span
                    v-for="cls in classes"
                    :key="cls"
                    class="px-3 md:px-5 py-1 md:py-2 text-sm md:text-base font-semibold text-green-800 bg-green-100 rounded-full"
                  >
                    {{ cls }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { motion } from "motion-v";

const props = defineProps({
  title: String,
  pagination: String,
  teachers: Array,
  description: String,
  classes: Array,
  subjectMaterials: Array,
  materialsByClass: Array,
  teachingFocus: String,
});

defineEmits(["open-modal"]);

const carouselContainer = ref(null);
const isDialogOpen = ref(false);
const currentIndex = ref(0);

const visibleCount = computed(() => {
  if (process.client) {
    return window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 4;
  }
  return 4;
});

const visibleTeachers = computed(() =>
  props.teachers.slice(currentIndex.value, currentIndex.value + visibleCount.value)
);
const canScrollLeft = computed(() => currentIndex.value > 0);
const canScrollRight = computed(() => currentIndex.value + visibleCount.value < props.teachers.length);

const scrollLeft = () => {
  if (canScrollLeft.value) {
    currentIndex.value -= visibleCount;
    if (currentIndex.value < 0) currentIndex.value = 0;
  }
};

const scrollRight = () => {
  if (canScrollRight.value) {
    currentIndex.value += visibleCount;
  }
};

const openDialog = () => {
  isDialogOpen.value = true;
  document.body.style.overflow = "hidden";
};

const closeDialog = () => {
  isDialogOpen.value = false;
  document.body.style.overflow = "";
};
</script>
