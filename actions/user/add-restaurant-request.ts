"use server"
import { z } from "zod";
import { restaurantRequestSchema } from "@/schemas";
import { response } from "@/lib/utils";
import { createRestaurantRequest } from "@/services/restaurant-request";

export const addRestaurantRequest = async (values: z.infer<typeof restaurantRequestSchema>, placeId: string, userId: string) => {
    const validatedFields = restaurantRequestSchema.safeParse(values);

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
        deliveryMethod
    } = validatedFields.data

    const restaurantRequest = await createRestaurantRequest({
        restaurantName,
        restaurantAddress: placeId,
        deliveryMethod,
        userId
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