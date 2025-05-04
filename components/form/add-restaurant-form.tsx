"use client"
import Link from "next/link";
import { Form, FormControl, FormDescription, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { restaurantRequestSchema } from "@/schemas";
import { z } from "zod";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { useEffect, useState } from "react";

import { getAddress } from "@/actions/user/google/get-address";
import { DropdownMenuVuud } from "../ui/dropdown-menu-vuud";
import { DropdownItemVuud } from "../ui/dropdown-item-vuud";
import { addRestaurantRequest } from "@/actions/user/add-restaurant-request";
import { redirect, useRouter } from "next/navigation";
import { GooglePlace } from "@/app/(web)/de/(customer)/page";
import { DeliveryMethodSelection } from "../ui/delivery-method-selection";
import { useSession } from "next-auth/react";

export default function AddRestaurantForm() {
    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState<GooglePlace[]>([]);
    const [isSuggested, setSuggested] = useState(false);
    const [placeId, setPlaceId] = useState("");

    const {data: session, status} = useSession()
    const router = useRouter()

    if(!session?.user) return redirect("/de/login");
    
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

    const form = useForm<z.infer<typeof restaurantRequestSchema>>({
        resolver: zodResolver(restaurantRequestSchema),
        defaultValues: {
            restaurantName: "",
            restaurantAddress: "",
            deliveryMethod: "",
            userId: ""
        },
    })

    const onSubmit = async (values: z.infer<typeof restaurantRequestSchema>) => {
        console.log("submit")
        try{
            const data = await addRestaurantRequest(
                values, 
                placeId, 
                session.user.id
            );
            
            if(!data.success) return console.error(data.error.message);
            console.log(data.message);
            router.push("/")
        }catch(error){
            console.log(error)
        }
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="bg-white p-10 w-xl flex flex-col gap-2"
            >
                <h1 className="text-3xl font-semibold mb-3">Registriere dein eigenes Restaurant und erreiche neue Kunden.</h1>
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
                                    value={inputValue}
                                    onChange={(e) => {
                                        field.onChange(e); // wichtig für Form
                                        setInputValue(e.target.value); // wichtig für Vorschläge
                                        setSuggested(false);
                                    }}
                                    placeholder="Adresse des Restaurants"
                                />
                            </FormControl>

                            {suggestions.length > 0 && !isSuggested && (
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
                            )}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="deliveryMethod"
                    render={({ field }) => (
                        <FormItem className="w-full h-9">
                            <FormControl>
                                <DeliveryMethodSelection field={field}/>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <div className="flex flex-col gap-2 w-full mt-3">
                    <Button type="submit">Weiter</Button>
                </div>
            </form>
        </Form>
    )
}