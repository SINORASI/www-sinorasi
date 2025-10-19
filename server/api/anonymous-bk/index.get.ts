export default defineEventHandler(async (_event) => {
  const submissions = [
    {
      id: "1",
      story: "Sample story",
      category: "bullying",
      contactMethod: "none",
      contactInfo: "",
      submittedAt: new Date().toISOString(),
      status: "pending",
    },
  ];

  return {
    success: true,
    data: submissions,
  };
});
