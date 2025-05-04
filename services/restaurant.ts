"use server"
import { db } from "@/lib/db";
import { RestaurantRequest, User } from "@prisma/client";

export const createRestaurantByRequest = async (request: RestaurantRequest) => {
    try {
        const restaurant = await db.restaurant.create({
            data: {
                name: request.restaurantName,
                address: request.restaurantAddress,
                deliveryMethod: request.deliveryMethod,
                userId: request.userId,

            },
        });
        return restaurant;
    } catch (error) {
        console.error("Error creating restaurant:", error);
        return request.id;
    }
};

export const getAllRestaurants = async ()=>{
    try{
        return await db.restaurant.findMany();
    } catch(error){
        return null
    }
}