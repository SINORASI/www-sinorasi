import { defineEventHandler } from "h3";
import type { MajorName } from "~/models/MajorName";

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
          tags: ["rpl", "pengenalan", "tentang", "intro", "rekayasa", "perangkat", "lunak"],
        },
        {
          title: "Kurikulum",
          desc: "Mata pelajaran dan kompetensi yang dipelajari",
          icon: "lucide:book",
          to: "/jurusan/rpl#materi-pembelajaran",
          external: false,
          tags: ["kurikulum", "mata pelajaran", "pembelajaran", "materi", "program"],
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
          tags: ["tkj", "pengenalan", "tentang", "intro", "teknik", "komputer", "jaringan", "networking"],
        },
        {
          title: "Kurikulum",
          desc: "Mata pelajaran dan kompetensi jaringan",
          icon: "lucide:book",
          to: "/jurusan/tkj#materi-pembelajaran",
          external: false,
          tags: ["kurikulum", "mata pelajaran", "pembelajaran", "materi", "program", "jaringan"],
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
          tags: ["dkv", "pengenalan", "tentang", "intro", "desain", "komunikasi", "visual", "design"],
        },
        {
          title: "Kurikulum",
          desc: "Mata pelajaran dan kompetensi desain",
          icon: "lucide:book",
          to: "/jurusan/dkv#materi-pembelajaran",
          external: false,
          tags: ["kurikulum", "mata pelajaran", "pembelajaran", "materi", "program", "desain"],
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
          tags: ["animasi", "animation", "pengenalan", "tentang", "intro"],
        },
        {
          title: "Kurikulum",
          desc: "Mata pelajaran dan teknik animasi",
          icon: "lucide:book",
          to: "/jurusan/animasi#materi-pembelajaran",
          external: false,
          tags: ["kurikulum", "mata pelajaran", "pembelajaran", "materi", "program", "animasi"],
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
          tags: ["broadcasting", "broadcast", "penyiaran", "pengenalan", "tentang", "intro"],
        },
        {
          title: "Kurikulum",
          desc: "Mata pelajaran dan teknik broadcasting",
          icon: "lucide:book",
          to: "/jurusan/broadcasting#materi-pembelajaran",
          external: false,
          tags: ["kurikulum", "mata pelajaran", "pembelajaran", "materi", "program", "broadcasting"],
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
          tags: ["tei", "pengenalan", "tentang", "intro", "teknik", "elektronika", "industri", "elektronik"],
        },
        {
          title: "Kurikulum",
          desc: "Mata pelajaran dan kompetensi elektronika",
          icon: "lucide:book",
          to: "/jurusan/tei#materi-pembelajaran",
          external: false,
          tags: ["kurikulum", "mata pelajaran", "pembelajaran", "materi", "program", "elektronika"],
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
          tags: ["mekatronika", "mechatronics", "pengenalan", "tentang", "intro", "teknik"],
        },
        {
          title: "Kurikulum",
          desc: "Mata pelajaran dan kompetensi mekatronika",
          icon: "lucide:book",
          to: "/jurusan/mekatronika#materi-pembelajaran",
          external: false,
          tags: ["kurikulum", "mata pelajaran", "pembelajaran", "materi", "program", "mekatronika"],
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
          tags: ["tav", "pengenalan", "tentang", "intro", "teknik", "audio", "video"],
        },
        {
          title: "Kurikulum",
          desc: "Mata pelajaran dan kompetensi audio video",
          icon: "lucide:book",
          to: "/jurusan/tav#materi-pembelajaran",
          external: false,
          tags: ["kurikulum", "mata pelajaran", "pembelajaran", "materi", "program", "audio", "video"],
        },
      ],
    },
  ],
};

export default defineEventHandler(async (_event) => {
  return majorMenus;
});
