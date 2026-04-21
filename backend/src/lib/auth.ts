import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    // emailAndPassword: {
    //     enabled: true
    // },
    socialProviders: {
        github: {
            clientId: process.env.clientId!,
            clientSecret: process.env.clientSecret!
        }
    }
});