import { validateAnonymousBK } from "~/utils/schema";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);

  const validation = validateAnonymousBK(body);
  if (!validation.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Validation failed",
      data: validation.error.issues,
    });
  }

  const updatedSubmission = {
    id,
    ...validation.data,
    submittedAt: new Date().toISOString(),
    status: "pending",
  };

  return {
    success: true,
    data: updatedSubmission,
  };
});
