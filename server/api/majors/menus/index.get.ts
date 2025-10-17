import type { MajorName } from '~/models/MajorName';

export interface MenuItem {
  title: string;
  submenu: {
    title: string;
    desc: string;
    icon: string;
    to?: string;
    external?: boolean;
    tags?: string[];
  }[];
}

// Mock data - same as data.ts
const majorMenus: Record<MajorName, MenuItem[]> = {
  rpl: [
    {
      title: "Pengenalan",
      submenu: [
        { 
          title: "Apa itu RPL?", 
          desc: "Pengantar jurusan Rekayasa Perangkat Lunak", 
          icon: "lucide:info",
          to: "/jurusan/rpl#tentang-jurusan",
          external: false,
          tags: ["rpl", "pengenalan", "tentang", "intro", "rekayasa", "perangkat", "lunak"]
        },
        { 
          title: "Kurikulum", 
          desc: "Mata pelajaran dan kompetensi yang dipelajari", 
          icon: "lucide:book",
          to: "/jurusan/rpl#materi-pembelajaran",
          external: false,
          tags: ["kurikulum", "mata pelajaran", "pembelajaran", "materi", "program"]
        },
      ],
    },
    {
      title: "Kompetensi",
      submenu: [
        { 
          title: "Programming", 
          desc: "Pengembangan perangkat lunak dan aplikasi", 
          icon: "lucide:code",
          to: "/jurusan/rpl#materi-pembelajaran",
          external: false,
          tags: ["programming", "coding", "aplikasi", "software", "development"]
        },
        { 
          title: "Database", 
          desc: "Manajemen dan administrasi database", 
          icon: "lucide:database",
          to: "/jurusan/rpl#materi-pembelajaran",
          external: false,
          tags: ["database", "sql", "data", "manajemen"]
        },
        { 
          title: "Web Development", 
          desc: "Pembuatan dan pengembangan website", 
          icon: "lucide:globe",
          to: "/jurusan/rpl#materi-pembelajaran",
          external: false,
          tags: ["web", "website", "development", "html", "css", "javascript"]
        },
      ],
    },
    {
      title: "Fasilitas",
      submenu: [
        {
          title: "Lab Programming",
          desc: "Fasilitas praktikum programming",
          icon: "lucide:monitor",
          to: "/jurusan/rpl#fasilitas",
          external: false,
          tags: ["lab", "laboratorium", "programming", "praktikum", "fasilitas"]
        },
        {
          title: "Software Tools",
          desc: "Tools dan teknologi pengembangan",
          icon: "lucide:pyramid",
          to: "/jurusan/rpl#fasilitas",
          external: false,
          tags: ["software", "tools", "teknologi", "development"]
        },
      ],
    },
    {
      title: "Karir",
      submenu: [
        { 
          title: "Software Engineer", 
          desc: "Peluang karir sebagai software engineer", 
          icon: "lucide:briefcase",
          to: "/jurusan/rpl#kesempatan-kerja",
          external: false,
          tags: ["karir", "software engineer", "pekerjaan", "kerja", "profesi"]
        },
        { 
          title: "Web Developer", 
          desc: "Karir di bidang web development", 
          icon: "lucide:users",
          to: "/jurusan/rpl#kesempatan-kerja",
          external: false,
          tags: ["karir", "web developer", "pekerjaan", "kerja", "profesi"]
        },
      ],
    },
  ],
  tkj: [
    {
      title: "Pengenalan",
      submenu: [
        { 
          title: "Apa itu TKJ?", 
          desc: "Pengantar jurusan Teknik Komputer Jaringan", 
          icon: "lucide:info",
          to: "/jurusan/tkj#tentang-jurusan",
          external: false,
          tags: ["tkj", "pengenalan", "tentang", "intro", "teknik", "komputer", "jaringan", "networking"]
        },
        { 
          title: "Kurikulum", 
          desc: "Mata pelajaran dan kompetensi jaringan", 
          icon: "lucide:book",
          to: "/jurusan/tkj#materi-pembelajaran",
          external: false,
          tags: ["kurikulum", "mata pelajaran", "pembelajaran", "materi", "program", "jaringan"]
        },
      ],
    },
    {
      title: "Kompetensi",
      submenu: [
        { 
          title: "Network Administration", 
          desc: "Administrasi dan manajemen jaringan", 
          icon: "lucide:network",
          to: "/jurusan/tkj#materi-pembelajaran",
          external: false,
          tags: ["network", "jaringan", "administrasi", "admin", "manajemen"]
        },
        { 
          title: "Cyber Security", 
          desc: "Keamanan jaringan dan sistem", 
          icon: "lucide:shield",
          to: "/jurusan/tkj#materi-pembelajaran",
          external: false,
          tags: ["cyber", "security", "keamanan", "jaringan", "sistem"]
        },
        { 
          title: "System Administration", 
          desc: "Administrasi sistem komputer", 
          icon: "lucide:server",
          to: "/jurusan/tkj#materi-pembelajaran",
          external: false,
          tags: ["system", "administrasi", "komputer", "server", "admin"]
        },
      ],
    },
    {
      title: "Fasilitas",
      submenu: [
        {
          title: "Lab Jaringan",
          desc: "Fasilitas praktikum jaringan komputer",
          icon: "lucide:wifi",
          to: "/jurusan/tkj#fasilitas",
          external: false,
          tags: ["lab", "laboratorium", "jaringan", "praktikum", "fasilitas", "komputer"]
        },
        {
          title: "Hardware Tools",
          desc: "Tools dan peralatan jaringan",
          icon: "lucide:cpu",
          to: "/jurusan/tkj#fasilitas",
          external: false,
          tags: ["hardware", "tools", "peralatan", "jaringan"]
        },
      ],
    },
    {
      title: "Karir",
      submenu: [
        { 
          title: "Network Administrator", 
          desc: "Peluang karir sebagai admin jaringan", 
          icon: "lucide:briefcase",
          to: "/jurusan/tkj#kesempatan-kerja",
          external: false,
          tags: ["karir", "network", "administrator", "admin", "jaringan", "pekerjaan", "kerja"]
        },
        { 
          title: "Cyber Security Analyst", 
          desc: "Karir di bidang keamanan siber", 
          icon: "lucide:users",
          to: "/jurusan/tkj#kesempatan-kerja",
          external: false,
          tags: ["karir", "cyber", "security", "analyst", "keamanan", "pekerjaan", "kerja"]
        },
      ],
    },
  ],
  dkv: [
    {
      title: "Pengenalan",
      submenu: [
        { 
          title: "Apa itu DKV?", 
          desc: "Pengantar jurusan Desain Komunikasi Visual", 
          icon: "lucide:info",
          to: "/jurusan/dkv#tentang-jurusan",
          external: false,
          tags: ["dkv", "pengenalan", "tentang", "intro", "desain", "komunikasi", "visual", "design"]
        },
        { 
          title: "Kurikulum", 
          desc: "Mata pelajaran dan kompetensi desain", 
          icon: "lucide:book",
          to: "/jurusan/dkv#materi-pembelajaran",
          external: false,
          tags: ["kurikulum", "mata pelajaran", "pembelajaran", "materi", "program", "desain"]
        },
      ],
    },
    {
      title: "Kompetensi",
      submenu: [
        { 
          title: "Graphic Design", 
          desc: "Desain grafis dan visual", 
          icon: "lucide:palette",
          to: "/jurusan/dkv#materi-pembelajaran",
          external: false,
          tags: ["graphic", "design", "desain", "grafis", "visual"]
        },
        { 
          title: "Brand Design", 
          desc: "Desain identitas merek", 
          icon: "lucide:tag",
          to: "/jurusan/dkv#materi-pembelajaran",
          external: false,
          tags: ["brand", "design", "desain", "merek", "identitas", "branding"]
        },
        { 
          title: "Digital Media", 
          desc: "Media digital dan konten visual", 
          icon: "lucide:monitor",
          to: "/jurusan/dkv#materi-pembelajaran",
          external: false,
          tags: ["digital", "media", "konten", "visual"]
        },
      ],
    },
    {
      title: "Fasilitas",
      submenu: [
        {
          title: "Studio Desain",
          desc: "Fasilitas studio desain grafis",
          icon: "lucide:pen-tool",
          to: "/jurusan/dkv#fasilitas",
          external: false,
          tags: ["studio", "desain", "grafis", "fasilitas", "lab"]
        },
        {
          title: "Software Design",
          desc: "Tools desain dan kreatif",
          icon: "lucide:layers",
          to: "/jurusan/dkv#fasilitas",
          external: false,
          tags: ["software", "design", "tools", "kreatif", "adobe"]
        },
      ],
    },
    {
      title: "Karir",
      submenu: [
        { 
          title: "Graphic Designer", 
          desc: "Peluang karir sebagai desainer grafis", 
          icon: "lucide:briefcase",
          to: "/jurusan/dkv#kesempatan-kerja",
          external: false,
          tags: ["karir", "graphic", "designer", "desainer", "grafis", "pekerjaan", "kerja"]
        },
        { 
          title: "Brand Designer", 
          desc: "Karir di bidang brand design", 
          icon: "lucide:users",
          to: "/jurusan/dkv#kesempatan-kerja",
          external: false,
          tags: ["karir", "brand", "designer", "desainer", "pekerjaan", "kerja"]
        },
      ],
    },
  ],
  animasi: [
    {
      title: "Pengenalan",
      submenu: [
        { 
          title: "Apa itu Animasi?", 
          desc: "Pengantar jurusan Animasi", 
          icon: "lucide:info",
          to: "/jurusan/animasi#tentang-jurusan",
          external: false,
          tags: ["animasi", "animation", "pengenalan", "tentang", "intro"]
        },
        { 
          title: "Kurikulum", 
          desc: "Mata pelajaran dan teknik animasi", 
          icon: "lucide:book",
          to: "/jurusan/animasi#materi-pembelajaran",
          external: false,
          tags: ["kurikulum", "mata pelajaran", "pembelajaran", "materi", "program", "animasi"]
        },
      ],
    },
    {
      title: "Kompetensi",
      submenu: [
        { 
          title: "3D Animation", 
          desc: "Animasi tiga dimensi", 
          icon: "lucide:cube",
          to: "/jurusan/animasi#materi-pembelajaran",
          external: false,
          tags: ["3d", "animation", "animasi", "dimensi", "modeling"]
        },
        { 
          title: "Visual Effects", 
          desc: "Efek visual dan CGI", 
          icon: "lucide:sparkles",
          to: "/jurusan/animasi#materi-pembelajaran",
          external: false,
          tags: ["visual", "effects", "vfx", "efek", "cgi"]
        },
        { 
          title: "Motion Graphics", 
          desc: "Grafis bergerak dan animasi", 
          icon: "lucide:play-circle",
          to: "/jurusan/animasi#materi-pembelajaran",
          external: false,
          tags: ["motion", "graphics", "grafis", "bergerak", "animasi"]
        },
      ],
    },
    {
      title: "Fasilitas",
      submenu: [
        {
          title: "Studio Animasi",
          desc: "Fasilitas studio animasi",
          icon: "lucide:film",
          to: "/jurusan/animasi#fasilitas",
          external: false,
          tags: ["studio", "animasi", "fasilitas", "lab"]
        },
        {
          title: "Animation Software",
          desc: "Tools animasi dan rendering",
          icon: "lucide:settings",
          to: "/jurusan/animasi#fasilitas",
          external: false,
          tags: ["animation", "software", "tools", "rendering", "blender", "maya"]
        },
      ],
    },
    {
      title: "Karir",
      submenu: [
        { 
          title: "3D Animator", 
          desc: "Peluang karir sebagai animator 3D", 
          icon: "lucide:briefcase",
          to: "/jurusan/animasi#kesempatan-kerja",
          external: false,
          tags: ["karir", "3d", "animator", "animasi", "pekerjaan", "kerja"]
        },
        { 
          title: "VFX Artist", 
          desc: "Karir di bidang visual effects", 
          icon: "lucide:users",
          to: "/jurusan/animasi#kesempatan-kerja",
          external: false,
          tags: ["karir", "vfx", "artist", "visual", "effects", "pekerjaan", "kerja"]
        },
      ],
    },
  ],
  broadcasting: [
    {
      title: "Pengenalan",
      submenu: [
        { 
          title: "Apa itu Broadcasting?", 
          desc: "Pengantar jurusan Broadcasting", 
          icon: "lucide:info",
          to: "/jurusan/broadcasting#tentang-jurusan",
          external: false,
          tags: ["broadcasting", "broadcast", "penyiaran", "pengenalan", "tentang", "intro"]
        },
        { 
          title: "Kurikulum", 
          desc: "Mata pelajaran dan teknik broadcasting", 
          icon: "lucide:book",
          to: "/jurusan/broadcasting#materi-pembelajaran",
          external: false,
          tags: ["kurikulum", "mata pelajaran", "pembelajaran", "materi", "program", "broadcasting"]
        },
      ],
    },
    {
      title: "Kompetensi",
      submenu: [
        { 
          title: "Content Creation", 
          desc: "Pembuatan konten media", 
          icon: "lucide:video",
          to: "/jurusan/broadcasting#materi-pembelajaran",
          external: false,
          tags: ["content", "creation", "konten", "media", "creator"]
        },
        { 
          title: "Camera Operation", 
          desc: "Operasi kamera dan videografi", 
          icon: "lucide:camera",
          to: "/jurusan/broadcasting#materi-pembelajaran",
          external: false,
          tags: ["camera", "kamera", "operation", "operasi", "videografi", "video"]
        },
        { 
          title: "Media Production", 
          desc: "Produksi media dan broadcasting", 
          icon: "lucide:radio",
          to: "/jurusan/broadcasting#materi-pembelajaran",
          external: false,
          tags: ["media", "production", "produksi", "broadcasting", "penyiaran"]
        },
      ],
    },
    {
      title: "Fasilitas",
      submenu: [
        {
          title: "Studio Broadcasting",
          desc: "Fasilitas studio penyiaran",
          icon: "lucide:tv",
          to: "/jurusan/broadcasting#fasilitas",
          external: false,
          tags: ["studio", "broadcasting", "penyiaran", "fasilitas", "lab"]
        },
        {
          title: "Production Equipment",
          desc: "Peralatan produksi media",
          icon: "lucide:mic",
          to: "/jurusan/broadcasting#fasilitas",
          external: false,
          tags: ["production", "equipment", "peralatan", "produksi", "media"]
        },
      ],
    },
    {
      title: "Karir",
      submenu: [
        { 
          title: "Content Creator", 
          desc: "Peluang karir sebagai content creator", 
          icon: "lucide:briefcase",
          to: "/jurusan/broadcasting#kesempatan-kerja",
          external: false,
          tags: ["karir", "content", "creator", "konten", "pekerjaan", "kerja"]
        },
        { 
          title: "Camera Operator", 
          desc: "Karir di bidang operasi kamera", 
          icon: "lucide:users",
          to: "/jurusan/broadcasting#kesempatan-kerja",
          external: false,
          tags: ["karir", "camera", "operator", "kamera", "pekerjaan", "kerja"]
        },
      ],
    },
  ],
  tei: [
    {
      title: "Pengenalan",
      submenu: [
        { 
          title: "Apa itu TEI?", 
          desc: "Pengantar jurusan Teknik Elektronika Industri", 
          icon: "lucide:info",
          to: "/jurusan/tei#tentang-jurusan",
          external: false,
          tags: ["tei", "pengenalan", "tentang", "intro", "teknik", "elektronika", "industri", "elektronik"]
        },
        { 
          title: "Kurikulum", 
          desc: "Mata pelajaran dan kompetensi elektronika", 
          icon: "lucide:book",
          to: "/jurusan/tei#materi-pembelajaran",
          external: false,
          tags: ["kurikulum", "mata pelajaran", "pembelajaran", "materi", "program", "elektronika"]
        },
      ],
    },
    {
      title: "Kompetensi",
      submenu: [
        { 
          title: "Industrial Electronics", 
          desc: "Elektronika industri dan kontrol", 
          icon: "lucide:zap",
          to: "/jurusan/tei#materi-pembelajaran",
          external: false,
          tags: ["industrial", "electronics", "elektronika", "industri", "kontrol"]
        },
        { 
          title: "Instrumentation", 
          desc: "Instrumentasi dan pengukuran", 
          icon: "lucide:activity",
          to: "/jurusan/tei#materi-pembelajaran",
          external: false,
          tags: ["instrumentation", "instrumentasi", "pengukuran", "sensor"]
        },
        { 
          title: "Process Control", 
          desc: "Kontrol proses industri", 
          icon: "lucide:settings-2",
          to: "/jurusan/tei#materi-pembelajaran",
          external: false,
          tags: ["process", "control", "kontrol", "proses", "industri"]
        },
      ],
    },
    {
      title: "Fasilitas",
      submenu: [
        {
          title: "Lab Elektronika",
          desc: "Fasilitas praktikum elektronika",
          icon: "lucide:wrench",
          to: "/jurusan/tei#fasilitas",
          external: false,
          tags: ["lab", "laboratorium", "elektronika", "praktikum", "fasilitas"]
        },
        {
          title: "Industrial Tools",
          desc: "Tools dan peralatan industri",
          icon: "lucide:tool",
          to: "/jurusan/tei#fasilitas",
          external: false,
          tags: ["industrial", "tools", "peralatan", "industri"]
        },
      ],
    },
    {
      title: "Karir",
      submenu: [
        {
          title: "Industrial Electrician",
          desc: "Peluang karir sebagai teknisi elektronika industri",
          icon: "lucide:briefcase",
          to: "/jurusan/tei#kesempatan-kerja",
          external: false,
          tags: ["karir", "industrial", "electrician", "teknisi", "elektronika", "pekerjaan", "kerja"]
        },
        { 
          title: "Instrumentation Technician", 
          desc: "Karir di bidang instrumentasi", 
          icon: "lucide:users",
          to: "/jurusan/tei#kesempatan-kerja",
          external: false,
          tags: ["karir", "instrumentation", "technician", "teknisi", "instrumentasi", "pekerjaan", "kerja"]
        },
      ],
    },
  ],
  mekatronika: [
    {
      title: "Pengenalan",
      submenu: [
        { 
          title: "Apa itu Mekatronika?", 
          desc: "Pengantar jurusan Teknik Mekatronika", 
          icon: "lucide:info",
          to: "/jurusan/mekatronika#tentang-jurusan",
          external: false,
          tags: ["mekatronika", "mechatronics", "pengenalan", "tentang", "intro", "teknik"]
        },
        { 
          title: "Kurikulum", 
          desc: "Mata pelajaran dan kompetensi mekatronika", 
          icon: "lucide:book",
          to: "/jurusan/mekatronika#materi-pembelajaran",
          external: false,
          tags: ["kurikulum", "mata pelajaran", "pembelajaran", "materi", "program", "mekatronika"]
        },
      ],
    },
    {
      title: "Kompetensi",
      submenu: [
        { 
          title: "Robotics", 
          desc: "Robotika dan sistem otomasi", 
          icon: "lucide:bot",
          to: "/jurusan/mekatronika#materi-pembelajaran",
          external: false,
          tags: ["robotics", "robotika", "robot", "otomasi", "automation"]
        },
        { 
          title: "PLC Programming", 
          desc: "Program PLC dan kontrol", 
          icon: "lucide:cpu",
          to: "/jurusan/mekatronika#materi-pembelajaran",
          external: false,
          tags: ["plc", "programming", "program", "kontrol", "control"]
        },
        { 
          title: "Automation Systems", 
          desc: "Sistem otomasi industri", 
          icon: "lucide:conveyor-belt",
          to: "/jurusan/mekatronika#materi-pembelajaran",
          external: false,
          tags: ["automation", "systems", "otomasi", "sistem", "industri"]
        },
      ],
    },
    {
      title: "Fasilitas",
      submenu: [
        {
          title: "Lab Mekatronika",
          desc: "Fasilitas praktikum mekatronika",
          icon: "lucide:wrench",
          to: "/jurusan/mekatronika#fasilitas",
          external: false,
          tags: ["lab", "laboratorium", "mekatronika", "praktikum", "fasilitas"]
        },
        {
          title: "Automation Tools",
          desc: "Tools otomasi dan robotik",
          icon: "lucide:tool",
          to: "/jurusan/mekatronika#fasilitas",
          external: false,
          tags: ["automation", "tools", "otomasi", "robotik", "robot"]
        },
      ],
    },
    {
      title: "Karir",
      submenu: [
        { 
          title: "Automation Engineer", 
          desc: "Peluang karir sebagai engineer otomasi", 
          icon: "lucide:briefcase",
          to: "/jurusan/mekatronika#kesempatan-kerja",
          external: false,
          tags: ["karir", "automation", "engineer", "otomasi", "pekerjaan", "kerja"]
        },
        { 
          title: "PLC Programmer", 
          desc: "Karir di bidang programming PLC", 
          icon: "lucide:users",
          to: "/jurusan/mekatronika#kesempatan-kerja",
          external: false,
          tags: ["karir", "plc", "programmer", "programming", "pekerjaan", "kerja"]
        },
      ],
    },
  ],
  tav: [
    {
      title: "Pengenalan",
      submenu: [
        { 
          title: "Apa itu TAV?", 
          desc: "Pengantar jurusan Teknik Audio Video", 
          icon: "lucide:info",
          to: "/jurusan/tav#tentang-jurusan",
          external: false,
          tags: ["tav", "pengenalan", "tentang", "intro", "teknik", "audio", "video"]
        },
        { 
          title: "Kurikulum", 
          desc: "Mata pelajaran dan kompetensi audio video", 
          icon: "lucide:book",
          to: "/jurusan/tav#materi-pembelajaran",
          external: false,
          tags: ["kurikulum", "mata pelajaran", "pembelajaran", "materi", "program", "audio", "video"]
        },
      ],
    },
    {
      title: "Kompetensi",
      submenu: [
        { 
          title: "Audio Engineering", 
          desc: "Teknik audio dan sound system", 
          icon: "lucide:volume-2",
          to: "/jurusan/tav#materi-pembelajaran",
          external: false,
          tags: ["audio", "engineering", "teknik", "sound", "system", "suara"]
        },
        { 
          title: "Video Production", 
          desc: "Produksi video dan multimedia", 
          icon: "lucide:video",
          to: "/jurusan/tav#materi-pembelajaran",
          external: false,
          tags: ["video", "production", "produksi", "multimedia"]
        },
        { 
          title: "Electronics", 
          desc: "Elektronika audio video", 
          icon: "lucide:radio",
          to: "/jurusan/tav#materi-pembelajaran",
          external: false,
          tags: ["electronics", "elektronika", "audio", "video"]
        },
      ],
    },
    {
      title: "Fasilitas",
      submenu: [
        {
          title: "Studio Audio Video",
          desc: "Fasilitas studio audio video",
          icon: "lucide:music",
          to: "/jurusan/tav#fasilitas",
          external: false,
          tags: ["studio", "audio", "video", "fasilitas", "lab"]
        },
        {
          title: "AV Equipment",
          desc: "Peralatan audio video",
          icon: "lucide:speaker",
          to: "/jurusan/tav#fasilitas",
          external: false,
          tags: ["av", "equipment", "peralatan", "audio", "video"]
        },
      ],
    },
    {
      title: "Karir",
      submenu: [
        { 
          title: "Audio Engineer", 
          desc: "Peluang karir sebagai engineer audio", 
          icon: "lucide:briefcase",
          to: "/jurusan/tav#kesempatan-kerja",
          external: false,
          tags: ["karir", "audio", "engineer", "pekerjaan", "kerja"]
        },
        { 
          title: "Sound Technician", 
          desc: "Karir di bidang teknisi suara", 
          icon: "lucide:users",
          to: "/jurusan/tav#kesempatan-kerja",
          external: false,
          tags: ["karir", "sound", "technician", "teknisi", "suara", "pekerjaan", "kerja"]
        },
      ],
    },
  ],
};

export default defineEventHandler(async (event) => {
  return majorMenus;
});
