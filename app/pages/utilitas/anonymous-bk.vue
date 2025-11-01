<script setup lang="ts">
import { type AnonymousBKForm, validateAnonymousBK } from "~/utils/schema";
import { motion } from "motion-v";

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
  { value: "bullying", label: "Bullying", icon: "lucide:shield-alert", color: "text-red-600" },
  { value: "stress", label: "Stres", icon: "lucide:brain", color: "text-yellow-600" },
  { value: "friendship", label: "Persahabatan", icon: "lucide:heart", color: "text-pink-600" },
  { value: "academic", label: "Tekanan Akademik", icon: "lucide:book-open", color: "text-green-600" },
  { value: "family", label: "Masalah Keluarga", icon: "lucide:home", color: "text-purple-600" },
  { value: "mental-health", label: "Kesehatan Mental", icon: "lucide:heart-pulse", color: "text-pink-500" },
  { value: "career", label: "Kebingungan Karir", icon: "lucide:briefcase", color: "text-blue-700" },
  { value: "peer-pressure", label: "Tekanan Teman Sebaya", icon: "lucide:users", color: "text-orange-600" },
  { value: "advice", label: "Nasihat", icon: "lucide:lightbulb", color: "text-blue-600" },
  { value: "relationship", label: "Masalah Percintaan", icon: "lucide:heart-handshake", color: "text-rose-600" },
  { value: "self-esteem", label: "Kurang Percaya Diri", icon: "lucide:user-check", color: "text-indigo-600" },
  { value: "addiction", label: "Kecanduan", icon: "lucide:zap-off", color: "text-red-500" },
  { value: "grief", label: "Berkabung", icon: "lucide:cloud-rain", color: "text-slate-600" },
  { value: "identity", label: "Identitas Diri", icon: "lucide:user-search", color: "text-violet-600" },
  { value: "social-anxiety", label: "Kecemasan Sosial", icon: "lucide:users-2", color: "text-amber-600" },
  { value: "eating-disorder", label: "Gangguan Makan", icon: "lucide:utensils-crossed", color: "text-emerald-600" },
  { value: "sleep-issues", label: "Masalah Tidur", icon: "lucide:moon", color: "text-cyan-600" },
  { value: "other", label: "Lainnya", icon: "lucide:ellipsis", color: "text-gray-600" },
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
  <motion.div
    class="min-h-screen py-24 bg-linear-to-br from-teal-50 via-blue-50 to-indigo-50"
    :initial="{ opacity: 0 }"
    :animate="{ opacity: 1 }"
    :transition="{ duration: 0.8 }"
    :whileInView="{ opacity: 1 }"
    :inViewOptions="{ once: true, margin: '-100px' }"
  >
    <div class="container px-4 mx-auto sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <motion.div
          class="mb-12 text-center"
          :initial="{ y: 50, opacity: 0 }"
          :animate="{ y: 0, opacity: 1 }"
          :transition="{ duration: 0.6, delay: 0.2 }"
          :whileInView="{ y: 0, opacity: 1 }"
          :inViewOptions="{ once: true, margin: '-50px' }"
        >
          <motion.div
            class="inline-flex items-center gap-3 mb-6"
            :initial="{ scale: 0 }"
            :animate="{ scale: 1 }"
            :transition="{ duration: 0.5, delay: 0.4, type: 'spring', stiffness: 200 }"
          >
            <motion.div
              class="p-3 bg-teal-100 rounded-full shadow-lg"
              :whileHover="{ scale: 1.1, rotate: 5 }"
              :transition="{ type: 'spring', stiffness: 300 }"
              :whileTap="{ scale: 0.9 }"
            >
              <Icon name="lucide:shield-check" size="32" class="text-teal-600" />
            </motion.div>
            <motion.div
              class="p-3 bg-teal-100 rounded-full shadow-lg"
              :whileHover="{ scale: 1.1, rotate: -5 }"
              :transition="{ type: 'spring', stiffness: 300 }"
              :whileTap="{ scale: 0.9 }"
            >
              <Icon name="lucide:heart" size="32" class="text-teal-600" />
            </motion.div>
          </motion.div>
          <motion.h1
            class="text-4xl font-bold text-gray-900 md:text-5xl mb-4"
            :initial="{ y: 30, opacity: 0 }"
            :animate="{ y: 0, opacity: 1 }"
            :transition="{ duration: 0.6, delay: 0.6 }"
          >
            BK Anonim
          </motion.h1>
          <motion.p
            class="max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed"
            :initial="{ y: 30, opacity: 0 }"
            :animate="{ y: 0, opacity: 1 }"
            :transition="{ duration: 0.6, delay: 0.8 }"
          >
            Bagikan cerita Anda secara anonim. Suara Anda penting dan membantu kami menciptakan lingkungan yang lebih
            baik.
          </motion.p>
        </motion.div>
        <motion.div
          class="mb-8"
          :initial="{ opacity: 0, y: 30 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, delay: 1.0 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :inViewOptions="{ once: true, margin: '-50px' }"
        >
          <div class="flex flex-wrap justify-center gap-4">
            <motion.div
              class="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-teal-200 hover:shadow-md transition-all"
              :whileHover="{ scale: 1.05, y: -2 }"
              :transition="{ type: 'spring', stiffness: 300 }"
              :whileTap="{ scale: 0.95 }"
            >
              <motion.div :whileHover="{ rotate: 10 }" :transition="{ type: 'spring', stiffness: 400 }">
                <Icon name="lucide:lock" size="16" class="text-teal-600" />
              </motion.div>
              <span class="text-sm font-medium text-gray-700">100% Anonim</span>
            </motion.div>
            <motion.div
              class="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-teal-200 hover:shadow-md transition-all"
              :whileHover="{ scale: 1.05, y: -2 }"
              :transition="{ type: 'spring', stiffness: 300 }"
              :whileTap="{ scale: 0.95 }"
            >
              <motion.div :whileHover="{ rotate: -10 }" :transition="{ type: 'spring', stiffness: 400 }">
                <Icon name="lucide:eye-off" size="16" class="text-teal-600" />
              </motion.div>
              <span class="text-sm font-medium text-gray-700">Rahasia Terjaga</span>
            </motion.div>
            <motion.div
              class="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-teal-200 hover:shadow-md transition-all"
              :whileHover="{ scale: 1.05, y: -2 }"
              :transition="{ type: 'spring', stiffness: 300 }"
              :whileTap="{ scale: 0.95 }"
            >
              <motion.div :whileHover="{ rotate: 5 }" :transition="{ type: 'spring', stiffness: 400 }">
                <Icon name="lucide:users" size="16" class="text-teal-600" />
              </motion.div>
              <span class="text-sm font-medium text-gray-700">Tim Profesional</span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          class="mb-8"
          :initial="{ opacity: 0, y: 30 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, delay: 1.2 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :inViewOptions="{ once: true, margin: '-50px' }"
        >
          <div class="flex justify-center">
            <div class="flex items-center space-x-4">
              <div v-for="step in totalSteps" :key="step" class="flex items-center">
                <motion.div
                  :class="[
                    'flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300',
                    currentStep >= step
                      ? 'bg-teal-600 border-teal-600 text-white shadow-lg'
                      : 'bg-white border-gray-300 text-gray-400',
                  ]"
                  :aria-label="`Langkah ${step} dari ${totalSteps}`"
                  :initial="{ scale: 0 }"
                  :animate="{ scale: 1 }"
                  :transition="{ duration: 0.3, delay: 1.4 + step * 0.1, type: 'spring', stiffness: 200 }"
                  :whileHover="{ scale: 1.1 }"
                  :whileTap="{ scale: 0.9 }"
                >
                  <span class="text-sm font-semibold">{{ step }}</span>
                </motion.div>
                <motion.div
                  v-if="step < totalSteps"
                  :class="[
                    'w-12 h-0.5 mx-2 transition-all duration-300',
                    currentStep > step ? 'bg-teal-600' : 'bg-gray-300',
                  ]"
                  :initial="{ scaleX: 0 }"
                  :animate="{ scaleX: 1 }"
                  :transition="{ duration: 0.5, delay: 1.6 + step * 0.1 }"
                  :whileHover="{ scaleY: 1.2 }"
                ></motion.div>
              </div>
            </div>
          </div>
          <motion.div
            class="text-center mt-4"
            :initial="{ opacity: 0 }"
            :animate="{ opacity: 1 }"
            :transition="{ duration: 0.4, delay: 2.0 }"
          >
            <p class="text-sm text-gray-600">Langkah {{ currentStep }} dari {{ totalSteps }}</p>
          </motion.div>
        </motion.div>

        <motion.div
          class="mb-8 text-center"
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.5, delay: 1.8 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :inViewOptions="{ once: true, margin: '-50px' }"
        >
          <motion.button
            @click="showGuidelines = true"
            class="flex items-center gap-2 px-6 py-3 mx-auto font-semibold transition-all bg-white border-2 border-teal-200 shadow-md hover:border-teal-600 hover:text-teal-600 rounded-xl hover:shadow-lg"
            aria-label="Buka panduan penggunaan"
            :whileHover="{ scale: 1.05, y: -2 }"
            :whileTap="{ scale: 0.95 }"
            :transition="{ type: 'spring', stiffness: 300 }"
          >
            <motion.div :whileHover="{ rotate: 10 }" :transition="{ type: 'spring', stiffness: 400 }">
              <Icon name="lucide:book-open" size="20" />
            </motion.div>
            <span>Panduan Penggunaan</span>
          </motion.button>
        </motion.div>

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
              <motion.div
                class="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto shadow-2xl border-2 border-teal-200"
                @click.stop
                :initial="{ scale: 0.8, opacity: 0 }"
                :animate="{ scale: 1, opacity: 1 }"
                :transition="{ duration: 0.3, type: 'spring', stiffness: 300 }"
              >
                <div class="p-8">
                  <div class="flex items-center justify-between mb-6">
                    <motion.div
                      class="px-6 py-3 border border-teal-200 bg-linear-to-r from-teal-500 to-teal-600 rounded-xl"
                      :initial="{ x: -20, opacity: 0 }"
                      :animate="{ x: 0, opacity: 1 }"
                      :transition="{ duration: 0.4, delay: 0.2 }"
                    >
                      <h3 id="guidelines-title" class="text-lg font-bold text-white">Panduan Penggunaan</h3>
                    </motion.div>
                    <motion.button
                      @click="showGuidelines = false"
                      class="p-2 text-gray-500 transition-colors bg-gray-100 rounded-full hover:text-gray-700 hover:bg-gray-200"
                      aria-label="Tutup panduan"
                      :whileHover="{ scale: 1.1, rotate: 90 }"
                      :whileTap="{ scale: 0.9 }"
                      :transition="{ type: 'spring', stiffness: 300 }"
                    >
                      <Icon name="lucide:x" size="24" />
                    </motion.button>
                  </div>
                  <ul class="space-y-4 text-gray-700" role="list">
                    <motion.li
                      class="flex items-start gap-3"
                      role="listitem"
                      :initial="{ opacity: 0, x: -20 }"
                      :animate="{ opacity: 1, x: 0 }"
                      :transition="{ duration: 0.4, delay: 0.4 }"
                    >
                      <Icon name="lucide:check-circle" size="20" class="text-teal-600 mt-0.5 shrink-0" />
                      <span>Jaga kerahasiaan identitas Anda - jangan sebutkan nama atau detail pribadi</span>
                    </motion.li>
                    <motion.li
                      class="flex items-start gap-3"
                      role="listitem"
                      :initial="{ opacity: 0, x: -20 }"
                      :animate="{ opacity: 1, x: 0 }"
                      :transition="{ duration: 0.4, delay: 0.6 }"
                    >
                      <Icon name="lucide:check-circle" size="20" class="text-teal-600 mt-0.5 shrink-0" />
                      <span>Tuliskan cerita dengan jelas dan lengkap</span>
                    </motion.li>
                    <motion.li
                      class="flex items-start gap-3"
                      role="listitem"
                      :initial="{ opacity: 0, x: -20 }"
                      :animate="{ opacity: 1, x: 0 }"
                      :transition="{ duration: 0.4, delay: 0.8 }"
                    >
                      <Icon name="lucide:check-circle" size="20" class="text-teal-600 mt-0.5 shrink-0" />
                      <span>Gunakan tag untuk membantu mengkategorikan cerita Anda</span>
                    </motion.li>
                    <motion.li
                      class="flex items-start gap-3"
                      role="listitem"
                      :initial="{ opacity: 0, x: -20 }"
                      :animate="{ opacity: 1, x: 0 }"
                      :transition="{ duration: 0.4, delay: 1.0 }"
                    >
                      <Icon name="lucide:check-circle" size="20" class="text-teal-600 mt-0.5 shrink-0" />
                      <span>Pengiriman sepenuhnya anonim dan rahasia</span>
                    </motion.li>
                  </ul>
                  <motion.div
                    class="mt-8 text-center"
                    :initial="{ opacity: 0, y: 20 }"
                    :animate="{ opacity: 1, y: 0 }"
                    :transition="{ duration: 0.4, delay: 1.2 }"
                  >
                    <motion.button
                      @click="showGuidelines = false"
                      class="px-8 py-3 font-semibold text-white transition-colors bg-linear-to-r from-teal-500 to-teal-600 rounded-lg shadow-md hover:shadow-lg"
                      aria-label="Tutup panduan dan kembali ke form"
                      :whileHover="{ scale: 1.05 }"
                      :whileTap="{ scale: 0.95 }"
                      :transition="{ type: 'spring', stiffness: 300 }"
                    >
                      Mengerti
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </Transition>
        </Teleport>

        <motion.div
          class="bg-white border-2 border-teal-200 shadow-xl rounded-2xl overflow-hidden"
          :initial="{ opacity: 0, y: 50, scale: 0.95 }"
          :animate="{ opacity: 1, y: 0, scale: 1 }"
          :transition="{ duration: 0.8, delay: 2.0, type: 'spring', stiffness: 100 }"
          :whileHover="{ y: -5, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }"
          :whileInView="{ opacity: 1, y: 0, scale: 1 }"
          :inViewOptions="{ once: true, margin: '-100px' }"
        >
          <motion.div
            v-if="currentStep === 1"
            class="p-8 md:p-10"
            :initial="{ opacity: 0, x: -50 }"
            :animate="{ opacity: 1, x: 0 }"
            :transition="{ duration: 0.6, delay: 0.2 }"
            :whileInView="{ opacity: 1, x: 0 }"
            :inViewOptions="{ once: true, margin: '-50px' }"
          >
            <div class="text-center mb-8">
              <motion.div
                class="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4"
                :initial="{ scale: 0 }"
                :animate="{ scale: 1 }"
                :transition="{ duration: 0.5, delay: 0.4, type: 'spring', stiffness: 200 }"
                :whileHover="{ scale: 1.1, rotate: 5 }"
              >
                <Icon name="lucide:message-square" size="32" class="text-teal-600" />
              </motion.div>
              <motion.h2
                class="text-2xl font-bold text-gray-900 mb-2"
                :initial="{ y: 20, opacity: 0 }"
                :animate="{ y: 0, opacity: 1 }"
                :transition="{ duration: 0.5, delay: 0.6 }"
              >
                Cerita Anda
              </motion.h2>
              <motion.p
                class="text-gray-600"
                :initial="{ y: 20, opacity: 0 }"
                :animate="{ y: 0, opacity: 1 }"
                :transition="{ duration: 0.5, delay: 0.8 }"
              >
                Bagikan pengalaman Anda dengan bebas dan anonim
              </motion.p>
            </div>
            <div class="space-y-6">
              <motion.div
                :initial="{ opacity: 0, y: 20 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.5, delay: 1.0 }"
              >
                <label for="story" class="block text-sm font-semibold text-gray-800 mb-3">
                  Tuliskan cerita Anda di sini
                </label>
                <textarea
                  id="story"
                  v-model="formData.story"
                  rows="8"
                  class="w-full px-4 py-3 transition border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-vertical"
                  placeholder="Ceritakan apa yang ada di pikiran Anda... Semua informasi akan dijaga kerahasiaannya."
                  aria-describedby="story-help"
                  required
                ></textarea>
                <p id="story-help" class="mt-2 text-sm text-gray-500">
                  Cerita Anda akan dibaca oleh tim konseling profesional kami.
                </p>
                <p v-if="errors.story" class="mt-1 text-sm text-red-600" role="alert">{{ errors.story }}</p>
              </motion.div>
              <motion.div
                class="flex justify-between pt-6"
                :initial="{ opacity: 0, y: 20 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.5, delay: 1.4 }"
              >
                <div></div>
                <motion.button
                  @click="validateAndProceed(1)"
                  :disabled="!validateStep(1)"
                  class="px-8 py-3 bg-linear-to-r from-teal-600 to-teal-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:cursor-pointer transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  :whileHover="{ scale: 1.05 }"
                  :whileTap="{ scale: 0.95 }"
                  :transition="{ type: 'spring', stiffness: 300 }"
                >
                  <span>Lanjut ke Kategori</span>
                  <Icon name="lucide:arrow-right" size="18" />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            v-if="currentStep === 2"
            class="p-8 md:p-10"
            :initial="{ opacity: 0, x: -50 }"
            :animate="{ opacity: 1, x: 0 }"
            :transition="{ duration: 0.6, delay: 0.2 }"
            :whileInView="{ opacity: 1, x: 0 }"
            :inViewOptions="{ once: true, margin: '-50px' }"
          >
            <div class="text-center mb-8">
              <motion.div
                class="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4"
                :initial="{ scale: 0 }"
                :animate="{ scale: 1 }"
                :transition="{ duration: 0.5, delay: 0.4, type: 'spring', stiffness: 200 }"
                :whileHover="{ scale: 1.1, rotate: -5 }"
              >
                <Icon name="lucide:list" size="32" class="text-teal-600" />
              </motion.div>
              <motion.h2
                class="text-2xl font-bold text-gray-900 mb-2"
                :initial="{ y: 20, opacity: 0 }"
                :animate="{ y: 0, opacity: 1 }"
                :transition="{ duration: 0.5, delay: 0.6 }"
              >
                Kategori Cerita
              </motion.h2>
              <motion.p
                class="text-gray-600"
                :initial="{ y: 20, opacity: 0 }"
                :animate="{ y: 0, opacity: 1 }"
                :transition="{ duration: 0.5, delay: 0.8 }"
              >
                Pilih kategori yang paling sesuai dengan cerita Anda
              </motion.p>
            </div>
            <div class="space-y-6">
              <motion.div
                :initial="{ opacity: 0, y: 20 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.5, delay: 1.0 }"
              >
                <label for="category" class="block text-sm font-semibold text-gray-800 mb-4"> Pilih kategori </label>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.label
                    v-for="cat in categories"
                    :key="cat.value"
                    class="relative"
                    :initial="{ opacity: 0, y: 20 }"
                    :animate="{ opacity: 1, y: 0 }"
                    :transition="{ duration: 0.4, delay: 1.2 + categories.indexOf(cat) * 0.1 }"
                    :whileHover="{ scale: 1.02 }"
                    :whileTap="{ scale: 0.98 }"
                  >
                    <input
                      type="radio"
                      :id="cat.value"
                      v-model="formData.category"
                      :value="cat.value"
                      class="sr-only peer"
                      required
                    />
                    <div
                      class="p-4 border-2 border-gray-200 rounded-xl cursor-pointer peer-checked:border-teal-500 peer-checked:bg-teal-50 transition-all hover:border-teal-300"
                    >
                      <div class="flex items-center gap-3">
                        <Icon :name="cat.icon" :class="cat.color" size="24" />
                        <span class="font-medium text-gray-800">{{ cat.label }}</span>
                      </div>
                    </div>
                  </motion.label>
                </div>
                <p v-if="errors.category" class="mt-2 text-sm text-red-600" role="alert">{{ errors.category }}</p>
              </motion.div>
              <motion.div
                class="flex justify-between pt-6"
                :initial="{ opacity: 0, y: 20 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.5, delay: 1.8 }"
              >
                <motion.button
                  @click="prevStep()"
                  class="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
                  :whileHover="{ scale: 1.05 }"
                  :whileTap="{ scale: 0.95 }"
                  :transition="{ type: 'spring', stiffness: 300 }"
                >
                  <Icon name="lucide:arrow-left" size="18" />
                  <span>Kembali</span>
                </motion.button>
                <motion.button
                  @click="validateAndProceed(2)"
                  class="px-8 py-3 bg-linear-to-r from-teal-600 to-teal-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:cursor-pointer transition-all duration-200 flex items-center gap-2"
                  :whileHover="{ scale: 1.05 }"
                  :whileTap="{ scale: 0.95 }"
                  :transition="{ type: 'spring', stiffness: 300 }"
                >
                  <span>Lanjut ke Kontak</span>
                  <Icon name="lucide:arrow-right" size="18" />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            v-if="currentStep === 3"
            class="p-8 md:p-10"
            :initial="{ opacity: 0, x: -50 }"
            :animate="{ opacity: 1, x: 0 }"
            :transition="{ duration: 0.6, delay: 0.2 }"
            :whileInView="{ opacity: 1, x: 0 }"
            :inViewOptions="{ once: true, margin: '-50px' }"
          >
            <div class="text-center mb-8">
              <motion.div
                class="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4"
                :initial="{ scale: 0 }"
                :animate="{ scale: 1 }"
                :transition="{ duration: 0.5, delay: 0.4, type: 'spring', stiffness: 200 }"
                :whileHover="{ scale: 1.1, rotate: 5 }"
              >
                <Icon name="lucide:phone" size="32" class="text-teal-600" />
              </motion.div>
              <motion.h2
                class="text-2xl font-bold text-gray-900 mb-2"
                :initial="{ y: 20, opacity: 0 }"
                :animate="{ y: 0, opacity: 1 }"
                :transition="{ duration: 0.5, delay: 0.6 }"
              >
                Informasi Kontak (Opsional)
              </motion.h2>
              <motion.p
                class="text-gray-600"
                :initial="{ y: 20, opacity: 0 }"
                :animate="{ y: 0, opacity: 1 }"
                :transition="{ duration: 0.5, delay: 0.8 }"
              >
                Jika Anda ingin tim kami menghubungi Anda untuk bantuan lebih lanjut
              </motion.p>
            </div>
            <div class="space-y-6">
              <motion.div
                :initial="{ opacity: 0, y: 20 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.5, delay: 1.0 }"
              >
                <label for="contactMethod" class="block text-sm font-semibold text-gray-800 mb-4">
                  Metode kontak
                </label>
                <div class="space-y-3">
                  <motion.label
                    class="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-teal-300 transition-all"
                    :whileHover="{ scale: 1.02 }"
                    :whileTap="{ scale: 0.98 }"
                  >
                    <input
                      type="radio"
                      v-model="formData.contactMethod"
                      value="none"
                      class="w-4 h-4 text-teal-600 focus:ring-teal-500"
                    />
                    <Icon name="lucide:eye-off" size="20" class="text-gray-400" />
                    <span class="font-medium text-gray-800">Tidak ada kontak - Tetap 100% anonim</span>
                  </motion.label>
                  <motion.label
                    class="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-teal-300 transition-all"
                    :whileHover="{ scale: 1.02 }"
                    :whileTap="{ scale: 0.98 }"
                  >
                    <input
                      type="radio"
                      v-model="formData.contactMethod"
                      value="email"
                      class="w-4 h-4 text-teal-600 focus:ring-teal-500"
                    />
                    <Icon name="lucide:mail" size="20" class="text-teal-600" />
                    <span class="font-medium text-gray-800">Email</span>
                  </motion.label>
                  <motion.label
                    class="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-teal-300 transition-all"
                    :whileHover="{ scale: 1.02 }"
                    :whileTap="{ scale: 0.98 }"
                  >
                    <input
                      type="radio"
                      v-model="formData.contactMethod"
                      value="phone"
                      class="w-4 h-4 text-teal-600 focus:ring-teal-500"
                    />
                    <Icon name="lucide:phone" size="20" class="text-teal-600" />
                    <span class="font-medium text-gray-800">Telepon</span>
                  </motion.label>
                </div>
              </motion.div>

              <motion.div
                v-if="formData.contactMethod !== 'none'"
                class="animate-fade-in"
                :initial="{ opacity: 0, y: 20 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.5, delay: 1.4 }"
              >
                <label for="contactInfo" class="block text-sm font-semibold text-gray-800 mb-3">
                  {{ formData.contactMethod === "email" ? "Alamat Email" : "Nomor Telepon" }}
                </label>
                <motion.input
                  id="contactInfo"
                  v-model="formData.contactInfo"
                  :type="formData.contactMethod === 'email' ? 'email' : 'tel'"
                  class="w-full px-4 py-3 transition border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  :placeholder="formData.contactMethod === 'email' ? 'contoh@email.com' : '+62 8xx-xxxx-xxxx'"
                  required
                  :while-focus="{ scale: 1.02 }"
                />
                <p v-if="errors.contactInfo" class="mt-1 text-sm text-red-600" role="alert">{{ errors.contactInfo }}</p>
              </motion.div>

              <motion.div
                class="flex justify-between pt-6"
                :initial="{ opacity: 0, y: 20 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.5, delay: 1.6 }"
              >
                <motion.button
                  @click="prevStep()"
                  class="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
                  :whileHover="{ scale: 1.05 }"
                  :whileTap="{ scale: 0.95 }"
                  :transition="{ type: 'spring', stiffness: 300 }"
                >
                  <Icon name="lucide:arrow-left" size="18" />
                  <span>Kembali</span>
                </motion.button>
                <motion.button
                  @click="validateStep(3) && nextStep()"
                  class="px-8 py-3 bg-linear-to-r from-teal-600 to-teal-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:cursor-pointer transition-all duration-200 flex items-center gap-2"
                  :disabled="!validateStep(3)"
                  :whileHover="{ scale: 1.05 }"
                  :whileTap="{ scale: 0.95 }"
                  :transition="{ type: 'spring', stiffness: 300 }"
                >
                  <span>Konfirmasi & Kirim</span>
                  <Icon name="lucide:arrow-right" size="18" />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            v-if="currentStep === 4"
            class="p-8 md:p-10"
            :initial="{ opacity: 0, x: -50 }"
            :animate="{ opacity: 1, x: 0 }"
            :transition="{ duration: 0.6, delay: 0.2 }"
            :whileInView="{ opacity: 1, x: 0 }"
            :inViewOptions="{ once: true, margin: '-50px' }"
          >
            <div class="text-center mb-8">
              <motion.div
                class="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4"
                :initial="{ scale: 0 }"
                :animate="{ scale: 1 }"
                :transition="{ duration: 0.5, delay: 0.4, type: 'spring', stiffness: 200 }"
                :whileHover="{ scale: 1.1, rotate: 5 }"
              >
                <Icon name="lucide:check-circle" size="32" class="text-teal-600" />
              </motion.div>
              <motion.h2
                class="text-2xl font-bold text-gray-900 mb-2"
                :initial="{ y: 20, opacity: 0 }"
                :animate="{ y: 0, opacity: 1 }"
                :transition="{ duration: 0.5, delay: 0.6 }"
              >
                Konfirmasi Pengiriman
              </motion.h2>
              <motion.p
                class="text-gray-600"
                :initial="{ y: 20, opacity: 0 }"
                :animate="{ y: 0, opacity: 1 }"
                :transition="{ duration: 0.5, delay: 0.8 }"
              >
                Periksa kembali informasi sebelum mengirim
              </motion.p>
            </div>

            <motion.div
              class="bg-gray-50 rounded-xl p-6 mb-8"
              :initial="{ opacity: 0, y: 20 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.5, delay: 1.0 }"
            >
              <h3 class="font-semibold text-gray-900 mb-4">Ringkasan Cerita Anda:</h3>
              <div class="space-y-3">
                <motion.div
                  class="flex items-start gap-3"
                  :initial="{ opacity: 0, x: -20 }"
                  :animate="{ opacity: 1, x: 0 }"
                  :transition="{ duration: 0.4, delay: 1.2 }"
                >
                  <Icon name="lucide:file-text" size="18" class="text-teal-600 mt-0.5" />
                  <div>
                    <p class="text-sm font-medium text-gray-700">Cerita:</p>
                    <p class="text-gray-600 mt-1">
                      {{ formData.story.length > 100 ? formData.story.substring(0, 100) + "..." : formData.story }}
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  class="flex items-center gap-3"
                  :initial="{ opacity: 0, x: -20 }"
                  :animate="{ opacity: 1, x: 0 }"
                  :transition="{ duration: 0.4, delay: 1.4 }"
                >
                  <Icon name="lucide:tag" size="18" class="text-teal-600" />
                  <div>
                    <p class="text-sm font-medium text-gray-700">Kategori:</p>
                    <p class="text-gray-600">{{ getCategoryLabel(formData.category) }}</p>
                  </div>
                </motion.div>
                <motion.div
                  class="flex items-center gap-3"
                  :initial="{ opacity: 0, x: -20 }"
                  :animate="{ opacity: 1, x: 0 }"
                  :transition="{ duration: 0.4, delay: 1.6 }"
                >
                  <Icon name="lucide:user" size="18" class="text-teal-600" />
                  <div>
                    <p class="text-sm font-medium text-gray-700">Kontak:</p>
                    <p class="text-gray-600">
                      {{
                        formData.contactMethod === "none"
                          ? "Tidak ada (100% anonim)"
                          : formData.contactMethod === "email"
                          ? "Email"
                          : "Telepon"
                      }}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              class="bg-teal-50 border border-teal-200 rounded-xl p-4 mb-8"
              :initial="{ opacity: 0, y: 20 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.5, delay: 1.8 }"
            >
              <div class="flex items-start gap-3">
                <Icon name="lucide:shield-check" size="20" class="text-teal-600 mt-0.5" />
                <div>
                  <p class="text-sm font-semibold text-teal-800">Komitmen Privasi</p>
                  <p class="text-sm text-teal-700 mt-1">
                    Cerita Anda akan dijaga kerahasiaannya sepenuhnya. Tim konseling profesional kami akan menangani
                    dengan hati-hati.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              class="flex justify-between pt-6"
              :initial="{ opacity: 0, y: 20 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.5, delay: 2.0 }"
            >
              <motion.button
                @click="prevStep()"
                class="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
                :whileHover="{ scale: 1.05 }"
                :whileTap="{ scale: 0.95 }"
                :transition="{ type: 'spring', stiffness: 300 }"
              >
                <Icon name="lucide:arrow-left" size="18" />
                <span>Edit</span>
              </motion.button>
              <motion.button
                @click="submitStory"
                :disabled="isSubmitting"
                class="px-8 py-3 bg-linear-to-r from-teal-600 to-teal-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:cursor-pointer transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                :whileHover="{ scale: 1.05 }"
                :whileTap="{ scale: 0.95 }"
                :transition="{ type: 'spring', stiffness: 300 }"
              >
                <Icon v-if="isSubmitting" name="lucide:loader-2" class="animate-spin" size="18" />
                <Icon v-else name="lucide:send" size="18" />
                <span>{{ isSubmitting ? "Mengirim..." : "Kirim Cerita" }}</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          class="p-6 mt-8 text-center bg-white border-2 border-teal-200 shadow-xl rounded-2xl"
          :initial="{ opacity: 0, y: 30, scale: 0.95 }"
          :animate="{ opacity: 1, y: 0, scale: 1 }"
          :transition="{ duration: 0.6, delay: 2.2, type: 'spring', stiffness: 100 }"
          :whileHover="{ y: -5, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }"
          :whileInView="{ opacity: 1, y: 0, scale: 1 }"
          :inViewOptions="{ once: true, margin: '-100px' }"
        >
          <motion.div
            class="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4"
            :initial="{ scale: 0 }"
            :animate="{ scale: 1 }"
            :transition="{ duration: 0.5, delay: 2.4, type: 'spring', stiffness: 200 }"
            :whileHover="{ scale: 1.1, rotate: 5 }"
          >
            <Icon name="lucide:headphones" size="32" class="text-teal-600" />
          </motion.div>
          <motion.h3
            class="text-lg font-semibold text-gray-900 mb-2"
            :initial="{ y: 20, opacity: 0 }"
            :animate="{ y: 0, opacity: 1 }"
            :transition="{ duration: 0.5, delay: 2.6 }"
          >
            Butuh bantuan segera?
          </motion.h3>
          <motion.p
            class="text-gray-600 mb-4"
            :initial="{ y: 20, opacity: 0 }"
            :animate="{ y: 0, opacity: 1 }"
            :transition="{ duration: 0.5, delay: 2.8 }"
          >
            Jika Anda mengalami krisis atau membutuhkan bantuan darurat
          </motion.p>
          <motion.div
            class="flex flex-col sm:flex-row gap-3 justify-center"
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.5, delay: 3.0 }"
          >
            <motion.a
              href="tel:+62215551234"
              class="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-teal-600 to-teal-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:cursor-pointer transition-all duration-200"
              :whileHover="{ scale: 1.05 }"
              :whileTap="{ scale: 0.95 }"
              :transition="{ type: 'spring', stiffness: 300 }"
            >
              <Icon name="lucide:phone" size="18" />
              <span>Hotline BK</span>
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          class="mt-8 text-center"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :transition="{ duration: 0.5, delay: 2.4 }"
          :whileInView="{ opacity: 1 }"
          :inViewOptions="{ once: true, margin: '-50px' }"
        >
          <motion.div
            class="inline-flex items-center gap-4 px-6 py-4 bg-white border border-teal-200 rounded-full shadow-sm"
            :initial="{ y: 20, opacity: 0 }"
            :animate="{ y: 0, opacity: 1 }"
            :transition="{ duration: 0.5, delay: 2.6 }"
            :whileHover="{ scale: 1.02 }"
          >
            <motion.div
              class="flex items-center gap-2"
              :whileHover="{ scale: 1.1 }"
              :transition="{ type: 'spring', stiffness: 300 }"
            >
              <Icon name="lucide:lock" size="16" class="text-teal-600" />
              <span class="text-sm font-medium text-gray-700">SSL Encrypted</span>
            </motion.div>
            <motion.div
              class="flex items-center gap-2"
              :whileHover="{ scale: 1.1 }"
              :transition="{ type: 'spring', stiffness: 300 }"
            >
              <Icon name="lucide:shield" size="16" class="text-teal-600" />
              <span class="text-sm font-medium text-gray-700">GDPR Compliant</span>
            </motion.div>
            <motion.div
              class="flex items-center gap-2"
              :whileHover="{ scale: 1.1 }"
              :transition="{ type: 'spring', stiffness: 300 }"
            >
              <Icon name="lucide:eye-off" size="16" class="text-teal-600" />
              <span class="text-sm font-medium text-gray-700">No Tracking</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </motion.div>
</template>
