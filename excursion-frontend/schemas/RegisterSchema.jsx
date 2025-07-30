import { z } from "zod";

export const RegisterSchema = z
  .object({
    email: z
      .string()
      .min(8, { message: "Email must be atleast 8 characters long" })
      .max(255, {
        message: "Email cannot be longer than 255 characters long",
      })
      .refine((val) => val.trim() !== "", {
        message: "Email cannot be blank",
      }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(255, {
        message: "Password cannot be longer than 255 characters",
      })
     .refine((val) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])([^\s]+)$/.test(val),
      {
        message:
          "Password must contain uppercase, lowercase, number, symbol, and no spaces",
      }
    )
      .refine((val) => val.trim() !== "", {
        message: "Password cannot be blank",
      }),
    repeatPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(255, {
        message: "Password cannot be longer than 255 characters",
      }),
  })
  .refine((data) => data.repeatPassword === data.password, {
    path: ["repeatPassword"],
    message: "Passwords must match",
  });