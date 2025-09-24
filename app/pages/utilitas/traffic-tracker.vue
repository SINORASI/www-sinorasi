<template>
  <div class="font-serif py-30 px-4 sm:px-6 lg:px-8">
    <div class="container mx-auto">
      <div class="text-center mb-10">
        <div class="bg-neutral-200/50 backdrop-blur-2xl p-4 rounded-lg border border-neutral-300">
          <h2 class="text-3xl font-bold">Traffic Tracker</h2>
        </div>
      </div>
      <p class="text-center text-gray-700 mb-8">
        Masukkan alamat rumah Anda untuk mendapatkan estimasi waktu tempuh ke SMK Negeri 2 Singosari, termasuk jarak, kondisi lalu lintas, dan informasi lainnya.
      </p>
      <div class="max-w-md mx-auto mb-12">
        <form @submit.prevent="calculateRoute" class="bg-white p-6 rounded-lg shadow-md">
          <div class="mb-4">
            <label for="address" class="block text-sm font-medium text-gray-700 mb-2">Alamat Rumah</label>
            <input
              v-model="homeAddress"
              type="text"
              id="address"
              placeholder="Masukkan alamat lengkap"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div class="mb-4">
            <button
              type="button"
              @click="getCurrentLocation"
              class="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md transition"
            >
              Gunakan Lokasi Saat Ini
            </button>
          </div>
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 px-4 rounded-md transition"
          >
            {{ loading ? 'Menghitung...' : 'Hitung Estimasi' }}
          </button>
        </form>
        <div v-if="error" class="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {{ error }}
        </div>
      </div>
      <div v-if="results" class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white p-6 rounded-lg shadow-md text-center">
          <Icon name="lucide:clock" size="32" class="text-blue-600 mb-4 mx-auto" />
          <h3 class="text-xl font-semibold mb-2">Waktu Tempuh</h3>
          <p class="text-2xl font-bold text-blue-600">{{ results.time }}</p>
          <p class="text-sm text-gray-600">Estimasi dengan kondisi lalu lintas saat ini</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md text-center">
          <Icon name="lucide:map-pin" size="32" class="text-blue-600 mb-4 mx-auto" />
          <h3 class="text-xl font-semibold mb-2">Jarak</h3>
          <p class="text-2xl font-bold text-blue-600">{{ results.distance }}</p>
          <p class="text-sm text-gray-600">Jarak total perjalanan</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md text-center">
          <Icon name="lucide:traffic-cone" size="32" class="text-blue-600 mb-4 mx-auto" />
          <h3 class="text-xl font-semibold mb-2">Kondisi Lalu Lintas</h3>
          <p :class="results.traffic === 'Lancar' ? 'text-green-600' : results.traffic === 'Padat' ? 'text-yellow-600' : 'text-red-600'" class="text-2xl font-bold">
            {{ results.traffic }}
          </p>
          <p class="text-sm text-gray-600">Berdasarkan data real-time</p>
        </div>
      </div>
      <div v-if="results" class="mt-8 bg-white p-6 rounded-lg shadow-md text-center">
        <h3 class="text-xl font-semibold mb-2">Rekomendasi</h3>
        <p :class="results.recommendation.includes('Tidak') ? 'text-red-600' : results.recommendation.includes('Direkomendasikan jika') ? 'text-yellow-600' : 'text-green-600'" class="text-lg font-bold">
          {{ results.recommendation }}
        </p>
      </div>
      <div v-if="results" class="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold mb-4">Informasi Tambahan</h3>
        <ul class="list-disc list-inside text-gray-700 space-y-2">
          <li>Rute terbaik: {{ results.route }}</li>
          <li>Waktu keberangkatan optimal: {{ results.bestTime }}</li>
          <li>Tips: {{ results.tips }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const config = useRuntimeConfig()
const apiKey = config.public.googleMapsApiKey

const homeAddress = ref('')
const results = ref(null)
const loading = ref(false)
const error = ref('')

const schoolAddress = 'SMK Negeri 2 Singosari, Jl. Raya Singosari, Singosari, Malang, Jawa Timur, Indonesia'

const getCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        homeAddress.value = `${lat},${lng}`
      },
      (err) => {
        error.value = 'Tidak dapat mendapatkan lokasi saat ini. Pastikan izin lokasi diaktifkan.'
      }
    )
  } else {
    error.value = 'Geolokasi tidak didukung oleh browser ini.'
  }
}

const calculateRoute = async () => {
  if (!apiKey) {
    error.value = 'API Key Google Maps tidak dikonfigurasi.'
    return
  }

  loading.value = true
  error.value = ''
  results.value = null

  try {
    // Geocode home address to lat,lng
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(homeAddress.value)}&key=${apiKey}`
    const geocodeResponse = await fetch(geocodeUrl)
    const geocodeData = await geocodeResponse.json()

    if (geocodeData.status !== 'OK') {
      throw new Error('Alamat tidak ditemukan.')
    }

    const origin = geocodeData.results[0].geometry.location
    const originStr = `${origin.lat},${origin.lng}`

    // Directions API
    const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${originStr}&destination=${encodeURIComponent(schoolAddress)}&departure_time=now&traffic_model=best_guess&key=${apiKey}`
    const directionsResponse = await fetch(directionsUrl)
    const directionsData = await directionsResponse.json()

    if (directionsData.status !== 'OK') {
      throw new Error('Tidak dapat menghitung rute.')
    }

    const route = directionsData.routes[0]
    const leg = route.legs[0]

    const duration = leg.duration_in_traffic ? leg.duration_in_traffic.text : leg.duration.text
    const distance = leg.distance.text
    const traffic = getTrafficStatus(leg.duration_in_traffic?.value || leg.duration.value, leg.duration.value)
    const routeSummary = route.summary
    const bestTime = getBestTime()
    const tips = getTips(traffic, duration)

    results.value = {
      time: duration,
      distance,
      traffic,
      route: routeSummary,
      bestTime,
      tips,
      recommendation: getRecommendation(duration, traffic)
    }
  } catch (err) {
    error.value = err.message || 'Terjadi kesalahan saat menghitung rute.'
  } finally {
    loading.value = false
  }
}

const getTrafficStatus = (trafficDuration, normalDuration) => {
  const ratio = trafficDuration / normalDuration
  if (ratio < 1.2) return 'Lancar'
  if (ratio < 1.5) return 'Padat'
  return 'Macet'
}

const getBestTime = () => {
  const now = new Date()
  const hour = now.getHours()
  if (hour < 7) return '06:30 - 07:00 pagi'
  if (hour < 9) return 'Sekarang atau hindari jam sibuk'
  if (hour < 12) return 'Setelah jam sibuk pagi'
  if (hour < 15) return 'Siapkan waktu lebih'
  if (hour < 18) return 'Hindari jam pulang kerja'
  return 'Luar jam sibuk'
}

const getTips = (traffic, duration) => {
  if (traffic === 'Macet') return 'Pertimbangkan transportasi umum atau berangkat lebih awal.'
  if (duration.includes('jam')) return 'Perjalanan cukup lama, pastikan kondisi kendaraan baik.'
  return 'Perjalanan normal, selamat jalan!'
}

const getRecommendation = (duration, traffic) => {
  const durationMin = parseInt(duration.split(' ')[0])
  if (traffic === 'Macet' || durationMin > 60) return 'Tidak direkomendasikan saat ini.'
  if (durationMin > 30) return 'Direkomendasikan jika mendesak.'
  return 'Direkomendasikan.'
}
</script>