<script lang="ts" setup>
interface ActivityProps {
    image: string,
    title: string,
    desc: string
}

const items = [
    { image: '/images/placeholder.jpg', title: 'Kejuaraan Antar Sekolah Se-Surabaya', desc: 'Tim basket putra berhasil meraih juara 2 dalam kompetisi bergengsi yang diikuti 32 sekolah menengah atas di Surabaya dengan persaingan yang sangat ketat'},
    { image: '/images/placeholder.jpg', title: 'Pelatihan Intensif Teknik Dasar', desc: 'Mengadakan pelatihan khusus bersama pelatih profesional untuk meningkatkan kemampuan dribbling, shooting, dan passing seluruh anggota ekstrakurikuler'},
    { image: '/images/placeholder.jpg', title: 'Turnamen Internal Antar Kelas', desc: 'Event tahunan yang melibatkan seluruh siswa sekolah dalam kompetisi basket antar kelas untuk mempererat tali persaudaraan dan sportivitas'},
    { image: '/images/placeholder.jpg', title: 'Workshop Strategi Permainan', desc: 'Sesi pembelajaran mendalam tentang taktik dan strategi permainan basket modern yang dipimpin langsung oleh mantan pemain profesional'},
]
</script>

<template>
    <main class="bg-white">
        <section class="flex justify-center items-center h-fit py-20 md:py-40 gap-16 md:gap-30 flex-col bg-slate-50">
            <h1 class="text-center font-bold text-5xl md:text-6xl lg:text-8xl tracking-wide text-slate-800">BASKET</h1>
            <div class="flex justify-center items-center bg-zinc-600 p-8 rounded-2xl shadow-lg w-fit">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-white">
                    <div class="flex flex-col gap-3 text-center">
                        <p class="font-bold text-3xl md:text-4xl">50+</p>
                        <p class="font-medium text-lg md:text-xl">Anggota</p>
                    </div>
                    <div class="flex flex-col gap-3 text-center">
                        <p class="font-bold text-3xl md:text-4xl">10+</p>
                        <p class="font-medium text-lg md:text-xl">Juara</p>
                    </div>
                    <div class="flex flex-col gap-3 text-center">
                        <p class="font-bold text-3xl md:text-4xl">5</p>
                        <p class="font-medium text-lg md:text-xl">Tahun</p>
                    </div>
                    <div class="flex flex-col gap-3 text-center">
                        <p class="font-bold text-3xl md:text-4xl">3</p>
                        <p class="font-medium text-lg md:text-xl">Pertemuan</p>
                    </div>
                </div>
            </div>
        </section>
        
        <section class="h-fit flex justify-center items-center py-16 md:py-24">
            <div class="flex flex-col lg:flex-row justify-center items-center gap-12 lg:gap-16 max-w-6xl w-full px-6">
                <div class="w-full lg:max-w-2xl">
                    <img src="/images/placeholder.jpg" alt="Kegiatan Ekstrakurikuler Basket" class="w-full h-80 md:h-96 object-cover rounded-lg shadow-md">
                </div>
                <div class="py-4 w-full">
                    <h1 class="font-bold tracking-wide text-3xl md:text-4xl py-2 text-slate-800">Ekstrakurikuler Basket</h1>
                    <hr class="border-2 w-24 md:w-32 border-blue-600 mb-6">
                    <div class="bg-white border border-slate-200 rounded-lg p-8 shadow-sm">
                        <p class="tracking-wide text-justify text-lg leading-relaxed text-slate-700">
                            Ekstrakurikuler basket sekolah kami telah berdiri sejak tahun 2019 dan menjadi salah satu wadah pengembangan bakat siswa di bidang olahraga. Dengan fasilitas lapangan yang memadai dan bimbingan pelatih berpengalaman, kami berkomitmen membentuk karakter sportif dan jiwa kompetitif siswa. Kegiatan latihan rutin dilaksanakan tiga kali seminggu dengan fokus pada pengembangan teknik dasar, strategi permainan, dan pembentukan mental juara yang kuat untuk menghadapi berbagai kompetisi.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section class="h-fit">
            <div class=""></div>
        </section>

        <section class="h-fit flex justify-center items-center py-20 md:py-40 bg-slate-50">
            <div class="flex justify-center items-center flex-col">
                <h1 class="text-4xl md:text-5xl font-bold text-center mb-4 text-slate-800">Aktivitas Terkait</h1>
                <p class="text-slate-600 text-lg text-center mb-16 max-w-2xl">Berbagai kegiatan dan prestasi yang telah dicapai oleh ekstrakurikuler basket</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 py-8 md:py-12 max-w-6xl w-full px-6">
                    <div v-for="(item, idx) in items" :key="idx" class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                        <img :src="item.image" alt="Aktivitas" class="w-full h-56 md:h-64 object-cover">
                        <div class="p-6">
                            <h1 class="font-bold text-xl md:text-2xl mb-4 text-slate-800">{{ item.title }}</h1>
                            <p class="text-slate-600 leading-relaxed mb-4">{{ item.desc }}</p>
                            <h2 class="text-right font-semibold tracking-wide text-blue-600">15 Maret 2024</h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="h-fit flex justify-center items-center py-20 md:py-40">
            <div class="flex justify-center items-center flex-col">
                <h1 class="text-4xl md:text-5xl font-bold text-center mb-4 text-slate-800">INFORMASI PENDAFTARAN BASKET</h1>
                <p class="text-slate-600 text-lg text-center mb-12 max-w-3xl px-6">Bergabunglah dengan ekstrakurikuler basket dan kembangkan potensi olahraga Anda</p>
                <div class="bg-slate-100 max-w-5xl w-full rounded-lg min-h-[500px] md:h-[640px] mt-8 md:mt-12 mx-6">
                    <div class="bg-white rounded-lg p-8 md:p-12 h-full shadow-sm border border-slate-200">
                        <h2 class="text-2xl md:text-3xl font-bold mb-8 text-center text-slate-800">Syarat dan Ketentuan Pendaftaran</h2>
                        
                        <div class="grid md:grid-cols-2 gap-8 md:gap-12">
                            <div>
                                <h3 class="font-bold text-xl mb-6 text-blue-600 flex items-center">
                                    <span class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                                    Persyaratan
                                </h3>
                                <ul class="space-y-3 text-slate-700">
                                    <li class="flex items-start">
                                        <span class="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <span>Siswa aktif kelas 7-11</span>
                                    </li>
                                    <li class="flex items-start">
                                        <span class="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <span>Mengisi formulir pendaftaran</span>
                                    </li>
                                    <li class="flex items-start">
                                        <span class="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <span>Surat persetujuan orang tua</span>
                                    </li>
                                    <li class="flex items-start">
                                        <span class="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <span>Sertifikat kesehatan</span>
                                    </li>
                                    <li class="flex items-start">
                                        <span class="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <span>Pas foto 3x4 (2 lembar)</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div>
                                <h3 class="font-bold text-xl mb-6 text-blue-600 flex items-center">
                                    <span class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                                    Informasi Latihan
                                </h3>
                                <div class="space-y-4 text-slate-700">
                                    <div class="border-l-4 border-blue-600 pl-4">
                                        <p class="font-semibold">Jadwal Latihan</p>
                                        <p>Senin, Rabu, Jumat</p>
                                    </div>
                                    <div class="border-l-4 border-blue-600 pl-4">
                                        <p class="font-semibold">Waktu</p>
                                        <p>15.30 - 17.30 WIB</p>
                                    </div>
                                    <div class="border-l-4 border-blue-600 pl-4">
                                        <p class="font-semibold">Tempat</p>
                                        <p>Lapangan Basket Sekolah</p>
                                    </div>
                                    <div class="border-l-4 border-blue-600 pl-4">
                                        <p class="font-semibold">Biaya</p>
                                        <p>Rp 150.000/bulan</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="mt-12 pt-8 border-t border-slate-200 text-center">
                            <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
                                <p class="font-bold text-xl text-blue-800 mb-2">Pendaftaran dibuka: 1-31 Juli 2024</p>
                                <p class="text-slate-700 mb-4">Untuk informasi lebih lanjut, hubungi:</p>
                                <div class="flex flex-col md:flex-row justify-center items-center gap-4 text-slate-600">
                                    <span class="font-semibold">Coach Budi: 0812-3456-7890</span>
                                    <span class="hidden md:inline">|</span>
                                    <span>Ruang Guru Olahraga</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>