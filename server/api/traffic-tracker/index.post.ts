import type { TrafficTrackerForm } from '~/utils/schema';

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
  const body = await readBody(event) as TrafficTrackerForm;
  const config = useRuntimeConfig();
  const apiKey = config.public.googleMapsApiKey;

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Google Maps API key not configured'
    });
  }

  const schoolAddress = "SMK Negeri 2 Singosari, Jl. Raya Singosari, Singosari, Malang, Jawa Timur, Indonesia";

  try {
    // Geocode origin address
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(body.origin)}&key=${apiKey}`;
    const geocodeResponse = await fetch(geocodeUrl);
    const geocodeData = await geocodeResponse.json();

    if (geocodeData.status !== "OK") {
      throw createError({
        statusCode: 400,
        statusMessage: 'Origin address not found'
      });
    }

    const origin = geocodeData.results[0].geometry.location;

    // Geocode school address
    const schoolGeocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(schoolAddress)}&key=${apiKey}`;
    const schoolGeocodeResponse = await fetch(schoolGeocodeUrl);
    const schoolGeocodeData = await schoolGeocodeResponse.json();

    if (schoolGeocodeData.status !== "OK") {
      throw createError({
        statusCode: 500,
        statusMessage: 'School address not found'
      });
    }

    const destination = schoolGeocodeData.results[0].geometry.location;

    // Get directions
    const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&mode=${body.travelMode}&departure_time=now&alternatives=true&key=${apiKey}`;
    const directionsResponse = await fetch(directionsUrl);
    const directionsData = await directionsResponse.json();

    if (directionsData.status !== "OK") {
      throw createError({
        statusCode: 400,
        statusMessage: 'Unable to calculate route'
      });
    }

    const route = directionsData.routes[0];
    const leg = route.legs[0];

    const duration = leg.duration_in_traffic ? leg.duration_in_traffic.text : leg.duration.text;
    const distance = leg.distance.text;
    const traffic = getTrafficStatus(leg.duration_in_traffic?.value || leg.duration.value, leg.duration.value);
    const routeSummary = route.summary;
    const bestTime = getBestTime();
    const tips = getTips(traffic, duration);
    const recommendation = getRecommendation(duration, traffic);

    // Enhanced analytics
    const analytics = {
      proximity: {
        distanceToSchool: distance,
        estimatedArrival: calculateEstimatedArrival(duration),
        timeToSchool: duration
      },
      timeAnalytics: {
        currentCongestion: traffic,
        peakHours: ['07:00-09:00', '16:00-18:00'],
        recommendedDeparture: getRecommendedDeparture(),
        alternativeRoutes: directionsData.routes.length
      },
      usefulInfo: {
        fuelEstimate: calculateFuelEstimate(distance),
        carbonFootprint: calculateCarbonFootprint(distance),
        safetyRating: getSafetyRating(traffic)
      }
    };

    return {
      time: duration,
      distance,
      traffic,
      route: routeSummary,
      bestTime,
      tips,
      recommendation,
      analytics
    };
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Error calculating traffic'
    });
  }
});

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
  const durationMin = parseInt(duration.split(" ")[0] || "0");
  if (traffic === "Macet" || durationMin > 60) return "Tidak direkomendasikan saat ini.";
  if (durationMin > 30) return "Direkomendasikan jika mendesak.";
  return "Direkomendasikan.";
}

function calculateEstimatedArrival(duration: string): string {
  const now = new Date();
  const durationMin = parseDurationToMinutes(duration);
  const arrival = new Date(now.getTime() + durationMin * 60000);
  return arrival.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

function parseDurationToMinutes(duration: string): number {
  const hours = duration.match(/(\d+)\s*jam/);
  const mins = duration.match(/(\d+)\s*menit/);
  return (hours ? parseInt(hours[1]) * 60 : 0) + (mins ? parseInt(mins[1]) : 0);
}

function getRecommendedDeparture(): string {
  const now = new Date();
  const hour = now.getHours();
  if (hour >= 6 && hour < 8) return "Sekarang";
  if (hour >= 8 && hour < 16) return "1-2 jam lagi";
  return "Besok pagi";
}

function calculateFuelEstimate(distance: string): string {
  const distKm = parseFloat(distance.replace(' km', ''));
  const avgConsumption = 12; // km/liter
  const liters = distKm / avgConsumption;
  return `${liters.toFixed(1)} liter`;
}

function calculateCarbonFootprint(distance: string): string {
  const distKm = parseFloat(distance.replace(' km', ''));
  const co2PerKm = 0.12; // kg CO2 per km for average car
  const co2 = distKm * co2PerKm;
  return `${co2.toFixed(1)} kg CO2`;
}

function getSafetyRating(traffic: string): string {
  switch (traffic) {
    case "Lancar": return "Tinggi";
    case "Padat": return "Sedang";
    case "Macet": return "Rendah";
    default: return "Sedang";
  }
}