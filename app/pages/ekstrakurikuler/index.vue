<script lang="ts" setup>
import { ref } from 'vue';

const isDialogOpen = ref(false);

const openDialog = () => {
  isDialogOpen.value = true;
  document.body.style.overflow = 'hidden';
};

const closeDialog = () => {
  isDialogOpen.value = false;
  document.body.style.overflow = '';
};

useHead({
  title: 'Ekstrakurikuler - SMKN 2 Singosari',
  meta: [
    {
      name: 'description',
      content: 'Daftar ekstrakurikuler dan organisasi di SMK Negeri 2 Singosari. Kembangkan bakat dan minatmu!'
    }
  ]
});
</script>
<template>
    <section class="h-screen flex items-center justify-start py-30">
        <div class="flex items-center justify-start w-full h-full overflow-hidden">
            <div class="-rotate-12 bg-neutral-300 flex items-center justify-center h-full flex-1 p-4">
                <h1 class="rotate-90 text-6xl font-bold text-transparent whitespace-nowrap" style="-webkit-text-stroke: 1px white;">
                    Lorem
                </h1>
            </div>
            <div class="-rotate-12 bg-neutral-400 flex items-center justify-center h-full flex-1 p-4">
                <h1 class="rotate-90 text-6xl font-bold text-transparent whitespace-nowrap" style="-webkit-text-stroke: 1px white;">
                    Ipsum
                </h1>
            </div>
            <div class="-rotate-12 bg-neutral-500 flex items-center justify-center h-full flex-1 p-4">
                <h1 class="rotate-90 text-6xl font-bold text-transparent whitespace-nowrap" style="-webkit-text-stroke: 1px white;">
                    Dolor
                </h1>
            </div>
            <div class="-rotate-12 bg-neutral-600 flex items-center justify-center h-full flex-1 p-4">
                <h1 class="rotate-90 text-6xl font-bold text-transparent whitespace-nowrap" style="-webkit-text-stroke: 1px white;">
                    Sit
                </h1>
            </div>
            <div class="-rotate-12 bg-neutral-700 flex items-center justify-center h-full flex-1 p-4">
                <h1 class="rotate-90 text-6xl font-bold text-transparent whitespace-nowrap" style="-webkit-text-stroke: 1px white;">
                    Amet
                </h1>
            </div>  
        </div>
    </section>

    <!-- New section based on the image layout -->
    <section class="min-h-screen bg-white py-16 px-8">
        <div class="max-w-4xl mx-auto">
            <!-- Stats Cards -->
            <div class="flex gap-8 justify-center mb-12">
                <div class="bg-white rounded-2xl shadow-lg p-8 text-center min-w-60">
                    <h2 class="text-5xl font-bold text-black mb-2">6</h2>
                    <p class="text-lg font-semibold text-black">ORGANISASI</p>
                </div>
                <div class="bg-white rounded-2xl shadow-lg p-8 text-center min-w-60">
                    <h2 class="text-5xl font-bold text-black mb-2">23</h2>
                    <p class="text-lg font-semibold text-black">EKSTRAKURIKULER</p>
                </div>
            </div>

            <!-- Main Title -->
            <div class="text-center mb-8">
                <h1 class="text-4xl md:text-5xl font-bold text-orange-400 mb-4">
                    ORGANISASI - ORGANISASI
                </h1>
                <p class="text-xl text-black font-medium">
                    Di SMK Negeri 02 Singosari
                </p>
            </div>

            <!-- Description -->
            <div class="text-center mb-12">
                <p class="text-lg text-black leading-relaxed max-w-2xl mx-auto">
                    Kembangkan dan asah kemampuan karmu dengan ikut organisasi yang ada di SMK Negeri 02 Singosari !!!
                </p>
            </div>

            <!-- FAQ-style Expandable Items -->
            <div class="space-y-4 mb-16">
                <div class="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between cursor-pointer hover:shadow-lg transition-shadow">
                    <span class="text-lg font-semibold text-black">Apa Itu Organisasi?</span>
                    <button class="text-2xl font-bold text-black">+</button>
                </div>
                <div class="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between cursor-pointer hover:shadow-lg transition-shadow">
                    <span class="text-lg font-semibold text-black">Terus Apa Fungsinya Ikut Organisasi</span>
                    <button class="text-2xl font-bold text-black">+</button>
                </div>
                <div class="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between cursor-pointer hover:shadow-lg transition-shadow">
                    <span class="text-lg font-semibold text-black">Apa Keuntungan Kalo Ikut Organisasi?</span>
                    <button class="text-2xl font-bold text-black">+</button>
                </div>
            </div>

            <!-- Search Section -->
            <div class="text-center">
                <h2 class="text-2xl font-bold text-black mb-6">
                    Daftar Organisasi Di SMK Negeri 02 Singosari
                </h2>
                <div class="relative max-w-md mx-auto">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Icon name="lucide:search" size="20" class="text-neutral-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Cari Organisasi"
                        class="w-full pl-12 pr-4 py-3 border border-neutral-300 rounded-full text-black placeholder-neutral-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                </div>
            </div>
        </div>
    </section>

    <!-- New Ekstrakurikuler section based on the second image -->
    <section class="min-h-screen bg-white py-16 px-8">
        <div class="max-w-4xl mx-auto">
            <!-- Main Title -->
            <div class="text-center mb-12">
                <h1 class="text-4xl md:text-5xl font-bold text-black mb-4">
                    EKSTRAKURIKULER - EKSTRAKURIKULER
                </h1>
                <p class="text-xl text-black font-medium">
                    Di SMK Negeri 02 Singosari
                </p>
            </div>

            <!-- FAQ-style Expandable Items for Ekstrakurikuler -->
            <div class="space-y-4 mb-16">
                <div class="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between cursor-pointer hover:shadow-lg transition-shadow">
                    <span class="text-lg font-semibold text-black">Apa Itu Ekstrakurikuler?</span>
                    <button class="text-2xl font-bold text-black">+</button>
                </div>
                <div class="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between cursor-pointer hover:shadow-lg transition-shadow">
                    <span class="text-lg font-semibold text-black">Terus Apa Fungsinya Ikut Ektrakurikuler?</span>
                    <button class="text-2xl font-bold text-black">+</button>
                </div>
                <div class="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between cursor-pointer hover:shadow-lg transition-shadow">
                    <span class="text-lg font-semibold text-black">Apa Keuntungan Kalo Ikut Ekstrakurikuler?</span>
                    <button class="text-2xl font-bold text-black">+</button>
                </div>
            </div>

            <!-- Search Section -->
            <div class="text-center mb-12">
                <h2 class="text-2xl md:text-3xl font-bold text-black mb-6">
                    DAFTAR EKSTRAKURIKULER
                </h2>
                <p class="text-lg text-black font-medium mb-8">
                    Di SMK Negeri 02 Singosari
                </p>
                <div class="relative max-w-md mx-auto">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Icon name="lucide:search" size="20" class="text-white" />
                    </div>
                    <input
                        type="text"
                        placeholder="Cari Ekstrakurikuler"
                        class="w-full pl-12 pr-4 py-3 border border-neutral-300 rounded-full text-black placeholder-white bg-blue-500/20 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                </div>
            </div>

            <!-- Category Buttons -->
            <div class="flex flex-wrap justify-center gap-4">
                <button class="bg-white rounded-full px-6 py-3 text-black font-semibold shadow-md hover:shadow-lg transition-shadow">
                    Kategori 1
                </button>
                <button class="bg-white rounded-full px-6 py-3 text-black font-semibold shadow-md hover:shadow-lg transition-shadow">
                    Kategori 2
                </button>
                <button class="bg-white rounded-full px-6 py-3 text-black font-semibold shadow-md hover:shadow-lg transition-shadow">
                    Kategori 3
                </button>
                <button class="bg-white rounded-full px-6 py-3 text-black font-semibold shadow-md hover:shadow-lg transition-shadow">
                    Kategori 4
                </button>
                <button class="bg-white rounded-full px-6 py-3 text-black font-semibold shadow-md hover:shadow-lg transition-shadow">
                    Kategori 5
                </button>
                <button class="bg-white rounded-full px-6 py-3 text-black font-semibold shadow-md hover:shadow-lg transition-shadow">
                    Kategori 6
                </button>
                <button class="bg-white rounded-full px-6 py-3 text-black font-semibold shadow-md hover:shadow-lg transition-shadow">
                    Kategori 7
                </button>
                <button class="bg-white rounded-full px-6 py-3 text-black font-semibold shadow-md hover:shadow-lg transition-shadow">
                    Kategori 8
                </button>
                <button class="bg-white rounded-full px-6 py-3 text-black font-semibold shadow-md hover:shadow-lg transition-shadow">
                    Kategori 9
                </button>
            </div>
        </div>
    </section>

    <!-- New cards section with logo hover effect -->
    <section class="min-h-screen bg-white py-16 px-8">
        <div class="w-full">
            <div class="space-y-4">
                <div v-for="n in 6" :key="n" class="group bg-neutral-100 rounded-lg p-8 cursor-pointer overflow-hidden hover:bg-neutral-200 transition-all duration-300 ease-in-out w-full">
                    <div class="flex items-center justify-center relative">
                        <!-- Logo that slides to the left on hover -->
                        <div class="transform transition-all duration-500 ease-in-out group-hover:-translate-x-20">
                            <img 
                                src="/images/logo.webp" 
                                alt="Logo" 
                                class="w-16 h-16 object-contain"
                            />
                        </div>
                        
                        <!-- Text that appears from the right on hover -->
                        <div class="absolute right-0 opacity-0 transform translate-x-10 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:translate-x-0">
                            <h3 class="text-2xl font-bold text-black">Lorem</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- New section with outline text cards -->
    <section class="min-h-screen bg-white py-16">
        <div class="w-full space-y-0">
            <div v-for="sport in ['BASKET', 'SEPAK BOLA', 'VOLLEY', 'BADMINTON', 'FUTSAL']" :key="sport" class="w-full bg-neutral-100 py-12 border-b border-neutral-300 cursor-pointer hover:bg-neutral-200 transition-colors duration-300">
                <div class="flex items-center justify-center">
                    <h2 class="text-8xl md:text-9xl font-bold text-transparent text-center" style="-webkit-text-stroke: 2px #000000;">
                        {{ sport }}
                    </h2>
                </div>
            </div>
        </div>
    </section>

    <!-- New call-to-action section -->
    <section class="h-fit bg-white py-16 px-8">
        <div class="max-w-4xl mx-auto text-center">
            <!-- Main Question -->
            <h2 class="text-2xl md:text-3xl font-medium text-black mb-4">
                Tidak Menemukan Ekstrakurikuler Yang Kamu Inginkan?
            </h2>
            
            <!-- Highlighted Text -->
            <h1 class="text-3xl md:text-4xl font-bold text-black mb-6">
                Tenang Aja!!
            </h1>
            
            <!-- Description -->
            <p class="text-lg text-black mb-8 leading-relaxed">
                Di SMK Negeri 2 Singosari, Kamu Bisa Buat Komunitas Ekstrakurikuler Baru Lohhh!!!
            </p>
            
            <!-- Call-to-Action Button -->
            <button 
                @click="openDialog"
                class="bg-white text-black font-semibold px-8 py-3 rounded-full border border-neutral-300 shadow-md hover:shadow-lg transition-all duration-300 hover:bg-neutral-50 flex items-center gap-2 mx-auto"
            >
                <span>Lihat Caranya</span>
                <Icon name="lucide:arrow-right" size="20" />
            </button>
        </div>
    </section>

    <!-- Dialog Modal -->
    <Teleport to="body">
        <Transition name="dialog">
            <div
                v-if="isDialogOpen"
                class="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4 pt-30"
                @click.self="closeDialog"
            >
                <div class="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto mt-8">
                    <!-- Dialog Header -->
                    <div class="flex justify-between items-center p-4 border-b">
                        <h2 class="text-xl font-bold text-black">Cara Membuat Ekstrakurikuler Baru</h2>
                        <button @click="closeDialog" class="text-neutral-500 hover:text-black">
                            <Icon name="lucide:x" size="20" />
                        </button>
                    </div>

                    <!-- Dialog Content -->
                    <div class="p-4 space-y-4">
                        <!-- Step 1 -->
                        <div class="flex gap-3">
                            <div class="flex-shrink-0 w-6 h-6 bg-white border-2 border-black rounded-full flex items-center justify-center">
                                <span class="text-xs font-bold text-black">1</span>
                            </div>
                            <div>
                                <h3 class="font-bold text-black mb-1 text-sm">Jadi Gini Caranya !!</h3>
                                <p class="text-xs text-black leading-relaxed">
                                    Caranya gampang banget, dan semua pasti bisa melakukan dengan cara yang mudah pernahkah kalian.
                                    Dan ada syarat syarat yang harus kamu lakukan sebagai pembuat ekstrakurikuler yang mengurus ekstrakurikuler harus
                                    berusia minimal 16 tahun, bersekolah disini, lulus tes leadership untuk menjadi ketua ekstrakurikuler tersebut.
                                </p>
                            </div>
                        </div>

                        <!-- Step 2 -->
                        <div class="flex gap-3">
                            <div class="flex-shrink-0 w-6 h-6 bg-white border-2 border-black rounded-full flex items-center justify-center">
                                <span class="text-xs font-bold text-black">2</span>
                            </div>
                            <div>
                                <h3 class="font-bold text-black mb-1 text-sm">Sudah Deh !!</h3>
                                <p class="text-xs text-black leading-relaxed">
                                    Dengan hini kamu sudah mempunyai peluang untuk menjadi katu ekstrakurikuler yang akan.
                                    baru yang kamu bangun sendiri dengan teman teman kalian yang selagi.
                                </p>
                            </div>
                        </div>

                        <!-- Step 3 -->
                        <div class="flex gap-3">
                            <div class="flex-shrink-0 w-6 h-6 bg-white border-2 border-black rounded-full flex items-center justify-center">
                                <span class="text-xs font-bold text-black">3</span>
                            </div>
                            <div>
                                <h3 class="font-bold text-black mb-1 text-sm">Masih Bingung ?</h3>
                                <p class="text-xs text-black leading-relaxed mb-3">
                                    Kalau kalian masih bingung, gimana caranya buat ekstrakurikuler tersebut lengkap cara membuat komunitas ekstrakurikuler
                                    dengan detail, dan kalau kamu masih bingung silahkan hubungi dibawah ini.
                                </p>

                                <!-- Contact Cards -->
                                <div class="grid grid-cols-1 gap-3">
                                    <!-- Instagram Card -->
                                    <div class="bg-white border border-neutral-300 rounded-lg p-3">
                                        <div class="flex items-center gap-2 mb-2">
                                            <Icon name="lucide:instagram" size="16" class="text-pink-600" />
                                            <span class="font-semibold text-black text-xs">Instagram</span>
                                        </div>
                                        <div class="space-y-1 text-xs">
                                            <div class="flex justify-between">
                                                <span class="text-neutral-600">@ Andika</span>
                                                <span class="text-black">@dika_abid_21</span>
                                            </div>
                                            <div class="flex justify-between">
                                                <span class="text-neutral-600">@ Dina</span>
                                                <span class="text-black">@andika_alrizalianty</span>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- WhatsApp Card -->
                                    <div class="bg-white border border-neutral-300 rounded-lg p-3">
                                        <div class="flex items-center gap-2 mb-2">
                                            <Icon name="lucide:message-circle" size="16" class="text-green-600" />
                                            <span class="font-semibold text-black text-xs">WhatsApp</span>
                                        </div>
                                        <div class="space-y-1 text-xs">
                                            <div class="flex justify-between">
                                                <span class="text-neutral-600">@ Andika</span>
                                                <span class="text-black">085859731672</span>
                                            </div>
                                            <div class="flex justify-between">
                                                <span class="text-neutral-600">@ Dina</span>
                                                <span class="text-black">+62 85845980017</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Dialog Footer -->
                    <div class="flex justify-center p-4 border-t">
                        <button @click="closeDialog" class="text-neutral-600 hover:text-black font-medium text-sm">
                            ← Kembali
                        </button>
                </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>
