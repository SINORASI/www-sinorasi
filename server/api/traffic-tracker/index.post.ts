import { type TrafficTrackerForm, trafficTrackerSchema } from "~/utils/schema";

interface Coordinate {
  lat: number;
  lng: number;
}

interface TrafficResults {
  time: string;
  distance: string;
  traffic: string;
  route: string;
  bestTime: string;
  tips: string;
  recommendation: string;
  analytics: {
    proximity: {
      distanceToSchool: string;
      estimatedArrival: string;
      timeToSchool: string;
    };
    timeAnalytics: {
      currentCongestion: string;
      peakHours: string[];
      recommendedDeparture: string;
      alternativeRoutes: number;
    };
    usefulInfo: {
      fuelEstimate: string;
      carbonFootprint: string;
      safetyRating: string;
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

  const _osrmBaseUrl = config.public?.osrmBaseUrl || "https://router.project-osrm.org";

  const schoolAddress =
    "SMK Negeri 2 Singosari, Jl. Raya Singosari, Singosari, Malang, Jawa Timur, Indonesia";

  try {
    const originCoords = await geocodeAddress(body.origin);
    if (!originCoords) {
      throw createError({
        statusCode: 400,
        statusMessage: "Origin address not found. Please check the address and try again.",
      });
    }

    const destinationCoords = await geocodeAddress(schoolAddress);
    if (!destinationCoords) {
      throw createError({
        statusCode: 500,
        statusMessage: "School address geocoding failed. Please contact support.",
      });
    }

    const routeData = await getOSRMRoute(originCoords, destinationCoords, body.travelMode);

    if (!routeData || routeData.routes.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage:
          "Unable to calculate route. The routing service may be temporarily unavailable.",
      });
    }

    const route = routeData.routes[0];
    const duration = formatDuration(route.duration);
    const distance = formatDistance(route.distance);
    const traffic = getTrafficStatus(route.duration, route.duration);
    const routeSummary = `Route via ${route.legs[0]?.summary || "main roads"}`;
    const bestTime = getBestTime();
    const tips = getTips(traffic, duration);
    const recommendation = getRecommendation(duration, traffic);

    const analytics = {
      proximity: {
        distanceToSchool: distance,
        estimatedArrival: calculateEstimatedArrival(duration),
        timeToSchool: duration,
      },
      timeAnalytics: {
        currentCongestion: traffic,
        peakHours: ["07:00-09:00", "16:00-18:00"],
        recommendedDeparture: getRecommendedDeparture(),
        alternativeRoutes: routeData.routes.length,
      },
      usefulInfo: {
        fuelEstimate: calculateFuelEstimate(distance),
        carbonFootprint: calculateCarbonFootprint(distance),
        safetyRating: getSafetyRating(traffic),
      },
    };

    return {
      time: duration,
      distance,
      traffic,
      route: routeSummary,
      bestTime,
      tips,
      recommendation,
      analytics,
    };
  } catch (error: unknown) {
    console.error("Traffic tracker error:", error);

    if (error && typeof error === "object" && "statusCode" in error) {
      throw error;
    }

    if (
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof error.message === "string" &&
      error.message.includes("fetch")
    ) {
      throw createError({
        statusCode: 503,
        statusMessage: "External service temporarily unavailable. Please try again later.",
      });
    }

    if (
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof error.message === "string" &&
      error.message.includes("JSON")
    ) {
      throw createError({
        statusCode: 502,
        statusMessage: "Invalid response from routing service. Please try again.",
      });
    }

    throw createError({
      statusCode: 500,
      statusMessage: "An unexpected error occurred while calculating your route. Please try again.",
    });
  }
});

async function geocodeAddress(address: string): Promise<Coordinate | null> {
  try {
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1&countrycodes=id`;
    const response = await fetch(nominatimUrl, {
      headers: {
        "User-Agent": "SMKN2-Singosari-Traffic-Tracker/1.0",
      },
    });

    if (!response.ok) {
      throw new Error("Geocoding service unavailable");
    }

    const data = await response.json();

    if (data.length === 0) {
      return null;
    }

    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    };
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
}

async function getOSRMRoute(origin: Coordinate, destination: Coordinate, travelMode: string) {
  try {
    const profileMap: { [key: string]: string } = {
      driving: "driving",
      walking: "walking",
      cycling: "cycling",
      transit: "driving",
    };

    const profile = profileMap[travelMode] || "driving";
    const osrmUrl = `https://router.project-osrm.org/route/v1/${profile}/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=full&alternatives=true&steps=true`;

    const response = await fetch(osrmUrl);

    if (!response.ok) {
      throw new Error("Routing service unavailable");
    }

    return await response.json();
  } catch (error) {
    console.error("OSRM routing error:", error);
    throw error;
  }
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours} jam ${minutes} menit`;
  }
  return `${minutes} menit`;
}

function formatDistance(meters: number): string {
  const km = meters / 1000;
  return `${km.toFixed(1)} km`;
}

function getTrafficStatus(trafficDuration: number, normalDuration: number): string {
  const ratio = trafficDuration / normalDuration;
  if (ratio < 1.2) return "Lancar";
  if (ratio < 1.5) return "Padat";
  return "Macet";
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

function getTips(traffic: string, duration: string): string {
  if (traffic === "Macet") return "Pertimbangkan transportasi umum atau berangkat lebih awal.";
  if (duration.includes("jam")) return "Perjalanan cukup lama, pastikan kondisi kendaraan baik.";
  return "Perjalanan normal, selamat jalan!";
}

function getRecommendation(duration: string, traffic: string): string {
  const durationMin = parseInt(duration.split(" ")[0] || "0", 10);
  if (traffic === "Macet" || durationMin > 60) return "Tidak direkomendasikan saat ini.";
  if (durationMin > 30) return "Direkomendasikan jika mendesak.";
  return "Direkomendasikan.";
}

function calculateEstimatedArrival(duration: string): string {
  const now = new Date();
  const durationMin = parseDurationToMinutes(duration);
  const arrival = new Date(now.getTime() + durationMin * 60000);
  return arrival.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
}

function parseDurationToMinutes(duration: string): number {
  const hours = duration.match(/(\d+)\s*jam/);
  const mins = duration.match(/(\d+)\s*menit/);
  return (hours ? parseInt(hours[1], 10) * 60 : 0) + (mins ? parseInt(mins[1], 10) : 0);
}

function getRecommendedDeparture(): string {
  const now = new Date();
  const hour = now.getHours();
  if (hour >= 6 && hour < 8) return "Sekarang";
  if (hour >= 8 && hour < 16) return "1-2 jam lagi";
  return "Besok pagi";
}

function calculateFuelEstimate(distance: string): string {
  const distKm = parseFloat(distance.replace(" km", ""));
  const avgConsumption = 12;
  const liters = distKm / avgConsumption;
  return `${liters.toFixed(1)} liter`;
}

function calculateCarbonFootprint(distance: string): string {
  const distKm = parseFloat(distance.replace(" km", ""));
  const co2PerKm = 0.12;
  const co2 = distKm * co2PerKm;
  return `${co2.toFixed(1)} kg CO2`;
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
