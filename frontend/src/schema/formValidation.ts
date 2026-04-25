import * as z from "zod"

export const loginForm = z.object({
    email: z
        .string(),
    password: z
        .string()
        .min(5, "password must be of atleast 5 characters")
        .max(10, "password cannot exceed 10 characters")
})

export const signupForm = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z
        .string()
        .min(5, "password must be of atleast 5 characters")
        .max(10, "password cannot exceed 10 characters")
})