import type { Organization } from '~/models/Organization';

export default defineEventHandler(async (event): Promise<{ data: Organization[], total: number }> => {
  const query = getQuery(event);
  const limit = parseInt(query.limit as string) || 10;
  const offset = parseInt(query.offset as string) || 0;

  const allOrganizations: Organization[] = [
    {
      id: '1',
      slug: 'osis',
      name: 'OSIS',
      logo: '/images/placeholder.jpg',
      description: 'Organisasi Siswa Intra Sekolah yang menjadi wadah bagi siswa untuk mengembangkan potensi dan kreativitas.',
      history: 'Didirikan sejak tahun 2000, OSIS telah menjadi pilar utama dalam kegiatan siswa. OSIS SMKN 2 Singosari telah berhasil menyelenggarakan berbagai kegiatan yang bermanfaat bagi siswa, mulai dari kegiatan akademik hingga kegiatan sosial. Dengan semangat kebersamaan dan kreativitas, OSIS terus berkembang dan memberikan kontribusi positif bagi sekolah.',
      established: '2000',
      statistics: {
        members: 45,
        programs: 12,
        years: 24,
        meetings: 48
      },
      contactInfo: {
        instagram: [{ label: 'Instagram', handle: '@osis_smkn2' }],
        whatsapp: [{ label: 'WhatsApp', number: '+6281234567890' }]
      },
      leadership: {
        ketua: [{
          id: '1',
          name: 'Ahmad Rahman',
          image: '/images/profile-placeholder.png',
          position: 'Ketua OSIS'
        }],
        wakil: [{
          id: '2',
          name: 'Siti Nurhaliza',
          image: '/images/profile-placeholder.png',
          position: 'Wakil Ketua OSIS'
        }],
        sekretaris: [{
          id: '3',
          name: 'Budi Santoso',
          image: '/images/profile-placeholder.png',
          position: 'Sekretaris'
        }],
        bendahara: [{
          id: '4',
          name: 'Maya Sari',
          image: '/images/profile-placeholder.png',
          position: 'Bendahara'
        }]
      },
      sections: [
        {
          id: '1',
          name: 'Bidang Akademik',
          image: '/images/placeholder.jpg',
          visi: 'Meningkatkan prestasi akademik siswa melalui berbagai program pembelajaran',
          misi: 'Menyelenggarakan bimbingan belajar, workshop akademik, dan kompetisi ilmiah',
          tasks: 'Koordinasi program akademik, pembinaan siswa berprestasi',
          programs: ['Bimbingan Belajar Gratis', 'Workshop Matematika', 'Lomba Cerdas Cermat'],
          members: [
            { id: '1', name: 'Ahmad Rahman', image: '/images/profile-placeholder.png', position: 'Koordinator' },
            { id: '2', name: 'Siti Nurhaliza', image: '/images/profile-placeholder.png', position: 'Anggota' }
          ]
        },
        {
          id: '2',
          name: 'Bidang Olahraga',
          image: '/images/placeholder.jpg',
          visi: 'Mengembangkan bakat olahraga siswa dan meningkatkan kesehatan',
          misi: 'Menyelenggarakan turnamen olahraga dan kegiatan kesehatan',
          tasks: 'Pengorganisasian event olahraga, pembinaan atlet siswa',
          programs: ['Turnamen Basket', 'Senam Pagi', 'Marathon Sekolah'],
          members: [
            { id: '3', name: 'Budi Santoso', image: '/images/profile-placeholder.png', position: 'Koordinator' },
            { id: '4', name: 'Maya Sari', image: '/images/profile-placeholder.png', position: 'Anggota' }
          ]
        }
      ],
      activities: []
    },
    {
      id: '2',
      slug: 'paskibra',
      name: 'PASKIBRA',
      logo: '/images/placeholder.jpg',
      description: 'Pasukan Pengibar Bendera yang bertugas dalam upacara bendera dan kegiatan kepramukaan.',
      history: 'PASKIBRA didirikan untuk menjaga tradisi upacara dan membentuk karakter siswa. Dengan disiplin dan dedikasi tinggi, PASKIBRA SMKN 2 Singosari telah menjadi contoh bagi sekolah lain dalam menjalankan upacara bendera yang khidmat dan bermakna.',
      established: '2010',
      statistics: {
        members: 32,
        programs: 8,
        years: 14,
        meetings: 24
      },
      contactInfo: {
        instagram: [{ label: 'Instagram', handle: '@paskibra_smkn2' }]
      },
      leadership: {
        ketua: [{
          id: '5',
          name: 'Rizki Pratama',
          image: '/images/profile-placeholder.png',
          position: 'Komandan PASKIBRA'
        }],
        wakil: [{
          id: '6',
          name: 'Dina Amelia',
          image: '/images/profile-placeholder.png',
          position: 'Wakil Komandan'
        }]
      },
      sections: [
        {
          id: '1',
          name: 'Tim Upacara',
          image: '/images/placeholder.jpg',
          visi: 'Menjadi tim upacara yang profesional dan bermartabat',
          misi: 'Melaksanakan upacara bendera dengan baik dan benar',
          tasks: 'Pelatihan upacara, pengibaran bendera',
          programs: ['Upacara Bendera Harian', 'Pelatihan Paskibra', 'Kompetisi Paskibra'],
          members: [
            { id: '5', name: 'Rizki Pratama', image: '/images/profile-placeholder.png', position: 'Komandan' },
            { id: '6', name: 'Dina Amelia', image: '/images/profile-placeholder.png', position: 'Anggota' }
          ]
        }
      ],
      activities: []
    },
    {
      id: '3',
      slug: 'pmr',
      name: 'PMR',
      logo: '/images/placeholder.jpg',
      description: 'Palang Merah Remaja yang fokus pada kegiatan kemanusiaan dan pertolongan pertama.',
      history: 'PMR telah berperan aktif dalam kegiatan sosial dan kesehatan siswa. Dengan semangat kemanusiaan, PMR SMKN 2 Singosari terus memberikan pelayanan kesehatan dan bantuan sosial kepada masyarakat sekitar sekolah.',
      established: '2005',
      statistics: {
        members: 28,
        programs: 15,
        years: 19,
        meetings: 36
      },
      leadership: {
        ketua: [{
          id: '7',
          name: 'Fajar Nugroho',
          image: '/images/profile-placeholder.png',
          position: 'Ketua PMR'
        }],
        sekretaris: [{
          id: '8',
          name: 'Lina Kusuma',
          image: '/images/profile-placeholder.png',
          position: 'Sekretaris'
        }]
      },
      sections: [
        {
          id: '1',
          name: 'Tim Kesehatan',
          image: '/images/placeholder.jpg',
          visi: 'Menjadi garda terdepan dalam pelayanan kesehatan siswa',
          misi: 'Memberikan pertolongan pertama dan edukasi kesehatan',
          tasks: 'Pertolongan pertama, penyuluhan kesehatan, donor darah',
          programs: ['UKS Sekolah', 'Donor Darah', 'Penyuluhan Kesehatan'],
          members: [
            { id: '7', name: 'Fajar Nugroho', image: '/images/profile-placeholder.png', position: 'Ketua' },
            { id: '8', name: 'Lina Kusuma', image: '/images/profile-placeholder.png', position: 'Sekretaris' }
          ]
        }
      ],
      activities: []
    },
    {
      id: '4',
      slug: 'linorasi',
      name: 'LINORASI',
      logo: '/images/placeholder.jpg',
      description: 'Litbang Inovasi Raih Prestasi yang fokus pada pengembangan inovasi dan prestasi siswa.',
      history: 'LINORASI didirikan untuk mendorong inovasi dan pencapaian prestasi siswa. Melalui berbagai program inovatif, LINORASI telah berhasil membawa nama sekolah ke tingkat yang lebih tinggi dalam berbagai kompetisi dan ajang prestasi.',
      established: '2018',
      statistics: {
        members: 25,
        programs: 20,
        years: 6,
        meetings: 30
      },
      leadership: {
        ketua: [{
          id: '9',
          name: 'Eko Prasetyo',
          image: '/images/profile-placeholder.png',
          position: 'Ketua LINORASI'
        }],
        wakil: [{
          id: '10',
          name: 'Rina Amelia',
          image: '/images/profile-placeholder.png',
          position: 'Wakil Ketua'
        }]
      },
      sections: [
        {
          id: '1',
          name: 'Tim Inovasi',
          image: '/images/placeholder.jpg',
          visi: 'Mendorong inovasi siswa untuk kemajuan sekolah',
          misi: 'Mengembangkan kreativitas dan kemampuan siswa melalui inovasi',
          tasks: 'Pengembangan proyek inovasi, mentoring siswa',
          programs: ['Innovation Camp', 'Science Fair', 'Robotik Competition'],
          members: [
            { id: '9', name: 'Eko Prasetyo', image: '/images/profile-placeholder.png', position: 'Ketua' },
            { id: '10', name: 'Rina Amelia', image: '/images/profile-placeholder.png', position: 'Wakil Ketua' }
          ]
        }
      ],
      activities: []
    },
    {
      id: '5',
      slug: 'bdi',
      name: 'BDI',
      logo: '/images/placeholder.jpg',
      description: 'Badan Dakwah Islam yang fokus pada pengembangan spiritual dan kegiatan keagamaan.',
      history: 'BDI didirikan untuk memperkuat nilai-nilai keislaman di lingkungan sekolah. Dengan berbagai program keagamaan, BDI telah berhasil menciptakan lingkungan yang kondusif untuk pengembangan spiritual siswa.',
      established: '2008',
      statistics: {
        members: 35,
        programs: 18,
        years: 16,
        meetings: 40
      },
      leadership: {
        ketua: [{
          id: '11',
          name: 'Ahmad Fauzi',
          image: '/images/profile-placeholder.png',
          position: 'Ketua BDI'
        }],
        sekretaris: [{
          id: '12',
          name: 'Nur Hasanah',
          image: '/images/profile-placeholder.png',
          position: 'Sekretaris'
        }]
      },
      sections: [
        {
          id: '1',
          name: 'Tim Dakwah',
          image: '/images/placeholder.jpg',
          visi: 'Menjadi pusat pengembangan spiritual siswa muslim',
          misi: 'Menyelenggarakan kegiatan keagamaan dan pengembangan karakter',
          tasks: 'Pengajian rutin, kajian islam, kegiatan sosial keagamaan',
          programs: ['Pengajian Rutin', 'Kajian Islam', 'Bakti Sosial', 'Ramadhan Program'],
          members: [
            { id: '11', name: 'Ahmad Fauzi', image: '/images/profile-placeholder.png', position: 'Ketua' },
            { id: '12', name: 'Nur Hasanah', image: '/images/profile-placeholder.png', position: 'Sekretaris' }
          ]
        }
      ],
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
