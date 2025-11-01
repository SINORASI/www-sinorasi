<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { type TrafficTrackerForm, trafficTrackerSchema } from "~/utils/schema";
import { useGoogleMaps } from "~/composables/useGoogleMaps";
import { useTrafficLimiter } from "~/composables/useTrafficLimiter";
import { useTrafficReporting, type SubmitReportPayload } from "~/composables/useTrafficReporting";

interface TrafficResults {
  time: string;
  distance: string;
  traffic: string;
  route: string;
  bestTime: string;
  tips: string;
  recommendation: string;
  analytics: {
    proximity: {
      distanceToSchool: string;
      estimatedArrival: string;
      timeToSchool: string;
    };
    timeAnalytics: {
      currentCongestion: string;
      peakHours: string[];
      recommendedDeparture: string;
      alternativeRoutes: number;
    };
    usefulInfo: {
      fuelEstimate: string;
      carbonFootprint: string;
      safetyRating: string;
    };
  };
}

interface TrafficReportForm {
  type: "accident" | "construction" | "traffic_jam" | "road_closure" | "flooding" | "other";
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  location?: {
    lat: number;
    lng: number;
  };
}

// Composables
const {
  mapInstance,
  isMapLoaded,
  error: mapError,
  initializeMap,
  calculateGoogleRoute,
  addReportMarker,
  getEstimatedArrivalTime,
} = useGoogleMaps();

const {
  getCurrentCount,
  hasRemainingRequests,
  getRemainingRequests,
  getProgressPercentage,
  incrementRequestCount,
  checkAndEnforceLimit,
  getUsageMessage,
} = useTrafficLimiter();

const {
  reports,
  isLoading: reportsLoading,
  error: reportsError,
  fetchActiveReports,
  submitReport,
  getReportIcon,
  getSeverityColor,
  getSeverityBadgeColor,
  formatTimeSince,
} = useTrafficReporting();

// Constants
const schoolAddress = "SMK Negeri 2 Singosari, Jl. Raya Singosari, Singosari, Malang, Jawa Timur, Indonesia";
const SCHOOL_LAT = -7.91390657;
const SCHOOL_LNG = 112.64087571;

// Form State
const form = ref<TrafficTrackerForm>({
  origin: "",
  destination: schoolAddress,
  travelMode: "driving",
  avoidTolls: false,
  avoidHighways: false,
});

const reportForm = ref<TrafficReportForm>({
  type: "traffic_jam",
  severity: "medium",
  description: "",
  location: undefined,
});

// UI State
const results = ref<TrafficResults | null>(null);
const loading = ref(false);
const reportLoading = ref(false);
const error = ref("");
const reportError = ref("");
const reportSuccess = ref("");
const validationErrors = ref<Record<string, string>>({});
const showReportForm = ref(false);
const userLocation = ref<{ lat: number; lng: number } | null>(null);

// Computed properties
const usageMessage = computed(() => getUsageMessage());
const progressPercentage = computed(() => getProgressPercentage());
const remainingRequests = computed(() => getRemainingRequests());
const currentRequestCount = computed(() => getCurrentCount());
const hasExceededLimit = computed(() => !hasRemainingRequests());

// Initialize map on component mount
onMounted(() => {
  const config = useRuntimeConfig();
  if (typeof window !== "undefined" && !(window as any).google) {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${config.public.googleMapsApiKey}&libraries=places,directions,geocoding`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      initializeMap("traffic-map", 13);
      // Fetch initial reports
      fetchAndDisplayReports();
    };
    document.head.appendChild(script);
  } else if (typeof window !== "undefined" && (window as any).google) {
    initializeMap("traffic-map", 13);
    fetchAndDisplayReports();
  }
});

/**
 * Get user's current location via Geolocation API
 */
const getCurrentLocation = () => {
  error.value = "";

  if (!navigator.geolocation) {
    error.value = "Geolokasi tidak didukung oleh browser ini.";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      form.value.origin = `${lat},${lng}`;
      userLocation.value = { lat, lng };
      reportForm.value.location = { lat, lng };
      error.value = "";
    },
    (_err) => {
      error.value = "Tidak dapat mendapatkan lokasi saat ini. Pastikan izin lokasi diaktifkan.";
    }
  );
};

/**
 * Calculate route with backend fallback
 */
const calculateRouteWithBackend = async () => {
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

/**
 * Calculate route using Google Maps with usage limit enforcement
 */
const calculateRoute = async () => {
  error.value = "";
  reportError.value = "";

  // Check usage limit BEFORE making API call
  try {
    checkAndEnforceLimit();
  } catch (limitError: any) {
    error.value = limitError.message;
    return;
  }

  if (!userLocation.value) {
    error.value = "Lokasi pengguna tidak tersedia. Silakan gunakan 'Lokasi Saat Ini' terlebih dahulu.";
    return;
  }

  loading.value = true;

  try {
    const routeResult = await calculateGoogleRoute(userLocation.value.lat, userLocation.value.lng);

    if (!routeResult) {
      error.value = mapError.value || "Gagal menghitung rute dengan Google Maps";
      return;
    }

    // Only increment counter on successful API call
    incrementRequestCount();

    // Format results
    const distanceKm = (routeResult.distance.value / 1000).toFixed(1);
    const durationInTraffic = routeResult.duration_in_traffic || routeResult.duration;

    results.value = {
      time: durationInTraffic.text,
      distance: `${distanceKm} km`,
      traffic: getTrafficStatus(durationInTraffic, routeResult.duration),
      route: "Google Maps Route",
      bestTime: getBestTime(),
      tips: getTips(getTrafficStatus(durationInTraffic, routeResult.duration), durationInTraffic.text),
      recommendation: getRecommendation(
        durationInTraffic.text,
        getTrafficStatus(durationInTraffic, routeResult.duration)
      ),
      analytics: {
        proximity: {
          distanceToSchool: `${distanceKm} km`,
          estimatedArrival: getEstimatedArrivalTime(durationInTraffic),
          timeToSchool: durationInTraffic.text,
        },
        timeAnalytics: {
          currentCongestion: getTrafficStatus(durationInTraffic, routeResult.duration),
          peakHours: ["07:00-09:00", "16:00-18:00"],
          recommendedDeparture: getRecommendedDeparture(),
          alternativeRoutes: 1,
        },
        usefulInfo: {
          fuelEstimate: calculateFuelEstimate(`${distanceKm} km`),
          carbonFootprint: calculateCarbonFootprint(`${distanceKm} km`),
          safetyRating: getSafetyRating(getTrafficStatus(durationInTraffic, routeResult.duration)),
        },
      },
    };
  } catch (err: any) {
    error.value = err.message || "Gagal menggunakan Google Maps.";
    console.error("Route calculation error:", err);
  } finally {
    loading.value = false;
  }
};

/**
 * Fetch and display traffic reports on map
 */
const fetchAndDisplayReports = async () => {
  if (!userLocation.value && !mapInstance.value) return;

  const lat = userLocation.value?.lat || SCHOOL_LAT;
  const lng = userLocation.value?.lng || SCHOOL_LNG;

  try {
    const fetchedReports = await fetchActiveReports();

    // Clear existing markers and add new ones
    fetchedReports.forEach((report) => {
      addReportMarker(report.latitude, report.longitude, report.type, report.severity, report.description);
    });
  } catch (err: any) {
    console.error("Error fetching reports:", err);
  }
};

/**
 * Submit a new traffic report
 */
const submitTrafficReport = async () => {
  reportError.value = "";
  reportSuccess.value = "";

  if (!reportForm.value.location) {
    reportError.value = "Lokasi diperlukan untuk melaporkan kondisi lalu lintas.";
    return;
  }

  if (!reportForm.value.description.trim() || reportForm.value.description.trim().length < 10) {
    reportError.value = "Deskripsi minimal 10 karakter.";
    return;
  }

  reportLoading.value = true;

  try {
    const payload: SubmitReportPayload = {
      location: reportForm.value.location,
      type: reportForm.value.type,
      severity: reportForm.value.severity,
      description: reportForm.value.description,
      timestamp: new Date().toISOString(),
    };

    const newReport = await submitReport(payload);

    if (newReport) {
      reportSuccess.value = "Laporan lalu lintas berhasil dikirim! Terima kasih atas kontribusi Anda.";

      // Reset form
      reportForm.value = {
        type: "traffic_jam",
        severity: "medium",
        description: "",
        location: reportForm.value.location,
      };

      // Refresh reports display
      await fetchAndDisplayReports();

      // Clear success message after 3 seconds
      setTimeout(() => {
        reportSuccess.value = "";
      }, 3000);
    }
  } catch (err: any) {
    reportError.value = err.message || "Gagal mengirim laporan lalu lintas.";
  } finally {
    reportLoading.value = false;
  }
};

/**
 * Utility functions for traffic analysis
 */
const getTrafficStatus = (trafficDuration: { value: number }, normalDuration: { value: number }): string => {
  const ratio = trafficDuration.value / normalDuration.value;
  if (ratio < 1.2) return "Lancar";
  if (ratio < 1.5) return "Padat";
  return "Macet";
};

const getBestTime = (): string => {
  const now = new Date();
  const hour = now.getHours();
  if (hour < 7) return "06:30 - 07:00 pagi";
  if (hour < 9) return "Sekarang atau hindari jam sibuk";
  if (hour < 12) return "Setelah jam sibuk pagi";
  if (hour < 15) return "Siapkan waktu lebih";
  if (hour < 18) return "Hindari jam pulang kerja";
  return "Luar jam sibuk";
};

const getTips = (traffic: string, duration: string): string => {
  if (traffic === "Macet") return "Pertimbangkan transportasi umum atau berangkat lebih awal.";
  if (duration.includes("jam")) return "Perjalanan cukup lama, pastikan kondisi kendaraan baik.";
  return "Perjalanan normal, selamat jalan!";
};

const getRecommendation = (duration: string, traffic: string): string => {
  const durationMin = parseInt(duration.split(" ")[0] || "0", 10);
  if (traffic === "Macet" || durationMin > 60) return "Tidak direkomendasikan saat ini.";
  if (durationMin > 30) return "Direkomendasikan jika mendesak.";
  return "Direkomendasikan.";
};

const getRecommendedDeparture = (): string => {
  const now = new Date();
  const hour = now.getHours();
  if (hour >= 6 && hour < 8) return "Sekarang";
  if (hour >= 8 && hour < 16) return "1-2 jam lagi";
  return "Besok pagi";
};

const calculateFuelEstimate = (distance: string): string => {
  const distKm = parseFloat(distance.replace(" km", ""));
  const avgConsumption = 12;
  const liters = distKm / avgConsumption;
  return `${liters.toFixed(1)} liter`;
};

const calculateCarbonFootprint = (distance: string): string => {
  const distKm = parseFloat(distance.replace(" km", ""));
  const co2PerKm = 0.12;
  const co2 = distKm * co2PerKm;
  return `${co2.toFixed(1)} kg CO2`;
};

const getSafetyRating = (traffic: string): string => {
  switch (traffic) {
    case "Lancar":
      return "Tinggi";
    case "Padat":
      return "Sedang";
    case "Macet":
      return "Rendah";
    default:
      return "Sedang";
  }
};

useHead({
  title: "Traffic Tracker - Utilitas - SMKN 2 Singosari",
  meta: [
    {
      name: "description",
      content: "Cek estimasi waktu tempuh ke SMK Negeri 2 Singosari dengan traffic tracker real-time.",
    },
  ],
});
</script>

<template>
  <div class="min-h-screen py-24 bg-gradient-to-b from-white via-blue-50 to-white">
    <div class="container px-4 mx-auto sm:px-6">
      <!-- Header -->
      <div class="mb-8 text-center">
        <div
          class="inline-block px-10 py-6 mb-4 border border-blue-200 shadow-xl bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl rounded-2xl"
        >
          <h1 class="text-3xl font-bold text-white md:text-4xl">Live Traffic Tracker</h1>
        </div>
        <p class="max-w-3xl mx-auto text-lg text-gray-600">
          Lacak kondisi lalu lintas real-time ke SMK Negeri 2 Singosari dan laporkan insiden untuk membantu komunitas.
        </p>
      </div>

      <!-- Usage Limit Alert & Info -->
      <div class="max-w-4xl mx-auto mb-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <div class="flex items-start gap-3">
          <Icon name="lucide:info" size="20" class="text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 class="font-semibold text-blue-900 mb-2">Penggunaan Bulanan</h3>
            <p class="text-sm text-blue-800 mb-3">{{ usageMessage }}</p>
            <div class="w-full bg-blue-200 rounded-full h-2">
              <div
                class="bg-gradient-to-r from-blue-600 to-blue-800 h-2 rounded-full transition-all duration-300"
                :style="{ width: progressPercentage + '%' }"
              ></div>
            </div>
            <div class="flex justify-between mt-2 text-xs text-blue-700">
              <span>{{ currentRequestCount }} digunakan</span>
              <span>{{ remainingRequests }} tersisa</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Limit Exceeded Alert -->
      <div v-if="hasExceededLimit" class="max-w-4xl mx-auto mb-8 p-4 bg-red-50 border-l-4 border-red-600 rounded-r-xl">
        <div class="flex items-start gap-3">
          <Icon name="lucide:alert-circle" size="20" class="text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 class="font-semibold text-red-900">Batas Penggunaan Tercapai</h3>
            <p class="text-sm text-red-800 mt-1">
              Anda telah menggunakan 5 permintaan untuk bulan ini. Silakan coba lagi bulan depan.
            </p>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <!-- Left: Controls & Results -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Location Input -->
          <div class="p-8 bg-white border-2 border-blue-100 shadow-xl rounded-2xl">
            <h2 class="text-xl font-bold text-gray-800 mb-6">Masukkan Lokasi Anda</h2>

            <div class="space-y-4">
              <div>
                <label class="flex items-center mb-3 text-sm font-bold text-gray-800">
                  <Icon name="lucide:map-pin" size="18" class="mr-2 text-blue-600" />
                  Alamat Rumah
                </label>
                <input
                  v-model="form.origin"
                  type="text"
                  placeholder="Masukkan alamat lengkap"
                  class="w-full px-4 py-3 transition border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  :disabled="hasExceededLimit"
                />
                <div v-if="validationErrors.origin" class="mt-2 text-sm text-red-600">
                  {{ validationErrors.origin }}
                </div>
              </div>

              <button
                type="button"
                @click="getCurrentLocation"
                :disabled="hasExceededLimit"
                class="flex items-center justify-center w-full gap-2 px-4 py-3 font-semibold transition-all bg-white border-2 border-gray-200 shadow-sm hover:border-blue-600 hover:text-blue-600 rounded-xl hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon name="lucide:locate-fixed" size="20" />
                Gunakan Lokasi Saat Ini
              </button>

              <button
                type="button"
                @click="calculateRoute"
                :disabled="loading || hasExceededLimit || !userLocation"
                class="flex items-center justify-center w-full gap-2 px-4 py-4 font-bold text-white transition-all bg-blue-600 shadow-md hover:bg-blue-700 disabled:bg-blue-400 rounded-xl hover:shadow-lg disabled:cursor-not-allowed"
              >
                <Icon v-if="loading" name="lucide:loader-2" class="animate-spin" size="20" />
                <Icon v-else name="lucide:navigation" size="20" />
                {{ loading ? "Menghitung..." : "Hitung Rute" }}
              </button>
            </div>

            <!-- Errors -->
            <div v-if="error" class="p-4 mt-4 border-l-4 border-red-600 bg-red-50 rounded-r-xl">
              <div class="flex items-start">
                <Icon name="lucide:alert-circle" size="20" class="text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                <p class="text-red-700 text-sm">{{ error }}</p>
              </div>
            </div>
          </div>

          <!-- Results Display -->
          <div v-if="results" class="space-y-6">
            <!-- Key Metrics -->
            <div class="grid grid-cols-3 gap-4">
              <div class="p-6 text-center bg-white border-2 border-blue-100 shadow-lg rounded-2xl">
                <div class="inline-block p-3 mb-3 bg-blue-100 rounded-full">
                  <Icon name="lucide:clock" size="24" class="text-blue-600" />
                </div>
                <h3 class="mb-1 text-sm font-semibold text-gray-700">Waktu Tempuh</h3>
                <p class="text-2xl font-bold text-blue-600">{{ results.time }}</p>
              </div>

              <div class="p-6 text-center bg-white border-2 border-orange-100 shadow-lg rounded-2xl">
                <div class="inline-block p-3 mb-3 bg-orange-100 rounded-full">
                  <Icon name="lucide:map-pin" size="24" class="text-orange-600" />
                </div>
                <h3 class="mb-1 text-sm font-semibold text-gray-700">Jarak</h3>
                <p class="text-2xl font-bold text-orange-600">{{ results.distance }}</p>
              </div>

              <div class="p-6 text-center bg-white border-2 border-green-100 shadow-lg rounded-2xl">
                <div class="inline-block p-3 mb-3 bg-green-100 rounded-full">
                  <Icon name="lucide:traffic-cone" size="24" class="text-green-600" />
                </div>
                <h3 class="mb-1 text-sm font-semibold text-gray-700">Lalu Lintas</h3>
                <p
                  :class="{
                    'text-green-600': results.traffic === 'Lancar',
                    'text-yellow-600': results.traffic === 'Padat',
                    'text-red-600': results.traffic === 'Macet',
                  }"
                  class="text-2xl font-bold"
                >
                  {{ results.traffic }}
                </p>
              </div>
            </div>

            <!-- Analytics -->
            <div class="p-6 bg-white border-2 border-blue-100 shadow-lg rounded-2xl">
              <h3 class="text-lg font-bold text-gray-800 mb-4">Informasi Perjalanan</h3>
              <div class="grid grid-cols-2 gap-4">
                <div class="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <Icon name="lucide:clock" size="18" class="text-blue-600 mt-0.5 flex-shrink-0" />
                  <div class="text-sm">
                    <p class="font-semibold text-gray-700">Estimasi Tiba</p>
                    <p class="text-gray-600">{{ results.analytics.proximity.estimatedArrival }}</p>
                  </div>
                </div>
                <div class="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <Icon name="lucide:fuel" size="18" class="text-green-600 mt-0.5 flex-shrink-0" />
                  <div class="text-sm">
                    <p class="font-semibold text-gray-700">Estimasi BBM</p>
                    <p class="text-gray-600">{{ results.analytics.usefulInfo.fuelEstimate }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Map & Reports -->
        <div class="space-y-6">
          <!-- Map Container -->
          <div class="bg-white border-2 border-blue-100 shadow-xl rounded-2xl overflow-hidden">
            <div id="traffic-map" class="w-full h-96 bg-gray-100"></div>
          </div>

          <!-- Report Form -->
          <div class="p-6 bg-white border-2 border-orange-100 shadow-xl rounded-2xl">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-gray-800">Laporkan Insiden</h3>
              <button
                @click="showReportForm = !showReportForm"
                class="px-3 py-1 text-sm font-semibold text-orange-600 bg-orange-100 rounded-lg hover:bg-orange-200"
              >
                {{ showReportForm ? "Tutup" : "Buka" }}
              </button>
            </div>

            <div v-if="showReportForm" class="space-y-3">
              <div>
                <label class="block mb-2 text-xs font-semibold text-gray-700">Jenis Insiden</label>
                <select
                  v-model="reportForm.type"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="traffic_jam">Macet Lalu Lintas</option>
                  <option value="accident">Kecelakaan</option>
                  <option value="construction">Konstruksi</option>
                  <option value="road_closure">Jalan Ditutup</option>
                  <option value="flooding">Banjir</option>
                  <option value="other">Lainnya</option>
                </select>
              </div>

              <div>
                <label class="block mb-2 text-xs font-semibold text-gray-700">Tingkat Keparahan</label>
                <select
                  v-model="reportForm.severity"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="low">Rendah</option>
                  <option value="medium">Sedang</option>
                  <option value="high">Tinggi</option>
                  <option value="critical">Kritis</option>
                </select>
              </div>

              <div>
                <label class="block mb-2 text-xs font-semibold text-gray-700">Deskripsi (min 10 karakter)</label>
                <textarea
                  v-model="reportForm.description"
                  placeholder="Jelaskan kondisi detail..."
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  rows="3"
                ></textarea>
              </div>

              <button
                @click="submitTrafficReport"
                :disabled="reportLoading || !reportForm.description.trim() || !reportForm.location"
                class="flex items-center justify-center w-full gap-2 px-3 py-2 text-sm font-semibold text-white transition-all bg-orange-600 rounded-lg hover:bg-orange-700 disabled:bg-orange-400 disabled:cursor-not-allowed"
              >
                <Icon v-if="reportLoading" name="lucide:loader-2" class="animate-spin" size="16" />
                <Icon v-else name="lucide:send" size="16" />
                Kirim
              </button>

              <div
                v-if="reportSuccess"
                class="p-3 text-xs text-green-700 bg-green-50 border border-green-200 rounded-lg"
              >
                {{ reportSuccess }}
              </div>

              <div v-if="reportError" class="p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg">
                {{ reportError }}
              </div>
            </div>
          </div>

          <!-- Reports List -->
          <div class="p-6 bg-white border-2 border-green-100 shadow-xl rounded-2xl">
            <h3 class="text-lg font-bold text-gray-800 mb-4">Insiden Aktif</h3>

            <div v-if="reportsLoading" class="text-center py-4">
              <Icon name="lucide:loader-2" class="animate-spin mx-auto" size="24" />
            </div>

            <div v-else-if="reports.length === 0" class="text-center py-4 text-gray-500 text-sm">
              Tidak ada insiden yang dilaporkan.
            </div>

            <div v-else class="space-y-2 max-h-64 overflow-y-auto">
              <div
                v-for="report in reports"
                :key="report.id"
                :class="getSeverityColor(report.severity)"
                class="p-3 border rounded-lg"
              >
                <div class="flex items-start gap-2">
                  <Icon :name="getReportIcon(report.type)" size="18" class="mt-0.5 flex-shrink-0" />
                  <div class="flex-1 text-xs">
                    <p class="font-semibold capitalize">{{ report.type.replace("_", " ") }}</p>
                    <p class="line-clamp-2 mt-1">{{ report.description }}</p>
                    <p class="mt-1 opacity-70">{{ formatTimeSince(report.created_at!) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
