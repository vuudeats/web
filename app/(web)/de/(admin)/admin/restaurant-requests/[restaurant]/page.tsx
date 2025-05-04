"use client"
import { getRestaurantRequest } from "@/actions/admin/get-restaurant-request"
import EditRestaurantRequestForm from "@/components/form/edit-restaurant-request-form"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { RestaurantRequest, User } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { AdminMeal } from "./_components/admin-meal"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import CreateMealForm from "@/components/form/create-meal-form"
 "@/components/form/create-meal-form"

type RestaurantRequestsClientType = {
    data: any,
    columns: ColumnDef<RestaurantRequest, any>[]
}
type ParamsType = {
    restaurant: string
}
export default function RequestPage() {
    const params = useParams<ParamsType>();
    const [request, setRequest] = useState<RestaurantRequest & { user: User }>()

    useEffect(() => {
        const getRequest = async () => {
            console.log(params.restaurant)
            const data = await getRestaurantRequest(params.restaurant)
            console.log(data)
            if (data == null) return console.log("data not found")
            setRequest(data)

        }
        getRequest()
    }, [])

    return <div className="p-8">
        <h1 className="text-6xl font-bold mb-5">{request?.restaurantName}</h1>
        <div className="flex">
            {request && <EditRestaurantRequestForm restaurantRequest={request} />}
            
        </div>
    </div>
}