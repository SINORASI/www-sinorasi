<script setup lang="ts">
import { type ProfileForm, profileSchema } from "~/utils/schema";

const formData = ref<ProfileForm>({
  name: "John Doe",
  username: "johndoe",
  email: "john@example.com",
  phone: "+6281234567890",
  bio: "Siswa SMKN 2 Singosari yang antusias belajar teknologi.",
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
});

const errors = ref<Record<string, string[] | undefined>>({});
const isSubmitting = ref(false);
const activeTab = ref("profile");
const showGuidelines = ref(false);

const selectedFile = ref<File | null>(null);
const previewUrl = ref<string | null>(null);
const isUploading = ref(false);

useHead({
  title: "Edit Profil - SMKN 2 Singosari",
  meta: [
    {
      name: "description",
      content: "Edit profil pengguna SMK Negeri 2 Singosari.",
    },
  ],
});

const tabs = [
  { id: "profile", label: "Informasi Profil", icon: "lucide:user" },
  { id: "security", label: "Keamanan", icon: "lucide:shield" },
];

const submitProfile = async () => {
  const result = profileSchema.safeParse(formData.value);

  if (!result.success) {
    errors.value = result.error.flatten().fieldErrors;
    return;
  }

  errors.value = {};
  isSubmitting.value = true;

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    alert("Profil berhasil diperbarui!");

    formData.value.currentPassword = "";
    formData.value.newPassword = "";
    formData.value.confirmNewPassword = "";
  } catch (error) {
    alert("Terjadi kesalahan saat memperbarui profil");
  } finally {
    isSubmitting.value = false;
  }
};

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    selectedFile.value = file;

    const reader = new FileReader();
    reader.onload = (e) => {
      previewUrl.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const uploadPhoto = async () => {
  if (!selectedFile.value) return;

  isUploading.value = true;

  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    alert("Foto profil berhasil diperbarui!");

    selectedFile.value = null;
    previewUrl.value = null;
  } catch (error) {
    console.log("Upload error:", error);
    alert("Terjadi kesalahan saat mengupload foto");
  } finally {
    isUploading.value = false;
  }
};

const handleLogout = async () => {
  await navigateTo("/");
};
</script>

<template>
  <div class="min-h-screen py-24 bg-gradient-to-b from-white via-blue-50 to-white">
    <div class="container px-4 mx-auto sm:px-6">
      <div class="max-w-4xl mx-auto">
        
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-800 md:text-4xl">Edit Profil</h1>
          <p class="mt-2 text-gray-600">Kelola informasi dan pengaturan akun Anda</p>
        </div>

        
        <div class="mb-8">
          <div class="flex border-b border-gray-200">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'flex items-center gap-2 px-6 py-3 font-semibold transition-colors border-b-2',
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              ]"
            >
              <Icon :name="tab.icon" size="18" />
              {{ tab.label }}
            </button>
          </div>
        </div>

        
        <div v-if="activeTab === 'profile'" class="space-y-8">
          
          <div class="p-6 bg-white border-2 border-blue-100 shadow-xl rounded-2xl md:p-8">
            <h3 class="mb-6 text-xl font-bold text-gray-800">Foto Profil</h3>
            <div class="flex items-center gap-6">
              <img
                :src="previewUrl || '/images/profile-placeholder.png'"
                alt="Profile"
                class="object-cover w-24 h-24 border-4 border-blue-200 rounded-full shadow-lg md:w-32 md:h-32"
              />
              <div class="flex-1">
                <h4 class="mb-2 text-lg font-semibold text-gray-800">Foto Profil</h4>
                <p class="mb-4 text-gray-600">Upload foto profil baru. Format yang didukung: JPG, PNG, maksimal 5MB.</p>
                <div class="flex gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    @change="handleFileSelect"
                    class="hidden"
                    id="photo-upload"
                  />
                  <label
                    for="photo-upload"
                    class="px-4 py-2 text-sm font-semibold text-blue-600 transition-colors bg-blue-100 rounded-lg hover:bg-blue-200 cursor-pointer"
                  >
                    Upload Foto Baru
                  </label>
                  <button
                    v-if="selectedFile"
                    @click="uploadPhoto"
                    :disabled="isUploading"
                    class="px-4 py-2 text-sm font-semibold text-green-600 transition-colors bg-green-100 rounded-lg hover:bg-green-200 disabled:opacity-50"
                  >
                    <Icon v-if="isUploading" name="lucide:loader-2" class="animate-spin" size="16" />
                    <span v-else>{{ isUploading ? "Mengupload..." : "Simpan Foto" }}</span>
                  </button>
                  <button class="px-4 py-2 text-sm font-semibold text-red-600 transition-colors bg-red-100 rounded-lg hover:bg-red-200">
                    Hapus Foto
                  </button>
                </div>
              </div>
            </div>
          </div>

          
          <div class="p-6 bg-white border-2 border-blue-100 shadow-xl rounded-2xl md:p-8">
            <h3 class="mb-6 text-xl font-bold text-gray-800">Informasi Pribadi</h3>

            <form @submit.prevent="submitProfile" class="space-y-6">
              <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label for="name" class="flex items-center mb-3 text-sm font-bold text-gray-800">
                    <Icon name="lucide:user" size="18" class="mr-2 text-blue-600" />
                    Nama Lengkap <span class="ml-1 text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    v-model="formData.name"
                    type="text"
                    :class="[
                      'w-full px-4 py-3 transition border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                      errors.name ? 'border-red-500' : 'border-gray-200'
                    ]"
                    placeholder="Masukkan nama lengkap Anda"
                    required
                    @input="errors.name = undefined"
                  />
                  <p v-if="errors.name" class="mt-1 text-sm text-red-600">
                    {{ errors.name[0] }}
                  </p>
                </div>

                <div>
                  <label for="username" class="flex items-center mb-3 text-sm font-bold text-gray-800">
                    <Icon name="lucide:at-sign" size="18" class="mr-2 text-blue-600" />
                    Username <span class="ml-1 text-red-500">*</span>
                  </label>
                  <input
                    id="username"
                    v-model="formData.username"
                    type="text"
                    :class="[
                      'w-full px-4 py-3 transition border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                      errors.username ? 'border-red-500' : 'border-gray-200'
                    ]"
                    placeholder="Masukkan username Anda"
                    required
                    @input="errors.username = undefined"
                  />
                  <p v-if="errors.username" class="mt-1 text-sm text-red-600">
                    {{ errors.username[0] }}
                  </p>
                </div>

                <div>
                  <label for="email" class="flex items-center mb-3 text-sm font-bold text-gray-800">
                    <Icon name="lucide:mail" size="18" class="mr-2 text-blue-600" />
                    Email <span class="ml-1 text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    v-model="formData.email"
                    type="email"
                    :class="[
                      'w-full px-4 py-3 transition border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                      errors.email ? 'border-red-500' : 'border-gray-200'
                    ]"
                    placeholder="Masukkan email Anda"
                    required
                    @input="errors.email = undefined"
                  />
                  <p v-if="errors.email" class="mt-1 text-sm text-red-600">
                    {{ errors.email[0] }}
                  </p>
                </div>

                <div>
                  <label for="phone" class="flex items-center mb-3 text-sm font-bold text-gray-800">
                    <Icon name="lucide:phone" size="18" class="mr-2 text-blue-600" />
                    Nomor Telepon
                  </label>
                  <input
                    id="phone"
                    v-model="formData.phone"
                    type="tel"
                    class="w-full px-4 py-3 transition border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Masukkan nomor telepon Anda"
                    @input="errors.phone = undefined"
                  />
                </div>
              </div>

              <div>
                <label for="bio" class="flex items-center mb-3 text-sm font-bold text-gray-800">
                  <Icon name="lucide:file-text" size="18" class="mr-2 text-blue-600" />
                  Bio
                </label>
                <textarea
                  id="bio"
                  v-model="formData.bio"
                  rows="4"
                  class="w-full px-4 py-3 transition border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                  placeholder="Ceritakan sedikit tentang diri Anda..."
                  @input="errors.bio = undefined"
                ></textarea>
              </div>

              <div class="flex gap-4">
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="flex items-center gap-2 px-6 py-3 font-bold text-white transition duration-200 bg-blue-600 shadow-md hover:bg-blue-700 disabled:bg-blue-400 rounded-xl hover:shadow-lg"
                >
                  <Icon v-if="isSubmitting" name="lucide:loader-2" class="animate-spin" size="20" />
                  <Icon v-else name="lucide:save" size="20" />
                  <span>{{ isSubmitting ? "Menyimpan..." : "Simpan Perubahan" }}</span>
                </button>
                <button
                  @click="handleLogout"
                  class="px-6 py-3 font-semibold text-red-600 transition-colors bg-red-100 rounded-xl hover:bg-red-200"
                >
                  Keluar
                </button>
              </div>
            </form>
          </div>
        </div>

        
        <div v-if="activeTab === 'security'" class="space-y-8">
          
          <div class="p-6 bg-white border-2 border-orange-100 shadow-xl rounded-2xl md:p-8">
            <h3 class="mb-6 text-xl font-bold text-gray-800">Ubah Password</h3>

            <form @submit.prevent="submitProfile" class="space-y-6">
              <div>
                <label for="currentPassword" class="flex items-center mb-3 text-sm font-bold text-gray-800">
                  <Icon name="lucide:lock" size="18" class="mr-2 text-orange-600" />
                  Password Saat Ini
                </label>
                <input
                  id="currentPassword"
                  v-model="formData.currentPassword"
                  type="password"
                  :class="[
                    'w-full px-4 py-3 transition border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500',
                    errors.currentPassword ? 'border-red-500' : 'border-gray-200'
                  ]"
                  placeholder="Masukkan password saat ini"
                  @input="errors.currentPassword = undefined"
                />
                <p v-if="errors.currentPassword" class="mt-1 text-sm text-red-600">
                  {{ errors.currentPassword[0] }}
                </p>
              </div>

              <div>
                <label for="newPassword" class="flex items-center mb-3 text-sm font-bold text-gray-800">
                  <Icon name="lucide:lock" size="18" class="mr-2 text-orange-600" />
                  Password Baru
                </label>
                <input
                  id="newPassword"
                  v-model="formData.newPassword"
                  type="password"
                  :class="[
                    'w-full px-4 py-3 transition border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500',
                    errors.newPassword ? 'border-red-500' : 'border-gray-200'
                  ]"
                  placeholder="Masukkan password baru"
                  @input="errors.newPassword = undefined"
                />
                <p class="mt-2 ml-1 text-xs text-gray-500">Minimal 8 karakter dengan kombinasi huruf dan angka</p>
                <p v-if="errors.newPassword" class="mt-1 text-sm text-red-600">
                  {{ errors.newPassword[0] }}
                </p>
              </div>

              <div>
                <label for="confirmNewPassword" class="flex items-center mb-3 text-sm font-bold text-gray-800">
                  <Icon name="lucide:lock-check" size="18" class="mr-2 text-orange-600" />
                  Konfirmasi Password Baru
                </label>
                <input
                  id="confirmNewPassword"
                  v-model="formData.confirmNewPassword"
                  type="password"
                  :class="[
                    'w-full px-4 py-3 transition border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500',
                    errors.confirmNewPassword ? 'border-red-500' : 'border-gray-200'
                  ]"
                  placeholder="Konfirmasi password baru"
                  @input="errors.confirmNewPassword = undefined"
                />
                <p v-if="errors.confirmNewPassword" class="mt-1 text-sm text-red-600">
                  {{ errors.confirmNewPassword[0] }}
                </p>
              </div>

              <div class="flex gap-4">
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="flex items-center gap-2 px-6 py-3 font-bold text-white transition duration-200 bg-orange-600 shadow-md hover:bg-orange-700 disabled:bg-orange-400 rounded-xl hover:shadow-lg"
                >
                  <Icon v-if="isSubmitting" name="lucide:loader-2" class="animate-spin" size="20" />
                  <Icon v-else name="lucide:key" size="20" />
                  <span>{{ isSubmitting ? "Mengubah..." : "Ubah Password" }}</span>
                </button>
                <NuxtLink
                  to="/dashboard"
                  class="px-6 py-3 font-semibold text-gray-600 transition-colors bg-gray-100 rounded-xl hover:bg-gray-200"
                >
                  Batal
                </NuxtLink>
              </div>
            </form>
          </div>

          
          <div class="p-6 bg-white border-2 border-green-100 shadow-xl rounded-2xl md:p-8">
            <h3 class="mb-6 text-xl font-bold text-gray-800">Tips Keamanan</h3>
            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <Icon name="lucide:check-circle" size="20" class="text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p class="font-semibold text-gray-800">Gunakan Password yang Kuat</p>
                  <p class="text-sm text-gray-600">Kombinasikan huruf besar, kecil, angka, dan simbol</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <Icon name="lucide:check-circle" size="20" class="text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p class="font-semibold text-gray-800">Jangan Bagikan Password</p>
                  <p class="text-sm text-gray-600">Password Anda bersifat pribadi dan rahasia</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <Icon name="lucide:check-circle" size="20" class="text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p class="font-semibold text-gray-800">Logout Setelah Selesai</p>
                  <p class="text-sm text-gray-600">Selalu logout dari perangkat bersama</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <Teleport to="body">
          <Transition name="dialog">
            <div
              v-if="showGuidelines"
              class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              @click="showGuidelines = false"
            >
              <div
                class="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto shadow-2xl border-2 border-blue-100"
                @click.stop
              >
                <div class="p-8">
                  <div class="flex items-center justify-between mb-6">
                    <div class="px-6 py-3 border border-blue-200 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl">
                      <h3 class="text-lg font-bold text-white">Panduan Edit Profil</h3>
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
                      <Icon name="lucide:check-circle" size="20" class="text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Pastikan informasi yang Anda masukkan akurat dan terkini</span>
                    </li>
                    <li class="flex items-start gap-3">
                      <Icon name="lucide:check-circle" size="20" class="text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Upload foto profil dengan format JPG atau PNG, maksimal 5MB</span>
                    </li>
                    <li class="flex items-start gap-3">
                      <Icon name="lucide:check-circle" size="20" class="text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Gunakan password yang kuat untuk keamanan akun</span>
                    </li>
                    <li class="flex items-start gap-3">
                      <Icon name="lucide:check-circle" size="20" class="text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Simpan perubahan secara berkala untuk menghindari kehilangan data</span>
                    </li>
                  </ul>
                  <div class="mt-8 text-center">
                    <button
                      @click="showGuidelines = false"
                      class="px-8 py-3 font-semibold text-white transition-colors bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg"
                    >
                      Mengerti
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </Teleport>
      </div>
    </div>
  </div>
</template>