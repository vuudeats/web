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

export const addRestaurantSchema = z.object({
  restaurantName: z.string(),
  restaurantAddress: z.string(),
  deliveryMethod: z.string(),
  ownerFirstname: z.string(),
  ownerLastname: z.string(),
  ownerEmail: z.string()
})