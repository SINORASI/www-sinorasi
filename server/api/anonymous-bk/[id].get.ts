export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const submission = {
    id,
    story: "Sample story",
    category: "bullying",
    contactMethod: "none",
    contactInfo: "",
    submittedAt: new Date().toISOString(),
    status: "pending",
  };

  return {
    success: true,
    data: submission,
  };
});
