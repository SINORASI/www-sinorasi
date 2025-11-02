# Traffic Tracker API Documentation

## Overview
The traffic tracker API now uses **Mapbox API** for accurate distance calculation, routing, and traffic insights. It provides comprehensive analytics and user-friendly recommendations.

## Setup

### 1. Get Mapbox API Keys
1. Visit [Mapbox Account Dashboard](https://account.mapbox.com/tokens/)
2. Create a new public token (for client-side operations)
3. Create a new secret token (for server-side operations)

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local` and add your Mapbox tokens:

```bash
# .env.local
NUXT_PUBLIC_MAPBOX_TOKEN=pk_test_your_public_token_here
MAPBOX_TOKEN=sk_your_secret_token_here
```

## Features

### Distance Calculation
- **Accurate routing** using Mapbox Directions API
- **Fallback to Haversine formula** if API is unavailable
- Returns distance in:
  - Kilometers (2 decimal places)
  - Meters
  - Formatted string

Example response:
```json
{
  "distance": {
    "kilometers": 12.45,
    "meters": 12450,
    "formatted": "12.45 km"
  }
}
```

### Travel Time Estimation
- **Real traffic data** from Mapbox (driving-traffic profile)
- **Transport modes supported:**
  - `driving` - Car (with real traffic)
  - `walking` - On foot
  - `cycling` - Bicycle
  - `transit` - Public transportation (estimated)

- Includes estimated minutes and formatted duration

### Analytics Dashboard

#### 1. **Proximity Analytics**
- Distance to school
- Estimated arrival time
- Travel duration
- Nearby areas (based on distance)

#### 2. **Time Analytics**
- Current congestion level (Lancar/Padat/Macet)
- Peak hours (07:00-09:00, 16:00-18:00)
- Recommended departure time
- Time category (Peak Morning/Peak Evening/Normal/Quiet/Transition)
- **Delay time** with percentage impact

#### 3. **Useful Information**
- Fuel estimate (assuming 12 km/liter)
- Carbon footprint (kg CO2)
- Safety rating (High/Medium/Low)
- Weather impact info
- Average speed (km/h)

### Insights & Recommendations

The API provides intelligent recommendations:

| Scenario | Recommendation |
|----------|------------------|
| Traffic: Macet OR Time > 60 min | "Tidak direkomendasikan saat ini" (Not recommended) |
| Traffic: Padat OR Time 30-60 min | "Direkomendasikan jika mendesak" (Only if urgent) |
| Traffic: Lancar AND Time < 30 min | "Direkomendasikan" (Recommended) |

### Traffic Status Categories

```
Peak Hours (07:00-09:00, 16:00-18:00): "Macet" (Heavy traffic)
Normal Hours (09:00-16:00): "Lancar" (Clear)
Off-peak (18:00-06:00): "Lancar" (Clear)
Transition times: "Padat" (Moderate)
```

## API Endpoint

### POST `/api/traffic-tracker`

#### Request Body
```typescript
{
  origin: string;              // Address or coordinates "lat,lng"
  destination?: string;        // Optional (defaults to SMK Negeri 2 Singosari)
  travelMode: "driving" | "walking" | "transit" | "bicycling";
  avoidTolls?: boolean;        // Optional toll avoidance
  avoidHighways?: boolean;     // Optional highway avoidance
  departureTime?: string;      // Optional departure time
}
```

#### Response Example
```json
{
  "distance": {
    "kilometers": 12.45,
    "meters": 12450,
    "formatted": "12.45 km"
  },
  "estimatedTime": "18 menit",
  "estimatedMinutes": 18,
  "traffic": "Lancar",
  "bestTime": "Setelah jam sibuk pagi",
  "tips": "Perjalanan normal, selamat jalan!",
  "recommendation": "Direkomendasikan.",
  "route": {
    "summary": "Route from your location to SMK Negeri 2 Singosari (driving)",
    "polyline": "encoded_polyline_string"
  },
  "analytics": {
    "proximity": {
      "distanceToSchool": "12.45 km",
      "estimatedArrival": "14:30",
      "travelTime": "18 menit",
      "nearbyAreas": ["Kota Malang", "Sekitar Malang"]
    },
    "timeAnalytics": {
      "currentCongestion": "Lancar",
      "peakHours": ["07:00-09:00", "16:00-18:00"],
      "recommendedDeparture": "1-2 jam lagi",
      "timeCategory": "Jam Normal",
      "delayTime": "Tidak ada delay - jalan lancar"
    },
    "usefulInfo": {
      "fuelEstimate": "1.04 liter",
      "carbonFootprint": "1.494 kg CO2",
      "safetyRating": "Tinggi",
      "weatherImpact": "Kondisi cuaca normal",
      "averageSpeed": "41.4 km/h"
    }
  }
}
```

## Error Handling

### Invalid Input
```json
{
  "statusCode": 400,
  "statusMessage": "Invalid input data",
  "data": [...]
}
```

### Location Not Found
```json
{
  "statusCode": 400,
  "statusMessage": "Unable to determine your location. Please provide valid coordinates or address."
}
```

### Routing Failed
```json
{
  "statusCode": 400,
  "statusMessage": "Unable to calculate route. Please try again."
}
```

## Fallback Behavior

If Mapbox API is unavailable or no token is configured:
1. **Geocoding**: Falls back to parsing "lat,lng" format
2. **Routing**: Falls back to Haversine formula with estimated travel time
3. **Traffic**: Uses time-based estimation instead of real-time data

This ensures the API remains functional even without Mapbox API access.

## School Coordinates
- **Name**: SMK Negeri 2 Singosari
- **Latitude**: -7.91390657
- **Longitude**: 112.64087571

## Performance Notes

- Mapbox API calls are made server-side (secure)
- Results are cached client-side when appropriate
- Polyline encoding reduces data transfer size
- Typical response time: 200-500ms with Mapbox, <100ms with fallback

## Troubleshooting

### "Mapbox token not configured"
- Check `.env.local` file has `MAPBOX_TOKEN` set
- Restart the development server after adding environment variables

### "Geocoding service unavailable"
- Verify Mapbox token is correct and has geocoding enabled
- Check internet connection
- API will fall back to coordinate parsing

### "Routing service unavailable"
- Check Mapbox service status
- Verify token has Directions API access
- Will automatically fall back to Haversine calculation

## Recent Improvements (v2.0)

✅ Integrated Mapbox Directions API for real routing
✅ Added real traffic data support (driving-traffic profile)
✅ Implemented polyline encoding for routes
✅ Added delay time calculations
✅ Added average speed calculation
✅ Improved distance formatting (2 decimal places)
✅ Better fallback mechanisms
✅ Comprehensive analytics dashboard
