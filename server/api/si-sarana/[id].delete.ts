export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID is required",
    });
  }

  try {
    return {
      success: true,
      message: `Report ${id} deleted successfully`,
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
      data: error,
    });
  }
});
