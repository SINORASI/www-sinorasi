import { authClient } from '~/lib/auth-client'

export default defineNuxtRouteMiddleware(async (to, from) => {
  // Authentication disabled - allow all routes
  return
})