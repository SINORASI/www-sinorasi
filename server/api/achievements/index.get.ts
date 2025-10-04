import type { Achievement } from '~/models/Achievement';

export default defineEventHandler(async (event): Promise<{ data: Achievement[], total: number }> => {
  // TODO: Replace with actual API call
  // const response = await $fetch('https://your-api.com/api/achievements');
  
  const query = getQuery(event);
  const limit = parseInt(query.limit as string) || 10;
  const offset = parseInt(query.offset as string) || 0;
  const category = query.category as string;

  // Mock data
  const allAchievements: Achievement[] = [
    {
      id: '1',
      image: '/images/placeholder.jpg',
      title: 'LKS 2023 Kab. Malang : Kami Lolos Enam Bidang Lomba untuk Menuju Tingkat Provinsi',
      description: 'SMKN 2 Singosari sukses menggelar Lomba Kompetensi Siswa (LKS) SMK tingkat Kabupaten Malang selama dua hari sejak Senin (6/3). Hasilnya, 13 siswa berhasil meraih prestasi dengan 6 bidang lomba lolos ke tingkat Provinsi Jawa Timur.',
      date: '2023-03-06',
      category: 'Kompetisi'
    },
    {
      id: '2',
      image: '/images/placeholder.jpg',
      title: 'Juara 1 Lomba Karya Tulis Ilmiah Tingkat Nasional',
      description: 'Tim siswa SMKN 2 Singosari berhasil meraih juara 1 dalam Lomba Karya Tulis Ilmiah yang diselenggarakan oleh Kementerian Pendidikan dan Kebudayaan dengan tema Inovasi Teknologi untuk Masa Depan.',
      date: '2023-08-15',
      category: 'Akademik'
    },
    {
      id: '3',
      image: '/images/placeholder.jpg',
      title: 'Prestasi di Kompetisi Robotik Internasional',
      description: 'Siswa jurusan Teknik Mekatronika membawa pulang medali emas dalam kompetisi robotik internasional yang diadakan di Singapura, menunjukkan kemampuan tinggi dalam bidang teknologi.',
      date: '2023-11-20',
      category: 'Internasional'
    },
    {
      id: '4',
      image: '/images/placeholder.jpg',
      title: 'Akreditasi Unggul untuk Program Keahlian RPL',
      description: 'Program Keahlian Rekayasa Perangkat Lunak SMKN 2 Singosari mendapat akreditasi unggul dari Badan Akreditasi Nasional, menjadikan program ini sebagai salah satu yang terbaik di Indonesia.',
      date: '2024-01-10',
      category: 'Akreditasi'
    },
    {
      id: '5',
      image: '/images/placeholder.jpg',
      title: 'Kerjasama dengan Industri Teknologi Terdepan',
      description: 'SMKN 2 Singosari menjalin kerjasama strategis dengan perusahaan teknologi terkemuka untuk memberikan pengalaman praktis kepada siswa dalam dunia kerja nyata.',
      date: '2024-02-05',
      category: 'Kerjasama'
    }
  ];

  let filteredAchievements = allAchievements;
  
  if (category) {
    filteredAchievements = allAchievements.filter(a => a.category === category);
  }

  const paginatedData = filteredAchievements.slice(offset, offset + limit);

  return {
    data: paginatedData,
    total: filteredAchievements.length
  };
});
