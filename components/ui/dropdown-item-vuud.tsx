import { SewingPinIcon } from "@radix-ui/react-icons"

type DropdownItemType = {
  onClick?: () => void
  children: React.ReactNode
}

export const DropdownItemVuud = ({ onClick, children }: DropdownItemType) => {
  return (
    <li
      className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
      onClick={onClick}
    >
      <SewingPinIcon />
      {children}
    </li>
  )
}
