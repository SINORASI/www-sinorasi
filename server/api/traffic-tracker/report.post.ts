import { defineEventHandler, getQuery, readBody, createError, setCookie, getCookie } from 'h3';
import { z } from "zod";

const trafficReportSchema = z.object({
  location: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
  }),
  type: z.enum(["accident", "construction", "traffic_jam", "road_closure", "flooding", "other"]),
  severity: z.enum(["low", "medium", "high", "critical"]),
  description: z.string().min(10).max(500),
  reporterId: z.string().optional(),
  timestamp: z.string().datetime().optional(),
});

type TrafficReport = z.infer<typeof trafficReportSchema>;

interface TrafficReportResponse {
  id: string;
  status: "received" | "validated" | "rejected";
  message: string;
  timestamp: string;
}

export default defineEventHandler(async (event): Promise<TrafficReportResponse> => {
  try {
    const body = await readBody(event);

    const validation = trafficReportSchema.safeParse(body);
    if (!validation.success) {
      const errorMessages = validation.error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join(", ");

      throw createError({
        statusCode: 400,
        statusMessage: `Invalid report data: ${errorMessages}`,
        data: validation.error.issues,
      });
    }

    const report: TrafficReport = validation.data;

    const reportId = `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    console.log("Traffic report received:", {
      id: reportId,
      ...report,
      timestamp: report.timestamp || new Date().toISOString(),
    });

    const isValid = validateReport(report);

    if (!isValid) {
      return {
        id: reportId,
        status: "rejected",
        message:
          "Report validation failed - please provide more specific details about the location and incident",
        timestamp: new Date().toISOString(),
      };
    }

    return {
      id: reportId,
      status: "received",
      message:
        "Traffic report submitted successfully. Thank you for helping improve traffic conditions!",
      timestamp: new Date().toISOString(),
    };
  } catch (error: unknown) {
    console.error("Traffic report error:", error);

    if (error && typeof error === "object" && "statusCode" in error) {
      throw error;
    }

    if (
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof error.message === "string" &&
      error.message.includes("Invalid report data")
    ) {
      throw createError({
        statusCode: 400,
        statusMessage: error.message,
      });
    }

    if (
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof error.message === "string" &&
      (error.message.includes("database") || error.message.includes("storage"))
    ) {
      throw createError({
        statusCode: 503,
        statusMessage: "Report storage temporarily unavailable. Please try again later.",
      });
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Failed to submit traffic report. Please try again.",
    });
  }
});

function validateReport(report: TrafficReport): boolean {
  if (
    report.location.lat < -11 ||
    report.location.lat > 6 ||
    report.location.lng < 95 ||
    report.location.lng > 141
  ) {
    return false;
  }

  if (report.description.length < 10) {
    return false;
  }

  const spamKeywords = ["test", "spam", "fake", "joke"];
  const lowerDesc = report.description.toLowerCase();
  if (spamKeywords.some((keyword) => lowerDesc.includes(keyword))) {
    return false;
  }

  return true;
}
