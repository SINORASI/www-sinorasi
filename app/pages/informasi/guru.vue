<template>
  <div class="py-30">
    <ImageCarousel />
  </div>
  <div class="bg-neutral-100 font-serif py-12 px-4 sm:px-6 lg:px-8 space-y-16">
    <TeacherCategoryCarousel
      v-for="category in teacherCategories"
      :key="category.title"
      :title="category.title"
      :pagination="category.pagination"
      :teachers="category.teachers"
      @open-modal="handleOpenModal"
    />
  </div>

  <TeacherDetailModal
    v-if="isModalVisible"
    :teacher="selectedTeacher"
    :category-title="selectedTeacherCategoryTitle"
    @close="handleCloseModal"
    @navigate="handleNavigate"
  />
</template>

<script setup>
import { ref } from 'vue';
const isModalVisible = ref(false);
const selectedTeacher = ref(null);
const selectedTeacherCategoryTitle = ref('');
const currentTeacherList = ref([]);
const selectedTeacherIndex = ref(0);

const teacherCategories = ref([
  {
    title: 'Guru Pendidikan Agama Islam',
    pagination: '01/20',
    teachers: [
      { id: 'pai-1', name: 'Zulul Muthomimah', degree: 'S.PdI', university: 'Lulusan Universitas Gajah Mada', quote: 'Mendidik dengan hati, membangun generasi berakhlak mulia.' },
      { id: 'pai-2', name: 'Faizatul Mukrimah', degree: 'S.Ag', university: 'Lulusan Universitas Indonesia', quote: 'Ilmu tanpa amal adalah pohon tanpa buah.' },
      { id: 'pai-3', name: 'Ruffiah', degree: 'S.Ag', university: 'Lulusan Institut Teknologi Bandung', quote: 'Jadikan setiap kesulitan sebagai peluang untuk belajar.' },
      { id: 'pai-4', name: 'Misbah Abdullah', degree: 'S.Ag', university: 'Lulusan Universitas Padjadjaran', quote: 'Kesabaran adalah kunci keberhasilan dalam pendidikan.' },
    ]
  },
  {
    title: 'Guru Produktif',
    pagination: '01/15',
    teachers: [
      { id: 'prod-1', name: 'Budi Santoso', degree: 'S.Kom', university: 'Lulusan Institut Teknologi Sepuluh Nopember', quote: 'Inovasi adalah napas dari kemajuan teknologi.' },
      { id: 'prod-2', name: 'Citra Lestari', degree: 'S.T.', university: 'Lulusan Universitas Gajah Mada', quote: 'Praktik adalah guru terbaik dalam dunia kejuruan.' },
      { id: 'prod-3', name: 'Agus Wijaya', degree: 'M.T.', university: 'Lulusan Universitas Indonesia', quote: 'Kreativitas adalah kecerdasan yang sedang bersenang-senang.' },
    ]
  },
  {
    title: 'Guru Bahasa Indonesia',
    pagination: '01/10',
    teachers: [
      { id: 'indo-1', name: 'Siti Rahayu', degree: 'S.Pd.', university: 'Lulusan Universitas Negeri Jakarta', quote: 'Bahasa menunjukkan bangsa, mari kita lestarikan.' },
      { id: 'indo-2', name: 'Dewi Anggraini', degree: 'M.Hum.', university: 'Lulusan Universitas Padjadjaran', quote: 'Kata-kata memiliki kekuatan untuk mengubah dunia.' },
    ]
  },
  {
    title: 'Guru Matematika',
    pagination: '01/12',
    teachers: [
      { id: 'mat-1', name: 'Endang Susilo', degree: 'S.Si.', university: 'Lulusan Institut Teknologi Bandung', quote: 'Matematika adalah bahasa universal alam semesta.' },
      { id: 'mat-2', name: 'Rina Hartati', degree: 'M.Sc.', university: 'Lulusan Universitas Gadjah Mada', quote: 'Logika akan membawa Anda dari A ke B. Imajinasi akan membawa Anda ke mana saja.' },
      { id: 'mat-3', name: 'Joko Prabowo', degree: 'S.Pd.', university: 'Lulusan Universitas Sebelas Maret', quote: 'Jangan khawatir tentang kesulitanmu dalam matematika, aku jamin kesulitanku lebih besar.' },
    ]
  },
]);


const handleOpenModal = (teacher, teacherList, categoryTitle) => {
  currentTeacherList.value = teacherList; // Store the list of the relevant category
  selectedTeacherCategoryTitle.value = categoryTitle;
  selectedTeacher.value = teacher;
  selectedTeacherIndex.value = teacherList.findIndex(t => t.id === teacher.id);
  isModalVisible.value = true;
};

const handleCloseModal = () => {
  isModalVisible.value = false;
};

const handleNavigate = (direction) => {
  const newIndex = selectedTeacherIndex.value + direction;
  const listLength = currentTeacherList.value.length;

  if (newIndex < 0) {
    selectedTeacherIndex.value = listLength - 1;
  } else if (newIndex >= listLength) {
    selectedTeacherIndex.value = 0;
  } else {
    selectedTeacherIndex.value = newIndex;
  }
  selectedTeacher.value = currentTeacherList.value[selectedTeacherIndex.value];
};

</script>