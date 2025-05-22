"use client"

import { Button } from "@/components/ui/button";
import { SidebarLinks } from "../links";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { SfProText } from "sf-pro/text";
import { SewingPinIcon, GlobeIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons"

type SearchWebType = {
  value: string
}

export default function SearchWeb({ value }: SearchWebType) {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(value)
  })

  const router = useRouter()

  return (
    <div className="w-full flex justify-center fixed bottom-10">
      <div className="w-1/4 flex gap-2 items-center bg-[#e8e8ed81] backdrop-blur-sm rounded-full overflow-hidden p-2">
        <div className="w-full flex bg-white rounded-full items-center px-3">
          <SewingPinIcon />
          <Input
            className={cn(SfProText.className, "text-sm border-0 outline-0 ring-0 focus-visible:ring-0 font-medium py-2 tracking-[-0.35px]")}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Suche nach einer Adresse"
          />
        </div>
        <Button className="rounded-full" variant={"custom"} size={"sm"}>
          <MagnifyingGlassIcon />
        </Button>
      </div>
    </div>
  )
}