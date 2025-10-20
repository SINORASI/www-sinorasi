import { defineEventHandler, getQuery, readBody, createError, setCookie, getCookie } from 'h3';
import type { Timeline } from "~/models/Timeline";

export default defineEventHandler(async (_event): Promise<Timeline[]> => {
  const timelines: Timeline[] = [
    {
      id: "1",
      year: "2007",
      title: "Awal Berdiri",
      description:
        "SMK Negeri 2 Singosari didirikan secara resmi pada tanggal 25 Mei 2007 berdasarkan surat Perjanjian Kerjasama No. 0570ax/C5.4/Kep/KU/2007 antara Bupati Malang dengan Direktur Pendidikan Sekolah Menengah Kejuruan.",
      icon: "lucide:school",
    },
    {
      id: "2",
      year: "2010",
      title: "Pengembangan Program Keahlian",
      description:
        "Sekolah mulai mengembangkan berbagai program keahlian untuk memenuhi kebutuhan industri lokal dan nasional.",
      icon: "lucide:book-open",
    },
    {
      id: "3",
      year: "2015",
      title: "Akreditasi A",
      description:
        "SMK Negeri 2 Singosari berhasil meraih akreditasi A dari Badan Akreditasi Nasional Sekolah/Madrasah.",
      icon: "lucide:award",
    },
    {
      id: "4",
      year: "2020",
      title: "Digitalisasi Pembelajaran",
      description:
        "Implementasi pembelajaran daring dan pengembangan platform digital untuk mendukung proses belajar mengajar di era pandemi.",
      icon: "lucide:monitor",
    },
    {
      id: "5",
      year: "2023",
      title: "Prestasi LKS",
      description:
        "Siswa SMK Negeri 2 Singosari berhasil meraih prestasi gemilang dalam Lomba Kompetensi Siswa tingkat kabupaten dan provinsi.",
      icon: "lucide:trophy",
    },
  ];

  return timelines;
});
