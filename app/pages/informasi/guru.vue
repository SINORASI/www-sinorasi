<template>
  <motion.section
    class="relative w-full py-30 h-screen"
    style="
      background-image: url('/images/guru/foto-guru-bersama.jpeg');
      background-size: cover;
      background-position: bottom;
    "
    :initial="{ opacity: 0, scale: 1.1 }"
    :whileInView="{ opacity: 1, scale: 1 }"
    :transition="{ duration: 1.2, ease: 'easeOut' }"
    :inViewOptions="{ once: true }"
  >
    <div
      class="absolute bottom-0 left-0 right-0 flex flex-col md:flex-row justify-around items-center w-full p-4 bg-neutral-200 h-fit gap-4 md:gap-0"
    >
      <motion.div
        class="flex flex-col items-center justify-center"
        :initial="{ x: -50, opacity: 0, scale: 0.8 }"
        :whileInView="{ x: 0, opacity: 1, scale: 1 }"
        :transition="{ duration: 0.6, delay: 0.2, type: 'spring', stiffness: 100 }"
        :inViewOptions="{ once: true }"
      >
        <h1 class="text-2xl md:text-4xl font-bold">56+</h1>
        <p class="text-sm md:text-base">Guru Pengajar</p>
      </motion.div>
      <motion.div
        class="flex flex-col items-center justify-center"
        :initial="{ y: 50, opacity: 0, rotate: -10 }"
        :whileInView="{ y: 0, opacity: 1, rotate: 0 }"
        :transition="{ duration: 0.6, delay: 0.4, type: 'spring', stiffness: 100 }"
        :inViewOptions="{ once: true }"
      >
        <h1 class="text-2xl md:text-4xl font-bold">14+</h1>
        <p class="text-sm md:text-base">Karyawan</p>
      </motion.div>
      <motion.div
        class="flex flex-col items-center justify-center"
        :initial="{ x: 50, opacity: 0, scale: 0.8 }"
        :whileInView="{ x: 0, opacity: 1, scale: 1 }"
        :transition="{ duration: 0.6, delay: 0.6, type: 'spring', stiffness: 100 }"
        :inViewOptions="{ once: true }"
      >
        <h1 class="text-2xl md:text-4xl font-bold">12+</h1>
        <p class="text-sm md:text-base">Staff</p>
      </motion.div>
      <motion.div
        class="flex flex-col items-center justify-center"
        :initial="{ y: -50, opacity: 0, rotate: 10 }"
        :whileInView="{ y: 0, opacity: 1, rotate: 0 }"
        :transition="{ duration: 0.6, delay: 0.8, type: 'spring', stiffness: 100 }"
        :inViewOptions="{ once: true }"
      >
        <h1 class="text-2xl md:text-4xl font-bold">80+</h1>
        <p class="text-sm md:text-base">Lainnya</p>
      </motion.div>
    </div>
  </motion.section>
  <section class="container flex flex-col items-center justify-center gap-5 mx-auto py-30">
    <motion.h1
      class="p-4 text-3xl font-bold text-center rounded-lg shadow-sm bg-neutral-200"
      :initial="{ x: -100, opacity: 0, scale: 0.9 }"
      :whileInView="{ x: 0, opacity: 1, scale: 1 }"
      :transition="{ duration: 0.7, delay: 0.1, type: 'spring', stiffness: 80 }"
      :inViewOptions="{ once: true }"
    >
      Guru Pengajar
    </motion.h1>
    <motion.p
      class="p-4 text-lg font-bold text-center rounded-lg shadow-sm bg-neutral-200"
      :initial="{ x: 100, opacity: 0, scale: 0.9 }"
      :whileInView="{ x: 0, opacity: 1, scale: 1 }"
      :transition="{ duration: 0.7, delay: 0.3, type: 'spring', stiffness: 80 }"
      :inViewOptions="{ once: true }"
    >
      SMK Negeri 2 Singosari
    </motion.p>

    <motion.div
      v-for="(category, index) in teacherCategories"
      :key="category.title"
      :initial="{
        opacity: 0,
        x: index % 2 === 0 ? -100 : 100,
        y: 50,
        rotateY: index % 2 === 0 ? -15 : 15,
      }"
      :whileInView="{
        opacity: 1,
        x: 0,
        y: 0,
        rotateY: 0,
      }"
      :transition="{
        duration: 0.8,
        delay: index * 0.15,
        type: 'spring',
        stiffness: 70,
        damping: 20,
      }"
      :inViewOptions="{ once: true }"
    >
      <TeacherCategoryCarousel
        :title="category.title"
        :pagination="category.pagination"
        :teachers="category.teachers"
        :description="category.description"
        :classes="category.classes"
        :materials-by-class="category.materialsByClass"
        :teaching-focus="category.teachingFocus"
        @open-modal="handleOpenModal"
      />
    </motion.div>
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
import { motion } from "motion-v";
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
    title: "PNS",
    pagination: "01/35",
    description:
      "Pegawai Negeri Sipil di SMK Negeri 02 Singosari yang berperan dalam berbagai bidang pendidikan dan administrasi.",
    classes: [],
    materialsByClass: [],
    teachingFocus:
      "PNS berkontribusi dalam pengelolaan sekolah, administrasi, dan dukungan operasional untuk kelancaran proses pembelajaran.",
    teachers: [
      {
        id: "pns-1",
        name: "IVAN SATRYANA",
        degree: "S.Pd",
        image: "/images/guru/PNS/IVAN SATRYANA, S.Pd.jpg",
        university: "",
        quote: "",
      },
      {
        id: "pns-2",
        name: "MUNTAMAH",
        degree: "Dra.",
        image: "/images/guru/Foto - foto pns/Muntamah/muntamah2.jpg",
        university: "",
        quote: "",
      },
      {
        id: "pns-3",
        name: "FAUZI RAHMADANI",
        degree: "S.Sn",
        image: "/images/guru/PNS/FAUZI RAHMADANI, S.Sn.jpg",
        university: "",
        quote: '"Seorang terpelajar harus sudah berbuat adil sejak dalam pikiran, apalagi dalam perbuatan"',
      },
      {
        id: "pns-4",
        name: "WARDATUL MAULIDIYAH",
        degree: "S.Pd",
        image: "/images/guru/PNS/WARDATUL MAULIDIYAH, S.Pd.jpg",
        university: "",
        quote: "Setiap lembar catatan yang kamu buat, adalah langkah kecil menuju impianmu",
      },
      {
        id: "pns-5",
        name: "SETYAWAN EDI",
        degree: "A.Md",
        image: "/images/guru/Foto - foto pns/Edi/edi 2.jpg",
        university: "",
        quote: "",
      },
      {
        id: "pns-6",
        name: "SOFIANASARI",
        degree: "S.Sn",
        image: "/images/guru/Foto - foto pns/Sofia/sofia 2.jpg",
        university: "",
        quote: "Berjuanglah untuk hidupmu, orangtua bukan penentu satu-satunya untuk masa depan ❤️",
      },
      {
        id: "pns-7",
        name: "SLAMET RIADI",
        degree: "S.Pd",
        image: "/images/guru/Foto - foto pns/Slamet/slamet 2.jpg",
        university: "",
        quote: "",
      },
      {
        id: "pns-8",
        name: "EWIT IRNIYAH",
        degree: "S.Pd",
        image: "/images/guru/PNS/EWIT IRNIYAH, S.Pd.jpg",
        university: "",
        quote: "",
      },
      {
        id: "pns-9",
        name: "SOLIKAH",
        degree: "S.Pd",
        image: "/images/guru/Foto - foto pns/Solikah/solikah 2.jpg",
        university: "",
        quote: "",
      },
      {
        id: "pns-10",
        name: "SRI NURUL SYAMSIAH",
        degree: "S.Pd, M.Pd",
        image: "/images/guru/Foto - foto pns/Nurul/nurul 2.jpg",
        university: "",
        quote: "",
      },
      {
        id: "pns-11",
        name: "FAJAR NINGTYAS",
        degree: "S.Pd",
        image: "/images/guru/Foto - foto pns/Fajar/fajar2.jpg",
        university: "",
        quote: "",
      },
      {
        id: "pns-12",
        name: "JEFRY YUDHA BAGUS SETYAWAN",
        degree: "S.Pd, Gr",
        image: "/images/guru/PNS/JEFRY YUDHA BAGUS SETYAWAN S.Pd, Gr.jpg",
        university: "",
        quote: "Jangan Benci Jaraknya, nikmati saja rindunya 🤣",
      },
      {
        id: "pns-13",
        name: "IDA AYU SUNIANTARI",
        degree: "S.Pd.H",
        image: "/images/guru/Foto - foto pns/Ida/ida 2.jpg",
        university: "",
        quote: "Perlakukanlah orang lain seperti kamu ingin diperlakukan",
      },
      {
        id: "pns-14",
        name: "SITI MUZAYYANAH",
        degree: "Dra.",
        image: "/images/guru/Foto - foto pns/Siti/siti2.jpg",
        university: "",
        quote: "",
      },
      {
        id: "pns-15",
        name: "H. AHMAD MAKSUM",
        degree: "Drs., M.Pd",
        image: "/images/guru/Foto - foto pns/Maksum/maksum2.jpg",
        university: "",
        quote: "",
      },
      {
        id: "pns-18",
        name: "Hj. TITIK MARIYATI",
        degree: "S.Pd",
        image: "/images/guru/Foto - foto pns/Titik/titik 2.jpg",
        university: "",
        quote: "Siapa yang sungguh-sungguh pasti akan berhasil",
      },
      {
        id: "pns-19",
        name: "VINA BARIROTUR ROCHMAH",
        degree: "S.Pd",
        image: "/images/guru/PNS/VINA BARIROTUR ROCHMAH,S.Pd.jpg",
        university: "",
        quote: "",
      },
      {
        id: "pns-20",
        name: "TRIANA ARDIANI",
        degree: "S.Pd",
        image: "/images/guru/Foto - foto pns/Triana/triana2.jpg",
        university: "",
        quote: "",
      },
      {
        id: "pns-21",
        name: "SITTI HADIJAH",
        degree: "S.Pd",
        image: "/images/guru/PNS/SITTI HADIJAH, S.Pd.jpg",
        university: "",
        quote: "",
      },
      {
        id: "pns-22",
        name: "DIANA FARIDA",
        degree: "S.Si",
        image: "/images/guru/Foto - foto pns/Diana/diana 2.jpg",
        university: "",
        quote: "",
      },
      {
        id: "pns-23",
        name: "FEBRINA CANDRA CAHYANING DIAN",
        degree: "S.Sn",
        image: "/images/guru/Foto - foto pns/Febriana/febriana 2.jpg",
        university: "",
        quote: "Tetaplah jadi diri sendiri versi raw, tapi jangan lupa update biar terus upgrade",
      },
      {
        id: "pns-24",
        name: "MOCHAMAD BACHRUDIN",
        degree: "S.Pd",
        image: "/images/guru/Foto - foto pns/Barudin/barudin 2.jpg",
        university: "",
        quote: "",
      },
      {
        id: "pns-26",
        name: "SUCI ARTIWI",
        degree: "",
        image: "/images/guru/Foto - foto pns/Suci/suci 2.jpg",
        university: "",
        quote: "",
      },
      {
        id: "pns-27",
        name: "DIMAS WAHYUDI",
        degree: "",
        image: "/images/guru/Foto - foto pns/Dimas/dimas 2.jpg",
        university: "",
        quote: "",
      },
      {
        id: "pns-29",
        name: "NADIRO CHOTAMI",
        degree: "",
        image: "/images/guru/Foto - foto pns/Nadiro/nadiro 2.jpg",
        university: "",
        quote: "",
      },
      {
        id: "pns-30",
        name: "TOFIK KURHANA",
        degree: "",
        image: "/images/guru/Foto - foto pns/Tofik/tofik 2.jpg",
        university: "",
        quote: "",
      },
      {
        id: "pns-33",
        name: "WIWIN WINANGSIH",
        degree: "S.Pd., M.Pd.",
        image: "/images/guru/Foto - foto pns/Wiwin/wiwin 2.jpg",
        university: "",
        quote: "Tidak keberhasilan tanpa perjuangan, kegagalan adalah hal biasa bangkit terus semangat untuk berjuang",
      },
      {
        id: "pns-34",
        name: "ZULKIFLI ABDILLAH",
        degree: "S.Kom",
        image: "/images/guru/Foto - foto pns/Zulkifli/zulkfli 2.jpg",
        university: "",
        quote: "Keberhasilan dan kesuksesan tidak akan mungkin didapat tanpa usaha keras dan tak kenal lelah",
      },
      {
        id: "pns-35",
        name: "HERMAWAN",
        degree: "",
        image: "/images/guru/Foto - foto pns/Hermawan/hermawan2.jpg",
        university: "",
        quote: "",
      },
    ],
  },
  {
    title: "P3K",
    pagination: "01/19",
    description: "Pengawas/Pembina di SMK Negeri 02 Singosari yang bertugas mengawasi dan membina proses pendidikan.",
    classes: [],
    materialsByClass: [],
    teachingFocus: "Berperan aktif dalam mendukung visi misi SMK Negeri 02 Singosari.",
    teachers: [
      {
        id: "p3k-1",
        name: "DEVI ARVENI",
        degree: "S.Pd, Gr",
        image: "/images/guru/P3K/DEVI ARVENI, S.Pd, Gr.jpg",
        university: "",
        quote: "Kerjakan yang bisa kamu lakukan sekarang, karena menunda akan menambah pekerjaanmu",
      },
      {
        id: "p3k-2",
        name: "VITA PRIMASARI",
        degree: "S.Pd",
        image: "/images/guru/P3K/VITA PRIMASARI, S.Pd.jpg",
        university: "",
        quote:
          "Percayalah bahwa kamu memiliki kekuatan untuk bangkit dari setiap kesulitan dan menjadi lebih kuat dari sebelumnya.",
      },
      {
        id: "p3k-3",
        name: "MOKHAMAD AMRUL SADAT",
        degree: "ST, M.Pd",
        image: "/images/guru/P3K/MOKHAMAD AMRUL SADAT, ST,M.Pd.jpg",
        university: "",
        quote: "SEMANGAT TANPO SAMBAT",
      },
      {
        id: "p3k-4",
        name: "MIRA AYU",
        degree: "S.Pd",
        image: "/images/guru/P3K/MIRA AYU, S.Pd.jpg",
        university: "",
        quote: "",
      },
      {
        id: "p3k-5",
        name: "CHUTMAN EFENDI",
        degree: "S.Pd, Gr",
        image: "/images/guru/P3K/CHUTMAN EFENDI, S,Pd, Gr.jpg",
        university: "",
        quote: "SANTAI TAPI SAMPAI",
      },
      {
        id: "p3k-6",
        name: "KRISMAWANDI NUGROHO",
        degree: "S.Pd",
        image: "/images/guru/P3K/KRISMAWANDI NUGROHO,S.Pd.jpg",
        university: "",
        quote: "Disiplin, konsisten, Fokus",
      },
      {
        id: "p3k-7",
        name: "FIDDA ZURIKA ISLAMIA",
        degree: "S.Pd",
        image: "/images/guru/P3K/FIDDA ZURIKA ISLAMIA, S.Pd.jpg",
        university: "",
        quote:
          "Aku tidak bersaing dengan siapapun. Aku bersaing dengan diriku sendiri, yg harus lebih baik dari kemarin.",
      },
      {
        id: "p3k-8",
        name: "SAMAODIN",
        degree: "S.AP",
        image: "/images/guru/P3K/SAMAODIN, S.AP.jpg",
        university: "",
        quote: "",
      },
      {
        id: "p3k-9",
        name: "TRIYAS KUSUMAWARDHANI",
        degree: "S.Pd., Gr.",
        image: "/images/guru/P3K/TRIYAS KUSUMAWARDHANI, S.Pd., Gr..jpg",
        university: "",
        quote:
          "Hidup bukan soal cepat menemukan siapa dirimu, tapi berani berjalan sambil terus berubah. Seperti sungai yang mencari laut, kau akan menemukan dirimu di waktu yang tepat. Tidak apa-apa kalau sekarang kau belum tahu mau jadi apa. Bahkan kupu-kupu pun pernah merasa dirinya hanya ulat yang membosankan. ✌🏻",
      },
      {
        id: "p3k-10",
        name: "YEFRY RULLY ISMARTONO",
        degree: "S.Pd",
        image: "/images/guru/P3K/YEFRY RULLY ISMARTONO, S.Pd.jpg",
        university: "",
        quote: "",
      },
      {
        id: "p3k-11",
        name: "ALIFAH DIANTEBES AINDRA",
        degree: "S.Pd",
        image: "/images/guru/P3K/ALIFAH DIANTEBES AINDRA, S.Pd.jpg",
        university: "",
        quote:
          "Nilai sejati manusia tak terukur dari cepatnya ia tiba, melainkan dari kedalaman manfaat yang ia bawa. Hidup layaknya perjalanan, terus mengasah diri dengan mencari dan memandang cakrawala guna memaksimalkan potensi sejati kita.",
      },
      {
        id: "p3k-12",
        name: "AGUNG DWI KURNIAWAN",
        degree: "S.Pd",
        image: "/images/guru/P3K/AGUNG DWI KURNIAWAN, S.Pd.jpg",
        university: "",
        quote: "Percayalah pada diri sendiri, karena kamu memiliki potensi yang luar biasa",
      },
      {
        id: "p3k-13",
        name: "ISRIZAL ANWAR ZUHRI",
        degree: "S.Psi",
        image: "/images/guru/P3K/ISRIZAL ANWAR ZUHRI, S.Psi.jpg",
        university: "",
        quote: "Tugas pertama dari cinta adalah mendengarkan",
      },
      {
        id: "p3k-14",
        name: "BAMBANG ISHARTANTO",
        degree: "ST",
        image: "/images/guru/P3K/BAMBANG ISHARTANTO, ST.jpg",
        university: "",
        quote: "Hidup itu kayak game, kalau nggak mau level up, ya bakal stuck di situ-situ aja.",
      },
      {
        id: "p3k-15",
        name: "ANJAR AFIF AFANDI",
        degree: "ST, M.Pd",
        image: "/images/guru/P3K/ANJAR AFIF AFANDI, ST, M.Pd.jpg",
        university: "",
        quote: "Jangan tinggalkan sholat!",
      },
      {
        id: "p3k-16",
        name: "MEGA  DWININGRUM",
        degree: "S.Pd",
        image: "/images/guru/P3K/MEGA  DWININGRUM, S.Pd.jpg",
        university: "",
        quote:
          "Berbaik hatilah. Setidaknya jika tubuh ini hancur masih ada hati yang akan membawamu menuju tempat yang indah berupa surga.",
      },
      {
        id: "p3k-17",
        name: "ZULUL MUTHOMIMAH",
        degree: "S.PdI",
        image: "/images/guru/P3K/ZULUL MUTHOMIMAH, S.PdI.png",
        university: "",
        quote: "",
      },
      {
        id: "p3k-18",
        name: "IMAM SYAFII",
        degree: "S.Pd",
        image: "/images/guru/P3K/IMAM SYAFII, S.Pd.jpg",
        university: "",
        quote: "",
      },
      {
        id: "p3k-19",
        name: "NURAZIZAH CHOLIDIYAH",
        degree: "S.S., Gr.",
        image: "/images/guru/P3K/NURAZIZAH CHOLIDIYAH,S.S.,Gr..jpg",
        university: "",
        quote: "今からもっと頑張らなきゃ",
      },
    ],
  },
  {
    title: "GTT",
    pagination: "01/07",
    description: "Guru Tetap di SMK Negeri 02 Singosari yang fokus pada pengembangan kompetensi siswa.",
    classes: [],
    materialsByClass: [],
    teachingFocus: "Berperan aktif dalam mendukung visi misi SMK Negeri 02 Singosari.",
    teachers: [
      {
        id: "gtt-1",
        name: "AANG NOERARIES WAHYUDIPASA",
        degree: "S.Si",
        image: "/images/guru/GTT/AANG NOERARIES WAHYUDIPASA, S.Si.jpg",
        university: "",
        quote: "",
      },
      {
        id: "gtt-3",
        name: "FENIS FITRIA DEWI",
        degree: "S.Si",
        image: "/images/guru/GTT/FENIS FITRIA DEWI, S.Si.jpg",
        university: "",
        quote:
          '"Kesuksesan bukan hanya milik yang pintar, tetapi milik mereka yang tekun, mau belajar, dan berani mencoba" (B.J. Habibie)',
      },
      {
        id: "gtt-4",
        name: "RR. HENNING GRATYANIS ANGGRAENI",
        degree: "S.Pd",
        image: "/images/guru/GTT/RR. HENNING GRATYANIS ANGGRAENI, S.Pd.jpg",
        university: "",
        quote: "",
      },
      {
        id: "gtt-5",
        name: "TUTIK FARIDA",
        degree: "S.Pd",
        image: "/images/guru/GTT/TUTIK FARIDA, S.Pd.jpg",
        university: "",
        quote: "",
      },
      {
        id: "gtt-6",
        name: "AMIN MACHMUDI",
        degree: "S.Pd",
        image: "/images/guru/GTT/AMIN MACHMUDI,S.Pd.jpg",
        university: "",
        quote:
          "Mahkota seseorang adalah Akalnya, Derajat seseorang adalah Agamanya, sedangkan Kehotmatan seseorang adalah Budi Pekertinya  ( dikutip dari Umar Bin Khattab )",
      },
      {
        id: "gtt-7",
        name: "FITRIA KUMALA TRISNA",
        degree: "ST",
        image: "/images/guru/GTT/FITRIA KUMALA TRISNA, ST.jpg",
        university: "",
        quote: "dream, you're gonna make it.",
      },
    ],
  },
  {
    title: "KARYAWAN",
    pagination: "01/15",
    description: "Karyawan SMK Negeri 02 Singosari yang mendukung operasional sekolah.",
    classes: [],
    materialsByClass: [],
    teachingFocus: "Berperan aktif dalam mendukung visi misi SMK Negeri 02 Singosari.",
    teachers: [
      {
        id: "karyawan-1",
        name: "ARIYANTO",
        degree: "",
        image: "/images/guru/KARYAWAN/ARIYANTO.jpg",
        university: "",
        quote: "Tetap berusaha dan berusaha untuk menjadi baik",
      },
      {
        id: "karyawan-2",
        name: "AFFIN HENDRAMAWAN",
        degree: "",
        image: "/images/guru/KARYAWAN/AFFIN HENDRAMAWAN.jpg",
        university: "",
        quote: "",
      },
      {
        id: "karyawan-3",
        name: "MEGAR SEMBADA KUMARA",
        degree: "SE",
        image: "/images/guru/KARYAWAN/MEGAR SEMBADA KUMARA, SE.jpg",
        university: "",
        quote: "",
      },
      {
        id: "karyawan-4",
        name: "NOFIN",
        degree: "",
        image: "/images/guru/KARYAWAN/NOFIN.jpg",
        university: "",
        quote: "",
      },
      {
        id: "karyawan-5",
        name: "SUNINGSIH",
        degree: "",
        image: "/images/guru/KARYAWAN/SUNINGSIH.jpg",
        university: "",
        quote: "Ketekunan dan Disiplin dalam belajar adalah kunci untuk meraih prestasi",
      },
      {
        id: "karyawan-6",
        name: "RISDI ANTONO",
        degree: "",
        image: "/images/guru/KARYAWAN/RISDI ANTONO.jpg",
        university: "",
        quote: "",
      },
      {
        id: "karyawan-7",
        name: "ARNATA WAHYUNINGTIAS",
        degree: "",
        image: "/images/guru/KARYAWAN/ARNATA WAHYUNINGTIAS.jpg",
        university: "",
        quote:
          "Hadapi setiap tantangan dengan berani, karena setiap rintangan adalah kesempatan untuk belajar dan tumbuh",
      },
      {
        id: "karyawan-8",
        name: "ARACHMADI PUTRA PAMBUDI",
        degree: "",
        image: "/images/guru/KARYAWAN/ARACHMADI PUTRA PAMBUDI.jpg",
        university: "",
        quote: 'Ada banyak cara untuk "pergi", tapi hanya ada satu cara untuk "tetap di sini".',
      },
      {
        id: "karyawan-9",
        name: "LULUK RENANINGTYAS",
        degree: "",
        image: "/images/guru/KARYAWAN/LULUK RENANINGTYAS.jpg",
        university: "",
        quote: "Ingat! Setiap kamu malas-malasan, teman-teman kamu diluar sana terus berproses dan bertumbuh.",
      },
      {
        id: "karyawan-11",
        name: "UDIK WIRA AGUNG",
        degree: "",
        image: "/images/guru/KARYAWAN/UDIK WIRA AGUNG.png",
        university: "",
        quote: "",
      },
      {
        id: "karyawan-12",
        name: "DWI CAHYA SEPTIADI",
        degree: "",
        image: "/images/guru/KARYAWAN/DWI CAHYA SEPTIADI.jpg",
        university: "",
        quote: "",
      },
      {
        id: "karyawan-13",
        name: "NUR HASAN",
        degree: "",
        image: "/images/guru/KARYAWAN/NUR HASAN.jpg",
        university: "",
        quote: "",
      },
      {
        id: "karyawan-14",
        name: "SENOVANI FIRMAN DETTA",
        degree: "S.AP",
        image: "/images/guru/KARYAWAN/SENOVANI FIRMAN DETTA, S.AP.jpg",
        university: "",
        quote: "Teruslah belajar dan belajar untuk meraih cita-cita yang tinggi",
      },
      {
        id: "karyawan-15",
        name: "ROSI AKBAR NOR AZIZ",
        degree: "",
        image: "/images/guru/KARYAWAN/ROSI AKBAR NOR AZIZ.jpg",
        university: "",
        quote: "",
      },
    ],
  },
  {
    title: "KTU",
    pagination: "01/01",
    description: "Kepala Tata Usaha yang mengelola administrasi dan operasional sekolah.",
    classes: [],
    materialsByClass: [],
    teachingFocus: "Berperan aktif dalam mendukung visi misi SMK Negeri 02 Singosari.",
    teachers: [],
  },
  {
    title: "Kapro",
    pagination: "01/08",
    description: "Kepala Program Keahlian yang memimpin konsentrasi keahlian di SMK Negeri 02 Singosari.",
    classes: [],
    materialsByClass: [],
    teachingFocus: "Berperan aktif dalam mendukung visi misi SMK Negeri 02 Singosari.",
    teachers: [
      {
        id: "kapro-1",
        name: "FALKUDIN",
        degree: "S.T",
        image: "/images/guru/Kapro/AV/FALKUDIN, S.T.JPG",
        university: "",
        quote: "Life as resistor",
      },
      {
        id: "kapro-2",
        name: "HERMAWAN",
        degree: "ST, M.Pd",
        image: "/images/guru/Kapro/MT/HERMAWAN, ST,M.Pd.JPG",
        university: "",
        quote: "",
      },
      {
        id: "kapro-3",
        name: "ALIFAH DIANTEBES AINDRA",
        degree: "S.Pd",
        image: "/images/guru/P3K/ALIFAH DIANTEBES AINDRA, S.Pd.jpg",
        university: "",
        quote:
          "Nilai sejati manusia tak terukur dari cepatnya ia tiba, melainkan dari kedalaman manfaat yang ia bawa. Hidup layaknya perjalanan, terus mengasah diri dengan mencari dan memandang cakrawala guna memaksimalkan potensi sejati kita.",
      },
      {
        id: "kapro-4",
        name: "DIMAS MAHARENDRA OKTENDIMA",
        degree: "S.Pd",
        image: "/images/guru/Kapro/AN/DIMAS MAHARENDRA OKTENDIMA,S.Pd.JPG",
        university: "",
        quote: "Ad Astra Per Aspera",
      },
      {
        id: "kapro-5",
        name: "FEBRINA CANDRA CAHYANING DIAN",
        degree: "S.Sn",
        image: "/images/guru/Kapro/BC/FEBRINA CANDRA CAHYANING DIAN, S.Sn.JPG",
        university: "",
        quote: "Tetaplah jadi diri sendiri versi raw, tapi jangan lupa update biar terus upgrade",
      },
      {
        id: "kapro-6",
        name: "MOKHAMAD AMRUL SADAT",
        degree: "ST, M.Pd",
        image: "/images/guru/Kapro/EI/MOKHAMAD AMRUL SADAT, ST,M.Pd.JPG",
        university: "",
        quote: "SEMANGAT TANPO SAMBAT",
      },
      {
        id: "kapro-7",
        name: "ZOULFIKAR RAMSANJANIE AQSHA",
        degree: "S.Kom",
        image: "/images/guru/Kapro/DKV/ZOULFIKAR RAMSANJANIE AQSHA, S.Kom.JPG",
        university: "",
        quote: "",
      },
      {
        id: "kapro-8",
        name: "GAYAN LAGA",
        degree: "S.Pd",
        image: "/images/guru/Kapro/TKJ/GAYAN LAGA, S.Pd.jpg",
        university: "",
        quote: "Tidak ada kata terlambat untuk belajar.",
      },
    ],
  },
  {
    title: "Korlabid",
    pagination: "01/05",
    description: "Koordinator Laboratorium yang mengelola fasilitas praktikum dan laboratorium.",
    classes: [],
    materialsByClass: [],
    teachingFocus: "Berperan aktif dalam mendukung visi misi SMK Negeri 02 Singosari.",
    teachers: [
      {
        id: "korlabid-2",
        name: "ZULFA RUMAILAH",
        degree: "S.Pd",
        image: "/images/guru/Korlabid/KURIKULUM/ZULFA RUMAILAH, S.Pd.jpg",
        university: "",
        quote:
          "Ilmu yang kalian pelajari hari ini mungkin belum terasa manfaatnya sekarang, tapi suatu saat ia akan menjadi kunci yang membuka pintu masa depan kalian",
      },
      {
        id: "korlabid-3",
        name: "WIWIN WINANGSIH",
        degree: "S.Pd, M.Pd",
        image: "/images/guru/Korlabid/KESISWAAN/WIWIN WINANGSIH, S.Pd,M.Pd.jpg",
        university: "",
        quote: "Tidak keberhasilan tanpa perjuangan, kegagalan adalah hal biasa bangkit terus semangat untuk berjuang",
      },
      {
        id: "korlabid-4",
        name: "ERI FERDIANTI",
        degree: "S.Pd, M.Pd",
        image: "/images/guru/Korlabid/SARPAS/ERI FERDIANTI,S.Pd, M.Pd.jpg",
        university: "",
        quote: "",
      },
      {
        id: "korlabid-5",
        name: "ROUDHOTUL HUSNA YANIF",
        degree: "S.Psi",
        image: "/images/guru/Korlabid/TU/ROUDHOTUL HUSNA YANIF, S.Psi.jpg",
        university: "",
        quote: "Hidup itu seperti puzle nikmati proses menyusunnya",
      },
    ],
  },
]);

const handleOpenModal = (teacher, teacherList, categoryTitle) => {
  currentTeacherList.value = teacherList;
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
