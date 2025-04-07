"use client"
import SearchWeb from "@/components/navigation/web/search-web";
import SidebarWeb from "@/components/navigation/web/sidebar-web";
import { RestaurantCard } from "@/components/ui/restaurant-card";
import { useParams } from "next/navigation";

type ParamsType = {
    city: string
}

export default function Page() {
    const params = useParams<ParamsType>();

    return <div className="md:flex justify-between pt-26">
        <SidebarWeb city={params.city}/>
        <div className="w-full lg:w-4/5 flex flex-wrap justify-start">
            <RestaurantCard bestseller />
            <RestaurantCard />
            <RestaurantCard />
            <RestaurantCard />
            <RestaurantCard />
            <RestaurantCard />
            <RestaurantCard />
            <RestaurantCard />
            <RestaurantCard />
            <RestaurantCard />
            <RestaurantCard />
            <RestaurantCard />
            <RestaurantCard />
            <RestaurantCard />
            <RestaurantCard />
            <RestaurantCard />
            <RestaurantCard />
            <RestaurantCard />
            <RestaurantCard />
            <RestaurantCard />
        </div>
        <SearchWeb value={params.city}/>
    </div>
}