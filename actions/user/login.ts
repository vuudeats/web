import { response } from "@/lib/utils";
import { loginSchema } from "@/schemas";
import { signIn } from 'next-auth/react'
import { z } from "zod";
import { redirect } from 'next/navigation';

export const login = async (values: z.infer<typeof loginSchema>)=>{
    const validatedFields = loginSchema.safeParse(values);
    if(!validatedFields.success) return response({
        success: false,
        error:{
            code: 422,
            message: "Invalid fields."
        }
    })

    const {email, password} = validatedFields.data;

    const res = await signIn('credentials', {
        email: email,
        password: password,
        redirect: false,
      })
    
      if (res?.error) {
        return response({
            success: false,
            error:{
                code: 422,
                message: "Invalid fields."
            }
        })
      }
    
      return response({
        success: true,
        code: 201,
        message: "Login successful!"
      })
}