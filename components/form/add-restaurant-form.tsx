"use client"
import Link from "next/link";
import { Form, FormControl, FormDescription, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addRestaurantSchema } from "@/schemas";
import { z } from "zod";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { useEffect, useState } from "react";
import { GooglePlace } from "@/app/page";
import { getAddress } from "@/actions/user/google/get-address";
import { DropdownMenu } from "../ui/dropdown-menu";
import { DropdownItem } from "../ui/dropdown-item";
import { addRestaurantRequest } from "@/actions/user/add-restaurant-request";
import { useRouter } from "next/navigation";

export default function AddRestaurantForm() {
    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState<GooglePlace[]>([]);
    const [isSuggested, setSuggested] = useState(false);
    const [placeId, setPlaceId] = useState("");

    const router = useRouter()

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

    const form = useForm<z.infer<typeof addRestaurantSchema>>({
        resolver: zodResolver(addRestaurantSchema),
        defaultValues: {
            restaurantName: "",
            restaurantAddress: "",
            deliveryMethod: "",
            ownerFirstname: "",
            ownerLastname: "",
            ownerEmail: ""
        },
    })

    const onSubmit = async (values: z.infer<typeof addRestaurantSchema>) => {
        try{
            const data = await addRestaurantRequest(values, placeId);
            
            if(!data.success) return console.error(data.error.message);
            console.log(data.message);
            router.push("/")
        }catch{

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
                                <DropdownMenu>
                                    {suggestions.map((suggestion, index) => (
                                        <DropdownItem
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
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
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
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger className="w-full p-5">
                                        <SelectValue placeholder="Liefermethode" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Liefermethode</SelectLabel>
                                            <SelectItem value="pickup">Nur Abholung</SelectItem>
                                            <SelectItem value="deliver">Nur Lieferung</SelectItem>
                                            <SelectItem value="both">Abholung und Lieferung</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <p className=" font-semibold mt-6">Informationen zum Inhabers</p>
                <div className="flex gap-2 w-full">
                    <FormField
                        control={form.control}
                        name="ownerFirstname"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input placeholder="Vorname des Inhabers" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="ownerLastname"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input placeholder="Nachname des Inhabers" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="ownerEmail"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <Input placeholder="Email des Inhabers" {...field} />
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