import { getAllRestaurantRequests } from "@/services/restaurant-request"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/auth.config"
import RestaurantClient from "./client"
import { columns } from "./columns"
import { getAllRestaurants } from "@/services/restaurant"

export default async function RestaurantPage() {
  const session = await getServerSession(authOptions)
  if (session?.user.role !== "ADMIN") return redirect("/de/login")

  const data = await getAllRestaurants()
  console.log(data)

  return <RestaurantClient columns={columns} data={data} />
}