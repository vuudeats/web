import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Mindestens 8 Passwortzeichen!")
})

export const adminLoginSchema = z.object({
  uuid: z.string()
})

export const registerSchema = z.object({
  email: z.string().email(),
  firstname: z.string(),
  lastname: z.string(),
  password: z.string().min(8, "Mindestens 8 Passwordzeichen"),
})

export const restaurantRequestSchema = z.object({
  restaurantName: z.string(),
  restaurantAddress: z.string(),
  deliveryMethod: z.string(),
  userId: z.string()
})

export const mealSchema = z.object({
  name: z.string(),
  price: z
    .string()
    .transform((val) => parseFloat(val.replace(",", ".")))
    .refine((val) => !isNaN(val) && val > 0, { message: "Preis muss positiv sein" }),
  description: z.string().optional(),
})