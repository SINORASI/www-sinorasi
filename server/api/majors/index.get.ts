import { defineEventHandler } from "h3";
import type { MajorData } from "~/models/MajorData";
import type { MajorName } from "~/models/MajorName";
import { getCached, setCached, CACHE_DEFAULTS, setCacheHeaders } from "../../utils/cache";

const majorDatas: Record<MajorName, MajorData> = {
  rpl: {
    logo: "/images/majorIcon/logo-rpl.webp",
    short: "RPL",
    nameMajor: "Rekayasa Perangkat Lunak",
    headerColor: "bg-orange-600/30 backdrop-blur-2xl border-b-orange-400",
    bgColor: "bg-orange-400",
    hoverBgColor: "hover:bg-orange-500",
    textColor: "text-orange-600",
    btnColor: "hover:bg-orange-500 hover:border-orange-500",
    description:
      "Program studi yang fokus pada pengembangan perangkat lunak, pemrograman, dan teknologi informasi untuk mempersiapkan siswa menjadi developer profesional.",
    prerequisites: ["Matematika Dasar", "Logika Berpikir", "Bahasa Inggris", "Komputer Dasar"],
    relatedCourses: [
      "Pemrograman Web",
      "Pemrograman Mobile",
      "Database Management",
      "Software Engineering",
      "UI/UX Design",
    ],
  },
  tkj: {
    logo: "/images/majorIcon/logo-tkj.webp",
    short: "TKJ",
    nameMajor: "Teknik Komputer Jaringan",
    headerColor: "bg-yellow-600/30 backdrop-blur-2xl border-b-yellow-400",
    bgColor: "bg-yellow-400",
    hoverBgColor: "hover:bg-yellow-500",
    textColor: "text-yellow-600",
    btnColor: "hover:bg-yellow-400 hover:border-yellow-400",
    description:
      "Program studi yang mengkhususkan diri dalam jaringan komputer, sistem operasi, dan infrastruktur teknologi informasi untuk karir di bidang IT support dan networking.",
    prerequisites: ["Matematika", "Fisika Dasar", "Bahasa Inggris", "Komputer Dasar"],
    relatedCourses: [
      "Jaringan Komputer",
      "Sistem Operasi",
      "Server Administration",
      "Network Security",
      "Cloud Computing",
    ],
  },
  dkv: {
    logo: "/images/majorIcon/logo-dkv.webp",
    short: "DKV",
    nameMajor: "Desain Komunikasi Visual",
    headerColor: "bg-blue-600/30 backdrop-blur-2xl border-b-blue-400",
    bgColor: "bg-blue-400",
    hoverBgColor: "hover:bg-blue-500",
    textColor: "text-blue-600",
    btnColor: "hover:bg-blue-600 hover:border-blue-600",
    description:
      "Program studi yang menggabungkan kreativitas desain dengan teknologi digital untuk menciptakan komunikasi visual yang efektif dan menarik.",
    prerequisites: ["Seni Rupa", "Bahasa Indonesia", "Bahasa Inggris", "Komputer Dasar"],
    relatedCourses: [
      "Graphic Design",
      "Photography",
      "Video Editing",
      "Typography",
      "Brand Identity",
      "Digital Illustration",
    ],
  },
  animasi: {
    logo: "/images/majorIcon/logo-an.webp",
    short: "AN",
    nameMajor: "Animasi",
    headerColor: "bg-pink-600/30 backdrop-blur-2xl border-b-pink-400",
    bgColor: "bg-pink-400",
    hoverBgColor: "hover:bg-pink-500",
    textColor: "text-pink-600",
    btnColor: "hover:bg-pink-600 hover:border-pink-600",
    description:
      "Program studi yang fokus pada pembuatan animasi 2D dan 3D, efek visual, dan storytelling digital untuk industri entertainment dan media.",
    prerequisites: ["Seni Rupa", "Matematika", "Bahasa Inggris", "Komputer Dasar"],
    relatedCourses: [
      "2D Animation",
      "3D Animation",
      "Motion Graphics",
      "Character Design",
      "Storyboarding",
      "Visual Effects",
    ],
  },
  broadcasting: {
    logo: "/images/majorIcon/logo-bc.webp",
    short: "BC",
    nameMajor: "Broadcasting",
    headerColor: "bg-red-600/30 backdrop-blur-2xl border-b-red-400",
    bgColor: "bg-red-400",
    hoverBgColor: "hover:bg-red-500",
    textColor: "text-red-600",
    btnColor: "hover:bg-red-600 hover:border-red-600",
    description:
      "Program studi yang mengajarkan teknik penyiaran, produksi konten media, dan jurnalistik untuk karir di dunia broadcasting dan media massa.",
    prerequisites: ["Bahasa Indonesia", "Bahasa Inggris", "Komunikasi", "Komputer Dasar"],
    relatedCourses: [
      "TV Production",
      "Radio Broadcasting",
      "Journalism",
      "Media Ethics",
      "Content Creation",
      "Live Streaming",
    ],
  },
  tei: {
    logo: "/images/majorIcon/logo-tei.webp",
    short: "TEI",
    nameMajor: "Teknik Elektronika Industri",
    headerColor: "bg-green-600/30 backdrop-blur-2xl border-b-green-400",
    bgColor: "bg-green-600",
    hoverBgColor: "hover:bg-green-700",
    textColor: "text-green-600",
    btnColor: "hover:bg-green-600 hover:border-green-600",
    description:
      "Program studi yang mempelajari elektronika industri, otomasi, dan sistem kontrol untuk aplikasi di manufaktur dan industri modern.",
    prerequisites: ["Matematika", "Fisika", "Bahasa Inggris", "Komputer Dasar"],
    relatedCourses: [
      "Elektronika Dasar",
      "PLC Programming",
      "Industrial Automation",
      "Control Systems",
      "Robotics",
      "Instrumentation",
    ],
  },
  mekatronika: {
    logo: "/images/majorIcon/logo-mt.webp",
    short: "TMT",
    nameMajor: "Teknik Mekatronika",
    headerColor: "bg-green-800/30 backdrop-blur-2xl border-b-green-400",
    bgColor: "bg-green-800",
    hoverBgColor: "hover:bg-green-900",
    textColor: "text-green-900",
    btnColor: "hover:bg-green-800 hover:border-green-800",
    description:
      "Program studi interdisipliner yang menggabungkan mekanika, elektronika, dan informatika untuk desain dan pengembangan sistem otomatis.",
    prerequisites: ["Matematika", "Fisika", "Bahasa Inggris", "Komputer Dasar"],
    relatedCourses: [
      "Mechanical Engineering",
      "Electronics",
      "Programming",
      "Robotics",
      "Automation Systems",
      "CAD/CAM",
    ],
  },
  tav: {
    logo: "/images/majorIcon/logo-tav.webp",
    short: "TAV",
    nameMajor: "Teknik Audio Video",
    headerColor: "bg-green-400/30 backdrop-blur-2xl border-b-green-400",
    bgColor: "bg-green-400",
    hoverBgColor: "hover:bg-green-500",
    textColor: "text-green-400",
    btnColor: "hover:bg-green-400 hover:border-green-400",
    description:
      "Program studi yang fokus pada teknik audio, video, dan multimedia untuk aplikasi di entertainment, broadcasting, dan produksi media.",
    prerequisites: ["Matematika", "Fisika Dasar", "Bahasa Inggris", "Komputer Dasar"],
    relatedCourses: [
      "Audio Engineering",
      "Video Production",
      "Sound Design",
      "Lighting Technology",
      "Multimedia Systems",
      "Post Production",
    ],
  },
};

export default defineEventHandler(async (event) => {
  // Use cache key for majors data
  const cacheKey = "majors:all";

  // Try to get from cache
  const cached = getCached<Record<MajorName, MajorData>>(cacheKey);
  if (cached) {
    // Set cache headers for cached response
    setCacheHeaders(event, CACHE_DEFAULTS.VERY_LONG, { public: true });
    return cached;
  }

  // Cache not found or expired, return fresh data and cache it
  setCached(cacheKey, majorDatas, CACHE_DEFAULTS.VERY_LONG);

  // Set cache headers for fresh response
  setCacheHeaders(event, CACHE_DEFAULTS.VERY_LONG, { public: true });

  return majorDatas;
});
