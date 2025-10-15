export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  // Here you would typically fetch from a database by id
  // For now, we'll return mock data
  const submission = {
    id,
    story: 'Sample story',
    category: 'bullying',
    contactMethod: 'none',
    contactInfo: '',
    submittedAt: new Date().toISOString(),
    status: 'pending'
  }

  return {
    success: true,
    data: submission
  }
})