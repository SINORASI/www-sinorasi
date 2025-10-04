import type { Extracurricular } from '~/models/Extracurricular';

export default defineEventHandler(async (event): Promise<Extracurricular | null> => {
  const slug = getRouterParam(event, 'slug');
  
  // TODO: Replace with actual API call
  // const extracurricular = await $fetch(`https://your-api.com/api/extracurriculars/${slug}`);
  
  // Mock data
  const extracurriculars: Extracurricular[] = [
    {
      id: '1',
      slug: 'basket',
      name: 'Basket',
      description: 'Ekstrakurikuler basket sekolah kami telah berdiri sejak tahun 2019 dan menjadi salah satu wadah pengembangan bakat siswa di bidang olahraga. Dengan fasilitas lapangan yang memadai dan bimbingan pelatih berpengalaman, kami berkomitmen membentuk karakter sportif dan jiwa kompetitif siswa. Kegiatan latihan rutin dilaksanakan tiga kali seminggu dengan fokus pada pengembangan teknik dasar, strategi permainan, dan pembentukan mental juara yang kuat untuk menghadapi berbagai kompetisi.',
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
      activities: [
        {
          id: '1',
          image: '/images/placeholder.jpg',
          title: 'Kejuaraan Antar Sekolah Se-Surabaya',
          description: 'Tim basket putra berhasil meraih juara 2 dalam kompetisi bergengsi yang diikuti 32 sekolah menengah atas di Surabaya dengan persaingan yang sangat ketat',
          date: '2024-03-15'
        },
        {
          id: '2',
          image: '/images/placeholder.jpg',
          title: 'Pelatihan Intensif Teknik Dasar',
          description: 'Mengadakan pelatihan khusus bersama pelatih profesional untuk meningkatkan kemampuan dribbling, shooting, dan passing seluruh anggota ekstrakurikuler',
          date: '2024-04-20'
        },
        {
          id: '3',
          image: '/images/placeholder.jpg',
          title: 'Turnamen Internal Antar Kelas',
          description: 'Event tahunan yang melibatkan seluruh siswa sekolah dalam kompetisi basket antar kelas untuk mempererat tali persaudaraan dan sportivitas',
          date: '2024-05-10'
        },
        {
          id: '4',
          image: '/images/placeholder.jpg',
          title: 'Workshop Strategi Permainan',
          description: 'Sesi pembelajaran mendalam tentang taktik dan strategi permainan basket modern yang dipimpin langsung oleh mantan pemain profesional',
          date: '2024-06-05'
        }
      ]
    }
  ];

  const extracurricular = extracurriculars.find(e => e.slug === slug);
  
  if (!extracurricular) {
    throw createError({
      statusCode: 404,
      message: 'Extracurricular not found'
    });
  }

  return extracurricular;
});
