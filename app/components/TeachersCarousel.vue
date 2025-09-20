<template>
  <div class="bg-neutral-100 font-serif py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-3xl font-bold text-neutral-800 mb-8">Guru Pendidikan Agama Islam</h2>

      <!-- Teacher Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-6">
        <TeacherCard
          v-for="teacher in teachers"
          :key="teacher.id"
          :teacher="teacher"
          @show-details="openTeacherModal"
        />
      </div>

      <!-- Carousel Navigation & Pagination -->
      <div class="flex justify-between items-center mt-8">
        <button class="p-2 rounded-full hover:bg-neutral-200 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div class="font-semibold text-neutral-700">
          01/20
        </div>
        <button class="p-2 rounded-full hover:bg-neutral-200 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  </div>

  <!-- The Modal component, controlled by this parent -->
  <TeacherDetailModal
    v-if="isModalVisible"
    :teacher="selectedTeacher"
    @close="closeTeacherModal"
    @navigate="navigateTeacher"
  />
</template>

<script setup>
import { ref } from 'vue';
import TeacherCard from './TeacherCard.vue';
import TeacherDetailModal from './TeacherDetailModal.vue';

// --- STATE MANAGEMENT ---
const isModalVisible = ref(false);
const selectedTeacherIndex = ref(0);

// --- DATA ---
// This would typically come from an API
const teachers = ref([
  { id: 1, name: 'Zulul Muthomimah', degree: 'S.PdI', university: 'Lulusan Universitas Gajah Mada', photoUrl: '/images/placeholder.jpg', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  { id: 2, name: 'Faizatul Mukrimah', degree: 'S.Ag', university: 'Lulusan Universitas Indonesia', photoUrl: '/images/placeholder.jpg', quote: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
  { id: 3, name: 'Ruffiah', degree: 'S.Ag', university: 'Lulusan Institut Teknologi Bandung', photoUrl: '/images/placeholder.jpg', quote: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
  { id: 4, name: 'Misbah Abdullah Ohoirot', degree: 'S.Ag', university: 'Lulusan Universitas Padjadjaran', photoUrl: '/images/placeholder.jpg', quote: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
  // Add more teachers here...
]);

const selectedTeacher = ref(null);

// --- METHODS ---
const openTeacherModal = (teacher) => {
  selectedTeacher.value = teacher;
  selectedTeacherIndex.value = teachers.value.findIndex(t => t.id === teacher.id);
  isModalVisible.value = true;
};

const closeTeacherModal = () => {
  isModalVisible.value = false;
};

const navigateTeacher = (direction) => {
  const newIndex = selectedTeacherIndex.value + direction;
  // Loop around if at the start or end
  if (newIndex < 0) {
    selectedTeacherIndex.value = teachers.value.length - 1;
  } else if (newIndex >= teachers.value.length) {
    selectedTeacherIndex.value = 0;
  } else {
    selectedTeacherIndex.value = newIndex;
  }
  selectedTeacher.value = teachers.value[selectedTeacherIndex.value];
};
</script>