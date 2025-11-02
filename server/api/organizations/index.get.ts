import { defineEventHandler, getQuery, readBody, createError, setCookie, getCookie } from 'h3';
import type { Organization } from "~/models/Organization";

export default defineEventHandler(
  async (event): Promise<{ data: Organization[]; total: number }> => {
    const query = getQuery(event);
    const limit = parseInt(query.limit as string, 10) || 10;
    const offset = parseInt(query.offset as string, 10) || 0;

    const allOrganizations: Organization[] = [
      {
        id: "1",
        slug: "osis",
        name: "OSIS",
        logo: "/images/organisasi/OSIS.webp",
        description:
          "OSIS, atau Organisasi Siswa Intra Sekolah, adalah organisasi yang ada di tingkat sekolah menengah pertama (SMP sederajat) dan sekolah menengah atas (SMA/K sederajat) di Indonesia. Anggotanya adalah siswa-siswi di sekolah tersebut. OSIS bertugas sebagai wadah untuk kegiatan siswa, mewakili aspirasi mereka, dan membantu kelancaran kegiatan sekolah.",
        shortDescription:
          "Dewan siswa yang mewakili kepentingan siswa dan mengorganisir kegiatan sekolah.",
        logoDescriptions: {
          maknaSimbol: [
            "Buku Terbuka: Simbol menuntut ilmu pengetahuan dan teknologi.",
            "Pena: Melambangkan kreativitas, inovasi, dan perjuangan siswa untuk meraih cita-cita.",
            "Obor: Simbol semangat yang tidak pernah padam untuk menerangi jalan menuju masa depan.",
            "Tiga Bintang: Mewakili kecerdasan, karakter, dan keterampilan sebagai pilar utama dalam membangun pribadi yang unggul.",
            "Padi: Melambangkan kerendahan hati, kesabaran, dan rasa syukur.",
            "Pita: Menyimbolkan persatuan dan solidaritas seluruh siswa.",
            "Perisai: Melambangkan pelindung nilai-nilai luhur dan integritas siswa.",
          ],
          maknaWarna: [
            "Emas: Melambangkan kejayaan, kemuliaan, dan harapan yang tinggi. Warna ini merepresentasikan siswa OSIS sebagai generasi unggul yang bercita-cita meraih prestasi gemilang.",
          ],
        },
        history:
          "Didirikan sejak tahun 2000, OSIS telah menjadi pilar utama dalam kegiatan siswa. OSIS SMKN 2 Singosari telah berhasil menyelenggarakan berbagai kegiatan yang bermanfaat bagi siswa, mulai dari kegiatan akademik hingga kegiatan sosial. Dengan semangat kebersamaan dan kreativitas, OSIS terus berkembang dan memberikan kontribusi positif bagi sekolah.",
        established: "2008",
        statistics: {
          members: 70,
          programs: 12,
          years: 17,
          meetings: 48,
        },
        contactInfo: {
          instagram: [{ label: "Instagram", handle: "osis.stemdasi" }],
          whatsapp: [{ label: "WhatsApp", number: "081234567890" }],
          socialMedia: [{ platform: "tiktok", handle: "@askaraanagatastemdasi" }],
        },
        leadership: {
          ketua: [
            {
              id: "1",
              name: "Maulida Latifatul Ismi",
              image: "?",
              position: "Ketua OSIS",
            },
          ],
          wakil: [
            {
              id: "2",
              name: "Kent J Luffy",
              image: "?",
              position: "Wakil Ketua OSIS",
            },
          ],
          sekretaris: [
            {
              id: "3",
              name: "Moch. Miftahul Khoironi",
              image: "?",
              position: "Sekretaris 1",
            },
            {
              id: "4",
              name: "Ajeng Claresta Damara",
              image: "?",
              position: "Sekretaris 2",
            },
          ],
          bendahara: [
            {
              id: "5",
              name: "Geovany Saputra",
              image: "?",
              position: "Bendahara 1",
            },
            {
              id: "6",
              name: "Enjellina Devista Maharani",
              image: "?",
              position: "Bendahara 2",
            },
          ],
        },
        sections: [
          {
            id: "1",
            name: "Keimanan dan Ketaqwaan",
            image: "/images/placeholder.jpg",
            visi: "Meningkatkan keimanan dan ketaqwaan siswa",
            misi: "Menyelenggarakan kegiatan keagamaan dan pembinaan spiritual",
            tasks: "Koordinasi kegiatan keimanan, pembinaan siswa",
            programs: ["Kegiatan Keagamaan", "Pembinaan Spiritual"],
            members: [
              {
                id: "7",
                name: "Khailah Althaf Putri S",
                image: "?",
                position: "Koordinator",
              },
              {
                id: "8",
                name: "Saikhu",
                image: "?",
                position: "Anggota",
              },
            ],
          },
          {
            id: "2",
            name: "Wawasan Keilmuan",
            image: "/images/placeholder.jpg",
            visi: "Meningkatkan wawasan keilmuan siswa",
            misi: "Menyelenggarakan workshop dan diskusi ilmiah",
            tasks: "Koordinasi program keilmuan, pembinaan siswa",
            programs: ["Workshop Ilmiah", "Diskusi Keilmuan"],
            members: [
              {
                id: "9",
                name: "Rodiyah Maulita",
                image: "?",
                position: "Koordinator",
              },
              {
                id: "10",
                name: "Kevin Septian Prayitno",
                image: "?",
                position: "Anggota",
              },
            ],
          },
          {
            id: "3",
            name: "Bela Negara",
            image: "/images/placeholder.jpg",
            visi: "Meningkatkan semangat bela negara",
            misi: "Menyelenggarakan kegiatan patriotik",
            tasks: "Koordinasi kegiatan bela negara, pembinaan siswa",
            programs: ["Kegiatan Patriotik", "Pembinaan Bela Negara"],
            members: [
              {
                id: "11",
                name: "Malik Fajar Al Amri",
                image: "?",
                position: "Koordinator",
              },
              {
                id: "12",
                name: "Tiara Nafisah",
                image: "?",
                position: "Anggota",
              },
              {
                id: "13",
                name: "Ad’diendra Maryam Nur Fii Rizqy",
                image: "?",
                position: "Anggota",
              },
            ],
          },
          {
            id: "4",
            name: "Budi Pekerti",
            image: "/images/placeholder.jpg",
            visi: "Meningkatkan budi pekerti siswa",
            misi: "Menyelenggarakan pembinaan karakter",
            tasks: "Koordinasi program budi pekerti, pembinaan siswa",
            programs: ["Pembinaan Karakter", "Kegiatan Budi Pekerti"],
            members: [
              {
                id: "14",
                name: "Inggrid Devianne Maharani P",
                image: "?",
                position: "Koordinator",
              },
              {
                id: "15",
                name: "Deva Dirgantara Cahaya Loviananda",
                image: "?",
                position: "Anggota",
              },
              {
                id: "16",
                name: "Adhiesta Alifiani",
                image: "?",
                position: "Anggota",
              },
            ],
          },
          {
            id: "5",
            name: "Pendidikan Berorganisasi, Politik",
            image: "/images/placeholder.jpg",
            visi: "Meningkatkan pendidikan organisasi dan politik",
            misi: "Menyelenggarakan workshop organisasi dan politik",
            tasks: "Koordinasi program pendidikan, pembinaan siswa",
            programs: ["Workshop Organisasi", "Diskusi Politik"],
            members: [
              {
                id: "17",
                name: "Bisma Purbawasesa",
                image: "?",
                position: "Koordinator",
              },
              {
                id: "18",
                name: "Robi'ah Al-adawiyah",
                image: "?",
                position: "Anggota",
              },
              {
                id: "19",
                name: "Mirza Ahmad",
                image: "?",
                position: "Anggota",
              },
            ],
          },
          {
            id: "6",
            name: "Kewirausahaan",
            image: "/images/placeholder.jpg",
            visi: "Meningkatkan semangat kewirausahaan",
            misi: "Menyelenggarakan program wirausaha",
            tasks: "Koordinasi kegiatan wirausaha, pembinaan siswa",
            programs: ["Program Kewirausahaan", "Workshop Bisnis"],
            members: [
              {
                id: "20",
                name: "Chesylia Anggie Pratiwi",
                image: "?",
                position: "Koordinator",
              },
              {
                id: "21",
                name: "Aullia Aldrin Permata Sari",
                image: "?",
                position: "Anggota",
              },
              {
                id: "22",
                name: "Zulham Wahyu Julianto",
                image: "?",
                position: "Anggota",
              },
            ],
          },
          {
            id: "7",
            name: "Kesehatan",
            image: "/images/placeholder.jpg",
            visi: "Meningkatkan kesehatan siswa",
            misi: "Menyelenggarakan kegiatan kesehatan",
            tasks: "Koordinasi program kesehatan, pembinaan siswa",
            programs: ["Kegiatan Kesehatan", "Penyuluhan Kesehatan"],
            members: [
              {
                id: "23",
                name: "Mutia Amanda Sarapova",
                image: "?",
                position: "Koordinator",
              },
              {
                id: "24",
                name: "Lintang",
                image: "?",
                position: "Anggota",
              },
              {
                id: "25",
                name: "valentina Sulistya Putri",
                image: "?",
                position: "Anggota",
              },
            ],
          },
          {
            id: "8",
            name: "Sastra Budaya/Kreasi Seni",
            image: "/images/placeholder.jpg",
            visi: "Meningkatkan kreativitas seni dan sastra",
            misi: "Menyelenggarakan kegiatan seni dan sastra",
            tasks: "Koordinasi program seni, pembinaan siswa",
            programs: ["Kegiatan Seni", "Workshop Sastra"],
            members: [
              {
                id: "26",
                name: "Gendhis Aura Pramesti A",
                image: "?",
                position: "Koordinator",
              },
              {
                id: "27",
                name: "Riska Septia Renata",
                image: "?",
                position: "Anggota",
              },
              {
                id: "28",
                name: "Hafis Dwi",
                image: "?",
                position: "Anggota",
              },
            ],
          },
          {
            id: "9",
            name: "Teknologi Informatika",
            image: "/images/placeholder.jpg",
            visi: "Meningkatkan kemampuan teknologi informatika",
            misi: "Menyelenggarakan workshop IT",
            tasks: "Koordinasi program IT, pembinaan siswa",
            programs: ["Workshop IT", "Pelatihan Teknologi"],
            members: [
              {
                id: "29",
                name: "Silmy Muthi’ah",
                image: "?",
                position: "Koordinator",
              },
              {
                id: "30",
                name: "Sandykha Pratama Pesarista",
                image: "?",
                position: "Anggota",
              },
            ],
          },
          {
            id: "10",
            name: "Kemampuan Bahasa",
            image: "/images/placeholder.jpg",
            visi: "Meningkatkan kemampuan bahasa siswa",
            misi: "Menyelenggarakan program bahasa",
            tasks: "Koordinasi kegiatan bahasa, pembinaan siswa",
            programs: ["Program Bahasa", "Workshop Bahasa"],
            members: [
              {
                id: "31",
                name: "Mochammad Prasetyo",
                image: "?",
                position: "Koordinator",
              },
              {
                id: "32",
                name: "Radhina Dzahabbiyah",
                image: "?",
                position: "Anggota",
              },
            ],
          },
        ],
        activities: [],
        recruitmentPoster: "/images/organisasi/poster/OSIS.webp",
        recruitmentPeriod: "1-15 September 2024",
      },
      {
        id: "2",
        slug: "pmr",
        name: "PMR",
        logo: "/images/organisasi/PMR.webp",
        description:
          "PMR adalah singkatan dari Palang Merah Remaja, sebuah organisasi kepemudaan dan kemanusia. Organisasi ini bertujuan untuk menanamkan prinsip-prinsip Palang Merah, mengembangkan keterampilan sosial dan kemanusiaan, serta melatih anggota untuk menjadi relawan PMI di masa depan.",
        shortDescription:
          "Organisasi Palang Merah Remaja yang fokus pada layanan kemanusiaan dan kesehatan.",
        logoDescriptions: {
          maknaSimbol: [
            "Bunga Berkelopak Lima: Melambangkan lima prinsip dasar gerakan Palang Merah dan Bulan Sabit Merah Internasional: Kemanusiaan, Kesamaan, Kenetralan, Kemandirian, Kesukarelaan, Kesatuan, Kesemestaan.",
            "Palang Merah di Tengah: Merupakan simbol Palang Merah Internasional yang melambangkan pertolongan tanpa pamrih, netral, dan universal.",
            'Tulisan "PMR": Menunjukkan identitas sebagai bagian dari Palang Merah Remaja di sekolah atau instansi tertentu.',
          ],
          maknaWarna: [
            "Putih (pada bunga): Menggambarkan kesucian dan ketulusan hati anggota PMR dalam menolong sesama.",
            "Merah (pada palang): Memiliki arti keberanian dan semangat kemanusiaan.",
          ],
        },
        vision:
          "Menumbuhkan jiwa peduli kemanusiaan dan semangat tolong-menolong di kalangan anggota PMR untuk mewujudkan generasi yang berempati, tangguh, dan siap membantu sesama.",
        mission:
          "Mengembangkan rasa empati dan kepedulian sosial, meningkatkan keterampilan pertolongan pertama, menumbuhkan semangat kerja sama, melaksanakan kegiatan sosial, dan menjadi teladan dalam sikap saling menolong.",
        history:
          "PMR telah berperan aktif dalam kegiatan sosial dan kesehatan siswa. Dengan semangat kemanusiaan, PMR SMKN 2 Singosari terus memberikan pelayanan kesehatan dan bantuan sosial kepada masyarakat sekitar sekolah.",
        established: "2005",
        statistics: {
          members: 16,
          programs: 15,
          years: 20,
          meetings: 36,
        },
        contactInfo: {
          instagram: [{ label: "Instagram", handle: "pmr_smkn2sgs" }],
        },
        leadership: {
          ketua: [
            {
              id: "33",
              name: "Rasyika Salsabila",
              image: "?",
              position: "Ketua Umum",
            },
          ],
          wakil: [
            {
              id: "34",
              name: "Refli Maulana Izat",
              image: "?",
              position: "Wakil Ketua",
            },
          ],
          sekretaris: [
            {
              id: "35",
              name: "Chesylia Anggie Pertiwi",
              image: "?",
              position: "Sekretaris 1",
            },
            {
              id: "36",
              name: "Febby Anggun Cahyani",
              image: "?",
              position: "Sekretaris 2",
            },
          ],
          bendahara: [
            {
              id: "37",
              name: "Salvia Okta Difianti",
              image: "?",
              position: "Bendahara 1",
            },
            {
              id: "38",
              name: "Amelia Putri Irawati",
              image: "?",
              position: "Bendahara 2",
            },
          ],
        },
        sections: [
          {
            id: "1",
            name: "Divisi Kedisplinan",
            image: "/images/placeholder.jpg",
            visi: "Menjaga kedisiplinan dan ketertiban di lingkungan sekolah",
            misi: "Membentuk siswa yang disiplin dan bertanggung jawab",
            tasks: "Pengawasan kedisiplinan, pembinaan siswa",
            programs: ["Patroli Sekolah", "Pembinaan Karakter", "Penegakan Tata Tertib"],
            members: [
              {
                id: "39",
                name: "Mutia Amanda Saraphova",
                image: "?",
                position: "Koordinator",
              },
            ],
          },
          {
            id: "2",
            name: "Divisi Perlengkapan",
            image: "/images/placeholder.jpg",
            visi: "Menjadi pusat pengelolaan perlengkapan dan logistik",
            misi: "Menyediakan dan mengelola kebutuhan perlengkapan organisasi",
            tasks: "Pengadaan perlengkapan, inventarisasi, distribusi",
            programs: ["Manajemen Inventaris", "Pengadaan Alat", "Distribusi Logistik"],
            members: [
              {
                id: "40",
                name: "Denis Widya",
                image: "?",
                position: "Koordinator",
              },
              {
                id: "41",
                name: "Chanda Zulia Lestari",
                image: "?",
                position: "Anggota",
              },
            ],
          },
          {
            id: "3",
            name: "Divisi Humas",
            image: "/images/placeholder.jpg",
            visi: "Menjadi jembatan komunikasi antara organisasi dan masyarakat",
            misi: "Menyampaikan informasi dan membangun citra positif",
            tasks: "Publikasi kegiatan, media sosial, hubungan masyarakat",
            programs: ["Media Sosial", "Publikasi", "Event Promotion"],
            members: [
              {
                id: "42",
                name: "Maulida Latifatul Ismi",
                image: "?",
                position: "Koordinator",
              },
            ],
          },
          {
            id: "4",
            name: "Divisi Kesehatan 1",
            image: "/images/placeholder.jpg",
            visi: "Menjadi garda terdepan dalam pelayanan kesehatan siswa",
            misi: "Memberikan pertolongan pertama dan edukasi kesehatan",
            tasks: "Pertolongan pertama, penyuluhan kesehatan, donor darah",
            programs: ["UKS Sekolah", "Donor Darah", "Penyuluhan Kesehatan"],
            members: [
              {
                id: "43",
                name: "Bella Putri Rahmadhani",
                image: "?",
                position: "Koordinator",
              },
            ],
          },
          {
            id: "5",
            name: "Divisi Kesehatan 2",
            image: "/images/placeholder.jpg",
            visi: "Mendukung program kesehatan sekolah secara menyeluruh",
            misi: "Melengkapi pelayanan kesehatan siswa",
            tasks: "Pemeriksaan kesehatan, program kesehatan, emergency response",
            programs: ["Pemeriksaan Kesehatan", "Program Kesehatan", "Emergency Response"],
            members: [
              {
                id: "44",
                name: "Nur Khasanah Fathiniyah",
                image: "?",
                position: "Koordinator",
              },
            ],
          },
          {
            id: "6",
            name: "Divisi Keamanan 1",
            image: "/images/placeholder.jpg",
            visi: "Menjaga keamanan dan ketertiban lingkungan sekolah",
            misi: "Menciptakan lingkungan yang aman dan nyaman",
            tasks: "Pengamanan area, patroli keamanan, pencegahan kejahatan",
            programs: ["Patroli Keamanan", "Pengamanan Event", "Pencegahan Kecelakaan"],
            members: [
              {
                id: "45",
                name: "M. Divan Rossy A.F",
                image: "?",
                position: "Koordinator",
              },
            ],
          },
          {
            id: "7",
            name: "Divisi Keamanan 2",
            image: "/images/placeholder.jpg",
            visi: "Mendukung keamanan sekolah secara komprehensif",
            misi: "Melengkapi sistem keamanan sekolah",
            tasks: "Monitoring keamanan, koordinasi security, emergency handling",
            programs: ["Monitoring CCTV", "Koordinasi Security", "Emergency Handling"],
            members: [
              {
                id: "46",
                name: "M. Shaiku Malek",
                image: "?",
                position: "Koordinator",
              },
            ],
          },
          {
            id: "8",
            name: "Divisi PDD",
            image: "/images/placeholder.jpg",
            visi: "Mengembangkan potensi siswa melalui pendidikan dan dakwah",
            misi: "Menyelenggarakan program pendidikan dan dakwah",
            tasks: "Program pendidikan, dakwah islamiyah, pembinaan spiritual",
            programs: ["Pendidikan Islam", "Dakwah", "Pembinaan Rohani"],
            members: [
              {
                id: "47",
                name: "Syakila Putri Arifianti",
                image: "?",
                position: "Koordinator 1",
              },
              {
                id: "48",
                name: "Radhina Dzahabiyyah ya'lafuna",
                image: "?",
                position: "Koordinator 2",
              },
            ],
          },
        ],
        activities: [],
        recruitmentPoster: "/images/organisasi/poster/PMR.jpg",
        recruitmentPeriod: "2025/2026",
      },
      {
        id: "3",
        slug: "linorasi",
        name: "LINORASI",
        logo: "/images/organisasi/LINORASI.webp",
        description:
          "LINORASI merupakan salah satu wadah mengembangkan inovasi dan kreasi siswa SMK Negeri 2 Singosari, serta memberikan kesempatan untuk menjalin kerjasama dengan berbagai pihak.",
        shortDescription:
          "Organisasi literasi yang mempromosikan inovasi dan kreativitas di antara siswa.",
        logoDescriptions: {
          maknaSimbol: [
            'Tulisan "Literasi": Merupakan penegasan bahwa logo ini adalah milik literasi sekolah SMK Negeri 2 Singosari.',
            "Burung Terbang: Melambangkan kebebasan murid dalam berkarya dan menuangkan ide-ide positif.",
            "Buku: Menggambarkan jendela ilmu sebagai sumber pengetahuan untuk menemukan ide dan inovasi.",
            "Daun: Melambangkan kontribusi guru dalam memberikan pengetahuan kepada murid.",
          ],
          maknaWarna: [
            "Oranye: Merupakan simbol percaya diri dan kemampuan bersosialisasi.",
            "Biru: Merupakan lambang profesionalisme, kekuatan, ketenangan, serta mampu merangsang kemampuan berkomunikasi dan berekspresi.",
          ],
        },
        vision:
          "Mewujudkan generasi yang cerdas, kreatif, ahli dalam menulis dan berkarya, serta mampu menghadapi persaingan global dan menciptakan murid yang berkarakter.",
        mission:
          "Melestarikan budaya literasi, meningkatkan kreativitas murid dalam menulis, dan mewujudkan ekskul yang menenangkan dan mencerdaskan serta membentuk karakter murid.",
        history:
          "LINORASI didirikan untuk mendorong inovasi dan pencapaian prestasi siswa. Melalui berbagai program inovatif, LINORASI telah berhasil membawa nama sekolah ke tingkat yang lebih tinggi dalam berbagai kompetisi dan ajang prestasi.",
        established: "2022",
        statistics: {
          members: 15,
          programs: 20,
          years: 3,
          meetings: 30,
        },
        contactInfo: {
          instagram: [{ label: "Instagram", handle: "linorasi22" }],
        },
        leadership: {
          ketua: [
            {
              id: "49",
              name: "Akhyar Bima Arizkillah",
              image: "?",
              position: "Ketua",
            },
          ],
          wakil: [
            {
              id: "50",
              name: "Alfin Vigo Ardiansya",
              image: "?",
              position: "Wakil Ketua",
            },
          ],
          sekretaris: [
            {
              id: "51",
              name: "Cinta Monicha Aprilia",
              image: "?",
              position: "Sekretaris & Bendahara",
            },
            {
              id: "52",
              name: "Sherina Najwa Novianti",
              image: "?",
              position: "Sekretaris & Bendahara",
            },
          ],
          bendahara: [],
        },
        sections: [
          {
            id: "1",
            name: "Koordinator Piket",
            image: "/images/placeholder.jpg",
            visi: "Menjaga ketertiban dan kedisiplinan siswa",
            misi: "Mengkoordinasikan sistem piket untuk menjaga lingkungan sekolah",
            tasks: "Pengaturan jadwal piket, pengawasan kebersihan, pembinaan disiplin",
            programs: ["Sistem Piket Harian", "Pembinaan Kedisiplinan", "Program Kebersihan"],
            members: [
              {
                id: "53",
                name: "Fitriana Mozarelyn Hakim",
                image: "?",
                position: "Koordinator",
              },
              {
                id: "54",
                name: "Alika Maulidya Rahmawati",
                image: "?",
                position: "Koordinator",
              },
            ],
          },
          {
            id: "2",
            name: "Sosial Media",
            image: "/images/placeholder.jpg",
            visi: "Menjadi pusat informasi dan komunikasi digital",
            misi: "Mengelola media sosial untuk menyebarkan informasi positif",
            tasks: "Konten creation, social media management, digital marketing",
            programs: ["Content Creation", "Social Media Campaign", "Digital Storytelling"],
            members: [
              {
                id: "55",
                name: "Zahra Aulia Ramadhani",
                image: "?",
                position: "Koordinator",
              },
              {
                id: "56",
                name: "Nur Khasanah Fathiniyah",
                image: "?",
                position: "Anggota",
              },
              {
                id: "57",
                name: "Aliffiansyah Fitra Fahrezi",
                image: "?",
                position: "Anggota",
              },
            ],
          },
          {
            id: "3",
            name: "Dokumentasi",
            image: "/images/placeholder.jpg",
            visi: "Mencatat dan mendokumentasikan kegiatan organisasi",
            misi: "Membuat dokumentasi yang berkualitas untuk arsip dan publikasi",
            tasks: "Fotografi, videografi, editing, arsip digital",
            programs: ["Event Documentation", "Photo Editing", "Video Production"],
            members: [
              {
                id: "58",
                name: "Desy Indah Mutiara",
                image: "?",
                position: "Koordinator",
              },
              {
                id: "59",
                name: "Muhammad Alexandra Femilianto",
                image: "?",
                position: "Anggota",
              },
            ],
          },
          {
            id: "4",
            name: "Mading",
            image: "/images/placeholder.jpg",
            visi: "Menjadi wadah kreativitas siswa dalam bidang jurnalistik",
            misi: "Mengembangkan kemampuan menulis dan berkreasi siswa",
            tasks: "Pembuatan mading, artikel, desain grafis, publikasi",
            programs: ["Mading Sekolah", "Lomba Menulis", "Workshop Jurnalistik"],
            members: [
              {
                id: "60",
                name: "Emil Dio Ramadani",
                image: "?",
                position: "Koordinator",
              },
              {
                id: "61",
                name: "Aditya Genta Fahrezi",
                image: "?",
                position: "Anggota",
              },
              {
                id: "62",
                name: "Jose Manuel Kartika",
                image: "?",
                position: "Anggota",
              },
              {
                id: "63",
                name: "Deva Dirgantara Cahaya Loviananda",
                image: "?",
                position: "Anggota",
              },
            ],
          },
        ],
        activities: [],
        recruitmentPoster: "/images/organisasi/poster/LINORASI.webp",
        recruitmentPeriod: "2024-2025",
      },
      {
        id: "4",
        slug: "bdi",
        name: "BDI",
        logo: "/images/organisasi/BDI.webp",
        description:
          "BDI (Badan Dakwah Islam) adalah organisasi keislaman di lingkungan sekolah yang bergerak dalam kegiatan dakwah, pembinaan keagamaan, dan pengembangan karakter Islami bagi siswa-siswi.",
        shortDescription:
          "Organisasi Dakwah Islam yang membina nilai-nilai agama dan pengembangan karakter.",
        logoDescriptions: {
          maknaSimbol: [
            "Segitiga: Melambangkan semangat dalam meneladani sunnah Rasulullah SAW.",
            "Lingkaran: Mewakili kekompakan dan rasa saling memahami antar anggota BDI.",
            "Bintang Besar: Melambangkan Nabi Muhammad SAW sebagai suri teladan utama.",
            "Empat Bintang di Samping: Melambangkan Khulafaur Rasyidin.",
            "Empat Bintang di Bawah: Melambangkan empat imam besar mazhab: Imam Hanafi, Imam Maliki, Imam Syafi'i, dan Imam Hambali.",
            "Buku dan Pena: Simbol bahwa anggota BDI bersungguh-sungguh dalam menuntut ilmu agama maupun umum.",
            "Garuda: Mengandung makna bahwa BDI menjunjung tinggi nilai-nilai Pancasila dan cinta tanah air.",
            "Garis Hijau Melengkung: Menggambarkan kesiapan BDI dalam menyelenggarakan dan mengembangkan kegiatan keislaman di sekolah.",
            'Teks "ROIS AAM": Menunjukkan peran anggota BDI sebagai pemimpin dan teladan dalam hal keagamaan.',
          ],
          maknaWarna: [
            "Hijau: Melambangkan kejayaan dan kesuburan.",
            "Putih: Melambangkan kesucian, ketulusan, dan niat yang bersih.",
            "Kuning: Melambangkan keceriaan, semangat, dan optimisme.",
          ],
        },
        vision:
          "Menjadi organisasi pelajar yang membimbing siswa-siswi menuju pribadi yang beriman, berakhlak mulia, dan cinta Islam, melalui dakwah yang membumi, menyenangkan, dan membangun.",
        mission:
          "Menyediakan ruang pembinaan keislaman yang ramah, menghadirkan kegiatan dakwah yang kreatif dan inspiratif, membantu siswa dalam membentuk karakter Islami, mendampingi siswa dalam mengenal dan mencintai ajaran Islam, dan mengajak siswa-siswi berkontribusi positif di sekolah dan masyarakat.",
        history:
          "BDI didirikan untuk memperkuat nilai-nilai keislaman di lingkungan sekolah. Dengan berbagai program keagamaan, BDI telah berhasil menciptakan lingkungan yang kondusif untuk pengembangan spiritual siswa.",
        established: "2008",
        statistics: {
          members: 23,
          programs: 18,
          years: 17,
          meetings: 40,
        },
        contactInfo: {
          instagram: [
            {
              label: "Instagram",
              handle: "https://www.instagram.com/bdi_stemdasi?igsh=M2Rjb2k4endkczR6",
            },
          ],
        },
        leadership: {
          ketua: [
            {
              id: "64",
              name: "Rachma Rizkia Herry Putri",
              image: "?",
              position: "Ketua",
            },
          ],
          wakil: [
            {
              id: "65",
              name: "Achmad Achzam Beinargi",
              image: "?",
              position: "Wakil Ketua",
            },
          ],
          sekretaris: [
            {
              id: "66",
              name: "Iqbal Yanuaris",
              image: "?",
              position: "Sekretaris 1",
            },
            {
              id: "67",
              name: "Ananta Putra Dharmawan",
              image: "?",
              position: "Sekretaris 2",
            },
          ],
          bendahara: [
            {
              id: "68",
              name: "Yayan Putra Wahyudi",
              image: "?",
              position: "Bendahara 1",
            },
            {
              id: "69",
              name: "Luluk Fika ulmillah Handoko",
              image: "?",
              position: "Bendahara 2",
            },
          ],
        },
        sections: [
          {
            id: "1",
            name: "Tahlil dan Istighosah",
            image: "/images/placeholder.jpg",
            visi: "Menjadi pusat kegiatan tahlil dan istighosah",
            misi: "Menyelenggarakan kegiatan tahlil dan istighosah untuk pengembangan spiritual",
            tasks: "Pengorganisasian tahlil, istighosah, pembinaan spiritual",
            programs: ["Tahlil Rutin", "Istighosah", "Pembinaan Rohani"],
            members: [
              {
                id: "70",
                name: "Muhammad Alvin Nur Roihan",
                image: "?",
                position: "Koordinator",
              },
              {
                id: "71",
                name: "Ananda Achmad Furqon",
                image: "?",
                position: "Anggota",
              },
              {
                id: "72",
                name: "Muhammad Saikhu Malek",
                image: "?",
                position: "Anggota",
              },
              {
                id: "73",
                name: "Sherina Najwa Novianti",
                image: "?",
                position: "Anggota",
              },
            ],
          },
          {
            id: "2",
            name: "Amal Jum’at",
            image: "/images/placeholder.jpg",
            visi: "Menjadi pusat kegiatan amal jum'at",
            misi: "Menyelenggarakan kegiatan amal jum'at dan pengembangan sosial",
            tasks: "Pengorganisasian amal jum'at, kegiatan sosial, bakti sosial",
            programs: ["Amal Jum'at", "Bakti Sosial", "Kegiatan Sosial"],
            members: [
              {
                id: "74",
                name: "Muhammad Arif Muzaky Hilmi",
                image: "?",
                position: "Koordinator",
              },
              {
                id: "75",
                name: "Densel Starina",
                image: "?",
                position: "Anggota",
              },
              {
                id: "76",
                name: "Ayu Wulandari",
                image: "?",
                position: "Anggota",
              },
              {
                id: "77",
                name: "Irfan Hamid",
                image: "?",
                position: "Anggota",
              },
            ],
          },
          {
            id: "3",
            name: "Tadarus Pagi",
            image: "/images/placeholder.jpg",
            visi: "Menjadi pusat kegiatan tadarus pagi",
            misi: "Menyelenggarakan tadarus pagi untuk pengembangan spiritual",
            tasks: "Pengorganisasian tadarus pagi, pembinaan membaca Al-Qur'an",
            programs: ["Tadarus Pagi", "Pembinaan Al-Qur'an", "Kegiatan Rohani"],
            members: [
              {
                id: "78",
                name: "Azizi Haikal An Nur",
                image: "?",
                position: "Koordinator",
              },
              {
                id: "79",
                name: "M Deva Prasetyo",
                image: "?",
                position: "Anggota",
              },
              {
                id: "80",
                name: "Moch Alief Zainudin Nasrullah",
                image: "?",
                position: "Anggota",
              },
              {
                id: "81",
                name: "Moh Agung Asraf Annabil",
                image: "?",
                position: "Anggota",
              },
            ],
          },
          {
            id: "4",
            name: "Banjari",
            image: "/images/placeholder.jpg",
            visi: "Menjadi pusat kegiatan banjari dan seni islami",
            misi: "Menyelenggarakan kegiatan banjari dan pengembangan seni islami",
            tasks: "Pengorganisasian banjari, latihan seni islami, pertunjukan",
            programs: ["Banjari", "Seni Islami", "Pertunjukan Seni"],
            members: [
              {
                id: "82",
                name: "M. Nizar Fadillah",
                image: "?",
                position: "Koordinator",
              },
              {
                id: "83",
                name: "Saidatul Aliyah",
                image: "?",
                position: "Anggota",
              },
              {
                id: "84",
                name: "M. Chamim Bayhaqi",
                image: "?",
                position: "Anggota",
              },
              {
                id: "85",
                name: "Denis Arya Chandra",
                image: "?",
                position: "Anggota",
              },
            ],
          },
        ],
        activities: [],
        recruitmentPoster: "/images/organisasi/poster/BDI.webp",
        recruitmentPeriod: "2025 - 2026",
      },
      {
        id: "5",
        slug: "ambalan",
        name: "AMBALAN",
        logo: "/images/organisasi/AMBALAN.webp",
        description:
          "Ambalan Siliwangi–Srikandi (S4AC) adalah organisasi kepramukaan di SMKN 2 Singosari yang pertama kali diresmikan pada tanggal 2 November 2009. Ambalan ini menjadi wadah pengembangan diri bagi siswa berusia 16–20 tahun, khususnya Pramuka Penegak. Nama Siliwangi diambil untuk putra, melambangkan pribadi tegas, berwibawa, dan bijaksana, sementara nama Srikandi untuk putri mencerminkan sosok tangguh, gagah, dan tidak mudah menyerah, meski menghadapi berbagai tantangan.",
        shortDescription:
          "Organisasi pramuka yang mengembangkan keterampilan kepemimpinan dan survival melalui kegiatan pramuka.",
        logoDescriptions: {
          maknaSimbol: [
            "Bentuk Segi Lima: Menggambarkan Pancasila.",
            "Tulisan Siliwangi-Srikandi: Siliwangi bermakna kesiapan untuk menjadi pemimpin, sementara Srikandi bermakna kemampuan untuk mengeluarkan segala potensi demi kebaikan.",
            "Nomor 26177 – 26178: Merupakan nomor gugus depan.",
            "Padi dan Kapas: Melambangkan kemakmuran serta kebutuhan sandang dan pangan.",
            "Kujang: Senjata khas Sunda yang melambangkan kekuatan dan keberanian.",
            "Busur dan Anak Panah: Melambangkan bahwa anggota Pramuka memiliki tujuan mulia dalam setiap kegiatannya.",
            "Api: Memiliki makna semangat yang terus berkobar dan keyakinan yang tidak pernah padam.",
            "WOSM (World Organization of the Scout Movement): Merupakan lambang kepanduan sedunia.",
            "Tunas Kelapa: Bermakna bahwa anggota Pramuka dapat hidup di mana saja dan bermanfaat bagi masyarakat.",
          ],
          maknaWarna: [
            "Biru Tua: Terinspirasi dari laut, melambangkan ketangguhan dan kepercayaan.",
            "Biru Muda: Terinspirasi dari langit, melambangkan harapan yang setinggi langit.",
          ],
        },
        vision:
          "Memiliki kepribadian yang beriman, bertakwa, berakhlak mulia, berjiwa patriotik, taat hukum, disiplin, menjunjung tinggi nilai-nilai luhur bangsa, berkecakapan hidup, sehat jasmani, dan rohani serta memiliki rasa toleransi. Menjadi warga negara yang berjiwa Pancasila, setia dan patuh kepada Negara Kesatuan Republik Indonesia serta menjadi masyarakat yang baik dan berguna.",
        mission:
          "Menumbuhkan tunas bangsa yang berkarakter, menyelenggarakan pendidikan kepramukaan, dan mampu membina serta mengisi kemerdekaan.",
        history:
          "AMBALAN di SMK Negeri 2 Singosari telah lama menjadi bagian dari kegiatan ekstrakurikuler yang membantu siswa mengembangkan keterampilan survival, kepemimpinan, dan jiwa sosial.",
        established: "2009",
        statistics: {
          members: 21,
          programs: 40,
          years: 16,
          meetings: 4,
        },
        contactInfo: {
          instagram: [{ label: "S4AC Scout", handle: "s4acscout.official" }],
          whatsapp: [
            { label: "Pradana", number: "08990409149" },
            { label: "Pembina", number: "089876543211" },
          ],
          socialMedia: [
            { platform: "tiktok", handle: "@s4ac.stemdasi" },
            { platform: "youtube", handle: "@s4acsmkn2singosari43?" },
          ],
        },
        leadership: {
          ketua: [
            {
              id: "86",
              name: "Muhammad Mufid Arhaburrizqi",
              image: "?",
              position: "Pradana",
            },
            {
              id: "87",
              name: "Siti Aminah",
              image: "?",
              position: "Pradana",
            },
          ],
          sekretaris: [
            {
              id: "88",
              name: "Adhiesta Alifiani Nadhiswara",
              image: "?",
              position: "Kerani",
            },
            {
              id: "89",
              name: "Reysa Darajatina Burhani",
              image: "?",
              position: "Kerani",
            },
          ],
          bendahara: [
            {
              id: "90",
              name: "Inggrid Devianne Maharani Putri",
              image: "?",
              position: "Hartaka",
            },
          ],
          wakil: [
            {
              id: "91",
              name: "Muhammad Wisnu Dewandaru",
              image: "?",
              position: "Pemangku Adat",
            },
            {
              id: "92",
              name: "Yuyun Elistiowati",
              image: "?",
              position: "Pemangku Adat",
            },
          ],
        },
        sections: [
          {
            id: "seksi-1",
            name: "Giatkaji (Kegiatan & Pengkajian)",
            image: "/images/placeholder.jpg",
            visi: "Membentuk generasi muda yang tangguh dan berakhlak mulia",
            misi: "Mengembangkan keterampilan kepramukaan melalui kegiatan rutin dan program edukasi",
            tasks: "Mengorganisir kegiatan jambore, latihan survival, dan pendidikan karakter",
            programs: [
              "Latihan dasar kepramukaan",
              "Kegiatan jambore",
              "Pelatihan survival",
              "Pendidikan lingkungan",
              "Kegiatan sosial",
            ],
            members: [
              {
                id: "93",
                name: "Kent J Luffy",
                image: "?",
                position: "Ketua Sie",
              },
              {
                id: "94",
                name: "Chalisa Cahaya Santika",
                image: "?",
                position: "Anggota",
              },
              {
                id: "95",
                name: "M. Saikhu Malek",
                image: "?",
                position: "Anggota",
              },
            ],
          },
          {
            id: "seksi-2",
            name: "Tekpram (Teknik Kepramukaan)",
            image: "/images/placeholder.jpg",
            visi: "Mengembangkan teknik kepramukaan",
            misi: "Melatih teknik-teknik kepramukaan",
            tasks: "Pelatihan teknik kepramukaan",
            programs: ["Pelatihan Teknik", "Latihan Kepramukaan"],
            members: [
              {
                id: "96",
                name: "Malik Fajar Al Amri",
                image: "?",
                position: "Ketua Sie",
              },
              {
                id: "97",
                name: "Razzaq Zhahir Jaka Putra",
                image: "?",
                position: "Anggota",
              },
              {
                id: "98",
                name: "Muhammad Alexandra Femilianto",
                image: "?",
                position: "Anggota",
              },
            ],
          },
          {
            id: "seksi-3",
            name: "Giatops (Kegiatan Operasional)",
            image: "/images/placeholder.jpg",
            visi: "Mengorganisir kegiatan operasional",
            misi: "Melaksanakan kegiatan operasional pramuka",
            tasks: "Pengorganisasian kegiatan operasional",
            programs: ["Kegiatan Operasional", "Event Pramuka"],
            members: [
              {
                id: "99",
                name: "Febby Anggun",
                image: "?",
                position: "Ketua Sie",
              },
              {
                id: "100",
                name: "Fika Rizty Amelia",
                image: "?",
                position: "Anggota",
              },
            ],
          },
          {
            id: "seksi-4",
            name: "Evabang (Evaluasi & Pengembangan)",
            image: "/images/placeholder.jpg",
            visi: "Melakukan evaluasi dan pengembangan",
            misi: "Mengevaluasi dan mengembangkan program pramuka",
            tasks: "Evaluasi program, pengembangan kegiatan",
            programs: ["Evaluasi Program", "Pengembangan Kegiatan"],
            members: [
              {
                id: "101",
                name: "Tiara Nafisah",
                image: "?",
                position: "Ketua Sie",
              },
              {
                id: "102",
                name: "Miftachul Jannah",
                image: "?",
                position: "Anggota",
              },
              {
                id: "103",
                name: "Lintang Dewi Nur Fadilla",
                image: "?",
                position: "Anggota",
              },
            ],
          },
          {
            id: "seksi-5",
            name: "Humas",
            image: "/images/placeholder.jpg",
            visi: "Menjadi pusat komunikasi dan informasi",
            misi: "Mengelola hubungan masyarakat dan informasi",
            tasks: "Publikasi kegiatan, media sosial",
            programs: ["Media Sosial", "Publikasi"],
            members: [
              {
                id: "104",
                name: "Khoirotul Ilmiyah",
                image: "?",
                position: "Ketua Sie",
              },
              {
                id: "105",
                name: "Raditya Javas Nararya",
                image: "?",
                position: "Anggota",
              },
              {
                id: "106",
                name: "Radhina Dzahabiyyah Ya'lafuna",
                image: "?",
                position: "Anggota",
              },
            ],
          },
        ],
        activities: [],
        recruitmentPoster: "/images/organisasi/poster/AMBALAN.webp",
        recruitmentPeriod: "2025/2026",
      },
    ];

    const paginatedData = allOrganizations.slice(offset, offset + limit);

    return {
      data: paginatedData,
      total: allOrganizations.length,
    };
  },
);
