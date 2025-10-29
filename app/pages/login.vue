<script setup lang="ts">
import { type LoginForm, loginSchema } from "~/utils/schema";

type FormErrors<T> = Partial<Record<keyof T, string[]>>;

const formData = ref<LoginForm>({
  email: "",
  password: "",
});
const errors = ref<FormErrors<LoginForm>>({});
const isSubmitting = ref(false);
const showGuidelines = ref(false);

useHead({
  title: "Login - SMKN 2 Singosari",
  meta: [
    {
      name: "description",
      content: "Login ke sistem SMK Negeri 2 Singosari.",
    },
  ],
});

const submitLogin = async () => {
  const result = loginSchema.safeParse(formData.value);

  if (!result.success) {
    errors.value = result.error.flatten().fieldErrors;
    return;
  }

  errors.value = {};
  isSubmitting.value = true;

  try {
    alert("Sistem login sementara tidak tersedia. Fitur akan segera kembali.");

    formData.value = {
      email: "",
      password: "",
    };
  } catch (error) {
    alert("Terjadi kesalahan saat login");
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen py-24 bg-linear-to-b from-white via-blue-50 to-white">
    <div class="container px-4 mx-auto sm:px-6">
      <div class="max-w-md mx-auto">
        
        <div class="mb-12 text-center">
          <div
            class="inline-block px-10 py-6 mb-4 border border-blue-200 shadow-xl bg-linear-to-r from-blue-600 to-blue-800 backdrop-blur-2xl rounded-2xl"
          >
            <h1 class="text-3xl font-bold text-white md:text-4xl">Login</h1>
          </div>
          <p class="max-w-xl mx-auto text-lg text-gray-600">
            Masuk ke akun Anda untuk mengakses sistem SMK Negeri 2 Singosari.
          </p>
        </div>

        
        <div class="mb-8 text-center">
          <button
            @click="showGuidelines = true"
            class="flex items-center gap-2 px-6 py-3 mx-auto font-semibold transition-all bg-white border-2 border-blue-100 shadow-md hover:border-blue-600 hover:text-blue-600 rounded-xl hover:shadow-lg"
          >
            <Icon name="lucide:help-circle" size="20" />
            <span>Bantuan Login</span>
          </button>
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
                    <div class="px-6 py-3 border border-blue-200 bg-linear-to-r from-blue-600 to-blue-800 rounded-xl">
                      <h3 class="text-lg font-bold text-white">Bantuan Login</h3>
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
                      <Icon name="lucide:check-circle" size="20" class="text-blue-600 mt-0.5 shrink-0" />
                      <span>Gunakan username dan password yang telah diberikan</span>
                    </li>
                    <li class="flex items-start gap-3">
                      <Icon name="lucide:check-circle" size="20" class="text-orange-600 mt-0.5 shrink-0" />
                      <span>Pastikan koneksi internet stabil</span>
                    </li>
                    <li class="flex items-start gap-3">
                      <Icon name="lucide:check-circle" size="20" class="text-blue-600 mt-0.5 shrink-0" />
                      <span>Jika lupa password, hubungi admin sekolah</span>
                    </li>
                    <li class="flex items-start gap-3">
                      <Icon name="lucide:check-circle" size="20" class="text-orange-600 mt-0.5 shrink-0" />
                      <span>Login hanya untuk siswa dan guru terdaftar</span>
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

        
        <div class="p-8 bg-white border-2 border-blue-100 shadow-xl rounded-2xl md:p-10">
          <form @submit.prevent="submitLogin" class="space-y-6">
            <div>
              <label for="email" class="flex items-center mb-3 text-sm font-bold text-gray-800">
                <Icon name="lucide:mail" size="18" class="mr-2 text-blue-600" />
                Email
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
              />
              <p v-if="errors.email" class="mt-1 text-sm text-red-600">
                {{ errors.email.join(', ') }}
              </p>
            </div>

            <div>
              <label for="password" class="flex items-center mb-3 text-sm font-bold text-gray-800">
                <Icon name="lucide:lock" size="18" class="mr-2 text-blue-600" />
                Password
              </label>
              <input
                id="password"
                v-model="formData.password"
                type="password"
                :class="[
                  'w-full px-4 py-3 transition border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                  errors.password ? 'border-red-500' : 'border-gray-200'
                ]"
                placeholder="Masukkan password Anda"
                required
              />
              <p v-if="errors.password" class="mt-1 text-sm text-red-600">
                {{ errors.password.join(', ') }}
              </p>
            </div>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="flex items-center justify-center w-full gap-2 px-4 py-4 font-bold text-white transition duration-200 bg-blue-600 shadow-md hover:bg-blue-700 disabled:bg-blue-400 rounded-xl hover:shadow-lg"
            >
              <Icon v-if="isSubmitting" name="lucide:loader-2" class="animate-spin" size="20" />
              <Icon v-else name="lucide:log-in" size="20" />
              <span>{{ isSubmitting ? "Masuk..." : "Masuk" }}</span>
            </button>
          </form>

          <div class="mt-6 text-center">
            <p class="text-sm text-gray-600">
              Belum punya akun?
              <NuxtLink to="/register" class="font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                Daftar di sini
              </NuxtLink>
            </p>
          </div>
        </div>

        
        <div class="p-6 mt-8 text-center bg-white border-2 border-orange-100 shadow-xl rounded-2xl">
          <Icon name="lucide:headphones" size="32" class="mx-auto mb-3 text-orange-600" />
          <p class="mb-2 font-semibold text-gray-700">Butuh bantuan?</p>
          <p class="text-gray-600">Hubungi tim IT sekolah.</p>
        </div>
      </div>
    </div>
  </div>
</template>