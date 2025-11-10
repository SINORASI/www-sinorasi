import { defineEventHandler, getQuery, createError } from "h3";
import type { Staff } from "~/models/Staff";
import { getCached, setCached, generateCacheKey, CACHE_DEFAULTS, setCacheHeaders } from "../../utils/cache";

const staffData = {
  kepsek: [
    { image: "/images/placeholder.jpg", name: "Sumijah S.Pd, M.Si", position: "Kepala Sekolah" },
    { image: "/images/placeholder.jpg", name: "Sumijah S.Pd, M.Si", position: "Kepala Sekolah" },
  ] as Staff[],
  wakasek: [
    {
      image: "/images/placeholder.jpg",
      name: "Sumijah S.Pd, M.Si",
      position: "Wakil Kepala Sekolah",
    },
    {
      image: "/images/placeholder.jpg",
      name: "Sumijah S.Pd, M.Si",
      position: "Wakil Kepala Sekolah",
    },
    {
      image: "/images/placeholder.jpg",
      name: "Sumijah S.Pd, M.Si",
      position: "Wakil Kepala Sekolah",
    },
    {
      image: "/images/placeholder.jpg",
      name: "Sumijah S.Pd, M.Si",
      position: "Wakil Kepala Sekolah",
    },
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

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { department } = query;

  // Generate cache key based on department
  const cacheKey = generateCacheKey("staff", { department });

  // Try to get from cache first
  const cached = getCached<any>(cacheKey);
  if (cached) {
    // Set cache headers for cached response
    setCacheHeaders(event, CACHE_DEFAULTS.LONG, { public: true });
    return cached;
  }

  if (department && typeof department === "string") {
    const deptData = staffData[department as keyof typeof staffData];
    if (!deptData) {
      throw createError({
        statusCode: 404,
        statusMessage: "Department not found",
      });
    }

    // Cache the result for 1 hour
    setCached(cacheKey, deptData, CACHE_DEFAULTS.LONG);

    // Set cache headers for fresh response
    setCacheHeaders(event, CACHE_DEFAULTS.LONG, { public: true });

    return deptData;
  }

  // Cache the full staff data for 1 hour
  setCached(cacheKey, staffData, CACHE_DEFAULTS.LONG);

  // Set cache headers for fresh response
  setCacheHeaders(event, CACHE_DEFAULTS.LONG, { public: true });

  return staffData;
});
