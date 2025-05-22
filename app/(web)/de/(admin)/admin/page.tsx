"use client"

import { AppSidebar } from "@/components/ui/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { useSession } from "next-auth/react"
import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AdminPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const isAdmin = session?.user?.role === "ADMIN";
  useEffect(() => {
    if (!isAdmin) return router.push("/")
  })

  return (
    <div>
      {isAdmin && (
        <div>
          is admin
        </div>
      )}
    </div>
  )
}