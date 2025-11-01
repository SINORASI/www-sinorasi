// composables/useTrafficReporting.ts
import { ref } from "vue";

export interface TrafficReport {
  id?: string;
  latitude: number;
  longitude: number;
  type: "accident" | "construction" | "traffic_jam" | "road_closure" | "flooding" | "other";
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  created_at?: string;
  expires_at?: string;
  is_active?: boolean;
  report_count?: number;
}

export interface SubmitReportPayload {
  location: { lat: number; lng: number };
  type: TrafficReport["type"];
  severity: TrafficReport["severity"];
  description: string;
  timestamp: string;
}

export const useTrafficReporting = () => {
  const reports = ref<TrafficReport[]>([]);
  const isLoading = ref(false);
  const error = ref("");

  /**
   * Fetch all active traffic reports
   */
  const fetchActiveReports = async (): Promise<TrafficReport[]> => {
    isLoading.value = true;
    error.value = "";

    try {
      const response = await $fetch<{ data: TrafficReport[] }>("/api/traffic-tracker/reports", {
        method: "GET",
      });

      reports.value = response.data || [];
      return reports.value;
    } catch (err: any) {
      error.value = err.message || "Failed to fetch traffic reports";
      console.error("Fetch reports error:", error.value);
      reports.value = [];
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Submit a new traffic report
   */
  const submitReport = async (payload: SubmitReportPayload): Promise<TrafficReport | null> => {
    // Validate payload
    if (!payload.location || !payload.type || !payload.severity || !payload.description) {
      error.value = "Missing required fields";
      return null;
    }

    if (payload.description.trim().length < 10) {
      error.value = "Description must be at least 10 characters";
      return null;
    }

    isLoading.value = true;
    error.value = "";

    try {
      const response = await $fetch<{ success: boolean; data: TrafficReport }>("/api/traffic-tracker/reports", {
        method: "POST",
        body: payload,
      });

      if (response.success && response.data) {
        // Add to local reports list
        reports.value.push(response.data);
        return response.data;
      }

      throw new Error("Invalid response from server");
    } catch (err: any) {
      error.value = err.message || "Failed to submit traffic report";
      console.error("Submit report error:", error.value);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Get report icon based on type
   */
  const getReportIcon = (type: string): string => {
    const iconMap: Record<string, string> = {
      accident: "lucide:car-crash",
      construction: "lucide:construction",
      traffic_jam: "lucide:traffic-cone",
      road_closure: "lucide:road-closed",
      flooding: "lucide:cloud-rain",
      other: "lucide:alert-triangle",
    };
    return iconMap[type] || "lucide:alert-triangle";
  };

  /**
   * Get severity color
   */
  const getSeverityColor = (severity: string): string => {
    const colorMap: Record<string, string> = {
      low: "text-yellow-600 bg-yellow-50 border-yellow-200",
      medium: "text-orange-600 bg-orange-50 border-orange-200",
      high: "text-red-600 bg-red-50 border-red-200",
      critical: "text-red-800 bg-red-100 border-red-300",
    };
    return colorMap[severity] || "text-gray-600 bg-gray-50 border-gray-200";
  };

  /**
   * Get severity badge color for icons
   */
  const getSeverityBadgeColor = (severity: string): string => {
    const colorMap: Record<string, string> = {
      low: "#EAB308", // yellow
      medium: "#F97316", // orange
      high: "#DC2626", // red
      critical: "#7F1D1D", // dark red
    };
    return colorMap[severity] || "#6B7280"; // gray
  };

  /**
   * Format time since report was created
   */
  const formatTimeSince = (isoString: string): string => {
    const createdAt = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - createdAt.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);

    if (diffMins < 1) return "Baru saja";
    if (diffMins < 60) return `${diffMins}m yang lalu`;
    if (diffHours < 1) return "Kurang dari 1j yang lalu";
    return `${diffHours}h yang lalu`;
  };

  return {
    reports,
    isLoading,
    error,
    fetchActiveReports,
    submitReport,
    getReportIcon,
    getSeverityColor,
    getSeverityBadgeColor,
    formatTimeSince,
  };
};
