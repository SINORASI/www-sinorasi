export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  return {
    success: true,
    message: `Submission ${id} deleted successfully`,
  };
});
