export default defineEventHandler(async (event) => {
  // Here you would typically fetch from a database
  // For now, we'll return mock data
  const submissions = [
    {
      id: '1',
      story: 'Sample story',
      category: 'bullying',
      contactMethod: 'none',
      contactInfo: '',
      submittedAt: new Date().toISOString(),
      status: 'pending'
    }
  ]

  return {
    success: true,
    data: submissions
  }
})