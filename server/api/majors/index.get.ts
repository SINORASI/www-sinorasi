import type { MajorName } from '~/models/MajorName';
import type { MajorData } from '~/models/MajorData';

// Mock data - same as data.ts
const majorDatas: Record<MajorName, MajorData> = {
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

export default defineEventHandler(async (event) => {
  return majorDatas;
});
