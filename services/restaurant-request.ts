import { db } from "@/lib/db"
import { z } from "zod"
import { addRestaurantSchema } from "@/schemas";

export const createRestaurantRequest = async ({
    restaurantName,
    restaurantAddress,
    deliveryMethod,
    ownerFirstname,
    ownerLastname,
    ownerEmail }:
    z.infer<typeof addRestaurantSchema>) => {

    try {
        return await db.restaurantRequest.create({
            data: {
                restaurantName,
                restaurantAddress,
                deliveryMethod,
                ownerFirstname,
                ownerLastname,
                ownerEmail
            },
        });
    } catch (error) {
        console.log("Error creating Restaurant request:", error);
        return null;
    }
}
