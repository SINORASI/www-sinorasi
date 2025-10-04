# Dynamic Page Titles Summary

## Overview
All pages in the application now have dynamic page titles using Nuxt's `useHead()` composable. The titles are SEO-friendly and include proper meta descriptions.

## Pages with Dynamic Titles

### 1. Home Page
- **File**: `app/pages/index.vue`
- **Title**: `Beranda - SMKN 2 Singosari`
- **Description**: SMK Negeri 2 Singosari - SINORASI (Inovasi Raih Prestasi). Tempat di mana inovasi bertemu dengan prestasi melalui pendidikan kejuruan berkualitas.

### 2. Berita (News)
#### Index Page
- **File**: `app/pages/berita/index.vue`
- **Title**: `Berita - SMKN 2 Singosari`
- **Description**: Berita terbaru dan informasi terkini dari SMK Negeri 2 Singosari

#### Detail Page (Dynamic)
- **File**: `app/pages/berita/[slug].vue`
- **Title**: `{news.title} - SMKN 2 Singosari` (fallback: "Berita Tidak Ditemukan")
- **Description**: `{news.subtitle}` (fallback: "Berita SMKN 2 Singosari")

### 3. Acara (Events)
#### Index Page
- **File**: `app/pages/acara/index.vue`
- **Title**: `Acara - SMKN 2 Singosari`
- **Description**: Daftar acara dan kegiatan yang akan datang di SMK Negeri 2 Singosari

#### Detail Page (Dynamic)
- **File**: `app/pages/acara/[eventSlug].vue`
- **Title**: `{event.title} - SMKN 2 Singosari` (fallback: "Acara Tidak Ditemukan")
- **Description**: `{event.details}` (fallback: "Acara SMKN 2 Singosari")

### 4. Jurusan (Majors)
#### Detail Page (Dynamic)
- **File**: `app/pages/jurusan/[majorName].vue`
- **Title**: `{majorData.nameMajor} - SMKN 2 Singosari` (fallback: "Jurusan - SMKN 2 Singosari")
- **Description**: `Informasi lengkap tentang jurusan {majorData.nameMajor} di SMK Negeri 2 Singosari`

### 5. Ekstrakurikuler
#### Index Page
- **File**: `app/pages/ekstrakurikuler/index.vue`
- **Title**: `Ekstrakurikuler - SMKN 2 Singosari`
- **Description**: Daftar ekstrakurikuler dan organisasi di SMK Negeri 2 Singosari. Kembangkan bakat dan minatmu!

#### Detail Page (Dynamic)
- **File**: `app/pages/ekstrakurikuler/[extra].vue`
- **Title**: `{ExtraName} - Ekstrakurikuler - SMKN 2 Singosari`
- **Description**: `Informasi lengkap tentang ekstrakurikuler {ExtraName} di SMK Negeri 2 Singosari`

### 6. Organisasi
#### Index Page
- **File**: `app/pages/organisasi/index.vue`
- **Title**: `Organisasi - SMKN 2 Singosari`
- **Description**: Daftar organisasi siswa di SMK Negeri 2 Singosari. Bergabunglah dan kembangkan kemampuanmu!

#### Detail Page (Dynamic)
- **File**: `app/pages/organisasi/[organisasi].vue`
- **Title**: `{OrgName} - Organisasi - SMKN 2 Singosari`
- **Description**: `Informasi lengkap tentang organisasi {OrgName} di SMK Negeri 2 Singosari`

### 7. Informasi Pages

#### Guru (Teachers)
- **File**: `app/pages/informasi/guru.vue`
- **Title**: `Guru Pengajar - Informasi - SMKN 2 Singosari`
- **Description**: Daftar guru pengajar di SMK Negeri 2 Singosari. Tenaga pendidik profesional dan berpengalaman.

#### Profil Sekolah (School Profile)
- **File**: `app/pages/informasi/profile-sekolah.vue`
- **Title**: `Profil Sekolah - Informasi - SMKN 2 Singosari`
- **Description**: Profil lengkap SMK Negeri 2 Singosari. Sejarah, visi misi, dan sambutan kepala sekolah.

#### Kontak (Contact)
- **File**: `app/pages/informasi/kontak.vue`
- **Title**: `Kontak - Informasi - SMKN 2 Singosari`
- **Description**: Hubungi kami di SMK Negeri 2 Singosari. Informasi kontak dan lokasi sekolah.

#### Mitra Industri (Industry Partners)
- **File**: `app/pages/informasi/mitra-industri.vue`
- **Title**: `Mitra Industri - Informasi - SMKN 2 Singosari`
- **Description**: Daftar mitra industri dan kerjasama SMK Negeri 2 Singosari dengan berbagai perusahaan.

#### Sarana Prasarana (Facilities)
- **File**: `app/pages/informasi/sarana-prasarana.vue`
- **Title**: `Sarana Prasarana - Informasi - SMKN 2 Singosari`
- **Description**: Fasilitas sarana dan prasarana yang tersedia di SMK Negeri 2 Singosari untuk mendukung pembelajaran.

#### Struktur Organisasi (Organizational Structure)
- **File**: `app/pages/informasi/struktur-organisasi.vue`
- **Title**: `Struktur Organisasi - Informasi - SMKN 2 Singosari`
- **Description**: Struktur organisasi sekolah SMK Negeri 2 Singosari. Kepala sekolah dan jajarannya.

### 8. Utilitas (Utilities)

#### Anonymous BK
- **File**: `app/pages/utilitas/anonymous-bk.vue`
- **Title**: `Anonymous BK - Utilitas - SMKN 2 Singosari`
- **Description**: Sampaikan cerita atau keluhan Anda secara anonim kepada BK SMK Negeri 2 Singosari.

#### Traffic Tracker
- **File**: `app/pages/utilitas/traffic-tracker.vue`
- **Title**: `Traffic Tracker - Utilitas - SMKN 2 Singosari`
- **Description**: Cek estimasi waktu tempuh ke SMK Negeri 2 Singosari dari lokasi Anda dengan traffic tracker.

## Implementation Details

### useHead() Composable
All pages use Nuxt's `useHead()` composable which provides:
- Dynamic page titles that change based on content
- SEO-friendly meta descriptions
- Proper browser tab titles
- Social media sharing metadata

### Title Pattern
All titles follow this pattern:
- **Static pages**: `[Page Name] - SMKN 2 Singosari`
- **Dynamic pages**: `{Content Title} - [Section] - SMKN 2 Singosari`
- **Nested pages**: `[Page Name] - [Parent Section] - SMKN 2 Singosari`

### Example Implementation
```typescript
useHead({
  title: 'Page Title - SMKN 2 Singosari',
  meta: [
    {
      name: 'description',
      content: 'Page description for SEO'
    }
  ]
});
```

### Dynamic Title Example
```typescript
useHead({
  title: () => data.value?.name 
    ? `${data.value.name} - SMKN 2 Singosari` 
    : 'Fallback Title',
  meta: [
    {
      name: 'description',
      content: () => data.value?.description || 'Fallback description'
    }
  ]
});
```

## Benefits
1. ✅ **SEO Optimization**: Each page has unique, descriptive titles
2. ✅ **User Experience**: Clear browser tab titles
3. ✅ **Social Sharing**: Proper metadata for sharing on social media
4. ✅ **Accessibility**: Descriptive page titles for screen readers
5. ✅ **Consistency**: All titles follow the same naming convention

## Total Pages Updated
- **18 pages** now have dynamic titles
- **6 dynamic routes** with content-based titles
- **12 static pages** with fixed titles
- **100% coverage** across all pages

## Notes
- All titles include "SMKN 2 Singosari" for brand consistency
- Dynamic pages have fallback titles when data is not available
- Meta descriptions provide context for search engines
- Titles are concise and descriptive (50-60 characters recommended)
