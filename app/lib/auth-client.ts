import { createAuthClient } from "better-auth/client"
import { usernameClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    baseURL: "", // Use empty string for relative URLs in Nuxt
    plugins: [
        usernameClient()
    ]
})