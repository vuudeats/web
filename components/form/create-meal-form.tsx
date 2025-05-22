"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Form, FormField, FormItem, FormControl } from "../ui/form"
import { mealSchema } from "@/schemas"
import { Textarea } from "../ui/textarea"
import { createMeal } from "@/services/meal"

type MealFormValues = z.infer<typeof mealSchema>

export default function CreateMealForm() {
  const form = useForm<MealFormValues>({
    resolver: zodResolver(mealSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
    },
  })

  const onSubmit = async (data: MealFormValues) => {
    console.log("Neues Essen:", data)
    try {
      const result = await createMeal(data);
    } catch (error) {
      console.error("Fehler beim Erstellen des Gerichts:", error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Name des Gerichts" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="flex items-center">
              <FormControl>
                <Input placeholder="Preis des Gerichts" {...field} />
              </FormControl>
              <p className="w-10 text-center">€</p>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Beschreibung (optional)" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Speichern</Button>
      </form>
    </Form>
  )
}
