import { defineEventHandler, getQuery, readBody, createError, setCookie, getCookie } from 'h3';
import type { Organization } from "~/models/Organization";

export default defineEventHandler(async (event): Promise<Organization | null> => {
  const slug = getRouterParam(event, "slug");

  const organizations: Record<string, Organization> = {
    osis: {
      id: "1",
      slug: "osis",
      name: "OSIS",
      logo: "/images/organisasi/osis.png",
      description:
        "Organisasi Siswa Intra Sekolah yang menjadi wadah bagi siswa untuk mengembangkan potensi dan kreativitas.",
      history:
        "Didirikan sejak tahun 2000, OSIS telah menjadi pilar utama dalam kegiatan siswa. OSIS SMKN 2 Singosari telah berhasil menyelenggarakan berbagai kegiatan yang bermanfaat bagi siswa, mulai dari kegiatan akademik hingga kegiatan sosial. Dengan semangat kebersamaan dan kreativitas, OSIS terus berkembang dan memberikan kontribusi positif bagi sekolah.",
      established: "2000",
      statistics: {
        members: 45,
        programs: 12,
        years: 24,
        meetings: 48,
      },
      contactInfo: {
        instagram: [{ label: "Instagram", handle: "@osis_smkn2" }],
        whatsapp: [{ label: "WhatsApp", number: "+6281234567890" }],
      },
      leadership: {
        ketua: [
          {
            id: "1",
            name: "Ahmad Rahman",
            image: "/images/profile-placeholder.png",
            position: "Ketua OSIS",
          },
        ],
        wakil: [
          {
            id: "2",
            name: "Siti Nurhaliza",
            image: "/images/profile-placeholder.png",
            position: "Wakil Ketua OSIS",
          },
        ],
        sekretaris: [
          {
            id: "3",
            name: "Budi Santoso",
            image: "/images/profile-placeholder.png",
            position: "Sekretaris",
          },
        ],
        bendahara: [
          {
            id: "4",
            name: "Maya Sari",
            image: "/images/profile-placeholder.png",
            position: "Bendahara",
          },
        ],
      },
      sections: [
        {
          id: "1",
          name: "Bidang Akademik",
          image: "/images/placeholder.jpg",
          visi: "Meningkatkan prestasi akademik siswa melalui berbagai program pembelajaran",
          misi: "Menyelenggarakan bimbingan belajar, workshop akademik, dan kompetisi ilmiah",
          tasks: "Koordinasi program akademik, pembinaan siswa berprestasi",
          programs: ["Bimbingan Belajar Gratis", "Workshop Matematika", "Lomba Cerdas Cermat"],
          members: [
            {
              id: "1",
              name: "Ahmad Rahman",
              image: "/images/profile-placeholder.png",
              position: "Koordinator",
            },
            {
              id: "2",
              name: "Siti Nurhaliza",
              image: "/images/profile-placeholder.png",
              position: "Anggota",
            },
          ],
        },
        {
          id: "2",
          name: "Bidang Olahraga",
          image: "/images/placeholder.jpg",
          visi: "Mengembangkan bakat olahraga siswa dan meningkatkan kesehatan",
          misi: "Menyelenggarakan turnamen olahraga dan kegiatan kesehatan",
          tasks: "Pengorganisasian event olahraga, pembinaan atlet siswa",
          programs: ["Turnamen Basket", "Senam Pagi", "Marathon Sekolah"],
          members: [
            {
              id: "3",
              name: "Budi Santoso",
              image: "/images/profile-placeholder.png",
              position: "Koordinator",
            },
            {
              id: "4",
              name: "Maya Sari",
              image: "/images/profile-placeholder.png",
              position: "Anggota",
            },
          ],
        },
      ],
      activities: [],
    },
    pmr: {
      id: "3",
      slug: "pmr",
      name: "PMR",
      logo: "/images/placeholder.jpg",
      description:
        "Palang Merah Remaja yang fokus pada kegiatan kemanusiaan dan pertolongan pertama.",
      history:
        "PMR telah berperan aktif dalam kegiatan sosial dan kesehatan siswa. Dengan semangat kemanusiaan, PMR SMKN 2 Singosari terus memberikan pelayanan kesehatan dan bantuan sosial kepada masyarakat sekitar sekolah.",
      established: "2005",
      statistics: {
        members: 28,
        programs: 15,
        years: 19,
        meetings: 36,
      },
      leadership: {
        ketua: [
          {
            id: "7",
            name: "Fajar Nugroho",
            image: "/images/profile-placeholder.png",
            position: "Ketua PMR",
          },
        ],
        sekretaris: [
          {
            id: "8",
            name: "Lina Kusuma",
            image: "/images/profile-placeholder.png",
            position: "Sekretaris",
          },
        ],
      },
      sections: [
        {
          id: "1",
          name: "Tim Kesehatan",
          image: "/images/placeholder.jpg",
          visi: "Menjadi garda terdepan dalam pelayanan kesehatan siswa",
          misi: "Memberikan pertolongan pertama dan edukasi kesehatan",
          tasks: "Pertolongan pertama, penyuluhan kesehatan, donor darah",
          programs: ["UKS Sekolah", "Donor Darah", "Penyuluhan Kesehatan"],
          members: [
            {
              id: "7",
              name: "Fajar Nugroho",
              image: "/images/profile-placeholder.png",
              position: "Ketua",
            },
            {
              id: "8",
              name: "Lina Kusuma",
              image: "/images/profile-placeholder.png",
              position: "Sekretaris",
            },
          ],
        },
      ],
      activities: [],
    },
    linorasi: {
      id: "4",
      slug: "linorasi",
      name: "LINORASI",
      logo: "/images/placeholder.jpg",
      description:
        "Litbang Inovasi Raih Prestasi yang fokus pada pengembangan inovasi dan prestasi siswa.",
      history:
        "LINORASI didirikan untuk mendorong inovasi dan pencapaian prestasi siswa. Melalui berbagai program inovatif, LINORASI telah berhasil membawa nama sekolah ke tingkat yang lebih tinggi dalam berbagai kompetisi dan ajang prestasi.",
      established: "2018",
      statistics: {
        members: 25,
        programs: 20,
        years: 6,
        meetings: 30,
      },
      leadership: {
        ketua: [
          {
            id: "9",
            name: "Eko Prasetyo",
            image: "/images/profile-placeholder.png",
            position: "Ketua LINORASI",
          },
        ],
        wakil: [
          {
            id: "10",
            name: "Rina Amelia",
            image: "/images/profile-placeholder.png",
            position: "Wakil Ketua",
          },
        ],
      },
      sections: [
        {
          id: "1",
          name: "Tim Inovasi",
          image: "/images/placeholder.jpg",
          visi: "Mendorong inovasi siswa untuk kemajuan sekolah",
          misi: "Mengembangkan kreativitas dan kemampuan siswa melalui inovasi",
          tasks: "Pengembangan proyek inovasi, mentoring siswa",
          programs: ["Innovation Camp", "Science Fair", "Robotik Competition"],
          members: [
            {
              id: "9",
              name: "Eko Prasetyo",
              image: "/images/profile-placeholder.png",
              position: "Ketua",
            },
            {
              id: "10",
              name: "Rina Amelia",
              image: "/images/profile-placeholder.png",
              position: "Wakil Ketua",
            },
          ],
        },
      ],
      activities: [],
    },
    bdi: {
      id: "5",
      slug: "bdi",
      name: "BDI",
      logo: "/images/placeholder.jpg",
      description:
        "Badan Dakwah Islam yang fokus pada pengembangan spiritual dan kegiatan keagamaan.",
      history:
        "BDI didirikan untuk memperkuat nilai-nilai keislaman di lingkungan sekolah. Dengan berbagai program keagamaan, BDI telah berhasil menciptakan lingkungan yang kondusif untuk pengembangan spiritual siswa.",
      established: "2008",
      statistics: {
        members: 35,
        programs: 18,
        years: 16,
        meetings: 40,
      },
      leadership: {
        ketua: [
          {
            id: "11",
            name: "Ahmad Fauzi",
            image: "/images/profile-placeholder.png",
            position: "Ketua BDI",
          },
        ],
        sekretaris: [
          {
            id: "12",
            name: "Nur Hasanah",
            image: "/images/profile-placeholder.png",
            position: "Sekretaris",
          },
        ],
      },
      sections: [
        {
          id: "1",
          name: "Tim Dakwah",
          image: "/images/placeholder.jpg",
          visi: "Menjadi pusat pengembangan spiritual siswa muslim",
          misi: "Menyelenggarakan kegiatan keagamaan dan pengembangan karakter",
          tasks: "Pengajian rutin, kajian islam, kegiatan sosial keagamaan",
          programs: ["Pengajian Rutin", "Kajian Islam", "Bakti Sosial", "Ramadhan Program"],
          members: [
            {
              id: "11",
              name: "Ahmad Fauzi",
              image: "/images/profile-placeholder.png",
              position: "Ketua",
            },
            {
              id: "12",
              name: "Nur Hasanah",
              image: "/images/profile-placeholder.png",
              position: "Sekretaris",
            },
          ],
        },
      ],
      activities: [],
    },
    ambalan: {
      id: "6",
      slug: "ambalan",
      name: "AMBALAN",
      logo: "/images/logo.webp",
      description:
        "AMBALAN (Ambalan Pramuka) adalah organisasi pendidikan nonformal yang bertujuan membentuk karakter siswa melalui kegiatan kepramukaan yang menyenangkan dan mendidik.",
      history:
        "AMBALAN di SMK Negeri 2 Singosari telah lama menjadi bagian dari kegiatan ekstrakurikuler yang membantu siswa mengembangkan keterampilan survival, kepemimpinan, dan jiwa sosial.",
      established: "2010",
      statistics: {
        members: 60,
        programs: 40,
        years: 14,
        meetings: 4,
      },
      contactInfo: {
        instagram: [
          { label: "AMBALAN SMK 2 SGS", handle: "@ambalan_smkn2" },
          { label: "SMKn 2 SGS", handle: "@smkn2_singosari" },
        ],
        whatsapp: [
          { label: "Ketua AMBALAN", number: "081234567891" },
          { label: "Pembina", number: "089876543211" },
        ],
        socialMedia: [{ platform: "instagram", handle: "ambalan_smkn2" }],
      },
      leadership: {
        sekretaris: [
          {
            id: "s2",
            name: "Sekretaris AMBALAN",
            image: "/images/profile-placeholder.png",
            position: "Sekretaris",
          },
        ],
        ketua: [
          {
            id: "k2",
            name: "Ketua AMBALAN",
            image: "/images/profile-placeholder.png",
            position: "Ketua",
          },
        ],
        wakil: [
          {
            id: "w2",
            name: "Wakil Ketua AMBALAN",
            image: "/images/profile-placeholder.png",
            position: "Wakil Ketua",
          },
        ],
        bendahara: [
          {
            id: "b2",
            name: "Bendahara AMBALAN",
            image: "/images/profile-placeholder.png",
            position: "Bendahara",
          },
        ],
      },
      sections: [
        {
          id: "seksi-ambalan-1",
          name: "SEKSI KEPRAMUKAN",
          image: "/images/profile-placeholder.png",
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
              id: "m6",
              name: "Pembina AMBALAN",
              image: "/images/profile-placeholder.png",
              position: "Pembina",
            },
            {
              id: "m7",
              name: "Anggota 1",
              image: "/images/profile-placeholder.png",
              position: "Anggota",
            },
            {
              id: "m8",
              name: "Anggota 2",
              image: "/images/profile-placeholder.png",
              position: "Anggota",
            },
          ],
        },
      ],
      activities: [
        {
          id: "a5",
          image: "/images/placeholder.jpg",
          title: "Jambore AMBALAN",
          description:
            "Kegiatan jambore tahunan yang melibatkan berbagai kegiatan kepramukaan dan pendidikan karakter.",
          date: "2024-08-15",
        },
        {
          id: "a6",
          image: "/images/placeholder.jpg",
          title: "Latihan Survival",
          description:
            "Pelatihan keterampilan survival di alam terbuka untuk membentuk mental yang tangguh.",
          date: "2024-09-20",
        },
      ],
      recruitmentPoster: "/images/placeholder.jpg",
      recruitmentPeriod: "1-15 Agustus 2024",
    },
  };

  const organization = organizations[slug || ""];

  if (!organization) {
    throw createError({
      statusCode: 404,
      message: "Organization not found",
    });
  }

  return organization;
});
