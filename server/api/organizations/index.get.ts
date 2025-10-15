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
    },
    {
      id: '3',
      slug: 'pramuka',
      name: 'Pramuka',
      logo: '/images/logo.webp',
      description: 'Gerakan Pramuka adalah organisasi pendidikan nonformal yang bertujuan membentuk karakter siswa melalui kegiatan kepramukaan yang menyenangkan dan mendidik.',
      history: 'Pramuka di SMK Negeri 2 Singosari telah lama menjadi bagian dari kegiatan ekstrakurikuler yang membantu siswa mengembangkan keterampilan survival, kepemimpinan, dan jiwa sosial.',
      established: '2010',
      statistics: {
        members: 60,
        programs: 40,
        years: 14,
        meetings: 4
      },
      contactInfo: {
        instagram: [
          { label: 'Pramuka SMK 2 SGS', handle: '@pramuka_smkn2' },
          { label: 'SMKn 2 SGS', handle: '@smkn2_singosari' }
        ],
        whatsapp: [
          { label: 'Ketua Pramuka', number: '081234567891' },
          { label: 'Pembina', number: '089876543211' }
        ],
        socialMedia: [
          { platform: 'instagram', handle: 'pramuka_smkn2' }
        ]
      },
      leadership: {
        sekretaris: [
          { id: 's2', name: 'Sekretaris Pramuka', image: '/images/profile-placeholder.png', position: 'Sekretaris' }
        ],
        ketua: [
          { id: 'k2', name: 'Ketua Pramuka', image: '/images/profile-placeholder.png', position: 'Ketua' }
        ],
        wakil: [
          { id: 'w2', name: 'Wakil Ketua Pramuka', image: '/images/profile-placeholder.png', position: 'Wakil Ketua' }
        ],
        bendahara: [
          { id: 'b2', name: 'Bendahara Pramuka', image: '/images/profile-placeholder.png', position: 'Bendahara' }
        ]
      },
      sections: [
        {
          id: 'seksi-pramuka-1',
          name: 'SEKSI KEPRAMUKAN',
          image: '/images/profile-placeholder.png',
          visi: 'Membentuk generasi muda yang tangguh dan berakhlak mulia',
          misi: 'Mengembangkan keterampilan kepramukaan melalui kegiatan rutin dan program edukasi',
          tasks: 'Mengorganisir kegiatan jambore, latihan survival, dan pendidikan karakter',
          programs: [
            'Latihan dasar kepramukaan',
            'Kegiatan jambore',
            'Pelatihan survival',
            'Pendidikan lingkungan',
            'Kegiatan sosial'
          ],
          members: [
            { id: 'm6', name: 'Pembina Pramuka', image: '/images/profile-placeholder.png', position: 'Pembina' },
            { id: 'm7', name: 'Anggota 1', image: '/images/profile-placeholder.png', position: 'Anggota' },
            { id: 'm8', name: 'Anggota 2', image: '/images/profile-placeholder.png', position: 'Anggota' }
          ]
        }
      ],
      activities: [
        {
          id: 'a5',
          image: '/images/placeholder.jpg',
          title: 'Jambore Pramuka',
          description: 'Kegiatan jambore tahunan yang melibatkan berbagai kegiatan kepramukaan dan pendidikan karakter.',
          date: '2024-08-15'
        },
        {
          id: 'a6',
          image: '/images/placeholder.jpg',
          title: 'Latihan Survival',
          description: 'Pelatihan keterampilan survival di alam terbuka untuk membentuk mental yang tangguh.',
          date: '2024-09-20'
        }
      ],
      recruitmentPoster: '/images/placeholder.jpg',
      recruitmentPeriod: '1-15 Agustus 2024'
    },
    {
      id: '4',
      slug: 'futsal-club',
      name: 'Futsal Club',
      logo: '/images/logo.webp',
      description: 'Klub futsal sekolah yang fokus pada pengembangan kemampuan olahraga dan sportivitas siswa melalui latihan rutin dan kompetisi.',
      history: 'Futsal Club didirikan untuk memberikan wadah bagi siswa yang memiliki minat di bidang olahraga futsal dan membangun semangat kebersamaan.',
      established: '2012',
      statistics: {
        members: 35,
        programs: 25,
        years: 12,
        meetings: 5
      },
      contactInfo: {
        instagram: [
          { label: 'Futsal SMK 2 SGS', handle: '@futsal_smkn2' }
        ],
        whatsapp: [
          { label: 'Kapten Futsal', number: '081234567892' }
        ],
        socialMedia: [
          { platform: 'instagram', handle: 'futsal_smkn2' }
        ]
      },
      leadership: {
        ketua: [
          { id: 'k3', name: 'Kapten Futsal', image: '/images/profile-placeholder.png', position: 'Kapten' }
        ],
        wakil: [
          { id: 'w3', name: 'Wakil Kapten', image: '/images/profile-placeholder.png', position: 'Wakil Kapten' }
        ]
      },
      sections: [],
      activities: [
        {
          id: 'a7',
          image: '/images/placeholder.jpg',
          title: 'Turnamen Futsal',
          description: 'Kompetisi futsal antar sekolah yang diikuti oleh tim futsal SMK Negeri 2 Singosari.',
          date: '2024-10-05'
        }
      ],
      recruitmentPoster: '/images/placeholder.jpg',
      recruitmentPeriod: '1-30 September 2024'
    },
    {
      id: '5',
      slug: 'english-club',
      name: 'English Club',
      logo: '/images/logo.webp',
      description: 'Klub bahasa Inggris yang bertujuan meningkatkan kemampuan berbahasa Inggris siswa melalui berbagai kegiatan edukasi dan hiburan.',
      history: 'English Club dibentuk untuk mendukung program bilingual sekolah dan membantu siswa menguasai bahasa internasional.',
      established: '2015',
      statistics: {
        members: 45,
        programs: 20,
        years: 9,
        meetings: 3
      },
      contactInfo: {
        instagram: [
          { label: 'English Club SMK 2', handle: '@englishclub_smkn2' }
        ],
        whatsapp: [
          { label: 'Koordinator English', number: '081234567893' }
        ],
        socialMedia: [
          { platform: 'instagram', handle: 'englishclub_smkn2' }
        ]
      },
      leadership: {
        ketua: [
          { id: 'k4', name: 'Ketua English Club', image: '/images/profile-placeholder.png', position: 'Ketua' }
        ],
        sekretaris: [
          { id: 's3', name: 'Sekretaris English', image: '/images/profile-placeholder.png', position: 'Sekretaris' }
        ]
      },
      sections: [
        {
          id: 'seksi-english-1',
          name: 'SEKSI SPEAKING',
          image: '/images/profile-placeholder.png',
          visi: 'Menjadi pusat pengembangan kemampuan speaking bahasa Inggris',
          misi: 'Melaksanakan kegiatan speaking club dan debat bahasa Inggris',
          tasks: 'Mengorganisir public speaking, debate competition, dan English conversation',
          programs: [
            'Public speaking training',
            'English debate',
            'Conversation club',
            'English movie night',
            'Writing workshop'
          ],
          members: [
            { id: 'm9', name: 'Koordinator Speaking', image: '/images/profile-placeholder.png', position: 'Koordinator' },
            { id: 'm10', name: 'Anggota Speaking', image: '/images/profile-placeholder.png', position: 'Anggota' }
          ]
        }
      ],
      activities: [
        {
          id: 'a8',
          image: '/images/placeholder.jpg',
          title: 'English Debate Competition',
          description: 'Kompetisi debat bahasa Inggris antar siswa untuk meningkatkan kemampuan berargumentasi.',
          date: '2024-11-10'
        },
        {
          id: 'a9',
          image: '/images/placeholder.jpg',
          title: 'Public Speaking Workshop',
          description: 'Workshop public speaking yang melatih kepercayaan diri dan kemampuan presentasi.',
          date: '2024-12-01'
        }
      ],
      recruitmentPoster: '/images/placeholder.jpg',
      recruitmentPeriod: '15 Oktober - 15 November 2024'
    },
    {
      id: '6',
      slug: 'robotics-club',
      name: 'Robotics Club',
      logo: '/images/logo.webp',
      description: 'Klub robotika yang fokus pada pengembangan inovasi teknologi melalui pembuatan dan pemrograman robot untuk kompetisi dan proyek edukasi.',
      history: 'Robotics Club didirikan untuk menyalurkan minat siswa di bidang teknologi dan STEM, khususnya di jurusan RPL dan TKJ.',
      established: '2018',
      statistics: {
        members: 25,
        programs: 15,
        years: 6,
        meetings: 4
      },
      contactInfo: {
        instagram: [
          { label: 'Robotics SMK 2 SGS', handle: '@robotics_smkn2' }
        ],
        whatsapp: [
          { label: 'Ketua Robotics', number: '081234567894' }
        ],
        socialMedia: [
          { platform: 'instagram', handle: 'robotics_smkn2' },
          { platform: 'youtube', handle: 'Robotics SMK Negeri 2 Singosari' }
        ]
      },
      leadership: {
        ketua: [
          { id: 'k5', name: 'Ketua Robotics Club', image: '/images/profile-placeholder.png', position: 'Ketua' }
        ],
        wakil: [
          { id: 'w4', name: 'Wakil Ketua Robotics', image: '/images/profile-placeholder.png', position: 'Wakil Ketua' }
        ]
      },
      sections: [
        {
          id: 'seksi-robotics-1',
          name: 'SEKSI PEMROGRAMAN',
          image: '/images/profile-placeholder.png',
          visi: 'Menjadi pusat inovasi robotika dan pemrograman',
          misi: 'Mengembangkan robot untuk kompetisi dan proyek edukasi',
          tasks: 'Membuat robot untuk kontes robot, workshop Arduino, dan proyek IoT',
          programs: [
            'Robot contest preparation',
            'Arduino workshop',
            'IoT project development',
            '3D printing training',
            'AI and machine learning introduction'
          ],
          members: [
            { id: 'm11', name: 'Programmer Lead', image: '/images/profile-placeholder.png', position: 'Lead Programmer' },
            { id: 'm12', name: 'Hardware Specialist', image: '/images/profile-placeholder.png', position: 'Hardware Specialist' }
          ]
        }
      ],
      activities: [
        {
          id: 'a10',
          image: '/images/placeholder.jpg',
          title: 'Robot Contest',
          description: 'Kompetisi robot yang dibuat oleh anggota klub untuk berbagai kategori perlombaan.',
          date: '2025-01-15'
        },
        {
          id: 'a11',
          image: '/images/placeholder.jpg',
          title: 'Arduino Workshop',
          description: 'Workshop pembuatan proyek sederhana menggunakan Arduino dan sensor.',
          date: '2024-12-20'
        }
      ],
      recruitmentPoster: '/images/placeholder.jpg',
      recruitmentPeriod: '1-31 Desember 2024'
    }
  ];

  const paginatedData = allOrganizations.slice(offset, offset + limit);

  return {
    data: paginatedData,
    total: allOrganizations.length
  };
});
