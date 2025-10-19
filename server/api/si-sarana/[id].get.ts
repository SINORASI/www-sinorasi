export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID is required",
    });
  }

  const submission = {
    id,
    category: "maintenance",
    title: "Broken chair in classroom",
    description: "The chair in room 101 is broken and needs repair.",
    location: "Room 101",
    urgency: "medium",
    reporterName: "John Doe",
    reporterContact: "john@example.com",
    submittedAt: new Date().toISOString(),
    status: "pending",
  };

  return {
    success: true,
    data: submission,
  };
});
