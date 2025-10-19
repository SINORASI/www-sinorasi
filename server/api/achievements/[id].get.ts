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
    {
      id: '3',
      image: '/images/placeholder.jpg',
      title: 'Juara 2 Olimpiade Sains Tingkat Provinsi',
      description: 'Siswa SMKN 2 Singosari meraih juara 2 dalam Olimpiade Sains Provinsi Jawa Timur, menunjukkan kemampuan akademik yang luar biasa di bidang matematika dan fisika.',
      date: '2024-05-20',
      category: 'Akademik'
    },
    {
      id: '4',
      image: '/images/placeholder.jpg',
      title: 'Pemenang Lomba Inovasi Teknologi Sekolah',
      description: 'Tim siswa berhasil menciptakan aplikasi mobile untuk monitoring kesehatan siswa, meraih juara 1 dalam kompetisi inovasi teknologi tingkat sekolah.',
      date: '2024-06-10',
      category: 'Teknologi'
    },
    {
      id: '5',
      image: '/images/placeholder.jpg',
      title: 'Prestasi dalam Lomba Seni dan Budaya',
      description: 'Grup tari tradisional SMKN 2 Singosari berhasil meraih juara harapan dalam Festival Seni Budaya tingkat kabupaten, memperlihatkan bakat seni siswa.',
      date: '2024-07-15',
      category: 'Seni'
    },
    {
      id: '6',
      image: '/images/placeholder.jpg',
      title: 'Juara 3 Lomba Debat Bahasa Inggris',
      description: 'Tim debat bahasa Inggris sekolah berhasil meraih juara 3 dalam kompetisi debat antar sekolah tingkat regional, meningkatkan kemampuan komunikasi siswa.',
      date: '2024-09-05',
      category: 'Bahasa'
    },
    {
      id: '7',
      image: '/images/placeholder.jpg',
      title: 'Penghargaan Sekolah Adiwiyata',
      description: 'SMKN 2 Singosari menerima penghargaan Sekolah Adiwiyata dari Kementerian Lingkungan Hidup atas komitmen dalam program pelestarian lingkungan.',
      date: '2024-10-01',
      category: 'Lingkungan'
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
