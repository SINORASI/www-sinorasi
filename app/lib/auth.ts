import { betterAuth } from "better-auth";
import { drizzle } from 'drizzle-orm/node-postgres'
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { username } from "better-auth/plugins"
import { user, session, account, verification } from '../db/schema'

const db = drizzle(process.env.DATABASE_URL!);

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            user,
            session,
            account,
            verification
        }
    }),
    emailAndPassword: {
        enabled: false
    },
    plugins: [
        username()
    ]
});