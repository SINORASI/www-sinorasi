<template>
  <section class="relative w-full h-screen bg-neutral-300 py-30">
    <div class="absolute bottom-0 left-0 right-0 flex justify-around w-full p-4 bg-neutral-200 h-fit">
      <div class="flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold">50+</h1>
        <p class="text-base">Guru Pengajar</p>
      </div>
      <div class="flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold">20+</h1>
        <p class="text-base">Karyawan</p>
      </div>
      <div class="flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold">10+</h1>
        <p class="text-base">Staff</p>
      </div>
      <div class="flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold">15+</h1>
        <p class="text-base">Lainnya</p>
      </div>
    </div>
  </section>
  <section class="container flex flex-col items-center justify-center gap-5 mx-auto py-30">
    <h1 class="p-4 text-3xl font-bold text-center rounded-lg shadow-sm bg-neutral-200">Guru Pengajar</h1>
    <p class="p-4 text-lg font-bold text-center rounded-lg shadow-sm bg-neutral-200">SMK Negeri 02 Singosari</p>

    <TeacherCategoryCarousel
      v-for="category in teacherCategories"
      :key="category.title"
      :title="category.title"
      :pagination="category.pagination"
      :teachers="category.teachers"
      :description="category.description"
      :classes="category.classes"
      :materials-by-class="category.materialsByClass"
      :teaching-focus="category.teachingFocus"
      @open-modal="handleOpenModal"
    />
  </section>

  <TeacherDetailModal
    v-if="isModalVisible"
    :teacher="selectedTeacher"
    :category-title="selectedTeacherCategoryTitle"
    @close="handleCloseModal"
    @navigate="handleNavigate"
  />
</template>

<script setup>
import { ref } from "vue";
const isModalVisible = ref(false);
const selectedTeacher = ref(null);
const selectedTeacherCategoryTitle = ref("");
const currentTeacherList = ref([]);
const selectedTeacherIndex = ref(0);

useHead({
  title: "Guru Pengajar - Informasi - SMKN 2 Singosari",
  meta: [
    {
      name: "description",
      content: "Daftar guru pengajar di SMK Negeri 2 Singosari. Tenaga pendidik profesional dan berpengalaman.",
    },
  ],
});

const teacherCategories = ref([
  {
    title: "Guru Pendidikan Agama Islam",
    pagination: "01/20",
    description:
      'disini dijelaskan tentang apa itu guru bidang tertentu, semisalkan "guru bahasa indonesia di  smk negeri 02 singosari berfokus mengajarkan materi kebahasaan, pembuatan proposal dan bla bla bla b la disini dijelaskan tentang apa itu guru bidang tertentu, semisalkan "guru bahasa indonesia di  smk negeri 02 singosari berfokus mengajarkan materi kebahasaan, pembuatan proposal dan bla bla bla b la',
    classes: ["Kelas X", "Kelas XI", "Kelas XII"],
    materialsByClass: [
      {
        className: "Kelas 10",
        materials: ["Materi 1", "Materi 2", "Materi 3", "Materi 4", "Materi 5", "Materi 6"],
      },
      {
        className: "Kelas 11",
        materials: ["Materi 1", "Materi 2", "Materi 3", "Materi 4", "Materi 5", "Materi 6"],
      },
      {
        className: "Kelas 12",
        materials: ["Materi 1", "Materi 2", "Materi 3", "Materi 4", "Materi 5", "Materi 6"],
      },
    ],
    teachingFocus:
      "Guru Pendidikan Agama Islam di SMK Negeri 02 Singosari fokus membangun karakter siswa yang berakhlak mulia, memahami nilai-nilai Islam, dan mengamalkannya dalam kehidupan sehari-hari. Pembelajaran mencakup aspek spiritual, moral, dan sosial yang terintegrasi dengan lingkungan sekolah.",
    teachers: [
      {
        id: "pai-1",
        name: "Zulul Muthomimah",
        degree: "S.PdI",
        university: "Lulusan Universitas Gajah Mada",
        quote: "Mendidik dengan hati, membangun generasi berakhlak mulia.",
      },
      {
        id: "pai-2",
        name: "Faizatul Mukrimah",
        degree: "S.Ag",
        university: "Lulusan Universitas Indonesia",
        quote: "Ilmu tanpa amal adalah pohon tanpa buah.",
      },
      {
        id: "pai-3",
        name: "Ruffiah",
        degree: "S.Ag",
        university: "Lulusan Institut Teknologi Bandung",
        quote: "Jadikan setiap kesulitan sebagai peluang untuk belajar.",
      },
      {
        id: "pai-4",
        name: "Misbah Abdullah",
        degree: "S.Ag",
        university: "Lulusan Universitas Padjadjaran",
        quote: "Kesabaran adalah kunci keberhasilan dalam pendidikan.",
      },
    ],
  },
  {
    title: "Guru Produktif",
    pagination: "01/15",
    description:
      "Guru produktif di SMK Negeri 02 Singosari berperan dalam mengajarkan keterampilan teknis dan praktis sesuai dengan program keahlian. Mereka membekali siswa dengan kompetensi yang dibutuhkan dunia industri dan dunia kerja.",
    classes: ["Kelas X RPL", "Kelas XI RPL", "Kelas XII RPL", "Kelas X TKJ", "Kelas XI TKJ", "Kelas XII TKJ"],
    materialsByClass: [
      {
        className: "Kelas 10",
        materials: [
          "Pemrograman Dasar",
          "Basis Data",
          "Sistem Komputer",
          "Jaringan Dasar",
          "Desain Grafis",
          "Web Development",
        ],
      },
      {
        className: "Kelas 11",
        materials: [
          "Pemrograman Berorientasi Objek",
          "Database Management",
          "Administrasi Jaringan",
          "Mobile Development",
          "UI/UX Design",
          "Cyber Security",
        ],
      },
      {
        className: "Kelas 12",
        materials: [
          "Project Management",
          "Full Stack Development",
          "Cloud Computing",
          "DevOps",
          "Machine Learning",
          "Entrepreneurship",
        ],
      },
    ],
    teachingFocus:
      "Guru produktif mengajarkan keterampilan praktis yang langsung applicable di dunia kerja. Fokus pembelajaran mencakup hands-on practice, project-based learning, dan kolaborasi dengan industri untuk memastikan siswa siap menghadapi tantangan dunia kerja.",
    teachers: [
      {
        id: "prod-1",
        name: "Budi Santoso",
        degree: "S.Kom",
        university: "Lulusan Institut Teknologi Sepuluh Nopember",
        quote: "Inovasi adalah napas dari kemajuan teknologi.",
      },
      {
        id: "prod-2",
        name: "Citra Lestari",
        degree: "S.T.",
        university: "Lulusan Universitas Gajah Mada",
        quote: "Praktik adalah guru terbaik dalam dunia kejuruan.",
      },
      {
        id: "prod-3",
        name: "Agus Wijaya",
        degree: "M.T.",
        university: "Lulusan Universitas Indonesia",
        quote: "Kreativitas adalah kecerdasan yang sedang bersenang-senang.",
      },
    ],
  },
  {
    title: "Guru Bahasa Indonesia",
    pagination: "01/10",
    description:
      "Guru Bahasa Indonesia di SMK Negeri 02 Singosari berfokus mengajarkan materi kebahasaan, pembuatan proposal, surat menyurat, dan berbagai keterampilan komunikasi yang penting untuk dunia kerja.",
    classes: ["Kelas X", "Kelas XI", "Kelas XII"],
    materialsByClass: [
      {
        className: "Kelas 10",
        materials: [
          "Tata Bahasa",
          "Menulis Surat",
          "Membaca Pemahaman",
          "Berbicara Formal",
          "Mendengarkan Aktif",
          "Karya Sastra",
        ],
      },
      {
        className: "Kelas 11",
        materials: ["Proposal Bisnis", "Laporan Kerja", "Presentasi Formal", "Debat", "Kritik Sastra", "Jurnalistik"],
      },
      {
        className: "Kelas 12",
        materials: [
          "Komunikasi Bisnis",
          "Negosiasi",
          "Public Speaking",
          "Copywriting",
          "Content Writing",
          "Skripsi/Karya Ilmiah",
        ],
      },
    ],
    teachingFocus:
      "Pembelajaran Bahasa Indonesia diarahkan untuk mengembangkan kemampuan komunikasi siswa baik lisan maupun tulisan, dengan penekanan pada aplikasi praktis di dunia kerja seperti pembuatan dokumen bisnis, presentasi profesional, dan komunikasi efektif.",
    teachers: [
      {
        id: "indo-1",
        name: "Siti Rahayu",
        degree: "S.Pd.",
        university: "Lulusan Universitas Negeri Jakarta",
        quote: "Bahasa menunjukkan bangsa, mari kita lestarikan.",
      },
      {
        id: "indo-2",
        name: "Dewi Anggraini",
        degree: "M.Hum.",
        university: "Lulusan Universitas Padjadjaran",
        quote: "Kata-kata memiliki kekuatan untuk mengubah dunia.",
      },
    ],
  },
  {
    title: "Guru Matematika",
    pagination: "01/12",
    description:
      "Guru Matematika di SMK Negeri 02 Singosari mengajarkan logika berpikir, pemecahan masalah, dan konsep matematika yang aplikatif untuk mendukung mata pelajaran produktif siswa.",
    classes: ["Kelas X", "Kelas XI", "Kelas XII"],
    materialsByClass: [
      {
        className: "Kelas 10",
        materials: ["Aljabar Dasar", "Geometri", "Fungsi Linear", "Persamaan", "Statistika Dasar", "Peluang"],
      },
      {
        className: "Kelas 11",
        materials: ["Trigonometri", "Fungsi Kuadrat", "Barisan & Deret", "Matriks", "Vektor", "Transformasi"],
      },
      {
        className: "Kelas 12",
        materials: ["Kalkulus", "Limit Fungsi", "Turunan", "Integral", "Matematika Diskrit", "Logika Proposisi"],
      },
    ],
    teachingFocus:
      "Pembelajaran matematika diarahkan untuk mengembangkan kemampuan berpikir logis, analitis, dan sistematis yang mendukung pembelajaran mata pelajaran produktif, khususnya dalam bidang teknologi dan rekayasa.",
    teachers: [
      {
        id: "mat-1",
        name: "Endang Susilo",
        degree: "S.Si.",
        university: "Lulusan Institut Teknologi Bandung",
        quote: "Matematika adalah bahasa universal alam semesta.",
      },
      {
        id: "mat-2",
        name: "Rina Hartati",
        degree: "M.Sc.",
        university: "Lulusan Universitas Gadjah Mada",
        quote: "Logika akan membawa Anda dari A ke B. Imajinasi akan membawa Anda ke mana saja.",
      },
      {
        id: "mat-3",
        name: "Joko Prabowo",
        degree: "S.Pd.",
        university: "Lulusan Universitas Sebelas Maret",
        quote: "Jangan khawatir tentang kesulitanmu dalam matematika, aku jamin kesulitanku lebih besar.",
      },
    ],
  },
]);

const handleOpenModal = (teacher, teacherList, categoryTitle) => {
  currentTeacherList.value = teacherList; // Store the list of the relevant category
  selectedTeacherCategoryTitle.value = categoryTitle;
  selectedTeacher.value = teacher;
  selectedTeacherIndex.value = teacherList.findIndex((t) => t.id === teacher.id);
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
