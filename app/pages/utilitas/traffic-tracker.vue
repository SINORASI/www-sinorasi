<script setup lang="ts">
import { ref } from "vue";
import { type TrafficTrackerForm, trafficTrackerSchema } from "~/utils/schema";

interface TrafficResults {
  distance: {
    kilometers: number;
    meters: number;
    formatted: string;
  };
  estimatedTime: string;
  estimatedMinutes: number;
  traffic: string;
  bestTime: string;
  tips: string;
  recommendation: string;
  route: {
    summary: string;
    polyline?: string;
  };
  analytics: {
    proximity: {
      distanceToSchool: string;
      estimatedArrival: string;
      travelTime: string;
      nearbyAreas: string[];
    };
    timeAnalytics: {
      currentCongestion: string;
      peakHours: string[];
      recommendedDeparture: string;
      timeCategory: string;
      delayTime: string;
    };
    usefulInfo: {
      fuelEstimate: string;
      carbonFootprint: string;
      safetyRating: string;
      weatherImpact: string;
      averageSpeed: string;
    };
  };
}

const schoolAddress =
  "SMK Negeri 2 Singosari, Jl. Raya Singosari, Singosari, Malang, Jawa Timur, Indonesia";

const form = ref<TrafficTrackerForm>({
  origin: "",
  destination: schoolAddress,
  travelMode: "driving",
  avoidTolls: false,
  avoidHighways: false,
});

const results = ref<TrafficResults | null>(null);
const loading = ref(false);
const error = ref("");
const validationErrors = ref<Record<string, string>>({});

const getCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        form.value.origin = `${lat},${lng}`;
      },
      (_err) => {
        error.value = "Tidak dapat mendapatkan lokasi saat ini. Pastikan izin lokasi diaktifkan.";
      },
    );
  } else {
    error.value = "Geolokasi tidak didukung oleh browser ini.";
  }
};

const calculateRoute = async () => {
  const validation = trafficTrackerSchema.safeParse(form.value);
  if (!validation.success) {
    validationErrors.value = {};
    validation.error.issues.forEach((err) => {
      if (err.path[0]) {
        validationErrors.value[err.path[0] as string] = err.message;
      }
    });
    return;
  }

  validationErrors.value = {};

  loading.value = true;
  error.value = "";
  results.value = null;

  try {
    const response = await $fetch("/api/traffic-tracker", {
      method: "POST",
      body: form.value,
    });

    results.value = response;
  } catch (err: any) {
    error.value = err.message || "Terjadi kesalahan saat menghitung rute.";
  } finally {
    loading.value = false;
  }
};

useHead({
  title: "Traffic Tracker - Utilitas - SMKN 2 Singosari",
  meta: [
    {
      name: "description",
      content:
        "Cek estimasi waktu tempuh ke SMK Negeri 2 Singosari dari lokasi Anda dengan traffic tracker.",
    },
  ],
});
</script>

<template>
  <div class="min-h-screen py-24 bg-linear-to-b from-white via-blue-50 to-white">
    <div class="container px-4 mx-auto sm:px-6">
      
      <div class="mb-12 text-center">
        <div
          class="inline-block px-10 py-6 mb-4 border border-blue-200 shadow-xl bg-linear-to-r from-blue-600 to-blue-800 backdrop-blur-2xl rounded-2xl"
        >
          <h1 class="text-3xl font-bold text-white md:text-4xl">Traffic Tracker</h1>
        </div>
        <p class="max-w-3xl mx-auto text-lg text-gray-600">
          Masukkan alamat rumah Anda untuk mendapatkan estimasi waktu tempuh ke SMK Negeri 2 Singosari, termasuk jarak,
          kondisi lalu lintas, dan informasi lainnya.
        </p>
      </div>

      
      <div class="max-w-md mx-auto mb-12">
        <form @submit.prevent="calculateRoute" class="p-8 bg-white border-2 border-blue-100 shadow-xl rounded-2xl">
          <div class="mb-6">
            <label for="address" class="flex items-center mb-3 text-sm font-bold text-gray-800">
              <Icon name="lucide:map-pin" size="18" class="mr-2 text-blue-600" />
              Alamat Rumah
            </label>
            <input
              v-model="form.origin"
              type="text"
              id="address"
              placeholder="Masukkan alamat lengkap atau koordinat (lat,lng)"
              class="w-full px-4 py-3 transition border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <div v-if="validationErrors.origin" class="mt-2 text-sm text-red-600">
              {{ validationErrors.origin }}
            </div>
          </div>

          <div class="mb-6">
            <label for="travelMode" class="flex items-center mb-3 text-sm font-bold text-gray-800">
              <Icon name="lucide:navigation" size="18" class="mr-2 text-blue-600" />
              Moda Transportasi
            </label>
            <select
              v-model="form.travelMode"
              id="travelMode"
              class="w-full px-4 py-3 transition border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="driving">🚗 Berkendara</option>
              <option value="walking">🚶 Berjalan Kaki</option>
              <option value="cycling">🚲 Sepeda</option>
              <option value="transit">🚌 Transportasi Umum</option>
            </select>
          </div>

          <div class="mb-6">
            <button
              type="button"
              @click="getCurrentLocation"
              class="flex items-center justify-center w-full gap-2 px-4 py-3 font-semibold transition-all bg-white border-2 border-gray-200 shadow-sm hover:border-blue-600 hover:text-blue-600 rounded-xl hover:shadow-md"
            >
              <Icon name="lucide:locate-fixed" size="20" />
              Gunakan Lokasi Saat Ini
            </button>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="flex items-center justify-center w-full gap-2 px-4 py-4 font-bold text-white transition-all bg-blue-600 shadow-md hover:bg-blue-700 disabled:bg-blue-400 rounded-xl hover:shadow-lg"
          >
            <Icon v-if="loading" name="lucide:loader-2" class="animate-spin" size="20" />
            <Icon v-else name="lucide:navigation" size="20" />
            {{ loading ? "Menghitung..." : "Hitung Estimasi" }}
          </button>
        </form>
      </div>

      
      <div v-if="error" class="max-w-4xl mx-auto mb-12 p-4 border-l-4 border-red-600 bg-red-50 rounded-r-xl">
        <div class="flex items-start">
          <Icon name="lucide:alert-circle" size="20" class="text-red-600 mr-3 mt-0.5 shrink-0" />
          <p class="text-red-700">{{ error }}</p>
        </div>
      </div>


      
      <div v-if="results" class="max-w-6xl mx-auto">
        
        <div class="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
          <div
            class="p-8 text-center transition-shadow bg-white border-2 border-blue-100 shadow-xl rounded-2xl hover:shadow-2xl"
          >
            <div class="inline-block p-4 mb-4 bg-blue-100 rounded-full">
              <Icon name="lucide:clock" size="32" class="text-blue-600" />
            </div>
            <h3 class="mb-2 text-xl font-bold text-gray-800">Waktu Tempuh</h3>
            <p class="mb-2 text-3xl font-bold text-blue-600">{{ results.estimatedTime }}</p>
            <p class="text-sm text-gray-600">{{ results.estimatedMinutes }} menit</p>
            <p class="text-sm text-gray-600">Estimasi dengan kondisi lalu lintas saat ini</p>
          </div>

          <div
            class="p-8 text-center transition-shadow bg-white border-2 border-orange-100 shadow-xl rounded-2xl hover:shadow-2xl"
          >
            <div class="inline-block p-4 mb-4 bg-orange-100 rounded-full">
              <Icon name="lucide:map-pin" size="32" class="text-orange-600" />
            </div>
            <h3 class="mb-2 text-xl font-bold text-gray-800">Jarak</h3>
            <p class="mb-2 text-3xl font-bold text-orange-600">{{ results.distance.formatted }}</p>
            <p class="text-sm text-gray-600">{{ results.distance.meters }} meter</p>
          </div>

          <div
            class="p-8 text-center transition-shadow bg-white border-2 border-blue-100 shadow-xl rounded-2xl hover:shadow-2xl"
          >
            <div class="inline-block p-4 mb-4 bg-blue-100 rounded-full">
              <Icon name="lucide:traffic-cone" size="32" class="text-blue-600" />
            </div>
            <h3 class="mb-2 text-xl font-bold text-gray-800">Kondisi Lalu Lintas</h3>
            <p
              :class="
                results.traffic === 'Lancar'
                  ? 'text-green-600'
                  : results.traffic === 'Padat'
                  ? 'text-yellow-600'
                  : 'text-red-600'
              "
              class="mb-2 text-3xl font-bold"
            >
              {{ results.traffic }}
            </p>
            <p class="text-sm text-gray-600">Berdasarkan data real-time</p>
          </div>
        </div>

        
        <div class="p-8 mb-8 text-center bg-white border-2 border-orange-100 shadow-xl rounded-2xl">
          <div
            class="inline-block px-6 py-3 mb-4 border border-orange-200 bg-linear-to-r from-orange-500 to-orange-600 rounded-xl"
          >
            <h3 class="text-xl font-bold text-white">Rekomendasi</h3>
          </div>
          <p
            :class="
              results.recommendation.includes('Tidak')
                ? 'text-red-600'
                : results.recommendation.includes('Direkomendasikan jika')
                ? 'text-yellow-600'
                : 'text-green-600'
            "
            class="text-2xl font-bold"
          >
            {{ results.recommendation }}
          </p>
        </div>

        
        <div class="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
          <div class="p-8 bg-white border-2 border-green-100 shadow-xl rounded-2xl">
            <div
              class="inline-block px-6 py-3 mb-6 border border-green-200 bg-linear-to-r from-green-600 to-green-700 rounded-xl"
            >
              <h3 class="text-xl font-bold text-white">Proximity Analytics</h3>
            </div>
            <ul class="space-y-4 text-gray-700">
              <li class="flex items-start gap-3 p-4 border-l-4 border-green-600 bg-green-50 rounded-xl">
                <Icon name="lucide:map-pin" size="20" class="text-green-600 mt-0.5 shrink-0" />
                <div>
                  <span class="font-semibold">Jarak ke sekolah:</span>
                  <p class="mt-1 text-gray-600">{{ results.analytics.proximity.distanceToSchool }}</p>
                </div>
              </li>
              <li class="flex items-start gap-3 p-4 border-l-4 border-green-600 bg-green-50 rounded-xl">
                <Icon name="lucide:clock" size="20" class="text-green-600 mt-0.5 shrink-0" />
                <div>
                  <span class="font-semibold">Estimasi tiba:</span>
                  <p class="mt-1 text-gray-600">{{ results.analytics.proximity.estimatedArrival }}</p>
                </div>
              </li>
              <li class="flex items-start gap-3 p-4 border-l-4 border-green-600 bg-green-50 rounded-xl">
                <Icon name="lucide:route" size="20" class="text-green-600 mt-0.5 shrink-0" />
                <div>
                  <span class="font-semibold">Waktu tempuh:</span>
                  <p class="mt-1 text-gray-600">{{ results.analytics.proximity.travelTime }}</p>
                </div>
              </li>
              <li class="flex items-start gap-3 p-4 border-l-4 border-green-600 bg-green-50 rounded-xl">
                <Icon name="lucide:map" size="20" class="text-green-600 mt-0.5 shrink-0" />
                <div>
                  <span class="font-semibold">Area sekitar:</span>
                  <p class="mt-1 text-gray-600">{{ results.analytics.proximity.nearbyAreas.join(', ') }}</p>
                </div>
              </li>
            </ul>
          </div>

          <div class="p-8 bg-white border-2 border-purple-100 shadow-xl rounded-2xl">
            <div
              class="inline-block px-6 py-3 mb-6 border border-purple-200 bg-linear-to-r from-purple-600 to-purple-700 rounded-xl"
            >
              <h3 class="text-xl font-bold text-white">Time Analytics</h3>
            </div>
            <ul class="space-y-4 text-gray-700">
              <li class="flex items-start gap-3 p-4 border-l-4 border-purple-600 bg-purple-50 rounded-xl">
                <Icon name="lucide:traffic-cone" size="20" class="text-purple-600 mt-0.5 shrink-0" />
                <div>
                  <span class="font-semibold">Kepadatan saat ini:</span>
                  <p class="mt-1 text-gray-600">{{ results.analytics.timeAnalytics.currentCongestion }}</p>
                </div>
              </li>
              <li class="flex items-start gap-3 p-4 border-l-4 border-purple-600 bg-purple-50 rounded-xl">
                <Icon name="lucide:alarm-clock" size="20" class="text-purple-600 mt-0.5 shrink-0" />
                <div>
                  <span class="font-semibold">Jam sibuk:</span>
                  <p class="mt-1 text-gray-600">{{ results.analytics.timeAnalytics.peakHours.join(', ') }}</p>
                </div>
              </li>
              <li class="flex items-start gap-3 p-4 border-l-4 border-purple-600 bg-purple-50 rounded-xl">
                <Icon name="lucide:calendar-check" size="20" class="text-purple-600 mt-0.5 shrink-0" />
                <div>
                  <span class="font-semibold">Rekomendasi keberangkatan:</span>
                  <p class="mt-1 text-gray-600">{{ results.analytics.timeAnalytics.recommendedDeparture }}</p>
                </div>
              </li>
              <li class="flex items-start gap-3 p-4 border-l-4 border-purple-600 bg-purple-50 rounded-xl">
                <Icon name="lucide:calendar-check" size="20" class="text-purple-600 mt-0.5 shrink-0" />
                <div>
                  <span class="font-semibold">Waktu kategori:</span>
                  <p class="mt-1 text-gray-600">{{ results.analytics.timeAnalytics.timeCategory }}</p>
                </div>
              </li>
              <li class="flex items-start gap-3 p-4 border-l-4 border-purple-600 bg-purple-50 rounded-xl">
                <Icon name="lucide:zap" size="20" class="text-purple-600 mt-0.5 shrink-0" />
                <div>
                  <span class="font-semibold">Delay waktu:</span>
                  <p class="mt-1 text-gray-600">{{ results.analytics.timeAnalytics.delayTime }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        
        <div class="p-8 bg-white border-2 border-blue-100 shadow-xl rounded-2xl">
          <div
            class="inline-block px-6 py-3 mb-6 border border-blue-200 bg-linear-to-r from-blue-600 to-blue-800 rounded-xl"
          >
            <h3 class="text-xl font-bold text-white">Informasi Berguna</h3>
          </div>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div class="p-4 border-l-4 border-blue-600 bg-blue-50 rounded-xl">
              <div class="flex items-center gap-3 mb-2">
                <Icon name="lucide:fuel" size="20" class="text-blue-600" />
                <span class="font-semibold">Estimasi BBM</span>
              </div>
              <p class="text-gray-600">{{ results.analytics.usefulInfo.fuelEstimate }}</p>
            </div>
            <div class="p-4 border-l-4 border-green-600 bg-green-50 rounded-xl">
              <div class="flex items-center gap-3 mb-2">
                <Icon name="lucide:leaf" size="20" class="text-green-600" />
                <span class="font-semibold">Carbon Footprint</span>
              </div>
              <p class="text-gray-600">{{ results.analytics.usefulInfo.carbonFootprint }}</p>
            </div>
            <div class="p-4 border-l-4 border-orange-600 bg-orange-50 rounded-xl">
              <div class="flex items-center gap-3 mb-2">
                <Icon name="lucide:shield-check" size="20" class="text-orange-600" />
                <span class="font-semibold">Safety Rating</span>
              </div>
              <p class="text-gray-600">{{ results.analytics.usefulInfo.safetyRating }}</p>
            </div>
            <div class="p-4 border-l-4 border-red-600 bg-red-50 rounded-xl">
              <div class="flex items-center gap-3 mb-2">
                <Icon name="lucide:cloud" size="20" class="text-red-600" />
                <span class="font-semibold">Cuaca</span>
              </div>
              <p class="text-gray-600">{{ results.analytics.usefulInfo.weatherImpact }}</p>
            </div>
            <div class="p-4 border-l-4 border-indigo-600 bg-indigo-50 rounded-xl">
              <div class="flex items-center gap-3 mb-2">
                <Icon name="lucide:gauge" size="20" class="text-indigo-600" />
                <span class="font-semibold">Kecepatan Rata-rata</span>
              </div>
              <p class="text-gray-600">{{ results.analytics.usefulInfo.averageSpeed }}</p>
            </div>
          </div>
        </div>

        
        <div class="p-8 bg-white border-2 border-blue-100 shadow-xl rounded-2xl">
          <div
            class="inline-block px-6 py-3 mb-6 border border-blue-200 bg-linear-to-r from-blue-600 to-blue-800 rounded-xl"
          >
            <h3 class="text-xl font-bold text-white">Informasi Tambahan</h3>
          </div>
          <ul class="space-y-4 text-gray-700">
            <li class="flex items-start gap-3 p-4 border-l-4 border-blue-600 bg-blue-50 rounded-xl">
              <Icon name="lucide:route" size="20" class="text-blue-600 mt-0.5 shrink-0" />
              <div>
                <span class="font-semibold">Rute terbaik:</span>
                <p class="mt-1 text-gray-600">{{ results.route.summary }}</p>
              </div>
            </li>
            <li class="flex items-start gap-3 p-4 border-l-4 border-orange-600 bg-orange-50 rounded-xl">
              <Icon name="lucide:calendar-clock" size="20" class="text-orange-600 mt-0.5 shrink-0" />
              <div>
                <span class="font-semibold">Waktu keberangkatan optimal:</span>
                <p class="mt-1 text-gray-600">{{ results.bestTime }}</p>
              </div>
            </li>
            <li class="flex items-start gap-3 p-4 border-l-4 border-blue-600 bg-blue-50 rounded-xl">
              <Icon name="lucide:lightbulb" size="20" class="text-blue-600 mt-0.5 shrink-0" />
              <div>
                <span class="font-semibold">Tips:</span>
                <p class="mt-1 text-gray-600">{{ results.tips }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
