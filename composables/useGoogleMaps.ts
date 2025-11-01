// composables/useGoogleMaps.ts
import { ref, computed } from "vue";

interface Distance {
  text: string;
  value: number;
}

interface Duration {
  text: string;
  value: number;
}

interface DirectionsResult {
  distance: Distance;
  duration: Duration;
  duration_in_traffic?: Duration;
  polyline: string;
  steps: any[];
}

export const useGoogleMaps = () => {
  const mapInstance = ref<any | null>(null);
  const directionsService = ref<any | null>(null);
  const directionsRenderer = ref<any | null>(null);
  const isMapLoaded = ref(false);
  const error = ref("");

  /**
   * Initialize Google Map with traffic layer
   */
  const initializeMap = (containerId: string, initialZoom = 13) => {
    // Check if Google Maps is available
    if (typeof window === "undefined" || !(window as any).google) {
      error.value = "Google Maps API not loaded";
      return;
    }

    try {
      const container = document.getElementById(containerId);
      if (!container) {
        error.value = "Map container not found";
        return;
      }

      // SMKN 2 Singosari coordinates
      const schoolLocation = {
        lat: -7.91390657,
        lng: 112.64087571,
      };

      const google = (window as any).google;

      mapInstance.value = new google.maps.Map(container, {
        zoom: initialZoom,
        center: schoolLocation,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
        mapTypeControl: false,
      });

      // Add traffic layer
      const trafficLayer = new google.maps.TrafficLayer();
      trafficLayer.setMap(mapInstance.value);

      // Initialize Directions Service
      directionsService.value = new google.maps.DirectionsService();

      // Initialize Directions Renderer
      directionsRenderer.value = new google.maps.DirectionsRenderer({
        map: mapInstance.value,
        suppressMarkers: false,
        polylineOptions: {
          strokeColor: "#3B82F6",
          strokeOpacity: 0.8,
          strokeWeight: 4,
        },
      });

      // Add school marker
      new google.maps.Marker({
        position: schoolLocation,
        map: mapInstance.value,
        title: "SMKN 2 Singosari",
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: "#DC2626",
          fillOpacity: 1,
          strokeColor: "#FFFFFF",
          strokeWeight: 2,
        },
      });

      isMapLoaded.value = true;
    } catch (err: any) {
      error.value = "Failed to initialize map: " + err.message;
      console.error(error.value);
    }
  };

  /**
   * Calculate route with real-time traffic conditions
   */
  const calculateRoute = async (originLat: number, originLng: number): Promise<DirectionsResult | null> => {
    if (!mapInstance.value || !directionsService.value || !directionsRenderer.value) {
      error.value = "Map not initialized";
      return null;
    }

    const google = (window as any).google;

    try {
      const schoolLocation = {
        lat: -7.91390657,
        lng: 112.64087571,
      };

      const request: any = {
        origin: { lat: originLat, lng: originLng },
        destination: schoolLocation,
        travelMode: google.maps.TravelMode.DRIVING,
        drivingOptions: {
          departureTime: new Date(), // Current time for real-time traffic
          trafficModel: google.maps.TrafficModel.BEST_GUESS,
        },
        provideRouteAlternatives: true,
      };

      const result = await directionsService.value.route(request);

      if (result.routes.length === 0) {
        error.value = "No route found";
        return null;
      }

      // Display the primary route
      directionsRenderer.value.setDirections(result);

      // Map center to the origin
      mapInstance.value.setCenter({ lat: originLat, lng: originLng });
      mapInstance.value.setZoom(14);

      const route = result.routes[0];
      const leg = route.legs[0];

      return {
        distance: leg.distance,
        duration: leg.duration,
        duration_in_traffic: leg.duration_in_traffic,
        polyline: route.overview_polyline,
        steps: route.legs.flatMap((l: any) => l.steps),
      };
    } catch (err: any) {
      error.value = `Directions API Error: ${err.message}`;
      console.error(error.value);
      return null;
    }
  };

  /**
   * Add a marker for traffic reports
   */
  const addReportMarker = (lat: number, lng: number, type: string, severity: string, description: string) => {
    if (!mapInstance.value) return;

    const google = (window as any).google;

    const iconColor =
      severity === "critical"
        ? "#7F1D1D"
        : severity === "high"
        ? "#DC2626"
        : severity === "medium"
        ? "#F97316"
        : "#EAB308";

    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: mapInstance.value,
      title: type,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: iconColor,
        fillOpacity: 0.8,
        strokeColor: "#FFFFFF",
        strokeWeight: 2,
      },
    });

    // Add info window
    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div class="p-3 w-64">
          <h3 class="font-bold text-sm capitalize">${type.replace("_", " ")}</h3>
          <p class="text-xs text-gray-600 mt-1">${description}</p>
          <p class="text-xs text-gray-500 mt-2">Severity: ${severity}</p>
        </div>
      `,
    });

    marker.addListener("click", () => {
      infoWindow.open(mapInstance.value, marker);
    });

    return marker;
  };

  /**
   * Clear all markers except school marker
   */
  const clearReportMarkers = () => {
    if (directionsRenderer.value) {
      directionsRenderer.value.setDirections({ routes: [] });
    }
  };

  /**
   * Get formatted ETA string
   */
  const getFormattedETA = (duration_in_traffic?: Duration): string => {
    if (!duration_in_traffic) return "N/A";

    const seconds = duration_in_traffic.value;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  /**
   * Get estimated arrival time
   */
  const getEstimatedArrivalTime = (duration_in_traffic?: Duration): string => {
    if (!duration_in_traffic) return "N/A";

    const arrivalTime = new Date(Date.now() + duration_in_traffic.value * 1000);
    return arrivalTime.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  };

  return {
    mapInstance,
    isMapLoaded,
    error,
    initializeMap,
    calculateRoute,
    addReportMarker,
    clearReportMarkers,
    getFormattedETA,
    getEstimatedArrivalTime,
  };
};
