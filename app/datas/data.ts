import type { MajorName } from '../models/MajorName';
import type { MajorData } from '../models/MajorData';
import type { Staff } from '../models/Staff';
import type { News } from '../models/News';

export const majorDatas: Record<MajorName, MajorData> = {
    rpl: {
        logo: '/images/majorIcon/rpl.webp',
        short: 'RPL',
        nameMajor: 'Rekayasa Perangkat Lunak',
        headerColor: 'bg-orange-600/30 backdrop-blur-2xl border-b-orange-400',
        bgColor: 'bg-orange-400',
        hoverBgColor: 'hover:bg-orange-500',
        textColor: 'text-orange-600',
        btnColor: 'hover:bg-orange-500 hover:border-orange-500'
    },
    tkj: {
        logo: '/images/majorIcon/tkj.webp',
        short: 'TKJ',
        nameMajor: 'Teknik Komputer Jaringan',
        headerColor: 'bg-yellow-600/30 backdrop-blur-2xl border-b-yellow-400',
        bgColor: 'bg-yellow-400',
        hoverBgColor: 'hover:bg-yellow-500',
        textColor: 'text-yellow-600',
        btnColor: 'hover:bg-yellow-400 hover:border-yellow-400'
    },
    dkv: {
        logo: '/images/majorIcon/dkv.webp',
        short: 'DKV',
        nameMajor: 'Desain Komunikasi Visual',
        headerColor: 'bg-blue-600/30 backdrop-blur-2xl border-b-blue-400',
        bgColor: 'bg-blue-400',
        hoverBgColor: 'hover:bg-blue-500',
        textColor: 'text-blue-600',
        btnColor: 'hover:bg-blue-600 hover:border-blue-600'
    },
    animasi: {
        logo: '/images/majorIcon/animasi.webp',
        short: 'AN',
        nameMajor: 'Animasi',
        headerColor: 'bg-pink-600/30 backdrop-blur-2xl border-b-pink-400',
        bgColor: 'bg-pink-400',
        hoverBgColor: 'hover:bg-pink-500',
        textColor: 'text-pink-600',
        btnColor: 'hover:bg-pink-600 hover:border-pink-600'
    },
    broadcasting: {
        logo: '/images/majorIcon/broadcasting.webp',
        short: 'BC',
        nameMajor: 'Broadcasting',
        headerColor: 'bg-red-600/30 backdrop-blur-2xl border-b-red-400',
        bgColor: 'bg-red-400',
        hoverBgColor: 'hover:bg-red-500',
        textColor: 'text-red-600',
        btnColor: 'hover:bg-red-600 hover:border-red-600'
    },
    tei: {
        logo: '/images/majorIcon/tei.webp',
        short: 'TEI',
        nameMajor: 'Teknik Elektronika Industri',
        headerColor: 'bg-green-600/30 backdrop-blur-2xl border-b-green-400',
        bgColor: 'bg-green-600',
        hoverBgColor: 'hover:bg-green-700',
        textColor: 'text-green-600',
        btnColor: 'hover:bg-green-600 hover:border-green-600'
    },
    mekatronika: {
        logo: '/images/majorIcon/mekatronika.webp',
        short: 'TMT',
        nameMajor: 'Teknik Mekatronika',
        headerColor: 'bg-green-800/30 backdrop-blur-2xl border-b-green-400',
        bgColor: 'bg-green-800',
        hoverBgColor: 'hover:bg-green-900',
        textColor: 'text-green-900',
        btnColor: 'hover:bg-green-800 hover:border-green-800'
    },
    tav: {
        logo: '/images/majorIcon/tav.webp',
        short: 'TAV',
        nameMajor: 'Teknik Audio Video',
        headerColor: 'bg-green-400/30 backdrop-blur-2xl border-b-green-400',
        bgColor: 'bg-green-400',
        hoverBgColor: 'hover:bg-green-500',
        textColor: 'text-green-400',
        btnColor: 'hover:bg-green-400 hover:border-green-400'
    },
}
export const staffData = {
    kepsek: [
        { image: '/images/placeholder.jpg', name: 'Sumijah S.Pd, M.Si', position: 'Kepala Sekolah' },
        { image: '/images/placeholder.jpg', name: 'Sumijah S.Pd, M.Si', position: 'Kepala Sekolah' }
    ] as Staff[],
    wakasek: [
        { image: '/images/placeholder.jpg', name: 'Sumijah S.Pd, M.Si', position: 'Wakil Kepala Sekolah' },
        { image: '/images/placeholder.jpg', name: 'Sumijah S.Pd, M.Si', position: 'Wakil Kepala Sekolah' },
        { image: '/images/placeholder.jpg', name: 'Sumijah S.Pd, M.Si', position: 'Wakil Kepala Sekolah' },
        { image: '/images/placeholder.jpg', name: 'Sumijah S.Pd, M.Si', position: 'Wakil Kepala Sekolah' }
    ] as Staff[],
    kurikulum: [
        { image: '/images/placeholder.jpg', name: 'Sumijah S.Pd, M.Si', position: 'Kurikulum' },
        { image: '/images/placeholder.jpg', name: 'Sumijah S.Pd, M.Si', position: 'Kurikulum' },
        { image: '/images/placeholder.jpg', name: 'Sumijah S.Pd, M.Si', position: 'Kurikulum' },
        { image: '/images/placeholder.jpg', name: 'Sumijah S.Pd, M.Si', position: 'Kurikulum' }
    ] as Staff[],
    kesiswaan: [
        { image: '/images/placeholder.jpg', name: 'Sumijah S.Pd, M.Si', position: 'Kesiswaan' },
        { image: '/images/placeholder.jpg', name: 'Sumijah S.Pd, M.Si', position: 'Kesiswaan' },
        { image: '/images/placeholder.jpg', name: 'Sumijah S.Pd, M.Si', position: 'Kesiswaan' },
        { image: '/images/placeholder.jpg', name: 'Sumijah S.Pd, M.Si', position: 'Kesiswaan' },
        { image: '/images/placeholder.jpg', name: 'Sumijah S.Pd, M.Si', position: 'Kesiswaan' },
        { image: '/images/placeholder.jpg', name: 'Sumijah S.Pd, M.Si', position: 'Kesiswaan' }
    ] as Staff[],
    sapras: [
        { image: '/images/placeholder.jpg', name: 'Sumijah S.Pd, M.Si', position: 'Sapras' },
        { image: '/images/placeholder.jpg', name: 'Sumijah S.Pd, M.Si', position: 'Sapras' },
        { image: '/images/placeholder.jpg', name: 'Sumijah S.Pd, M.Si', position: 'Sapras' }
    ] as Staff[],
    humas: [
        { image: '/images/placeholder.jpg', name: 'Sumijah S.Pd, M.Si', position: 'Humas' },
        { image: '/images/placeholder.jpg', name: 'Sumijah S.Pd, M.Si', position: 'Humas' },
        { image: '/images/placeholder.jpg', name: 'Sumijah S.Pd, M.Si', position: 'Humas' },
        { image: '/images/placeholder.jpg', name: 'Sumijah S.Pd, M.Si', position: 'Humas' },
        { image: '/images/placeholder.jpg', name: 'Sumijah S.Pd, M.Si', position: 'Humas' }
    ] as Staff[]
};

export const newsData: News[] = [
    {
        id: '1',
        slug: 'peluncuran-program-tahun-ajaran-baru',
        title: 'Peluncuran Program Tahun Ajaran Baru 2024/2025',
        subtitle: 'Sekolah SMKN 1 Sinorasi meluncurkan berbagai program inovatif untuk tahun ajaran baru',
        thumbnail: '/images/placeholder.jpg',
        tags: ['Pengumuman', 'Program Baru', 'Tahun Ajaran'],
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
        publishedAt: '2024-07-01',
        author: 'Tim Humas SMKN 1 Sinorasi'
    },
    {
        id: '2',
        slug: 'prestasi-siswa-dalam-lomba-robotik',
        title: 'Prestasi Gemilang Siswa dalam Lomba Robotik Nasional',
        subtitle: 'Tim robotik SMKN 1 Sinorasi berhasil meraih juara dalam kompetisi robotik tingkat nasional',
        thumbnail: '/images/placeholder.jpg',
        tags: ['Prestasi', 'Robotik', 'Kompetisi'],
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
        publishedAt: '2024-06-15',
        author: 'Tim Humas SMKN 1 Sinorasi'
    },
    {
        id: '3',
        slug: 'kerjasama-dengan-perusahaan-teknologi',
        title: 'Kerjasama Strategis dengan Perusahaan Teknologi Terdepan',
        subtitle: 'SMKN 1 Sinorasi menjalin kerjasama dengan perusahaan teknologi untuk program magang siswa',
        thumbnail: '/images/placeholder.jpg',
        tags: ['Kerjasama', 'Industri', 'Magang'],
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
        publishedAt: '2024-05-20',
        author: 'Tim Humas SMKN 1 Sinorasi'
    },
    {
        id: '4',
        slug: 'dkerjasama-dengan-perusahaan-teknologi',
        title: 'Kerjasama Strategis dengan Perusahaan Teknologi Terdepan',
        subtitle: 'SMKN 1 Sinorasi menjalin kerjasama dengan perusahaan teknologi untuk program magang siswa',
        thumbnail: '/images/placeholder.jpg',
        tags: ['Kerjasama', 'Industri', 'Magang'],
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
        publishedAt: '2024-05-20',
        author: 'Tim Humas SMKN 1 Sinorasi'
    },
    {
        id: '5',
        slug: 'ddkerjasama-dengan-perusahaan-teknologi',
        title: 'Kerjasama Strategis dengan Perusahaan Teknologi Terdepan',
        subtitle: 'SMKN 1 Sinorasi menjalin kerjasama dengan perusahaan teknologi untuk program magang siswa',
        thumbnail: '/images/placeholder.jpg',
        tags: ['Kerjasama', 'Industri', 'Magang'],
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
        publishedAt: '2024-05-20',
        author: 'Tim Humas SMKN 1 Sinorasi'
    },
    {
        id: '6',
        slug: 'dddkerjasama-dengan-perusahaan-teknologi',
        title: 'Kerjasama Strategis dengan Perusahaan Teknologi Terdepan',
        subtitle: 'SMKN 1 Sinorasi menjalin kerjasama dengan perusahaan teknologi untuk program magang siswa',
        thumbnail: '/images/placeholder.jpg',
        tags: ['Kerjasama', 'Industri', 'Magang'],
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
        publishedAt: '2024-05-20',
        author: 'Tim Humas SMKN 1 Sinorasi'
    },
    {
        id: '4',
        slug: 'dkerjasama-dengan-perusahaan-teknologi',
        title: 'Kerjasama Strategis dengan Perusahaan Teknologi Terdepan',
        subtitle: 'SMKN 1 Sinorasi menjalin kerjasama dengan perusahaan teknologi untuk program magang siswa',
        thumbnail: '/images/placeholder.jpg',
        tags: ['Kerjasama', 'Industri', 'Magang'],
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
        publishedAt: '2024-05-20',
        author: 'Tim Humas SMKN 1 Sinorasi'
    },
    {
        id: '4',
        slug: 'dkerjasama-dengan-perusahaan-teknologi',
        title: 'Kerjasama Strategis dengan Perusahaan Teknologi Terdepan',
        subtitle: 'SMKN 1 Sinorasi menjalin kerjasama dengan perusahaan teknologi untuk program magang siswa',
        thumbnail: '/images/placeholder.jpg',
        tags: ['Kerjasama', 'Industri', 'Magang'],
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
        publishedAt: '2024-05-20',
        author: 'Tim Humas SMKN 1 Sinorasi'
    },
    {
        id: '4',
        slug: 'dkerjasama-dengan-perusahaan-teknologi',
        title: 'Kerjasama Strategis dengan Perusahaan Teknologi Terdepan',
        subtitle: 'SMKN 1 Sinorasi menjalin kerjasama dengan perusahaan teknologi untuk program magang siswa',
        thumbnail: '/images/placeholder.jpg',
        tags: ['Kerjasama', 'Industri', 'Magang'],
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
        publishedAt: '2024-05-20',
        author: 'Tim Humas SMKN 1 Sinorasi'
    }
];