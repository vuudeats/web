"use client"

import { DataTable } from "@/components/ui/data-table"
import { Restaurant, RestaurantRequest } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

type RestaurantRequestsClientType = {
  data: any,
  columns: ColumnDef<Restaurant, any>[]
}

export default function RestaurantClient({ data, columns }: RestaurantRequestsClientType) {
  return (
    <div className="p-6">
      <h1 className="text-4xl mb-5">Restaurants</h1>
      <DataTable data={data} columns={columns} />
    </div>
  )
}