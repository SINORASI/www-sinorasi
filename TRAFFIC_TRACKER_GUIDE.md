# Live Traffic Tracker - Implementation Guide

## 1. API & Cost Validation

### Required Google Maps APIs

For this Live Traffic Tracker implementation, you'll need to enable the following APIs in Google Cloud Console:

1. **Maps JavaScript API** - For displaying the interactive map and traffic layer
2. **Directions API** - For calculating routes with real-time traffic conditions
3. **Geocoding API** - For converting addresses to coordinates (optional, but recommended)

### Cost Analysis & Free Tier Coverage

**Monthly Usage Estimation:**

- Active Students: ~1,800
- Requests per Student per Month: 5
- **Total Monthly API Calls: 9,000**

**Cost Breakdown:**

| API                       | Pricing                   | Monthly Usage  | Cost            |
| ------------------------- | ------------------------- | -------------- | --------------- |
| Maps JavaScript API       | $7.00 per 1,000 loads     | 9,000 loads    | $63.00          |
| Directions API (Advanced) | $10.00 per 1,000 requests | 9,000 requests | $90.00          |
| Geocoding API             | $5.00 per 1,000 requests  | 0-500 requests | $0-2.50         |
| **Total Estimated Cost**  | —                         | —              | **$153-155.50** |

**Google Maps Platform Free Monthly Credit: $200**

✅ **Conclusion: Your usage WILL comfortably stay within the $200 monthly free credit.**

Additional safety margins:

- Your estimated usage: $153-155.50/month
- Free credit: $200/month
- Buffer: $44.50-47/month (23% cushion)

### Securing API Keys

**Best Practice: Use `runtimeConfig`**

Your `nuxt.config.ts` is already properly configured:

```typescript
runtimeConfig: {
  // Server-side only (private)
  googleMapsApiKey: process.env.NUXT_GOOGLE_MAPS_API_KEY,

  // Public - safe to expose
  public: {
    googleMapsApiKey: process.env.NUXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  },
}
```

**API Key Security Best Practices:**

1. **Use separate keys:**

   - Server key: Used for backend API calls (Directions, Geocoding)
   - Browser key: Used for frontend map display (with restrictions)

2. **Restrict your API keys in Google Cloud Console:**

   - Go to Credentials → Your API Key
   - Set **Application restrictions** to "HTTP referrers (web sites)"
   - Add your domain: `https://www.yourdomain.com/*`
   - Set **API restrictions** to:
     - Maps JavaScript API
     - Directions API
     - Geocoding API

3. **Environment Variables Setup:**
   ```bash
   # .env (gitignored)
   NUXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_public_browser_key
   NUXT_GOOGLE_MAPS_API_KEY=your_private_server_key
   ```

---

## 2. Usage Limit Implementation Strategy

### Client-Side localStorage Strategy

The system uses **localStorage** to track monthly request counts with automatic reset:

**Key Features:**

- ✅ Stores request count per month (YYYY-MM format)
- ✅ Automatically resets counter when month changes
- ✅ Blocks API requests if limit exceeded
- ✅ Shows user-friendly remaining request count
- ✅ No server-side tracking needed (privacy-friendly)

**Storage Structure:**

```json
{
  "traffic-tracker-limit": {
    "monthKey": "2025-11",
    "requestCount": 3,
    "lastUpdated": "2025-11-01T10:30:45.123Z"
  }
}
```

### Request Flow with Usage Limiting

```
User clicks "Calculate Route"
        ↓
Check localStorage for current count
        ↓
Is count < 5? ← NO → Show error "Monthly limit reached"
        ↓ YES
Initialize map & call Google Directions API
        ↓
API Success? ← NO → Show error, don't increment counter
        ↓ YES
Increment counter in localStorage
        ↓
Display results + remaining requests
```

---

## 3. Integration Method

### Recommended: `@googlemaps/js-api-loader`

**Why this is best:**

- Official Google library
- Dynamic script loading
- TypeScript support
- Fine-grained control

**Installation:**

```bash
npm install @googlemaps/js-api-loader
```

**Usage in composables:**

```typescript
import { Loader } from "@googlemaps/js-api-loader";

const loader = new Loader({
  apiKey: config.public.googleMapsApiKey,
  version: "weekly",
  libraries: ["places", "directions", "geocoding"],
});

await loader.load();
const google = window.google;
```

**Alternative: Vue Google Maps Community Fork**

- If you need pre-built Vue components
- Less control but faster development

---

## 4. File Structure Overview

```
app/
├── composables/
│   ├── useGoogleMaps.ts          ← Map initialization & routing
│   ├── useTrafficLimiter.ts      ← Usage limit tracking
│   └── useTrafficReporting.ts    ← Report submission/fetching
├── pages/
│   └── utilitas/
│       └── traffic-tracker.vue   ← Main page (below)
└── ...

server/
├── api/
│   └── traffic-tracker/
│       ├── index.post.ts         ← Route calculation backend
│       ├── current.get.ts        ← Traffic incidents fetch
│       └── reports.post.ts       ← Submit traffic report
│       └── reports.get.ts        ← Fetch active reports
└── ...
```

---

## 5. Data Schema for Supabase

### `traffic_reports` Table

```sql
CREATE TABLE traffic_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Location
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,

  -- Report Details
  type VARCHAR(50) NOT NULL CHECK (type IN (
    'accident', 'construction', 'traffic_jam', 'road_closure', 'flooding', 'other'
  )),
  severity VARCHAR(20) NOT NULL CHECK (severity IN (
    'low', 'medium', 'high', 'critical'
  )),
  description TEXT NOT NULL,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,

  -- Metadata
  report_count INT DEFAULT 1 NOT NULL,

  -- Indexes
  INDEXES (created_at DESC, expires_at, is_active)
);

-- Create indexes for better query performance
CREATE INDEX idx_traffic_reports_active ON traffic_reports(is_active, expires_at);
CREATE INDEX idx_traffic_reports_location ON traffic_reports(latitude, longitude);
```

### Row-Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE traffic_reports ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read active reports
CREATE POLICY "Allow read active reports" ON traffic_reports
  FOR SELECT
  USING (is_active = true AND expires_at > NOW());

-- Allow anyone to insert reports
CREATE POLICY "Allow insert reports" ON traffic_reports
  FOR INSERT
  WITH CHECK (true);

-- Only allow updates to own reports or admin operations
CREATE POLICY "Allow update reports" ON traffic_reports
  FOR UPDATE
  USING (auth.uid() IS NOT NULL);
```

---

## 6. Cost Optimization Tips

1. **Use cached map tiles:** Google caches map tiles, so repeated views of the same area don't incur charges
2. **Batch requests:** If possible, combine multiple direction queries
3. **Set expiration on reports:** Automatically delete reports older than 1 hour from Supabase
4. **Monitor usage:** Check Google Cloud Console Dashboard regularly
5. **Consider session storage:** For temporary data within single session

---

## 7. Monitoring & Alerts

Monitor your Google Maps API usage in:

- **Google Cloud Console** → Quotas page
- Set up billing alerts at $150/month
- Review usage patterns in "Google Maps Platform → APIs & Services → Dashboard"
