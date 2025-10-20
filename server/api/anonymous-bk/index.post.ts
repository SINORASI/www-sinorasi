import { defineEventHandler, readBody, createError } from "h3";
import { validateAnonymousBK } from "~/utils/schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const validation = validateAnonymousBK(body);
  if (!validation.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Validation failed",
      data: validation.error.issues,
    });
  }

  const submission = {
    id: Date.now().toString(),
    ...validation.data,
    submittedAt: new Date().toISOString(),
    status: "pending",
  };

  return {
    success: true,
    data: submission,
  };
});
