import { MoreHorizontal } from "lucide-react"

export const AdminMeal = () => {
  return (
    <div className="flex justify-between border py-2 px-5 rounded-sm">
      <div className="flex gap-4">
        <p>Name</p>
        <p>Preis</p>
      </div>
      <MoreHorizontal className="w-4" />
    </div>
  )
}