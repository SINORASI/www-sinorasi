import { defineEventHandler, getQuery, readBody, createError, setCookie, getCookie } from "h3";
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

    // Get route data from Mapbox with user preferences
    const routeData = await getMapboxRoute(userCoords, SCHOOL_COORDINATES, body.travelMode, mapboxToken, {
      avoidTolls: body.avoidTolls,
      avoidHighways: body.avoidHighways,
    });

    if (!routeData) {
      throw createError({
        statusCode: 400,
        statusMessage: "Unable to calculate route. Please try again.",
      });
    }

    const distanceKm = routeData.distance / 1000;

    // Use departure time if provided, otherwise use current time
    const departureTime = body.departureTime ? new Date(body.departureTime) : new Date();

    // Get base estimated minutes from route
    let estimatedMinutes = Math.round(routeData.duration / 60);

    // Determine traffic status based on departure time
    const traffic = getTrafficStatus(departureTime);

    // Adjust estimated time based on traffic conditions
    estimatedMinutes = adjustEstimatedTimeForTraffic(estimatedMinutes, traffic, body.travelMode, distanceKm);

    const estimatedTime = formatDuration(estimatedMinutes);
    const nearbyAreas = getNearbyAreas(userCoords, distanceKm);
    const delayTime = calculateDelayTime(estimatedMinutes, traffic, body.travelMode);

    const bestTime = getBestTime();
    const tips = getTips(traffic, estimatedMinutes, body.travelMode, distanceKm);
    const recommendation = getRecommendation(estimatedMinutes, traffic, distanceKm);

    const analytics = {
      proximity: {
        distanceToSchool: `${distanceKm.toFixed(2)} km`,
        estimatedArrival: calculateEstimatedArrival(estimatedMinutes, departureTime),
        travelTime: estimatedTime,
        nearbyAreas,
      },
      timeAnalytics: {
        currentCongestion: traffic,
        peakHours: ["07:00-09:00", "16:00-18:00"],
        recommendedDeparture: getRecommendedDeparture(departureTime),
        timeCategory: getCongestionTimeCategory(departureTime),
        delayTime,
      },
      usefulInfo: {
        fuelEstimate: calculateFuelEstimate(distanceKm, body.travelMode),
        carbonFootprint: calculateCarbonFootprint(distanceKm, body.travelMode),
        safetyRating: getSafetyRating(traffic, distanceKm),
        weatherImpact: getWeatherImpact(distanceKm, departureTime),
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
  options?: { avoidTolls?: boolean; avoidHighways?: boolean }
): Promise<MapboxRoute | null> {
  try {
    // Default to Haversine if no token
    if (!token) {
      const distance = calculateHaversineDistance(origin.lat, origin.lng, destination.lat, destination.lng);
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

    // Build Mapbox URL with optional parameters
    let mapboxUrl = `https://api.mapbox.com/directions/v5/mapbox/${mapboxProfile}/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?access_token=${token}&overview=full&geometries=geojson&steps=true`;

    // Add exclude options if provided
    if (options?.avoidTolls || options?.avoidHighways) {
      const excludes = [];
      if (options.avoidTolls) excludes.push("toll");
      if (options.avoidHighways) excludes.push("motorway");
      if (excludes.length > 0) {
        mapboxUrl += `&exclude=${excludes.join(",")}`;
      }
    }

    const response = await fetch(mapboxUrl);
    if (!response.ok) {
      console.warn("Mapbox directions API failed, falling back to Haversine");
      // Fallback to Haversine calculation
      const distance = calculateHaversineDistance(origin.lat, origin.lng, destination.lat, destination.lng);
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
    const distance = calculateHaversineDistance(origin.lat, origin.lng, destination.lat, destination.lng);
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
function calculateHaversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
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
 * Adjust estimated travel time based on traffic conditions
 */
function adjustEstimatedTimeForTraffic(
  baseMinutes: number,
  traffic: string,
  travelMode: string,
  distanceKm: number
): number {
  // No adjustment for non-motor modes
  if (travelMode === "walking" || travelMode === "bicycling") {
    return baseMinutes;
  }

  let multiplier = 1.0;

  switch (traffic) {
    case "Lancar":
      multiplier = 1.0; // No change
      break;
    case "Padat":
      // For moderate congestion, add 10-20% depending on distance
      multiplier = distanceKm > 10 ? 1.15 : 1.1;
      break;
    case "Macet":
      // For heavy congestion, add 40-60% depending on distance
      multiplier = distanceKm > 10 ? 1.6 : 1.4;
      break;
    default:
      multiplier = 1.05;
  }

  return Math.round(baseMinutes * multiplier);
}

/**
 * Calculate delay time based on traffic conditions and travel mode
 */
function calculateDelayTime(estimatedMinutes: number, traffic: string, travelMode: string = "driving"): string {
  let delayPercent = 0;

  // Only apply delay for motor vehicles, not for walking/cycling
  if (travelMode === "walking" || travelMode === "bicycling") {
    return "Tidak ada delay - perjalanan stabil";
  }

  switch (traffic) {
    case "Lancar":
      delayPercent = 0;
      break;
    case "Padat":
      delayPercent = 15;
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
function getTrafficStatus(departureTime: Date = new Date()): string {
  const hour = departureTime.getHours();
  const minute = departureTime.getMinutes();
  const timeInMinutes = hour * 60 + minute;
  const dayOfWeek = departureTime.getDay(); // 0 = Sunday, 6 = Saturday

  // Peak hours: 07:00-09:00 and 16:00-18:00 on weekdays
  const isPeakMorning = timeInMinutes >= 7 * 60 && timeInMinutes < 9 * 60;
  const isPeakEvening = timeInMinutes >= 16 * 60 && timeInMinutes < 18 * 60;

  // Reduce congestion on weekends (Saturday = 6, Sunday = 0)
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  if (isWeekend) {
    // Lighter traffic on weekends
    if (isPeakMorning || isPeakEvening) return "Padat";
    if (hour >= 9 && hour < 16) return "Lancar";
    return "Lancar";
  }

  // Weekday traffic patterns
  if (isPeakMorning || isPeakEvening) return "Macet";
  if (hour >= 9 && hour < 16) return "Lancar";
  if (hour >= 18 || hour < 6) return "Lancar";

  return "Padat";
}

/**
 * Get nearby areas based on distance and coordinates
 */
function getNearbyAreas(userCoords: Coordinate, distanceKm: number): string[] {
  // Define area zones near Singosari
  const malangCenter = { lat: -7.9797, lng: 112.6304 };
  const distanceFromMalangCenter = calculateHaversineDistance(
    userCoords.lat,
    userCoords.lng,
    malangCenter.lat,
    malangCenter.lng
  );

  if (distanceKm < 1) return ["Di Depan Sekolah", "Lokasi Sangat Dekat"];
  if (distanceKm < 2) return ["Singosari Utama", "Dekat Sekolah"];
  if (distanceKm < 5) return ["Sekitar Singosari", "Kawasan Sekolah"];
  if (distanceKm < 10) {
    if (distanceFromMalangCenter < 8) return ["Kota Malang", "Pusat Malang"];
    return ["Sekitar Malang", "Area Singosari"];
  }
  if (distanceKm < 20) return ["Malang Raya", "Daerah Sekitar Kota"];
  if (distanceKm < 50) return ["Area Jauh", "Luar Kota Malang"];
  return ["Area Sangat Jauh", "Luar Jawa Timur"];
}

/**
 * Get congestion category based on time
 */
function getCongestionTimeCategory(departureTime: Date = new Date()): string {
  const hour = departureTime.getHours();
  const minute = departureTime.getMinutes();
  const timeInMinutes = hour * 60 + minute;
  const dayOfWeek = departureTime.getDay();

  const isPeakMorning = timeInMinutes >= 7 * 60 && timeInMinutes < 9 * 60;
  const isPeakEvening = timeInMinutes >= 16 * 60 && timeInMinutes < 18 * 60;

  const dayName = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"][dayOfWeek];

  if (isPeakMorning) return `Jam Sibuk Pagi (07:00-09:00) - ${dayName}`;
  if (isPeakEvening) return `Jam Sibuk Sore (16:00-18:00) - ${dayName}`;
  if (hour >= 9 && hour < 16) return `Jam Normal (09:00-16:00) - ${dayName}`;
  if (hour >= 18 || hour < 6) return `Jam Sepi (18:00-06:00) - ${dayName}`;

  return `Jam Transisi - ${dayName}`;
}

/**
 * Get weather impact info based on distance and time
 */
function getWeatherImpact(distanceKm: number, departureTime: Date = new Date()): string {
  const hour = departureTime.getHours();
  const month = departureTime.getMonth();

  // Indonesia has wet and dry seasons
  // Wet season: November-March (rainy season)
  const isWetSeason = month >= 10 || month <= 2;

  if (isWetSeason) {
    if (hour >= 12 && hour <= 16) return "Berisiko hujan sore (musim hujan)";
    if (hour >= 17 && hour <= 19) return "Kemungkinan besar hujan (musim hujan)";
    if (distanceKm > 20) return "Perhatikan kondisi cuaca musiman";
  }

  if (hour >= 18 || hour <= 6) return "Cuaca aman, visibilitas terbatas di malam hari";
  if (hour >= 12 && hour <= 14) return "Cerah, hindari sinar matahari langsung";

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

function getTips(traffic: string, minutes: number, travelMode: string = "driving", distanceKm: number = 0): string {
  if (travelMode === "walking") {
    if (minutes > 60) return "Perjalanan jalan kaki lebih dari 1 jam, pertimbangkan kendaraan lain.";
    return "Siapkan pakaian yang nyaman untuk perjalanan jalan kaki.";
  }

  if (travelMode === "bicycling") {
    if (distanceKm > 20) return "Jarak cukup jauh untuk sepeda, pertimbangkan kendaraan lain.";
    return "Siapkan sepeda dan perlengkapan keselamatan.";
  }

  if (traffic === "Macet") {
    if (minutes > 120) return "Lalu lintas sangat macet, sangat disarankan menggunakan transportasi umum.";
    return "Pertimbangkan transportasi umum atau berangkat lebih awal.";
  }

  if (minutes > 60) return "Perjalanan cukup lama, pastikan kondisi kendaraan baik dan penuh bahan bakar.";

  return "Perjalanan normal, selamat jalan!";
}

function getRecommendation(minutes: number, traffic: string, distanceKm: number = 0): string {
  // Strong recommendation against travelling in heavy traffic over long distance
  if (traffic === "Macet" && distanceKm > 15) return "Tidak direkomendasikan - lalu lintas macet dan jarak jauh.";
  if (traffic === "Macet" || minutes > 120) return "Tidak direkomendasikan saat ini.";
  if (minutes > 45 && traffic !== "Lancar") return "Direkomendasikan jika mendesak, namun siapkan waktu ekstra.";
  if (minutes > 30) return "Direkomendasikan jika mendesak.";
  return "Direkomendasikan.";
}

function calculateEstimatedArrival(minutes: number, departureTime: Date = new Date()): string {
  const arrival = new Date(departureTime.getTime() + minutes * 60000);
  return arrival.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
}

function getRecommendedDeparture(departureTime: Date = new Date()): string {
  const hour = departureTime.getHours();
  if (hour >= 6 && hour < 8) return "Sekarang";
  if (hour >= 8 && hour < 16) return "1-2 jam lagi";
  if (hour >= 16 && hour < 20) return "Hindari jam sibuk pulang (16:00-18:00)";
  return "Besok pagi lebih baik";
}

function calculateFuelEstimate(distanceKm: number, travelMode: string = "driving"): string {
  if (travelMode !== "driving" && travelMode !== "transit") {
    return "N/A (tidak menggunakan bahan bakar)";
  }

  // Average consumption for typical car in Indonesia
  const avgConsumption = 12; // km per liter
  const liters = distanceKm / avgConsumption;
  const estimatedCost = liters * 10000; // Rough estimate based on fuel price

  return `${liters.toFixed(2)} liter (~Rp ${estimatedCost.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")})`;
}

function calculateCarbonFootprint(distanceKm: number, travelMode: string = "driving"): string {
  let co2PerKm = 0.12; // kg CO2 per km for typical car

  // Different emissions for different modes
  switch (travelMode) {
    case "walking":
    case "bicycling":
      co2PerKm = 0; // Zero emissions
      break;
    case "transit":
      co2PerKm = 0.05; // Lower emissions for public transport
      break;
    case "driving":
      co2PerKm = 0.12;
      break;
  }

  const co2 = distanceKm * co2PerKm;
  return co2 === 0 ? "0 kg CO2 (ramah lingkungan)" : `${co2.toFixed(3)} kg CO2`;
}

function getSafetyRating(traffic: string, distanceKm: number = 0): string {
  // Consider both traffic and distance
  if (distanceKm > 50) {
    // Long distance travels are riskier
    if (traffic === "Macet") return "Rendah - jarak jauh dengan lalu lintas macet";
    if (traffic === "Padat") return "Sedang - jarak jauh dengan lalu lintas padat";
    return "Sedang - jarak jauh memerlukan fokus ekstra";
  }

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
