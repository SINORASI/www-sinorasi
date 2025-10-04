import type { Extracurricular } from '~/models/Extracurricular';

export default defineEventHandler(async (event): Promise<{ data: Extracurricular[], total: number }> => {
  // TODO: Replace with actual API call
  // const response = await $fetch('https://your-api.com/api/extracurriculars');
  
  const query = getQuery(event);
  const limit = parseInt(query.limit as string) || 10;
  const offset = parseInt(query.offset as string) || 0;

  // Mock data
  const allExtracurriculars: Extracurricular[] = [
    {
      id: '1',
      slug: 'basket',
      name: 'Basket',
      description: 'Ekstrakurikuler basket sekolah kami telah berdiri sejak tahun 2019 dan menjadi salah satu wadah pengembangan bakat siswa di bidang olahraga. Dengan fasilitas lapangan yang memadai dan bimbingan pelatih berpengalaman, kami berkomitmen membentuk karakter sportif dan jiwa kompetitif siswa.',
      image: '/images/placeholder.jpg',
      established: '2019',
      statistics: {
        members: 50,
        achievements: 10,
        years: 5,
        meetings: 3
      },
      registrationInfo: {
        schedule: 'Senin, Rabu, Jumat',
        time: '15.30 - 17.30 WIB',
        location: 'Lapangan Basket Sekolah',
        fee: 'Rp 150.000/bulan',
        requirements: [
          'Siswa aktif kelas 7-11',
          'Mengisi formulir pendaftaran',
          'Surat persetujuan orang tua',
          'Sertifikat kesehatan',
          'Pas foto 3x4 (2 lembar)'
        ],
        contact: [
          { name: 'Coach Budi', phone: '0812-3456-7890' }
        ]
      },
      activities: []
    },
    {
      id: '2',
      slug: 'paskibra',
      name: 'PASKIBRA',
      description: 'Pasukan Pengibar Bendera Pusaka yang melatih kedisiplinan, kepemimpinan, dan kecintaan pada tanah air.',
      image: '/images/placeholder.jpg',
      established: '2009',
      statistics: {
        members: 50,
        achievements: 50,
        years: 15,
        meetings: 3
      },
      registrationInfo: {
        schedule: 'Selasa, Kamis',
        time: '15.00 - 17.00 WIB',
        location: 'Lapangan Upacara',
        fee: 'Gratis',
        requirements: [
          'Siswa aktif kelas 10-11',
          'Tinggi badan minimal 165cm (putra) / 160cm (putri)',
          'Mengisi formulir pendaftaran',
          'Surat persetujuan orang tua',
          'Sertifikat kesehatan'
        ],
        contact: [
          { name: 'Miftahul', phone: '083839717167' },
          { name: 'Fauzia', phone: '081234567890' }
        ]
      },
      activities: []
    }
  ];

  const paginatedData = allExtracurriculars.slice(offset, offset + limit);

  return {
    data: paginatedData,
    total: allExtracurriculars.length
  };
});
