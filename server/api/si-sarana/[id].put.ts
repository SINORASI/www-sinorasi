import { defineEventHandler, getQuery, readBody, createError, setCookie, getCookie } from 'h3';
import { validateSiSarana } from "~/utils/schema";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID is required",
    });
  }

  const validation = validateSiSarana(body);
  if (!validation.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Validation failed",
      data: validation.error.issues,
    });
  }

  try {
    const updatedSubmission = {
      id,
      ...validation.data,
      updatedAt: new Date().toISOString(),
      status: body.status || "pending",
    };

    return {
      success: true,
      message: "Report updated successfully",
      data: updatedSubmission,
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
      data: error,
    });
  }
});
