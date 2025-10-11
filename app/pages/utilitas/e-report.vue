<script setup lang="ts">
const description = ref("");
const location = ref("");
const category = ref("");
const reportDate = ref("");
const imageFile = ref<File | null>(null);
const imagePreview = ref("");
const isSubmitting = ref(false);
const showGuidelines = ref(false);

useHead({
  title: "E-Report - Utilitas - SMKN 2 Singosari",
  meta: [
    {
      name: "description",
      content: "Laporkan kerusakan atau masalah fasilitas sekolah melalui E-Report SMK Negeri 2 Singosari.",
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

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran file terlalu besar. Maksimal 5MB.");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("File harus berupa gambar.");
      return;
    }

    imageFile.value = file;

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const removeImage = () => {
  imageFile.value = null;
  imagePreview.value = "";
};

const submitReport = async () => {
  if (!description.value.trim() || !category.value) {
    alert("Silakan lengkapi deskripsi dan kategori");
    return;
  }

  isSubmitting.value = true;

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1500));

  alert("Laporan berhasil dikirim! Tim maintenance akan segera menindaklanjuti.");

  // Reset form
  description.value = "";
  location.value = "";
  category.value = "";
  reportDate.value = "";
  imageFile.value = null;
  imagePreview.value = "";

  isSubmitting.value = false;
};
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
            <h1 class="text-3xl font-bold text-white md:text-4xl">E-Report</h1>
          </div>
          <p class="max-w-2xl mx-auto text-lg text-gray-600">
            Laporkan kerusakan atau masalah fasilitas sekolah. Tim maintenance kami akan segera menindaklanjuti laporan
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
                  @click="category = cat.value"
                  :class="[
                    'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all',
                    category === cat.value
                      ? 'border-orange-600 bg-orange-50 text-orange-700'
                      : 'border-gray-200 hover:border-orange-300 text-gray-700',
                  ]"
                >
                  <Icon :name="cat.icon" size="24" />
                  <span class="text-xs font-medium text-center">{{ cat.label }}</span>
                </button>
              </div>
            </div>

            <!-- Location -->
            <div>
              <label for="location" class="flex items-center mb-3 text-sm font-bold text-gray-800">
                <Icon name="lucide:map-pin" size="18" class="mr-2 text-orange-600" />
                Lokasi
              </label>
              <input
                id="location"
                v-model="location"
                type="text"
                class="w-full px-4 py-3 transition border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Contoh: Lab Komputer Lantai 2, Kelas XII RPL 1, Toilet Pria Lantai 1"
              />
            </div>

            <!-- Description -->
            <div>
              <label for="description" class="flex items-center mb-3 text-sm font-bold text-gray-800">
                <Icon name="lucide:file-text" size="18" class="mr-2 text-orange-600" />
                Deskripsi Masalah <span class="ml-1 text-red-500">*</span>
              </label>
              <textarea
                id="description"
                v-model="description"
                rows="5"
                class="w-full px-4 py-3 transition border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-vertical"
                placeholder="Jelaskan masalah secara detail, misalnya: Lampu di ruang kelas tidak menyala, kabel terlihat putus..."
                required
              ></textarea>
              <p class="mt-2 ml-1 text-xs text-gray-500">Semakin detail, semakin cepat kami dapat menindaklanjuti</p>
            </div>

            <!-- Date (Optional) -->
            <div>
              <label for="reportDate" class="flex items-center mb-3 text-sm font-bold text-gray-800">
                <Icon name="lucide:calendar" size="18" class="mr-2 text-orange-600" />
                Tanggal Kejadian (Opsional)
              </label>
              <input
                id="reportDate"
                v-model="reportDate"
                type="date"
                class="w-full px-4 py-3 transition border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
              <p class="mt-2 ml-1 text-xs text-gray-500">Kapan masalah ini pertama kali Anda temukan?</p>
            </div>

            <!-- Image Upload -->
            <div>
              <label class="flex items-center mb-3 text-sm font-bold text-gray-800">
                <Icon name="lucide:image" size="18" class="mr-2 text-orange-600" />
                Foto (Opsional)
              </label>

              <div
                v-if="!imagePreview"
                class="p-8 text-center transition border-2 border-gray-300 border-dashed rounded-xl hover:border-orange-400"
              >
                <input type="file" accept="image/*" @change="handleFileChange" class="hidden" id="imageUpload" />
                <label for="imageUpload" class="cursor-pointer">
                  <Icon name="lucide:upload-cloud" size="48" class="mx-auto mb-3 text-gray-400" />
                  <p class="mb-1 font-medium text-gray-600">Klik untuk upload foto</p>
                  <p class="text-xs text-gray-500">PNG, JPG hingga 5MB</p>
                </label>
              </div>

              <div v-else class="relative">
                <img
                  :src="imagePreview"
                  alt="Preview"
                  class="object-cover w-full h-64 border-2 border-orange-200 rounded-xl"
                />
                <button
                  type="button"
                  @click="removeImage"
                  class="absolute p-2 text-white transition-colors bg-red-500 rounded-full shadow-lg top-2 right-2 hover:bg-red-600"
                >
                  <Icon name="lucide:x" size="20" />
                </button>
              </div>
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

