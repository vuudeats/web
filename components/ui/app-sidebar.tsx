"use client"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Profile } from "./profile"
import { User } from "@prisma/client"
import { Button } from "./button"
import { ArrowBigLeftDash, HomeIcon, ScaleIcon, UserCog, Utensils } from "lucide-react"
import Link from "next/link"

const items = [
    {
        title: "Home",
        url: "/",
        icon: HomeIcon,
    },
    {
        title: "Accounts",
        url: "/accounts",
        icon: UserCog,
    },
    {
        title: "Restaurant Anfragen",
        url: "/restaurant-requests",
        icon: Utensils,
    },
]

type AppSidebarType = {
    currentPath: string,
}

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroupContent className="px-3">

                    <SidebarMenuButton asChild>
                        <Link href={`/`}>
                            <ArrowBigLeftDash />
                            <span>Zurück</span>
                        </Link>
                    </SidebarMenuButton>

                    {items.map((item, key) => (
                        <SidebarMenuButton key={key} asChild>
                            <Link href={`/de/admin/${item.url}`}>
                                <item.icon />
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    ))}
                </SidebarGroupContent>
                <SidebarGroup />
            </SidebarContent>
        </Sidebar>
    )
}
