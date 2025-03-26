"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils";
import { SfProDisplay } from "sf-pro/display";
import Image from "next/image";

const formSchema = z.object({
  email: z.string().email(),
})

export default function LoginClient() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }

  return (
    <div className="flex justify-center items-center bg-black/50 h-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white p-10 w-md flex flex-col gap-5"
        >
          <h1 className="text-2xl font-semibold">Melde dich mit deiner Email-Adresse an um fortzufahren.</h1>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="gunterherbrich@gmail.com" {...field} />

                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
          <p className="w-full text-center opacity-50">----- oder -----</p>
          <Button variant={"secondary"}>Weiter mit Google</Button>
          <Button variant={"secondary"}>Weiter mit Apple</Button>
        </form>
      </Form>
    </div>
  );
}