<script setup lang="ts">
import { motion } from "motion-v";

const learningPath = [
  {
    level: "Dasar",
    icon: "lucide:book-open",
    color: "blue",
    goals: [
      "Memahami apa itu ERD dan kenapa penting dalam perancangan database.",
      "Mengenal entitas, atribut, primary key, dan foreign key.",
      "Mampu menggambar relasi 1:1, 1:N, dan M:N pada studi kasus sederhana.",
    ],
    steps: [
      "Tentukan kebutuhan data dari aplikasi yang ingin dibuat.",
      "Tuliskan calon entitas (contoh: Siswa, Kelas, Guru).",
      "Tambahkan atribut utama pada tiap entitas.",
      "Tentukan kunci utama (PK) dan hubungan antar entitas.",
    ],
  },
  {
    level: "Menengah",
    icon: "lucide:layers",
    color: "emerald",
    goals: [
      "Menerapkan normalisasi hingga 3NF untuk mengurangi duplikasi.",
      "Membuat tabel penghubung untuk relasi many-to-many.",
      "Membedakan atribut wajib, opsional, dan turunan.",
    ],
    steps: [
      "Cek atribut yang berulang dan pecah ke entitas baru bila perlu.",
      "Gunakan tabel junction untuk relasi M:N (contoh: SiswaKelas).",
      "Tentukan kardinalitas dan optionality tiap hubungan.",
      "Validasi apakah desain sudah bebas anomali insert/update/delete.",
    ],
  },
  {
    level: "Lanjutan",
    icon: "lucide:graduation-cap",
    color: "violet",
    goals: [
      "Merancang ERD untuk sistem skala besar dengan modul terpisah.",
      "Menerapkan supertype-subtype (inheritance) bila dibutuhkan.",
      "Menyiapkan ERD agar mudah diimplementasikan ke SQL dan migrasi.",
    ],
    steps: [
      "Pisahkan bounded context (akademik, keuangan, inventaris, dll).",
      "Tambahkan aturan bisnis penting sebagai constraint desain.",
      "Review performa: indeks kandidat, ukuran tabel, dan query utama.",
      "Lakukan peer review lalu iterasi ERD sebelum coding database.",
    ],
  },
];

const commonMistakes = [
  "Tidak mendefinisikan primary key pada setiap entitas.",
  "Menggabungkan terlalu banyak konsep dalam satu tabel.",
  "Relasi many-to-many tidak dipecah menjadi tabel penghubung.",
  "Atribut dihitung (mis. total nilai) disimpan tanpa alasan yang jelas.",
];

const practiceCase = {
  title: "Studi Kasus: Sistem Perpustakaan Sekolah",
  brief:
    "Bangun ERD untuk proses peminjaman buku oleh siswa, pengelolaan stok buku, dan pencatatan denda keterlambatan.",
  checklist: [
    "Entitas minimal: Siswa, Buku, Peminjaman, DetailPeminjaman, Petugas.",
    "Relasi: Siswa 1:N Peminjaman, Peminjaman 1:N DetailPeminjaman, Buku 1:N DetailPeminjaman.",
    "Tambahkan atribut penting: tanggal_pinjam, tanggal_kembali, status, denda.",
    "Pastikan setiap tabel memiliki PK dan FK yang konsisten.",
  ],
};

useHead({
  title: "Belajar ERD Dasar hingga Lanjutan - Utilitas - SMKN 2 Singosari",
  meta: [
    {
      name: "description",
      content:
        "Panduan belajar ERD dari konsep dasar sampai teknik lanjutan lengkap dengan langkah praktik dan studi kasus.",
    },
  ],
});
</script>

<template>
  <div class="min-h-screen py-32 bg-linear-to-b from-white via-blue-50 to-white">
    <div class="container px-4 mx-auto sm:px-6">
      <motion.div
        class="max-w-5xl mx-auto"
        :initial="{ opacity: 0, y: 16 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5 }"
      >
          <div class="p-8 mb-8 text-center bg-white border-2 border-blue-100 shadow-xl rounded-2xl md:p-10">
            <div class="inline-flex items-center gap-3 px-4 py-2 mb-4 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full">
              <Icon name="lucide:database" size="18" />
              Panduan ERD Lengkap
            </div>
            <h1 class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Belajar Membuat ERD dari Dasar ke Advanced</h1>
            <p class="max-w-3xl mx-auto text-gray-600">
              Halaman ini dirancang untuk membantu kamu memahami Entity Relationship Diagram (ERD) secara bertahap, mulai
              dari konsep dasar sampai teknik perancangan database yang siap implementasi.
            </p>
          </div>

          <div class="grid gap-6 mb-8 md:grid-cols-3">
            <div v-for="path in learningPath" :key="path.level" class="p-6 bg-white border-2 shadow-lg rounded-2xl" :class="`border-${path.color}-100`">
              <div class="flex items-center gap-3 mb-4">
                <div class="flex items-center justify-center w-10 h-10 rounded-xl" :class="`bg-${path.color}-100`">
                  <Icon :name="path.icon" size="20" :class="`text-${path.color}-600`" />
                </div>
                <h2 class="text-lg font-bold text-gray-800">{{ path.level }}</h2>
              </div>
              <ul class="space-y-2 text-sm text-gray-700">
                <li v-for="goal in path.goals" :key="goal" class="flex items-start gap-2">
                  <Icon name="lucide:check-circle-2" size="16" class="mt-0.5 text-green-600 shrink-0" />
                  <span>{{ goal }}</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="p-8 mb-8 bg-white border-2 border-indigo-100 shadow-xl rounded-2xl">
            <h2 class="flex items-center gap-2 mb-6 text-2xl font-bold text-gray-900">
              <Icon name="lucide:list-checks" size="24" class="text-indigo-600" />
              Langkah Belajar Bertahap
            </h2>
            <div class="grid gap-6 md:grid-cols-3">
              <div v-for="path in learningPath" :key="`${path.level}-steps`">
                <h3 class="mb-3 font-bold text-gray-800">{{ path.level }}</h3>
                <ol class="space-y-2 text-sm text-gray-700 list-decimal list-inside">
                  <li v-for="step in path.steps" :key="step">{{ step }}</li>
                </ol>
              </div>
            </div>
          </div>

          <div class="grid gap-6 mb-8 md:grid-cols-2">
            <div class="p-8 bg-white border-2 border-amber-100 shadow-xl rounded-2xl">
              <h2 class="flex items-center gap-2 mb-4 text-xl font-bold text-gray-900">
                <Icon name="lucide:triangle-alert" size="22" class="text-amber-600" />
                Kesalahan Umum Saat Membuat ERD
              </h2>
              <ul class="space-y-3 text-sm text-gray-700">
                <li v-for="mistake in commonMistakes" :key="mistake" class="flex items-start gap-2">
                  <Icon name="lucide:x-circle" size="16" class="mt-0.5 text-red-500 shrink-0" />
                  <span>{{ mistake }}</span>
                </li>
              </ul>
            </div>

            <div class="p-8 bg-white border-2 border-emerald-100 shadow-xl rounded-2xl">
              <h2 class="flex items-center gap-2 mb-4 text-xl font-bold text-gray-900">
                <Icon name="lucide:flask-conical" size="22" class="text-emerald-600" />
                {{ practiceCase.title }}
              </h2>
              <p class="mb-4 text-sm text-gray-700">{{ practiceCase.brief }}</p>
              <ul class="space-y-2 text-sm text-gray-700">
                <li v-for="item in practiceCase.checklist" :key="item" class="flex items-start gap-2">
                  <Icon name="lucide:circle-check" size="16" class="mt-0.5 text-emerald-600 shrink-0" />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="p-8 text-center border-2 border-blue-200 shadow-xl bg-linear-to-r from-blue-50 to-indigo-50 rounded-2xl">
            <h2 class="mb-3 text-2xl font-bold text-gray-900">Siap praktik ERD?</h2>
            <p class="max-w-2xl mx-auto mb-5 text-gray-700">
              Mulai dari kasus kecil, validasi relasi, lalu tingkatkan kompleksitasnya. Semakin sering latihan, semakin
              cepat kamu mahir membuat desain database yang rapi dan scalable.
            </p>
            <NuxtLink
              to="/dashboard"
              class="inline-flex items-center gap-2 px-5 py-3 font-semibold text-white transition bg-blue-600 rounded-xl hover:bg-blue-700"
            >
              Kembali ke Dashboard
              <Icon name="lucide:arrow-right" size="18" />
            </NuxtLink>
          </div>
      </motion.div>
    </div>
  </div>
</template>
