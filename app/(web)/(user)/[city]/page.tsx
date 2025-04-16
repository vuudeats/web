"use client"
import { getAddressByPlaceId } from "@/actions/user/google/get-address-by-id";
import SearchWeb from "@/components/navigation/web/search-web";
import SidebarWeb from "@/components/navigation/web/sidebar-web";
import { RestaurantCard } from "@/components/ui/restaurant-card";
import { cityAtom } from "@/state/atoms";
import { useAtom } from "jotai";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type ParamsType = {
    city: string
}

export default function CityPage() {
    const params = useParams<ParamsType>();
    const [address, setAddress] = useState("");

    useEffect(() => {
        const fetchAddress = async () => {
            const data = await getAddressByPlaceId(params.city)
            if(!data) return
            setAddress(data.address)
        }
        fetchAddress();
    })

    return <div className="md:flex justify-between">
        <SidebarWeb city={address} />
        <div className="w-full lg:w-4/5 flex flex-wrap justify-start">
            
        </div>
        <SearchWeb value={address} />
    </div>
}