// server/api/traffic-tracker/reports.get.ts
/**
 * Fetch all active traffic reports within a radius
 * Query params:
 *   - lat: latitude (required)
 *   - lng: longitude (required)
 *   - radius: search radius in km (default: 10)
 */

interface TrafficReport {
  id: string;
  latitude: number;
  longitude: number;
  type: string;
  severity: string;
  description: string;
  created_at: string;
  expires_at: string;
  is_active: boolean;
  report_count: number;
}

export default defineEventHandler(async (event): Promise<{ success: boolean; data: TrafficReport[] }> => {
  try {
    const query = getQuery(event);
    const lat = parseFloat(query.lat as string);
    const lng = parseFloat(query.lng as string);
    const radius = parseFloat(query.radius as string) || 10;

    // Validate coordinates
    if (Number.isNaN(lat) || Number.isNaN(lng)) {
      throw createError({
        statusCode: 400,
        statusMessage: "Valid latitude and longitude coordinates are required",
      });
    }

    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      throw createError({
        statusCode: 400,
        statusMessage: "Coordinates are out of valid range",
      });
    }

    if (radius < 0.1 || radius > 50) {
      throw createError({
        statusCode: 400,
        statusMessage: "Radius must be between 0.1 and 50 kilometers",
      });
    }

    const config = useRuntimeConfig();
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(config.public.supabaseUrl, config.public.supabaseKey);

    // Fetch active reports from Supabase
    const { data, error } = await supabase
      .from("traffic_reports")
      .select("*")
      .eq("is_active", true)
      .gt("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to fetch traffic reports",
      });
    }

    // Filter reports by radius using Haversine formula
    const filteredReports = (data || []).filter((report: any) => {
      const distance = calculateDistance(lat, lng, report.latitude, report.longitude);
      return distance <= radius;
    });

    return {
      success: true,
      data: filteredReports,
    };
  } catch (error: any) {
    console.error("Get reports error:", error);

    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch traffic reports",
    });
  }
});

/**
 * Calculate distance between two coordinates in kilometers
 * Using Haversine formula
 */
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
