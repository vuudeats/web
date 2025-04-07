"use client"
import LoginForm from "@/components/form/login-form";
import SearchWeb from "@/components/navigation/web/search-web";
import SidebarWeb from "@/components/navigation/web/sidebar-web";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RestaurantCard } from "@/components/ui/restaurant-card";
import { cityAtom } from "@/state/atoms";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const [city, setCity] = useAtom(cityAtom);
  if(city.length!=0) router.push(`/${city}`)
  return (
    <div className="md:flex justify-center items-center pt-26">
      <p></p>
      <div className="flex w-1/3 gap-2">
        <Input className="rounded-full" placeholder="Geben Sie Ihre Adresse ein."/>
        <Button className="rounded-full" variant={"custom"}>
          <MagnifyingGlassIcon/>
          Suchen
        </Button>
      </div>
    </div>
  );
}
