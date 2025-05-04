"use client"


import { confirmRestaurant } from "@/actions/admin/confirm-restaurant"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { createRestaurantByRequest } from "@/services/restaurant"
import { deleteRestaurantRequestById } from "@/services/restaurant-request"
import { getUserById } from "@/services/user"
import { Restaurant, RestaurantRequest } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export const columns: ColumnDef<Restaurant>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "createdAt",
        header: "Erstellt am",
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const request = row.original
            const router = useRouter();
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(request.id)}
                        >
                            Request ID kopieren
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => router.push(`restaurant-requests/${request.id}`)}>Bearbeiten</DropdownMenuItem>
                        <DropdownMenuItem variant="destructive">Löschen</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    }
]
