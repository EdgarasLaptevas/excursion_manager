import { z } from "zod";

export const reviewSchema = z
.object({
    reviewText: z
    .string()
      .min(50, { message: "Atsiliepimas turi būti bent 50 simbolių" })
      .max(2000, {
        message: "Atsiliepimas negali viršyti 2000 simbolių",
      })
      .refine((val) => val.trim() !== "", {
        message: "Atsiliepimas negali būti tuščias",
      }),

       rating: z
    .number({ invalid_type_error: "Įvertinimas turi būti skaičius" })
    .min(1, { message: "Įvertinimas turi būti ne mažesnis nei 1" })
    .max(10, { message: "Įvertinimas turi būti ne didesnis nei 10" }),
      
})