"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link";
import { registerSchema } from "@/schemas";
import { register } from "@/actions/user/register";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      firstname: "",
      lastname: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      console.log(values);
      const data = await register({
        ...values,
        email: values.email.toLowerCase()
      });

      if (data.success) {
        router.push("/de/login");
        console.log(data.message);
      } else {
        console.error(data.error.message);
      }
    } catch (error) {
      console.error("Registrierung fehlgeschlagen:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white p-10 w-md flex flex-col gap-2"
      >
        <h1 className="text-3xl font-semibold mb-3">Erstelle einen Account mit deiner Email-Adresse.</h1>
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col items-end gap-2">
                <FormControl>
                  <Input placeholder="Vorname" {...field} />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col items-end gap-2">
                <FormControl>
                  <Input placeholder="Nachname" {...field} />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col items-end gap-0">
                <FormControl>
                  <Input placeholder="Email-Adresse" {...field} />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col items-end gap-2">
                <FormControl>
                  <Input type="password" placeholder="Passwort" {...field} />
                </FormControl>
                <FormDescription>
                  <Link className="text-[12px] m-0" href={"/login"}>Schon einen Account?</Link>
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2 w-full mt-3">
          <Button type="submit">Weiter</Button>
          <p className="w-full text-center opacity-50">----- oder -----</p>
          <Button variant={"secondary"}>Weiter mit Google</Button>
          <Button variant={"secondary"}>Weiter mit Apple</Button>
        </div>
      </form>
    </Form>
  );
}