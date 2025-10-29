<script setup lang="ts">
import { type AnonymousBKForm, validateAnonymousBK } from "~/utils/schema";

const formData = ref<AnonymousBKForm>({
  story: "",
  category: "",
  contactMethod: "none",
  contactInfo: "",
});
const errors = ref<Record<string, string>>({});
const isSubmitting = ref(false);
const showGuidelines = ref(false);
const currentStep = ref(1);
const totalSteps = 4;

const categories = [
  { value: "bullying", label: "Bullying", icon: "lucide:users-x", color: "text-red-600" },
  { value: "stress", label: "Stres", icon: "lucide:brain", color: "text-yellow-600" },
  { value: "friendship", label: "Persahabatan", icon: "lucide:heart", color: "text-pink-600" },
  {
    value: "academic",
    label: "Tekanan Akademik",
    icon: "lucide:book-open",
    color: "text-green-600",
  },
  { value: "family", label: "Masalah Keluarga", icon: "lucide:home", color: "text-purple-600" },
  {
    value: "mental-health",
    label: "Kesehatan Mental",
    icon: "lucide:heart-pulse",
    color: "text-pink-500",
  },
  { value: "career", label: "Kebingungan Karir", icon: "lucide:briefcase", color: "text-blue-700" },
  {
    value: "peer-pressure",
    label: "Tekanan Teman Sebaya",
    icon: "lucide:users",
    color: "text-orange-600",
  },
  { value: "advice", label: "Nasihat", icon: "lucide:lightbulb", color: "text-blue-600" },
  { value: "other", label: "Lainnya", icon: "lucide:more-horizontal", color: "text-gray-600" },
];

const getCategoryLabel = (value: string) => {
  const cat = categories.find((c) => c.value === value);
  return cat ? cat.label : "Lainnya";
};

const nextStep = () => {
  if (currentStep.value < totalSteps) {
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const validateStep = (step: number) => {
  if (step === 1) {
    return formData.value.story.trim() !== "";
  }
  if (step === 2) {
    return formData.value.category !== "";
  }
  if (step === 3) {
    return (
      formData.value.contactMethod === "none" ||
      (formData.value.contactInfo && formData.value.contactInfo.trim() !== "")
    );
  }
  return true;
};

const validateAndProceed = (step: number) => {
  if (validateStep(step)) {
    nextStep();
    if (step === 1) errors.value.story = "";
    if (step === 2) errors.value.category = "";
  } else {
    if (step === 1) errors.value.story = "Cerita tidak boleh kosong";
    if (step === 2) errors.value.category = "Pilih kategori terlebih dahulu";
  }
};

useHead({
  title: "Anonymous BK - Utilitas - SMKN 2 Singosari",
  meta: [
    {
      name: "description",
      content: "Sampaikan cerita atau keluhan Anda secara anonim kepada BK SMK Negeri 2 Singosari.",
    },
  ],
});

const validateForm = () => {
  const result = validateAnonymousBK(formData.value);
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

const handleValidationErrors = (issues: any[]) => {
  errors.value = {};
  issues.forEach((issue) => {
    const field = issue.path[0] as string;
    errors.value[field] = issue.message;
  });
};

const submitStory = async () => {
  if (!validateForm()) {
    return;
  }
  isSubmitting.value = true;
  try {
    const response = await $fetch("/api/anonymous-bk", {
      method: "POST",
      body: formData.value,
    });

    if (response.success) {
      alert("Cerita berhasil dikirim secara anonim!");
      formData.value = {
        story: "",
        category: "",
        contactMethod: "none",
        contactInfo: "",
      };
      errors.value = {};
    } else {
      throw new Error("Submission failed");
    }
  } catch (error: any) {
    if (error.statusCode === 400 && error.data) {
      handleValidationErrors(error.data);
    } else {
      alert("Terjadi kesalahan saat mengirim cerita. Silakan coba lagi.");
    }
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen py-24 bg-linear-to-br from-orange-50 via-blue-50 to-indigo-50">
    <div class="container px-4 mx-auto sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        
        <div class="mb-12 text-center">
          <div class="inline-flex items-center gap-3 mb-6">
            <div class="p-3 bg-orange-100 rounded-full">
              <Icon name="lucide:shield-check" size="32" class="text-orange-600" />
            </div>
            <div class="p-3 bg-blue-100 rounded-full">
              <Icon name="lucide:heart" size="32" class="text-blue-600" />
            </div>
          </div>
          <h1 class="text-4xl font-bold text-gray-900 md:text-5xl mb-4">BK Anonim</h1>
          <p class="max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed">
            Bagikan cerita Anda secara anonim. Suara Anda penting dan membantu kami menciptakan lingkungan yang lebih
            baik.
          </p>
        </div>

        
        <div class="mb-8">
          <div class="flex flex-wrap justify-center gap-4">
            <div class="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-orange-200">
              <Icon name="lucide:lock" size="16" class="text-orange-600" />
              <span class="text-sm font-medium text-gray-700">100% Anonim</span>
            </div>
            <div class="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-blue-200">
              <Icon name="lucide:eye-off" size="16" class="text-blue-600" />
              <span class="text-sm font-medium text-gray-700">Rahasia Terjaga</span>
            </div>
            <div class="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-indigo-200">
              <Icon name="lucide:users" size="16" class="text-indigo-600" />
              <span class="text-sm font-medium text-gray-700">Tim Profesional</span>
            </div>
          </div>
        </div>

        
        <div class="mb-8">
          <div class="flex justify-center">
            <div class="flex items-center space-x-4">
              <div v-for="step in totalSteps" :key="step" class="flex items-center">
                <div
                  :class="[
                    'flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300',
                    currentStep >= step
                      ? 'bg-orange-600 border-orange-600 text-white'
                      : 'bg-white border-gray-300 text-gray-400'
                  ]"
                  :aria-label="`Langkah ${step} dari ${totalSteps}`"
                >
                  <span class="text-sm font-semibold">{{ step }}</span>
                </div>
                <div
                  v-if="step < totalSteps"
                  :class="[
                    'w-12 h-0.5 mx-2 transition-all duration-300',
                    currentStep > step ? 'bg-orange-600' : 'bg-gray-300'
                  ]"
                ></div>
              </div>
            </div>
          </div>
          <div class="text-center mt-4">
            <p class="text-sm text-gray-600">
              Langkah {{ currentStep }} dari {{ totalSteps }}
            </p>
          </div>
        </div>

        
        <div class="mb-8 text-center">
          <button
            @click="showGuidelines = true"
            class="flex items-center gap-2 px-6 py-3 mx-auto font-semibold transition-all bg-white border-2 border-orange-200 shadow-md hover:border-orange-600 hover:text-orange-600 rounded-xl hover:shadow-lg"
            aria-label="Buka panduan penggunaan"
          >
            <Icon name="lucide:book-open" size="20" />
            <span>Panduan Penggunaan</span>
          </button>
        </div>

        
        <Teleport to="body">
          <Transition name="dialog">
            <div
              v-if="showGuidelines"
              class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              @click="showGuidelines = false"
              role="dialog"
              aria-modal="true"
              aria-labelledby="guidelines-title"
            >
              <div
                class="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto shadow-2xl border-2 border-orange-200"
                @click.stop
              >
                <div class="p-8">
                  <div class="flex items-center justify-between mb-6">
                    <div class="px-6 py-3 border border-orange-200 bg-linear-to-r from-blue-500 to-cyan-600 rounded-xl">
                      <h3 id="guidelines-title" class="text-lg font-bold text-white">Panduan Penggunaan</h3>
                    </div>
                    <button
                      @click="showGuidelines = false"
                      class="p-2 text-gray-500 transition-colors bg-gray-100 rounded-full hover:text-gray-700 hover:bg-gray-200"
                      aria-label="Tutup panduan"
                    >
                      <Icon name="lucide:x" size="24" />
                    </button>
                  </div>
                  <ul class="space-y-4 text-gray-700" role="list">
                    <li class="flex items-start gap-3" role="listitem">
                      <Icon name="lucide:check-circle" size="20" class="text-orange-600 mt-0.5 shrink-0" />
                      <span>Jaga kerahasiaan identitas Anda - jangan sebutkan nama atau detail pribadi</span>
                    </li>
                    <li class="flex items-start gap-3" role="listitem">
                      <Icon name="lucide:check-circle" size="20" class="text-blue-600 mt-0.5 shrink-0" />
                      <span>Tuliskan cerita dengan jelas dan lengkap</span>
                    </li>
                    <li class="flex items-start gap-3" role="listitem">
                      <Icon name="lucide:check-circle" size="20" class="text-orange-600 mt-0.5 shrink-0" />
                      <span>Gunakan tag untuk membantu mengkategorikan cerita Anda</span>
                    </li>
                    <li class="flex items-start gap-3" role="listitem">
                      <Icon name="lucide:check-circle" size="20" class="text-blue-600 mt-0.5 shrink-0" />
                      <span>Pengiriman sepenuhnya anonim dan rahasia</span>
                    </li>
                  </ul>
                  <div class="mt-8 text-center">
                    <button
                      @click="showGuidelines = false"
                      class="px-8 py-3 font-semibold text-white transition-colors bg-linear-to-r from-blue-500 to-cyan-600 rounded-lg shadow-md hover:shadow-lg"
                      aria-label="Tutup panduan dan kembali ke form"
                    >
                      Mengerti
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </Teleport>

        
        <div class="bg-white border-2 border-orange-200 shadow-xl rounded-2xl overflow-hidden">
          
          <div v-if="currentStep === 1" class="p-8 md:p-10">
            <div class="text-center mb-8">
              <div class="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <Icon name="lucide:message-square" size="32" class="text-orange-600" />
              </div>
              <h2 class="text-2xl font-bold text-gray-900 mb-2">Cerita Anda</h2>
              <p class="text-gray-600">Bagikan pengalaman Anda dengan bebas dan anonim</p>
            </div>
            <div class="space-y-6">
              <div>
                <label for="story" class="block text-sm font-semibold text-gray-800 mb-3">
                  Tuliskan cerita Anda di sini
                </label>
                <textarea
                  id="story"
                  v-model="formData.story"
                  rows="8"
                  class="w-full px-4 py-3 transition border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-vertical"
                  placeholder="Ceritakan apa yang ada di pikiran Anda... Semua informasi akan dijaga kerahasiaannya."
                  aria-describedby="story-help"
                  required
                ></textarea>
                <p id="story-help" class="mt-2 text-sm text-gray-500">
                  Cerita Anda akan dibaca oleh tim konseling profesional kami.
                </p>
                <p v-if="errors.story" class="mt-1 text-sm text-red-600" role="alert">{{ errors.story }}</p>
              </div>
              <div class="flex justify-between pt-6">
                <div></div>
                <button
                  @click="validateAndProceed(1)"
                  :disabled="!validateStep(1)"
                  class="px-8 py-3 bg-linear-to-r from-orange-600 to-orange-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:cursor-pointer transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Lanjut ke Kategori</span>
                  <Icon name="lucide:arrow-right" size="18" />
                </button>
              </div>
            </div>
          </div>

          
          <div v-if="currentStep === 2" class="p-8 md:p-10">
            <div class="text-center mb-8">
              <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Icon name="lucide:list" size="32" class="text-blue-600" />
              </div>
              <h2 class="text-2xl font-bold text-gray-900 mb-2">Kategori Cerita</h2>
              <p class="text-gray-600">Pilih kategori yang paling sesuai dengan cerita Anda</p>
            </div>
            <div class="space-y-6">
              <div>
                <label for="category" class="block text-sm font-semibold text-gray-800 mb-4">
                  Pilih kategori
                </label>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label
                    v-for="cat in categories"
                    :key="cat.value"
                    class="relative"
                  >
                    <input
                      type="radio"
                      :id="cat.value"
                      v-model="formData.category"
                      :value="cat.value"
                      class="sr-only peer"
                      required
                    />
                    <div class="p-4 border-2 border-gray-200 rounded-xl cursor-pointer peer-checked:border-blue-500 peer-checked:bg-blue-50 transition-all hover:border-blue-300">
                      <div class="flex items-center gap-3">
                        <Icon :name="cat.icon" :class="cat.color" size="24" />
                        <span class="font-medium text-gray-800">{{ cat.label }}</span>
                      </div>
                    </div>
                  </label>
                </div>
                <p v-if="errors.category" class="mt-2 text-sm text-red-600" role="alert">{{ errors.category }}</p>
              </div>
              <div class="flex justify-between pt-6">
                <button
                  @click="prevStep()"
                  class="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
                >
                  <Icon name="lucide:arrow-left" size="18" />
                  <span>Kembali</span>
                </button>
                <button
                  @click="validateAndProceed(2)"
                  class="px-8 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:cursor-pointer transition-all duration-200 flex items-center gap-2"
                >
                  <span>Lanjut ke Kontak</span>
                  <Icon name="lucide:arrow-right" size="18" />
                </button>
              </div>
            </div>
          </div>

          
          <div v-if="currentStep === 3" class="p-8 md:p-10">
            <div class="text-center mb-8">
              <div class="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
                <Icon name="lucide:phone" size="32" class="text-indigo-600" />
              </div>
              <h2 class="text-2xl font-bold text-gray-900 mb-2">Informasi Kontak (Opsional)</h2>
              <p class="text-gray-600">Jika Anda ingin tim kami menghubungi Anda untuk bantuan lebih lanjut</p>
            </div>
            <div class="space-y-6">
              <div>
                <label for="contactMethod" class="block text-sm font-semibold text-gray-800 mb-4">
                  Metode kontak
                </label>
                <div class="space-y-3">
                  <label class="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-indigo-300 transition-all">
                    <input
                      type="radio"
                      v-model="formData.contactMethod"
                      value="none"
                      class="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <Icon name="lucide:eye-off" size="20" class="text-gray-400" />
                    <span class="font-medium text-gray-800">Tidak ada kontak - Tetap 100% anonim</span>
                  </label>
                  <label class="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-indigo-300 transition-all">
                    <input
                      type="radio"
                      v-model="formData.contactMethod"
                      value="email"
                      class="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <Icon name="lucide:mail" size="20" class="text-indigo-600" />
                    <span class="font-medium text-gray-800">Email</span>
                  </label>
                  <label class="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-indigo-300 transition-all">
                    <input
                      type="radio"
                      v-model="formData.contactMethod"
                      value="phone"
                      class="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <Icon name="lucide:phone" size="20" class="text-indigo-600" />
                    <span class="font-medium text-gray-800">Telepon</span>
                  </label>
                </div>
              </div>

              <div v-if="formData.contactMethod !== 'none'" class="animate-fade-in">
                <label for="contactInfo" class="block text-sm font-semibold text-gray-800 mb-3">
                  {{ formData.contactMethod === 'email' ? 'Alamat Email' : 'Nomor Telepon' }}
                </label>
                <input
                  id="contactInfo"
                  v-model="formData.contactInfo"
                  :type="formData.contactMethod === 'email' ? 'email' : 'tel'"
                  class="w-full px-4 py-3 transition border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  :placeholder="formData.contactMethod === 'email' ? 'contoh@email.com' : '+62 8xx-xxxx-xxxx'"
                  required
                />
                <p v-if="errors.contactInfo" class="mt-1 text-sm text-red-600" role="alert">{{ errors.contactInfo }}</p>
              </div>

              <div class="flex justify-between pt-6">
                <button
                  @click="prevStep()"
                  class="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
                >
                  <Icon name="lucide:arrow-left" size="18" />
                  <span>Kembali</span>
                </button>
                <button
                  @click="validateStep(3) && nextStep()"
                  class="px-8 py-3 bg-linear-to-r from-indigo-600 to-indigo-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:cursor-pointer transition-all duration-200 flex items-center gap-2"
                  :disabled="!validateStep(3)"
                >
                  <span>Konfirmasi & Kirim</span>
                  <Icon name="lucide:arrow-right" size="18" />
                </button>
              </div>
            </div>
          </div>

          
          <div v-if="currentStep === 4" class="p-8 md:p-10">
            <div class="text-center mb-8">
              <div class="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <Icon name="lucide:check-circle" size="32" class="text-orange-600" />
              </div>
              <h2 class="text-2xl font-bold text-gray-900 mb-2">Konfirmasi Pengiriman</h2>
              <p class="text-gray-600">Periksa kembali informasi sebelum mengirim</p>
            </div>

            <div class="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 class="font-semibold text-gray-900 mb-4">Ringkasan Cerita Anda:</h3>
              <div class="space-y-3">
                <div class="flex items-start gap-3">
                  <Icon name="lucide:file-text" size="18" class="text-orange-600 mt-0.5" />
                  <div>
                    <p class="text-sm font-medium text-gray-700">Cerita:</p>
                    <p class="text-gray-600 mt-1">{{ formData.story.length > 100 ? formData.story.substring(0, 100) + '...' : formData.story }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <Icon name="lucide:tag" size="18" class="text-blue-600" />
                  <div>
                    <p class="text-sm font-medium text-gray-700">Kategori:</p>
                    <p class="text-gray-600">{{ getCategoryLabel(formData.category) }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <Icon name="lucide:user" size="18" class="text-indigo-600" />
                  <div>
                    <p class="text-sm font-medium text-gray-700">Kontak:</p>
                    <p class="text-gray-600">{{ formData.contactMethod === 'none' ? 'Tidak ada (100% anonim)' : formData.contactMethod === 'email' ? 'Email' : 'Telepon' }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-8">
              <div class="flex items-start gap-3">
                <Icon name="lucide:shield-check" size="20" class="text-orange-600 mt-0.5" />
                <div>
                  <p class="text-sm font-semibold text-orange-800">Komitmen Privasi</p>
                  <p class="text-sm text-orange-700 mt-1">Cerita Anda akan dijaga kerahasiaannya sepenuhnya. Tim konseling profesional kami akan menangani dengan hati-hati.</p>
                </div>
              </div>
            </div>

            <div class="flex justify-between pt-6">
              <button
                @click="prevStep()"
                class="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
              >
                <Icon name="lucide:arrow-left" size="18" />
                <span>Edit</span>
              </button>
              <button
                @click="submitStory"
                :disabled="isSubmitting"
                class="px-8 py-3 bg-linear-to-r from-orange-600 to-orange-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:cursor-pointer transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon v-if="isSubmitting" name="lucide:loader-2" class="animate-spin" size="18" />
                <Icon v-else name="lucide:send" size="18" />
                <span>{{ isSubmitting ? "Mengirim..." : "Kirim Cerita" }}</span>
              </button>
            </div>
          </div>
        </div>

        
        <div class="p-6 mt-8 text-center bg-white border-2 border-orange-200 shadow-xl rounded-2xl">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
            <Icon name="lucide:headphones" size="32" class="text-orange-600" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Butuh bantuan segera?</h3>
          <p class="text-gray-600 mb-4">Jika Anda mengalami krisis atau membutuhkan bantuan darurat</p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+62215551234"
              class="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-orange-600 to-orange-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:cursor-pointer transition-all duration-200"
            >
              <Icon name="lucide:phone" size="18" />
              <span>Hotline BK</span>
            </a>
            <button
              @click="showGuidelines = true"
              class="inline-flex items-center gap-2 px-6 py-3 border-2 border-orange-200 text-orange-700 font-semibold rounded-xl hover:bg-orange-50 hover:cursor-pointer transition-all duration-200"
            >
              <Icon name="lucide:book-open" size="18" />
              <span>Panduan</span>
            </button>
          </div>
        </div>

        
        <div class="mt-8 text-center">
          <div class="inline-flex items-center gap-4 px-6 py-4 bg-white border border-orange-200 rounded-full shadow-sm">
            <div class="flex items-center gap-2">
              <Icon name="lucide:lock" size="16" class="text-orange-600" />
              <span class="text-sm font-medium text-gray-700">SSL Encrypted</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon name="lucide:shield" size="16" class="text-blue-600" />
              <span class="text-sm font-medium text-gray-700">GDPR Compliant</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon name="lucide:eye-off" size="16" class="text-indigo-600" />
              <span class="text-sm font-medium text-gray-700">No Tracking</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
