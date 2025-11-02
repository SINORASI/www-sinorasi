import { defineEventHandler, getQuery, readBody, createError, setCookie, getCookie } from 'h3';
import { type TrafficTrackerForm, trafficTrackerSchema } from "~/utils/schema";

// School coordinates: SMK Negeri 2 Singosari
const SCHOOL_COORDINATES = {
  lat: -7.91390657,
  lng: 112.64087571,
};

interface Coordinate {
  lat: number;
  lng: number;
}

interface MapboxRoute {
  distance: number; // in meters
  duration: number; // in seconds
  geometry?: {
    coordinates: [number, number][];
  };
}

interface TrafficResults {
  distance: {
    kilometers: number;
    meters: number;
    formatted: string;
  };
  estimatedTime: string;
  estimatedMinutes: number;
  traffic: string;
  bestTime: string;
  tips: string;
  recommendation: string;
  route: {
    summary: string;
    polyline?: string;
  };
  analytics: {
    proximity: {
      distanceToSchool: string;
      estimatedArrival: string;
      travelTime: string;
      nearbyAreas: string[];
    };
    timeAnalytics: {
      currentCongestion: string;
      peakHours: string[];
      recommendedDeparture: string;
      timeCategory: string;
      delayTime: string;
    };
    usefulInfo: {
      fuelEstimate: string;
      carbonFootprint: string;
      safetyRating: string;
      weatherImpact: string;
      averageSpeed: string;
    };
  };
}

export default defineEventHandler(async (event): Promise<TrafficResults> => {
  const body = (await readBody(event)) as TrafficTrackerForm;
  const config = useRuntimeConfig();

  const validation = trafficTrackerSchema.safeParse(body);
  if (!validation.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid input data",
      data: validation.error.issues,
    });
  }

  try {
    // Get Mapbox API key
    const mapboxToken = config.mapboxToken || config.public?.mapboxToken;
    if (!mapboxToken) {
      console.warn("Mapbox token not configured, falling back to coordinate parsing");
    }

    // Try to geocode the origin address using Mapbox
    let userCoords = await geocodeAddressMapbox(body.origin, mapboxToken);

    if (!userCoords) {
      // Fallback to parsing coordinates directly
      userCoords = parseCoordinates(body.origin);
    }

    if (!userCoords) {
      throw createError({
        statusCode: 400,
        statusMessage: "Unable to determine your location. Please provide valid coordinates or address.",
      });
    }

    // Get route data from Mapbox
    const routeData = await getMapboxRoute(
      userCoords,
      SCHOOL_COORDINATES,
      body.travelMode,
      mapboxToken,
    );

    if (!routeData) {
      throw createError({
        statusCode: 400,
        statusMessage: "Unable to calculate route. Please try again.",
      });
    }

    const distanceKm = routeData.distance / 1000;
    const estimatedMinutes = Math.round(routeData.duration / 60);
    const estimatedTime = formatDuration(estimatedMinutes);

    // Determine traffic status based on time of day
    const traffic = getTrafficStatus();
    const nearbyAreas = getNearbyAreas(distanceKm);
    const delayTime = calculateDelayTime(estimatedMinutes, traffic);

    const bestTime = getBestTime();
    const tips = getTips(traffic, estimatedMinutes);
    const recommendation = getRecommendation(estimatedMinutes, traffic);

    const analytics = {
      proximity: {
        distanceToSchool: `${distanceKm.toFixed(2)} km`,
        estimatedArrival: calculateEstimatedArrival(estimatedMinutes),
        travelTime: estimatedTime,
        nearbyAreas,
      },
      timeAnalytics: {
        currentCongestion: traffic,
        peakHours: ["07:00-09:00", "16:00-18:00"],
        recommendedDeparture: getRecommendedDeparture(),
        timeCategory: getCongestionTimeCategory(),
        delayTime,
      },
      usefulInfo: {
        fuelEstimate: calculateFuelEstimate(distanceKm),
        carbonFootprint: calculateCarbonFootprint(distanceKm),
        safetyRating: getSafetyRating(traffic),
        weatherImpact: getWeatherImpact(distanceKm),
        averageSpeed: calculateAverageSpeed(distanceKm, estimatedMinutes),
      },
    };

    return {
      distance: {
        kilometers: parseFloat(distanceKm.toFixed(2)),
        meters: Math.round(routeData.distance),
        formatted: `${distanceKm.toFixed(2)} km`,
      },
      estimatedTime,
      estimatedMinutes,
      traffic,
      bestTime,
      tips,
      recommendation,
      route: {
        summary: `Route from your location to SMK Negeri 2 Singosari (${body.travelMode})`,
        polyline: routeData.geometry ? encodePolyline(routeData.geometry.coordinates) : undefined,
      },
      analytics,
    };
  } catch (error: unknown) {
    console.error("Traffic tracker error:", error);

    if (error && typeof error === "object" && "statusCode" in error) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: "An unexpected error occurred while calculating your distance. Please try again.",
    });
  }
});

/**
 * Geocode address using Mapbox Geocoding API
 */
async function geocodeAddressMapbox(address: string, token?: string): Promise<Coordinate | null> {
  if (!token) return null;

  try {
    const encodedAddress = encodeURIComponent(address);
    const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?country=ID&limit=1&access_token=${token}`;

    const response = await fetch(mapboxUrl);
    if (!response.ok) {
      console.warn("Mapbox geocoding failed");
      return null;
    }

    const data = await response.json();
    if (!data.features || data.features.length === 0) {
      return null;
    }

    const [lng, lat] = data.features[0].geometry.coordinates;
    return { lat, lng };
  } catch (error) {
    console.error("Mapbox geocoding error:", error);
    return null;
  }
}

/**
 * Get route from Mapbox Directions API
 */
async function getMapboxRoute(
  origin: Coordinate,
  destination: Coordinate,
  profile: string,
  token?: string,
): Promise<MapboxRoute | null> {
  try {
    // Default to Haversine if no token
    if (!token) {
      const distance = calculateHaversineDistance(
        origin.lat,
        origin.lng,
        destination.lat,
        destination.lng,
      );
      const estimatedMinutes = estimateTravelTime(distance, profile);
      return {
        distance: distance * 1000,
        duration: estimatedMinutes * 60,
      };
    }

    // Map travel mode to Mapbox profile
    const profileMap: { [key: string]: string } = {
      driving: "driving-traffic",
      walking: "walking",
      bicycling: "cycling",
      transit: "driving-traffic",
      cycling: "cycling",
    };

    const mapboxProfile = profileMap[profile] || "driving-traffic";
    const mapboxUrl = `https://api.mapbox.com/directions/v5/mapbox/${mapboxProfile}/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?access_token=${token}&overview=full&geometries=geojson&steps=true`;

    const response = await fetch(mapboxUrl);
    if (!response.ok) {
      console.warn("Mapbox directions API failed, falling back to Haversine");
      // Fallback to Haversine calculation
      const distance = calculateHaversineDistance(
        origin.lat,
        origin.lng,
        destination.lat,
        destination.lng,
      );
      const estimatedMinutes = estimateTravelTime(distance, profile);
      return {
        distance: distance * 1000,
        duration: estimatedMinutes * 60,
      };
    }

    const data = await response.json();
    if (!data.routes || data.routes.length === 0) {
      return null;
    }

    const route = data.routes[0];
    return {
      distance: route.distance, // in meters
      duration: route.duration, // in seconds
      geometry: route.geometry,
    };
  } catch (error) {
    console.error("Mapbox route error:", error);
    // Fallback to Haversine
    const distance = calculateHaversineDistance(
      origin.lat,
      origin.lng,
      destination.lat,
      destination.lng,
    );
    const estimatedMinutes = estimateTravelTime(distance, profile);
    return {
      distance: distance * 1000,
      duration: estimatedMinutes * 60,
    };
  }
}

/**
 * Encode polyline coordinates (Google polyline algorithm)
 */
function encodePolyline(coordinates: [number, number][]): string {
  let encoded = "";
  let prevLat = 0;
  let prevLng = 0;

  for (const [lng, lat] of coordinates) {
    const latDelta = Math.round((lat - prevLat) * 1e5);
    const lngDelta = Math.round((lng - prevLng) * 1e5);

    encoded += encodeValue(latDelta);
    encoded += encodeValue(lngDelta);

    prevLat = lat;
    prevLng = lng;
  }

  return encoded;
}

function encodeValue(value: number): string {
  let encoded = "";
  value = value << 1;
  if (value < 0) {
    value = ~value;
  }

  while (value >= 0x20) {
    encoded += String.fromCharCode((0x20 | (value & 0x1f)) + 63);
    value >>= 5;
  }

  encoded += String.fromCharCode(value + 63);
  return encoded;
}

/**
 * Parse coordinates from address string or coordinates
 * Expects format: "lat,lng" or just coordinates
 */
function parseCoordinates(input: string): Coordinate | null {
  try {
    // Try parsing as "lat,lng" format
    const parts = input.split(",").map((p) => parseFloat(p.trim()));
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      return { lat: parts[0], lng: parts[1] };
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Calculate distance between two coordinates using Haversine formula
 * Returns distance in kilometers
 */
function calculateHaversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Estimate travel time based on distance and travel mode
 * Returns time in minutes
 */
function estimateTravelTime(distanceKm: number, travelMode: string): number {
  // Average speeds by transport mode (km/h)
  const speeds: { [key: string]: number } = {
    driving: 40,
    walking: 5,
    cycling: 15,
    bicycling: 15,
    transit: 25,
  };

  const speed = speeds[travelMode] || speeds.driving;
  return Math.round((distanceKm / speed) * 60); // Convert to minutes
}

/**
 * Calculate delay time based on traffic conditions
 */
function calculateDelayTime(estimatedMinutes: number, traffic: string): string {
  let delayPercent = 0;

  switch (traffic) {
    case "Lancar":
      delayPercent = 0;
      break;
    case "Padat":
      delayPercent = 20;
      break;
    case "Macet":
      delayPercent = 50;
      break;
    default:
      delayPercent = 10;
  }

  if (delayPercent === 0) {
    return "Tidak ada delay - jalan lancar";
  }

  const delayMinutes = Math.round((estimatedMinutes * delayPercent) / 100);
  return `+${delayMinutes} menit (${delayPercent}% delay)`;
}

/**
 * Calculate average speed in km/h
 */
function calculateAverageSpeed(distanceKm: number, durationMinutes: number): string {
  if (durationMinutes === 0) return "0 km/h";
  const speedKmh = (distanceKm / durationMinutes) * 60;
  return `${speedKmh.toFixed(1)} km/h`;
}

/**
 * Get traffic status based on time of day
 */
function getTrafficStatus(): string {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const timeInMinutes = hour * 60 + minute;

  // Peak hours: 07:00-09:00 and 16:00-18:00
  const isPeakMorning = timeInMinutes >= 7 * 60 && timeInMinutes < 9 * 60;
  const isPeakEvening = timeInMinutes >= 16 * 60 && timeInMinutes < 18 * 60;

  if (isPeakMorning || isPeakEvening) return "Macet";
  if (hour >= 9 && hour < 16) return "Lancar";
  if (hour >= 18 || hour < 6) return "Lancar";

  return "Padat";
}

/**
 * Get nearby areas based on distance
 */
function getNearbyAreas(distanceKm: number): string[] {
  if (distanceKm < 2) return ["Singosari Utama", "Dekat Sekolah"];
  if (distanceKm < 5) return ["Sekitar Singosari", "Kawasan Sekolah"];
  if (distanceKm < 10) return ["Kota Malang", "Sekitar Malang"];
  if (distanceKm < 20) return ["Malang Raya", "Daerah Sekitar Kota"];
  return ["Area Jauh", "Luar Kota Malang"];
}

/**
 * Get congestion category based on time
 */
function getCongestionTimeCategory(): string {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const timeInMinutes = hour * 60 + minute;

  const isPeakMorning = timeInMinutes >= 7 * 60 && timeInMinutes < 9 * 60;
  const isPeakEvening = timeInMinutes >= 16 * 60 && timeInMinutes < 18 * 60;

  if (isPeakMorning) return "Jam Sibuk Pagi (07:00-09:00)";
  if (isPeakEvening) return "Jam Sibuk Sore (16:00-18:00)";
  if (hour >= 9 && hour < 16) return "Jam Normal";
  if (hour >= 18 || hour < 6) return "Jam Sepi";

  return "Jam Transisi";
}

/**
 * Get weather impact info
 */
function getWeatherImpact(distanceKm: number): string {
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 12 && hour <= 16) return "Berisiko hujan sore (musim hujan)";
  if (hour >= 18 || hour <= 6) return "Cuaca aman, visibilitas terbatas di malam hari";

  return "Kondisi cuaca normal";
}

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours > 0) {
    return `${hours} jam ${mins} menit`;
  }
  return `${mins} menit`;
}

function getBestTime(): string {
  const now = new Date();
  const hour = now.getHours();
  if (hour < 7) return "06:30 - 07:00 pagi";
  if (hour < 9) return "Sekarang atau hindari jam sibuk";
  if (hour < 12) return "Setelah jam sibuk pagi";
  if (hour < 15) return "Siapkan waktu lebih";
  if (hour < 18) return "Hindari jam pulang kerja";
  return "Luar jam sibuk";
}

function getTips(traffic: string, minutes: number): string {
  if (traffic === "Macet") return "Pertimbangkan transportasi umum atau berangkat lebih awal.";
  if (minutes > 60) return "Perjalanan cukup lama, pastikan kondisi kendaraan baik.";
  return "Perjalanan normal, selamat jalan!";
}

function getRecommendation(minutes: number, traffic: string): string {
  if (traffic === "Macet" || minutes > 60) return "Tidak direkomendasikan saat ini.";
  if (minutes > 30) return "Direkomendasikan jika mendesak.";
  return "Direkomendasikan.";
}

function calculateEstimatedArrival(minutes: number): string {
  const now = new Date();
  const arrival = new Date(now.getTime() + minutes * 60000);
  return arrival.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
}

function getRecommendedDeparture(): string {
  const now = new Date();
  const hour = now.getHours();
  if (hour >= 6 && hour < 8) return "Sekarang";
  if (hour >= 8 && hour < 16) return "1-2 jam lagi";
  return "Besok pagi";
}

function calculateFuelEstimate(distanceKm: number): string {
  const avgConsumption = 12; // km per liter
  const liters = distanceKm / avgConsumption;
  return `${liters.toFixed(2)} liter`;
}

function calculateCarbonFootprint(distanceKm: number): string {
  const co2PerKm = 0.12; // kg CO2 per km
  const co2 = distanceKm * co2PerKm;
  return `${co2.toFixed(3)} kg CO2`;
}

function getSafetyRating(traffic: string): string {
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
}
