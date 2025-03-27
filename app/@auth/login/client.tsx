"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link";

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
    <div className="flex justify-center items-center bg-black/50 h-screen w-full absolute">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white p-10 w-md flex flex-col gap-4"
        >
          <h1 className="text-3xl font-semibold">Melde dich mit deiner Email-Adresse an um fortzufahren.</h1>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col items-end gap-0">
                  <FormControl>
                    <Input placeholder="Geben Sie Ihre Email-Adresse ein" {...field} />
                  </FormControl>
                  <FormDescription>
                    <Link className="text-[12px] m-0" href={"/registration"}>Noch keinen Account?</Link>
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-2 w-full">
            <Button type="submit">Weiter</Button>
            <p className="w-full text-center opacity-50">----- oder -----</p>
            <Button variant={"secondary"}>Weiter mit Google</Button>
            <Button variant={"secondary"}>Weiter mit Apple</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}