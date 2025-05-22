"use server"
import { db } from "@/lib/db"
import { z } from "zod"
import { restaurantRequestSchema } from "@/schemas";

export const createRestaurantRequest = async ({
  restaurantName,
  restaurantAddress,
  deliveryMethod,
  userId
}:
  z.infer<typeof restaurantRequestSchema>) => {

  try {
    return await db.restaurantRequest.create({
      data: {
        restaurantName,
        restaurantAddress,
        deliveryMethod,
        userId
      },
    });
  } catch (error) {
    console.log("Error creating Restaurant request:", error);
    return null;
  }
}

export const getRestaurantRequestById = async (id: string) => {
  try {
    const request = await db.restaurantRequest.findUnique({
      where: { id },
      include: {
        user: true
      }
    })
    return request
  } catch (error) {
    console.error(error)
    return null;
  }
}

export const getAllRestaurantRequests = async () => {
  try {
    return await db.restaurantRequest.findMany()
  } catch (error) {
    return null;
  }
}

export const deleteRestaurantRequestById = async (id: string) => {
  try {
    console.log(id);
    await db.restaurantRequest.delete({
      where: { id },
    });

    return true;
  } catch (error) {
    console.error("Error deleting restaurant request:", error);
    return false;
  }
};