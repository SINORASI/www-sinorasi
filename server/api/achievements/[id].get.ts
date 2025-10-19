import type { Achievement } from "~/models/Achievement";

export default defineEventHandler(async (event): Promise<Achievement | null> => {
  const id = getRouterParam(event, "id");

  const achievements: Achievement[] = [
    {
      id: "1",
      image: "/images/placeholder.jpg",
      title: "LKS 2023 Kab. Malang : Kami Lolos Enam Bidang Lomba untuk Menuju Tingkat Provinsi",
      description:
        "SMKN 2 Singosari sukses menggelar Lomba Kompetensi Siswa (LKS) SMK tingkat Kabupaten Malang selama dua hari sejak Senin (6/3). Hasilnya, 13 siswa berhasil meraih prestasi dengan 6 bidang lomba lolos ke tingkat Provinsi Jawa Timur.",
      date: "2023-03-06",
      category: "Kompetisi",
    },
    {
      id: "2",
      image: "/images/placeholder.jpg",
      title: "Juara 1 Lomba Karya Tulis Ilmiah Tingkat Nasional",
      description:
        "Tim siswa SMKN 2 Singosari berhasil meraih juara 1 dalam Lomba Karya Tulis Ilmiah yang diselenggarakan oleh Kementerian Pendidikan dan Kebudayaan dengan tema Inovasi Teknologi untuk Masa Depan.",
      date: "2023-08-15",
      category: "Akademik",
    },
  ];

  const achievement = achievements.find((a) => a.id === id);

  if (!achievement) {
    throw createError({
      statusCode: 404,
      message: "Achievement not found",
    });
  }

  return achievement;
});
