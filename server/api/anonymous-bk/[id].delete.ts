import { defineEventHandler, getQuery, readBody, createError, setCookie, getCookie } from 'h3';
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  return {
    success: true,
    message: `Submission ${id} deleted successfully`,
  };
});
