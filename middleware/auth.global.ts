import { authClient } from '~/lib/auth-client'

export default defineNuxtRouteMiddleware(async (to, from) => {
  // Skip auth check for login and register pages
  if (to.path === '/login' || to.path === '/register') {
    return
  }

  try {
    const session = await authClient.getSession()

    if (!session.data?.user) {
      console.log('No session found, redirecting to login')
      return navigateTo('/login')
    }
  } catch (error) {
    console.log('Auth middleware error:', error)
    console.log('Redirecting to login due to error')
    return navigateTo('/login')
  }
})