import { z } from "zod";

const trafficReportSchema = z.object({
  location: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
  }),
  type: z.enum(["accident", "construction", "traffic_jam", "road_closure", "flooding", "other"]),
  severity: z.enum(["low", "medium", "high", "critical"]),
  description: z.string().min(10).max(500),
  timestamp: z.string().datetime().optional(),
});

type TrafficReport = z.infer<typeof trafficReportSchema>;

interface TrafficReportResponse {
  success: boolean;
  data: {
    id: string;
    latitude: number;
    longitude: number;
    type: string;
    severity: string;
    description: string;
    created_at: string;
    expires_at: string;
    is_active: boolean;
  };
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

    // Validate location is within Indonesia region
    if (report.location.lat < -11 || report.location.lat > 6 || report.location.lng < 95 || report.location.lng > 141) {
      throw createError({
        statusCode: 400,
        statusMessage: "Report location is outside the valid service area",
      });
    }

    // Check for spam keywords
    const spamKeywords = ["test", "spam", "fake", "joke"];
    const lowerDesc = report.description.toLowerCase();
    if (spamKeywords.some((keyword) => lowerDesc.includes(keyword))) {
      throw createError({
        statusCode: 400,
        statusMessage: "Report appears to contain invalid content",
      });
    }

    const config = useRuntimeConfig();
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(
      config.public.supabaseUrl,
      config.supabaseServiceRoleKey || config.public.supabaseKey
    );

    // Calculate expiry time (1 hour from now)
    const now = new Date();
    const expiryTime = new Date(now.getTime() + 60 * 60 * 1000);

    // Insert report into database
    const { data, error } = await supabase
      .from("traffic_reports")
      .insert({
        latitude: report.location.lat,
        longitude: report.location.lng,
        type: report.type,
        severity: report.severity,
        description: report.description,
        created_at: report.timestamp || now.toISOString(),
        expires_at: expiryTime.toISOString(),
        is_active: true,
      })
      .select();

    if (error) {
      console.error("Supabase insert error:", error);
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to save traffic report",
      });
    }

    const insertedReport = data?.[0];
    if (!insertedReport) {
      throw createError({
        statusCode: 500,
        statusMessage: "Report was not saved correctly",
      });
    }

    return {
      success: true,
      data: {
        id: insertedReport.id,
        latitude: insertedReport.latitude,
        longitude: insertedReport.longitude,
        type: insertedReport.type,
        severity: insertedReport.severity,
        description: insertedReport.description,
        created_at: insertedReport.created_at,
        expires_at: insertedReport.expires_at,
        is_active: insertedReport.is_active,
      },
    };
  } catch (error: any) {
    console.error("Traffic report error:", error);

    if (error.statusCode) {
      throw error;
    }

    if (error.message?.includes("database") || error.message?.includes("storage")) {
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
