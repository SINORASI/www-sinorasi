import type { Event } from "~/models/Event";

const eventData: Event[] = [
  {
    id: "1",
    slug: "tanggal-dan-bulan",
    title: "INI ADALAH NAMA EVENT / JUDUL EVENT",
    details: "Hari, Jam • Tempat / Lokasi",
    date: "Tanggal & Bulan",
    imageUrl: "/images/placeholder.jpg",
    content: `# INI ADALAH NAMA EVENT / JUDUL EVENT

## Detail Event

Hari, Jam • Tempat / Lokasi

### Deskripsi
Ini adalah deskripsi lengkap dari event ini. Event ini akan diadakan di lokasi yang telah ditentukan dengan tujuan untuk meningkatkan keterampilan siswa.

### Agenda
- Pembukaan
- Sesi utama
- Penutupan

### Kontak
Untuk informasi lebih lanjut, hubungi panitia event.`,
    publishedAt: "2024-09-01",
    author: "Tim Event SMKN 1 Sinorasi",
    organizationSlug: "osis",
  },
  {
    id: "2",
    slug: "community-tech-meetup",
    title: "Community Tech Meetup",
    details: "Sabtu, 14:00 • Gedung Inovasi / Lt. 3",
    date: "30 September",
    imageUrl: "/images/placeholder.jpg",
    content: `# Community Tech Meetup

## Detail Event

Sabtu, 14:00 • Gedung Inovasi / Lt. 3

### Deskripsi
Community Tech Meetup adalah acara pertemuan komunitas teknologi yang diadakan oleh SMKN 1 Sinorasi. Acara ini bertujuan untuk berbagi pengetahuan dan pengalaman di bidang teknologi.

### Agenda
- Registrasi peserta
- Pembukaan oleh MC
- Sharing session dari pembicara
- Networking session
- Penutupan dan doorprize

### Pembicara
- Teknisi Senior dari Industri
- Guru SMKN 1 Sinorasi
- Mahasiswa Teknik

### Kontak
Email: event@smkn1sinorasi.sch.id`,
    publishedAt: "2024-09-15",
    author: "Tim Event SMKN 1 Sinorasi",
    organizationSlug: "osis",
  },
  {
    id: "3",
    slug: "vue-js-workshop-the-next-level",
    title: "Vue.js Workshop: The Next Level",
    details: "Minggu, 09:00 • Ruang Seminar / Blok A",
    date: "15 Oktober",
    imageUrl: "/images/placeholder.jpg",
    content: `# Vue.js Workshop: The Next Level

## Detail Event

Minggu, 09:00 • Ruang Seminar / Blok A

### Deskripsi
Workshop Vue.js lanjutan yang akan membahas teknik-teknik advanced dalam pengembangan aplikasi web menggunakan Vue.js. Cocok untuk siswa yang sudah memiliki pengetahuan dasar Vue.js.

### Agenda
- Review konsep dasar Vue.js
- Composition API
- State management dengan Pinia
- Testing Vue components
- Deployment dan optimasi

### Persyaratan
- Pengetahuan dasar Vue.js
- Laptop dengan Node.js terinstall
- Akun GitHub

### Instruktur
Tim Developer dari Jurusan RPL SMKN 1 Sinorasi

### Kontak
WhatsApp: +62 812-3456-7890`,
    publishedAt: "2024-09-20",
    author: "Tim Event SMKN 1 Sinorasi",
    organizationSlug: "osis",
  },
];

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { upcoming, past, limit, offset } = query;

  let filteredEvents = [...eventData];

  const currentDate = new Date();
  if (upcoming === "true") {
    filteredEvents = filteredEvents.filter((e) => new Date(e.publishedAt) >= currentDate);
  } else if (past === "true") {
    filteredEvents = filteredEvents.filter((e) => new Date(e.publishedAt) < currentDate);
  }

  const startIndex = offset ? parseInt(offset as string, 10) : 0;
  const endIndex = limit ? startIndex + parseInt(limit as string, 10) : filteredEvents.length;

  const paginatedEvents = filteredEvents.slice(startIndex, endIndex);

  return {
    data: paginatedEvents,
    total: filteredEvents.length,
    offset: startIndex,
    limit: endIndex - startIndex,
  };
});
