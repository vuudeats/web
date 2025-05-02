import { getAllRestaurantRequests } from "@/services/restaurant-request"
import { getServerSession } from "next-auth"

import { redirect } from "next/navigation"
import RestaurantRequestsClient from "./client"
import { authOptions } from "@/auth.config"
import { columns } from "./columns"
import { getCurrentUser } from "@/services/user"
import { RestaurantRequest } from "@prisma/client"


export default async function RestaurantRequestsPage() {
    const session = await getServerSession(authOptions)
    if(session?.user.role !== "ADMIN") return redirect("/de/login")

    const data = await getAllRestaurantRequests()
    console.log(data)

    return <RestaurantRequestsClient data={data} columns={columns} />
}