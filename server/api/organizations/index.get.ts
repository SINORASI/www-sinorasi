import type { Organization } from '~/models/Organization';

export default defineEventHandler(async (event): Promise<{ data: Organization[], total: number }> => {
  // TODO: Replace with actual API call
  // const response = await $fetch('https://your-api.com/api/organizations');
  
  const query = getQuery(event);
  const limit = parseInt(query.limit as string) || 10;
  const offset = parseInt(query.offset as string) || 0;

  // Mock data
  const allOrganizations: Organization[] = [
    {
      id: '1',
      slug: 'paskibra',
      name: 'PASKIBRA',
      logo: '/images/logo.webp',
      description: 'Pasukan Pengibar Bendera Pusaka adalah organisasi yang melatih kedisiplinan, kepemimpinan, dan kecintaan pada tanah air melalui latihan baris berbaris dan upacara.',
      history: 'Caranya gampang banget, kamu cuman perlu ngumpulin temen temen yang minat ekstrakurikulernya sama sepertimu, untuk membuat komunitas ekstrakurikuler baru baru, minimal kamu membutuhkan 10 orang atau lebih. setelah itu kalian dapat menghubungi pihak OSIS SMK Negeri 2 Singosari untuk menyampaikan bahwa kalian ingin membuat komunitas ekstrakurikuler baru, dan nantinya dari pihak OSIS akan menyampaikan aspirasi kalian kepada WAKA KESISWAAN atau yang bersangkutan.',
      established: '2009',
      statistics: {
        members: 50,
        programs: 50,
        years: 15,
        meetings: 3
      },
      contactInfo: {
        instagram: [
          { label: 'Miftahul', handle: '@v_seto_v7' },
          { label: 'SMKn 2 SGS', handle: '@smkn2_singosari' },
          { label: 'OSIS', handle: '@osis.stemdasil' }
        ],
        whatsapp: [
          { label: 'Miftahul', number: '083839717167' },
          { label: 'Fauzia', number: '081234567890' },
          { label: 'Admin', number: '089876543210' }
        ],
        socialMedia: [
          { platform: 'facebook', handle: 'SmkndusSingosari' },
          { platform: 'tiktok', handle: 'smkn2_singosari' },
          { platform: 'instagram', handle: 'smkn2_singosari' },
          { platform: 'youtube', handle: 'SMK NEGERI 2 SINGOSARI Official' }
        ]
      },
      leadership: {
        sekretaris: [
          { id: 's1', name: 'Sekretaris 1', image: '/images/profile-placeholder.png', position: 'Sekretaris' }
        ],
        ketua: [
          { id: 'k1', name: 'Ketua PASKIBRA', image: '/images/profile-placeholder.png', position: 'Ketua' }
        ],
        wakil: [
          { id: 'w1', name: 'Wakil Ketua', image: '/images/profile-placeholder.png', position: 'Wakil Ketua' }
        ],
        bendahara: [
          { id: 'b1', name: 'Bendahara 1', image: '/images/profile-placeholder.png', position: 'Bendahara' }
        ]
      },
      sections: [
        {
          id: 'seksi-1',
          name: 'SEKSI BIDANG 1',
          image: '/images/profile-placeholder.png',
          visi: 'Menjadi seksi bidang terdepan dalam pengembangan anggota',
          misi: 'Melaksanakan program kerja dengan konsisten dan penuh tanggung jawab',
          tasks: 'Mengkoordinir kegiatan latihan rutin, menyusun jadwal, dan mengevaluasi perkembangan anggota',
          programs: [
            'Latihan baris berbaris',
            'Pelatihan kepemimpinan',
            'Pembinaan mental dan fisik',
            'Koordinasi upacara',
            'Workshop kedisiplinan'
          ],
          members: [
            { id: 'm1', name: 'Sumiijah S.Pd M.Pd', image: '/images/profile-placeholder.png', position: 'Ketua Seksi' },
            { id: 'm2', name: 'Member 2', image: '/images/profile-placeholder.png', position: 'Anggota' },
            { id: 'm3', name: 'Member 3', image: '/images/profile-placeholder.png', position: 'Anggota' },
            { id: 'm4', name: 'Member 4', image: '/images/profile-placeholder.png', position: 'Anggota' },
            { id: 'm5', name: 'Member 5', image: '/images/profile-placeholder.png', position: 'Anggota' }
          ]
        }
      ],
      activities: [
        {
          id: 'a1',
          image: '/images/placeholder.jpg',
          title: 'Judul Aktivitas',
          description: 'cadet dpenengs dimasa aktivitas terhadiat walker aktivitasunt tentang aktivitas terhadiat walker dipetiengu tentang aktivitas terhadiat walker...',
          date: '2045-03-10'
        },
        {
          id: 'a2',
          image: '/images/placeholder.jpg',
          title: 'Judul Aktivitas',
          description: 'cadet dpenengs dimasa aktivitas terhadiat walker aktivitasunt tentang aktivitas terhadiat walker dipetiengu tentang aktivitas terhadiat walker...',
          date: '2045-03-10'
        },
        {
          id: 'a3',
          image: '/images/placeholder.jpg',
          title: 'Judul Aktivitas',
          description: 'cadet dpenengs dimasa aktivitas terhadiat walker aktivitasunt tentang aktivitas terhadiat walker dipetiengu tentang aktivitas terhadiat walker...',
          date: '2045-03-10'
        },
        {
          id: 'a4',
          image: '/images/placeholder.jpg',
          title: 'Judul Aktivitas',
          description: 'cadet dpenengs dimasa aktivitas terhadiat walker aktivitasunt tentang aktivitas terhadiat walker dipetiengu tentang aktivitas terhadiat walker...',
          date: '2045-03-10'
        }
      ],
      recruitmentPoster: '/images/placeholder.jpg',
      recruitmentPeriod: '1-31 Juli 2024'
    },
    {
      id: '2',
      slug: 'osis',
      name: 'OSIS',
      logo: '/images/logo.webp',
      description: 'Organisasi Siswa Intra Sekolah yang menjadi wadah bagi siswa untuk mengembangkan kemampuan berorganisasi, kepemimpinan, dan kreativitas.',
      statistics: {
        members: 40,
        programs: 30,
        years: 18,
        meetings: 2
      },
      leadership: {
        ketua: [
          { id: 'k1', name: 'Ketua OSIS', image: '/images/profile-placeholder.png', position: 'Ketua' }
        ]
      },
      sections: [],
      activities: []
    }
  ];

  const paginatedData = allOrganizations.slice(offset, offset + limit);

  return {
    data: paginatedData,
    total: allOrganizations.length
  };
});
