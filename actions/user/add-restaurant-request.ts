"use server"
import { z } from "zod";
import { addRestaurantSchema } from "@/schemas";
import { response } from "@/lib/utils";
import { createRestaurantRequest } from "@/services/restaurant-request";

export const addRestaurantRequest = async (values: z.infer<typeof addRestaurantSchema>, placeId: string) => {
    const validatedFields = addRestaurantSchema.safeParse(values);

    if (!validatedFields.success) {
        return response({
            success: false,
            error: {
                code: 401,
                message: "Invalid Fields."
            }
        });
    }

    const { restaurantName,
        deliveryMethod,
        ownerFirstname,
        ownerLastname,
        ownerEmail
    } = validatedFields.data

    const restaurantRequest = await createRestaurantRequest({
        restaurantName,
        restaurantAddress: placeId,
        deliveryMethod,
        ownerFirstname,
        ownerLastname,
        ownerEmail
    })
    if(restaurantRequest){
        console.log("User created successfully:", restaurantRequest);
        return response({
            success: true,
            code: 201,
            message: "Restaurant-request creation successful!"
        });
    }

    return response({
        success: false,
        error: {
            code: 401,
            message: "Restaurant-request creation failed!"
        }
    })



}