"use client"
import { Button } from "@/components/ui/button";
import { SidebarLinks } from "../links";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type SidebarWebType = {
    city: string
}

export default function SidebarWeb({city}: SidebarWebType) {
    const router = useRouter()
    return <div className="w-full md:w-2/5 lg:w-1/5 ">
        <p className="text-4xl font-bold">{city}</p>
        {/* <span className="text-sm relative -z-10 top-2 font-normal text-[#6E6E73]">46414</span> */}
        
        <div className="flex flex-col mt-5 pr-10">
            <Tabs defaultValue="delivery">
                <TabsList>
                    <TabsTrigger value="delivery">Liefernung</TabsTrigger>
                    <TabsTrigger value="pickup">Abholung</TabsTrigger>
                </TabsList>
            </Tabs>
            <div className="flex flex-col mt-5">
                {
                    SidebarLinks.map((link, i) => {
                        return <Button
                            key={i}
                            className="justify-start px-0"
                            variant={"link"}
                            onClick={() => { router.push(link.href) }}
                        >
                            {link.name}
                        </Button>
                    })
                }
            </div>
        </div>
    </div>
}