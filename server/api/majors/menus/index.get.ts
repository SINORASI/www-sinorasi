import type { MajorName } from '~/models/MajorName';

export interface MenuItem {
  title: string;
  submenu: {
    title: string;
    desc: string;
    icon: string;
  }[];
}

// Mock data - same as data.ts
const majorMenus: Record<MajorName, MenuItem[]> = {
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

export default defineEventHandler(async (event) => {
  return majorMenus;
});
