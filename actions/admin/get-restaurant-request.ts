"use server"
import { getRestaurantRequestById } from "@/services/restaurant-request";

export const getRestaurantRequest = async (requestId: string) => {

    const restaurantRequest = await getRestaurantRequestById(requestId);
    if(!restaurantRequest){
        console.log("Fetch restaurant-request failed:", restaurantRequest);
        return null
    }

    return restaurantRequest;



}