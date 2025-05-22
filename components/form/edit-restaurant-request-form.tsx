import { RestaurantRequest, User } from "@prisma/client"
import { Form, FormControl, FormDescription, FormField, FormItem } from "../ui/form"
import { Input } from "../ui/input"
import Link from "next/link"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { restaurantRequestSchema } from "@/schemas"
import { z } from "zod"
import { useEffect, useState } from "react"
import { getAddressByPlaceId } from "@/actions/user/google/get-address-by-id"
import { DeliveryMethodSelection } from "../ui/delivery-method-selection"
import { getUserById } from "@/services/user"
import { UserRoundIcon } from "lucide-react"

type EditRestaurantRequestFormType = {
  restaurantRequest: RestaurantRequest & { user: User }
}

export default function EditRestaurantRequestForm({
  restaurantRequest
}: EditRestaurantRequestFormType) {
  const [address, setAddress] = useState("")

  useEffect(() => {
    if (!restaurantRequest?.restaurantAddress) return;

    const getAddress = async () => {
      const data = await getAddressByPlaceId(restaurantRequest.restaurantAddress);

      if (!data) return;

      setAddress(data.address);

      form.reset({ restaurantAddress: data.address });
    };

    getAddress();
  }, []);

  const form = useForm<z.infer<typeof restaurantRequestSchema>>({
    resolver: zodResolver(restaurantRequestSchema),
    defaultValues: restaurantRequest ? {
      restaurantName: restaurantRequest.restaurantName,
      restaurantAddress: address,
      deliveryMethod: restaurantRequest.deliveryMethod
    } : {
      restaurantName: "s",
      restaurantAddress: "s",
      deliveryMethod: "",
    },
  });

  const onSubmit = () => {

  }

  return <Form {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="bg-white w-xl flex flex-col gap-2"
    >
      <div className="opacity-50 mb-3">
        <p>Anfrage von:</p>
        <div className="flex gap-2">
          <p>{restaurantRequest.user.firstname} <span>{restaurantRequest.user.lastname}</span></p>
          <p>{restaurantRequest.user.email}</p>
        </div>
      </div>

      <FormField
        control={form.control}
        name="restaurantName"
        render={({ field }) => (
          <FormItem>
            <div className="flex flex-col items-end gap-0">
              <FormControl>
                <Input placeholder="Name des Restaurants" {...field} />
              </FormControl>
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="restaurantAddress"
        render={({ field }) => (
          <FormItem className="relative w-full">
            <FormControl>
              <Input
                placeholder="Adresse des Restaurants"
                {...field}
              />
            </FormControl>

            {/* {suggestions.length > 0 && !isSuggested && (
                            <DropdownMenuVuud>
                                {suggestions.map((suggestion, index) => (
                                    <DropdownItemVuud
                                        key={index}
                                        onClick={() => {
                                            form.setValue("restaurantAddress", suggestion.name);
                                            setInputValue(suggestion.name);
                                            setPlaceId(suggestion.placeId);
                                            setSuggestions([]);
                                            setSuggested(true);
                                        }}
                                    >
                                        {suggestion.name}
                                    </DropdownItemVuud>
                                ))}
                            </DropdownMenuVuud>
                        )} */}
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="deliveryMethod"
        render={({ field }) => (
          <FormItem className="w-full h-9">
            <FormControl>
              <DeliveryMethodSelection field={field} />
            </FormControl>
          </FormItem>
        )}
      />
      <div className="flex flex-col gap-2 w-full mt-3">
        <Button variant={"secondary"} type="submit">Änderung Speichern</Button>
      </div>
    </form>
  </Form>
}