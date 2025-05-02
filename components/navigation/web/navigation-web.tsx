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
import { ExitIcon, PersonIcon } from "@radix-ui/react-icons";
import { useSession, signOut } from "next-auth/react";
import { isAdmin } from "@/lib/auth";
import { useEffect, useState } from "react";

export default function NavigationWeb() {
    const [city, setCity] = useAtom(cityAtom);
    const router = useRouter();
    const {data: session, status} = useSession();
    console.log('Session status:', status);
    console.log('Session data:', session);
    const isAdmin = session?.user?.role === 'ADMIN';

    const handleSignOut = async () => {
        await signOut({ redirect: false });
        router.push('/');
    };

    return <div className="hidden drop-shadow-xs md:flex w-full bg-white backdrop-blur-sm fixed px-20 p-1 justify-between items-center">
        <div className="flex items-center">
            <p className="text-xl font-bold mr-10 cursor-pointer" onClick={() => router.push("/")}>vuud</p>
            {
                NavigationLinks.map((link, i) => {
                    return <Button
                        key={i}
                        variant={"link"}
                        onClick={() => router.push(`/de/${link.href}`)}
                    >
                        {link.name}
                    </Button>
                })
            }
            {city.length > 0 &&
                <Input placeholder="Durchsuche vuud" className={cn(SfProText.className, "py-2 px-3 rounded-full text-xs")} />
            }
        </div>
        {isAdmin && (
            <Button onClick={()=> router.push(`/de/admin/`)} variant="ghost" size="md">Admin Panel</Button>
        )}
        <div className="flex gap-1">
            {!session?.user ? (
                <>
                    <Button onClick={() => router.push("/de/register")} variant={"ghost"} size={"md"}>Registrieren</Button>
                    <Button onClick={() => router.push("/de/login")} size={"md"}>Anmelden</Button>
                </>
            ) : (
                <>
                    <Button onClick={() => router.push("/de/profile")} variant={"ghost"} size={"md"}>Profile</Button>
                    <Button onClick={handleSignOut} variant={"ghost"} size={"md"}>
                        <ExitIcon className="mr-2" />
                        Abmelden
                    </Button>
                </>
            )}
        </div>
    </div>
}