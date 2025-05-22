import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "./card"

type RestaurantCardProps = {
  bestseller?: boolean
  onClick: () => void;
}

const RestaurantCard = ({ bestseller, onClick }: RestaurantCardProps) => {
  return (
    <Card onClick={onClick} className="w-full md:w-1/2 lg:w-1/4 p-4 border-0 hover:bg-gray-100/50 drop-shadow-none">
      <CardContent>
        <div className="w-full h-32 bg-gray-100/50 rounded-xl p-2 flex items-end justify-end">
          {/* bg-cover bg-[url(/food.jpeg)]  */}
          {
            bestseller ?
              <div className="bg-green-300 p-1 px-3 rounded-xl">
                <p className="text-xs font-semibold">1# Bestseller</p>
              </div> : ""
          }
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start">
        <CardTitle className="text-xl">
          RestaurantName
        </CardTitle>
        <CardDescription>
          Lieferzeit / Bewertung
        </CardDescription>
      </CardFooter>
    </Card>
  )
}

export { RestaurantCard }