<script setup lang="ts">
import { registerSchema, type RegisterForm } from '~/utils/schema'

const formData = ref<RegisterForm>({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})
const errors = ref<Record<string, string[]>>({})
const isSubmitting = ref(false)
const showGuidelines = ref(false)

useHead({
  title: "Register - SMKN 2 Singosari",
  meta: [
    {
      name: "description",
      content: "Daftar akun baru untuk sistem SMK Negeri 2 Singosari.",
    },
  ],
});

const submitRegister = async () => {
  // Validate form
  const result = registerSchema.safeParse(formData.value)

  if (!result.success) {
    errors.value = result.error.flatten().fieldErrors
    return
  }

  // Clear errors
  errors.value = {}
  isSubmitting.value = true

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    alert("Pendaftaran berhasil! Silakan login dengan akun Anda.")

    // Reset form
    formData.value = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  } catch (error) {
    alert("Terjadi kesalahan saat pendaftaran")
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="min-h-screen py-24 bg-gradient-to-b from-white via-orange-50 to-white">
    <div class="container px-4 mx-auto sm:px-6">
      <div class="max-w-md mx-auto">
        <!-- Header Section -->
        <div class="mb-12 text-center">
          <div
            class="inline-block px-10 py-6 mb-4 border border-orange-200 shadow-xl bg-gradient-to-r from-orange-600 to-orange-800 backdrop-blur-2xl rounded-2xl"
          >
            <h1 class="text-3xl font-bold text-white md:text-4xl">Daftar</h1>
          </div>
          <p class="max-w-xl mx-auto text-lg text-gray-600">
            Buat akun baru untuk mengakses sistem SMK Negeri 2 Singosari.
          </p>
        </div>

        <!-- Guidelines Button -->
        <div class="mb-8 text-center">
          <button
            @click="showGuidelines = true"
            class="flex items-center gap-2 px-6 py-3 mx-auto font-semibold transition-all bg-white border-2 border-orange-100 shadow-md hover:border-orange-600 hover:text-orange-600 rounded-xl hover:shadow-lg"
          >
            <Icon name="lucide:help-circle" size="20" />
            <span>Bantuan Pendaftaran</span>
          </button>
        </div>

        <!-- Guidelines Modal -->
        <Teleport to="body">
          <Transition name="dialog">
            <div
              v-if="showGuidelines"
              class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              @click="showGuidelines = false"
            >
              <div
                class="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto shadow-2xl border-2 border-orange-100"
                @click.stop
              >
                <div class="p-8">
                  <div class="flex items-center justify-between mb-6">
                    <div class="px-6 py-3 border border-orange-200 bg-gradient-to-r from-orange-600 to-orange-800 rounded-xl">
                      <h3 class="text-lg font-bold text-white">Bantuan Pendaftaran</h3>
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
                      <Icon name="lucide:check-circle" size="20" class="text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Gunakan username yang unik dan mudah diingat</span>
                    </li>
                    <li class="flex items-start gap-3">
                      <Icon name="lucide:check-circle" size="20" class="text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Email aktif untuk verifikasi dan komunikasi</span>
                    </li>
                    <li class="flex items-start gap-3">
                      <Icon name="lucide:check-circle" size="20" class="text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Password minimal 8 karakter dengan kombinasi huruf dan angka</span>
                    </li>
                    <li class="flex items-start gap-3">
                      <Icon name="lucide:check-circle" size="20" class="text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Pastikan data yang dimasukkan benar dan valid</span>
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
          <form @submit.prevent="submitRegister" class="space-y-6">
            <div>
              <label for="username" class="flex items-center mb-3 text-sm font-bold text-gray-800">
                <Icon name="lucide:user" size="18" class="mr-2 text-orange-600" />
                Username <span class="ml-1 text-red-500">*</span>
              </label>
              <input
                id="username"
                v-model="formData.username"
                type="text"
                :class="[
                  'w-full px-4 py-3 transition border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500',
                  errors.username ? 'border-red-500' : 'border-gray-200'
                ]"
                placeholder="Masukkan username Anda"
                required
              />
              <p v-if="errors.username" class="mt-1 text-sm text-red-600">
                {{ errors.username.join(', ') }}
              </p>
            </div>

            <div>
              <label for="email" class="flex items-center mb-3 text-sm font-bold text-gray-800">
                <Icon name="lucide:mail" size="18" class="mr-2 text-orange-600" />
                Email <span class="ml-1 text-red-500">*</span>
              </label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                :class="[
                  'w-full px-4 py-3 transition border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500',
                  errors.email ? 'border-red-500' : 'border-gray-200'
                ]"
                placeholder="Masukkan email Anda"
                required
              />
              <p v-if="errors.email" class="mt-1 text-sm text-red-600">
                {{ errors.email.join(', ') }}
              </p>
            </div>

            <div>
              <label for="password" class="flex items-center mb-3 text-sm font-bold text-gray-800">
                <Icon name="lucide:lock" size="18" class="mr-2 text-orange-600" />
                Password <span class="ml-1 text-red-500">*</span>
              </label>
              <input
                id="password"
                v-model="formData.password"
                type="password"
                :class="[
                  'w-full px-4 py-3 transition border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500',
                  errors.password ? 'border-red-500' : 'border-gray-200'
                ]"
                placeholder="Masukkan password Anda"
                required
              />
              <p class="mt-2 ml-1 text-xs text-gray-500">Minimal 8 karakter dengan kombinasi huruf dan angka</p>
              <p v-if="errors.password" class="mt-1 text-sm text-red-600">
                {{ errors.password.join(', ') }}
              </p>
            </div>

            <div>
              <label for="confirmPassword" class="flex items-center mb-3 text-sm font-bold text-gray-800">
                <Icon name="lucide:lock-check" size="18" class="mr-2 text-orange-600" />
                Konfirmasi Password <span class="ml-1 text-red-500">*</span>
              </label>
              <input
                id="confirmPassword"
                v-model="formData.confirmPassword"
                type="password"
                :class="[
                  'w-full px-4 py-3 transition border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500',
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                ]"
                placeholder="Konfirmasi password Anda"
                required
              />
              <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-600">
                {{ errors.confirmPassword.join(', ') }}
              </p>
            </div>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="flex items-center justify-center w-full gap-2 px-4 py-4 font-bold text-white transition duration-200 bg-orange-600 shadow-md hover:bg-orange-700 disabled:bg-orange-400 rounded-xl hover:shadow-lg"
            >
              <Icon v-if="isSubmitting" name="lucide:loader-2" class="animate-spin" size="20" />
              <Icon v-else name="lucide:user-plus" size="20" />
              <span>{{ isSubmitting ? "Mendaftarkan..." : "Daftar" }}</span>
            </button>
          </form>

          <div class="mt-6 text-center">
            <p class="text-sm text-gray-600">
              Sudah punya akun?
              <NuxtLink to="/login" class="font-semibold text-orange-600 hover:text-orange-700 hover:underline">
                Masuk di sini
              </NuxtLink>
            </p>
          </div>
        </div>

        <!-- Help Section -->
        <div class="p-6 mt-8 text-center bg-white border-2 border-blue-100 shadow-xl rounded-2xl">
          <Icon name="lucide:headphones" size="32" class="mx-auto mb-3 text-blue-600" />
          <p class="mb-2 font-semibold text-gray-700">Butuh bantuan?</p>
          <p class="text-gray-600">Hubungi tim IT sekolah.</p>
        </div>
      </div>
    </div>
  </div>
</template>