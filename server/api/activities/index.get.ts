import { defineEventHandler, getQuery, readBody, createError, setCookie, getCookie } from 'h3';
import type { Activity } from "~/models/Activity";
import { getCached, setCached, generateCacheKey, CACHE_DEFAULTS } from "../../utils/cache";

export default defineEventHandler(async (event): Promise<{ data: Activity[]; total: number }> => {
  const query = getQuery(event);
  const limit = parseInt(query.limit as string, 10) || 10;
  const offset = parseInt(query.offset as string, 10) || 0;
  const extracurricular = query.extracurricular as string;

  // Generate cache key based on query parameters
  const cacheKey = generateCacheKey("activities", { limit, offset, extracurricular });

  // Try to get from cache first
  const cached = getCached<{ data: Activity[]; total: number }>(cacheKey);
  if (cached) {
    return cached;
  }

  const allActivities: Activity[] = [
    {
      id: "1",
      image: "/images/placeholder.jpg",
      title: "Kejuaraan Antar Sekolah Se-Surabaya",
      description:
        "Tim basket putra berhasil meraih juara 2 dalam kompetisi bergengsi yang diikuti 32 sekolah menengah atas di Surabaya dengan persaingan yang sangat ketat",
      date: "2024-03-15",
      extracurricular: "basket",
    },
    {
      id: "2",
      image: "/images/placeholder.jpg",
      title: "Pelatihan Intensif Teknik Dasar",
      description:
        "Mengadakan pelatihan khusus bersama pelatih profesional untuk meningkatkan kemampuan dribbling, shooting, dan passing seluruh anggota ekstrakurikuler",
      date: "2024-04-20",
      extracurricular: "basket",
    },
    {
      id: "3",
      image: "/images/placeholder.jpg",
      title: "Turnamen Internal Antar Kelas",
      description:
        "Event tahunan yang melibatkan seluruh siswa sekolah dalam kompetisi basket antar kelas untuk mempererat tali persaudaraan dan sportivitas",
      date: "2024-05-10",
      extracurricular: "basket",
    },
    {
      id: "4",
      image: "/images/placeholder.jpg",
      title: "Workshop Strategi Permainan",
      description:
        "Sesi pembelajaran mendalam tentang taktik dan strategi permainan basket modern yang dipimpin langsung oleh mantan pemain profesional",
      date: "2024-06-05",
      extracurricular: "basket",
    },
  ];

  let filteredActivities = allActivities;

  if (extracurricular) {
    filteredActivities = allActivities.filter((a) => a.extracurricular === extracurricular);
  }

  const paginatedData = filteredActivities.slice(offset, offset + limit);

  const result = {
    data: paginatedData,
    total: filteredActivities.length,
  };

  // Cache the result for 15 minutes
  setCached(cacheKey, result, CACHE_DEFAULTS.MEDIUM);

  return result;
});
