import { defineEventHandler, getQuery, readBody, createError, setCookie, getCookie } from 'h3';
import { validateSiSarana } from "~/utils/schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const validation = validateSiSarana(body);
  if (!validation.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Validation failed",
      data: validation.error.issues,
    });
  }

  try {
    const submission = {
      id: Date.now().toString(),
      ...validation.data,
      submittedAt: new Date().toISOString(),
      status: "pending",
    };

    return {
      success: true,
      message: "Report submitted successfully",
      data: submission,
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
      data: error,
    });
  }
});
