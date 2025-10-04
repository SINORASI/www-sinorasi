<template>
  <div class="bg-neutral-100 p-4 rounded-lg shadow-sm w-full flex flex-col items-center py-8 relative">

    <div class="rounded-full px-12 py-4 shadow-lg mb-12">
      <h2 class="text-2xl md:text-3xl font-bold text-neutral-800">{{ title }}</h2>
    </div>

    <!-- Carousel View -->
    <div class="relative w-full max-w-7xl px-16">
      <button 
        @click="scrollLeft"
        class="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
      >
        <Icon name="lucide:chevron-left" size="32" class="text-neutral-700" />
      </button>

      <div 
        ref="carouselContainer"
        class="overflow-x-auto scrollbar-hide scroll-smooth"
        style="scrollbar-width: none; -ms-overflow-style: none;"
      >
        <div class="flex items-center justify-center gap-6 px-4">
          <div
            v-for="teacher in teachers"
            :key="teacher.id"
            class="flex-shrink-0 w-64"
          >
            <TeacherCard
              :teacher="teacher"
              @show-details="teacher => $emit('open-modal', teacher, teachers, title)"
            />
          </div>
        </div>
      </div>

      <button 
        @click="scrollRight"
        class="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
      >
        <Icon name="lucide:chevron-right" size="32" class="text-neutral-700" />
      </button>
    </div>

    <!-- Description -->
    <div v-if="description" class="mt-8 max-w-4xl text-center px-4">
      <p class="text-neutral-700 text-base leading-relaxed">
        {{ description }}
      </p>
    </div>

    <!-- See More Link Button (Bottom Right) -->
    <div class="w-full max-w-7xl flex justify-end mt-6 px-4">
      <button
        @click="openDialog"
        class="text-neutral-600 hover:text-neutral-800 font-semibold flex items-center gap-1 transition-colors underline"
      >
        <span>Lihat Selengkapnya</span>
        <Icon name="lucide:arrow-right" size="18" />
      </button>
    </div>

    <!-- Full Screen Dialog -->
    <Teleport to="body">
      <Transition name="dialog">
        <div
          v-if="isDialogOpen"
          class="fixed inset-0 z-50 overflow-y-auto bg-white"
          @click.self="closeDialog"
        >
          <div class="min-h-screen p-8 py-30">
            <!-- Header -->
            <div class="max-w-7xl mx-auto mb-8">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-3xl md:text-4xl font-bold text-neutral-800">{{ title }}</h2>
                <button
                  @click="closeDialog"
                  class="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                >
                  <Icon name="lucide:x" size="32" class="text-neutral-700" />
                </button>
              </div>
              <p v-if="description" class="text-neutral-700 text-lg leading-relaxed">
                {{ description }}
              </p>
            </div>

            <!-- All Teachers Grid -->
            <div class="max-w-7xl mx-auto mb-12">
              <h3 class="text-2xl font-bold text-neutral-800 mb-6">Daftar Guru</h3>
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                <div
                  v-for="teacher in teachers"
                  :key="teacher.id"
                  class="w-full"
                >
                  <TeacherCard
                    :teacher="teacher"
                    @show-details="teacher => $emit('open-modal', teacher, teachers, title)"
                  />
                </div>
              </div>
            </div>

            <!-- Materials Section -->
            <div v-if="materialsByClass && materialsByClass.length > 0" class="max-w-7xl mx-auto mb-12">
              <h3 class="text-2xl font-bold text-neutral-800 mb-8 text-center">Materi Yang Diajarkan</h3>
              
              <div class="space-y-8">
                <div
                  v-for="classData in materialsByClass"
                  :key="classData.className"
                  class="space-y-4"
                >
                  <!-- Class Name -->
                  <div class="flex justify-center">
                    <div class="bg-neutral-800 text-white px-8 py-3 rounded-lg font-bold text-lg">
                      {{ classData.className }}
                    </div>
                  </div>

                  <!-- Materials Grid -->
                  <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div
                      v-for="(material, index) in classData.materials"
                      :key="index"
                      class="bg-neutral-200 text-neutral-800 px-6 py-3 rounded-lg text-center font-medium"
                    >
                      {{ material }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Navigation Buttons -->
              <div class="flex justify-center gap-4 mt-8">
                <button
                  class="bg-neutral-300 hover:bg-neutral-400 text-neutral-800 px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <Icon name="lucide:arrow-left" size="18" />
                  Sebelumnya
                </button>
                <button
                  class="bg-neutral-300 hover:bg-neutral-400 text-neutral-800 px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  Selanjutnya
                  <Icon name="lucide:arrow-right" size="18" />
                </button>
              </div>
            </div>

            <!-- Teaching Focus Section -->
            <div v-if="teachingFocus" class="max-w-7xl mx-auto mb-12">
              <div class="bg-neutral-100 rounded-lg p-8">
                <h3 class="text-2xl font-bold text-neutral-800 mb-4 flex items-center gap-2">
                  <Icon name="lucide:target" size="28" class="text-blue-600" />
                  Fokus Pembelajaran
                </h3>
                <p class="text-neutral-700 text-lg leading-relaxed">{{ teachingFocus }}</p>
              </div>
            </div>

            <!-- Classes Section -->
            <div v-if="classes && classes.length > 0" class="max-w-7xl mx-auto mb-12">
              <div class="bg-neutral-100 rounded-lg p-8">
                <h3 class="text-2xl font-bold text-neutral-800 mb-4 flex items-center gap-2">
                  <Icon name="lucide:school" size="28" class="text-green-600" />
                  Kelas yang Diajar
                </h3>
                <div class="flex flex-wrap gap-3">
                  <span
                    v-for="cls in classes"
                    :key="cls"
                    class="bg-green-100 text-green-800 px-5 py-2 rounded-full text-base font-semibold"
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
import { ref } from 'vue';
import TeacherCard from './TeacherCard.vue';

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

defineEmits(['open-modal']);

const carouselContainer = ref(null);
const isDialogOpen = ref(false);

const scrollLeft = () => {
  if (carouselContainer.value) {
    carouselContainer.value.scrollBy({
      left: -300,
      behavior: 'smooth'
    });
  }
};

const scrollRight = () => {
  if (carouselContainer.value) {
    carouselContainer.value.scrollBy({
      left: 300,
      behavior: 'smooth'
    });
  }
};

const openDialog = () => {
  isDialogOpen.value = true;
  document.body.style.overflow = 'hidden';
};

const closeDialog = () => {
  isDialogOpen.value = false;
  document.body.style.overflow = '';
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