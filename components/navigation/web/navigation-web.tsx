"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NavigationLinks } from "../links";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SfProText } from "sf-pro/text";
import { cityAtom } from "@/state/atoms";
import { useAtom } from "jotai";
import { PersonIcon } from "@radix-ui/react-icons";

export default function NavigationWeb() {
    const [city, setCity] = useAtom(cityAtom);
    const router = useRouter();

    return <div className="hidden drop-shadow-xs md:flex w-full bg-white backdrop-blur-sm fixed px-20 p-1 justify-between items-center">
        <div className="flex items-center">
            <p className="text-xl font-bold mr-10 cursor-pointer" onClick={() => router.push("/")}>vuud</p>
            {
                NavigationLinks.map((link, i) => {
                    return <Button
                        key={i}
                        variant={"link"}
                        onClick={() => router.push(link.href)}
                    >
                        {link.name}
                    </Button>
                })
            }
            {city.length > 0 &&
                <Input placeholder="Durchsuche vuud" className={cn(SfProText.className, "py-2 px-3 rounded-full text-xs")} />
            }
        </div>
        <div className="flex gap-1">
            <Button onClick={() => router.push("/register")} variant={"ghost"} size={"md"}>Registrieren</Button>
            <Button onClick={() => router.push("/login")} size={"md"}>Anmelden</Button>

        </div>
    </div>
}