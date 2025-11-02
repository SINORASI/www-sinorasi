<script setup lang="ts">
interface OrgNode {
  id: string;
  name: string;
  position: string;
  image: string;
  level: number;
  children?: OrgNode[];
  department?: string;
}

interface Teacher {
  id: string;
  name: string;
  degree: string;
  image: string;
  university: string;
  quote: string;
}

interface TeacherCategory {
  title: string;
  pagination: string;
  description: string;
  classes: any[];
  materialsByClass: any[];
  teachingFocus: string;
  teachers: Teacher[];
}

const teacherCategories = ref<TeacherCategory[]>([
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
        degree: "",
        image: "/images/guru/Foto - foto pns/Wiwin/wiwin 2.jpg",
        university: "",
        quote: "Tidak keberhasilan tanpa perjuangan, kegagalan adalah hal biasa bangkit terus semangat untuk berjuang",
      },
      {
        id: "pns-34",
        name: "ZULKIFLI ABDILLAH",
        degree: "",
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

const orgData = ref<OrgNode[]>([
  {
    id: "kepsek",
    name: "Sumijah S.Pd, M.Si",
    position: "Kepala Sekolah",
    image: "/images/kepsek.webp",
    level: 1,
    children: [
      {
        id: "wakasek-kesiswaan",
        name: "ZULKIFLI ABDILLAH, S.Kom",
        position: "Wakil Kepala Sekolah Bagian Kesiswaan",
        image: "/images/guru/Foto - foto pns/Zulkifli/zulkfli 2.jpg",
        level: 2,
        department: "kesiswaan",
        children: [],
      },
      {
        id: "wakasek-kurikulum",
        name: "ZULFA RUMAILAH, S.Pd",
        position: "Wakil Kepala Sekolah Bagian Kurikulum",
        image: "/images/guru/Korlabid/KURIKULUM/ZULFA RUMAILAH, S.Pd.jpg",
        level: 2,
        department: "kurikulum",
        children: [],
      },
      {
        id: "wakasek-sarpras",
        name: "ANWAR, S.Kom",
        position: "Wakil Kepala Sekolah Bagian Sarpras",
        image: "/images/guru/Foto - foto pns/Anwar/anwar 2.jpg",
        level: 2,
        department: "sapras",
        children: [],
      },
      {
        id: "wakasek-humas",
        name: "MOH. TAUFIK, S.Pd",
        position: "Wakil Kepala Sekolah Bagian Humas",
        image: "/images/guru/P3K/WAKA/WAKA HUMAS/MOH. TAUFIK, S.Pd.jpg",
        level: 2,
        department: "humas",
        children: [],
      },
    ],
  },
]);

const categoryMapping: Record<string, string[]> = {
  kurikulum: [],
  kesiswaan: [],
  sapras: [],
  humas: [],
};

const ktuTeacher = teacherCategories.value.find((cat) => cat.title === "KTU")?.teachers[0];
if (ktuTeacher) {
  ktuTeacher.name = "WIWIN WINANGSIH, S.Pd., M.Pd.";
  ktuTeacher.image = "/images/guru/Korlabid/KESISWAAN/WIWIN WINANGSIH, S.Pd,M.Pd.jpg";
}

onMounted(() => {
  if (orgData.value[0]?.children) {
    orgData.value[0].children.forEach((child) => {
      if (child.department && categoryMapping[child.department]) {
        const mappedCategories = categoryMapping[child.department]!;
        child.children = teacherCategories.value
          .filter((cat) => mappedCategories.includes(cat.title))
          .map((cat) => ({
            id: cat.title.toLowerCase(),
            name: cat.title,
            position: cat.description,
            image: "/images/placeholder.jpg",
            level: 2,
            children: cat.teachers.map((teacher) => ({
              id: teacher.id,
              name: teacher.name,
              position: teacher.degree,
              image: teacher.image,
              level: 3,
            })),
          }));
      }
    });
  }
});

const visibleNodes = ref<Set<string>>(new Set());
const hoveredNode = ref<string | null>(null);

const chartContainer = ref<HTMLElement>();
const cardRefs = ref<Record<string, HTMLElement>>({});

onMounted(() => {
  setTimeout(() => {
    visibleNodes.value.add("kepsek");
  }, 200);

  setTimeout(() => {
    if (orgData.value[0]?.children) {
      orgData.value[0].children.forEach((child) => {
        visibleNodes.value.add(child.id);
      });
    }
  }, 600);

  setTimeout(() => {
    if (orgData.value[0]?.children) {
      orgData.value[0].children.forEach((child) => {
        child.children?.forEach((grandchild) => {
          visibleNodes.value.add(grandchild.id);
        });
      });
    }
  }, 1000);
});

const getNodeColor = (level: number) => {
  switch (level) {
    case 1:
      return "from-purple-500 to-purple-700";
    case 2:
      return "from-blue-500 to-blue-700";
    case 3:
      return "from-green-500 to-green-700";
    default:
      return "from-gray-500 to-gray-700";
  }
};

const getNodeSize = (level: number) => {
  switch (level) {
    case 1:
      return "w-32 h-32";
    case 2:
      return "w-24 h-24";
    case 3:
      return "w-20 h-20";
    default:
      return "w-16 h-16";
  }
};

const getNodeShadow = (level: number) => {
  switch (level) {
    case 1:
      return "shadow-2xl";
    case 2:
      return "shadow-xl";
    case 3:
      return "shadow-lg";
    default:
      return "shadow-md";
  }
};

const getCardPosition = (nodeId: string) => {
  const card = cardRefs.value[nodeId];
  if (!card || !chartContainer.value) return null;

  const containerRect = chartContainer.value.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();

  return {
    x: cardRect.left - containerRect.left + cardRect.width / 2,
    y: cardRect.top - containerRect.top + cardRect.height / 2,
    width: cardRect.width,
    height: cardRect.height,
  };
};

const connectingLines = computed(() => {
  const lines: Array<{
    from: { x: number; y: number };
    to: { x: number; y: number };
    level: number;
  }> = [];

  const addLines = (node: OrgNode) => {
    if (node.children) {
      const parentPos = getCardPosition(node.id);
      if (parentPos) {
        node.children.forEach((child) => {
          const childPos = getCardPosition(child.id);
          if (childPos) {
            lines.push({
              from: { x: parentPos.x, y: parentPos.y + parentPos.height / 2 },
              to: { x: childPos.x, y: childPos.y - childPos.height / 2 },
              level: node.level,
            });
          }
          addLines(child);
        });
      }
    }
  };

  orgData.value.forEach((node) => {
    addLines(node);
  });
  return lines;
});
</script>

<template>
  <div ref="chartContainer" class="relative w-full overflow-hidden">
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-10 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
      <div
        class="absolute top-40 right-20 w-24 h-24 bg-purple-200/20 rounded-full blur-2xl animate-pulse delay-1000"
      ></div>
      <div
        class="absolute bottom-20 left-1/4 w-20 h-20 bg-green-200/20 rounded-full blur-xl animate-pulse delay-2000"
      ></div>
    </div>

    <div class="relative z-10 py-16">
      <svg class="absolute inset-0 w-full h-full pointer-events-none z-0" style="overflow: visible">
        <defs>
          <linearGradient id="line-gradient-1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#8B5CF6" stop-opacity="0.8" />
            <stop offset="100%" stop-color="#3B82F6" stop-opacity="0.6" />
          </linearGradient>
          <linearGradient id="line-gradient-2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.8" />
            <stop offset="100%" stop-color="#10B981" stop-opacity="0.6" />
          </linearGradient>
        </defs>
        <g v-for="line in connectingLines" :key="`line-${line.from.x}-${line.from.y}-${line.to.x}-${line.to.y}`">
          <path
            :d="`M ${line.from.x} ${line.from.y} Q ${line.from.x} ${(line.from.y + line.to.y) / 2} ${line.to.x} ${
              line.to.y
            }`"
            :stroke="`url(#line-gradient-${line.level})`"
            stroke-width="2"
            fill="none"
            class="opacity-0 animate-fade-in"
            style="animation-delay: 1.2s; animation-duration: 1s"
          />
        </g>
      </svg>

      <div class="flex justify-center mb-16">
        <div
          v-for="node in orgData"
          :key="node.id"
          ref="cardRefs[node.id] = $el"
          class="relative group"
          :class="{
            'opacity-0 scale-75': !visibleNodes.has(node.id),
            'opacity-100 scale-100': visibleNodes.has(node.id),
          }"
          style="transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
        >
          <div
            class="absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-linear-to-b from-purple-400 to-transparent"
          ></div>

          <div
            class="relative bg-white/90 backdrop-blur-sm border-2 border-white/50 rounded-2xl p-4 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
            @mouseenter="hoveredNode = node.id"
            @mouseleave="hoveredNode = null"
          >
            <div class="flex justify-center mb-3">
              <div
                :class="`relative ${getNodeSize(
                  node.level
                )} rounded-full overflow-hidden border-4 border-white ${getNodeShadow(node.level)}`"
              >
                <NuxtImg
                  :src="node.image"
                  :alt="node.name"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  :class="`absolute inset-0 bg-linear-to-t ${getNodeColor(
                    node.level
                  )} opacity-0 group-hover:opacity-20 transition-opacity duration-300`"
                ></div>
              </div>
            </div>

            <div class="text-center">
              <h3 class="font-bold text-gray-800 text-sm leading-tight mb-1">{{ node.name }}</h3>
              <p class="text-xs text-gray-600 leading-tight">{{ node.position }}</p>
            </div>

            <div
              class="absolute inset-0 bg-linear-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
          </div>
        </div>
      </div>

      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl pointer-events-none"
      >
        <svg class="w-full h-32" viewBox="0 0 600 128" preserveAspectRatio="none">
          <line x1="300" y1="64" x2="75" y2="64" stroke="url(#gradient1)" stroke-width="2" class="opacity-60" />
          <line x1="300" y1="64" x2="525" y2="64" stroke="url(#gradient1)" stroke-width="2" class="opacity-60" />

          <line x1="75" y1="64" x2="75" y2="128" stroke="url(#gradient2)" stroke-width="2" class="opacity-60" />
          <line x1="187.5" y1="64" x2="187.5" y2="128" stroke="url(#gradient2)" stroke-width="2" class="opacity-60" />
          <line x1="300" y1="64" x2="300" y2="128" stroke="url(#gradient2)" stroke-width="2" class="opacity-60" />
          <line x1="412.5" y1="64" x2="412.5" y2="128" stroke="url(#gradient2)" stroke-width="2" class="opacity-60" />
          <line x1="525" y1="64" x2="525" y2="128" stroke="url(#gradient2)" stroke-width="2" class="opacity-60" />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#8B5CF6" stop-opacity="0.6" />
              <stop offset="50%" stop-color="#3B82F6" stop-opacity="0.8" />
              <stop offset="100%" stop-color="#8B5CF6" stop-opacity="0.6" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.8" />
              <stop offset="100%" stop-color="#10B981" stop-opacity="0.6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div class="flex justify-center flex-wrap gap-8 mb-16 relative">
        <div
          v-for="(node, index) in orgData[0]?.children || []"
          :key="node.id"
          ref="cardRefs[node.id] = $el"
          class="relative group"
          :class="{
            'opacity-0 scale-75 translate-y-8': !visibleNodes.has(node.id),
            'opacity-100 scale-100 translate-y-0': visibleNodes.has(node.id),
          }"
          style="transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
        >
          <div
            class="absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-12 bg-linear-to-b from-blue-400 to-transparent"
          ></div>

          <div
            class="relative bg-white/90 backdrop-blur-sm border-2 border-white/50 rounded-xl p-3 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 cursor-pointer"
            @mouseenter="hoveredNode = node.id"
            @mouseleave="hoveredNode = null"
          >
            <div class="flex justify-center mb-2">
              <div
                :class="`relative ${getNodeSize(
                  node.level
                )} rounded-full overflow-hidden border-3 border-white ${getNodeShadow(node.level)}`"
              >
                <NuxtImg
                  :src="node.image"
                  :alt="node.name"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div
                  :class="`absolute inset-0 bg-linear-to-t ${getNodeColor(
                    node.level
                  )} opacity-0 group-hover:opacity-20 transition-opacity duration-300`"
                ></div>
              </div>
            </div>

            <div class="text-center">
              <h3 class="font-semibold text-gray-800 text-xs leading-tight mb-1">{{ node.name }}</h3>
              <p class="text-xs text-gray-600 leading-tight">{{ node.position }}</p>
            </div>

            <div
              class="absolute inset-0 bg-linear-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
          </div>
        </div>
      </div>

      <div class="flex justify-center flex-wrap gap-4">
        <div
          v-for="parent in orgData[0]?.children || []"
          :key="`group-${parent.id}`"
          class="flex flex-wrap justify-center gap-3"
        >
          <div
            v-for="node in parent.children || []"
            :key="node.id"
            ref="cardRefs[node.id] = $el"
            class="relative group"
            :class="{
              'opacity-0 scale-75 translate-y-4': !visibleNodes.has(node.id),
              'opacity-100 scale-100 translate-y-0': visibleNodes.has(node.id),
            }"
            style="transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
          >
            <div
              class="relative bg-white/90 backdrop-blur-sm border-2 border-white/50 rounded-lg p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              @mouseenter="hoveredNode = node.id"
              @mouseleave="hoveredNode = null"
            >
              <div class="flex justify-center mb-1">
                <div
                  :class="`relative ${getNodeSize(
                    node.level
                  )} rounded-full overflow-hidden border-2 border-white ${getNodeShadow(node.level)}`"
                >
                  <NuxtImg
                    :src="node.image"
                    :alt="node.name"
                    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div
                    :class="`absolute inset-0 bg-linear-to-t ${getNodeColor(
                      node.level
                    )} opacity-0 group-hover:opacity-20 transition-opacity duration-300`"
                  ></div>
                </div>
              </div>

              <div class="text-center">
                <h3 class="font-medium text-gray-800 text-xs leading-tight mb-0.5">{{ node.name }}</h3>
                <p class="text-xs text-gray-600 leading-tight">{{ node.position }}</p>
              </div>

              <div
                class="absolute inset-0 bg-linear-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shadow-3xl {
  box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
}

@keyframes fade-in {
  from {
    opacity: 0;
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
  }
  to {
    opacity: 0.7;
    stroke-dasharray: 1000;
    stroke-dashoffset: 0;
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}
</style>
