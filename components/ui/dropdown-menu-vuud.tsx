import { cn } from "@/lib/utils"
import { SfProText } from "sf-pro/text"

type DropdownMenuType = {
    children?: React.ReactNode
}

export const DropdownMenuVuud = ({children}: DropdownMenuType) =>{
    return <ul className="absolute mt-2 top-full left-0 w-full bg-white shadow-md border border-gray-200 rounded-xl z-10 max-h-60 overflow-y-auto">
        {/* <p className={cn(SfProText.className ,"px-3 pt-2 pb-1 text-xs text-muted-foreground")}>Vorschläge</p> */}
        {children}
    </ul>
}