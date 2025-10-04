import type { MajorName } from "../models/MajorName";
import type { MajorData } from "../models/MajorData";
import type { Staff } from "../models/Staff";
import type { News } from "../models/News";
import type { Event } from "../models/Event";
import type { JobTitle } from "~/models/JobTitle";

export interface MenuItem {
  title: string;
  submenu: {
    title: string;
    desc: string;
    icon: string;
  }[];
}

export const majorDatas: Record<MajorName, MajorData> = {
  rpl: {
    logo: "/images/majorIcon/rpl.webp",
    short: "RPL",
    nameMajor: "Rekayasa Perangkat Lunak",
    headerColor: "bg-orange-600/30 backdrop-blur-2xl border-b-orange-400",
    bgColor: "bg-orange-400",
    hoverBgColor: "hover:bg-orange-500",
    textColor: "text-orange-600",
    btnColor: "hover:bg-orange-500 hover:border-orange-500",
  },
  tkj: {
    logo: "/images/majorIcon/tkj.webp",
    short: "TKJ",
    nameMajor: "Teknik Komputer Jaringan",
    headerColor: "bg-yellow-600/30 backdrop-blur-2xl border-b-yellow-400",
    bgColor: "bg-yellow-400",
    hoverBgColor: "hover:bg-yellow-500",
    textColor: "text-yellow-600",
    btnColor: "hover:bg-yellow-400 hover:border-yellow-400",
  },
  dkv: {
    logo: "/images/majorIcon/dkv.webp",
    short: "DKV",
    nameMajor: "Desain Komunikasi Visual",
    headerColor: "bg-blue-600/30 backdrop-blur-2xl border-b-blue-400",
    bgColor: "bg-blue-400",
    hoverBgColor: "hover:bg-blue-500",
    textColor: "text-blue-600",
    btnColor: "hover:bg-blue-600 hover:border-blue-600",
  },
  animasi: {
    logo: "/images/majorIcon/animasi.webp",
    short: "AN",
    nameMajor: "Animasi",
    headerColor: "bg-pink-600/30 backdrop-blur-2xl border-b-pink-400",
    bgColor: "bg-pink-400",
    hoverBgColor: "hover:bg-pink-500",
    textColor: "text-pink-600",
    btnColor: "hover:bg-pink-600 hover:border-pink-600",
  },
  broadcasting: {
    logo: "/images/majorIcon/broadcasting.webp",
    short: "BC",
    nameMajor: "Broadcasting",
    headerColor: "bg-red-600/30 backdrop-blur-2xl border-b-red-400",
    bgColor: "bg-red-400",
    hoverBgColor: "hover:bg-red-500",
    textColor: "text-red-600",
    btnColor: "hover:bg-red-600 hover:border-red-600",
  },
  tei: {
    logo: "/images/majorIcon/tei.webp",
    short: "TEI",
    nameMajor: "Teknik Elektronika Industri",
    headerColor: "bg-green-600/30 backdrop-blur-2xl border-b-green-400",
    bgColor: "bg-green-600",
    hoverBgColor: "hover:bg-green-700",
    textColor: "text-green-600",
    btnColor: "hover:bg-green-600 hover:border-green-600",
  },
  mekatronika: {
    logo: "/images/majorIcon/mekatronika.webp",
    short: "TMT",
    nameMajor: "Teknik Mekatronika",
    headerColor: "bg-green-800/30 backdrop-blur-2xl border-b-green-400",
    bgColor: "bg-green-800",
    hoverBgColor: "hover:bg-green-900",
    textColor: "text-green-900",
    btnColor: "hover:bg-green-800 hover:border-green-800",
  },
  tav: {
    logo: "/images/majorIcon/tav.webp",
    short: "TAV",
    nameMajor: "Teknik Audio Video",
    headerColor: "bg-green-400/30 backdrop-blur-2xl border-b-green-400",
    bgColor: "bg-green-400",
    hoverBgColor: "hover:bg-green-500",
    textColor: "text-green-400",
    btnColor: "hover:bg-green-400 hover:border-green-400",
  },
};

export const majorMenus: Record<MajorName, MenuItem[]> = {
  rpl: [
    {
      title: "Pengenalan",
      submenu: [
        { title: "Apa itu RPL?", desc: "Pengantar jurusan Rekayasa Perangkat Lunak", icon: "lucide:info" },
        { title: "Kurikulum", desc: "Mata pelajaran dan kompetensi yang dipelajari", icon: "lucide:book" },
      ],
    },
    {
      title: "Kompetensi",
      submenu: [
        { title: "Programming", desc: "Pengembangan perangkat lunak dan aplikasi", icon: "lucide:code" },
        { title: "Database", desc: "Manajemen dan administrasi database", icon: "lucide:database" },
        { title: "Web Development", desc: "Pembuatan dan pengembangan website", icon: "lucide:globe" },
      ],
    },
    {
      title: "Fasilitas",
      submenu: [
        { title: "Lab Programming", desc: "Fasilitas praktikum programming", icon: "lucide:monitor" },
        { title: "Software Tools", desc: "Tools dan teknologi pengembangan", icon: "lucide:pyramid" },
      ],
    },
    {
      title: "Karir",
      submenu: [
        { title: "Software Engineer", desc: "Peluang karir sebagai software engineer", icon: "lucide:briefcase" },
        { title: "Web Developer", desc: "Karir di bidang web development", icon: "lucide:users" },
      ],
    },
  ],
  tkj: [
    {
      title: "Pengenalan",
      submenu: [
        { title: "Apa itu TKJ?", desc: "Pengantar jurusan Teknik Komputer Jaringan", icon: "lucide:info" },
        { title: "Kurikulum", desc: "Mata pelajaran dan kompetensi jaringan", icon: "lucide:book" },
      ],
    },
    {
      title: "Kompetensi",
      submenu: [
        { title: "Network Administration", desc: "Administrasi dan manajemen jaringan", icon: "lucide:network" },
        { title: "Cyber Security", desc: "Keamanan jaringan dan sistem", icon: "lucide:shield" },
        { title: "System Administration", desc: "Administrasi sistem komputer", icon: "lucide:server" },
      ],
    },
    {
      title: "Fasilitas",
      submenu: [
        { title: "Lab Jaringan", desc: "Fasilitas praktikum jaringan komputer", icon: "lucide:wifi" },
        { title: "Hardware Tools", desc: "Tools dan peralatan jaringan", icon: "lucide:cpu" },
      ],
    },
    {
      title: "Karir",
      submenu: [
        { title: "Network Administrator", desc: "Peluang karir sebagai admin jaringan", icon: "lucide:briefcase" },
        { title: "Cyber Security Analyst", desc: "Karir di bidang keamanan siber", icon: "lucide:users" },
      ],
    },
  ],
  dkv: [
    {
      title: "Pengenalan",
      submenu: [
        { title: "Apa itu DKV?", desc: "Pengantar jurusan Desain Komunikasi Visual", icon: "lucide:info" },
        { title: "Kurikulum", desc: "Mata pelajaran dan kompetensi desain", icon: "lucide:book" },
      ],
    },
    {
      title: "Kompetensi",
      submenu: [
        { title: "Graphic Design", desc: "Desain grafis dan visual", icon: "lucide:palette" },
        { title: "Brand Design", desc: "Desain identitas merek", icon: "lucide:tag" },
        { title: "Digital Media", desc: "Media digital dan konten visual", icon: "lucide:monitor" },
      ],
    },
    {
      title: "Fasilitas",
      submenu: [
        { title: "Studio Desain", desc: "Fasilitas studio desain grafis", icon: "lucide:pen-tool" },
        { title: "Software Design", desc: "Tools desain dan kreatif", icon: "lucide:layers" },
      ],
    },
    {
      title: "Karir",
      submenu: [
        { title: "Graphic Designer", desc: "Peluang karir sebagai desainer grafis", icon: "lucide:briefcase" },
        { title: "Brand Designer", desc: "Karir di bidang brand design", icon: "lucide:users" },
      ],
    },
  ],
  animasi: [
    {
      title: "Pengenalan",
      submenu: [
        { title: "Apa itu Animasi?", desc: "Pengantar jurusan Animasi", icon: "lucide:info" },
        { title: "Kurikulum", desc: "Mata pelajaran dan teknik animasi", icon: "lucide:book" },
      ],
    },
    {
      title: "Kompetensi",
      submenu: [
        { title: "3D Animation", desc: "Animasi tiga dimensi", icon: "lucide:cube" },
        { title: "Visual Effects", desc: "Efek visual dan CGI", icon: "lucide:sparkles" },
        { title: "Motion Graphics", desc: "Grafis bergerak dan animasi", icon: "lucide:play-circle" },
      ],
    },
    {
      title: "Fasilitas",
      submenu: [
        { title: "Studio Animasi", desc: "Fasilitas studio animasi", icon: "lucide:film" },
        { title: "Animation Software", desc: "Tools animasi dan rendering", icon: "lucide:settings" },
      ],
    },
    {
      title: "Karir",
      submenu: [
        { title: "3D Animator", desc: "Peluang karir sebagai animator 3D", icon: "lucide:briefcase" },
        { title: "VFX Artist", desc: "Karir di bidang visual effects", icon: "lucide:users" },
      ],
    },
  ],
  broadcasting: [
    {
      title: "Pengenalan",
      submenu: [
        { title: "Apa itu Broadcasting?", desc: "Pengantar jurusan Broadcasting", icon: "lucide:info" },
        { title: "Kurikulum", desc: "Mata pelajaran dan teknik broadcasting", icon: "lucide:book" },
      ],
    },
    {
      title: "Kompetensi",
      submenu: [
        { title: "Content Creation", desc: "Pembuatan konten media", icon: "lucide:video" },
        { title: "Camera Operation", desc: "Operasi kamera dan videografi", icon: "lucide:camera" },
        { title: "Media Production", desc: "Produksi media dan broadcasting", icon: "lucide:radio" },
      ],
    },
    {
      title: "Fasilitas",
      submenu: [
        { title: "Studio Broadcasting", desc: "Fasilitas studio penyiaran", icon: "lucide:tv" },
        { title: "Production Equipment", desc: "Peralatan produksi media", icon: "lucide:mic" },
      ],
    },
    {
      title: "Karir",
      submenu: [
        { title: "Content Creator", desc: "Peluang karir sebagai content creator", icon: "lucide:briefcase" },
        { title: "Camera Operator", desc: "Karir di bidang operasi kamera", icon: "lucide:users" },
      ],
    },
  ],
  tei: [
    {
      title: "Pengenalan",
      submenu: [
        { title: "Apa itu TEI?", desc: "Pengantar jurusan Teknik Elektronika Industri", icon: "lucide:info" },
        { title: "Kurikulum", desc: "Mata pelajaran dan kompetensi elektronika", icon: "lucide:book" },
      ],
    },
    {
      title: "Kompetensi",
      submenu: [
        { title: "Industrial Electronics", desc: "Elektronika industri dan kontrol", icon: "lucide:zap" },
        { title: "Instrumentation", desc: "Instrumentasi dan pengukuran", icon: "lucide:activity" },
        { title: "Process Control", desc: "Kontrol proses industri", icon: "lucide:settings-2" },
      ],
    },
    {
      title: "Fasilitas",
      submenu: [
        { title: "Lab Elektronika", desc: "Fasilitas praktikum elektronika", icon: "lucide:wrench" },
        { title: "Industrial Tools", desc: "Tools dan peralatan industri", icon: "lucide:tool" },
      ],
    },
    {
      title: "Karir",
      submenu: [
        {
          title: "Industrial Electrician",
          desc: "Peluang karir sebagai teknisi elektronika industri",
          icon: "lucide:briefcase",
        },
        { title: "Instrumentation Technician", desc: "Karir di bidang instrumentasi", icon: "lucide:users" },
      ],
    },
  ],
  mekatronika: [
    {
      title: "Pengenalan",
      submenu: [
        { title: "Apa itu Mekatronika?", desc: "Pengantar jurusan Teknik Mekatronika", icon: "lucide:info" },
        { title: "Kurikulum", desc: "Mata pelajaran dan kompetensi mekatronika", icon: "lucide:book" },
      ],
    },
    {
      title: "Kompetensi",
      submenu: [
        { title: "Robotics", desc: "Robotika dan sistem otomasi", icon: "lucide:bot" },
        { title: "PLC Programming", desc: "Program PLC dan kontrol", icon: "lucide:cpu" },
        { title: "Automation Systems", desc: "Sistem otomasi industri", icon: "lucide:conveyor-belt" },
      ],
    },
    {
      title: "Fasilitas",
      submenu: [
        { title: "Lab Mekatronika", desc: "Fasilitas praktikum mekatronika", icon: "lucide:wrench" },
        { title: "Automation Tools", desc: "Tools otomasi dan robotik", icon: "lucide:tool" },
      ],
    },
    {
      title: "Karir",
      submenu: [
        { title: "Automation Engineer", desc: "Peluang karir sebagai engineer otomasi", icon: "lucide:briefcase" },
        { title: "PLC Programmer", desc: "Karir di bidang programming PLC", icon: "lucide:users" },
      ],
    },
  ],
  tav: [
    {
      title: "Pengenalan",
      submenu: [
        { title: "Apa itu TAV?", desc: "Pengantar jurusan Teknik Audio Video", icon: "lucide:info" },
        { title: "Kurikulum", desc: "Mata pelajaran dan kompetensi audio video", icon: "lucide:book" },
      ],
    },
    {
      title: "Kompetensi",
      submenu: [
        { title: "Audio Engineering", desc: "Teknik audio dan sound system", icon: "lucide:volume-2" },
        { title: "Video Production", desc: "Produksi video dan multimedia", icon: "lucide:video" },
        { title: "Electronics", desc: "Elektronika audio video", icon: "lucide:radio" },
      ],
    },
    {
      title: "Fasilitas",
      submenu: [
        { title: "Studio Audio Video", desc: "Fasilitas studio audio video", icon: "lucide:music" },
        { title: "AV Equipment", desc: "Peralatan audio video", icon: "lucide:speaker" },
      ],
    },
    {
      title: "Karir",
      submenu: [
        { title: "Audio Engineer", desc: "Peluang karir sebagai engineer audio", icon: "lucide:briefcase" },
        { title: "Sound Technician", desc: "Karir di bidang teknisi suara", icon: "lucide:users" },
      ],
    },
  ],
};

export const JobTitles: Record<MajorName, JobTitle[]> = {
  rpl: [
    {
      id: "1",
      image: "/images/logo.webp",
      title: "Software Engineer",
      description: "lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti",
    },
    {
      id: "2",
      image: "/images/logo.webp",
      title: "Web Developer",
      description: "lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti",
    },
    {
      id: "3",
      image: "/images/logo.webp",
      title: "Frontend Developer",
      description: "lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti",
    },
  ],
  tkj: [
    {
      id: "1",
      image: "/images/logo.webp",
      title: "System Administrator",
      description: "lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti",
    },
    {
      id: "2",
      image: "/images/logo.webp",
      title: "Network Administrator",
      description: "lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti",
    },
    {
      id: "3",
      image: "/images/logo.webp",
      title: "Cyber Security Analyst",
      description: "lorem ipsum dolo    r sit amet liraz vira noedn edjd ask to vom ti",
    },
  ],
  dkv: [
    {
      id: "1",
      image: "/images/logo.webp",
      title: "Graphic Designer",
      description: "lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti",
    },
    {
      id: "2",
      image: "/images/logo.webp",
      title: "Brand Designer",
      description: "lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti",
    },
    {
      id: "3",
      image: "/images/logo.webp",
      title: "Advertising Creative",
      description: "lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti",
    },
  ],
  animasi: [
    {
      id: "1",
      image: "/images/logo.webp",
      title: "3D Animator",
      description: "lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti",
    },
    {
      id: "2",
      image: "/images/logo.webp",
      title: "Visual Effects Artist",
      description: "lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti",
    },
    {
      id: "3",
      image: "/images/logo.webp",
      title: "Motion Graphics Designer",
      description: "lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti",
    },
  ],
  broadcasting: [
    {
      id: "1",
      image: "/images/logo.webp",
      title: "Production Assistant",
      description: "lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti",
    },
    {
      id: "2",
      image: "/images/logo.webp",
      title: "Content Creator",
      description: "lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti",
    },
    {
      id: "3",
      image: "/images/logo.webp",
      title: "Camera Operator",
      description: "lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti",
    },
  ],
  tei: [
    {
      id: "1",
      image: "/images/logo.webp",
      title: "Industrial Electrician",
      description: "lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti",
    },
    {
      id: "2",
      image: "/images/logo.webp",
      title: "Instrumentation Technician",
      description: "lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti",
    },
    {
      id: "3",
      image: "/images/logo.webp",
      title: "Process Control Operator",
      description: "lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti",
    },
  ],
  mekatronika: [
    {
      id: "1",
      image: "/images/logo.webp",
      title: "Operator Robotik",
      description: "lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti",
    },
    {
      id: "2",
      image: "/images/logo.webp",
      title: "PLC Programmer",
      description: "lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti",
    },
    {
      id: "3",
      image: "/images/logo.webp",
      title: "Automation Engineer",
      description: "lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti",
    },
  ],
  tav: [
    {
      id: "1",
      image: "/images/logo.webp",
      title: "Audio Engineer",
      description: "lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti",
    },
    {
      id: "2",
      image: "/images/logo.webp",
      title: "Sound System Technician",
      description: "lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti",
    },
    {
      id: "3",
      image: "/images/logo.webp",
      title: "Electronics Repair Specialist",
      description: "lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti",
    },
  ],
};

export const staffData = {
  kepsek: [
    { image: "/images/placeholder.jpg", name: "Sumijah S.Pd, M.Si", position: "Kepala Sekolah" },
    { image: "/images/placeholder.jpg", name: "Sumijah S.Pd, M.Si", position: "Kepala Sekolah" },
  ] as Staff[],
  wakasek: [
    { image: "/images/placeholder.jpg", name: "Sumijah S.Pd, M.Si", position: "Wakil Kepala Sekolah" },
    { image: "/images/placeholder.jpg", name: "Sumijah S.Pd, M.Si", position: "Wakil Kepala Sekolah" },
    { image: "/images/placeholder.jpg", name: "Sumijah S.Pd, M.Si", position: "Wakil Kepala Sekolah" },
    { image: "/images/placeholder.jpg", name: "Sumijah S.Pd, M.Si", position: "Wakil Kepala Sekolah" },
  ] as Staff[],
  kurikulum: [
    { image: "/images/placeholder.jpg", name: "Sumijah S.Pd, M.Si", position: "Kurikulum" },
    { image: "/images/placeholder.jpg", name: "Sumijah S.Pd, M.Si", position: "Kurikulum" },
    { image: "/images/placeholder.jpg", name: "Sumijah S.Pd, M.Si", position: "Kurikulum" },
    { image: "/images/placeholder.jpg", name: "Sumijah S.Pd, M.Si", position: "Kurikulum" },
  ] as Staff[],
  kesiswaan: [
    { image: "/images/placeholder.jpg", name: "Sumijah S.Pd, M.Si", position: "Kesiswaan" },
    { image: "/images/placeholder.jpg", name: "Sumijah S.Pd, M.Si", position: "Kesiswaan" },
    { image: "/images/placeholder.jpg", name: "Sumijah S.Pd, M.Si", position: "Kesiswaan" },
    { image: "/images/placeholder.jpg", name: "Sumijah S.Pd, M.Si", position: "Kesiswaan" },
    { image: "/images/placeholder.jpg", name: "Sumijah S.Pd, M.Si", position: "Kesiswaan" },
    { image: "/images/placeholder.jpg", name: "Sumijah S.Pd, M.Si", position: "Kesiswaan" },
  ] as Staff[],
  sapras: [
    { image: "/images/placeholder.jpg", name: "Sumijah S.Pd, M.Si", position: "Sapras" },
    { image: "/images/placeholder.jpg", name: "Sumijah S.Pd, M.Si", position: "Sapras" },
    { image: "/images/placeholder.jpg", name: "Sumijah S.Pd, M.Si", position: "Sapras" },
  ] as Staff[],
  humas: [
    { image: "/images/placeholder.jpg", name: "Sumijah S.Pd, M.Si", position: "Humas" },
    { image: "/images/placeholder.jpg", name: "Sumijah S.Pd, M.Si", position: "Humas" },
    { image: "/images/placeholder.jpg", name: "Sumijah S.Pd, M.Si", position: "Humas" },
    { image: "/images/placeholder.jpg", name: "Sumijah S.Pd, M.Si", position: "Humas" },
    { image: "/images/placeholder.jpg", name: "Sumijah S.Pd, M.Si", position: "Humas" },
  ] as Staff[],
};

export const newsData: News[] = [
  {
    id: "1",
    slug: "peluncuran-program-tahun-ajaran-baru",
    title: "Peluncuran Program Tahun Ajaran Baru 2024/2025",
    subtitle: "Sekolah SMKN 1 Sinorasi meluncurkan berbagai program inovatif untuk tahun ajaran baru",
    thumbnail: "/images/placeholder.jpg",
    tags: ["Pengumuman", "Program Baru", "Tahun Ajaran"],
    content: `# Peluncuran Program Tahun Ajaran Baru 2024/2025

## Pengenalan Program

Sekolah SMKN 1 Sinorasi dengan bangga meluncurkan berbagai program inovatif untuk tahun ajaran 2024/2025. Program ini dirancang untuk meningkatkan kualitas pendidikan dan mempersiapkan siswa menghadapi tantangan masa depan.

## Program Unggulan

### 1. Program Digital Skills
- Pelatihan coding dan programming
- Kursus desain grafis dan multimedia
- Workshop kecerdasan buatan

### 2. Program Kewirausahaan
- Inkubasi bisnis siswa
- Kerjasama dengan industri
- Program magang terstruktur

### 3. Program Pengembangan Karakter
- Kegiatan ekstrakurikuler
- Program kepemimpinan siswa
- Pendidikan karakter berbasis nilai

## Manfaat Bagi Siswa

Program ini memberikan manfaat yang signifikan bagi pengembangan siswa, termasuk:

- Keterampilan teknis yang relevan dengan industri
- Pengalaman praktis melalui program magang
- Pengembangan soft skills dan kepemimpinan

## Kesimpulan

Dengan program ini, SMKN 1 Sinorasi berkomitmen untuk terus berinovasi dan memberikan pendidikan berkualitas tinggi bagi seluruh siswa.`,
    publishedAt: "2024-07-01",
    author: "Tim Humas SMKN 1 Sinorasi",
  },
  {
    id: "2",
    slug: "prestasi-siswa-dalam-lomba-robotik",
    title: "Prestasi Gemilang Siswa dalam Lomba Robotik Nasional",
    subtitle: "Tim robotik SMKN 1 Sinorasi berhasil meraih juara dalam kompetisi robotik tingkat nasional",
    thumbnail: "/images/placeholder.jpg",
    tags: ["Prestasi", "Robotik", "Kompetisi"],
    content: `# Prestasi Gemilang dalam Lomba Robotik Nasional

## Latar Belakang

Tim robotik SMKN 1 Sinorasi telah menorehkan prestasi membanggakan dalam ajang kompetisi robotik nasional yang diselenggarakan di Jakarta.

## Perjalanan Kompetisi

### Persiapan Intensif
Tim telah menjalani persiapan selama 6 bulan dengan bimbingan guru dan mentor dari industri.

### Tantangan Teknis
- Desain robot yang inovatif
- Programming yang efisien
- Troubleshooting real-time

## Hasil yang Dicapai

Tim berhasil meraih:
- Juara 1 kategori Robot Sumo
- Juara 2 kategori Line Follower
- Juara 3 kategori Maze Solver

## Pengakuan dan Penghargaan

Prestasi ini mendapat pengakuan dari:
- Kementerian Pendidikan dan Kebudayaan
- Asosiasi Robotik Indonesia
- Industri teknologi nasional

## Dampak Bagi Sekolah

Keberhasilan ini meningkatkan reputasi SMKN 1 Sinorasi sebagai sekolah unggulan dalam bidang teknologi dan inovasi.`,
    publishedAt: "2024-06-15",
    author: "Tim Humas SMKN 1 Sinorasi",
  },
  {
    id: "3",
    slug: "kerjasama-dengan-perusahaan-teknologi",
    title: "Kerjasama Strategis dengan Perusahaan Teknologi Terdepan",
    subtitle: "SMKN 1 Sinorasi menjalin kerjasama dengan perusahaan teknologi untuk program magang siswa",
    thumbnail: "/images/placeholder.jpg",
    tags: ["Kerjasama", "Industri", "Magang"],
    content: `# Kerjasama Strategis dengan Perusahaan Teknologi

## Pengantar Kerjasama

SMKN 1 Sinorasi telah menandatangani Memorandum of Understanding (MoU) dengan beberapa perusahaan teknologi terdepan di Indonesia.

## Mitra Kerjasama

### Perusahaan Teknologi A
- Spesialisasi: Software Development
- Program: Magang programming dan development

### Perusahaan Teknologi B
- Spesialisasi: Data Science dan AI
- Program: Training machine learning

### Perusahaan Teknologi C
- Spesialisasi: Cybersecurity
- Program: Workshop keamanan jaringan

## Manfaat Kerjasama

### Bagi Siswa
- Pengalaman kerja langsung di industri
- Sertifikasi kompetensi
- Kesempatan karir setelah lulus

### Bagi Sekolah
- Kurikulum yang up-to-date
- Fasilitas modern dari mitra
- Pengembangan kompetensi guru

### Bagi Industri
- Talenta siap pakai
- Kontribusi pada pendidikan vokasi
- Program Corporate Social Responsibility

## Implementasi Program

Program kerjasama akan dimulai pada semester ganjil tahun ajaran 2024/2025 dengan melibatkan siswa kelas XI dan XII.`,
    publishedAt: "2024-05-20",
    author: "Tim Humas SMKN 1 Sinorasi",
  },
  {
    id: "4",
    slug: "dkerjasama-dengan-perusahaan-teknologi",
    title: "Kerjasama Strategis dengan Perusahaan Teknologi Terdepan",
    subtitle: "SMKN 1 Sinorasi menjalin kerjasama dengan perusahaan teknologi untuk program magang siswa",
    thumbnail: "/images/placeholder.jpg",
    tags: ["Kerjasama", "Industri", "Magang"],
    content: `# Kerjasama Strategis dengan Perusahaan Teknologi

## Pengantar Kerjasama

SMKN 1 Sinorasi telah menandatangani Memorandum of Understanding (MoU) dengan beberapa perusahaan teknologi terdepan di Indonesia.

## Mitra Kerjasama

### Perusahaan Teknologi A
- Spesialisasi: Software Development
- Program: Magang programming dan development

### Perusahaan Teknologi B
- Spesialisasi: Data Science dan AI
- Program: Training machine learning

### Perusahaan Teknologi C
- Spesialisasi: Cybersecurity
- Program: Workshop keamanan jaringan

## Manfaat Kerjasama

### Bagi Siswa
- Pengalaman kerja langsung di industri
- Sertifikasi kompetensi
- Kesempatan karir setelah lulus

### Bagi Sekolah
- Kurikulum yang up-to-date
- Fasilitas modern dari mitra
- Pengembangan kompetensi guru

### Bagi Industri
- Talenta siap pakai
- Kontribusi pada pendidikan vokasi
- Program Corporate Social Responsibility

## Implementasi Program

Program kerjasama akan dimulai pada semester ganjil tahun ajaran 2024/2025 dengan melibatkan siswa kelas XI dan XII.`,
    publishedAt: "2024-05-20",
    author: "Tim Humas SMKN 1 Sinorasi",
  },
  {
    id: "5",
    slug: "ddkerjasama-dengan-perusahaan-teknologi",
    title: "Kerjasama Strategis dengan Perusahaan Teknologi Terdepan",
    subtitle: "SMKN 1 Sinorasi menjalin kerjasama dengan perusahaan teknologi untuk program magang siswa",
    thumbnail: "/images/placeholder.jpg",
    tags: ["Kerjasama", "Industri", "Magang"],
    content: `# Kerjasama Strategis dengan Perusahaan Teknologi

## Pengantar Kerjasama

SMKN 1 Sinorasi telah menandatangani Memorandum of Understanding (MoU) dengan beberapa perusahaan teknologi terdepan di Indonesia.

## Mitra Kerjasama

### Perusahaan Teknologi A
- Spesialisasi: Software Development
- Program: Magang programming dan development

### Perusahaan Teknologi B
- Spesialisasi: Data Science dan AI
- Program: Training machine learning

### Perusahaan Teknologi C
- Spesialisasi: Cybersecurity
- Program: Workshop keamanan jaringan

## Manfaat Kerjasama

### Bagi Siswa
- Pengalaman kerja langsung di industri
- Sertifikasi kompetensi
- Kesempatan karir setelah lulus

### Bagi Sekolah
- Kurikulum yang up-to-date
- Fasilitas modern dari mitra
- Pengembangan kompetensi guru

### Bagi Industri
- Talenta siap pakai
- Kontribusi pada pendidikan vokasi
- Program Corporate Social Responsibility

## Implementasi Program

Program kerjasama akan dimulai pada semester ganjil tahun ajaran 2024/2025 dengan melibatkan siswa kelas XI dan XII.`,
    publishedAt: "2024-05-20",
    author: "Tim Humas SMKN 1 Sinorasi",
  },
  {
    id: "6",
    slug: "dddkerjasama-dengan-perusahaan-teknologi",
    title: "Kerjasama Strategis dengan Perusahaan Teknologi Terdepan",
    subtitle: "SMKN 1 Sinorasi menjalin kerjasama dengan perusahaan teknologi untuk program magang siswa",
    thumbnail: "/images/placeholder.jpg",
    tags: ["Kerjasama", "Industri", "Magang"],
    content: `# Kerjasama Strategis dengan Perusahaan Teknologi

## Pengantar Kerjasama

SMKN 1 Sinorasi telah menandatangani Memorandum of Understanding (MoU) dengan beberapa perusahaan teknologi terdepan di Indonesia.

## Mitra Kerjasama

### Perusahaan Teknologi A
- Spesialisasi: Software Development
- Program: Magang programming dan development

### Perusahaan Teknologi B
- Spesialisasi: Data Science dan AI
- Program: Training machine learning

### Perusahaan Teknologi C
- Spesialisasi: Cybersecurity
- Program: Workshop keamanan jaringan

## Manfaat Kerjasama

### Bagi Siswa
- Pengalaman kerja langsung di industri
- Sertifikasi kompetensi
- Kesempatan karir setelah lulus

### Bagi Sekolah
- Kurikulum yang up-to-date
- Fasilitas modern dari mitra
- Pengembangan kompetensi guru

### Bagi Industri
- Talenta siap pakai
- Kontribusi pada pendidikan vokasi
- Program Corporate Social Responsibility

## Implementasi Program

Program kerjasama akan dimulai pada semester ganjil tahun ajaran 2024/2025 dengan melibatkan siswa kelas XI dan XII.`,
    publishedAt: "2024-05-20",
    author: "Tim Humas SMKN 1 Sinorasi",
  },
  {
    id: "4",
    slug: "dkerjasama-dengan-perusahaan-teknologi",
    title: "Kerjasama Strategis dengan Perusahaan Teknologi Terdepan",
    subtitle: "SMKN 1 Sinorasi menjalin kerjasama dengan perusahaan teknologi untuk program magang siswa",
    thumbnail: "/images/placeholder.jpg",
    tags: ["Kerjasama", "Industri", "Magang"],
    content: `# Kerjasama Strategis dengan Perusahaan Teknologi

## Pengantar Kerjasama

SMKN 1 Sinorasi telah menandatangani Memorandum of Understanding (MoU) dengan beberapa perusahaan teknologi terdepan di Indonesia.

## Mitra Kerjasama

### Perusahaan Teknologi A
- Spesialisasi: Software Development
- Program: Magang programming dan development

### Perusahaan Teknologi B
- Spesialisasi: Data Science dan AI
- Program: Training machine learning

### Perusahaan Teknologi C
- Spesialisasi: Cybersecurity
- Program: Workshop keamanan jaringan

## Manfaat Kerjasama

### Bagi Siswa
- Pengalaman kerja langsung di industri
- Sertifikasi kompetensi
- Kesempatan karir setelah lulus

### Bagi Sekolah
- Kurikulum yang up-to-date
- Fasilitas modern dari mitra
- Pengembangan kompetensi guru

### Bagi Industri
- Talenta siap pakai
- Kontribusi pada pendidikan vokasi
- Program Corporate Social Responsibility

## Implementasi Program

Program kerjasama akan dimulai pada semester ganjil tahun ajaran 2024/2025 dengan melibatkan siswa kelas XI dan XII.`,
    publishedAt: "2024-05-20",
    author: "Tim Humas SMKN 1 Sinorasi",
  },
  {
    id: "4",
    slug: "dkerjasama-dengan-perusahaan-teknologi",
    title: "Kerjasama Strategis dengan Perusahaan Teknologi Terdepan",
    subtitle: "SMKN 1 Sinorasi menjalin kerjasama dengan perusahaan teknologi untuk program magang siswa",
    thumbnail: "/images/placeholder.jpg",
    tags: ["Kerjasama", "Industri", "Magang"],
    content: `# Kerjasama Strategis dengan Perusahaan Teknologi

## Pengantar Kerjasama

SMKN 1 Sinorasi telah menandatangani Memorandum of Understanding (MoU) dengan beberapa perusahaan teknologi terdepan di Indonesia.

## Mitra Kerjasama

### Perusahaan Teknologi A
- Spesialisasi: Software Development
- Program: Magang programming dan development

### Perusahaan Teknologi B
- Spesialisasi: Data Science dan AI
- Program: Training machine learning

### Perusahaan Teknologi C
- Spesialisasi: Cybersecurity
- Program: Workshop keamanan jaringan

## Manfaat Kerjasama

### Bagi Siswa
- Pengalaman kerja langsung di industri
- Sertifikasi kompetensi
- Kesempatan karir setelah lulus

### Bagi Sekolah
- Kurikulum yang up-to-date
- Fasilitas modern dari mitra
- Pengembangan kompetensi guru

### Bagi Industri
- Talenta siap pakai
- Kontribusi pada pendidikan vokasi
- Program Corporate Social Responsibility

## Implementasi Program

Program kerjasama akan dimulai pada semester ganjil tahun ajaran 2024/2025 dengan melibatkan siswa kelas XI dan XII.`,
    publishedAt: "2024-05-20",
    author: "Tim Humas SMKN 1 Sinorasi",
  },
  {
    id: "4",
    slug: "dkerjasama-dengan-perusahaan-teknologi",
    title: "Kerjasama Strategis dengan Perusahaan Teknologi Terdepan",
    subtitle: "SMKN 1 Sinorasi menjalin kerjasama dengan perusahaan teknologi untuk program magang siswa",
    thumbnail: "/images/placeholder.jpg",
    tags: ["Kerjasama", "Industri", "Magang"],
    content: `# Kerjasama Strategis dengan Perusahaan Teknologi

## Pengantar Kerjasama

SMKN 1 Sinorasi telah menandatangani Memorandum of Understanding (MoU) dengan beberapa perusahaan teknologi terdepan di Indonesia.

## Mitra Kerjasama

### Perusahaan Teknologi A
- Spesialisasi: Software Development
- Program: Magang programming dan development

### Perusahaan Teknologi B
- Spesialisasi: Data Science dan AI
- Program: Training machine learning

### Perusahaan Teknologi C
- Spesialisasi: Cybersecurity
- Program: Workshop keamanan jaringan

## Manfaat Kerjasama

### Bagi Siswa
- Pengalaman kerja langsung di industri
- Sertifikasi kompetensi
- Kesempatan karir setelah lulus

### Bagi Sekolah
- Kurikulum yang up-to-date
- Fasilitas modern dari mitra
- Pengembangan kompetensi guru

### Bagi Industri
- Talenta siap pakai
- Kontribusi pada pendidikan vokasi
- Program Corporate Social Responsibility

## Implementasi Program

Program kerjasama akan dimulai pada semester ganjil tahun ajaran 2024/2025 dengan melibatkan siswa kelas XI dan XII.`,
    publishedAt: "2024-05-20",
    author: "Tim Humas SMKN 1 Sinorasi",
  },
  {
    id: "10",
    slug: "dummy-news-1",
    title: "Dummy News 1",
    subtitle: "This is a dummy news item for testing",
    thumbnail: "/images/placeholder.jpg",
    tags: ["Dummy"],
    content: "# Dummy News 1\n\nThis is dummy content.",
    publishedAt: "2024-01-01",
    author: "Dummy Author",
  },
  {
    id: "11",
    slug: "dummy-news-2",
    title: "Dummy News 2",
    subtitle: "This is another dummy news item",
    thumbnail: "/images/placeholder.jpg",
    tags: ["Dummy"],
    content: "# Dummy News 2\n\nThis is dummy content.",
    publishedAt: "2024-01-01",
    author: "Dummy Author",
  },
  {
    id: "12",
    slug: "dummy-news-3",
    title: "Dummy News 3",
    subtitle: "Yet another dummy news item",
    thumbnail: "/images/placeholder.jpg",
    tags: ["Dummy"],
    content: "# Dummy News 3\n\nThis is dummy content.",
    publishedAt: "2024-01-01",
    author: "Dummy Author",
  },
];

export const eventData: Event[] = [
 {
   id: "1",
   slug: "tanggal-dan-bulan",
   title: "INI ADALAH NAMA EVENT / JUDUL EVENT",
   details: "Hari, Jam • Tempat / Lokasi",
   date: "Tanggal & Bulan",
   imageUrl: "/images/placeholder.jpg",
   content: `# INI ADALAH NAMA EVENT / JUDUL EVENT

## Detail Event

Hari, Jam • Tempat / Lokasi

### Deskripsi
Ini adalah deskripsi lengkap dari event ini. Event ini akan diadakan di lokasi yang telah ditentukan dengan tujuan untuk meningkatkan keterampilan siswa.

### Agenda
- Pembukaan
- Sesi utama
- Penutupan

### Kontak
Untuk informasi lebih lanjut, hubungi panitia event.`,
   publishedAt: "2024-09-01",
   author: "Tim Event SMKN 1 Sinorasi",
 },
 {
   id: "2",
   slug: "community-tech-meetup",
   title: "Community Tech Meetup",
   details: "Sabtu, 14:00 • Gedung Inovasi / Lt. 3",
   date: "30 September",
   imageUrl: "/images/placeholder.jpg",
   content: `# Community Tech Meetup

## Detail Event

Sabtu, 14:00 • Gedung Inovasi / Lt. 3

### Deskripsi
Community Tech Meetup adalah acara pertemuan komunitas teknologi yang diadakan oleh SMKN 1 Sinorasi. Acara ini bertujuan untuk berbagi pengetahuan dan pengalaman di bidang teknologi.

### Agenda
- Registrasi peserta
- Pembukaan oleh MC
- Sharing session dari pembicara
- Networking session
- Penutupan dan doorprize

### Pembicara
- Teknisi Senior dari Industri
- Guru SMKN 1 Sinorasi
- Mahasiswa Teknik

### Kontak
Email: event@smkn1sinorasi.sch.id`,
   publishedAt: "2024-09-15",
   author: "Tim Event SMKN 1 Sinorasi",
 },
 {
   id: "3",
   slug: "vue-js-workshop-the-next-level",
   title: "Vue.js Workshop: The Next Level",
   details: "Minggu, 09:00 • Ruang Seminar / Blok A",
   date: "15 Oktober",
   imageUrl: "/images/placeholder.jpg",
   content: `# Vue.js Workshop: The Next Level

## Detail Event

Minggu, 09:00 • Ruang Seminar / Blok A

### Deskripsi
Workshop Vue.js lanjutan yang akan membahas teknik-teknik advanced dalam pengembangan aplikasi web menggunakan Vue.js. Cocok untuk siswa yang sudah memiliki pengetahuan dasar Vue.js.

### Agenda
- Review konsep dasar Vue.js
- Composition API
- State management dengan Pinia
- Testing Vue components
- Deployment dan optimasi

### Persyaratan
- Pengetahuan dasar Vue.js
- Laptop dengan Node.js terinstall
- Akun GitHub

### Instruktur
Tim Developer dari Jurusan RPL SMKN 1 Sinorasi

### Kontak
WhatsApp: +62 812-3456-7890`,
   publishedAt: "2024-09-20",
   author: "Tim Event SMKN 1 Sinorasi",
 },
];
