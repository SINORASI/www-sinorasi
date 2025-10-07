<script setup lang="ts">
const description = ref('')
const location = ref('')
const category = ref('')
const reportDate = ref('')
const imageFile = ref<File | null>(null)
const imagePreview = ref('')
const isSubmitting = ref(false)
const showGuidelines = ref(false)

useHead({
  title: 'E-Report - Utilitas - SMKN 2 Singosari',
  meta: [
    {
      name: 'description',
      content: 'Laporkan kerusakan atau masalah fasilitas sekolah melalui E-Report SMK Negeri 2 Singosari.'
    }
  ]
});

const categories = [
  { value: 'fasilitas', label: 'Fasilitas Kelas', icon: 'lucide:door-open' },
  { value: 'listrik', label: 'Listrik & Lampu', icon: 'lucide:zap' },
  { value: 'sanitasi', label: 'Sanitasi & Toilet', icon: 'lucide:droplet' },
  { value: 'furniture', label: 'Meja & Kursi', icon: 'lucide:armchair' },
  { value: 'teknologi', label: 'Komputer & Teknologi', icon: 'lucide:monitor' },
  { value: 'eksterior', label: 'Bangunan & Eksterior', icon: 'lucide:building' },
  { value: 'lainnya', label: 'Lainnya', icon: 'lucide:more-horizontal' },
]

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (file) {
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file terlalu besar. Maksimal 5MB.')
      return
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('File harus berupa gambar.')
      return
    }
    
    imageFile.value = file
    
    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const removeImage = () => {
  imageFile.value = null
  imagePreview.value = ''
}

const submitReport = async () => {
  if (!description.value.trim() || !category.value) {
    alert('Silakan lengkapi deskripsi dan kategori')
    return
  }
  
  isSubmitting.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  alert('Laporan berhasil dikirim! Tim maintenance akan segera menindaklanjuti.')
  
  // Reset form
  description.value = ''
  location.value = ''
  category.value = ''
  reportDate.value = ''
  imageFile.value = null
  imagePreview.value = ''
  
  isSubmitting.value = false
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-white via-orange-50 to-white py-24">
    <div class="container mx-auto px-4 sm:px-6">
      <div class="max-w-3xl mx-auto">
        <!-- Header Section -->
        <div class="text-center mb-12">
          <div class="bg-gradient-to-r from-orange-600 to-orange-800 backdrop-blur-2xl shadow-xl rounded-2xl px-10 py-6 border border-orange-200 inline-block mb-4">
            <h1 class="text-3xl md:text-4xl font-bold text-white">E-Report</h1>
          </div>
          <p class="text-gray-600 text-lg max-w-2xl mx-auto">
            Laporkan kerusakan atau masalah fasilitas sekolah. Tim maintenance kami akan segera menindaklanjuti laporan Anda.
          </p>
        </div>

        <!-- Guidelines Button -->
        <div class="text-center mb-8">
          <button
            @click="showGuidelines = true"
            class="bg-white border-2 border-orange-100 hover:border-orange-600 hover:text-orange-600 px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2 mx-auto"
          >
            <Icon name="lucide:info" size="20" />
            <span>Panduan Pelaporan</span>
          </button>
        </div>

        <!-- Guidelines Modal -->
        <Teleport to="body">
          <Transition name="dialog">
            <div v-if="showGuidelines" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" @click="showGuidelines = false">
              <div class="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto shadow-2xl border-2 border-orange-100" @click.stop>
                <div class="p-8">
                  <div class="flex justify-between items-center mb-6">
                    <div class="bg-gradient-to-r from-orange-600 to-orange-800 rounded-xl px-6 py-3 border border-orange-200">
                      <h3 class="text-lg font-bold text-white">Panduan Pelaporan</h3>
                    </div>
                    <button @click="showGuidelines = false" class="text-gray-500 hover:text-gray-700 bg-gray-100 rounded-full p-2 hover:bg-gray-200 transition-colors">
                      <Icon name="lucide:x" size="24" />
                    </button>
                  </div>
                  <ul class="space-y-4 text-gray-700">
                    <li class="flex items-start gap-3">
                      <Icon name="lucide:circle-dot" size="18" class="text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Jelaskan masalah dengan detail dan spesifik</span>
                    </li>
                    <li class="flex items-start gap-3">
                      <Icon name="lucide:circle-dot" size="18" class="text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Sertakan lokasi yang jelas (nama ruangan, lantai, dll)</span>
                    </li>
                    <li class="flex items-start gap-3">
                      <Icon name="lucide:circle-dot" size="18" class="text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Upload foto untuk memperjelas kondisi (opsional)</span>
                    </li>
                    <li class="flex items-start gap-3">
                      <Icon name="lucide:circle-dot" size="18" class="text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Pilih kategori yang sesuai dengan masalah</span>
                    </li>
                    <li class="flex items-start gap-3">
                      <Icon name="lucide:circle-dot" size="18" class="text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Tanggal kejadian membantu tim menindaklanjuti lebih cepat</span>
                    </li>
                  </ul>
                  <div class="mt-8 text-center">
                    <button
                      @click="showGuidelines = false"
                      class="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg transition-colors font-semibold shadow-md hover:shadow-lg"
                    >
                      Mengerti
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </Teleport>

        <!-- Form Section -->
        <div class="bg-white rounded-2xl shadow-xl border-2 border-orange-100 p-8 md:p-10">
          <form @submit.prevent="submitReport" class="space-y-6">
            
            <!-- Category Selection -->
            <div>
              <label class="block text-sm font-bold text-gray-800 mb-3 flex items-center">
                <Icon name="lucide:folder" size="18" class="mr-2 text-orange-600" />
                Kategori Masalah <span class="text-red-500 ml-1">*</span>
              </label>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                <button
                  v-for="cat in categories"
                  :key="cat.value"
                  type="button"
                  @click="category = cat.value"
                  :class="[
                    'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all',
                    category === cat.value
                      ? 'border-orange-600 bg-orange-50 text-orange-700'
                      : 'border-gray-200 hover:border-orange-300 text-gray-700'
                  ]"
                >
                  <Icon :name="cat.icon" size="24" />
                  <span class="text-xs font-medium text-center">{{ cat.label }}</span>
                </button>
              </div>
            </div>

            <!-- Location -->
            <div>
              <label for="location" class="block text-sm font-bold text-gray-800 mb-3 flex items-center">
                <Icon name="lucide:map-pin" size="18" class="mr-2 text-orange-600" />
                Lokasi
              </label>
              <input
                id="location"
                v-model="location"
                type="text"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                placeholder="Contoh: Lab Komputer Lantai 2, Kelas XII RPL 1, Toilet Pria Lantai 1"
              />
            </div>

            <!-- Description -->
            <div>
              <label for="description" class="block text-sm font-bold text-gray-800 mb-3 flex items-center">
                <Icon name="lucide:file-text" size="18" class="mr-2 text-orange-600" />
                Deskripsi Masalah <span class="text-red-500 ml-1">*</span>
              </label>
              <textarea
                id="description"
                v-model="description"
                rows="5"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-vertical transition"
                placeholder="Jelaskan masalah secara detail, misalnya: Lampu di ruang kelas tidak menyala, kabel terlihat putus..."
                required
              ></textarea>
              <p class="text-xs text-gray-500 mt-2 ml-1">
                Semakin detail, semakin cepat kami dapat menindaklanjuti
              </p>
            </div>

            <!-- Date (Optional) -->
            <div>
              <label for="reportDate" class="block text-sm font-bold text-gray-800 mb-3 flex items-center">
                <Icon name="lucide:calendar" size="18" class="mr-2 text-orange-600" />
                Tanggal Kejadian (Opsional)
              </label>
              <input
                id="reportDate"
                v-model="reportDate"
                type="date"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
              />
              <p class="text-xs text-gray-500 mt-2 ml-1">
                Kapan masalah ini pertama kali Anda temukan?
              </p>
            </div>

            <!-- Image Upload -->
            <div>
              <label class="block text-sm font-bold text-gray-800 mb-3 flex items-center">
                <Icon name="lucide:image" size="18" class="mr-2 text-orange-600" />
                Foto (Opsional)
              </label>
              
              <div v-if="!imagePreview" class="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-orange-400 transition">
                <input
                  type="file"
                  accept="image/*"
                  @change="handleFileChange"
                  class="hidden"
                  id="imageUpload"
                />
                <label for="imageUpload" class="cursor-pointer">
                  <Icon name="lucide:upload-cloud" size="48" class="text-gray-400 mx-auto mb-3" />
                  <p class="text-gray-600 font-medium mb-1">Klik untuk upload foto</p>
                  <p class="text-xs text-gray-500">PNG, JPG hingga 5MB</p>
                </label>
              </div>

              <div v-else class="relative">
                <img :src="imagePreview" alt="Preview" class="w-full h-64 object-cover rounded-xl border-2 border-orange-200" />
                <button
                  type="button"
                  @click="removeImage"
                  class="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors shadow-lg"
                >
                  <Icon name="lucide:x" size="20" />
                </button>
              </div>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white font-bold py-4 px-4 rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <Icon v-if="isSubmitting" name="lucide:loader-2" class="animate-spin" size="20" />
              <Icon v-else name="lucide:send" size="20" />
              <span>{{ isSubmitting ? 'Mengirim...' : 'Kirim Laporan' }}</span>
            </button>
          </form>

          <div class="mt-6 text-center">
            <div class="bg-gradient-to-r from-orange-600 to-orange-800 rounded-2xl p-4">
              <p class="text-sm text-white flex items-center justify-center gap-2">
                <Icon name="lucide:clock" size="18" />
                Tim maintenance akan merespon dalam 1-2 hari kerja
              </p>
            </div>
          </div>
        </div>

        <!-- Info Cards -->
        <div class="mt-8 grid md:grid-cols-2 gap-6">
          <div class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-6">
            <Icon name="lucide:headphones" size="32" class="text-blue-600 mb-3" />
            <p class="text-gray-700 font-semibold mb-2">Butuh bantuan darurat?</p>
            <p class="text-gray-600 text-sm">Hubungi bagian tata usaha: (0341) 123456</p>
          </div>
          
          <div class="bg-white rounded-2xl shadow-xl border-2 border-green-100 p-6">
            <Icon name="lucide:check-circle" size="32" class="text-green-600 mb-3" />
            <p class="text-gray-700 font-semibold mb-2">Cek Status Laporan</p>
            <p class="text-gray-600 text-sm">Segera hadir: Fitur tracking laporan Anda</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.3s ease;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}

.dialog-enter-active > div,
.dialog-leave-active > div {
  transition: transform 0.3s ease;
}

.dialog-enter-from > div,
.dialog-leave-to > div {
  transform: scale(0.9);
}
</style>
