import {
  defineEventHandler,
  getQuery,
  readBody,
  createError,
  setCookie,
  getCookie,
} from "h3";
import type { Extracurricular } from "~/models/Extracurricular";
import { getCached, setCached, generateCacheKey, CACHE_DEFAULTS } from "../../utils/cache";

export default defineEventHandler(
  async (event): Promise<{ data: Extracurricular[]; total: number }> => {
    const query = getQuery(event);
    const limit = parseInt(query.limit as string, 10) || 50;
    const offset = parseInt(query.offset as string, 10) || 0;
    const category = query.category as string;

    // Generate cache key based on query parameters
    const cacheKey = generateCacheKey("extracurriculars", { limit, offset, category });

    // Try to get from cache first
    const cached = getCached<{ data: Extracurricular[]; total: number }>(cacheKey);
    if (cached) {
      return cached;
    }

    const allExtracurriculars: Extracurricular[] = [
      {
        id: "1",
        slug: "basket",
        name: "Basket",
        category: "Olahraga",
        icon: "lucide:dribbble",
        description:
          "Ekstrakurikuler basket untuk pengembangan keterampilan dan prestasi di bidang olahraga",
        fullDescription:
          "<p>Ekstrakurikuler basket sekolah kami telah berdiri sejak tahun 2019 dan menjadi salah satu wadah pengembangan bakat siswa di bidang olahraga. Dengan fasilitas lapangan yang memadai dan bimbingan pelatih berpengalaman, kami berkomitmen membentuk karakter sportif dan jiwa kompetitif siswa yang kuat untuk menghadapi berbagai kompetisi.</p><p>Kegiatan latihan rutin dilaksanakan tiga kali seminggu dengan fokus pada pengembangan teknik dasar, strategi permainan, dan pembentukan mental juara yang kuat untuk menghadapi berbagai kompetisi.</p>",
        image: "/images/placeholder.jpg",
        coach: "Coach Budi Santoso",
        schedule: "Senin, Rabu, Jumat - 15:30-17:00 WIB",
        location: "Lapangan Basket Sekolah",

        memberCount: 50,
        achievementCount: 10,
        yearEstablished: 2019,
        meetingsPerWeek: 3,
        registrationOpen: true,
        registrationPeriod: "Pendaftaran dibuka: 1-31 Juli 2024",
        contactInfo: "Coach Budi: 0812-3456-7890",
        requirements: [
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
            description:
              "Event tahunan yang melibatkan siswa dalam kompetisi volley untuk mempererat tali persaudaraan",
            date: "15 Mei 2024",
          },
          {
            id: "4",
            image: "/images/placeholder.jpg",
            title: "Workshop Strategi Permainan",
            description:
              "Sesi pembelajaran tentang taktik permainan volley yang dipimpin oleh pelatih profesional",
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
            description:
              "Pemain berhasil meraih medali emas dalam kompetisi badminton tingkat daerah",
            date: "20 Februari 2024",
          },
          {
            id: "2",
            image: "/images/placeholder.jpg",
            title: "Pelatihan Teknik Smash",
            description:
              "Program intensif untuk meningkatkan kemampuan smash dan drop shot",
            date: "18 April 2024",
          },
          {
            id: "3",
            image: "/images/placeholder.jpg",
            title: "Turnamen Sekolah",
            description:
              "Kompetisi internal untuk mempromosikan olahraga badminton di sekolah",
            date: "30 Mei 2024",
          },
          {
            id: "4",
            image: "/images/placeholder.jpg",
            title: "Workshop dengan Atlet Profesional",
            description:
              "Sesi bersama atlet profesional untuk belajar strategi permainan",
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
        description:
          "Ekstrakurikuler futsal untuk mengembangkan keterampilan permainan indoor dan kerja sama tim",
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
            description:
              "Tim futsal berhasil meraih juara 2 dalam kompetisi tingkat kota",
            date: "25 Maret 2024",
          },
          {
            id: "2",
            image: "/images/placeholder.jpg",
            title: "Pelatihan Teknik Dasar",
            description:
              "Program latihan untuk meningkatkan teknik passing dan shooting",
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
        id: "6",
        slug: "english-club",
        name: "English Club",
        category: "Bahasa",
        icon: "lucide:languages",
        description:
          "Ekstrakurikuler English Club untuk pengembangan kemampuan bahasa Inggris siswa",
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
        description:
          "Ekstrakurikuler tari untuk pengembangan kreativitas dan ekspresi seni siswa",
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
        description:
          "Ekstrakurikuler karawitan untuk pengembangan musik tradisional Jawa",
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
        description:
          "Ekstrakurikuler photography untuk pengembangan keterampilan fotografi dan kreativitas visual",
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
      {
        id: "11",
        slug: "robotics",
        name: "Robotics Club",
        category: "Teknologi",
        icon: "lucide:cpu",
        description:
          "Ekstrakurikuler robotics untuk pengembangan kemampuan STEM dan robotika",
        fullDescription:
          "<p>Ekstrakurikuler robotics sekolah kami telah berdiri sejak tahun 2021 dan menjadi wadah pengembangan bakat siswa di bidang sains dan teknologi. Dengan bimbingan guru teknologi, kami membentuk siswa yang memiliki kemampuan merancang dan memprogram robot.</p><p>Kegiatan meliputi pembelajaran pemrograman, desain mekanik, dan kompetisi robotika.</p>",
        image: "/images/placeholder.jpg",
        coach: "Guru Teknik Harendra",
        schedule: "Senin, Kamis - 15:00-17:00 WIB",
        location: "Lab Teknologi Sekolah",

        memberCount: 30,
        achievementCount: 8,
        yearEstablished: 2021,
        meetingsPerWeek: 2,
        registrationOpen: true,
        registrationPeriod: "Pendaftaran dibuka: 1-31 Juli 2024",
        contactInfo: "Guru Harendra: 0823-0123-4567",
        requirements: [
          "Mengisi formulir pendaftaran",
          "Surat persetujuan orang tua",
          "Pengetahuan dasar pemrograman (dianjurkan)",
          "Pas foto 3x4 (2 lembar)",
        ],
        activities: [
          {
            id: "1",
            image: "/images/placeholder.jpg",
            title: "Kompetisi Robot Balap",
            description: "Kompetisi merancang dan memprogram robot balap",
            date: "19 Maret 2024",
          },
          {
            id: "2",
            image: "/images/placeholder.jpg",
            title: "Workshop Pemrograman Arduino",
            description: "Pelatihan pemrograman Arduino untuk robotika",
            date: "24 April 2024",
          },
          {
            id: "3",
            image: "/images/placeholder.jpg",
            title: "Pameran Inovasi Teknologi",
            description: "Pameran hasil karya robot siswa",
            date: "29 Mei 2024",
          },
          {
            id: "4",
            image: "/images/placeholder.jpg",
            title: "Kompetisi STEM Nasional",
            description: "Partisipasi dalam kompetisi robotika nasional",
            date: "5 Juli 2024",
          },
        ],
      },
    ];

    let filtered = allExtracurriculars;
    if (category && category !== "Semua") {
      filtered = allExtracurriculars.filter((e) => e.category === category);
    }

    const paginatedData = filtered.slice(offset, offset + limit);

    const result = {
      data: paginatedData,
      total: filtered.length,
    };

    // Cache the result for 15 minutes
    setCached(cacheKey, result, CACHE_DEFAULTS.MEDIUM);

    return result;
  },
);
