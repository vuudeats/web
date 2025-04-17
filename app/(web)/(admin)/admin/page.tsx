"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AdminPage() {
    const router = useRouter()
    const {data: session, status} = useSession()
    const isAdmin = session?.user?.role === "ADMIN";
    useEffect(()=>{
        if(!isAdmin) return router.push("/")
    })
    
    return <div>
        {isAdmin && (
        <div>admin panel</div>
        )}
    </div>
}