import z, { coerce } from "zod";


export const excursionSchema = z.object({
    excursionName: z
    .string()
    .min(1, "Excursion name is required")
    .max(500, "Excursion name must be up to 500 characters.")
    .refine((val) => val.trim() !== "", {
        message: "Excursion name cannot be blank",
    }),

    description: z
    .string()
    .min(50, "Description must be at least 50 characters")
    .max(2000, "Description must be under 2000 characters.")
    .refine((val) => val.trim() !== "", {
        message: "Description cannot be blank",
    }),

    photoUrl: z
  .string()
  .refine((val) => {
    try {
      new URL(val);
      return true;
    } catch {
      return false;
    }
  }, {
    message: "Photo URL must be a valid URL",
  }),

    duration: z
    .coerce.number("Duration must be a number")
    .positive("Duration must be a positive number"),

    price: z
    // .number("Price must be a number")
    // .positive("Price must be a positive number")
    .string()
    .regex(/^-?\d+(?:[.,]\d{1,2})?$/, {
      message: "Kaina turi būti skaičius su ne daugiau kaip 2 skaitmenimis po kablelio",
    })
    .transform((val) => parseFloat(val))
    //.transform((s) => Number(s.replace(",", ".")))
    .refine((val) => val > 0, {
      message: "Kaina turi būti teigiamas skaičius (daugiau nei 0)",
    }),
});