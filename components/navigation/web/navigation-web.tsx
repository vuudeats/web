import Link from "next/link";

export default function NavigationWeb(){
    return <div className="flex w-full bg-white fixed">
        <Link href={"/login"}>Anmelden</Link>
    </div>
}