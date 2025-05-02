// app/layout.tsx oder app/dashboard/layout.tsx
"use client"

import "../../../../globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { getUserById } from "@/services/user";
import { ReactNode } from "react";

export default function RootLayout({ children }: {children: ReactNode}) {
    return (
        <SidebarProvider>
            <AppSidebar/>
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
}
