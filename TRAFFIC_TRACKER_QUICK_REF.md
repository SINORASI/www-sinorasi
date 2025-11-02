# Traffic Tracker API - Quick Reference

## 🚀 Quick Start (5 minutes)

### 1. Add Mapbox Token (30 seconds)
```bash
# .env.local
MAPBOX_TOKEN=sk_your_secret_token_here
NUXT_PUBLIC_MAPBOX_TOKEN=pk_your_public_token_here
```

### 2. Restart Dev Server (30 seconds)
```bash
npm run dev
```

### 3. Test API (30 seconds)
```bash
curl -X POST http://localhost:3000/api/traffic-tracker \
  -H "Content-Type: application/json" \
  -d '{"origin":"-7.92,112.66","travelMode":"driving"}'
```

### 4. Check Response (1 minute)
Look for: distance, estimatedTime, traffic, recommendation

---

## 📍 API Endpoint

```
POST /api/traffic-tracker
```

---

## 📨 Request Format

```json
{
  "origin": "-7.92, 112.66",
  "travelMode": "driving",
  "destination": "optional",
  "avoidTolls": false,
  "avoidHighways": false,
  "departureTime": "optional"
}
```

### Required Fields
- `origin` - Your location (coordinates: "lat, lng")
- `travelMode` - `driving` | `walking` | `cycling` | `transit`

---

## 📊 Response Fields (Key)

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
  "recommendation": "Direkomendasikan.",
  "tips": "Perjalanan normal, selamat jalan!"
}
```

---

## 🎯 Transport Modes

| Mode | Speed | Use Case | Icon |
|------|-------|----------|------|
| **driving** | ~40 km/h | Cars, motorcycles | 🚗 |
| **walking** | ~5 km/h | Pedestrian | 🚶 |
| **cycling** | ~15 km/h | Bicycle | 🚲 |
| **transit** | ~25 km/h | Bus, train | 🚌 |

---

## 🚦 Traffic Status

| Status | Peak Hours | Description | Action |
|--------|-----------|-------------|--------|
| **Lancar** | 09:00-16:00, 18:00+ | Clear | ✅ Go |
| **Padat** | Morning/Evening Transition | Moderate | ⚠️ Caution |
| **Macet** | 07:00-09:00, 16:00-18:00 | Heavy | ❌ Avoid |

---

## 💡 Analytics Included

### Proximity 📍
- Distance to school
- Estimated arrival time
- Travel duration
- Nearby areas

### Time ⏰
- Current congestion
- Peak hours
- Recommended departure
- Time category
- Delay percentage

### Useful Info 💚
- Fuel estimate (liters)
- Carbon footprint (kg CO2)
- Safety rating
- Weather impact
- Average speed (km/h)

---

## 🎁 Smart Recommendations

```
Distance > 60 min + Macet → "❌ Tidak direkomendasikan"
Distance 30-60 min      → "⚠️ Direkomendasikan jika mendesak"
Distance < 30 min + OK  → "✅ Direkomendasikan"
```

---

## 🔧 Environment Variables

```bash
# Required
MAPBOX_TOKEN=sk_...              # Server-side secret token

# Optional
NUXT_PUBLIC_MAPBOX_TOKEN=pk_...  # Client-side public token
```

**Get tokens from**: https://account.mapbox.com/tokens/

---

## ❌ Error Responses

### Invalid Input (400)
```json
{
  "statusCode": 400,
  "statusMessage": "Invalid input data"
}
```
**Fix**: Check travelMode and origin format

### Location Not Found (400)
```json
{
  "statusCode": 400,
  "statusMessage": "Unable to determine your location."
}
```
**Fix**: Use "lat, lng" format for coordinates

### Server Error (500)
```json
{
  "statusCode": 500,
  "statusMessage": "An unexpected error occurred."
}
```
**Fix**: Check Mapbox token, restart server

---

## 💾 Example Requests

### Minimal (Driving)
```bash
curl -X POST /api/traffic-tracker \
  -H "Content-Type: application/json" \
  -d '{"origin":"-7.92,112.66","travelMode":"driving"}'
```

### Walking from Different Location
```bash
curl -X POST /api/traffic-tracker \
  -H "Content-Type: application/json" \
  -d '{"origin":"-7.95,112.65","travelMode":"walking"}'
```

### Cycling During Peak Hours
```bash
curl -X POST /api/traffic-tracker \
  -H "Content-Type: application/json" \
  -d '{"origin":"-7.90,112.64","travelMode":"cycling"}'
```

---

## 📈 Response Time

| Scenario | Time | Notes |
|----------|------|-------|
| Mapbox API | 200-500ms | Real routing data |
| Fallback | <100ms | Haversine calculation |
| Geocoding fail | <50ms | Uses coordinates only |

---

## 🔐 Security

- ✅ Mapbox token server-side only
- ✅ Public token for client operations
- ✅ No sensitive data in response
- ✅ Input validation enforced
- ✅ Rate limiting recommended

---

## 🛠️ Troubleshooting

| Problem | Solution |
|---------|----------|
| "Token not configured" | Add MAPBOX_TOKEN to .env.local |
| Geocoding fails | Use "lat,lng" format directly |
| Wrong distance | Might be using Haversine (fallback) |
| Distance shows 2 decimals before rounding | This is correct precision |
| Traffic always "Lancar" | Might be outside peak hours |

---

## 📚 Full Documentation

- **Complete API**: `TRAFFIC_TRACKER_API.md`
- **Examples**: `TRAFFIC_TRACKER_EXAMPLES.md`
- **Setup Guide**: `TRAFFIC_TRACKER_UPDATE.md`
- **Checklist**: `TRAFFIC_TRACKER_CHECKLIST.md`

---

## 🎯 School Location

```
Name: SMK Negeri 2 Singosari
Latitude: -7.91390657
Longitude: 112.64087571
```

---

## 📞 Quick Debugging

### Check Mapbox Token
```bash
echo $MAPBOX_TOKEN
# Should output: sk_...
```

### Test Direct Coordinates
```bash
# Instead of address, use coordinates format
# "latitude, longitude"
# Example: "-7.92, 112.66"
```

### Verify Response Format
```bash
# All responses should include:
# - distance (object)
# - estimatedTime (string)
# - traffic (string)
# - analytics (object)
```

---

## 🚀 Deploy Steps

1. Add tokens to production environment variables
2. Restart application
3. Test with sample requests
4. Monitor error logs for first hour
5. Check distance calculations accuracy

---

## 📊 Metrics to Monitor

- Response time (should be < 500ms)
- Error rate (should be < 1%)
- Average distance calculations
- Traffic status distribution
- Popular transport modes

---

## ✨ Version Info

- **API Version**: 2.0
- **Mapbox Integration**: ✅ Active
- **Fallback Support**: ✅ Enabled
- **Status**: ✅ Production Ready
- **Last Updated**: November 2, 2025

---

## 🎓 Learn More

- [Mapbox Documentation](https://docs.mapbox.com/)
- [Mapbox Directions API](https://docs.mapbox.com/api/navigation/directions/)
- [Mapbox Geocoding API](https://docs.mapbox.com/api/search/geocoding/)
- [Polyline Algorithm](https://developers.google.com/maps/documentation/utilities/polylinealgorithm)

---

**Need help?** Check the full documentation files included in the project.
