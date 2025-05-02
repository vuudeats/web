"use client"
import { DataTable } from "@/components/ui/data-table"
import { RestaurantRequest } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

type RestaurantRequestsClientType = {
    data: any,
    columns: ColumnDef<RestaurantRequest, any>[]
}

export default function RestaurantRequestsClient({ data, columns }: RestaurantRequestsClientType) {
    return <div>
        <DataTable data={data} columns={columns} />
    </div>
}