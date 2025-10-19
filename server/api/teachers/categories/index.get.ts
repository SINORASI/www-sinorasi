import type { TeacherCategory } from "~/models/Teacher";

export default defineEventHandler(
  async (event): Promise<{ data: TeacherCategory[]; total: number }> => {
    const query = getQuery(event);
    const limit = parseInt(query.limit as string, 10) || 10;
    const offset = parseInt(query.offset as string, 10) || 0;

    const allCategories: TeacherCategory[] = [
      {
        id: "pai",
        title: "Guru Pendidikan Agama Islam",
        pagination: "01/20",
        description:
          "Guru Pendidikan Agama Islam di SMK Negeri 02 Singosari fokus membangun karakter siswa yang berakhlak mulia, memahami nilai-nilai Islam, dan mengamalkannya dalam kehidupan sehari-hari.",
        classes: ["Kelas X", "Kelas XI", "Kelas XII"],
        materialsByClass: [
          {
            className: "Kelas 10",
            materials: [
              "Akhlak Mulia",
              "Al-Quran Hadits",
              "Fiqih",
              "Sejarah Islam",
              "Aqidah",
              "Praktik Ibadah",
            ],
          },
          {
            className: "Kelas 11",
            materials: [
              "Akhlak Sosial",
              "Tafsir",
              "Muamalah",
              "Peradaban Islam",
              "Tasawuf",
              "Kepemimpinan Islam",
            ],
          },
          {
            className: "Kelas 12",
            materials: [
              "Etika Bisnis Islam",
              "Kajian Kontemporer",
              "Hukum Islam",
              "Dakwah",
              "Toleransi",
              "Islam dan Sains",
            ],
          },
        ],
        teachingFocus:
          "Pembelajaran mencakup aspek spiritual, moral, dan sosial yang terintegrasi dengan lingkungan sekolah.",
        teachers: [
          {
            id: "pai-1",
            name: "Zulul Muthomimah",
            degree: "S.PdI",
            university: "Lulusan Universitas Gajah Mada",
            quote: "Mendidik dengan hati, membangun generasi berakhlak mulia.",
            image: "/images/profile-placeholder.png",
          },
          {
            id: "pai-2",
            name: "Faizatul Mukrimah",
            degree: "S.Ag",
            university: "Lulusan Universitas Indonesia",
            quote: "Ilmu tanpa amal adalah pohon tanpa buah.",
            image: "/images/profile-placeholder.png",
          },
          {
            id: "pai-3",
            name: "Ruffiah",
            degree: "S.Ag",
            university: "Lulusan Institut Teknologi Bandung",
            quote: "Jadikan setiap kesulitan sebagai peluang untuk belajar.",
            image: "/images/profile-placeholder.png",
          },
          {
            id: "pai-4",
            name: "Misbah Abdullah",
            degree: "S.Ag",
            university: "Lulusan Universitas Padjadjaran",
            quote: "Kesabaran adalah kunci keberhasilan dalam pendidikan.",
            image: "/images/profile-placeholder.png",
          },
        ],
      },
      {
        id: "produktif",
        title: "Guru Produktif",
        pagination: "01/15",
        description:
          "Guru produktif di SMK Negeri 02 Singosari berperan dalam mengajarkan keterampilan teknis dan praktis sesuai dengan program keahlian.",
        classes: [
          "Kelas X RPL",
          "Kelas XI RPL",
          "Kelas XII RPL",
          "Kelas X TKJ",
          "Kelas XI TKJ",
          "Kelas XII TKJ",
        ],
        materialsByClass: [
          {
            className: "Kelas 10",
            materials: [
              "Pemrograman Dasar",
              "Basis Data",
              "Sistem Komputer",
              "Jaringan Dasar",
              "Desain Grafis",
              "Web Development",
            ],
          },
          {
            className: "Kelas 11",
            materials: [
              "Pemrograman Berorientasi Objek",
              "Database Management",
              "Administrasi Jaringan",
              "Mobile Development",
              "UI/UX Design",
              "Cyber Security",
            ],
          },
          {
            className: "Kelas 12",
            materials: [
              "Project Management",
              "Full Stack Development",
              "Cloud Computing",
              "DevOps",
              "Machine Learning",
              "Entrepreneurship",
            ],
          },
        ],
        teachingFocus:
          "Fokus pembelajaran mencakup hands-on practice, project-based learning, dan kolaborasi dengan industri.",
        teachers: [
          {
            id: "prod-1",
            name: "Budi Santoso",
            degree: "S.Kom",
            university: "Lulusan Institut Teknologi Sepuluh Nopember",
            quote: "Inovasi adalah napas dari kemajuan teknologi.",
            image: "/images/profile-placeholder.png",
          },
          {
            id: "prod-2",
            name: "Citra Lestari",
            degree: "S.T.",
            university: "Lulusan Universitas Gajah Mada",
            quote: "Praktik adalah guru terbaik dalam dunia kejuruan.",
            image: "/images/profile-placeholder.png",
          },
          {
            id: "prod-3",
            name: "Agus Wijaya",
            degree: "M.T.",
            university: "Lulusan Universitas Indonesia",
            quote: "Kreativitas adalah kecerdasan yang sedang bersenang-senang.",
            image: "/images/profile-placeholder.png",
          },
        ],
      },
      {
        id: "bahasa-indonesia",
        title: "Guru Bahasa Indonesia",
        pagination: "01/10",
        description:
          "Guru Bahasa Indonesia di SMK Negeri 02 Singosari berfokus mengajarkan materi kebahasaan, pembuatan proposal, surat menyurat, dan berbagai keterampilan komunikasi.",
        classes: ["Kelas X", "Kelas XI", "Kelas XII"],
        materialsByClass: [
          {
            className: "Kelas 10",
            materials: [
              "Tata Bahasa",
              "Menulis Surat",
              "Membaca Pemahaman",
              "Berbicara Formal",
              "Mendengarkan Aktif",
              "Karya Sastra",
            ],
          },
          {
            className: "Kelas 11",
            materials: [
              "Proposal Bisnis",
              "Laporan Kerja",
              "Presentasi Formal",
              "Debat",
              "Kritik Sastra",
              "Jurnalistik",
            ],
          },
          {
            className: "Kelas 12",
            materials: [
              "Komunikasi Bisnis",
              "Negosiasi",
              "Public Speaking",
              "Copywriting",
              "Content Writing",
              "Skripsi/Karya Ilmiah",
            ],
          },
        ],
        teachingFocus:
          "Pembelajaran diarahkan untuk mengembangkan kemampuan komunikasi siswa baik lisan maupun tulisan.",
        teachers: [
          {
            id: "indo-1",
            name: "Siti Rahayu",
            degree: "S.Pd.",
            university: "Lulusan Universitas Negeri Jakarta",
            quote: "Bahasa menunjukkan bangsa, mari kita lestarikan.",
            image: "/images/profile-placeholder.png",
          },
          {
            id: "indo-2",
            name: "Dewi Anggraini",
            degree: "M.Hum.",
            university: "Lulusan Universitas Padjadjaran",
            quote: "Kata-kata memiliki kekuatan untuk mengubah dunia.",
            image: "/images/profile-placeholder.png",
          },
        ],
      },
      {
        id: "matematika",
        title: "Guru Matematika",
        pagination: "01/12",
        description:
          "Guru Matematika di SMK Negeri 02 Singosari mengajarkan logika berpikir, pemecahan masalah, dan konsep matematika yang aplikatif.",
        classes: ["Kelas X", "Kelas XI", "Kelas XII"],
        materialsByClass: [
          {
            className: "Kelas 10",
            materials: [
              "Aljabar Dasar",
              "Geometri",
              "Fungsi Linear",
              "Persamaan",
              "Statistika Dasar",
              "Peluang",
            ],
          },
          {
            className: "Kelas 11",
            materials: [
              "Trigonometri",
              "Fungsi Kuadrat",
              "Barisan & Deret",
              "Matriks",
              "Vektor",
              "Transformasi",
            ],
          },
          {
            className: "Kelas 12",
            materials: [
              "Kalkulus",
              "Limit Fungsi",
              "Turunan",
              "Integral",
              "Matematika Diskrit",
              "Logika Proposisi",
            ],
          },
        ],
        teachingFocus:
          "Pembelajaran matematika diarahkan untuk mengembangkan kemampuan berpikir logis, analitis, dan sistematis.",
        teachers: [
          {
            id: "mat-1",
            name: "Endang Susilo",
            degree: "S.Si.",
            university: "Lulusan Institut Teknologi Bandung",
            quote: "Matematika adalah bahasa universal alam semesta.",
            image: "/images/profile-placeholder.png",
          },
          {
            id: "mat-2",
            name: "Rina Hartati",
            degree: "M.Sc.",
            university: "Lulusan Universitas Gadjah Mada",
            quote:
              "Logika akan membawa Anda dari A ke B. Imajinasi akan membawa Anda ke mana saja.",
            image: "/images/profile-placeholder.png",
          },
          {
            id: "mat-3",
            name: "Joko Prabowo",
            degree: "S.Pd.",
            university: "Lulusan Universitas Sebelas Maret",
            quote:
              "Jangan khawatir tentang kesulitanmu dalam matematika, aku jamin kesulitanku lebih besar.",
            image: "/images/profile-placeholder.png",
          },
        ],
      },
    ];

    const paginatedData = allCategories.slice(offset, offset + limit);

    return {
      data: paginatedData,
      total: allCategories.length,
    };
  },
);
