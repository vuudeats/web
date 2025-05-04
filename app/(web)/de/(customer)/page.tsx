"use client"
import { getAddress } from "@/actions/user/google/get-address";
import LoginForm from "@/components/form/login-form";
import SearchWeb from "@/components/navigation/web/search-web";
import SidebarWeb from "@/components/navigation/web/sidebar-web";
import { Button } from "@/components/ui/button";
import { DropdownItemVuud } from "@/components/ui/dropdown-item-vuud";
import { DropdownMenuVuud } from "@/components/ui/dropdown-menu-vuud";
import { Input } from "@/components/ui/input";
import { RestaurantCard } from "@/components/ui/restaurant-card";
import { cityAtom } from "@/state/atoms";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useAtom } from "jotai";
import { SessionProvider, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export type GooglePlace = {
  name: string,
  placeId: string
}

export default function Home() {
  const router = useRouter()
  const [address, setCity] = useAtom(cityAtom);
  const [inputValue, setInputValue] = useState("");
  const [placeIdValue, setPlaceIdValue] = useState("");
  const [suggestions, setSuggestions] = useState<GooglePlace[]>([]);
  const [isSuggested, setSuggested] = useState(false);

  useEffect(() => {

    if (inputValue.length > 0) {
      const fetchSuggestions = async () => {
        try {
          const data = await getAddress(inputValue);
          setSuggestions(data);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
      };

      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const handleSubmit = (placeId: string) => {
    router.push(`/de/${placeId}`);
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setSuggestions([])


  };
  return (
    <div className="md:flex flex-col h-screen py-10">
      {/* <div className="bg-[url(/food4k.jpg)] w-full rounded-2xl"> */}
      <div className="w-full flex-col flex justify-center items-center bg-white/80 backdrop-blur-xs py-20">
        <p className="text-4xl font-bold">Du hast Hunger und willst was bestellen? Dann mal los...</p>
        <p className="text-sm text-muted-foreground">Bei Risiken und Nebenwirkungen fragen Sie Ihren Arzt oder Apotheker</p>
        <div className="w-1/3 flex gap-2">
          <div className="flex w-full gap-2 relative my-4">
            <Input
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value)
                setSuggested(false);
              }}
              className="rounded-full"
              placeholder="Geben Sie Ihre Adresse ein."
            />
            {suggestions.length > 0 && !isSuggested && (
              <DropdownMenuVuud>
                {suggestions.map((suggestion, index) => (
                  <DropdownItemVuud
                    key={index}
                    onClick={() => {
                      handleSubmit(suggestion.placeId)
                      handleSuggestionClick(suggestion.name)
                      setCity(suggestion.name)
                      setPlaceIdValue(suggestion.placeId)
                      setSuggested(true);
                    }}
                  >
                    {suggestion.name}
                  </DropdownItemVuud>
                ))}
              </DropdownMenuVuud>
            )}
          </div>
          {/* <Button onClick={() => handleSubmit()} className="rounded-full" variant={"custom"}>
            <MagnifyingGlassIcon />
            Suchen
            </Button> */}
        </div>
        {/* <div className="w-full h-96 overflow-hidden rounded-2xl mt-5">
        <Image className="w-full" src={"/food4k.jpg"} alt="" width={1000} height={1000} />
      </div> */}
      </div>
      {/* </div> */}
    </div>
  );
}
