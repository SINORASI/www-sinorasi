<script setup lang="ts">
import { ref } from "vue";

interface TrafficResults {
  time: string;
  distance: string;
  traffic: string;
  route: string;
  bestTime: string;
  tips: string;
  recommendation: string;
}

const config = useRuntimeConfig();
const apiKey = config.public.googleMapsApiKey;

const homeAddress = ref("");
const results = ref<TrafficResults | null>(null);
const loading = ref(false);
const error = ref("");

const schoolAddress = "SMK Negeri 2 Singosari, Jl. Raya Singosari, Singosari, Malang, Jawa Timur, Indonesia";

const getCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        homeAddress.value = `${lat},${lng}`;
      },
      (err) => {
        error.value = "Tidak dapat mendapatkan lokasi saat ini. Pastikan izin lokasi diaktifkan.";
      }
    );
  } else {
    error.value = "Geolokasi tidak didukung oleh browser ini.";
  }
};

const getTrafficStatus = (trafficDuration: number, normalDuration: number) => {
  const ratio = trafficDuration / normalDuration;
  if (ratio < 1.2) return "Lancar";
  if (ratio < 1.5) return "Padat";
  return "Macet";
};

const getBestTime = () => {
  const now = new Date();
  const hour = now.getHours();
  if (hour < 7) return "06:30 - 07:00 pagi";
  if (hour < 9) return "Sekarang atau hindari jam sibuk";
  if (hour < 12) return "Setelah jam sibuk pagi";
  if (hour < 15) return "Siapkan waktu lebih";
  if (hour < 18) return "Hindari jam pulang kerja";
  return "Luar jam sibuk";
};

const getTips = (traffic: string, duration: string) => {
  if (traffic === "Macet") return "Pertimbangkan transportasi umum atau berangkat lebih awal.";
  if (duration.includes("jam")) return "Perjalanan cukup lama, pastikan kondisi kendaraan baik.";
  return "Perjalanan normal, selamat jalan!";
};

const getRecommendation = (duration: string, traffic: string) => {
  const durationMin = parseInt(duration.split(" ")[0] || "0");
  if (traffic === "Macet" || durationMin > 60) return "Tidak direkomendasikan saat ini.";
  if (durationMin > 30) return "Direkomendasikan jika mendesak.";
  return "Direkomendasikan.";
};

const calculateRoute = async () => {
  if (!apiKey) {
    error.value = "API Key Google Maps tidak dikonfigurasi.";
    return;
  }

  loading.value = true;
  error.value = "";
  results.value = null;

  try {
    // Geocode home address to lat,lng
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      homeAddress.value
    )}&key=${apiKey}`;
    const geocodeResponse = await fetch(geocodeUrl);
    const geocodeData = await geocodeResponse.json();

    if (geocodeData.status !== "OK") {
      throw new Error("Alamat tidak ditemukan.");
    }

    const origin = geocodeData.results[0].geometry.location;

    // Geocode school address
    const schoolGeocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      schoolAddress
    )}&key=${apiKey}`;
    const schoolGeocodeResponse = await fetch(schoolGeocodeUrl);
    const schoolGeocodeData = await schoolGeocodeResponse.json();

    if (schoolGeocodeData.status !== "OK") {
      throw new Error("Alamat sekolah tidak ditemukan.");
    }

    const destination = schoolGeocodeData.results[0].geometry.location;

    // Get directions
    const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&mode=driving&departure_time=now&key=${apiKey}`;
    const directionsResponse = await fetch(directionsUrl);
    const directionsData = await directionsResponse.json();

    if (directionsData.status !== "OK") {
      throw new Error("Tidak dapat menghitung rute.");
    }

    const route = directionsData.routes[0];
    const leg = route.legs[0];

    const duration = leg.duration_in_traffic ? leg.duration_in_traffic.text : leg.duration.text;
    const distance = leg.distance.text;
    const traffic = getTrafficStatus(leg.duration_in_traffic?.value || leg.duration.value, leg.duration.value);
    const routeSummary = route.summary;
    const bestTime = getBestTime();
    const tips = getTips(traffic, duration);

    results.value = {
      time: duration,
      distance,
      traffic,
      route: routeSummary,
      bestTime,
      tips,
      recommendation: getRecommendation(duration, traffic),
    };
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
      content: "Cek estimasi waktu tempuh ke SMK Negeri 2 Singosari dari lokasi Anda dengan traffic tracker.",
    },
  ],
});
</script>

<template>
  <div class="min-h-screen py-24 bg-gradient-to-b from-white via-blue-50 to-white">
    <div class="container px-4 mx-auto sm:px-6">
      <!-- Page Header -->
      <div class="mb-12 text-center">
        <div
          class="inline-block px-10 py-6 mb-4 border border-blue-200 shadow-xl bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl rounded-2xl"
        >
          <h1 class="text-3xl font-bold text-white md:text-4xl">Traffic Tracker</h1>
        </div>
        <p class="max-w-3xl mx-auto text-lg text-gray-600">
          Masukkan alamat rumah Anda untuk mendapatkan estimasi waktu tempuh ke SMK Negeri 2 Singosari, termasuk jarak,
          kondisi lalu lintas, dan informasi lainnya.
        </p>
      </div>

      <!-- Form Section -->
      <div class="max-w-md mx-auto mb-12">
        <form @submit.prevent="calculateRoute" class="p-8 bg-white border-2 border-blue-100 shadow-xl rounded-2xl">
          <div class="mb-6">
            <label for="address" class="flex items-center mb-3 text-sm font-bold text-gray-800">
              <Icon name="lucide:map-pin" size="18" class="mr-2 text-blue-600" />
              Alamat Rumah
            </label>
            <input
              v-model="homeAddress"
              type="text"
              id="address"
              placeholder="Masukkan alamat lengkap"
              class="w-full px-4 py-3 transition border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
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

        <!-- Error Message -->
        <div v-if="error" class="p-4 mt-6 border-l-4 border-red-600 bg-red-50 rounded-r-xl">
          <div class="flex items-start">
            <Icon name="lucide:alert-circle" size="20" class="text-red-600 mr-3 mt-0.5 flex-shrink-0" />
            <p class="text-red-700">{{ error }}</p>
          </div>
        </div>
      </div>

      <!-- Results Section -->
      <div v-if="results" class="max-w-6xl mx-auto">
        <!-- Main Stats Grid -->
        <div class="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
          <div
            class="p-8 text-center transition-shadow bg-white border-2 border-blue-100 shadow-xl rounded-2xl hover:shadow-2xl"
          >
            <div class="inline-block p-4 mb-4 bg-blue-100 rounded-full">
              <Icon name="lucide:clock" size="32" class="text-blue-600" />
            </div>
            <h3 class="mb-2 text-xl font-bold text-gray-800">Waktu Tempuh</h3>
            <p class="mb-2 text-3xl font-bold text-blue-600">{{ results.time }}</p>
            <p class="text-sm text-gray-600">Estimasi dengan kondisi lalu lintas saat ini</p>
          </div>

          <div
            class="p-8 text-center transition-shadow bg-white border-2 border-orange-100 shadow-xl rounded-2xl hover:shadow-2xl"
          >
            <div class="inline-block p-4 mb-4 bg-orange-100 rounded-full">
              <Icon name="lucide:map-pin" size="32" class="text-orange-600" />
            </div>
            <h3 class="mb-2 text-xl font-bold text-gray-800">Jarak</h3>
            <p class="mb-2 text-3xl font-bold text-orange-600">{{ results.distance }}</p>
            <p class="text-sm text-gray-600">Jarak total perjalanan</p>
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

        <!-- Recommendation Card -->
        <div class="p-8 mb-8 text-center bg-white border-2 border-orange-100 shadow-xl rounded-2xl">
          <div
            class="inline-block px-6 py-3 mb-4 border border-orange-200 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl"
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

        <!-- Additional Information Card -->
        <div class="p-8 bg-white border-2 border-blue-100 shadow-xl rounded-2xl">
          <div
            class="inline-block px-6 py-3 mb-6 border border-blue-200 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl"
          >
            <h3 class="text-xl font-bold text-white">Informasi Tambahan</h3>
          </div>
          <ul class="space-y-4 text-gray-700">
            <li class="flex items-start gap-3 p-4 border-l-4 border-blue-600 bg-blue-50 rounded-xl">
              <Icon name="lucide:route" size="20" class="text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <span class="font-semibold">Rute terbaik:</span>
                <p class="mt-1 text-gray-600">{{ results.route }}</p>
              </div>
            </li>
            <li class="flex items-start gap-3 p-4 border-l-4 border-orange-600 bg-orange-50 rounded-xl">
              <Icon name="lucide:calendar-clock" size="20" class="text-orange-600 mt-0.5 flex-shrink-0" />
              <div>
                <span class="font-semibold">Waktu keberangkatan optimal:</span>
                <p class="mt-1 text-gray-600">{{ results.bestTime }}</p>
              </div>
            </li>
            <li class="flex items-start gap-3 p-4 border-l-4 border-blue-600 bg-blue-50 rounded-xl">
              <Icon name="lucide:lightbulb" size="20" class="text-blue-600 mt-0.5 flex-shrink-0" />
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
