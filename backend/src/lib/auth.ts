import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true
    },
    trustedOrigins: ["http://localhost:5173"],
    baseURL: process.env.BETTER_AUTH_URL + "/api/v1/auth",
    secret: process.env.BETTER_AUTH_SECRET,
});