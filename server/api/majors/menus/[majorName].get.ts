import type { MajorName } from "~/models/MajorName";

export interface MenuItem {
  title: string;
  submenu: {
    title: string;
    desc: string;
    icon: string;
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
        },
        {
          title: "Kurikulum",
          desc: "Mata pelajaran dan kompetensi yang dipelajari",
          icon: "lucide:book",
        },
      ],
    },
  ],
  tkj: [],
  dkv: [],
  animasi: [],
  broadcasting: [],
  tei: [],
  mekatronika: [],
  tav: [],
};

export default defineEventHandler(async (event) => {
  const majorName = getRouterParam(event, "majorName") as MajorName;

  const menus = majorMenus[majorName];

  if (!menus) {
    throw createError({
      statusCode: 404,
      statusMessage: "Major menus not found",
    });
  }

  return menus;
});
