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
      established: '2008',
      statistics: {
        members: 70,
        programs: 12,
        years: 17,
        meetings: 48
      },
      contactInfo: {
        instagram: [{ label: 'Instagram', handle: 'https://www.instagram.com/osis.stemdasi?igsh=dnVnM2tyNGs1djF4' }],
        whatsapp: [{ label: 'WhatsApp', number: '+6281234567890' }],
        socialMedia: [
          { platform: 'tiktok', handle: 'https://www.tiktok.com/@askaraanagatastemdasi?lang=id-ID&is_from_webapp=1&sender_device=mobile&sender_web_id=7552483889404364306' }
        ]
      },
      leadership: {
        ketua: [{
          id: '1',
          name: 'Maulida Latifatul Ismi',
          image: '/images/profile-placeholder.png',
          position: 'Ketua OSIS'
        }],
        wakil: [{
          id: '2',
          name: 'Kent J Luffy',
          image: '/images/profile-placeholder.png',
          position: 'Wakil Ketua OSIS'
        }],
        sekretaris: [{
          id: '3',
          name: 'Moch. Miftahul Khoironi',
          image: '/images/profile-placeholder.png',
          position: 'Sekretaris 1'
        }, {
          id: '4',
          name: 'Ajeng Claresta Damara',
          image: '/images/profile-placeholder.png',
          position: 'Sekretaris 2'
        }],
        bendahara: [{
          id: '5',
          name: 'Geovany Saputra',
          image: '/images/profile-placeholder.png',
          position: 'Bendahara 1'
        }, {
          id: '6',
          name: 'Enjellina Devista Maharani',
          image: '/images/profile-placeholder.png',
          position: 'Bendahara 2'
        }]
      },
      sections: [
        {
          id: '1',
          name: 'Keimanan dan Ketaqwaan',
          image: '/images/placeholder.jpg',
          visi: 'Meningkatkan keimanan dan ketaqwaan siswa',
          misi: 'Menyelenggarakan kegiatan keagamaan dan pembinaan spiritual',
          tasks: 'Koordinasi kegiatan keimanan, pembinaan siswa',
          programs: ['Kegiatan Keagamaan', 'Pembinaan Spiritual'],
          members: [
            { id: '7', name: 'Khailah Althaf Putri S', image: '/images/profile-placeholder.png', position: 'Koordinator' },
            { id: '8', name: 'Saikhu', image: '/images/profile-placeholder.png', position: 'Anggota' }
          ]
        },
        {
          id: '2',
          name: 'Wawasan Keilmuan',
          image: '/images/placeholder.jpg',
          visi: 'Meningkatkan wawasan keilmuan siswa',
          misi: 'Menyelenggarakan workshop dan diskusi ilmiah',
          tasks: 'Koordinasi program keilmuan, pembinaan siswa',
          programs: ['Workshop Ilmiah', 'Diskusi Keilmuan'],
          members: [
            { id: '9', name: 'Rodiyah Maulita', image: '/images/profile-placeholder.png', position: 'Koordinator' },
            { id: '10', name: 'Kevin Septian Prayitno', image: '/images/profile-placeholder.png', position: 'Anggota' }
          ]
        },
        {
          id: '3',
          name: 'Bela Negara',
          image: '/images/placeholder.jpg',
          visi: 'Meningkatkan semangat bela negara',
          misi: 'Menyelenggarakan kegiatan patriotik',
          tasks: 'Koordinasi kegiatan bela negara, pembinaan siswa',
          programs: ['Kegiatan Patriotik', 'Pembinaan Bela Negara'],
          members: [
            { id: '11', name: 'Malik Fajar Al Amri', image: '/images/profile-placeholder.png', position: 'Koordinator' },
            { id: '12', name: 'Tiara Nafisah', image: '/images/profile-placeholder.png', position: 'Anggota' },
            { id: '13', name: 'Ad’diendra Maryam Nur Fii Rizqy', image: '/images/profile-placeholder.png', position: 'Anggota' }
          ]
        },
        {
          id: '4',
          name: 'Budi Pekerti',
          image: '/images/placeholder.jpg',
          visi: 'Meningkatkan budi pekerti siswa',
          misi: 'Menyelenggarakan pembinaan karakter',
          tasks: 'Koordinasi program budi pekerti, pembinaan siswa',
          programs: ['Pembinaan Karakter', 'Kegiatan Budi Pekerti'],
          members: [
            { id: '14', name: 'Inggrid Devianne Maharani P', image: '/images/profile-placeholder.png', position: 'Koordinator' },
            { id: '15', name: 'Deva Dirgantara Cahaya Loviananda', image: '/images/profile-placeholder.png', position: 'Anggota' },
            { id: '16', name: 'Adhiesta Alifiani', image: '/images/profile-placeholder.png', position: 'Anggota' }
          ]
        },
        {
          id: '5',
          name: 'Pendidikan Berorganisasi, Politik',
          image: '/images/placeholder.jpg',
          visi: 'Meningkatkan pendidikan organisasi dan politik',
          misi: 'Menyelenggarakan workshop organisasi dan politik',
          tasks: 'Koordinasi program pendidikan, pembinaan siswa',
          programs: ['Workshop Organisasi', 'Diskusi Politik'],
          members: [
            { id: '17', name: 'Bisma Purbawasesa', image: '/images/profile-placeholder.png', position: 'Koordinator' },
            { id: '18', name: 'Robi\'ah Al-adawiyah', image: '/images/profile-placeholder.png', position: 'Anggota' },
            { id: '19', name: 'Mirza Ahmad', image: '/images/profile-placeholder.png', position: 'Anggota' }
          ]
        },
        {
          id: '6',
          name: 'Kewirausahaan',
          image: '/images/placeholder.jpg',
          visi: 'Meningkatkan semangat kewirausahaan',
          misi: 'Menyelenggarakan program wirausaha',
          tasks: 'Koordinasi kegiatan wirausaha, pembinaan siswa',
          programs: ['Program Kewirausahaan', 'Workshop Bisnis'],
          members: [
            { id: '20', name: 'Chesylia Anggie Pratiwi', image: '/images/profile-placeholder.png', position: 'Koordinator' },
            { id: '21', name: 'Aullia Aldrin Permata Sari', image: '/images/profile-placeholder.png', position: 'Anggota' },
            { id: '22', name: 'Zulham Wahyu Julianto', image: '/images/profile-placeholder.png', position: 'Anggota' }
          ]
        },
        {
          id: '7',
          name: 'Kesehatan',
          image: '/images/placeholder.jpg',
          visi: 'Meningkatkan kesehatan siswa',
          misi: 'Menyelenggarakan kegiatan kesehatan',
          tasks: 'Koordinasi program kesehatan, pembinaan siswa',
          programs: ['Kegiatan Kesehatan', 'Penyuluhan Kesehatan'],
          members: [
            { id: '23', name: 'Mutia Amanda Sarapova', image: '/images/profile-placeholder.png', position: 'Koordinator' },
            { id: '24', name: 'Lintang', image: '/images/profile-placeholder.png', position: 'Anggota' },
            { id: '25', name: 'valentina Sulistya Putri', image: '/images/profile-placeholder.png', position: 'Anggota' }
          ]
        },
        {
          id: '8',
          name: 'Sastra Budaya/Kreasi Seni',
          image: '/images/placeholder.jpg',
          visi: 'Meningkatkan kreativitas seni dan sastra',
          misi: 'Menyelenggarakan kegiatan seni dan sastra',
          tasks: 'Koordinasi program seni, pembinaan siswa',
          programs: ['Kegiatan Seni', 'Workshop Sastra'],
          members: [
            { id: '26', name: 'Gendhis Aura Pramesti A', image: '/images/profile-placeholder.png', position: 'Koordinator' },
            { id: '27', name: 'Riska Septia Renata', image: '/images/profile-placeholder.png', position: 'Anggota' },
            { id: '28', name: 'Hafis Dwi', image: '/images/profile-placeholder.png', position: 'Anggota' }
          ]
        },
        {
          id: '9',
          name: 'Teknologi Informatika',
          image: '/images/placeholder.jpg',
          visi: 'Meningkatkan kemampuan teknologi informatika',
          misi: 'Menyelenggarakan workshop IT',
          tasks: 'Koordinasi program IT, pembinaan siswa',
          programs: ['Workshop IT', 'Pelatihan Teknologi'],
          members: [
            { id: '29', name: 'Silmy Muthi’ah', image: '/images/profile-placeholder.png', position: 'Koordinator' },
            { id: '30', name: 'Sandykha Pratama Pesarista', image: '/images/profile-placeholder.png', position: 'Anggota' }
          ]
        },
        {
          id: '10',
          name: 'Kemampuan Bahasa',
          image: '/images/placeholder.jpg',
          visi: 'Meningkatkan kemampuan bahasa siswa',
          misi: 'Menyelenggarakan program bahasa',
          tasks: 'Koordinasi kegiatan bahasa, pembinaan siswa',
          programs: ['Program Bahasa', 'Workshop Bahasa'],
          members: [
            { id: '31', name: 'Mochammad Prasetyo', image: '/images/profile-placeholder.png', position: 'Koordinator' },
            { id: '32', name: 'Radhina Dzahabbiyah', image: '/images/profile-placeholder.png', position: 'Anggota' }
          ]
        }
      ],
      activities: [
        { id: 'osis-act-1', image: '/images/placeholder.jpg', title: 'Pembekalan Latihan Dasar Kepemimpinan (LDK) untuk Calon Pengurus OSIS Gen-17', description: 'Pembekalan LDK untuk calon pengurus OSIS Generasi 17.', date: '2025-01-01' },
        { id: 'osis-act-2', image: '/images/placeholder.jpg', title: 'Pelaksanaan MPLS Tahun Ajaran 2025/2026 oleh OSIS bersama 5 organisasi lain', description: 'Pelaksanaan MPLS tahun ajaran 2025/2026 oleh OSIS bersama 5 organisasi lain.', date: '2025-07-01' },
        { id: 'osis-act-3', image: '/images/placeholder.jpg', title: 'Acara berbagi takjil di bulan puasa yang melibatkan seluruh organisasi dan Dharma Wanita SMKN 2 Singosari', description: 'Acara berbagi takjil di bulan puasa melibatkan seluruh organisasi dan Dharma Wanita.', date: '2025-03-15' },
        { id: 'osis-act-4', image: '/images/placeholder.jpg', title: 'Kegiatan "Takjil and Chill" yang diikuti oleh perwakilan dari seluruh organisasi sekolah', description: 'Kegiatan Takjil and Chill diikuti perwakilan seluruh organisasi sekolah.', date: '2025-03-20' },
        { id: 'osis-act-5', image: '/images/placeholder.jpg', title: 'Diklat yang disertai siraman dan janji OSIS untuk Generasi ke-17', description: 'Diklat disertai siraman dan janji OSIS untuk Generasi 17.', date: '2025-04-01' },
        { id: 'osis-act-6', image: '/images/placeholder.jpg', title: 'Classmeet sebagai acara terakhir gabungan OSIS Generasi 16 dan Generasi 17', description: 'Classmeet sebagai acara terakhir gabungan OSIS Gen 16 dan 17.', date: '2025-05-01' },
        { id: 'osis-act-7', image: '/images/placeholder.jpg', title: 'Perayaan Ulang Tahun SMKN 2 Singosari yang ke-18', description: 'Perayaan ulang tahun SMKN 2 Singosari ke-18.', date: '2025-06-01' },
        { id: 'osis-act-8', image: '/images/placeholder.jpg', title: 'Acara Supporter STEMDASI yang diadakan oleh OSIS saat 17 Agustus', description: 'Acara Supporter STEMDASI diadakan OSIS saat 17 Agustus.', date: '2025-08-17' }
      ],
      recruitmentPoster: '/images/organisasi/poster/OSIS.webp',
      recruitmentPeriod: '1-15 September 2024'
    },
    {
      id: '2',
      slug: 'pmr',
      name: 'PMR',
      logo: '/images/organisasi/PMR.webp',
      description: 'Palang Merah Remaja yang fokus pada kegiatan kemanusiaan dan pertolongan pertama.',
      vision: 'Menumbuhkan jiwa peduli kemanusiaan dan semangat tolong-menolong di kalangan anggota PMR untuk mewujudkan generasi yang berempati, tangguh, dan siap membantu sesama.',
      mission: 'Mengembangkan rasa empati dan kepedulian sosial, meningkatkan keterampilan pertolongan pertama, menumbuhkan semangat kerja sama, melaksanakan kegiatan sosial, dan menjadi teladan dalam sikap saling menolong.',
      history: 'PMR telah berperan aktif dalam kegiatan sosial dan kesehatan siswa. Dengan semangat kemanusiaan, PMR SMKN 2 Singosari terus memberikan pelayanan kesehatan dan bantuan sosial kepada masyarakat sekitar sekolah.',
      established: '2005',
      statistics: {
        members: 16,
        programs: 15,
        years: 20,
        meetings: 36
      },
      contactInfo: {
        instagram: [{ label: 'Instagram', handle: 'https://www.instagram.com/pmr_smkn2sgs?igsh=MTlpeGJubDlqNmlmNQ==' }]
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
            { id: '17', name: 'Bella Putri Rahmadhani', image: '/images/profile-placeholder.png', position: 'Koordinator' }
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
            { id: '18', name: 'Nur Khasanah Fathiniyah', image: '/images/profile-placeholder.png', position: 'Koordinator' }
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
            { id: '19', name: 'M. Divan Rossy A.F', image: '/images/profile-placeholder.png', position: 'Koordinator' }
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
            { id: '20', name: 'M. Shaiku Malek', image: '/images/profile-placeholder.png', position: 'Koordinator' }
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
            { id: '21', name: 'Syakila Putri Arifianti', image: '/images/profile-placeholder.png', position: 'Koordinator 1' },
            { id: '22', name: 'Radhina Dzahabiyyah ya\'lafuna', image: '/images/profile-placeholder.png', position: 'Koordinator 2' }
          ]
        }
      ],
      activities: [
        { id: 'pmr-act-1', image: '/images/placeholder.jpg', title: 'DIKLAT PALANG MERAH REMAJA SMKN 2 SINGOSARI', description: 'Diklat untuk anggota PMR di SMKN 2 Singosari.', date: '2025-02-22' }
      ],
      recruitmentPoster: '/images/organisasi/poster/PMR.jpg',
      recruitmentPeriod: '2025/2026'
    },
    {
      id: '3',
      slug: 'linorasi',
      name: 'LINORASI',
      logo: '/images/organisasi/LINORASI.webp',
      description: 'Litbang Inovasi Raih Prestasi yang fokus pada pengembangan inovasi dan prestasi siswa.',
      history: 'LINORASI didirikan untuk mendorong inovasi dan pencapaian prestasi siswa. Melalui berbagai program inovatif, LINORASI telah berhasil membawa nama sekolah ke tingkat yang lebih tinggi dalam berbagai kompetisi dan ajang prestasi.',
      established: '2022',
      statistics: {
        members: 15,
        programs: 20,
        years: 3,
        meetings: 30
      },
      contactInfo: {
        instagram: [{ label: 'Instagram', handle: 'https://www.instagram.com/linorasi22?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' }]
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
          position: 'Sekretaris & Bendahara'
        }, {
          id: '12',
          name: 'Sherina Najwa Novianti',
          image: '/images/profile-placeholder.png',
          position: 'Sekretaris & Bendahara'
        }],
        bendahara: []
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
            { id: '15', name: 'Zahra Aulia Ramadhani', image: '/images/profile-placeholder.png', position: 'Koordinator' },
            { id: '16', name: 'Nur Khasanah Fathiniyah', image: '/images/profile-placeholder.png', position: 'Anggota' },
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
            { id: '18', name: 'Desy Indah Mutiara', image: '/images/profile-placeholder.png', position: 'Koordinator' },
            { id: '19', name: 'Muhammad Alexandra Femilianto', image: '/images/profile-placeholder.png', position: 'Anggota' }
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
      ],
      recruitmentPoster: '/images/organisasi/poster/LINORASI.webp',
      recruitmentPeriod: '1-15 November 2024'
    },
    {
      id: '4',
      slug: 'bdi',
      name: 'BDI',
      logo: '/images/organisasi/BDI.webp',
      description: 'Badan Dakwah Islam yang fokus pada pengembangan spiritual dan kegiatan keagamaan.',
      history: 'BDI didirikan untuk memperkuat nilai-nilai keislaman di lingkungan sekolah. Dengan berbagai program keagamaan, BDI telah berhasil menciptakan lingkungan yang kondusif untuk pengembangan spiritual siswa.',
      established: '2008',
      statistics: {
        members: 23,
        programs: 18,
        years: 17,
        meetings: 40
      },
      contactInfo: {
        instagram: [{ label: 'Instagram', handle: 'https://www.instagram.com/bdi_stemdasi?igsh=M2Rjb2k4endkczR6' }]
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
          name: 'Achmad Achzam Beinargi',
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
          name: 'Tahlil dan Istighosah',
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
          name: 'Amal Jum’at',
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
          name: 'Tadarus Pagi',
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
          name: 'Banjari',
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
        { id: 'bdi-act-1', image: '/images/placeholder.jpg', title: 'Peringatan Maulid Nabi Muhammad di SMK Negeri 2 Singosari', description: 'Peringatan Maulid Nabi Muhammad di SMK Negeri 2 Singosari.', date: '2025-09-04' }
      ],
      recruitmentPoster: '/images/organisasi/poster/BDI.webp',
      recruitmentPeriod: '1-15 December 2024'
    },
    {
      id: '5',
      slug: 'ambalan',
      name: 'AMBALAN',
      logo: '/images/organisasi/AMBALAN.webp',
      description: 'AMBALAN (Ambalan Pramuka) adalah organisasi pendidikan nonformal yang bertujuan membentuk karakter siswa melalui kegiatan kepramukaan yang menyenangkan dan mendidik.',
      history: 'AMBALAN di SMK Negeri 2 Singosari telah lama menjadi bagian dari kegiatan ekstrakurikuler yang membantu siswa mengembangkan keterampilan survival, kepemimpinan, dan jiwa sosial.',
      established: '2009',
      statistics: {
        members: 21,
        programs: 40,
        years: 16,
        meetings: 4
      },
      contactInfo: {
        instagram: [
          { label: 'S4AC Scout', handle: '@s4acscout.official' }
        ],
        whatsapp: [
          { label: 'Ketua AMBALAN', number: '081234567891' },
          { label: 'Pembina', number: '089876543211' }
        ],
        socialMedia: [
          { platform: 'tiktok', handle: 's4ac.stemdasi' },
          { platform: 'youtube', handle: 's4acsmkn2singosari43' }
        ]
      },
      leadership: {
        ketua: [
          { id: 'pr1', name: 'Muhammad Mufid Arhaburrizqi', image: '/images/profile-placeholder.png', position: 'Pradana' },
          { id: 'pr2', name: 'Siti Aminah', image: '/images/profile-placeholder.png', position: 'Pradana' }
        ],
        sekretaris: [
          { id: 'kr1', name: 'Adhiesta Alifiani Nadhiswara', image: '/images/profile-placeholder.png', position: 'Kerani' },
          { id: 'kr2', name: 'Reysa Darajatina Burhani', image: '/images/profile-placeholder.png', position: 'Kerani' }
        ],
        bendahara: [
          { id: 'ht1', name: 'Inggrid Devianne Maharani Putri', image: '/images/profile-placeholder.png', position: 'Hartaka' }
        ],
        wakil: [
          { id: 'pa1', name: 'Muhammad Wisnu Dewandaru', image: '/images/profile-placeholder.png', position: 'Pemangku Adat' },
          { id: 'pa2', name: 'Yuyun Elistiowati', image: '/images/profile-placeholder.png', position: 'Pemangku Adat' }
        ]
      },
      sections: [
        {
          id: 'seksi-1',
          name: 'Giatkaji (Kegiatan & Pengkajian)',
          image: '/images/placeholder.jpg',
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
            { id: 'gk1', name: 'Kent J Luffy', image: '/images/profile-placeholder.png', position: 'Ketua Sie' },
            { id: 'gk2', name: 'Chalisa Cahaya Santika', image: '/images/profile-placeholder.png', position: 'Anggota' },
            { id: 'gk3', name: 'M. Saikhu Malek', image: '/images/profile-placeholder.png', position: 'Anggota' }
          ]
        },
        {
          id: 'seksi-2',
          name: 'Tekpram (Teknik Kepramukaan)',
          image: '/images/placeholder.jpg',
          visi: 'Mengembangkan teknik kepramukaan',
          misi: 'Melatih teknik-teknik kepramukaan',
          tasks: 'Pelatihan teknik kepramukaan',
          programs: ['Pelatihan Teknik', 'Latihan Kepramukaan'],
          members: [
            { id: 'tp1', name: 'Malik Fajar Al Amri', image: '/images/profile-placeholder.png', position: 'Ketua Sie' },
            { id: 'tp2', name: 'Razzaq Zhahir Jaka Putra', image: '/images/profile-placeholder.png', position: 'Anggota' },
            { id: 'tp3', name: 'Muhammad Alexandra Femilianto', image: '/images/profile-placeholder.png', position: 'Anggota' }
          ]
        },
        {
          id: 'seksi-3',
          name: 'Giatops (Kegiatan Operasional)',
          image: '/images/placeholder.jpg',
          visi: 'Mengorganisir kegiatan operasional',
          misi: 'Melaksanakan kegiatan operasional pramuka',
          tasks: 'Pengorganisasian kegiatan operasional',
          programs: ['Kegiatan Operasional', 'Event Pramuka'],
          members: [
            { id: 'go1', name: 'Febby Anggun', image: '/images/profile-placeholder.png', position: 'Ketua Sie' },
            { id: 'go2', name: 'Fika Rizty Amelia', image: '/images/profile-placeholder.png', position: 'Anggota' }
          ]
        },
        {
          id: 'seksi-4',
          name: 'Evabang (Evaluasi & Pengembangan)',
          image: '/images/placeholder.jpg',
          visi: 'Melakukan evaluasi dan pengembangan',
          misi: 'Mengevaluasi dan mengembangkan program pramuka',
          tasks: 'Evaluasi program, pengembangan kegiatan',
          programs: ['Evaluasi Program', 'Pengembangan Kegiatan'],
          members: [
            { id: 'eb1', name: 'Tiara Nafisah', image: '/images/profile-placeholder.png', position: 'Ketua Sie' },
            { id: 'eb2', name: 'Miftachul Jannah', image: '/images/profile-placeholder.png', position: 'Anggota' },
            { id: 'eb3', name: 'Lintang Dewi Nur Fadilla', image: '/images/profile-placeholder.png', position: 'Anggota' }
          ]
        },
        {
          id: 'seksi-5',
          name: 'Humas',
          image: '/images/placeholder.jpg',
          visi: 'Menjadi pusat komunikasi dan informasi',
          misi: 'Mengelola hubungan masyarakat dan informasi',
          tasks: 'Publikasi kegiatan, media sosial',
          programs: ['Media Sosial', 'Publikasi'],
          members: [
            { id: 'hu1', name: 'Khoirotul Ilmiyah', image: '/images/profile-placeholder.png', position: 'Ketua Sie' },
            { id: 'hu2', name: 'Raditya Javas Nararya', image: '/images/profile-placeholder.png', position: 'Anggota' },
            { id: 'hu3', name: 'Radhina Dzahabiyyah Ya\'lafuna', image: '/images/profile-placeholder.png', position: 'Anggota' }
          ]
        }
      ],
      activities: [
        {
          id: 'ambalan-act-1',
          image: '/images/placeholder.jpg',
          title: 'Kegiatan Latgab Penegak Se – Singosari',
          description: 'Kegiatan latihan gabungan penegak di Singosari.',
          date: '2025-09-13'
        }
      ],
      recruitmentPoster: '/images/organisasi/poster/AMBALAN.webp',
      recruitmentPeriod: '1-15 Agustus 2024'
    },
  ];

  const paginatedData = allOrganizations.slice(offset, offset + limit);

  return {
    data: paginatedData,
    total: allOrganizations.length
  };
});
