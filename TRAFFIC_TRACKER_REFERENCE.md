# Live Traffic Tracker - Comprehensive Implementation Reference

## Overview

This document provides complete reference information for the Live Traffic Tracker implementation with usage limiting, real-time traffic display, and community reporting.

## Implementation Files Summary

### Composables Created

#### 1. `app/composables/useGoogleMaps.ts`

- Initializes Google Maps with traffic layer
- Handles route calculation via Directions API
- Manages report markers on map
- Provides ETA formatting utilities

**Key Functions:**

- `initializeMap(containerId, zoom)` - Setup map with traffic layer
- `calculateGoogleRoute(lat, lng)` - Get route with real-time traffic
- `addReportMarker(lat, lng, type, severity, description)` - Add incident marker
- `getEstimatedArrivalTime(duration)` - Format ETA

#### 2. `app/composables/useTrafficLimiter.ts`

- Enforces 5-request-per-month limit
- Uses localStorage for client-side tracking
- Auto-resets monthly based on calendar month
- No server calls needed for limit checking

**Key Functions:**

- `checkAndEnforceLimit()` - Throws error if limit exceeded
- `incrementRequestCount()` - Called after successful API
- `hasRemainingRequests()` - Boolean check
- `getRemainingRequests()` - Count remaining
- `getProgressPercentage()` - For UI bar (0-100)
- `getUsageMessage()` - User-friendly text

#### 3. `app/composables/useTrafficReporting.ts`

- Submit traffic incident reports
- Fetch active reports from Supabase
- Format report data for display
- Provide severity/type styling utilities

**Key Functions:**

- `submitReport(payload)` - POST report to backend
- `fetchActiveReports()` - GET reports within radius
- `getReportIcon(type)` - Lucide icon name
- `getSeverityColor(severity)` - Tailwind classes
- `formatTimeSince(isoString)` - "2m ago" format

### Backend API Routes

#### 1. `server/api/traffic-tracker/report.post.ts` (UPDATED)

- Validates report data with Zod schema
- Checks location is within Indonesia
- Filters spam reports
- Inserts to Supabase with 1-hour expiry

**Request Body:**

```typescript
{
  location: { lat: number, lng: number },
  type: 'accident' | 'construction' | 'traffic_jam' | 'road_closure' | 'flooding' | 'other',
  severity: 'low' | 'medium' | 'high' | 'critical',
  description: string, // min 10 chars
  timestamp: string    // ISO 8601
}
```

**Response:**

```typescript
{
  success: boolean,
  data: {
    id: string,
    latitude: number,
    longitude: number,
    type: string,
    severity: string,
    description: string,
    created_at: string,
    expires_at: string,
    is_active: boolean
  }
}
```

#### 2. `server/api/traffic-tracker/reports.get.ts` (NEW)

- Fetches active reports within radius
- Uses Haversine formula for distance
- Filters by expiry and active status
- Requires: lat, lng, radius (optional, default 10km)

**Query Parameters:**

- `lat` (required): User latitude
- `lng` (required): User longitude
- `radius` (optional): Search radius in km (0.1-50, default 10)

**Response:**

```typescript
{
  success: boolean,
  data: [
    {
      id: string,
      latitude: number,
      longitude: number,
      type: string,
      severity: string,
      description: string,
      created_at: string,
      expires_at: string,
      is_active: boolean,
      report_count: number
    }
  ]
}
```

#### 3. `server/api/traffic-tracker/index.post.ts` (EXISTING)

- Calculates route using OSRM backend
- Uses OpenStreetMap Nominatim for geocoding
- Returns distance, duration, analytics

### Page Component

#### `app/pages/utilitas/traffic-tracker.vue` (REPLACED)

- Complete 3-column layout with map and controls
- Integrates all composables
- Shows usage limit progress
- Displays traffic results and analytics
- Collapsible report form
- Real-time incident list

---

## Usage Limit System - Deep Dive

### Storage Mechanism

```typescript
// localStorage key: "traffic-tracker-limit"
{
  monthKey: "2025-11",           // YYYY-MM format
  requestCount: 3,               // 0-5 per month
  lastUpdated: "2025-11-01T10:30:45.123Z"
}
```

### Monthly Reset Logic

The system tracks by calendar month (e.g., "2025-11" for November).

**When user requests:**

1. Read localStorage
2. Extract monthKey from stored data
3. Get current monthKey (new Date → "2025-11")
4. **If different**: Reset to 0
5. **If same**: Continue counting

**Example:**

```
Nov 30 at 11:59pm: monthKey = "2025-11", count = 3
Dec 1 at 12:00am: monthKey = "2025-12" (NEW!)
→ Counter resets to 0 automatically
```

### Request Flow Diagram

```
User clicks "Hitung Rute"
        ↓
Get user location (Geolocation API)
        ↓
Check localStorage count
        ↓
Is count >= 5? ──YES──→ Show error: "Limit reached"
        │                      ↓
        │                   BLOCK API CALL
        │
        NO
        ↓
Call Google Directions API
        ↓
API Success?
├─YES→ Increment counter → Display results
└─NO──→ Show error (DON'T increment)
```

### Integration with Page

```vue
<script setup>
const { checkAndEnforceLimit, incrementRequestCount } = useTrafficLimiter();

const calculateRoute = async () => {
  // 1. CHECK FIRST (before API call)
  try {
    checkAndEnforceLimit(); // Throws if count >= 5
  } catch (err) {
    error.value = err.message; // Show to user
    return; // Don't call API
  }

  // 2. CALL API
  const result = await calculateGoogleRoute(...);

  // 3. INCREMENT ONLY ON SUCCESS
  if (result) {
    incrementRequestCount();
  }
}
</script>
```

---

## Supabase Setup - SQL Commands

### Create Table with Constraints

```sql
CREATE TABLE traffic_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Location data
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,

  -- Report details with constraints
  type VARCHAR(50) NOT NULL,
  severity VARCHAR(20) NOT NULL,
  description TEXT NOT NULL,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,

  -- Engagement
  report_count INT DEFAULT 1 NOT NULL
);

-- Add constraints
ALTER TABLE traffic_reports
  ADD CONSTRAINT valid_type CHECK (type IN (
    'accident', 'construction', 'traffic_jam', 'road_closure', 'flooding', 'other'
  )),
  ADD CONSTRAINT valid_severity CHECK (severity IN (
    'low', 'medium', 'high', 'critical'
  )),
  ADD CONSTRAINT description_length CHECK (char_length(description) >= 10);
```

### Create Performance Indexes

```sql
-- Index for fetching active reports
CREATE INDEX idx_reports_active
  ON traffic_reports(is_active DESC, expires_at DESC)
  WHERE is_active = true;

-- Index for location-based queries (spatial)
CREATE INDEX idx_reports_location
  ON traffic_reports(latitude, longitude);

-- Index for expiry cleanup
CREATE INDEX idx_reports_expires
  ON traffic_reports(expires_at)
  WHERE is_active = true;
```

### Row-Level Security (RLS) Policies

```sql
-- Enable RLS
ALTER TABLE traffic_reports ENABLE ROW LEVEL SECURITY;

-- Policy 1: Anyone can read active, non-expired reports
CREATE POLICY "Allow read active reports" ON traffic_reports
  FOR SELECT
  USING (
    is_active = true AND
    expires_at > NOW()
  );

-- Policy 2: Anyone can insert reports
CREATE POLICY "Allow insert reports" ON traffic_reports
  FOR INSERT
  WITH CHECK (true);

-- Policy 3: Allow owner updates (if tracking user_id in future)
CREATE POLICY "Allow self updates" ON traffic_reports
  FOR UPDATE
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);
```

### Auto-Expiry Cleanup (Optional)

```sql
-- Trigger to mark reports as inactive after expiry
CREATE OR REPLACE FUNCTION mark_expired_reports()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.expires_at < NOW() THEN
    NEW.is_active = false;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_report_update_check_expiry
  BEFORE UPDATE ON traffic_reports
  FOR EACH ROW
  EXECUTE FUNCTION mark_expired_reports();
```

---

## Google Maps Cost Optimization

### API Calls Breakdown

**Per User, Per Month (5 requests max):**

1. Map initialization: 1 call
2. Route calculations: up to 4 calls
3. Report submissions: fetch active reports with each interaction

**Total ~1800 students × 5 requests = 9,000 calls/month**

### Cost Reduction Strategies

1. **Caching**: Map tiles cached by browser
2. **Lazy Loading**: Load traffic layer only on map init
3. **Batch Operations**: Combine report fetches
4. **Lazy Initialization**: Load Google API only when needed
5. **Memoization**: Cache geocoding results

### Monitor Real-Time Usage

```javascript
// In Google Cloud Console:
// Go to: Billing → Overview
// Check "Current month's charges by service"

// Or via API:
// GET https://cloudbilling.googleapis.com/v1/billingAccounts/{BILLING_ACCOUNT_ID}/estimates
```

---

## Testing Scenarios

### Scenario 1: Usage Limit Enforcement

```javascript
// Setup: Clear storage
localStorage.removeItem("traffic-tracker-limit");

// Test 1: First request succeeds
getCurrentLocation(); // Gets location
calculateRoute(); // Should succeed, count = 1

// Test 2-5: Requests 2-5 succeed
// (repeat 4 more times)
// count should be 5 after 5th call

// Test 6: 6th request blocked
calculateRoute();
// Should show: "Batas penggunaan tercapai"
// API should NOT be called

// Test 7: Manual reset works
// In console: JSON.parse(localStorage.getItem('traffic-tracker-limit'))
// Should show: {monthKey: "2025-11", requestCount: 5, ...}
// Change month: (modify monthKey to "2025-10" temporarily)
// Next call should reset counter to 0
```

### Scenario 2: Report Submission

```javascript
// Setup: User has location
userLocation.value = { lat: -7.91390657, lng: 112.64087571 };

// Fill form
reportForm.value = {
  type: "accident",
  severity: "high",
  description: "Kecelakaan hebat di persimpangan utama",
  location: userLocation.value,
};

// Submit
submitTrafficReport();

// Verify in Supabase:
// SELECT * FROM traffic_reports
// WHERE created_at > NOW() - INTERVAL '1 minute'
// ORDER BY created_at DESC LIMIT 1;
```

### Scenario 3: Report Display on Map

```javascript
// After submissions, fetch should display them
fetchAndDisplayReports();

// Verify map markers appear
// Check browser console: mapInstance.value should have markers
// Click markers to see info windows
```

---

## Performance Benchmarks

| Operation               | Expected Time | Max Acceptable |
| ----------------------- | ------------- | -------------- |
| Map initialization      | 200-500ms     | 1000ms         |
| Route calculation       | 500-1500ms    | 3000ms         |
| Report fetch            | 200-800ms     | 2000ms         |
| Report submission       | 300-1000ms    | 3000ms         |
| localStorage operations | <1ms          | 10ms           |

---

## Error Handling Reference

### Error Messages

**Client-Side:**

```
"Geolokasi tidak didukung oleh browser ini."
"Tidak dapat mendapatkan lokasi saat ini..."
"Anda telah mencapai batas penggunaan bulanan..."
"Lokasi pengguna tidak tersedia..."
"Gagal menghitung rute dengan Google Maps"
"Deskripsi minimal 10 karakter."
```

**Server-Side:**

```
"Invalid report data: ..."
"Report location is outside the valid service area"
"Report appears to contain invalid content"
"Failed to save traffic report"
"Report was not saved correctly"
```

---

## Future Enhancement Opportunities

1. **Push Notifications**: Alert users of major incidents
2. **Report Upvoting**: Confirm incident occurrence
3. **User Profiles**: Track individual submission history
4. **Analytics Dashboard**: Admin panel for usage metrics
5. **ML Predictions**: Forecast traffic based on historical data
6. **Multi-Language**: Support for English, Indonesian, etc.
7. **Offline Support**: Service worker for offline access
8. **Report Categories**: Expand beyond traffic (weather, events)
9. **Real-Time Updates**: WebSocket for live incident streams
10. **Mobile App**: Native iOS/Android version

---

## Maintenance Tasks

### Weekly

- Check Google Cloud Console for API errors
- Monitor Supabase for database health

### Monthly

- Review usage patterns in Analytics
- Clean up very old reports (>7 days)
- Update documentation

### Quarterly

- Analyze cost optimization opportunities
- Review usage limits (may need adjustment)
- Update Google Maps API version if needed

---

## Support & Debugging

### Enable Debug Mode

```javascript
// In browser console
localStorage.setItem("traffic-tracker-debug", "true");

// Then check console logs for detailed output
// Disable: localStorage.removeItem('traffic-tracker-debug')
```

### Common Issues & Solutions

| Issue                    | Cause                  | Solution          |
| ------------------------ | ---------------------- | ----------------- |
| Map not loading          | API key invalid        | Check .env.local  |
| Reports not showing      | Supabase not connected | Verify env vars   |
| Limit blocking too early | localStorage corrupted | Clear & refresh   |
| High API costs           | No limit enforcement   | Check if enabled  |
| Geocoding fails          | Address not found      | Try exact address |

---

**Document Version**: 1.0  
**Last Updated**: November 1, 2025  
**Status**: Production Ready ✅
