import type { News } from '~/models/News';

// Mock data - same as data.ts
const newsData: News[] = [
  {
    id: "1",
    slug: "peluncuran-program-tahun-ajaran-baru",
    title: "Peluncuran Program Tahun Ajaran Baru 2024/2025",
    subtitle: "Sekolah SMKN 1 Sinorasi meluncurkan berbagai program inovatif untuk tahun ajaran baru",
    thumbnail: "/images/placeholder.jpg",
    tags: ["Pengumuman", "Program Baru", "Tahun Ajaran"],
    content: `# Peluncuran Program Tahun Ajaran Baru 2024/2025

## Pengenalan Program

Sekolah SMKN 1 Sinorasi dengan bangga meluncurkan berbagai program inovatif untuk tahun ajaran 2024/2025. Program ini dirancang untuk meningkatkan kualitas pendidikan dan mempersiapkan siswa menghadapi tantangan masa depan.

## Program Unggulan

### 1. Program Digital Skills
- Pelatihan coding dan programming
- Kursus desain grafis dan multimedia
- Workshop kecerdasan buatan

### 2. Program Kewirausahaan
- Inkubasi bisnis siswa
- Kerjasama dengan industri
- Program magang terstruktur

### 3. Program Pengembangan Karakter
- Kegiatan ekstrakurikuler
- Program kepemimpinan siswa
- Pendidikan karakter berbasis nilai

## Manfaat Bagi Siswa

Program ini memberikan manfaat yang signifikan bagi pengembangan siswa, termasuk:

- Keterampilan teknis yang relevan dengan industri
- Pengalaman praktis melalui program magang
- Pengembangan soft skills dan kepemimpinan

## Kesimpulan

Dengan program ini, SMKN 1 Sinorasi berkomitmen untuk terus berinovasi dan memberikan pendidikan berkualitas tinggi bagi seluruh siswa.`,
    publishedAt: "2024-07-01",
    author: "Tim Humas SMKN 1 Sinorasi",
  },
  {
    id: "2",
    slug: "prestasi-siswa-dalam-lomba-robotik",
    title: "Prestasi Gemilang Siswa dalam Lomba Robotik Nasional",
    subtitle: "Tim robotik SMKN 1 Sinorasi berhasil meraih juara dalam kompetisi robotik tingkat nasional",
    thumbnail: "/images/placeholder.jpg",
    tags: ["Prestasi", "Robotik", "Kompetisi"],
    content: `# Prestasi Gemilang dalam Lomba Robotik Nasional

## Latar Belakang

Tim robotik SMKN 1 Sinorasi telah menorehkan prestasi membanggakan dalam ajang kompetisi robotik nasional yang diselenggarakan di Jakarta.

## Perjalanan Kompetisi

### Persiapan Intensif
Tim telah menjalani persiapan selama 6 bulan dengan bimbingan guru dan mentor dari industri.

### Tantangan Teknis
- Desain robot yang inovatif
- Programming yang efisien
- Troubleshooting real-time

## Hasil yang Dicapai

Tim berhasil meraih:
- Juara 1 kategori Robot Sumo
- Juara 2 kategori Line Follower
- Juara 3 kategori Maze Solver

## Pengakuan dan Penghargaan

Prestasi ini mendapat pengakuan dari:
- Kementerian Pendidikan dan Kebudayaan
- Asosiasi Robotik Indonesia
- Industri teknologi nasional

## Dampak Bagi Sekolah

Keberhasilan ini meningkatkan reputasi SMKN 1 Sinorasi sebagai sekolah unggulan dalam bidang teknologi dan inovasi.`,
    publishedAt: "2024-06-15",
    author: "Tim Humas SMKN 1 Sinorasi",
  },
  {
    id: "3",
    slug: "kerjasama-dengan-perusahaan-teknologi",
    title: "Kerjasama Strategis dengan Perusahaan Teknologi Terdepan",
    subtitle: "SMKN 1 Sinorasi menjalin kerjasama dengan perusahaan teknologi untuk program magang siswa",
    thumbnail: "/images/placeholder.jpg",
    tags: ["Kerjasama", "Industri", "Magang"],
    content: `# Kerjasama Strategis dengan Perusahaan Teknologi

## Pengantar Kerjasama

SMKN 1 Sinorasi telah menandatangani Memorandum of Understanding (MoU) dengan beberapa perusahaan teknologi terdepan di Indonesia.

## Mitra Kerjasama

### Perusahaan Teknologi A
- Spesialisasi: Software Development
- Program: Magang programming dan development

### Perusahaan Teknologi B
- Spesialisasi: Data Science dan AI
- Program: Training machine learning

### Perusahaan Teknologi C
- Spesialisasi: Cybersecurity
- Program: Workshop keamanan jaringan

## Manfaat Kerjasama

### Bagi Siswa
- Pengalaman kerja langsung di industri
- Sertifikasi kompetensi
- Kesempatan karir setelah lulus

### Bagi Sekolah
- Kurikulum yang up-to-date
- Fasilitas modern dari mitra
- Pengembangan kompetensi guru

### Bagi Industri
- Talenta siap pakai
- Kontribusi pada pendidikan vokasi
- Program Corporate Social Responsibility

## Implementasi Program

Program kerjasama akan dimulai pada semester ganjil tahun ajaran 2024/2025 dengan melibatkan siswa kelas XI dan XII.`,
    publishedAt: "2024-05-20",
    author: "Tim Humas SMKN 1 Sinorasi",
  },
];

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');
  
  const news = newsData.find(n => n.slug === slug);
  
  if (!news) {
    throw createError({
      statusCode: 404,
      statusMessage: 'News not found'
    });
  }
  
  return news;
});
