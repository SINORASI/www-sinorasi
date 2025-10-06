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
      category: 'Olahraga',
      icon: 'lucide:dribbble',
      description: 'Ekstrakurikuler basket untuk pengembangan keterampilan dan prestasi di bidang olahraga',
      fullDescription: '<p>Ekstrakurikuler basket sekolah kami telah berdiri sejak tahun 2019 dan menjadi salah satu wadah pengembangan bakat siswa di bidang olahraga. Dengan fasilitas lapangan yang memadai dan bimbingan pelatih berpengalaman, kami berkomitmen membentuk karakter sportif dan jiwa kompetitif siswa.</p><p>Kegiatan latihan rutin dilaksanakan tiga kali seminggu dengan fokus pada pengembangan teknik dasar, strategi permainan, dan pembentukan mental juara yang kuat untuk menghadapi berbagai kompetisi.</p>',
      image: '/images/placeholder.jpg',
      coach: 'Coach Budi Santoso',
      schedule: 'Senin, Rabu, Jumat - 15:30-17:00 WIB',
      location: 'Lapangan Basket Sekolah',
      fee: 'Rp 150.000/bulan',
      memberCount: 50,
      achievementCount: 10,
      yearEstablished: 2019,
      meetingsPerWeek: 3,
      registrationOpen: true,
      registrationPeriod: 'Pendaftaran dibuka: 1-31 Juli 2024',
      contactInfo: 'Coach Budi: 0812-3456-7890',
      requirements: [
        'Siswa aktif kelas 7-11',
        'Mengisi formulir pendaftaran',
        'Surat persetujuan orang tua',
        'Sertifikat kesehatan',
        'Pas foto 3x4 (2 lembar)'
      ],
      activities: [
        {
          id: '1',
          image: '/images/placeholder.jpg',
          title: 'Kejuaraan Antar Sekolah Se-Surabaya',
          description: 'Tim basket putra berhasil meraih juara 2 dalam kompetisi bergengsi yang diikuti 32 sekolah menengah atas di Surabaya dengan persaingan yang sangat ketat',
          date: '15 Maret 2024'
        },
        {
          id: '2',
          image: '/images/placeholder.jpg',
          title: 'Pelatihan Intensif Teknik Dasar',
          description: 'Mengadakan pelatihan khusus bersama pelatih profesional untuk meningkatkan kemampuan dribbling, shooting, dan passing seluruh anggota ekstrakurikuler',
          date: '20 April 2024'
        },
        {
          id: '3',
          image: '/images/placeholder.jpg',
          title: 'Turnamen Internal Antar Kelas',
          description: 'Event tahunan yang melibatkan seluruh siswa sekolah dalam kompetisi basket antar kelas untuk mempererat tali persaudaraan dan sportivitas',
          date: '10 Mei 2024'
        },
        {
          id: '4',
          image: '/images/placeholder.jpg',
          title: 'Workshop Strategi Permainan',
          description: 'Sesi pembelajaran mendalam tentang taktik dan strategi permainan basket modern yang dipimpin langsung oleh mantan pemain profesional',
          date: '5 Juni 2024'
        }
      ]
    },
    {
      id: '2',
      slug: 'paskibra',
      name: 'PASKIBRA',
      category: 'Bela Negara',
      icon: 'lucide:flag',
      description: 'Pasukan Pengibar Bendera Pusaka yang melatih kedisiplinan dan kepemimpinan',
      fullDescription: '<p>Pasukan Pengibar Bendera Pusaka (PASKIBRA) SMKN 2 Singosari adalah unit ekstrakurikuler yang berfokus pada pembentukan karakter disiplin, tanggung jawab, dan jiwa kepemimpinan.</p><p>Sejak berdiri tahun 2009, PASKIBRA kami telah menorehkan berbagai prestasi di tingkat kota dan provinsi. Anggota PASKIBRA dilatih dalam PBB (Peraturan Baris-Berbaris), upacara bendera, dan pengibaran bendera dengan standar militer.</p>',
      image: '/images/placeholder.jpg',
      coach: 'Pak Agung Prasetyo',
      schedule: 'Selasa, Kamis, Sabtu - 15:00-17:00 WIB',
      location: 'Lapangan Upacara',
      fee: 'Gratis',
      memberCount: 50,
      achievementCount: 50,
      yearEstablished: 2009,
      meetingsPerWeek: 3,
      registrationOpen: true,
      registrationPeriod: 'Pendaftaran dibuka: 1-31 Juli 2024',
      contactInfo: 'Miftahul: 083839717167',
      requirements: [
        'Siswa aktif kelas 10-11',
        'Tinggi badan minimal 165cm (putra) / 160cm (putri)',
        'Mengisi formulir pendaftaran',
        'Surat persetujuan orang tua',
        'Sertifikat kesehatan'
      ],
      activities: [
        {
          id: '1',
          image: '/images/placeholder.jpg',
          title: 'Juara Umum Lomba PBB Tingkat Kota',
          description: 'PASKIBRA berhasil meraih juara umum dalam lomba PBB tingkat kota yang diikuti 50 sekolah',
          date: '17 Agustus 2024'
        },
        {
          id: '2',
          image: '/images/placeholder.jpg',
          title: 'Pelatihan Kepemimpinan',
          description: 'Workshop kepemimpinan dan team building untuk meningkatkan kekompakan tim',
          date: '12 September 2024'
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
