import type { Extracurricular } from "~/models/Extracurricular";

export default defineEventHandler(async (event): Promise<Extracurricular | null> => {
  const slug = getRouterParam(event, "slug");

<<<<<<< HEAD
=======
  // TODO: Replace with actual API call
  // const extracurricular = await $fetch(`https://your-api.com/api/extracurriculars/${slug}`);

  // Mock data
>>>>>>> 7140325c1819b5c26173ac574c14c74d52355ad5
  const extracurriculars: Extracurricular[] = [
    {
      id: "1",
      slug: "basket",
      name: "Basket",
      category: "Olahraga",
      icon: "lucide:dribbble",
<<<<<<< HEAD
      description:
        "Ekstrakurikuler basket untuk pengembangan keterampilan dan prestasi di bidang olahraga",
=======
      description: "Ekstrakurikuler basket untuk pengembangan keterampilan dan prestasi di bidang olahraga",
>>>>>>> 7140325c1819b5c26173ac574c14c74d52355ad5
      fullDescription:
        "<p>Ekstrakurikuler basket sekolah kami telah berdiri sejak tahun 2019 dan menjadi salah satu wadah pengembangan bakat siswa di bidang olahraga. Dengan fasilitas lapangan yang memadai dan bimbingan pelatih berpengalaman, kami berkomitmen membentuk karakter sportif dan jiwa kompetitif siswa.</p><p>Kegiatan latihan rutin dilaksanakan tiga kali seminggu dengan fokus pada pengembangan teknik dasar, strategi permainan, dan pembentukan mental juara yang kuat untuk menghadapi berbagai kompetisi.</p>",
      image: "/images/placeholder.jpg",
      coach: "Coach Budi Santoso",
      schedule: "Senin, Rabu, Jumat - 15:30-17:00 WIB",
      location: "Lapangan Basket Sekolah",
<<<<<<< HEAD
      fee: "Rp 150.000/bulan",
=======

>>>>>>> 7140325c1819b5c26173ac574c14c74d52355ad5
      memberCount: 50,
      achievementCount: 10,
      yearEstablished: 2019,
      meetingsPerWeek: 3,
      registrationOpen: true,
      registrationPeriod: "Pendaftaran dibuka: 1-31 Juli 2024",
      contactInfo: "Coach Budi: 0812-3456-7890",
      requirements: [
        "Siswa aktif kelas 7-11",
        "Mengisi formulir pendaftaran",
        "Surat persetujuan orang tua",
        "Sertifikat kesehatan",
        "Pas foto 3x4 (2 lembar)",
      ],
      activities: [
        {
          id: "1",
          image: "/images/placeholder.jpg",
          title: "Kejuaraan Antar Sekolah Se-Surabaya",
          description:
            "Tim basket putra berhasil meraih juara 2 dalam kompetisi bergengsi yang diikuti 32 sekolah menengah atas di Surabaya dengan persaingan yang sangat ketat",
          date: "15 Maret 2024",
        },
        {
          id: "2",
          image: "/images/placeholder.jpg",
          title: "Pelatihan Intensif Teknik Dasar",
          description:
            "Mengadakan pelatihan khusus bersama pelatih profesional untuk meningkatkan kemampuan dribbling, shooting, dan passing seluruh anggota ekstrakurikuler",
          date: "20 April 2024",
        },
        {
          id: "3",
          image: "/images/placeholder.jpg",
          title: "Turnamen Internal Antar Kelas",
          description:
            "Event tahunan yang melibatkan seluruh siswa sekolah dalam kompetisi basket antar kelas untuk mempererat tali persaudaraan dan sportivitas",
          date: "10 Mei 2024",
        },
        {
          id: "4",
          image: "/images/placeholder.jpg",
          title: "Workshop Strategi Permainan",
          description:
            "Sesi pembelajaran mendalam tentang taktik dan strategi permainan basket modern yang dipimpin langsung oleh mantan pemain profesional",
          date: "5 Juni 2024",
        },
      ],
    },
<<<<<<< HEAD
=======

    {
      id: "2",
      slug: "volley",
      name: "Volley",
      category: "Olahraga",
      icon: "lucide:volleyball",
      description:
        "Ekstrakurikuler volley untuk mengembangkan keterampilan permainan tim, kekuatan fisik, dan koordinasi siswa",
      fullDescription:
        "<p>Ekstrakurikuler volley sekolah kami telah berdiri sejak tahun 2020 dan menjadi wadah pengembangan bakat siswa di bidang olahraga tim. Dengan fasilitas lapangan yang memadai dan bimbingan pelatih berpengalaman, kami berkomitmen membentuk karakter sportif dan jiwa kerja sama yang kuat.</p><p>Kegiatan latihan rutin dilaksanakan tiga kali seminggu dengan fokus pada pengembangan teknik dasar seperti servis, smash, dan blok, serta strategi permainan untuk menghadapi berbagai kompetisi.</p>",
      image: "/images/placeholder.jpg",
      coach: "Coach Siti Aminah",
      schedule: "Selasa, Kamis, Sabtu - 14:00-16:00 WIB",
      location: "Lapangan Volley Sekolah",

      memberCount: 45,
      achievementCount: 8,
      yearEstablished: 2020,
      meetingsPerWeek: 3,
      registrationOpen: true,
      registrationPeriod: "Pendaftaran dibuka: 1-31 Juli 2024",
      contactInfo: "Coach Siti: 0814-7890-1234",
      requirements: [
        "Siswa aktif kelas 7-11",
        "Mengisi formulir pendaftaran",
        "Surat persetujuan orang tua",
        "Sertifikat kesehatan",
        "Pas foto 3x4 (2 lembar)",
      ],
      activities: [
        {
          id: "1",
          image: "/images/placeholder.jpg",
          title: "Kejuaraan Volley Antar Sekolah",
          description:
            "Tim volley putri berhasil meraih juara 1 dalam kompetisi yang diikuti 25 sekolah menengah atas di Surabaya",
          date: "18 Maret 2024",
        },
        {
          id: "2",
          image: "/images/placeholder.jpg",
          title: "Pelatihan Teknik Servis dan Smash",
          description:
            "Mengadakan pelatihan khusus untuk meningkatkan kemampuan servis dan smash seluruh anggota ekstrakurikuler",
          date: "25 April 2024",
        },
        {
          id: "3",
          image: "/images/placeholder.jpg",
          title: "Turnamen Internal Sekolah",
          description: "Event tahunan yang melibatkan siswa dalam kompetisi volley untuk mempererat tali persaudaraan",
          date: "15 Mei 2024",
        },
        {
          id: "4",
          image: "/images/placeholder.jpg",
          title: "Workshop Strategi Permainan",
          description: "Sesi pembelajaran tentang taktik permainan volley yang dipimpin oleh pelatih profesional",
          date: "10 Juni 2024",
        },
      ],
    },
    {
      id: "3",
      slug: "badminton",
      name: "Badminton",
      category: "Olahraga",
      icon: "lucide:zap",
      description:
        "Ekstrakurikuler badminton untuk mengembangkan keterampilan raket, kelincahan, dan strategi permainan",
      fullDescription:
        "<p>Ekstrakurikuler badminton sekolah kami telah berdiri sejak tahun 2017 dan menjadi wadah pengembangan bakat siswa di olahraga individu. Dengan fasilitas lapangan yang berkualitas dan bimbingan pelatih ahli, kami membentuk pemain yang memiliki teknik mumpuni dan mental juara.</p><p>Latihan rutin dilakukan empat kali seminggu dengan fokus pada pengembangan teknik dasar, strategi, dan kondisi fisik untuk menghadapi kompetisi.</p>",
      image: "/images/placeholder.jpg",
      coach: "Coach Rina Sari",
      schedule: "Senin, Rabu, Jumat, Sabtu - 16:00-18:00 WIB",
      location: "Lapangan Badminton Sekolah",

      memberCount: 40,
      achievementCount: 12,
      yearEstablished: 2017,
      meetingsPerWeek: 4,
      registrationOpen: true,
      registrationPeriod: "Pendaftaran dibuka: 1-31 Juli 2024",
      contactInfo: "Coach Rina: 0815-2345-6789",
      requirements: [
        "Siswa aktif kelas 7-12",
        "Mengisi formulir pendaftaran",
        "Surat persetujuan orang tua",
        "Sertifikat kesehatan",
        "Pas foto 3x4 (2 lembar)",
        "Memiliki raket badminton",
      ],
      activities: [
        {
          id: "1",
          image: "/images/placeholder.jpg",
          title: "Kejuaraan Badminton Daerah",
          description: "Pemain berhasil meraih medali emas dalam kompetisi badminton tingkat daerah",
          date: "20 Februari 2024",
        },
        {
          id: "2",
          image: "/images/placeholder.jpg",
          title: "Pelatihan Teknik Smash",
          description: "Program intensif untuk meningkatkan kemampuan smash dan drop shot",
          date: "18 April 2024",
        },
        {
          id: "3",
          image: "/images/placeholder.jpg",
          title: "Turnamen Sekolah",
          description: "Kompetisi internal untuk mempromosikan olahraga badminton di sekolah",
          date: "30 Mei 2024",
        },
        {
          id: "4",
          image: "/images/placeholder.jpg",
          title: "Workshop dengan Atlet Profesional",
          description: "Sesi bersama atlet profesional untuk belajar strategi permainan",
          date: "15 Juni 2024",
        },
      ],
    },
    {
      id: "4",
      slug: "futsal",
      name: "Futsal",
      category: "Olahraga",
      icon: "streamline-sharp:ball",
      description: "Ekstrakurikuler futsal untuk mengembangkan keterampilan permainan indoor dan kerja sama tim",
      fullDescription:
        "<p>Ekstrakurikuler futsal sekolah kami telah berdiri sejak tahun 2019 dan menjadi wadah pengembangan bakat siswa di olahraga indoor. Dengan lapangan futsal yang berkualitas, kami membentuk pemain yang memiliki teknik dan strategi permainan yang baik.</p><p>Latihan dilakukan tiga kali seminggu dengan fokus pada teknik dasar, taktik, dan kondisi fisik.</p>",
      image: "/images/placeholder.jpg",
      coach: "Coach Dedi Kurniawan",
      schedule: "Selasa, Kamis, Sabtu - 15:30-17:30 WIB",
      location: "Lapangan Futsal Sekolah",

      memberCount: 35,
      achievementCount: 9,
      yearEstablished: 2019,
      meetingsPerWeek: 3,
      registrationOpen: true,
      registrationPeriod: "Pendaftaran dibuka: 1-31 Juli 2024",
      contactInfo: "Coach Dedi: 0816-3456-7890",
      requirements: [
        "Siswa aktif kelas 7-11",
        "Mengisi formulir pendaftaran",
        "Surat persetujuan orang tua",
        "Sertifikat kesehatan",
        "Pas foto 3x4 (2 lembar)",
      ],
      activities: [
        {
          id: "1",
          image: "/images/placeholder.jpg",
          title: "Kejuaraan Futsal Kota",
          description: "Tim futsal berhasil meraih juara 2 dalam kompetisi tingkat kota",
          date: "25 Maret 2024",
        },
        {
          id: "2",
          image: "/images/placeholder.jpg",
          title: "Pelatihan Teknik Dasar",
          description: "Program latihan untuk meningkatkan teknik passing dan shooting",
          date: "22 April 2024",
        },
        {
          id: "3",
          image: "/images/placeholder.jpg",
          title: "Turnamen Internal",
          description: "Kompetisi antar kelas untuk mempererat persaudaraan",
          date: "20 Mei 2024",
        },
        {
          id: "4",
          image: "/images/placeholder.jpg",
          title: "Workshop Taktik",
          description: "Sesi pembelajaran taktik permainan futsal modern",
          date: "18 Juni 2024",
        },
      ],
    },
    {
      id: "5",
      slug: "ambalan",
      name: "Ambalan",
      category: "Kesehatan",
      icon: "lucide:tent",
      description:
        "Ekstrakurikuler ambalan untuk pengembangan keterampilan pertolongan pertama dan kesehatan masyarakat",
      fullDescription:
        "<p>Ekstrakurikuler ambalan sekolah kami telah berdiri sejak tahun 2016 dan menjadi wadah pengembangan siswa di bidang kesehatan. Dengan bimbingan instruktur kesehatan, kami membentuk siswa yang siap membantu dalam situasi darurat.</p><p>Kegiatan meliputi latihan pertolongan pertama, simulasi kecelakaan, dan edukasi kesehatan.</p>",
      image: "/images/placeholder.jpg",
      coach: "Instruktur Maya Putri",
      schedule: "Rabu, Jumat - 14:00-16:00 WIB",
      location: "Ruang Kesehatan Sekolah",

      memberCount: 30,
      achievementCount: 6,
      yearEstablished: 2016,
      meetingsPerWeek: 2,
      registrationOpen: true,
      registrationPeriod: "Pendaftaran dibuka: 1-31 Juli 2024",
      contactInfo: "Instruktur Maya: 0817-4567-8901",
      requirements: [
        "Siswa aktif kelas 8-12",
        "Mengisi formulir pendaftaran",
        "Surat persetujuan orang tua",
        "Sertifikat kesehatan",
        "Pas foto 3x4 (2 lembar)",
      ],
      activities: [
        {
          id: "ambalan-act-1",
          image: "/images/placeholder.jpg",
          title: "Kegiatan Latgab Penegak Se – Singosari",
          description: "Kegiatan latihan gabungan penegak di Singosari.",
          date: "2025-09-13",
        },
      ],
    },
    {
      id: "6",
      slug: "pmr",
      name: "PMR",
      category: "Kesehatan",
      icon: "lucide:heart",
      description: "Ekstrakurikuler PMR untuk pengembangan keterampilan kesehatan dan kepalangmerahan",
      fullDescription:
        "<p>Ekstrakurikuler PMR sekolah kami telah berdiri sejak tahun 2015 dan menjadi wadah pengembangan siswa di bidang kesehatan dan kemanusiaan. Dengan bimbingan instruktur, kami membentuk siswa yang peduli terhadap kesehatan dan kesejahteraan orang lain.</p><p>Kegiatan meliputi latihan kesehatan, donor darah, dan kegiatan sosial.</p>",
      image: "/images/placeholder.jpg",
      coach: "Instruktur Agus Setiawan",
      schedule: "Senin, Kamis - 13:00-15:00 WIB",
      location: "Ruang PMR Sekolah",

      memberCount: 28,
      achievementCount: 7,
      yearEstablished: 2015,
      meetingsPerWeek: 2,
      registrationOpen: true,
      registrationPeriod: "Pendaftaran dibuka: 1-31 Juli 2024",
      contactInfo: "Instruktur Agus: 0818-5678-9012",
      requirements: [
        "Siswa aktif kelas 7-12",
        "Mengisi formulir pendaftaran",
        "Surat persetujuan orang tua",
        "Sertifikat kesehatan",
        "Pas foto 3x4 (2 lembar)",
      ],
      activities: [
        {
          id: "pmr-act-1",
          image: "/images/placeholder.jpg",
          title: "DIKLAT PALANG MERAH REMAJA SMKN 2 SINGOSARI",
          description: "Diklat untuk anggota PMR di SMKN 2 Singosari.",
          date: "2025-02-22",
        },
      ],
    },
    {
      id: "7",
      slug: "english-club",
      name: "English Club",
      category: "Bahasa",
      icon: "lucide:languages",
      description: "Ekstrakurikuler English Club untuk pengembangan kemampuan bahasa Inggris siswa",
      fullDescription:
        "<p>Ekstrakurikuler English Club sekolah kami telah berdiri sejak tahun 2018 dan menjadi wadah pengembangan kemampuan bahasa Inggris siswa. Dengan bimbingan guru native speaker, kami membentuk siswa yang percaya diri dalam berkomunikasi menggunakan bahasa Inggris.</p><p>Kegiatan meliputi speaking, listening, reading, dan writing, serta kegiatan budaya.</p>",
      image: "/images/placeholder.jpg",
      coach: "Teacher John Smith",
      schedule: "Selasa, Kamis - 15:00-17:00 WIB",
      location: "Ruang Bahasa Sekolah",

      memberCount: 50,
      achievementCount: 5,
      yearEstablished: 2018,
      meetingsPerWeek: 2,
      registrationOpen: true,
      registrationPeriod: "Pendaftaran dibuka: 1-31 Juli 2024",
      contactInfo: "Teacher John: 0819-6789-0123",
      requirements: [
        "Siswa aktif kelas 7-12",
        "Mengisi formulir pendaftaran",
        "Surat persetujuan orang tua",
        "Tingkat bahasa Inggris dasar",
        "Pas foto 3x4 (2 lembar)",
      ],
      activities: [
        {
          id: "1",
          image: "/images/placeholder.jpg",
          title: "English Speech Contest",
          description: "Kompetisi pidato bahasa Inggris antar siswa",
          date: "12 Maret 2024",
        },
        {
          id: "2",
          image: "/images/placeholder.jpg",
          title: "Movie Night",
          description: "Nonton film berbahasa Inggris dengan diskusi",
          date: "18 April 2024",
        },
        {
          id: "3",
          image: "/images/placeholder.jpg",
          title: "Cultural Exchange",
          description: "Pertukaran budaya dengan siswa dari negara lain",
          date: "22 Mei 2024",
        },
        {
          id: "4",
          image: "/images/placeholder.jpg",
          title: "Debate Competition",
          description: "Kompetisi debat bahasa Inggris",
          date: "28 Juni 2024",
        },
      ],
    },
    {
      id: "8",
      slug: "tari",
      name: "Tari",
      category: "Seni",
      icon: "lucide:music",
      description: "Ekstrakurikuler tari untuk pengembangan kreativitas dan ekspresi seni siswa",
      fullDescription:
        "<p>Ekstrakurikuler tari sekolah kami telah berdiri sejak tahun 2019 dan menjadi wadah pengembangan bakat siswa di bidang seni tari. Dengan bimbingan koreografer profesional, kami membentuk siswa yang memiliki kemampuan tari yang baik dan ekspresi seni yang tinggi.</p><p>Kegiatan meliputi latihan tari tradisional dan modern, serta pertunjukan.</p>",
      image: "/images/placeholder.jpg",
      coach: "Koreografer Dewi Lestari",
      schedule: "Rabu, Jumat, Sabtu - 16:00-18:00 WIB",
      location: "Studio Tari Sekolah",

      memberCount: 38,
      achievementCount: 10,
      yearEstablished: 2019,
      meetingsPerWeek: 3,
      registrationOpen: true,
      registrationPeriod: "Pendaftaran dibuka: 1-31 Juli 2024",
      contactInfo: "Koreografer Dewi: 0820-7890-1234",
      requirements: [
        "Siswa aktif kelas 7-12",
        "Mengisi formulir pendaftaran",
        "Surat persetujuan orang tua",
        "Tidak ada batasan fisik",
        "Pas foto 3x4 (2 lembar)",
      ],
      activities: [
        {
          id: "1",
          image: "/images/placeholder.jpg",
          title: "Festival Tari Daerah",
          description: "Pertunjukan tari tradisional dalam festival budaya",
          date: "14 Maret 2024",
        },
        {
          id: "2",
          image: "/images/placeholder.jpg",
          title: "Workshop Tari Modern",
          description: "Pelatihan tari modern dengan koreografer tamu",
          date: "19 April 2024",
        },
        {
          id: "3",
          image: "/images/placeholder.jpg",
          title: "Pentas Seni Sekolah",
          description: "Pertunjukan tari dalam acara pentas seni tahunan",
          date: "24 Mei 2024",
        },
        {
          id: "4",
          image: "/images/placeholder.jpg",
          title: "Kompetisi Tari",
          description: "Partisipasi dalam kompetisi tari tingkat kota",
          date: "29 Juni 2024",
        },
      ],
    },
    {
      id: "9",
      slug: "karawitan",
      name: "Karawitan",
      category: "Seni",
      icon: "lucide:music-2",
      description: "Ekstrakurikuler karawitan untuk pengembangan musik tradisional Jawa",
      fullDescription:
        "<p>Ekstrakurikuler karawitan sekolah kami telah berdiri sejak tahun 2017 dan menjadi wadah pengembangan bakat siswa di musik tradisional Jawa. Dengan bimbingan guru karawitan, kami membentuk siswa yang menghargai dan melestarikan budaya Jawa melalui musik.</p><p>Kegiatan meliputi latihan gamelan, vokal, dan pertunjukan.</p>",
      image: "/images/placeholder.jpg",
      coach: "Guru Karawitan Surya",
      schedule: "Senin, Rabu, Jumat - 14:00-16:00 WIB",
      location: "Pendopo Sekolah",

      memberCount: 25,
      achievementCount: 8,
      yearEstablished: 2017,
      meetingsPerWeek: 3,
      registrationOpen: true,
      registrationPeriod: "Pendaftaran dibuka: 1-31 Juli 2024",
      contactInfo: "Guru Surya: 0821-8901-2345",
      requirements: [
        "Siswa aktif kelas 7-12",
        "Mengisi formulir pendaftaran",
        "Surat persetujuan orang tua",
        "Minat terhadap musik tradisional",
        "Pas foto 3x4 (2 lembar)",
      ],
      activities: [
        {
          id: "1",
          image: "/images/placeholder.jpg",
          title: "Pagelaran Karawitan",
          description: "Pertunjukan karawitan dalam acara sekolah",
          date: "16 Maret 2024",
        },
        {
          id: "2",
          image: "/images/placeholder.jpg",
          title: "Latihan Gamelan",
          description: "Pelatihan intensif bermain gamelan",
          date: "21 April 2024",
        },
        {
          id: "3",
          image: "/images/placeholder.jpg",
          title: "Festival Budaya",
          description: "Partisipasi dalam festival budaya Jawa",
          date: "26 Mei 2024",
        },
        {
          id: "4",
          image: "/images/placeholder.jpg",
          title: "Workshop Musik Tradisional",
          description: "Belajar musik tradisional dengan maestro tamu",
          date: "1 Juli 2024",
        },
      ],
    },
    {
      id: "10",
      slug: "photography",
      name: "Photography",
      category: "Seni",
      icon: "lucide:camera",
      description: "Ekstrakurikuler photography untuk pengembangan keterampilan fotografi dan kreativitas visual",
      fullDescription:
        "<p>Ekstrakurikuler photography sekolah kami telah berdiri sejak tahun 2020 dan menjadi wadah pengembangan bakat siswa di bidang fotografi. Dengan bimbingan fotografer profesional, kami membentuk siswa yang memiliki kemampuan fotografi yang baik dan mata kreatif.</p><p>Kegiatan meliputi teknik fotografi, editing, dan proyek fotografi.</p>",
      image: "/images/placeholder.jpg",
      coach: "Fotografer Andi Pratama",
      schedule: "Kamis, Sabtu - 15:00-17:00 WIB",
      location: "Lab Fotografi Sekolah",

      memberCount: 32,
      achievementCount: 6,
      yearEstablished: 2020,
      meetingsPerWeek: 2,
      registrationOpen: true,
      registrationPeriod: "Pendaftaran dibuka: 1-31 Juli 2024",
      contactInfo: "Fotografer Andi: 0822-9012-3456",
      requirements: [
        "Siswa aktif kelas 8-12",
        "Mengisi formulir pendaftaran",
        "Surat persetujuan orang tua",
        "Memiliki kamera atau smartphone",
        "Pas foto 3x4 (2 lembar)",
      ],
      activities: [
        {
          id: "1",
          image: "/images/placeholder.jpg",
          title: "Pameran Foto Sekolah",
          description: "Pameran karya fotografi siswa di sekolah",
          date: "17 Maret 2024",
        },
        {
          id: "2",
          image: "/images/placeholder.jpg",
          title: "Workshop Teknik Fotografi",
          description: "Pelatihan teknik fotografi lanjutan",
          date: "22 April 2024",
        },
        {
          id: "3",
          image: "/images/placeholder.jpg",
          title: "Proyek Dokumentasi",
          description: "Proyek fotografi dokumentasi acara sekolah",
          date: "27 Mei 2024",
        },
        {
          id: "4",
          image: "/images/placeholder.jpg",
          title: "Kompetisi Fotografi",
          description: "Partisipasi dalam kompetisi fotografi tingkat daerah",
          date: "2 Juli 2024",
        },
      ],
    },
>>>>>>> 7140325c1819b5c26173ac574c14c74d52355ad5
  ];

  const extracurricular = extracurriculars.find((e) => e.slug === slug);

  if (!extracurricular) {
    throw createError({
      statusCode: 404,
      message: "Extracurricular not found",
    });
  }

  return extracurricular;
});
