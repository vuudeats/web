"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link";
import { loginSchema } from "@/schemas";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function LoginForm() {
  const [message, setMessage] = useState("");

  const router = useRouter()

  const { data: session, status } = useSession();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })


  useEffect(() => {
    if (session?.user) return router.push("/")
  })

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      console.log('Attempting to sign in with:', values.email);
      const result = await signIn("credentials", {
        ...values,
        email: values.email.toLowerCase(),
        redirect: false
      })
      console.log(result)
      console.log('Sign in result:', result);

      if (result?.error) {
        setMessage("Email oder Passwort sind falsch!")
      } else {
        console.log('Login successful, redirecting...');
        router.push("/")
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white p-10 w-md flex flex-col gap-2"
      >
        <h1 className="text-3xl font-semibold">Melde dich mit deiner Email-Adresse an um fortzufahren.</h1>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <p className="text-md text-red-500 w-full">{message}</p>
              <div className="flex flex-col items-end gap-0">
                <FormControl>
                  <Input placeholder="Geben Sie Ihre Email-Adresse ein" {...field} />
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
                  <Input placeholder="Geben Sie Ihr Passwort ein" {...field} />
                </FormControl>
                <FormDescription>
                  <Link className="text-[12px] m-0" href={"/register"}>Noch keinen Account?</Link>
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