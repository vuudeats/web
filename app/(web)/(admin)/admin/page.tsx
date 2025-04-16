import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { adminLoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function AdminPage() {
    const form = useForm<z.infer<typeof adminLoginSchema>>({
        resolver: zodResolver(adminLoginSchema),
        defaultValues: {
            uuid: "",
        },
    })

    const onSubmit = (values: z.infer<typeof adminLoginSchema>) => {
        console.log(values)

    }
    return <Form {...form}>
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-white p-10 w-md flex flex-col gap-2"
        >
            <h1 className="text-3xl font-semibold mb-3">Melde dich mit deiner Email-Adresse an um fortzufahren.</h1>
            <FormField
                control={form.control}
                name="uuid"
                render={({ field }) => (
                    <FormItem>
                        <div className="flex flex-col items-end gap-0">
                            <FormControl>
                                <Input placeholder="Geben Sie Ihre Email-Adresse ein" {...field} />
                            </FormControl>
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
}