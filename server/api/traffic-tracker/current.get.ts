interface TrafficData {
  location: {
    lat: number;
    lng: number;
  };
  speed: number;
  congestion: "low" | "medium" | "high" | "severe";
  timestamp: string;
  source: "sensor" | "crowd" | "historical";
  type?: "accident" | "construction" | "traffic_jam" | "road_closure" | "flooding" | "other";
  severity?: "low" | "medium" | "high" | "critical";
}

interface CurrentTrafficResponse {
  incidents: TrafficData[];
  congestionLevel: "low" | "medium" | "high" | "severe";
  lastUpdated: string;
  coverage: {
    area: string;
    radius: number; // in km
  };
}

export default defineEventHandler(async (event): Promise<CurrentTrafficResponse> => {
  try {
    const query = getQuery(event);
    const lat = parseFloat(query.lat as string);
    const lng = parseFloat(query.lng as string);
    const radius = parseFloat(query.radius as string) || 10; // default 10km radius

    // Validate input parameters
    if (isNaN(lat) || isNaN(lng)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Valid latitude and longitude coordinates are required'
      });
    }

    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Coordinates are out of valid range'
      });
    }

    if (radius < 0.1 || radius > 50) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Radius must be between 0.1 and 50 kilometers'
      });
    }

    // In a real implementation, this would query a database/cache
    // For now, we'll simulate crowd-sourced and historical data
    const incidents = await getCurrentTrafficIncidents(lat, lng, radius);
    const congestionLevel = calculateOverallCongestion(incidents);

    return {
      incidents,
      congestionLevel,
      lastUpdated: new Date().toISOString(),
      coverage: {
        area: "Singosari, Malang",
        radius
      }
    };

  } catch (error: any) {
    console.error('Current traffic error:', error);

    // Enhanced error handling
    if (error.statusCode) {
      throw error; // Re-throw custom errors
    }

    // Handle database query errors
    if (error.message?.includes('database') || error.message?.includes('query')) {
      throw createError({
        statusCode: 503,
        statusMessage: 'Traffic data service temporarily unavailable'
      });
    }

    // Handle cache errors
    if (error.message?.includes('cache') || error.message?.includes('redis')) {
      throw createError({
        statusCode: 503,
        statusMessage: 'Real-time data service temporarily unavailable'
      });
    }

    // Generic fallback
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch current traffic data. Please try again.'
    });
  }
});

// Simulate fetching current traffic incidents
async function getCurrentTrafficIncidents(lat: number, lng: number, radius: number): Promise<TrafficData[]> {
  // In production, this would query:
  // 1. PostgreSQL with PostGIS for spatial queries
  // 2. Redis cache for real-time data
  // 3. External APIs for government traffic data

  // Simulated data for demonstration
  const incidents: TrafficData[] = [
    {
      location: { lat: lat + 0.01, lng: lng + 0.01 },
      speed: 15,
      congestion: "high",
      timestamp: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
      source: "crowd",
      type: "traffic_jam",
      severity: "medium"
    },
    {
      location: { lat: lat - 0.005, lng: lng + 0.008 },
      speed: 5,
      congestion: "severe",
      timestamp: new Date(Date.now() - 600000).toISOString(), // 10 minutes ago
      source: "crowd",
      type: "accident",
      severity: "high"
    }
  ];

  // Filter by radius (simple distance calculation)
  return incidents.filter(incident => {
    const distance = calculateDistance(lat, lng, incident.location.lat, incident.location.lng);
    return distance <= radius;
  });
}

// Calculate overall congestion level
function calculateOverallCongestion(incidents: TrafficData[]): "low" | "medium" | "high" | "severe" {
  if (incidents.length === 0) return "low";

  const severeCount = incidents.filter(i => i.congestion === "severe").length;
  const highCount = incidents.filter(i => i.congestion === "high").length;

  if (severeCount > 0) return "severe";
  if (highCount > 1) return "high";
  if (highCount > 0 || incidents.some(i => i.congestion === "medium")) return "medium";

  return "low";
}

// Simple distance calculation (Haversine formula approximation)
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}