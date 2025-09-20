<template>
  <main class="flex flex-col gap-20">
    <section class="min-h-screen flex items-center justify-center py-10 px-4">
      <!-- Hero section left empty for now -->
    </section>

    <section class="py-20">
      <div class="container mx-auto max-w-4xl">
        <!-- Main Content Area with Blue Borders -->
        <div class="bg-white border-l-8 border-r-8 border-blue-500">

          <!-- Header Section -->
          <div class="text-center pt-12 pb-8 px-4 bg-gray-200">
            <h1 class="text-5xl font-extrabold tracking-widest text-gray-800">EKSTRAKULIKULER</h1>
            <h2 class="text-xl font-semibold text-gray-700 mt-2">DI SMK NEGERI 2 SINGOSARI</h2>

            <div class="mt-10">
              <h3 class="font-bold text-gray-800">APA ITU EKSTRAKULIKULER ?</h3>
              <p class="text-xs text-gray-600 mt-2 leading-relaxed break-words">
                pengertianorganisasipengertianorganisasipengertianorganisasipengertianorganisasipengertianorganisasipengertianorganisasipengertianorganisasipengertianorganisasipengertianorganisasipengertianorganisasipengertianorganisasipengertianorganisasipengertianorganisasi
              </p>
            </div>

            <div class="mt-6">
              <h3 class="font-bold text-gray-800">TERUS APA FUNGSINYA?</h3>
              <p class="text-xs text-gray-600 mt-2 leading-relaxed break-words">
                pengertianorganisasipengertianorganisasipengertianorganisasipengertianorganisasipengertianorganisasipengertianorganisasipengertianorganisasipengertianorganisasipengertianorganisasipengertianorganisasipengertianorganisasipengertianorganisasipengertianorganisasi
              </p>
            </div>
          </div>

          <!-- Activities List -->
          <div class="activities-list">
            <!-- VOLI -->
            <div class="activity-item bg-gray-200 border-t-4 border-white">
              <span class="activity-text">VOLI</span>
            </div>

            <!-- BASKET -->
            <div class="activity-item bg-gray-200 border-t-4 border-white relative">
              <span class="activity-text">BASKET</span>
              <!-- Custom Scroll Indicator -->
              <div class="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
                  <div class="bg-gray-800 rounded-full h-36 w-8 flex flex-col items-center justify-between py-2">
                      <!-- Up Arrow -->
                      <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path></svg>
                      <!-- Dots -->
                      <div class="flex flex-col space-y-2">
                          <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
                          <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
                          <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
                          <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
                          <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </div>
                       <!-- Down Arrow -->
                      <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
              </div>
            </div>

            <!-- PANAHAN -->
            <div class="activity-item bg-gray-200 border-t-4 border-white">
              <span class="activity-text">PANAHAN</span>
            </div>
          </div>

          <!-- Footer Red Bar -->
          <div class="h-5 bg-red-600"></div>

        </div>
      </div>
    </section>

    <section class="py-20">
      <div class="container mx-auto max-w-4xl">
        <!-- "Not Finding the Extracurricular" Header -->
        <div class="bg-red-600 text-white text-center py-4">
          <h2 class="text-xl font-bold">Tidak Menemukan Ekstrakulikuler Yang Kamu Inginkan?</h2>
        </div>

        <!-- Main Content Area -->
        <div class="bg-gray-100 text-gray-800 text-center px-6 py-12">
          <!-- "Don't Worry" Section -->
          <div class="mb-10">
            <h3 class="text-4xl font-extrabold">TENANG AJA</h3>
            <p class="mt-2 text-md">Di SMK Negeri 2 Singosari, Kamu Bisa Buat Komunitas Ekstrakulikuler Baru Lohhh!!</p>
          </div>

          <!-- "How To" Section -->
          <div>
            <h3 class="text-3xl font-bold mb-4">Mau Tau Caranya?</h3>
            <p class="text-sm leading-relaxed text-gray-700">
              Caranya gampang banget, kamu cuman perlu ngumpulin temen temen yang minat ekstrakulikulernya sama sepertimu, untuk membuat komunitas ekstrakulikuler baru baru, minimal kamu membutuhkan 10 orang atau lebih. setelah itu kalian dapat menghubungi pihak OSIS SMK Negeri 2 Singosari untuk menyampaikan bahwa kalian ingin membuat komunitas ekstrakulikuler baru, dan nantinya dari pihak OSIS akan menyampaikan aspirasi kalian kepada WAKA KESISWAAN atau yang bersangkutan. Nanti dari pihak sekolah akan membuat keputusan "apakah komunitas ekstrakulikuler baru yang kamu buat itu sudah memenuhi standart atau tidak".
            </p>
          </div>
        </div>

        <!-- Footer/CTA Section -->
        <div class="bg-red-600 text-white text-center px-6 py-12">
          <h3 class="text-4xl font-extrabold">SUDAH DEH!</h3>
          <p class="mt-4 text-md leading-relaxed">
            dengan hal itu maka kalian sudah resmi membuat komunitas ektrakulikuler baru!!!, <br>
            nahh nantinya kalian juga bakalan di dampingi oleh pembina komitas ektrakulikulker baru yang kalian buat juga lohh!!!
          </p>

          <h4 class="text-3xl font-bold mt-10">MASIH BINGUNG? CHAT ADMIN AJA</h4>

          <!-- WhatsApp Icon -->
          <div class="flex justify-center mt-6">
            <a href="#" aria-label="Chat with admin on WhatsApp" class="whatsapp-icon-container">
              <Icon name="simple-icons:whatsapp" size="80" />
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>