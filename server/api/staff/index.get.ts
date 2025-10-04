import type { Staff } from '~/models/Staff';

// Mock data - same as data.ts
const staffData = {
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

export default defineEventHandler(async (event) => {
  // Get query parameters for filtering by department
  const query = getQuery(event);
  const { department } = query;

  if (department && typeof department === 'string') {
    const deptData = staffData[department as keyof typeof staffData];
    if (!deptData) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Department not found'
      });
    }
    return deptData;
  }

  return staffData;
});
