export default defineEventHandler(async (event) => {
  // Here you would typically fetch from a database
  // For now, we'll return mock data
  const submissions = [
    {
      id: '1',
      category: 'maintenance',
      title: 'Broken chair in classroom',
      description: 'The chair in room 101 is broken and needs repair.',
      location: 'Room 101',
      urgency: 'medium',
      reporterName: 'John Doe',
      reporterContact: 'john@example.com',
      submittedAt: new Date().toISOString(),
      status: 'pending'
    },
    {
      id: '2',
      category: 'cleaning',
      title: 'Dirty hallway',
      description: 'The hallway needs cleaning.',
      location: 'Main hallway',
      urgency: 'low',
      reporterName: '',
      reporterContact: '',
      submittedAt: new Date().toISOString(),
      status: 'resolved'
    }
  ]

  return {
    success: true,
    data: submissions
  }
})