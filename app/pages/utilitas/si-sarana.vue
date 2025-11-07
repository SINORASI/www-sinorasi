<script setup lang="ts">
import { type SiSaranaForm, validateSiSarana } from "~/utils/schema";

const formData = ref<SiSaranaForm>({
  category: "",
  title: "",
  description: "",
  location: "",
  urgency: "medium",
  reporterName: "",
  reporterContact: "",
  attachments: [],
});

const errors = ref<Record<string, string>>({});
const isSubmitting = ref(false);
const showGuidelines = ref(false);

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
  { value: "low", label: "Rendah", color: "bg-green-100 text-green-800" },
  { value: "medium", label: "Sedang", color: "bg-yellow-100 text-yellow-800" },
  { value: "high", label: "Tinggi", color: "bg-orange-100 text-orange-800" },
  { value: "critical", label: "Kritis", color: "bg-red-100 text-red-800" },
];

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = Array.from(target.files || []);

  if (files.length > 0) {
    if ((formData.value.attachments?.length || 0) + files.length > 5) {
      alert("Maksimal 5 file yang dapat diupload.");
      return;
    }

    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        alert(`Ukuran file ${file.name} terlalu besar. Maksimal 5MB.`);
        return;
      }

      const allowedTypes = ["image/jpeg", "image/png", "image/gif", "application/pdf"];
      if (!allowedTypes.includes(file.type)) {
        alert(`Tipe file ${file.name} tidak didukung. Gunakan JPG, PNG, GIF, atau PDF.`);
        return;
      }
    }

    formData.value.attachments = [...(formData.value.attachments || []), ...files];
  }
};

const removeAttachment = (index: number) => {
  formData.value.attachments = formData.value.attachments?.filter((_, i) => i !== index) || [];
};

const validateForm = () => {
  const result = validateSiSarana(formData.value);
  if (!result.success) {
    errors.value = {};
    result.error.issues.forEach((error) => {
      errors.value[error.path[0] as string] = error.message;
    });
    return false;
  }
  errors.value = {};
  return true;
};

const submitReport = async () => {
  if (!validateForm()) {
    return;
  }

  isSubmitting.value = true;

  try {
    const response = await $fetch("/api/si-sarana", {
      method: "POST",
      body: formData.value,
    });

    alert("Laporan berhasil dikirim! Tim maintenance akan segera menindaklanjuti.");

    formData.value = {
      category: "",
      title: "",
      description: "",
      location: "",
      urgency: "medium",
      reporterName: "",
      reporterContact: "",
      attachments: [],
    };
    errors.value = {};
  } catch (error) {
    alert("Terjadi kesalahan saat mengirim laporan. Silakan coba lagi.");
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <ClientOnly>
    <div class="min-h-screen py-32 bg-linear-to-br from-slate-50 via-orange-50 to-orange-100">
      <div class="container px-4 mx-auto sm:px-6 lg:px-8">
        <div class="max-w-5xl mx-auto">
          <div class="mb-16 text-center animate-fade-in-up">
            <div
              class="inline-block px-8 py-6 mb-6 border border-orange-200 shadow-2xl bg-linear-to-r from-orange-600 to-orange-800 backdrop-blur-2xl rounded-3xl transform hover:scale-105 transition-all duration-300 sm:px-12 sm:py-8"
            >
              <h1 class="text-3xl font-bold text-white sm:text-4xl md:text-5xl tracking-tight">SI Sarana</h1>
            </div>
            <p
              class="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed animate-slide-in-left stagger-1 sm:text-xl"
            >
              Sistem Informasi Sarana dan Prasarana sekolah. Laporkan kerusakan atau masalah fasilitas sekolah dengan
              mudah dan cepat.
              <span class="font-semibold text-orange-600">Tim maintenance kami siap menindaklanjuti laporan Anda.</span>
            </p>
          </div>

          <div class="mb-12 text-center animate-slide-in-right stagger-2">
            <button
              @click="showGuidelines = true"
              class="flex items-center gap-3 px-8 py-4 mx-auto font-semibold transition-all bg-white border-2 border-orange-200 shadow-lg hover:border-orange-400 hover:shadow-xl rounded-2xl hover:scale-105 transform duration-200 hover-lift"
            >
              <Icon name="lucide:info" size="22" class="text-orange-600" />
              <span class="text-gray-700">Panduan Pelaporan</span>
            </button>
          </div>

          <Teleport to="body">
            <Transition name="dialog">
              <div
                v-if="showGuidelines"
                class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                @click="showGuidelines = false"
              >
                <div
                  class="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-orange-200"
                  @click.stop
                >
                  <div class="p-10">
                    <div class="flex items-center justify-between mb-8">
                      <div
                        class="px-8 py-4 border border-orange-200 bg-linear-to-r from-orange-600 to-orange-800 rounded-2xl shadow-lg"
                      >
                        <h3 class="text-xl font-bold text-white">Panduan Pelaporan</h3>
                      </div>
                      <button
                        @click="showGuidelines = false"
                        class="p-3 text-gray-500 transition-all bg-gray-100 rounded-full hover:text-gray-700 hover:bg-gray-200 hover:scale-110"
                      >
                        <Icon name="lucide:x" size="24" />
                      </button>
                    </div>
                    <ul class="space-y-5 text-gray-700">
                      <li class="flex items-start gap-4">
                        <Icon name="lucide:circle-dot" size="20" class="text-orange-600 mt-0.5 shrink-0" />
                        <span class="leading-relaxed"
                          >Jelaskan masalah dengan detail dan spesifik untuk memudahkan tim maintenance</span
                        >
                      </li>
                      <li class="flex items-start gap-4">
                        <Icon name="lucide:circle-dot" size="20" class="text-orange-600 mt-0.5 shrink-0" />
                        <span class="leading-relaxed"
                          >Sertakan lokasi yang jelas (nama ruangan, lantai, gedung, dll)</span
                        >
                      </li>
                      <li class="flex items-start gap-4">
                        <Icon name="lucide:circle-dot" size="20" class="text-orange-600 mt-0.5 shrink-0" />
                        <span class="leading-relaxed">Upload foto untuk memperjelas kondisi kerusakan (opsional)</span>
                      </li>
                      <li class="flex items-start gap-4">
                        <Icon name="lucide:circle-dot" size="20" class="text-orange-600 mt-0.5 shrink-0" />
                        <span class="leading-relaxed"
                          >Pilih kategori yang sesuai dengan jenis masalah yang dilaporkan</span
                        >
                      </li>
                      <li class="flex items-start gap-4">
                        <Icon name="lucide:circle-dot" size="20" class="text-orange-600 mt-0.5 shrink-0" />
                        <span class="leading-relaxed">Informasi tanggal kejadian membantu prioritas penanganan</span>
                      </li>
                    </ul>
                    <div class="mt-10 text-center">
                      <button
                        @click="showGuidelines = false"
                        class="px-10 py-4 font-semibold text-white transition-all bg-linear-to-r from-orange-600 to-orange-800 rounded-xl shadow-lg hover:shadow-xl hover:scale-105"
                      >
                        Mengerti
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </Teleport>

          <div
            class="p-6 bg-white border border-orange-200 shadow-2xl rounded-3xl backdrop-blur-sm md:p-10 lg:p-12 animate-fade-in-up"
          >
            <form @submit.prevent="submitReport" class="space-y-8">
              <div>
                <label class="flex items-center mb-4 text-base font-bold text-gray-800">
                  <Icon name="lucide:folder" size="20" class="mr-3 text-orange-600" />
                  Kategori Masalah <span class="ml-1 text-red-500">*</span>
                </label>
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  <button
                    v-for="cat in categories"
                    :key="cat.value"
                    type="button"
                    @click="formData.category = cat.value"
                    :class="[
                      'flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all duration-200 hover:scale-105 transform',
                      formData.category === cat.value
                        ? 'border-orange-600 bg-orange-50 text-orange-700 shadow-lg'
                        : 'border-gray-200 hover:border-orange-300 text-gray-700 hover:shadow-md',
                    ]"
                  >
                    <Icon :name="cat.icon" size="28" />
                    <span class="text-sm font-medium text-center leading-tight">{{ cat.label }}</span>
                  </button>
                </div>
                <p v-if="errors.category" class="mt-3 text-sm text-red-600">{{ errors.category }}</p>
              </div>

              <div>
                <label for="title" class="flex items-center mb-4 text-base font-bold text-gray-800">
                  <Icon name="lucide:file-text" size="20" class="mr-3 text-orange-600" />
                  Judul Laporan <span class="ml-1 text-red-500">*</span>
                </label>
                <input
                  id="title"
                  v-model="formData.title"
                  type="text"
                  class="w-full px-5 py-4 transition-all border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 hover:border-orange-300"
                  placeholder="Contoh: Lampu ruang kelas XII RPL 1 tidak menyala"
                />
                <p v-if="errors.title" class="mt-3 text-sm text-red-600">{{ errors.title }}</p>
              </div>

              <div>
                <label for="location" class="flex items-center mb-4 text-base font-bold text-gray-800">
                  <Icon name="lucide:map-pin" size="20" class="mr-3 text-orange-600" />
                  Lokasi <span class="ml-1 text-red-500">*</span>
                </label>
                <input
                  id="location"
                  v-model="formData.location"
                  type="text"
                  class="w-full px-5 py-4 transition-all border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 hover:border-orange-300"
                  placeholder="Contoh: Lab Komputer Lantai 2, Kelas XII RPL 1, Toilet Pria Lantai 1"
                />
                <p v-if="errors.location" class="mt-3 text-sm text-red-600">{{ errors.location }}</p>
              </div>

              <div>
                <label for="description" class="flex items-center mb-4 text-base font-bold text-gray-800">
                  <Icon name="lucide:file-text" size="20" class="mr-3 text-orange-600" />
                  Deskripsi Masalah <span class="ml-1 text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  v-model="formData.description"
                  rows="6"
                  class="w-full px-5 py-4 transition-all border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 hover:border-orange-300 resize-vertical"
                  placeholder="Jelaskan masalah secara detail, misalnya: Lampu di ruang kelas tidak menyala, kabel terlihat putus..."
                ></textarea>
                <p v-if="errors.description" class="mt-3 text-sm text-red-600">{{ errors.description }}</p>
                <p class="mt-3 ml-1 text-sm text-gray-500">Semakin detail, semakin cepat kami dapat menindaklanjuti</p>
              </div>

              <div>
                <label class="flex items-center mb-4 text-base font-bold text-gray-800">
                  <Icon name="lucide:alert-triangle" size="20" class="mr-3 text-orange-600" />
                  Tingkat Urgensi
                </label>
                <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <button
                    v-for="level in urgencyLevels"
                    :key="level.value"
                    type="button"
                    @click="formData.urgency = level.value as 'low' | 'medium' | 'high' | 'critical'"
                    :class="[
                      'flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-200 hover:scale-105 transform',
                      formData.urgency === level.value
                        ? 'border-orange-600 bg-orange-50 text-orange-700 shadow-lg'
                        : 'border-gray-200 hover:border-orange-300 text-gray-700 hover:shadow-md',
                    ]"
                  >
                    <span :class="['px-3 py-2 text-sm font-medium rounded-full', level.color]">{{ level.label }}</span>
                  </button>
                </div>
              </div>

              <div class="grid gap-6 md:grid-cols-2">
                <div>
                  <label for="reporterName" class="flex items-center mb-4 text-base font-bold text-gray-800">
                    <Icon name="lucide:user" size="20" class="mr-3 text-orange-600" />
                    Nama Pelapor (Opsional)
                  </label>
                  <input
                    id="reporterName"
                    v-model="formData.reporterName"
                    type="text"
                    class="w-full px-5 py-4 transition-all border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 hover:border-orange-300"
                    placeholder="Nama lengkap Anda"
                  />
                  <p v-if="errors.reporterName" class="mt-3 text-sm text-red-600">{{ errors.reporterName }}</p>
                </div>

                <div>
                  <label for="reporterContact" class="flex items-center mb-4 text-base font-bold text-gray-800">
                    <Icon name="lucide:phone" size="20" class="mr-3 text-orange-600" />
                    Kontak (Opsional)
                  </label>
                  <input
                    id="reporterContact"
                    v-model="formData.reporterContact"
                    type="text"
                    class="w-full px-5 py-4 transition-all border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 hover:border-orange-300"
                    placeholder="Email atau nomor telepon"
                  />
                  <p v-if="errors.reporterContact" class="mt-3 text-sm text-red-600">{{ errors.reporterContact }}</p>
                </div>
              </div>

              <div>
                <label class="flex items-center mb-4 text-base font-bold text-gray-800">
                  <Icon name="lucide:paperclip" size="20" class="mr-3 text-orange-600" />
                  Lampiran (Opsional)
                </label>

                <div
                  v-if="!formData.attachments || formData.attachments.length === 0"
                  class="p-10 text-center transition-all border-2 border-gray-300 border-dashed rounded-2xl hover:border-orange-400 hover:bg-orange-50/50"
                >
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    multiple
                    @change="handleFileChange"
                    class="hidden"
                    id="fileUpload"
                  />
                  <label for="fileUpload" class="cursor-pointer">
                    <Icon name="lucide:upload-cloud" size="56" class="mx-auto mb-4 text-gray-400" />
                    <p class="mb-2 font-medium text-gray-600">Klik untuk upload file</p>
                    <p class="text-sm text-gray-500">JPG, PNG, GIF, PDF hingga 5MB (maks 5 file)</p>
                  </label>
                </div>

                <div v-else class="space-y-4">
                  <div
                    v-for="(file, index) in formData.attachments"
                    :key="index"
                    class="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-2xl hover:shadow-md transition-all"
                  >
                    <div class="flex items-center gap-4">
                      <Icon
                        :name="file.type.startsWith('image/') ? 'lucide:image' : 'lucide:file-text'"
                        size="28"
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
                      class="p-2 text-red-500 transition-all bg-red-50 rounded-full hover:bg-red-100 hover:scale-110"
                    >
                      <Icon name="lucide:x" size="18" />
                    </button>
                  </div>

                  <div v-if="formData.attachments && formData.attachments.length < 5" class="text-center">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      multiple
                      @change="handleFileChange"
                      class="hidden"
                      id="additionalFileUpload"
                    />
                    <label
                      for="additionalFileUpload"
                      class="inline-flex items-center gap-3 px-6 py-3 text-sm font-medium text-orange-600 transition-all bg-orange-50 rounded-xl cursor-pointer hover:bg-orange-100 hover:scale-105"
                    >
                      <Icon name="lucide:plus" size="18" />
                      Tambah file
                    </label>
                  </div>
                </div>
                <p v-if="errors.attachments" class="mt-3 text-sm text-red-600">{{ errors.attachments }}</p>
              </div>

              <button
                type="submit"
                :disabled="isSubmitting"
                class="flex items-center justify-center w-full gap-3 px-6 py-5 font-bold text-white transition-all duration-300 bg-linear-to-r from-orange-600 to-orange-800 shadow-xl hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed rounded-2xl hover:scale-105 transform"
              >
                <Icon v-if="isSubmitting" name="lucide:loader-2" class="animate-spin" size="22" />
                <Icon v-else name="lucide:send" size="22" />
                <span class="text-lg">{{ isSubmitting ? "Mengirim..." : "Kirim Laporan" }}</span>
              </button>
            </form>

            <div class="mt-8 text-center">
              <div class="p-6 bg-linear-to-r from-orange-600 to-orange-800 rounded-3xl shadow-lg">
                <p class="flex items-center justify-center gap-3 text-base text-white font-medium">
                  <Icon name="lucide:clock" size="20" />
                  Tim maintenance akan merespon dalam 1-2 hari kerja
                </p>
              </div>
            </div>
          </div>

          <div class="grid gap-6 mt-12 sm:gap-8 md:grid-cols-2">
            <div
              class="p-8 bg-white border border-blue-200 shadow-2xl rounded-3xl hover:shadow-3xl transition-all duration-300 hover:scale-105 transform animate-scale-in stagger-3"
            >
              <Icon name="lucide:headphones" size="36" class="mb-4 text-blue-600 animate-float" />
              <p class="mb-3 font-bold text-gray-800 text-lg">Butuh bantuan darurat?</p>
              <p class="text-gray-600 leading-relaxed">
                Hubungi bagian tata usaha: <span class="font-semibold text-blue-600">(0341) 123456</span>
              </p>
            </div>

            <div
              class="p-8 bg-white border border-green-200 shadow-2xl rounded-3xl hover:shadow-3xl transition-all duration-300 hover:scale-105 transform animate-scale-in stagger-4"
            >
              <Icon name="lucide:check-circle" size="36" class="mb-4 text-green-600 animate-float" />
              <p class="mb-3 font-bold text-gray-800 text-lg">Cek Status Laporan</p>
              <p class="text-gray-600 leading-relaxed">
                Segera hadir: <span class="font-semibold text-green-600">Fitur tracking laporan Anda</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>
