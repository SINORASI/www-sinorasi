<template>
  <div class="relative flex flex-col items-center w-full p-4 py-8 rounded-lg shadow-sm bg-neutral-100">
    <div class="px-12 py-4 mb-12 rounded-full shadow-lg">
      <h2 class="text-2xl font-bold md:text-3xl text-neutral-800">{{ title }}</h2>
    </div>

    <!-- Carousel View -->
    <div class="relative w-full px-16 max-w-7xl">
      <button
        @click="scrollLeft"
        class="absolute left-0 z-10 p-3 transition-all -translate-y-1/2 rounded-full shadow-lg top-1/2 bg-white/90 hover:bg-white hover:scale-110"
      >
        <Icon name="lucide:chevron-left" size="32" class="text-neutral-700" />
      </button>

      <div
        ref="carouselContainer"
        class="overflow-x-auto scrollbar-hide scroll-smooth"
        style="scrollbar-width: none; -ms-overflow-style: none"
      >
        <div class="flex items-center justify-center gap-6 px-4">
          <div v-for="teacher in teachers" :key="teacher.id" class="flex-shrink-0 w-64">
            <TeacherCard
              :teacher="teacher"
              @show-details="(teacher) => $emit('open-modal', teacher, teachers, title)"
            />
          </div>
        </div>
      </div>

      <button
        @click="scrollRight"
        class="absolute right-0 z-10 p-3 transition-all -translate-y-1/2 rounded-full shadow-lg top-1/2 bg-white/90 hover:bg-white hover:scale-110"
      >
        <Icon name="lucide:chevron-right" size="32" class="text-neutral-700" />
      </button>
    </div>

    <!-- Description -->
    <div v-if="description" class="max-w-4xl px-4 mt-8 text-center">
      <p class="text-base leading-relaxed text-neutral-700">
        {{ description }}
      </p>
    </div>

    <!-- See More Link Button (Bottom Right) -->
    <div class="flex justify-end w-full px-4 mt-6 max-w-7xl">
      <button
        @click="openDialog"
        class="flex items-center gap-1 font-semibold underline transition-colors text-neutral-600 hover:text-neutral-800"
      >
        <span>Lihat Selengkapnya</span>
        <Icon name="lucide:arrow-right" size="18" />
      </button>
    </div>

    <!-- Full Screen Dialog -->
    <Teleport to="body">
      <Transition name="dialog">
        <div v-if="isDialogOpen" class="fixed inset-0 z-50 overflow-y-auto bg-white" @click.self="closeDialog">
          <div class="min-h-screen p-8 py-30">
            <!-- Header -->
            <div class="mx-auto mb-8 max-w-7xl">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-3xl font-bold md:text-4xl text-neutral-800">{{ title }}</h2>
                <button @click="closeDialog" class="p-2 transition-colors rounded-full hover:bg-neutral-100">
                  <Icon name="lucide:x" size="32" class="text-neutral-700" />
                </button>
              </div>
              <p v-if="description" class="text-lg leading-relaxed text-neutral-700">
                {{ description }}
              </p>
            </div>

            <!-- All Teachers Grid -->
            <div class="mx-auto mb-12 max-w-7xl">
              <h3 class="mb-6 text-2xl font-bold text-neutral-800">Daftar Guru</h3>
              <div class="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                <div v-for="teacher in teachers" :key="teacher.id" class="w-full">
                  <TeacherCard
                    :teacher="teacher"
                    @show-details="(teacher) => $emit('open-modal', teacher, teachers, title)"
                  />
                </div>
              </div>
            </div>

            <!-- Materials Section -->
            <div v-if="materialsByClass && materialsByClass.length > 0" class="mx-auto mb-12 max-w-7xl">
              <h3 class="mb-8 text-2xl font-bold text-center text-neutral-800">Materi Yang Diajarkan</h3>

              <div class="space-y-8">
                <div v-for="classData in materialsByClass" :key="classData.className" class="space-y-4">
                  <!-- Class Name -->
                  <div class="flex justify-center">
                    <div class="px-8 py-3 text-lg font-bold text-white rounded-lg bg-neutral-800">
                      {{ classData.className }}
                    </div>
                  </div>

                  <!-- Materials Grid -->
                  <div class="grid grid-cols-2 gap-4 md:grid-cols-3">
                    <div
                      v-for="(material, index) in classData.materials"
                      :key="index"
                      class="px-6 py-3 font-medium text-center rounded-lg bg-neutral-200 text-neutral-800"
                    >
                      {{ material }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Navigation Buttons -->
              <div class="flex justify-center gap-4 mt-8">
                <button
                  class="flex items-center gap-2 px-6 py-2 font-semibold transition-colors rounded-lg bg-neutral-300 hover:bg-neutral-400 text-neutral-800"
                >
                  <Icon name="lucide:arrow-left" size="18" />
                  Sebelumnya
                </button>
                <button
                  class="flex items-center gap-2 px-6 py-2 font-semibold transition-colors rounded-lg bg-neutral-300 hover:bg-neutral-400 text-neutral-800"
                >
                  Selanjutnya
                  <Icon name="lucide:arrow-right" size="18" />
                </button>
              </div>
            </div>

            <!-- Teaching Focus Section -->
            <div v-if="teachingFocus" class="mx-auto mb-12 max-w-7xl">
              <div class="p-8 rounded-lg bg-neutral-100">
                <h3 class="flex items-center gap-2 mb-4 text-2xl font-bold text-neutral-800">
                  <Icon name="lucide:target" size="28" class="text-blue-600" />
                  Fokus Pembelajaran
                </h3>
                <p class="text-lg leading-relaxed text-neutral-700">{{ teachingFocus }}</p>
              </div>
            </div>

            <!-- Classes Section -->
            <div v-if="classes && classes.length > 0" class="mx-auto mb-12 max-w-7xl">
              <div class="p-8 rounded-lg bg-neutral-100">
                <h3 class="flex items-center gap-2 mb-4 text-2xl font-bold text-neutral-800">
                  <Icon name="lucide:school" size="28" class="text-green-600" />
                  Kelas yang Diajar
                </h3>
                <div class="flex flex-wrap gap-3">
                  <span
                    v-for="cls in classes"
                    :key="cls"
                    class="px-5 py-2 text-base font-semibold text-green-800 bg-green-100 rounded-full"
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
import { ref } from "vue";
import TeacherCard from "./TeacherCard.vue";

defineProps({
  title: String,
  pagination: String,
  teachers: Array,
  description: String,
  classes: Array, // Array of class names (e.g., ['Kelas X RPL', 'Kelas XI RPL'])
  subjectMaterials: Array, // Array of subject materials taught (deprecated, use materialsByClass)
  materialsByClass: Array, // Array of objects: [{ className: 'Kelas 10', materials: ['Materi 1', 'Materi 2', ...] }]
  teachingFocus: String, // Description of teaching focus
});

defineEmits(["open-modal"]);

const carouselContainer = ref(null);
const isDialogOpen = ref(false);

const scrollLeft = () => {
  if (carouselContainer.value) {
    carouselContainer.value.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  }
};

const scrollRight = () => {
  if (carouselContainer.value) {
    carouselContainer.value.scrollBy({
      left: 300,
      behavior: "smooth",
    });
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

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.3s ease;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}
</style>
