export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  // Here you would typically delete from a database
  // For now, we'll just return success
  return {
    success: true,
    message: `Submission ${id} deleted successfully`
  }
})