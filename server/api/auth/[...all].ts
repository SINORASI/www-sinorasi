import { auth } from "~/lib/auth";

// Authentication disabled - return 503 Service Unavailable
export default defineEventHandler((event) => {
    throw createError({
        statusCode: 503,
        statusMessage: 'Authentication service is temporarily disabled'
    });
});