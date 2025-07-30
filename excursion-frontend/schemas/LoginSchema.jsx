import { z } from "zod";

export const LogInSchema = z
.object({
    email: z
    .string()
    .min(8, {message: "Email must be at least 8 characters long"})
    .max(255, {
        message: "Email cannot be longer than 255 characters"
    })
    .refine((val) => val.trim() !== "", {
        message: "Email cannot be blank",
    }),
    password: z
    .string()
    .min(8, {message: "Password must be at least 8 characters long"})
    .max(255, {
        message: "Password cannot be longer than 255 characters",
    })
    .refine((val) => val.trim() !== "", {
        message: "Password cannot be blank",
    })
})