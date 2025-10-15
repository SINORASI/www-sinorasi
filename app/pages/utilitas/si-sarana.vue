<script setup lang="ts">
import { siSaranaSchema, validateSiSarana, type SiSaranaForm } from '~/utils/schema'

const formData = ref<SiSaranaForm>({
  category: '',
  title: '',
  description: '',
  location: '',
  urgency: 'medium',
  reporterName: '',
  reporterContact: '',
  attachments: []
})

const errors = ref<Record<string, string>>({})
const isSubmitting = ref(false)
const showGuidelines = ref(false)

useHead({
  title: "SI Sarana - Utilitas - SMKN 2 Singosari",
  meta: [
    {
      name: "description",
      content: "Laporkan kerusakan atau masalah fasilitas sekolah melalui SI Sarana SMK Negeri 2 Singosari.",
    },
  ],
});

const categories = [
  { value: "fasilitas", label: "Fasilitas Kelas", icon: "lucide:door-open" },
  { value: "listrik", label: "Listrik & Lampu", icon: "lucide:zap" },
  { value: "sanitasi", label: "Sanitasi & Toilet", icon: "lucide:droplet" },
  { value: "furniture", label: "Meja & Kursi", icon: "lucide:armchair" },
  { value: "teknologi", label: "Komputer & Teknologi", icon: "lucide:monitor" },
  { value: "eksterior", label: "Bangunan & Eksterior", icon: "lucide:building" },
  { value: "lainnya", label: "Lainnya", icon: "lucide:more-horizontal" },
];

const urgencyLevels = [
  { value: 'low', label: 'Rendah', color: 'bg-green-100 text-green-800' },
  { value: 'medium', label: 'Sedang', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'high', label: 'Tinggi', color: 'bg-orange-100 text-orange-800' },
  { value: 'critical', label: 'Kritis', color: 'bg-red-100 text-red-800' },
];

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = Array.from(target.files || []);

  if (files.length > 0) {
    // Check total files limit
    if ((formData.value.attachments?.length || 0) + files.length > 5) {
      alert("Maksimal 5 file yang dapat diupload.");
      return;
    }

    // Validate each file
    for (const file of files) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert(`Ukuran file ${file.name} terlalu besar. Maksimal 5MB.`);
        return;
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        alert(`Tipe file ${file.name} tidak didukung. Gunakan JPG, PNG, GIF, atau PDF.`);
        return;
      }
    }

    // Add files to attachments
    formData.value.attachments = [...(formData.value.attachments || []), ...files];
  }
};

const removeAttachment = (index: number) => {
  formData.value.attachments = formData.value.attachments?.filter((_, i) => i !== index) || [];
};

const validateForm = () => {
  const result = validateSiSarana(formData.value)
  if (!result.success) {
    errors.value = {}
    result.error.issues.forEach((error) => {
      errors.value[error.path[0] as string] = error.message
    })
    return false
  }
  errors.value = {}
  return true
}

const submitReport = async () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true

  try {
    // TODO: Replace with actual API call to /api/si-sarana
    const response = await $fetch('/api/si-sarana', {
      method: 'POST',
      body: formData.value
    })

    alert("Laporan berhasil dikirim! Tim maintenance akan segera menindaklanjuti.")

    // Reset form
    formData.value = {
      category: '',
      title: '',
      description: '',
      location: '',
      urgency: 'medium',
      reporterName: '',
      reporterContact: '',
      attachments: []
    }
    errors.value = {}
  } catch (error) {
    alert("Terjadi kesalahan saat mengirim laporan. Silakan coba lagi.")
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="min-h-screen py-24 bg-gradient-to-b from-white via-orange-50 to-white">
    <div class="container px-4 mx-auto sm:px-6">
      <div class="max-w-3xl mx-auto">
        <!-- Header Section -->
        <div class="mb-12 text-center">
          <div
            class="inline-block px-10 py-6 mb-4 border border-orange-200 shadow-xl bg-gradient-to-r from-orange-600 to-orange-800 backdrop-blur-2xl rounded-2xl"
          >
            <h1 class="text-3xl font-bold text-white md:text-4xl">SI Sarana</h1>
          </div>
          <p class="max-w-2xl mx-auto text-lg text-gray-600">
            Sistem Informasi Sarana dan Prasarana sekolah. Laporkan kerusakan atau masalah fasilitas sekolah. Tim maintenance kami akan segera menindaklanjuti laporan
            Anda.
          </p>
        </div>

        <!-- Guidelines Button -->
        <div class="mb-8 text-center">
          <button
            @click="showGuidelines = true"
            class="flex items-center gap-2 px-6 py-3 mx-auto font-semibold transition-all bg-white border-2 border-orange-100 shadow-md hover:border-orange-600 hover:text-orange-600 rounded-xl hover:shadow-lg"
          >
            <Icon name="lucide:info" size="20" />
            <span>Panduan Pelaporan</span>
          </button>
        </div>

        <!-- Guidelines Modal -->
        <Teleport to="body">
          <Transition name="dialog">
            <div
              v-if="showGuidelines"
              class="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out opacity-0 bg-black/50 backdrop-blur-sm"
              @click="showGuidelines = false"
            >
              <div
                class="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto shadow-2xl border-2 border-orange-100 transition-transform duration-300 ease-in-out scale-90"
                @click.stop
              >
                <div class="p-8">
                  <div class="flex items-center justify-between mb-6">
                    <div
                      class="px-6 py-3 border border-orange-200 bg-gradient-to-r from-orange-600 to-orange-800 rounded-xl"
                    >
                      <h3 class="text-lg font-bold text-white">Panduan Pelaporan</h3>
                    </div>
                    <button
                      @click="showGuidelines = false"
                      class="p-2 text-gray-500 transition-colors bg-gray-100 rounded-full hover:text-gray-700 hover:bg-gray-200"
                    >
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
                      class="px-8 py-3 font-semibold text-white transition-colors bg-orange-600 rounded-lg shadow-md hover:bg-orange-700 hover:shadow-lg"
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
        <div class="p-8 bg-white border-2 border-orange-100 shadow-xl rounded-2xl md:p-10">
          <form @submit.prevent="submitReport" class="space-y-6">
            <!-- Category Selection -->
            <div>
              <label class="flex items-center mb-3 text-sm font-bold text-gray-800">
                <Icon name="lucide:folder" size="18" class="mr-2 text-orange-600" />
                Kategori Masalah <span class="ml-1 text-red-500">*</span>
              </label>
              <div class="grid grid-cols-2 gap-3 md:grid-cols-3">
                <button
                  v-for="cat in categories"
                  :key="cat.value"
                  type="button"
                  @click="formData.category = cat.value"
                  :class="[
                    'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all',
                    formData.category === cat.value
                      ? 'border-orange-600 bg-orange-50 text-orange-700'
                      : 'border-gray-200 hover:border-orange-300 text-gray-700',
                  ]"
                >
                  <Icon :name="cat.icon" size="24" />
                  <span class="text-xs font-medium text-center">{{ cat.label }}</span>
                </button>
              </div>
              <p v-if="errors.category" class="mt-2 text-sm text-red-600">{{ errors.category }}</p>
            </div>

            <!-- Title -->
            <div>
              <label for="title" class="flex items-center mb-3 text-sm font-bold text-gray-800">
                <Icon name="lucide:file-text" size="18" class="mr-2 text-orange-600" />
                Judul Laporan <span class="ml-1 text-red-500">*</span>
              </label>
              <input
                id="title"
                v-model="formData.title"
                type="text"
                class="w-full px-4 py-3 transition border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Contoh: Lampu ruang kelas XII RPL 1 tidak menyala"
              />
              <p v-if="errors.title" class="mt-2 text-sm text-red-600">{{ errors.title }}</p>
            </div>

            <!-- Location -->
            <div>
              <label for="location" class="flex items-center mb-3 text-sm font-bold text-gray-800">
                <Icon name="lucide:map-pin" size="18" class="mr-2 text-orange-600" />
                Lokasi <span class="ml-1 text-red-500">*</span>
              </label>
              <input
                id="location"
                v-model="formData.location"
                type="text"
                class="w-full px-4 py-3 transition border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Contoh: Lab Komputer Lantai 2, Kelas XII RPL 1, Toilet Pria Lantai 1"
              />
              <p v-if="errors.location" class="mt-2 text-sm text-red-600">{{ errors.location }}</p>
            </div>

            <!-- Description -->
            <div>
              <label for="description" class="flex items-center mb-3 text-sm font-bold text-gray-800">
                <Icon name="lucide:file-text" size="18" class="mr-2 text-orange-600" />
                Deskripsi Masalah <span class="ml-1 text-red-500">*</span>
              </label>
              <textarea
                id="description"
                v-model="formData.description"
                rows="5"
                class="w-full px-4 py-3 transition border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-vertical"
                placeholder="Jelaskan masalah secara detail, misalnya: Lampu di ruang kelas tidak menyala, kabel terlihat putus..."
              ></textarea>
              <p v-if="errors.description" class="mt-2 text-sm text-red-600">{{ errors.description }}</p>
              <p class="mt-2 ml-1 text-xs text-gray-500">Semakin detail, semakin cepat kami dapat menindaklanjuti</p>
            </div>

            <!-- Urgency Level -->
            <div>
              <label class="flex items-center mb-3 text-sm font-bold text-gray-800">
                <Icon name="lucide:alert-triangle" size="18" class="mr-2 text-orange-600" />
                Tingkat Urgensi
              </label>
              <div class="grid grid-cols-2 gap-3 md:grid-cols-4">
                <button
                  v-for="level in urgencyLevels"
                  :key="level.value"
                  type="button"
                  @click="formData.urgency = level.value"
                  :class="[
                    'flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all',
                    formData.urgency === level.value
                      ? 'border-orange-600 bg-orange-50 text-orange-700'
                      : 'border-gray-200 hover:border-orange-300 text-gray-700',
                  ]"
                >
                  <span :class="['px-2 py-1 text-xs font-medium rounded-full', level.color]">{{ level.label }}</span>
                </button>
              </div>
            </div>

            <!-- Reporter Information -->
            <div class="grid gap-4 md:grid-cols-2">
              <div>
                <label for="reporterName" class="flex items-center mb-3 text-sm font-bold text-gray-800">
                  <Icon name="lucide:user" size="18" class="mr-2 text-orange-600" />
                  Nama Pelapor (Opsional)
                </label>
                <input
                  id="reporterName"
                  v-model="formData.reporterName"
                  type="text"
                  class="w-full px-4 py-3 transition border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Nama lengkap Anda"
                />
                <p v-if="errors.reporterName" class="mt-2 text-sm text-red-600">{{ errors.reporterName }}</p>
              </div>

              <div>
                <label for="reporterContact" class="flex items-center mb-3 text-sm font-bold text-gray-800">
                  <Icon name="lucide:phone" size="18" class="mr-2 text-orange-600" />
                  Kontak (Opsional)
                </label>
                <input
                  id="reporterContact"
                  v-model="formData.reporterContact"
                  type="text"
                  class="w-full px-4 py-3 transition border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Email atau nomor telepon"
                />
                <p v-if="errors.reporterContact" class="mt-2 text-sm text-red-600">{{ errors.reporterContact }}</p>
              </div>
            </div>

            <!-- File Upload -->
            <div>
              <label class="flex items-center mb-3 text-sm font-bold text-gray-800">
                <Icon name="lucide:paperclip" size="18" class="mr-2 text-orange-600" />
                Lampiran (Opsional)
              </label>

              <div
                v-if="!formData.attachments || formData.attachments.length === 0"
                class="p-8 text-center transition border-2 border-gray-300 border-dashed rounded-xl hover:border-orange-400"
              >
                <input type="file" accept="image/*,.pdf" multiple @change="handleFileChange" class="hidden" id="fileUpload" />
                <label for="fileUpload" class="cursor-pointer">
                  <Icon name="lucide:upload-cloud" size="48" class="mx-auto mb-3 text-gray-400" />
                  <p class="mb-1 font-medium text-gray-600">Klik untuk upload file</p>
                  <p class="text-xs text-gray-500">JPG, PNG, GIF, PDF hingga 5MB (maks 5 file)</p>
                </label>
              </div>

              <div v-else class="space-y-3">
                <div
                  v-for="(file, index) in formData.attachments"
                  :key="index"
                  class="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-xl"
                >
                  <div class="flex items-center gap-3">
                    <Icon
                      :name="file.type.startsWith('image/') ? 'lucide:image' : 'lucide:file-text'"
                      size="24"
                      class="text-gray-600"
                    />
                    <div>
                      <p class="text-sm font-medium text-gray-800">{{ file.name }}</p>
                      <p class="text-xs text-gray-500">{{ (file.size / 1024 / 1024).toFixed(2) }} MB</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    @click="removeAttachment(index)"
                    class="p-2 text-red-500 transition-colors bg-red-50 rounded-full hover:bg-red-100"
                  >
                    <Icon name="lucide:x" size="16" />
                  </button>
                </div>

                <div v-if="formData.attachments && formData.attachments.length < 5" class="text-center">
                  <input type="file" accept="image/*,.pdf" multiple @change="handleFileChange" class="hidden" id="additionalFileUpload" />
                  <label for="additionalFileUpload" class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-orange-600 transition-colors bg-orange-50 rounded-lg cursor-pointer hover:bg-orange-100">
                    <Icon name="lucide:plus" size="16" />
                    Tambah file
                  </label>
                </div>
              </div>
              <p v-if="errors.attachments" class="mt-2 text-sm text-red-600">{{ errors.attachments }}</p>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="isSubmitting"
              class="flex items-center justify-center w-full gap-2 px-4 py-4 font-bold text-white transition duration-200 bg-orange-600 shadow-md hover:bg-orange-700 disabled:bg-orange-400 rounded-xl hover:shadow-lg"
            >
              <Icon v-if="isSubmitting" name="lucide:loader-2" class="animate-spin" size="20" />
              <Icon v-else name="lucide:send" size="20" />
              <span>{{ isSubmitting ? "Mengirim..." : "Kirim Laporan" }}</span>
            </button>
          </form>

          <div class="mt-6 text-center">
            <div class="p-4 bg-gradient-to-r from-orange-600 to-orange-800 rounded-2xl">
              <p class="flex items-center justify-center gap-2 text-sm text-white">
                <Icon name="lucide:clock" size="18" />
                Tim maintenance akan merespon dalam 1-2 hari kerja
              </p>
            </div>
          </div>
        </div>

        <!-- Info Cards -->
        <div class="grid gap-6 mt-8 md:grid-cols-2">
          <div class="p-6 bg-white border-2 border-blue-100 shadow-xl rounded-2xl">
            <Icon name="lucide:headphones" size="32" class="mb-3 text-blue-600" />
            <p class="mb-2 font-semibold text-gray-700">Butuh bantuan darurat?</p>
            <p class="text-sm text-gray-600">Hubungi bagian tata usaha: (0341) 123456</p>
          </div>

          <div class="p-6 bg-white border-2 border-green-100 shadow-xl rounded-2xl">
            <Icon name="lucide:check-circle" size="32" class="mb-3 text-green-600" />
            <p class="mb-2 font-semibold text-gray-700">Cek Status Laporan</p>
            <p class="text-sm text-gray-600">Segera hadir: Fitur tracking laporan Anda</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

