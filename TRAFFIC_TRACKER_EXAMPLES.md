# Traffic Tracker API - Usage Examples

## Example 1: Simple Address Request

### Request
```bash
curl -X POST http://localhost:3000/api/traffic-tracker \
  -H "Content-Type: application/json" \
  -d '{
    "origin": "-7.9500, 112.6800",
    "travelMode": "driving"
  }'
```

### Response
```json
{
  "distance": {
    "kilometers": 5.23,
    "meters": 5230,
    "formatted": "5.23 km"
  },
  "estimatedTime": "12 menit",
  "estimatedMinutes": 12,
  "traffic": "Lancar",
  "bestTime": "Sekarang atau hindari jam sibuk",
  "tips": "Perjalanan normal, selamat jalan!",
  "recommendation": "Direkomendasikan.",
  "route": {
    "summary": "Route from your location to SMK Negeri 2 Singosari (driving)",
    "polyline": "gxzxDyqhYmA...encoded_string..."
  },
  "analytics": {
    "proximity": {
      "distanceToSchool": "5.23 km",
      "estimatedArrival": "14:35",
      "travelTime": "12 menit",
      "nearbyAreas": ["Sekitar Singosari", "Kawasan Sekolah"]
    },
    "timeAnalytics": {
      "currentCongestion": "Lancar",
      "peakHours": ["07:00-09:00", "16:00-18:00"],
      "recommendedDeparture": "1-2 jam lagi",
      "timeCategory": "Jam Normal",
      "delayTime": "Tidak ada delay - jalan lancar"
    },
    "usefulInfo": {
      "fuelEstimate": "0.44 liter",
      "carbonFootprint": "0.627 kg CO2",
      "safetyRating": "Tinggi",
      "weatherImpact": "Kondisi cuaca normal",
      "averageSpeed": "26.15 km/h"
    }
  }
}
```

---

## Example 2: Walking Mode Request

### Request
```bash
curl -X POST http://localhost:3000/api/traffic-tracker \
  -H "Content-Type: application/json" \
  -d '{
    "origin": "-7.9200, 112.6600",
    "travelMode": "walking"
  }'
```

### Response (Walking)
```json
{
  "distance": {
    "kilometers": 3.45,
    "meters": 3450,
    "formatted": "3.45 km"
  },
  "estimatedTime": "41 menit",
  "estimatedMinutes": 41,
  "traffic": "Padat",
  "bestTime": "Setelah jam sibuk pagi",
  "tips": "Perjalanan cukup lama, pastikan kondisi kendaraan baik.",
  "recommendation": "Direkomendasikan jika mendesak.",
  "route": {
    "summary": "Route from your location to SMK Negeri 2 Singosari (walking)",
    "polyline": "gxzxDyqhY...different_polyline..."
  },
  "analytics": {
    "proximity": {
      "distanceToSchool": "3.45 km",
      "estimatedArrival": "14:52",
      "travelTime": "41 menit",
      "nearbyAreas": ["Sekitar Singosari", "Kawasan Sekolah"]
    },
    "timeAnalytics": {
      "currentCongestion": "Padat",
      "peakHours": ["07:00-09:00", "16:00-18:00"],
      "recommendedDeparture": "1-2 jam lagi",
      "timeCategory": "Jam Normal",
      "delayTime": "+8 menit (20% delay)"
    },
    "usefulInfo": {
      "fuelEstimate": "0.00 liter",
      "carbonFootprint": "0.000 kg CO2",
      "safetyRating": "Sedang",
      "weatherImpact": "Kondisi cuaca normal",
      "averageSpeed": "5.05 km/h"
    }
  }
}
```

---

## Example 3: Peak Hour Request

### Request (During 07:30 - Peak Morning)
```bash
curl -X POST http://localhost:3000/api/traffic-tracker \
  -H "Content-Type: application/json" \
  -d '{
    "origin": "-7.9200, 112.6300",
    "travelMode": "driving"
  }'
```

### Response (Heavy Traffic)
```json
{
  "distance": {
    "kilometers": 8.75,
    "meters": 8750,
    "formatted": "8.75 km"
  },
  "estimatedTime": "35 menit",
  "estimatedMinutes": 35,
  "traffic": "Macet",
  "bestTime": "Sekarang atau hindari jam sibuk",
  "tips": "Pertimbangkan transportasi umum atau berangkat lebih awal.",
  "recommendation": "Tidak direkomendasikan saat ini.",
  "route": {
    "summary": "Route from your location to SMK Negeri 2 Singosari (driving)",
    "polyline": "..."
  },
  "analytics": {
    "proximity": {
      "distanceToSchool": "8.75 km",
      "estimatedArrival": "08:10",
      "travelTime": "35 menit",
      "nearbyAreas": ["Kota Malang", "Sekitar Malang"]
    },
    "timeAnalytics": {
      "currentCongestion": "Macet",
      "peakHours": ["07:00-09:00", "16:00-18:00"],
      "recommendedDeparture": "Sekarang",
      "timeCategory": "Jam Sibuk Pagi (07:00-09:00)",
      "delayTime": "+17 menit (50% delay)"
    },
    "usefulInfo": {
      "fuelEstimate": "0.73 liter",
      "carbonFootprint": "1.050 kg CO2",
      "safetyRating": "Rendah",
      "weatherImpact": "Kondisi cuaca normal",
      "averageSpeed": "15.00 km/h"
    }
  }
}
```

---

## Example 4: Cycling Mode Request

### Request
```bash
curl -X POST http://localhost:3000/api/traffic-tracker \
  -H "Content-Type: application/json" \
  -d '{
    "origin": "-7.9400, 112.6500",
    "travelMode": "cycling"
  }'
```

### Response (Cycling)
```json
{
  "distance": {
    "kilometers": 4.12,
    "meters": 4120,
    "formatted": "4.12 km"
  },
  "estimatedTime": "16 menit",
  "estimatedMinutes": 16,
  "traffic": "Lancar",
  "bestTime": "Setelah jam sibuk pagi",
  "tips": "Perjalanan normal, selamat jalan!",
  "recommendation": "Direkomendasikan.",
  "route": {
    "summary": "Route from your location to SMK Negeri 2 Singosari (cycling)",
    "polyline": "..."
  },
  "analytics": {
    "proximity": {
      "distanceToSchool": "4.12 km",
      "estimatedArrival": "12:16",
      "travelTime": "16 menit",
      "nearbyAreas": ["Sekitar Singosari", "Kawasan Sekolah"]
    },
    "timeAnalytics": {
      "currentCongestion": "Lancar",
      "peakHours": ["07:00-09:00", "16:00-18:00"],
      "recommendedDeparture": "1-2 jam lagi",
      "timeCategory": "Jam Normal",
      "delayTime": "Tidak ada delay - jalan lancar"
    },
    "usefulInfo": {
      "fuelEstimate": "0.00 liter",
      "carbonFootprint": "0.000 kg CO2",
      "safetyRating": "Tinggi",
      "weatherImpact": "Kondisi cuaca normal",
      "averageSpeed": "15.45 km/h"
    }
  }
}
```

---

## Example 5: Far Distance Request

### Request
```bash
curl -X POST http://localhost:3000/api/traffic-tracker \
  -H "Content-Type: application/json" \
  -d '{
    "origin": "-8.0500, 112.5200",
    "travelMode": "driving"
  }'
```

### Response (Far Distance)
```json
{
  "distance": {
    "kilometers": 45.23,
    "meters": 45230,
    "formatted": "45.23 km"
  },
  "estimatedTime": "1 jam 8 menit",
  "estimatedMinutes": 68,
  "traffic": "Lancar",
  "bestTime": "Luar jam sibuk",
  "tips": "Perjalanan cukup lama, pastikan kondisi kendaraan baik.",
  "recommendation": "Tidak direkomendasikan saat ini.",
  "route": {
    "summary": "Route from your location to SMK Negeri 2 Singosari (driving)",
    "polyline": "..."
  },
  "analytics": {
    "proximity": {
      "distanceToSchool": "45.23 km",
      "estimatedArrival": "12:38",
      "travelTime": "1 jam 8 menit",
      "nearbyAreas": ["Malang Raya", "Daerah Sekitar Kota"]
    },
    "timeAnalytics": {
      "currentCongestion": "Lancar",
      "peakHours": ["07:00-09:00", "16:00-18:00"],
      "recommendedDeparture": "1-2 jam lagi",
      "timeCategory": "Jam Normal",
      "delayTime": "Tidak ada delay - jalan lancar"
    },
    "usefulInfo": {
      "fuelEstimate": "3.77 liter",
      "carbonFootprint": "5.428 kg CO2",
      "safetyRating": "Tinggi",
      "weatherImpact": "Kondisi cuaca normal",
      "averageSpeed": "40.00 km/h"
    }
  }
}
```

---

## Example 6: Error Response - Invalid Input

### Request (Invalid coordinates)
```bash
curl -X POST http://localhost:3000/api/traffic-tracker \
  -H "Content-Type: application/json" \
  -d '{
    "origin": "invalid",
    "travelMode": "invalid_mode"
  }'
```

### Response
```json
{
  "statusCode": 400,
  "statusMessage": "Invalid input data",
  "data": [
    {
      "code": "invalid_enum_value",
      "options": ["driving", "walking", "transit", "bicycling"],
      "path": ["travelMode"],
      "message": "Invalid enum value"
    }
  ]
}
```

---

## Example 7: Error Response - Location Not Found

### Request (Invalid coordinates)
```bash
curl -X POST http://localhost:3000/api/traffic-tracker \
  -H "Content-Type: application/json" \
  -d '{
    "origin": "999.99, 999.99",
    "travelMode": "driving"
  }'
```

### Response
```json
{
  "statusCode": 400,
  "statusMessage": "Unable to determine your location. Please provide valid coordinates or address."
}
```

---

## Frontend Integration Example

### Vue 3 / Nuxt 3 Component
```typescript
<script setup lang="ts">
import { ref } from 'vue';

const origin = ref('-7.9200, 112.6600');
const travelMode = ref('driving');
const result = ref(null);
const loading = ref(false);
const error = ref(null);

async function checkTraffic() {
  loading.value = true;
  error.value = null;

  try {
    const { data } = await useFetch('/api/traffic-tracker', {
      method: 'POST',
      body: {
        origin: origin.value,
        travelMode: travelMode.value
      }
    });

    result.value = data.value;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div>
    <input v-model="origin" placeholder="Latitude, Longitude" />
    <select v-model="travelMode">
      <option value="driving">Driving</option>
      <option value="walking">Walking</option>
      <option value="cycling">Cycling</option>
    </select>

    <button @click="checkTraffic" :disabled="loading">
      {{ loading ? 'Checking...' : 'Check Traffic' }}
    </button>

    <div v-if="result" class="results">
      <h3>Distance: {{ result.distance.formatted }}</h3>
      <h3>Time: {{ result.estimatedTime }}</h3>
      <h3>Traffic: {{ result.traffic }}</h3>
      <p>{{ result.tips }}</p>
      <p><strong>{{ result.recommendation }}</strong></p>
    </div>

    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>
```

---

## Key Takeaways

✅ **Always include** `origin` and `travelMode` in requests
✅ **Coordinates format**: "latitude, longitude" (space after comma is optional)
✅ **Traffic status** changes based on time of day
✅ **Recommendations** are context-aware (traffic + distance)
✅ **All distances** now have 2 decimal precision
✅ **Delay calculations** show impact of current traffic
✅ **Graceful fallback** if Mapbox API unavailable
