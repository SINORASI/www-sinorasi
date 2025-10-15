import { z } from 'zod';

const trafficReportSchema = z.object({
  location: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180)
  }),
  type: z.enum(['accident', 'construction', 'traffic_jam', 'road_closure', 'flooding', 'other']),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  description: z.string().min(10).max(500),
  reporterId: z.string().optional(), // Anonymous reports allowed
  timestamp: z.string().datetime().optional()
});

type TrafficReport = z.infer<typeof trafficReportSchema>;

interface TrafficReportResponse {
  id: string;
  status: 'received' | 'validated' | 'rejected';
  message: string;
  timestamp: string;
}

export default defineEventHandler(async (event): Promise<TrafficReportResponse> => {
  try {
    const body = await readBody(event);

    // Validate input with enhanced error messages
    const validation = trafficReportSchema.safeParse(body);
    if (!validation.success) {
      const errorMessages = validation.error.issues.map(issue =>
        `${issue.path.join('.')}: ${issue.message}`
      ).join(', ');

      throw createError({
        statusCode: 400,
        statusMessage: `Invalid report data: ${errorMessages}`,
        data: validation.error.issues
      });
    }

    const report: TrafficReport = validation.data;

    // Generate report ID
    const reportId = `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // In a real implementation, this would be stored in a database
    // For now, we'll simulate storage and validation
    console.log('Traffic report received:', {
      id: reportId,
      ...report,
      timestamp: report.timestamp || new Date().toISOString()
    });

    // Basic validation logic (could be enhanced with ML/AI)
    const isValid = validateReport(report);

    if (!isValid) {
      return {
        id: reportId,
        status: 'rejected',
        message: 'Report validation failed - please provide more specific details about the location and incident',
        timestamp: new Date().toISOString()
      };
    }

    // Simulate storing in database/cache
    // In production: store in PostgreSQL with PostGIS for spatial queries
    // Also: publish to Redis pub/sub for real-time updates

    return {
      id: reportId,
      status: 'received',
      message: 'Traffic report submitted successfully. Thank you for helping improve traffic conditions!',
      timestamp: new Date().toISOString()
    };

  } catch (error: any) {
    console.error('Traffic report error:', error);

    // Enhanced error handling
    if (error.statusCode) {
      throw error; // Re-throw custom errors
    }

    // Handle validation errors
    if (error.message?.includes('Invalid report data')) {
      throw createError({
        statusCode: 400,
        statusMessage: error.message
      });
    }

    // Handle database/storage errors
    if (error.message?.includes('database') || error.message?.includes('storage')) {
      throw createError({
        statusCode: 503,
        statusMessage: 'Report storage temporarily unavailable. Please try again later.'
      });
    }

    // Generic fallback
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to submit traffic report. Please try again.'
    });
  }
});

// Basic report validation
function validateReport(report: TrafficReport): boolean {
  // Check if location is within reasonable bounds (Indonesia)
  if (report.location.lat < -11 || report.location.lat > 6 ||
      report.location.lng < 95 || report.location.lng > 141) {
    return false;
  }

  // Check description length and content
  if (report.description.length < 10) {
    return false;
  }

  // Basic spam detection
  const spamKeywords = ['test', 'spam', 'fake', 'joke'];
  const lowerDesc = report.description.toLowerCase();
  if (spamKeywords.some(keyword => lowerDesc.includes(keyword))) {
    return false;
  }

  return true;
}