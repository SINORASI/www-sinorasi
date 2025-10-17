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
      logo: '/images/organisasi/OSIS.webp',
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
      activities: [
        { id: 'osis-act-1', image: '/images/placeholder.jpg', title: 'Workshop Akademik', description: 'Workshop untuk meningkatkan keterampilan dan pengetahuan akademik.', date: '2024-10-01' },
        { id: 'osis-act-2', image: '/images/placeholder.jpg', title: 'Turnamen Olahraga', description: 'Kompetisi olahraga tahunan yang mempromosikan kebugaran fisik.', date: '2024-11-15' },
        { id: 'osis-act-3', image: '/images/placeholder.jpg', title: 'Festival Budaya', description: 'Perayaan budaya siswa dan bakat seni.', date: '2024-12-20' }
      ]
    },
    {
      id: '3',
      slug: 'pmr',
      name: 'PMR',
      logo: '/images/organisasi/PMR.webp',
      description: 'Palang Merah Remaja yang fokus pada kegiatan kemanusiaan dan pertolongan pertama.',
      history: 'PMR telah berperan aktif dalam kegiatan sosial dan kesehatan siswa. Dengan semangat kemanusiaan, PMR SMKN 2 Singosari terus memberikan pelayanan kesehatan dan bantuan sosial kepada masyarakat sekitar sekolah.',
      established: '2005',
      statistics: {
        members: 16,
        programs: 15,
        years: 19,
        meetings: 36
      },
      leadership: {
        ketua: [{
          id: '7',
          name: 'Rasyika Salsabila',
          image: '/images/profile-placeholder.png',
          position: 'Ketua Umum'
        }],
        wakil: [{
          id: '8',
          name: 'Refli Maulana Izat',
          image: '/images/profile-placeholder.png',
          position: 'Wakil Ketua'
        }],
        sekretaris: [{
          id: '9',
          name: 'Chesylia Anggie Pertiwi',
          image: '/images/profile-placeholder.png',
          position: 'Sekretaris 1'
        }, {
          id: '10',
          name: 'Febby Anggun Cahyani',
          image: '/images/profile-placeholder.png',
          position: 'Sekretaris 2'
        }],
        bendahara: [{
          id: '11',
          name: 'Salvia Okta Difianti',
          image: '/images/profile-placeholder.png',
          position: 'Bendahara 1'
        }, {
          id: '12',
          name: 'Amelia Putri Irawati',
          image: '/images/profile-placeholder.png',
          position: 'Bendahara 2'
        }]
      },
      sections: [
        {
          id: '1',
          name: 'Divisi Kedisplinan',
          image: '/images/placeholder.jpg',
          visi: 'Menjaga kedisiplinan dan ketertiban di lingkungan sekolah',
          misi: 'Membentuk siswa yang disiplin dan bertanggung jawab',
          tasks: 'Pengawasan kedisiplinan, pembinaan siswa',
          programs: ['Patroli Sekolah', 'Pembinaan Karakter', 'Penegakan Tata Tertib'],
          members: [
            { id: '13', name: 'Mutia Amanda Saraphova', image: '/images/profile-placeholder.png', position: 'Koordinator' }
          ]
        },
        {
          id: '2',
          name: 'Divisi Perlengkapan',
          image: '/images/placeholder.jpg',
          visi: 'Menjadi pusat pengelolaan perlengkapan dan logistik',
          misi: 'Menyediakan dan mengelola kebutuhan perlengkapan organisasi',
          tasks: 'Pengadaan perlengkapan, inventarisasi, distribusi',
          programs: ['Manajemen Inventaris', 'Pengadaan Alat', 'Distribusi Logistik'],
          members: [
            { id: '14', name: 'Denis Widya', image: '/images/profile-placeholder.png', position: 'Koordinator' },
            { id: '15', name: 'Chanda Zulia Lestari', image: '/images/profile-placeholder.png', position: 'Anggota' }
          ]
        },
        {
          id: '3',
          name: 'Divisi Humas',
          image: '/images/placeholder.jpg',
          visi: 'Menjadi jembatan komunikasi antara organisasi dan masyarakat',
          misi: 'Menyampaikan informasi dan membangun citra positif',
          tasks: 'Publikasi kegiatan, media sosial, hubungan masyarakat',
          programs: ['Media Sosial', 'Publikasi', 'Event Promotion'],
          members: [
            { id: '16', name: 'Maulida Latifatul Ismi', image: '/images/profile-placeholder.png', position: 'Koordinator' }
          ]
        },
        {
          id: '4',
          name: 'Divisi Kesehatan 1',
          image: '/images/placeholder.jpg',
          visi: 'Menjadi garda terdepan dalam pelayanan kesehatan siswa',
          misi: 'Memberikan pertolongan pertama dan edukasi kesehatan',
          tasks: 'Pertolongan pertama, penyuluhan kesehatan, donor darah',
          programs: ['UKS Sekolah', 'Donor Darah', 'Penyuluhan Kesehatan'],
          members: [
            { id: '17', name: 'Nur Khasanah Fathiniyah', image: '/images/profile-placeholder.png', position: 'Koordinator' }
          ]
        },
        {
          id: '5',
          name: 'Divisi Kesehatan 2',
          image: '/images/placeholder.jpg',
          visi: 'Mendukung program kesehatan sekolah secara menyeluruh',
          misi: 'Melengkapi pelayanan kesehatan siswa',
          tasks: 'Pemeriksaan kesehatan, program kesehatan, emergency response',
          programs: ['Pemeriksaan Kesehatan', 'Program Kesehatan', 'Emergency Response'],
          members: [
            { id: '18', name: 'Bella Putri Rahmadhani', image: '/images/profile-placeholder.png', position: 'Koordinator' }
          ]
        },
        {
          id: '6',
          name: 'Divisi Keamanan 1',
          image: '/images/placeholder.jpg',
          visi: 'Menjaga keamanan dan ketertiban lingkungan sekolah',
          misi: 'Menciptakan lingkungan yang aman dan nyaman',
          tasks: 'Pengamanan area, patroli keamanan, pencegahan kejahatan',
          programs: ['Patroli Keamanan', 'Pengamanan Event', 'Pencegahan Kecelakaan'],
          members: [
            { id: '19', name: 'M. Divan Rossy', image: '/images/profile-placeholder.png', position: 'Koordinator' }
          ]
        },
        {
          id: '7',
          name: 'Divisi Keamanan 2',
          image: '/images/placeholder.jpg',
          visi: 'Mendukung keamanan sekolah secara komprehensif',
          misi: 'Melengkapi sistem keamanan sekolah',
          tasks: 'Monitoring keamanan, koordinasi security, emergency handling',
          programs: ['Monitoring CCTV', 'Koordinasi Security', 'Emergency Handling'],
          members: [
            { id: '20', name: 'M. Saikhu Malek', image: '/images/profile-placeholder.png', position: 'Koordinator' }
          ]
        },
        {
          id: '8',
          name: 'Divisi PDD',
          image: '/images/placeholder.jpg',
          visi: 'Mengembangkan potensi siswa melalui pendidikan dan dakwah',
          misi: 'Menyelenggarakan program pendidikan dan dakwah',
          tasks: 'Program pendidikan, dakwah islamiyah, pembinaan spiritual',
          programs: ['Pendidikan Islam', 'Dakwah', 'Pembinaan Rohani'],
          members: [
            { id: '21', name: 'Radhina Dzahabiyyah ya\'lafunaa', image: '/images/profile-placeholder.png', position: 'Koordinator 1' },
            { id: '22', name: 'Syakila Putri Arifianti', image: '/images/profile-placeholder.png', position: 'Koordinator 2' }
          ]
        }
      ],
      activities: [
        { id: 'pmr-act-1', image: '/images/placeholder.jpg', title: 'Pelatihan Pertolongan Pertama', description: 'Sesi pelatihan tentang pertolongan pertama dasar dan respons darurat.', date: '2024-10-05' },
        { id: 'pmr-act-2', image: '/images/placeholder.jpg', title: 'Gerakan Donor Darah', description: 'Acara donor darah komunitas untuk membantu mereka yang membutuhkan.', date: '2024-11-10' },
        { id: 'pmr-act-3', image: '/images/placeholder.jpg', title: 'Kampanye Kesadaran Kesehatan', description: 'Kampanye untuk mempromosikan kesehatan dan kebersihan di sekolah.', date: '2024-12-15' }
      ]
    },
    {
      id: '4',
      slug: 'linorasi',
      name: 'LINORASI',
      logo: '/images/organisasi/LINORASI.webp',
      description: 'Litbang Inovasi Raih Prestasi yang fokus pada pengembangan inovasi dan prestasi siswa.',
      history: 'LINORASI didirikan untuk mendorong inovasi dan pencapaian prestasi siswa. Melalui berbagai program inovatif, LINORASI telah berhasil membawa nama sekolah ke tingkat yang lebih tinggi dalam berbagai kompetisi dan ajang prestasi.',
      established: '2018',
      statistics: {
        members: 15,
        programs: 20,
        years: 6,
        meetings: 30
      },
      leadership: {
        ketua: [{
          id: '9',
          name: 'Akhyar Bima Arizkillah',
          image: '/images/profile-placeholder.png',
          position: 'Ketua'
        }],
        wakil: [{
          id: '10',
          name: 'Alfin Vigo Ardiansya',
          image: '/images/profile-placeholder.png',
          position: 'Wakil Ketua'
        }],
        sekretaris: [{
          id: '11',
          name: 'Cinta Monicha Aprilia',
          image: '/images/profile-placeholder.png',
          position: 'Sekertaris & Bendahara'
        }, {
          id: '12',
          name: 'Sherina Najwa Novianti',
          image: '/images/profile-placeholder.png',
          position: 'Sekertaris & Bendahara'
        }]
      },
      sections: [
        {
          id: '1',
          name: 'Koordinator Piket',
          image: '/images/placeholder.jpg',
          visi: 'Menjaga ketertiban dan kedisiplinan siswa',
          misi: 'Mengkoordinasikan sistem piket untuk menjaga lingkungan sekolah',
          tasks: 'Pengaturan jadwal piket, pengawasan kebersihan, pembinaan disiplin',
          programs: ['Sistem Piket Harian', 'Pembinaan Kedisiplinan', 'Program Kebersihan'],
          members: [
            { id: '13', name: 'Fitriana Mozarelyn Hakim', image: '/images/profile-placeholder.png', position: 'Koordinator' },
            { id: '14', name: 'Alika Maulidya Rahmawati', image: '/images/profile-placeholder.png', position: 'Koordinator' }
          ]
        },
        {
          id: '2',
          name: 'Sosial Media',
          image: '/images/placeholder.jpg',
          visi: 'Menjadi pusat informasi dan komunikasi digital',
          misi: 'Mengelola media sosial untuk menyebarkan informasi positif',
          tasks: 'Konten creation, social media management, digital marketing',
          programs: ['Content Creation', 'Social Media Campaign', 'Digital Storytelling'],
          members: [
            { id: '15', name: 'Nur Khasanah Fathiniyah', image: '/images/profile-placeholder.png', position: 'Koordinator' },
            { id: '16', name: 'Zahra Aulia Ramadhani', image: '/images/profile-placeholder.png', position: 'Anggota' },
            { id: '17', name: 'Aliffiansyah Fitra Fahrezi', image: '/images/profile-placeholder.png', position: 'Anggota' }
          ]
        },
        {
          id: '3',
          name: 'Dokumentasi',
          image: '/images/placeholder.jpg',
          visi: 'Mencatat dan mendokumentasikan kegiatan organisasi',
          misi: 'Membuat dokumentasi yang berkualitas untuk arsip dan publikasi',
          tasks: 'Fotografi, videografi, editing, arsip digital',
          programs: ['Event Documentation', 'Photo Editing', 'Video Production'],
          members: [
            { id: '18', name: 'Muhammad Alexandra Femilianto', image: '/images/profile-placeholder.png', position: 'Koordinator' },
            { id: '19', name: 'Desy Indah Mutiara', image: '/images/profile-placeholder.png', position: 'Anggota' }
          ]
        },
        {
          id: '4',
          name: 'Mading',
          image: '/images/placeholder.jpg',
          visi: 'Menjadi wadah kreativitas siswa dalam bidang jurnalistik',
          misi: 'Mengembangkan kemampuan menulis dan berkreasi siswa',
          tasks: 'Pembuatan mading, artikel, desain grafis, publikasi',
          programs: ['Mading Sekolah', 'Lomba Menulis', 'Workshop Jurnalistik'],
          members: [
            { id: '20', name: 'Emil Dio Ramadani', image: '/images/profile-placeholder.png', position: 'Koordinator' },
            { id: '21', name: 'Aditya Genta Fahrezi', image: '/images/profile-placeholder.png', position: 'Anggota' },
            { id: '22', name: 'Jose Manuel Kartika', image: '/images/profile-placeholder.png', position: 'Anggota' },
            { id: '23', name: 'Deva Dirgantara Cahaya Loviananda', image: '/images/profile-placeholder.png', position: 'Anggota' }
          ]
        }
      ],
      activities: [
        { id: 'linorasi-act-1', image: '/images/placeholder.jpg', title: 'Workshop Inovasi', description: 'Workshop tentang pengembangan ide dan proyek inovatif.', date: '2024-10-08' },
        { id: 'linorasi-act-2', image: '/images/placeholder.jpg', title: 'Kompetisi Prestasi', description: 'Kompetisi untuk memamerkan prestasi dan bakat siswa.', date: '2024-11-20' },
        { id: 'linorasi-act-3', image: '/images/placeholder.jpg', title: 'Seminar Penelitian', description: 'Seminar tentang metode penelitian dan penyelidikan ilmiah.', date: '2024-12-25' }
      ]
    },
    {
      id: '5',
      slug: 'bdi',
      name: 'BDI',
      logo: '/images/organisasi/BDI.webp',
      description: 'Badan Dakwah Islam yang fokus pada pengembangan spiritual dan kegiatan keagamaan.',
      history: 'BDI didirikan untuk memperkuat nilai-nilai keislaman di lingkungan sekolah. Dengan berbagai program keagamaan, BDI telah berhasil menciptakan lingkungan yang kondusif untuk pengembangan spiritual siswa.',
      established: '2008',
      statistics: {
        members: 23,
        programs: 18,
        years: 16,
        meetings: 40
      },
      leadership: {
        ketua: [{
          id: '11',
          name: 'Rachma Rizkia Herry Putri',
          image: '/images/profile-placeholder.png',
          position: 'Ketua'
        }],
        wakil: [{
          id: '12',
          name: 'Achmad Achzam beinargi',
          image: '/images/profile-placeholder.png',
          position: 'Wakil Ketua'
        }],
        sekretaris: [{
          id: '13',
          name: 'Iqbal Yanuaris',
          image: '/images/profile-placeholder.png',
          position: 'Sekretaris 1'
        }, {
          id: '14',
          name: 'Ananta Putra Dharmawan',
          image: '/images/profile-placeholder.png',
          position: 'Sekretaris 2'
        }],
        bendahara: [{
          id: '15',
          name: 'Yayan Putra Wahyudi',
          image: '/images/profile-placeholder.png',
          position: 'Bendahara 1'
        }, {
          id: '16',
          name: 'Luluk Fika ulmillah Handoko',
          image: '/images/profile-placeholder.png',
          position: 'Bendahara 2'
        }]
      },
      sections: [
        {
          id: '1',
          name: 'Divisi Tahlil Dan Istighosah',
          image: '/images/placeholder.jpg',
          visi: 'Menjadi pusat kegiatan tahlil dan istighosah',
          misi: 'Menyelenggarakan kegiatan tahlil dan istighosah untuk pengembangan spiritual',
          tasks: 'Pengorganisasian tahlil, istighosah, pembinaan spiritual',
          programs: ['Tahlil Rutin', 'Istighosah', 'Pembinaan Rohani'],
          members: [
            { id: '17', name: 'Muhammad Alvin Nur Roihan', image: '/images/profile-placeholder.png', position: 'Koordinator' }
          ]
        },
        {
          id: '2',
          name: 'Divisi Amal Jum\'at',
          image: '/images/placeholder.jpg',
          visi: 'Menjadi pusat kegiatan amal jum\'at',
          misi: 'Menyelenggarakan kegiatan amal jum\'at dan pengembangan sosial',
          tasks: 'Pengorganisasian amal jum\'at, kegiatan sosial, bakti sosial',
          programs: ['Amal Jum\'at', 'Bakti Sosial', 'Kegiatan Sosial'],
          members: [
            { id: '18', name: 'Muhammad Arif Muzaky Hilmi', image: '/images/profile-placeholder.png', position: 'Koordinator' }
          ]
        },
        {
          id: '3',
          name: 'Divisi Tadarus Pagi',
          image: '/images/placeholder.jpg',
          visi: 'Menjadi pusat kegiatan tadarus pagi',
          misi: 'Menyelenggarakan tadarus pagi untuk pengembangan spiritual',
          tasks: 'Pengorganisasian tadarus pagi, pembinaan membaca Al-Qur\'an',
          programs: ['Tadarus Pagi', 'Pembinaan Al-Qur\'an', 'Kegiatan Rohani'],
          members: [
            { id: '19', name: 'Azizi Haikal An Nur', image: '/images/profile-placeholder.png', position: 'Koordinator' }
          ]
        },
        {
          id: '4',
          name: 'Divisi Banjari',
          image: '/images/placeholder.jpg',
          visi: 'Menjadi pusat kegiatan banjari dan seni islami',
          misi: 'Menyelenggarakan kegiatan banjari dan pengembangan seni islami',
          tasks: 'Pengorganisasian banjari, latihan seni islami, pertunjukan',
          programs: ['Banjari', 'Seni Islami', 'Pertunjukan Seni'],
          members: [
            { id: '20', name: 'M. Nizar Fadillah', image: '/images/profile-placeholder.png', position: 'Koordinator' }
          ]
        }
      ],
      activities: [
        { id: 'bdi-act-1', image: '/images/placeholder.jpg', title: 'Lingkaran Studi Islam', description: 'Lingkaran studi mingguan yang membahas ajaran Islam.', date: '2024-10-03' },
        { id: 'bdi-act-2', image: '/images/placeholder.jpg', title: 'Kompetisi Tilawah Al-Quran', description: 'Kompetisi untuk tilawah dan menghafal Al-Quran.', date: '2024-11-12' },
        { id: 'bdi-act-3', image: '/images/placeholder.jpg', title: 'Program Sosial Masyarakat', description: 'Program outreach untuk membantu masyarakat lokal.', date: '2024-12-18' }
      ]
    },
    {
      id: '6',
      slug: 'ambalan',
      name: 'AMBALAN',
      logo: '/images/organisasi/AMBALAN.webp',
      description: 'AMBALAN (Ambalan Pramuka) adalah organisasi pendidikan nonformal yang bertujuan membentuk karakter siswa melalui kegiatan kepramukaan yang menyenangkan dan mendidik.',
      history: 'AMBALAN di SMK Negeri 2 Singosari telah lama menjadi bagian dari kegiatan ekstrakurikuler yang membantu siswa mengembangkan keterampilan survival, kepemimpinan, dan jiwa sosial.',
      established: '2010',
      statistics: {
        members: 21,
        programs: 40,
        years: 14,
        meetings: 4
      },
      contactInfo: {
        instagram: [
          { label: 'AMBALAN SMK 2 SGS', handle: '@ambalan_smkn2' },
          { label: 'SMKn 2 SGS', handle: '@smkn2_singosari' }
        ],
        whatsapp: [
          { label: 'Ketua AMBALAN', number: '081234567891' },
          { label: 'Pembina', number: '089876543211' }
        ],
        socialMedia: [
          { platform: 'instagram', handle: 'ambalan_smkn2' }
        ]
      },
      leadership: {
        sekretaris: [
          { id: 's2', name: 'Sekretaris AMBALAN', image: '/images/profile-placeholder.png', position: 'Sekretaris' }
        ],
        ketua: [
          { id: 'k2', name: 'Ketua AMBALAN', image: '/images/profile-placeholder.png', position: 'Ketua' }
        ],
        wakil: [
          { id: 'w2', name: 'Wakil Ketua AMBALAN', image: '/images/profile-placeholder.png', position: 'Wakil Ketua' }
        ],
        bendahara: [
          { id: 'b2', name: 'Bendahara AMBALAN', image: '/images/profile-placeholder.png', position: 'Bendahara' }
        ]
      },
      sections: [
        {
          id: 'seksi-ambalan-1',
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
            { id: 'm6', name: 'Pembina AMBALAN', image: '/images/profile-placeholder.png', position: 'Pembina' },
            { id: 'm7', name: 'Anggota 1', image: '/images/profile-placeholder.png', position: 'Anggota' },
            { id: 'm8', name: 'Anggota 2', image: '/images/profile-placeholder.png', position: 'Anggota' }
          ]
        }
      ],
      activities: [
        {
          id: 'a5',
          image: '/images/placeholder.jpg',
          title: 'Jambore AMBALAN',
          description: 'Kegiatan jambore tahunan yang melibatkan berbagai kegiatan kepramukaan dan pendidikan karakter.',
          date: '2024-08-15'
        },
        {
          id: 'a6',
          image: '/images/placeholder.jpg',
          title: 'Latihan Survival',
          description: 'Pelatihan keterampilan survival di alam terbuka untuk membentuk mental yang tangguh.',
          date: '2024-09-20'
        },
        {
          id: 'a7',
          image: '/images/placeholder.jpg',
          title: 'Kamp Pembentukan Karakter',
          description: 'Kamp yang fokus pada pengembangan keterampilan kepemimpinan dan kerja tim melalui kegiatan pramuka.',
          date: '2024-10-10'
        }
      ],
      recruitmentPoster: '/images/placeholder.jpg',
      recruitmentPeriod: '1-15 Agustus 2024'
    },
  ];

  const paginatedData = allOrganizations.slice(offset, offset + limit);

  return {
    data: paginatedData,
    total: allOrganizations.length
  };
});
