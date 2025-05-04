import { createRestaurantByRequest } from "@/services/restaurant";
import { deleteRestaurantRequestById } from "@/services/restaurant-request";
import { RestaurantRequest } from "@prisma/client";

export const confirmRestaurant = async (request: RestaurantRequest)=>{
    const restaurant = await createRestaurantByRequest(request);
    if(!restaurant) return false;

    const requestDeleted = await deleteRestaurantRequestById(request.id);
    return requestDeleted;
}