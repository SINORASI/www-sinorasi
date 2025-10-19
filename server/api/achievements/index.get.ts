import type { MajorName } from "~/models/MajorName";

interface MajorAchievement {
  id: number;
  title: string;
  description: string;
  studentName: string;
  year: number;
  majorName: MajorName;
}

const achievementsData: MajorAchievement[] = [
  {
    id: 1,
    majorName: "rpl",
    title: "JUARA 1 LOMBA KOMPETENSI SISWA (LKS) IT SOFTWARE TINGKAT PROVINSI JAWA TIMUR",
    description:
      "Siswa pembelajaran kita dilakukan cukup baik di ruang kelas. Tempat duduk dan meja siswa yang ada di dalam ruangan ada dalam kondisi cukup baik, dan jumlah kursi semakin lengkap. Untuk media pembelajaran sudah memadai, antara lain ada perlengkapan aspek Isilah, Lab. Komputer, dan Bengkel. Jumlah buku semakin lengkap.",
    studentName: "lorem ipsum",
    year: 2024,
  },
  {
    id: 2,
    majorName: "rpl",
    title: "JUARA 2 LOMBA WEB DEVELOPMENT TINGKAT NASIONAL",
    description:
      "Siswa pembelajaran kita dilakukan cukup baik di ruang kelas. Tempat duduk dan meja siswa yang ada di dalam ruangan ada dalam kondisi cukup baik, dan jumlah kursi semakin lengkap. Untuk media pembelajaran sudah memadai, antara lain ada perlengkapan aspek Isilah, Lab. Komputer, dan Bengkel. Jumlah buku semakin lengkap.",
    studentName: "Ahmad Fajar",
    year: 2024,
  },
  {
    id: 3,
    majorName: "rpl",
    title: "JUARA 1 LOMBA MOBILE APP DEVELOPMENT PROVINSI JAWA TIMUR",
    description:
      "Siswa pembelajaran kita dilakukan cukup baik di ruang kelas. Tempat duduk dan meja siswa yang ada di dalam ruangan ada dalam kondisi cukup baik, dan jumlah kursi semakin lengkap. Untuk media pembelajaran sudah memadai, antara lain ada perlengkapan aspek Isilah, Lab. Komputer, dan Bengkel. Jumlah buku semakin lengkap.",
    studentName: "Dewi Sartika",
    year: 2023,
  },

  {
    id: 4,
    majorName: "tkj",
    title: "JUARA 1 LOMBA NETWORK SECURITY TINGKAT PROVINSI JAWA TIMUR",
    description:
      "Siswa pembelajaran kita dilakukan cukup baik di ruang kelas. Tempat duduk dan meja siswa yang ada di dalam ruangan ada dalam kondisi cukup baik, dan jumlah kursi semakin lengkap. Untuk media pembelajaran sudah memadai, antara lain ada perlengkapan aspek Isilah, Lab. Komputer, dan Bengkel. Jumlah buku semakin lengkap.",
    studentName: "Budi Santoso",
    year: 2024,
  },
  {
    id: 5,
    majorName: "tkj",
    title: "JUARA 2 LOMBA CISCO NETWORKING TINGKAT NASIONAL",
    description:
      "Siswa pembelajaran kita dilakukan cukup baik di ruang kelas. Tempat duduk dan meja siswa yang ada di dalam ruangan ada dalam kondisi cukup baik, dan jumlah kursi semakin lengkap. Untuk media pembelajaran sudah memadai, antara lain ada perlengkapan aspek Isilah, Lab. Komputer, dan Bengkel. Jumlah buku semakin lengkap.",
    studentName: "Rina Wijaya",
    year: 2024,
  },

  {
    id: 6,
    majorName: "dkv",
    title: "JUARA 1 LOMBA DESAIN GRAFIS TINGKAT PROVINSI JAWA TIMUR",
    description:
      "Siswa pembelajaran kita dilakukan cukup baik di ruang kelas. Tempat duduk dan meja siswa yang ada di dalam ruangan ada dalam kondisi cukup baik, dan jumlah kursi semakin lengkap. Untuk media pembelajaran sudah memadai, antara lain ada perlengkapan aspek Isilah, Lab. Komputer, dan Bengkel. Jumlah buku semakin lengkap.",
    studentName: "Maya Kusuma",
    year: 2024,
  },
  {
    id: 7,
    majorName: "dkv",
    title: "JUARA 1 LOMBA UI/UX DESIGN TINGKAT NASIONAL",
    description:
      "Siswa pembelajaran kita dilakukan cukup baik di ruang kelas. Tempat duduk dan meja siswa yang ada di dalam ruangan ada dalam kondisi cukup baik, dan jumlah kursi semakin lengkap. Untuk media pembelajaran sudah memadai, antara lain ada perlengkapan aspek Isilah, Lab. Komputer, dan Bengkel. Jumlah buku semakin lengkap.",
    studentName: "Siti Nurhaliza",
    year: 2023,
  },

  {
    id: 8,
    majorName: "animasi",
    title: "JUARA 1 LOMBA 3D ANIMATION TINGKAT PROVINSI JAWA TIMUR",
    description:
      "Siswa pembelajaran kita dilakukan cukup baik di ruang kelas. Tempat duduk dan meja siswa yang ada di dalam ruangan ada dalam kondisi cukup baik, dan jumlah kursi semakin lengkap. Untuk media pembelajaran sudah memadai, antara lain ada perlengkapan aspek Isilah, Lab. Komputer, dan Bengkel. Jumlah buku semakin lengkap.",
    studentName: "Andi Pratama",
    year: 2024,
  },
  {
    id: 9,
    majorName: "animasi",
    title: "JUARA 2 LOMBA CHARACTER DESIGN TINGKAT NASIONAL",
    description:
      "Siswa pembelajaran kita dilakukan cukup baik di ruang kelas. Tempat duduk dan meja siswa yang ada di dalam ruangan ada dalam kondisi cukup baik, dan jumlah kursi semakin lengkap. Untuk media pembelajaran sudah memadai, antara lain ada perlengkapan aspek Isilah, Lab. Komputer, dan Bengkel. Jumlah buku semakin lengkap.",
    studentName: "Lisa Amelia",
    year: 2024,
  },

  {
    id: 10,
    majorName: "broadcasting",
    title: "JUARA 1 LOMBA VIDEO PRODUCTION TINGKAT PROVINSI JAWA TIMUR",
    description:
      "Siswa pembelajaran kita dilakukan cukup baik di ruang kelas. Tempat duduk dan meja siswa yang ada di dalam ruangan ada dalam kondisi cukup baik, dan jumlah kursi semakin lengkap. Untuk media pembelajaran sudah memadai, antara lain ada perlengkapan aspek Isilah, Lab. Komputer, dan Bengkel. Jumlah buku semakin lengkap.",
    studentName: "Dimas Aditya",
    year: 2024,
  },
  {
    id: 11,
    majorName: "broadcasting",
    title: "JUARA 1 LOMBA FILM PENDEK TINGKAT NASIONAL",
    description:
      "Siswa pembelajaran kita dilakukan cukup baik di ruang kelas. Tempat duduk dan meja siswa yang ada di dalam ruangan ada dalam kondisi cukup baik, dan jumlah kursi semakin lengkap. Untuk media pembelajaran sudah memadai, antara lain ada perlengkapan aspek Isilah, Lab. Komputer, dan Bengkel. Jumlah buku semakin lengkap.",
    studentName: "Nina Safitri",
    year: 2023,
  },

  {
    id: 12,
    majorName: "tei",
    title: "JUARA 1 LOMBA ELECTRICAL INSTALLATION TINGKAT PROVINSI JAWA TIMUR",
    description:
      "Siswa pembelajaran kita dilakukan cukup baik di ruang kelas. Tempat duduk dan meja siswa yang ada di dalam ruangan ada dalam kondisi cukup baik, dan jumlah kursi semakin lengkap. Untuk media pembelajaran sudah memadai, antara lain ada perlengkapan aspek Isilah, Lab. Komputer, dan Bengkel. Jumlah buku semakin lengkap.",
    studentName: "Fahmi Rizki",
    year: 2024,
  },
  {
    id: 13,
    majorName: "tei",
    title: "JUARA 2 LOMBA INDUSTRIAL AUTOMATION TINGKAT NASIONAL",
    description:
      "Siswa pembelajaran kita dilakukan cukup baik di ruang kelas. Tempat duduk dan meja siswa yang ada di dalam ruangan ada dalam kondisi cukup baik, dan jumlah kursi semakin lengkap. Untuk media pembelajaran sudah memadai, antara lain ada perlengkapan aspek Isilah, Lab. Komputer, dan Bengkel. Jumlah buku semakin lengkap.",
    studentName: "Eka Putra",
    year: 2024,
  },

  {
    id: 14,
    majorName: "mekatronika",
    title: "JUARA 1 LOMBA ROBOTICS TINGKAT PROVINSI JAWA TIMUR",
    description:
      "Siswa pembelajaran kita dilakukan cukup baik di ruang kelas. Tempat duduk dan meja siswa yang ada di dalam ruangan ada dalam kondisi cukup baik, dan jumlah kursi semakin lengkap. Untuk media pembelajaran sudah memadai, antara lain ada perlengkapan aspek Isilah, Lab. Komputer, dan Bengkel. Jumlah buku semakin lengkap.",
    studentName: "Reza Firmansyah",
    year: 2024,
  },
  {
    id: 15,
    majorName: "mekatronika",
    title: "JUARA 1 LOMBA MECHATRONICS ENGINEERING TINGKAT NASIONAL",
    description:
      "Siswa pembelajaran kita dilakukan cukup baik di ruang kelas. Tempat duduk dan meja siswa yang ada di dalam ruangan ada dalam kondisi cukup baik, dan jumlah kursi semakin lengkap. Untuk media pembelajaran sudah memadai, antara lain ada perlengkapan aspek Isilah, Lab. Komputer, dan Bengkel. Jumlah buku semakin lengkap.",
    studentName: "Yudi Setiawan",
    year: 2023,
  },

  {
    id: 16,
    majorName: "tav",
    title: "JUARA 1 LOMBA AUDIO ENGINEERING TINGKAT PROVINSI JAWA TIMUR",
    description:
      "Siswa pembelajaran kita dilakukan cukup baik di ruang kelas. Tempat duduk dan meja siswa yang ada di dalam ruangan ada dalam kondisi cukup baik, dan jumlah kursi semakin lengkap. Untuk media pembelajaran sudah memadai, antara lain ada perlengkapan aspek Isilah, Lab. Komputer, dan Bengkel. Jumlah buku semakin lengkap.",
    studentName: "Doni Hermawan",
    year: 2024,
  },
  {
    id: 17,
    majorName: "tav",
    title: "JUARA 2 LOMBA SOUND SYSTEM DESIGN TINGKAT NASIONAL",
    description:
      "Siswa pembelajaran kita dilakukan cukup baik di ruang kelas. Tempat duduk dan meja siswa yang ada di dalam ruangan ada dalam kondisi cukup baik, dan jumlah kursi semakin lengkap. Untuk media pembelajaran sudah memadai, antara lain ada perlengkapan aspek Isilah, Lab. Komputer, dan Bengkel. Jumlah buku semakin lengkap.",
    studentName: "Arif Budiman",
    year: 2024,
  },
];

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const major = query.major as MajorName | undefined;

  if (major) {
    return achievementsData.filter((achievement) => achievement.majorName === major);
  }

  return achievementsData;
});
